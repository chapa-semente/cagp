import * as React from "react"
import { cn } from "@/lib/utils"

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  direction?: "left" | "right"
  speed?: "slow" | "normal" | "fast"
  pauseOnHover?: boolean
  bordered?: boolean
  repeat?: number
}

const speedClasses = {
  slow: "animate-marquee-slow",
  normal: "animate-marquee",
  fast: "animate-marquee-fast",
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      children,
      direction = "left",
      speed = "normal",
      pauseOnHover = true,
      bordered = true,
      repeat = 4,
      ...props
    },
    ref
  ) => {
    const animationClass = speedClasses[speed]
    const animationDirection = direction === "right" ? "reverse" : undefined

    return (
      <div
        ref={ref}
        className={cn(
          "flex overflow-hidden select-none",
          bordered && "rounded-xl border-3 border-border bg-card shadow-md",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "marquee-content flex shrink-0 items-center gap-6 py-2.5",
            animationClass,
            pauseOnHover &&
              "hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
          )}
          style={{ animationDirection }}
        >
          {/* Só a 1ª cópia é lida pelo leitor de tela; as repetições existem só para o loop visual. */}
          {Array.from({ length: repeat }).map((_, i) =>
            i === 0 ? (
              <React.Fragment key={i}>{children}</React.Fragment>
            ) : (
              <span key={i} className="contents" aria-hidden="true">
                {children}
              </span>
            )
          )}
        </div>
        <div
          className={cn(
            "marquee-content flex shrink-0 items-center gap-6 py-2.5",
            animationClass,
            pauseOnHover &&
              "hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
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
Marquee.displayName = "Marquee"

export interface MarqueeItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

const MarqueeItem = React.forwardRef<HTMLSpanElement, MarqueeItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 whitespace-nowrap px-3 font-heading text-sm font-extrabold uppercase tracking-wide",
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)
MarqueeItem.displayName = "MarqueeItem"

export interface MarqueeSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode
}

const MarqueeSeparator = React.forwardRef<HTMLSpanElement, MarqueeSeparatorProps>(
  ({ className, children = "", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("font-heading text-base font-black text-secondary", className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)
MarqueeSeparator.displayName = "MarqueeSeparator"

export { Marquee, MarqueeItem, MarqueeSeparator }
