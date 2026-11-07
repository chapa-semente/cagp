---
title: "Scroll Area"
description: "Augments native scroll functionality for custom, cross-browser styling with bold scrollbar design."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/scroll-area"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "radix-ui"
---

# Scroll Area

> Augments native scroll functionality for custom, cross-browser styling with bold scrollbar design.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/scroll-area.json"
```

### Component Source Code (`components/ui/scroll-area.tsx`)

```tsx
import * as React from 'react'
import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' &&
        'h-full w-3 border-l-3 border-l-transparent p-[1px]',
      orientation === 'horizontal' &&
        'h-3 flex-col border-t-3 border-t-transparent p-[1px]',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 bg-foreground" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
```

## Usage

```tsx
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Example() {
  return (
    <ScrollArea className="h-[200px] w-[350px] border-3 border-foreground p-4">
      <div>
        {/* Long content here */}
      </div>
    </ScrollArea>
  )
}
```

## Examples

### Vertical Scroll

A vertically scrollable area for long content.

```tsx
<ScrollArea className="h-72 w-48 border-3 border-foreground">
  <div className="p-4">
    <h4 className="mb-4 font-bold uppercase">Tags</h4>
    {tags.map((tag) => (
      <div key={tag}>
        <div className="text-sm">{tag}</div>
        <Separator className="my-2" />
      </div>
    ))}
  </div>
</ScrollArea>
```

### Horizontal Scroll

A horizontally scrollable area for wide content.

```tsx
<ScrollArea className="w-96 whitespace-nowrap border-3 border-foreground">
  <div className="flex w-max space-x-4 p-4">
    {artworks.map((artwork) => (
      <figure key={artwork.artist} className="shrink-0">
        <div className="overflow-hidden border-3 border-foreground">
          <div className="h-32 w-32 bg-muted flex items-center justify-center">
            <span className="text-2xl">Art</span>
          </div>
        </div>
        <figcaption className="pt-2 text-xs">
          <span className="font-bold">{artwork.artist}</span>
          <br />
          <span className="text-muted-foreground">{artwork.art}</span>
        </figcaption>
      </figure>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```

### Both Directions

A scroll area that supports both vertical and horizontal scrolling.

```tsx
<ScrollArea className="h-72 w-72 border-3 border-foreground">
  <div className="p-4" style={{ width: '500px' }}>
    <h4 className="mb-4 font-bold uppercase">Content</h4>
    <p className="text-sm whitespace-nowrap">
      This content is wider and taller than the container...
    </p>
    {/* More content */}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```

### In a Card

Use scroll areas within cards for contained scrollable content.

```tsx
<div className="border-3 border-foreground bg-background bk-shadow">
  <div className="border-b-3 border-foreground p-4 bg-muted">
    <h3 className="font-bold uppercase">Messages</h3>
  </div>
  <ScrollArea className="h-48">
    <div className="p-4 space-y-4">
      {messages.map((msg, i) => (
        <div key={i} className="border-3 border-foreground p-3">
          <p className="text-sm">{msg}</p>
        </div>
      ))}
    </div>
  </ScrollArea>
</div>
```

