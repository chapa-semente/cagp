---
title: "Button Group"
description: "Visually joins a row or column of buttons into a single bordered unit with one hard shadow."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/button-group"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# Button Group

> Visually joins a row or column of buttons into a single bordered unit with one hard shadow.

> 🔗 **Original Source Code**: [`components/ui/button-group.tsx`](../ui/button-group.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/button-group.json"
```

### Component Source Code (`components/ui/button-group.tsx`)

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
}

/**
 * Visually joins a row (or column) of Buttons into a single bordered unit:
 * shared borders collapse, individual shadows/press animations are neutralized,
 * and the group carries one hard neubrutalism shadow.
 */
const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        'inline-flex shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        // neutralize each child's own shadow + press-translate so the group reads as one block
        '[&>*]:shadow-none [&>*]:hover:translate-x-0 [&>*]:hover:translate-y-0 [&>*]:active:translate-x-0 [&>*]:active:translate-y-0',
        orientation === 'horizontal'
          ? '[&>*:not(:first-child)]:ml-[-3px]'
          : 'flex-col [&>*:not(:first-child)]:mt-[-3px]',
        className
      )}
      {...props}
    />
  )
)
ButtonGroup.displayName = 'ButtonGroup'

export { ButtonGroup }
```

## Usage

```tsx
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'

export default function Example() {
  return (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  )
}
```

## Examples

### Vertical

Stack buttons into a vertical group.

```tsx
<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>
```

