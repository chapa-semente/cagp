---
title: "Progress"
description: "Displays an indicator showing the completion progress of a task with bold neubrutalism styling."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/progress"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "radix-ui"
---

# Progress

> Displays an indicator showing the completion progress of a task with bold neubrutalism styling.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/progress.json"
```

### Component Source Code (`components/ui/progress.tsx`)

```tsx
import * as React from 'react'
import { Progress as ProgressPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

type ProgressVariant =
  /** Continuous fill. The pre-v3.5 default. */
  | 'smooth'
  /** Fill snaps forward in ten discrete notches. */
  | 'stepped'
  /** Indeterminate — a block travelling the track. Ignores `value`. */
  | 'marquee'

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: ProgressVariant
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant = 'smooth', max = 100, ...props }, ref) => {
  const indeterminate = variant === 'marquee'
  // Clamp against `max`, not a hard 100 — otherwise a max of 200 renders a full
  // bar while aria-valuenow reports half. Percent drives the fill; the raw
  // clamped value is what Radix exposes to AT.
  const safeMax = max > 0 ? max : 100
  const clampedValue = Math.max(0, Math.min(safeMax, value ?? 0))
  const percent = (clampedValue / safeMax) * 100
  // Radix reads null as indeterminate and drops aria-valuenow. Pass the clamped
  // value so an out-of-range `value` can't trip Radix's range warning, and keep
  // an omitted value indeterminate the way it was before v3.5.
  const ariaValue = indeterminate || value == null ? null : clampedValue
  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={ariaValue}
      max={safeMax}
      className={cn(
        'relative h-5 w-full overflow-hidden border-3 border-foreground bg-muted shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full w-full flex-1 bg-primary transition duration-500 ease-out',
          variant === 'stepped' && 'bk-progress-stepped',
          indeterminate && 'bk-progress-marquee'
        )}
        style={
          indeterminate ? undefined : { transform: `translateX(-${100 - percent}%)` }
        }
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
export type { ProgressVariant }
```

## Usage

```tsx
import { Progress } from '@/components/ui/progress'

export default function Example() {
  return <Progress value={60} />
}
```

## Examples

### Motion variants

`smooth` fills continuously (the default). `stepped` snaps forward in ten discrete notches. `marquee` is indeterminate — it ignores `value` and drops aria-valuenow. The two bars below are driven 0 → 100 on a loop, since the difference only shows while the fill is travelling. Requires styles/motion.css.

```tsx
const [value, setValue] = useState(0)

useEffect(() => {
  const timer = setInterval(() => setValue((v) => (v === 0 ? 100 : 0)), 1600)
  return () => clearInterval(timer)
}, [])

<Progress value={value} variant="smooth" />
<Progress value={value} variant="stepped" />
<Progress variant="marquee" aria-label="Loading" />
```

### Basic

A simple progress bar showing completion percentage.

```tsx
<Progress value={60} />
```

### Different Values

Progress bars at various completion levels.

```tsx
<Progress value={0} />
<Progress value={25} />
<Progress value={50} />
<Progress value={75} />
<Progress value={100} />
```

### Animated

Progress bar with animated value changes.

```tsx
const [progress, setProgress] = useState(0)

useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prev) => (prev >= 100 ? 0 : prev + 10))
  }, 1000)
  return () => clearInterval(timer)
}, [])

<Progress value={progress} />
```

### With Label

Display progress value alongside the bar.

```tsx
<div className="flex items-center gap-4">
  <Progress value={66} className="flex-1" />
  <span className="text-sm font-bold">66%</span>
</div>
```

### Custom Height

Adjust the height of the progress bar.

```tsx
<Progress value={50} className="h-2" />
<Progress value={50} className="h-5" />
<Progress value={50} className="h-8" />
```

### Loading State

Show loading progress without a specific value.

```tsx
<Progress className="animate-pulse" />
```

