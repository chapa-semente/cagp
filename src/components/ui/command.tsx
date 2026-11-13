import * as React from 'react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { Command as CommandPrimitive } from 'cmdk'
import { Search } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { Dialog, DialogPortal, DialogOverlay } from '@/components/ui/dialog'

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden bg-popover text-popover-foreground',
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

interface CommandDialogProps extends DialogPrimitive.DialogProps {
  /** Accessible title for the dialog (visually hidden). */
  title?: string
  /** Accessible description for the dialog (visually hidden). */
  description?: string
  /** Custom filter passed to cmdk (default: fuzzy). */
  filter?: React.ComponentPropsWithoutRef<typeof CommandPrimitive>['filter']
}

/**
 * Com o teclado aberto no celular, a folha da busca ocupa só a parte da tela que sobra acima dele.
 * `position: fixed` mede a tela inteira (o teclado cobre a metade de baixo e os resultados somem);
 * o visualViewport dá a área visível de verdade, no Android e no iOS. As medidas vão para duas
 * variáveis CSS lidas por `.cagp-busca-folha` (global.css) e saem quando a busca fecha.
 */
function useAreaVisivel(aberta: boolean | undefined) {
  React.useEffect(() => {
    const vv = window.visualViewport
    if (!aberta || !vv) return
    const raiz = document.documentElement
    const limpar = () => {
      raiz.style.removeProperty('--cagp-vv-altura')
      raiz.style.removeProperty('--cagp-vv-topo')
    }
    const medir = () => {
      // Com a página ampliada por pinça a área visível encolhe sem teclado nenhum: aí vale a tela cheia.
      if (vv.scale > 1.01) return limpar()
      raiz.style.setProperty('--cagp-vv-altura', `${Math.round(vv.height)}px`)
      raiz.style.setProperty('--cagp-vv-topo', `${Math.round(vv.offsetTop)}px`)
    }
    medir()
    vv.addEventListener('resize', medir)
    vv.addEventListener('scroll', medir)
    return () => {
      vv.removeEventListener('resize', medir)
      vv.removeEventListener('scroll', medir)
      limpar()
    }
  }, [aberta])
}

const CommandDialog = ({
  children,
  title = 'Command Menu',
  description = 'Search for a command to run.',
  filter,
  ...props
}: CommandDialogProps) => {
  useAreaVisivel(props.open)
  return (
    <Dialog {...props}>
      <DialogPortal>
        {/* Acima da barra inferior (z 1000) e no mesmo andar das folhas. */}
        <DialogOverlay className="z-[1080]" />
        <DialogPrimitive.Content
          className="cagp-busca-folha fixed inset-x-0 z-[1090] flex flex-col overflow-hidden rounded-t-2xl border-[3px] border-b-0 border-foreground bg-background shadow-[0_-6px_0_0_var(--color-foreground)] data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom md:inset-x-auto md:bottom-auto md:left-1/2 md:top-[16%] md:w-full md:max-w-xl md:-translate-x-1/2 md:rounded-xl md:border-b-[3px] md:shadow-xl md:data-[state=open]:slide-in-from-bottom-6 md:data-[state=open]:fade-in-0 md:data-[state=closed]:slide-out-to-bottom-6 md:data-[state=closed]:fade-out-0"
        >
          <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">{description}</DialogPrimitive.Description>
          <Command filter={filter} className="flex min-h-0 flex-1 flex-col [&_[cmdk-list]]:min-h-0 [&_[cmdk-list]]:flex-1 [&_[cmdk-list]]:max-h-none md:[&_[cmdk-list]]:max-h-[min(60svh,460px)] [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12">
            {children}
          </Command>
          <DialogPrimitive.Close className="md:hidden shrink-0 min-h-12 border-t-[3px] border-foreground bg-muted font-heading text-sm font-bold uppercase tracking-[0.03em] text-foreground cursor-pointer pb-[env(safe-area-inset-bottom)] active:bg-background focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary">
            Fechar a busca
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b-3 border-foreground px-4 bg-background" cmdk-input-wrapper="">
    <Search className="mr-3 h-5 w-5 shrink-0 text-muted-foreground stroke-[2.5]" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-12 w-full bg-transparent py-3 text-base placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      style={{ outline: 'none', boxShadow: 'none' }}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-[400px] overflow-y-auto overflow-x-hidden p-2', className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-muted-foreground',
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 h-px bg-foreground', className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer gap-2 select-none items-center px-3 py-2.5 text-sm font-medium outline-none transition-colors data-[disabled=true]:pointer-events-none data-[selected=true]:bg-muted data-[selected=true]:border-l-3 data-[selected=true]:border-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-background',
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = 'CommandShortcut'

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
