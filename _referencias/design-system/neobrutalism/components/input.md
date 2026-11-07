---
title: "Input"
description: "Displays a form input field or a component that looks like an input field."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/input"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/input"
---

# Input

> Displays a form input field or a component that looks like an input field.

> 🔗 **Original Source Code**: [`components/ui/input.tsx`](../ui/input.tsx)
> 📂 **Original Examples**: [`examples/ui/input/`](../examples/input/)

```tsx
import { Input } from "@/components/ui/input"

export default function InputDemo() {
  return <Input className="w-[200px]" type="email" placeholder="Email" />
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/input.json"
```

### Component Source Code (`components/ui/input.tsx`)

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-base border-2 border-border bg-secondary-background selection:bg-main selection:text-main-foreground px-3 py-2 text-sm font-base text-foreground file:border-0 file:bg-transparent file:text-sm file:font-heading placeholder:text-foreground/50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
```


## Usage

```ts
import { Input } from '@/components/ui/input'
```

```tsx
<Input className="w-[200px]" type="email" placeholder="Email" />
```

## Examples

### Default

```tsx
import { Input } from "@/components/ui/input"

export default function InputDemo() {
  return <Input className="w-[200px]" type="email" placeholder="Email" />
}
```

### File

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InputFileDemo() {
  return (
    <div className="grid w-full max-w-64 items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  )
}
```

### Disabled

```tsx
import { Input } from "@/components/ui/input"

export default function InputDisabledDemo() {
  return (
    <Input
      className="max-w-[200px]"
      type="email"
      placeholder="Email"
      disabled
    />
  )
}
```

### With Label

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InputWithLabelDemo() {
  return (
    <div className="grid max-w-[200px] items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}
```

### With Button

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function InputWithButtonDemo() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button variant="noShadow" type="submit">
        Subscribe
      </Button>
    </div>
  )
}
```
