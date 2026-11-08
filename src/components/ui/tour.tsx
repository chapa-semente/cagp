/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { bounceSpring, tactileSpring } from '@/lib/motion'
import { Button } from '@/components/ui/button'

// Typed here so the dev-only guards compile without @types/node (Vite's
// default tsconfig has none). `declare` emits nothing: bundlers still
// replace the literal process.env.NODE_ENV.
declare const process: { env: { NODE_ENV?: string } }

export interface TourStep {
  target: string | HTMLElement | React.RefObject<HTMLElement>
  title: string
  description: string
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'center'
  spotlightPadding?: number
  content?: React.ReactNode
}

export interface TourProps {
  steps: TourStep[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  currentStep?: number
  onStepChange?: (index: number) => void
  onComplete?: () => void
  onSkip?: () => void
  showSkipButton?: boolean
  showProgress?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
}

interface TourContextValue {
  currentStep: number
  totalSteps: number
  nextStep: () => void
  prevStep: () => void
  goToStep: (index: number) => void
  close: () => void
  skip: () => void
  isPlaying: boolean
  togglePlay: () => void
  progress: number
  pause: () => void
  resume: () => void
  autoPlay: boolean
}

const TourContext = React.createContext<TourContextValue | null>(null)

function useTour() {
  const context = React.useContext(TourContext)
  if (!context) {
    throw new Error('useTour must be used within a <Tour />')
  }
  return context
}

// Helper to check if an element is currently rendered and visible in layout
function isElementVisible(el: HTMLElement): boolean {
  return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0
}

// Get element from target (supports comma-separated selectors with responsive visibility fallback)
function getTargetElement(
  target: string | HTMLElement | React.RefObject<HTMLElement>
): HTMLElement | null {
  if (typeof target === 'string') {
    if (target.includes(',')) {
      const candidates = Array.from(document.querySelectorAll<HTMLElement>(target))
      const visible = candidates.find((el) => isElementVisible(el))
      return visible || candidates[0] || null
    }
    return document.querySelector(target)
  }
  if (target instanceof HTMLElement) {
    return target
  }
  return target.current
}

// Calculate popover position
function calculatePosition(
  targetRect: DOMRect,
  popoverRect: DOMRect,
  placement: TourStep['placement'] = 'bottom',
  padding: number = 8
): { top: number; left: number; actualPlacement: TourStep['placement'] } {
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  let top = 0
  let left = 0
  let actualPlacement = placement

  if (placement === 'center') {
    return {
      top: viewport.height / 2 - popoverRect.height / 2,
      left: viewport.width / 2 - popoverRect.width / 2,
      actualPlacement: 'center',
    }
  }

  // Calculate base positions
  switch (placement) {
    case 'top':
      top = targetRect.top - popoverRect.height - padding
      left = targetRect.left + targetRect.width / 2 - popoverRect.width / 2
      break
    case 'bottom':
      top = targetRect.bottom + padding
      left = targetRect.left + targetRect.width / 2 - popoverRect.width / 2
      break
    case 'left':
      top = targetRect.top + targetRect.height / 2 - popoverRect.height / 2
      left = targetRect.left - popoverRect.width - padding
      break
    case 'right':
      top = targetRect.top + targetRect.height / 2 - popoverRect.height / 2
      left = targetRect.right + padding
      break
  }

  // Check if popover fits, flip if necessary
  if (placement === 'top' && top < 0) {
    top = targetRect.bottom + padding
    actualPlacement = 'bottom'
  } else if (placement === 'bottom' && top + popoverRect.height > viewport.height) {
    top = targetRect.top - popoverRect.height - padding
    actualPlacement = 'top'
  } else if (placement === 'left' && left < 0) {
    left = targetRect.right + padding
    actualPlacement = 'right'
  } else if (placement === 'right' && left + popoverRect.width > viewport.width) {
    left = targetRect.left - popoverRect.width - padding
    actualPlacement = 'left'
  }

  // Keep within viewport bounds
  left = Math.max(padding, Math.min(left, viewport.width - popoverRect.width - padding))
  top = Math.max(padding, Math.min(top, viewport.height - popoverRect.height - padding))

  return { top, left, actualPlacement }
}

// Tour Overlay
interface TourOverlayProps {
  targetRect: DOMRect | null
  spotlightPadding: number
}

function TourOverlay({ targetRect, spotlightPadding }: TourOverlayProps) {
  if (!targetRect) {
    // Center placement - full overlay
    return (
      <div className="fixed inset-0 z-[9998] bg-black/70" />
    )
  }

  const spotlightRect = {
    top: targetRect.top - spotlightPadding,
    left: targetRect.left - spotlightPadding,
    width: targetRect.width + spotlightPadding * 2,
    height: targetRect.height + spotlightPadding * 2,
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[9998]"
        style={{
          background: `
            linear-gradient(to right, rgba(0,0,0,0.65) ${spotlightRect.left}px, transparent ${spotlightRect.left}px, transparent ${spotlightRect.left + spotlightRect.width}px, rgba(0,0,0,0.65) ${spotlightRect.left + spotlightRect.width}px),
            linear-gradient(to bottom, rgba(0,0,0,0.65) ${spotlightRect.top}px, transparent ${spotlightRect.top}px, transparent ${spotlightRect.top + spotlightRect.height}px, rgba(0,0,0,0.65) ${spotlightRect.top + spotlightRect.height}px)
          `,
          backgroundBlendMode: 'multiply',
        }}
      />
      {/* Moldura Neon Tátil de Highlight Pulsante com Transição Elástica (tactileSpring) */}
      <motion.div
        initial={false}
        animate={{
          top: spotlightRect.top,
          left: spotlightRect.left,
          width: spotlightRect.width,
          height: spotlightRect.height,
        }}
        transition={tactileSpring}
        className="fixed z-[9998] pointer-events-none rounded-xl border-3 border-[#FF8811] shadow-[0_0_0_3px_#16181d,0_0_30px_rgba(255,136,17,0.85)]"
      >
        <div className="absolute -top-4 left-2 px-2 py-0.5 rounded-md bg-[#FF8811] text-[#16181d] font-mono font-bold text-[10px] uppercase tracking-wider shadow-[2px_2px_0_0_#16181d] flex items-center gap-1.5 border-2 border-[#16181d]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16181d] animate-ping" />
          <span>DESTAQUE SEMENTE</span>
        </div>
      </motion.div>
    </>
  )
}

// Tour Popover
interface TourPopoverProps {
  step: TourStep
  targetRect: DOMRect | null
  showSkipButton: boolean
  showProgress: boolean
}

function TourPopover({
  step,
  targetRect,
  showSkipButton,
  showProgress,
}: TourPopoverProps) {
  const {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    close,
    skip,
    isPlaying,
    togglePlay,
    progress,
    pause,
    resume,
    autoPlay,
  } = useTour()
  const popoverRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ top: 0, left: 0 })
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )
  const titleId = React.useId()
  const descriptionId = React.useId()

  const isFirst = currentStep === 0
  const isLast = currentStep === totalSteps - 1

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  React.useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    popoverRef.current?.focus()

    const focusableIn = (root: HTMLElement) =>
      [
        ...root.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
        ),
      ].filter((el) => el.offsetParent !== null || el === document.activeElement)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab') return

      const root = popoverRef.current
      if (!root) return
      const focusable = focusableIn(root)
      if (!focusable.length) {
        e.preventDefault()
        root.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (!root.contains(active) || active === root) {
        e.preventDefault()
        ;(e.shiftKey ? last : first).focus()
      } else if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      previouslyFocused?.focus?.()
    }
  }, [close])

  // Calculate position (desktop only - on mobile it docks as a bottom sheet)
  React.useEffect(() => {
    if (!popoverRef.current || isMobile) return

    const popoverRect = popoverRef.current.getBoundingClientRect()

    if (step.placement === 'center' || !targetRect) {
      setPosition({
        top: Math.max(16, window.innerHeight / 2 - popoverRect.height / 2),
        left: Math.max(16, window.innerWidth / 2 - popoverRect.width / 2),
      })
    } else {
      const pos = calculatePosition(
        targetRect,
        popoverRect,
        step.placement,
        20
      )
      setPosition({ top: pos.top, left: pos.left })
    }
  }, [step, targetRect, isMobile])

  const stepPct = Math.round(((currentStep + 1) / Math.max(1, totalSteps)) * 100)
  const stepNumStr = String(currentStep + 1).padStart(2, '0')
  const totalNumStr = String(totalSteps).padStart(2, '0')

  return (
    <div
      ref={popoverRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      tabIndex={-1}
      onMouseEnter={pause}
      onMouseLeave={resume}
      className={cn(
        'fixed z-[9999] focus:outline-none',
        'inset-x-3 bottom-3 max-w-[calc(100vw-1.5rem)] sm:bottom-auto sm:inset-x-auto sm:w-[400px]'
      )}
      style={isMobile ? undefined : { top: position.top, left: position.left }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`tour-step-${currentStep}`}
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -8 }}
          transition={bounceSpring}
          className="relative border-3 border-[#16181d] bg-white rounded-2xl shadow-[6px_6px_0_0_#16181d] flex flex-col max-h-[44vh] sm:max-h-none overflow-hidden"
        >
          {/* Faixa Superior Editorial Semente */}
          <div className="bg-[#5B2A86] text-white px-3.5 py-2 border-b-3 border-[#16181d] flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#FF8811] text-[#16181d] font-mono font-bold text-[10px] uppercase tracking-wider border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d]">
                PASSO {stepNumStr}/{totalNumStr}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/90 hidden xs:inline">
                Parada {currentStep + 1} de {totalSteps}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {autoPlay && (
                <button
                  type="button"
                  onClick={togglePlay}
                  title={isPlaying ? 'Pausar avanço automático' : 'Retomar avanço automático'}
                  className="border-2 border-[#16181d] bg-white text-[#16181d] px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider shadow-[2px_2px_0_0_#16181d] hover:bg-[#f4f0ea] transition cursor-pointer"
                >
                  {isPlaying ? '⏸ Pausar' : '▶ Auto'}
                </button>
              )}
              <button
                type="button"
                onClick={close}
                aria-label="Fechar tour"
                className="border-2 border-[#16181d] bg-white text-[#16181d] p-1 rounded-md cursor-pointer shadow-[2px_2px_0_0_#16181d] hover:bg-[#FF8811] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition"
              >
                <X className="h-3.5 w-3.5 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Barra de Progresso Listrada Mecânica */}
          {showProgress && (
            <div className="w-full bg-[#f4f0ea] h-2.5 border-b-2 border-[#16181d] overflow-hidden shrink-0">
              <div
                className="h-full bg-[#FF8811] transition-all duration-300 ease-out"
                style={{
                  width: `${autoPlay && isPlaying ? progress : stepPct}%`,
                  backgroundImage:
                    'repeating-linear-gradient(45deg, rgba(22,24,29,0.18) 0, rgba(22,24,29,0.18) 6px, transparent 6px, transparent 12px)',
                }}
              />
            </div>
          )}

          {/* Corpo do Passo */}
          <div className="p-3.5 sm:p-4 space-y-2 flex-1 overflow-y-auto no-scrollbar">
            <h3
              id={titleId}
              className="text-sm sm:text-base font-heading font-black uppercase tracking-tight text-[#16181d] leading-snug m-0"
            >
              {step.title}
            </h3>
            <p
              id={descriptionId}
              className="text-xs text-[#16181d]/85 font-sans leading-relaxed m-0"
            >
              {step.description}
            </p>
            {step.content}
          </div>

          {/* Indicadores de Passo & Navegação Tátil (min-h-[44px]) */}
          <div className="px-3.5 sm:px-4 py-2.5 bg-[#f4f0ea] border-t-3 border-[#16181d] flex items-center justify-between gap-2 shrink-0">
            <div>
              {showSkipButton && !isLast ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={skip}
                  className="text-[#16181d]/80 hover:text-[#16181d] font-mono font-bold text-xs px-2.5 min-h-[44px]"
                >
                  Pular Tour
                </Button>
              ) : (
                <span className="font-mono text-[10px] font-bold uppercase text-[#5B2A86] px-1">
                  ✦ Chapa Semente
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!isFirst && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevStep}
                  className="text-xs px-3 min-h-[44px] border-3 border-[#16181d] bg-white font-heading font-black uppercase"
                >
                  ← Anterior
                </Button>
              )}
              <Button
                size="sm"
                onClick={nextStep}
                className="text-xs px-4 min-h-[44px] border-3 border-[#16181d] bg-[#FF8811] hover:bg-[#e67300] text-[#16181d] font-heading font-black uppercase shadow-[3px_3px_0_0_#16181d]"
              >
                {isLast ? 'Concluir Tour ✓' : 'Próximo →'}
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Main Tour Component
const Tour = React.forwardRef<HTMLDivElement, TourProps>(
  (
    {
      steps,
      open: controlledOpen,
      onOpenChange,
      currentStep: controlledStep,
      onStepChange,
      onComplete,
      onSkip,
      showSkipButton = true,
      showProgress = true,
      autoPlay = false,
      autoPlayInterval = 8000,
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
    const [uncontrolledStep, setUncontrolledStep] = React.useState(0)
    const isControlledStep = controlledStep !== undefined
    const currentStep = isControlledStep ? controlledStep : uncontrolledStep

    const updateStep = React.useCallback(
      (newStepOrFn: number | ((prev: number) => number)) => {
        const next = typeof newStepOrFn === 'function' ? newStepOrFn(currentStep) : newStepOrFn
        if (!isControlledStep) {
          setUncontrolledStep(next)
        }
        onStepChange?.(next)
      },
      [currentStep, isControlledStep, onStepChange]
    )

    const [targetRect, setTargetRect] = React.useState<DOMRect | null>(null)
    const [isPlaying, setIsPlaying] = React.useState(autoPlay)
    const [isHovered, setIsHovered] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const elapsedRef = React.useRef(0)

    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : uncontrolledOpen

    const setOpen = React.useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setUncontrolledOpen(value)
        }
        onOpenChange?.(value)
      },
      [isControlled, onOpenChange]
    )

    const currentStepData = steps[currentStep]

    // Reset progress and timer on step change
    React.useEffect(() => {
      elapsedRef.current = 0
      setProgress(0)
    }, [currentStep, open])

    // Auto-advance loop
    React.useEffect(() => {
      if (!open || !autoPlay || !isPlaying || isHovered) return

      const intervalMs = 50
      const timer = setInterval(() => {
        elapsedRef.current += intervalMs
        const pct = Math.min(100, (elapsedRef.current / autoPlayInterval) * 100)
        setProgress(pct)

        if (elapsedRef.current >= autoPlayInterval) {
          elapsedRef.current = 0
          setProgress(0)
          if (currentStep < steps.length - 1) {
            updateStep(currentStep + 1)
          } else {
            setOpen(false)
            onComplete?.()
          }
        }
      }, intervalMs)

      return () => clearInterval(timer)
    }, [open, autoPlay, isPlaying, isHovered, currentStep, steps.length, autoPlayInterval, updateStep, setOpen, onComplete])

    // Update target rect when step changes and scroll smartly into view
    React.useEffect(() => {
      if (!open || !currentStepData) return

      // Measure helper
      const measure = () => {
        const element = getTargetElement(currentStepData.target)
        if (element) {
          setTargetRect(element.getBoundingClientRect())
        } else {
          setTargetRect(null)
        }
      }

      const el = getTargetElement(currentStepData.target)
      if (el) {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
          // On mobile, the Bottom Sheet occupies up to 38vh at the bottom.
          // Therefore, scroll the target element to the upper third (Y ~ 80px),
          // completely away from the bottom sheet!
          const rect = el.getBoundingClientRect()
          const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
          const targetY = currentScrollY + rect.top - 80
          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: 'smooth',
          })
        } else {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      }
      measure()

      let frame = 0
      const onViewportChange = () => {
        if (frame) return
        frame = requestAnimationFrame(() => {
          frame = 0
          measure()
        })
      }

      window.addEventListener('resize', onViewportChange)
      window.addEventListener('scroll', onViewportChange, true)

      return () => {
        if (frame) cancelAnimationFrame(frame)
        window.removeEventListener('resize', onViewportChange)
        window.removeEventListener('scroll', onViewportChange, true)
      }
    }, [open, currentStep, currentStepData])

    // Reset to the first step when the tour closes if uncontrolled.
    const [prevOpen, setPrevOpen] = React.useState(open)
    if (prevOpen !== open) {
      setPrevOpen(open)
      if (!open && !isControlledStep) setUncontrolledStep(0)
    }

    const nextStep = React.useCallback(() => {
      elapsedRef.current = 0
      setProgress(0)
      if (currentStep < steps.length - 1) {
        updateStep(currentStep + 1)
      } else {
        setOpen(false)
        onComplete?.()
      }
    }, [currentStep, steps.length, updateStep, setOpen, onComplete])

    const prevStep = React.useCallback(() => {
      elapsedRef.current = 0
      setProgress(0)
      if (currentStep > 0) {
        updateStep(currentStep - 1)
      }
    }, [currentStep, updateStep])

    const goToStep = React.useCallback((index: number) => {
      elapsedRef.current = 0
      setProgress(0)
      if (index >= 0 && index < steps.length) {
        updateStep(index)
      }
    }, [steps.length, updateStep])

    const close = React.useCallback(() => {
      setOpen(false)
    }, [setOpen])

    const skip = React.useCallback(() => {
      setOpen(false)
      onSkip?.()
    }, [setOpen, onSkip])

    const togglePlay = React.useCallback(() => {
      setIsPlaying((p) => !p)
    }, [])

    const pause = React.useCallback(() => {
      setIsHovered(true)
    }, [])

    const resume = React.useCallback(() => {
      setIsHovered(false)
    }, [])

    const contextValue = React.useMemo<TourContextValue>(
      () => ({
        currentStep,
        totalSteps: steps.length,
        nextStep,
        prevStep,
        goToStep,
        close,
        skip,
        isPlaying,
        togglePlay,
        progress,
        pause,
        resume,
        autoPlay,
      }),
      [
        currentStep,
        steps.length,
        nextStep,
        prevStep,
        goToStep,
        close,
        skip,
        isPlaying,
        togglePlay,
        progress,
        pause,
        resume,
        autoPlay,
      ]
    )

    return (
      <>
        {/* Stable ref anchor — always mounted so ref is never null */}
        <div ref={ref} style={{ display: 'none' }} />
        {open && currentStepData && createPortal(
          <TourContext.Provider value={contextValue}>
            <TourOverlay
              targetRect={targetRect}
              spotlightPadding={currentStepData.spotlightPadding ?? 8}
            />
            <TourPopover
              step={currentStepData}
              targetRect={targetRect}
              showSkipButton={showSkipButton}
              showProgress={showProgress}
            />
          </TourContext.Provider>,
          document.body
        )}
      </>
    )
  }
)
Tour.displayName = 'Tour'

export { Tour, useTour }
