import React, { useState, useEffect, useRef } from 'react'

interface PointerState {
  x: number
  y: number
  targetX: number
  targetY: number
  active: boolean
  lastMoved: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
}

function getAxisFromPath(pathname: string): 'dotwave' | 'topography' | 'lissajous' | 'particles' {
  const path = pathname.toLowerCase()

  // Eixo 4: Documentos & Acervo
  if (
    path.startsWith('/documentos') ||
    path.startsWith('/faq') ||
    path.startsWith('/mapa-do-site')
  ) {
    return 'lissajous'
  }

  // Eixo 5: Chapa Semente & Gestão
  if (
    path.startsWith('/sobre') ||
    path.startsWith('/gestao') ||
    path.startsWith('/transparencia') ||
    path.startsWith('/chapa-semente') ||
    path.startsWith('/configuracoes')
  ) {
    return 'particles'
  }

  // Eixos 2 & 3: Curso & Central Curricular
  if (
    path.startsWith('/curso') ||
    path.startsWith('/calouros') ||
    path.startsWith('/pesquisa') ||
    path.startsWith('/percurso') ||
    path.startsWith('/optativas') ||
    path.startsWith('/acg') ||
    path.startsWith('/estagio') ||
    path.startsWith('/tcc')
  ) {
    return 'topography'
  }

  // Eixo 1: Hoje & Campus (default)
  return 'dotwave'
}

