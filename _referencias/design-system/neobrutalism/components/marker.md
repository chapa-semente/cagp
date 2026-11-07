---
title: "Marker"
description: "A small inline status or step marker for a conversation timeline."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/marker"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/marker"
---

# Marker

> A small inline status or step marker for a conversation timeline.

> 🔗 **Original Source Code**: [`components/ui/marker.tsx`](../ui/marker.tsx)
> 📂 **Original Examples**: [`examples/ui/marker/`](../examples/marker/)

```tsx
import { GlobeIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

export default function MarkerDemo() {
  return (
    <div className="w-full max-w-sm">
      <Marker>
        <MarkerIcon>
          <GlobeIcon />
        </MarkerIcon>
        <MarkerContent>Searched the web</MarkerContent>
      </Marker>
    </div>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/marker.json"
```

### Component Source Code (`components/ui/marker.tsx`)

```tsx
"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import * as React from "react"

import { cn } from "@/lib/utils"

const markerVariants = cva(
  "group/marker relative flex min-h-4 w-full items-center gap-2 text-left text-sm font-base text-foreground [&_svg:not([class*='size-'])]:size-4 [a]:underline [a]:underline-offset-3 [a]:hover:text-foreground",
  {
    variants: {
      variant: {
        default: "",
        separator:
          "before:mr-0 before:h-0.5 before:min-w-0 before:flex-1 before:bg-border after:ml-0 after:h-0.5 after:min-w-0 after:flex-1 after:bg-border",
        border: "border-b-2 border-border pb-2",
      },
    },
  },
)

function Marker({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof markerVariants>) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(markerVariants({ variant, className })),
      },
      props,
    ),
    render,
    state: {
      slot: "marker",
      variant,
    },
  })
}

function MarkerIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-icon"
      aria-hidden="true"
      className={cn(
        "size-4 shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function MarkerContent({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="marker-content"
      className={cn(
        "min-w-0 wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className,
      )}
      {...props}
    />
  )
}

export { Marker, MarkerIcon, MarkerContent, markerVariants }
```


## Usage

```ts
import { Marker, MarkerIcon, MarkerContent } from '@/components/ui/marker'
```

```tsx
<Marker>
  <MarkerIcon>
    <GlobeIcon />
  </MarkerIcon>
  <MarkerContent>Searched the web</MarkerContent>
</Marker>
```

## Examples

### Default

```tsx
import { GlobeIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

export default function MarkerDemo() {
  return (
    <div className="w-full max-w-sm">
      <Marker>
        <MarkerIcon>
          <GlobeIcon />
        </MarkerIcon>
        <MarkerContent>Searched the web</MarkerContent>
      </Marker>
    </div>
  )
}
```

### Separator

```tsx
import { Marker, MarkerContent } from "@/components/ui/marker"

export default function MarkerSeparatorDemo() {
  return (
    <div className="w-full max-w-sm">
      <Marker variant="separator">
        <MarkerContent>Yesterday</MarkerContent>
      </Marker>
    </div>
  )
}
```


### With Spinner

```tsx
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { Spinner } from "@/components/ui/spinner"

export default function MarkerWithSpinnerDemo() {
  return (
    <div className="w-full max-w-sm">
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent>Thinking...</MarkerContent>
      </Marker>
    </div>
  )
}
```
