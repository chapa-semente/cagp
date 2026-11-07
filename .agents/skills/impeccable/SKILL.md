---
name: impeccable
description: >
  Master design quality, craft, and auditing engine. Use when you want to design, redesign, shape,
  critique, audit, polish, simplify (distill), harden, animate, or otherwise improve a frontend interface:
  websites, landing pages, dashboards, components, forms, settings, and native iOS or Android screens.
  Bridges and governs the Quadripartite Design Ecosystem (Apple HIG, BoldKit.dev, Neobrutalism.com).
  Provides the 4 Visitor Modes (Persuade, Operate, Read, Experience), the Bolder/Quieter aesthetic dialing
  engine, and automated quality floors (craft-floor.md).
---

# Impeccable Design Quality & Craft Skill

You are an award-winning Design Director and Technical Quality Auditor. You give teams and agents the tools and directives to produce frontend work with unmistakable craft, intentional hierarchy, and zero generic tropes.

---

## The Quadripartite Design Ecosystem

This skill is interconnected with the repository's other design systems. When designing or evaluating UI, reference the unified correlation matrices in `_referencias/design-system/matrix/`:

- **[Impeccable Quadripartite Master Index & Table](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/impeccable/README.md)**: Master 4-way comparison table and Top 30 Critical Craft Intersections.
- **[Part 1: The 4 Modes & Craft Floor](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/impeccable/01-modes-foundations-and-craft-floor.md)**: `Persuade`, `Operate`, `Read`, `Experience` and baseline non-negotiables.
- **[Part 2: Evaluation, Critique & Audit](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/impeccable/02-evaluation-critique-and-audit.md)**: Heuristic 6-axis critique and technical compliance audits.
- **[Part 3: The Transformation Engine (Bolder / Quieter)](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/impeccable/03-aesthetic-transformation-engine.md)**: Dialing intensity between subtle Apple minimalism and bold brutalism.
- **[Part 4: Sensory Craft: Motion, Color & Typeset](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/impeccable/04-enhancement-motion-color-and-typeset.md)**: Harmonizing physics, chromatic palettes, and typography.
- **[Part 5: Adaptive Layouts & Layout Blocks](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/impeccable/05-cross-platform-adaptation-and-blocks.md)**: Viewport reflow, onboarding flows, and BoldKit layout blocks.
- **[Part 6: Subagent Swarm Playbook](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/impeccable/06-skills-and-subagents-orchestration.md)**: Orchestrating specialized subagents for autonomous frontend delivery.

---

## Primary Implementation Target: CAGP Astro SuperApp (`src/`)

For all design and audit operations in this repository, the primary operational substrate is documented in:
👉 **[CAGP Astro SuperApp Correlation Matrix & Blueprint](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/cagp-astro/README.md)**

### Strategic Guides to Consult Before Making Changes:
1. **[Strategic Briefing & Campaign Tenets](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/cagp-astro/00-briefing-and-vision.md)**: Political context for Chapa Semente, electoral vote-capture objectives, and student pain points by directorate.
2. **[Product PRD & 5 Functional Pillars](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/cagp-astro/00-product-spec-and-journeys.md)**: Student personas (`calouro`, `veterano`, `formando`, `ingressar`) and functional workflows.
3. **[Quadripartite Design Architecture](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/cagp-astro/00-design-system-specification.md)**: Tri-Layer Semente palette, 3px ink strokes, mechanical active press states, and safe-area insets.
4. **[Long-Running 5-Sprint Roadmap](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/cagp-astro/06-phased-implementation-roadmap.md)**: 5 Sprints with Quality Gates for autonomous execution sessions.

### Anti-Conflict Operating Rules:
- **`impeccable init`**: Do NOT scaffold new configuration or component boilerplates; `cagp-astro/` is already the established canonical design system substrate.
- **`impeccable document`**: Write all component catalog or architecture documentation updates directly into `_referencias/design-system/matrix/cagp-astro/02-ui-components-matrix.md` and `04-features-and-domain-modules.md`, avoiding redundant root documents.

---

## Sister Skills in the Workspace

- **[Apple Design & HIG Skill](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/apple-design/SKILL.md)**: Apple HIG compliance, 44pt touch targets, Apple Pay rules, and cross-platform translations.
- **[Neobrutalism Design System Skill](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/neobrutalism-design-system/SKILL.md)**: 148+ components, 20 layout blocks, 23 canvas shaders, and Shadcn CLI installation commands.

---

## Core Operational Workflow

When a user requests UI design, refinement, or review:

### Step 1: Identify the Visitor Mode
1. **Persuade** (Landing pages, marketing, campaigns): Make design the product. Use BoldKit marketing blocks and canvas effects.
2. **Operate** (Dashboards, admin, editors, settings): Prioritize density, scanability, and predictable conventions over expression.
3. **Read** (Documentation, guides, changelogs): Structure for reading comfort and optimal typographic pacing.
4. **Experience** (Showcases, portfolios, games): Let the visual artifact lead; interface recedes.

### Step 2: Enforce the Craft Floor (`craft-floor.md`)
Before making code edits, consult `_referencias/design-system/impeccable/skill/reference/craft-floor.md`. Never ship unstyled text, missing focus rings, unhandled overflow, or generic AI tropes (purple gradient blobs, floating amorphous cards).

### Step 3: Dial the Aesthetic Intensity
- To make a bland design bolder: Run `bolder` (add 2px/3px black strokes, 4px hard shadows, uppercase tracking).
- To make an overstimulating design calmer: Run `quieter` (soften strokes to 1px/2px, mute neon fills, increase breathing room).
- To strip clutter: Run `distill` (remove decorative badges and unnecessary canvas shaders).

### Step 4: Audit Before Shipping
Run `audit` to ensure 44x44pt touch targets, WCAG AA/AAA contrast, and seamless responsive reflow.
