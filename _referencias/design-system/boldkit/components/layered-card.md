---
title: "Layered Card"
description: "Card component with stacked layers effect showing offset depth - a neubrutalist design pattern that creates a sense of physicality and dimension."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/layered-card"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# Layered Card

> Card component with stacked layers effect showing offset depth - a neubrutalist design pattern that creates a sense of physicality and dimension.

> 🔗 **Original Source Code**: [`components/ui/layered-card.tsx`](../ui/layered-card.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/layered-card.json"
```

### Component Source Code (`components/ui/layered-card.tsx`)

```tsx
/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const layeredCardVariants = cva('relative', {
  variants: {
    layers: {
      single: '',
      double: '',
      triple: '',
    },
    offset: {
      sm: '',
      default: '',
      lg: '',
    },
    layerColor: {
      default: '',
      primary: '',
      secondary: '',
      accent: '',
      muted: '',
    },
  },
  defaultVariants: {
    layers: 'double',
    offset: 'default',
    layerColor: 'default',
  },
})

export interface LayeredCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layeredCardVariants> {
  /** Make the card interactive with hover effects */
  interactive?: boolean
}

const LayeredCard = React.forwardRef<HTMLDivElement, LayeredCardProps>(
  ({ className, layers, offset, layerColor, interactive = false, children, ...props }, ref) => {
    // Calculate offsets based on size
    const offsetSizes = {
      sm: 6,
      default: 8,
      lg: 12,
    }
    const offsetPx = offsetSizes[offset || 'default']

    // Get layer count
    const layerCount = layers === 'single' ? 1 : layers === 'triple' ? 3 : 2

    // Get background color class for layers
    const colorClasses = {
      default: 'bg-muted',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
      muted: 'bg-muted',
    }
    const layerBg = colorClasses[layerColor || 'default']

    return (
      <div
        ref={ref}
        className={cn(layeredCardVariants({ layers, offset, layerColor }), className)}
        {...props}
      >
        {/* Layer 3 (furthest back) */}
        {layerCount >= 3 && (
          <div
            className={cn(
              'absolute inset-0 border-3 border-foreground',
              layerBg,
              'opacity-50'
            )}
            style={{
              transform: `translate(${offsetPx * 3}px, ${offsetPx * 3}px)`,
            }}
          />
        )}

        {/* Layer 2 */}
        {layerCount >= 2 && (
          <div
            className={cn(
              'absolute inset-0 border-3 border-foreground',
              layerBg,
              'opacity-70'
            )}
            style={{
              transform: `translate(${offsetPx * 2}px, ${offsetPx * 2}px)`,
            }}
          />
        )}

        {/* Layer 1 */}
        {layerCount >= 1 && (
          <div
            className={cn('absolute inset-0 border-3 border-foreground', layerBg)}
            style={{
              transform: `translate(${offsetPx}px, ${offsetPx}px)`,
            }}
          />
        )}

        {/* Main card (top layer) */}
        <div
          className={cn(
            'relative border-3 border-foreground bg-card text-card-foreground',
            interactive &&
              'cursor-pointer transition-transform duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px]'
          )}
        >
          {children}
        </div>
      </div>
    )
  }
)
LayeredCard.displayName = 'LayeredCard'

const LayeredCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col space-y-1.5 border-b-3 border-foreground bg-muted p-4',
      className
    )}
    {...props}
  />
))
LayeredCardHeader.displayName = 'LayeredCardHeader'

const LayeredCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-xl font-bold uppercase tracking-wide', className)}
    {...props}
  />
))
LayeredCardTitle.displayName = 'LayeredCardTitle'

const LayeredCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))
LayeredCardDescription.displayName = 'LayeredCardDescription'

const LayeredCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-4', className)} {...props} />
))
LayeredCardContent.displayName = 'LayeredCardContent'

const LayeredCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center border-t-3 border-foreground bg-muted p-4',
      className
    )}
    {...props}
  />
))
LayeredCardFooter.displayName = 'LayeredCardFooter'

