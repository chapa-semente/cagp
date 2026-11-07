---
title: "Toast"
description: "A succinct message that is displayed temporarily."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/toast"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
  - "lucide-react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/toast"
---

# Toast

> A succinct message that is displayed temporarily.

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { Toaster, useToastManager } from "@/components/ui/toast"

function ShowToastButton() {
  const toast = useToastManager()

  function showToast() {
    const id = toast.add({
      title: "Event created",
      description: "Sunday, December 3 at 9:00 AM",
      actionProps: {
        children: "Undo",
        onClick() {
          toast.close(id)
        },
      },
    })
  }

  return <Button onClick={showToast}>Show Toast</Button>
}

export default function ToastDemo() {
  return (
    <Toaster>
      <ShowToastButton />
    </Toaster>
  )
}
```

## Installation

The component depends on the <Link href="/docs/button">Button</Link> component. Add it first.

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/toast.json"
```

### Component Source Code (`components/ui/toast.tsx`)

```tsx
"use client"

import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

const toast = ToastPrimitive.createToastManager()

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />
}

function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        "pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-sm outline-none sm:right-4 sm:left-auto sm:mx-0 sm:w-full",
        className,
      )}
      {...props}
    />
  )
}

function Toast({ className, ...props }: ToastPrimitive.Root.Props) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      className={cn(
        "group/toast pointer-events-auto absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom rounded-base border-2 border-border bg-background text-foreground will-change-transform outline-none select-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
        "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]",
        "h-(--height) [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]",
        "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        "data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
        "data-limited:opacity-0 data-starting-style:[transform:translateY(150%)]",
        "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
        "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        "data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        className,
      )}
      {...props}
    />
  )
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        "flex h-full items-center gap-3 overflow-hidden px-4 py-3 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100",
        className,
      )}
      {...props}
    />
  )
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn("text-sm font-heading", className)}
      {...props}
    />
  )
}

function ToastDescription({
  className,
  ...props
}: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn("text-sm font-base text-foreground", className)}
      {...props}
    />
  )
}

function ToastAction({
  className,
  render = (
    <Button
      variant="noShadow"
      size="sm"
      className="bg-secondary-background text-foreground"
    />
  ),
  ...props
}: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      render={render}
      className={cn("shrink-0", className)}
      {...props}
    />
  )
}

function ToastClose({
  className,
  children,
  render = (
    <Button
      variant="neutral"
      size="icon"
      className="size-7 border-0 bg-transparent shadow-none! hover:translate-x-0! hover:translate-y-0!"
    />
  ),
  ...props
}: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close toast"
      render={render}
      className={cn(
        "relative shrink-0 text-foreground after:absolute after:-inset-2 after:content-[''] hover:opacity-70",
        className,
      )}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </ToastPrimitive.Close>
  )
}

function ToastIcon({ type }: { type: string | undefined }) {
  let icon: React.ReactNode = null

  if (type === "success") {
    icon = <CircleCheckIcon aria-hidden="true" />
  }

  if (type === "info") {
    icon = <InfoIcon aria-hidden="true" />
  }

  if (type === "warning") {
    icon = <TriangleAlertIcon aria-hidden="true" />
  }

  if (type === "error") {
    icon = <OctagonXIcon className="text-black" aria-hidden="true" />
  }

  if (type === "loading") {
    icon = <Loader2Icon className="animate-spin" aria-hidden="true" />
  }

  if (!icon) {
    return null
  }

  return (
    <span
      data-slot="toast-icon"
      className="shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4"
    >
      {icon}
    </span>
  )
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager()

  return toasts.map((toastItem) => (
    <Toast key={toastItem.id} toast={toastItem}>
      <ToastContent>
        <ToastIcon type={toastItem.type} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction />
        <ToastClose />
      </ToastContent>
    </Toast>
  ))
}

function Toaster({
  children,
  toastManager = toast,
  ...props
}: ToastPrimitive.Provider.Props) {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

const createToastManager = ToastPrimitive.createToastManager
const useToastManager = ToastPrimitive.useToastManager

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
}
```


## Usage

Render `<Toaster />` once in your root layout.

