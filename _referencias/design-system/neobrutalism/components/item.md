---
title: "Item"
description: "A versatile component that you can use to display any content."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/item"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/item"
---

# Item

> A versatile component that you can use to display any content.

> 🔗 **Original Source Code**: [`components/ui/item.tsx`](../ui/item.tsx)
> 📂 **Original Examples**: [`examples/ui/item/`](../examples/item/)

```tsx
import { BadgeCheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export default function ItemDemo() {
  return (
    <Item className="max-w-md">
      <ItemMedia variant="icon">
        <BadgeCheckIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Basic Item</ItemTitle>
        <ItemDescription>
          A simple item with title and description.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="noShadow" size="sm">
          Action
        </Button>
      </ItemActions>
    </Item>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/item.json"
```

### Component Source Code (`components/ui/item.tsx`)

```tsx
"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import * as React from "react"

import { cn } from "@/lib/utils"

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        "group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2",
        className,
      )}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item flex w-full flex-wrap items-center rounded-base border-2 border-border bg-background text-sm font-base text-foreground transition-colors duration-100 outline-none ring-offset-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 [a]:transition-colors [a]:hover:bg-main [a]:hover:text-main-foreground [button]:transition-colors [button]:hover:bg-main [button]:hover:text-main-foreground",
  {
    variants: {
      size: {
        default: "gap-3.5 px-4 py-3.5",
        sm: "gap-2.5 px-3 py-2.5",
        xs: "gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

function Item({
  className,
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof itemVariants>) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(itemVariants({ size, className })),
      },
      props,
    ),
    render,
    state: {
      slot: "item",
      size,
    },
  })
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "[&_svg:not([class*='size-'])]:size-5",
        image:
          "size-10 overflow-hidden rounded-base border-2 border-border group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none",
        className,
      )}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "line-clamp-1 flex w-fit items-center gap-2 text-sm leading-snug font-base underline-offset-4",
        className,
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "line-clamp-2 text-left text-sm leading-normal font-base text-foreground group-data-[size=xs]/item:text-xs [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-foreground",
        className,
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className,
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className,
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
```


## Usage

```ts
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
```

```tsx
<Item>
  <ItemMedia variant="icon">
    <InboxIcon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Item</ItemTitle>
    <ItemDescription>Item description</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="neutral" size="sm">
      Action
    </Button>
  </ItemActions>
</Item>
```

## Examples

### Default

```tsx
import { BadgeCheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export default function ItemDemo() {
  return (
    <Item className="max-w-md">
      <ItemMedia variant="icon">
        <BadgeCheckIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Basic Item</ItemTitle>
        <ItemDescription>
          A simple item with title and description.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="noShadow" size="sm">
          Action
        </Button>
      </ItemActions>
    </Item>
  )
}
```


### With Image

```tsx
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export default function ItemWithImageDemo() {
  return (
    <Item className="max-w-md">
      <ItemMedia variant="image">
        <img
          src="https://avatars.githubusercontent.com/u/124599?v=4"
          alt="shadcn"
          width={40}
          height={40}
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>shadcn</ItemTitle>
        <ItemDescription>Building things for the web.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="noShadow" size="sm">
          Follow
        </Button>
      </ItemActions>
    </Item>
  )
}
```

### As Link

Use the `render` prop to render the item as a link.

```tsx
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export default function ItemAsLinkDemo() {
  return (
    <Item className="max-w-md" render={<a href="#" />}>
      <ItemMedia variant="icon">
        <ExternalLinkIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Visit our documentation</ItemTitle>
        <ItemDescription>
          Learn how to get started with our components.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <ChevronRightIcon className="size-4" />
      </ItemActions>
    </Item>
  )
}
```

### Group

```tsx
import { ArchiveIcon, InboxIcon, SendIcon } from "lucide-react"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export default function ItemGroupDemo() {
  return (
    <ItemGroup className="max-w-md">
      <Item>
        <ItemMedia variant="icon">
          <InboxIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Inbox</ItemTitle>
          <ItemDescription>View all incoming messages.</ItemDescription>
        </ItemContent>
      </Item>
      <Item>
        <ItemMedia variant="icon">
          <SendIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Sent</ItemTitle>
          <ItemDescription>View all sent messages.</ItemDescription>
        </ItemContent>
      </Item>
      <Item>
        <ItemMedia variant="icon">
          <ArchiveIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Archive</ItemTitle>
          <ItemDescription>View archived messages.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
}
```
