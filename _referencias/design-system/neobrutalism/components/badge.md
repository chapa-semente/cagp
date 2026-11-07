---
title: "Badge"
description: "Displays a badge or a component that looks like a badge."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/badge"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/badge"
---

# Badge

> Displays a badge or a component that looks like a badge.

> 🔗 **Original Source Code**: [`components/ui/badge.tsx`](../ui/badge.tsx)
> 📂 **Original Examples**: [`examples/ui/badge/`](../examples/badge/)

```tsx
import { Badge } from "@/components/ui/badge"

export default function BadgeDemo() {
  return <Badge>Badge</Badge>
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/badge.json"
```

### Component Source Code (`components/ui/badge.tsx`)

```tsx
"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-base border-2 border-border px-2.5 py-0.5 text-xs font-base w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        neutral: "bg-secondary-background text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Badge({
  className,
  variant,
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    state: {
      slot: "badge",
      variant: variant ?? "default",
    },
  })
}

export { Badge, badgeVariants }
```


## Usage

```ts
import { Badge } from '@/components/ui/badge'
```

```tsx
<Badge>Badge</Badge>
```

## Examples

### Default

```tsx
import { Badge } from "@/components/ui/badge"

export default function BadgeDemo() {
  return <Badge>Badge</Badge>
}
```

### Neutral

```tsx
import { Badge } from "@/components/ui/badge"

export default function BadgeNeutralDemo() {
  return <Badge variant="neutral">Neutral</Badge>
}
```

### With Icon

```tsx
import { CheckIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export default function BadgeWithIconDemo() {
  return (
    <Badge>
      <CheckIcon />
      Badge
    </Badge>
  )
}
```
