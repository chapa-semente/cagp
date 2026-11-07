---
title: "Canvas Effects"
description: "Coleção de 23 efeitos gráficos interativos baseados em HTML5 Canvas e WebGL/React com suporte a prefers-reduced-motion e temas neobrutalistas."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/canvas-effects"
category: "extras"
totalEffects: 23
dependencies:
  - "motion"
  - "clsx"
  - "tailwind-merge"
---

# BoldKit Canvas Effects (23 Efeitos Interativos)

> Efeitos de animação gráfica em HTML5 Canvas de alta performance e baixo overhead com estética neobrutalista, grid de pontos, ruído analógico, CRT retro e física fluida.

## Visão Geral e Uso

```tsx
import { Aurora, CRT, Dither, DotBlob, DotWave } from '@/components/CanvasEffects/react'

export function HeroBanner() {
  return (
    <div className="relative h-96 w-full border-3 border-black overflow-hidden bg-white shadow-[4px_4px_0_0_#000]">
      <Aurora className="absolute inset-0 opacity-80" />
      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-black">Neobrutalism in Motion</h1>
      </div>
    </div>
  )
}
```

---

## Effect: `Aurora`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export interface AuroraProps {
  /** Colors for each aurora curtain (up to 5) */
  colors?: string[]
  /** Number of background stars */
  starCount?: number
  /** Animation speed multiplier */
  speed?: number
  className?: string
  style?: CSSProperties
}

const DEFAULT_COLORS = ['#00ffaa', '#00beff', '#78ff64', '#be50ff', '#00dceb']

const BAND_CONFIGS = [
  { y: 0.30, A: 0.055, fq: 1.8, sp: 0.28 },
  { y: 0.40, A: 0.070, fq: 2.4, sp: 0.38 },
  { y: 0.22, A: 0.040, fq: 1.3, sp: 0.21 },
  { y: 0.47, A: 0.060, fq: 2.9, sp: 0.47 },
  { y: 0.16, A: 0.030, fq: 1.0, sp: 0.14 },
]

/**
 * Aurora — Borealis curtain simulation
 *
 * Five layered light curtains drift across a star-filled sky.
 * Each band is a slow sine wave with upward rays and a glowing crest.
 *
 * @example
 * <Aurora colors={['#00ffaa', '#00beff', '#78ff64']} starCount={160} speed={1} />
 */
export function Aurora({
  colors = DEFAULT_COLORS,
  starCount = 160,
  speed = 1,
  className,
  style,
}: AuroraProps) {
  const ref        = useRef<HTMLCanvasElement>(null)
  const colorsRef  = useRef(colors)
  const starsRef   = useRef(starCount)
  const speedRef   = useRef(speed)

  useEffect(() => { colorsRef.current = colors    }, [colors])
  useEffect(() => { starsRef.current  = starCount }, [starCount])
  useEffect(() => { speedRef.current  = speed     }, [speed])

  useCanvasEffect(ref, (ctx, el) => {

    type Star = { x: number; y: number; r: number; p: number; s: number }
    let stars: Star[] = []
    const initStars = () => {
      stars = Array.from({ length: starsRef.current }, () => ({
        x: Math.random(), y: Math.random() * 0.9,
        r: Math.random() * 1.1 + 0.15,
        p: Math.random() * Math.PI * 2,
        s: 0.5 + Math.random() * 2.5,
      }))
    }
    initStars()

    let t = 0
    return (_dt, frames) => {
      const W = el.width, H = el.height
      const spd = speedRef.current
      const cls = colorsRef.current

      const bg = ctx.createLinearGradient(0, 0, 0, H)
      bg.addColorStop(0, '#010810'); bg.addColorStop(0.6, '#020c1a'); bg.addColorStop(1, '#04080f')
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)

      stars.forEach(s => {
        ctx.globalAlpha = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * s.s + s.p))
        ctx.fillStyle = '#dce8ff'
        ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2); ctx.fill()
      })

      BAND_CONFIGS.slice(0, cls.length).forEach((b, idx) => {
        const [r, g, bv] = hexToRgb(cls[idx] ?? cls[0])
        const baseY = H * b.y, bh = H * 0.09
        const pts = Array.from({ length: 121 }, (_, i) => {
          const x = (i / 120) * W
          const y = baseY
            + H * b.A * Math.sin(x * b.fq * 0.01 + t * b.sp * spd)
            + H * b.A * 0.4 * Math.sin(x * b.fq * 0.024 - t * b.sp * 1.3 * spd + 1.2)
          return { x, y }
        })

        ctx.beginPath()
        ctx.moveTo(0, H); pts.forEach(p => ctx.lineTo(p.x, p.y)); ctx.lineTo(W, H); ctx.closePath()
        const gd = ctx.createLinearGradient(0, baseY - bh, 0, baseY + bh * 4)
        gd.addColorStop(0, `rgba(${r},${g},${bv},0)`)
        gd.addColorStop(0.15, `rgba(${r},${g},${bv},0.45)`)
        gd.addColorStop(0.55, `rgba(${r},${g},${bv},0.12)`)
        gd.addColorStop(1, `rgba(${r},${g},${bv},0)`)
        ctx.globalAlpha = 1; ctx.fillStyle = gd; ctx.fill()

        ctx.beginPath()
        ctx.moveTo(0, 0); ctx.lineTo(W, 0)
        pts.slice().reverse().forEach(p => ctx.lineTo(p.x, p.y)); ctx.closePath()
        const gu = ctx.createLinearGradient(0, baseY, 0, 0)
        gu.addColorStop(0, `rgba(${r},${g},${bv},0.22)`)
        gu.addColorStop(0.5, `rgba(${r},${g},${bv},0.06)`)
        gu.addColorStop(1, `rgba(${r},${g},${bv},0)`)
        ctx.fillStyle = gu; ctx.fill()

        ctx.beginPath()
        pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
        ctx.strokeStyle = `rgba(${r},${g},${bv},0.85)`
        ctx.lineWidth = 1.5
        ctx.shadowColor = `rgb(${r},${g},${bv})`
        ctx.shadowBlur = 10
        ctx.globalAlpha = 0.65; ctx.stroke(); ctx.shadowBlur = 0
      })

      ctx.shadowColor = 'transparent'
      ctx.globalAlpha = 1
      t += 0.007 * spd * frames
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `CRT`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export interface CRTProps {
  /** Phosphor tint color */
  color?: string
  /** Background color */
  bgColor?: string
  /** Gap between scanlines in px */
  scanGap?: number
  /** Flicker intensity (0–1) */
  flicker?: number
  /** Animation speed multiplier */
  speed?: number
  className?: string
  style?: CSSProperties
}

/**
 * CRT — retro cathode-ray tube screen
 *
 * Layered phosphor scanlines, a rolling brightness band, edge vignette and
 * subtle flicker recreate the look of an old monitor. Drop it behind content
 * for an instant terminal / arcade-cabinet vibe.
 *
 * @example
 * <CRT color="#43ff7a" bgColor="#04140a" scanGap={3} flicker={0.6} speed={1} />
 */