export const GlobalCanvasBackdrop: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [currentPath, setCurrentPath] = useState<string>('/')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Estado do ponteiro compartilhado
  const pointerRef = useRef<PointerState>({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false,
    lastMoved: 0,
  })

  // Partículas para o Eixo 5
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updatePath = () => {
      setCurrentPath(window.location.pathname)
    }
    updatePath()

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleMotionChange)

    // Astro lifecycle navigation events
    document.addEventListener('astro:page-load', updatePath)
    document.addEventListener('astro:after-swap', updatePath)
    window.addEventListener('popstate', updatePath)

    // Interatividade tátil contínua (mesmo sobre cards com pointer-events)
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX
      const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY

      const p = pointerRef.current
      p.targetX = clientX
      p.targetY = clientY
      p.active = true
      p.lastMoved = performance.now()

      if (p.x < -500) {
        p.x = clientX
        p.y = clientY
      }
    }

    const handlePointerLeave = () => {
      pointerRef.current.active = false
    }

    window.addEventListener('mousemove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handlePointerMove, { passive: true })
    window.addEventListener('touchstart', handlePointerMove, { passive: true })
    window.addEventListener('mouseleave', handlePointerLeave)

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange)
      document.removeEventListener('astro:page-load', updatePath)
      document.removeEventListener('astro:after-swap', updatePath)
      window.removeEventListener('popstate', updatePath)
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('touchmove', handlePointerMove)
      window.removeEventListener('touchstart', handlePointerMove)
      window.removeEventListener('mouseleave', handlePointerLeave)
    }
  }, [])

  const activeAxis = getAxisFromPath(currentPath)

  // Loop de Animação Canvas 2D
  useEffect(() => {
    if (prefersReducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0
    let t = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.resetTransform()
      ctx.scale(dpr, dpr)

      // Inicializa partículas para Eixo 5
      const count = Math.min(Math.floor((width * height) / 22000), 55)
      const colors = ['#5B2A86', '#FF8811', '#8B1E2D', '#266264']
      particlesRef.current = Array.from({ length: Math.max(30, count) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        size: Math.random() > 0.6 ? 5 : 3.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    }

    resize()
    window.addEventListener('resize', resize)

    // Render loop
    const render = (timestamp: number) => {
      t += 0.02
      ctx.clearRect(0, 0, width, height)

      // Suavização da posição do ponteiro (lerp)
      const p = pointerRef.current
      p.x += (p.targetX - p.x) * 0.14
      p.y += (p.targetY - p.y) * 0.14

      // Desativa suavemente após 3.5s sem movimento
      const isPointerRecent = timestamp - p.lastMoved < 3500

      // ==========================================
      // EIXO 1: DotWave Interativo (Hoje & Notícias)
      // ==========================================
      if (activeAxis === 'dotwave') {
        const gap = 32
        const cols = Math.ceil(width / gap) + 1
        const rows = Math.ceil(height / gap) + 1

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const dotX = c * gap + gap / 2
            const dotY = r * gap + gap / 2

            // Ondulação senoidal de base
            const baseV =
              (Math.sin(c * 0.35 + r * 0.25 - t * 1.1) +
                Math.sin(c * 0.15 - r * 0.35 + t * 0.7) +
                2) /
              4

            let dotSize = 2 + baseV * 5
            let alpha = 0.25 + baseV * 0.65
            let dotColor = '#5B2A86'

            // Resposta interativa ao cursor/toque
            if (p.active && isPointerRecent) {
              const dx = dotX - p.x
              const dy = dotY - p.y
              const dist = Math.hypot(dx, dy)
              const maxRadius = 240

              if (dist < maxRadius) {
                const proximity = 1 - dist / maxRadius
                const ripple = Math.sin(dist * 0.05 - t * 4) * proximity * 5
                dotSize = Math.max(1.5, dotSize + ripple + proximity * 6)
                alpha = Math.min(1, alpha + proximity * 0.6)

                if (proximity > 0.45) {
                  dotColor = '#FF8811' // Destaque Laranja Semente no epicentro
                }
              }
            }

            ctx.globalAlpha = alpha
            ctx.fillStyle = dotColor
            // Pontos quadrados neobrutalistas
            ctx.fillRect(dotX - dotSize / 2, dotY - dotSize / 2, dotSize, dotSize)
          }
        }
      }

      // ==========================================
      // EIXOS 2 e 3: Topography Interativo (Curso & Grade)
      // ==========================================
      else if (activeAxis === 'topography') {
        const lineCount = 18
        const stepX = 14
        const lineSpacing = height / (lineCount + 1)
        const palette = ['#5B2A86', '#266264', '#FF8811', '#8B1E2D']

        for (let i = 1; i <= lineCount; i++) {
          const baseY = i * lineSpacing
          const color = palette[i % palette.length]

          ctx.beginPath()
          let firstPoint = true

          for (let x = 0; x <= width + stepX; x += stepX) {
            // Curvas de nível cartográficas
            const wave1 = Math.sin(x * 0.005 + t * 0.4 + i * 0.55) * 18
            const wave2 = Math.cos(x * 0.012 - t * 0.3 + i * 0.9) * 10
            let elevation = wave1 + wave2

            // Deformação interativa do relevo pelo cursor/toque
            if (p.active && isPointerRecent) {
              const dx = x - p.x
              const dy = baseY - p.y
              const dist = Math.hypot(dx, dy)
              const attractorRadius = 260

              if (dist < attractorRadius) {
                const bumpFactor = Math.exp(-(dist * dist) / (2 * 75 * 75))
                elevation += (dy < 0 ? -1 : 1) * bumpFactor * 55
              }
            }

            const currentY = baseY + elevation

            if (firstPoint) {
              ctx.moveTo(x, currentY)
              firstPoint = false
            } else {
              ctx.lineTo(x, currentY)
            }
          }

          ctx.strokeStyle = color
          ctx.lineWidth = i % 4 === 0 ? 2 : 1.25
          ctx.globalAlpha = i % 4 === 0 ? 0.85 : 0.55
          ctx.stroke()

          // Marcadores cartográficos sutis (+) nas linhas mestras
          if (i % 4 === 0) {
            for (let mx = 120; mx < width; mx += 260) {
              const markerY = baseY + Math.sin(mx * 0.005 + t * 0.4 + i * 0.55) * 18
              ctx.fillStyle = '#5B2A86'
              ctx.globalAlpha = 0.7
              ctx.fillRect(mx - 3, markerY - 0.75, 6, 1.5)
              ctx.fillRect(mx - 0.75, markerY - 3, 1.5, 6)
            }
          }
        }
      }

      // ==========================================
      // EIXO 4: LissajousGrid Interativo (Documentos)
      // ==========================================
      else if (activeAxis === 'lissajous') {
        const cols = width > 768 ? 5 : 3
        const rows = 3
        const cellW = width / cols
        const cellH = height / rows
        const steps = 380

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const fx = col + 1
            const fy = row + 1
            const cx = (col + 0.5) * cellW
            const cy = (row + 0.5) * cellH
            const rx = cellW * 0.38
            const ry = cellH * 0.38

            // Distância ao cursor
            let phaseOffset = 0
            let isNear = false

            if (p.active && isPointerRecent) {
              const dist = Math.hypot(cx - p.x, cy - p.y)
              const maxDist = 320
              if (dist < maxDist) {
                const prox = 1 - dist / maxDist
                phaseOffset = prox * Math.PI * 1.5
                isNear = true
              }
            }

            // Caixa delimitadora técnica neobrutalista
            ctx.strokeStyle = '#5B2A86'
            ctx.globalAlpha = 0.15
            ctx.lineWidth = 1
            ctx.strokeRect(col * cellW + 6, row * cellH + 6, cellW - 12, cellH - 12)

            // Curva Lissajous paramétrica
            ctx.beginPath()
            const totalPeriod = Math.PI * 2
            const currentPhase = t * 0.8 + phaseOffset

            for (let s = 0; s <= steps; s++) {
              const angle = (s / steps) * totalPeriod
              const lx = cx + rx * Math.sin(fx * angle + currentPhase)
              const ly = cy + ry * Math.sin(fy * angle)

              if (s === 0) ctx.moveTo(lx, ly)
              else ctx.lineTo(lx, ly)
            }

            ctx.strokeStyle = isNear ? '#FF8811' : '#5B2A86'
            ctx.globalAlpha = isNear ? 0.95 : 0.65
            ctx.lineWidth = isNear ? 2 : 1.4
            ctx.stroke()
          }
        }
      }

      // ==========================================
      // EIXO 5: ParticleWeb Interativo (Gestão & Semente)
      // ==========================================
      else if (activeAxis === 'particles') {
        const pts = particlesRef.current
        const maxDist = 135

        // Atualiza posições e atração pelo ponteiro
        for (let i = 0; i < pts.length; i++) {
          const pt = pts[i]
          pt.x += pt.vx
          pt.y += pt.vy

          // Rebote nas bordas
          if (pt.x < 0 || pt.x > width) pt.vx *= -1
          if (pt.y < 0 || pt.y > height) pt.vy *= -1

          // Atração gravitacional tátil em direção ao cursor/toque
          if (p.active && isPointerRecent) {
            const dx = p.x - pt.x
            const dy = p.y - pt.y
            const dist = Math.hypot(dx, dy)
            const pullRadius = 240

            if (dist < pullRadius) {
              const pullFactor = (1 - dist / pullRadius) * 0.9
              pt.x += (dx / dist) * pullFactor
              pt.y += (dy / dist) * pullFactor

              // Feixe de luz direto até o cursor
              ctx.beginPath()
              ctx.moveTo(pt.x, pt.y)
              ctx.lineTo(p.x, p.y)
              ctx.strokeStyle = '#FF8811'
              ctx.globalAlpha = (1 - dist / pullRadius) * 0.85
              ctx.lineWidth = 1.8
              ctx.stroke()
            }
          }
        }

        // Conexões de rede entre partículas próximas
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x
            const dy = pts[i].y - pts[j].y
            const dist = Math.hypot(dx, dy)

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.6
              ctx.beginPath()
              ctx.moveTo(pts[i].x, pts[i].y)
              ctx.lineTo(pts[j].x, pts[j].y)
              ctx.strokeStyle = '#5B2A86'
              ctx.globalAlpha = alpha
              ctx.lineWidth = 1.2
              ctx.stroke()
            }
          }
        }

        // Desenha os nós quadrados neobrutalistas
        for (let i = 0; i < pts.length; i++) {
          const pt = pts[i]
          ctx.fillStyle = pt.color
          ctx.globalAlpha = 0.9
          ctx.fillRect(pt.x - pt.size / 2, pt.y - pt.size / 2, pt.size, pt.size)
        }

        // Halo pulsante no ponteiro quando ativo
        if (p.active && isPointerRecent) {
          ctx.strokeStyle = '#FF8811'
          ctx.globalAlpha = 0.8
          ctx.lineWidth = 2
          const pulse = 10 + Math.sin(t * 3) * 3
          ctx.strokeRect(p.x - pulse / 2, p.y - pulse / 2, pulse, pulse)
        }
      }

      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [activeAxis, prefersReducedMotion])

  // Acessibilidade: prefers-reduced-motion
  if (prefersReducedMotion) {
    return (
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-20 bg-[radial-gradient(#5B2A86_1.5px,transparent_1.5px)] [background-size:28px_28px]"
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-25 sm:opacity-30 transition-opacity duration-700 ease-in-out"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  )
}
