import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl border-3 border-border bg-card py-(--card-spacing) text-sm text-card-foreground shadow-md [--card-spacing:--spacing(4)] md:[--card-spacing:--spacing(5)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3.5)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        primary: "bg-primary text-primary-foreground border-3 rounded-2xl shadow-xl",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground border-3 rounded-2xl shadow-xl",
        subtle: "bg-muted text-foreground",
      },
      interactive: {
        true: "cursor-pointer transition-[transform,box-shadow] duration-(--duration-press) ease-(--ease-spring-snappy) hover:-translate-x-px hover:-translate-y-px hover:shadow-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
    },
  }
)

export interface CardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {
  size?: "default" | "sm"
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, size = "default", variant = "default", interactive = false, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card"
      data-size={size}
      className={cn(cardVariants({ variant, interactive }), className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:border-b-2 [.border-b]:border-border [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLHeadingElement, React.ComponentProps<"h3">>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      data-slot="card-title"
      className={cn("font-heading text-lg leading-snug font-bold text-balance group-data-[size=sm]/card:text-base",
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-description"
      className={cn("font-sans text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

const CardAction = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
)
CardAction.displayName = "CardAction"

const CardContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn("px-(--card-spacing) font-sans", className)}
      {...props}
    />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t-2 border-border bg-background p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
