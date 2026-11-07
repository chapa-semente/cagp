---
title: "Button Group"
description: "A container that groups related buttons together with consistent styling."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/button-group"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/button-group"
---

# Button Group

> A container that groups related buttons together with consistent styling.

> 🔗 **Original Source Code**: [`components/ui/button-group.tsx`](../ui/button-group.tsx)
> 📂 **Original Examples**: [`examples/ui/button-group/`](../examples/button-group/)

```tsx
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="neutral">Archive</Button>
      <Button variant="neutral">Report</Button>
      <Button variant="neutral">Snooze</Button>
    </ButtonGroup>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/button-group.json"
```

### Component Source Code (`components/ui/button-group.tsx`)

```tsx
"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import * as React from "react"

import { cn } from "@/lib/utils"

const buttonGroupVariants = cva(
  "flex w-fit items-stretch rounded-base *:shadow-none! *:hover:translate-x-0! *:hover:translate-y-0! *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-base [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "*:data-slot:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-base! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
        vertical:
          "flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-base! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex items-center gap-2 rounded-base border-2 border-border bg-secondary-background px-2.5 text-sm font-heading text-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "button-group-text",
    },
  })
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      data-slot="button-group-separator"
      data-orientation={orientation}
      className={cn(
        "relative shrink-0 self-stretch border-border data-[orientation=horizontal]:my-px data-[orientation=horizontal]:w-full data-[orientation=horizontal]:border-t-2 data-[orientation=vertical]:mx-px data-[orientation=vertical]:border-l-2",
        className,
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
```


## Usage

```ts
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '@/components/ui/button-group'
```

```tsx
<ButtonGroup>
  <Button variant="neutral">One</Button>
  <Button variant="neutral">Two</Button>
</ButtonGroup>
```

## Examples

### Default

```tsx
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="neutral">Archive</Button>
      <Button variant="neutral">Report</Button>
      <Button variant="neutral">Snooze</Button>
    </ButtonGroup>
  )
}
```

### With Text

```tsx
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group"

export default function ButtonGroupWithTextDemo() {
  return (
    <ButtonGroup>
      <ButtonGroupText>Text</ButtonGroupText>
      <Button variant="neutral">Another Button</Button>
    </ButtonGroup>
  )
}
```

### With Input

```tsx
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

export default function ButtonGroupWithInputDemo() {
  return (
    <ButtonGroup className="w-full max-w-sm">
      <Input placeholder="Search..." />
      <Button variant="neutral" size="icon" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
```

### With Dropdown

```tsx
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ButtonGroupWithDropdownDemo() {
  return (
    <ButtonGroup>
      <Button variant="neutral">Update</Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="neutral" size="icon" aria-label="More options" />
          }
        >
          <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Disable</DropdownMenuItem>
          <DropdownMenuItem>Uninstall</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
```

### Vertical

```tsx
import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function ButtonGroupVerticalDemo() {
  return (
    <ButtonGroup orientation="vertical" aria-label="Zoom controls">
      <Button variant="neutral" size="icon" aria-label="Zoom in">
        <PlusIcon />
      </Button>
      <Button variant="neutral" size="icon" aria-label="Zoom out">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  )
}
```