export {
  LayeredCard,
  LayeredCardHeader,
  LayeredCardTitle,
  LayeredCardDescription,
  LayeredCardContent,
  LayeredCardFooter,
  layeredCardVariants,
}
```

## Usage

```tsx
import {
  LayeredCard,
  LayeredCardHeader,
  LayeredCardTitle,
  LayeredCardDescription,
  LayeredCardContent,
  LayeredCardFooter,
} from '@/components/ui/layered-card'

export default function Example() {
  return (
    <LayeredCard className="w-[350px]">
      <LayeredCardHeader>
        <LayeredCardTitle>Layered Card</LayeredCardTitle>
        <LayeredCardDescription>With stacked depth effect</LayeredCardDescription>
      </LayeredCardHeader>
      <LayeredCardContent>
        <p>This card has visible layers behind it for a 3D stacked paper effect.</p>
      </LayeredCardContent>
    </LayeredCard>
  )
}
```

## Examples

### Layer Count

Control how many layers appear behind the card.

```tsx
<LayeredCard layers="single">
  <LayeredCardContent>Single Layer</LayeredCardContent>
</LayeredCard>

<LayeredCard layers="double">
  <LayeredCardContent>Double Layer (Default)</LayeredCardContent>
</LayeredCard>

<LayeredCard layers="triple">
  <LayeredCardContent>Triple Layer</LayeredCardContent>
</LayeredCard>
```

### Offset Sizes

Adjust the offset distance between layers.

```tsx
<LayeredCard offset="sm">
  <LayeredCardContent>Small Offset</LayeredCardContent>
</LayeredCard>

<LayeredCard offset="default">
  <LayeredCardContent>Default Offset</LayeredCardContent>
</LayeredCard>

<LayeredCard offset="lg">
  <LayeredCardContent>Large Offset</LayeredCardContent>
</LayeredCard>
```

### Layer Colors

Customize the color of the background layers.

```tsx
<LayeredCard layerColor="primary">
  <LayeredCardContent>Primary Layers</LayeredCardContent>
</LayeredCard>

<LayeredCard layerColor="secondary">
  <LayeredCardContent>Secondary Layers</LayeredCardContent>
</LayeredCard>

<LayeredCard layerColor="accent">
  <LayeredCardContent>Accent Layers</LayeredCardContent>
</LayeredCard>
```

### Interactive

Make the card interactive with hover lift effect.

```tsx
<LayeredCard interactive>
  <LayeredCardHeader>
    <LayeredCardTitle>Hover Me</LayeredCardTitle>
  </LayeredCardHeader>
  <LayeredCardContent>
    <p>This card lifts up on hover!</p>
  </LayeredCardContent>
</LayeredCard>
```

### Full Example

Complete card with header, content, and footer.

```tsx
<LayeredCard layerColor="primary" className="w-[350px]">
  <LayeredCardHeader>
    <LayeredCardTitle>Subscription Plan</LayeredCardTitle>
    <LayeredCardDescription>Everything you need to get started</LayeredCardDescription>
  </LayeredCardHeader>
  <LayeredCardContent className="space-y-4">
    <div className="text-4xl font-black">$29<span className="text-lg font-normal">/mo</span></div>
    <ul className="space-y-2 text-sm">
      <li>✓ Unlimited projects</li>
      <li>✓ Priority support</li>
      <li>✓ Advanced analytics</li>
    </ul>
  </LayeredCardContent>
  <LayeredCardFooter>
    <Button className="w-full">Get Started</Button>
  </LayeredCardFooter>
</LayeredCard>
```

### Card Grid

Use layered cards in a grid layout for visual hierarchy.

```tsx
<div className="grid grid-cols-3 gap-8">
  <LayeredCard layerColor="primary">
    <LayeredCardContent className="text-center">
      <div className="text-3xl font-black">01</div>
      <p className="mt-2 font-bold">Design</p>
    </LayeredCardContent>
  </LayeredCard>
  <LayeredCard layerColor="secondary">
    <LayeredCardContent className="text-center">
      <div className="text-3xl font-black">02</div>
      <p className="mt-2 font-bold">Develop</p>
    </LayeredCardContent>
  </LayeredCard>
  <LayeredCard layerColor="accent">
    <LayeredCardContent className="text-center">
      <div className="text-3xl font-black">03</div>
      <p className="mt-2 font-bold">Deploy</p>
    </LayeredCardContent>
  </LayeredCard>
</div>
```

