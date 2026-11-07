# Part 4: Pre-built Blocks, Canvas Effects & Visual Extras

This document covers high-level, macro composition modules: **20 Pre-built Layout Blocks**, **23 Interactive Canvas Effects**, the **Brutalist Recharts Charting Suite**, and **64+ SVG & ASCII Art Shapes**.

---

## Section 1: Pre-built Layout Blocks (BoldKit.dev)

BoldKit provides ready-to-assemble marketing and application layout blocks with responsive breakpoints, mock data, and brutalist component composition.

### 1.1 Application Blocks (6 Blocks)

#### 1.1.1 `auth-forms` — Auth Forms
> **Purpose**: Authentication forms including login, signup, forgot password, OTP verification, and split layout variants.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/application/auth-forms.md`](../boldkit/blocks/application/auth-forms.md) |
| **Source Code TSX** | [`boldkit/blocks-code/application/auth-forms.tsx`](../boldkit/blocks-code/application/auth-forms.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/auth-forms.json"` |
| **Composed Components** | Card, Button, Input, Field, Table, Tabs, StatCard, Badge |

#### 1.1.2 `client` — Invoices & Client Billing
> **Purpose**: Invoice and billing components including full invoice documents, compact receipts, summary cards, and status tags.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/application/client.md`](../boldkit/blocks/application/client.md) |
| **Source Code TSX** | [`boldkit/blocks-code/application/invoice.tsx`](../boldkit/blocks-code/application/invoice.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/client.json"` |
| **Composed Components** | Card, Button, Input, Field, Table, Tabs, StatCard, Badge |

#### 1.1.3 `dashboard-layout` — Dashboard Shell
> **Purpose**: Application shell with sidebar, stat-card row, Recharts visualization, and TanStack data-table.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/application/dashboard-layout.md`](../boldkit/blocks/application/dashboard-layout.md) |
| **Source Code TSX** | [`boldkit/blocks-code/application/dashboard-layout.tsx`](../boldkit/blocks-code/application/dashboard-layout.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/dashboard-layout.json"` |
| **Composed Components** | Card, Button, Input, Field, Table, Tabs, StatCard, Badge |

#### 1.1.4 `error-pages` — Error Pages
> **Purpose**: Brutalist 404 Not Found, 500 Server Error, and maintenance screens with retry and back home buttons.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/application/error-pages.md`](../boldkit/blocks/application/error-pages.md) |
| **Source Code TSX** | [`boldkit/blocks-code/application/error-pages.tsx`](../boldkit/blocks-code/application/error-pages.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/error-pages.json"` |
| **Composed Components** | Card, Button, Input, Field, Table, Tabs, StatCard, Badge |

#### 1.1.5 `onboarding-flow` — Onboarding Flow
> **Purpose**: User onboarding components including step wizards, welcome screens, workspace creation, and goal selection.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/application/onboarding-flow.md`](../boldkit/blocks/application/onboarding-flow.md) |
| **Source Code TSX** | [`boldkit/blocks-code/application/onboarding-flow.tsx`](../boldkit/blocks-code/application/onboarding-flow.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/onboarding-flow.json"` |
| **Composed Components** | Card, Button, Input, Field, Table, Tabs, StatCard, Badge |

#### 1.1.6 `settings-page` — Settings Page
> **Purpose**: Complete settings page components including profile, notifications, security, appearance, and danger zone sections.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/application/settings-page.md`](../boldkit/blocks/application/settings-page.md) |
| **Source Code TSX** | [`boldkit/blocks-code/application/settings-page.tsx`](../boldkit/blocks-code/application/settings-page.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/settings-page.json"` |
| **Composed Components** | Card, Button, Input, Field, Table, Tabs, StatCard, Badge |

---

### 1.2 Marketing Blocks (14 Blocks)

#### 1.2.1 `hero-section` — Hero Section
> **Purpose**: High-impact landing hero with badges, bold headline typography, CTA button groups, and visual mockup frame.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/marketing/hero-section.md`](../boldkit/blocks/marketing/hero-section.md) |
| **Source Code TSX** | [`boldkit/blocks-code/marketing/hero-section.tsx`](../boldkit/blocks-code/marketing/hero-section.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/hero-section.json"` |
| **Composed Components** | Button, Card, Badge, Accordion, Avatar, Marquee, Separator |

