---
title: "Skeleton"
description: "A placeholder loading animation with neubrutalism styling to indicate content is being loaded."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/skeleton"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# Skeleton

> A placeholder loading animation with neubrutalism styling to indicate content is being loaded.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/skeleton.json"
```

### Component Source Code (`components/ui/skeleton.tsx`)

```tsx
/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const skeletonVariants = cva('bg-muted border-2 border-foreground/20', {
  variants: {
    variant: {
      /** Soft opacity breathe. The pre-v3.5 default. */
      pulse: 'animate-pulse',
      /** Hard on/off — no interpolated fade. */
      stamp: 'bk-skeleton-stamp',
      /** Marching cells on a stepped loop. */
      blocks: 'bk-skeleton-blocks',
      /** A hard bar sweeping across the block. */
      scan: 'bk-skeleton-scan',
      /** No motion at all. */
      none: '',
    },
  },
  defaultVariants: {
    variant: 'pulse',
  },
})

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div
      // ponytail: decorative placeholder — hidden from AT. Announce loading on
      // the container instead (aria-busy / role="status"), not per-skeleton.
      aria-hidden="true"
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Skeleton, skeletonVariants }
```

## Usage

```tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function Example() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

## Examples

### Motion variants

Four loading rhythms. `pulse` is the default soft breathe; `stamp`, `blocks` and `scan` are stepped and hard-edged. All respect prefers-reduced-motion. Requires styles/motion.css.

```tsx
<Skeleton variant="pulse"  className="h-12 w-full" />
<Skeleton variant="stamp"  className="h-12 w-full" />
<Skeleton variant="blocks" className="h-12 w-full" />
<Skeleton variant="scan"   className="h-12 w-full" />
<Skeleton variant="none"   className="h-12 w-full" />
```

### Card

A skeleton that resembles a card layout.

```tsx
<div className="flex flex-col space-y-3">
  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>
```

### Profile

A skeleton that resembles a user profile.

```tsx
<div className="flex items-center space-x-4">
  <Skeleton className="h-16 w-16 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-5 w-[150px]" />
    <Skeleton className="h-4 w-[100px]" />
  </div>
</div>
```

### List

A skeleton that resembles a list of items.

```tsx
<div className="space-y-4">
  {[1, 2, 3].map((i) => (
    <div key={i} className="flex items-center space-x-4">
      <Skeleton className="h-10 w-10" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  ))}
</div>
```

