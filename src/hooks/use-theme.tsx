/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { flushSync } from 'react-dom'

type Theme = 'light' | 'system'

/**
 * Where a circular reveal starts: an element (its centre — works for keyboard
 * activation too, so prefer `e.currentTarget`) or a point in viewport
 * coordinates, e.g. `{ x: e.clientX, y: e.clientY }`.
 */
export type RevealOrigin = Element | { x: number; y: number }

export interface SetThemeOptions {
  /** Wipe the new theme in as a circle growing from here. Omit for an instant swap. */
  origin?: RevealOrigin
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme, options?: SetThemeOptions) => void
  resolvedTheme: 'light'
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> }
}

/**
 * Run `update` behind a circular-reveal View Transition: the page as it looks
 * after `update` wipes in over the old one, from `origin`. Falls back to
 * running `update` directly when View Transitions are unsupported or there is
 * no DOM (SSR). `update` must change the DOM synchronously; React state set
 * inside it is flushed with flushSync.
 */
export function circularReveal(update: () => void, origin?: RevealOrigin): void {
  const run = () => flushSync(update)
  if (typeof document === 'undefined' || !origin) return run()
  const doc = document as ViewTransitionDocument
  if (typeof doc.startViewTransition !== 'function') return run()

  const { x, y } =
    'getBoundingClientRect' in origin
      ? (() => {
          const r = origin.getBoundingClientRect()
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
        })()
      : origin

  let transition: { ready: Promise<void> }
  try {
    transition = doc.startViewTransition(run)
  } catch {
    return run()
  }

  transition.ready
    .then(() => {
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
      const timing = { duration: 600, easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)' }
      const root = document.documentElement
      const solid = { opacity: [1, 1], mixBlendMode: ['normal', 'normal'] }
      root.animate(solid, { ...timing, pseudoElement: '::view-transition-old(root)' })
      root.animate(
        { ...solid, clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { ...timing, pseudoElement: '::view-transition-new(root)' }
      )
    })
    .catch(() => {
      // Skipped (e.g. a second toggle mid-reveal): the update already applied.
    })
}

function resolve(): 'light' {
  return 'light'
}

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(
  undefined
)

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'boldkit-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme)

  const resolvedTheme = 'light' as const

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('dark')
    root.classList.add('light')
    root.style.colorScheme = 'light'
  }, [])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (_newTheme: Theme, options?: SetThemeOptions) => {
        const commit = () => {
          try {
            localStorage.setItem(storageKey, 'light')
          } catch {
            // Storage blocked
          }
          setTheme('light')
        }
        if (!options?.origin) return commit()
        circularReveal(() => {
          const root = document.documentElement
          root.classList.remove('dark')
          root.classList.add(resolve())
          root.style.colorScheme = 'light'
          commit()
        }, options.origin)
      },
      resolvedTheme,
    }),
    [theme, resolvedTheme, storageKey]
  )

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

const fallbackThemeState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => {},
  resolvedTheme: 'light',
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) {
    if (typeof window === 'undefined') {
      return fallbackThemeState
    }
    return {
      theme: 'light' as Theme,
      setTheme: (_newTheme: Theme, options?: SetThemeOptions) => {
        const commit = () => {
          const root = document.documentElement
          root.classList.remove('dark')
          root.classList.add(resolve())
          root.style.colorScheme = 'light'
          try {
            localStorage.setItem('boldkit-theme', 'light')
          } catch {}
        }
        if (!options?.origin) return commit()
        circularReveal(commit, options.origin)
      },
      resolvedTheme: 'light' as const,
    }
  }

  return context
}
