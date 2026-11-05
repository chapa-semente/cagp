# Specification Mining & Authoritative Standards Survey Report: Apple Impeccable, Apple HIG & Adversarial Audit Tooling

**Agent**: `explorer_survey_3` (Archetype: `teamwork_spec_miner`)  
**Parent**: `526c3e23-dab2-44fa-aace-fff0d311bb71`  
**Date**: 2026-11-05  
**Working Directory**: `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/explorer_survey_3/`  
**Target Project**: CAGP (`/home/gsathler/Nextcloud/Projects/cagp`)

---

## 1. Observation

Direct observations obtained by inspecting canonical specification files and executing audit tooling in the workspace:

### 1.1 Inspected Specification Sources
1. **Apple-Impeccable Core & Meta-Skill**:
   - `.agents/skills/apple-impeccable/SKILL.md`: Defines principles of Total Theme Neutrality, 1:1 Chromium & Safari Parity (Zero Fallback/Degradation), Yoda Consultative Posture, and `/grill-me` alignment.
   - `.agents/skills/apple-impeccable/references/reference-routing-matrix.md` (lines 1–210): Master multidimensional matrix connecting 116 Apple HIG pages, 45 Impeccable guides, and 7 lifecycle phases (Fase 0 to Fase 6).
   - `.agents/skills/apple-impeccable/references/superapp-ux-critique.md` (lines 1–265): Super App architecture, Thumb Zone vs. Eye Zone, Fluid Glass, Spring physics, Value-First onboarding, 3 universal themes, and Yoda `/grill-me` trade-offs.
   - `.agents/skills/apple-impeccable/references/ergonomic-touch-layout.md` (lines 1–197): 44x44px minimum touch targets, concentric corners ($\text{raio\_interno} = \max(0, \text{raio\_externo} - \text{padding})$), dynamic viewports (`dvh`, `svh`, `lvh`), and hardware safe areas (`env()`).
   - `.agents/skills/apple-impeccable/references/motion-and-materials.md` (lines 1–277): Spring curves (`cubic-bezier(0.25, 1, 0.5, 1)`), `-webkit-tap-highlight-color: transparent`, tactile `:active` scale (`0.965`), haptics (`navigator.vibrate`), Web Audio click synthesizer, and UIKit rubber-banding controller.
   - `.agents/skills/apple-impeccable/references/chromium-safari-parity.md` (lines 1–444): Parity specifications for paired `backdrop-filter`, GPU isolation (`isolation: isolate; transform: translateZ(0)`), responsive squircles (`objectBoundingBox`), `font-synthesis: none`, and Dynamic Type clamp ratios.
   - `.agents/skills/apple-impeccable/references/semantic-tokens-system.md` (lines 1–182): Semantic role abstractions (`--app-accent`, `--app-surface-canvas`, `--app-surface-card`, `--app-border-hairline`), Tailwind v4 `@theme` mappings, and brand discovery algorithm.
   - `.agents/skills/apple-impeccable/references/conflict-resolution.md` (lines 1–99): Precedence hierarchy: Project Brand > Apple HIG > Impeccable; HIG wins on touch targets (44px) and safe areas; Impeccable wins on 5 edge states and WCAG 4.5:1 contrast calibration.

2. **Apple Design & Apple HIG Core**:
   - `.agents/skills/apple-design/SKILL.md` (lines 1–400): Five-lens review process (Accessibility, Platform Conventions, Visual Design & Craft, Interaction, Content & Writing), 4 severity tiers (Critical, High, Medium, Low), and 8 Apple Design Principles (Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight).
   - `.agents/skills/apple-design/references/code-audit.md` (lines 1–105): Search patterns and violation criteria for Apple Pay (App Store Review Guideline 4.9), Liquid Glass in content layers, and iPhone Duo readiness.
   - `.agents/skills/apple-design/references/hig/liquid-glass.md` (lines 1–139): Two-layer model (Content vs Functional layer), regular vs clear variants, color budget (max 1–2 tinted actions), and accessibility fallbacks.
   - `.agents/skills/apple-design/references/hig/` (116 standalone markdown reference guides pulled from `developer.apple.com`).

