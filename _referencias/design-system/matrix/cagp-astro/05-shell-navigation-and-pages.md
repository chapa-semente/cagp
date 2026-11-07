# Part 6: Shell Navigation Islands, 22 Astro Pages & PWA Multiplatform Audit (`05-shell-navigation-and-pages.md`)

## Executive Summary

This document evaluates the global application shell (`BaseLayout.astro`, `src/components/shell/`) and all **22 Astro route pages** (`src/pages/`), analyzing mobile responsive transitions, Apple HIG navigation patterns, and PWA offline capabilities.

---

## 1. Global Shell & Navigation Islands (21 Components)

Located in [`src/components/shell/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell):

| Shell Island | Architecture Role | Ergonomics & Safe-Area |
| :--- | :--- | :--- |
| [`A11ySheet.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/A11ySheet.tsx) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`A11yTabContent.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/A11yTabContent.tsx) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`AppShellSidebar.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/AppShellSidebar.astro) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`AppShellSidebarIsland.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/AppShellSidebarIsland.tsx) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`AxisNavBar.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/AxisNavBar.astro) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`AxisOverview.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/AxisOverview.astro) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`BackToTop.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/BackToTop.astro) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`BottomNav.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/BottomNav.astro) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`BottomSheet.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/BottomSheet.tsx) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`CampaignBanner.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/CampaignBanner.astro) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`CampusSheet.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/CampusSheet.tsx) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`DynamicToast.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/DynamicToast.astro) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`GlobalCanvasBackdrop.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/GlobalCanvasBackdrop.tsx) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`GlobalSheets.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/GlobalSheets.tsx) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`PageFooter.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/PageFooter.astro) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`PassportSheet.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/PassportSheet.tsx) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`SettingsTabContent.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/SettingsTabContent.tsx) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`ShortcutsSheet.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/ShortcutsSheet.tsx) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`SpotlightModal.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/SpotlightModal.tsx) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`SuperAppHeader.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/SuperAppHeader.astro) | Responsive Island / Global Shell | Touch slop / safe-area configured |
| [`SuperAppWelcomeModal.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/SuperAppWelcomeModal.tsx) | Responsive Island / Global Shell | Touch slop / safe-area configured |

### Mobile vs Desktop Transition Architecture
- **Desktop (>= 1024px)**: `AppShellSidebarIsland.tsx` provides a collapsible, keyboard-navigable sidebar with icon badges and quick navigation shortcuts.
- **Mobile (< 1024px)**: Transitions seamlessly to `BottomNav.astro` (tab bar anchored to bottom with `pb-[env(safe-area-inset-bottom)]`) and `SuperAppHeader.astro` with an accessible hamburger trigger.
- **Global Sheets (`GlobalSheets.tsx`)**: Central Radix/Vaul controller hosting `A11ySheet`, `CampusSheet`, `PassportSheet`, and `ShortcutsSheet`.

### Multiplatform Scope & Strict Discard Policy
The application targets **iOS, Android, Tablets, Smartphones, and Generic Desktop** through a responsive, offline-first PWA on GitHub Pages:
- ❌ **Discard Only 1**: Separate native mobile codebases (`ios/` with Xcode/Swift/CocoaPods and `android/` with Android Studio/Gradle/Kotlin). The web PWA handles homescreen install, app icon, splash screen, and offline Service Worker support directly.
- ❌ **Discard Only 2**: Heavy desktop wrappers (`Electron` / `Tauri`). No compiling bulky `.exe` or `.dmg` binaries. Student browsers natively run the app with hardware-accelerated graphics.
- ✅ **Preserve Everything Else**: All 91 UI primitives, blocks, and responsive web components remain intact and active, adapting seamlessly between touch and mouse viewports.

---

## 2. Astro Pages Inventory (22 Route Pages)

