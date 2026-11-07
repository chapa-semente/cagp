# Part 5: Agent Decision Tree & Harmonization Playbook

This document is the actionable guide for AI coding agents and frontend engineers. It details how to select between Neobrutalism.com and BoldKit.dev for any given project requirement, how to harmonize tokens when using both simultaneously, and how to execute Shadcn CLI additions reliably.

---

## 1. Decision Flowchart by Use Case

```
                                  [UI Requirement]
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
         [Marketing & Polish]                           [Application & Logic]
                 │                                               │
        ┌────────┴────────┐                             ┌────────┴────────┐
        ▼                 ▼                             ▼                 ▼
[Landing Page / SaaS] [Playful / Retro]       [Data & Analytics]   [AI & Conversations]
        │                 │                             │                 │
  Use BoldKit       Use BoldKit                   Use BoldKit       Use Neobrutalism
  Blocks:           Extras:                       Charts + Tables:  Chat Primitives:
  • Hero / Bento    • CRT / Dither / Plasma       • ui/chart/*      • bubble / message
  • Pricing / FAQ   • ascii-shapes (3D)           • data-table      • attachment / marker
  • Testimonials    • motion.css animations       • statcard        • message-scroller
  • Stickers        • MathCurveLoader             • date-range-picker (or BoldKit m.author)
```

---

## 2. Selection Matrix by Feature Area

| Project Requirement | Primary Recommendation | Secondary / Alternative | Why This Selection? |
| :--- | :---: | :---: | :--- |
| **Marketing Landing Page** | **BoldKit.dev** | Neobrutalism.com | BoldKit provides 14 ready-made section blocks (`hero`, `bento`, `pricing`, `faq`, `footer`). |
| **Data Analytics Dashboard** | **BoldKit.dev** | Neobrutalism.com | BoldKit includes 14 specialized chart types with PNG/SVG export, toolbar, and stat cards. |
| **AI Agent / Chat Interface** | **Neobrutalism.com** | BoldKit (`m.author`) | Neobrutalism breaks chat down into 5 independent modular primitives (`bubble`, `message`, etc.). |
| **Complex Multi-Step Forms** | **BoldKit.dev** | Neobrutalism (`form`) | BoldKit has `stepper`, `multi-step-form`, and `tag-input` built-in. |
| **Form Validation (Zod)** | **Neobrutalism.com** | BoldKit (`field`) | Neobrutalism includes full `react-hook-form` + `zod` boilerplate in `form.md`. |
| **Date Range Selection** | **BoldKit.dev** | Neobrutalism | BoldKit has dedicated `date-range-picker` with presets; Neo only has single `date-picker`. |
| **Ambient / Hero Visuals** | **BoldKit.dev** | Custom CSS | BoldKit provides 23 ready-to-run Canvas shaders (Aurora, MatrixRain, Topography, etc.). |
| **Clean Minimal Brutalism** | **Neobrutalism.com** | BoldKit | Neobrutalism uses 2px borders, pastel backgrounds, and softer curves (`rounded-base`). |

---

## 3. Token Harmonization Playbook

When an agent needs to combine components from both libraries in the same Next.js/Vite/Astro project, execute these 4 reconciliation steps in `globals.css`:

### Step 1: Unify Color Variables
Alias Neobrutalism's `--main` variable to BoldKit's `--primary`:

```css
:root {
  /* BoldKit Base */
  --primary: 217 100% 66%;
  --primary-foreground: 0 0% 0%;
  --border: 0 0% 0%;
  --shadow-color: 0 0% 0%;

  /* Neobrutalism Bridge Aliases */
  --main: hsl(var(--primary));
  --main-foreground: hsl(var(--primary-foreground));
  --secondary-background: 0 0% 100%;
}
```

### Step 2: Establish Consistent Border Width
Decide on an application-level stroke thickness rule:
- **Rule A (Pure 2px Editorial)**: Global search and replace `border-3 border-foreground` to `border-2 border-border`.
- **Rule B (Pure 3px Hyper-Brutal)**: Global search and replace `border-2 border-border` to `border-3 border-foreground`.
- **Rule C (Hybrid Container Strategy - Recommended)**: Use `border-3` for cards, layout blocks, dialogs, and sections; use `border-2` for dense inputs, badges, and table cells.

### Step 3: Align Hard Shadow Classes
Define a unified utility or CSS token:

```css
@theme inline {
  --shadow-hard: 4px 4px 0px 0px var(--border);
  --shadow-hard-lg: 6px 6px 0px 0px var(--border);
}
```

### Step 4: Reconcile Interactive Transforms
Harmonize the hover/active states so controls feel unified across the app:

```css
/* Universal brutalist press utility */
.brutal-press {
  transition: all 150ms cubic-bezier(0.22, 1, 0.3, 1.12);
}
.brutal-press:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px var(--border);
}
.brutal-press:active {
  transform: translate(4px, 4px);
  box-shadow: 0px 0px 0px 0px var(--border);
}
```

---

## 4. CLI Execution Recipes for Agents

### 4.1 Installing from Neobrutalism.com Registry
Run in project root:
```bash
npx shadcn@latest add "https://neobrutalism.com/r/<component-name>.json"
```
*Example for chat interface:*
```bash
npx shadcn@latest add "https://neobrutalism.com/r/bubble.json"
npx shadcn@latest add "https://neobrutalism.com/r/message.json"
npx shadcn@latest add "https://neobrutalism.com/r/attachment.json"
```

### 4.2 Installing from BoldKit.dev Registry
Run in project root:
```bash
npx shadcn@latest add "https://boldkit.dev/r/<component-name>.json"
```
*Example for dashboard analytics:*
```bash
npx shadcn@latest add "https://boldkit.dev/r/statcard.json"
npx shadcn@latest add "https://boldkit.dev/r/donutchart.json"
npx shadcn@latest add "https://boldkit.dev/r/date-range-picker.json"
```

---

## 5. Direct Code Porting Recipes

### Recipe A: Converting a Neobrutalism Component to BoldKit Aesthetic
1. Change `border-2 border-border` to `border-3 border-foreground`.
2. Change `shadow-shadow` to `shadow-[4px_4px_0px_hsl(var(--shadow-color))]`.
3. Add `active:translate-x-[4px] active:translate-y-[4px] active:shadow-none`.
4. Apply `uppercase font-bold tracking-wide` to labels and buttons.

### Recipe B: Converting a BoldKit Component to Neobrutalism Aesthetic
1. Change `border-3 border-foreground` to `border-2 border-border`.
2. Change `shadow-[4px_4px_0px_...]` to `shadow-shadow`.
3. Add `rounded-base` (5px radius).
4. Soften uppercase headings to normal title case with `font-heading`.