3. **Audit Tooling & Execution Engine**:
   - `.agents/skills/apple-impeccable/scripts/run-audit.sh` (lines 1–686): Bash audit runner orchestrating token checks, parity audits, HIG ergonomics, Apple Design checks, Impeccable detection CLI, and consultative critique.
   - `.agents/skills/impeccable/scripts/impeccable`: Bundled Impeccable engine executable (detect, audit, typeset, colorize, etc.).

### 1.2 Tool Probing & Verbatim Command Executions
1. `bash .agents/skills/apple-impeccable/scripts/run-audit.sh help`
   - Exit code: `0`.
   - Output: Lists 7 primary commands (`all`, `critique`, `parity`, `detect`, `tokens`, `hig`, `appledesign`, `help`).

2. `bash .agents/skills/apple-impeccable/scripts/run-audit.sh invalid_command`
   - Exit code: `1`.
   - Output verbatim: `Unknown command: invalid_command` followed by usage syntax.

3. `bash .agents/skills/apple-impeccable/scripts/run-audit.sh tokens src`
   - Exit code: `0`.
   - Result: 1365 semantic token references detected; 0 forbidden Apple hardcoded colors (`#007aff`, `SystemBlue`, etc.).

4. `bash .agents/skills/apple-impeccable/scripts/run-audit.sh parity src`
   - Exit code: `0` (with 4 warnings).
   - Verbatim warnings detected:
     - `▲ [WARNING] File 'src/components/shell/SuperAppHeader.astro' declares backdrop-filter but lacks GPU isolation ('isolation: isolate' / 'transform: translateZ(0)'). May cause flickering or pixel bleeding in Chromium.`
     - `▲ [WARNING] File 'src/styles/components.css' declares backdrop-filter but lacks GPU isolation...`
     - `▲ [WARNING] File 'src/styles/drawer.css' declares backdrop-filter but lacks GPU isolation...`
     - `▲ [WARNING] Found naked '100vh' / 'h-screen' usages. Prefer '100dvh' for full screens or '100svh' for sheets/modals: src/layouts/BaseLayout.astro:125`

5. `bash .agents/skills/apple-impeccable/scripts/run-audit.sh detect src`
   - Exit code: `0` (runner handles exit code 2 from Impeccable as advisory warning).
   - Detected 3 anti-patterns in source:
     - `src/components/shell/BottomSheet.tsx:100`: `[border-accent-on-rounded] border-b-2`
     - `src/layouts/BaseLayout.astro:42`: `[overused-font] Google Fonts: inter`
     - `src/styles/global.css:589`: `[overused-font] font-family: 'Inter`

6. `bash .agents/skills/apple-impeccable/scripts/run-audit.sh critique http://localhost:9999`
   - Exit code: `0` (with 3 warnings).
   - Observed behavior when target URL is offline: Catches `net::ERR_CONNECTION_REFUSED`, flags mobile (390x844) and desktop (1440x900) viewports as warned, notes HTML fetch failure, and cleanly presents the next-steps Yoda / Grill Me framework.

