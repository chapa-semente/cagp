---
title: "Field"
description: "A composition layer that pairs a label, control, description and error message into a consistent form field."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/field"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# Field

> A composition layer that pairs a label, control, description and error message into a consistent form field.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/field.json"
```

### Component Source Code (`components/ui/field.tsx`)

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

/** A vertical stack of related fields. */
const FieldGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-5', className)} {...props} />
))
FieldGroup.displayName = 'FieldGroup'

/** A single form field: groups a label, control, description and error. */
const Field = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props} />
))
Field.displayName = 'Field'

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => (
  <Label ref={ref} className={cn('text-xs', className)} {...props} />
))
FieldLabel.displayName = 'FieldLabel'

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-xs font-medium text-muted-foreground', className)}
    {...props}
  />
))
FieldDescription.displayName = 'FieldDescription'

const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  if (!children) return null
  return (
    <p
      ref={ref}
      role="alert"
      className={cn(
        'text-xs font-bold uppercase tracking-wide text-destructive',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
})
FieldError.displayName = 'FieldError'

export { Field, FieldGroup, FieldLabel, FieldDescription, FieldError }
```

## Usage

```tsx
import {
  Field,
  FieldDescription,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export default function Example() {
  return (
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" placeholder="you@example.com" />
      <FieldDescription>We'll never share your email.</FieldDescription>
    </Field>
  )
}
```

## Examples

### With Error

Render a validation error below the control.

```tsx
<Field>
  <FieldLabel htmlFor="username">Username</FieldLabel>
  <Input id="username" defaultValue="ab" />
  <FieldError>Username must be at least 3 characters.</FieldError>
</Field>
```

