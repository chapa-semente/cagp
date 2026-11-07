---
title: "Checkbox"
description: "The BoldKit Checkbox is a neubrutalism-styled form input built on Radix UI Checkbox, with a thick 3px border and a bold check icon for clear visual feedback. It supports controlled and uncontrolled usage, the indeterminate state for tri-state selection, and is fully keyboard and screen-reader accessible. Pair it with the Label component for properly associated, accessible form controls."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/checkbox"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "radix-ui"
---

# Checkbox

> The BoldKit Checkbox is a neubrutalism-styled form input built on Radix UI Checkbox, with a thick 3px border and a bold check icon for clear visual feedback. It supports controlled and uncontrolled usage, the indeterminate state for tri-state selection, and is fully keyboard and screen-reader accessible. Pair it with the Label component for properly associated, accessible form controls.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/checkbox.json"
```

### Component Source Code (`components/ui/checkbox.tsx`)

```tsx
import * as React from 'react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-5 w-5 shrink-0 border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="h-4 w-4 stroke-[3]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
```

## Usage

```tsx
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function Example() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}
```

## Examples

### Basic

A simple checkbox with a label.

```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

### Controlled

Control the checkbox state programmatically.

```tsx
const [checked, setChecked] = useState(false)

<div className="flex items-center space-x-2">
  <Checkbox
    id="controlled"
    checked={checked}
    onCheckedChange={setChecked}
  />
  <Label htmlFor="controlled">
    {checked ? 'Checked' : 'Unchecked'}
  </Label>
</div>
```

### Disabled

Disable the checkbox to prevent interaction.

```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="disabled" disabled />
  <Label htmlFor="disabled" className="opacity-50">Disabled checkbox</Label>
</div>
<div className="flex items-center space-x-2">
  <Checkbox id="disabled-checked" disabled checked />
  <Label htmlFor="disabled-checked" className="opacity-50">Disabled checked</Label>
</div>
```

### Checkbox Group

Group multiple checkboxes together for related options.

```tsx
<div className="space-y-3">
  <div className="flex items-center space-x-2">
    <Checkbox id="option1" />
    <Label htmlFor="option1">Email notifications</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="option2" />
    <Label htmlFor="option2">SMS notifications</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="option3" />
    <Label htmlFor="option3">Push notifications</Label>
  </div>
</div>
```

### With Description

Add additional description text below the label.

```tsx
<div className="flex items-start space-x-2">
  <Checkbox id="marketing" className="mt-1" />
  <div className="grid gap-1.5 leading-none">
    <Label htmlFor="marketing">Marketing emails</Label>
    <p className="text-sm text-muted-foreground">
      Receive emails about new products, features, and more.
    </p>
  </div>
</div>
```

