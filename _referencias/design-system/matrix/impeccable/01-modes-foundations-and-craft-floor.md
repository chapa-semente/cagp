# Part 1: The 4 Visitor Modes & Quality Floor Correlation Matrix

This document provides an exhaustive, 3-layer architectural correlation crossing **Impeccable's 4 Visitor Modes (`Persuade`, `Operate`, `Read`, `Experience`) and Foundational Craft Rules (`craft-floor.md`)** with **Apple Design (HIG)**, **BoldKit.dev**, and **Neobrutalism.com**.

---

## Layer 2: Macro-Thematic Group Analysis

### 1. The 4 Modes as the Universal Design Arbiter
A critical insight of Impeccable is that **ambition must scale to the surface's mode** rather than applying a single design style everywhere:
- **Persuade (Action & Decision)**: Where design is the product (Landing pages, pricing, marketing). Here, **BoldKit shines supreme** with 14 marketing layout blocks, ambient canvas shaders, and eye-catching sticker badges.
- **Operate (Task Completion & Productivity)**: Where utility, density, and consistency outrank expression (Dashboards, settings, editors). Here, **Apple HIG's desktop conventions** and **Neobrutalism's structured form fields** combine with BoldKit's `dashboard-layout.tsx` to ensure speed and scanability.
- **Read (Comprehension & Focus)**: Where the reading experience must be distraction-free (Docs, changelogs). Apple HIG's **Dynamic Type and optical sizing** govern the text hierarchy, while Neobrutalism provides high-contrast code blocks (`code.css`).
- **Experience (Immersion & Showcase)**: Where the interface recedes and the artifact leads (Galleries, portfolios, games). BoldKit's 23 WebGL/Canvas shaders and 3D ASCII shapes take center stage.

### 2. The Craft Floor (`craft-floor.md`) as the Quality Gate
Impeccable's `craft-floor.md` defines the absolute baseline quality floor that applies to all frontend code before any stylistic layer is added. It prevents:
- *Accidental Brutalism*: Sloppy layout, inconsistent borders, missing hover states, or unstyled raw text disguised as "brutalist".
- *Bland Minimalism*: Timid, low-contrast, generic purple-gradient SaaS templates disguised as "clean Apple design".

---

## Layer 3: 10 Individual Quadripartite Technical Cards

### 1.1 `mode-persuade.md` — Persuade Mode (Marketing & Action)

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/mode-persuade.md`](../../impeccable/skill/reference/mode-persuade.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/branding.md, apple-pay.md` |
| **BoldKit.dev Correlation** | `boldkit/blocks-code/marketing/* (14 blocks), canvas-effects/` |
| **Neobrutalism Correlation** | `neobrutalism/examples/ (marketing showcases)` |
| **Common Ground** | Both recognize that marketing surfaces require high visual impact, clear value propositions, and zero-friction calls to action. |
| **Quadripartite Particularities** | Apple uses high-end photography, subtle blur overlays, and video; BoldKit provides ready-to-deploy bento grids, pricing cards, and interactive canvas backgrounds; Neobrutalism uses flat pastel cards. |

**Web / React Implementation Recipe**:
- Deploy BoldKit `<HeroSection>`, `<BentoGrid>`, and `<PricingSection>` blocks. Pair with Apple-compliant `<ApplePayButton>` in the checkout tier.

---

### 1.2 `mode-operate.md` — Operate Mode (Productivity & Task Execution)

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/mode-operate.md`](../../impeccable/skill/reference/mode-operate.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/designing-for-macos.md, split-views.md` |
| **BoldKit.dev Correlation** | `boldkit/blocks-code/application/dashboard-layout.tsx, ui/data-table.tsx` |
| **Neobrutalism Correlation** | `neobrutalism/ui/data-table.md, form.md` |
| **Common Ground** | Prioritizes information density, keyboard navigation, instant scanability, and predictable component behavior over decorative flair. |
| **Quadripartite Particularities** | Apple uses translucent source lists and system toolbars; BoldKit provides a rigid 3px bordered dashboard shell with TanStack Table and Recharts; Neobrutalism provides clean form field wrappers. |

**Web / React Implementation Recipe**:
- Use BoldKit's `dashboard-layout.tsx` shell, muting decorative sticker stamps and using standard `border-2` or `border-3` data tables with sorting.

---

### 1.3 `mode-read.md` — Read Mode (Comprehension & Long-Form Text)

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/mode-read.md`](../../impeccable/skill/reference/mode-read.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/typography.md, Dynamic Type` |
| **BoldKit.dev Correlation** | `boldkit/styles/motion.css (reduced motion rules)` |
| **Neobrutalism Correlation** | `neobrutalism/styling/code.css, styling/globals.css (--font-dm-sans)` |
| **Common Ground** | Maximizing typographic readability, comfortable line lengths (60-75 characters), and accessible contrast. |
| **Quadripartite Particularities** | Apple uses San Francisco with optical sizing; Neobrutalism provides custom syntax-highlighted code blocks (`code.css`); BoldKit suppresses heavy keyframe animations in read mode. |

**Web / React Implementation Recipe**:
- Structure reading layouts with `max-w-3xl mx-auto prose dark:prose-invert`, setting line height to `leading-relaxed` and using high-contrast brutalist callout boxes.

---

