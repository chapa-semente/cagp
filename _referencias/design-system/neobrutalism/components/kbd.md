---
title: "Kbd"
description: "Used to display textual user input from keyboard."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/kbd"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/kbd"
---

# Kbd

> Used to display textual user input from keyboard.

> 🔗 **Original Source Code**: [`components/ui/kbd.tsx`](../ui/kbd.tsx)
> 📂 **Original Examples**: [`examples/ui/kbd/`](../examples/kbd/)

```tsx
import { Kbd } from "@/components/ui/kbd"

export default function KbdDemo() {
  return (
    <div className="flex items-center gap-2">
      <Kbd>Ctrl</Kbd>
      <Kbd>⌘K</Kbd>
      <Kbd>Ctrl + B</Kbd>
    </div>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/kbd.json"
```

### Component Source Code (`components/ui/kbd.tsx`)

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-base border-2 border-border bg-secondary-background px-1 font-sans text-xs font-heading text-foreground select-none in-data-[slot=tooltip-content]:border-main-foreground/30 in-data-[slot=tooltip-content]:bg-main in-data-[slot=tooltip-content]:text-main-foreground [&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
```


## Usage

```ts
import { Kbd, KbdGroup } from '@/components/ui/kbd'
```

```tsx
<Kbd>⌘</Kbd>
```

```tsx
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>
```

## Examples

### Default

```tsx
import { Kbd } from "@/components/ui/kbd"

export default function KbdDemo() {
  return (
    <div className="flex items-center gap-2">
      <Kbd>Ctrl</Kbd>
      <Kbd>⌘K</Kbd>
      <Kbd>Ctrl + B</Kbd>
    </div>
  )
}
```

### Group

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export default function KbdGroupDemo() {
  return (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  )
}
```

### With Icon

```tsx
import { ArrowLeftIcon, ArrowRightIcon, CircleDashedIcon } from "lucide-react"

import { Kbd, KbdGroup } from "@/components/ui/kbd"

export default function KbdWithIconDemo() {
  return (
    <KbdGroup>
      <Kbd>
        <CircleDashedIcon />
      </Kbd>
      <Kbd>
        <ArrowLeftIcon />
      </Kbd>
      <Kbd>
        <ArrowRightIcon />
      </Kbd>
    </KbdGroup>
  )
}
```

### In Tooltip

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

export default function KbdInTooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="neutral"
              size="icon"
              className="shadow-none! hover:translate-x-0! hover:translate-y-0!"
            />
          }
        >
          <SaveIcon />
        </TooltipTrigger>
        <TooltipContent className="pr-1.5">
          <div className="flex items-center gap-2">
            Save Changes <Kbd>S</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```
