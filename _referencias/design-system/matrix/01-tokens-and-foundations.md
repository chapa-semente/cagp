# Part 1: Design Tokens, Styling Architecture & Primitives

This document establishes the foundational layer of both design systems. It examines the CSS architectures, token taxonomies, Tailwind CSS v4 configurations, border and shadow mechanics, motion systems, and runtime primitive dependencies.

---

## 1. Design Philosophies & Visual Identities

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Aesthetic Direction** | Clean, editorial neobrutalism. High contrast with softer, accessible pastel tint fills. | Aggressive, hyper-tactile brutalism. Heavy line weights, uppercase tracking, neon clash accents. |
| **Primary Border Width** | **`border-2`** (2px solid black) | **`border-3`** (3px solid foreground) |
| **Border Radius** | Moderately rounded: `--border-radius: 5px` (`rounded-base`) | Configurable: sharp (`rounded-none`), medium (`rounded-md`), or heavy pill (`rounded-full`). |
| **Shadow Engine** | Semantic variable `--shadow: 4px 4px 0px 0px var(--border)` (`shadow-shadow`). | Direct HSL hard offset: `shadow-[4px_4px_0px_hsl(var(--shadow-color))]`. |
| **Hover Transformation** | Shifts positive into shadow on hover (`hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none`). | Hard snap translation into shadow on hover and active (`active:translate-x-[4px] active:translate-y-[4px]`). |
| **Motion Physics** | Minimal, functional CSS transitions (marquee, orbit). | Custom brutalist physics engine: stepped easing, stamps, rubber bounds, and 6 button animations. |
| **Underlying Primitives** | Hybrid: `@base-ui/react` + Radix UI + shadcn UI. | Pure Radix UI (`radix-ui`) across all interactive primitives. |

---

## 2. CSS Variable Architecture & Tailwind v4 Theme

### 2.1 Neobrutalism.com Theme Structure
Neobrutalism defines its palette using modern OKLCH and HSL color values inside a Tailwind v4 `@theme inline` block:

```css
/* neobrutalism/styling/globals.css */
:root {
  --border-radius: 5px;
  --box-shadow-x: 4px;
  --box-shadow-y: 4px;
  --reverse-box-shadow-x: -4px;
  --reverse-box-shadow-y: -4px;

  --heading-font-weight: 700;
  --base-font-weight: 500;
  --base-font-family: var(--font-dm-sans), sans-serif;

  --background: hsl(214, 95%, 93%);
  --secondary-background: oklch(100% 0 0);
  --foreground: oklch(0% 0 0);
  --main-foreground: oklch(0% 0 0);

  --main: hsl(217, 100%, 66%);
  --border: oklch(0% 0 0);
  --ring: oklch(0% 0 0);
  --overlay: oklch(0% 0 0 / 0.8);

  --shadow: var(--box-shadow-x) var(--box-shadow-y) 0px 0px var(--border);
}

@theme inline {
  --color-main: var(--main);
  --color-background: var(--background);
  --color-secondary-background: var(--secondary-background);
  --color-foreground: var(--foreground);
  --color-main-foreground: var(--main-foreground);
  --color-border: var(--border);
  --color-overlay: var(--overlay);
  --color-ring: var(--ring);

  --spacing-boxShadowX: var(--box-shadow-x);
  --spacing-boxShadowY: var(--box-shadow-y);
  --spacing-reverseBoxShadowX: var(--reverse-box-shadow-x);
  --spacing-reverseBoxShadowY: var(--reverse-box-shadow-y);

  --radius-base: var(--border-radius);
  --shadow-shadow: var(--shadow);
  --shadow-nav: 4px 4px 0px 0px var(--border);
}
```

### 2.2 BoldKit.dev Theme Structure
BoldKit structures its tokens around standard Shadcn HSL color conventions, supplemented by specialized Neon and Clash palettes, along with an L1 Motion token system:

```css
/* boldkit/styles/globals.css */
@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-primary: hsl(var(--primary));
  --color-secondary: hsl(var(--secondary));
  --color-accent: hsl(var(--accent));
  --color-muted: hsl(var(--muted));
  --color-destructive: hsl(var(--destructive));
  --color-border: hsl(var(--border));
  --color-ring: hsl(var(--ring));

  /* Neon Accents */
  --color-neon-pink: hsl(var(--neon-pink));
  --color-neon-green: hsl(var(--neon-green));
  --color-neon-blue: hsl(var(--neon-blue));
  --color-neon-orange: hsl(var(--neon-orange));
  --color-neon-purple: hsl(var(--neon-purple));

  /* Clash High-Contrast Fills */
  --color-clash-1: hsl(var(--clash-1));
  --color-clash-2: hsl(var(--clash-2));
  --color-clash-3: hsl(var(--clash-3));
  --color-clash-4: hsl(var(--clash-4));

  /* Motion Tokens (L1) */
  --bk-ease-snap: cubic-bezier(0.22, 1, 0.3, 1.12);
  --bk-dur-snap: 150ms;
  --bk-ease-step: steps(4, end);
  --bk-ease-stamp: cubic-bezier(0.7, 0, 0.84, 0);
  --bk-ease-rubber: cubic-bezier(0.34, 1.56, 0.64, 1);
  --bk-dur-instant: 80ms;
  --bk-dur-quick: 240ms;
  --bk-dur-base: 400ms;
  --bk-dur-slow: 700ms;
  --bk-shadow-offset: 4px;
}
```

