---
title: "Field"
description: "Combine labels, controls, and help text to compose accessible form fields and grouped inputs."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/field"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/field"
---

# Field

> Combine labels, controls, and help text to compose accessible form fields and grouped inputs.

> 🔗 **Original Source Code**: [`components/ui/field.tsx`](../ui/field.tsx)
> 📂 **Original Examples**: [`examples/ui/field/`](../examples/field/)

```tsx
"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function FieldDemo() {
  return (
    <form
      className="w-full max-w-md"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <FieldSet>
        <FieldLegend>Contact us</FieldLegend>
        <FieldDescription>
          Fill in the form and we will get back to you.
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-name">Name</FieldLabel>
            <Input id="field-name" placeholder="John Doe" />
          </Field>
          <Field>
            <FieldLabel htmlFor="field-email">Email</FieldLabel>
            <Input
              id="field-email"
              type="email"
              placeholder="john@example.com"
            />
            <FieldDescription>
              We will never share your email with anyone.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="field-message">Message</FieldLabel>
            <Textarea id="field-message" placeholder="Your message..." />
          </Field>
          <Field orientation="horizontal">
            <Button type="submit">Send message</Button>
            <Button type="button" variant="neutral">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
```

## Installation

The component depends on the <Link href="/docs/label">Label</Link> component. Add it first.

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/field.json"
```

### Component Source Code (`components/ui/field.tsx`)

```tsx
"use client"

import { cva, type VariantProps } from "class-variance-authority"

import * as React from "react"

import { Label } from "@/components/ui/label"

import { cn } from "@/lib/utils"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className,
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-1.5 font-heading data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className,
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className,
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "group/field flex w-full gap-2 font-base data-[invalid=true]:text-red-500",
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
        horizontal:
          "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        responsive:
          "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
        className,
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-base has-[>[data-slot=field]]:border-2 has-[>[data-slot=field]]:border-border has-[>[data-slot=field]]:bg-secondary-background has-[>[data-slot=field]]:has-data-checked:bg-main has-[>[data-slot=field]]:has-data-checked:text-main-foreground has-[>[data-slot=field]]:has-[:focus-visible]:ring-2 has-[>[data-slot=field]]:has-[:focus-visible]:ring-black has-[>[data-slot=field]]:has-[:focus-visible]:ring-offset-2 *:data-[slot=field]:p-2.5",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className,
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-heading group-data-[disabled=true]/field:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-left text-sm leading-normal font-base text-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
        "last:mt-0 nth-last-2:-mt-1",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-foreground",
        className,
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className,
      )}
      {...props}
    >
      <div
        role="separator"
        aria-orientation="horizontal"
        className="absolute inset-x-0 top-1/2 border-t-2 border-border"
      />
      {children && (
        <span
          className="relative mx-auto block w-fit bg-background px-2 font-base text-foreground"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = React.useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = Array.from(
      new Map(errors.map((error) => [error?.message, error])).values(),
    )

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>,
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-sm font-base text-red-500", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
```


## Usage

```ts
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field'
```

```tsx
<FieldSet>
  <FieldLegend>Profile</FieldLegend>
  <FieldDescription>Update your public profile.</FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="name">Name</FieldLabel>
      <Input id="name" />
      <FieldDescription>Displayed on your profile.</FieldDescription>
      <FieldError errors={[{ message: 'Name is required.' }]} />
    </Field>
  </FieldGroup>
</FieldSet>
```

`Field` accepts an `orientation` of `vertical` (default), `horizontal` or `responsive`. Set `data-invalid` on a `Field` to put it in the error state and `data-disabled` to dim it.

## Examples

### Default

```tsx
"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function FieldDemo() {
  return (
    <form
      className="w-full max-w-md"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <FieldSet>
        <FieldLegend>Contact us</FieldLegend>
        <FieldDescription>
          Fill in the form and we will get back to you.
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-name">Name</FieldLabel>
            <Input id="field-name" placeholder="John Doe" />
          </Field>
          <Field>
            <FieldLabel htmlFor="field-email">Email</FieldLabel>
            <Input
              id="field-email"
              type="email"
              placeholder="john@example.com"
            />
            <FieldDescription>
              We will never share your email with anyone.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="field-message">Message</FieldLabel>
            <Textarea id="field-message" placeholder="Your message..." />
          </Field>
          <Field orientation="horizontal">
            <Button type="submit">Send message</Button>
            <Button type="button" variant="neutral">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
```

### Horizontal

Use `orientation="horizontal"` to place a control next to its label. Wrap the label and description in `FieldContent` when you have both.

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export default function FieldHorizontalDemo() {
  return (
    <FieldGroup className="max-w-md">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="field-airplane">Airplane Mode</FieldLabel>
          <FieldDescription>
            Turn on airplane mode to disable all connections.
          </FieldDescription>
        </FieldContent>
        <Switch id="field-airplane" />
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="field-newsletter" defaultChecked />
        <FieldContent>
          <FieldLabel htmlFor="field-newsletter">
            Subscribe to newsletter
          </FieldLabel>
          <FieldDescription>
            Receive weekly updates about new features and promotions.
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  )
}
```

### Choice Card

Wrap a `Field` in a `FieldLabel` to turn the whole field into a clickable card. The card is highlighted when the control inside it is checked.

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const plans = [
  {
    id: "free",
    title: "Free",
    description: "For hobby projects and experiments.",
  },
  {
    id: "pro",
    title: "Pro",
    description: "For professionals and small teams.",
  },
  {
    id: "team",
    title: "Team",
    description: "For growing organizations.",
  },
]

export default function FieldChoiceCardDemo() {
  return (
    <FieldSet className="w-full max-w-sm">
      <FieldLegend variant="label">Subscription plan</FieldLegend>
      <RadioGroup defaultValue="pro">
        {plans.map((plan) => (
          <FieldLabel key={plan.id} htmlFor={`plan-${plan.id}`}>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>{plan.title}</FieldTitle>
                <FieldDescription>{plan.description}</FieldDescription>
              </FieldContent>
              <RadioGroupItem value={plan.id} id={`plan-${plan.id}`} />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </FieldSet>
  )
}
```

### With Error

`FieldError` renders a single message or a list when the `errors` array contains more than one unique message. It works with `react-hook-form`'s `fieldState.error`.

```tsx
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldWithErrorDemo() {
  return (
    <Field data-invalid className="max-w-sm">
      <FieldLabel htmlFor="field-username">Username</FieldLabel>
      <Input
        id="field-username"
        defaultValue="ab"
        aria-invalid
        className="border-red-500"
      />
      <FieldDescription>Pick a unique username.</FieldDescription>
      <FieldError
        errors={[
          { message: "Username must be at least 3 characters." },
          { message: "Username is already taken." },
        ]}
      />
    </Field>
  )
}
```
