---
title: "Alert"
description: "Displays a callout for user attention."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/alert"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/alert"
---

# Alert

> Displays a callout for user attention.

> 🔗 **Original Source Code**: [`components/ui/alert.tsx`](../ui/alert.tsx)
> 📂 **Original Examples**: [`examples/ui/alert/`](../examples/alert/)

```tsx
import { CheckCircle2Icon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertDemo() {
  return (
    <Alert>
      <CheckCircle2Icon />
      <AlertTitle>Success! Your changes have been saved</AlertTitle>
      <AlertDescription>
        This is an alert with icon, title and description.
      </AlertDescription>
    </Alert>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/alert.json"
```

### Component Source Code (`components/ui/alert.tsx`)

```tsx
import { cva, type VariantProps } from "class-variance-authority"

import * as React from "react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-base border-2 border-border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current shadow-shadow",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "bg-black text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-heading tracking-tight",
        className,
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-sm font-base [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
```


## Usage

```ts
import { CheckCircle2Icon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
```

```tsx
<Alert>
  <CheckCircle2Icon />
  <AlertTitle>Success! Your changes have been saved</AlertTitle>
  <AlertDescription>
    This is an alert with icon, title and description.
  </AlertDescription>
</Alert>
```

## Examples

### Default

```tsx
import { CheckCircle2Icon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertDemo() {
  return (
    <Alert>
      <CheckCircle2Icon />
      <AlertTitle>Success! Your changes have been saved</AlertTitle>
      <AlertDescription>
        This is an alert with icon, title and description.
      </AlertDescription>
    </Alert>
  )
}
```

### Destructive

```tsx
import { AlertCircleIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertDestructiveDemo() {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Something went wrong!</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  )
}
```

### Only Icon and Description

```tsx
import { BookmarkCheckIcon } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AlertIconDescriptionDemo() {
  return (
    <Alert>
      <BookmarkCheckIcon />
      <AlertDescription>
        This one has an icon and a description only. No title.
      </AlertDescription>
    </Alert>
  )
}
```

### Only Description

```tsx
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AlertDescriptionOnlyDemo() {
  return (
    <Alert>
      <AlertDescription>
        This one has a description only. No title. No icon.
      </AlertDescription>
    </Alert>
  )
}
```

### Only Icon and Title

```tsx
import { PopcornIcon } from "lucide-react"

import { Alert, AlertTitle } from "@/components/ui/alert"

export default function AlertIconTitleDemo() {
  return (
    <Alert>
      <PopcornIcon />
      <AlertTitle>Let&apos;s try one with icon and title.</AlertTitle>
    </Alert>
  )
}
```

### Long Description

```tsx
import { GiftIcon } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AlertLongDescriptionDemo() {
  return (
    <Alert>
      <GiftIcon />
      <AlertDescription>
        This is a very long alert description that demonstrates how the
        component handles extended text content and potentially wraps across
        multiple lines
      </AlertDescription>
    </Alert>
  )
}
```

### Long Title

```tsx
import { ShieldAlertIcon } from "lucide-react"

import { Alert, AlertTitle } from "@/components/ui/alert"

export default function AlertLongTitleDemo() {
  return (
    <Alert>
      <ShieldAlertIcon />
      <AlertTitle>
        This is a very long alert title that demonstrates how the component
        handles extended text content and potentially wraps across multiple
        lines
      </AlertTitle>
    </Alert>
  )
}
```

### Long Title and Description

```tsx
import { AlertCircleIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertLongTitleAndDescriptionDemo() {
  return (
    <Alert>
      <AlertCircleIcon />
      <AlertTitle>
        This is an extremely long alert title that spans multiple lines to
        demonstrate how the component handles very lengthy headings while
        maintaining readability and proper text wrapping behavior
      </AlertTitle>
      <AlertDescription>
        This is an equally long description that contains detailed information
        about the alert. It shows how the component can accommodate extensive
        content while preserving proper spacing, alignment, and readability
        across different screen sizes and viewport widths. This helps ensure the
        user experience remains consistent regardless of the content length.
      </AlertDescription>
    </Alert>
  )
}
```

### With Button

```tsx
import { CheckCircle2Icon } from "lucide-react"

import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function AlertLongDescriptionDemo() {
  return (
    <Alert className="sm:min-w-[500px]">
      <CheckCircle2Icon />
      <AlertTitle className="max-w-[calc(100%-4rem)] overflow-ellipsis">
        The selected emails have been marked as spam.
      </AlertTitle>
      <Button
        size="sm"
        variant="noShadow"
        className="absolute top-2.5 right-3 h-6 bg-secondary-background text-foreground"
      >
        Undo
      </Button>
    </Alert>
  )
}
```
