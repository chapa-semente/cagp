---
title: "Scroll Area"
description: "Augments native scroll functionality for custom, cross-browser styling."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/scroll-area"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/scroll-area"
---

# Scroll Area

> Augments native scroll functionality for custom, cross-browser styling.

> 🔗 **Original Source Code**: [`components/ui/scroll-area.tsx`](../ui/scroll-area.tsx)
> 📂 **Original Examples**: [`examples/ui/scroll-area/`](../examples/scroll-area/)

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="rounded-base h-[200px] w-[350px] text-foreground border-2 border-border bg-background p-4 shadow-shadow">
      Jokester began sneaking into the castle in the middle of the night and
      leaving jokes all over the place: under the king&apos;s pillow, in his
      soup, even in the royal toilet. The king was furious, but he couldn&apos;t
      seem to stop Jokester. And then, one day, the people of the kingdom
      discovered that the jokes left by Jokester were so funny that they
      couldn&apos;t help but laugh. And once they started laughing, they
      couldn&apos;t stop.
    </ScrollArea>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/scroll-area.json"
```

### Component Source Code (`components/ui/scroll-area.tsx`)

```tsx
"use client"

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"

import * as React from "react"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="h-full w-full font-base outline-none"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
```


## Usage

```ts
import { ScrollArea } from '@/components/ui/scroll-area'
```

```tsx
<ScrollArea className="rounded-base h-[200px] w-[350px] text-main-foreground border-2 border-border bg-main p-4 shadow-shadow">
  Jokester began sneaking into the castle in the middle of the night and
  leaving jokes all over the place: under the king&apos;s pillow, in his
  soup, even in the royal toilet. The king was furious, but he couldn&apos;t
  seem to stop Jokester. And then, one day, the people of the kingdom
  discovered that the jokes left by Jokester were so funny that they
  couldn&apos;t help but laugh. And once they started laughing, they
  couldn&apos;t stop.
</ScrollArea>
```

## Examples

### Default

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="rounded-base h-[200px] w-[350px] text-foreground border-2 border-border bg-background p-4 shadow-shadow">
      Jokester began sneaking into the castle in the middle of the night and
      leaving jokes all over the place: under the king&apos;s pillow, in his
      soup, even in the royal toilet. The king was furious, but he couldn&apos;t
      seem to stop Jokester. And then, one day, the people of the kingdom
      discovered that the jokes left by Jokester were so funny that they
      couldn&apos;t help but laugh. And once they started laughing, they
      couldn&apos;t stop.
    </ScrollArea>
  )
}
```

### Horizontal

Use `ScrollBar` with `orientation="horizontal"` for horizontal scrolling.

```tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export interface Artwork {
  artist: string
  art: string
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
]

export default function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea className="w-96 rounded-base border-2 border-border bg-background shadow-shadow whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {works.map((artwork) => (
          <figure key={artwork.artist} className="shrink-0">
            <div className="overflow-hidden rounded-base border-2 border-border">
              <img
                src={artwork.art}
                alt={`Photo by ${artwork.artist}`}
                className="aspect-[3/4] h-fit w-fit object-cover"
                width={300}
                height={400}
              />
            </div>
            <figcaption className="pt-2 text-xs font-base text-foreground">
              Photo by{" "}
              <span className="font-heading text-foreground">
                {artwork.artist}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
```
