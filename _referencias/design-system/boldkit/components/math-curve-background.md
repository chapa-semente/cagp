---
title: "Math Curve Background"
description: "An ambient animated mathematical curve background layer. Wraps content with a slow-moving curve animation that adds depth and visual interest."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/math-curve-background"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "radix-ui"
---

# Math Curve Background

> An ambient animated mathematical curve background layer. Wraps content with a slow-moving curve animation that adds depth and visual interest.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/math-curve-background.json"
```

### Component Source Code (`components/ui/math-curve-background.tsx`)

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { prefersReducedMotion, onReducedMotionChange } from '@/lib/motion-core'
import {
  buildPath,
  getPoint,
  getAngle,
  getDetailScale,
  getCurvePulseDuration,
  type BackgroundCurveKey,
} from '@/lib/math-curves'

const SPEED_DURATION: Record<string, number> = {
  slow: 9000,
  normal: 5500,
  fast: 3000,
}

export interface MathCurveBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  curve?: BackgroundCurveKey
  speed?: 'slow' | 'normal' | 'fast'
  opacity?: number
  trackColor?: string
  headColor?: string
  strokeWidth?: number
  children?: React.ReactNode
}

const MathCurveBackground = React.forwardRef<HTMLDivElement, MathCurveBackgroundProps>(
  (
    {
      className,
      curve = 'rose',
      speed = 'slow',
      opacity = 0.15,
      trackColor,
      headColor,
      strokeWidth = 2,
      children,
      ...props
    },
    ref
  ) => {
    const pathRef = React.useRef<SVGPathElement>(null)
    const rectRef = React.useRef<SVGRectElement>(null)
    const rafRef = React.useRef<number>(0)
    const startTimeRef = React.useRef<number>(performance.now())

    const durationMs = SPEED_DURATION[speed] ?? SPEED_DURATION.slow
    const HEAD_SIZE = 8

    const initialTrackPath = React.useMemo(() => buildPath(curve, 1.0), [curve])

    React.useEffect(() => {
      startTimeRef.current = performance.now()

      // Draw one frame. Separated from scheduling so reduced motion can render
      // a static frame without starting the loop.
      const draw = () => {
        const now = performance.now()
        const elapsed = (now - startTimeRef.current) % durationMs
        const progress = elapsed / durationMs
        const detailScale = getDetailScale(now, getCurvePulseDuration(curve))

        const { x, y } = getPoint(curve, progress, detailScale)
        const angle = getAngle(curve, progress, detailScale)

        if (pathRef.current) {
          pathRef.current.setAttribute('d', buildPath(curve, detailScale))
        }

        if (rectRef.current) {
          const cx = x
          const cy = y
          rectRef.current.setAttribute('x', String(cx - HEAD_SIZE / 2))
          rectRef.current.setAttribute('y', String(cy - HEAD_SIZE / 2))
          rectRef.current.setAttribute('transform', `rotate(${angle} ${cx} ${cy})`)
        }

      }

      const tick = () => {
        draw()
        rafRef.current = requestAnimationFrame(tick)
      }

      // A CSS media query can't stop a loop that mutates SVG attributes, so
      // the reduced-motion preference has to be consulted here.
      const start = () => {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
        if (prefersReducedMotion()) {
          draw()
          return
        }
        rafRef.current = requestAnimationFrame(tick)
      }

      start()
      const unsubscribe = onReducedMotionChange(start)

      return () => {
        unsubscribe()
        cancelAnimationFrame(rafRef.current)
      }
    }, [curve, speed, durationMs, strokeWidth])

    const resolvedTrackStroke = trackColor ?? 'currentColor'
    const resolvedHeadFill = headColor ?? 'hsl(var(--primary))'

    return (
      <ErrorBoundary>
        <div
          ref={ref}
          className={cn('relative', className)}
          {...props}
        >
          {/* Animated SVG background layer */}
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            opacity={opacity}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            <path
              ref={pathRef}
              d={initialTrackPath}
              fill="none"
              stroke={resolvedTrackStroke}
              strokeWidth={strokeWidth}
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="transition-[stroke-opacity] duration-200"
            />
            <rect
              ref={rectRef}
              width={HEAD_SIZE}
              height={HEAD_SIZE}
              x={50 - HEAD_SIZE / 2}
              y={50 - HEAD_SIZE / 2}
              fill={resolvedHeadFill}
              stroke="currentColor"
              strokeWidth={1.5}
            />
          </svg>
          {/* Children sit above the SVG */}
          <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
        </div>
      </ErrorBoundary>
    )
  }
)
MathCurveBackground.displayName = 'MathCurveBackground'

export { MathCurveBackground }
```

## Usage

```tsx
import { MathCurveBackground } from '@/components/ui/math-curve-background'

export default function Example() {
  return (
    <MathCurveBackground curve="rose" opacity={0.2} className="p-8">
      <p>Your content here</p>
    </MathCurveBackground>
  )
}
```

## Examples

### Curve Variants

Seven mathematical curves, each with a distinct visual character for different aesthetic contexts.

```tsx
<MathCurveBackground curve="rose" opacity={0.2}>Rose</MathCurveBackground>
<MathCurveBackground curve="lissajous" opacity={0.2}>Lissajous</MathCurveBackground>
<MathCurveBackground curve="fourier" opacity={0.2}>Fourier</MathCurveBackground>
<MathCurveBackground curve="spiral" opacity={0.2}>Spiral</MathCurveBackground>
<MathCurveBackground curve="triskelion" opacity={0.2}>Triskelion</MathCurveBackground>
<MathCurveBackground curve="involute" opacity={0.2}>Involute</MathCurveBackground>
<MathCurveBackground curve="epicycloid" opacity={0.2}>Epicycloid</MathCurveBackground>
```

### Wrapping Cards

Use MathCurveBackground to add ambient motion to card components without affecting their content layout.

```tsx
<MathCurveBackground curve="lissajous" opacity={0.15} className="border-3 border-foreground p-6">
  <h3 className="text-lg font-black uppercase mb-1">Component Title</h3>
  <p className="text-sm text-muted-foreground mb-4">
    A card with an animated curve background that adds depth and motion.
  </p>
  <button className="border-3 border-foreground px-4 py-2 font-bold uppercase text-sm bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition">
    Get Started
  </button>
</MathCurveBackground>
```

### Opacity Control

Adjust opacity to balance between a subtle ambient effect and a prominent decorative element.

```tsx
<MathCurveBackground curve="rose" opacity={0.05}>0.05</MathCurveBackground>
<MathCurveBackground curve="rose" opacity={0.1}>0.1</MathCurveBackground>
<MathCurveBackground curve="rose" opacity={0.2}>0.2</MathCurveBackground>
<MathCurveBackground curve="rose" opacity={0.4}>0.4</MathCurveBackground>
```

### Speed Variants

Control animation speed from a barely-perceptible ambient drift to an energetic fast-moving trace.

```tsx
<MathCurveBackground curve="rose" speed="slow" opacity={0.2}>Slow</MathCurveBackground>
<MathCurveBackground curve="rose" speed="normal" opacity={0.2}>Normal</MathCurveBackground>
<MathCurveBackground curve="rose" speed="fast" opacity={0.2}>Fast</MathCurveBackground>
```

