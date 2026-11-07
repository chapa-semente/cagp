# Part 3: Asymmetric & Exclusive Components Catalog (42 Items)

This document analyzes the **42 asymmetric components** that exist in only one of the two documentation catalogs. It highlights functional gaps, provides direct migration paths, and details how modular components in one system correlate to bundled primitives in the other.

---

## Summary of Asymmetry

- **Neobrutalism Exclusives (11 items)**: Highly modular AI and conversation primitives (`bubble`, `message`, `marker`, `attachment`, `scroller`), Base UI `direction`, React Hook Form `form`, `image-card`, `item`, and standalone `empty`.
- **BoldKit Exclusives (31 items)**: Advanced mathematical visualizations (`ascii-shapes`, `mathcurveloader`, `math-curve-*`), dedicated Recharts widgets (`donutchart`, `gaugechart`, `radarchart`, `radialbarchart`, `sparkline`), marketing flair (`sticker`, `layered-card`, `visitors`), and specialized UX controls (`date-range-picker`, `dropzone`, `error-boundary`, `number-field`, `rating`, `stepper`, `tag-input`, `time-picker`, `timeline`, `tour`, `tree-view`, `sonner`, `motion`).

---

## Section A: Neobrutalism.com Exclusives (11 Components)

### A1. `attachment` — Attachment
> **Description**: Displays a file attachment with media, title, description and actions.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`neobrutalism/components/attachment.md`](../neobrutalism/components/attachment.md) |
| **Source Code TSX** | [`neobrutalism/ui/attachment.tsx`](../neobrutalism/ui/attachment.tsx) |
| **Examples Directory** | [`neobrutalism/examples/attachment/`](../neobrutalism/examples/attachment/) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://neobrutalism.com/r/attachment.json"` |
| **Styling Signature** | `border-2 border-border`, `shadow-shadow`, `rounded-base` |

**Correlation to BoldKit.dev**:
- **Consolidated in BoldKit `m.author`**: BoldKit packages `attachment` together with the entire conversation suite in [`boldkit/components/mauthor.md`](../boldkit/components/mauthor.md). In BoldKit, source code exists at `boldkit/ui/attachment.tsx` and is exported as part of `@/components/ui/mauthor`.

---

### A2. `bubble` — Bubble
> **Description**: A chat bubble for displaying a message in a conversation.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`neobrutalism/components/bubble.md`](../neobrutalism/components/bubble.md) |
| **Source Code TSX** | [`neobrutalism/ui/bubble.tsx`](../neobrutalism/ui/bubble.tsx) |
| **Examples Directory** | [`neobrutalism/examples/bubble/`](../neobrutalism/examples/bubble/) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://neobrutalism.com/r/bubble.json"` |
| **Styling Signature** | `border-2 border-border`, `shadow-shadow`, `rounded-base` |

**Correlation to BoldKit.dev**:
- **Consolidated in BoldKit `m.author`**: BoldKit packages `bubble` together with the entire conversation suite in [`boldkit/components/mauthor.md`](../boldkit/components/mauthor.md). In BoldKit, source code exists at `boldkit/ui/bubble.tsx` and is exported as part of `@/components/ui/mauthor`.

---

### A3. `chart` — Chart
> **Description**: Beautiful charts. Built using Recharts. Copy and paste into your apps.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`neobrutalism/components/chart.md`](../neobrutalism/components/chart.md) |
| **Source Code TSX** | [`neobrutalism/ui/chart.tsx`](../neobrutalism/ui/chart.tsx) |
| **Examples Directory** | [`neobrutalism/examples/chart/`](../neobrutalism/examples/chart/) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://neobrutalism.com/r/chart.json"` |
| **Styling Signature** | `border-2 border-border`, `shadow-shadow`, `rounded-base` |

**Correlation to BoldKit.dev**:
- **Corresponds to BoldKit Charts**: BoldKit splits charts into 14 distinct visual components (`donut-chart`, `radar-chart`, `sparkline`, etc.) documented in [`boldkit/extras/charts.md`](../boldkit/extras/charts.md).