7. `bash .agents/skills/apple-impeccable/scripts/run-audit.sh all non_existent_dir`
   - Exit code: `0` (with fallback warning).
   - Observed behavior: `▲ [WARNING] Target path 'non_existent_dir' does not exist. Defaulting to current directory.` and proceeds to audit `.`.

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Tooling CLI | `run-audit.sh all` | Runs entire audit suite: tokens, parity, HIG ergonomics, Apple Design branding, and Impeccable detect. | Optional target path (file or dir, default: `src` or `.`) | Consolidated multi-check summary with pass/warn/error counts. | Returns exit code 1 if any fatal check fails; exit code 0 if all pass or only warnings. | `run-audit.sh:144,641` |
| 2 | Tooling CLI | `run-audit.sh critique` | Executes Super App UX critique. Dual-viewport live browser inspection if given a URL; static IA / density analysis if file/dir. | Target URL (`http://...`) or target file/dir path. | Viewport audit (390x844 and 1440x900) or 7-pillar IA assessment, plus Impeccable detect findings. | Warns on offline server/unreachable URL; defaults to `.` if path missing. | `run-audit.sh:145,407` |
| 3 | Tooling CLI | `run-audit.sh parity` | Scans for 1:1 Chromium-Safari parity: paired backdrop-filter, GPU isolation, dvh/svh vs naked 100vh, tap highlight removal, viewport-fit=cover, and font smoothing. | Target file or directory path. | Parity report flagging unpaired filters, missing GPU isolation, or naked vh. | Fatal error (exit 1) on unpaired backdrop-filter or `@supports not (backdrop-filter)` fallback. | `run-audit.sh:146,279` |
| 4 | Tooling CLI | `run-audit.sh tokens` | Verifies total theme neutrality and absence of hardcoded Apple colors (`#007aff`, `SystemBlue`, etc.). | Target file or directory path. | Count of semantic token references found; lists forbidden colors. | Fatal error (exit 1) if forbidden Apple colors are found. | `run-audit.sh:148,164` |
| 5 | Tooling CLI | `run-audit.sh hig` | Audits Apple HIG ergonomics: checks for sub-44px interactive controls, safe-area-inset in fixed/sticky bars, and reduced-motion queries. | Target file or directory path. | Ergonomics compliance report and flagged lines. | Warns on missing safe-area-inset in sticky bars or sub-44px targets. | `run-audit.sh:149,207` |
| 6 | Tooling CLI | `run-audit.sh appledesign` | Audits branding conformity: detects counterfeit Apple Pay glyphs (`\uF8FF`, `fa-apple-pay`) per App Store Guideline 4.9. | Target file or directory path. | Confirmation of zero illegal glyphs or lists offending lines. | Fatal error (exit 1) if counterfeit glyphs or hand-drawn marks are detected. | `run-audit.sh:150,261` |
| 7 | Tooling CLI | `run-audit.sh detect` | Dispatches Impeccable anti-pattern detector CLI (`impeccable detect`). | Target file or directory path. | Anti-pattern list (e.g. `[border-accent-on-rounded]`, `[overused-font]`, `[side-tab]`). | Impeccable exits with 2 on findings; script captures as warning. | `run-audit.sh:147,387` |
| 8 | Tooling CLI | URL Auto-Routing | When first argument to `run-audit.sh` begins with `http://` or `https://`, automatically switches command to `critique <URL>`. | URL as `$1`. | Invokes `run_critique <URL>`. | Gracefully handles connection failures with warnings. | `run-audit.sh:617-620` |
| 9 | Tooling CLI | Path Auto-Routing | When first argument is an existing path and not a known command, defaults command to `all <path>`. | Path as `$1`. | Runs `all` against specified path. | Warns if path invalid and defaults to `.`. | `run-audit.sh:621-624` |
| 10 | Impeccable Engine | `impeccable detect` | Headless AST and regex scanner detecting 40+ visual and code anti-patterns across web templates. | File path, directory, or URL (with `--viewport` or `--cdp`). | Formatted anti-pattern list, advisory notes, and rule explanations. | Exits 0 on clean, 2 on findings, non-zero on parse failure. | `.agents/skills/impeccable/reference/audit.md` |
| 11 | Reference Matrix | 7-Phase Routing Matrix | Contextual index routing 116 HIG pages, 45 Impeccable references, and scripts across 7 development phases. | Phase ID (0 to 6) and component domain. | 2 to 4 recommended authoritative files and exact executable command. | Prevents context window explosion by enforcing on-demand reading. | `reference-routing-matrix.md:1-210` |
| 12 | UX Framework | Thumb Zone vs Eye Zone | Physical spatial allocation: primary interactive controls in bottom 35% of viewport; header reserved for passive context (<4 items). | Screen layout geometry, viewport height (Y coords). | Ergonomic rating and relocation proposals. | High thumb-stretch fatigue flagged as UX gap. | `superapp-ux-critique.md:64-100` |
| 13 | UX Framework | Fluid Glass / Liquid Glass | Translucent surface physics on functional layer: dual backdrop-filter blur, saturation, 0.5px hairline border, and specular top highlight. | CSS properties: backdrop-filter, border, box-shadow. | Glass surface with 1:1 Chromium/Safari visual parity. | Liquid Glass in content layer flagged as strict pre-production defect. | `superapp-ux-critique.md:102-137`, `liquid-glass.md:24-31` |
| 14 | UX Framework | Spring Physics & Haptics | Real-world momentum and elasticity curves (`cubic-bezier(0.25, 1, 0.5, 1)`), `:active` scale 0.965, Web Audio acoustic click, and Android haptics. | Microinteraction state (`:active`), transitions. | Tactile physical feedback without 300ms touch delay. | Linear easing and lack of reduced-motion flagged. | `motion-and-materials.md:12-137` |
| 15 | UX Framework | Yoda / Grill Me Protocol | Socratic consultative alignment: formulates 2–3 trade-off questions with options (Option A vs B) before refactoring. | UX critique findings and architectural dilemmas. | Structured trade-off options with ergonomic pros/cons. | Non-dogmatic; leaves final decision to user/AI reasoning. | `superapp-ux-critique.md:7-62` |
| 16 | Design System | Universal Theme Architecture | Tri-modal theme system: Light Canvas, Semantic Dark Mode (deep charcoal `#0d0d0d`, OLED battery savings), and High Contrast AAA (solid 1.5–2px borders). | `@theme` or CSS variables, prefers-color-scheme, prefers-contrast. | Adaptive color tokens respecting WCAG AA/AAA. | Low contrast on glass or pure #000/#fff flagged. | `superapp-ux-critique.md:217-232` |
| 17 | Design System | Semantic Tokens Hierarchy | Abstracted functional roles (`--app-accent`, `--app-surface-*`, `--app-text-*`) mapped from project configuration (`_brand.yml`). | Brand configuration file or Tailwind config. | CSS variable declarations and Tailwind utilities. | Hardcoded vendor colors prohibited. | `semantic-tokens-system.md:1-182` |
| 18 | Ergonomics | 44x44px Touch Targets | Human finger contact area standard (8mm–10mm): all clickable controls must meet 44x44px bounding box. | Button, link, toggle, or icon hit area. | Minimum 44x44px interactive bounding box (via `::after` if compact). | Sub-44px targets flagged as warning/critical. | `ergonomic-touch-layout.md:9-46` |
| 19 | Ergonomics | Hardware Safe Areas | Dynamic safe area insets via `env(safe-area-inset-*)` accommodating Dynamic Island (up to 59px), notches, and gesture bars. | CSS padding/margin rules on fixed/sticky elements. | Inset clearance with defensive minimums `max(12px, env(...))`. | Content clipping under island or home bar flagged as High/Critical. | `ergonomic-touch-layout.md:48-118` |
| 20 | Ergonomics | Dynamic Viewports (`dvh`/`svh`/`lvh`) | Viewport height unit differentiation: `100dvh` for app roots, `100svh` for modals/bottom sheets, `100lvh` for immersive backgrounds. | CSS height / min-height properties. | Stable layouts immune to address bar retraction and virtual keyboard jumps. | Naked `100vh` flagged as parity warning. | `ergonomic-touch-layout.md:58-87` |
| 21 | Geometry | Continuous Squircles & Concentricity | Apple continuous curvature superellipse ($n \approx 4-5$) via SVG `<clipPath objectBoundingBox>` and formula $\text{raio\_filho} = \max(0, \text{raio\_pai} - \text{padding})$. | CSS clip-path and border-radius. | Geometrically aligned, optical-smooth curved corners. | Distorted fixed pixel clip-paths or misaligned concentric radii flagged. | `ergonomic-touch-layout.md:120-175` |
| 22 | Parity | Chromium Rubber-Banding | Reproduces UIKit asymptotic elastic scroll bounce on Chromium using formula $d = \text{dim} \times (1 - 1 / ((x \times 0.55 / \text{dim}) + 1))$. | Touch events on scrollable containers. | Elastic pull resistance and smooth spring recovery. | Abrupt rigid scroll stops outside Safari iOS mitigated. | `chromium-safari-parity.md:153-208` |
| 23 | Review Lens | Apple Design 5-Lens Review | Structured evaluation through 5 sequential lenses: Accessibility, Platform Conventions, Visual Design & Craft, Interaction, and Content/Writing. | Design artifact (rendered browser session, screenshots, or code). | Tiered design review report (Critical, Improvements, Craft notes, What works). | Failure to evaluate against all 5 lenses invalidates review. | `apple-design/SKILL.md:132-256` |
| 24 | Review Lens | App Store Guideline 4.9 Compliance | Strict prohibition of hand-drawn Apple Pay buttons, counterfeit glyphs, or trademark misuse. | Component markup and icon assets. | Approval or immediate Critical rejection flag. | Hand-drawn buttons or unauthorized glyphs trigger automatic Critical. | `code-audit.md:22-62` |

