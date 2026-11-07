---
title: "Motion"
description: "Framework-agnostic motion system for BoldKit. Six signature CSS recipes plus React and Vue adapters share one vanilla core, so the same animation language works in any framework — including Svelte, Solid, or plain HTML."
source: "boldkit.dev"
canonicalUrl: "https://boldkit.dev/components/motion"
category: "components"
dependencies:
  - "tailwind-merge"
  - "clsx"
  - "class-variance-authority"
---

# Motion

> Framework-agnostic motion system for BoldKit. Six signature CSS recipes plus React and Vue adapters share one vanilla core, so the same animation language works in any framework — including Svelte, Solid, or plain HTML.

> 🔗 **Original Source Code**: [`components/ui/motion.tsx`](../ui/motion.tsx)

## Installation

```bash
npx shadcn@latest add "https://boldkit.dev/r/motion.json"
```

### Component Source Code (`components/ui/motion.tsx`)

```tsx
/* eslint-disable react-refresh/only-export-components */
/**
 * BoldKit Motion — React adapter (L3).
 *
 * Thin wrapper around @boldkit/motion-core. Adds React lifecycle wiring
 * to the framework-agnostic primitives. The Vue adapter mirrors this
 * surface 1:1 so apps can switch frameworks without re-learning the API.
 *
 * Requires `motion.css` (L2 recipes) to be loaded. If you're using
 * BoldKit's globals.css, the recipes are already included.
 */
import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  observeReveal,
  staggerChildren,
  triggerAnimation,
  startViewTransition,
  prefersReducedMotion,
  type RevealOptions,
  type StaggerOptions,
  type PageTransition,
} from '@/lib/motion-core'

// ──────────────────────────────────────────────────────────────────
// <Reveal> — scroll-triggered entrance
// ──────────────────────────────────────────────────────────────────

export type RevealDirection = 'up' | 'down' | 'left' | 'right'

export interface RevealProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<RevealOptions, 'rootMargin'> {
  /** Direction to slide in from. Default 'up'. */
  direction?: RevealDirection
  /** Custom IntersectionObserver rootMargin. */
  rootMargin?: string
  /** Element tag to render. Default 'div'. */
  as?: keyof React.JSX.IntrinsicElements
}

export const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(
  ({ direction = 'up', rootMargin, threshold, once, delay, as, className, children, ...rest }, ref) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null)
    React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement)

    React.useEffect(() => {
      const el = innerRef.current
      if (!el) return
      return observeReveal(el, { rootMargin, threshold, once, delay })
    }, [rootMargin, threshold, once, delay])

    const Tag = (as ?? 'div') as React.ElementType
    return (
      <Tag
        ref={innerRef}
        className={cn('bk-reveal', `bk-reveal-${direction}`, className)}
        {...rest}
      >
        {children}
      </Tag>
    )
  }
)
Reveal.displayName = 'Reveal'

// ──────────────────────────────────────────────────────────────────
// <Motion> — declarative recipe composition
// ──────────────────────────────────────────────────────────────────

export interface MotionProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof React.JSX.IntrinsicElements
  /** Apply .bk-press for interactive shadow choreography. */
  press?: boolean
  /** Apply .bk-stamp-in entrance. */
  stamp?: boolean
  /** Apply .bk-pulse-shadow. */
  pulse?: boolean
}

export const Motion = React.forwardRef<HTMLElement, MotionProps>(
  ({ as, press, stamp, pulse, className, children, ...rest }, ref) => {
    const Tag = (as ?? 'div') as React.ElementType
    return (
      <Tag
        ref={ref}
        className={cn(
          press && 'bk-press',
          stamp && 'bk-stamp-in',
          pulse && 'bk-pulse-shadow',
          className
        )}
        {...rest}
      >
        {children}
      </Tag>
    )
  }
)
Motion.displayName = 'Motion'

// ──────────────────────────────────────────────────────────────────
// <Stagger> — sequence children entrance
// ──────────────────────────────────────────────────────────────────

export interface StaggerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    StaggerOptions {
  as?: keyof React.JSX.IntrinsicElements
}

export const Stagger = React.forwardRef<HTMLDivElement, StaggerProps>(
  ({ delay, initialDelay, selector, as, className, children, ...rest }, ref) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null)
    React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement)

    React.useEffect(() => {
      const el = innerRef.current
      if (!el) return
      return staggerChildren(el, { delay, initialDelay, selector })
    }, [delay, initialDelay, selector])

    const Tag = (as ?? 'div') as React.ElementType
    return (
      <Tag ref={innerRef} className={className} {...rest}>
        {children}
      </Tag>
    )
  }
)
Stagger.displayName = 'Stagger'

// ──────────────────────────────────────────────────────────────────
// useShake — imperative shake-on-error
// ──────────────────────────────────────────────────────────────────

/**
 * Returns a function that shakes a given element (e.g. an invalid input).
 *
 *   const shake = useShake()
 *   shake(inputRef.current)
 */
export function useShake() {
  return React.useCallback(async (el: Element | null) => {
    if (!el) return
    await triggerAnimation(el, 'bk-shake-x')
  }, [])
}

// ──────────────────────────────────────────────────────────────────
// useViewTransition — wraps document.startViewTransition
// ──────────────────────────────────────────────────────────────────

/**
 * Returns a function that runs `callback` inside a view transition where
 * supported. Falls back to invoking the callback directly. Always safe to call.
 */
export function useViewTransition() {
  return React.useCallback(
    (callback: () => void | Promise<void>, recipe?: PageTransition, options?: { types?: string[] }) => {
      return startViewTransition(callback, recipe, options)
    },
    []
  )
}

// ──────────────────────────────────────────────────────────────────
// React 19.3 <ViewTransition> / addTransitionType
// ──────────────────────────────────────────────────────────────────

type ViewTransitionClass = string | Record<string, string>
export interface ViewTransitionProps {
  children?: React.ReactNode
  name?: string
  default?: ViewTransitionClass
  enter?: ViewTransitionClass
  exit?: ViewTransitionClass
  update?: ViewTransitionClass
  share?: ViewTransitionClass
}

const ReactVT = React as unknown as {
  ViewTransition?: React.ComponentType<ViewTransitionProps>
  addTransitionType?: (type: string) => void
}

/**
 * React's `<ViewTransition>` (stable in 19.3). On older React it renders its
 * children untouched, so a component can adopt it without raising the React
 * floor. BoldKit's recipes are available as classes: `enter="bk-stamp"`,
 * `"bk-hard-wipe"`, `"bk-color-block"`.
 */
export const ViewTransition: React.ComponentType<ViewTransitionProps> =
  ReactVT.ViewTransition ?? (({ children }: ViewTransitionProps) => <>{children}</>)

/** `addTransitionType` on React 19.3+, a no-op before it. Call inside startTransition. */
export const addTransitionType: (type: string) => void = ReactVT.addTransitionType ?? (() => {})

// Re-export the core helper so consumers don't need a second import
export { prefersReducedMotion }
```

