---
title: "Toggle"
description: "A two-state button that can be toggled on or off with bold neubrutalism styling."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/toggle"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "radix-ui"
---

# Toggle

> A two-state button that can be toggled on or off with bold neubrutalism styling.

> 🔗 **Original Source Code**: [`components/ui/toggle.tsx`](../ui/toggle.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/toggle.json"
```

### Component Source Code (`components/ui/toggle.tsx`)

```tsx
/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { Toggle as TogglePrimitive } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const toggleVariants = cva(
  'inline-flex items-center justify-center text-sm font-bold uppercase tracking-wide bk-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:translate-x-[4px] data-[state=on]:translate-y-[4px] data-[state=on]:shadow-none',
  {
    variants: {
      variant: {
        default: 'bg-transparent hover:bg-muted',
        outline: 'bg-background hover:bg-muted',
      },
      size: {
        default: 'h-10 px-3 min-w-10',
        sm: 'h-9 px-2.5 min-w-9',
        lg: 'h-11 px-5 min-w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
```

## Usage

```tsx
import { Toggle } from '@/components/ui/toggle'
import { Bold } from 'lucide-react'

export default function Example() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}
```

## Examples

### With Text

Toggle button with text content.

```tsx
<Toggle aria-label="Toggle italic">
  <Italic className="h-4 w-4" />
  Italic
</Toggle>
```

### Outline

Toggle with outline variant styling.

```tsx
<Toggle variant="outline" aria-label="Toggle underline">
  <Underline className="h-4 w-4" />
</Toggle>
```

### Sizes

Toggle buttons in different sizes.

```tsx
<Toggle size="sm" aria-label="Toggle small">
  <Bold className="h-4 w-4" />
</Toggle>

<Toggle size="default" aria-label="Toggle default">
  <Bold className="h-4 w-4" />
</Toggle>

<Toggle size="lg" aria-label="Toggle large">
  <Bold className="h-4 w-4" />
</Toggle>
```

### Disabled

A disabled toggle that cannot be interacted with.

```tsx
<Toggle aria-label="Toggle disabled" disabled>
  <Bold className="h-4 w-4" />
</Toggle>
```

### Default Pressed

Toggle that starts in the pressed state.

```tsx
<Toggle defaultPressed aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>
```

