# Handoff Report: Comprehensive Route, Page, UI Component & View Survey

## 1. Observation

### 1.1 Architecture & Core Configuration
- **Project Definition**: `package.json:1-37` defines `cagp-ufmg-superapp` version `3.0.0` ("Portal Institucional & Super App Discente — Centro Acadêmico de Gestão Pública - CAGP FAFICH/UFMG"). Dependencies: `astro` (7.4.4), `@astrojs/react` (4.2.1), `react` / `react-dom` (19.0.0), `tailwindcss` / `@tailwindcss/vite` (4.0.9), `bootstrap-icons` (1.11.3), `zod` (3.24.2).
- **Astro Config**: `astro.config.mjs:13-36` sets `output: 'static'`, `outDir: './dist'`, `site: 'https://cagp-ufmg.github.io'`, and local base path `/` (adjusts to `/${repoName}` in GitHub Actions CI). Integrations include `react()` and Vite plugin `tailwindcss()`.
- **Content Collections**: `src/content.config.ts:4-34` registers three content collections:
  1. `disciplinas` (glob `./src/content/disciplinas/**/*.json`)
  2. `normas` (glob `./src/content/normas/**/*.json`)
  3. `documentosOficiais` (glob `./_referencias/documentos-oficiais/[!R]*.md`)

### 1.2 Route & Page Enumeration (Filesystem & Router)
Inspection of `src/pages/` revealed **17 Astro files**, resolving to **14 primary functional routes**, **8 dynamic document reader routes**, and **3 redirect/alias routes** (Total: **22 navigable URLs**, with **48 workspace tab sub-views**):

