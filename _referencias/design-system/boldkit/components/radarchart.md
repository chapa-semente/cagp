---
title: "RadarChart"
description: "Multi-variable comparison chart for skills, metrics, and feature comparisons."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/radarchart"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
  - "recharts"
---

# RadarChart

> Multi-variable comparison chart for skills, metrics, and feature comparisons.

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/radarchart.json"
```

### Component Source Code (`components/ui/radarchart.tsx`)

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'
import { ChartContainer, type ChartContainerProps } from './container'
import { ChartEmpty } from './empty'
import { ChartTooltip, ChartTooltipContent } from './tooltip'
import { ChartLegend, ChartLegendContent } from './legend'
import type { ChartConfig } from './types'

export interface RadarChartData {
  subject: string
  [key: string]: number | string
}

export interface RadarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: RadarChartData[]
  dataKeys: string[]
  config: ChartConfig
  variant?: 'default' | 'filled' | 'outlined'
  /** Container border/shadow style — `variant` here is the chart geometry. */
  containerVariant?: ChartContainerProps['variant']
  showLegend?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  fillOpacity?: number
  animated?: boolean
  emptyState?: React.ReactNode
}

const RadarChartComponent = React.forwardRef<HTMLDivElement, RadarChartProps>(
  (
    {
      data,
      dataKeys,
      config,
      variant = 'default',
      containerVariant,
      showLegend = true,
      showGrid = true,
      showTooltip = true,
      fillOpacity = 0.6,
      animated = true,
      emptyState,
      className,
      ...props
    },
    ref
  ) => {
    if (!data || data.length === 0 || !dataKeys || dataKeys.length === 0) {
      return <ChartEmpty ref={ref} message={emptyState} className={className} {...props} />
    }

    const getRadarProps = (index: number, key: string) => {
      const baseColor = config[key]?.color || `hsl(var(--chart-${(index % 5) + 1}))`

      switch (variant) {
        case 'outlined':
          return {
            fill: 'transparent',
            fillOpacity: 0,
            stroke: baseColor,
            strokeWidth: 3,
          }
        case 'filled':
          return {
            fill: baseColor,
            fillOpacity: fillOpacity,
            stroke: 'hsl(var(--foreground))',
            strokeWidth: 3,
          }
        default:
          return {
            fill: baseColor,
            fillOpacity: fillOpacity,
            stroke: 'hsl(var(--foreground))',
            strokeWidth: 3,
          }
      }
    }

    return (
      <ChartContainer
        ref={ref}
        config={config}
        variant={containerVariant}
        className={cn('aspect-square max-h-[300px]', className)}
        {...props}
      >
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          {showGrid && (
            <PolarGrid
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
              strokeDasharray="none"
            />
          )}
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: 'hsl(var(--foreground))',
              fontWeight: 700,
              fontSize: 12,
            }}
            stroke="hsl(var(--foreground))"
            strokeWidth={2}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 'dataMax']}
            tick={{
              fill: 'hsl(var(--muted-foreground))',
              fontSize: 10,
            }}
            axisLine={false}
          />
          {showTooltip && (
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
          )}
          {dataKeys.map((key, index) => (
            <Radar
              key={key}
              name={typeof config[key]?.label === 'string' ? config[key].label : key}
              dataKey={key}
              {...getRadarProps(index, key)}
              isAnimationActive={animated}
              animationDuration={400}
              dot={{
                r: 4,
                fill: config[key]?.color || `hsl(var(--chart-${(index % 5) + 1}))`,
                stroke: 'hsl(var(--foreground))',
                strokeWidth: 2,
              }}
            />
          ))}
          {showLegend && (
            <ChartLegend content={<ChartLegendContent />} />
          )}
        </RechartsRadarChart>
      </ChartContainer>
    )
  }
)
RadarChartComponent.displayName = 'RadarChart'

export { RadarChartComponent as RadarChart }
```

## Usage

```tsx
import { RadarChart } from '@/components/ui/chart'

const data = [
  { subject: 'Speed', player1: 80, player2: 65 },
  { subject: 'Strength', player1: 70, player2: 85 },
  { subject: 'Accuracy', player1: 90, player2: 75 },
  { subject: 'Stamina', player1: 85, player2: 70 },
  { subject: 'Agility', player1: 75, player2: 90 },
]

const config = {
  player1: { label: 'Player 1', color: 'hsl(var(--primary))' },
  player2: { label: 'Player 2', color: 'hsl(var(--secondary))' },
}

export default function Example() {
  return (
    <RadarChart
      data={data}
      dataKeys={['player1', 'player2']}
      config={config}
    />
  )
}
```

## Examples

### Single Dataset

Display a single set of metrics.

```tsx
<RadarChart
  data={singleData}
  dataKeys={['value']}
  config={config}
/>
```

### Variants

Different visual styles for the radar area.

```tsx
<RadarChart data={data} dataKeys={keys} variant="default" />
<RadarChart data={data} dataKeys={keys} variant="filled" />
<RadarChart data={data} dataKeys={keys} variant="outlined" />
```

### Comparison

Compare multiple datasets on the same radar.

```tsx
<RadarChart
  data={comparisonData}
  dataKeys={['player1', 'player2']}
  config={config}
  showLegend
/>
```

### Without Grid

Hide the polar grid for a cleaner look.

```tsx
<RadarChart data={data} dataKeys={keys} showGrid={false} />
```

### Fill Opacity

Adjust the opacity of the filled area.

```tsx
<RadarChart data={data} dataKeys={keys} fillOpacity={0.3} />
<RadarChart data={data} dataKeys={keys} fillOpacity={0.8} />
```

