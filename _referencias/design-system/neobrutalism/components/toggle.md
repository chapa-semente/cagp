---
title: "Toggle"
description: "A two-state button that can be either on or off."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/toggle"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/toggle"
---

# Toggle

> A two-state button that can be either on or off.

> 🔗 **Original Source Code**: [`components/ui/toggle.tsx`](../ui/toggle.tsx)
> 📂 **Original Examples**: [`examples/ui/toggle/`](../examples/toggle/)

```tsx
import { BoldIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bold" defaultPressed>
      <BoldIcon />
    </Toggle>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/toggle.json"
```

### Component Source Code (`components/ui/toggle.tsx`)

```tsx
"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import * as React from "react"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-base border-2 border-border text-sm font-heading whitespace-nowrap transition-all outline-none ring-offset-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 aria-pressed:bg-main aria-pressed:text-main-foreground data-pressed:bg-main data-pressed:text-main-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-secondary-background text-foreground",
        outline: "bg-secondary-background text-foreground",
      },
      size: {
        default:
          "h-10 min-w-10 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        sm: "h-9 min-w-9 px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 min-w-11 px-4 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
```


## Usage

```ts
import { Toggle } from '@/components/ui/toggle'
```

```tsx
<Toggle>Toggle</Toggle>
```

## Examples

### Default

```tsx
import { BoldIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bold" defaultPressed>
      <BoldIcon />
    </Toggle>
  )
}
```

### Outline

Use `variant="outline"` for an outline style.

```tsx
import { BoldIcon, ItalicIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleOutlineDemo() {
  return (
    <div className="flex items-center gap-2">
      <Toggle variant="outline" aria-label="Toggle bold" defaultPressed>
        <BoldIcon />
        Bold
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle italic">
        <ItalicIcon />
        Italic
      </Toggle>
    </div>
  )
}
```

### With Text

```tsx
import { ItalicIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleWithTextDemo() {
  return (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  )
}
```

### Size

Use the `size` prop to change the size of the toggle.

```tsx
import { Toggle } from "@/components/ui/toggle"

export default function ToggleSizeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" aria-label="Toggle small" size="sm">
        Small
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle default" size="default">
        Default
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle large" size="lg">
        Large
      </Toggle>
    </div>
  )
}
```

### Disabled

```tsx
import { UnderlineIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleDisabledDemo() {
  return (
    <Toggle aria-label="Toggle underline" disabled>
      <UnderlineIcon />
    </Toggle>
  )
}
```