---

### A4. `direction` — Direction
> **Description**: Provides the reading direction (LTR or RTL) to Base UI components.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`neobrutalism/components/direction.md`](../neobrutalism/components/direction.md) |
| **Source Code TSX** | [`neobrutalism/ui/direction.tsx`](../neobrutalism/ui/direction.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://neobrutalism.com/r/direction.json"` |
| **Styling Signature** | `border-2 border-border`, `shadow-shadow`, `rounded-base` |

**Correlation to BoldKit.dev**:
- **No Direct BoldKit Counterpart**: This component is unique to Neobrutalism.com. If using BoldKit, copy `neobrutalism/ui/direction.tsx` and apply `border-3 border-foreground` for visual parity.

---

### A5. `empty` — Empty
> **Description**: Use the Empty component to display an empty state.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`neobrutalism/components/empty.md`](../neobrutalism/components/empty.md) |
| **Source Code TSX** | [`neobrutalism/ui/empty.tsx`](../neobrutalism/ui/empty.tsx) |
| **Examples Directory** | [`neobrutalism/examples/empty/`](../neobrutalism/examples/empty/) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://neobrutalism.com/r/empty.json"` |
| **Styling Signature** | `border-2 border-border`, `shadow-shadow`, `rounded-base` |

**Correlation to BoldKit.dev**:
- **Corresponds to BoldKit `emptystate`**: BoldKit provides this capability under [`boldkit/components/emptystate.md`](../boldkit/components/emptystate.md) and [`boldkit/ui/empty-state.tsx`](../boldkit/ui/empty-state.tsx).

---

### A6. `form` — Form
> **Description**: Building forms with React Hook Form and Zod.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`neobrutalism/components/form.md`](../neobrutalism/components/form.md) |
| **Source Code TSX** | [`neobrutalism/ui/form.tsx`](../neobrutalism/ui/form.tsx) |
| **Examples Directory** | [`neobrutalism/examples/form/`](../neobrutalism/examples/form/) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://neobrutalism.com/r/form.json"` |
| **Styling Signature** | `border-2 border-border`, `shadow-shadow`, `rounded-base` |

**Correlation to BoldKit.dev**:
- **BoldKit Equivalent**: BoldKit provides `field` and `multi-step-form`, but Neobrutalism `form.md` provides the canonical React Hook Form + Zod wrapper with accessible form items and descriptions.

---

### A7. `image-card` — Image Card
> **Description**: A card component optimized for displaying images with captions.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`neobrutalism/components/image-card.md`](../neobrutalism/components/image-card.md) |
| **Source Code TSX** | [`neobrutalism/ui/image-card.tsx`](../neobrutalism/ui/image-card.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://neobrutalism.com/r/image-card.json"` |
| **Styling Signature** | `border-2 border-border`, `shadow-shadow`, `rounded-base` |

**Correlation to BoldKit.dev**:
- **No Direct BoldKit Counterpart**: This component is unique to Neobrutalism.com. If using BoldKit, copy `neobrutalism/ui/image-card.tsx` and apply `border-3 border-foreground` for visual parity.

---

### A8. `item` — Item
> **Description**: A versatile component that you can use to display any content.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`neobrutalism/components/item.md`](../neobrutalism/components/item.md) |
| **Source Code TSX** | [`neobrutalism/ui/item.tsx`](../neobrutalism/ui/item.tsx) |
| **Examples Directory** | [`neobrutalism/examples/item/`](../neobrutalism/examples/item/) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://neobrutalism.com/r/item.json"` |
| **Styling Signature** | `border-2 border-border`, `shadow-shadow`, `rounded-base` |

**Correlation to BoldKit.dev**:
- **No Direct BoldKit Counterpart**: This component is unique to Neobrutalism.com. If using BoldKit, copy `neobrutalism/ui/item.tsx` and apply `border-3 border-foreground` for visual parity.

