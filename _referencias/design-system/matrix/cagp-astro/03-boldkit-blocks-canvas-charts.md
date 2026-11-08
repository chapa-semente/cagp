# Part 4: BoldKit Layout Blocks, 23 Canvas Shaders & Charts Audit (`03-boldkit-blocks-canvas-charts.md`)

## Executive Summary

The `src/components/boldkit/` directory provides high-impact marketing and application blocks (20 real native components), 23 interactive WebGL/Canvas shaders operating at unconstrained 60fps, and Recharts data visualizations mirrored in `src/components/ui/`.

---

## 1. Layout Blocks (20 Real Native Blocks)

Located in [`src/components/boldkit/blocks/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks):

| Block | Role in CAGP SuperApp | Visitor Mode | Fidelity & Size |
| :--- | :--- | :--- | :--- |
| [`auth-forms.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/auth-forms.tsx) | Autenticação, login e credenciamento estudantil | `Persuade` / `Operate` | 100% (21.9 KB) |
| [`bento-grid.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/bento-grid.tsx) | Grade bento de destaques da gestão e diretoria | `Persuade` / `Operate` | 100% (8.3 KB) |
| [`changelog-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/changelog-section.tsx) | Histórico de versões e conquistas da Chapa Semente | `Read` | 100% (7.6 KB) |
| [`comparison-table.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/comparison-table.tsx) | Comparativo de modalidades de TCC e percursos | `Read` / `Operate` | 100% (14.2 KB) |
| [`contact-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/contact-section.tsx) | Contato com as 9 diretorias e ouvidoria | `Persuade` / `Operate` | 100% (14.9 KB) |
| [`cta-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/cta-section.tsx) | Chamada de ação para filiação e engajamento | `Persuade` / `Operate` | 100% (17.5 KB) |
| [`dashboard-layout.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/dashboard-layout.tsx) | Layout do portal de transparência e métricas | `Operate` | 100% (6.6 KB) |
| [`error-pages.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/error-pages.tsx) | Telas de erro 404/500 brutalistas com busca | `Read` / `Operate` | 100% (11.8 KB) |
| [`faq-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/faq-section.tsx) | Seção sanfonada de dúvidas frequentes do curso | `Read` | 100% (17.0 KB) |
| [`feature-grid.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/feature-grid.tsx) | Grade de pilares do curso de Gestão Pública | `Persuade` / `Read` | 100% (14.2 KB) |
| [`footer-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/footer-section.tsx) | Rodapé institucional unificado com mapa do site | `Read` | 100% (13.7 KB) |
| [`hero-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/hero-section.tsx) | Hero principal com badge animado e call-to-actions | `Persuade` | 100% (23.5 KB) |
| [`invoice.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/invoice.tsx) | Prestação de contas e recibos no cofre estudantil | `Operate` | 100% (8.5 KB) |
| [`logo-cloud.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/logo-cloud.tsx) | Mosaico de parceiros, DCE, FAFICH e órgãos da UFMG | `Persuade` / `Read` | 100% (5.9 KB) |
| [`onboarding-flow.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/onboarding-flow.tsx) | Fluxo guiado para primeiros passos do calouro | `Persuade` / `Operate` | 100% (12.3 KB) |
| [`pricing-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/pricing-section.tsx) | Catálogo de planos de apoio e kits acadêmicos | `Persuade` | 100% (15.5 KB) |
| [`settings-page.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/settings-page.tsx) | Central de preferências discentes e acessibilidade | `Operate` | 100% (16.2 KB) |
| [`stats-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/stats-section.tsx) | Indicadores numéricos de egressos e horas cursadas | `Persuade` / `Read` | 100% (13.8 KB) |
| [`team-section.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/team-section.tsx) | Galeria de diretores e coordenadores discentes | `Read` / `Persuade` | 100% (15.5 KB) |
| [`testimonials.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/testimonials.tsx) | Depoimentos de alunos e egressos atuando no setor público | `Persuade` | 100% (17.5 KB) |

---

## 2. Canvas Shaders (23 Interactive Effects - Full-Fidelity 60fps)

Located in [`src/components/boldkit/canvas-effects/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects):

These 23 canvas shaders power the `Experience` mode of the application, rendering retro-brutalist backgrounds and ambient canvas animations at full 60fps without artificial battery or GPU throttles:

| Shader Component | Visual Metaphor | Performance & Motion Profile |
| :--- | :--- | :--- |
| [`Aurora.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Aurora.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`CRT.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/CRT.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`Dither.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Dither.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`DotBlob.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/DotBlob.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`DotWave.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/DotWave.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`FlowField.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/FlowField.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`GodRays.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/GodRays.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`GravityWells.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/GravityWells.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`Halftone.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Halftone.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`Lightning.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Lightning.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`LissajousGrid.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/LissajousGrid.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`MatrixRain.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/MatrixRain.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`MeshGradient.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/MeshGradient.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`Metaballs.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Metaballs.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`MouseRipple.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/MouseRipple.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`ParticleWeb.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/ParticleWeb.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`Plasma.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Plasma.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`PulsingBorder.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/PulsingBorder.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`Swirl.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Swirl.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`Topography.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Topography.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`Truchet.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/Truchet.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`VoronoiPulse.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/VoronoiPulse.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |
| [`WarpSpeed.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/canvas-effects/WarpSpeed.tsx) | Dynamic interactive canvas simulation | Full-fidelity 60fps WebGL/Canvas loop sem restrições; resize observer cleanup |

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
