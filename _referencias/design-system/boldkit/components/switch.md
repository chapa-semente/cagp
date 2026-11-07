---
title: "Switch"
description: "A toggle switch control with bold neubrutalism styling for binary on/off states."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/switch"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "radix-ui"
---

# Switch

> A toggle switch control with bold neubrutalism styling for binary on/off states.

> 🔗 **Original Source Code**: [`components/ui/switch.tsx`](../ui/switch.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/switch.json"
```

### Component Source Code (`components/ui/switch.tsx`)

```tsx
import * as React from 'react'
import { Switch as SwitchPrimitives } from 'radix-ui'
import { cn } from '@/lib/utils'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center border-3 border-foreground bg-muted shadow-[4px_4px_0px_hsl(var(--shadow-color))] bk-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-5 w-5 border-2 border-foreground bg-background shadow-sm bk-interactive data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5'
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
```

## Usage

```tsx
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function Example() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}
```

## Examples

### Default Checked

A switch that is checked by default.

```tsx
<div className="flex items-center space-x-2">
  <Switch id="notifications" defaultChecked />
  <Label htmlFor="notifications">Enable Notifications</Label>
</div>
```

### Disabled

A disabled switch that cannot be toggled.

```tsx
<div className="space-y-4">
  <div className="flex items-center space-x-2">
    <Switch id="disabled-off" disabled />
    <Label htmlFor="disabled-off">Disabled Off</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Switch id="disabled-on" disabled defaultChecked />
    <Label htmlFor="disabled-on">Disabled On</Label>
  </div>
</div>
```

### Form

Multiple switches in a settings form.

```tsx
<div className="space-y-4">
  <div className="flex items-center justify-between">
    <Label htmlFor="marketing">Marketing emails</Label>
    <Switch id="marketing" />
  </div>
  <div className="flex items-center justify-between">
    <Label htmlFor="security">Security alerts</Label>
    <Switch id="security" defaultChecked />
  </div>
  <div className="flex items-center justify-between">
    <Label htmlFor="updates">Product updates</Label>
    <Switch id="updates" />
  </div>
</div>
```

