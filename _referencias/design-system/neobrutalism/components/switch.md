---
title: "Switch"
description: "A toggle switch alternative to a checkbox."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/switch"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/switch"
---

# Switch

> A toggle switch alternative to a checkbox.

> 🔗 **Original Source Code**: [`components/ui/switch.tsx`](../ui/switch.tsx)
> 📂 **Original Examples**: [`examples/ui/switch/`](../examples/switch/)

```tsx
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/switch.json"
```

### Component Source Code (`components/ui/switch.tsx`)

```tsx
"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import * as React from "react"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-border bg-secondary-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-checked:bg-main data-unchecked:bg-secondary-background",
        size === "default" && "h-6 w-12",
        size === "sm" && "h-5 w-9",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-white border-2 border-border ring-0 transition-transform data-unchecked:translate-x-1",
          size === "default" && "h-4 w-4 data-checked:translate-x-6",
          size === "sm" && "h-3 w-3 data-checked:translate-x-4",
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
```


## Usage

```ts
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
```

```tsx
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>
```

## Examples

### Default

```tsx
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}
```

### Description

Use the [Field](/docs/field) components to add a label and a description next to the switch.

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export default function SwitchDescriptionDemo() {
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldContent>
        <FieldLabel htmlFor="switch-focus-mode">
          Share across devices
        </FieldLabel>
        <FieldDescription>
          Focus is shared across devices, and turns off when you leave the app.
        </FieldDescription>
      </FieldContent>
      <Switch id="switch-focus-mode" />
    </Field>
  )
}
```

### Choice Card

Card-style selection where `FieldLabel` wraps the entire `Field` for a clickable card pattern.

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export default function SwitchChoiceCardDemo() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <FieldLabel htmlFor="switch-share">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Share across devices</FieldTitle>
            <FieldDescription>
              Focus is shared across devices, and turns off when you leave the
              app.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-share" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="switch-notifications">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              Receive notifications when focus mode is enabled or disabled.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-notifications" defaultChecked />
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}
```

### Disabled

Add the `disabled` prop to the `Switch` component to disable the switch. Add the `data-disabled` prop to the `Field` component for styling.

```tsx
import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export default function SwitchDisabledDemo() {
  return (
    <Field orientation="horizontal" data-disabled className="w-fit">
      <Switch id="switch-disabled-unchecked" disabled />
      <FieldLabel htmlFor="switch-disabled-unchecked">Disabled</FieldLabel>
    </Field>
  )
}
```

### Invalid

Add the `aria-invalid` prop to the `Switch` component to indicate an invalid state. Add the `data-invalid` prop to the `Field` component for styling.

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export default function SwitchInvalidDemo() {
  return (
    <Field orientation="horizontal" className="max-w-sm" data-invalid>
      <FieldContent>
        <FieldLabel htmlFor="switch-terms">
          Accept terms and conditions
        </FieldLabel>
        <FieldDescription>
          You must accept the terms and conditions to continue.
        </FieldDescription>
      </FieldContent>
      <Switch id="switch-terms" aria-invalid />
    </Field>
  )
}
```

### Size

Use the `size` prop to change the size of the switch. Available sizes are `sm` and `default`.

```tsx
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export default function SwitchSizeDemo() {
  return (
    <FieldGroup className="w-full max-w-[10rem]">
      <Field orientation="horizontal">
        <Switch id="switch-size-sm" size="sm" />
        <FieldLabel htmlFor="switch-size-sm">Small</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch id="switch-size-default" size="default" />
        <FieldLabel htmlFor="switch-size-default">Default</FieldLabel>
      </Field>
    </FieldGroup>
  )
}
```
