import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

type ProgressVariant = "smooth" | "stepped" | "marquee"

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: ProgressVariant
  indicatorClassName?: string
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, indicatorClassName, value, variant = "smooth", max = 100, ...props }, ref) => {
  const indeterminate = variant === "marquee"
  const safeMax = max > 0 ? max : 100
  const clampedValue = Math.max(0, Math.min(safeMax, value ?? 0))
  const percent = (clampedValue / safeMax) * 100
  const ariaValue = indeterminate || value == null ? null : clampedValue

  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={ariaValue}
      max={safeMax}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-xl border-3 border-border bg-muted shadow-xs",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 bg-primary transition-transform duration-500 ease-out",
          variant === "stepped" && "bk-progress-stepped",
          indeterminate && "bk-progress-marquee",
          indicatorClassName
        )}
        style={
          indeterminate ? undefined : { transform: `translateX(-${100 - percent}%)` }
        }
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
export type { ProgressVariant }
