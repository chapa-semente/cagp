/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { format, subDays, startOfMonth, endOfMonth, subMonths, isSameDay } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

// Typed here so the dev-only guards compile without @types/node (Vite's
// default tsconfig has none). `declare` emits nothing: bundlers still
// replace the literal process.env.NODE_ENV.
declare const process: { env: { NODE_ENV?: string } }

export interface DateRangePickerPreset {
  label: string
  value: DateRange
}

export interface DateRangePickerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Button>, 'onChange' | 'value' | 'defaultValue'> {
  value?: DateRange
  defaultValue?: DateRange
  onChange?: (range: DateRange | undefined) => void
  numberOfMonths?: 1 | 2
  presets?: DateRangePickerPreset[]
  showPresets?: boolean
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  placeholder?: string
  align?: 'start' | 'center' | 'end'
  className?: string
}

const getDefaultPresets = (): DateRangePickerPreset[] => {
  const today = new Date()
  const sixMonthsAgo = subMonths(today, 6)
  const twelveMonthsAgo = subMonths(today, 12)
  const startOfYear = new Date(today.getFullYear(), 0, 1)

  return [
    {
      label: 'Ano Letivo Atual',
      value: { from: startOfYear, to: today },
    },
    {
      label: 'Exercício Integral (12 meses)',
      value: { from: twelveMonthsAgo, to: today },
    },
    {
      label: 'Último Semestre (6 meses)',
      value: { from: sixMonthsAgo, to: today },
    },
    {
      label: 'Mês Vigente',
      value: { from: startOfMonth(today), to: today },
    },
    {
      label: 'Últimos 30 dias',
      value: { from: subDays(today, 29), to: today },
    },
  ]
}

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  (allProps, ref) => {
    // Controlled-ness is decided by whether the `value` PROP IS PRESENT,
    // latched on first render — not by whether it is defined. `undefined` is a
    // legal controlled value for an optional range, so the ordinary
    // `useState<DateRange>()` + `value` pattern used to start uncontrolled and
    // silently flip on the first pick.
    const isControlled = React.useRef('value' in allProps).current

    const {
      value: controlledValue,
      defaultValue,
      onChange,
      numberOfMonths = 2,
      presets,
      showPresets = true,
      minDate,
      maxDate,
      disabled = false,
      placeholder = 'Selecione o intervalo de datas...',
      align = 'start',
      className,
      ...props
    } = allProps

    if (process.env.NODE_ENV !== 'production') {
      if (isControlled !== ('value' in allProps)) {
        console.warn(
          '[DateRangePicker] Switching between controlled and uncontrolled is not supported. ' +
            'Pass `defaultValue` for uncontrolled use.'
        )
      }
    }

    const [open, setOpen] = React.useState(false)
    const [uncontrolledValue, setUncontrolledValue] = React.useState<DateRange | undefined>(defaultValue)

    const selectedRange = isControlled ? controlledValue : uncontrolledValue

    const resolvedPresets = presets ?? getDefaultPresets()

    const handleSelect = (range: DateRange | undefined) => {
      if (!isControlled) {
        setUncontrolledValue(range)
      }
      onChange?.(range)
    }

    const handlePresetClick = (preset: DateRangePickerPreset) => {
      handleSelect(preset.value)
    }

    const isPresetSelected = (preset: DateRangePickerPreset) => {
      if (!selectedRange?.from || !selectedRange?.to) return false
      if (!preset.value.from || !preset.value.to) return false

      return (
        isSameDay(selectedRange.from, preset.value.from) &&
        isSameDay(selectedRange.to, preset.value.to)
      )
    }

    const formatDateRange = (range: DateRange) => {
      if (!range.from) return placeholder
      if (!range.to) return format(range.from, 'dd/MM/yyyy')
      return `${format(range.from, 'dd/MM/yyyy')} a ${format(range.to, 'dd/MM/yyyy')}`
    }

    // Use single month on mobile
    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 640)
      }
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const effectiveNumberOfMonths = isMobile ? 1 : numberOfMonths

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            disabled={disabled}
            {...props}
            className={cn(
              'w-full justify-start text-left font-normal',
              !selectedRange && 'text-muted-foreground',
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            <span className="truncate">
              {selectedRange ? formatDateRange(selectedRange) : placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            'w-auto p-0 overflow-hidden',
            'shadow-xl',
            'ease-out animate-in fade-in-0 zoom-in-95 duration-200',
            'max-w-[calc(100vw-2rem)]',
            'max-h-[calc(100vh-4rem)] overflow-auto'
          )}
          align={align}
          sideOffset={4}
        >
          <div className={cn(
            'flex',
            // Stack vertically on mobile
            isMobile && showPresets ? 'flex-col' : 'flex-row'
          )}>
            {/* Presets sidebar/header */}
            {showPresets && resolvedPresets.length > 0 && (
              <div className={cn(
                'p-3 bg-muted',
                isMobile
                  ? 'border-b-3 border-foreground'
                  : 'min-w-[160px] border-r-3 border-foreground'
              )}>
                <p className="mb-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Períodos Rápidos
                </p>
                <div className={cn(
                  isMobile
                    ? 'flex flex-wrap gap-2'
                    : 'space-y-2'
                )}>
                  {resolvedPresets.map((preset) => {
                    const selected = isPresetSelected(preset)
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handlePresetClick(preset)}
                        className={cn(
                          'text-left text-xs font-bold border-3 border-foreground bg-background transition duration-150',
                          isMobile
                            ? 'px-2 py-1 text-xs shadow-sm'
                            : 'w-full px-3 py-2 shadow',
                          // press-in on hover/focus
                          isMobile
                            ? 'hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none'
                            : 'hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none focus-visible:translate-x-[3px] focus-visible:translate-y-[3px] focus-visible:shadow-none',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
                          selected && 'bg-accent text-accent-foreground shadow-none ' + (isMobile ? 'translate-x-[2px] translate-y-[2px]' : 'translate-x-[3px] translate-y-[3px]')
                        )}
                      >
                        {preset.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Calendar(s) */}
            <div className="p-3">
              <Calendar
                mode="range"
                defaultMonth={selectedRange?.from}
                selected={selectedRange}
                onSelect={handleSelect}
                numberOfMonths={effectiveNumberOfMonths}
                disabled={(date) => {
                  if (minDate && date < minDate) return true
                  if (maxDate && date > maxDate) return true
                  return false
                }}
                className="border-0 shadow-none"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)
DateRangePicker.displayName = 'DateRangePicker'

export { DateRangePicker, getDefaultPresets }
export type { DateRange }
