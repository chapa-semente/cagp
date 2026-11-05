# Project: CAGP Super App — Apple Impeccable UX/UI Audit & Adversarial Critique

## Architecture & System Overview
- **Project**: CAGP UFMG Super App Discente (v3.0.0)
- **Stack**: Astro 7.4.4 (Static Site Generation), React 19, Tailwind CSS v4, TypeScript 5.7.3
- **Dev Server**: `npx astro dev --background` on port 4321 (monitored via `astro dev status`, stopped via `astro dev stop`)
- **Browser Automation**: Google Chrome 156 (`/usr/bin/google-chrome-stable`), Playwright Chromium 156 (via `NODE_PATH`), and Impeccable CLI v4.7.0 (`impeccable detect`)
- **Design Framework**: Apple Impeccable (116 Apple HIG guides, 45 Impeccable references, 7-phase routing matrix) + SuperApp UX Critique + Apple Design 5-Lens Review
- **Constraint**: Strictly read-only / benchmark mode. ZERO modification of project source files.

## Feature Inventory
| # | Feature / View | Description | Milestone | Source |
|---|----------------|-------------|-----------|--------|
| 1 | Dev Server Lifecycle | Background dev server start, status, logs, stop on port 4321 | M1 | Survey E1 |
| 2 | Live Browser Automation Runner | Playwright / Chromium script to automate page rendering, screenshots, and DOM capture | M1 | Survey E1 |
| 3 | Core Hub Route (`/`) | Home portal, SegmentedControl tabs (`#hoje`, `#apps`, `#cagp`, `#visao-completa`), PageHeader | M1, M2 | Survey E2 |
| 4 | Academic Guide Routes (`/curso`, `/calouros`, `/pesquisa`, `/sobre`, `/gestao`) | Multi-tab institutional and academic guides with 21 sub-views | M1, M2 | Survey E2 |
| 5 | Curriculum & Matrix Tools (`/percurso`, `/acg`, `/estagio`, `/tcc`) | Grafo Dinâmico 10P, Calculadora 600h, Guardião 120d, Simulador Art. 41, Dossiê 3000h | M1, M2 | Survey E2 |
| 6 | Document Vault & Readers (`/documentos`, 8x `/documentos/[slug]`) | Document archive and 8 editorial reader pages with reading progress and PDF chips | M1, M2 | Survey E2 |
| 7 | Support & Settings (`/faq`, `/configuracoes`, 3x redirects) | FAQ accordions, SettingsInteractive (A11y sliders, token backup), redirect landing cards | M1, M2 | Survey E2 |
| 8 | Global Overlays & Modals (6 dialogs) | Spotlight (⌘K), Passport, Campus (RU II), A11y & Settings, Shortcuts, Welcome Tour | M1, M2 | Survey E2 |
| 9 | Multi-Viewport & Dynamic Breakpoints | 390x844 (Mobile), 768px (Tablet), 1440x900 (Desktop), 1360px (Wide) inspection | M1, M2 | Survey E2, E3 |
| 10 | Interactive A11y Theme States | `data-a11y-font`, `data-a11y-contrast="high"`, Dyslexia mode, Reading ruler, Desktop dock | M1, M2 | Survey E2, E3 |
| 11 | Ergonomics & Touch Targets Audit | 44x44px minimum bounding box, target spacing, Thumb Zone bottom 35% placement | M2 | Survey E3 |
| 12 | Safe Areas & Viewport Units Audit | Hardware insets `env(safe-area-inset-*)`, Dynamic Island clearance, `100dvh`/`100svh` vs naked `100vh` | M2 | Survey E3 |
| 13 | Liquid Glass & Materials Parity Audit | Functional layer isolation, paired `backdrop-filter`, GPU acceleration, 0.5px hairline | M2 | Survey E3 |
| 14 | Dynamic Type, Contrast & Smoothing Audit | WCAG 4.5:1 text contrast, font synthesis suppression, antialiasing, line length 65-75ch | M2 | Survey E3 |
| 15 | Motion & Spring Physics Audit | Spring curves `cubic-bezier(0.25, 1, 0.5, 1)`, `:active` compression, tap highlight removal | M2 | Survey E3 |
| 16 | Strict Apple HIG Pre-Production Evaluation | Categorize violations (contrast, touch target, counterfeit brand, content glass, safe area) | M2, M3 | Survey E3 |
| 17 | Adversarial /grill-me Critique Synthesis | Comprehensive unvarnished report with severity ratings, root flaws, and actionable remedies | M3 | Survey E3 |
| 18 | Yoda Consultative Trade-offs | Socratic alignment questions and alternative design decisions for future production | M3 | Survey E3 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Live Browser Execution & State Capture | Start dev server on port 4321; run live browser automation across all 24 public routes, 48 sub-views, and 6 global modals; capture DOM metrics, responsive states, and theme variants | none | DONE |
| 2 | Apple Impeccable & HIG Multi-Route Audit | Run `run-audit.sh all` and `run-audit.sh critique` against live URLs; evaluate all 7 live browser dimensions; document strict pre-production HIG violations vs exploratory UX gaps | M1 | DONE |
| 3 | Adversarial /grill-me Critique Synthesis | Consolidate all empirical findings into an unvarnished adversarial critique report with severity classifications, root causes, concrete design remedies, and Yoda trade-offs | M2 | DONE |

## Interface Contracts & Data Flow
- **M1 -> M2**: Live browser capture logs, computed metrics JSON, DOM snapshots, and dev server status report at `.agents/teamwork/worker_m1/handoff.md`.
- **M2 -> M3**: Systematic audit matrix, categorized HIG violations table, Impeccable anti-pattern logs, and parity evaluations at `.agents/teamwork/reviewer_m2_1/handoff.md` and `.agents/teamwork/reviewer_m2_2/handoff.md`.
- **M3 -> Final**: Comprehensive markdown audit report and adversarial critique at `.agents/teamwork/orchestrator/CRITIQUE_REPORT.md` and summary in handoff.
