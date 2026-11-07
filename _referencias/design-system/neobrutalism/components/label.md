---
title: "Label"
description: "Renders an accessible label associated with controls."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/label"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/label"
---

# Label

> Renders an accessible label associated with controls.

> 🔗 **Original Source Code**: [`components/ui/label.tsx`](../ui/label.tsx)
> 📂 **Original Examples**: [`examples/ui/label/`](../examples/label/)

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function LabelDemo() {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/label.json"
```

### Component Source Code (`components/ui/label.tsx`)

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-sm font-heading leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  )
}

export { Label }
```


## Usage

```ts
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
```

```tsx
<div>
  <div className="flex items-center space-x-2">
    <Checkbox id="terms" />
    <Label htmlFor="terms">Accept terms and conditions</Label>
  </div>
</div>
```

## Examples

### Default

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function LabelDemo() {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  )
}
```
