# CAGP Astro SuperApp (`src/`) Quadripartite Correlation Matrix & Long-Running Execution Blueprint

> [!IMPORTANT]
> **Canonical Operational Substrate for the Impeccable Master Skill**: This directory houses the comprehensive, multivariate correlation matrix between the real codebase implementation in `src/` (Astro 7 SuperApp) and the four reference design systems (**Impeccable**, **Apple HIG**, **BoldKit.dev**, **Neobrutalism.com**). It serves as the authoritative foundation for planning and executing future elevation tasks.

---

## 1. Document Architecture & Reading Guide

The documentation suite is partitioned into 10 modular, tightly interlinked parts:

```
_referencias/design-system/matrix/cagp-astro/
├── README.md                                  # Part 0: Master Quadripartite Audit Table & Gap Inventory
├── 00-briefing-and-vision.md                  # Part 1A: Strategic Briefing & Electoral Campaign Guide
├── 00-product-spec-and-journeys.md            # Part 1B: Product PRD, 5 Functional Pillars & 4 Personas
├── 00-design-system-specification.md          # Part 1C: Quadripartite Design Architecture & Anti-Conflict Rules
├── 01-tokens-and-foundations.md               # Part 2: Tokens, Tailwind v4 @theme, Typography & Safe-Area
├── 02-ui-components-matrix.md                 # Part 3: Exhaustive 92 UI Primitives Audit & Compliance Scores
├── 03-boldkit-blocks-canvas-charts.md         # Part 4: Blocks, 23 Canvas Shaders, 14 Charts & Shapes Audit
├── 04-features-and-domain-modules.md          # Part 5: 15 CAGP Feature Domains vs Impeccable Modes & Apple HIG
├── 05-shell-navigation-and-pages.md           # Part 6: Shell Islands, 22 Astro Pages & PWA Multiplatform Audit
└── 06-phased-implementation-roadmap.md        # Part 7: The 5-Sprint Long-Running Future Execution Roadmap
```

### The Strategic & Operational Triad
1. **[Part 1A: Strategic Briefing & Electoral Campaign Guide (`00-briefing-and-vision.md`)](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/cagp-astro/00-briefing-and-vision.md)**:
   - Electoral campaign context for **Chapa Semente** running for **CAGP FAFICH/UFMG**.
   - Primary macro goal: Vote capture through radical proof of competence.
   - Dual mission: Short-term electoral victory + permanent, independent institutional legacy.
   - Student pain points mapped across the 9 leadership roles from `briefing_do_site.md`.
2. **[Part 1B: Product Requirements Document & User Journeys (`00-product-spec-and-journeys.md`)](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/cagp-astro/00-product-spec-and-journeys.md)**:
   - The 5 Functional Pillars: *Hoje & Campus*, *Vida Acadêmica & 600h*, *Reta Final*, *Transparência*, *Passaporte & Vault*.
   - The 4 Student Personas (`calouro`, `veterano`, `formando`, `ingressar`) and end-to-end user journeys.
3. **[Part 1C: Quadripartite Design Architecture & Anti-Conflict Rules (`00-design-system-specification.md`)](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/cagp-astro/00-design-system-specification.md)**:
   - Unified Quadripartite visual language (Neobrutalism + BoldKit + Apple HIG + Impeccable).
   - Tri-Layer brand palette: Primary Purple (`#5B2A86`), Secondary Red (`#9E2424`), Accent Orange (`#FF8811`).
   - Anti-conflict hooks ensuring `impeccable init` and `impeccable document` operate cleanly without duplicating docs.

### Technical Correlation Matrices (1:1 with `src/`)
4. **[Part 2: Tokens, Tailwind v4 @theme, Typography & Safe-Area (`01-tokens-and-foundations.md`)](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/cagp-astro/01-tokens-and-foundations.md)**:
   - Audit of 12 CSS files in `src/styles/`, `@theme` token definitions, and typography stack.