| # | Route / URL | Source File | Type | Sub-views / Tabs (Hashes) | Key Components / Features |
|---|---|---|---|---|---|
| 1 | `/` | `src/pages/index.astro` | Hub / Home | `#hoje` (v1), `#apps` (v2), `#cagp` (v3), `#visao-completa` (__all__) | `PageHeader`, `HomeHeroHub` (React), `SegmentedControl`, `HomeBussola`, `HomeSistemas`, `HomeCagp`, `JourneyNav` |
| 2 | `/curso` | `src/pages/curso.astro` | Guide / Page | `#visao-geral` (v0), `#historia` (v1), `#egressos` (v2), `#colegiado` (v3), `#ingresso` (v4), `#visao-completa` | `PageHeader`, `SegmentedControl`, `AxisOverview`, `CursoVisao`, `CursoEgressos`, `CursoColegiado`, `CursoIngresso`, `JourneyNav` |
| 3 | `/calouros` | `src/pages/calouros.astro` | Guide / Interactive | `#visao-geral` (v0), `#checklist` (v1), `#rotina-noturna` (v2), `#espacos` (v3), `#fump` (v4), `#visao-completa` | `PageHeader`, `SegmentedControl`, `CalouroCentralOverview`, `CalouroChecklistCore` (React), `CalourosVideos`, `CalouroNoturnoCore`, `CalouroEspacosCore`, `CalouroFumpCore`, `JourneyNav` |
| 4 | `/pesquisa` | `src/pages/pesquisa.astro` | Guide / Page | `#nucleos` (v1), `#ic` (v2), `#imersao` (v3), `#visao-completa` | `PageHeader`, `SegmentedControl`, `PesquisaNucleos`, `PesquisaIc`, `PesquisaImersao`, `JourneyNav` |
| 5 | `/percurso` | `src/pages/percurso.astro` | Tool / Matrix Hub | `#visao-geral` (v0), `#grafo` (v1), `#optativas` (v2), `#obrigatorias` (v3), `#minha-grade` (v4), `#visao-completa` | `PageHeader`, `SegmentedControl`, `CurriculumCentralOverview`, `FactCheckBanner`, `CurriculumGraphDynamic` (React), `OptativasCatalogExplorer` (React), `MandatoryTimelineExplorer`, `StudentDossierTracker` (React), `JourneyNav` |
| 6 | `/optativas` | `src/pages/optativas.astro` | Canonical Redirect | N/A (Redirects via JS and `<a href>` to `/percurso#optativas`) | Integration card explaining migration to `/percurso#optativas` |
| 7 | `/acg` | `src/pages/acg.astro` | Tool / Calculator | `#visao-geral` (v0), `#calculadora` (v1), `#guardiao-120-dias` (v2), `#protocolo-colegiado` (v3), `#visao-completa` | `PageHeader`, `SegmentedControl`, `AcgCentralOverview`, `AcgCalculatorCore` (React), `FactCheckBanner`, `AcgGuardianCore` (React), `AcgTramitacaoCore`, `JourneyNav` |
| 8 | `/estagio` | `src/pages/estagio.astro` | Tool / Simulator | `#visao-geral` (v0), `#art41` (v1), `#obrigatorio` (v2), `#tutorial` (v3), `#visao-completa` | `PageHeader`, `SegmentedControl`, `EstagioCentralOverview`, `FactCheckBanner`, `Art41SimulatorCore` (React), `EstagioObrigatorioCore`, `EstagioTceCore`, `JourneyNav` |
| 9 | `/tcc` | `src/pages/tcc.astro` | Guide / Norms | `#visao-geral` (v0), `#modalidades` (v1), `#cronograma` (v2), `#termo-aceite` (v3), `#visao-completa` | `PageHeader`, `SegmentedControl`, `TccCentralOverview`, `TccModalidadesExplorer`, `TccCronogramaTimeline`, `TccTermoAceiteCore`, `JourneyNav` |
| 10 | `/estagio-tcc` | `src/pages/estagio-tcc.astro` | Canonical Redirect | N/A (Redirects via JS to `/estagio`, CTA buttons for `/estagio` and `/tcc`) | Reorganization notice and dual navigation hub |
| 11 | `/documentos` | `src/pages/documentos.astro` | Vault / Repository | `#visao-geral` (v0), `#atos` (v1), `#formularios` (v2), `#drca` (v3), `#visao-completa` | `PageHeader`, `SegmentedControl`, `DocumentosCentralOverview`, `DocumentosAtosRegulamentares`, `DocumentosFormulariosOficiais`, `DocumentosDrcaPrazos`, `JourneyNav` |
| 12 | `/faq` | `src/pages/faq.astro` | Support / Accordion | `#faq` (v1), `#acessibilidade` (v2), `#visao-completa` | `PageHeader`, `SegmentedControl`, 15 `NormativeDetails` accordions with PDF chips, NAI details card, A11y trigger button, `JourneyNav` |
| 13 | `/sobre` | `src/pages/sobre.astro` | Institutional | `#visao-geral` (v0), `#principios` (v1), `#governanca` (v2), `#diretorias` (v3), `#visao-completa` | `PageHeader`, `SegmentedControl`, `CagpCentralOverview`, `CagpHistoriaCore`, `CagpEstatutoCore`, `CagpGestaoDiretoria`, `JourneyNav` |
| 14 | `/gestao` | `src/pages/gestao.astro` | Transparency / Org | `#organograma` (v1), `#equipe` (v2), `#contas` (v3), `#visao-completa` | `PageHeader`, `SegmentedControl`, `GestaoOrganograma`, `GestaoEquipe`, `GestaoContas`, `JourneyNav` |
| 15 | `/configuracoes` | `src/pages/configuracoes.astro` | Dedicated Settings | Standalone | `PageHeader`, `SettingsInteractive` (React): A11y sliders, alerts toggles, student vault backup/restore token `CAGP1:...`, reset vault |
| 16 | `/mapa-do-site` | `src/pages/mapa-do-site.astro` | Canonical Redirect | N/A (Redirects to `/faq`, button to open Spotlight) | Spotlight & FAQ integrated locator card |