### 1.4 `operate.md` — Operate Mode Deep Dive & Productivity Workflows

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/operate.md`](../../impeccable/skill/reference/operate.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/lists-and-tables.md, sidebars.md` |
| **BoldKit.dev Correlation** | `boldkit/blocks-code/application/settings-page.tsx, invoice.tsx` |
| **Neobrutalism Correlation** | `neobrutalism/ui/sidebar.tsx, table.tsx` |
| **Common Ground** | Multi-pane layouts, persistent sidebar navigation, master-detail views, and dense tabular data management. |
| **Quadripartite Particularities** | Apple manages master-detail via SplitViewController; BoldKit provides full settings blocks and client invoice templates; Neobrutalism uses Base UI sidebar primitives. |

**Web / React Implementation Recipe**:
- Implement a 3-pane responsive layout: `<Sidebar>` (navigation) + `<DataTable>` (master list) + `<Card>` (detail inspector pane).

---

### 1.5 `craft-floor.md` — The Universal Quality Floor & Absolute Bans

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/craft-floor.md`](../../impeccable/skill/reference/craft-floor.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/design-principles.md, accessibility.md` |
| **BoldKit.dev Correlation** | `boldkit/styles/globals.css (3px border baseline), motion.css` |
| **Neobrutalism Correlation** | `neobrutalism/styling/globals.css (2px border baseline)` |
| **Common Ground** | Zero tolerance for broken responsive layouts, unhandled overflow, illegible contrast, or missing interactive focus rings. |
| **Quadripartite Particularities** | Apple enforces 44pt touch targets and smooth animations; BoldKit enforces 3px strokes and hard 4px shadows; Impeccable bans generic AI tropes (purple gradient blobs, floating amorphous cards). |

**Web / React Implementation Recipe**:
- Audit all interactive elements with `focus-visible:ring-2 focus-visible:ring-black min-h-[44px]` before submitting code.

---

### 1.6 `new-work.md` — New Work: Preserving vs Replacing Visual Worlds

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/new-work.md`](../../impeccable/skill/reference/new-work.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/launching.md, onboarding.md` |
| **BoldKit.dev Correlation** | `boldkit/blocks/ (full library ecosystem)` |
| **Neobrutalism Correlation** | `neobrutalism/components/ (full library ecosystem)` |
| **Common Ground** | Evaluating incumbent code truth before making destructive redesigns; honoring user commitments. |
| **Quadripartite Particularities** | Apple requires brand continuity across updates; BoldKit and Neobrutalism offer complete modular sets for greenfield replacement worlds. |

**Web / React Implementation Recipe**:
- Inspect existing project code: if an existing design language is present, refine it; if replacing, swap in BoldKit/Neobrutalism components cleanly via Shadcn CLI.

---

### 1.7 `init.md` — Product Truth Formalization (PRODUCT.md)

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/init.md`](../../impeccable/skill/reference/init.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/branding.md` |
| **BoldKit.dev Correlation** | `boldkit/package.reference.json` |
| **Neobrutalism Correlation** | `neobrutalism/package.reference.json` |
| **Common Ground** | Anchoring design decisions to target personas, product mission, and functional non-negotiables. |
| **Quadripartite Particularities** | Apple formalizes brand identity in human-centric design briefs; Impeccable captures durable context in `PRODUCT.md`. |

**Web / React Implementation Recipe**:
- Run `npx impeccable init` or generate `PRODUCT.md` defining core user problem, audience, and visual world commitments.

---

### 1.8 `document.md` — Design System Reverse-Engineering (DESIGN.md)

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/document.md`](../../impeccable/skill/reference/document.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig-lookup.md` |
| **BoldKit.dev Correlation** | `boldkit/registry.json, styles/globals.css` |
| **Neobrutalism Correlation** | `neobrutalism/styling/globals.css` |
| **Common Ground** | Documenting color palettes, typography scales, spacing tokens, and component variants in a single source of truth. |
| **Quadripartite Particularities** | Apple documents system styles in HIG; BoldKit uses Shadcn `registry.json`; Neobrutalism uses Tailwind v4 `@theme inline`. |

**Web / React Implementation Recipe**:
- Generate `DESIGN.md` documenting `--color-primary`, `--border-width`, and shadow tokens to prevent design drift.

---

### 1.9 `region-map.md` — Viewport Region Architecture & Z-Index Pacing

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/region-map.md`](../../impeccable/skill/reference/region-map.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/layout.md` |
| **BoldKit.dev Correlation** | `boldkit/blocks-code/application/dashboard-layout.tsx` |
| **Neobrutalism Correlation** | `neobrutalism/examples/ (container structure)` |
| **Common Ground** | Decomposing viewports into functional zones: Header, Navigation Rail, Canvas/Stage, Inspector, and Status Bar. |
| **Quadripartite Particularities** | Apple uses standard window regions; BoldKit implements explicit grid regions in `dashboard-layout.tsx`. |

**Web / React Implementation Recipe**:
- Define viewport zones: `<header className="h-16 border-b-3 border-black">`, `<aside className="w-64 border-r-3 border-black">`, `<main className="flex-1 p-6">`.

---

### 1.10 `routing.md` — Context-Aware Command Routing Menu

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/routing.md`](../../impeccable/skill/reference/routing.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/design-principles.md` |
| **BoldKit.dev Correlation** | `boldkit/README.md` |
| **Neobrutalism Correlation** | `neobrutalism/README.md` |
| **Common Ground** | Connecting user requests directly to the appropriate specialized design playbook without manual guessing. |
| **Quadripartite Particularities** | Apple routes guidelines by device and pattern; Impeccable routes user requests to 24 specialized commands (`bolder`, `critique`, `polish`). |

**Web / React Implementation Recipe**:
- Match user prompts: "make this bolder" -> `bolder.md`; "review this screen" -> `critique.md`; "fix mobile" -> `adapt.md`.

---
