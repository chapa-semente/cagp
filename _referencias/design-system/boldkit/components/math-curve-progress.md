---
title: "Math Curve Progress"
description: "A progress indicator that traces a mathematical curve — the head moves along the curve path proportionally from 0 to 100%."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/math-curve-progress"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# Math Curve Progress

> A progress indicator that traces a mathematical curve — the head moves along the curve path proportionally from 0 to 100%.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/math-curve-progress.json"
```

### Component Source Code (`components/ui/math-curve-progress.tsx`)

```tsx
/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import {
  buildPath,
  getPoint,
  getAngle,
  type ProgressCurveKey,
} from '@/lib/math-curves'

const mathCurveProgressVariants = cva('', {
  variants: {
    size: {
      sm: 'w-12 h-12',
      md: 'w-16 h-16',
      lg: 'w-24 h-24',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface MathCurveProgressProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof mathCurveProgressVariants> {
  value: number
  curve?: ProgressCurveKey
  showValue?: boolean
  trackColor?: string
  fillColor?: string
  strokeWidth?: number
}

const MathCurveProgress = React.forwardRef<SVGSVGElement, MathCurveProgressProps>(
  (
    {
      className,
      size,
      value,
      curve = 'spiral',
      showValue = false,
      trackColor,
      fillColor,
      strokeWidth = 4,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value))
    const progress = clampedValue / 100

    const trackPath = React.useMemo(() => buildPath(curve, 1.0), [curve])
    const headPoint = React.useMemo(() => getPoint(curve, progress), [curve, progress])
    const headAngle = React.useMemo(() => getAngle(curve, progress), [curve, progress])
    const HEAD_SIZE = 8

    const resolvedTrackStroke = trackColor ?? 'currentColor'
    const resolvedFillColor = fillColor ?? 'hsl(var(--primary))'

    return (
      <ErrorBoundary>
        <svg
          ref={ref}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${Math.round(clampedValue)}% progress`}
          className={cn(mathCurveProgressVariants({ size }), className)}
          {...props}
        >
          {/* Track layer */}
          <path
            d={trackPath}
            fill="none"
            stroke={resolvedTrackStroke}
            strokeWidth={strokeWidth}
            strokeOpacity={0.2}
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          {/* Head square — CSS transition for smooth value-driven movement */}
          <rect
            width={HEAD_SIZE}
            height={HEAD_SIZE}
            x={headPoint.x - HEAD_SIZE / 2}
            y={headPoint.y - HEAD_SIZE / 2}
            fill={resolvedFillColor}
            stroke="currentColor"
            strokeWidth={1.5}
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
              transform: `rotate(${headAngle}deg)`,
              transition: 'transform 300ms ease',
            }}
          />
          {/* Optional numeric label */}
          {showValue && (
            <text
              x={50}
              y={50}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={12}
              fontWeight={700}
              fill="currentColor"
              letterSpacing="0.05em"
              style={{ userSelect: 'none', fontFamily: 'inherit' }}
            >
              {Math.round(clampedValue)}%
            </text>
          )}
        </svg>
      </ErrorBoundary>
    )
  }
)
MathCurveProgress.displayName = 'MathCurveProgress'

export { MathCurveProgress, mathCurveProgressVariants }
```

## Usage

```tsx
import { MathCurveProgress } from '@/components/ui/math-curve-progress'

export default function Example() {
  return <MathCurveProgress value={65} curve="spiral" />
}
```

## Examples

### Curve Variants

Nine mathematical curve shapes for unique progress visualizations.

```tsx
<MathCurveProgress value={65} curve="spiral" size="md" />
<MathCurveProgress value={65} curve="heart" size="md" />
<MathCurveProgress value={65} curve="lissajous" size="md" />
<MathCurveProgress value={65} curve="cardioid" size="md" />
<MathCurveProgress value={65} curve="rose" size="md" />
<MathCurveProgress value={65} curve="astroid" size="md" />
<MathCurveProgress value={65} curve="superellipse" size="md" />
<MathCurveProgress value={65} curve="deltoid" size="md" />
<MathCurveProgress value={65} curve="nephroid" size="md" />
```

### Progress Values

The curve head moves proportionally along the path as value increases from 0 to 100.

```tsx
<MathCurveProgress value={10} curve="spiral" size="md" />
<MathCurveProgress value={25} curve="spiral" size="md" />
<MathCurveProgress value={50} curve="spiral" size="md" />
<MathCurveProgress value={75} curve="spiral" size="md" />
<MathCurveProgress value={100} curve="spiral" size="md" />
```

### With Value Label

Display the numeric percentage value alongside the curve progress indicator.

```tsx
<MathCurveProgress value={60} curve="spiral" size="lg" showValue />
<MathCurveProgress value={60} curve="heart" size="lg" showValue />
<MathCurveProgress value={60} curve="rose" size="lg" showValue />
```

### Sizes

Three sizes to fit different contexts — from compact inline indicators to large hero displays.

```tsx
<MathCurveProgress value={50} curve="spiral" size="sm" />
<MathCurveProgress value={50} curve="spiral" size="md" />
<MathCurveProgress value={50} curve="spiral" size="lg" />
```

