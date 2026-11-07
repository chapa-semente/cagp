---
title: "Button"
description: "Displays a button or a component that looks like a button."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/button"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/button"
---

# Button

> Displays a button or a component that looks like a button.

> 🔗 **Original Source Code**: [`components/ui/button.tsx`](../ui/button.tsx)
> 📂 **Original Examples**: [`examples/ui/button/`](../examples/button/)

```tsx
import { Button } from "@/components/ui/button"

export default function ButtonDemo() {
  return <Button>Button</Button>
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/button.json"
```

### Component Source Code (`components/ui/button.tsx`)

```tsx
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-base ring-offset-white transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-main-foreground bg-main border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none",
        noShadow: "text-main-foreground bg-main border-2 border-border",
        neutral:
          "bg-secondary-background text-foreground border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none",
        reverse:
          "text-main-foreground bg-main border-2 border-border hover:translate-x-reverseBoxShadowX hover:translate-y-reverseBoxShadowY hover:shadow-shadow",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-8 gap-1.5 px-2.5 text-xs [&_svg]:size-3.5",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "size-10",
        "icon-xs": "size-8 [&_svg]:size-3.5",
        "icon-sm": "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ButtonPrimitive> &
  VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```


## Usage

```ts
import { Button } from '@/components/ui/button'
```

```tsx
<Button>Default</Button>
```

## Examples

### Default

```tsx
import { Button } from "@/components/ui/button"

export default function ButtonDemo() {
  return <Button>Button</Button>
}
```

### Size

Use the `size` prop to change the size of the button. Text buttons come in `xs`, `sm`, `default` and `lg`, and icon buttons use the matching `icon-xs`, `icon-sm`, `icon` and `icon-lg` sizes.

```tsx
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ButtonSizeDemo() {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-2">
        <Button size="xs">Extra Small</Button>
        <Button size="icon-xs" aria-label="Submit">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm">Small</Button>
        <Button size="icon-sm" aria-label="Submit">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button>Default</Button>
        <Button size="icon" aria-label="Submit">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="lg">Large</Button>
        <Button size="icon-lg" aria-label="Submit">
          <ArrowUpRightIcon />
        </Button>
      </div>
    </div>
  )
}
```

### Reverse

```tsx
import { Button } from "@/components/ui/button"

export default function ButtonReverseDemo() {
  return <Button variant="reverse">Button</Button>
}
``` 

### No Shadow

```tsx
import { Button } from "@/components/ui/button"

export default function ButtonNoShadowDemo() {
  return <Button variant="noShadow">Button</Button>
}
```

### Neutral

```tsx
import { Button } from "@/components/ui/button"

export default function ButtonNeutralDemo() {
  return <Button variant="neutral">Button</Button>
}
```

### With Icon

```tsx
import { SendIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ButtonWithIconDemo() {
  return (
    <Button>
      <SendIcon /> Send
    </Button>
  )
}
```

### Icon

```tsx
import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ButtonIconDemo() {
  return (
    <Button size="icon">
      <MoreHorizontalIcon />
    </Button>
  )
}
```
