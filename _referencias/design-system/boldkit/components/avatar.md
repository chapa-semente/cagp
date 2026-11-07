---
title: "Avatar"
description: "An image element with a fallback for representing the user with bold neubrutalism borders."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/avatar"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "radix-ui"
---

# Avatar

> An image element with a fallback for representing the user with bold neubrutalism borders.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/avatar.json"
```

### Component Source Code (`components/ui/avatar.tsx`)

```tsx
import * as React from 'react'
import { Avatar as AvatarPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] transition duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center bg-primary text-primary-foreground font-bold uppercase',
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
```

## Usage

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Example() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
```

## Examples

### With Image

Display a user's profile picture.

```tsx
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

### Fallback

Shows initials when image fails to load or is not provided.

```tsx
<Avatar>
  <AvatarImage src="/broken-image.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### Sizes

Avatars can be customized to different sizes using className.

```tsx
<Avatar className="h-8 w-8">
  <AvatarFallback>SM</AvatarFallback>
</Avatar>
<Avatar className="h-10 w-10">
  <AvatarFallback>MD</AvatarFallback>
</Avatar>
<Avatar className="h-14 w-14">
  <AvatarFallback>LG</AvatarFallback>
</Avatar>
<Avatar className="h-20 w-20">
  <AvatarFallback>XL</AvatarFallback>
</Avatar>
```

### Avatar Group

Stack multiple avatars together for a group display with overlapping effect.

```tsx
<div className="flex items-center">
  <Avatar className="ring-2 ring-background z-40">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar className="ring-2 ring-background -ml-3 z-30">
    <AvatarFallback className="bg-secondary">JD</AvatarFallback>
  </Avatar>
  <Avatar className="ring-2 ring-background -ml-3 z-20">
    <AvatarFallback className="bg-accent">AB</AvatarFallback>
  </Avatar>
  <Avatar className="ring-2 ring-background -ml-3 z-10">
    <AvatarFallback className="bg-muted text-muted-foreground text-xs">+3</AvatarFallback>
  </Avatar>
</div>
```

### Custom Colors

Customize the fallback background color for different users.

```tsx
<Avatar>
  <AvatarFallback className="bg-primary">AB</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback className="bg-secondary text-secondary-foreground">CD</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback className="bg-accent text-accent-foreground">EF</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback className="bg-destructive text-destructive-foreground">GH</AvatarFallback>
</Avatar>
```