---

## 3. Token Cross-Mapping & Harmonization

When merging components or selecting tokens in a single project, refer to this exact translation table:

| Purpose | Neobrutalism Class | BoldKit Class | Unified Universal Class | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Accent / Brand Color** | `bg-main` | `bg-primary` | `bg-primary` or `bg-main` | Map `--main: var(--primary)` in CSS for 100% interoperability. |
| **Text on Accent** | `text-main-foreground` | `text-primary-foreground` | `text-primary-foreground` | Always black (`oklch(0% 0 0)`) in brutalist styling. |
| **Border Stroke** | `border-2 border-border` | `border-3 border-foreground` | `border-2` or `border-3` | 2px looks crisper on dense UI; 3px gives tactile punch. |
| **Default Hard Shadow** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` | `shadow-hard` | `shadow-[4px_4px_0px_#000]` or `var(--shadow)`. |
| **Interactive Press** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px]` | `translate-press` utility | Both push the element into its shadow position on action. |
| **Corner Radius** | `rounded-base` (5px) | `rounded-none`, `rounded-md` (6px) | `rounded-base` | BoldKit allows `rounded-none` for raw retro brutalism. |
| **Typography Weight** | `font-base` (500), `font-heading` (700) | `font-bold` (700), uppercase tracking | `font-bold` | BoldKit emphasizes uppercase headers and badges. |

---

## 4. Motion & Animation Systems

### 4.1 Neobrutalism Animation Engine
Neobrutalism focuses on linear CSS loops:
- `animate-marquee`: Linear scrolling ticker (`5s linear infinite`).
- `animate-marquee2`: Offset companion ticker for seamless infinite looping.
- `animate-orbit`: Slow rotational planetary orbit (`180s linear infinite`).

### 4.2 BoldKit Motion System (`motion.css` & `motion-core.ts`)
BoldKit implements a full physics engine tailored to brutalism:
1. **Stepped Easing (`--bk-ease-step: steps(4, end)`)**: Emulates mechanical digital clocks and 8-bit stop-motion transitions.
2. **Stamp Easing (`--bk-ease-stamp`)**: Aggressive deceleration that impacts the screen like an ink rubber stamp.
3. **Snap Easing (`--bk-ease-snap`)**: Spring recoil with slight overshoot for button presses and toggle switches.
4. **Signature Interactive Keyframes**:
   - `brutal-pulse`: Periodic scale and border flash.
   - `brutal-bounce`: Rigid, non-squash displacement.
   - `brutal-shake`: Rapid horizontal jitter on hover (warning/error states).
   - `brutal-wiggle`: Rotational tick on hover.
   - `brutal-pop`: Scale-up on hover, snap back on release.

---

## 5. Primitives & Runtime Dependencies Matrix

| Package Category | Neobrutalism.com | BoldKit.dev | Agent Compatibility Recommendation |
| :--- | :--- | :--- | :--- |
| **UI Primitives Core** | `@base-ui/react` (`^1.8.0`) + `radix-ui` | `radix-ui` (`^1.7.0`) | Use `radix-ui` for universal Shadcn compatibility, or `@base-ui/react` for next-generation unstyled accessibility. |
| **Table Engine** | `@tanstack/react-table` `^9.2.4` | `@tanstack/react-table` `^8.21.3` | TanStack Table v8/v9 are structurally identical for basic brutalist tables. |
| **Charting Engine** | `recharts` `^3.10.1` | `recharts` `^3.9.2` | Fully compatible. BoldKit provides 19 specialized sub-primitives in `boldkit/ui/chart/`. |
| **Date Selection** | `react-day-picker` `^9.14.0` | `react-day-picker` `^10.0.2` | Note: `react-day-picker` v10 has breaking API changes from v9 in classNames props. |
| **Form State** | `react-hook-form` `^7.87.0` + `zod` | Independent state layer in `multi-step-form` | Neobrutalism `form.md` provides full React Hook Form patterns. |
| **Toast Notifications**| Custom Radix Dialog/Toast | `sonner` `^2.0.7` + First-party Paper Stack | Use BoldKit's `sonner.md` for modern stacking or `toast.md` for retro paper stacks. |
| **Drawer / Bottom Sheet** | Radix / Custom CSS Drawer | `vaul` `^1.1.2` | Both support mobile drawers seamlessly. |
| **Carousel** | `embla-carousel-react` `^8.6.0` | `embla-carousel-react` `^8.6.0` | 100% interoperable. |
