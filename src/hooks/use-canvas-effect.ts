import * as React from 'react'

export type CanvasRenderFn = (dt: number, frames: number) => void
export type CanvasSetupFn = (
  ctx: CanvasRenderingContext2D,
  el: HTMLCanvasElement,
  signal: AbortSignal
) => CanvasRenderFn | void

export interface CanvasEffectOptions {
  coordinates?: 'css' | 'device'
}

/**
 * useCanvasEffect
 * High-performance Canvas animation hook for BoldKit Canvas Effects.
 * - Auto-pauses when off-screen via IntersectionObserver
 * - Runs unconditionally at 60fps (FORCE_EXPRESSIVE_MOTION)
 * - Auto-aborts event listeners via AbortSignal
 * - Handles High-DPI screens and resizing cleanly
 */
export function useCanvasEffect(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  setup: CanvasSetupFn,
  options?: CanvasEffectOptions
): void {
  const setupRef = React.useRef(setup)
  React.useEffect(() => {
    setupRef.current = setup
  }, [setup])

  React.useEffect(() => {
    const el = canvasRef.current
    if (!el) return

    const ctx = el.getContext('2d')
    if (!ctx) return

    const ac = new AbortController()
    const { signal } = ac

    let isVisible = true
    let animationFrameId: number | null = null
    let renderFn: CanvasRenderFn | void = undefined
    let frames = 0
    let lastTime = performance.now()

    // Setup High-DPI sizing
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = el.getBoundingClientRect()
      const w = Math.round(rect.width * dpr) || el.clientWidth || 300
      const h = Math.round(rect.height * dpr) || el.clientHeight || 150
      if (el.width !== w || el.height !== h) {
        el.width = w
        el.height = h
        if (options?.coordinates === 'css') {
          ctx.scale(dpr, dpr)
        }
      }
    }

    updateSize()

    // Run setup to acquire renderFn
    try {
      renderFn = setupRef.current(ctx, el, signal)
    } catch (err) {
      console.error('[useCanvasEffect] Error during setup:', err)
      return
    }

    // Animation Loop (60fps unconditional)
    const loop = (currentTime: number) => {
      if (!isVisible || signal.aborted) {
        animationFrameId = null
        return
      }

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1) // clamp dt to prevent huge jumps
      lastTime = currentTime
      frames++

      // BoldKit canvas effects multiply speed by the 2nd argument (frame step),
      // so passing cumulative lifetime frames causes quadratic acceleration.
      // We pass normalized frame delta (~1.0 at 60fps), clamped between 0.5 and 2.0.
      const frameStep = Math.min(Math.max(dt * 60, 0.5), 2.0)

      if (renderFn) {
        try {
          renderFn(dt, frameStep)
        } catch (err) {
          console.error('[useCanvasEffect] Error during render:', err)
          animationFrameId = null
          return
        }
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    lastTime = performance.now()
    animationFrameId = requestAnimationFrame(loop)

    // ResizeObserver
    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateSize()
      })
      resizeObserver.observe(el)
    }

    // IntersectionObserver to auto-pause when offscreen
    let intersectionObserver: IntersectionObserver | null = null
    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          const nowVisible = entry ? entry.isIntersecting : true
          if (nowVisible !== isVisible) {
            isVisible = nowVisible
            if (isVisible && !animationFrameId && renderFn) {
              lastTime = performance.now()
              animationFrameId = requestAnimationFrame(loop)
            } else if (!isVisible && animationFrameId) {
              cancelAnimationFrame(animationFrameId)
              animationFrameId = null
            }
          }
        },
        { threshold: 0.05 }
      )
      intersectionObserver.observe(el)
    }

    return () => {
      ac.abort()
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      if (intersectionObserver) {
        intersectionObserver.disconnect()
      }
    }
  }, [canvasRef])
}
