Implement Apple HIG and Impeccable UX/UI remediation patches across the CAGP UFMG Super App Discente (`cagp-ufmg-superapp`) to resolve touch ergonomics, viewport/safe-area clipping, accessibility zoom and contrast, GPU compositing isolation, and typography defects for production release readiness.

Working directory: /home/gsathler/Nextcloud/Projects/cagp
Integrity mode: [OPEN: Integrity mode restrictions]

## Reference Material
- Apple Human Interface Guidelines and reference routing matrix: .agents/skills/apple-impeccable/
- Apple Design review skill: .agents/skills/apple-design/

## Requirements

### R1. Touch Target Geometry Enforcement
Ensure all interactive elements meet the minimum 44x44px hit target requirement across mobile, tablet, and desktop viewports, specifically fixing quick action header controls (V-01 in `SuperAppHeader.astro`), document reader disclosure accordions (V-02 in `documentos/[slug].astro`), floating back-to-top buttons (V-05 in `BackToTop.astro`), accessibility font-size steppers (V-06 in `SettingsA11ySection.tsx`), passport sheet segmented tabs (V-07 in `PassportSheet.tsx`), and campus transit action buttons (V-08 in `CampusSheet.tsx`).

### R2. Safe Areas, Viewport Units, and Layout Robustness
Accommodate hardware cutouts and dynamic browser chrome by using dynamic viewport units and safe-area environment variables: update mobile drawer padding to include `env(safe-area-inset-top)` (V-09 in `drawer.css`), replace naked `100vh` root sizing with `100dvh` (V-10 in `BaseLayout.astro`), constrain bottom sheet modals to `100svh` (V-11 in `BottomSheet.tsx`), include `env(safe-area-inset-bottom)` on floating docks (V-15 in `DesktopFloatingDock.tsx`), update sticky TOC height calculations to `100dvh` (V-18 in `documentos/[slug].astro`), enforce editorial line-length ceilings (Patch 6 in `documentos/[slug].astro`), and eliminate horizontal blowout on narrow viewports (Patch 7 in `SettingsVaultSection.tsx`).

### R3. Accessibility Agency and Contrast Compliance
Restore user accessibility control and meet WCAG 2.1 AA standards: remove viewport zoom restrictions (`maximum-scale=1`, `user-scalable=no`) and unblock pinch-to-zoom gesture cancellation (V-03 in `BaseLayout.astro`), and recalibrate foreground/background colors on the campaign banner to meet or exceed 4.5:1 contrast in default light theme (V-04 in `CampaignBanner.astro`).

### R4. Compositing Isolation, Font Rendering, and Aesthetics
Enhance rendering performance and typographic craft: apply GPU layer isolation (`isolation: isolate; transform: translateZ(0);`) to glass backdrop surfaces (V-12 in `global.css`), prevent synthetic glyph degradation with `font-synthesis: none` (V-14 in `global.css`), ensure cross-platform font smoothing with `-moz-osx-font-smoothing` (V-19 in `global.css`), bind reduced-transparency queries to backdrop utility classes (V-16 in `components.css`), [OPEN: Scope of V-17 neo-brutalist border redesign vs preserving 2px borders], and [OPEN: Scope of V-13 sub-11px typography scale adjustment].

## Acceptance Criteria

### Touch Ergonomics & Safe Areas
- [ ] All interactive buttons and summary disclosure controls in affected components measure >= 44x44px computed hit area across all breakpoints.
- [ ] Safe-area insets (`env(safe-area-inset-*)`) are applied to the mobile drawer, desktop floating dock, and modal sheets.
- [ ] Root layout uses `min-h-[100dvh]` and bottom sheets use `svh` units to prevent clipping when browser bars collapse/expand.
- [ ] Document reader content observes readable line lengths (<= 75ch) and settings vault layout does not horizontally overflow on 375px viewports.

### Accessibility & Visual Compliance
- [ ] Viewport meta allows user scaling and pinch-to-zoom gestures are not prevented by custom event listeners.
- [ ] Campaign banner text achieves at least 4.5:1 contrast against its background in default light mode.
- [ ] Glass surfaces apply hardware compositing isolation and reduced-transparency media queries function properly.
- [ ] Typography applies `font-synthesis: none` and dual-vendor font smoothing.

### Verification & Build Integrity
- [ ] Project builds cleanly via `npm run build` and passes `npm run typecheck` without errors.
- [ ] [OPEN: Additional verification mechanisms and test suites]
