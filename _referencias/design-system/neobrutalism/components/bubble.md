---
title: "Bubble"
description: "A chat bubble for displaying a message in a conversation."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/bubble"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/bubble"
---

# Bubble

> A chat bubble for displaying a message in a conversation.

```tsx
import { Bubble, BubbleContent } from "@/components/ui/bubble"

export default function BubbleDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Bubble variant="muted">
        <BubbleContent>
          Hey! I just pushed the new registry build. Can you take a look?
        </BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>
          On it. I will run the checks and get back to you in a minute.
        </BubbleContent>
      </Bubble>
    </div>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/bubble.json"
```

### Component Source Code (`components/ui/bubble.tsx`)

```tsx
"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import * as React from "react"

import { cn } from "@/lib/utils"

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cn("flex min-w-0 flex-col gap-2", className)}
      {...props}
    />
  )
}

const bubbleVariants = cva(
  "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end",
  {
    variants: {
      variant: {
        default:
          "*:data-[slot=bubble-content]:bg-main *:data-[slot=bubble-content]:text-main-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-main/80",
        secondary:
          "*:data-[slot=bubble-content]:bg-secondary-background *:data-[slot=bubble-content]:text-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-background",
        muted:
          "*:data-[slot=bubble-content]:bg-background *:data-[slot=bubble-content]:text-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-secondary-background",
        destructive:
          "*:data-[slot=bubble-content]:bg-black *:data-[slot=bubble-content]:text-white [&>[data-slot=bubble-content]:is(button,a):hover]:bg-black/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & {
    align?: "start" | "end"
  }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  )
}

function BubbleContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "w-fit max-w-full min-w-0 overflow-hidden rounded-base border-2 border-border px-3 py-2.5 text-sm font-base leading-5 wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:ring-2 [button,a]:focus-visible:ring-black [button,a]:focus-visible:ring-offset-2",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "bubble-content",
    },
  })
}

const bubbleReactionsVariants = cva(
  "absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border-2 border-border bg-secondary-background px-1.5 py-0.5 text-sm font-base text-foreground has-[button]:p-0",
  {
    variants: {
      side: {
        top: "top-0 -translate-y-3/4",
        bottom: "bottom-0 translate-y-3/4",
      },
      align: {
        start: "left-3",
        end: "right-3",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  },
)

function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "end"
  side?: "top" | "bottom"
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props}
    />
  )
}

export { BubbleGroup, Bubble, BubbleContent, BubbleReactions }
```


## Usage

```ts
import { Bubble, BubbleContent } from '@/components/ui/bubble'
```

```tsx
<Bubble>
  <BubbleContent>Hello there!</BubbleContent>
</Bubble>
```

## Examples

### Default

```tsx
import { Bubble, BubbleContent } from "@/components/ui/bubble"

export default function BubbleDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Bubble variant="muted">
        <BubbleContent>
          Hey! I just pushed the new registry build. Can you take a look?
        </BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>
          On it. I will run the checks and get back to you in a minute.
        </BubbleContent>
      </Bubble>
    </div>
  )
}
```

### Variants

```tsx
import { Bubble, BubbleContent } from "@/components/ui/bubble"

export default function BubbleVariantsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Bubble>
        <BubbleContent>Default bubbles use the main color.</BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>Secondary bubbles sit on a white surface.</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>Muted bubbles blend into the background.</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>Destructive bubbles flag failed actions.</BubbleContent>
      </Bubble>
    </div>
  )
}
```

### With Reactions

```tsx
import { HeartIcon, ThumbsUpIcon } from "lucide-react"

import { Bubble, BubbleContent, BubbleReactions } from "@/components/ui/bubble"

export default function BubbleWithReactionsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <Bubble variant="muted">
        <BubbleContent>
          The new landing page is live. Thanks everyone for the hard work!
        </BubbleContent>
        <BubbleReactions align="start">
          <HeartIcon className="size-3.5" />
          <span className="text-xs">12</span>
        </BubbleReactions>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Great job team, that was a big one.</BubbleContent>
        <BubbleReactions side="top">
          <ThumbsUpIcon className="size-3.5" />
          <span className="text-xs">3</span>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}
```

### As Button

Use the `render` prop to render the bubble content as a different element, for example a `button` or a link.

```tsx
import { Bubble, BubbleContent } from "@/components/ui/bubble"

export default function BubbleAsButtonDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Bubble variant="muted">
        <BubbleContent render={<button type="button" />}>
          This bubble is rendered as a button. Hover or focus it to see the
          interactive state.
        </BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent render={<a href="#" />}>
          This one is rendered as a link.
        </BubbleContent>
      </Bubble>
    </div>
  )
}
```
