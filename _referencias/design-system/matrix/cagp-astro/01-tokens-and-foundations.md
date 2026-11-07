# Part 2: Tokens, Tailwind v4 @theme, Typography & Safe-Area (`01-tokens-and-foundations.md`)

## Executive Summary

The foundational layer in `src/styles/` establishes the visual identity, physics, and ergonomics of the CAGP SuperApp. It bridges **Neobrutalism.com (rL9Ap)**, **BoldKit.dev**, and **Apple HIG safe-area constraints** within the modern **Tailwind CSS v4** architecture.

---

## 1. Style Architecture Overview

The styles directory (`src/styles/`) contains 12 specialized stylesheets imported sequentially by `global.css`:

| Stylesheet | File Size | Role & Layer | Primary Responsibilities |
| :--- | :--- | :--- | :--- |
| `global.css` | 24.1 KB | Core Entrypoint | `@theme` block, base typography, reset, focus rings, modo claro exclusivo. |
| `neobrutalism.css` | 2.5 KB | Token Substrate | CSS variables for `--radius`, `--border-w`, `--shadow-md`, Semente palette. |
| `boldkit.css` | 20.7 KB | Mechanical Dynamics | HSL shadow utilities, mechanical press transitions, slider/switch styles. |
| `animations.css` | 9.4 KB | Keyframe Motion | Marquee scrolls, pulse rings, glitch text, card flips, spring easings. |
| `components.css` | 10.5 KB | Composite Classes | Complex composite layouts, badge pills, retro cards, table cell paddings. |
| `stamps.css` | 3.0 KB | Visual Metaphors | Postal stamp borders, official institutional seal overlays (`cagp-stamp`). |
| `passport.css` | 5.5 KB | Identity UI | Discente passport cards, avatar frames, Candango achievement badges. |
| `settings.css` | 2.0 KB | Preferences UI | Theme toggle controls, accessibility switches (dyslexic font mode). |
| `drawer.css` | 0.6 KB | Mobile Sheets | Vaul drawer drag handles, bottom sheet overlay blur and borders. |
| `sidebar.css` | 5.7 KB | Shell Navigation | Collapsible desktop sidebar transitions, active nav item pill highlights. |
| `navbar.css` | 3.3 KB | Header Shell | Sticky top bar blur, mobile hamburger menu animations. |
| `grafo.css` | 4.8 KB | Curriculum D3 | Interactive curriculum graph nodes, prerequisite edges, department hues. |

---

## 2. Tetra-Layer Brand Color Architecture

The application harmonizes four distinct institutional color layers:

```
[Layer 1: Roxo Semente (#5B2A86)] ── Primary Identity, Leadership, Purpose
[Layer 2: Laranja Germinar (#FF8811)] ── Energy, High-Conversion Call-to-Action
[Layer 3: Verde Petróleo (#134E4A)] ── Academic Success, ACG 600h, Estágio Art. 41 & Transparência
[Layer 4: Rubro CAGP/UFMG (#9E2424)] ── Institutional Memory, FAFICH, 120-Day AAC Critical Deadlines
```

### Tailwind v4 `@theme` Mapping

In `src/styles/global.css`:

```css
@theme {
  --color-background: var(--background, #f4f0ea);
  --color-foreground: var(--foreground, #16181d);
  --color-card: var(--card, #ffffff);
  --color-card-foreground: var(--card-foreground, #16181d);

  --color-primary: var(--primary, #5B2A86);
  --color-primary-hover: var(--primary-hover, #4A216E);
  --color-primary-foreground: var(--primary-foreground, #ffffff);

  --color-accent: var(--accent, #FF8811);
  --color-accent-hover: var(--accent-hover, #E07406);
  --color-accent-foreground: var(--accent-foreground, #000000);

  --color-petrol: var(--petrol, #134E4A);
  --color-petrol-hover: var(--petrol-hover, #0F3D3E);
  --color-petrol-foreground: var(--petrol-foreground, #ffffff);

  --color-secondary: var(--secondary, #9E2424);
  --color-secondary-hover: var(--secondary-hover, #8B1E2D);
  --color-secondary-foreground: var(--secondary-foreground, #ffffff);

  --color-muted: var(--muted, #e7e2d9);
  --color-muted-foreground: var(--muted-foreground, #4a4d57);
}
```

---

## 3. Typography Stack & Font Families

The typography system uses 4 Google/OpenSource font families imported via Fontsource:

1. **`Bricolage Grotesque`** (600, 700, 800):
   - Role: Hero headings, high-impact titles, editorial slogans.
   - Brutalist trait: High personality, exaggerated ink traps, expressive letterforms.
2. **`Space Grotesk`** (400, 500, 600, 700):
   - Role: Body copy, navigation links, UI buttons, and card descriptions.
   - Brutalist trait: Monospace-inspired proportions with proportional readability.
3. **`Space Mono`** (400, 700):
   - Role: Numerical stats, course codes (e.g. `DCP033`), timestamps, JSON data.
   - Brutalist trait: Strict tabular alignment, machine aesthetics.
4. **`OpenDyslexic`** (400, 700):
   - Role: User-selectable accessibility override for neurodivergent students.
   - Activated via `data-font-dyslexic="true"` on `<html>`.

---

## 4. Mobile Ergonomics & Apple HIG Compliance

### Adaptive Pointer Media Query Touch Floor (44x44pt)
To comply with Apple HIG touch standards without bloating desktop screen density:
```css
@media (pointer: coarse) {
  button, a[role="button"], input, select, textarea, [data-interactive="true"] {
    min-height: 44px;
    min-width: 44px;
  }
}
```

### Viewport & Safe-Area Configuration
`src/layouts/BaseLayout.astro` configures:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

### Bottom Navigation Safe-Area Handling
`src/components/shell/BottomNav.astro` explicitly accounts for iOS Home Indicator:
```html
<nav class="fixed bottom-0 left-0 right-0 z-50 bg-background border-t-3 border-border pb-[env(safe-area-inset-bottom)]">
```
