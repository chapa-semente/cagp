# Neobrutalism Design Systems Correlation Matrix: Neobrutalism.com & BoldKit.dev

Welcome to the **Master Correlation Matrix and Architectural Analysis** for the two leading Neobrutalist design ecosystems for React and Tailwind CSS:
1. **[Neobrutalism.com](https://neobrutalism.com)** (created by Samuel Breznjak)
2. **[BoldKit.dev](https://boldkit.dev)** (created by the BoldKit team)

This documentation suite provides an exhaustive, multi-part comparative analysis built specifically for AI coding agents and human frontend engineers. It cross-references every token, UI component, layout block, canvas effect, chart, and SVG shape across both repositories.

---

## Executive Summary & Consolidated Metrics

| Metric | Neobrutalism.com | BoldKit.dev | Consolidated Scope |
| :--- | :---: | :---: | :---: |
| **Total Cataloged Components** | **64** | **84** | **148 Component Specs** |
| **Direct 1:1 Shared Components** | 53 | 53 | **53 Overlapping UI Primitives** |
| **Unique / Exclusive Components** | 11 | 31 | **42 Distinct Components** |
| **Pre-built Layout Blocks** | — | **20** (14 Marketing, 6 App) | **20 Full Sections** |
| **Interactive Canvas 2D/WebGL Effects** | — | **23** | **23 Ambient Backgrounds** |
| **Brutalist Chart Engines** | Recharts (Integrated) | 14 Specialized + 19 Sub-primitives | **Complete Charting Suite** |
| **SVG & ASCII Decorative Shapes** | Integrated | 64 SVG Shapes + 12 3D ASCII | **76+ Decorative Elements** |
| **Primary Underlying Primitives** | `@base-ui/react` + Radix UI | Radix UI (`radix-ui`) | Dual Primitive Support |
| **Standard Border Width** | `border-2` (2px solid) | `border-3` (3px solid) | Hybrid Harmonization |
| **Shadow System** | CSS Var `shadow-shadow` | Hard HSL `4px 4px 0px hsl(...)` | Translation on hover/active |

---

## Architectural Taxonomy & Differences

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                            NEOBRUTALISM ECOSYSTEM                            │
├──────────────────────────────────────┬───────────────────────────────────────┤
│          Neobrutalism.com            │              BoldKit.dev              │
├──────────────────────────────────────┼───────────────────────────────────────┤
│ • Focus: Clean, minimal brutalism   │ • Focus: Bold, heavy brutalism with   │
│ • Border: 2px (cleaner line art)     │   motion, blocks, and canvas effects  │
│ • Primitives: @base-ui/react & Radix │ • Border: 3px (ultra-tactile)         │
│ • Shadows: Semantic tokens           │ • Primitives: Pure radix-ui           │
│   (boxShadowX, reverseBoxShadowX)    │ • Shadows: Direct HSL hard shadows    │
│ • Components: 64 modular items       │ • Motion: Built-in CSS keyframes      │
│ • Standalone Chat & AI Primitives    │   (pulse, bounce, shake, wiggle, pop) │
│   (bubble, message, marker, scroller)│ • Components: 84 modular items        │
│ • Documentation: Full examples       │ • Layout Blocks: 20 ready-to-use      │
│   per-component directory            │ • Extras: 23 Canvas effects + Charts  │
└──────────────────────────────────────┴───────────────────────────────────────┘
```

---

## Documentation Parts Index

The correlation matrix is divided into 5 focused modules to enable fast indexing by AI agents without token overflow:

1. **[Part 1: Tokens, Styling & Foundations (`01-tokens-and-foundations.md`)](01-tokens-and-foundations.md)**
   - Tailwind CSS v4 `@theme` vs CSS variable declarations.
   - Border scale (2px vs 3px) and radius (`rounded-base`).
   - Shadow mechanics (`shadow-shadow` vs `shadow-[4px_4px_0px_hsl(...)]`).
   - Motion engines, keyframes, and transitions.
   - Core runtime dependencies (`@base-ui/react` vs `radix-ui`, `date-fns`, `recharts`, TanStack Table).

2. **[Part 2: 1:1 Shared Components Comparative Matrix (`02-common-components-matrix.md`)](02-common-components-matrix.md)**
   - Complete side-by-side comparison for all **53 shared components**.
   - Literal file paths for documentation markdown, TSX source code, and examples.
   - Shadcn CLI installation commands for both registries.
   - API comparison: variants, sizes, animations, and underlying primitives.
   - Interoperability and conversion notes for each component.

3. **[Part 3: Asymmetric & Exclusive Components Catalog (`03-exclusive-components.md`)](03-exclusive-components.md)**
   - **11 Neobrutalism-exclusive components**: `attachment`, `bubble`, `direction`, `empty`, `form`, `image-card`, `item`, `marker`, `message`, `message-scroller`.
   - Structural mapping: How Neobrutalism's standalone chat primitives correlate with BoldKit's consolidated `m.author` (`mauthor.md` / `ui/mauthor.tsx`).
   - **31 BoldKit-exclusive components**: `ascii-shapes`, `aspect-ratio`, `date-range-picker`, `donutchart`, `dropzone`, `error-boundary`, `gaugechart`, `layered-card`, `math-curve-background`, `math-curve-progress`, `mathcurveloader`, `motion`, `multi-step-form`, `number-field`, `radarchart`, `radialbarchart`, `rating`, `separator`, `sonner`, `sparkline`, `statcard`, `stepper`, `sticker`, `tag-input`, `time-picker`, `timeline`, `tour`, `tree-view`, `visitors`.

4. **[Part 4: Pre-built Blocks, Canvas Effects & Visual Extras (`04-blocks-canvas-and-extras.md`)](04-blocks-canvas-and-extras.md)**
   - **20 BoldKit Pre-built Layout Blocks**: 14 Marketing sections (Hero, Bento Grid, Pricing, Features, FAQ, etc.) and 6 Application sections (Dashboard, Onboarding, Invoices, Settings, Auth, Errors).
   - **23 Canvas 2D / WebGL Effects**: Aurora, CRT, Dither, MatrixRain, Plasma, DotWave, GravityWells, Topography, and 15 others.
   - **Brutalist Chart Suite**: 14 Recharts layouts, custom toolbars, export utilities, and dark mode palettes.
   - **SVG & ASCII Shapes**: 64 brutalist badges, stars, seals, and 12 3D parametric ASCII geometries.

5. **[Part 5: Agent Decision Tree & Harmonization Playbook (`05-skill-decision-tree.md`)](05-skill-decision-tree.md)**
   - Flowchart decision tree: When to choose Neobrutalism.com vs BoldKit.dev.
   - Token Reconciliation Playbook: Step-by-step rules for combining both libraries in a single codebase without visual friction.
   - Porting guide: How to convert a 2px `@base-ui` component to a 3px `radix-ui` component and vice-versa.
   - Shadcn CLI installation recipes.

---

## Apple HIG & Tripartite Correlation Suite

6. **[Apple HIG & Neobrutalism Tripartite Master Suite (`apple-hig/README.md`)](apple-hig/README.md)**
   - **Exhaustive coverage of all 124 Apple HIG reference documents**.
   - **Layer 1: Master 124-Item Correlation Table** + Top 40 Critical Topics Deep Dive.
   - **Part 1: Getting Started & Foundations** (22 items: Apple's 8 Principles, Liquid Glass, Typography, Color, Motion, Accessibility).
   - **Part 2: Patterns & Workflows** (24 items: Modality, Onboarding, Settings, Accounts, Collaboration, etc.).
   - **Part 3: Complete 57 Components Matrix** (1:1 cross-mapping of all 57 Apple UI component guidelines).
   - **Part 4: Inputs & Technologies** (20 items: Keyboards, Gestures, Apple Pencil, Apple Pay, In-App Purchase, GenAI, Live Activities, Siri).
   - **Part 5: Cross-Platform Translations & HIG Code Audit** (Flutter, React Native, Tauri, Electron translation & App Store rejection traps).
   - **Part 6: Apple-Compliant Brutalism Synthesis** (framework and agent decision guide).

---

## Impeccable Quadripartite Correlation Suite

7. **[Impeccable & Quadripartite Master Suite (`impeccable/README.md`)](impeccable/README.md)**
   - **Comprehensive 4-way multivariate correlation crossing Impeccable, Apple HIG, BoldKit, and Neobrutalism**.
   - **Layer 1: Master Quadripartite 4-Way Table** (all 41 Impeccable specs) + Top 30 Critical Craft Intersections.
   - **Part 1: The 4 Visitor Modes & Quality Floor** (`Persuade`, `Operate`, `Read`, `Experience` & `craft-floor.md`).
   - **Part 2: Evaluation, Critique & Quality Auditing** (`critique`, `audit`, `audit.native`, `doctor`, `component-review`).
   - **Part 3: The Aesthetic Transformation Engine** (`bolder`, `quieter`, `distill`, `harden`, `polish`).
   - **Part 4: Sensory Craft: Motion, Color & Typeset** (`animate`, `colorize`, `typeset`, `layout`, `delight`, `overdrive`).
   - **Part 5: Adaptive Layouts & Layout Blocks** (`adapt`, `onboard`, `clarify`, `optimize` & 20 BoldKit blocks).
   - **Part 6: Subagent Swarm Playbook** (Autonomous swarm orchestration with the 4 Impeccable subagents).

---

## CAGP Astro SuperApp Implementation & Execution Blueprint

8. **[CAGP Astro SuperApp Implementation Suite (`cagp-astro/README.md`)](cagp-astro/README.md)**
   - **Comprehensive 1:1 audit and future execution blueprint for the 358+ files in `src/`**.
   - **Part 1A: Strategic Briefing & Campaign Tenets** (`00-briefing-and-vision.md`): Political context for Chapa Semente, vote-capture objectives, and student pain points by directorate.
   - **Part 1B: Product PRD & 5 Functional Pillars** (`00-product-spec-and-journeys.md`): Student personas (`calouro`, `veterano`, `formando`, `ingressar`) and functional workflows.
   - **Part 1C: Quadripartite Design Architecture** (`00-design-system-specification.md`): Tri-Layer Semente palette, 3px ink strokes, mechanical active press states, safe-area insets, and anti-conflict rules for `impeccable init`/`document`.
   - **Part 2: Tokens, Tailwind v4 @theme & Safe-Area** (`01-tokens-and-foundations.md`): Audit of 12 stylesheets in `src/styles/` and typography stack.
   - **Part 3: Exhaustive 92 UI Primitives Audit** (`02-ui-components-matrix.md`): 1:1 audit cards for all 92 UI components in `src/components/ui/`, 5-tier taxonomy, and 4-way compliance scores.
   - **Part 4: BoldKit Layout Blocks, 23 Canvas Shaders & Charts** (`03-boldkit-blocks-canvas-charts.md`): Audit of 17 layout blocks, 23 canvas shaders, 14 charts, and 64 vector shapes.
   - **Part 5: The 15 CAGP Feature Domains & 35 Companion Components** (`04-features-and-domain-modules.md`): 59 feature components across ACG, Calouros, Curriculum, Estágio, TCC, Transparência, plus all 35 page companion components.
   - **Part 6: Shell Navigation Islands, 22 Pages & PWA** (`05-shell-navigation-and-pages.md`): Global shell islands, 22 Astro pages, and PWA offline infrastructure.
   - **Part 7: The 5-Sprint Long-Running Future Execution Roadmap** (`06-phased-implementation-roadmap.md`): Master execution plan across 5 Sprints with strict Quality Gates and CLI playbooks.

---

## Master Audit, Verification & Red Flags Report

9. **[Master Audit, Verification & Red Flags Report (`AUDIT-AND-VERIFICATION.md`)](AUDIT-AND-VERIFICATION.md)**
   - **Complete 360° verification across all 30 matrix documents, raw reference folders, and real Astro codebase**.
   - **100% Component & Link Integrity**: Reconciled all 64 Neobrutalism components, 84 BoldKit components, 20 blocks, 23 canvas shaders, 124 Apple HIG references, 41 Impeccable specs, 358+ `src/` files, and verified 1,230+ markdown links (0 broken).
   - **Architectural Sanity Review**: Confirmed validity of "Apple-Compliant Brutalism" synthesis and defined boundary isolation rules.
   - **Severity Matrix (P0 to P3)**: Detailed diagnostics on student vault backup privacy (P0.1), mobile 44pt touch target floor (P0.2), mobile WebGL shader throttling (P1.1), headless `@base-ui` vs `radix-ui` duplication (P1.2), and campaign vs institutional decoupling flags (P2.1).

---

## Directory Mapping

```
_referencias/design-system/
├── README.md                           # Original dual-catalog index
│
├── matrix/                             # The Correlation Matrix Suite (This folder)
│   ├── README.md                       # Part 0: Master Index & Executive Architecture
│   ├── AUDIT-AND-VERIFICATION.md       # Master 360° Audit, Risk Diagnostics & Scorecard
│   ├── 01-tokens-and-foundations.md    # Part 1: Tokens, Styles & Foundations
│   ├── 02-common-components-matrix.md  # Part 2: 53 Shared Components 1:1
│   ├── 03-exclusive-components.md      # Part 3: 42 Exclusive Components Breakdown
│   ├── 04-blocks-canvas-and-extras.md  # Part 4: 20 Blocks, 23 Canvas & Extras
│   ├── 05-skill-decision-tree.md       # Part 5: Decision Tree & Harmonization
│   │
│   ├── apple-hig/                      # Apple HIG 124-reference Tripartite Suite
│   │   ├── README.md                   # Master 124-item table & Top 40 Deep Dive
│   │   └── 01..06-*.md                 # Modular HIG analysis files
│   │
│   ├── impeccable/                     # Impeccable Quadripartite Suite
│   │   ├── README.md                   # Master 4-way table & Top 30 Deep Dive
│   │   └── 01..06-*.md                 # Modular Impeccable playbook files
│   │
│   └── cagp-astro/                     # CAGP Astro SuperApp (src/) Implementation Suite
│       ├── README.md                   # Master 358-file table & Top 40 Deep Dive
│       ├── 00-briefing-and-vision.md   # Part 1A: Strategic Briefing & Campaign Tenets
│       ├── 00-product-spec-and-journeys.md # Part 1B: Product PRD & 5 Pillars
│       ├── 00-design-system-specification.md # Part 1C: Design System Spec & Anti-Conflict Rules
│       ├── 01-tokens-and-foundations.md# Part 2: Tokens, Tailwind v4 & Safe-Area
│       ├── 02-ui-components-matrix.md  # Part 3: 92 UI Primitives 1:1 Audit
│       ├── 03-boldkit-blocks-canvas-charts.md # Part 4: Blocks, 23 Shaders & Charts
│       ├── 04-features-and-domain-modules.md # Part 5: 15 Feature Domains
│       ├── 05-shell-navigation-and-pages.md # Part 6: Shell & 22 Astro Pages
│       └── 06-phased-implementation-roadmap.md # Part 7: 5-Sprint Execution Roadmap
│   ├── components/                     # 64 self-contained .md component docs
│   ├── ui/                             # 64 TypeScript .tsx component implementations
│   ├── examples/                       # Complete TSX example trees per component
│   ├── styling/                        # globals.css, code.css, marquee.css
│   ├── lib/                            # utils.ts, google-fonts.ts, site.ts
│   └── hooks/                          # use-mobile.ts
│
└── boldkit/
    ├── components/                     # 84 self-contained .md component docs
    ├── ui/                             # 93 TypeScript .tsx components (includes chart sub-primitives)
    ├── blocks/                         # 20 layout block .md docs (marketing & app)
    ├── blocks-code/                    # 20 full .tsx layout block implementations
    ├── canvas-effects/                 # 23 animated canvas .tsx implementations
    ├── extras/                         # canvas-effects.md, charts.md, shapes.md
    ├── styles/                         # globals.css, motion.css
    ├── lib/                            # canvas-effect-core, math-curves, motion-core, chart-export, utils
    └── hooks/                          # use-canvas-effect.ts, use-theme.tsx
```