---

### A9. `marker` — Marker
> **Description**: A small inline status or step marker for a conversation timeline.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`neobrutalism/components/marker.md`](../neobrutalism/components/marker.md) |
| **Source Code TSX** | [`neobrutalism/ui/marker.tsx`](../neobrutalism/ui/marker.tsx) |
| **Examples Directory** | [`neobrutalism/examples/marker/`](../neobrutalism/examples/marker/) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://neobrutalism.com/r/marker.json"` |
| **Styling Signature** | `border-2 border-border`, `shadow-shadow`, `rounded-base` |

**Correlation to BoldKit.dev**:
- **Consolidated in BoldKit `m.author`**: BoldKit packages `marker` together with the entire conversation suite in [`boldkit/components/mauthor.md`](../boldkit/components/mauthor.md). In BoldKit, source code exists at `boldkit/ui/marker.tsx` and is exported as part of `@/components/ui/mauthor`.

---

### A10. `message` — Message
> **Description**: A message in a conversation, with an avatar, content, header and footer.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`neobrutalism/components/message.md`](../neobrutalism/components/message.md) |
| **Source Code TSX** | [`neobrutalism/ui/message.tsx`](../neobrutalism/ui/message.tsx) |
| **Examples Directory** | [`neobrutalism/examples/message/`](../neobrutalism/examples/message/) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://neobrutalism.com/r/message.json"` |
| **Styling Signature** | `border-2 border-border`, `shadow-shadow`, `rounded-base` |

**Correlation to BoldKit.dev**:
- **Consolidated in BoldKit `m.author`**: BoldKit packages `message` together with the entire conversation suite in [`boldkit/components/mauthor.md`](../boldkit/components/mauthor.md). In BoldKit, source code exists at `boldkit/ui/message.tsx` and is exported as part of `@/components/ui/mauthor`.

---

### A11. `message-scroller` — Message Scroller
> **Description**: A scroll container for chat messages with auto scroll and a scroll-to-end button.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`neobrutalism/components/message-scroller.md`](../neobrutalism/components/message-scroller.md) |
| **Source Code TSX** | [`neobrutalism/ui/message-scroller.tsx`](../neobrutalism/ui/message-scroller.tsx) |
| **Examples Directory** | [`neobrutalism/examples/message-scroller/`](../neobrutalism/examples/message-scroller/) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://neobrutalism.com/r/message-scroller.json"` |
| **Styling Signature** | `border-2 border-border`, `shadow-shadow`, `rounded-base` |

**Correlation to BoldKit.dev**:
- **Consolidated in BoldKit `m.author`**: BoldKit packages `message-scroller` together with the entire conversation suite in [`boldkit/components/mauthor.md`](../boldkit/components/mauthor.md). In BoldKit, source code exists at `boldkit/ui/message-scroller.tsx` and is exported as part of `@/components/ui/mauthor`.

---

## Section B: BoldKit.dev Exclusives (31 Components)

