---
title: "Button"
description: "The BoldKit Button is a neubrutalism-styled interactive element with 7 variants (default, secondary, accent, destructive, outline, ghost, link) and 5 sizes. Built on native button semantics with full keyboard accessibility, it features thick 3px borders and hard offset shadows that translate on hover. Available for both React and Vue 3 via the shadcn CLI."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/button"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "radix-ui"
---

# Button

> The BoldKit Button is a neubrutalism-styled interactive element with 7 variants (default, secondary, accent, destructive, outline, ghost, link) and 5 sizes. Built on native button semantics with full keyboard accessibility, it features thick 3px borders and hard offset shadows that translate on hover. Available for both React and Vue 3 via the shadcn CLI.

> 🔗 **Original Source Code**: [`components/ui/button.tsx`](../ui/button.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/button.json"
```

### Component Source Code (`components/ui/button.tsx`)

```tsx
/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { Slot as SlotPrimitive } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wide bk-interactive disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-3 border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        secondary:
          'bg-secondary text-secondary-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        accent:
          'bg-accent text-accent-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        destructive:
          'bg-destructive text-destructive-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        outline:
          'bg-background text-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none hover:bg-muted active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
        ghost:
          'border-transparent shadow-none hover:bg-muted hover:border-foreground',
        link: 'border-transparent shadow-none underline-offset-4 hover:underline text-primary',
        noShadow:
          'bg-primary text-primary-foreground',
        reverse:
          'bg-primary text-primary-foreground hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
      },
      size: {
        default: 'h-11 px-5 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-11 w-11',
      },
      animation: {
        none: '',
        pulse: 'animate-[brutal-pulse_2s_ease-in-out_infinite]',
        bounce: 'animate-[brutal-bounce_0.5s_ease-in-out_infinite]',
        shake: 'hover:animate-[brutal-shake_0.4s_ease-in-out]',
        wiggle: 'hover:animate-[brutal-wiggle_0.3s_ease-in-out]',
        pop: 'hover:animate-[brutal-pop_0.2s_ease-out] active:scale-95',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      animation: 'none',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? SlotPrimitive.Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
```

## Usage

```tsx
import { Button } from '@/components/ui/button'

export default function Example() {
  return <Button>Click me</Button>
}
```

## Examples

### Variants

The button comes with several variants to match different use cases.

```tsx
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Sizes

Buttons are available in different sizes.

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon"><Mail className="h-4 w-4" /></Button>
```

### With Icon

Add icons to buttons for better visual feedback.

```tsx
<Button>
  <Mail className="mr-2 h-4 w-4" /> Login with Email
</Button>
<Button variant="secondary">
  Next <ChevronRight className="ml-2 h-4 w-4" />
</Button>
```

### Loading

Show a loading state while an action is in progress.

```tsx
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>
```

### Animations

Add attention-grabbing animations to your buttons.

```tsx
<Button animation="pulse">Pulse</Button>
<Button animation="bounce">Bounce</Button>
<Button animation="shake">Shake (hover)</Button>
<Button animation="wiggle">Wiggle (hover)</Button>
<Button animation="pop">Pop (hover)</Button>
```

### As Child

Use the asChild prop to render the button as a different element like a link.

```tsx
<Button asChild>
  <a href="#">Link styled as Button</a>
</Button>
```