#### 1.2.2 `bento-grid` — Bento Grid
> **Purpose**: Asymmetric feature grid with grid-breaking hero cells and tactile brutalist hover cards.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/marketing/bento-grid.md`](../boldkit/blocks/marketing/bento-grid.md) |
| **Source Code TSX** | [`boldkit/blocks-code/marketing/bento-grid.tsx`](../boldkit/blocks-code/marketing/bento-grid.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/bento-grid.json"` |
| **Composed Components** | Button, Card, Badge, Accordion, Avatar, Marquee, Separator |

#### 1.2.3 `feature-grid` — Feature Grid
> **Purpose**: Multi-column structured feature matrix with icon badges and description text.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/marketing/feature-grid.md`](../boldkit/blocks/marketing/feature-grid.md) |
| **Source Code TSX** | [`boldkit/blocks-code/marketing/feature-grid.tsx`](../boldkit/blocks-code/marketing/feature-grid.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/feature-grid.json"` |
| **Composed Components** | Button, Card, Badge, Accordion, Avatar, Marquee, Separator |

#### 1.2.4 `pricing-section` — Pricing Section
> **Purpose**: Tiered pricing cards with monthly/annual toggle, highlighted plan, and checkout summary.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/marketing/pricing-section.md`](../boldkit/blocks/marketing/pricing-section.md) |
| **Source Code TSX** | [`boldkit/blocks-code/marketing/pricing-section.tsx`](../boldkit/blocks-code/marketing/pricing-section.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/pricing-section.json"` |
| **Composed Components** | Button, Card, Badge, Accordion, Avatar, Marquee, Separator |

#### 1.2.5 `comparison-table` — Comparison Table
> **Purpose**: Feature matrix comparison with check/cross indicators and sticky highlighted plan column.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/marketing/comparison-table.md`](../boldkit/blocks/marketing/comparison-table.md) |
| **Source Code TSX** | [`boldkit/blocks-code/marketing/comparison-table.tsx`](../boldkit/blocks-code/marketing/comparison-table.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/comparison-table.json"` |
| **Composed Components** | Button, Card, Badge, Accordion, Avatar, Marquee, Separator |

#### 1.2.6 `testimonials` — Testimonials & Reviews
> **Purpose**: Brutalist review quotes with star ratings, author avatars, and retro verification badges.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/marketing/testimonials.md`](../boldkit/blocks/marketing/testimonials.md) |
| **Source Code TSX** | [`boldkit/blocks-code/marketing/testimonials.tsx`](../boldkit/blocks-code/marketing/testimonials.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/testimonials.json"` |
| **Composed Components** | Button, Card, Badge, Accordion, Avatar, Marquee, Separator |

#### 1.2.7 `faq-section` — FAQ Section
> **Purpose**: Frequently asked questions with single/multi-column accordion, tabbed categories, and contact CTA.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/marketing/faq-section.md`](../boldkit/blocks/marketing/faq-section.md) |
| **Source Code TSX** | [`boldkit/blocks-code/marketing/faq-section.tsx`](../boldkit/blocks-code/marketing/faq-section.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/faq-section.json"` |
| **Composed Components** | Button, Card, Badge, Accordion, Avatar, Marquee, Separator |

#### 1.2.8 `stats-section` — Stats Section
> **Purpose**: Key business metrics and milestones with oversized numerals and brutalist stat cards.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/marketing/stats-section.md`](../boldkit/blocks/marketing/stats-section.md) |
| **Source Code TSX** | [`boldkit/blocks-code/marketing/stats-section.tsx`](../boldkit/blocks-code/marketing/stats-section.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/stats-section.json"` |
| **Composed Components** | Button, Card, Badge, Accordion, Avatar, Marquee, Separator |

#### 1.2.9 `cta-section` — Call to Action (CTA)
> **Purpose**: Urgency-driven call-to-action banner with hard offset shadows and dual button triggers.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/marketing/cta-section.md`](../boldkit/blocks/marketing/cta-section.md) |
| **Source Code TSX** | [`boldkit/blocks-code/marketing/cta-section.tsx`](../boldkit/blocks-code/marketing/cta-section.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/cta-section.json"` |
| **Composed Components** | Button, Card, Badge, Accordion, Avatar, Marquee, Separator |

