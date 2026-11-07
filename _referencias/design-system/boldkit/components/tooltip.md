---
title: "Tooltip"
description: "A popup that displays information related to an element when it receives keyboard focus or the mouse hovers over it."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/tooltip"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "radix-ui"
---

# Tooltip

> A popup that displays information related to an element when it receives keyboard focus or the mouse hovers over it.

> 🔗 **Original Source Code**: [`components/ui/tooltip.tsx`](../ui/tooltip.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/tooltip.json"
```

### Component Source Code (`components/ui/tooltip.tsx`)

```tsx
import * as React from 'react'
import { Tooltip as TooltipPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 overflow-hidden border-2 border-foreground bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-[4px_4px_0px_hsl(var(--shadow-color))] ease-out origin-[var(--radix-popper-content-transform-origin)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```

## Usage

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function Example() {
  return (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>
        <p>Tooltip content</p>
      </TooltipContent>
    </Tooltip>
  )
}
```

## Examples

### Positions

Tooltips can appear in different positions relative to the trigger.

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Top</Button>
  </TooltipTrigger>
  <TooltipContent side="top">
    <p>Tooltip on top</p>
  </TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Bottom</Button>
  </TooltipTrigger>
  <TooltipContent side="bottom">
    <p>Tooltip on bottom</p>
  </TooltipContent>
</Tooltip>
```

### Icon Buttons

Tooltips work great with icon-only buttons to provide context.

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline" size="icon">
      <Info className="h-4 w-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>More information</p>
  </TooltipContent>
</Tooltip>
```

### Custom Delay

Control when the tooltip appears with delayDuration.

```tsx
<Tooltip delayDuration={0}>
  <TooltipTrigger asChild>
    <Button variant="outline">No delay</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Shows immediately</p>
  </TooltipContent>
</Tooltip>

<Tooltip delayDuration={1000}>
  <TooltipTrigger asChild>
    <Button variant="outline">1s delay</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Shows after 1 second</p>
  </TooltipContent>
</Tooltip>
```

