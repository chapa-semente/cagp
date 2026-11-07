# Part 5: Adaptive Layouts, Onboarding & Layout Blocks Correlation Matrix

This document provides an exhaustive, 3-layer architectural correlation crossing **Impeccable's Adaptive & Functional Fix commands (`adapt`, `adapt.native`, `onboard`, `clarify`, `optimize`, `ios`, `android`)** with **Apple Design (HIG)**, **BoldKit.dev Layout Blocks**, and **Neobrutalism.com**.

---

## Layer 2: Macro-Thematic Group Analysis

### 1. Viewport Adaptation: Responsive Web vs Native Postures
Adapting an interface across form factors requires harmonizing two very different technical worlds:
- **Apple Platforms**: Relies on Size Classes (`compact` vs `regular`), Dynamic Island insets, safe areas, and foldable posture transitions on dual-display devices (`designing-for-iphone-duo.md`).
- **Web Brutalism**: Leverages CSS Container Queries and media breakpoints (`sm:`, `md:`, `lg:`). BoldKit's 20 layout blocks provide built-in responsive reflow: sidebars automatically collapse into bottom drawers, multi-column bento grids collapse to stacked single columns, and stat-card rows scroll horizontally on mobile.
- **Impeccable's Synthesis (`adapt` / `adapt.native`)**: Audits layout shifts, ensures horizontal scrolling never occurs inadvertently, and enforces touch target expansion on compact screens.

### 2. Onboarding & Empty States: First-Run Activation
- **Apple**: Mandates immediate app utility without mandatory sign-up barriers, using minimal launch screens.
- **BoldKit**: Supplies a complete 6-step interactive onboarding block (`onboarding-flow.tsx`) and step wizard (`stepper.tsx`).
- **Neobrutalism**: Provides multi-step question flows (`questionnaire.tsx`) and empty state callouts (`empty.tsx`).
- **Impeccable (`onboard`)**: Guides agents to design the **day-zero empty state**, transforming blank tables into helpful invitation cards with clear primary CTAs.

---

## Layer 3: 7 Individual Quadripartite Technical Cards

### 5.1 `adapt.md` — Adapt: Responsive Web Breakpoints & Viewport Reflow

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/adapt.md`](../../impeccable/skill/reference/adapt.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/layout.md (size classes)` |
| **BoldKit.dev Correlation** | `boldkit/blocks/marketing/* (responsive breakpoints)` |
| **Neobrutalism Correlation** | `neobrutalism/hooks/use-mobile.ts` |
| **Common Ground** | Interfaces must adapt gracefully across screen sizes without horizontal clipping or awkward whitespace voids. |
| **Quadripartite Particularities** | Apple uses Compact/Regular size classes; BoldKit uses Tailwind `md:` and `lg:` grid reflows; Neobrutalism uses a custom `use-mobile.ts` hook. |

**Web / React Implementation Recipe**:
- Test at 375px (mobile), 768px (tablet), and 1280px (desktop). Use `flex-col md:flex-row` and hide non-essential desktop sidebars behind mobile drawers.

---

### 5.2 `adapt.native.md` — Adapt Native: Mobile Insets, Gestures & Foldables

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/adapt.native.md`](../../impeccable/skill/reference/adapt.native.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/designing-for-iphone-duo.md, safe areas` |
| **BoldKit.dev Correlation** | `boldkit/blocks-code/application/dashboard-layout.tsx (drawer)` |
| **Neobrutalism Correlation** | `neobrutalism/ui/direction.tsx (RTL)` |
| **Common Ground** | Respecting hardware cutouts, home indicators, system swipe gestures, and foldable hinges. |
| **Quadripartite Particularities** | Apple requires strict adherence to safe area margins and dual-screen seam avoidance; Impeccable flags unpadded fixed elements. |

**Web / React Implementation Recipe**:
- Wrap mobile bottom navigation in `pb-[env(safe-area-inset-bottom,16px)]` and ensure edge gestures do not clash with iOS back-swipe.

---