---

## 3. Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | `run-audit.sh` command dispatch | Unknown subcommand: `bash run-audit.sh invalid_command` | Prints `Unknown command: invalid_command`, displays usage help, and exits immediately with code 1. |
| 2 | `run-audit.sh` target resolution | Non-existent target directory: `bash run-audit.sh all non_existent_dir` | Emits `▲ [WARNING] Target path 'non_existent_dir' does not exist. Defaulting to current directory.` and proceeds to audit `.`. |
| 3 | `run-audit.sh` URL routing | Direct URL as first parameter: `bash run-audit.sh http://localhost:4321` | Parameter detection regex (`^https?://`) matches; automatically reassigns command to `critique` and target to the URL. |
| 4 | `run-audit.sh` critique on offline URL | Target URL is offline: `bash run-audit.sh critique http://localhost:9999` | Catches `net::ERR_CONNECTION_REFUSED` in Node/Puppeteer, issues warnings for mobile (390x844) and desktop (1440x900) viewports, issues warning for HTML fetch, outputs next-steps guide, and finishes with code 0 (summary shows 3 warnings, 0 fatal). |
| 5 | `run-audit.sh` path as first argument | File path passed directly without command: `bash run-audit.sh src/styles/global.css` | Evaluates `[ -e "$COMMAND" ]`; recognizes existing path and automatically switches command to `all` with target set to `src/styles/global.css`. |
| 6 | Parity backdrop-filter pairing | File contains unpaired backdrop-filter: `backdrop-filter` declared without `-webkit-backdrop-filter` | Counts declarations per file; detects inequality (`webkit_bf != standard_bf`), logs error message, increments `parity_errors`, and causes exit code 1. |
| 7 | Parity GPU isolation | File declares `backdrop-filter` but lacks `isolation: isolate` or `transform: translateZ(0)` | Emits warning: `May cause flickering or pixel bleeding in Chromium.` Recorded in warning counter without triggering fatal script exit. |
| 8 | Degraded fallback prohibition | Code uses `@supports not (backdrop-filter)` fallback block | Triggers fatal error in parity audit: `Policy strictly forbids degraded fallbacks; 1:1 identical Liquid Glass parity required:`, incrementing fatal failures. |
| 9 | Compact touch targets | Interactive button has physical dimension `h-6 w-6` (24x24px) | Flagged by regex scan as potential sub-44px target; prints warning recommending expanded area via `::after` pseudo-element. |
| 10 | Impeccable CLI findings | Target source contains aesthetic anti-patterns (e.g. `[side-tab]` or `[overused-font]`) | Impeccable CLI exits with code 2; `run-audit.sh` wraps it with `echo "y"` (bypassing interactive prompt) and records it as an advisory warning. |