#### 1.2.10 `team-section` — Team Section
> **Purpose**: Team member directory cards with social links, role badges, and halftone photo frames.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/marketing/team-section.md`](../boldkit/blocks/marketing/team-section.md) |
| **Source Code TSX** | [`boldkit/blocks-code/marketing/team-section.tsx`](../boldkit/blocks-code/marketing/team-section.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/team-section.json"` |
| **Composed Components** | Button, Card, Badge, Accordion, Avatar, Marquee, Separator |

#### 1.2.11 `logo-cloud` — Logo Cloud
> **Purpose**: Partner and client logo showcases with static grid, animated marquee ticker, and stats combo.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/marketing/logo-cloud.md`](../boldkit/blocks/marketing/logo-cloud.md) |
| **Source Code TSX** | [`boldkit/blocks-code/marketing/logo-cloud.tsx`](../boldkit/blocks-code/marketing/logo-cloud.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/logo-cloud.json"` |
| **Composed Components** | Button, Card, Badge, Accordion, Avatar, Marquee, Separator |

#### 1.2.12 `changelog` — Changelog & Roadmap
> **Purpose**: Chronological product release timeline with date tags, version badges, and commit notes.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/marketing/changelog.md`](../boldkit/blocks/marketing/changelog.md) |
| **Source Code TSX** | [`boldkit/blocks-code/marketing/changelog-section.tsx`](../boldkit/blocks-code/marketing/changelog-section.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/changelog.json"` |
| **Composed Components** | Button, Card, Badge, Accordion, Avatar, Marquee, Separator |

#### 1.2.13 `contact-section` — Contact Section
> **Purpose**: Inquiry submission form with contact channels, office location cards, and submit feedback.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/marketing/contact-section.md`](../boldkit/blocks/marketing/contact-section.md) |
| **Source Code TSX** | [`boldkit/blocks-code/marketing/contact-section.tsx`](../boldkit/blocks-code/marketing/contact-section.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/contact-section.json"` |
| **Composed Components** | Button, Card, Badge, Accordion, Avatar, Marquee, Separator |

#### 1.2.14 `footer-section` — Footer Section
> **Purpose**: Comprehensive site footer with sitemap links, newsletter input, copyright stamp, and social icons.

| Reference Property | Path / Detail |
| :--- | :--- |
| **Block Markdown Spec** | [`boldkit/blocks/marketing/footer-section.md`](../boldkit/blocks/marketing/footer-section.md) |
| **Source Code TSX** | [`boldkit/blocks-code/marketing/footer-section.tsx`](../boldkit/blocks-code/marketing/footer-section.tsx) |
| **CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/footer-section.json"` |
| **Composed Components** | Button, Card, Badge, Accordion, Avatar, Marquee, Separator |

---

## Section 2: Interactive Canvas Effects (23 Ambient Visuals)

BoldKit includes **23 lightweight HTML5 Canvas 2D / WebGL ambient background shaders**. All effects support automatic `prefers-reduced-motion` suppression, configurable DPI scaling, and touch interaction.

