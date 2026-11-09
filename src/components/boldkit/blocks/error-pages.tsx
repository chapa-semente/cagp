/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn, safeHref } from '@/lib/utils'
import { bounceSpring, photoCardHover } from '@/lib/motion'
import {
  Home,
  ArrowLeft,
  Search,
  RefreshCw,
  AlertTriangle,
  ServerCrash,
  Construction,
  FileQuestion,
  Wifi,
  Ban,
  Clock,
  Lock,
  Sparkles,
} from 'lucide-react'

// ============================================================================
// ERROR PAGE VARIANT 1: 404 Not Found (Neobrutalista FAFICH + Chapa Semente)
// ============================================================================
export interface NotFoundPageProps {
  title?: string
  code?: string
  description?: string
  message?: string
  showSearch?: boolean
  onSearch?: (query: string) => void
  homeHref?: string
  backHref?: string
  className?: string
}

export function NotFoundPage({
  title = '404',
  code,
  description = 'Parece que você dobrou no corredor errado da FAFICH! Esta rota ou documento não foi encontrado.',
  message,
  showSearch = true,
  onSearch,
  homeHref = '/',
  backHref = '/chapa-semente',
  className,
}: NotFoundPageProps) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const displayCode = code || title
  const displayDesc = message || description

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchQuery)
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cagp:open-spotlight'))
    }
  }

  return (
    <div
      className={cn(
        'min-h-[60vh] flex items-center justify-center p-4 bg-background',
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={bounceSpring}
        className="w-full min-w-0 text-center space-y-7 max-w-xl"
      >
        {/* Sticker Brutalista da FAFICH */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <motion.span
            whileHover={photoCardHover}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FE8812] text-[#16181d] font-mono text-xs font-black uppercase border-3 border-[#16181d] shadow-[4px_4px_0_0_#16181d] -rotate-2 cursor-default"
          >
            <span>🏛️ SALA F-4000 • 4º ANDAR FAFICH</span>
          </motion.span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#5B2A85] text-white font-mono text-xs font-black uppercase border-3 border-[#16181d] shadow-[4px_4px_0_0_#16181d] rotate-1">
            <span>🌱 CHAPA SEMENTE 2026</span>
          </span>
        </div>

        {/* Large 404 Expressivo */}
        <div className="relative py-2">
          <motion.h1
            animate={{ rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="font-accent font-normal text-[120px] sm:text-[165px] leading-none text-[#16181d]/15 select-none m-0"
          >
            {displayCode}
          </motion.h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.08, rotate: -4 }}
              transition={bounceSpring}
              className="w-24 h-24 flex flex-col items-center justify-center border-3 border-[#16181d] bg-secondary text-white rounded-2xl shadow-[6px_6px_0_0_#16181d]"
            >
              <FileQuestion className="h-10 w-10 text-white" />
              <span className="font-mono text-[10px] font-black uppercase mt-1">EXTRVIADO</span>
            </motion.div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-black uppercase text-[#16181d] tracking-tight m-0">
            Rota Não Localizada no Arquivo da FAFICH
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-lg mx-auto m-0 leading-relaxed">
            {displayDesc}
          </p>
        </div>

        {/* Busca Rápida ⌘K */}
        {showSearch && (
          <div className="space-y-2.5 max-w-md mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="search"
                placeholder="Buscar matéria, PDF, proposta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('cagp:open-spotlight'))
                  }
                }}
                className="border-3 border-[#16181d] min-h-[44px]"
              />
              <Button
                type="button"
                aria-label="Abrir Busca Rápida ⌘K"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('cagp:open-spotlight'))
                  }
                }}
                className="min-h-[44px] border-3 border-[#16181d] bg-[#16181d] text-white font-mono font-black"
              >
                <Search className="h-4 w-4 mr-1.5" />
                <span>⌘K</span>
              </Button>
            </form>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Button asChild size="lg" className="min-h-[48px] border-3 border-[#16181d] shadow-[4px_4px_0_0_#16181d]">
            <a href={safeHref(homeHref)}>
              <Home className="mr-2 h-4 w-4" />
              Voltar à Bússola Inicial (Home)
            </a>
          </Button>
          {backHref && (
            <Button
              variant="outline"
              size="lg"
              asChild
              className="min-h-[48px] bg-[#FE8812] hover:bg-[#ff9831] text-[#16181d] font-black border-3 border-[#16181d] shadow-[4px_4px_0_0_#16181d]"
            >
              <a href={safeHref(backHref)}>
                <Sparkles className="mr-2 h-4 w-4" />
                Conhecer a Chapa Semente
              </a>
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ============================================================================
// ERROR PAGE VARIANT 2: 500 Server Error
// ============================================================================
export interface ServerErrorPageProps {
  title?: string
  description?: string
  errorId?: string
  onRetry?: () => void
  homeHref?: string
  supportEmail?: string
  className?: string
}

export function ServerErrorPage({
  title = '500',
  description = 'Something went wrong on our end. Our team has been notified and is working on a fix.',
  errorId,
  onRetry,
  homeHref = '/',
  supportEmail,
  className,
}: ServerErrorPageProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center p-4 bg-background',
        className
      )}
    >
      <div className="text-center space-y-8 max-w-lg">
        {/* Large 500 */}
        <div className="relative">
          <h1 className="font-accent font-normal text-[150px] md:text-[200px] leading-none text-muted-foreground/20">
            {title}
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 flex items-center justify-center border-3 border-foreground bg-destructive shadow-lg">
              <ServerCrash className="h-12 w-12 text-destructive-foreground" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black uppercase">Server Error</h2>
          <p className="text-muted-foreground">{description}</p>
          {errorId && (
            <p className="text-xs text-muted-foreground font-mono bg-muted p-2 border-2 border-foreground">
              Error ID: {errorId}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {onRetry && (
            <Button onClick={onRetry}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
          <Button variant="outline" asChild>
            <a href={safeHref(homeHref)}>
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </a>
          </Button>
        </div>

        {supportEmail && (
          <p className="text-sm text-muted-foreground">
            Still having issues?{' '}
            <a
              href={safeHref(`mailto:${supportEmail}`)}
              className="font-bold text-primary hover:underline"
            >
              Contact support
            </a>
          </p>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// ERROR PAGE VARIANT 3: Maintenance Page
// ============================================================================
export interface MaintenancePageProps {
  title?: string
  description?: string
  estimatedTime?: string
  features?: string[]
  statusPageUrl?: string
  className?: string
}

export function MaintenancePage({
  title = 'Under Maintenance',
  description = "We're currently performing scheduled maintenance to improve your experience.",
  estimatedTime,
  features,
  statusPageUrl,
  className,
}: MaintenancePageProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center p-4 bg-background',
        className
      )}
    >
      <div className="text-center space-y-8 max-w-lg">
        <div className="w-32 h-32 mx-auto flex items-center justify-center border-3 border-foreground bg-warning shadow-xl">
          <Construction className="h-16 w-16 text-warning-foreground" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
            {title}
          </h1>
          <p className="text-muted-foreground text-lg">{description}</p>

          {estimatedTime && (
            <div className="inline-flex items-center gap-2 border-3 border-foreground bg-muted px-4 py-2">
              <Clock className="h-5 w-5" />
              <span className="font-bold">Estimated time: {estimatedTime}</span>
            </div>
          )}
        </div>

        {features && features.length > 0 && (
          <div className="border-3 border-foreground p-6 bg-card text-left space-y-3">
            <h3 className="font-bold uppercase text-sm">What we're working on:</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={`feature-${index}`} className="flex items-start gap-2 text-sm">
                  <div className="w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground border-2 border-foreground shrink-0 mt-0.5">
                    ✓
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {statusPageUrl && (
          <Button variant="outline" asChild>
            <a href={safeHref(statusPageUrl)} target="_blank" rel="noopener noreferrer">
              Check Status Page
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// ERROR PAGE VARIANT 4: Offline Page
// ============================================================================
export interface OfflinePageProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function OfflinePage({
  title = "You're Offline",
  description = "It looks like you've lost your internet connection. Please check your connection and try again.",
  onRetry,
  className,
}: OfflinePageProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center p-4 bg-background',
        className
      )}
    >
      <div className="text-center space-y-8 max-w-md">
        <div className="w-32 h-32 mx-auto flex items-center justify-center border-3 border-foreground bg-muted shadow-xl">
          <Wifi className="h-16 w-16 text-muted-foreground" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
            {title}
          </h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="space-y-4">
          <div className="border-3 border-foreground p-4 bg-muted/30 text-left">
            <h3 className="font-bold uppercase text-sm mb-2">Things to try:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Check your Wi-Fi connection</li>
              <li>• Restart your router</li>
              <li>• Try disabling VPN if you're using one</li>
            </ul>
          </div>

          {onRetry && (
            <Button onClick={onRetry} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// ERROR PAGE VARIANT 5: 403 Forbidden
// ============================================================================
export interface ForbiddenPageProps {
  title?: string
  description?: string
  homeHref?: string
  loginHref?: string
  className?: string
}

export function ForbiddenPage({
  title = '403',
  description = "You don't have permission to access this page. Please contact your administrator if you believe this is an error.",
  homeHref = '/',
  loginHref,
  className,
}: ForbiddenPageProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center p-4 bg-background',
        className
      )}
    >
      <div className="text-center space-y-8 max-w-lg">
        {/* Large 403 */}
        <div className="relative">
          <h1 className="font-accent font-normal text-[150px] md:text-[200px] leading-none text-muted-foreground/20">
            {title}
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 flex items-center justify-center border-3 border-foreground bg-warning shadow-lg">
              <Ban className="h-12 w-12 text-warning-foreground" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black uppercase">Access Denied</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild>
            <a href={safeHref(homeHref)}>
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </a>
          </Button>
          {loginHref && (
            <Button variant="outline" asChild>
              <a href={safeHref(loginHref)}>
                <Lock className="mr-2 h-4 w-4" />
                Sign In
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// ERROR PAGE VARIANT 6: Coming Soon
// ============================================================================

function getCountdown(launchDate?: Date) {
  if (!launchDate) return null
  const total = launchDate.getTime() - Date.now()
  if (total <= 0) return null
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
  }
}

export interface ComingSoonPageProps {
  title?: string
  description?: string
  launchDate?: Date
  onNotify?: (email: string) => void
  className?: string
}

export function ComingSoonPage({
  title = 'Coming Soon',
  description = "We're working hard to bring you something amazing. Stay tuned!",
  launchDate,
  onNotify,
  className,
}: ComingSoonPageProps) {
  const [email, setEmail] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNotify?.(email)
    setSubmitted(true)
  }

  const [timeRemaining, setTimeRemaining] = React.useState(() => getCountdown(launchDate))

  React.useEffect(() => {
    if (!launchDate) return
    const interval = setInterval(() => {
      setTimeRemaining(getCountdown(launchDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [launchDate])

  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center p-4 bg-background',
        className
      )}
    >
      <div className="text-center space-y-8 max-w-lg">
        <div className="w-32 h-32 mx-auto flex items-center justify-center border-3 border-foreground bg-primary shadow-xl">
          <Clock className="h-16 w-16 text-primary-foreground" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {timeRemaining && (
          <div className="flex justify-center gap-4">
            {[
              { value: timeRemaining.days, label: 'Days' },
              { value: timeRemaining.hours, label: 'Hours' },
              { value: timeRemaining.minutes, label: 'Minutes' },
            ].map((item) => (
              <div
                key={`action-${item.label}`}
                className="border-3 border-foreground p-4 bg-card shadow-md w-24"
              >
                <div className="text-3xl font-black">{item.value}</div>
                <div className="text-xs font-bold uppercase text-muted-foreground">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {onNotify && !submitted && (
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">Notify Me</Button>
          </form>
        )}

        {submitted && (
          <div className="border-3 border-success bg-success/10 p-4">
            <p className="font-bold text-success">
              Thanks! We'll notify you when we launch.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// ERROR PAGE VARIANT 7: Generic Error
// ============================================================================
export interface GenericErrorPageProps {
  icon?: React.ReactNode
  title?: string
  description?: string
  actions?: Array<{
    label: string
    href?: string
    onClick?: () => void
    variant?: 'default' | 'outline'
  }>
  className?: string
}

export function GenericErrorPage({
  icon,
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again later.',
  actions,
  className,
}: GenericErrorPageProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center p-4 bg-background',
        className
      )}
    >
      <div className="text-center space-y-8 max-w-md">
        <div className="w-24 h-24 mx-auto flex items-center justify-center border-3 border-foreground bg-destructive/10 shadow-lg">
          {icon || <AlertTriangle className="h-12 w-12 text-destructive" />}
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
            {title}
          </h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {actions && actions.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {actions.map((action) => (
              <Button
                key={action.label}
                variant={action.variant || 'default'}
                onClick={action.onClick}
                asChild={!!action.href}
              >
                {action.href ? <a href={safeHref(action.href)}>{action.label}</a> : action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Export all variants
// ============================================================================
export const ErrorPages = {
  NotFound: NotFoundPage,
  ServerError: ServerErrorPage,
  Maintenance: MaintenancePage,
  Offline: OfflinePage,
  Forbidden: ForbiddenPage,
  ComingSoon: ComingSoonPage,
  Generic: GenericErrorPage,
}

export const ErrorPageBlock = NotFoundPage;
