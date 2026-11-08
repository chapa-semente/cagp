import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { staggerContainer, staggerItem, tactileSpring } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface BentoItem {
  title: string
  description?: string
  icon?: ReactNode
  span?: 'large' | 'tall' | 'wide' | 'normal'
  accent?: 'primary' | 'secondary' | 'accent' | 'card'
  badge?: string
  meta?: string
  tags?: string[]
  href?: string
  ctaLabel?: string
  external?: boolean
  secondaryHref?: string
  secondaryLabel?: string
}

export interface BentoGridProps {
  title?: string
  subtitle?: string
  items: BentoItem[]
  className?: string
}

const spanClass: Record<NonNullable<BentoItem['span']>, string> = {
  large: 'md:col-span-2 md:row-span-2',
  tall: 'md:row-span-2',
  wide: 'md:col-span-2',
  normal: '',
}

const accentClass: Record<NonNullable<BentoItem['accent']>, string> = {
  primary: 'bg-[#FAF5FF]',
  secondary: 'bg-[#FDF8F8]',
  accent: 'bg-[#FFFDF9]',
  card: 'bg-white',
}

export function BentoGrid({ title, subtitle, items, className }: BentoGridProps) {
  return (
    <section className={cn('py-10 sm:py-14 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-8 sm:mb-10 space-y-2.5">
            {title && (
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#16181d]">{title}</h2>
            )}
            {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto text-xs sm:text-sm">{subtitle}</p>}
          </div>
        )}
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(160px,auto)] gap-5"
        >
          {items.map((item) => (
            <motion.article
              key={item.title}
              variants={staggerItem}
              layout
              whileHover={{ x: -3, y: -3, boxShadow: '8px 8px 0px 0px #16181d' }}
              whileTap={{ x: 2, y: 2, boxShadow: '0px 0px 0px 0px #16181d' }}
              transition={tactileSpring}
              className={cn(
                'flex flex-col justify-between rounded-xl border-3 border-[#16181d] p-5 shadow-[6px_6px_0_0_#16181d] text-[#16181d]',
                spanClass[item.span ?? 'normal'],
                accentClass[item.accent ?? 'card']
              )}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  {item.icon && (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-3 border-[#16181d] bg-white shadow-[2px_2px_0_0_#16181d]">
                      {item.icon}
                    </div>
                  )}
                  {item.badge && (
                    <span className="px-2.5 py-1 rounded-md bg-[#16181d] text-white font-mono text-[10px] font-black uppercase tracking-wider border-2 border-[#16181d] shadow-[2px_2px_0_0_#FF8811]">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-head font-black uppercase tracking-wide text-[#16181d] leading-snug m-0">
                    {item.title}
                  </h3>
                  {item.meta && (
                    <p className="mt-1 font-mono text-[11px] font-bold text-[#5B2A86] m-0">
                      {item.meta}
                    </p>
                  )}
                  {item.description && (
                    <p className="mt-2 text-xs sm:text-sm text-gray-800 font-body font-medium leading-relaxed m-0">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {(item.tags?.length || item.href || item.secondaryHref) && (
                <div className="mt-4 pt-3 border-t-2 border-[#16181d] space-y-3">
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-white border-2 border-[#16181d] font-mono text-[10px] font-bold text-[#16181d] shadow-[1px_1px_0_0_#16181d]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {(item.href || item.secondaryHref) && (
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      {item.href && (
                        <a
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                          className="min-h-[44px] min-w-[44px] flex-1 px-3.5 py-2 rounded-xl bg-[#5B2A86] hover:bg-[#461e69] text-white font-head text-xs font-black uppercase tracking-wider border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d] inline-flex items-center justify-center gap-1.5 no-underline transition-colors"
                        >
                          <span>{item.ctaLabel || 'Acessar Núcleo'}</span>
                          <i className={`bi ${item.external ? 'bi-box-arrow-up-right' : 'bi-arrow-right'} text-xs`} aria-hidden="true" />
                        </a>
                      )}
                      {item.secondaryHref && (
                        <a
                          href={item.secondaryHref}
                          className="min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl bg-[#FFFDF9] hover:bg-[#FF8811] text-[#16181d] font-mono text-[11px] font-black uppercase border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d] inline-flex items-center justify-center gap-1 no-underline transition-colors"
                        >
                          <span>{item.secondaryLabel || '90h AAC'}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
