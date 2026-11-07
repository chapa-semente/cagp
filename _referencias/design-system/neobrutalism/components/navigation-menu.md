---
title: ""Navigation Menu""
description: "A collection of links for site navigation."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/navigation-menu"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
  - "lucide-react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/navigation-menu"
---

# "Navigation Menu"

> A collection of links for site navigation.

> 🔗 **Original Source Code**: [`components/ui/navigation-menu.tsx`](../ui/navigation-menu.tsx)

```tsx
"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { cn } from "@/lib/utils"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "https://ui.shadcn.com/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "https://ui.shadcn.com/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "https://ui.shadcn.com/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "https://ui.shadcn.com/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "https://ui.shadcn.com/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "https://ui.shadcn.com/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu className="z-5 ">
      <NavigationMenuList>
        <NavigationMenuItem className="sm:block hidden">
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[500px] gap-3 p-2 lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink
                  className="flex h-full w-full select-none flex-col justify-end rounded-base border-2 border-transparent p-6 no-underline outline-hidden hover:border-border"
                  href="https://ui.shadcn.com"
                >
                  <div className="mb-2 mt-4 text-lg font-heading">
                    shadcn/ui
                  </div>
                  <p className="text-sm font-base leading-tight">
                    Beautifully designed components that you can copy and paste
                    into your apps. Accessible. Customizable. Open Source.
                  </p>
                </NavigationMenuLink>
              </li>
              <ListItem href="https://ui.shadcn.com/docs" title="Introduction">
                Re-usable components built using Base UI and Tailwind CSS.
              </ListItem>
              <ListItem
                href="https://ui.shadcn.com/docs/installation"
                title="Installation"
              >
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem
                href="https://ui.shadcn.com/docs/primitives/typography"
                title="Typography"
              >
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link href="https://ui.shadcn.com/docs" />}
            className={navigationMenuTriggerStyle()}
          >
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  className,
  title,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuLink>) {
  return (
    <li>
      <NavigationMenuLink
        className={cn(
          "block text-foreground select-none space-y-1 rounded-base border-2 border-transparent p-3 leading-none no-underline outline-hidden transition-colors hover:bg-main hover:text-main-foreground hover:border-border",
          className,
        )}
        {...props}
      >
        <div className="text-base font-heading leading-none">{title}</div>
        <p className="font-base line-clamp-2 text-sm leading-snug">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/navigation-menu.json"
```

### Component Source Code (`components/ui/navigation-menu.tsx`)

```tsx
"use client"

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

function NavigationMenu({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn(
        "group/navigation-menu relative z-10 flex max-w-max rounded-base font-heading border-border border-2 p-1 bg-background flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center font-heading justify-center space-x-1",
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center text-foreground rounded-base border-2 border-transparent bg-background px-4 py-2 text-sm font-heading transition-colors focus:outline-none hover:bg-main hover:text-main-foreground hover:border-border focus:bg-main focus:text-main-foreground focus:border-border data-popup-open:bg-main data-popup-open:text-main-foreground data-popup-open:border-border data-active:bg-main data-active:text-main-foreground data-active:border-border disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50",
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDown
        className="relative top-[1px] ml-2 size-4 font-heading transition duration-200 group-data-popup-open:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "h-full w-auto p-2 pr-2.5 transition-[opacity,transform,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-starting-style:opacity-0 data-ending-style:opacity-0 data-starting-style:data-[activation-direction=left]:translate-x-[-50%] data-starting-style:data-[activation-direction=right]:translate-x-[50%] data-ending-style:data-[activation-direction=left]:translate-x-[50%] data-ending-style:data-[activation-direction=right]:translate-x-[-50%] **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "block select-none space-y-1 rounded-base border-2 border-transparent p-2 leading-none no-underline outline-none transition-colors hover:bg-main hover:text-main-foreground hover:border-border focus:bg-main focus:text-main-foreground focus:border-border focus-visible:ring-4 focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport> &
  Pick<
    React.ComponentProps<typeof NavigationMenuPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className="isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none"
      >
        <NavigationMenuPrimitive.Popup
          data-slot="navigation-menu-popup"
          className="relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) overflow-hidden rounded-base border-2 border-border bg-background text-foreground outline-none transition-[opacity,transform,width,height,scale,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-starting-style:scale-90 data-starting-style:opacity-0 data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:duration-150"
        >
          <NavigationMenuPrimitive.Viewport
            data-slot="navigation-menu-viewport"
            className={cn("relative size-full overflow-hidden", className)}
            {...props}
          />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Icon>) {
  return (
    <NavigationMenuPrimitive.Icon
      data-slot="navigation-menu-indicator"
      className={cn(
        "flex items-center justify-center transition-transform duration-200 data-popup-open:rotate-180",
        className,
      )}
      {...props}
    />
  )
}

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
```


## Usage

Here is the whole navigation-menu component:

<br />

```tsx file=<rootDir>/src/examples/ui/navigation-menu.tsx
```
