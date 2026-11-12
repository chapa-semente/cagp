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
  secondaryExternal?: boolean
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
  primary: 'bg-primary-tint',
  secondary: 'bg-[#FDF8F8]',
  accent: 'bg-white',
  card: 'bg-white',
}

export function BentoGrid({ title, subtitle, items, className }: BentoGridProps) {
  return (
    <section className={cn('py-10 sm:py-14 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-8 sm:mb-10 space-y-2.5">
            {title && (
              <h2 className="text-2xl sm:text-4xl font-black text-foreground">{title}</h2>
            )}
            {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto text-xs sm:text-sm">{subtitle}</p>}
          </div>
        )}
        <motion.div
          variants={staggerContainer(0.06)}
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(160px,auto)] gap-5"
        >
          {items.map((item) => (
            <motion.article
              key={item.title}
              variants={staggerItem}
              layout
              whileHover={{ x: -3, y: -3, boxShadow: '8px 8px 0px 0px #1F1F1F' }}
              whileTap={{ x: 2, y: 2, boxShadow: '0px 0px 0px 0px #1F1F1F' }}
              transition={tactileSpring}
              className={cn(
                'flex flex-col justify-between rounded-xl border-3 border-border p-5 shadow-xl text-foreground',
                spanClass[item.span ?? 'normal'],
                accentClass[item.accent ?? 'card']
              )}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  {item.icon && (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-3 border-border bg-white shadow-sm">
                      {item.icon}
                    </div>
                  )}
                  {item.badge && (
                    <span className="px-2.5 py-1 rounded-md bg-foreground text-white font-mono text-xs font-black uppercase tracking-wider border-2 border-border shadow-[2px_2px_0_0_#FE8812]">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-head font-black text-foreground leading-snug m-0">
                    {item.title}
                  </h3>
                  {item.meta && (
                    <p className="mt-1 font-mono text-xs font-bold text-primary m-0">
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
                <div className="mt-4 pt-3 border-t-2 border-border space-y-3">
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-white border-2 border-border font-mono text-xs font-bold text-foreground shadow-[1px_1px_0_0_#1F1F1F]"
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
                          className="min-h-[48px] min-w-[48px] flex-1 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-head text-xs font-black uppercase tracking-wider border-2 border-border shadow-sm inline-flex items-center justify-center gap-1.5 no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-x-0.5 active:translate-y-0.5"
                        >
                          <span>{item.ctaLabel || 'Acessar Núcleo'}</span>
                          <i className={`bi ${item.external ? 'bi-box-arrow-up-right' : 'bi-arrow-right'} text-xs`} aria-hidden="true" />
                        </a>
                      )}
                      {item.secondaryHref && (
                        <a
                          href={item.secondaryHref}
                          target={item.secondaryExternal ? '_blank' : undefined}
                          rel={item.secondaryExternal ? 'noopener noreferrer' : undefined}
                          className="min-h-[48px] min-w-[48px] px-3 py-2 rounded-xl bg-white hover:bg-accent text-foreground font-mono text-xs font-black uppercase border-2 border-border shadow-sm inline-flex items-center justify-center gap-1 no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-x-0.5 active:translate-y-0.5"
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
