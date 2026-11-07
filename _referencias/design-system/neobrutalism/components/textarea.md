---
title: "Textarea"
description: "Displays a form textarea or a component that looks like a textarea."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/textarea"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/textarea"
---

# Textarea

> Displays a form textarea or a component that looks like a textarea.

```tsx
import { Textarea } from "@/components/ui/textarea"

export default function TextareaDemo() {
  return <Textarea placeholder="Type your message here." />
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/textarea.json"
```

### Component Source Code (`components/ui/textarea.tsx`)

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[80px] w-full rounded-base border-2 border-border bg-secondary-background selection:bg-main selection:text-main-foreground px-3 py-2 text-sm font-base text-foreground placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
```


## Usage

```ts
import { Textarea } from '@/components/ui/textarea'
```

```tsx
<Textarea />
```

## Examples

### Default

```tsx
import { Textarea } from "@/components/ui/textarea"

export default function TextareaDemo() {
  return <Textarea placeholder="Type your message here." />
}
```

### Field

Use [Field](/docs/field), `FieldLabel`, and `FieldDescription` to create a textarea with a label and description.

```tsx
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaFieldDemo() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="textarea-message">Message</FieldLabel>
      <FieldDescription>Enter your message below.</FieldDescription>
      <Textarea id="textarea-message" placeholder="Type your message here." />
    </Field>
  )
}
```

### Disabled

Use the `disabled` prop to disable the textarea. To style the disabled state, add the `data-disabled` attribute to the `Field` component.

```tsx
import { Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaDisabledDemo() {
  return (
    <Field data-disabled className="max-w-xs">
      <FieldLabel htmlFor="textarea-disabled">Message</FieldLabel>
      <Textarea
        id="textarea-disabled"
        placeholder="Type your message here."
        disabled
      />
    </Field>
  )
}
```

### Invalid

Use the `aria-invalid` prop to mark the textarea as invalid. To style the invalid state, add the `data-invalid` attribute to the `Field` component.

```tsx
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaInvalidDemo() {
  return (
    <Field data-invalid className="max-w-xs">
      <FieldLabel htmlFor="textarea-invalid">Message</FieldLabel>
      <Textarea
        id="textarea-invalid"
        placeholder="Type your message here."
        aria-invalid
      />
      <FieldDescription>Please enter a valid message.</FieldDescription>
    </Field>
  )
}
```

### Button

Pair with [Button](/docs/button) to create a textarea with a submit button.

```tsx
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaButtonDemo() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  )
}
```
