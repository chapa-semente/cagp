---
title: "Direction"
description: "Provides the reading direction (LTR or RTL) to Base UI components."
source: "neobrutalism.com"
canonicalUrl: "https://neobrutalism.com/docs/components/direction"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "@base-ui/react"
shadcnDocsLink: "https://ui.shadcn.com/docs/components/direction"
---

# Direction

> Provides the reading direction (LTR or RTL) to Base UI components.

```tsx
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DirectionProvider } from "@/components/ui/direction"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DirectionDemo() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex flex-col items-start gap-4">
        <Popover>
          <PopoverTrigger render={<Button variant="neutral" />}>
            افتح القائمة
            <ArrowRightIcon />
          </PopoverTrigger>
          <PopoverContent side="inline-end" align="start">
            <p className="text-sm font-base">
              This popover opens on the inline end side. In RTL that is the
              left, because the provider tells Base UI which direction to use.
            </p>
          </PopoverContent>
        </Popover>
      </div>
    </DirectionProvider>
  )
}
```

## Installation

### CLI Installation

```bash
npx shadcn@latest add "https://neobrutalism.com/r/direction.json"
```

### Component Source Code (`components/ui/direction.tsx`)

```tsx
"use client"

export {
  DirectionProvider,
  useDirection,
} from "@base-ui/react/direction-provider"
```


## Usage

Base UI popups (Popover, Tooltip, Menu, Select, ...) do not read the `dir` attribute of the document. Instead, they take the reading direction from `DirectionProvider`, which is what makes `side="inline-start"` / `side="inline-end"` positioning, keyboard navigation and RTL specific animations flip correctly. Wrap your app (or the part of it that is right-to-left) in the provider and set the `dir` attribute on the same element so the DOM matches.

```ts
import { DirectionProvider, useDirection } from '@/components/ui/direction'
```

```tsx
<DirectionProvider direction="rtl">
  <div dir="rtl">
    <Popover>
      <PopoverTrigger render={<Button />}>Open</PopoverTrigger>
      <PopoverContent side="inline-end">...</PopoverContent>
    </Popover>
  </div>
</DirectionProvider>
```

Use the `useDirection` hook to read the current direction in your own components:

```tsx
function Arrow() {
  const direction = useDirection()

  return direction === "rtl" ? <ArrowLeftIcon /> : <ArrowRightIcon />
}
```

See the <a target="_blank" href="https://base-ui.com/react/utils/direction-provider">Base UI documentation</a> for more details.
