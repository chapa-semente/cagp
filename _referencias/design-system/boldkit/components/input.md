---
title: "Input"
description: "The BoldKit Input is a neubrutalism-styled text field with a thick 3px border and a hard shadow that snaps to a focus ring on interaction. It supports accessible label association via htmlFor and works in both controlled and uncontrolled modes. Drop it into any form alongside the Label component for a fully accessible, visually bold input experience."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/input"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# Input

> The BoldKit Input is a neubrutalism-styled text field with a thick 3px border and a hard shadow that snaps to a focus ring on interaction. It supports accessible label association via htmlFor and works in both controlled and uncontrolled modes. Drop it into any form alongside the Label component for a fully accessible, visually bold input experience.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/input.json"
```

### Component Source Code (`components/ui/input.tsx`)

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full border-3 border-input bg-background px-4 py-2 text-base shadow-[4px_4px_0px_hsl(var(--shadow-color))] bk-interactive file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:translate-x-[4px] focus-visible:translate-y-[4px] focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
```

## Usage

```tsx
import { Input } from '@/components/ui/input'

export default function Example() {
  return <Input type="email" placeholder="Email" />
}
```

## Examples

### Default


```tsx
<Input placeholder="Enter your name..." />
```

### With Label

Pair inputs with labels for better accessibility.

```tsx
<div className="grid w-full max-w-sm gap-2">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Enter your email" />
</div>
```

### With Button

Combine inputs with buttons for forms.

```tsx
<div className="flex w-full max-w-sm gap-2">
  <Input type="email" placeholder="Email" />
  <Button>Subscribe</Button>
</div>
```

### File Input


```tsx
<Input type="file" />
```

### Disabled


```tsx
<Input disabled placeholder="Disabled input" />
```

### With Icon

Add icons inside inputs using wrapper elements.

```tsx
<div className="relative max-w-sm">
  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input placeholder="Search..." className="pl-10" />
</div>
```