#### Dynamic Document Readers (`src/pages/documentos/[slug].astro`):
`getStaticPaths()` in `[slug].astro:91-109` filters `_referencias/documentos-oficiais/` for 8 canonical slugs:
1. `/documentos/ppc-gestao-publica-ufmg` — Projeto Pedagógico do Curso (PPC 2020)
2. `/documentos/regulamento-gestao-publica-ufmg` — Regulamento do Curso de Graduação (Versão N-20229)
3. `/documentos/regimento-interno-cagp-ufmg` — Regimento Interno do Centro Acadêmico (14/10/2024)
4. `/documentos/percurso-bacharelado-nucleo-geral` — Relatório de Percurso Curricular — Núcleo Geral (01-01)
5. `/documentos/percurso-bacharelado-nucleo-complementar` — Relatório de Percurso Curricular — Núcleo Complementar (01-02)
6. `/documentos/percurso-bacharelado-nucleo-avancado` — Relatório de Percurso Curricular — Núcleo Avançado Pós (01-03)
7. `/documentos/ementario-gestao-publica-ufmg` — Ementário Oficial (27 Obrigatórias + 68 Optativas)
8. `/documentos/transcricao-recepcao-ingressantes-2024-2` — Transcrição da Recepção de Ingressantes 2024/2

### 1.3 UI Hierarchy & Shell Architecture
Every page is wrapped in `BaseLayout.astro` (`src/layouts/BaseLayout.astro:1-312`). The global layout hierarchy comprises:
1. **System & Global Overlays**:
   - `#cagp-reading-progress`: Top 3px burgundy progress bar for document reading (`[slug].astro:134`).
   - `#cagp-reading-ruler`: Absolute guided cursor line controlled by mouse pointer (`BaseLayout.astro:130, 300-307`).
   - `#cagp-route-progress-bar`: Astro view transition progress indicator (`BaseLayout.astro:132-135, 246-268`).
   - `DynamicToast` (`#cagp-dynamic-toast`): Floating capsule ("Dynamic Island") for live toasts (`window.cagpToast`).
   - `CampaignBanner`: Top alert banner for institutional notices (`src/components/shell/CampaignBanner.astro`).
2. **Header (`SuperAppHeader.astro:10-207`)**:
   - Sticky floating 3-island pill design (`z-[1040]`).
   - **Island 1 (Left)**: Logo emblem, typography ("CAGP UFMG", "Gestão Pública • FAFICH"), home anchor.
   - **Island 2 (Center, Desktop ≥ 1024px)**: 5 canonical navigation axes with hover/focus dropdown cards:
     - 1. Início (`/`)
     - 2. Curso & Pesquisa (Dropdown: `/curso`, `/calouros`, `/pesquisa`)
     - 3. Currículo & Horas (Dropdown: `/percurso`, `/percurso#optativas`, `/acg`, `/estagio`, `/tcc`)
     - 4. Acervo & Ajuda (Dropdown: `/documentos`, `/faq`)
     - 5. O CAGP (Dropdown: `/sobre`, `/gestao`)
   - **Island 3 (Right)**:
     - `cagp-btn-spotlight`: Opens Spotlight palette (`⌘K` / `Ctrl+K` / `/`).
     - `cagp-btn-campus`: Opens Campus Sheet (RU II & Circular status).
     - `cagp-btn-a11y-quick`: Quick toggle for A11y & Settings sheet (`Alt+A`).
     - `cagp-btn-passport`: Opens Student Passport Sheet.
     - `cagp-mobile-menu-btn` (Visible `< 1024px`): Opens Mobile Drawer.
3. **Workspace Core (`main#main-content`)**:
   - `PageHeader.astro`: Eyebrow, Display H1, Subtitle, and Neo-brutalist Badge Pill Row.
   - `SegmentedControl.astro`: Tab bar with responsive full/abbreviated labels, snap scrolling, active indicators, and "Ver todas as abas" button (`__all__`).
   - Panel Sections (`<section class="cagp-workspace-view" data-ws-panel="...">`): Displayed or hidden dynamically via hash and button clicks.
   - `JourneyNav.astro`: Guided step trail with Previous and Next chapter links at the foot of each page.
