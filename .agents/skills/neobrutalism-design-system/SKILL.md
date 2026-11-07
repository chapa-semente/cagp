---
name: neobrutalism-design-system
description: >
  Master guide and catalog for Neobrutalist design systems (Neobrutalism.com and BoldKit.dev).
  Use when designing, implementing, styling, or scaffolding brutalist UI components, marketing blocks,
  dashboards, chat interfaces, canvas effects, charts, or retro shapes. Covers 148+ components,
  20 layout blocks, 23 canvas shaders, tokens, Tailwind v4 configurations, and Shadcn CLI installation recipes.
---

# Neobrutalism Design System Skill

Use this skill whenever you need to implement, adapt, or compose Neobrutalist UI elements in this repository. It bridges the two premier design systems cataloged in `_referencias/design-system/`: **Neobrutalism.com** (64 components) and **BoldKit.dev** (84 components, 20 blocks, 23 canvas effects).

---

## Quick Navigation to Correlation Matrix Parts

For detailed technical analysis, open the dedicated reference documents in `_referencias/design-system/matrix/`:
- **Master Index & Taxonomy**: [`_referencias/design-system/matrix/README.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/README.md)
- **Part 1: Tokens, Styling & Primitives**: [`_referencias/design-system/matrix/01-tokens-and-foundations.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/01-tokens-and-foundations.md)
- **Part 2: 1:1 Shared Components (53 items)**: [`_referencias/design-system/matrix/02-common-components-matrix.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/02-common-components-matrix.md)
- **Part 3: Exclusive & Asymmetric Components (42 items)**: [`_referencias/design-system/matrix/03-exclusive-components.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/03-exclusive-components.md)
- **Part 4: Blocks, Canvas Shaders & Extras**: [`_referencias/design-system/matrix/04-blocks-canvas-and-extras.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/04-blocks-canvas-and-extras.md)
- **Part 5: Decision Tree & Harmonization Playbook**: [`_referencias/design-system/matrix/05-skill-decision-tree.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/05-skill-decision-tree.md)
- **Apple HIG & Tripartite Correlation Suite (124 items)**: [`_referencias/design-system/matrix/apple-hig/README.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/apple-hig/README.md)
- **Impeccable Quadripartite Correlation Suite**: [`_referencias/design-system/matrix/impeccable/README.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/impeccable/README.md)

---

## Sister Skills in the Workspace

- **[Impeccable Design Quality & Craft Skill](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/impeccable/SKILL.md)**: Auditing, polishing, and dialing interface boldness or restraint.
- **[Apple Design & HIG Skill](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/apple-design/SKILL.md)**: Apple HIG compliance, 44pt touch targets, Apple Pay rules, and cross-platform translations.

---

## When to Use Which System

| Use Case | Recommended Source | Best Starting Items |
| :--- | :---: | :--- |
| **Marketing Landing Pages** | **BoldKit.dev** | Blocks: `hero-section`, `bento-grid`, `pricing-section`, `testimonials`, `cta-section` |
| **Data Dashboards & Analytics** | **BoldKit.dev** | Blocks: `dashboard-layout`; UI: `ui/chart/*`, `data-table`, `statcard` |
| **AI Assistant / Chat Interface** | **Neobrutalism.com** | `bubble`, `message`, `attachment`, `marker`, `message-scroller` (or BoldKit `m.author`) |
| **Complex Form Wizards** | **BoldKit.dev** | `stepper`, `multi-step-form`, `number-field`, `tag-input` |
| **Validated Forms (Zod/HookForm)**| **Neobrutalism.com** | `form.md` + `input`, `field`, `select` |
| **Retro & Playful Visuals** | **BoldKit.dev** | `ascii-shapes`, `sticker`, `layered-card`, Canvas effects (`CRT`, `Dither`, `Plasma`) |
| **Clean Minimalist Brutalism** | **Neobrutalism.com** | 2px border components (`border-2 border-border`, `shadow-shadow`) |

---

## Step-by-Step Agent Workflow

When a user asks you to implement a UI feature with brutalist aesthetics:

### Step 1: Identify Component Availability
Check the **Master Quick-Reference Table** below. Determine whether the component exists in Neobrutalism, BoldKit, or both.

### Step 2: Install via Shadcn CLI
Run the appropriate command using bash:
```bash
# To install from Neobrutalism registry:
npx shadcn@latest add "https://neobrutalism.com/r/<component-name>.json"

# To install from BoldKit registry:
npx shadcn@latest add "https://boldkit.dev/r/<component-name>.json"
```

### Step 3: Reconcile Token Discrepancies
Ensure your target component matches the application's stroke width:
- **If your project uses 2px borders**: Change `border-3 border-foreground` to `border-2 border-border` and adjust `shadow-[4px_4px_0px_...]` to `shadow-shadow`.
- **If your project uses 3px borders**: Change `border-2 border-border` to `border-3 border-foreground` and ensure hover translation matches (`active:translate-x-[4px] active:translate-y-[4px]`).

---

## Master Quick-Reference Table