Located in [`src/pages/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages):

| Route File | Path | Layout Architecture |
| :--- | :--- | :--- |
| [`404.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/404.astro) | [`src/pages/404.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/404.astro) | Standard BaseLayout with ClientRouter |
| [`acg.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/acg.astro) | [`src/pages/acg.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/acg.astro) | Standard BaseLayout with ClientRouter |
| [`calouros.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/calouros.astro) | [`src/pages/calouros.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/calouros.astro) | Standard BaseLayout with ClientRouter |
| [`chapa-semente.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/chapa-semente.astro) | [`src/pages/chapa-semente.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/chapa-semente.astro) | Standard BaseLayout with ClientRouter |
| [`configuracoes.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/configuracoes.astro) | [`src/pages/configuracoes.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/configuracoes.astro) | Standard BaseLayout with ClientRouter |
| [`curso.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/curso.astro) | [`src/pages/curso.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/curso.astro) | Standard BaseLayout with ClientRouter |
| [`[slug].astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/documentos/[slug].astro) | [`src/pages/documentos/[slug].astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/documentos/[slug].astro) | Standard BaseLayout with ClientRouter |
| [`documentos.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/documentos.astro) | [`src/pages/documentos.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/documentos.astro) | Standard BaseLayout with ClientRouter |
| [`estagio-tcc.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/estagio-tcc.astro) | [`src/pages/estagio-tcc.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/estagio-tcc.astro) | Standard BaseLayout with ClientRouter |
| [`estagio.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/estagio.astro) | [`src/pages/estagio.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/estagio.astro) | Standard BaseLayout with ClientRouter |
| [`faq.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/faq.astro) | [`src/pages/faq.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/faq.astro) | Standard BaseLayout with ClientRouter |
| [`gestao.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/gestao.astro) | [`src/pages/gestao.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/gestao.astro) | Standard BaseLayout with ClientRouter |
| [`index.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/index.astro) | [`src/pages/index.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/index.astro) | Standard BaseLayout with ClientRouter |
| [`mapa-do-site.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/mapa-do-site.astro) | [`src/pages/mapa-do-site.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/mapa-do-site.astro) | Standard BaseLayout with ClientRouter |
| [`[slug].astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/noticias/[slug].astro) | [`src/pages/noticias/[slug].astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/noticias/[slug].astro) | Standard BaseLayout with ClientRouter |
| [`index.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/noticias/index.astro) | [`src/pages/noticias/index.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/noticias/index.astro) | Standard BaseLayout with ClientRouter |
| [`optativas.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/optativas.astro) | [`src/pages/optativas.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/optativas.astro) | Standard BaseLayout with ClientRouter |
| [`percurso.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/percurso.astro) | [`src/pages/percurso.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/percurso.astro) | Standard BaseLayout with ClientRouter |
| [`pesquisa.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/pesquisa.astro) | [`src/pages/pesquisa.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/pesquisa.astro) | Standard BaseLayout with ClientRouter |
| [`sobre.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/sobre.astro) | [`src/pages/sobre.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/sobre.astro) | Standard BaseLayout with ClientRouter |
| [`tcc.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/tcc.astro) | [`src/pages/tcc.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/tcc.astro) | Standard BaseLayout with ClientRouter |
| [`transparencia.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/transparencia.astro) | [`src/pages/transparencia.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/transparencia.astro) | Standard BaseLayout with ClientRouter |

---

## 3. PWA & Offline Multiplatform Architecture

- **Manifest**: Located at `public/manifest.webmanifest`, defining app icons (192px, 512px, maskable), theme color (`#5B2A86`), and standalone display mode.
- **Service Worker**: Auto-generated via `scripts/generate-sw-manifest.mjs` during build, caching static assets, Google fonts, and offline pages.
- **Client Vault**: `src/lib/storage/studentVault.ts` ensures that students can record completed subjects, ACG hours, and personal notes without an active internet connection.
- **Election Credenciamento Modal (`PwaElectionCredenciamentoModal.tsx`)**: In-app voter mobilization trigger prompting students to pledge support and receive election reminders.
