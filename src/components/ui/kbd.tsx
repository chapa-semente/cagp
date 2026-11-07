import * as React from "react"
import { cn } from "@/lib/utils"

export interface KbdProps extends React.ComponentProps<"kbd"> {
  size?: "sm" | "md" | "lg"
}

function Kbd({ className, size = "md", ...props }: KbdProps) {
  const sizeClass = size === "sm" ? "h-4 min-w-4 text-[10px] px-1" : size === "lg" ? "h-6 min-w-6 text-sm px-2" : "h-5 min-w-5 text-xs px-1.5"
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex w-fit items-center justify-center gap-1 rounded border-2 bg-muted font-mono font-medium text-muted-foreground shadow-sm select-none in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*='size-'])]:size-3",
        sizeClass,
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
