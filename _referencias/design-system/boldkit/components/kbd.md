---
title: "Kbd"
description: "Keyboard key indicators for displaying shortcuts and hotkeys with neubrutalism styling."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/kbd"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# Kbd

> Keyboard key indicators for displaying shortcuts and hotkeys with neubrutalism styling.

> 🔗 **Original Source Code**: [`components/ui/kbd.tsx`](../ui/kbd.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/kbd.json"
```

### Component Source Code (`components/ui/kbd.tsx`)

```tsx
/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const kbdVariants = cva(
  'inline-flex items-center justify-center font-mono font-bold uppercase border-3 border-foreground',
  {
    variants: {
      variant: {
        default: 'bg-muted shadow-[2px_2px_0px_hsl(var(--shadow-color))]',
        outline: 'bg-background',
        ghost: 'bg-transparent border-transparent text-muted-foreground',
      },
      size: {
        sm: 'min-w-5 h-5 px-1 text-[10px]',
        md: 'min-w-6 h-6 px-1.5 text-xs',
        lg: 'min-w-8 h-8 px-2 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Kbd.displayName = 'Kbd'

export interface KbdComboProps extends Omit<KbdProps, 'children'> {
  keys: string[]
  separator?: React.ReactNode
}

const KbdCombo = React.forwardRef<HTMLDivElement, KbdComboProps>(
  ({ keys, separator = '+', variant, size, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center gap-1', className)}
        {...props}
      >
        {keys.map((key, index) => (
          <React.Fragment key={`kbd-${index}-${key}`}>
            {index > 0 && (
              <span className="text-muted-foreground text-xs font-bold">{separator}</span>
            )}
            <Kbd variant={variant} size={size}>
              {key}
            </Kbd>
          </React.Fragment>
        ))}
      </div>
    )
  }
)
KbdCombo.displayName = 'KbdCombo'

export { Kbd, KbdCombo, kbdVariants }
```

## Usage

```tsx
import { Kbd, KbdCombo } from '@/components/ui/kbd'

export default function Example() {
  return (
    <>
      <Kbd>K</Kbd>
      <KbdCombo keys={['Ctrl', 'K']} />
    </>
  )
}
```

## Examples

### Variants

Different visual styles for various contexts.

```tsx
<Kbd variant="default">Esc</Kbd>
<Kbd variant="outline">Esc</Kbd>
<Kbd variant="ghost">Esc</Kbd>
```

### Sizes

Available keyboard indicator sizes.

```tsx
<Kbd size="sm">A</Kbd>
<Kbd size="md">A</Kbd>
<Kbd size="lg">A</Kbd>
```

### Keyboard Combinations

Use KbdCombo for multi-key shortcuts.

```tsx
<KbdCombo keys={['Ctrl', 'K']} />
<KbdCombo keys={['Cmd', 'Shift', 'P']} />
<KbdCombo keys={['Alt', 'F4']} />
```

### Common Shortcuts

Examples of common keyboard shortcuts.

```tsx
<p className="flex items-center gap-2">
  Press <KbdCombo keys={['Ctrl', 'S']} /> to save
</p>
<p className="flex items-center gap-2">
  Press <KbdCombo keys={['Ctrl', 'Z']} /> to undo
</p>
<p className="flex items-center gap-2">
  Press <Kbd>Esc</Kbd> to close
</p>
```

