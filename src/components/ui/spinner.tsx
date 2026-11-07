import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.ComponentProps<"svg"> {
  size?: "sm" | "md" | "lg"
}

function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  const sizeClass = size === "sm" ? "size-3.5" : size === "lg" ? "size-6" : "size-4"
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("animate-spin", sizeClass, className)}
      {...props}
    />
  )
}

export { Spinner }