### 5.3 `onboard.md` — Onboard: First-Run Wizards, Setup & Empty States

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/onboard.md`](../../impeccable/skill/reference/onboard.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/onboarding.md, launching.md` |
| **BoldKit.dev Correlation** | `boldkit/blocks-code/application/onboarding-flow.tsx, ui/tour.tsx` |
| **Neobrutalism Correlation** | `neobrutalism/ui/questionnaire.tsx, empty.tsx` |
| **Common Ground** | Welcoming new users, explaining core value, capturing initial preferences, and activating empty views. |
| **Quadripartite Particularities** | Apple prefers lightweight, immediate app access; BoldKit supplies pre-built multi-step onboarding wizard blocks; Neobrutalism provides questionnaire forms. |

**Web / React Implementation Recipe**:
- Render an actionable empty state when data is empty: `<EmptyState icon={<FolderPlus />} title="No projects yet" action={<Button>CREATE FIRST PROJECT</Button>} />`.

---

### 5.4 `clarify.md` — Clarify: UX Copy, Microcopy & Action Labels

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/clarify.md`](../../impeccable/skill/reference/clarify.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/writing.md (active, concise voice)` |
| **BoldKit.dev Correlation** | `boldkit/blocks/ (microcopy standards in blocks)` |
| **Neobrutalism Correlation** | `neobrutalism/components/ (label examples)` |
| **Common Ground** | Clarity, brevity, unambiguous button labels, and helpful error recovery guidance. |
| **Quadripartite Particularities** | Apple uses warm, conversational, friendly microcopy; Brutalism uses punchy, blunt, imperative action words (BUY, DEPOSIT, RUN, DELETE). |

**Web / React Implementation Recipe**:
- Replace passive generic copy ("There was an error") with actionable clarity ("Payment declined: card expired. Please update payment method").

---

### 5.5 `optimize.md` — Optimize: Rendering Performance & 60fps Defense

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/optimize.md`](../../impeccable/skill/reference/optimize.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/loading.md, performance` |
| **BoldKit.dev Correlation** | `boldkit/lib/canvas-effect-core.ts (throttling, reduced motion)` |
| **Neobrutalism Correlation** | `neobrutalism/lib/utils.ts (clean lightweight primitives)` |
| **Common Ground** | Smooth 60fps scrolling, minimal re-renders, fast time-to-interactive, and battery efficiency. |
| **Quadripartite Particularities** | Apple measures Metal/CoreAnimation frame drops; BoldKit throttles canvas shader rendering when offscreen or in background tabs. |

**Web / React Implementation Recipe**:
- Pause Canvas shaders when out of viewport using IntersectionObserver, and honor `prefers-reduced-motion` across all CSS transitions.

---

### 5.6 `ios.md` — iOS Platform Conventions & Human Interface Fidelity

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/ios.md`](../../impeccable/skill/reference/ios.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/designing-for-ios.md` |
| **BoldKit.dev Correlation** | `boldkit/blocks-code/application/ (iOS web ergonomics)` |
| **Neobrutalism Correlation** | `neobrutalism/hooks/use-mobile.ts` |
| **Common Ground** | One-handed reachability, bottom tab bar navigation, swipe-to-go-back, and 44pt touch targets. |
| **Quadripartite Particularities** | Apple strictly enforces native iOS controls and navigation controllers; Web applications emulate these through touch drawers and bottom tab bars. |

**Web / React Implementation Recipe**:
- Anchor primary actions in the thumb zone at the bottom of the screen; avoid critical top-left triggers on mobile.

---

### 5.7 `android.md` — Android & Material Design Cross-Platform Balance

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/android.md`](../../impeccable/skill/reference/android.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/cross-platform.md` |
| **BoldKit.dev Correlation** | `boldkit/styles/globals.css (cross-platform tokens)` |
| **Neobrutalism Correlation** | `neobrutalism/styling/globals.css` |
| **Common Ground** | Accommodating Android hardware back buttons, Material surface elevation, and 48dp touch targets. |
| **Quadripartite Particularities** | Android uses 48dp touch targets and Material elevation shadows; BoldKit's 44-48px button height and hard shadows work seamlessly across both platforms. |

**Web / React Implementation Recipe**:
- Ensure back button handles modal dismissal on Android/web, and scale touch targets to at least 48px for cross-platform parity.

---
