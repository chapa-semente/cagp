---
title: "Label"
description: "Renders an accessible label associated with form controls with bold uppercase styling."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/label"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "radix-ui"
---

# Label

> Renders an accessible label associated with form controls with bold uppercase styling.

> 🔗 **Original Source Code**: [`components/ui/label.tsx`](../ui/label.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/label.json"
```

### Component Source Code (`components/ui/label.tsx`)

```tsx
import * as React from 'react'
import { Label as LabelPrimitive } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const labelVariants = cva(
  'text-sm font-bold uppercase tracking-wide leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
```

## Usage

```tsx
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function Example() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}
```

## Examples

### Basic

A simple label with an input field.

```tsx
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>
```

### With Checkbox

Labels work seamlessly with checkboxes.

```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

### Required Field

Indicate required fields with an asterisk.

```tsx
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="username">
    Username <span className="text-destructive">*</span>
  </Label>
  <Input type="text" id="username" placeholder="Enter username" required />
</div>
```

### With Helper Text

Add helper text below the input for additional context.

```tsx
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="password">Password</Label>
  <Input type="password" id="password" placeholder="Enter password" />
  <p className="text-sm text-muted-foreground">
    Password must be at least 8 characters.
  </p>
</div>
```

### Disabled State

Labels automatically adjust when the associated input is disabled.

```tsx
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="disabled-input">Disabled Field</Label>
  <Input type="text" id="disabled-input" placeholder="Cannot edit" disabled />
</div>
```

### Form Layout

Use labels in a typical form layout.

```tsx
<form className="grid w-full max-w-sm gap-4">
  <div className="grid gap-1.5">
    <Label htmlFor="first-name">First Name</Label>
    <Input id="first-name" placeholder="John" />
  </div>
  <div className="grid gap-1.5">
    <Label htmlFor="last-name">Last Name</Label>
    <Input id="last-name" placeholder="Doe" />
  </div>
  <div className="grid gap-1.5">
    <Label htmlFor="email-form">Email</Label>
    <Input id="email-form" type="email" placeholder="john@example.com" />
  </div>
</form>
```

