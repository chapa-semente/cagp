import * as React from 'react'
import { cn } from '@/lib/utils'
import { FunnelChart as RechartsFC, Funnel, LabelList, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartEmpty } from './chart'

export interface FunnelChartData {
  name: string
  value: number
  fill?: string
}

export interface FunnelChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: FunnelChartData[]
  showLabels?: boolean
  showTooltip?: boolean
  animated?: boolean
  height?: number
  /** Accessible label for screen readers (default: "Funnel chart") */
  ariaLabel?: string
  emptyState?: React.ReactNode
}

const NEUBRUTALISM_COLORS = [
  'var(--primary)',
  'var(--secondary)',
  'var(--accent)',
  'var(--success)',
  'var(--info)',
  'var(--warning)',
]

const FunnelChart = React.forwardRef<HTMLDivElement, FunnelChartProps>(
  (
    {
      data,
      showLabels = true,
      showTooltip = true,
      animated = true,
      height = 300,
      ariaLabel = 'Funnel chart',
      emptyState,
      className,
      ...props
    },
    ref
  ) => {
    if (!data || data.length === 0) {
      return <ChartEmpty ref={ref} message={emptyState} className={className} {...props} />
    }

    const coloredData = data.map((d, i) => ({
      ...d,
      fill: d.fill || NEUBRUTALISM_COLORS[i % NEUBRUTALISM_COLORS.length],
    }))

    return (
      <div
        ref={ref}
        role="img"
        aria-label={ariaLabel}
        className={cn('w-full', className)}
        style={{ height }}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsFC>
            <Funnel
              dataKey="value"
              data={coloredData}
              isAnimationActive={animated}
              animationDuration={400}
              stroke="var(--foreground)"
              strokeWidth={3}
            >
              {showLabels && (
                <LabelList
                  position="right"
                  fill="var(--foreground)"
                  stroke="none"
                  dataKey="name"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 700 }}
                />
              )}
            </Funnel>
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  border: '3px solid var(--foreground)',
                  borderRadius: 0,
                  boxShadow: '4px 4px 0px var(--foreground)',
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                }}
                itemStyle={{ color: 'var(--foreground)' }}
                labelStyle={{ color: 'var(--foreground)' }}
                formatter={(value, name) => [`${Number(value ?? 0).toLocaleString()}`, String(name ?? '')]}
              />
            )}
          </RechartsFC>
        </ResponsiveContainer>
      </div>
    )
  }
)
FunnelChart.displayName = 'FunnelChart'

export { FunnelChart }
