---
title: "Resizable"
description: "Resizable panel groups with draggable handles for split layouts and dashboards."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/resizable"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "react-resizable-panels"
---

# Resizable

> Resizable panel groups with draggable handles for split layouts and dashboards.

> 🔗 **Original Source Code**: [`components/ui/resizable.tsx`](../ui/resizable.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/resizable.json"
```

### Component Source Code (`components/ui/resizable.tsx`)

```tsx
import * as React from 'react'
import { GripVertical } from 'lucide-react'
import * as ResizablePrimitive from 'react-resizable-panels'
import { cn } from '@/lib/utils'

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      'relative flex w-[3px] items-center justify-center bg-foreground after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-[3px] data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-2 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-6 w-3 items-center justify-center border-3 border-foreground bg-background shadow-[2px_2px_0px_hsl(var(--shadow-color))]">
        <GripVertical className="h-2.5 w-2.5 stroke-[3]" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
```

## Usage

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

export default function Example() {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-[12rem] border-3 border-foreground">
      <ResizablePanel defaultSize={50}>One</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>Two</ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

## Examples

### Vertical

Stack panels vertically with a horizontal handle.

```tsx
<ResizablePanelGroup direction="vertical" className="min-h-[12rem] border-3 border-foreground">
  <ResizablePanel defaultSize={40}>Header</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={60}>Content</ResizablePanel>
</ResizablePanelGroup>
```

### Without Handle

Omit the grip for a minimal divider that is still draggable.

```tsx
<ResizablePanelGroup direction="horizontal" className="min-h-[12rem] border-3 border-foreground">
  <ResizablePanel defaultSize={50}>Left</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>Right</ResizablePanel>
</ResizablePanelGroup>
```

