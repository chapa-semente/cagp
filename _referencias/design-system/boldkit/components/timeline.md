---
title: "Timeline"
description: "A composable timeline component for displaying activity feeds, order tracking, version history, and more."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/timeline"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# Timeline

> A composable timeline component for displaying activity feeds, order tracking, version history, and more.

> 🔗 **Original Source Code**: [`components/ui/timeline.tsx`](../ui/timeline.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/timeline.json"
```

### Component Source Code (`components/ui/timeline.tsx`)

```tsx
/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Timeline Context
interface TimelineContextValue {
  orientation: 'vertical' | 'horizontal'
}

const TimelineContext = React.createContext<TimelineContextValue>({
  orientation: 'vertical',
})

function useTimeline() {
  return React.useContext(TimelineContext)
}

// Timeline Root
export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal'
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ orientation = 'vertical', className, children, ...props }, ref) => {
    return (
      <TimelineContext.Provider value={{ orientation }}>
        <div
          ref={ref}
          className={cn(
            'relative',
            orientation === 'vertical' ? 'flex flex-col' : 'flex flex-row',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TimelineContext.Provider>
    )
  }
)
Timeline.displayName = 'Timeline'

// Timeline Item
const timelineItemVariants = cva('relative flex')

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: 'completed' | 'current' | 'upcoming'
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ status, className, children, ...props }, ref) => {
    const { orientation } = useTimeline()

    return (
      <div
        ref={ref}
        data-status={status}
        className={cn(
          timelineItemVariants(),
          orientation === 'vertical' ? 'flex-row gap-4' : 'flex-col gap-4 items-center',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TimelineItem.displayName = 'TimelineItem'

// Timeline Dot
const timelineDotVariants = cva(
  'relative z-10 flex items-center justify-center border-3 border-foreground transition duration-200',
  {
    variants: {
      status: {
        completed:
          'bg-success shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        current:
          'bg-primary shadow-[4px_4px_0px_hsl(var(--shadow-color))] scale-110',
        upcoming: 'bg-muted',
      },
      size: {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
      },
    },
    defaultVariants: {
      status: 'upcoming',
      size: 'md',
    },
  }
)

export interface TimelineDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineDotVariants> {}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ status, size, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(timelineDotVariants({ status, size }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TimelineDot.displayName = 'TimelineDot'

// Timeline Connector
const timelineConnectorVariants = cva('transition duration-200', {
  variants: {
    status: {
      completed: 'bg-foreground',
      current: 'bg-foreground',
      upcoming: 'border-dashed border-2 border-foreground/50 bg-transparent',
    },
    orientation: {
      vertical: 'w-[3px] min-h-8 ml-[14px]',
      horizontal: 'h-[3px] min-w-8 mt-[14px]',
    },
  },
  defaultVariants: {
    status: 'upcoming',
    orientation: 'vertical',
  },
})

export interface TimelineConnectorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof timelineConnectorVariants>, 'orientation'> {}

const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(
  ({ status, className, ...props }, ref) => {
    const { orientation } = useTimeline()

    return (
      <div
        ref={ref}
        className={cn(
          timelineConnectorVariants({ status, orientation }),
          className
        )}
        {...props}
      />
    )
  }
)
TimelineConnector.displayName = 'TimelineConnector'

// Timeline Content
const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useTimeline()

  return (
    <div
      ref={ref}
      className={cn(
        'flex-1',
        orientation === 'vertical' ? 'pb-8' : 'pr-8',
        className
      )}
      {...props}
    />
  )
})
TimelineContent.displayName = 'TimelineContent'

// Timeline Header
const TimelineHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  )
})
TimelineHeader.displayName = 'TimelineHeader'

// Timeline Title
const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        'text-base font-bold uppercase tracking-wide',
        className
      )}
      {...props}
    />
  )
})
TimelineTitle.displayName = 'TimelineTitle'

// Timeline Description
const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground mt-1', className)}
      {...props}
    />
  )
})
TimelineDescription.displayName = 'TimelineDescription'