| # | Effect Name | Source File | Description | Recommended Usage |
| :-: | :--- | :--- | :--- | :--- |
| 1 | **Aurora** | [`Aurora.tsx`](../boldkit/canvas-effects/Aurora.tsx) | Fluid northern lights shader with flowing gradient ribbons | Hero background, featured card ambient glow |
| 2 | **CRT** | [`CRT.tsx`](../boldkit/canvas-effects/CRT.tsx) | Retro cathode ray tube scanlines, phosphor glow, and curvature | Terminal panels, retro tech aesthetic |
| 3 | **Dither** | [`Dither.tsx`](../boldkit/canvas-effects/Dither.tsx) | Bayer ordered dithering pattern simulating 1-bit Macintosh graphics | Image overlays, retro monochrome banners |
| 4 | **DotBlob** | [`DotBlob.tsx`](../boldkit/canvas-effects/DotBlob.tsx) | Interactive liquid metaball rendered with dot matrix rasterization | Cursor-following ambient hero element |
| 5 | **DotWave** | [`DotWave.tsx`](../boldkit/canvas-effects/DotWave.tsx) | 3D perspective undulating plane of dots reacting to pointer movements | Landing page hero section |
| 6 | **FlowField** | [`FlowField.tsx`](../boldkit/canvas-effects/FlowField.tsx) | Perlin noise particle stream flowing across high-contrast vector fields | Data science or AI concept backdrops |
| 7 | **GodRays** | [`GodRays.tsx`](../boldkit/canvas-effects/GodRays.tsx) | Volumetric lighting shafts emanating from a high-contrast brutalist source | Dramatic callouts, pricing highlight |
| 8 | **GravityWells** | [`GravityWells.tsx`](../boldkit/canvas-effects/GravityWells.tsx) | Orbital particle simulation gravitationally pulled into interactive attractors | Interactive hero backdrops, gamified flows |
| 9 | **Halftone** | [`Halftone.tsx`](../boldkit/canvas-effects/Halftone.tsx) | Comic-book CMYK printing halftone dot raster pattern | Card headers, poster illustrations |
| 10 | **Lightning** | [`Lightning.tsx`](../boldkit/canvas-effects/Lightning.tsx) | High-energy electrical arc discharges and flash bursts | Gamified actions, alert banners, hype drops |
| 11 | **LissajousGrid** | [`LissajousGrid.tsx`](../boldkit/canvas-effects/LissajousGrid.tsx) | Harmonic mathematical frequency curves oscillating in a 2D matrix | Fintech dashboards, technical documentation |
| 12 | **MatrixRain** | [`MatrixRain.tsx`](../boldkit/canvas-effects/MatrixRain.tsx) | Falling digital rain glyph stream inspired by retro cyberpunk terminals | Developer portals, code security pages |
| 13 | **MeshGradient** | [`MeshGradient.tsx`](../boldkit/canvas-effects/MeshGradient.tsx) | Multi-point fluid mesh gradient with brutalist color stops | Modern SaaS headers, onboarding backgrounds |
| 14 | **Metaballs** | [`Metaballs.tsx`](../boldkit/canvas-effects/Metaballs.tsx) | Organic fluid coalescing droplets with hard brutalist threshold cutoff | Playful status displays, creative agency pages |
| 15 | **MouseRipple** | [`MouseRipple.tsx`](../boldkit/canvas-effects/MouseRipple.tsx) | Tactile concentric wave shockwaves expanding from click / tap origins | Interactive container surfaces, click feedback |
| 16 | **ParticleWeb** | [`ParticleWeb.tsx`](../boldkit/canvas-effects/ParticleWeb.tsx) | Constellation network graph with dynamic proximity connection lines | Networking, API hubs, cloud service diagrams |
| 17 | **Plasma** | [`Plasma.tsx`](../boldkit/canvas-effects/Plasma.tsx) | Classic 90s demo-scene sine wave color plasma | Retro gaming aesthetic, vibrant hero section |
| 18 | **PulsingBorder** | [`PulsingBorder.tsx`](../boldkit/canvas-effects/PulsingBorder.tsx) | Running perimeter light trace outlining brutalist container strokes | Featured tier cards, checkout attention |
| 19 | **Swirl** | [`Swirl.tsx`](../boldkit/canvas-effects/Swirl.tsx) | Hypnotic Archimedean optical vortex spiral | Loading overlays, creative showcases |
| 20 | **Topography** | [`Topography.tsx`](../boldkit/canvas-effects/Topography.tsx) | Procedural geographic contour elevation lines with terrain slicing | Geography, travel, outdoor SaaS landing pages |
| 21 | **Truchet** | [`Truchet.tsx`](../boldkit/canvas-effects/Truchet.tsx) | Algorithmic geometric tile maze patterns that rotate on mouseover | Texture pattern backgrounds, modular grids |
| 22 | **VoronoiPulse** | [`VoronoiPulse.tsx`](../boldkit/canvas-effects/VoronoiPulse.tsx) | Cellular Voronoi tessellation diagram with breathing centroid nodes | Cellular data, biology, architecture sites |
| 23 | **WarpSpeed** | [`WarpSpeed.tsx`](../boldkit/canvas-effects/WarpSpeed.tsx) | Hyperspace starfield acceleration simulation with streak trails | Onboarding completion, speed/performance claims |

> **Implementation Architecture**: All canvas effects are driven by [`boldkit/hooks/use-canvas-effect.ts`](../boldkit/hooks/use-canvas-effect.ts) and [`boldkit/lib/canvas-effect-core.ts`](../boldkit/lib/canvas-effect-core.ts). See [`boldkit/extras/canvas-effects.md`](../boldkit/extras/canvas-effects.md) for full parameter docs.

