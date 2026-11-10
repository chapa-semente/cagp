/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { motion } from 'motion/react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn, safeHref } from '@/lib/utils'
import { ArrowRight, Mail, Sparkles, Zap } from '@/components/ui/icons'

// ============================================================================
// CTA VARIANT 1: Simple Centered
// ============================================================================
export interface CTASimpleProps {
  title: string
  description?: string
  badge?: string
  primaryAction: { label: string; href?: string; onClick?: () => void }
  secondaryAction?: { label: string; href?: string; onClick?: () => void }
  className?: string
}

export function CTASimple({
  title,
  description,
  badge = 'CHAPA SEMENTE • PROPOSTA MATERIALIZADA • 25 E 26/11',
  primaryAction,
  secondaryAction,
  className,
}: CTASimpleProps) {
  return (
    <section className={cn('py-14 sm:py-16 px-4 md:px-8 lg:px-16', className)}>
      <motion.div
        variants={staggerContainer(0.07)}
        className="max-w-4xl mx-auto rounded-2xl border-2 border-border bg-card p-6 sm:p-10 text-center space-y-6 shadow-xl"
      >
        {badge && (
          <motion.div variants={staggerItem}>
            <Badge variant="semente" className="text-xs px-3 py-1">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-accent" />
              {badge}
            </Badge>
          </motion.div>
        )}

        <motion.h2
          variants={staggerItem}
          className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight"
        >
          {title}
        </motion.h2>

        {description && (
          <motion.p
            variants={staggerItem}
            className="text-base sm:text-lg text-muted-foreground font-medium max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}

        <motion.div
          variants={staggerItem}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {primaryAction.href ? (
            <Button size="lg" asChild>
              <a href={safeHref(primaryAction.href)}>{primaryAction.label}<ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
          ) : (
            <Button size="lg" onClick={primaryAction.onClick}>
              {primaryAction.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {secondaryAction && (
            secondaryAction.href ? (
              <Button size="lg" variant="outline" asChild>
                <a href={safeHref(secondaryAction.href)}>{secondaryAction.label}</a>
              </Button>
            ) : (
              <Button size="lg" variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// CTA VARIANT 2: With Background
// ============================================================================
export interface CTAWithBackgroundProps {
  title: string
  description?: string
  primaryAction: { label: string; href?: string; onClick?: () => void }
  backgroundColor?: 'primary' | 'secondary' | 'accent' | 'muted'
  className?: string
}

export function CTAWithBackground({
  title,
  description,
  primaryAction,
  backgroundColor = 'primary',
  className,
}: CTAWithBackgroundProps) {
  const bgColors = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    muted: 'bg-muted text-foreground',
  }

  return (
    <section className={cn('py-14 sm:py-16 px-4 md:px-8 lg:px-16', className)}>
      <motion.div
        variants={staggerContainer(0.07)}
        className={cn(
          'max-w-5xl mx-auto rounded-2xl border-3 border-border p-8 md:p-12 shadow-xl',
          bgColors[backgroundColor]
        )}
      >
        <div className="text-center space-y-6">
          <Sparkles className="h-12 w-12 mx-auto" />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
            {title}
          </h2>

          {description && (
            <p className="text-base sm:text-lg font-medium max-w-2xl mx-auto opacity-95">
              {description}
            </p>
          )}

          {primaryAction.href ? (
            <Button
              size="lg"
              variant={backgroundColor === 'muted' ? 'default' : 'outline'}
              className={backgroundColor !== 'muted' ? 'bg-background text-foreground hover:bg-background' : ''}
              asChild
            >
              <a href={safeHref(primaryAction.href)}>{primaryAction.label}<Zap className="ml-2 h-4 w-4" /></a>
            </Button>
          ) : (
            <Button
              size="lg"
              variant={backgroundColor === 'muted' ? 'default' : 'outline'}
              className={backgroundColor !== 'muted' ? 'bg-background text-foreground hover:bg-background' : ''}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
              <Zap className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </motion.div>
    </section>
  )
}

// ============================================================================
// CTA VARIANT 3: Newsletter
// ============================================================================
export interface CTANewsletterProps {
  title: string
  description?: string
  placeholder?: string
  buttonLabel?: string
  onSubmit?: (email: string) => void
  className?: string
}

export function CTANewsletter({
  title,
  description,
  placeholder = 'Enter your email',
  buttonLabel = 'Subscribe',
  onSubmit,
  className,
}: CTANewsletterProps) {
  const [email, setEmail] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(email)
    setEmail('')
  }

  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16 bg-background', className)}>
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <Mail className="h-12 w-12 mx-auto text-primary" />

        <h2 className="text-2xl md:text-3xl font-black">
          {title}
        </h2>

        {description && (
          <p className="text-muted-foreground font-medium">
            {description}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" size="lg">
            {buttonLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="text-xs text-muted-foreground">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}

// ============================================================================
// CTA VARIANT 4: Split with Image
// ============================================================================
export interface CTASplitProps {
  title: string
  description?: string
  primaryAction: { label: string; href?: string; onClick?: () => void }
  secondaryAction?: { label: string; href?: string; onClick?: () => void }
  imageSrc: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
  className?: string
}

export function CTASplit({
  title,
  description,
  primaryAction,
  secondaryAction,
  imageSrc,
  imageAlt = 'CTA image',
  imagePosition = 'right',
  className,
}: CTASplitProps) {
  return (
    <section className={cn('py-16 px-4 md:px-8 lg:px-16', className)}>
      <div className="max-w-6xl mx-auto border-3 border-foreground shadow-xl overflow-hidden">
        <div
          className={cn(
            'grid md:grid-cols-2',
            imagePosition === 'left' && 'md:[&>*:first-child]:order-2'
          )}
        >
          <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-black">
              {title}
            </h2>

            {description && (
              <p className="text-muted-foreground font-medium">
                {description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              {primaryAction.href ? (
                <Button size="lg" asChild>
                  <a href={safeHref(primaryAction.href)}>{primaryAction.label}<ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
              ) : (
                <Button size="lg" onClick={primaryAction.onClick}>
                  {primaryAction.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              {secondaryAction && (
                secondaryAction.href ? (
                  <Button size="lg" variant="outline" asChild>
                    <a href={safeHref(secondaryAction.href)}>{secondaryAction.label}</a>
                  </Button>
                ) : (
                  <Button size="lg" variant="outline" onClick={secondaryAction.onClick}>
                    {secondaryAction.label}
                  </Button>
                )
              )}
            </div>
          </div>

          <div className="bg-muted">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA VARIANT 5: Banner
// ============================================================================
export interface CTABannerProps {
  text: string
  action: { label: string; href?: string; onClick?: () => void }
  dismissible?: boolean
  onDismiss?: () => void
  variant?: 'primary' | 'secondary' | 'accent' | 'warning'
  className?: string
}

export function CTABanner({
  text,
  action,
  dismissible = false,
  onDismiss,
  variant = 'primary',
  className,
}: CTABannerProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  const variantStyles = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    warning: 'bg-yellow-500 text-foreground',
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'relative py-3 px-4 border-b-3 border-foreground',
        variantStyles[variant],
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
        <p className="font-bold text-sm">
          {text}
        </p>
        {action.href ? (
          <Button size="sm" variant="outline" className="bg-background text-foreground hover:bg-background shrink-0" asChild>
            <a href={safeHref(action.href)}>{action.label}<ArrowRight className="ml-1 h-3 w-3" /></a>
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="bg-background text-foreground hover:bg-background shrink-0"
            onClick={action.onClick}
          >
            {action.label}
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        )}
        {dismissible && (
          <button
            aria-label="Dismiss"
            onClick={() => {
              setIsVisible(false)
              onDismiss?.()
            }}
            className="absolute right-4 text-current opacity-70 hover:opacity-100"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Export all variants
// ============================================================================
export function CTASectionCompat(props: any) {
  const { title, subtitle, description, actionText, primaryAction, onAction, href, className } = props;
  const desc = subtitle || description;
  const action = primaryAction || { label: actionText || 'Saiba Mais', href: href || '/documentos', onClick: onAction };
  return <CTASimple title={title} description={desc} primaryAction={action} className={className} />;
}

export const CTASection = Object.assign(CTASectionCompat, {
  Simple: CTASimple,
  WithBackground: CTAWithBackground,
  Newsletter: CTANewsletter,
  Split: CTASplit,
  Banner: CTABanner,
})
