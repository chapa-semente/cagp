---
title: "Tooltip"
description: "A popup that displays information related to an element when it receives keyboard focus or mouse hover."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/tooltip"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/tooltip"
---

# Tooltip

> A popup that displays information related to an element when it receives keyboard focus or mouse hover.

> 🔗 **Original Source Code**: [`components/ui/tooltip.tsx`](../ui/tooltip.tsx)
> 📂 **Original Examples**: [`examples/ui/tooltip/`](../examples/tooltip/)

```tsx
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="noShadow" />}>
          Hover
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/tooltip.json"
```

### Component Source Code (`components/ui/tooltip.tsx`)

```tsx
"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import * as React from "react"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delay = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof TooltipPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-50 overflow-hidden rounded-base border-2 border-border bg-secondary-background px-3 py-1.5 text-sm font-base text-foreground origin-(--transform-origin) data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2",
            className,
          )}
          {...props}
        >
          {children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```


## Usage

```ts
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
```

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button variant="noShadow" />}>Hover</TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Examples

### Default

```tsx
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="noShadow" />}>
          Hover
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

### Side

Use the `side` prop on `TooltipContent` to change the position of the tooltip.

```tsx
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function TooltipSideDemo() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap justify-center gap-2">
        {(["left", "top", "bottom", "right"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger
              render={
                <Button variant="noShadow" className="w-fit capitalize" />
              }
            >
              {side}
            </TooltipTrigger>
            <TooltipContent side={side}>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
```

### With Keyboard Shortcut

Render a [Kbd](/docs/kbd) inside `TooltipContent` to show the keyboard shortcut for an action.

```tsx
import { SaveIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function TooltipWithKeyboardShortcutDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="noShadow" size="icon" />}>
          <SaveIcon />
        </TooltipTrigger>
        <TooltipContent>
          Save Changes <Kbd>S</Kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

### Disabled Button

Show a tooltip on a disabled button by wrapping it with a span.

```tsx
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function TooltipDisabledButtonDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<span className="inline-block w-fit" />}>
          <Button variant="noShadow" disabled>
            Disabled
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This feature is currently unavailable</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```
