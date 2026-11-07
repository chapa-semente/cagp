---
title: "Card"
description: "The BoldKit Card is a neubrutalism content container with a thick 3px border and hard offset shadow that grounds it on the page. It ships with CardHeader, CardContent, and CardFooter subcomponents for structured layouts. Use it to group related information, form fields, or media in a visually bold, cohesive block."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/card"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# Card

> The BoldKit Card is a neubrutalism content container with a thick 3px border and hard offset shadow that grounds it on the page. It ships with CardHeader, CardContent, and CardFooter subcomponents for structured layouts. Use it to group related information, form fields, or media in a visually bold, cohesive block.

> 🔗 **Original Source Code**: [`components/ui/card.tsx`](../ui/card.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/card.json"
```

### Component Source Code (`components/ui/card.tsx`)

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }
>(({ className, interactive, role = 'article', ...props }, ref) => (
  <div
    ref={ref}
    role={role}
    className={cn(
      'bg-card text-card-foreground border-3 border-foreground shadow-[4px_4px_0px_hsl(var(--shadow-color))] bk-interactive',
      interactive && 'cursor-pointer hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
      className
    )}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6 border-b-3 border-foreground', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-xl font-bold uppercase tracking-wide leading-none', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 border-t-3 border-foreground bg-muted/50', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

## Usage

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
```

## Examples

### With Form

Use cards to group form elements.

```tsx
<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Create Account</CardTitle>
    <CardDescription>Enter your details below</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="John Doe" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>
    </div>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Create Account</Button>
  </CardFooter>
</Card>
```

### Colored Header

Add background colors to headers for emphasis.

```tsx
<Card className="w-[350px]">
  <CardHeader className="bg-primary">
    <CardTitle>Featured</CardTitle>
  </CardHeader>
  <CardContent className="pt-6">
    <p>This card has a colored header.</p>
  </CardContent>
</Card>
```

