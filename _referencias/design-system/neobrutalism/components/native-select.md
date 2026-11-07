---
title: "Native Select"
description: "A native select element for choosing a single option from a list."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/native-select"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "lucide-react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/native-select"
---

# Native Select

> A native select element for choosing a single option from a list.

> 🔗 **Original Source Code**: [`components/ui/native-select.tsx`](../ui/native-select.tsx)
> 📂 **Original Examples**: [`examples/ui/native-select/`](../examples/native-select/)

```tsx
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

export default function NativeSelectDemo() {
  return (
    <NativeSelect className="w-full max-w-xs">
      <NativeSelectOption value="">Select a fruit</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
      <NativeSelectOption value="grapes" disabled>
        Grapes
      </NativeSelectOption>
      <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
    </NativeSelect>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/native-select.json"
```

### Component Source Code (`components/ui/native-select.tsx`)

```tsx
import { ChevronDownIcon } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default"
}

function NativeSelect({
  className,
  size = "default",
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        className,
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className="h-10 w-full min-w-0 appearance-none rounded-base border-2 border-border bg-secondary-background py-2 pr-9 pl-3 text-sm font-base text-foreground transition-colors outline-none select-none selection:bg-main selection:text-main-foreground placeholder:text-foreground/50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-9 data-[size=sm]:py-1"
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-foreground select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
```


## Usage

```ts
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from '@/components/ui/native-select'
```

```tsx
<NativeSelect>
  <NativeSelectOption value="">Select an option</NativeSelectOption>
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
</NativeSelect>
```

## Examples

### Default

```tsx
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

export default function NativeSelectDemo() {
  return (
    <NativeSelect className="w-full max-w-xs">
      <NativeSelectOption value="">Select a fruit</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
      <NativeSelectOption value="grapes" disabled>
        Grapes
      </NativeSelectOption>
      <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
    </NativeSelect>
  )
}
```

### With Optgroup

```tsx
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"

export default function NativeSelectWithOptgroupDemo() {
  return (
    <NativeSelect className="w-full max-w-xs">
      <NativeSelectOption value="">Select a food</NativeSelectOption>
      <NativeSelectOptGroup label="Fruits">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Vegetables">
        <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
        <NativeSelectOption value="broccoli">Broccoli</NativeSelectOption>
        <NativeSelectOption value="spinach">Spinach</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  )
}
```

### Disabled

```tsx
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

export default function NativeSelectDisabledDemo() {
  return (
    <NativeSelect className="w-full max-w-xs" disabled>
      <NativeSelectOption value="">Disabled</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
    </NativeSelect>
  )
}
```
