---
title: "MathCurveLoader"
description: "Mathematical parametric curve loaders with neubrutalism aesthetics. 15 curve variants including rose, lissajous, butterfly, and more."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/mathcurveloader"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# MathCurveLoader

> Mathematical parametric curve loaders with neubrutalism aesthetics. 15 curve variants including rose, lissajous, butterfly, and more.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/mathcurveloader.json"
```

### Component Source Code (`components/ui/mathcurveloader.tsx`)

```tsx
/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { prefersReducedMotion, onReducedMotionChange } from '@/lib/motion-core'
import {
  buildPath,
  getPoint,
  getAngle,
  getDetailScale,
  getCurvePulseDuration,
  type LoaderCurveKey,
} from '@/lib/math-curves'

const mathCurveLoaderVariants = cva('', {
  variants: {
    size: {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const SPEED_DURATION: Record<string, number> = {
  slow: 9000,
  normal: 5500,
  fast: 3000,
}

export interface MathCurveLoaderProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof mathCurveLoaderVariants> {
  curve?: LoaderCurveKey
  speed?: 'slow' | 'normal' | 'fast'
  trackColor?: string
  headColor?: string
  strokeWidth?: number
  headSize?: number
}

const MathCurveLoader = React.forwardRef<SVGSVGElement, MathCurveLoaderProps>(
  (
    {
      className,
      size,
      curve = 'rose',
      speed = 'normal',
      trackColor,
      headColor,
      strokeWidth = 4,
      headSize = 8,
      'aria-label': ariaLabel = 'Loading',
      ...props
    },
    ref
  ) => {
    const pathRef = React.useRef<SVGPathElement>(null)
    const rectRef = React.useRef<SVGRectElement>(null)
    const rafRef = React.useRef<number>(0)
    const startTimeRef = React.useRef<number>(performance.now())

    const durationMs = SPEED_DURATION[speed] ?? SPEED_DURATION.normal

    // Rebuild static track path when curve changes
    const trackPath = React.useMemo(() => buildPath(curve, 1.0), [curve])

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

        // Update track path with breathing detail scale
        if (pathRef.current) {
          pathRef.current.setAttribute('d', buildPath(curve, detailScale))
        }

        // Update head rect position and rotation
        if (rectRef.current) {
          const cx = x
          const cy = y
          rectRef.current.setAttribute('x', String(cx - headSize / 2))
          rectRef.current.setAttribute('y', String(cy - headSize / 2))
          rectRef.current.setAttribute('transform', `rotate(${angle} ${cx} ${cy})`)
        }

      }

      const tick = () => {
        draw()
        rafRef.current = requestAnimationFrame(tick)
      }

      // A CSS media query can't stop a loop that mutates SVG attributes, so
      // the reduced-motion preference has to be consulted here. Paint one
      // static frame and stop; re-subscribing means flipping the OS setting
      // mid-session starts or stops the loop without a remount.
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
    }, [curve, speed, durationMs, headSize])

    const resolvedTrackStroke = trackColor ?? 'currentColor'
    const resolvedHeadFill = headColor ?? 'hsl(var(--primary))'

    return (
      <ErrorBoundary>
        <svg
          ref={ref}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          role="status"
          aria-label={ariaLabel}
          className={cn(
            mathCurveLoaderVariants({ size }),
            'group',
            className
          )}
          {...props}
        >
          {/* Track layer */}
          <path
            ref={pathRef}
            d={trackPath}
            fill="none"
            stroke={resolvedTrackStroke}
            strokeWidth={strokeWidth}
            strokeOpacity={0.2}
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="group-hover:[stroke-opacity:0.4] transition-[stroke-opacity] duration-200"
          />
          {/* Head square */}
          <rect
            ref={rectRef}
            width={headSize}
            height={headSize}
            x={50 - headSize / 2}
            y={50 - headSize / 2}
            fill={resolvedHeadFill}
            stroke="currentColor"
            strokeWidth={1.5}
          />
        </svg>
      </ErrorBoundary>
    )
  }
)
MathCurveLoader.displayName = 'MathCurveLoader'

export { MathCurveLoader, mathCurveLoaderVariants }
```

## Usage

```tsx
import { MathCurveLoader } from '@/components/ui/math-curve-loader'

export default function Example() {
  return <MathCurveLoader curve="rose" />
}
```

## Examples

### Curve Variants

17 parametric curves — each tracing a unique mathematical path. Note: spiral (Archimedean, r = b·t) and involute (r = a·t² visually) both produce outward-spiraling shapes but with different spacing between turns.

```tsx
<MathCurveLoader curve="rose" />
<MathCurveLoader curve="lissajous" />
<MathCurveLoader curve="butterfly" />
<MathCurveLoader curve="hypotrochoid" />
<MathCurveLoader curve="cardioid" />
<MathCurveLoader curve="lemniscate" />
<MathCurveLoader curve="fourier" />
<MathCurveLoader curve="rose3" />
<MathCurveLoader curve="astroid" />
<MathCurveLoader curve="deltoid" />
<MathCurveLoader curve="nephroid" />
<MathCurveLoader curve="epicycloid" />
<MathCurveLoader curve="superellipse" />
<MathCurveLoader curve="triskelion" />
<MathCurveLoader curve="involute" />
<MathCurveLoader curve="spiral" />
<MathCurveLoader curve="heart" />
```

### Sizes

Available sizes from extra small to extra large.

```tsx
<MathCurveLoader curve="rose" size="xs" />
<MathCurveLoader curve="rose" size="sm" />
<MathCurveLoader curve="rose" size="md" />
<MathCurveLoader curve="rose" size="lg" />
<MathCurveLoader curve="rose" size="xl" />
```

### Speed

Control animation speed from slow and meditative to fast and urgent.

```tsx
<MathCurveLoader curve="rose" speed="slow" />
<MathCurveLoader curve="rose" speed="normal" />
<MathCurveLoader curve="rose" speed="fast" />
```

### Custom Colors

Override track and head colors with any CSS color value.

```tsx
<MathCurveLoader
  curve="lissajous"
  trackColor="#f97316"
  headColor="#ea580c"
/>
<MathCurveLoader
  curve="butterfly"
  trackColor="#8b5cf6"
  headColor="#6d28d9"
/>
<MathCurveLoader
  curve="hypotrochoid"
  trackColor="#10b981"
  headColor="#065f46"
/>
```