### B1. `ascii-shapes` — Ascii Shapes
> **Description**: 12 animated ASCII art components — 5 mathematical 3D shapes (Torus, Donut, Sphere, Cube, Helix) and 7 generative animations (Spiral, Rose, Wave, Vortex, Pulse, Matrix, Grid). Rendered with a custom rasterizer using perspective projection, z-buffering, and Lambertian shading. No canvas, no WebGL — just text.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/ascii-shapes.md`](../boldkit/components/ascii-shapes.md) |
| **Source Code TSX** | [`boldkit/ui/ascii-shapes.tsx`](../boldkit/ui/ascii-shapes.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/ascii-shapes.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Brutalist Graphic Element**: Mathematical visual flare. Uses lightweight parametric equations or pure string matrix renders without 3D WebGL runtime overhead. Fully compatible with Neobrutalism.

---

### B2. `aspect-ratio` — Aspect Ratio
> **Description**: Displays content within a desired ratio, perfect for images and videos with consistent dimensions.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/aspect-ratio.md`](../boldkit/components/aspect-ratio.md) |
| **Source Code TSX** | [`boldkit/ui/aspect-ratio.tsx`](../boldkit/ui/aspect-ratio.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/aspect-ratio.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Utility & Primitives**: Provides robust functionality with 3px brutalist aesthetic.

---

### B3. `date-range-picker` — Date Range Picker
> **Description**: A date range picker with preset options, dual calendar view, and customizable presets.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/date-range-picker.md`](../boldkit/components/date-range-picker.md) |
| **Source Code TSX** | [`boldkit/ui/date-range-picker.tsx`](../boldkit/ui/date-range-picker.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/date-range-picker.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Advanced UX Capability**: Provides complex workflow interaction absent from Neobrutalism. Built on native semantics and Radix UI with full keyboard accessibility.

---

### B4. `donutchart` — Donutchart
> **Description**: Pie chart with center hole for displaying KPIs and totals.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/donutchart.md`](../boldkit/components/donutchart.md) |
| **Source Code TSX** | [`boldkit/ui/donut-chart.tsx`](../boldkit/ui/donut-chart.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/donutchart.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Data Visualization**: Specialized Recharts primitive styled with thick brutalist borders, custom toolbars, and high-contrast color zones. In Neobrutalism projects, copy `donut-chart.tsx` directly and adjust border stroke from 3px to 2px.

---

### B5. `dropzone` — Dropzone
> **Description**: Drag-and-drop file upload with validation and progress tracking.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/dropzone.md`](../boldkit/components/dropzone.md) |
| **Source Code TSX** | [`boldkit/ui/dropzone.tsx`](../boldkit/ui/dropzone.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/dropzone.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Utility & Primitives**: Provides robust functionality with 3px brutalist aesthetic.

---

### B6. `emptystate` — Emptystate
> **Description**: Specialized brutalist component.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/emptystate.md`](../boldkit/components/emptystate.md) |
| **Source Code TSX** | [`boldkit/ui/empty-state.tsx`](../boldkit/ui/empty-state.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/emptystate.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Utility & Primitives**: Provides robust functionality with 3px brutalist aesthetic.

---

### B7. `error-boundary` — Error Boundary
> **Description**: Catches errors in child components and renders a neubrutalism fallback with reload and home actions. React uses componentDidCatch under the hood; Vue uses onErrorCaptured.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/error-boundary.md`](../boldkit/components/error-boundary.md) |
| **Source Code TSX** | Implemented via utility or sub-module |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/error-boundary.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Utility & Primitives**: Provides robust functionality with 3px brutalist aesthetic.

---

### B8. `gaugechart` — Gaugechart
> **Description**: Speedometer-style gauge chart with color zones and animated needle.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/gaugechart.md`](../boldkit/components/gaugechart.md) |
| **Source Code TSX** | [`boldkit/ui/gauge-chart.tsx`](../boldkit/ui/gauge-chart.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/gaugechart.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Data Visualization**: Specialized Recharts primitive styled with thick brutalist borders, custom toolbars, and high-contrast color zones. In Neobrutalism projects, copy `gauge-chart.tsx` directly and adjust border stroke from 3px to 2px.

---

### B9. `layered-card` — Layered Card
> **Description**: Card component with stacked layers effect showing offset depth - a neubrutalist design pattern that creates a sense of physicality and dimension.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/layered-card.md`](../boldkit/components/layered-card.md) |
| **Source Code TSX** | [`boldkit/ui/layered-card.tsx`](../boldkit/ui/layered-card.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/layered-card.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Marketing Polish**: Eye-catching sticker stamps, tape effects, or live visitor badges. Drop-in ready for landing pages built with either system.

---

### B10. `math-curve-background` — Math Curve Background
> **Description**: An ambient animated mathematical curve background layer. Wraps content with a slow-moving curve animation that adds depth and visual interest.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/math-curve-background.md`](../boldkit/components/math-curve-background.md) |
| **Source Code TSX** | [`boldkit/ui/math-curve-background.tsx`](../boldkit/ui/math-curve-background.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/math-curve-background.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Brutalist Graphic Element**: Mathematical visual flare. Uses lightweight parametric equations or pure string matrix renders without 3D WebGL runtime overhead. Fully compatible with Neobrutalism.

---

### B11. `math-curve-progress` — Math Curve Progress
> **Description**: A progress indicator that traces a mathematical curve — the head moves along the curve path proportionally from 0 to 100%.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/math-curve-progress.md`](../boldkit/components/math-curve-progress.md) |
| **Source Code TSX** | [`boldkit/ui/math-curve-progress.tsx`](../boldkit/ui/math-curve-progress.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/math-curve-progress.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Brutalist Graphic Element**: Mathematical visual flare. Uses lightweight parametric equations or pure string matrix renders without 3D WebGL runtime overhead. Fully compatible with Neobrutalism.

---

### B12. `mathcurveloader` — Mathcurveloader
> **Description**: Mathematical parametric curve loaders with neubrutalism aesthetics. 15 curve variants including rose, lissajous, butterfly, and more.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/mathcurveloader.md`](../boldkit/components/mathcurveloader.md) |
| **Source Code TSX** | [`boldkit/ui/math-curve-loader.tsx`](../boldkit/ui/math-curve-loader.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/mathcurveloader.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Brutalist Graphic Element**: Mathematical visual flare. Uses lightweight parametric equations or pure string matrix renders without 3D WebGL runtime overhead. Fully compatible with Neobrutalism.

---

### B13. `mauthor` — Mauthor
> **Description**: Brutalist building blocks for chat and AI-assistant interfaces. MessageScroller owns scrolling — auto-follow while at the bottom (ResizeObserver, so streamed tokens stay pinned), a jump-to-latest button with an unread count, and anchored history prepends. Message, Bubble, Attachment and Marker render the conversation: aligned rows with grouping, hard-edged bubbles with reactions and collapsible text, file cards with upload progress, and shimmering live-status markers.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/mauthor.md`](../boldkit/components/mauthor.md) |
| **Source Code TSX** | Implemented via utility or sub-module |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/mauthor.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Full AI Chat Suite**: Consolidated scroll container with ResizeObserver, auto-follow, streaming support, and message cards. In Neobrutalism, this is split into 5 separate components.

---

### B14. `motion` — Motion
> **Description**: Framework-agnostic motion system for BoldKit. Six signature CSS recipes plus React and Vue adapters share one vanilla core, so the same animation language works in any framework — including Svelte, Solid, or plain HTML.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/motion.md`](../boldkit/components/motion.md) |
| **Source Code TSX** | [`boldkit/ui/motion.tsx`](../boldkit/ui/motion.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/motion.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Motion Infrastructure**: Framework-agnostic CSS keyframe animations (`brutal-pulse`, `brutal-shake`, `brutal-bounce`). Can be imported directly into Neobrutalism via `motion.css`.

---

### B15. `multi-step-form` — Multi Step Form
> **Description**: A dependency-free form-state layer with per-step validation that composes with the Stepper. Forward navigation is gated on the current step's validator; submit fires only on the last step.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/multi-step-form.md`](../boldkit/components/multi-step-form.md) |
| **Source Code TSX** | [`boldkit/ui/multi-step-form.tsx`](../boldkit/ui/multi-step-form.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/multi-step-form.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Utility & Primitives**: Provides robust functionality with 3px brutalist aesthetic.

---

### B16. `number-field` — Number Field
> **Description**: A numeric input with − / + stepper buttons, min/max/step, Intl number formatting, and full spinbutton keyboard support (Arrow keys, PageUp/PageDown ×10, Home/End). Submits in native forms via `name`.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/number-field.md`](../boldkit/components/number-field.md) |
| **Source Code TSX** | [`boldkit/ui/number-field.tsx`](../boldkit/ui/number-field.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/number-field.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Advanced UX Capability**: Provides complex workflow interaction absent from Neobrutalism. Built on native semantics and Radix UI with full keyboard accessibility.

---

### B17. `radarchart` — Radarchart
> **Description**: Multi-variable comparison chart for skills, metrics, and feature comparisons.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/radarchart.md`](../boldkit/components/radarchart.md) |
| **Source Code TSX** | [`boldkit/ui/radar-chart.tsx`](../boldkit/ui/radar-chart.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/radarchart.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Data Visualization**: Specialized Recharts primitive styled with thick brutalist borders, custom toolbars, and high-contrast color zones. In Neobrutalism projects, copy `radar-chart.tsx` directly and adjust border stroke from 3px to 2px.

---

### B18. `radialbarchart` — Radialbarchart
> **Description**: Circular progress bars with nested rings for displaying multiple metrics.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/radialbarchart.md`](../boldkit/components/radialbarchart.md) |
| **Source Code TSX** | [`boldkit/ui/radial-bar-chart.tsx`](../boldkit/ui/radial-bar-chart.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/radialbarchart.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Data Visualization**: Specialized Recharts primitive styled with thick brutalist borders, custom toolbars, and high-contrast color zones. In Neobrutalism projects, copy `radial-bar-chart.tsx` directly and adjust border stroke from 3px to 2px.

---

### B19. `rating` — Rating
> **Description**: A rating component with star, heart, or circle icons. Supports half values, keyboard navigation, and hover preview.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/rating.md`](../boldkit/components/rating.md) |
| **Source Code TSX** | [`boldkit/ui/rating.tsx`](../boldkit/ui/rating.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/rating.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Advanced UX Capability**: Provides complex workflow interaction absent from Neobrutalism. Built on native semantics and Radix UI with full keyboard accessibility.

---

### B20. `separator` — Separator
> **Description**: Visually or semantically separates content with a bold 3px line.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/separator.md`](../boldkit/components/separator.md) |
| **Source Code TSX** | [`boldkit/ui/separator.tsx`](../boldkit/ui/separator.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/separator.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Utility & Primitives**: Provides robust functionality with 3px brutalist aesthetic.

---

### B21. `sonner` — Sonner
> **Description**: Toast notifications with bold neubrutalism styling powered by the Sonner library.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/sonner.md`](../boldkit/components/sonner.md) |
| **Source Code TSX** | [`boldkit/ui/sonner.tsx`](../boldkit/ui/sonner.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/sonner.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Modern Stacking Toast**: Replaces bulky toast portals with fluid stacked toast notifications. Highly recommended over legacy toasts.

---

### B22. `sparkline` — Sparkline
> **Description**: Tiny inline trend charts for tables, stat cards, and compact data displays.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/sparkline.md`](../boldkit/components/sparkline.md) |
| **Source Code TSX** | [`boldkit/ui/sparkline.tsx`](../boldkit/ui/sparkline.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/sparkline.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Utility & Primitives**: Provides robust functionality with 3px brutalist aesthetic.

---

### B23. `statcard` — Statcard
> **Description**: Display key metrics and statistics with trend indicators and progress bars.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/statcard.md`](../boldkit/components/statcard.md) |
| **Source Code TSX** | [`boldkit/ui/stat-card.tsx`](../boldkit/ui/stat-card.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/statcard.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Utility & Primitives**: Provides robust functionality with 3px brutalist aesthetic.

---

### B24. `stepper` — Stepper
> **Description**: Multi-step form wizard with progress indicators and content panels.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/stepper.md`](../boldkit/components/stepper.md) |
| **Source Code TSX** | [`boldkit/ui/stepper.tsx`](../boldkit/ui/stepper.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/stepper.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Advanced UX Capability**: Provides complex workflow interaction absent from Neobrutalism. Built on native semantics and Radix UI with full keyboard accessibility.

---

### B25. `sticker` — Sticker
> **Description**: Rotated labels and stamps with tape effect and double borders - neubrutalist decorative elements for emphasis and visual interest.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/sticker.md`](../boldkit/components/sticker.md) |
| **Source Code TSX** | [`boldkit/ui/sticker.tsx`](../boldkit/ui/sticker.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/sticker.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Marketing Polish**: Eye-catching sticker stamps, tape effects, or live visitor badges. Drop-in ready for landing pages built with either system.

---

### B26. `tag-input` — Tag Input
> **Description**: A multi-value input component for adding and removing tags with keyboard support, suggestions, and validation.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/tag-input.md`](../boldkit/components/tag-input.md) |
| **Source Code TSX** | [`boldkit/ui/tag-input.tsx`](../boldkit/ui/tag-input.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/tag-input.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Advanced UX Capability**: Provides complex workflow interaction absent from Neobrutalism. Built on native semantics and Radix UI with full keyboard accessibility.

---

### B27. `time-picker` — Time Picker
> **Description**: A popover-based time picker with scrollable columns for hours, minutes, and optional seconds. Supports 12h and 24h formats.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/time-picker.md`](../boldkit/components/time-picker.md) |
| **Source Code TSX** | [`boldkit/ui/time-picker.tsx`](../boldkit/ui/time-picker.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/time-picker.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Advanced UX Capability**: Provides complex workflow interaction absent from Neobrutalism. Built on native semantics and Radix UI with full keyboard accessibility.

---

### B28. `timeline` — Timeline
> **Description**: A composable timeline component for displaying activity feeds, order tracking, version history, and more.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/timeline.md`](../boldkit/components/timeline.md) |
| **Source Code TSX** | [`boldkit/ui/timeline.tsx`](../boldkit/ui/timeline.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/timeline.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Advanced UX Capability**: Provides complex workflow interaction absent from Neobrutalism. Built on native semantics and Radix UI with full keyboard accessibility.

---

### B29. `tour` — Tour
> **Description**: A step-by-step product tour component with spotlight highlighting, progress indicators, and smooth transitions.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/tour.md`](../boldkit/components/tour.md) |
| **Source Code TSX** | [`boldkit/ui/tour.tsx`](../boldkit/ui/tour.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/tour.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Advanced UX Capability**: Provides complex workflow interaction absent from Neobrutalism. Built on native semantics and Radix UI with full keyboard accessibility.

---

### B30. `tree-view` — Tree View
> **Description**: A hierarchical tree view component with expand/collapse, selection, checkboxes, and keyboard navigation.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/tree-view.md`](../boldkit/components/tree-view.md) |
| **Source Code TSX** | [`boldkit/ui/tree-view.tsx`](../boldkit/ui/tree-view.tsx) |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/tree-view.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Utility & Primitives**: Provides robust functionality with 3px brutalist aesthetic.

---

### B31. `visitors` — Visitors
> **Description**: Wraps any chart with a brutalist export toolbar — download the chart as PNG or SVG, export its data as CSV, or toggle fullscreen. Engine-agnostic: it reads the wrapped <svg> (Recharts) or <canvas> (ECharts), so it works with both the React and Vue chart families.

| Reference Property | Detail |
| :--- | :--- |
| **Documentation Markdown** | [`boldkit/components/visitors.md`](../boldkit/components/visitors.md) |
| **Source Code TSX** | Implemented via utility or sub-module |
| **Shadcn CLI Installation** | `npx shadcn@latest add "https://boldkit.dev/r/visitors.json"` |
| **Styling Signature** | `border-3 border-foreground`, hard offset shadow `4px 4px 0px`, uppercase typography |

**Value Proposition & Neobrutalism Porting Guide**:
- **Marketing Polish**: Eye-catching sticker stamps, tape effects, or live visitor badges. Drop-in ready for landing pages built with either system.

---
