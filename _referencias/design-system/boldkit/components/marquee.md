---
title: "Marquee"
description: "Auto-scrolling text ticker with neubrutalism styling - a common brutalist design element for announcements and emphasis."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/marquee"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# Marquee

> Auto-scrolling text ticker with neubrutalism styling - a common brutalist design element for announcements and emphasis.

> 🔗 **Original Source Code**: [`components/ui/marquee.tsx`](../ui/marquee.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/marquee.json"
```

### Component Source Code (`components/ui/marquee.tsx`)

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content to display in the marquee */
  children: React.ReactNode
  /** Direction of the marquee animation */
  direction?: 'left' | 'right'
  /** Speed of the animation: 'slow' | 'normal' | 'fast' */
  speed?: 'slow' | 'normal' | 'fast'
  /** Pause animation on hover */
  pauseOnHover?: boolean
  /** Show neubrutalism border styling */
  bordered?: boolean
  /** Number of times to repeat the content (for seamless loop) */
  repeat?: number
}

const speedClasses = {
  slow: 'animate-marquee-slow',
  normal: 'animate-marquee',
  fast: 'animate-marquee-fast',
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      children,
      direction = 'left',
      speed = 'normal',
      pauseOnHover = true,
      bordered = true,
      repeat = 4,
      ...props
    },
    ref
  ) => {
    // Use the speed-based class for both directions so `speed` is always
    // honored; flip to a right-scroll via animation-direction (the dedicated
    // *-reverse speed classes were never defined in the CSS).
    const animationClass = speedClasses[speed]
    const animationDirection = direction === 'right' ? 'reverse' : undefined

    return (
      <div
        ref={ref}
        className={cn(
          'flex overflow-hidden',
          bordered && 'border-3 border-foreground bg-background',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'marquee-content flex shrink-0 items-center gap-8 py-3',
            animationClass,
            pauseOnHover && 'hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]'
          )}
          style={{ animationDirection }}
        >
          {Array.from({ length: repeat }).map((_, i) => (
            <React.Fragment key={i}>{children}</React.Fragment>
          ))}
        </div>
        {/* Visual duplicate. `inert` as well as aria-hidden, or anything
            focusable inside it is a tab stop within an aria-hidden subtree
            (axe `aria-hidden-focus`). */}
        <div
          className={cn(
            'marquee-content flex shrink-0 items-center gap-8 py-3',
            animationClass,
            pauseOnHover && 'hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]'
          )}
          style={{ animationDirection }}
          aria-hidden="true"
          inert
        >
          {Array.from({ length: repeat }).map((_, i) => (
            <React.Fragment key={i}>{children}</React.Fragment>
          ))}
        </div>
      </div>
    )
  }
)
Marquee.displayName = 'Marquee'

interface MarqueeItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

const MarqueeItem = React.forwardRef<HTMLSpanElement, MarqueeItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 whitespace-nowrap px-4 text-lg font-bold uppercase tracking-wide',
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)
MarqueeItem.displayName = 'MarqueeItem'

interface MarqueeSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Separator character or element */
  children?: React.ReactNode
}

const MarqueeSeparator = React.forwardRef<HTMLSpanElement, MarqueeSeparatorProps>(
  ({ className, children = '/', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('text-2xl font-black text-muted-foreground', className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)
MarqueeSeparator.displayName = 'MarqueeSeparator'

export { Marquee, MarqueeItem, MarqueeSeparator }
```

## Usage

```tsx
import { Marquee, MarqueeItem, MarqueeSeparator } from '@/components/ui/marquee'

export default function Example() {
  return (
    <Marquee>
      <MarqueeItem>Welcome to BoldKit</MarqueeItem>
      <MarqueeSeparator />
      <MarqueeItem>Neubrutalism UI</MarqueeItem>
      <MarqueeSeparator />
      <MarqueeItem>Bold & Beautiful</MarqueeItem>
      <MarqueeSeparator />
    </Marquee>
  )
}
```

## Examples

### With Icons

Add icons to marquee items for visual interest.

```tsx
<Marquee>
  <MarqueeItem>
    <Star className="h-5 w-5" /> Featured
  </MarqueeItem>
  <MarqueeSeparator>•</MarqueeSeparator>
  <MarqueeItem>
    <Zap className="h-5 w-5" /> Fast
  </MarqueeItem>
  <MarqueeSeparator>•</MarqueeSeparator>
  <MarqueeItem>
    <Heart className="h-5 w-5" /> Beautiful
  </MarqueeItem>
  <MarqueeSeparator>•</MarqueeSeparator>
</Marquee>
```

### Speed Variants

Control the scrolling speed with slow, normal, or fast options.

```tsx
<Marquee speed="slow">
  <MarqueeItem>Slow Scrolling</MarqueeItem>
  <MarqueeSeparator />
</Marquee>

<Marquee speed="normal">
  <MarqueeItem>Normal Speed</MarqueeItem>
  <MarqueeSeparator />
</Marquee>

<Marquee speed="fast">
  <MarqueeItem>Fast Scrolling</MarqueeItem>
  <MarqueeSeparator />
</Marquee>
```

### Reverse Direction

Scroll content in the opposite direction.

```tsx
<Marquee direction="right">
  <MarqueeItem>
    <Rocket className="h-5 w-5" /> Scrolling Right
  </MarqueeItem>
  <MarqueeSeparator />
</Marquee>
```

### Without Border

Remove the border for a cleaner look.

```tsx
<Marquee bordered={false} className="bg-primary text-primary-foreground">
  <MarqueeItem>Sale Ends Soon</MarqueeItem>
  <MarqueeSeparator className="text-primary-foreground/50">★</MarqueeSeparator>
  <MarqueeItem>50% Off Everything</MarqueeItem>
  <MarqueeSeparator className="text-primary-foreground/50">★</MarqueeSeparator>
</Marquee>
```

### Announcement Banner

Use as an announcement banner with accent colors.

```tsx
<Marquee bordered={false} className="bg-accent text-accent-foreground border-y-3 border-foreground">
  <MarqueeItem>New Feature Released</MarqueeItem>
  <MarqueeSeparator>→</MarqueeSeparator>
  <MarqueeItem>Check out the docs</MarqueeItem>
  <MarqueeSeparator>→</MarqueeSeparator>
</Marquee>
```