### 1. Form Controls & Inputs
| Component | Primary Source | CLI Registry Command | Primitives |
| :--- | :---: | :--- | :---: |
| `button` | Both | `npx shadcn@latest add "https://boldkit.dev/r/button.json"` | Radix / Base UI |
| `button-group` | Both | `npx shadcn@latest add "https://boldkit.dev/r/button-group.json"` | Native React |
| `checkbox` | Both | `npx shadcn@latest add "https://boldkit.dev/r/checkbox.json"` | Radix / Base UI |
| `combobox` | Both | `npx shadcn@latest add "https://boldkit.dev/r/combobox.json"` | Command + Popover |
| `field` | Both | `npx shadcn@latest add "https://boldkit.dev/r/field.json"` | Native React |
| `input` | Both | `npx shadcn@latest add "https://boldkit.dev/r/input.json"` | Native React |
| `input-group` | Both | `npx shadcn@latest add "https://boldkit.dev/r/input-group.json"` | Native React |
| `input-otp` | Both | `npx shadcn@latest add "https://boldkit.dev/r/input-otp.json"` | `input-otp` |
| `number-field` | **BoldKit Exclusive** | `npx shadcn@latest add "https://boldkit.dev/r/number-field.json"` | Native React |
| `radio-group` | Both | `npx shadcn@latest add "https://boldkit.dev/r/radio-group.json"` | Radix / Base UI |
| `select` | Both | `npx shadcn@latest add "https://boldkit.dev/r/select.json"` | Radix / Base UI |
| `slider` | Both | `npx shadcn@latest add "https://boldkit.dev/r/slider.json"` | Radix / Base UI |
| `switch` | Both | `npx shadcn@latest add "https://boldkit.dev/r/switch.json"` | Radix / Base UI |
| `tag-input` | **BoldKit Exclusive** | `npx shadcn@latest add "https://boldkit.dev/r/tag-input.json"` | Native React |
| `textarea` | Both | `npx shadcn@latest add "https://boldkit.dev/r/textarea.json"` | Native React |
| `toggle` | Both | `npx shadcn@latest add "https://boldkit.dev/r/toggle.json"` | Radix / Base UI |

### 2. Navigation & Structure
| Component | Primary Source | CLI Registry Command |
| :--- | :---: | :--- |
| `breadcrumb` | Both | `npx shadcn@latest add "https://boldkit.dev/r/breadcrumb.json"` |
| `dropdown-menu` | Both | `npx shadcn@latest add "https://boldkit.dev/r/dropdown-menu.json"` |
| `menubar` | Both | `npx shadcn@latest add "https://boldkit.dev/r/menubar.json"` |
| `navigation-menu` | Both | `npx shadcn@latest add "https://boldkit.dev/r/navigation-menu.json"` |
| `pagination` | Both | `npx shadcn@latest add "https://boldkit.dev/r/pagination.json"` |
| `sidebar` | Both | `npx shadcn@latest add "https://boldkit.dev/r/sidebar.json"` |
| `tree-view` | **BoldKit Exclusive** | `npx shadcn@latest add "https://boldkit.dev/r/tree-view.json"` |

### 3. Feedback & Overlays
| Component | Primary Source | CLI Registry Command |
| :--- | :---: | :--- |
| `alert` | Both | `npx shadcn@latest add "https://boldkit.dev/r/alert.json"` |
| `alert-dialog` | Both | `npx shadcn@latest add "https://boldkit.dev/r/alert-dialog.json"` |
| `dialog` | Both | `npx shadcn@latest add "https://boldkit.dev/r/dialog.json"` |
| `drawer` | Both | `npx shadcn@latest add "https://boldkit.dev/r/drawer.json"` |
| `popover` | Both | `npx shadcn@latest add "https://boldkit.dev/r/popover.json"` |
| `sheet` | Both | `npx shadcn@latest add "https://boldkit.dev/r/sheet.json"` |
| `sonner` | **BoldKit Exclusive** | `npx shadcn@latest add "https://boldkit.dev/r/sonner.json"` |
| `toast` | Both | `npx shadcn@latest add "https://boldkit.dev/r/toast.json"` |
| `tooltip` | Both | `npx shadcn@latest add "https://boldkit.dev/r/tooltip.json"` |

### 4. AI & Chat Primitives
| Component | Primary Source | CLI Registry Command |
| :--- | :---: | :--- |
| `m.author` (Full AI Suite) | **BoldKit Exclusive** | `npx shadcn@latest add "https://boldkit.dev/r/mauthor.json"` |
| `bubble` (Chat bubble) | **Neobrutalism Exclusive** | `npx shadcn@latest add "https://neobrutalism.com/r/bubble.json"` |
| `message` (Chat message card) | **Neobrutalism Exclusive** | `npx shadcn@latest add "https://neobrutalism.com/r/message.json"` |
| `message-scroller` | **Neobrutalism Exclusive** | `npx shadcn@latest add "https://neobrutalism.com/r/message-scroller.json"` |
| `attachment` | **Neobrutalism Exclusive** | `npx shadcn@latest add "https://neobrutalism.com/r/attachment.json"` |
| `marker` | **Neobrutalism Exclusive** | `npx shadcn@latest add "https://neobrutalism.com/r/marker.json"` |

### 5. Layout Blocks (BoldKit Exclusive)
| Block Type | Available Sections | Source Directory |
| :--- | :--- | :--- |
| **Marketing Blocks (14)** | `hero-section`, `bento-grid`, `feature-grid`, `pricing-section`, `comparison-table`, `testimonials`, `faq-section`, `stats-section`, `cta-section`, `team-section`, `logo-cloud`, `changelog`, `contact-section`, `footer-section` | `_referencias/design-system/boldkit/blocks-code/marketing/` |
| **Application Blocks (6)** | `auth-forms`, `dashboard-layout`, `onboarding-flow`, `settings-page`, `error-pages`, `client` (invoices) | `_referencias/design-system/boldkit/blocks-code/application/` |

---

## Verification & Sanity Checks

To verify that component files and references are intact in your project:
```bash
# Check if Shadcn CLI can reach BoldKit registry:
npx shadcn@latest add "https://boldkit.dev/r/button.json" --dry-run

# Check if Shadcn CLI can reach Neobrutalism registry:
npx shadcn@latest add "https://neobrutalism.com/r/button.json" --dry-run
```
