---
title: "DonutChart"
description: "Pie chart with center hole for displaying KPIs and totals."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/donutchart"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "recharts"
---

# DonutChart

> Pie chart with center hole for displaying KPIs and totals.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/donutchart.json"
```

### Component Source Code (`components/ui/donutchart.tsx`)

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'
import { Pie, PieChart, Cell, Label } from 'recharts'
import { ChartContainer, type ChartContainerProps } from './container'
import { ChartEmpty } from './empty'
import { ChartTooltip, ChartTooltipContent } from './tooltip'
import type { ChartConfig } from './types'

export interface DonutChartData {
  name: string
  value: number
  fill?: string
}

export interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: DonutChartData[]
  config: ChartConfig
  innerRadius?: string | number
  outerRadius?: string | number
  centerContent?: React.ReactNode
  showLabels?: 'none' | 'inside' | 'outside'
  variant?: 'default' | 'separated'
  /** Container border/shadow style — `variant` here is the chart geometry. */
  containerVariant?: ChartContainerProps['variant']
  showTooltip?: boolean
  animated?: boolean
  emptyState?: React.ReactNode
}

const DonutChart = React.forwardRef<HTMLDivElement, DonutChartProps>(
  (
    {
      data,
      config,
      innerRadius = '60%',
      outerRadius = '80%',
      centerContent,
      showLabels = 'none',
      variant = 'default',
      containerVariant,
      showTooltip = true,
      animated = true,
      emptyState,
      className,
      ...props
    },
    ref
  ) => {
    if (!data || data.length === 0) {
      return <ChartEmpty ref={ref} message={emptyState} className={className} {...props} />
    }

    const paddingAngle = variant === 'separated' ? 4 : 0

    return (
      <ChartContainer
        ref={ref}
        config={config}
        variant={containerVariant}
        className={cn('aspect-square max-h-[300px]', className)}
        {...props}
      >
        <PieChart>
          {showTooltip && (
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
          )}
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={paddingAngle}
            strokeWidth={3}
            stroke="hsl(var(--foreground))"
            isAnimationActive={animated}
            animationDuration={400}
            label={
              showLabels === 'outside'
                ? ({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''}: ${((percent ?? 0) * 100).toFixed(0)}%`
                : showLabels === 'inside'
                ? ({ percent }: { percent?: number }) => `${((percent ?? 0) * 100).toFixed(0)}%`
                : false
            }
            labelLine={showLabels === 'outside'}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill || `hsl(var(--chart-${(index % 5) + 1}))`}
              />
            ))}
            {centerContent && (
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    const pieView = viewBox as { cx: number; cy: number; innerRadius?: number; outerRadius?: number }
                    const ir = pieView.innerRadius ?? (typeof innerRadius === 'number' ? innerRadius : 60)
                    const fwHalf = Math.max(40, ir * 0.85)
                    const fhHalf = Math.max(25, ir * 0.55)
                    return (
                      <foreignObject
                        x={(pieView.cx || 0) - fwHalf}
                        y={(pieView.cy || 0) - fhHalf}
                        width={fwHalf * 2}
                        height={fhHalf * 2}
                      >
                        <div className="flex h-full w-full items-center justify-center">
                          {centerContent}
                        </div>
                      </foreignObject>
                    )
                  }
                  return null
                }}
              />
            )}
          </Pie>
        </PieChart>
      </ChartContainer>
    )
  }
)
DonutChart.displayName = 'DonutChart'

// Helper component for common center content pattern
export interface DonutChartCenterProps {
  value: string | number
  label?: string
  className?: string
}

const DonutChartCenter = React.forwardRef<HTMLDivElement, DonutChartCenterProps>(
  ({ value, label, className }, ref) => {
    return (
      <div ref={ref} className={cn('text-center', className)}>
        <div className="text-2xl font-black">{value}</div>
        {label && (
          <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            {label}
          </div>
        )}
      </div>
    )
  }
)
DonutChartCenter.displayName = 'DonutChartCenter'

export { DonutChart, DonutChartCenter }
```

## Usage

```tsx
import { DonutChart, DonutChartCenter } from '@/components/ui/chart'

const data = [
  { name: 'Chrome', value: 275, fill: 'hsl(var(--primary))' },
  { name: 'Safari', value: 200, fill: 'hsl(var(--secondary))' },
  { name: 'Firefox', value: 187, fill: 'hsl(var(--accent))' },
]

const config = {
  chrome: { label: 'Chrome', color: 'hsl(var(--primary))' },
  safari: { label: 'Safari', color: 'hsl(var(--secondary))' },
  firefox: { label: 'Firefox', color: 'hsl(var(--accent))' },
}

export default function Example() {
  return (
    <DonutChart
      data={data}
      config={config}
      centerContent={<DonutChartCenter value="662" label="Total" />}
    />
  )
}
```

## Examples

### Center Content

Display a KPI or label in the center of the donut.

```tsx
<DonutChart
  data={data}
  config={config}
  centerContent={<DonutChartCenter value="925" label="Visitors" />}
/>
```

### Separated Variant

Add gaps between segments for a more distinct look.

```tsx
<DonutChart data={data} config={config} variant="separated" />
```

### Labels

Show labels inside or outside the chart.

```tsx
<DonutChart data={data} config={config} showLabels="inside" />
<DonutChart data={data} config={config} showLabels="outside" />
```

### Custom Radius

Adjust inner and outer radius for different donut thickness.

```tsx
<DonutChart data={data} config={config} innerRadius="40%" outerRadius="90%" />
```

