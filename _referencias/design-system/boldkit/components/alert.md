---
title: "Alert"
description: "Displays a callout for user attention with various severity levels and bold neubrutalism styling."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/alert"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# Alert

> Displays a callout for user attention with various severity levels and bold neubrutalism styling.

> 🔗 **Original Source Code**: [`components/ui/alert.tsx`](../ui/alert.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/alert.json"
```

### Component Source Code (`components/ui/alert.tsx`)

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full border-3 border-foreground p-4 shadow-[4px_4px_0px_hsl(var(--shadow-color))] ease-out animate-in fade-in-0 slide-in-from-top-2 duration-300 transition [&>svg~*:not([data-alert-action])]:pl-8 [&>svg~[data-alert-action]]:ml-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'bg-destructive text-destructive-foreground [&>svg]:text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        info: 'bg-info text-info-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-bold uppercase tracking-wide leading-none', className)}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export interface AlertActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Shows an inline spinner and disables the button automatically */
  loading?: boolean
}

const AlertAction = React.forwardRef<HTMLButtonElement, AlertActionProps>(
  ({ className, loading, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      data-alert-action=""
      disabled={disabled || loading}
      className={cn(
        // layout
        'mt-3 inline-flex items-center gap-1.5 max-w-full min-w-0',
        // shape — no rounded corners, thin border inheriting text color
        'rounded-none border border-current',
        // typography
        'px-4 py-1 text-xs font-bold uppercase tracking-wide',
        // transitions
        'transition duration-150',
        // hover
        'hover:opacity-100 hover:bg-current/10',
        // active
        'active:scale-95',
        // focus
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1',
        // cursor + pointer-events when non-interactive
        'disabled:cursor-not-allowed disabled:pointer-events-none',
        // opacity: loading stays visible, truly-disabled fades out, default is 80%
        loading ? 'opacity-80' : disabled ? 'opacity-40' : 'opacity-80',
        className
      )}
      {...props}
    >
      {loading && (
        <span
          data-testid="alert-action-spinner"
          aria-hidden="true"
          className="h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap overflow-hidden">{children}</span>
    </button>
  )
)
AlertAction.displayName = 'AlertAction'

export { Alert, AlertTitle, AlertDescription, AlertAction }
```

## Usage

```tsx
import { Alert, AlertDescription, AlertTitle, AlertAction } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

export default function Example() {
  return (
    <Alert variant="warning">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Session Expiring</AlertTitle>
      <AlertDescription>
        Your session will expire in 5 minutes.
      </AlertDescription>
      <AlertAction onClick={() => console.log('extend')}>
        Extend Session
      </AlertAction>
    </Alert>
  )
}
```

## Examples

### Variants

The alert comes with several variants to convey different levels of importance.

```tsx
<Alert variant="default">
  <Terminal className="h-4 w-4" />
  <AlertTitle>Default</AlertTitle>
  <AlertDescription>This is a default alert.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>

<Alert variant="success">
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Operation completed.</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Please be careful.</AlertDescription>
</Alert>

<Alert variant="info">
  <Info className="h-4 w-4" />
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>Here is some information.</AlertDescription>
</Alert>
```

### Without Icon

Alerts can be used without an icon for simpler notifications.

```tsx
<Alert>
  <AlertTitle>Notice</AlertTitle>
  <AlertDescription>
    This is a simple alert without an icon.
  </AlertDescription>
</Alert>
```

### Description Only

Use just the description for brief inline messages.

```tsx
<Alert variant="info">
  <Info className="h-4 w-4" />
  <AlertDescription>
    Your session will expire in 5 minutes.
  </AlertDescription>
</Alert>
```

### With Action Button

Pass an optional AlertAction at the end of the alert. It accepts any children — text, icon, or both. Supports loading and disabled states.

```tsx
<Alert variant="warning">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Storage Almost Full</AlertTitle>
  <AlertDescription>
    You're using 95% of your storage. Upgrade to keep your files.
  </AlertDescription>
  <AlertAction onClick={() => console.log('upgrade')}>Upgrade Plan</AlertAction>
</Alert>

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Delete Account</AlertTitle>
  <AlertDescription>
    This will permanently delete your account and all data.
  </AlertDescription>
  <AlertAction onClick={() => console.log('delete')}>
    <Trash2 className="h-3 w-3" />
    Delete Forever
  </AlertAction>
</Alert>

<Alert variant="info">
  <Info className="h-4 w-4" />
  <AlertTitle>Update Available</AlertTitle>
  <AlertDescription>Version 4.2.0 is ready to install.</AlertDescription>
  <AlertAction onClick={() => console.log('install')}>Install Now</AlertAction>
</Alert>

<Alert variant="default">
  <Terminal className="h-4 w-4" />
  <AlertTitle>Build Failed</AlertTitle>
  <AlertDescription>The last deployment did not complete.</AlertDescription>
  <AlertAction disabled>Retry</AlertAction>
</Alert>
```