---

## 4. Comprehensive Survey Rubrics

To guide downstream live browser audits and adversarial critiques, the authoritative standards are synthesized into three actionable rubrics:

### 4.1 Rubric 1: Live Browser Evaluation Dimensions

| Dimension | Critical Criteria & Thresholds | Inspection Method (Live Browser & CDP) | Failure Signature |
|---|---|---|---|
| **1. Ergonomics & Touch Targets** | Interactive targets $\ge 44\times 44\text{px}$ (or 44pt); $\ge 8\text{px}$ gap between targets; primary CTAs in bottom 35% Thumb Zone (Y: 500–844px on 390x844). | `getBoundingClientRect()` on buttons, links, inputs, and interactive widgets. | Computed bounding box $< 44\text{px}$ without pseudo-element hit padding; primary action at top screen edge. |
| **2. Safe Areas & Viewports** | `<meta name="viewport" content="..., viewport-fit=cover">`; fixed bars apply `env(safe-area-inset-*)`; root uses `100dvh`; sheets/modals use `100svh`. | Inspect computed `padding-top`/`padding-bottom` on fixed bars; resize viewport and check for content clipping under notch or home bar. | Fixed header obscured by Dynamic Island/notch; fixed footer clipping bottom gestures; modal resizing jumpily on scroll. |
| **3. Continuous Squircles & Concentricity** | Continuous superellipse curvature (SVG `objectBoundingBox` or `corner-shape: squircle`); nested corners obey $\text{radius}_{\text{inner}} = \max(0, \text{radius}_{\text{outer}} - \text{padding})$. | Visual inspection of card corners; check CSS `border-radius` and `clip-path` relationships. | Mechanical circular arcs, distorted SVG clips with fixed pixel coordinates, or visually pinched concentric corners. |
| **4. Dynamic Type & Smoothing** | `-webkit-font-smoothing: antialiased`; `-moz-osx-font-smoothing: grayscale`; `font-synthesis: none`; fluid type scaling via clamp; line length 65–75ch. | Computed styles on `html` and text elements; verify font weights and scaling during root font size alteration. | Blurry/heavy text in Chromium; synthetic fake bolds; truncated or overflowing text when font scales. |
| **5. Liquid Glass & Materials** | Functional layer only (bars, docks, sheets); paired `-webkit-` and standard `backdrop-filter`; GPU isolation (`isolation: isolate; transform: translateZ(0)`); 0.5px hairline border; $\ge 4.5:1$ text contrast over glass. | Inspect backdrop-filter on containers; evaluate contrast with `window.getComputedStyle` over scrolling content; verify GPU acceleration layer. | Glass in content layer (cards/lists); unpaired filter; flickering/bleeding during scroll in Chromium; unreadable text over dynamic background. |
| **6. Motion & Spring Physics** | Parametric spring curves (`cubic-bezier(0.25, 1, 0.5, 1)`); `-webkit-tap-highlight-color: transparent`; `:active` scale 0.965; `@media (prefers-reduced-motion: reduce)`. | Trigger `:active` state on buttons; verify absence of Chromium blue tap flash; emulate reduced motion media feature in CDP. | Blue flash masking spring feedback; robotic linear easing; violent layout shifts (CLS); lack of reduced-motion fallback. |
| **7. Universal Theme Parity** | Zero hardcoded Apple colors; semantic roles (`--app-accent`, `--app-surface-*`); dark mode charcoal `#0d0d0d` to `#121214`; high contrast AAA solid borders. | Toggle `prefers-color-scheme: dark` and `prefers-contrast: more`; evaluate background and foreground computed colors. | Hardcoded `#007aff`; harsh pure black `#000` against pure white `#fff` strobe; unreadable elements in dark or high contrast mode. |

