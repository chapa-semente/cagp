---
title: "Attachment"
description: "Displays a file attachment with media, title, description and actions."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/attachment"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/attachment"
---

# Attachment

> Displays a file attachment with media, title, description and actions.

> 🔗 **Original Source Code**: [`components/ui/attachment.tsx`](../ui/attachment.tsx)
> 📂 **Original Examples**: [`examples/ui/attachment/`](../examples/attachment/)

```tsx
import { FileTextIcon, XIcon } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"

export default function AttachmentDemo() {
  return (
    <Attachment className="w-full max-w-xs">
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
        <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/attachment.json"
```

### Component Source Code (`components/ui/attachment.tsx`)

```tsx
"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import * as React from "react"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

const attachmentVariants = cva(
  "group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-base border-2 border-border bg-background text-foreground font-base transition-colors focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 has-[>a,>button]:hover:bg-secondary-background data-[state=error]:bg-black data-[state=error]:text-white data-[state=idle]:border-dashed",
  {
    variants: {
      size: {
        default:
          "gap-2 text-sm has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2",
        sm: "gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5",
        xs: "gap-1.5 text-xs has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1 has-data-[slot=attachment-media]:p-1",
      },
      orientation: {
        horizontal: "min-w-40 items-center",
        vertical: "w-24 flex-col has-data-[slot=attachment-content]:w-30",
      },
    },
  },
)

function Attachment({
  className,
  state = "done",
  size = "default",
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof attachmentVariants> & {
    state?: "idle" | "uploading" | "processing" | "error" | "done"
  }) {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-size={size}
      data-orientation={orientation}
      className={cn(attachmentVariants({ size, orientation }), className)}
      {...props}
    />
  )
}

const attachmentMediaVariants = cva(
  "relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-base border-2 border-border bg-secondary-background text-foreground group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 group-data-[state=error]/attachment:text-black group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-6! [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        icon: "",
        image:
          "opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  },
)

function AttachmentMedia({
  className,
  variant = "icon",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof attachmentMediaVariants>) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cn(attachmentMediaVariants({ variant }), className)}
      {...props}
    />
  )
}

function AttachmentContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-content"
      className={cn(
        "max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1",
        className,
      )}
      {...props}
    />
  )
}

function AttachmentTitle({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-title"
      className={cn(
        "block max-w-full min-w-0 truncate font-heading group-data-[state=processing]/attachment:animate-pulse group-data-[state=uploading]/attachment:animate-pulse",
        className,
      )}
      {...props}
    />
  )
}

function AttachmentDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-description"
      className={cn(
        "mt-0.5 block min-w-0 truncate text-xs text-foreground group-data-[state=error]/attachment:text-white",
        "max-w-full",
        className,
      )}
      {...props}
    />
  )
}

function AttachmentActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-actions"
      className={cn(
        "relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1",
        className,
      )}
      {...props}
    />
  )
}

function AttachmentAction({
  className,
  variant,
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="attachment-action"
      variant={variant ?? "neutral"}
      size={size}
      className={cn(
        "size-6 border-0 bg-transparent text-inherit shadow-none! hover:translate-x-0! hover:translate-y-0!",
        className,
      )}
      {...props}
    />
  )
}

function AttachmentTrigger({
  className,
  render,
  type,
  ...props
}: useRender.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        type: render ? type : (type ?? "button"),
        className: cn("absolute inset-0 z-10 outline-none", className),
      },
      props,
    ),
    render,
    state: {
      slot: "attachment-trigger",
    },
  })
}

export {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
}
```


## Usage

```ts
import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
} from '@/components/ui/attachment'
```

```tsx
<Attachment>
  <AttachmentMedia>
    <FileTextIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>document.pdf</AttachmentTitle>
    <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction aria-label="Remove">
      <XIcon />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>
```

## Examples

### Default

```tsx
import { FileTextIcon, XIcon } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"

export default function AttachmentDemo() {
  return (
    <Attachment className="w-full max-w-xs">
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
        <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  )
}
```

### States

Use the `state` prop (`idle`, `uploading`, `processing`, `error` or `done`) to reflect the upload progress.

```tsx
import { AlertCircleIcon, FileTextIcon, UploadIcon, XIcon } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Spinner } from "@/components/ui/spinner"

export default function AttachmentStatesDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Attachment state="idle" className="w-full">
        <AttachmentMedia>
          <UploadIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Drop a file</AttachmentTitle>
          <AttachmentDescription>Waiting for a file</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="uploading" className="w-full">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>quarterly-report.pdf</AttachmentTitle>
          <AttachmentDescription>Uploading · 45%</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Cancel">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="error" className="w-full">
        <AttachmentMedia>
          <AlertCircleIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>large-video.mp4</AttachmentTitle>
          <AttachmentDescription>File is too large</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="done" className="w-full">
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>notes.md</AttachmentTitle>
          <AttachmentDescription>Markdown · 12 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  )
}
```

### Image

```tsx
import { XIcon } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"

export default function AttachmentImageDemo() {
  return (
    <Attachment className="w-full max-w-xs">
      <AttachmentMedia variant="image">
        <img
          src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=200&q=80"
          alt="A cat"
        />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>cat.jpg</AttachmentTitle>
        <AttachmentDescription>JPG · 340 KB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  )
}
```

### Vertical

```tsx
import { FileTextIcon } from "lucide-react"

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"

export default function AttachmentVerticalDemo() {
  return (
    <div className="flex gap-4">
      <Attachment orientation="vertical">
        <AttachmentMedia variant="image">
          <img
            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=200&q=80"
            alt="A cat"
          />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>cat.jpg</AttachmentTitle>
          <AttachmentDescription>340 KB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment orientation="vertical">
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>report.pdf</AttachmentTitle>
          <AttachmentDescription>2.4 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </div>
  )
}
```
