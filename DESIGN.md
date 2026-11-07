---
name: CAGP SuperApp
description: Quadripartite Design System (Neobrutalism + BoldKit + Apple HIG + Impeccable) for UFMG Public Administration & Chapa Semente
colors:
  primary: "#5B2A86"
  primary-hover: "#4A216E"
  primary-foreground: "#ffffff"
  accent: "#FF8811"
  accent-hover: "#E07406"
  accent-foreground: "#000000"
  petrol: "#134E4A"
  petrol-hover: "#0F3D3E"
  petrol-foreground: "#ffffff"
  secondary: "#9E2424"
  secondary-hover: "#8B1E2D"
  secondary-foreground: "#ffffff"
  background: "#f4f0ea"
  foreground: "#16181d"
  card: "#ffffff"
  card-foreground: "#16181d"
  muted: "#e7e2d9"
  muted-foreground: "#4a4d57"
  border: "#16181d"
  shadow-color: "#16181d"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Space Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.primary-foreground}"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-accent-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.accent-foreground}"
  button-petrol:
    backgroundColor: "{colors.petrol}"
    textColor: "{colors.petrol-foreground}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-petrol-hover:
    backgroundColor: "{colors.petrol-hover}"
    textColor: "{colors.petrol-foreground}"
  card-default:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.lg}"
    padding: "20px"
---

# Design System: CAGP SuperApp

## Overview

**Creative North Star: "O Manifesto Tátil Estudantil" (The Student Tactile Manifesto)**

The CAGP SuperApp visual system synthesizes four distinct design philosophies into an authoritative, high-contrast, and deeply tactile interface designed specifically for students of Public Administration at UFMG (FAFICH). It rejects generic SaaS aesthetics—soft blur shadows, sterile corporate cards, and pastel gradients—in favor of physical certainty, bold typography, paper-like warmth, and mechanical responsiveness.

The interface serves a dual mandate: an immediate, high-impact campaign platform for **Chapa Semente** in the student union elections, and a permanent, offline-first digital infrastructure for all Gestão Pública students. The design communicates radical competence: complex bureaucratic norms (CEPE resolutions, 120-day deadlines, 600h curricular requirements) are transformed into tactile, unmissable tools that feel physical to interact with on a smartphone in a dimly lit hallway or bus.

**Key Characteristics:**
- **Mechanical Tactility**: High-contrast 3px solid ink borders (`#16181D`) paired with hard unblurred offset shadows and a physical 2px depression on click/press.
- **Tetra-Layer Semantic Color**: Disciplined chromatic roles balancing institutional leadership (Roxo Semente), student mobilization (Laranja Germinar), academic success (Verde Petróleo), and university history/critical alerts (Vermelho CAGP).
- **Apple HIG Ergonomics**: 44x44pt minimum touch targets, native safe-area insets (`env(safe-area-inset-*)`), and comfortable dynamic type scaling.
- **Reading Comfort & Exclusive Light Mode**: Warm daylight background (Papel Creme `#F4F0EA`) reducing ocular fatigue across prolonged study sessions. The application is strictly light-mode only; dark mode is explicitly omitted and disallowed.

---

## Colors

The color system is organized into four semantic institutional layers and a robust neutral foundation. Every color serves an unambiguous functional and civic purpose.

### Primary
- **Roxo Semente** (`#5B2A86` / Hover: `#4A216E` / Text: `#FFFFFF`): Represents institutional governance, campaign identity, and visionary leadership. Used for topbar headers, major action anchors, active navigation indicators, and primary identity badges.

### Secondary
- **Vermelho CAGP / FAFICH** (`#9E2424` / Hover: `#8B1E2D` / Text: `#FFFFFF`): Represents UFMG tradition, historical student struggle, and critical alerts. Used for 120-day deadline countdowns (ACG Guardian), urgent announcements, and collegiate grievance notices.

### Tertiary (Accent & Specialized Semantics)
- **Laranja Germinar** (`#FF8811` / Hover: `#E07406` / Text: `#000000`): High-conversion call-to-action color. Used for election vote pledges, leadership tour launches, primary CTA buttons, and first-access welcoming elements.
- **Verde Petróleo** (`#134E4A` / Hover: `#0F3D3E` / Text: `#FFFFFF`): Represents academic completion, institutional transparency, and official validation. Used for the 600h progress bar, internship Art. 41 exemption seals, and the live Transparency Portal ledger.

### Neutral
- **Papel Creme** (`#F4F0EA`): The canonical light-mode canvas background. Provides an editorial, paper-like surface that avoids the glare of pure `#FFFFFF`.
- **Preto Tinta** (`#16181D`): Deep graphite ink outline used for all 3px borders, text headers, icons, and hard drop shadows.
- **Superfície Card** (`#FFFFFF`): High-contrast crisp white background for interactive cards, dialogs, and input fields.
- **Cinza Mudo** (`#E7E2D9` / Text: `#4A4D57`): Neutral dividers, inactive tabs, secondary tags, and table header rows.

