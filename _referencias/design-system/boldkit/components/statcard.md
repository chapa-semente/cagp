---
title: "StatCard"
description: "Display key metrics and statistics with trend indicators and progress bars."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/statcard"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "lucide-react"
---

# StatCard

> Display key metrics and statistics with trend indicators and progress bars.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/statcard.json"
```

### Component Source Code (`components/ui/statcard.tsx`)

```tsx
/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const statCardVariants = cva(
  'relative overflow-hidden',
  {
    variants: {
      variant: {
        default: '',
        compact: '[&_.stat-content]:p-4',
        large: 'md:col-span-2',
      },
      colorScheme: {
        primary: '[&_.stat-icon]:bg-primary [&_.stat-bg]:bg-primary',
        secondary: '[&_.stat-icon]:bg-secondary [&_.stat-bg]:bg-secondary',
        accent: '[&_.stat-icon]:bg-accent [&_.stat-bg]:bg-accent',
        success: '[&_.stat-icon]:bg-success [&_.stat-bg]:bg-success',
        warning: '[&_.stat-icon]:bg-warning [&_.stat-bg]:bg-warning',
        info: '[&_.stat-icon]:bg-info [&_.stat-bg]:bg-info',
        destructive: '[&_.stat-icon]:bg-destructive [&_.stat-bg]:bg-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
      colorScheme: 'primary',
    },
  }
)

export interface StatCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'color'>,
    VariantProps<typeof statCardVariants> {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: React.ReactNode
  progress?: { value: number; label?: string }
  comparison?: string
  /** @deprecated Use colorScheme instead */
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'destructive'
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      variant,
      colorScheme,
      color,
      title,
      value,
      change,
      trend = 'neutral',
      icon,
      progress,
      comparison = 'vs last month',
      ...props
    },
    ref
  ) => {
    // Support legacy color prop
    const resolvedColorScheme = colorScheme ?? color ?? 'primary'

    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
    const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'

    return (
      <Card
        ref={ref}
        className={cn(statCardVariants({ variant, colorScheme: resolvedColorScheme }), className)}
        {...props}
      >
        {/* Decorative background element */}
        <div className="stat-bg absolute top-0 right-0 w-24 h-24 opacity-20 -translate-y-8 translate-x-8 rotate-12" />

        <CardContent className="stat-content p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-1">
                {title}
              </p>
              <p className="text-3xl font-black">{value}</p>
              {change && (
                <div className={cn('flex items-center gap-1 mt-2', trendColor)}>
                  <TrendIcon className="h-4 w-4" />
                  <span className="text-sm font-bold">{change}</span>
                  <span className="text-sm text-muted-foreground">{comparison}</span>
                </div>
              )}
            </div>
            {icon && (
              <div className="stat-icon w-12 h-12 border-3 border-foreground flex items-center justify-center shadow-[3px_3px_0px_hsl(var(--shadow-color))] text-foreground">
                {icon}
              </div>
            )}
          </div>

          {/* Progress section */}
          {progress && (
            <div className="mt-4 pt-4 border-t-2 border-foreground/10">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">
                  {progress.label || 'Progress'}
                </span>
                <span className="font-bold">{progress.value}%</span>
              </div>
              <Progress value={progress.value} className="h-3" />
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)
StatCard.displayName = 'StatCard'

export { StatCard, statCardVariants }
```

## Usage

```tsx
import { StatCard } from '@/components/ui/stat-card'
import { DollarSign } from 'lucide-react'

export default function Example() {
  return (
    <StatCard
      title="Total Revenue"
      value="$45,231"
      change="+20.1%"
      trend="up"
      icon={<DollarSign className="h-6 w-6" />}
      color="success"
    />
  )
}
```

## Examples

### Colors

Different color variants for various metric types.

```tsx
<StatCard title="Revenue" value="$45K" color="success" icon={<DollarSign />} />
<StatCard title="Users" value="2,350" color="info" icon={<Users />} />
<StatCard title="Activity" value="12,234" color="primary" icon={<Activity />} />
<StatCard title="Orders" value="432" color="warning" icon={<ShoppingCart />} />
```

### Trend Indicators

Show positive, negative, or neutral trends.

```tsx
<StatCard title="Growing" value="$45K" change="+20%" trend="up" />
<StatCard title="Declining" value="$32K" change="-5%" trend="down" />
<StatCard title="Stable" value="$28K" change="0%" trend="neutral" />
```

### With Progress Bar

Show progress toward a goal with the large variant.

```tsx
<StatCard
  title="Monthly Target"
  value="$45,231"
  change="+20.1%"
  trend="up"
  icon={<DollarSign />}
  color="success"
  variant="large"
  progress={{ value: 78, label: "Monthly Target" }}
/>
```

### Compact Variant

Smaller padding for dense layouts.

```tsx
<StatCard
  title="Revenue"
  value="$45K"
  variant="compact"
  color="primary"
/>
```

