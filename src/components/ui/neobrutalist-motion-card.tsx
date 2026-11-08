import * as React from "react"
import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "motion/react"
import { cn } from "@/lib/utils"

export interface NeobrutalistMotionCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  title?: string
  badge?: string
  description?: string
  interactive?: boolean
  children?: React.ReactNode
}

export const NeobrutalistMotionCard = React.forwardRef<HTMLDivElement, NeobrutalistMotionCardProps>(
  (
    {
      title,
      badge,
      description,
      interactive = true,
      className,
      children,
      onClick,
      onKeyDown,
      tabIndex,
      role,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e)
      if (onClick && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault()
        onClick(e as unknown as React.MouseEvent<HTMLDivElement>)
      }
    }

    const motionVariants: Variants = {
      initial: {
        x: 0,
        y: 0,
        boxShadow: "4px 4px 0px 0px currentColor",
      },
      hover: {
        x: -2,
        y: -2,
        boxShadow: "6px 6px 0px 0px currentColor",
        transition: { type: "spring", stiffness: 400, damping: 25 },
      },
      tap: {
        x: 2,
        y: 2,
        boxShadow: "1px 1px 0px 0px currentColor",
        transition: { type: "spring", stiffness: 500, damping: 30 },
      },
    }

    return (
      <motion.div
        ref={ref}
        role={role ?? (onClick ? "button" : undefined)}
        tabIndex={tabIndex ?? (onClick ? 0 : undefined)}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        initial="initial"
        whileHover={interactive && !shouldReduceMotion ? "hover" : undefined}
        whileTap={interactive && !shouldReduceMotion ? "tap" : undefined}
        variants={motionVariants}
        className={cn(
          "relative flex flex-col gap-3 rounded-xl border-3 border-foreground bg-card p-5 text-card-foreground select-none",
          interactive && "cursor-pointer",
          className
        )}
        {...props}
      >
        {(badge || title) && (
          <div className="flex items-center justify-between gap-2">
            {title && (
              <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">
                {title}
              </h3>
            )}
            {badge && (
              <span className="inline-flex items-center rounded-md border-2 border-foreground bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground uppercase tracking-wider shadow-[2px_2px_0px_0px_currentColor]">
                {badge}
              </span>
            )}
          </div>
        )}

        {description && (
          <p className="text-sm font-medium text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}

        {children}
      </motion.div>
    )
  }
)

NeobrutalistMotionCard.displayName = "NeobrutalistMotionCard"