### Named Rules
- **The Exclusive Light-Mode Rule**: The entire application operates strictly and exclusively in Light Mode (Papel Creme `#F4F0EA` canvas, Card White `#FFFFFF`, and Preto Tinta `#16181D`). There is no dark mode toggle, no `.dark` theme variants, and no inverted dark styling. Dark mode undermines the physical editorial print metaphor and dilutes the tactile neobrutalist aesthetic. All components are designed and audited solely for light mode.
- **The Ink Integrity Rule**: Every card, button, modal, and badge must carry a visible, solid `--border: #16181D` of at least 2px (default 3px). Borderless floating containers are strictly prohibited.
- **The High-Conversion Accent Rule**: Laranja Germinar (`#FF8811`) is reserved strictly for primary student actions (vote pledge, start calculation, submit petition). It must not exceed 10% of any view to preserve maximum visual urgency.

---

## Typography

The typography system pairs an expressive neo-grotesque display font with an ultra-legible modern sans for reading, complemented by a monospaced font for data, hours, and codes.

**Display Font:** `Bricolage Grotesque` (Weights: 600, 700, 800) with system-ui fallback  
**Body Font:** `Plus Jakarta Sans` (Weights: 400, 500, 600) with sans-serif fallback  
**Data & Mono Font:** `Space Mono` (Weights: 400, 700) with monospace fallback  

**Character:** Bold, authoritative, and unapologetically civic. Large headings feel like editorial letterpress headlines; tabular data feels like an immutable public ledger.

### Hierarchy
- **Display** (800 weight, 3rem / 48px, line-height 1.1, tracking -0.03em): Hero headlines, campaign slogans, and high-impact section titles.
- **Headline** (700 weight, 2rem / 32px, line-height 1.2, tracking -0.02em): Page titles and primary feature headers.
- **Title** (600 weight, 1.25rem / 20px, line-height 1.3): Card titles, modal headers, and drawer section labels.
- **Body** (400 weight, 1rem / 16px, line-height 1.5, max-width 65–70ch): Core explanatory text, tutorials, and normative article excerpts.
- **Label / Data** (500/700 weight, 0.875rem / 14px, tracking 0.05em, Space Mono): ACG credit tallies, course codes (e.g. `DCP032`), timestamps, currency figures, and badge pills.

### Named Rules
- **The 65ch Reading Rule**: Body text columns must never exceed 70 characters in line width to ensure effortless scanning on wide screens.
- **The Monospace Ledger Rule**: All numerical statistics, hours, deadlines, and financial amounts must be rendered in `Space Mono` to convey tabular precision and auditability.

---

## Layout

The layout follows a mobile-first responsive architecture designed for one-handed thumb reach on student smartphones, expanding gracefully into multi-column editorial spreads on desktop viewports.

- **Grid & Containers**: Centered container with max-width `1280px` (`max-w-7xl`) for wide dashboards; `768px` (`max-w-3xl`) for editorial guides and forms.
- **Spacing Scale**: 4px (`xs`), 8px (`sm`), 16px (`md`), 24px (`lg`), 32px (`xl`), 48px (`2xl`). Internal component padding defaults to 16px on mobile and 20–24px on desktop.
- **Safe-Area Insets**: Full native iOS/Android compliance via `padding-bottom: max(16px, env(safe-area-inset-bottom))` and `padding-top: env(safe-area-inset-top)` on sticky headers and floating bottom navigation bars.
- **Adaptive Reordering**: On the Home dashboard, widget layout reorders based on active student persona (`studentVault.ts`) without layout shifts or reloading.

---

## Elevation & Depth

The system uses purely mechanical, hard-edged physical offset shadows with **zero blur radius**. Elevation represents physical thickness rather than ethereal floating distance.

### Shadow Vocabulary
- **Micro (`--shadow-xs`)**: `1px 1px 0 0 #16181D` (Used for small badges, tags, and tight chips).
- **Small (`--shadow-sm`)**: `2px 2px 0 0 #16181D` (Used for form inputs, table rows, and secondary action buttons).
- **Default (`--shadow`)**: `3px 3px 0 0 #16181D` (Used for standard interactive cards, drawer handles, and primary buttons).
- **Medium (`--shadow-md`)**: `4px 4px 0 0 #16181D` (Used for hero action cards, persona selector pills, and key highlights).
- **Large (`--shadow-lg`)**: `6px 6px 0 0 #16181D` (Used for modals, floating bottom bars, and active dialog sheets).