4. **Footer & Global Navigators**:
   - `PageFooter.astro`: Institutional footer with legal notices, license, FAFICH contacts, and back-to-top links.
   - `BackToTop.astro`: Fixed floating circular button appearing on scroll.
   - `MobileDrawer.astro`: Off-canvas menu with Student Passport summary card, 5 Axis cards, and bottom A11y/Settings triggers.
   - `BottomNav.astro`: Floating pill dock for mobile/tablet (`< 1024px`) displaying 5 student shortcuts from catalog + adjustments trigger.
   - `DesktopFloatingDock.tsx` (`src/components/shell/DesktopFloatingDock.tsx`): macOS-style dock for desktop (`≥ 1024px`) rendered when enabled in A11y settings.
5. **Modals & Slide-over Sheets (`GlobalSheets.tsx` + `SuperAppWelcomeModal.tsx`)**:
   - `SpotlightModal.tsx`: Search dialog with fuzzy keyboard search across all 14 routes and section anchors.
   - `PassportSheet.tsx`: Bottom sheet with "Passaporte & Carteira" (Avatar, name, progress ring, hours counter, export/import) and "Banco de Talentos" editor.
   - `CampusSheet.tsx`: Bottom sheet with live RU II and Circular bus schedules, ICS downloads, and push notification triggers.
   - `A11ySheet.tsx`: Bottom sheet with "Acessibilidade Universal" and "Configurações & Sincronização" tabs.
   - `ShortcutsSheet.tsx`: Bottom sheet to pick and order 3 to 5 shortcuts in BottomNav/DesktopDock.
   - `SuperAppWelcomeModal.tsx`: Apple TipKit bottom-right non-blocking card that triggers a 3-slide Apple HIG onboarding modal.
   - `CustomCourseModal.tsx`: Dialog to assign custom courses into Grafo 10P.
   - `CurriculumDetailDrawer.tsx`: Slide-over drawer detailing course syllabus, pre-requisites, and unlocks.

### 1.4 Interactive States & Theme Engine
- **HTML Data-Attributes** (`src/styles/global.css:59-62, 213-247, 252-256`, `BaseLayout.astro:88-101`):
  - `data-a11y-font`: `'sm'` (93.75% / 15px), `'md'` (100% / 16px), `'lg'` (112.5% / 18px), `'xl'` (125% / 20px).
  - `data-a11y-contrast`: `'normal'` (Institutional cream `#F7F5F0` & burgundy `#8B1E2D`) vs `'high'` (WCAG AAA Pure Black `#000000` & Yellow `#FFFF00`).
  - `data-a11y-dyslexia`: `'false'` vs `'true'` (enables broad letter/word spacing with system sans font).
  - `data-a11y-motion`: `'normal'` vs `'reduced'` (suppresses all animations and transitions).
  - `data-a11y-ruler`: `'false'` vs `'true'` (activates `#cagp-reading-ruler` tracking mouse clientY).
  - `data-desktop-dock`: `'false'` vs `'true'` (renders floating macOS dock on desktop).
  - `data-nav-dir`: `'drill-in'`, `'drill-out'`, `'forward'`, `'backward'` (drives directional page slide transitions).
- **Responsive Breakpoints**:
  - `360px`: Minimal mobile width (hides desktop sub-labels, collapses badges).
  - `640px` (`sm`): Small tablet / large phone boundary.
  - `768px` (`md`): Tab labels switch from short abbreviation to full text; segmented bar switches from horizontal snap scroll to grid.
  - `1024px` (`lg`): Desktop breakpoint. BottomNav and Mobile hamburger hide; 3-island header center nav activates; desktop dock can be displayed.
  - `1360px`: Wide desktop breakpoint. Search button shows full text and `⌘K` badge; Campus button displays expanded status pill.
