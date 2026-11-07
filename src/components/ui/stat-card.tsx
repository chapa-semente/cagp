/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const statCardVariants = cva(
  "relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        compact: "[&_.stat-content]:p-4",
        large: "md:col-span-2",
      },
      colorScheme: {
        primary: "[&_.stat-icon]:bg-primary [&_.stat-icon]:text-primary-foreground [&_.stat-bg]:bg-primary",
        secondary: "[&_.stat-icon]:bg-secondary [&_.stat-icon]:text-secondary-foreground [&_.stat-bg]:bg-secondary",
        accent: "[&_.stat-icon]:bg-accent [&_.stat-icon]:text-accent-foreground [&_.stat-bg]:bg-accent",
        success: "[&_.stat-icon]:bg-[#15803D] [&_.stat-icon]:text-white [&_.stat-bg]:bg-[#15803D]",
        warning: "[&_.stat-icon]:bg-[#B45309] [&_.stat-icon]:text-white [&_.stat-bg]:bg-[#B45309]",
        info: "[&_.stat-icon]:bg-[#005A9C] [&_.stat-icon]:text-white [&_.stat-bg]:bg-[#005A9C]",
        teal: "[&_.stat-icon]:bg-[#266264] [&_.stat-icon]:text-white [&_.stat-bg]:bg-[#266264]",
        destructive: "[&_.stat-icon]:bg-destructive [&_.stat-icon]:text-destructive-foreground [&_.stat-bg]:bg-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
      colorScheme: "primary",
    },
  }
)

export interface StatCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "color">,
    VariantProps<typeof statCardVariants> {
  title: string
  value: string | number
  subtitle?: string
  change?: string
  trend?: "up" | "down" | "neutral"
  icon?: React.ReactNode
  progress?: { value: number; label?: string }
  comparison?: string
  footer?: React.ReactNode
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "info" | "teal" | "destructive"
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
      subtitle,
      change,
      trend = "neutral",
      icon,
      progress,
      comparison = "",
      footer,
      ...props
    },
    ref
  ) => {
    const resolvedColorScheme = colorScheme ?? color ?? "primary"

    const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus
    const trendColor =
      trend === "up"
        ? "text-[#15803D]"
        : trend === "down"
          ? "text-destructive"
          : "text-muted-foreground"

    return (
      <Card
        ref={ref}
        className={cn(statCardVariants({ variant, colorScheme: resolvedColorScheme }), className)}
        {...props}
      >
        {/* Decorative background shape */}
        <div className="stat-bg pointer-events-none absolute top-0 right-0 w-24 h-24 rounded-xl opacity-15 -translate-y-8 translate-x-8 rotate-12" />

        <CardContent className="stat-content p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-heading text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-1">
                {title}
              </p>
              <p className="font-heading text-2xl sm:text-3xl font-black tracking-tight text-foreground tabular-nums">
                {value}
              </p>
              {subtitle && (
                <p className="font-sans text-xs font-semibold text-muted-foreground mt-1">
                  {subtitle}
                </p>
              )}
              {change && (
                <div className={cn("flex items-center gap-1 mt-2", trendColor)}>
                  <TrendIcon className="h-4 w-4 shrink-0" />
                  <span className="font-mono text-xs font-bold">{change}</span>
                  {comparison && (
                    <span className="text-xs text-muted-foreground">{comparison}</span>
                  )}
                </div>
              )}
            </div>
            {icon && (
              <div className="stat-icon w-11 h-11 rounded-xl border-3 border-border flex items-center justify-center shadow-sm shrink-0">
                {icon}
              </div>
            )}
          </div>

          {progress && (
            <div className="mt-4 pt-3.5 border-t-2 border-border/20">
              <div className="flex items-center justify-between text-xs mb-1.5 font-sans">
                <span className="font-bold text-muted-foreground">
                  {progress.label || "Progresso"}
                </span>
                <span className="font-mono font-extrabold text-foreground tabular-nums">
                  {progress.value}%
                </span>
              </div>
              <Progress value={progress.value} className="h-3 border-2 border-border rounded-lg" />
            </div>
          )}

          {footer && <div className="mt-3 pt-3 border-t-2 border-border/20">{footer}</div>}
        </CardContent>
      </Card>
    )
  }
)
StatCard.displayName = "StatCard"

export { StatCard, statCardVariants }
