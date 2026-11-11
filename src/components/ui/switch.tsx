import * as React from 'react'
import { Switch as SwitchPrimitives } from 'radix-ui'
import { cn } from '@/lib/utils'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  // Kit Semente: a semente rola para a direita e brota quando liga (DESIGN.md › kit Semente).
  <SwitchPrimitives.Root
    className={cn(
      'sk-switch-trilho sk-switch-radix peer cursor-pointer p-0 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
    ref={ref}
  >
    <svg className="sk-switch-folha" viewBox="-46 -110 72 118" aria-hidden="true">
      <use href="#sg-folha" />
    </svg>
    <SwitchPrimitives.Thumb className="sk-switch-botao pointer-events-none block" />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