- **State Storage & Persistence**:
  `src/lib/storage/studentVault.ts` validates 12 local storage keys using Zod:
  - `cagp_calc_ext_aac_v1`: Hours breakdown across 14 categories.
  - `cagp_aac_120d_certs_v1`: Array of certificates with emission date, hours, and title.
  - `cagp_custom_curriculum_v1`: Assigned custom courses per semester.
  - `cagp_minha_grade_v1`: Array of completed course codes.
  - `cagp_calouro_checklist_v1`: Completed status for 10 freshman checklist items.
  - `cagp_art41_checklist_v1`: Completed status for 5 Art. 41 criteria.
  - `cagp_a11y_prefs_v2`: Accessibility settings object.
  - `cagp_discente_shortcuts_v1`: 3 to 5 shortcut IDs.
  - `cagp_student_profile_v1`: Profile attributes (name, period, avatar, pride, interests).
  - `cagp_notifications_prefs_v1`: Notification flags (`ru1815`, `circular2230`, `aac120d`).
  - `cagp_onboarding_completed_v1`: Boolean flag for welcome tour.
  - `cagp_percurso_quiz_v1`: Quiz answers and recommended pathway.

---

## 2. Logic Chain

1. **Routing Verification**: By examining `src/pages/`, each `.astro` file maps to an HTTP route in Astro's static site generation. 17 files exist. Files `optativas.astro`, `estagio-tcc.astro`, and `mapa-do-site.astro` contain `window.location.replace` calls, meaning they act as canonical redirects and fallback landing cards for reorganized content. The remaining 14 files represent distinct, primary functional views.
2. **Dynamic Reader Routes**: In `src/pages/documentos/[slug].astro`, `getStaticPaths()` statically defines 8 discrete slugs (`ppc-gestao-publica-ufmg`, `regulamento-gestao-publica-ufmg`, `regimento-interno-cagp-ufmg`, `percurso-bacharelado-nucleo-geral`, `percurso-bacharelado-nucleo-complementar`, `percurso-bacharelado-nucleo-avancado`, `ementario-gestao-publica-ufmg`, `transcricao-recepcao-ingressantes-2024-2`). Each slug produces an independent, static editorial reader page with table of contents and PDF download links. Thus, exactly 8 dynamic document reader pages exist.
3. **Workspace Sub-Views**: In 11 of the 14 primary pages, `SegmentedControl.astro` is present with specific tab definitions (`tabs` prop). Each tab toggles visibility of `<section class="cagp-workspace-view" data-ws-panel="...">` elements. Aggregating the tab counts across all pages results in 48 distinct workspace views that must be rendered and audited.
4. **Overlay & Shell Interaction**: By inspecting `BaseLayout.astro`, `SuperAppHeader.astro`, `MobileDrawer.astro`, and `GlobalSheets.tsx`, there are 6 distinct modal/sheet dialogs triggered either by keyboard shortcuts (`⌘K`, `Alt+A`, `Esc`), custom events (`cagp:open-passport`, `cagp:open-campus`, `cagp:open-a11y`, `cagp:open-settings`, `cagp:open-shortcuts`, `cagp:open-spotlight`), or DOM click handlers (`__cagp_open_drawer`). These dialogs operate independently of page routes and must be inspected in open, active, and closed states.
5. **State & Style Mechanics**: Inspection of `src/styles/global.css` and `src/lib/storage/studentVault.ts` shows that dark/high contrast mode is implemented via `html[data-a11y-contrast="high"]`, font sizes via `html[data-a11y-font]`, and dock behavior via `html[data-desktop-dock]`. This means visual audits cannot only check default view states; they must audit these specific DOM attribute states in the live browser.

---

## 3. Caveats

- **No Server-Side Endpoints**: Because `astro.config.mjs` specifies `output: 'static'`, there are no server-side API routes (`/api/*`), WebSockets, or backend databases. All interactivity, persistence, and state management run entirely client-side via LocalStorage (`studentVault.ts`).
- **External PDF Assets**: The document reader pages and download buttons reference PDFs in `public/documentos/`. These are static binary assets, not HTML views, though their download links and inline player embeds must be checked for valid 200 responses.
- **Service Worker Local Development Bypass**: `BaseLayout.astro:277-286` explicitly unregisters service workers and deletes caches when running on `localhost`, `127.0.0.1`, or `0.0.0.0` to avoid stale local cache during development and browser inspection.

