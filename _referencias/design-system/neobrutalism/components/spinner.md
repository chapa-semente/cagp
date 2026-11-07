---
title: "Spinner"
description: "An indicator that can be used to show a loading state."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/spinner"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "lucide-react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/spinner"
---

# Spinner

> An indicator that can be used to show a loading state.

```tsx
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerDemo() {
  return <Spinner />
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/spinner.json"
```

### Component Source Code (`components/ui/spinner.tsx`)

```tsx
import { Loader2Icon } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
```


## Usage

```ts
import { Spinner } from '@/components/ui/spinner'
```

```tsx
<Spinner />
```

## Examples

### Default

```tsx
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerDemo() {
  return <Spinner />
}
```

### Size

Use the `size-*` utility class to change the size of the spinner.

```tsx
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerSizeDemo() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  )
}
```

### In Button

```tsx
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerInButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled>
        <Spinner />
        Please wait
      </Button>
      <Button variant="neutral" disabled>
        <Spinner />
        Please wait
      </Button>
    </div>
  )
}
```

### With Badge

```tsx
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerWithBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Badge>
        <Spinner />
        Syncing
      </Badge>
      <Badge variant="neutral">
        <Spinner />
        Syncing
      </Badge>
    </div>
  )
}
```
