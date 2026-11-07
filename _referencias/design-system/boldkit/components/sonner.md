---
title: "Sonner"
description: "Toast notifications with bold neubrutalism styling powered by the Sonner library."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/sonner"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "sonner"
---

# Sonner

> Toast notifications with bold neubrutalism styling powered by the Sonner library.

> 🔗 **Original Source Code**: [`components/ui/sonner.tsx`](../ui/sonner.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/sonner.json"
```

### Component Source Code (`components/ui/sonner.tsx`)

```tsx
import { useTheme } from '@/hooks/use-theme'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme()

  return (
    <Sonner
      theme={resolvedTheme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-3 group-[.toaster]:border-foreground group-[.toaster]:shadow-[4px_4px_0px_hsl(var(--shadow-color))] group-[.toaster]:rounded-none group-[.toaster]:font-bold',
          title: 'group-[.toast]:font-black group-[.toast]:uppercase group-[.toast]:tracking-wide',
          description: 'group-[.toast]:text-muted-foreground group-[.toast]:font-medium',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:border-2 group-[.toast]:border-foreground group-[.toast]:font-bold group-[.toast]:uppercase group-[.toast]:rounded-none group-[.toast]:shadow-[2px_2px_0px_hsl(var(--foreground))] group-[.toast]:hover:translate-x-[2px] group-[.toast]:hover:translate-y-[2px] group-[.toast]:hover:shadow-none group-[.toast]:transition',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:border-2 group-[.toast]:border-foreground group-[.toast]:font-bold group-[.toast]:uppercase group-[.toast]:rounded-none',
          success:
            'group-[.toaster]:bg-success group-[.toaster]:text-success-foreground group-[.toaster]:border-foreground',
          error:
            'group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground group-[.toaster]:border-foreground',
          warning:
            'group-[.toaster]:bg-warning group-[.toaster]:text-warning-foreground group-[.toaster]:border-foreground',
          info:
            'group-[.toaster]:bg-info group-[.toaster]:text-info-foreground group-[.toaster]:border-foreground',
          closeButton:
            'group-[.toast]:border-2 group-[.toast]:border-foreground group-[.toast]:bg-background group-[.toast]:text-foreground group-[.toast]:hover:bg-muted group-[.toast]:rounded-none',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
```

## Usage

```tsx
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export default function Example() {
  return (
    <Button
      onClick={() => toast('Event has been created')}
    >
      Show Toast
    </Button>
  )
}
```

## Examples

### Types

Different toast types for various notifications.

```tsx
toast('Default toast')
toast.success('Success!')
toast.error('Error occurred')
toast.warning('Warning!')
toast.info('Information')
```

### With Description

Toast with a title and description.

```tsx
toast('Event Created', {
  description: 'Your event has been scheduled for tomorrow at 3pm.',
})
```

### With Action

Toast with action and cancel buttons.

```tsx
toast('Event Created', {
  description: 'Your event has been scheduled.',
  action: {
    label: 'Undo',
    onClick: () => toast.info('Action undone'),
  },
})
```

### Promise

Toast that shows loading, success, and error states.

```tsx
const promise = new Promise((resolve) =>
  setTimeout(resolve, 2000)
)

toast.promise(promise, {
  loading: 'Loading...',
  success: 'Data loaded!',
  error: 'Error loading data',
})
```

