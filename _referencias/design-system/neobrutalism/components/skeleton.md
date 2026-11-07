---
title: "Skeleton"
description: "Use to show a placeholder while content is loading."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/skeleton"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/skeleton"
---

# Skeleton

> Use to show a placeholder while content is loading.

> 🔗 **Original Source Code**: [`components/ui/skeleton.tsx`](../ui/skeleton.tsx)
> 📂 **Original Examples**: [`examples/ui/skeleton/`](../examples/skeleton/)

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 sm:w-[250px] w-[100px]" />
        <Skeleton className="h-4 sm:w-[200px] w-[100px]" />
      </div>
    </div>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/skeleton.json"
```

### Component Source Code (`components/ui/skeleton.tsx`)

```tsx
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-base bg-secondary-background border-2 border-border",
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
```


## Usage

```ts
import { Skeleton } from '@/components/ui/skeleton'
```

```tsx
<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 sm:w-[250px] w-[100px]" />
    <Skeleton className="h-4 sm:w-[200px] w-[100px]" />
  </div>
</div>
```

## Examples

### Default

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 sm:w-[250px] w-[100px]" />
        <Skeleton className="h-4 sm:w-[200px] w-[100px]" />
      </div>
    </div>
  )
}
```
