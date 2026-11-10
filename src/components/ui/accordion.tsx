import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "rounded-xl border-3 border-[#1F1F1F] bg-card shadow-[3px_3px_0_0_#1F1F1F] data-[state=open]:shadow-[6px_6px_0_0_#1F1F1F] overflow-hidden mb-3 last:mb-0 transition-all duration-150",
      className
    )}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 min-h-[48px] items-center justify-between gap-3 bg-card py-3.5 px-4 font-heading text-base font-bold text-left text-balance text-foreground transition-colors duration-150 hover:bg-muted cursor-pointer [&[data-state=open]]:bg-primary-tint",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="cagp-expand-chevron h-5 w-5 shrink-0 stroke-[3]" aria-hidden="true" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="cagp-accordion-content font-sans text-sm border-t-3 border-[#1F1F1F] bg-card text-foreground"
    {...props}
  >
    <div className={cn("p-4 sm:p-5 leading-relaxed", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