---

### 4.2 Rubric 2: Strict Apple HIG Pre-Production Violations vs. Exploratory UX Gaps

| Classification | Domain | Condition / Rule | Impact & Action Required |
|---|---|---|---|
| **STRICT HIG PRE-PRODUCTION VIOLATION** | Accessibility | Text contrast $< 4.5:1$ (normal) or $< 3:1$ (large/bold). | **Critical**. Unusable for low vision; blocks production release. Requires immediate opacity/color-mix recalibration. |
| **STRICT HIG PRE-PRODUCTION VIOLATION** | Accessibility | Interactive touch target $< 28\times 28\text{px}$ absolute minimum, or $< 44\times 44\text{px}$ without expanded padding. | **Critical**. Causes mis-taps and accessibility failure. Must add invisible pseudo-element `::after` or padding. |
| **STRICT HIG PRE-PRODUCTION VIOLATION** | Platform & Brand | Hand-drawn Apple Pay button or third-party glyph (`\uF8FF`, `fa-apple-pay`). | **Critical**. Automatic App Store rejection under Guideline 4.9. Must replace with native `<apple-pay-button>` or SDK. |
| **STRICT HIG PRE-PRODUCTION VIOLATION** | Materials | Liquid Glass applied to the content layer (cards, lists, table rows, backgrounds). | **High**. Violates Apple two-layer model; blurs structural hierarchy. Must convert content surfaces to opaque semantic cards. |
| **STRICT HIG PRE-PRODUCTION VIOLATION** | Parity | Unpaired `backdrop-filter` or use of `@supports not (backdrop-filter)` fallback. | **High**. Causes broken visuals on either Safari or Chrome. Both prefixes must be declared simultaneously without fallbacks. |
| **STRICT HIG PRE-PRODUCTION VIOLATION** | Safe Area | Fixed/sticky top or bottom bar lacking `env(safe-area-inset-*)`. | **High**. Obscured by Dynamic Island, camera notch, or Home indicator. Must apply `max(margin, env(safe-area-inset-*))`. |
| **STRICT HIG PRE-PRODUCTION VIOLATION** | Viewport | Full-screen root using naked `100vh` instead of `100dvh`. | **High**. Causes bottom overflow and jumping when mobile address bar retracts. Replace with `100dvh`. |
| **EXPLORATORY UX GAP** | Spatial Layout | Important action CTAs placed in the upper third (Eye Zone) rather than bottom Thumb Zone. | **Medium**. High thumb-reach fatigue. Consultative suggestion: relocate to bottom dock or bottom sheet. |
| **EXPLORATORY UX GAP** | Cognitive Density | More than 5–8 modules/cards competing on the initial viewport scroll. | **Medium**. Saturação cognitiva. Consultative suggestion: group into collapsible accordions or progressive sheets. |
| **EXPLORATORY UX GAP** | Onboarding | Blocking login/auth gate enforced before the user can explore public app value. | **Medium**. High initial friction. Consultative suggestion: adopt Value-First access with progressive disclosure. |
| **EXPLORATORY UX GAP** | Microinteraction | Linear or generic easing; omission of `:active` physical compression scale. | **Low**. Interface feels robotic/flat rather than tactile. Suggestion: apply Apple spring curve and `scale(0.965)`. |
| **EXPLORATORY UX GAP** | Design Craft | AI design tropes (e.g. `[side-tab]` 4px colored border on one side of a card; overused Inter font). | **Low / Craft**. Lacks distinctive product thesis. Suggestion: distinctive typographic hierarchy and refined borders. |

