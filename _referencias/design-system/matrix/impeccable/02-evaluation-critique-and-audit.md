# Part 2: Evaluation, Critique & Quality Auditing Correlation Matrix

This document provides an exhaustive, 3-layer architectural correlation crossing **Impeccable's Evaluation & Quality Auditing commands (`critique`, `audit`, `audit.native`, `doctor`, `component-review`, `hooks`)** with **Apple Design (HIG)**, **BoldKit.dev**, and **Neobrutalism.com**.

---

## Layer 2: Macro-Thematic Group Analysis

### 1. Heuristic Critique vs Technical Code Auditing
Impeccable separates design review into two distinct, complementary operations:
- **`critique` (Subjective & Heuristic Quality)**: Evaluates layout along 6 core axes (Hierarchy, Alignment, Typography, Color, Affordance, Delight). It asks: *Does this design have a clear point of view? Is the visual hierarchy obvious at a glance? Does it avoid category habits?*
- **`audit` (Objective & Technical Quality)**: Inspects source code against non-negotiable thresholds. It asks: *Do all touch targets meet 44x44pt? Does text achieve 4.5:1 WCAG contrast? Does layout reflow without horizontal scroll? Are Apple Pay buttons unmodified?*

### 2. The Brutalist Advantage & Pitfalls Under Review
- **Brutalist Strengths**: Naturally achieves top scores in **Affordance** (thick borders leave zero doubt what is clickable) and **Color Contrast** (black strokes on bright fills easily achieve 21:1 contrast).
- **Brutalist Vulnerabilities**: Frequently penalized under `audit.native.md` for **undersized touch targets** (Neobrutalism's `h-10` 40px buttons fail Apple's 44pt rule) and under `critique.md` for **visual overstimulation** (too many competing borders and neon colors causing cognitive fatigue).

---

## Layer 3: 6 Individual Quadripartite Technical Cards

### 2.1 `critique.md` — Heuristic 6-Axis Design Review & Scoring

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/critique.md`](../../impeccable/skill/reference/critique.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/design-principles.md (Apple 8 Principles)` |
| **BoldKit.dev Correlation** | `boldkit/components/ (tactile physics evaluation)` |
| **Neobrutalism Correlation** | `neobrutalism/components/ (editorial minimalism evaluation)` |
| **Common Ground** | Both methodologies prioritize intentional visual hierarchy, obvious affordances, and delightful interaction loops. |
| **Quadripartite Particularities** | Apple judges subtlety, deference, and optical balance; Impeccable scores across 6 strict axes and calls out bland "category habit"; Brutalism celebrates high tactile affordance. |

**Web / React Implementation Recipe**:
- Run a structured critique scoring: Hierarchy (1-5), Alignment (1-5), Typography (1-5), Color (1-5), Affordance (1-5), Delight (1-5). Flag any score below 4 with actionable code refactors.

---

### 2.2 `audit.md` — Technical Quality & Web Accessibility Audit

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/audit.md`](../../impeccable/skill/reference/audit.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/accessibility.md, layout.md` |
| **BoldKit.dev Correlation** | `boldkit/lib/utils.ts, axe-core automated tests` |
| **Neobrutalism Correlation** | `neobrutalism/ui/ (ARIA semantic roles)` |
| **Common Ground** | Ensuring WCAG AA 4.5:1 text contrast, complete keyboard accessibility (tabindex, focus visible), and responsive viewport reflow. |
| **Quadripartite Particularities** | Apple uses accessibility inspector and VoiceOver; BoldKit tests with `axe-core` and happy-dom; Impeccable audits CSS overflow and text truncation. |

**Web / React Implementation Recipe**:
- Audit source code using automated grep checks for focus rings (`focus-visible:ring-2`), missing alt tags, and hardcoded viewport widths.

---

### 2.3 `audit.native.md` — Native Platform & App Store Rejection Audit

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/audit.native.md`](../../impeccable/skill/reference/audit.native.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/code-audit.md, apple-pay.md` |
| **BoldKit.dev Correlation** | `boldkit/blocks/application/ (native review)` |
| **Neobrutalism Correlation** | `neobrutalism/hooks/use-mobile.ts` |
| **Common Ground** | Preventing App Store rejections under Guidelines 4.0 (Design), 4.9 (Apple Pay), and 2.5.5 (Target Size). |
| **Quadripartite Particularities** | Apple strictly rejects hand-drawn Apple Pay buttons, missing safe area padding, and sub-44pt touch targets; Impeccable scans for regex anti-patterns in source code. |

**Web / React Implementation Recipe**:
- Run automated checks: verify Apple Pay uses `<apple-pay-button>`, mobile buttons use `min-h-[44px]`, and fixed bars use `pb-[env(safe-area-inset-bottom)]`.

---

### 2.4 `doctor.md` — Design System Drift Detection & Health Check

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/doctor.md`](../../impeccable/skill/reference/doctor.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/cross-platform.md` |
| **BoldKit.dev Correlation** | `boldkit/registry.json, DEPENDENCIES.md` |
| **Neobrutalism Correlation** | `neobrutalism/package.reference.json, DEPENDENCIES.md` |
| **Common Ground** | Detecting discrepancies between design token specifications (DESIGN.md) and actual implementation code in components. |
| **Quadripartite Particularities** | Apple ensures HIG consistency across OS updates; BoldKit tracks registry versions; Impeccable flags `CONTEXT_STALE` and auto-heals token drift. |

**Web / React Implementation Recipe**:
- Execute `impeccable doctor` to detect hardcoded hex colors, mismatched border widths, or outdated component dependencies.

---

### 2.5 `component-review.md` — Granular Single-Component Craft Audit

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/component-review.md`](../../impeccable/skill/reference/component-review.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/hig/ (57 component specs)` |
| **BoldKit.dev Correlation** | `boldkit/ui/ (84 components)` |
| **Neobrutalism Correlation** | `neobrutalism/ui/ (64 components)` |
| **Common Ground** | Verifying that an isolated component fulfills all states (default, hover, active, focus, disabled, loading, error). |
| **Quadripartite Particularities** | Apple specifies subtle opacity and tint shifts; BoldKit specifies active translation into shadow (`active:translate-x-[4px]`); Neobrutalism uses `shadow-none` on hover. |

**Web / React Implementation Recipe**:
- Audit a component across 6 mandatory states: default, hover, active, focus-visible, disabled (`data-disabled`), and loading.

---

### 2.6 `hooks.md` — Automated Real-Time Design Linter Hook

| Dimension | Technical Detail |
| :--- | :--- |
| **Impeccable Reference** | [`references/hooks.md`](../../impeccable/skill/reference/hooks.md) |
| **Apple HIG Correlation** | `apple_design/skill/references/code-audit.md` |
| **BoldKit.dev Correlation** | `boldkit/scripts/ (test harnesses)` |
| **Neobrutalism Correlation** | `neobrutalism/scripts/` |
| **Common Ground** | Preventing visual regressions and quality drops by linting UI file changes immediately upon save. |
| **Quadripartite Particularities** | Apple relies on Xcode static analysis; Impeccable installs a lightweight detector hook that flags design rule violations in the agent session. |

**Web / React Implementation Recipe**:
- Enable hooks with `impeccable hooks on` to automatically surface design rule violations after editing UI source files.

---