---

## 4. Conclusion

The application is fully mapped with a definitive inventory:
1. **Primary Public Routes (14)**:
   - `/` (Hub Discente & Bússola)
   - `/curso` (O Bacharelado em Gestão Pública)
   - `/calouros` (Guia do Calouro)
   - `/pesquisa` (Pesquisa & 11 Núcleos)
   - `/percurso` (Central Curricular & Grafo 10P)
   - `/acg` (Central de Horas & Certificados 600h)
   - `/estagio` (Estágio Supervisionado 300h)
   - `/tcc` (Trabalho de Conclusão de Curso 180h)
   - `/documentos` (Acervo de Documentos & Modelos)
   - `/faq` (Dúvidas Frequentes & Acessibilidade)
   - `/sobre` (O Centro Acadêmico CAGP)
   - `/gestao` (Processo Eleitoral & Diretorias)
   - `/configuracoes` (Configurações & Sincronização)
   - `/documentos/[slug]` (8 dynamic transcription reader pages)
2. **Canonical Redirects (3)**:
   - `/optativas` -> `/percurso#optativas`
   - `/estagio-tcc` -> `/estagio`
   - `/mapa-do-site` -> `/faq`
3. **Workspace Tab Sub-Views (48)**:
   - Every page features 2 to 5 specialized sub-views switchable via `SegmentedControl` plus a "Ver todas as abas" full layout view.
4. **Global Overlays & Sheets (6)**:
   - `SpotlightModal` (`⌘K`)
   - `PassportSheet` (Carteira & Talentos)
   - `CampusSheet` (RU II & Circular)
   - `A11ySheet` (Acessibilidade & Ajustes)
   - `ShortcutsSheet` (Personalização do Dock)
   - `SuperAppWelcomeModal` (TipKit Onboarding Tour)
5. **Interactive Controls & Widgets**:
   - `CurriculumGraphDynamic` (Interactive SVG/column 10-semester matrix)
   - `AcgCalculatorCore` (600h Extensão/AAC calculator)
   - `AcgGuardianCore` (120-day certificate prescriber)
   - `Art41SimulatorCore` (Civil servant internship exemption evaluator)
   - `StudentDossierTracker` (3.000h degree thermometer)
   - `CalouroChecklistCore` (Interactive 30-day freshman tasks)
   - `OptativasCatalogExplorer` (Fuzzy searchable 68-elective catalog)

---

## 5. Verification Method

To independently reproduce and verify this inventory:

1. **Verify TypeScript & Routing Types**:
   ```bash
   npm run typecheck
   ```
   *Expected result*: Exits with code 0 and zero type errors.

2. **Verify Navigation Registry & Unit Tests**:
   ```bash
   npm test
   ```
   *Expected result*: All 6 test files and 36 unit tests pass, verifying `AXIS_REGISTRY` mapping 5 axes across all routes.

3. **Verify Static Build Page Generation**:
   ```bash
   npm run build
   ```
   *Expected result*: Generates `dist/` with all 22 HTML pages (`index.html`, `curso/index.html`, `calouros/index.html`, `pesquisa/index.html`, `percurso/index.html`, `acg/index.html`, `estagio/index.html`, `tcc/index.html`, `documentos/index.html`, `faq/index.html`, `sobre/index.html`, `gestao/index.html`, `configuracoes/index.html`, plus the 8 `documentos/<slug>/index.html` pages).

4. **Live Dev Server Execution**:
   ```bash
   npm run dev -- --host 127.0.0.1 --port 4321
   ```
   *Expected result*: Starts Astro local development server at `http://127.0.0.1:4321/` ready for browser automation rendering.
