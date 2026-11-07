---
title: "Native Select"
description: "A styled wrapper around the native select element — lightweight and accessible, for simple option lists that don't need a custom popover."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/native-select"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "lucide-react"
---

# Native Select

> A styled wrapper around the native select element — lightweight and accessible, for simple option lists that don't need a custom popover.

> 🔗 **Original Source Code**: [`components/ui/native-select.tsx`](../ui/native-select.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/native-select.json"
```

### Component Source Code (`components/ui/native-select.tsx`)

```tsx
import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * A styled wrapper around the native <select> element — lightweight and
 * a11y-first, for simple option lists that don't need a custom popover.
 */
const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative inline-flex w-full">
    <select
      ref={ref}
      className={cn(
        'bk-native-select h-11 w-full appearance-none border-3 border-foreground bg-background px-3 pr-10 text-sm font-bold uppercase tracking-wide shadow-[4px_4px_0px_hsl(var(--shadow-color))] outline-none transition focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </select>
    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 stroke-[3]" />
  </div>
))
NativeSelect.displayName = 'NativeSelect'

export { NativeSelect }
```

## Usage

```tsx
import { NativeSelect } from '@/components/ui/native-select'

export default function Example() {
  return (
    <NativeSelect defaultValue="">
      <option value="" disabled>Select a fruit</option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
    </NativeSelect>
  )
}
```

## Examples

### Disabled

Disable the entire control.

```tsx
<NativeSelect disabled defaultValue="apple">
  <option value="apple">Apple</option>
</NativeSelect>
```

