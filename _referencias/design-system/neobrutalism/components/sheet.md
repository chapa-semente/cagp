---
title: "Sheet"
description: "Extends the Dialog component to display content that complements the main content of the screen."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/sheet"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
  - "lucide-react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/sheet"
---

# Sheet

> Extends the Dialog component to display content that complements the main content of the screen.

> 🔗 **Original Source Code**: [`components/ui/sheet.tsx`](../ui/sheet.tsx)
> 📂 **Original Examples**: [`examples/ui/sheet/`](../examples/sheet/)

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button />}>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose render={<Button variant="neutral" />}>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/sheet.json"
```

### Component Source Code (`components/ui/sheet.tsx`)

```tsx
"use client"

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { X } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Backdrop>) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:duration-300 data-open:duration-500 fill-mode-forwards fixed inset-0 z-50 bg-overlay",
        className,
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Popup> & {
  side?: "top" | "bottom" | "left" | "right"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "bg-background data-open:animate-in data-closed:animate-out fixed z-50 flex flex-col gap-4 border-2 border-border outline-none transition ease-in-out data-closed:duration-300 data-open:duration-500",
          side === "right" &&
            "data-closed:slide-out-to-right data-open:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-closed:slide-out-to-left data-open:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-closed:slide-out-to-top data-open:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-closed:slide-out-to-bottom data-open:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            className="absolute right-4 top-4 rounded-base ring-offset-white focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-3 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-heading", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-foreground font-base", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
```


## Usage

```ts
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
```

```tsx
<Sheet>
  <SheetTrigger render={<Button />}>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you&apos;re
        done.
      </SheetDescription>
    </SheetHeader>
    <div className="grid flex-1 auto-rows-min gap-6 px-4">
      <div className="grid gap-3">
        <Label htmlFor="sheet-demo-name">Name</Label>
        <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="sheet-demo-username">Username</Label>
        <Input id="sheet-demo-username" defaultValue="@peduarte" />
      </div>
    </div>
    <SheetFooter>
      <Button type="submit">Save changes</Button>
      <SheetClose render={<Button variant="neutral" />}>Close</SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

## Examples

### Default

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button />}>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose render={<Button variant="neutral" />}>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
```

### Side

Use the `side` prop on `SheetContent` to set the edge of the screen where the sheet appears. Values are `top`, `right`, `bottom`, or `left`.

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

export default function SheetSideDemo() {
  return (
    <div className="flex gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger
            render={<Button variant="noShadow" className="capitalize" />}
          >
            {side}
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </SheetHeader>
            <div className="overflow-y-auto px-4 text-sm">
              <h4 className="mb-4 text-lg leading-none font-medium">
                Lorem Ipsum
              </h4>
              {Array.from({ length: 10 }).map((_, index) => (
                <p key={index} className="mb-4 leading-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              ))}
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose render={<Button variant="neutral" />}>
                Cancel
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
```

### No Close Button

Use `showCloseButton={false}` on `SheetContent` to hide the close button.

```tsx
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function SheetNoCloseButtonDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="neutral" />}>
        Open Sheet
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>No Close Button</SheetTitle>
          <SheetDescription>
            This sheet doesn&apos;t have a close button in the top-right corner.
            Click outside to close.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
```