5. **[Part 3: Exhaustive 92 UI Primitives Audit & Compliance Scores (`02-ui-components-matrix.md`)](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/cagp-astro/02-ui-components-matrix.md)**:
   - Granular audit cards for all 92 UI primitives in `src/components/ui/`, 5-tier taxonomy, and 4-way compliance scoring.
6. **[Part 4: BoldKit Layout Blocks, 23 Canvas Shaders & Charts Audit (`03-boldkit-blocks-canvas-charts.md`)](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/cagp-astro/03-boldkit-blocks-canvas-charts.md)**:
   - Audit of 17 layout blocks, 23 interactive canvas shaders, 14 Recharts components, and 64 vector shapes.
7. **[Part 5: The 15 CAGP Feature Domains vs Impeccable Modes & Apple HIG (`04-features-and-domain-modules.md`)](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/cagp-astro/04-features-and-domain-modules.md)**:
   - Audit of 59 feature components across all 15 business domains (`acg`, `calouros`, `curriculum`, `estagio`, `tcc`, etc.).
8. **[Part 6: Shell Navigation Islands, 22 Astro Pages & PWA Multiplatform Audit (`05-shell-navigation-and-pages.md`)](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/cagp-astro/05-shell-navigation-and-pages.md)**:
   - Audit of global shell islands, 22 Astro pages, and PWA offline infrastructure.

### Execution Blueprint
9. **[Part 7: The 5-Sprint Long-Running Future Execution Roadmap (`06-phased-implementation-roadmap.md`)](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/cagp-astro/06-phased-implementation-roadmap.md)**:
   - Master execution plan for future long-running sessions across 5 Sprints with strict Quality Gates.

---

## 2. Quantitative Implementation Summary (`src/` vs Upstream)

| Layer in `src/` | Total Items | Full Custom | Upstream Adapted | Re-Export Proxy | Domain Exclusive | Missing Upstream |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Styles & Tokens (`src/styles/`)** | 12 files | 4 | 8 | 0 | 4 | 0 |
| **UI Primitives (`src/components/ui/`)**| 92 files | 12 | 69 | 0 | 11 | 0 |
| **BoldKit UI Re-Exports (`boldkit/ui/`)**| 80 files | 0 | 0 | 80 | 0 | 0 |
| **BoldKit Blocks (`boldkit/blocks/`)** | 17 files | 2 | 15 | 0 | 0 | 3 |
| **Canvas Shaders (`canvas-effects/`)** | 23 files | 0 | 23 | 0 | 0 | 0 |
| **Charts (`boldkit/charts/`)** | 14 files | 2 | 12 | 0 | 0 | 0 |
| **Feature Domains (`features/`)** | 59 files | 47 | 0 | 0 | 47 | 0 |
| **Shell & Layouts (`shell/` & `layouts/`)**| 22 files | 18 | 4 | 0 | 14 | 0 |
| **Astro Route Pages (`src/pages/`)** | 22 pages | 22 | 0 | 0 | 22 | 0 |
| **Client Storage & Utilities (`lib/`)** | 16 files | 14 | 2 | 0 | 12 | 0 |
| **TOTALS** | **357+ files** | **121** | **133** | **80** | **114** | **3** |

---

## 3. Top 40 Critical Codebase Intersections Deep Dive

