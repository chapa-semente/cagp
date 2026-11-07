---
title: "Badge"
description: "The BoldKit Badge is a compact neubrutalism label element with 5 variants (default, secondary, accent, destructive, outline) for communicating status, category, or count at a glance. It features bold uppercase typography, a 2px border, and a small hard shadow for visual pop. Use it as a status indicator, content tag, or numeric counter alongside other UI elements."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/badge"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# Badge

> The BoldKit Badge is a compact neubrutalism label element with 5 variants (default, secondary, accent, destructive, outline) for communicating status, category, or count at a glance. It features bold uppercase typography, a 2px border, and a small hard shadow for visual pop. Use it as a status indicator, content tag, or numeric counter alongside other UI elements.

> 🔗 **Original Source Code**: [`components/ui/badge.tsx`](../ui/badge.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/badge.json"
```

### Component Source Code (`components/ui/badge.tsx`)

```tsx
/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center border-2 border-foreground px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide transition duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        accent: 'bg-accent text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        info: 'bg-info text-info-foreground',
        outline: 'bg-background text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
```

## Usage

```tsx
import { Badge } from '@/components/ui/badge'

export default function Example() {
  return <Badge>Badge</Badge>
}
```

## Examples

### Variants

The badge comes with several variants to convey different meanings.

```tsx
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="outline">Outline</Badge>
```

### Status Badges

Use badges to show status information.

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Inactive</Badge>
<Badge variant="info">In Progress</Badge>
```

### With Counter

Display counts or numbers in badges.

```tsx
<Badge>New 5</Badge>
<Badge variant="destructive">Errors 12</Badge>
<Badge variant="secondary">Messages 99+</Badge>
```

### Category Badges

Use badges to categorize content.

```tsx
<Badge variant="accent">Design</Badge>
<Badge variant="info">Development</Badge>
<Badge variant="secondary">Marketing</Badge>
<Badge variant="outline">Documentation</Badge>
```

### In Context

Badges are often used alongside text or in headers.

```tsx
<div className="flex items-center gap-2">
  <h3 className="text-lg font-bold">Features</h3>
  <Badge variant="accent">New</Badge>
</div>
<div className="flex items-center gap-2">
  <span>Component Library</span>
  <Badge variant="success">v1.0</Badge>
</div>
```

