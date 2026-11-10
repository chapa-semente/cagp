/* eslint-disable react-refresh/only-export-components */
import { motion } from 'motion/react'
import {
  cardHoverVariants,
  photoCardHover,
  photoZoomSpring,
  staggerContainer,
  staggerItem,
  tactileSpring,
} from '@/lib/motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn, safeHref } from '@/lib/utils'
import { ArrowRight, Play, Sparkles, Star, Zap } from 'lucide-react'

// ============================================================================
// HERO VARIANT 1: Centered with Badge
// ============================================================================
export interface HeroCenteredProps {
  badge?: string
  title: string
  titleHighlight?: string
  description: string
  primaryAction?: { label: string; href?: string; onClick?: () => void }
  secondaryAction?: { label: string; href?: string; onClick?: () => void }
  className?: string
}

export function HeroCentered({
  badge = 'CHAPA SEMENTE • PROPOSTA MATERIALIZADA • 25 E 26/11',
  title,
  titleHighlight,
  description,
  primaryAction,
  secondaryAction,
  className,
}: HeroCenteredProps) {
  return (
    <section className={cn('py-14 sm:py-20 px-4 md:px-8 lg:px-16', className)}>
      <motion.div
        variants={staggerContainer(0.07)}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8"
      >
        {badge && (
          <motion.div variants={staggerItem}>
            <Badge variant="semente" className="text-xs sm:text-sm px-4 py-1.5 shadow-[3px_3px_0_0_#1F1F1F]">
              <Sparkles className="h-3.5 w-3.5 mr-2 text-[#FE8812]" />
              {badge}
            </Badge>
          </motion.div>
        )}

        <motion.h1
          variants={staggerItem}
          className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.06]"
        >
          {title}{' '}
          {titleHighlight && (
            <span className="inline-block bg-primary px-3 pt-1 pb-0.5 font-accent font-normal normal-case tracking-normal text-primary-foreground border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F] -rotate-1">
              {titleHighlight}
            </span>
          )}
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        {(primaryAction || secondaryAction) && (
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-3.5 justify-center pt-1"
          >
            {primaryAction && (
              primaryAction.href ? (
                <Button size="lg" className="h-auto min-h-12 whitespace-normal text-center" asChild>
                  <a href={safeHref(primaryAction.href)}>{primaryAction.label}<ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
              ) : (
                <Button size="lg" onClick={primaryAction.onClick}>
                  {primaryAction.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )
            )}
            {secondaryAction && (
              secondaryAction.href ? (
                <Button size="lg" variant="outline" className="h-auto min-h-12 whitespace-normal text-center" asChild>
                  <a href={safeHref(secondaryAction.href)}>{secondaryAction.label}</a>
                </Button>
              ) : (
                <Button size="lg" variant="outline" onClick={secondaryAction.onClick}>
                  {secondaryAction.label}
                </Button>
              )
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

// ============================================================================
// HERO VARIANT 2: Split with Image
// ============================================================================
export interface HeroSplitProps {
  title: string
  titleHighlight?: string
  description: string
  primaryAction?: { label: string; href?: string; onClick?: () => void }
  secondaryAction?: { label: string; href?: string; onClick?: () => void }
  imageSrc: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
  className?: string
}

export function HeroSplit({
  title,
  titleHighlight,
  description,
  primaryAction,
  secondaryAction,
  imageSrc,
  imageAlt = 'Hero image',
  imagePosition = 'right',
  className,
}: HeroSplitProps) {
  const contentOrder = imagePosition === 'right' ? 'order-1' : 'order-2'
  const imageOrder = imagePosition === 'right' ? 'order-2' : 'order-1'

  return (
    <section className={cn('py-14 sm:py-16 px-4 md:px-8 lg:px-16', className)}>
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-12 items-center"
      >
        <motion.div variants={staggerItem} className={cn('space-y-6', contentOrder)}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.08]">
            {title}{' '}
            {titleHighlight && (
              <span className="inline-block bg-accent px-2.5 pt-1 pb-0.5 font-accent font-normal normal-case tracking-normal text-accent-foreground border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F]">
                {titleHighlight}
              </span>
            )}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed">
            {description}
          </p>

          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryAction && (
                primaryAction.href ? (
                  <Button size="lg" asChild>
                    <a href={safeHref(primaryAction.href)}>{primaryAction.label}<ArrowRight className="ml-2 h-4 w-4" /></a>
                  </Button>
                ) : (
                  <Button size="lg" onClick={primaryAction.onClick}>
                    {primaryAction.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )
              )}
              {secondaryAction && (
                secondaryAction.href ? (
                  <Button size="lg" variant="outline" asChild>
                    <a href={safeHref(secondaryAction.href)}><Play className="mr-2 h-4 w-4" />{secondaryAction.label}</a>
                  </Button>
                ) : (
                  <Button size="lg" variant="outline" onClick={secondaryAction.onClick}>
                    <Play className="mr-2 h-4 w-4" />
                    {secondaryAction.label}
                  </Button>
                )
              )}
            </div>
          )}
        </motion.div>

        <motion.div
          whileHover={photoCardHover}
          transition={photoZoomSpring}
          className={cn('relative', imageOrder)}
        >
          <div className="rounded-xl border-2 border-[#1F1F1F] shadow-[8px_8px_0_0_#1F1F1F] overflow-hidden bg-card">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 rounded-lg bg-primary border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F]" />
          <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-lg bg-accent border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F]" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// HERO VARIANT 3: With Stats
// ============================================================================
export interface HeroWithStatsProps {
  title: string
  titleHighlight?: string
  description: string
  primaryAction?: { label: string; href?: string; onClick?: () => void }
  stats: Array<{ value: string; label: string }>
  className?: string
}

export function HeroWithStats({
  title,
  titleHighlight,
  description,
  primaryAction,
  stats,
  className,
}: HeroWithStatsProps) {
  return (
    <section className={cn('py-16 sm:py-20 px-4 md:px-8 lg:px-16', className)}>
      <motion.div
        variants={staggerContainer(0.07)}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={staggerItem} className="text-center space-y-6 mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight">
            {title}{' '}
            {titleHighlight && (
              <span className="inline-block bg-secondary px-2.5 pt-1 pb-0.5 font-accent font-normal normal-case tracking-normal text-secondary-foreground border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F]">
                {titleHighlight}
              </span>
            )}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            {description}
          </p>

          {primaryAction && (
            primaryAction.href ? (
              <Button size="lg" asChild>
                <a href={safeHref(primaryAction.href)}>{primaryAction.label}<Zap className="ml-2 h-4 w-4" /></a>
              </Button>
            ) : (
              <Button size="lg" onClick={primaryAction.onClick}>
                {primaryAction.label}
                <Zap className="ml-2 h-4 w-4" />
              </Button>
            )
          )}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <motion.div
              key={`stat-${stat.label}`}
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={tactileSpring}
              className="rounded-xl border-2 border-[#1F1F1F] bg-card p-5 sm:p-6 text-center shadow-[3px_3px_0_0_#1F1F1F]"
            >
              <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-black">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-wide mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// HERO VARIANT 4: Minimal
// ============================================================================
export interface HeroMinimalProps {
  title: string
  description: string
  primaryAction?: { label: string; href?: string; onClick?: () => void }
  className?: string
}

export function HeroMinimal({
  title,
  description,
  primaryAction,
  className,
}: HeroMinimalProps) {
  return (
    <section className={cn('py-20 sm:py-32 px-4 md:px-8 lg:px-16', className)}>
      <motion.div
        variants={staggerContainer(0.07)}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto space-y-8"
      >
        <motion.h1
          variants={staggerItem}
          className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none"
        >
          {title}
        </motion.h1>

        <motion.div
          variants={staggerItem}
          className="flex flex-col md:flex-row md:items-end gap-8 justify-between"
        >
          <p className="text-base sm:text-lg text-muted-foreground font-medium max-w-md">
            {description}
          </p>

          {primaryAction && (
            primaryAction.href ? (
              <Button size="lg" className="shrink-0" asChild>
                <a href={safeHref(primaryAction.href)}>{primaryAction.label}<ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
            ) : (
              <Button size="lg" className="shrink-0" onClick={primaryAction.onClick}>
                {primaryAction.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )
          )}
        </motion.div>

        <div className="w-full h-1 bg-[#1F1F1F]" />
      </motion.div>
    </section>
  )
}

// ============================================================================
// HERO VARIANT 5: With Video
// ============================================================================
export interface HeroWithVideoProps {
  badge?: string
  title: string
  titleHighlight?: string
  description: string
  primaryAction?: { label: string; href?: string; onClick?: () => void }
  videoThumbnail: string
  onPlayClick?: () => void
  className?: string
}

export function HeroWithVideo({
  badge,
  title,
  titleHighlight,
  description,
  primaryAction,
  videoThumbnail,
  onPlayClick,
  className,
}: HeroWithVideoProps) {
  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <motion.div
        variants={staggerContainer(0.07)}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto space-y-12"
      >
        <motion.div variants={staggerItem} className="text-center space-y-6">
          {badge && (
            <Badge variant="secondary" className="text-sm px-4 py-1">
              <Star className="h-3 w-3 mr-2" />
              {badge}
            </Badge>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
            {title}{' '}
            {titleHighlight && (
              <span className="underline decoration-primary decoration-4 underline-offset-4">
                {titleHighlight}
              </span>
            )}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            {description}
          </p>

          {primaryAction && (
            primaryAction.href ? (
              <Button size="lg" asChild>
                <a href={safeHref(primaryAction.href)}>{primaryAction.label}<ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
            ) : (
              <Button size="lg" onClick={primaryAction.onClick}>
                {primaryAction.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )
          )}
        </motion.div>

        <motion.div
          whileHover={photoCardHover}
          transition={photoZoomSpring}
          className="relative group cursor-pointer"
          onClick={onPlayClick}
        >
          <div className="rounded-xl border-2 border-[#1F1F1F] shadow-[8px_8px_0_0_#1F1F1F] overflow-hidden">
            <img
              src={videoThumbnail}
              alt="Video thumbnail"
              className="w-full h-auto object-cover aspect-video"
            />
          </div>
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#1F1F1F]/20 group-hover:bg-[#1F1F1F]/30 transition-colors rounded-xl">
            <div className="w-20 h-20 rounded-xl bg-primary border-3 border-[#1F1F1F] flex items-center justify-center shadow-[3px_3px_0_0_#1F1F1F] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-[8px_8px_0_0_#1F1F1F] transition">
              <Play className="h-8 w-8 fill-current text-white" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// Export all variants
// ============================================================================
export function HeroSectionCompat(props: any) {
  const { badge, title, titleHighlight, subtitle, description, primaryAction, secondaryAction, className } = props;
  const desc = description || subtitle || '';
  return <HeroCentered badge={badge} title={title} titleHighlight={titleHighlight} description={desc} primaryAction={primaryAction} secondaryAction={secondaryAction} className={className} />;
}

export const HeroSection = Object.assign(HeroSectionCompat, {
  Centered: HeroCentered,
  Split: HeroSplit,
  WithStats: HeroWithStats,
  Minimal: HeroMinimal,
  WithVideo: HeroWithVideo,
})