---

### 4.3 Rubric 3: Adversarial `/grill-me` Critique Structure

Every finding generated in the final report must adhere to this unvarnished, high-rigor adversarial specification format:

```markdown
### Finding [ID]: [Concise Imperative Title]
- **Severity**: CRITICAL | HIGH | MEDIUM | LOW
- **Target & View Context**:
  - File / Component: `path/to/Component.ext:line`
  - Rendered Viewport: Mobile (390x844) | Desktop (1440x900)
  - DOM Selector: `header.app-nav > button#action`
- **Violated Guideline / Citation**:
  > `[file.md › Heading]`: "[Exact verbatim quote from authoritative HIG or reference document]"
- **Root UX & Technical Flaw**:
  [Unvarnished adversarial critique detailing the ergonomic breakdown, cognitive friction, GPU rendering penalty, or accessibility failure. No softening.]
- **Actionable Design Remedy**:
  ```css
  /* Concrete drop-in code snippet using project tokens */
  ```

### 🧠 Yoda / Grill Me Socratic Alignment Module
[Formulate 2 to 3 strategic trade-off questions presenting Option A vs Option B with ergonomic and architectural pros/cons, empowering the user and IA to determine the final refactoring direction.]
```

---

## 5. Logic Chain

1. **Observation 1.1 & 1.2** establish that the authoritative specifications for the project are already present in `.agents/skills/apple-impeccable/` and `.agents/skills/apple-design/`, containing comprehensive rules for materials, ergonomics, tokens, cross-browser parity, and App Store review constraints.
2. **Observation 1.2 (Commands 1–7)** proves that the audit runner (`run-audit.sh`) and the Impeccable CLI (`impeccable detect`) are fully operational, runnable, and provide deterministic output across all specified domains (`all`, `critique`, `parity`, `tokens`, `hig`, `appledesign`, `detect`).
3. Running `parity` and `detect` against `src` directly confirmed actual project findings in the CAGP workspace:
   - GPU isolation warnings in `SuperAppHeader.astro`, `components.css`, and `drawer.css`.
   - Naked `100vh` usage in `BaseLayout.astro:125`.
   - Structural anti-patterns `[border-accent-on-rounded]` in `BottomSheet.tsx:100` and `[overused-font]` in `BaseLayout.astro` and `global.css`.
4. Synthesizing the 5 lenses of `apple-design` with the 7 pillars of `apple-impeccable` yields a strict separation between non-negotiable pre-production violations (accessibility, Guideline 4.9, paired blur, safe areas) and consultative UX improvements (Thumb Zone relocation, density reduction, spring feedback).
5. Combining this separation with the Yoda `/grill-me` protocol produces an adversarial yet actionable critique standard that fulfills all pre-production evaluation requirements of `ORIGINAL_REQUEST.md`.

---

## 6. Caveats

1. **Static AST vs. Rendered Dynamic DOM**: While regex/AST scans in `run-audit.sh` and `impeccable detect` catch static syntax (unpaired filters, hardcoded colors, sub-44px markup), pixel-level contrast calculations, real dynamic layout shifts (CLS), and actual touch geometries over scrolling glass can only be verified when the dev server is active and rendered via a live browser session.
2. **Read-Only Scope**: In strict accordance with the spec miner assignment and `ORIGINAL_REQUEST.md`, no project source code was modified, repaired, or deleted during this survey.
3. **External Browser Tool Availability**: Offline URL probing demonstrated that `run-audit.sh critique` relies on an active local HTTP server; headless CDP audits will report connection warnings if the dev server is not launched beforehand.

---

## 7. Conclusion

The design standards, reference matrices, and audit tooling in `/home/gsathler/Nextcloud/Projects/cagp` provide an exhaustive, authoritative specification framework. The `run-audit.sh` runner and Impeccable CLI are fully functional and capable of evaluating both static source files and live dual-viewport web sessions. The synthesized tri-part rubric equips the auditor and critique subagents to execute comprehensive live browser audits, adversarial `/grill-me` critiques, and strict HIG pre-production evaluations without ambiguity.

---

## 8. Verification Method

To independently verify the findings and tooling behavior documented in this report:

1. **Verify Audit Tooling Help & Commands**:
   ```bash
   bash .agents/skills/apple-impeccable/scripts/run-audit.sh help
   ```
   *Expected*: Exits `0` and displays usage commands.

2. **Verify Theme Neutrality & Tokens**:
   ```bash
   bash .agents/skills/apple-impeccable/scripts/run-audit.sh tokens src
   ```
   *Expected*: Exits `0`, passes neutrality check, reports >1300 semantic token references.

3. **Verify Chromium-Safari Parity Audit**:
   ```bash
   bash .agents/skills/apple-impeccable/scripts/run-audit.sh parity src
   ```
   *Expected*: Identifies GPU isolation warnings in `SuperAppHeader.astro`, `components.css`, `drawer.css`, and naked `min-h-screen` in `BaseLayout.astro:125`.

4. **Verify Impeccable Anti-Pattern Detection**:
   ```bash
   bash .agents/skills/apple-impeccable/scripts/run-audit.sh detect src
   ```
   *Expected*: Captures `[border-accent-on-rounded]` in `BottomSheet.tsx:100` and `[overused-font]` in `BaseLayout.astro:42`.

5. **Verify Live URL Fallback Handling**:
   ```bash
   bash .agents/skills/apple-impeccable/scripts/run-audit.sh critique http://localhost:9999
   ```
   *Expected*: Gracefully handles connection failure with warnings, without fatal crash.