// Timeline Time
const TimelineTime = React.forwardRef<
  HTMLTimeElement,
  React.TimeHTMLAttributes<HTMLTimeElement>
>(({ className, ...props }, ref) => {
  return (
    <time
      ref={ref}
      className={cn(
        'text-xs font-medium text-muted-foreground',
        className
      )}
      {...props}
    />
  )
})
TimelineTime.displayName = 'TimelineTime'

// Timeline Card - convenience wrapper
const TimelineCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'border-3 border-foreground bg-card p-4',
        'shadow-[4px_4px_0px_hsl(var(--shadow-color))]',
        className
      )}
      {...props}
    />
  )
})
TimelineCard.displayName = 'TimelineCard'

export {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  TimelineCard,
  timelineItemVariants,
  timelineDotVariants,
  timelineConnectorVariants,
}
```

## Usage

```tsx
import {
  Timeline, TimelineItem, TimelineDot, TimelineConnector,
  TimelineContent, TimelineTitle, TimelineDescription
} from '@/components/ui/timeline'

export default function Example() {
  return (
    <Timeline>
      <TimelineItem status="completed">
        <TimelineDot status="completed" />
        <TimelineConnector status="completed" />
        <TimelineContent>
          <TimelineTitle>Order Placed</TimelineTitle>
          <TimelineDescription>Your order has been placed</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      {/* More items... */}
    </Timeline>
  )
}
```

## Examples

### Order Tracking

Track order progress with status indicators and icons.

```tsx
<Timeline>
  <TimelineItem status="completed">
    <TimelineDot status="completed"><Check /></TimelineDot>
    <TimelineConnector status="completed" />
    <TimelineContent>
      <TimelineTime>March 1, 2024</TimelineTime>
      <TimelineTitle>Order Placed</TimelineTitle>
    </TimelineContent>
  </TimelineItem>
  <TimelineItem status="completed">
    <TimelineDot status="completed"><Package /></TimelineDot>
    <TimelineConnector status="completed" />
    <TimelineContent>
      <TimelineTime>March 2, 2024</TimelineTime>
      <TimelineTitle>Shipped</TimelineTitle>
    </TimelineContent>
  </TimelineItem>
  <TimelineItem status="current">
    <TimelineDot status="current"><Truck /></TimelineDot>
    <TimelineConnector status="upcoming" />
    <TimelineContent>
      <TimelineTime>March 3, 2024</TimelineTime>
      <TimelineTitle>Out for Delivery</TimelineTitle>
    </TimelineContent>
  </TimelineItem>
  <TimelineItem status="upcoming">
    <TimelineDot status="upcoming"><Home /></TimelineDot>
    <TimelineContent>
      <TimelineTitle>Delivered</TimelineTitle>
    </TimelineContent>
  </TimelineItem>
</Timeline>
```

### With Cards

Use TimelineCard for richer content.

```tsx
<Timeline>
  <TimelineItem status="completed">
    <TimelineDot status="completed" />
    <TimelineConnector status="completed" />
    <TimelineContent>
      <TimelineCard>
        <TimelineHeader>
          <TimelineTitle>Version 2.0 Released</TimelineTitle>
          <TimelineTime>2 days ago</TimelineTime>
        </TimelineHeader>
        <TimelineDescription>
          Major update with new features and improvements...
        </TimelineDescription>
      </TimelineCard>
    </TimelineContent>
  </TimelineItem>
</Timeline>
```

### Dot Sizes

Timeline dots come in multiple sizes.

```tsx
<TimelineDot size="sm" />
<TimelineDot size="md" />
<TimelineDot size="lg" />
```

### Simple Activity Feed

A simple activity feed without connectors.

```tsx
<Timeline>
  {activities.map((activity) => (
    <TimelineItem key={activity.id}>
      <TimelineDot />
      <TimelineContent>
        <TimelineTitle>{activity.title}</TimelineTitle>
        <TimelineTime>{activity.time}</TimelineTime>
      </TimelineContent>
    </TimelineItem>
  ))}
</Timeline>
```