```tsx
import { Toaster } from '@/components/ui/toast'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

Then call `toast.add` from anywhere, even outside React components.

```ts
import { toast } from '@/components/ui/toast'
```

```tsx
toast.add({
  title: 'Event created',
  description: 'Sunday, December 3 at 9:00 AM',
})
```

Set `type` to `success`, `info`, `warning`, `error` or `loading` to show an icon, pass `actionProps` to render an action button, or use `toast.promise` to track an async task.

```tsx
toast.add({
  type: 'success',
  title: 'Changes saved',
  actionProps: {
    children: 'Undo',
    onClick: () => undo(),
  },
})

toast.promise(saveChanges(), {
  loading: { title: 'Saving...' },
  success: { title: 'Saved' },
  error: { title: 'Could not save' },
})
```

This component replaces <a target="_blank" href="https://sonner.emilkowal.ski">sonner</a>. It is built on the Base UI toast primitive, so no extra dependency is needed.

## Examples

Each example below renders its own `<Toaster>` and reads the manager it provides with `useToastManager`, so the previews on this page stay independent of each other. In your app, render `<Toaster />` once in the root layout and call `toast.add` from anywhere.

### Default

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { Toaster, useToastManager } from "@/components/ui/toast"

function ShowToastButton() {
  const toast = useToastManager()

  function showToast() {
    const id = toast.add({
      title: "Event created",
      description: "Sunday, December 3 at 9:00 AM",
      actionProps: {
        children: "Undo",
        onClick() {
          toast.close(id)
        },
      },
    })
  }

  return <Button onClick={showToast}>Show Toast</Button>
}

export default function ToastDemo() {
  return (
    <Toaster>
      <ShowToastButton />
    </Toaster>
  )
}
```

### Types

Set the `type` option to render a status icon. The built-in renderer recognizes `success`, `info`, `warning`, `error`, and `loading`.

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { Toaster, useToastManager } from "@/components/ui/toast"

function ToastTypeButtons() {
  const toast = useToastManager()

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="neutral"
        onClick={() => toast.add({ description: "Event has been created." })}
      >
        Default
      </Button>
      <Button
        variant="neutral"
        onClick={() =>
          toast.add({
            type: "success",
            description: "Event has been created.",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="neutral"
        onClick={() =>
          toast.add({
            type: "info",
            description: "Arrive 10 minutes before the event.",
          })
        }
      >
        Info
      </Button>
      <Button
        variant="neutral"
        onClick={() =>
          toast.add({
            type: "warning",
            description: "The event cannot start before 8:00 AM.",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="neutral"
        onClick={() =>
          toast.add({
            type: "error",
            description: "The event could not be created.",
            priority: "high",
          })
        }
      >
        Error
      </Button>
    </div>
  )
}

export default function ToastTypesDemo() {
  return (
    <Toaster>
      <ToastTypeButtons />
    </Toaster>
  )
}
```

### Action

Pass button props with `actionProps` to render an action.

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { Toaster, useToastManager } from "@/components/ui/toast"

function ToastActionButton() {
  const toast = useToastManager()

  function showToast() {
    const id = toast.add({
      title: "Event created",
      actionProps: {
        children: "Undo",
        onClick() {
          toast.close(id)
        },
      },
    })
  }

  return (
    <Button variant="neutral" onClick={showToast}>
      Show Toast
    </Button>
  )
}

export default function ToastActionDemo() {
  return (
    <Toaster>
      <ToastActionButton />
    </Toaster>
  )
}
```

### Promise

Use `toast.promise` to update one toast as an asynchronous task moves through loading, success, and error states.

```tsx
"use client"

import { Button } from "@/components/ui/button"
import { Toaster, useToastManager } from "@/components/ui/toast"

function ToastPromiseButton() {
  const toast = useToastManager()

  function showToast() {
    toast.promise(
      new Promise<{ name: string }>((resolve) => {
        window.setTimeout(() => resolve({ name: "Event" }), 2000)
      }),
      {
        loading: "Creating event…",
        success: (data) => `${data.name} created.`,
        error: "Could not create event.",
      },
    )
  }

  return (
    <Button variant="neutral" onClick={showToast}>
      Create Event
    </Button>
  )
}

export default function ToastPromiseDemo() {
  return (
    <Toaster>
      <ToastPromiseButton />
    </Toaster>
  )
}
```
