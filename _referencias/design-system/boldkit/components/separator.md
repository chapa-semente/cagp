---
title: "Separator"
description: "Visually or semantically separates content with a bold 3px line."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/separator"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "radix-ui"
---

# Separator

> Visually or semantically separates content with a bold 3px line.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/separator.json"
```

### Component Source Code (`components/ui/separator.tsx`)

```tsx
import * as React from 'react'
import { Separator as SeparatorPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-foreground',
        orientation === 'horizontal' ? 'h-[3px] w-full' : 'h-full w-[3px]',
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
```

## Usage

```tsx
import { Separator } from '@/components/ui/separator'

export default function Example() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-bold">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="text-sm">More content here</div>
    </div>
  )
}
```

## Examples

### Horizontal

A horizontal separator to divide vertical content.

```tsx
<div>
  <h4 className="font-bold">Section 1</h4>
  <p className="text-sm text-muted-foreground">Content for section 1.</p>
</div>
<Separator className="my-4" />
<div>
  <h4 className="font-bold">Section 2</h4>
  <p className="text-sm text-muted-foreground">Content for section 2.</p>
</div>
```

### Vertical

A vertical separator to divide horizontal content.

```tsx
<div className="flex h-5 items-center space-x-4 text-sm">
  <div>Blog</div>
  <Separator orientation="vertical" />
  <div>Docs</div>
  <Separator orientation="vertical" />
  <div>Source</div>
</div>
```

### In a Card

Use separators to divide content within cards.

```tsx
<div className="border-3 border-foreground p-4 bk-shadow max-w-sm">
  <div className="flex items-center justify-between">
    <h3 className="font-bold uppercase">Profile</h3>
    <button className="text-sm text-primary">Edit</button>
  </div>
  <Separator className="my-4" />
  <div className="space-y-3">
    <div className="flex justify-between">
      <span className="text-sm text-muted-foreground">Name</span>
      <span className="text-sm font-medium">John Doe</span>
    </div>
    <div className="flex justify-between">
      <span className="text-sm text-muted-foreground">Email</span>
      <span className="text-sm font-medium">john@example.com</span>
    </div>
  </div>
  <Separator className="my-4" />
  <div className="flex justify-end">
    <button className="text-sm text-destructive">Delete Account</button>
  </div>
</div>
```

### Navigation

Separate navigation items in a menu.

```tsx
<nav className="space-y-1">
  <a href="#" className="block py-2 font-medium">Dashboard</a>
  <a href="#" className="block py-2 font-medium">Analytics</a>
  <Separator className="my-2" />
  <a href="#" className="block py-2 font-medium">Settings</a>
  <a href="#" className="block py-2 font-medium">Help</a>
  <Separator className="my-2" />
  <a href="#" className="block py-2 text-destructive font-medium">Logout</a>
</nav>
```

### With Text

Create a separator with text in the middle.

```tsx
<div className="relative">
  <div className="absolute inset-0 flex items-center">
    <Separator className="w-full" />
  </div>
  <div className="relative flex justify-center text-xs uppercase">
    <span className="bg-background px-2 text-muted-foreground font-bold">
      Or continue with
    </span>
  </div>
</div>
```

