---
title: "RadialBarChart"
description: "Circular progress bars with nested rings for displaying multiple metrics."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/radialbarchart"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "recharts"
---

# RadialBarChart

> Circular progress bars with nested rings for displaying multiple metrics.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/radialbarchart.json"
```

### Component Source Code (`components/ui/radialbarchart.tsx`)

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  RadialBarChart as RechartsRadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from 'recharts'
import { ChartContainer, type ChartContainerProps } from './container'
import { ChartEmpty } from './empty'
import { ChartTooltip, ChartTooltipContent } from './tooltip'
import { ChartLegend, ChartLegendContent } from './legend'
import type { ChartConfig } from './types'

export interface RadialBarChartData {
  name: string
  value: number
  fill?: string
}

export interface RadialBarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: RadialBarChartData[]
  config: ChartConfig
  variant?: 'default' | 'stacked' | 'nested'
  /** Container border/shadow style — `variant` here is the chart geometry. */
  containerVariant?: ChartContainerProps['variant']
  innerRadius?: string | number
  outerRadius?: string | number
  showLabel?: boolean
  showBackground?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  startAngle?: number
  endAngle?: number
  animated?: boolean
  maxValue?: number
  emptyState?: React.ReactNode
}

const RadialBarChartComponent = React.forwardRef<HTMLDivElement, RadialBarChartProps>(
  (
    {
      data,
      config,
      variant = 'default',
      containerVariant,
      innerRadius = '30%',
      outerRadius = '100%',
      showLabel = true,
      showBackground = true,
      showLegend = false,
      showTooltip = true,
      startAngle = 90,
      endAngle = -270,
      animated = true,
      maxValue,
      emptyState,
      className,
      ...props
    },
    ref
  ) => {
    // Calculate max value for the scale. Use reduce (not spread) to avoid a
    // RangeError on very large datasets, and floor at 1 so an all-negative or
    // empty dataset can't produce a non-positive domain.
    const calculatedMax =
      maxValue ?? ((data ?? []).reduce((m, d) => Math.max(m, d.value), 0) || 1)

    // Assign a chart color to each item that does not supply its own fill
    const chartData = React.useMemo(() => {
      return (data ?? []).map((item, index) => ({
        ...item,
        fill: item.fill || `hsl(var(--chart-${(index % 5) + 1}))`,
      }))
    }, [data])

    if (!data || data.length === 0) {
      return <ChartEmpty ref={ref} message={emptyState} className={className} {...props} />
    }

    return (
      <ChartContainer
        ref={ref}
        config={config}
        variant={containerVariant}
        className={cn('aspect-square max-h-[300px]', className)}
        {...props}
      >
        <RechartsRadialBarChart
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          data={chartData}
          startAngle={startAngle}
          endAngle={endAngle}
          barSize={variant === 'nested' ? 15 : 20}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, calculatedMax]}
            angleAxisId={0}
            tick={false}
            axisLine={false}
          />
          {showTooltip && (
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="name" />}
            />
          )}
          <RadialBar
            dataKey="value"
            background={showBackground ? { fill: 'hsl(var(--muted))' } : undefined}
            cornerRadius={0}
            isAnimationActive={animated}
            animationDuration={400}
            stackId={variant === 'stacked' ? 'stack' : undefined}
            label={
              showLabel
                ? {
                    position: 'insideStart',
                    fill: 'hsl(var(--foreground))',
                    fontWeight: 700,
                    fontSize: 12,
                  }
                : false
            }
          />
          {showLegend && (
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              verticalAlign="bottom"
            />
          )}
        </RechartsRadialBarChart>
      </ChartContainer>
    )
  }
)
RadialBarChartComponent.displayName = 'RadialBarChart'

export { RadialBarChartComponent as RadialBarChart }
```

## Usage

```tsx
import { RadialBarChart } from '@/components/ui/chart'

const data = [
  { name: 'Progress', value: 75, fill: 'hsl(var(--primary))' },
  { name: 'Goals', value: 60, fill: 'hsl(var(--secondary))' },
  { name: 'Tasks', value: 45, fill: 'hsl(var(--accent))' },
]

const config = {
  progress: { label: 'Progress', color: 'hsl(var(--primary))' },
  goals: { label: 'Goals', color: 'hsl(var(--secondary))' },
  tasks: { label: 'Tasks', color: 'hsl(var(--accent))' },
}

export default function Example() {
  return <RadialBarChart data={data} config={config} />
}
```

## Examples

### Single Progress

Display a single progress metric as a radial bar.

```tsx
<RadialBarChart
  data={[{ name: 'Completion', value: 72, fill: 'hsl(var(--primary))' }]}
  config={config}
  maxValue={100}
/>
```

### With Background Track

Show a background track to indicate the full range.

```tsx
<RadialBarChart data={data} config={config} showBackground />
```

### With Labels

Show value labels inside the bars.

```tsx
<RadialBarChart data={data} config={config} showLabel />
```

### With Legend

Add a legend to identify each ring.

```tsx
<RadialBarChart data={data} config={config} showLegend />
```

### Custom Angles

Customize the start and end angles for different arc shapes.

```tsx
<RadialBarChart data={data} config={config} startAngle={180} endAngle={0} />
```