### Named Rules
- **The No-Blur Reality Rule**: `box-shadow` blur radius must always be `0px`. Blurred ambient glows are strictly banned.
- **The Mechanical Depression Rule**: Interactive buttons and cards with a 3px/4px shadow must translate `2px 2px` on active press (`:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0 0 #16181D; }`) simulating physical button depression.

---

## Shapes

- **Corner Strategy**: Smooth 12px squircle curvature (`--radius: 0.75rem` / `rounded-xl`) on cards, modals, and buttons, maintaining Apple HIG geometric warmth inside neobrutalist borders.
- **Border Stroke**: Deep ink stroke fixed at `3px` (`--border-w: 3px`) for primary cards, buttons, and badges; `2px` allowed only for nested list items and dense data tables.
- **Signature Silhouettes**:
  - *Postal Stamp Borders (`cagp-stamp`)*: Perforated border-radius silhouettes used for institutional certificates and commemorative milestones.
  - *Pixel Avatar Frames*: Neobrutalist avatar badge containers with 3px stroke and hard offset tag.

---

## Components

### Buttons
- **Shape**: Rounded squircle (`12px` / `--radius`), 3px solid `#16181D` border.
- **Primary (Roxo Semente)**: `#5B2A86` fill, white text, 12px 24px padding, 44pt minimum touch height.
- **Accent (Laranja Germinar)**: `#FF8811` fill, black text, bold tracking.
- **Petrol (Verde Petróleo)**: `#134E4A` fill, white text, for verification and calculation approvals.
- **States**: Hover shifts background color slightly darker without moving; Active press triggers `translate(2px, 2px)` depression with collapsed shadow.

### Cards & Containers
- **Corner Style**: `12px` radius with `3px` solid `#16181D` ink border.
- **Background**: `#FFFFFF` (default), `#F4F0EA` (nested), or `#134E4A` (dark petrol highlight card).
- **Shadow**: `3px 3px 0 0 #16181D` (resting).
- **Internal Padding**: 16px on mobile viewports, 24px on desktop.

### Inputs & Fields
- **Style**: White background, 3px solid `#16181D` border, 12px radius, 14px Space Mono or 16px Plus Jakarta Sans text.
- **Focus**: High-visibility outline ring (`3px solid #5B2A86` or `#FF8811`) with hard shadow lift.
- **Error**: Solid `#9E2424` border with immediate descriptive microcopy below field.

### Navigation Shell
- **Topbar**: Sticky header with blur backdrop (`backdrop-blur-md`), 3px bottom ink divider, and rapid persona switch pill.
- **Bottom Bar (Mobile)**: Floating docked pill with 44pt touch targets, icons with labels, and safe-area padding.
- **Sidebar (Desktop)**: Collapsible drawer with mechanical pill highlights on active navigation links.

### Signature Components
- **ACG Guardian Countdown Widget**: Real-time ticker counting down the 120-day CEPE limit with Vermelho CAGP alert thresholds.
- **600h Progress Bar**: Multi-segment progress indicator dividing Research, Teaching, and Extension hours with Verde Petróleo fill and 3px divider lines.
- **Interactive Tour Stop (BoldKit `Tour`)**: Neobrutalist overlay modal featuring candidate portraits, official quotes, and direct action triggers.
- **Student Passport Vault (`studentVault.ts`)**: Client-side encrypted identity card with customizable pixel avatar and unlocked Candango milestones.

---

## Do's and Don'ts

### Do:
- **Do** maintain a strict 44x44pt minimum touch target for all buttons, links, tabs, and interactive icons.
- **Do** apply `3px solid #16181D` borders and hard `0px blur` offset shadows across all card and button primitives.
- **Do** depress interactive components on click/press by applying `transform: translate(2px, 2px)`.
- **Do** test and enforce WCAG AA/AAA color contrast ratios exclusively against the Papel Creme (`#F4F0EA`) and Card White surfaces.
- **Do** use `Space Mono` for all numbers, course codes, hour calculations, and financial balances.
- **Do** keep 100% of student data, grade records, and ACG certificates confined to client-side storage (`studentVault` in `localStorage`).

### Don't:
- **Don't** implement, scaffold, or allow dark mode themes, dark mode media queries (`@media (prefers-color-scheme: dark)`), or `.dark` CSS overrides. The design system is strictly light mode only.
- **Don't** use soft, blurry box shadows (e.g. `box-shadow: 0 10px 30px rgba(0,0,0,0.1)`).
- **Don't** use borderless floating cards or translucent pastel gradients.
- **Don't** use low-contrast grey text (never use text lighter than `#4A4D57` on `#F4F0EA`).
- **Don't** introduce external login requirements, cloud databases, or tracking telemetry.
- **Don't** ship generic unstyled inputs or default browser focus outlines.
- **Don't** overload screens with Laranja Germinar (`#FF8811`); reserve it exclusively for high-conversion CTAs.
