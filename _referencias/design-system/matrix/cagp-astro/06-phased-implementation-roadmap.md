# Part 7: The 5-Sprint Long-Running Future Execution Roadmap (`06-phased-implementation-roadmap.md`)

## Executive Summary

This roadmap serves as the **operational master plan for the Impeccable Master Skill** to execute the complete elevation and implementation of the CAGP SuperApp in future long-running sessions (e.g. using `/goal` or dedicated runs). It organizes tasks across **5 Sprints** optimized for static deployment on **GitHub Pages**, with strict **Quality Gates** and visitor-mode gap prioritization.

---

## 1. Visitor Mode Gap Priority Engine

All future improvements are prioritized using Impeccable visitor modes:

| Priority | Visitor Mode | Target Areas | Threshold / Acceptance Standard |
| :--- | :--- | :--- | :--- |
| **P0 Blocker** | `Operate` | Forms, data tables, touch targets | Minimum 44x44pt touch target; zero broken form submits; focus visible; zero electoral data leakage. |
| **P1 High** | `Persuade` | Hero blocks, vote funnels, CTAs, Tour | Bold mechanical press states; Tetra-Layer Semente colors; BoldKit Tour with 9 leaders. |
| **P2 Medium** | `Read` | Ementas, statutes, typography | Strict contrast >= 7:1; Dynamic Type scaling readiness; dyslexic font support. |
| **P3 Low** | `Experience`| Canvas shaders, sounds, haptics | 60fps frame rate defense on desktop; 30fps cap or static fallback on mobile / low battery. |

---

## 2. The 5-Sprint Execution Roadmap (GitHub Pages Target)

```
[Sprint 1: Tetra-Layer Tokens & CSS Foundations] ── Quality Gate: Zero CSS token drift; Verde Petróleo integrated
                        ↓
[Sprint 2: 91 UI Primitives & Radix Consolidation]── Quality Gate: 100% 44pt touch; @base-ui removed; 30fps shader cap
                        ↓
[Sprint 3: 5 Product Pillars & Feed Estático]     ── Quality Gate: Offline vault; backup sanitizado; announcements.json
                        ↓
[Sprint 4: Tour da Chapa & Funil Eleitoral]       ── Quality Gate: BoldKit Tour 9 líderes; .ics sync de 1 clique
                        ↓
[Sprint 5: PWA, Sensory & GitHub Pages Deploy]    ── Quality Gate: Full offline audit; zero server dependencies
```

### Sprint 1: Tetra-Layer Tokens & CSS Foundations
- **Objective**: Unify CSS variables into `@theme`, incorporate **Verde Petróleo** (`#134E4A`), configure the Pointer Media Query touch floor (`@media (pointer: coarse)`), and eliminate token redundancy between `global.css` and `neobrutalism.css`.
- **Target Files**: `src/styles/global.css`, `neobrutalism.css`, `boldkit.css`.
- **Impeccable CLI Commands**:
  - `impeccable doctor src/styles/`
  - `impeccable colorize --harmonize-tetra-layer src/styles/global.css`
- **Quality Gate**: Zero undefined CSS custom properties; verified light mode contrast >= 7:1 for text; `--color-petrol` available globally.

### Sprint 2: 91 UI Primitives, Radix Consolidation & Shader Throttling
- **Objective**:
  1. Refactor all 91 primitives in `src/components/ui/` to guarantee 44x44pt minimum touch targets on coarse pointers, focus-visible outlines, and 3px borders with active mechanical translations.
  2. Consolidate components onto `radix-ui`, removing `@base-ui/react` to shave ~45 KB gzipped.
  3. Update `canvas-effect-core.ts` to enforce a 30fps cap on viewports `< 768px`, rendering a static frame if battery `< 20%` or data-saver is active.
- **Target Files**: `src/components/ui/*.tsx`, `src/components/boldkit/lib/canvas-effect-core.ts`, `package.json`.
- **Impeccable CLI Commands**:
  - `impeccable audit src/components/ui/`
  - `impeccable harden src/components/ui/`
  - `impeccable optimize src/components/boldkit/canvas-effects/`
- **Quality Gate**: Every button, input, and interactive control passes Apple HIG 44x44pt touch check; zero layout truncation on 320px screens; mobile frame rate throttled safely.

### Sprint 3: The 5 Product Pillars, Sanitized Vault & Static Feed
- **Objective**:
  1. Build the mandatory first-time opening modal (`SuperAppWelcomeModal.tsx`) with Role Selection (`calouro`, `veterano`, `formando`, `ingressar`) and auto-selection of completed mandatory curriculum courses with irregularity adjustment.
  2. Implement dynamic widget reordering on the Home dashboard based on active persona.
  3. Sanitizar `exportVaultBackup()` in `src/lib/storage/backupVault.ts` to strictly exclude electoral vote keys.
  4. Implement `public/announcements.json` static feed fetcher with Service Worker notifications, unread badge on header bell, and local history drawer.
- **Target Files**: `src/components/shell/SuperAppWelcomeModal.tsx`, `src/pages/index.astro`, `src/lib/storage/backupVault.ts`, `src/lib/storage/studentVault.ts`, `public/announcements.json`.
- **Impeccable CLI Commands**:
  - `impeccable operate src/components/features/acg/`
  - `impeccable distill src/components/features/estagio/`
- **Quality Gate**: All calculators, simulators, and wizards operate purely client-side via `studentVault.ts` with zero external server dependencies; backup files contain zero political preference data.

### Sprint 4: Tour da Chapa Semente (BoldKit Tour) & Funil Eleitoral
- **Objective**:
  1. Implement the interactive leadership tour using BoldKit's `Tour` (`src/components/boldkit/ui/tour.tsx`), featuring the 9 leadership stops with photos, quotes, and direct buttons to the solutions each built in the portal.
  2. Add 1-click `.ics` calendar download buttons for voting days and AAC 120-day deadlines.
  3. Configure the `PUBLIC_ELECTION_ACTIVE` environment flag to allow instant post-election transition of `/chapa-semente` into the "Plano de Gestão Eleito 2026/2027".
- **Target Files**: `src/pages/chapa-semente.astro`, `src/components/boldkit/ui/tour.tsx`, `src/components/shell/CampaignBanner.astro`, `src/components/pwa/`.
- **Impeccable CLI Commands**:
  - `impeccable bolder src/pages/chapa-semente.astro`
  - `impeccable delight src/components/boldkit/ui/tour.tsx`
- **Quality Gate**: High emotional resonance, clear voting CTAs, functional WhatsApp share links, and seamless election accreditation flow.

### Sprint 5: PWA Offline-First, GitHub Pages Deployment & Final Polish
- **Objective**:
  1. Finalize Service Worker cache manifest for GitHub Pages (`output: 'static'`, subpath routing if needed).
  2. Complete Lighthouse PWA audit (offline readiness, responsive viewports, contrast).
  3. Validate full cross-platform compatibility across iOS Safari, Android Chrome, and Desktop.
- **Target Files**: `astro.config.mjs`, `public/manifest.webmanifest`, `src/lib/pwa/`.
- **Impeccable CLI Commands**:
  - `impeccable polish src/`
  - `impeccable review --strict`
- **Quality Gate**: 100% offline functionality verified via Lighthouse; smooth 60fps scrolling; 100% valid builds on GitHub Actions with zero runtime server costs; zero native mobile (Xcode/Android Studio) or desktop (Electron/Tauri) wrappers required.
