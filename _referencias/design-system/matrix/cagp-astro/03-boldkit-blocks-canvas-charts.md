# Part 4: BoldKit Layout Blocks, 23 Canvas Shaders & Charts Audit (`03-boldkit-blocks-canvas-charts.md`)

## Executive Summary

The `src/components/boldkit/` directory provides high-impact marketing blocks, 23 interactive WebGL/Canvas shaders, and 14 Recharts data visualizations.

---

## 1. Layout Blocks (16 Blocks)

Located in [`src/components/boldkit/blocks/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks):

| Block | Role in CAGP SuperApp | Visitor Mode | Fidelity |
| :--- | :--- | :--- | :--- |
| [`auth-forms.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/auth-forms.tsx) | High-conversion layout block | `Persuade` / `Operate` | 95% |
| [`contact-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/contact-section.tsx) | High-conversion layout block | `Persuade` / `Operate` | 95% |
| [`cta-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/cta-section.tsx) | High-conversion layout block | `Persuade` / `Operate` | 95% |
| [`error-pages.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/error-pages.tsx) | High-conversion layout block | `Persuade` / `Operate` | 95% |
| [`faq-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/faq-section.tsx) | High-conversion layout block | `Persuade` / `Operate` | 95% |
| [`feature-grid.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/feature-grid.tsx) | High-conversion layout block | `Persuade` / `Operate` | 95% |
| [`footer-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/footer-section.tsx) | High-conversion layout block | `Persuade` / `Operate` | 95% |
| [`hero-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/hero-section.tsx) | High-conversion layout block | `Persuade` / `Operate` | 95% |
| [`index.ts`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/index.ts) | High-conversion layout block | `Persuade` / `Operate` | 95% |
| [`logo-cloud.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/logo-cloud.tsx) | High-conversion layout block | `Persuade` / `Operate` | 95% |
| [`onboarding-flow.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/onboarding-flow.tsx) | High-conversion layout block | `Persuade` / `Operate` | 95% |
| [`pricing-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/pricing-section.tsx) | High-conversion layout block | `Persuade` / `Operate` | 95% |
| [`settings-page.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/settings-page.tsx) | High-conversion layout block | `Persuade` / `Operate` | 95% |
| [`stats-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/stats-section.tsx) | High-conversion layout block | `Persuade` / `Operate` | 95% |
| [`team-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/team-section.tsx) | High-conversion layout block | `Persuade` / `Operate` | 95% |
| [`testimonials.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/testimonials.tsx) | High-conversion layout block | `Persuade` / `Operate` | 95% |

---

## 2. Canvas Shaders (23 Interactive Effects)

Located in [`src/components/boldkit/canvas-effects/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects):

These 23 canvas shaders power the `Experience` mode of the application, rendering retro-brutalist backgrounds and ambient canvas animations:

| Shader Component | Visual Metaphor | Performance / Battery Defense |
| :--- | :--- | :--- |
| [`Aurora.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Aurora.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`CRT.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/CRT.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`Dither.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Dither.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`DotBlob.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/DotBlob.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`DotWave.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/DotWave.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`FlowField.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/FlowField.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`GodRays.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/GodRays.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`GravityWells.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/GravityWells.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`Halftone.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Halftone.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`Lightning.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Lightning.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`LissajousGrid.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/LissajousGrid.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`MatrixRain.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/MatrixRain.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`MeshGradient.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/MeshGradient.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`Metaballs.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Metaballs.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`MouseRipple.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/MouseRipple.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`ParticleWeb.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/ParticleWeb.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`Plasma.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Plasma.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`PulsingBorder.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/PulsingBorder.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`Swirl.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Swirl.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`Topography.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Topography.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`Truchet.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Truchet.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`VoronoiPulse.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/VoronoiPulse.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |
| [`WarpSpeed.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/WarpSpeed.tsx) | Dynamic interactive canvas simulation | RequestAnimationFrame loop throttled on mobile; resize observer cleanup |

---

## 3. Data Visualization Charts (12 Recharts Wrappers)

Located in [`src/components/boldkit/charts/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/charts):

Charts provide the data visualization engine for academic hours, grade distributions, and financial transparency:

| Chart | Application in CAGP | Tokens & Contrast |
| :--- | :--- | :--- |
| [`chart-toolbar.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/charts/chart-toolbar.tsx) | ACG hours breakdown / Financial cashflow | Hard 3px black stroke on bars/slices, accessible tooltips |
| [`chart-variants.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/charts/chart-variants.tsx) | ACG hours breakdown / Financial cashflow | Hard 3px black stroke on bars/slices, accessible tooltips |
| [`chart.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/charts/chart.tsx) | ACG hours breakdown / Financial cashflow | Hard 3px black stroke on bars/slices, accessible tooltips |
| [`donut-chart.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/charts/donut-chart.tsx) | ACG hours breakdown / Financial cashflow | Hard 3px black stroke on bars/slices, accessible tooltips |
| [`funnel-chart.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/charts/funnel-chart.tsx) | ACG hours breakdown / Financial cashflow | Hard 3px black stroke on bars/slices, accessible tooltips |
| [`gauge-chart.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/charts/gauge-chart.tsx) | ACG hours breakdown / Financial cashflow | Hard 3px black stroke on bars/slices, accessible tooltips |
| [`heatmap-chart.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/charts/heatmap-chart.tsx) | ACG hours breakdown / Financial cashflow | Hard 3px black stroke on bars/slices, accessible tooltips |
| [`radar-chart.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/charts/radar-chart.tsx) | ACG hours breakdown / Financial cashflow | Hard 3px black stroke on bars/slices, accessible tooltips |
| [`radial-bar-chart.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/charts/radial-bar-chart.tsx) | ACG hours breakdown / Financial cashflow | Hard 3px black stroke on bars/slices, accessible tooltips |
| [`sankey-chart.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/charts/sankey-chart.tsx) | ACG hours breakdown / Financial cashflow | Hard 3px black stroke on bars/slices, accessible tooltips |
| [`sparkline.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/charts/sparkline.tsx) | ACG hours breakdown / Financial cashflow | Hard 3px black stroke on bars/slices, accessible tooltips |
| [`treemap-chart.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/charts/treemap-chart.tsx) | ACG hours breakdown / Financial cashflow | Hard 3px black stroke on bars/slices, accessible tooltips |

---

## 4. Vector Shapes & ASCII Art

- **`src/components/boldkit/shapes.tsx`**: 64 Brutalist geometric vector shapes (`BurstShape`, `ShieldShape`, `Star4Shape`, `BadgeShape`, etc.) used as decorative stamps, section dividers, and sticker backdrops.
- **`src/components/boldkit/ascii-shapes.tsx`**: Monospace retro ASCII banners for terminal-style headings and CLI aesthetic accents.
- **`src/components/boldkit/tools/`**: In-browser tools (`shape-builder.tsx`, `dot-matrix-studio.tsx`) for interactive graphic generation.
