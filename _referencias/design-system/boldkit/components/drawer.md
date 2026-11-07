---
title: "Drawer"
description: "A drawer component that slides in from the bottom of the screen with neubrutalism styling."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/drawer"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "vaul"
---

# Drawer

> A drawer component that slides in from the bottom of the screen with neubrutalism styling.

> 🔗 **Original Source Code**: [`components/ui/drawer.tsx`](../ui/drawer.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/drawer.json"
```

### Component Source Code (`components/ui/drawer.tsx`)

```tsx
import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { cn } from '@/lib/utils'

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = 'Drawer'

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/70', className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col border-3 border-b-0 border-foreground bg-background shadow-[0px_-8px_0px_hsl(var(--shadow-color))]',
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] bg-foreground" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}
    {...props}
  />
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
)
DrawerFooter.displayName = 'DrawerFooter'

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn('text-lg font-bold uppercase tracking-wide leading-none', className)}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
```

## Usage

```tsx
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

export default function Example() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>Drawer description.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}
```

## Examples

### Basic

A simple drawer with title and description.

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>
```

### With Form

Use drawers to collect user input through forms.

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Edit Profile</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Edit Profile</DrawerTitle>
      <DrawerDescription>Make changes to your profile.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Your name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Your email" />
      </div>
    </div>
    <DrawerFooter>
      <Button>Save changes</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### Mobile-Friendly

Drawers are great for mobile interfaces where bottom sheets feel natural.

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button variant="secondary">Share</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Share this page</DrawerTitle>
      <DrawerDescription>Choose how you want to share.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4 grid grid-cols-4 gap-4">
      <Button variant="outline" className="flex-col h-auto py-4">
        <span className="text-2xl">📧</span>
        <span className="text-xs mt-1">Email</span>
      </Button>
      <Button variant="outline" className="flex-col h-auto py-4">
        <span className="text-2xl">💬</span>
        <span className="text-xs mt-1">Message</span>
      </Button>
      <Button variant="outline" className="flex-col h-auto py-4">
        <span className="text-2xl">🔗</span>
        <span className="text-xs mt-1">Copy Link</span>
      </Button>
      <Button variant="outline" className="flex-col h-auto py-4">
        <span className="text-2xl">📱</span>
        <span className="text-xs mt-1">QR Code</span>
      </Button>
    </div>
  </DrawerContent>
</Drawer>
```