| # | Codebase File in `src/` | Upstream Reference | 4-Way Compliance Status | Critical Craft Consideration |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `src/styles/global.css` | Neobrutalism tokens / BoldKit | IMP: 94% / HIG: 92% | Tailwind v4 `@theme` block provides single source of truth for brand colors. |
| 2 | `src/styles/neobrutalism.css` | Neobrutalism.com (rL9Ap) | IMP: 96% / BK: 90% | Enforces 3px ink border (`--border-w: 3px`) and 12px radius (`--radius: 0.75rem`). |
| 3 | `src/styles/boldkit.css` | BoldKit mechanical CSS | IMP: 92% / BK: 98% | Mechanical active press translations and hard HSL shadows. |
| 4 | `src/layouts/BaseLayout.astro` | Apple HIG Safe Area & PWA | HIG: 96% / IMP: 95% | `viewport-fit=cover`, apple-touch-icon, and offline service worker manifest. |
| 5 | `src/components/shell/AppShellSidebarIsland.tsx` | Apple HIG Split View / BoldKit | HIG: 92% / BK: 95% | Collapsible desktop navigation with active item pill highlights. |
| 6 | `src/components/shell/BottomNav.astro` | Apple HIG Tab Bar | HIG: 98% / IMP: 94% | Anchored bottom mobile nav with `pb-[env(safe-area-inset-bottom)]`. |
| 7 | `src/components/shell/GlobalSheets.tsx` | Radix Dialog / Vaul Drawer | HIG: 94% / IMP: 95% | Unified modal manager handling Accessibility, Campus, and Passport drawers. |
| 8 | `src/components/shell/GlobalCanvasBackdrop.tsx`| BoldKit Canvas Effects | BK: 96% / IMP: 90% | Ambient WebGL canvas simulation with responsive resize observers. |
| 9 | `src/components/ui/button.tsx` | Neobrutalism & BoldKit Button | IMP: 96% / HIG: 92% | CVA variants supporting Primary Purple, Secondary Red, and Germinar Orange. |
| 10 | `src/components/ui/card.tsx` | Neobrutalism Card | IMP: 95% / BK: 92% | 3px black stroke with hard 4px offset shadow (`shadow-md`). |
| 11 | `src/components/ui/CagpIcon.tsx` | Domain Exclusive | IMP: 94% / HIG: 90% | SVG sprite rendering campus and student union symbols. |
| 12 | `src/components/ui/CourseDetailDrawer.tsx` | Domain Exclusive / Vaul | HIG: 95% / IMP: 94% | Mobile-first slide-up drawer showing prerequisite chains and course syllabi. |
| 13 | `src/components/ui/stat-card.tsx` | BoldKit Stat Card | IMP: 95% / BK: 95% | Tabular metric card using Space Mono for numerical fidelity. |
| 14 | `src/components/ui/sticker.tsx` | Neobrutalism Sticker | IMP: 96% / NEO: 98% | Rotated brutalist badge with customizable angle and Semente colors. |
| 15 | `src/components/ui/NormativeDetails.astro` | Apple Disclosure / Neobrutalism | HIG: 92% / IMP: 94% | Collapsible accordion for official regulatory articles and CEPE norms. |
| 16 | `src/components/ui/SegmentedControl.astro` | Apple Segmented Control | HIG: 96% / IMP: 92% | High-contrast 3px border segmented view switcher. |
| 17 | `src/components/ui/data-table.tsx` | TanStack Table / BoldKit | IMP: 92% / BK: 90% | Searchable, paginated data grid for elective course listings. |
| 18 | `src/components/ui/dialog.tsx` | Radix Dialog / Apple HIG | HIG: 95% / IMP: 94% | Accessible modal backdrop with focus trapping and ESC key support. |
| 19 | `src/components/ui/drawer.tsx` | Vaul Drawer / Apple Sheet | HIG: 98% / IMP: 96% | Touch gesture dismissible bottom sheet for mobile interactions. |
| 20 | `src/components/ui/progress.tsx` | Radix Progress / BoldKit | IMP: 94% / BK: 92% | Mechanical progress indicator used for ACG and curriculum completion. |
| 21 | `src/components/features/home/HomeWorkspaceA.tsx` | Domain Exclusive | IMP: 96% / HIG: 92% | Adaptive dashboard responding to user persona stored in `studentVault.ts`. |
| 22 | `src/components/features/home/HomeCampusStatusWidget.tsx` | Domain Exclusive | IMP: 94% / HIG: 90% | Live status of university dining halls (RU) and campus night safety. |
| 23 | `src/components/features/acg/calculator/AcgCalculatorCore.tsx` | Domain Exclusive | IMP: 95% / BK: 90% | Interactive 600h extension calculator with real-time progress breakdown. |
| 24 | `src/components/features/acg/guardian/AcgGuardianCore.tsx` | Domain Exclusive | IMP: 98% / HIG: 92% | Proactive warning system tracking the strict 120-day certificate deadline. |
| 25 | `src/components/features/curriculum/graph/CurriculumGraphDynamic.tsx` | D3 / SVG Graph | IMP: 94% / BK: 90% | Interactive prerequisite graph mapping mandatory course progressions. |
| 26 | `src/components/features/curriculum/catalog/OptativasCatalogExplorer.tsx` | TanStack / Domain | IMP: 92% / BK: 90% | Department-filtered catalog indexing 95 elective course JSON files. |
| 27 | `src/components/features/estagio/art41/Art41SimulatorCore.tsx` | Domain Exclusive | IMP: 96% / HIG: 90% | Interactive eligibility simulator for public sector internship exemptions. |
| 28 | `src/components/features/estagio/tce/EstagioTceCore.astro` | Domain Exclusive | IMP: 92% / HIG: 88% | Automated internship agreement generator compliant with CEPE 02/2009. |
| 29 | `src/components/features/tcc/cronograma/TccCronogramaTimeline.astro` | Apple Timeline / Domain | HIG: 92% / IMP: 94% | Milestone tracker for TCC topic registration and defense deadlines. |
| 30 | `src/components/features/tcc/modalidades/TccModalidadesExplorer.astro` | Domain Exclusive | IMP: 94% / HIG: 90% | Comparative breakdown between Monograph and Scientific Article tracks. |
| 31 | `src/components/features/cagp/CagpTransparenciaPortal.tsx` | Domain Exclusive | IMP: 98% / HIG: 90% | Live cashflow portal demonstrating active financial transparency. |
| 32 | `src/components/features/cagp/estatuto/CagpEstatutoCore.astro` | Domain Exclusive | IMP: 94% / HIG: 88% | Full-text searchable internal regulations and student union statutes. |
| 33 | `src/components/features/calouros/checklist/CalouroChecklistCore.tsx` | Domain Exclusive | IMP: 95% / HIG: 92% | Interactive 30-day onboarding checklist stored locally in `studentVault`. |
| 34 | `src/components/features/calouros/noturno/CalouroNoturnoCore.astro` | Domain Exclusive | IMP: 96% / HIG: 90% | Survival guide for working students attending night classes at FAFICH. |
| 35 | `src/components/features/semente/CartaPropostaInteractive.tsx` | Domain Exclusive / Campaign | IMP: 98% / NEO: 95% | Interactive electoral program for Chapa Semente with direct vote CTAs. |
| 36 | `src/components/passport/AvatarRenderer.tsx` | Domain Exclusive | IMP: 94% / BK: 90% | Retro customizable avatar generator for the student passport. |
| 37 | `src/lib/storage/studentVault.ts` | LocalStorage / Encryption | HIG: 95% / IMP: 98% | Client-side privacy-first storage with zero remote telemetry. |
| 38 | `src/components/pwa/PwaElectionCredenciamentoModal.tsx` | Campaign Exclusive | IMP: 96% / HIG: 92% | Mobile modal mobilizing student voters and collecting election pledges. |
| 39 | `src/components/boldkit/canvas-effects/Topography.tsx` | BoldKit Canvas Effect | BK: 98% / IMP: 92% | Organic contour lines animating subtly behind hero sections. |
| 40 | `src/pages/index.astro` | Astro 7 Page | IMP: 96% / HIG: 94% | Main entrypoint hosting `BaseLayout` and `HomeWorkspaceA`. |

---

## 4. Operating Instructions for the Impeccable Master Skill

When executing audits, reviews, or future sprints using the `impeccable` skill:
1. **Always consult the Triad first**: Check `00-briefing-and-vision.md` for political intent, `00-product-spec-and-journeys.md` for student user stories, and `00-design-system-specification.md` for token constraints.
2. **Execute via the 5-Sprint Roadmap**: Review `06-phased-implementation-roadmap.md` to identify the active sprint, quality gates, and target file checklists.
3. **Respect Anti-Conflict Rules**: Do not allow `impeccable init` to overwrite `src/styles/` or `src/components/ui/`; this directory is already fully mapped.
