# Part 6: Apple-Compliant Brutalism Synthesis & Agent Decision Guide

This document presents the **"Apple-Compliant Brutalism" Framework**—an actionable methodology enabling AI agents and human frontend engineers to design software with intense, distinctive brutalist aesthetics while strictly fulfilling Apple's Human Interface Guidelines and passing App Store review without friction.

---

## 1. The "Apple-Compliant Brutalism" Framework

Brutalism and Apple design are often viewed as philosophical opposites: Apple champions quiet deference, subtle translucency, and optical softness; Brutalism champions exposed construction, thick black strokes, and unapologetic contrast.

However, when synthesized thoughtfully, **Apple-Compliant Brutalism** creates an extraordinarily engaging, tactile experience that feels fresh, high-craft, and entirely at home on Apple hardware.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       APPLE-COMPLIANT BRUTALISM MATRIX                      │
├────────────────────────────┬────────────────────────────────────────────────┤
│ What Stays Strictly Apple  │ • 44x44pt minimum interactive touch targets   │
│ (HIG Non-Negotiables)      │ • Safe-area insets (notches, home bars)        │
│                            │ • Unaltered Apple Pay & Sign in with Apple     │
│                            │ • Dynamic Type scaling & VoiceOver ARIA labels │
│                            │ • Edge-swipe system gesture preservation       │
├────────────────────────────┼────────────────────────────────────────────────┤
│ What Adopts Brutalism      │ • Solid 2px or 3px bounding borders           │
│ (Aesthetic & Affordance)   │ • Hard offset drop shadows (4px 4px 0px #000)  │
│                            │ • Opaque tactile paper layers (no fake glass)  │
│                            │ • High-contrast typography & uppercase badges  │
│                            │ • Physical press translations on interaction   │
└────────────────────────────┴────────────────────────────────────────────────┘
```

---

## 2. The 5 Golden Rules of Apple-Compliant Brutalism

### Rule 1: The 44pt Touch Target Mandate
Never allow an interactive button, toggle, or table row to measure less than 44x44 points on mobile devices.
- In BoldKit: Use default button size (`h-11 px-5` = 44px).
- In Neobrutalism: Override default `h-10` with `h-11` or wrap in a touch target container (`min-h-[44px] min-w-[44px]`).

### Rule 2: Keep System Payment & Auth Marks Sacred
Never attempt to render a brutalist hand-drawn Apple Pay button or custom Apple logo. Use Apple's official Web Component or native SDK button, and house it within a brutalist checkout container card.

### Rule 3: Trade Translucent Liquid Glass for Honest Paper Cards
Instead of applying muddy background blurs that risk text legibility failures, use solid, high-contrast card surfaces:
```tsx
// Apple-compliant brutalist surface
<div className="bg-card text-foreground border-3 border-foreground shadow-[4px_4px_0px_#000] p-6 rounded-md">
  {content}
</div>
```

### Rule 4: Harmonize Fluid Spring Physics with Hard Shadows
Pair Apple's natural spring recoil curves with brutalist translation into shadow. When tapped, the button translates 2px on press and 4px on active, snapping back via Apple-calibrated bezier curves (`cubic-bezier(0.22, 1, 0.3, 1.12)`).

### Rule 5: Respect System Accessibility Preferences
Honor `prefers-reduced-motion` and `prefers-color-scheme` automatically. In dark mode, invert the black border to pure white (`border-white`) and maintain the 4px hard shadow.

---

## 3. Agent Decision Trees

Use this decision tree when advising developers or generating UI code:

```
                            [Target Platform & Project Goal]
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         ▼                                 ▼                                 ▼
   [Apple App Store]              [Cross-Platform Mobile]             [Web / SaaS App]
(iOS / macOS Native App)          (React Native / Flutter)           (Next.js / Astro / Vite)
         │                                 │                                 │
Does client demand pure HIG?       Embrace Apple-Compliant           Choose based on mood:
  ├── YES -> Pure Apple HIG        Brutalism:                        ├── Editorial -> Neobrutalism
  └── NO  -> Apple-Compliant       • BoldKit h-11 buttons            └── High-Impact -> BoldKit
             Brutalism             • 3px solid cards                     (Blocks + Canvas Shaders)
                                   • Safe-area insets
                                   • Official Apple Pay
```

---

## 4. Code Implementation Recipes

### Recipe 1: Apple-Compliant Brutalist Button
```tsx
import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold uppercase tracking-wide border-3 border-foreground transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000]",
        secondary: "bg-secondary text-secondary-foreground shadow-[4px_4px_0px_#000]",
      },
      size: {
        // Strict 44pt height for Apple HIG compliance
        default: "min-h-[44px] h-11 px-6 py-2.5",
        lg: "min-h-[48px] h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export function AppleBrutalistButton({ className, variant, size, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
```

### Recipe 2: Apple-Compliant Bottom Sheet Drawer
```tsx
import { Drawer as DrawerPrimitive } from "vaul"
import { cn } from "@/lib/utils"

export function AppleBrutalistSheet({ children, trigger }: { children: React.ReactNode; trigger: React.ReactNode }) {
  return (
    <DrawerPrimitive.Root>
      <DrawerPrimitive.Trigger asChild>{trigger}</DrawerPrimitive.Trigger>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs" />
        <DrawerPrimitive.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col border-t-3 border-x-3 border-foreground bg-background p-6 rounded-t-xl shadow-[0px_-4px_0px_#000] pb-[env(safe-area-inset-bottom,24px)]">
          {/* Brutalist handle bar */}
          <div className="mx-auto h-2 w-16 rounded-full bg-foreground mb-6" />
          {children}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}
```
