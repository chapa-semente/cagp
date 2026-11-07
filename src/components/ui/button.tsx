import * as React from "react"
import { Slot as SlotPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  cn(
    "group/button font-heading font-extrabold uppercase tracking-wide inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl whitespace-nowrap select-none bk-interactive transition-all duration-150",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:border-destructive",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  ),
  {
    variants: {
      variant: {
        default:
          "border-3 border-border bg-primary text-primary-foreground shadow-md hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-primary-hover hover:shadow-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        secondary:
          "border-3 border-border bg-secondary text-secondary-foreground shadow-md hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-secondary-hover hover:shadow-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        accent:
          "border-3 border-border bg-accent text-accent-foreground shadow-md hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-accent-hover hover:shadow-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        destructive:
          "border-3 border-border bg-destructive text-destructive-foreground shadow-md hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-destructive/90 hover:shadow-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        outline:
          "border-3 border-border bg-card text-foreground shadow-md hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-muted hover:shadow-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        ghost:
          "border-3 border-transparent bg-transparent text-foreground shadow-none hover:bg-muted hover:border-border",
        link:
          "border-transparent bg-transparent text-primary shadow-none underline-offset-4 hover:underline",
        noShadow:
          "border-3 border-border bg-primary text-primary-foreground shadow-none hover:bg-primary-hover",
        reverse:
          "border-3 border-border bg-primary text-primary-foreground shadow-none hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-md",
      },
      size: {
        default: "min-h-[44px] px-5 py-2 text-sm",
        xs: "min-h-[32px] px-2.5 py-1 text-xs rounded-lg",
        sm: "min-h-[38px] px-3.5 py-1.5 text-xs rounded-lg",
        lg: "min-h-[48px] px-7 py-2.5 text-base",
        xl: "min-h-[54px] px-9 py-3 text-lg",
        icon: "size-11 p-2",
        "icon-xs": "size-8 p-1 rounded-lg",
        "icon-sm": "size-9 p-1.5 rounded-lg",
        "icon-lg": "size-12 p-3",
      },
      animation: {
        none: "",
        pulse: "animate-[brutal-pulse_2s_ease-in-out_infinite]",
        bounce: "animate-[brutal-bounce_0.5s_ease-in-out_infinite]",
        shake: "hover:animate-[brutal-shake_0.4s_ease-in-out]",
        wiggle: "hover:animate-[brutal-wiggle_0.3s_ease-in-out]",
        pop: "hover:animate-[brutal-pop_0.2s_ease-out] active:scale-95",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", animation = "none", asChild = false, ...props }, ref) => {
    const Comp = asChild ? SlotPrimitive.Slot : "button"
    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, animation, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
