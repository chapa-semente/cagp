---
title: "Hover Card"
description: "For sighted users to preview content available behind a link with neubrutalism styling."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/hover-card"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "radix-ui"
---

# Hover Card

> For sighted users to preview content available behind a link with neubrutalism styling.

> 🔗 **Original Source Code**: [`components/ui/hover-card.tsx`](../ui/hover-card.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/hover-card.json"
```

### Component Source Code (`components/ui/hover-card.tsx`)

```tsx
import * as React from 'react'
import { HoverCard as HoverCardPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      'z-50 w-64 border-3 border-foreground bg-popover p-4 text-popover-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] outline-none ease-out origin-[var(--radix-popper-content-transform-origin)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
```

## Usage

```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

export default function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@boldkit</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>BoldKit - Neubrutalism UI Components</p>
      </HoverCardContent>
    </HoverCard>
  )
}
```

## Examples

### Basic

A simple hover card with text content.

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">Hover me</Button>
  </HoverCardTrigger>
  <HoverCardContent>
    <p>This is a hover card with some content.</p>
  </HoverCardContent>
</HoverCard>
```

### Profile Card

Show user profile information on hover.

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@username</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="/avatar.png" />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-bold">@username</h4>
        <p className="text-sm">Full-stack developer</p>
        <div className="flex items-center pt-2">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
          <span className="text-xs text-muted-foreground">Joined January 2024</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

### Link Preview

Preview link content before clicking.

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#" className="underline font-medium">Read the docs</a>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="space-y-2">
      <h4 className="font-bold">Documentation</h4>
      <p className="text-sm text-muted-foreground">
        Learn how to use BoldKit components in your project.
      </p>
    </div>
  </HoverCardContent>
</HoverCard>
```