---

## Section 3: Brutalist Charting Suite (14 Chart Types + Sub-Primitives)

BoldKit expands standard Recharts with a specialized design system suite located in [`boldkit/ui/chart/`](../boldkit/ui/chart/) and documented in [`boldkit/extras/charts.md`](../boldkit/extras/charts.md).

### Modular Chart Sub-Primitives
- **Container**: [`boldkit/ui/chart/container.tsx`](../boldkit/ui/chart/container.tsx) — Handles responsive aspect ratio, 3px solid frame, title bar, and export actions.
- **Toolbar & Export**: [`boldkit/ui/chart/chart-toolbar.tsx`](../boldkit/ui/chart-toolbar.tsx) & [`boldkit/lib/chart-export.ts`](../boldkit/lib/chart-export.ts) — One-click PNG/SVG snapshot export with watermark.
- **Tooltip & Legend**: [`boldkit/ui/chart/tooltip.tsx`](../boldkit/ui/chart/tooltip.tsx), [`boldkit/ui/chart/legend.tsx`](../boldkit/ui/chart/legend.tsx) — Hard-shadow floating cards with color badges.
- **Annotations & Zones**: [`boldkit/ui/chart/annotations.tsx`](../boldkit/ui/chart/annotations.tsx) — Reference lines and banded threshold areas.
- **Palettes**: [`boldkit/ui/chart/palettes.ts`](../boldkit/ui/chart/palettes.ts) — High-contrast accessible brutalist data color sequences.

### Supported Specialized Chart Implementations
1. `DonutChart` ([`boldkit/ui/chart/donut-chart.tsx`](../boldkit/ui/chart/donut-chart.tsx))
2. `GaugeChart` ([`boldkit/ui/chart/gauge-chart.tsx`](../boldkit/ui/chart/gauge-chart.tsx))
3. `RadarChart` ([`boldkit/ui/chart/radar-chart.tsx`](../boldkit/ui/chart/radar-chart.tsx))
4. `RadialBarChart` ([`boldkit/ui/chart/radial-bar-chart.tsx`](../boldkit/ui/chart/radial-bar-chart.tsx))
5. `Sparkline` ([`boldkit/ui/chart/sparkline.tsx`](../boldkit/ui/chart/sparkline.tsx))
6. `FunnelChart` ([`boldkit/ui/chart/funnel-chart.tsx`](../boldkit/ui/chart/funnel-chart.tsx))
7. `HeatmapChart` ([`boldkit/ui/chart/heatmap-chart.tsx`](../boldkit/ui/chart/heatmap-chart.tsx))
8. `SankeyChart` ([`boldkit/ui/chart/sankey-chart.tsx`](../boldkit/ui/chart/sankey-chart.tsx))
9. `TreemapChart` ([`boldkit/ui/chart/treemap-chart.tsx`](../boldkit/ui/chart/treemap-chart.tsx))

---

## Section 4: SVG & ASCII Shapes (76+ Elements)

1. **64 SVG Brutalist Shapes & Seals**: Documented in [`boldkit/extras/shapes.md`](../boldkit/extras/shapes.md). Includes 4-pointed to 12-pointed starbursts, discount badges, certified ribbons, wavy borders, and speech tail callouts.
2. **12 Animated 3D ASCII Geometries**: Documented in [`boldkit/components/ascii-shapes.md`](../boldkit/components/ascii-shapes.md) and implemented in [`boldkit/ui/ascii-shapes.tsx`](../boldkit/ui/ascii-shapes.tsx). Mathematical real-time string renderer for Torus, Donut, Sphere, Cube, Helix, Pyramids, and Dodecahedron.

---

## Section 5: Neobrutalism Complementary Extras

While BoldKit provides high-level composite blocks, Neobrutalism excels at micro-styling detail:
- **Code Block Highlight Styling**: [`neobrutalism/styling/code.css`](../neobrutalism/styling/code.css) — Custom brutalist syntax highlighting styles.
- **Marquee Utility Layer**: [`neobrutalism/styling/marquee.css`](../neobrutalism/styling/marquee.css) — CSS ticker utilities.
- **Font Management Utilities**: [`neobrutalism/lib/google-fonts.ts`](../neobrutalism/lib/google-fonts.ts) — Helper functions for Google Fonts DM Sans injection.