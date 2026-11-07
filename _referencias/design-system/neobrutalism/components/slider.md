---
title: "Slider"
description: "An input where the user selects a value from within a given range."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/slider"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/slider"
---

# Slider

> An input where the user selects a value from within a given range.

> 🔗 **Original Source Code**: [`components/ui/slider.tsx`](../ui/slider.tsx)
> 📂 **Original Examples**: [`examples/ui/slider/`](../examples/slider/)

```tsx
import { Slider } from "@/components/ui/slider"

export default function SliderDemo() {
  return <Slider defaultValue={[33]} max={100} step={1} />
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/slider.json"
```

### Component Source Code (`components/ui/slider.tsx`)

```tsx
"use client"

import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import * as React from "react"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      className={cn(
        "data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Control
        data-slot="slider-control"
        className="relative flex w-full touch-none select-none items-center data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col"
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-base bg-secondary-background border-2 border-border select-none data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-main select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="block size-5 shrink-0 rounded-full border-2 border-border bg-white ring-offset-white transition-colors select-none has-focus-visible:outline-none has-focus-visible:ring-2 has-focus-visible:ring-ring has-focus-visible:ring-offset-2 data-disabled:pointer-events-none data-disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
```


## Usage

```ts
import { Slider } from '@/components/ui/slider'
```

```tsx
<Slider defaultValue={[33]} max={100} step={1} />
```

## Examples

### Default

```tsx
import { Slider } from "@/components/ui/slider"

export default function SliderDemo() {
  return <Slider defaultValue={[33]} max={100} step={1} />
}
```

### Two Thumbs

```tsx
"use client"

import { Slider } from "@/components/ui/slider"

export default function TwoThumbsSliderDemo() {
  return <Slider defaultValue={[25, 50]} max={100} step={1} />
}
```

### Vertical

```tsx
"use client"

import { Slider } from "@/components/ui/slider"

export default function VerticalSliderDemo() {
  return (
    <Slider defaultValue={[25]} max={100} step={1} orientation="vertical" />
  )
}
```

### Controlled

```tsx
"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function SliderControlled() {
  const [value, setValue] = React.useState([0.3, 0.7])

  return (
    <div className="grid w-full gap-3">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="slider-demo-temperature">Temperature</Label>
        <span className="text-foreground font-base text-sm">
          {value.join(", ")}
        </span>
      </div>
      <Slider
        id="slider-demo-temperature"
        value={value}
        onValueChange={(value) => setValue(value as number[])}
        min={0}
        max={1}
        step={0.1}
      />
    </div>
  )
}
```