## Usage

```tsx
import { Reveal, Motion, Stagger, useShake } from '@/components/ui/motion'

export default function Example() {
  return (
    <Reveal direction="up">
      <Motion as="button" press className="px-4 py-2 border-3 border-foreground bg-primary">
        Press me
      </Motion>
    </Reveal>
  )
}
```

## Examples

### Press — interactive shadow

The .bk-press recipe choreographs transform + a hard offset shadow on the snap curve. Hover lifts and grows the shadow; active presses into the page and collapses it; @media (hover:none) shortens duration so taps don't feel mushy.

```tsx
<button className="bk-press px-6 py-3 border-3 border-foreground bg-primary">
  Press me
</button>
```

### Stamp-in — hard entrance

An entrance with brutalist 'snap' easing. Scales and rotates slightly from zero, lands with a one-time overshoot. Use on mount for headlines, callouts, or post-action confirmations.

```tsx
<div className="bk-stamp-in px-6 py-3 border-3 border-foreground bg-accent">
  Stamped In
</div>
```

### Shake — imperative error feedback

useShake() returns a function that shakes a given element. Stepped easing for a hard back-and-forth instead of a smooth wobble. Pair with form validation for instant feedback.

```tsx
const shake = useShake()
const ref = React.useRef(null)

<input ref={ref} ... />
<Button onClick={() => shake(ref.current)}>Submit</Button>
```

### Pulse shadow — attention / loading

Pulses the pseudo-element shadow on an infinite loop. Never animates box-shadow — composited, mobile-safe. Use for pending states, attention prompts, or 'tap me' hints.

```tsx
<div className="bk-pulse-shadow inline-flex px-6 py-3 border-3 border-foreground bg-secondary">
  Pending…
</div>
```

### Stagger — sequenced entrance

<Stagger> assigns incrementing animation-delay to its direct children so they animate in sequence. Pairs with any bk-* entrance (stamp-in here). Tune delay and initialDelay to taste.

```tsx
<Stagger delay={80}>
  {items.map(label => (
    <div key={label} className="bk-stamp-in ...">{label}</div>
  ))}
</Stagger>
```

### Reveal — scroll-triggered

<Reveal> wraps any element. An IntersectionObserver fires reveal just before the element enters the viewport (rootMargin defaults to '0px 0px -10% 0px' — tuned for slow scroll on mobile). Direction selects which side it slides in from.

```tsx
<Reveal direction="up">
  <div className="...">Reveal up</div>
</Reveal>
```

