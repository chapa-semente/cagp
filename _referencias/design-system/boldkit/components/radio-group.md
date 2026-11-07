---
title: "Radio Group"
description: "A set of checkable buttons where only one can be checked at a time with bold neubrutalism styling."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/radio-group"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "radix-ui"
---

# Radio Group

> A set of checkable buttons where only one can be checked at a time with bold neubrutalism styling.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/radio-group.json"
```

### Component Source Code (`components/ui/radio-group.tsx`)

```tsx
import * as React from 'react'
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import { Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-5 w-5 rounded-full border-3 border-foreground bg-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none data-[state=checked]:bg-primary',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-primary stroke-none" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
```

## Usage

```tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export default function Example() {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  )
}
```

## Examples

### Basic

A simple radio group with options.

```tsx
<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>
```

### Controlled

Control the selected value programmatically.

```tsx
const [value, setValue] = useState('comfortable')

<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="controlled-1" />
    <Label htmlFor="controlled-1">Default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="controlled-2" />
    <Label htmlFor="controlled-2">Comfortable</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="compact" id="controlled-3" />
    <Label htmlFor="controlled-3">Compact</Label>
  </div>
</RadioGroup>

<p>Selected: {value}</p>
```

### Disabled

Disable individual radio items or the entire group.

```tsx
<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="disabled-1" />
    <Label htmlFor="disabled-1">Available</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="disabled-2" disabled />
    <Label htmlFor="disabled-2" className="opacity-50">Disabled</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-three" id="disabled-3" />
    <Label htmlFor="disabled-3">Available</Label>
  </div>
</RadioGroup>
```

### With Descriptions

Add descriptions to each radio option.

```tsx
<RadioGroup defaultValue="card">
  <div className="flex items-start space-x-2">
    <RadioGroupItem value="card" id="card" className="mt-1" />
    <div className="grid gap-1.5 leading-none">
      <Label htmlFor="card">Card</Label>
      <p className="text-sm text-muted-foreground">
        Pay with credit or debit card.
      </p>
    </div>
  </div>
  <div className="flex items-start space-x-2">
    <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
    <div className="grid gap-1.5 leading-none">
      <Label htmlFor="paypal">PayPal</Label>
      <p className="text-sm text-muted-foreground">
        Pay with your PayPal account.
      </p>
    </div>
  </div>
  <div className="flex items-start space-x-2">
    <RadioGroupItem value="bank" id="bank" className="mt-1" />
    <div className="grid gap-1.5 leading-none">
      <Label htmlFor="bank">Bank Transfer</Label>
      <p className="text-sm text-muted-foreground">
        Pay directly from your bank account.
      </p>
    </div>
  </div>
</RadioGroup>
```

### Horizontal Layout

Display radio options in a horizontal row.

```tsx
<RadioGroup defaultValue="small" className="flex gap-4">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="small" id="small" />
    <Label htmlFor="small">Small</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="medium" id="medium" />
    <Label htmlFor="medium">Medium</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="large" id="large" />
    <Label htmlFor="large">Large</Label>
  </div>
</RadioGroup>
```

