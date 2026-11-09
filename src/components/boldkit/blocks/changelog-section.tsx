 
import { motion } from 'motion/react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export type ChangelogTag = 'feature' | 'fix' | 'improvement' | 'breaking'

export interface ChangelogEntry {
  version: string
  date: string
  tag?: ChangelogTag
  title: string
  items: string[]
}

export interface ChangelogSectionProps {
  title?: string
  subtitle?: string
  entries: ChangelogEntry[]
  className?: string
}

const tagVariant: Record<ChangelogTag, 'default' | 'secondary' | 'success' | 'destructive'> = {
  feature: 'default',
  improvement: 'secondary',
  fix: 'success',
  breaking: 'destructive',
}

export function ChangelogSection({
  title = 'Changelog',
  subtitle,
  entries,
  className,
}: ChangelogSectionProps) {
  return (
    <section className={cn('py-14 sm:py-16 px-4 md:px-8 lg:px-16', className)}>
      <motion.div
        variants={staggerContainer(0.06)}
        className="max-w-3xl mx-auto"
      >
        <motion.div variants={staggerItem} className="mb-10 sm:mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </motion.div>
        <ol className="relative border-l-3 border-[#16181d] pl-8 space-y-8">
          {entries.map((entry) => (
            <motion.li
              key={entry.version}
              variants={staggerItem}
              className="relative rounded-xl border-3 border-[#16181d] bg-card p-5 shadow-[4px_4px_0_0_#16181d]"
            >
              <span className="absolute -left-[44px] top-5 flex h-5 w-5 items-center justify-center rounded-sm border-3 border-[#16181d] bg-primary shadow-[2px_2px_0_0_#16181d]" />
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-lg sm:text-xl font-black uppercase tracking-wide">{entry.version}</span>
                {entry.tag && <Badge variant={tagVariant[entry.tag]}>{entry.tag}</Badge>}
                <span className="font-mono text-xs sm:text-sm font-bold text-muted-foreground">{entry.date}</span>
              </div>
              <h3 className="mt-2 font-bold text-base sm:text-lg">{entry.title}</h3>
              <ul className="mt-2 space-y-1.5">
                {entry.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#16181d]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  )
}