export function CRT({
  color = '#43ff7a',
  bgColor = '#04140a',
  scanGap = 3,
  flicker = 0.6,
  speed = 1,
  className,
  style,
}: CRTProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef(color)
  const bgRef = useRef(bgColor)
  const gapRef = useRef(scanGap)
  const flickerRef = useRef(flicker)
  const speedRef = useRef(speed)

  useEffect(() => { colorRef.current = color }, [color])
  useEffect(() => { bgRef.current = bgColor }, [bgColor])
  useEffect(() => { gapRef.current = scanGap }, [scanGap])
  useEffect(() => { flickerRef.current = flicker }, [flicker])
  useEffect(() => { speedRef.current = speed }, [speed])

  useCanvasEffect(ref, (ctx, el) => {

    let t = 0
    return (_dt, frames) => {
      const W = el.width, H = el.height
      const [r, g, b] = hexToRgb(colorRef.current)
      const gap = Math.max(2, gapRef.current * (window.devicePixelRatio || 1))

      ctx.fillStyle = bgRef.current
      ctx.fillRect(0, 0, W, H)

      // Faint phosphor wash.
      ctx.globalAlpha = 0.05
      ctx.fillStyle = `rgb(${r},${g},${b})`
      ctx.fillRect(0, 0, W, H)

      // Horizontal scanlines.
      ctx.globalAlpha = 0.18
      ctx.fillStyle = '#000'
      for (let y = 0; y < H; y += gap) ctx.fillRect(0, y, W, gap / 2)

      // Rolling brightness band sweeping top→bottom.
      const bandY = ((t * 60 * speedRef.current) % (H + 200)) - 100
      const grad = ctx.createLinearGradient(0, bandY - 80, 0, bandY + 80)
      grad.addColorStop(0, `rgba(${r},${g},${b},0)`)
      grad.addColorStop(0.5, `rgba(${r},${g},${b},0.12)`)
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
      ctx.globalAlpha = 1
      ctx.fillStyle = grad
      ctx.fillRect(0, bandY - 80, W, 160)

      // Vignette.
      const vig = ctx.createRadialGradient(
        W / 2, H / 2, Math.min(W, H) * 0.3,
        W / 2, H / 2, Math.max(W, H) * 0.72,
      )
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.55)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      // Whole-screen flicker.
      const fl = flickerRef.current
      if (fl > 0) {
        ctx.globalAlpha = fl * 0.06 * (0.5 + 0.5 * Math.sin(t * 40))
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, W, H)
        ctx.globalAlpha = 1
      }

      t += 0.016 * speedRef.current * frames
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `Dither`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

export interface DitherProps {
  /** Background / "off" color */
  bgColor?: string
  /** Foreground / "on" color */
  color?: string
  /** Size of each dithered pixel block in px */
  pixelSize?: number
  /** Spatial scale of the underlying plasma field */
  scale?: number
  /** Animation speed multiplier */
  speed?: number
  className?: string
  style?: CSSProperties
}

// 4×4 Bayer ordered-dithering threshold matrix, normalised to (0,1).
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map(row => row.map(v => (v + 0.5) / 16))

/**
 * Dither — 1-bit Bayer ordered dithering
 *
 * A drifting plasma field is quantised to two colors through a 4×4 Bayer
 * threshold matrix and rendered as chunky pixels — the classic 1-bit /
 * Game Boy aesthetic, rebuilt for the neubrutalism era.
 *
 * @example
 * <Dither bgColor="#0a0a0a" color="#84ff3c" pixelSize={4} scale={1} speed={1} />
 */
export function Dither({
  bgColor = '#0a0a0a',
  color = '#84ff3c',
  pixelSize = 4,
  scale = 1,
  speed = 1,
  className,
  style,
}: DitherProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const bgRef = useRef(bgColor)
  const fgRef = useRef(color)
  const pxRef = useRef(pixelSize)
  const scaleRef = useRef(scale)
  const speedRef = useRef(speed)

  useEffect(() => { bgRef.current = bgColor }, [bgColor])
  useEffect(() => { fgRef.current = color }, [color])
  useEffect(() => { pxRef.current = pixelSize }, [pixelSize])
  useEffect(() => { scaleRef.current = scale }, [scale])
  useEffect(() => { speedRef.current = speed }, [speed])

  useCanvasEffect(ref, (ctx, el) => {

    let t = 0
    return (_dt, frames) => {
      const W = el.width, H = el.height
      const px = Math.max(2, pxRef.current)
      const k = 0.012 * scaleRef.current
      ctx.fillStyle = bgRef.current
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = fgRef.current

      const cols = Math.ceil(W / px)
      const rows = Math.ceil(H / px)
      for (let c = 0; c < cols; c++) {
        const x = c * px
        for (let r = 0; r < rows; r++) {
          const y = r * px
          // Cheap layered-sine plasma in [0,1].
          const v =
            (Math.sin(x * k + t) +
              Math.sin(y * k * 1.3 - t * 0.8) +
              Math.sin((x + y) * k * 0.7 + t * 1.2) +
              Math.sin(Math.hypot(x - W / 2, y - H / 2) * k * 0.9 - t)) /
              8 +
            0.5
          if (v > BAYER[r & 3][c & 3]) ctx.fillRect(x, y, px, px)
        }
      }

      t += 0.02 * speedRef.current * frames
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `DotBlob`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

export interface DotBlobProps {
  /** Dot fill color */
  color?: string
  /** Max dot radius in px */
  dotSize?: number
  /** Distance between dot centers in px */
  gap?: number
  /** Animation speed multiplier (1 = normal) */
  speed?: number
  /** Field values below this threshold leave blank space (0–1) */
  threshold?: number
  className?: string
  style?: CSSProperties
}

/**
 * DotBlob — Halftone wave field
 *
 * A Gaussian envelope × traveling wave drives halftone dot sizes.
 * Two crossing wave components carve blank spaces in the troughs
 * and bloom into pixels at the crests.
 *
 * @example
 * <DotBlob color="#c9ba4c" dotSize={4} gap={9} speed={1} threshold={0.28} />
 */
export function DotBlob({
  color = '#c9ba4c',
  dotSize = 4,
  gap = 9,
  speed = 1,
  threshold = 0.28,
  className,
  style,
}: DotBlobProps) {
  const ref          = useRef<HTMLCanvasElement>(null)
  // Live prop refs — animation reads these; changes take effect without restart
  const colorRef     = useRef(color)
  const dotSizeRef   = useRef(dotSize)
  const gapRef       = useRef(gap)
  const speedRef     = useRef(speed)
  const thresholdRef = useRef(threshold)

  useEffect(() => { colorRef.current     = color     }, [color])
  useEffect(() => { dotSizeRef.current   = dotSize   }, [dotSize])
  useEffect(() => { gapRef.current       = gap       }, [gap])
  useEffect(() => { speedRef.current     = speed     }, [speed])
  useEffect(() => { thresholdRef.current = threshold }, [threshold])

  useCanvasEffect(ref, (ctx, el) => {

    const gauss = (px: number, py: number, cx: number, cy: number, rx: number, ry: number) => {
      const dx = (px - cx) / rx, dy = (py - cy) / ry
      return Math.exp(-(dx * dx + dy * dy) * 0.5)
    }

    let t = 0
    return (_dt, frames) => {
      const GAP       = gapRef.current
      const MAX_DOT   = dotSizeRef.current
      const THRESHOLD = thresholdRef.current
      const W = el.width, H = el.height
      ctx.clearRect(0, 0, W, H)
      const cols = Math.ceil(W / GAP) + 1
      const rows = Math.ceil(H / GAP) + 1
      const ex = W * (0.42 + 0.08 * Math.sin(t * 0.18))
      const ey = H * (0.60 + 0.06 * Math.sin(t * 0.13))

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = c * GAP, py = r * GAP
          const env = Math.min(1,
            gauss(px, py, ex,       ey,       W * 0.32, H * 0.26) * 1.0 +
            gauss(px, py, W * 0.10, H * 0.88, W * 0.15, H * 0.13) * 0.55 +
            gauss(px, py, W * 0.78, H * 0.88, W * 0.12, H * 0.10) * 0.40,
          )
          if (env < 0.05) continue
          const wave =
            0.55 * Math.sin(c * 0.38 - t * 2.2 + r * 0.12) +
            0.35 * Math.sin(c * 0.22 + r * 0.35 - t * 1.7) +
            0.10 * Math.sin(c * 0.60 - r * 0.20 + t * 2.8)
          const v = env * (wave + 1) / 2
          if (v < THRESHOLD) continue
          const vAbove = (v - THRESHOLD) / (1 - THRESHOLD)
          const size = Math.sqrt(vAbove) * MAX_DOT + 0.8
          ctx.globalAlpha = 0.25 + vAbove * 0.75
          ctx.fillStyle = colorRef.current
          ctx.fillRect(px - size / 2, py - size / 2, size, size)
        }
      }
      ctx.globalAlpha = 1
      t += 0.032 * speedRef.current * frames
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `DotWave`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

export interface DotWaveProps {
  /** Dot fill color */
  color?: string
  /** Distance between dot centers in px */
  gap?: number
  /** Animation speed multiplier */
  speed?: number
  className?: string
  style?: CSSProperties
}

/**
 * DotWave — Sine-field dot grid
 *
 * Two crossing sine waves modulate each dot's size and opacity,
 * creating a rippling fabric of colored squares.
 *
 * @example
 * <DotWave color="#ef4444" gap={22} speed={1} />
 */
export function DotWave({
  color = '#ef4444',
  gap = 22,
  speed = 1,
  className,
  style,
}: DotWaveProps) {
  const ref      = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef(color)
  const gapRef   = useRef(gap)
  const speedRef = useRef(speed)

  useEffect(() => { colorRef.current = color }, [color])
  useEffect(() => { gapRef.current   = gap   }, [gap])
  useEffect(() => { speedRef.current = speed }, [speed])

  useCanvasEffect(ref, (ctx, el) => {

    let t = 0
    return (_dt, frames) => {
      const GAP = gapRef.current
      const W = el.width, H = el.height
      ctx.clearRect(0, 0, W, H)
      const cols = Math.ceil(W / GAP) + 1
      const rows = Math.ceil(H / GAP) + 1
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = (Math.sin(c * 0.45 + r * 0.3 - t * 1.2) +
                     Math.sin(c * 0.2 - r * 0.4 + t * 0.8) + 2) / 4
          const size = 2 + v * 8
          ctx.globalAlpha = 0.15 + v * 0.85
          ctx.fillStyle = colorRef.current
          ctx.fillRect(c * GAP + GAP / 2 - size / 2, r * GAP + GAP / 2 - size / 2, size, size)
        }
      }
      ctx.globalAlpha = 1
      t += 0.035 * speedRef.current * frames
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `FlowField`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

// Smooth value noise — used to build the angle field
function vNoise(x: number, y: number): number {
  const f  = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
  const lp = (a: number, b: number, t: number) => a + (b - a) * t
  const h  = (nx: number, ny: number) => {
    const n = Math.sin(nx * 127.1 + ny * 311.7) * 43758.5453
    return n - Math.floor(n)
  }
  const ix = Math.floor(x), iy = Math.floor(y)
  const fx = x - ix, fy = y - iy
  return lp(lp(h(ix, iy), h(ix + 1, iy), f(fx)), lp(h(ix, iy + 1), h(ix + 1, iy + 1), f(fx)), f(fy))
}

export interface FlowFieldProps {
  /** Number of particles */
  count?: number
  /** Starting hue for particle color range (0–360) */
  hueStart?: number
  /** Hue range spread in degrees */
  hueRange?: number
  /** Particle movement speed multiplier */
  speed?: number
  /** How fast trails fade (higher = shorter trails, 0.01–0.10) */
  decay?: number
  className?: string
  style?: CSSProperties
}

/**
 * FlowField — Noise-driven particle trails
 *
 * Particles follow a smooth value-noise angle field, leaving
 * colored trails that slowly decay. The field itself drifts over
 * time, producing organic, ever-changing stream patterns.
 *
 * @example
 * <FlowField count={200} hueStart={170} hueRange={120} speed={1} decay={0.028} />
 */
export function FlowField({
  count = 200,
  hueStart = 170,
  hueRange = 120,
  speed = 1,
  decay = 0.028,
  className,
  style,
}: FlowFieldProps) {
  const ref          = useRef<HTMLCanvasElement>(null)
  const countRef     = useRef(count)
  const hueStartRef  = useRef(hueStart)
  const hueRangeRef  = useRef(hueRange)
  const speedRef     = useRef(speed)
  const decayRef     = useRef(decay)

  useEffect(() => { countRef.current    = count    }, [count])
  useEffect(() => { hueStartRef.current = hueStart }, [hueStart])
  useEffect(() => { hueRangeRef.current = hueRange }, [hueRange])
  useEffect(() => { speedRef.current    = speed    }, [speed])
  useEffect(() => { decayRef.current    = decay    }, [decay])

  useCanvasEffect(ref, (ctx, el) => {
    type P = { x: number; y: number; life: number; maxLife: number; hue: number }
    let particles: P[] = []

    const spawn = (): P => ({
      x: Math.random() * el.width,
      y: Math.random() * el.height,
      life: 0,
      maxLife: 60 + Math.random() * 100,
      hue: hueStartRef.current + Math.random() * hueRangeRef.current,
    })

    const init = () => { particles = Array.from({ length: countRef.current }, spawn) }

    const off    = document.createElement('canvas')
    const offCtx = off.getContext('2d')
    if (!offCtx) return


    let t = 0
    let lastW = 0, lastH = 0
    return (_dt, frames) => {
      if (el.width !== lastW || el.height !== lastH) {
        lastW = el.width; lastH = el.height
        init()
      }
      const W = el.width, H = el.height
      const spd = speedRef.current

      if (off.width !== W || off.height !== H) { off.width = W; off.height = H }

      offCtx.fillStyle = `rgba(0,0,0,${1 - Math.pow(1 - decayRef.current, frames)})`
      offCtx.fillRect(0, 0, W, H)

      particles.forEach((p, i) => {
        const nx = p.x * 0.006 + t * 0.12
        const ny = p.y * 0.006 + t * 0.08
        const angle = (vNoise(nx, ny) + vNoise(nx + 5.2, ny + 1.3)) * Math.PI * 3
        const px = p.x, py = p.y
        p.x += Math.cos(angle) * 1.4 * spd * frames
        p.y += Math.sin(angle) * 1.4 * spd * frames
        p.life++

        if (p.life > p.maxLife || p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
          particles[i] = spawn(); return
        }

        const a = Math.min(1, p.life / 25) * (1 - p.life / p.maxLife)
        offCtx.globalAlpha = a * 0.65
        offCtx.strokeStyle = `hsl(${p.hue} 75% 60%)`
        offCtx.lineWidth = 1
        offCtx.beginPath(); offCtx.moveTo(px, py); offCtx.lineTo(p.x, p.y); offCtx.stroke()
      })

      ctx.clearRect(0, 0, W, H)
      ctx.globalAlpha = 1
      ctx.drawImage(off, 0, 0)
      t += 0.006 * spd * frames
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `GodRays`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

export interface GodRaysProps {
  /** Ray colours, cycled across the fan */
  colors?: string[]
  /** Backdrop fill behind the rays */
  bgColor?: string
  /** Number of rays in the fan */
  rayCount?: number
  /** Light source position, 0–1 of the canvas box */
  originX?: number
  originY?: number
  /** Animation speed multiplier */
  speed?: number
  /** Radius of the core glow, as a fraction of the canvas diagonal */
  glow?: number
  className?: string
  style?: CSSProperties
}

const DEFAULT_COLORS = ['#ffc832', '#ff8a3d', '#ff4b82', '#ffe98a']

/**
 * God Rays — volumetric light shafts
 *
 * A fan of hard-edged wedges radiates from a light source, each breathing on
 * its own phase so the fan never pulses in unison. Drawn as wedge geometry
 * rather than per-pixel, so it stays cheap at full resolution.
 *
 * @example
 * <GodRays colors={['#ffc832', '#ff4b82']} rayCount={22} originY={0.15} speed={1} />
 */
export function GodRays({
  colors = DEFAULT_COLORS,
  bgColor = '#0b0616',
  rayCount = 20,
  originX = 0.5,
  originY = 0.18,
  speed = 1,
  glow = 0.32,
  className,
  style,
}: GodRaysProps) {
  const ref       = useRef<HTMLCanvasElement>(null)
  const colorsRef = useRef(colors)
  const bgRef     = useRef(bgColor)
  const countRef  = useRef(rayCount)
  const oxRef     = useRef(originX)
  const oyRef     = useRef(originY)
  const speedRef  = useRef(speed)
  const glowRef   = useRef(glow)

  useEffect(() => { colorsRef.current = colors    }, [colors])
  useEffect(() => { bgRef.current     = bgColor   }, [bgColor])
  useEffect(() => { countRef.current  = rayCount  }, [rayCount])
  useEffect(() => { oxRef.current     = originX   }, [originX])
  useEffect(() => { oyRef.current     = originY   }, [originY])
  useEffect(() => { speedRef.current  = speed     }, [speed])
  useEffect(() => { glowRef.current   = glow      }, [glow])

  useCanvasEffect(ref, (ctx, el) => {
    // Fixed per-ray character so rays keep their identity frame to frame.
    const seeds = Array.from({ length: 64 }, (_, i) => ({
      offset: Math.sin(i * 12.9898) * 0.5 + 0.5,
      width:  0.4 + (Math.sin(i * 78.233) * 0.5 + 0.5) * 1.4,
      pulse:  0.6 + (Math.sin(i * 39.425) * 0.5 + 0.5) * 1.8,
      phase:  i * 0.7,
    }))

    let t = 0

    return (_dt, frames) => {
      const W = el.width, H = el.height
      if (!W || !H) return

      const pal = colorsRef.current
      if (!pal.length) return
      const n = Math.max(1, Math.min(seeds.length, Math.round(countRef.current)))
      const cx = W * oxRef.current
      const cy = H * oyRef.current
      const reach = Math.hypot(W, H) * 1.2

      ctx.fillStyle = bgRef.current
      ctx.fillRect(0, 0, W, H)

      ctx.globalCompositeOperation = 'lighter'

      for (let i = 0; i < n; i++) {
        const s = seeds[i]
        const base = (i / n) * Math.PI * 2 + s.offset * 0.15
        const angle = base + Math.sin(t * 0.25 + s.phase) * 0.06
        const half = (s.width * 0.5 * Math.PI) / n
        // Each ray breathes independently; never fully off so the fan reads as a fan.
        const intensity = 0.28 + 0.72 * (0.5 + 0.5 * Math.sin(t * s.pulse + s.phase))

        const grad = ctx.createLinearGradient(cx, cy, cx + Math.cos(angle) * reach, cy + Math.sin(angle) * reach)
        const col = pal[i % pal.length]
        grad.addColorStop(0, col)
        grad.addColorStop(0.35, col)
        grad.addColorStop(1, 'rgba(0,0,0,0)')

        ctx.globalAlpha = intensity * 0.5
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + Math.cos(angle - half) * reach, cy + Math.sin(angle - half) * reach)
        ctx.lineTo(cx + Math.cos(angle + half) * reach, cy + Math.sin(angle + half) * reach)
        ctx.closePath()
        ctx.fill()
      }

      // Core bloom sits on top of the wedges so the source reads as the origin.
      const r = Math.hypot(W, H) * glowRef.current
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(1, r))
      core.addColorStop(0, pal[0])
      core.addColorStop(0.4, `${pal[0]}66`)
      core.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.globalAlpha = 0.9
      ctx.fillStyle = core
      ctx.fillRect(0, 0, W, H)

      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'

      t += 0.014 * speedRef.current * frames
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `GravityWells`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

export interface GravityWellsProps {
  /** Number of gravitational attractors */
  wellCount?: number
  /** Number of orbiting particles */
  particleCount?: number
  /** Palette for particles — cycles through array */
  colors?: string[]
  /** Animation speed multiplier */
  speed?: number
  className?: string
  style?: CSSProperties
}

const DEFAULT_COLORS = ['#ff6b6b', '#51cf66', '#339af0', '#fcc419', '#cc5de8']

/**
 * GravityWells — Orbital particle physics
 *
 * Particles orbit drifting gravitational attractors, leaving fading
 * trails that form accretion-disk spirals. Each particle spawns in a
 * tangential orbit around the nearest well and slowly spirals inward
 * due to light friction, producing layered colored swirls.
 *
 * @example
 * <GravityWells wellCount={3} particleCount={180} speed={1} />
 */
export function GravityWells({
  wellCount = 3,
  particleCount = 180,
  colors = DEFAULT_COLORS,
  speed = 1,
  className,
  style,
}: GravityWellsProps) {
  const ref          = useRef<HTMLCanvasElement>(null)
  const wellRef      = useRef(wellCount)
  const countRef     = useRef(particleCount)
  const colorsRef    = useRef(colors)
  const speedRef     = useRef(speed)

  useEffect(() => { wellRef.current   = wellCount     }, [wellCount])
  useEffect(() => { countRef.current  = particleCount }, [particleCount])
  useEffect(() => { colorsRef.current = colors        }, [colors])
  useEffect(() => { speedRef.current  = speed         }, [speed])

  useCanvasEffect(ref, (ctx, el) => {
    type Well = { x: number; y: number; vx: number; vy: number; mass: number }
    type Particle = {
      x: number; y: number; px: number; py: number
      vx: number; vy: number; color: string; life: number; maxLife: number
    }
    let wells: Well[] = []
    let particles: Particle[] = []

    const off    = document.createElement('canvas')
    const offCtx = off.getContext('2d')
    if (!offCtx) return

    const initWells = () => {
      const W = el.width, H = el.height
      wells = Array.from({ length: wellRef.current }, () => ({
        x:  W * (0.2 + Math.random() * 0.6),
        y:  H * (0.2 + Math.random() * 0.6),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        mass: 400 + Math.random() * 300,
      }))
    }

    // Spawn particle in tangential orbit around a random well
    const spawnParticle = (): Particle => {
      const cls = colorsRef.current
      const w = wells[Math.floor(Math.random() * wells.length)]
      const orbitR = 60 + Math.random() * 180
      const angle = Math.random() * Math.PI * 2
      const x = w.x + Math.cos(angle) * orbitR
      const y = w.y + Math.sin(angle) * orbitR

      // Tangential velocity for roughly circular orbit
      const tangentSpeed = Math.sqrt(w.mass / orbitR) * (0.7 + Math.random() * 0.6)
      const dir = Math.random() < 0.5 ? 1 : -1 // random orbit direction
      const vx = -Math.sin(angle) * tangentSpeed * dir
      const vy =  Math.cos(angle) * tangentSpeed * dir

      return {
        x, y, px: x, py: y, vx, vy,
        color: cls[Math.floor(Math.random() * cls.length)],
        life: 0,
        maxLife: 400 + Math.random() * 500,
      }
    }

    const init = () => {
      initWells()
      particles = Array.from({ length: countRef.current }, spawnParticle)
    }


    let lastW = 0, lastH = 0
    return (_dt, frames) => {
      if (el.width !== lastW || el.height !== lastH) {
        lastW = el.width; lastH = el.height
        init()
      }
      const W = el.width, H = el.height
      const spd = speedRef.current

      if (off.width !== W || off.height !== H) { off.width = W; off.height = H }

      // Fade trail — moderate speed for visible spiral tails
      offCtx.fillStyle = `rgba(0,0,0,${1 - Math.pow(1 - 0.035, frames)})`
      offCtx.fillRect(0, 0, W, H)

      // Drift wells slowly
      wells.forEach(w => {
        w.x += w.vx * spd * frames
        w.y += w.vy * spd * frames
        if (w.x < W * 0.15 || w.x > W * 0.85) w.vx *= -1
        if (w.y < H * 0.15 || w.y > H * 0.85) w.vy *= -1
      })

      // Update & draw particles
      particles.forEach((p, i) => {
        p.px = p.x
        p.py = p.y

        // Gravitational pull from each well
        wells.forEach(w => {
          const dx = w.x - p.x, dy = w.y - p.y
          const distSq = dx * dx + dy * dy
          const dist = Math.sqrt(distSq) + 50 // softening
          const force = w.mass / (dist * dist)
          p.vx += (dx / dist) * force * 0.08 * spd * frames
          p.vy += (dy / dist) * force * 0.08 * spd * frames
        })

        // Light friction — causes gradual spiral inward
        p.vx *= 0.998
        p.vy *= 0.998

        // Soft velocity cap
        const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (vel > 6) {
          p.vx *= 6 / vel
          p.vy *= 6 / vel
        }

        p.x += p.vx * spd * frames
        p.y += p.vy * spd * frames
        p.life++

        // Respawn if out of bounds, too old, or collapsed into a well
        const nearWell = wells.some(w => {
          const dx = w.x - p.x, dy = w.y - p.y
          return dx * dx + dy * dy < 100
        })

        if (p.x < -80 || p.x > W + 80 || p.y < -80 || p.y > H + 80
          || p.life > p.maxLife || nearWell) {
          particles[i] = spawnParticle()
          return
        }

        // Draw trail segment (line from previous to current position)
        const fadeIn = Math.min(1, p.life / 30)
        const fadeOut = 1 - p.life / p.maxLife
        const a = fadeIn * fadeOut * 0.75

        offCtx.globalAlpha = a
        offCtx.strokeStyle = p.color
        offCtx.lineWidth = 1.6
        offCtx.beginPath()
        offCtx.moveTo(p.px, p.py)
        offCtx.lineTo(p.x, p.y)
        offCtx.stroke()
      })

      // Draw well glow
      wells.forEach(w => {
        const grad = offCtx.createRadialGradient(w.x, w.y, 0, w.x, w.y, 55)
        grad.addColorStop(0, 'rgba(255,255,255,0.12)')
        grad.addColorStop(0.4, 'rgba(255,255,255,0.04)')
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        offCtx.globalAlpha = 1
        offCtx.fillStyle = grad
        offCtx.beginPath()
        offCtx.arc(w.x, w.y, 55, 0, Math.PI * 2)
        offCtx.fill()
      })

      ctx.clearRect(0, 0, W, H)
      ctx.globalAlpha = 1
      ctx.drawImage(off, 0, 0)
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `Halftone`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

export interface HalftoneProps {
  /** Dot color */
  color?: string
  /** Background color */
  bgColor?: string
  /** Distance between dot centers in px */
  gap?: number
  /** Maximum dot radius as a fraction of gap (0–1) */
  maxScale?: number
  /** Animation speed multiplier */
  speed?: number
  className?: string
  style?: CSSProperties
}

/**
 * Halftone — print-style dot field
 *
 * A grid of dots whose radii track a drifting brightness field, recreating
 * the newspaper / comic-book halftone look. The cursor brightens nearby dots,
 * pushing the pattern outward like a spotlight.
 *
 * @example
 * <Halftone color="#111111" bgColor="#facc15" gap={18} maxScale={0.75} speed={1} />
 */
export function Halftone({
  color = '#111111',
  bgColor = '#facc15',
  gap = 18,
  maxScale = 0.75,
  speed = 1,
  className,
  style,
}: HalftoneProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef(color)
  const bgRef = useRef(bgColor)
  const gapRef = useRef(gap)
  const scaleRef = useRef(maxScale)
  const speedRef = useRef(speed)

  useEffect(() => { colorRef.current = color }, [color])
  useEffect(() => { bgRef.current = bgColor }, [bgColor])
  useEffect(() => { gapRef.current = gap }, [gap])
  useEffect(() => { scaleRef.current = maxScale }, [maxScale])
  useEffect(() => { speedRef.current = speed }, [speed])

  useCanvasEffect(ref, (ctx, el, signal) => {
    // Backing-store pixels per CSS pixel (reflects the maxPixelCount clamp).
    const scale = () => (el.offsetWidth ? el.width / el.offsetWidth : 1)

    // Cursor in device pixels; off-screen until the pointer moves.
    const mouse = { x: -1e4, y: -1e4 }
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) * scale()
      mouse.y = (e.clientY - rect.top) * scale()
    }
    const onLeave = () => { mouse.x = -1e4; mouse.y = -1e4 }
    el.addEventListener('pointermove', onMove, { signal })
    el.addEventListener('pointerleave', onLeave, { signal })


    let t = 0
    return (_dt, frames) => {
      const W = el.width, H = el.height
      const GAP = Math.max(6, gapRef.current * scale())
      const maxR = (GAP / 2) * scaleRef.current
      const reach = GAP * 5
      ctx.fillStyle = bgRef.current
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = colorRef.current

      const cols = Math.ceil(W / GAP) + 1
      const rows = Math.ceil(H / GAP) + 1
      for (let c = 0; c < cols; c++) {
        const cx = c * GAP + GAP / 2
        for (let r = 0; r < rows; r++) {
          const cy = r * GAP + GAP / 2
          let v =
            (Math.sin(cx * 0.01 + t) +
              Math.sin(cy * 0.013 - t * 0.8) +
              Math.sin((cx + cy) * 0.008 + t * 1.3)) /
              6 +
            0.5
          const d = Math.hypot(cx - mouse.x, cy - mouse.y)
          if (d < reach) v += (1 - d / reach) * 0.9
          const rad = Math.max(0, Math.min(1, v)) * maxR
          if (rad < 0.4) continue
          ctx.beginPath()
          ctx.arc(cx, cy, rad, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      t += 0.02 * speedRef.current * frames
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `Lightning`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

export interface LightningProps {
  /** Primary bolt color */
  color?: string
  /** Seconds between new bolts */
  boltInterval?: number
  /** Max branch depth per bolt */
  branches?: number
  /** Animation speed multiplier */
  speed?: number
  className?: string
  style?: CSSProperties
}

/**
 * Lightning — Fractal electric arcs
 *
 * Branching lightning bolts strike between random anchor points with
 * recursive midpoint-displacement subdivision, glow bloom, and
 * progressive fade-out. New bolts spawn at a configurable interval.
 *
 * @example
 * <Lightning color="#7df9ff" boltInterval={1.2} branches={4} speed={1} />
 */
export function Lightning({
  color = '#7df9ff',
  boltInterval = 1.2,
  branches = 4,
  speed = 1,
  className,
  style,
}: LightningProps) {
  const ref          = useRef<HTMLCanvasElement>(null)
  const colorRef     = useRef(color)
  const intervalRef  = useRef(boltInterval)
  const branchRef    = useRef(branches)
  const speedRef     = useRef(speed)

  useEffect(() => { colorRef.current    = color        }, [color])
  useEffect(() => { intervalRef.current = boltInterval }, [boltInterval])
  useEffect(() => { branchRef.current   = branches     }, [branches])
  useEffect(() => { speedRef.current    = speed        }, [speed])

  useCanvasEffect(ref, (ctx, el) => {

    // Midpoint displacement — creates jagged bolt path
    function subdivide(
      x1: number, y1: number, x2: number, y2: number,
      depth: number, jitter: number,
    ): Array<{ x: number; y: number }> {
      if (depth === 0) return [{ x: x1, y: y1 }, { x: x2, y: y2 }]
      const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * jitter
      const my = (y1 + y2) / 2 + (Math.random() - 0.5) * jitter
      const left  = subdivide(x1, y1, mx, my, depth - 1, jitter * 0.55)
      const right = subdivide(mx, my, x2, y2, depth - 1, jitter * 0.55)
      return [...left, ...right.slice(1)]
    }

    type Bolt = {
      segments: Array<{ x: number; y: number }>[]
      alpha: number
      width: number
      color: string
    }

    let bolts: Bolt[] = []
    let timer = 0

    function spawnBolt() {
      const W = el!.width, H = el!.height
      const col = colorRef.current
      const maxBranch = branchRef.current

      // Main trunk — top to bottom with some horizontal variance
      const x1 = W * (0.2 + Math.random() * 0.6)
      const y1 = H * 0.02
      const x2 = W * (0.15 + Math.random() * 0.7)
      const y2 = H * (0.85 + Math.random() * 0.13)

      const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
      const trunk = subdivide(x1, y1, x2, y2, 7, dist * 0.18)

      const allSegments: Array<{ x: number; y: number }>[] = [trunk]

      // Branches fork off the main trunk
      const branchCount = 2 + Math.floor(Math.random() * maxBranch)
      for (let b = 0; b < branchCount; b++) {
        const idx = Math.floor(trunk.length * (0.15 + Math.random() * 0.6))
        const origin = trunk[idx]
        const angle = (Math.random() - 0.5) * 1.6 + Math.PI * 0.5
        const len = dist * (0.15 + Math.random() * 0.25)
        const ex = origin.x + Math.cos(angle) * len
        const ey = origin.y + Math.sin(angle) * len
        allSegments.push(subdivide(origin.x, origin.y, ex, ey, 5, len * 0.22))
      }

      bolts.push({ segments: allSegments, alpha: 1.2, width: 2.5, color: col })
    }

    return (_dt, frames) => {
      const W = el.width, H = el.height
      const spd = speedRef.current

      // Darken background — fast fade for electric feel
      ctx.fillStyle = 'rgba(5,2,15,0.25)'
      ctx.fillRect(0, 0, W, H)

      // Spawn timer
      timer += 0.016 * spd * frames
      if (timer >= intervalRef.current) {
        spawnBolt()
        timer = 0
      }

      // Draw & age bolts
      bolts = bolts.filter(bolt => {
        bolt.alpha -= 0.018 * spd
        if (bolt.alpha <= 0) return false

        const a = Math.min(1, bolt.alpha)

        bolt.segments.forEach((seg, si) => {
          const isTrunk = si === 0
          const lw = isTrunk ? bolt.width : bolt.width * 0.5

          // Glow layer
          ctx.beginPath()
          seg.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
          ctx.strokeStyle = bolt.color
          ctx.lineWidth = lw + 6
          ctx.globalAlpha = a * 0.15
          ctx.shadowColor = bolt.color
          ctx.shadowBlur = 25
          ctx.stroke()

          // Core layer
          ctx.beginPath()
          seg.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
          ctx.strokeStyle = bolt.color
          ctx.lineWidth = lw
          ctx.globalAlpha = a * 0.85
          ctx.shadowBlur = 12
          ctx.stroke()

          // Hot white center for trunk
          if (isTrunk) {
            ctx.beginPath()
            seg.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
            ctx.strokeStyle = '#ffffff'
            ctx.lineWidth = lw * 0.35
            ctx.globalAlpha = a * 0.7
            ctx.shadowBlur = 4
            ctx.stroke()
          }
        })

        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
        return true
      })

    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `LissajousGrid`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

export interface LissajousGridProps {
  /** Number of columns (x-frequency range 1..cols) */
  cols?: number
  /** Number of rows (y-frequency range 1..rows) */
  rows?: number
  /** Phase drift speed multiplier */
  speed?: number
  /** Starting hue for the color gradient (0–360) */
  hueStart?: number
  /** Line opacity (0–1) */
  opacity?: number
  className?: string
  style?: CSSProperties
}

/**
 * LissajousGrid — Parametric curve table
 *
 * A grid of Lissajous figures where column index sets the x-frequency
 * and row index sets the y-frequency. A slowly drifting phase makes all
 * curves morph together, creating a mesmerising synchronised animation.
 *
 * @example
 * <LissajousGrid cols={4} rows={3} speed={1} hueStart={30} opacity={0.72} />
 */
export function LissajousGrid({
  cols = 4,
  rows = 3,
  speed = 1,
  hueStart = 30,
  opacity = 0.72,
  className,
  style,
}: LissajousGridProps) {
  const ref         = useRef<HTMLCanvasElement>(null)
  const colsRef     = useRef(cols)
  const rowsRef     = useRef(rows)
  const speedRef    = useRef(speed)
  const hueRef      = useRef(hueStart)
  const opacityRef  = useRef(opacity)

  useEffect(() => { colsRef.current    = cols      }, [cols])
  useEffect(() => { rowsRef.current    = rows      }, [rows])
  useEffect(() => { speedRef.current   = speed     }, [speed])
  useEffect(() => { hueRef.current     = hueStart  }, [hueStart])
  useEffect(() => { opacityRef.current = opacity   }, [opacity])

  useCanvasEffect(ref, (ctx, el) => {

    const STEPS = 700
    let phase = 0

    return (_dt, frames) => {
      const W = el.width, H = el.height
      const C = colsRef.current, R = rowsRef.current
      ctx.clearRect(0, 0, W, H)
      const cw = W / C, ch = H / R

      for (let row = 0; row < R; row++) {
        for (let col = 0; col < C; col++) {
          const fx = col + 1, fy = row + 1
          const cx = (col + 0.5) * cw, cy = (row + 0.5) * ch
          const rx = cw / 2 - 10, ry = ch / 2 - 10
          const period = Math.PI * 2 * fx * fy

          ctx.beginPath()
          for (let i = 0; i <= STEPS; i++) {
            const t = (i / STEPS) * period
            const x = cx + rx * Math.sin(fx * t + phase)
            const y = cy + ry * Math.sin(fy * t)
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          const hue = hueRef.current + ((col * R + row) / (C * R)) * 280
          ctx.strokeStyle = `hsla(${hue % 360}, 85%, 62%, ${opacityRef.current})`
          ctx.lineWidth = 1.1
          ctx.stroke()

          ctx.strokeStyle = 'rgba(255,255,255,0.04)'
          ctx.lineWidth = 0.5
          ctx.strokeRect(col * cw + 0.5, row * ch + 0.5, cw - 1, ch - 1)
        }
      }

      phase += 0.007 * speedRef.current * frames
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `MatrixRain`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

export interface MatrixRainProps {
  /** Color of the bright head square */
  headColor?: string
  /** Base hue (0–360) for the falling trail (uses HSL) */
  trailHue?: number
  /** Column width in px */
  gap?: number
  /** Fall speed multiplier */
  speed?: number
  /** Number of squares in each column's tail */
  tailLength?: number
  className?: string
  style?: CSSProperties
}

/**
 * MatrixRain — Falling column simulation
 *
 * Each column has a bright head and a fading tail. Head color, trail
 * hue, column width, speed, and tail length are all configurable.
 *
 * @example
 * <MatrixRain headColor="#ffffff" trailHue={120} gap={16} speed={1} tailLength={10} />
 */
export function MatrixRain({
  headColor = '#ffffff',
  trailHue = 120,
  gap = 16,
  speed = 1,
  tailLength = 10,
  className,
  style,
}: MatrixRainProps) {
  const ref          = useRef<HTMLCanvasElement>(null)
  const headColorRef = useRef(headColor)
  const trailHueRef  = useRef(trailHue)
  const gapRef       = useRef(gap)
  const speedRef     = useRef(speed)
  const tailRef      = useRef(tailLength)

  useEffect(() => { headColorRef.current = headColor  }, [headColor])
  useEffect(() => { trailHueRef.current  = trailHue   }, [trailHue])
  useEffect(() => { gapRef.current       = gap        }, [gap])
  useEffect(() => { speedRef.current     = speed      }, [speed])
  useEffect(() => { tailRef.current      = tailLength }, [tailLength])

  useCanvasEffect(ref, (ctx, el) => {
    const cols: number[] = []

    return (_dt, frames) => {
      const GAP  = gapRef.current
      const TAIL = tailRef.current
      const W = el.width, H = el.height
      // Compounded over the frame delta so trail length is refresh-rate independent.
      ctx.fillStyle = `rgba(0,0,0,${1 - Math.pow(1 - 0.18, frames)})`
      ctx.fillRect(0, 0, W, H)
      const rows = Math.ceil(H / GAP), size = GAP - 3

      // Adjust column array width if needed
      const needed = Math.ceil(W / Math.max(1, GAP))
      while (cols.length < needed) cols.push(-Math.floor(Math.random() * 12))
      if (cols.length > needed) cols.length = needed

      cols.forEach((head, c) => {
        for (let i = 0; i < TAIL; i++) {
          const row = Math.floor(head) - i
          if (row < 0 || row > rows) continue
          const bright = 1 - i / TAIL
          ctx.globalAlpha = bright
          ctx.fillStyle = i === 0
            ? headColorRef.current
            : `hsl(${trailHueRef.current} 100% ${28 + bright * 28}%)`
          ctx.fillRect(c * GAP + 1, row * GAP + 1, size, size)
        }
        cols[c] = head >= rows + TAIL ? -Math.floor(Math.random() * 12) : head + 0.28 * speedRef.current * frames
      })

      ctx.globalAlpha = 1
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', background: '#000', ...style }}
    />
  )
}
```

---

## Effect: `MeshGradient`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export interface MeshGradientProps {
  /** Colour stops. Each becomes a drifting control point (2–8 works best). */
  colors?: string[]
  /** Animation speed multiplier */
  speed?: number
  /** How far control points wander from their anchor, 0–1 */
  distortion?: number
  /**
   * Posterise the blend into N hard bands. 0 keeps the gradient smooth;
   * 5–10 gives the stepped, screen-printed look.
   */
  steps?: number
  /** Film-grain strength over the top, 0–1 */
  grain?: number
  className?: string
  style?: CSSProperties
}

const DEFAULT_COLORS = ['#ff4b82', '#ffc832', '#00d2dc', '#241d9a']

/**
 * Mesh Gradient — drifting colour field
 *
 * Each colour owns a control point that wanders on its own Lissajous path.
 * Every pixel is an inverse-distance weighted blend of all of them,
 * optionally quantised into hard bands for a screen-printed finish.
 *
 * @example
 * <MeshGradient colors={['#ff4b82', '#ffc832', '#00d2dc']} steps={6} speed={1} />
 */
export function MeshGradient({
  colors = DEFAULT_COLORS,
  speed = 1,
  distortion = 0.55,
  steps = 0,
  grain = 0.12,
  className,
  style,
}: MeshGradientProps) {
  const ref         = useRef<HTMLCanvasElement>(null)
  const colorsRef   = useRef(colors)
  const speedRef    = useRef(speed)
  const distortRef  = useRef(distortion)
  const stepsRef    = useRef(steps)
  const grainRef    = useRef(grain)

  useEffect(() => { colorsRef.current  = colors     }, [colors])
  useEffect(() => { speedRef.current   = speed      }, [speed])
  useEffect(() => { distortRef.current = distortion }, [distortion])
  useEffect(() => { stepsRef.current   = steps      }, [steps])
  useEffect(() => { grainRef.current   = grain      }, [grain])

  useCanvasEffect(ref, (ctx, el) => {
    // Per-pixel work, so render at 1/SCALE and upscale — same trick as Plasma.
    const SCALE = 4
    const off = document.createElement('canvas')
    const offCtx = off.getContext('2d')
    if (!offCtx) return

    // Each control point gets its own frequency pair so the mesh never
    // settles into a visible loop.
    const anchors = Array.from({ length: 8 }, (_, i) => ({
      ax: 0.5 + 0.34 * Math.cos((i / 8) * Math.PI * 2),
      ay: 0.5 + 0.34 * Math.sin((i / 8) * Math.PI * 2),
      fx: 0.7 + i * 0.13,
      fy: 0.9 + i * 0.11,
      ph: i * 1.7,
    }))

    let t = 0

    return (_dt, frames) => {
      const W = el.width, H = el.height
      if (!W || !H) return

      const pal = colorsRef.current.map(hexToRgb)
      if (!pal.length) return
      const dist = distortRef.current
      const bands = Math.max(0, Math.round(stepsRef.current))
      const grainAmt = grainRef.current

      const iw = Math.max(1, Math.ceil(W / SCALE))
      const ih = Math.max(1, Math.ceil(H / SCALE))
      if (off.width !== iw || off.height !== ih) { off.width = iw; off.height = ih }

      // Current control-point positions in 0..1 space.
      const pts = pal.map((rgb, i) => {
        const a = anchors[i % anchors.length]
        return {
          x: a.ax + dist * 0.3 * Math.sin(t * a.fx + a.ph),
          y: a.ay + dist * 0.3 * Math.cos(t * a.fy + a.ph * 1.3),
          rgb,
        }
      })

      const img = offCtx.createImageData(iw, ih)
      const d = img.data

      for (let py = 0; py < ih; py++) {
        const v = py / ih
        for (let px = 0; px < iw; px++) {
          const u = px / iw
          let wr = 0, wg = 0, wb = 0, wsum = 0

          for (let k = 0; k < pts.length; k++) {
            const p = pts[k]
            const dx = u - p.x, dy = v - p.y
            // Inverse *fourth* power, not square: with squared falloff every point
            // contributes everywhere and the field washes out to grey.
            // +1e-4 keeps the weight finite when a pixel lands on a point.
            const d2 = dx * dx + dy * dy
            const w = 1 / (d2 * d2 + 1e-4)
            wr += p.rgb[0] * w; wg += p.rgb[1] * w; wb += p.rgb[2] * w
            wsum += w
          }

          let r = wr / wsum, g = wg / wsum, b = wb / wsum

          if (bands > 0) {
            const q = 255 / bands
            r = Math.round(r / q) * q
            g = Math.round(g / q) * q
            b = Math.round(b / q) * q
          }

          const i = (py * iw + px) * 4
          d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = 255
        }
      }

      offCtx.putImageData(img, 0, 0)
      ctx.clearRect(0, 0, W, H)
      // Smoothing off keeps band edges crisp when posterised.
      ctx.imageSmoothingEnabled = bands === 0
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(off, 0, 0, W, H)

      if (grainAmt > 0) {
        ctx.globalAlpha = grainAmt * 0.5
        ctx.fillStyle = '#000'
        for (let i = 0; i < 900; i++) {
          ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2)
        }
        ctx.globalAlpha = 1
      }

      t += 0.012 * speedRef.current * frames
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `Metaballs`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export interface MetaballsProps {
  /** Colors for each blob — array length sets the blob count */
  colors?: string[]
  /** Average blob radius in px */
  blobRadius?: number
  /** Movement speed multiplier */
  speed?: number
  className?: string
  style?: CSSProperties
}

const DEFAULT_COLORS = ['#ff5050', '#3cb9ff', '#ffc32d', '#aa4bff', '#37ff96']

/**
 * Metaballs — Organic blob merging
 *
 * Colored blobs move around the canvas and merge smoothly when close,
 * using the classic `r²/d²` scalar field threshold. Rendered at 1/3
 * resolution and scaled up for performance.
 *
 * @example
 * <Metaballs colors={['#ff5050', '#3cb9ff', '#ffc32d']} blobRadius={70} speed={1} />
 */
export function Metaballs({
  colors = DEFAULT_COLORS,
  blobRadius = 70,
  speed = 1,
  className,
  style,
}: MetaballsProps) {
  const ref        = useRef<HTMLCanvasElement>(null)
  const colorsRef  = useRef(colors)
  const radiusRef  = useRef(blobRadius)
  const speedRef   = useRef(speed)

  useEffect(() => { colorsRef.current = colors     }, [colors])
  useEffect(() => { radiusRef.current = blobRadius }, [blobRadius])
  useEffect(() => { speedRef.current  = speed      }, [speed])

  useCanvasEffect(ref, (ctx, el) => {
    const SCALE = 3
    type Ball = { x: number; y: number; vx: number; vy: number; r: number; rgb: [number, number, number] }
    let balls: Ball[] = []

    const init = () => {
      const rgbs = colorsRef.current.map(hexToRgb)
      balls = rgbs.map(rgb => ({
        x:  el.width  * (0.2 + Math.random() * 0.6),
        y:  el.height * (0.2 + Math.random() * 0.6),
        vx: (Math.random() - 0.5) * 1.3,
        vy: (Math.random() - 0.5) * 1.3,
        r:  radiusRef.current * (0.8 + Math.random() * 0.4),
        rgb,
      }))
    }


    const off    = document.createElement('canvas')
    const offCtx = off.getContext('2d')
    if (!offCtx) return

    let lastW = 0, lastH = 0
    return (_dt, frames) => {
      if (el.width !== lastW || el.height !== lastH) {
        lastW = el.width; lastH = el.height
        init()
      }
      const W = el.width, H = el.height
      const spd = speedRef.current
      const iw = Math.ceil(W / SCALE), ih = Math.ceil(H / SCALE)
      if (off.width !== iw || off.height !== ih) { off.width = iw; off.height = ih }

      balls.forEach(b => {
        b.x += b.vx * spd * frames; b.y += b.vy * spd * frames
        if (b.x < 0 || b.x > W) b.vx *= -1
        if (b.y < 0 || b.y > H) b.vy *= -1
      })

      const img = offCtx.createImageData(iw, ih)
      const d = img.data

      for (let py = 0; py < ih; py++) {
        for (let px = 0; px < iw; px++) {
          const wx = px * SCALE, wy = py * SCALE
          let total = 0, wr = 0, wg = 0, wb = 0
          balls.forEach(b => {
            const dx = wx - b.x, dy = wy - b.y
            const v = b.r * b.r / (dx * dx + dy * dy + 1)
            total += v; wr += b.rgb[0] * v; wg += b.rgb[1] * v; wb += b.rgb[2] * v
          })
          if (total > 0.25) {
            const i = (py * iw + px) * 4
            const tt = total + 0.001
            d[i]   = wr / tt
            d[i+1] = wg / tt
            d[i+2] = wb / tt
            d[i+3] = Math.min(255, Math.round(((total - 0.25) / 0.75) * 245))
          }
        }
      }

      offCtx.putImageData(img, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(off, 0, 0, W, H)
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `MouseRipple`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

export interface MouseRippleProps {
  /** Dot fill color */
  color?: string
  /** Distance between dot centers in px */
  gap?: number
  /** Radius of the ripple influence zone in px */
  rippleRadius?: number
  /** Ripple wave speed multiplier */
  speed?: number
  className?: string
  style?: CSSProperties
}

/**
 * MouseRipple — Interactive dot-grid ripple
 *
 * Move the mouse over the canvas to send a sine ripple through
 * the dot grid. Dots outside the cursor zone stay at rest.
 *
 * @example
 * <MouseRipple color="#f59e0b" gap={24} rippleRadius={130} speed={1} />
 */
export function MouseRipple({
  color = '#f59e0b',
  gap = 24,
  rippleRadius = 130,
  speed = 1,
  className,
  style,
}: MouseRippleProps) {
  const ref           = useRef<HTMLCanvasElement>(null)
  const mouse         = useRef({ x: -999, y: -999 })
  const colorRef      = useRef(color)
  const gapRef        = useRef(gap)
  const radiusRef     = useRef(rippleRadius)
  const speedRef      = useRef(speed)

  useEffect(() => { colorRef.current  = color        }, [color])
  useEffect(() => { gapRef.current    = gap          }, [gap])
  useEffect(() => { radiusRef.current = rippleRadius }, [rippleRadius])
  useEffect(() => { speedRef.current  = speed        }, [speed])

  useCanvasEffect(ref, (ctx, el, signal) => {

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    el.addEventListener('mousemove', onMove, { signal })

    let t = 0
    return (_dt, frames) => {
      const GAP = gapRef.current
      const W = el.offsetWidth, H = el.offsetHeight
      ctx.clearRect(0, 0, W, H)
      const cols = Math.ceil(W / GAP) + 1, rows = Math.ceil(H / GAP) + 1
      const { x: mx, y: my } = mouse.current
      const RAD = radiusRef.current

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * GAP + GAP / 2, cy = r * GAP + GAP / 2
          const dx = cx - mx, dy = cy - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          const ripple = Math.max(0, 1 - dist / RAD) * Math.sin(dist * 0.14 - t * 3.2)
          const size = Math.max(0, 3 + ripple * 9)
          ctx.globalAlpha = Math.max(0.1, Math.min(1, 0.25 + Math.abs(ripple) * 0.75))
          ctx.fillStyle = colorRef.current
          ctx.fillRect(cx - size / 2, cy - size / 2, size, size)
        }
      }

      ctx.globalAlpha = 1
      t += 0.06 * speedRef.current * frames
    }
    // Draws in CSS pixels; the scale transform is applied for us on resize.
  }, { coordinates: 'css' })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', cursor: 'crosshair', ...style }}
    />
  )
}
```

---

## Effect: `ParticleWeb`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

export interface ParticleWebProps {
  /** Number of floating particles */
  count?: number
  /** Particle dot color */
  particleColor?: string
  /** Connection line color */
  lineColor?: string
  /** Max distance (px) for drawing a connection */
  maxDistance?: number
  /** Particle movement speed multiplier */
  speed?: number
  className?: string
  style?: CSSProperties
}

/**
 * ParticleWeb — Proximity particle graph
 *
 * Particles float around the canvas; any two within `maxDistance`
 * are connected by a line whose opacity fades with distance.
 *
 * @example
 * <ParticleWeb count={60} particleColor="#818cf8" lineColor="#6366f1" maxDistance={110} speed={1} />
 */
export function ParticleWeb({
  count = 60,
  particleColor = '#818cf8',
  lineColor = '#6366f1',
  maxDistance = 110,
  speed = 1,
  className,
  style,
}: ParticleWebProps) {
  const ref              = useRef<HTMLCanvasElement>(null)
  const countRef         = useRef(count)
  const particleColorRef = useRef(particleColor)
  const lineColorRef     = useRef(lineColor)
  const maxDistRef       = useRef(maxDistance)
  const speedRef         = useRef(speed)

  useEffect(() => { countRef.current         = count         }, [count])
  useEffect(() => { particleColorRef.current = particleColor }, [particleColor])
  useEffect(() => { lineColorRef.current     = lineColor     }, [lineColor])
  useEffect(() => { maxDistRef.current       = maxDistance   }, [maxDistance])
  useEffect(() => { speedRef.current         = speed         }, [speed])

  useCanvasEffect(ref, (ctx, el) => {
    type P = { x: number; y: number; vx: number; vy: number }
    let pts: P[] = []

    const init = () => {
      const n = countRef.current
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * el.width, y: Math.random() * el.height,
        vx: (Math.random() - 0.5) * 0.9, vy: (Math.random() - 0.5) * 0.9,
      }))
    }


    let lastW = 0, lastH = 0
    return (_dt, frames) => {
      if (el.width !== lastW || el.height !== lastH) {
        lastW = el.width; lastH = el.height
        init()
      }
      const W = el.width, H = el.height
      const spd = speedRef.current, MD = maxDistRef.current
      ctx.clearRect(0, 0, W, H)

      pts.forEach(p => {
        p.x += p.vx * spd * frames; p.y += p.vy * spd * frames
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
      })

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MD) {
            const a = 1 - d / MD
            ctx.globalAlpha = a * 0.55
            ctx.strokeStyle = lineColorRef.current
            ctx.lineWidth = a * 1.5
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      pts.forEach(p => {
        ctx.fillStyle = particleColorRef.current
        ctx.fillRect(p.x - 3, p.y - 3, 6, 6)
      })

    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `Plasma`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export interface PlasmaProps {
  /**
   * Color palette as an array of hex stops (min 2, max unlimited).
   * Values map evenly from 0 → 1 across the interference range.
   */
  palette?: string[]
  /** Animation speed multiplier */
  speed?: number
  className?: string
  style?: CSSProperties
}

const DEFAULT_PALETTE = [
  '#0a1450', '#1e64c8', '#00d2dc',
  '#5affa6', '#ffc832', '#ff4b82', '#a01ec8',
]

/**
 * Plasma — Circular wave interference
 *
 * Four wave sources drift around the canvas. Each pixel's value is the
 * sum of sine waves from every source; the result maps to a full-color
 * palette via linear interpolation.
 *
 * @example
 * <Plasma palette={['#0a1450', '#00d2dc', '#ffc832', '#ff4b82']} speed={1} />
 */
export function Plasma({
  palette = DEFAULT_PALETTE,
  speed = 1,
  className,
  style,
}: PlasmaProps) {
  const ref        = useRef<HTMLCanvasElement>(null)
  const paletteRef = useRef(palette)
  const speedRef   = useRef(speed)

  useEffect(() => { paletteRef.current = palette }, [palette])
  useEffect(() => { speedRef.current   = speed   }, [speed])

  useCanvasEffect(ref, (ctx, el) => {
    type Src = { x: number; y: number; vx: number; vy: number; freq: number; spd: number }
    const sources: Src[] = [
      { x: 0.30, y: 0.30, vx:  0.0009, vy:  0.0006, freq: 0.11, spd:  1.8 },
      { x: 0.70, y: 0.30, vx: -0.0006, vy:  0.0009, freq: 0.09, spd: -2.2 },
      { x: 0.50, y: 0.72, vx:  0.0010, vy: -0.0007, freq: 0.13, spd:  1.5 },
      { x: 0.20, y: 0.65, vx: -0.0008, vy:  0.0011, freq: 0.08, spd: -1.9 },
    ]

    const SCALE  = 3
    const off    = document.createElement('canvas')
    const offCtx = off.getContext('2d')
    if (!offCtx) return
    let t = 0

    return (_dt, frames) => {
      const W = el.width, H = el.height
      if (!W || !H) return
      const spd = speedRef.current
      const pal = paletteRef.current.map(hexToRgb)

      const colorAt = (n: number): [number, number, number] => {
        if (pal.length < 2) return pal[0] ?? [0, 0, 0]
        const s = pal.length - 1
        const i = Math.min(s - 1, Math.floor(n * s))
        const f = n * s - i
        const a = pal[i], b = pal[i + 1]
        return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]
      }

      const iw = Math.ceil(W / SCALE), ih = Math.ceil(H / SCALE)
      if (off.width !== iw || off.height !== ih) { off.width = iw; off.height = ih }

      sources.forEach(s => {
        s.x += s.vx * spd * frames; s.y += s.vy * spd * frames
        if (s.x < 0 || s.x > 1) s.vx *= -1
        if (s.y < 0 || s.y > 1) s.vy *= -1
      })

      const img = offCtx.createImageData(iw, ih)
      const dd = img.data

      for (let py = 0; py < ih; py++) {
        for (let px = 0; px < iw; px++) {
          const wx = px / iw, wy = py / ih
          let v = 0
          sources.forEach(s => {
            const dx = (wx - s.x) * W, dy = (wy - s.y) * H
            v += Math.sin(Math.sqrt(dx * dx + dy * dy) * s.freq + t * s.spd)
          })
          const n = Math.max(0, Math.min(1, (v + 4) / 8))
          const [r, g, b] = colorAt(n)
          const i = (py * iw + px) * 4
          dd[i] = r; dd[i+1] = g; dd[i+2] = b; dd[i+3] = 255
        }
      }

      offCtx.putImageData(img, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(off, 0, 0, W, H)
      t += 0.045 * spd * frames
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `PulsingBorder`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

export interface PulsingBorderProps {
  /** Colours of the travelling light spots */
  colors?: string[]
  /** Fill inside the frame */
  bgColor?: string
  /** Border thickness in CSS pixels */
  thickness?: number
  /** Number of light spots travelling the perimeter */
  spots?: number
  /** Animation speed multiplier */
  speed?: number
  /** Glow bleed in CSS pixels */
  bloom?: number
  className?: string
  style?: CSSProperties
}

const DEFAULT_COLORS = ['#ff4b82', '#ffc832', '#00d2dc', '#7df9ff']

/**
 * Pulsing Border — travelling light around a frame
 *
 * Light spots orbit the perimeter and bleed inward, leaving the centre clear
 * for content. Built for a border-first design system: drop it behind a card
 * and the frame itself becomes the animation.
 *
 * @example
 * <PulsingBorder colors={['#ff4b82', '#00d2dc']} thickness={6} spots={4} />
 */
export function PulsingBorder({
  colors = DEFAULT_COLORS,
  bgColor = '#080808',
  thickness = 5,
  spots = 4,
  speed = 1,
  bloom = 26,
  className,
  style,
}: PulsingBorderProps) {
  const ref        = useRef<HTMLCanvasElement>(null)
  const colorsRef  = useRef(colors)
  const bgRef      = useRef(bgColor)
  const thickRef   = useRef(thickness)
  const spotsRef   = useRef(spots)
  const speedRef   = useRef(speed)
  const bloomRef   = useRef(bloom)

  useEffect(() => { colorsRef.current = colors    }, [colors])
  useEffect(() => { bgRef.current     = bgColor   }, [bgColor])
  useEffect(() => { thickRef.current  = thickness }, [thickness])
  useEffect(() => { spotsRef.current  = spots     }, [spots])
  useEffect(() => { speedRef.current  = speed     }, [speed])
  useEffect(() => { bloomRef.current  = bloom     }, [bloom])

  useCanvasEffect(ref, (ctx, el) => {
    /**
     * Map 0..1 to a point on the rectangle perimeter, walking clockwise from
     * the top-left corner.
     */
    const onPerimeter = (u: number, w: number, h: number) => {
      const p = ((u % 1) + 1) % 1
      const per = 2 * (w + h)
      let dLeft = p * per
      if (dLeft < w) return { x: dLeft, y: 0 }
      dLeft -= w
      if (dLeft < h) return { x: w, y: dLeft }
      dLeft -= h
      if (dLeft < w) return { x: w - dLeft, y: h }
      dLeft -= w
      return { x: 0, y: h - dLeft }
    }

    let t = 0

    return (_dt, frames) => {
      const W = el.width, H = el.height
      if (!W || !H) return

      // Props are authored in CSS pixels; convert once per frame.
      const scale = el.offsetWidth ? W / el.offsetWidth : 1
      const pal = colorsRef.current
      if (!pal.length) return
      const thick = Math.max(1, thickRef.current * scale)
      const bloomPx = Math.max(0, bloomRef.current * scale)
      const n = Math.max(1, Math.round(spotsRef.current))

      ctx.fillStyle = bgRef.current
      ctx.fillRect(0, 0, W, H)

      // Clip to the frame so the bloom bleeds inward but never floods the middle.
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, W, H)
      ctx.rect(thick + bloomPx, thick + bloomPx, Math.max(0, W - 2 * (thick + bloomPx)), Math.max(0, H - 2 * (thick + bloomPx)))
      ctx.clip('evenodd')

      ctx.globalCompositeOperation = 'lighter'
      const iw = W - thick, ih = H - thick

      for (let i = 0; i < n; i++) {
        const u = t * (0.35 + (i % 3) * 0.12) + i / n
        const { x, y } = onPerimeter(u, iw, ih)
        const px = x + thick / 2, py = y + thick / 2
        const pulse = 0.55 + 0.45 * Math.sin(t * 3 + i * 1.9)
        const r = Math.max(1, (thick * 2 + bloomPx) * pulse)

        const g = ctx.createRadialGradient(px, py, 0, px, py, r)
        const col = pal[i % pal.length]
        g.addColorStop(0, col)
        g.addColorStop(0.35, `${col}99`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
      ctx.restore()

      // Hard keyline on top — the frame stays crisp regardless of the glow.
      ctx.strokeStyle = pal[0]
      ctx.globalAlpha = 0.75
      ctx.lineWidth = Math.max(1, thick * 0.35)
      ctx.strokeRect(thick / 2, thick / 2, W - thick, H - thick)
      ctx.globalAlpha = 1

      t += 0.006 * speedRef.current * frames
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `Swirl`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export interface SwirlProps {
  /** Colours cycled around the spiral */
  colors?: string[]
  /** Number of hard colour bands per revolution */
  bands?: number
  /** How sharply bands twist with radius — 0 gives straight pie slices */
  twist?: number
  /** Animation speed multiplier */
  speed?: number
  /** Softness of the band edges, 0 = razor sharp, 1 = fully blended */
  softness?: number
  className?: string
  style?: CSSProperties
}

const DEFAULT_COLORS = ['#0a1450', '#00d2dc', '#ffc832', '#ff4b82']

/**
 * Swirl — twisting radial bands
 *
 * Colour bands are indexed by angle plus a radius-dependent twist, so they
 * wind into a spiral. `softness` controls the edge: at 0 the bands are hard
 * blocks, which is the neubrutalist reading of the effect.
 *
 * @example
 * <Swirl colors={['#00d2dc', '#ffc832', '#ff4b82']} bands={7} twist={2.4} />
 */
export function Swirl({
  colors = DEFAULT_COLORS,
  bands = 6,
  twist = 2.2,
  speed = 1,
  softness = 0,
  className,
  style,
}: SwirlProps) {
  const ref        = useRef<HTMLCanvasElement>(null)
  const colorsRef  = useRef(colors)
  const bandsRef   = useRef(bands)
  const twistRef   = useRef(twist)
  const speedRef   = useRef(speed)
  const softRef    = useRef(softness)

  useEffect(() => { colorsRef.current = colors   }, [colors])
  useEffect(() => { bandsRef.current  = bands    }, [bands])
  useEffect(() => { twistRef.current  = twist    }, [twist])
  useEffect(() => { speedRef.current  = speed    }, [speed])
  useEffect(() => { softRef.current   = softness }, [softness])

  useCanvasEffect(ref, (ctx, el) => {
    const SCALE = 3
    const off = document.createElement('canvas')
    const offCtx = off.getContext('2d')
    if (!offCtx) return

    let t = 0

    return (_dt, frames) => {
      const W = el.width, H = el.height
      if (!W || !H) return

      const pal = colorsRef.current.map(hexToRgb)
      if (!pal.length) return
      const nb = Math.max(1, Math.round(bandsRef.current))
      const tw = twistRef.current
      const soft = Math.max(0, Math.min(1, softRef.current))

      const iw = Math.max(1, Math.ceil(W / SCALE))
      const ih = Math.max(1, Math.ceil(H / SCALE))
      if (off.width !== iw || off.height !== ih) { off.width = iw; off.height = ih }

      const img = offCtx.createImageData(iw, ih)
      const d = img.data
      const cx = iw / 2, cy = ih / 2
      const maxR = Math.hypot(cx, cy)

      for (let py = 0; py < ih; py++) {
        const dy = py - cy
        for (let px = 0; px < iw; px++) {
          const dx = px - cx
          const r = Math.hypot(dx, dy) / maxR
          const a = Math.atan2(dy, dx)

          // Band coordinate: angle, wound by radius, drifting over time.
          const s = (a / (Math.PI * 2)) * nb + r * tw * nb * 0.25 + t
          const idx = Math.floor(s)
          const frac = s - idx

          const c0 = pal[((idx % pal.length) + pal.length) % pal.length]
          const c1 = pal[(((idx + 1) % pal.length) + pal.length) % pal.length]

          // soft = 0 → step; soft = 1 → linear crossfade across the whole band.
          let mix: number
          if (soft <= 0) {
            mix = 0
          } else {
            const edge = 1 - soft
            mix = frac <= edge ? 0 : (frac - edge) / Math.max(1e-4, soft)
          }

          const i = (py * iw + px) * 4
          d[i]     = c0[0] + (c1[0] - c0[0]) * mix
          d[i + 1] = c0[1] + (c1[1] - c0[1]) * mix
          d[i + 2] = c0[2] + (c1[2] - c0[2]) * mix
          d[i + 3] = 255
        }
      }

      offCtx.putImageData(img, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.imageSmoothingEnabled = soft > 0
      ctx.drawImage(off, 0, 0, W, H)

      t += 0.006 * speedRef.current * frames
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `Topography`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

// Value noise with quintic interpolation
function vNoise(x: number, y: number): number {
  const f  = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
  const lp = (a: number, b: number, t: number) => a + (b - a) * t
  const h  = (nx: number, ny: number) => {
    const n = Math.sin(nx * 127.1 + ny * 311.7) * 43758.5453
    return n - Math.floor(n)
  }
  const ix = Math.floor(x), iy = Math.floor(y)
  const fx = x - ix, fy = y - iy
  return lp(lp(h(ix, iy), h(ix + 1, iy), f(fx)), lp(h(ix, iy + 1), h(ix + 1, iy + 1), f(fx)), f(fy))
}

// Fractal noise — 3 octaves for organic terrain feel
function fbm(x: number, y: number): number {
  return vNoise(x, y) * 0.5
    + vNoise(x * 2.1 + 5.3, y * 2.1 + 1.7) * 0.3
    + vNoise(x * 4.3 + 9.1, y * 4.3 + 3.9) * 0.2
}

export interface TopographyProps {
  /** Stroke color for contour lines */
  lineColor?: string
  /** Number of contour levels */
  levels?: number
  /** Animation speed multiplier */
  speed?: number
  /** Color palette for elevation tinting (low → high) */
  palette?: string[]
  className?: string
  style?: CSSProperties
}

const DEFAULT_PALETTE = ['#0d2137', '#134e5e', '#1a7a5c', '#5da84e', '#c4b44a', '#e07e3a', '#b84232']

/**
 * Topography — Animated contour map
 *
 * Perlin-noise-driven elevation field with marching-squares contour
 * lines that morph over time. Contours are tinted by elevation for
 * a beautiful cartographic aesthetic.
 *
 * @example
 * <Topography lineColor="#8ecae6" levels={12} speed={1} />
 */
export function Topography({
  lineColor = '#8ecae6',
  levels = 12,
  speed = 1,
  palette = DEFAULT_PALETTE,
  className,
  style,
}: TopographyProps) {
  const ref        = useRef<HTMLCanvasElement>(null)
  const colorRef   = useRef(lineColor)
  const levelsRef  = useRef(levels)
  const speedRef   = useRef(speed)
  const paletteRef = useRef(palette)

  useEffect(() => { colorRef.current   = lineColor }, [lineColor])
  useEffect(() => { levelsRef.current  = levels    }, [levels])
  useEffect(() => { speedRef.current   = speed     }, [speed])
  useEffect(() => { paletteRef.current = palette   }, [palette])

  useCanvasEffect(ref, (ctx, el) => {
    const CELL = 6 // grid cell size in px


    let t = 0

    return (_dt, frames) => {
      const W = el.width, H = el.height
      if (!W || !H) return
      const spd = speedRef.current
      const lvl = levelsRef.current
      const pal = paletteRef.current.map(hexToRgb)
      const base = hexToRgb(colorRef.current)

      ctx.fillStyle = '#0a0e17'
      ctx.fillRect(0, 0, W, H)

      const cols = Math.ceil(W / CELL) + 1
      const rows = Math.ceil(H / CELL) + 1
      const noiseScale = 0.008

      // Build elevation grid
      const grid: number[][] = []
      for (let r = 0; r < rows; r++) {
        grid[r] = []
        for (let c = 0; c < cols; c++) {
          grid[r][c] = fbm(c * CELL * noiseScale + t * 0.3, r * CELL * noiseScale + t * 0.2)
        }
      }

      // Draw contour lines using marching squares (simplified edge interpolation)
      for (let lv = 0; lv < lvl; lv++) {
        const threshold = (lv + 1) / (lvl + 1)
        const frac = lv / (lvl - 1 || 1)

        // Color interpolation from palette
        let cr: number, cg: number, cb: number
        if (pal.length > 1) {
          const s = pal.length - 1
          const idx = Math.min(s - 1, Math.floor(frac * s))
          const f = frac * s - idx
          const a = pal[idx], b = pal[idx + 1]
          cr = a[0] + (b[0] - a[0]) * f
          cg = a[1] + (b[1] - a[1]) * f
          cb = a[2] + (b[2] - a[2]) * f
        } else {
          ;[cr, cg, cb] = base
        }

        const alpha = 0.3 + frac * 0.5

        ctx.beginPath()

        for (let r = 0; r < rows - 1; r++) {
          for (let c = 0; c < cols - 1; c++) {
            const tl = grid[r][c], tr = grid[r][c + 1]
            const bl = grid[r + 1][c], br = grid[r + 1][c + 1]

            const config =
              (tl >= threshold ? 8 : 0) |
              (tr >= threshold ? 4 : 0) |
              (br >= threshold ? 2 : 0) |
              (bl >= threshold ? 1 : 0)

            if (config === 0 || config === 15) continue

            const x0 = c * CELL, y0 = r * CELL

            // Linear interpolation for edge crossing positions
            const lerp = (a: number, b: number) => {
              const d = b - a
              return d === 0 ? 0.5 : (threshold - a) / d
            }

            const top    = { x: x0 + lerp(tl, tr) * CELL, y: y0 }
            const right  = { x: x0 + CELL, y: y0 + lerp(tr, br) * CELL }
            const bottom = { x: x0 + lerp(bl, br) * CELL, y: y0 + CELL }
            const left   = { x: x0, y: y0 + lerp(tl, bl) * CELL }

            const line = (a: { x: number; y: number }, b: { x: number; y: number }) => {
              ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            }

            switch (config) {
              case 1: case 14: line(left, bottom); break
              case 2: case 13: line(bottom, right); break
              case 3: case 12: line(left, right); break
              case 4: case 11: line(top, right); break
              case 5:          line(left, top); line(bottom, right); break
              case 6: case 9:  line(top, bottom); break
              case 7: case 8:  line(left, top); break
              case 10:         line(left, bottom); line(top, right); break
            }
          }
        }

        ctx.strokeStyle = `rgba(${cr|0},${cg|0},${cb|0},${alpha})`
        ctx.lineWidth = lv === 0 || lv === lvl - 1 ? 1.4 : 0.8
        ctx.stroke()
      }

      t += 0.006 * spd * frames
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `Truchet`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

export interface TruchetProps {
  /** Arc / line color */
  color?: string
  /** Background color */
  bgColor?: string
  /** Tile size in px */
  tileSize?: number
  /** Line thickness in px */
  lineWidth?: number
  /** Animation speed multiplier (flow + flip rate) */
  speed?: number
  className?: string
  style?: CSSProperties
}

/**
 * Truchet — flowing arc-tile maze
 *
 * A grid of square tiles, each holding two quarter-arcs in one of two
 * orientations, joins into endless looping curves. A travelling dash makes the
 * paths flow while tiles occasionally flip to re-route the maze.
 *
 * @example
 * <Truchet color="#111111" bgColor="#f5f5f5" tileSize={48} lineWidth={6} speed={1} />
 */
export function Truchet({
  color = '#111111',
  bgColor = '#f5f5f5',
  tileSize = 48,
  lineWidth = 6,
  speed = 1,
  className,
  style,
}: TruchetProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef(color)
  const bgRef = useRef(bgColor)
  const tileRef = useRef(tileSize)
  const lwRef = useRef(lineWidth)
  const speedRef = useRef(speed)

  useEffect(() => { colorRef.current = color }, [color])
  useEffect(() => { bgRef.current = bgColor }, [bgColor])
  useEffect(() => { tileRef.current = tileSize }, [tileSize])
  useEffect(() => { lwRef.current = lineWidth }, [lineWidth])
  useEffect(() => { speedRef.current = speed }, [speed])

  useCanvasEffect(ref, (ctx, el) => {
    // Backing-store pixels per CSS pixel (reflects the maxPixelCount clamp).
    const scale = () => (el.offsetWidth ? el.width / el.offsetWidth : 1)

    let grid: Uint8Array = new Uint8Array(0)
    let cols = 0, rows = 0

    const build = () => {
      const TS = Math.max(16, tileRef.current * scale())
      cols = Math.ceil(el.width / TS) + 1
      rows = Math.ceil(el.height / TS) + 1
      grid = new Uint8Array(cols * rows)
      for (let i = 0; i < grid.length; i++) grid[i] = Math.random() < 0.5 ? 1 : 0
    }


    let t = 0
    let flipAcc = 0
    let lastW = 0, lastH = 0
    return (_dt, frames) => {
      if (el.width !== lastW || el.height !== lastH) {
        lastW = el.width; lastH = el.height
        build()
      }
      const W = el.width, H = el.height
      const TS = Math.max(16, tileRef.current * scale())
      const R = TS / 2

      ctx.fillStyle = bgRef.current
      ctx.fillRect(0, 0, W, H)
      ctx.strokeStyle = colorRef.current
      ctx.lineWidth = Math.max(1, lwRef.current * scale())
      ctx.lineCap = 'round'
      ctx.setLineDash([TS * 0.5, TS * 0.32])
      ctx.lineDashOffset = -t * 80 * speedRef.current

      for (let c = 0; c < cols; c++) {
        const x = c * TS
        for (let r = 0; r < rows; r++) {
          const y = r * TS
          if (grid[c * rows + r]) {
            // ◜ top-left + ◞ bottom-right arcs
            ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI / 2); ctx.stroke()
            ctx.beginPath(); ctx.arc(x + TS, y + TS, R, Math.PI, Math.PI * 1.5); ctx.stroke()
          } else {
            // ◝ top-right + ◟ bottom-left arcs
            ctx.beginPath(); ctx.arc(x + TS, y, R, Math.PI / 2, Math.PI); ctx.stroke()
            ctx.beginPath(); ctx.arc(x, y + TS, R, Math.PI * 1.5, Math.PI * 2); ctx.stroke()
          }
        }
      }
      ctx.setLineDash([])

      // Periodically flip a handful of tiles to re-route the maze.
      flipAcc += speedRef.current * frames
      if (flipAcc >= 6 && grid.length) {
        flipAcc = 0
        for (let n = 0; n < 3; n++) {
          const i = (Math.random() * grid.length) | 0
          grid[i] ^= 1
        }
      }

      t += 0.016 * frames
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `VoronoiPulse`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export interface VoronoiPulseProps {
  /** Number of Voronoi seed points */
  cellCount?: number
  /** Color palette — each cell gets a color from this array */
  colors?: string[]
  /** Animation speed multiplier */
  speed?: number
  /** Border line width */
  borderWidth?: number
  className?: string
  style?: CSSProperties
}

const DEFAULT_COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7dc6f', '#bb8fce', '#85c1e9']

/**
 * VoronoiPulse — Animated Voronoi tessellation
 *
 * Drifting seed points generate a Voronoi diagram via brute-force
 * nearest-neighbor. Cell fills pulse with color waves that ripple
 * outward from random centers. Rendered at ⅓ resolution for performance.
 *
 * @example
 * <VoronoiPulse cellCount={24} colors={['#ff6b6b','#4ecdc4','#45b7d1']} speed={1} />
 */
export function VoronoiPulse({
  cellCount = 24,
  colors = DEFAULT_COLORS,
  speed = 1,
  borderWidth = 1.5,
  className,
  style,
}: VoronoiPulseProps) {
  const ref         = useRef<HTMLCanvasElement>(null)
  const countRef    = useRef(cellCount)
  const colorsRef   = useRef(colors)
  const speedRef    = useRef(speed)
  const borderRef   = useRef(borderWidth)

  useEffect(() => { countRef.current  = cellCount   }, [cellCount])
  useEffect(() => { colorsRef.current = colors      }, [colors])
  useEffect(() => { speedRef.current  = speed       }, [speed])
  useEffect(() => { borderRef.current = borderWidth }, [borderWidth])

  useCanvasEffect(ref, (ctx, el) => {
    type Seed = { x: number; y: number; vx: number; vy: number; rgb: [number, number, number]; phase: number }
    let seeds: Seed[] = []

    const SCALE = 3
    const off    = document.createElement('canvas')
    const offCtx = off.getContext('2d')
    if (!offCtx) return

    const init = () => {
      const cls = colorsRef.current.map(hexToRgb)
      seeds = Array.from({ length: countRef.current }, (_, i) => ({
        x:  Math.random(),
        y:  Math.random(),
        vx: (Math.random() - 0.5) * 0.0012,
        vy: (Math.random() - 0.5) * 0.0012,
        rgb: cls[i % cls.length],
        phase: Math.random() * Math.PI * 2,
      }))
    }


    let t = 0

    let lastW = 0, lastH = 0
    return (_dt, frames) => {
      if (el.width !== lastW || el.height !== lastH) {
        lastW = el.width; lastH = el.height
        init()
      }
      const W = el.width, H = el.height
      if (!W || !H) return
      const spd = speedRef.current

      const iw = Math.ceil(W / SCALE), ih = Math.ceil(H / SCALE)
      if (off.width !== iw || off.height !== ih) { off.width = iw; off.height = ih }

      // Move seeds
      seeds.forEach(s => {
        s.x += s.vx * spd
        s.y += s.vy * spd
        if (s.x < 0 || s.x > 1) s.vx *= -1
        if (s.y < 0 || s.y > 1) s.vy *= -1
      })

      const img = offCtx.createImageData(iw, ih)
      const d = img.data

      for (let py = 0; py < ih; py++) {
        for (let px = 0; px < iw; px++) {
          const wx = px / iw, wy = py / ih
          let minDist = Infinity, minIdx = 0
          let secondDist = Infinity

          // Find nearest and second-nearest seed
          for (let i = 0; i < seeds.length; i++) {
            const dx = (wx - seeds[i].x) * (W / H) // aspect correction
            const dy = wy - seeds[i].y
            const dist = dx * dx + dy * dy
            if (dist < minDist) {
              secondDist = minDist
              minDist = dist
              minIdx = i
            } else if (dist < secondDist) {
              secondDist = dist
            }
          }

          const seed = seeds[minIdx]
          const [r, g, b] = seed.rgb

          // Pulse: brightness oscillates per-cell
          const pulse = 0.5 + 0.35 * Math.sin(t * 2.5 + seed.phase)

          // Edge detection: where second-nearest is close to nearest
          const edgeFactor = Math.sqrt(secondDist) - Math.sqrt(minDist)
          const isEdge = edgeFactor < 0.012

          const i = (py * iw + px) * 4
          if (isEdge) {
            // Bright border
            d[i]     = Math.min(255, r + 120)
            d[i + 1] = Math.min(255, g + 120)
            d[i + 2] = Math.min(255, b + 120)
            d[i + 3] = 220
          } else {
            // Cell fill with pulse
            const dark = 0.08 + pulse * 0.18
            d[i]     = r * dark
            d[i + 1] = g * dark
            d[i + 2] = b * dark
            d[i + 3] = 255
          }
        }
      }

      offCtx.putImageData(img, 0, 0)
      ctx.clearRect(0, 0, W, H)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(off, 0, 0, W, H)

      t += 0.016 * spd * frames
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

---

## Effect: `WarpSpeed`

```tsx
import { useEffect, useRef, type CSSProperties } from 'react'
import { useCanvasEffect } from '@/hooks/use-canvas-effect'

export interface WarpSpeedProps {
  /** Number of stars in the field */
  starCount?: number
  /** Animation speed multiplier */
  speed?: number
  /** Starting hue for star trails (0–360) */
  hueStart?: number
  /** Trail length multiplier */
  trailLength?: number
  className?: string
  style?: CSSProperties
}

/**
 * WarpSpeed — Hyperspace star tunnel
 *
 * Stars spawn near the center and accelerate outward with perspective
 * scaling, leaving motion-blur streaks. The result is a classic
 * sci-fi jump-to-lightspeed effect.
 *
 * @example
 * <WarpSpeed starCount={300} speed={1} hueStart={220} trailLength={1} />
 */
export function WarpSpeed({
  starCount = 300,
  speed = 1,
  hueStart = 220,
  trailLength = 1,
  className,
  style,
}: WarpSpeedProps) {
  const ref           = useRef<HTMLCanvasElement>(null)
  const countRef      = useRef(starCount)
  const speedRef      = useRef(speed)
  const hueRef        = useRef(hueStart)
  const trailRef      = useRef(trailLength)

  useEffect(() => { countRef.current = starCount   }, [starCount])
  useEffect(() => { speedRef.current = speed       }, [speed])
  useEffect(() => { hueRef.current   = hueStart    }, [hueStart])
  useEffect(() => { trailRef.current = trailLength }, [trailLength])

  useCanvasEffect(ref, (ctx, el) => {
    type Star = { x: number; y: number; z: number; pz: number; hue: number }
    let stars: Star[] = []

    const spawn = (): Star => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random() * 1.5 + 0.5,
      pz: 0,
      hue: hueRef.current + Math.random() * 60 - 30,
    })

    const init = () => {
      stars = Array.from({ length: countRef.current }, () => {
        const s = spawn()
        s.pz = s.z
        return s
      })
    }


    let lastW = 0, lastH = 0
    return (_dt, frames) => {
      if (el.width !== lastW || el.height !== lastH) {
        lastW = el.width; lastH = el.height
        init()
      }
      const W = el.width, H = el.height
      const cx = W / 2, cy = H / 2
      const spd = speedRef.current
      const tl = trailRef.current

      ctx.fillStyle = `rgba(0,0,0,${1 - Math.pow(1 - 0.15, frames)})`
      ctx.fillRect(0, 0, W, H)

      stars.forEach((s, i) => {
        s.pz = s.z
        s.z -= 0.012 * spd * frames

        if (s.z <= 0.001) {
          stars[i] = spawn()
          stars[i].pz = stars[i].z
          return
        }

        const sx = cx + (s.x / s.z) * (W * 0.5)
        const sy = cy + (s.y / s.z) * (H * 0.5)
        const px = cx + (s.x / s.pz) * (W * 0.5)
        const py = cy + (s.y / s.pz) * (H * 0.5)

        if (sx < -10 || sx > W + 10 || sy < -10 || sy > H + 10) {
          stars[i] = spawn()
          stars[i].pz = stars[i].z
          return
        }

        const depth = 1 - s.z / 2
        const brightness = 40 + depth * 55
        const lw = depth * 2.5 * tl

        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.strokeStyle = `hsl(${s.hue} 70% ${brightness}%)`
        ctx.lineWidth = Math.max(0.3, lw)
        ctx.globalAlpha = depth * 0.9
        ctx.stroke()

        // Bright head
        const headR = depth * 1.8
        ctx.beginPath()
        ctx.arc(sx, sy, headR, 0, Math.PI * 2)
        ctx.fillStyle = `hsl(${s.hue} 30% 92%)`
        ctx.globalAlpha = depth
        ctx.fill()
      })

      ctx.globalAlpha = 1
    }
  })

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
```

