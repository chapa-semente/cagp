 
import { motion } from 'motion/react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { Check, X } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export interface ComparisonRow {
  feature: string
  values: (string | boolean)[]
}

export interface ComparisonTableProps {
  title?: string
  subtitle?: string
  columns: string[]
  rows: ComparisonRow[]
  /** Zero-based index of the emphasized column. */
  highlightColumn?: number
  className?: string
}

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    // The tick/cross IS the data. lucide marks its icons aria-hidden, so without
    // the sr-only text a screen reader reads these cells as empty.
    return value ? (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border-2 border-border bg-success shadow-sm">
        <Check className="h-4 w-4 text-white stroke-[3]" />
        <span className="sr-only">Incluído</span>
      </span>
    ) : (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border-2 border-border bg-muted">
        <X className="h-4 w-4 text-muted-foreground stroke-[3]" />
        <span className="sr-only">Não incluído</span>
      </span>
    )
  }
  return <span className="text-sm font-bold">{value}</span>
}

export function ComparisonTable({
  title = 'Comparativo Semente',
  subtitle,
  columns,
  rows,
  highlightColumn,
  className,
}: ComparisonTableProps) {
  return (
    <section className={cn('py-14 sm:py-16 px-4 md:px-8 lg:px-16', className)}>
      <motion.div
        variants={staggerContainer(0.06)}
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={staggerItem} className="text-center mb-10 sm:mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">{title}</h2>
          {subtitle && <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>}
        </motion.div>
        <motion.div
          variants={staggerItem}
          className="scroll-mask-x overflow-x-auto rounded-xl border-2 border-border bg-card shadow-xl"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-3 border-border bg-muted">
                <th scope="col" className="p-4 text-left text-sm font-black uppercase tracking-wide">
                  Recurso / Compromisso
                </th>
                {columns.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={cn(
                      'p-4 text-center text-sm font-black uppercase tracking-wide',
                      i === highlightColumn && 'bg-primary text-primary-foreground'
                    )}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} className="border-b-2 border-border/25 last:border-b-0 hover:bg-accent-tint transition-colors">
                  <th scope="row" className="p-4 text-left text-sm font-bold">
                    {row.feature}
                  </th>
                  {row.values.map((value, i) => (
                    <td
                      key={i}
                      className={cn(
                        'p-4 text-center',
                        i === highlightColumn && 'bg-primary-tint font-bold'
                      )}
                    >
                      <Cell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </section>
  )
}