### Architecture

Three layers, strictly ordered. L1 tokens and L2 recipes are pure CSS — every framework consumes them identically. L3 is a tiny adapter wrapping the shared motion-core. Adding Svelte/Solid/Qwik = ~150 LOC of wrapper code; the lower layers don't change.

```tsx
// L1 tokens (any framework, via plain CSS vars)
--bk-ease-snap:  cubic-bezier(0.2, 0.9, 0.1, 1.2);
--bk-ease-stamp: cubic-bezier(0.7, 0, 0.84, 0);
--bk-dur-snap:   150ms;

// L2 recipe (any framework, via class name)
.bk-press { /* GPU-composited shadow choreography */ }

// L3 adapter (React shown; Vue mirrors the surface)
<Motion press as="button">Click</Motion>
```

### Accessibility — reduced motion

The L1 CSS guard disables all bk-* animations when prefers-reduced-motion is set. motion-core also gates observeReveal, staggerChildren, and triggerAnimation so JS-driven motion respects the preference. Marquees slow rather than stop, so single-row content remains visible.

```tsx
@media (prefers-reduced-motion: reduce) {
  [class*="bk-press"],
  [class*="bk-stamp-in"],
  [class*="bk-reveal"] {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Loading states (v3.5)

The stepped vocabulary applied to waiting. Skeleton gains stamp / blocks / scan, Progress gains stepped / marquee, and ChartContainer gains a `loading` prop that swaps in a chart-shaped placeholder. Defaults are unchanged — existing code keeps its old look.

```tsx
<Skeleton variant="stamp" className="h-12 w-full" />
<Progress value={60} variant="stepped" />
<Progress variant="marquee" aria-label="Loading" />

<ChartContainer config={config} loading>
  <BarChart data={data} />
</ChartContainer>
```

### Page transitions (v3.5)

Three named View Transition recipes. Pass the recipe name as the second argument to startViewTransition() — it applies <html data-bk-transition> for that navigation only and restores the previous value when the transition finishes. Browsers without View Transitions fall back to an instant swap, and reduced-motion disables the animation entirely.

```tsx
import { startViewTransition } from '@/lib/motion-core'

// 'hard-wipe' | 'color-block' | 'stamp'
startViewTransition(() => navigate('/next'), 'hard-wipe')
```

### Element transitions (React 19.3)

React 19.3 made <ViewTransition> stable. BoldKit's motion module re-exports it (a passthrough on older React) and its recipes work as classes per element. Tag why a transition happened with addTransitionType() and pick a recipe per type. Vue and plain JS get the same branching from startViewTransition(cb, recipe, { types: ['next'] }) plus html:active-view-transition-type(next) in CSS.

```tsx
import { startTransition, useState } from 'react'
import { ViewTransition, addTransitionType } from '@/components/ui/motion'

function Slides() {
  const [i, setI] = useState(0)
  const go = (dir: 'next' | 'previous') =>
    startTransition(() => {
      addTransitionType(dir)
      setI((n) => n + (dir === 'next' ? 1 : -1))
    })
  return (
    <>
      <ViewTransition key={i} enter={{ next: 'bk-stamp', previous: 'bk-color-block', default: 'bk-stamp' }} exit="none">
        <div className="border-3 border-foreground p-6">Slide {i + 1}</div>
      </ViewTransition>
      <button onClick={() => go('previous')}>Prev</button>
      <button onClick={() => go('next')}>Next</button>
    </>
  )
}
```

### Theme reveal

Pass an origin to setTheme and the new theme wipes in as a circle growing from it — use the clicked element so keyboard activation works too. It ships in the use-theme hook / composable and needs no stylesheet. circularReveal(update, origin) does the same for any other swap, like applying a preset. Unsupported browsers, reduced motion and SSR fall back to an instant swap.

```tsx
import { useTheme, circularReveal } from '@/hooks/use-theme'

const { resolvedTheme, setTheme } = useTheme()

<button onClick={(e) => setTheme(resolvedTheme === 'light' ? 'dark' : 'light', { origin: e.currentTarget })}>
  Toggle theme
</button>

// Any other DOM / state change (React state is flushed for you):
circularReveal(() => applyPreset(preset), e.currentTarget)
```

### Mobile performance

Animates only transform and opacity (no box-shadow / width / height). Shadow motion via pseudo-element translate stays GPU-composited. :active fires kernel-level so taps have zero JS latency. @media (hover: none) tightens active duration so taps don't feel mushy. IntersectionObserver rootMargin fires reveals slightly early on slow scroll.

```tsx
/* Mobile-tuned hover/active branch */
@media (hover: none) {
  .bk-press,
  .bk-press::after {
    transition-duration: var(--bk-dur-instant); /* 80ms */
  }
}
```

