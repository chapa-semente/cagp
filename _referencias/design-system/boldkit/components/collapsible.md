---
title: "Collapsible"
description: "An interactive component which expands/collapses a panel with smooth animations."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/collapsible"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "radix-ui"
---

# Collapsible

> An interactive component which expands/collapses a panel with smooth animations.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/collapsible.json"
```

### Component Source Code (`components/ui/collapsible.tsx`)

```tsx
import * as React from 'react'
import { Collapsible as CollapsiblePrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    ref={ref}
    className={cn(
      'transition duration-150 [&[data-state=open]>svg]:rotate-180',
      className
    )}
    {...props}
  />
))
CollapsibleTrigger.displayName = CollapsiblePrimitive.CollapsibleTrigger.displayName

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={cn(
      'overflow-hidden transition data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
      className
    )}
    {...props}
  />
))
CollapsibleContent.displayName = CollapsiblePrimitive.CollapsibleContent.displayName

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
```

## Usage

```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from 'lucide-react'

export default function Example() {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline">
          Toggle <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="border-3 border-foreground p-4">
          Collapsible content here.
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
```

## Examples

### Basic

A simple collapsible section.

```tsx
<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="outline">
      Toggle <ChevronsUpDown className="ml-2 h-4 w-4" />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-2">
    <div className="border-3 border-foreground p-4">
      Hidden content revealed!
    </div>
  </CollapsibleContent>
</Collapsible>
```

### Controlled

Control the open state programmatically.

```tsx
const [isOpen, setIsOpen] = useState(false)

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <div className="flex items-center gap-4">
    <CollapsibleTrigger asChild>
      <Button variant="outline">
        {isOpen ? 'Close' : 'Open'}
      </Button>
    </CollapsibleTrigger>
    <span className="text-sm text-muted-foreground">
      State: {isOpen ? 'Open' : 'Closed'}
    </span>
  </div>
  <CollapsibleContent className="mt-2">
    <div className="border-3 border-foreground p-4">
      Controlled content
    </div>
  </CollapsibleContent>
</Collapsible>
```

### Default Open

Start with the collapsible section expanded.

```tsx
<Collapsible defaultOpen>
  <CollapsibleTrigger asChild>
    <Button variant="outline">
      Toggle <ChevronsUpDown className="ml-2 h-4 w-4" />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-2">
    <div className="border-3 border-foreground p-4">
      This section is open by default.
    </div>
  </CollapsibleContent>
</Collapsible>
```

### List with More Items

Show additional items when expanded.

```tsx
<Collapsible className="w-full max-w-sm space-y-2">
  <div className="border-3 border-foreground px-4 py-2">Item 1</div>
  <div className="border-3 border-foreground px-4 py-2">Item 2</div>
  <CollapsibleContent className="space-y-2">
    <div className="border-3 border-foreground px-4 py-2">Item 3</div>
    <div className="border-3 border-foreground px-4 py-2">Item 4</div>
    <div className="border-3 border-foreground px-4 py-2">Item 5</div>
  </CollapsibleContent>
  <CollapsibleTrigger asChild>
    <Button variant="ghost" size="sm" className="w-full">
      Show more <ChevronsUpDown className="ml-2 h-4 w-4" />
    </Button>
  </CollapsibleTrigger>
</Collapsible>
```

