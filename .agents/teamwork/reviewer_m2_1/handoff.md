# Milestone 2 Reviewer Handoff Report: Strict Apple HIG Pre-Production Evaluation

**Reviewer Agent**: `reviewer_m2_1` (Archetype: `teamwork_reviewer`, Roles: `reviewer`, `critic`)  
**Parent Agent**: `526c3e23-dab2-44fa-aace-fff0d311bb71`  
**Date**: 2026-11-05  
**Target Project**: CAGP Super App Discente (`/home/gsathler/Nextcloud/Projects/cagp`)  
**Evaluation Scope**: All 24 public routes, 162 workspace sub-views, 6 global overlay sheets, and 1 mobile navigation drawer  
**Final Verdict**: **REQUEST_CHANGES (RELEASE BLOCKED)**  

---

## 1. Observation

Direct empirical observations obtained from live browser execution data (`worker_m1`), automated audit scripts (`run-audit.sh`), and source code inspections in `src/`:

### 1.1 Tool Execution & Automated Script Outputs
1. **Apple HIG Ergonomics Script**:
   - Command: `bash .agents/skills/apple-impeccable/scripts/run-audit.sh hig src`
   - Exit Code: `0` (0 fatal errors, 0 warnings).
   - *Observation*: Static AST/regex scan checks for rudimentary hardcoded classes like `h-6 w-6`. It fails to detect responsive layout overrides (`sm:w-9`, `sm:min-w-[36px]`) or dynamic text-dependent button dimensions, which were uncovered only via live browser CDP execution.
2. **Apple Design & Brand Conformity Script**:
   - Command: `bash .agents/skills/apple-impeccable/scripts/run-audit.sh appledesign src`
   - Exit Code: `0` (0 fatal errors, 0 warnings).
   - *Observation*: Confirmed 0 counterfeit Apple Pay marks, 0 unapproved glyphs (`\uF8FF`, `fa-apple-pay`), and zero unauthorized trademark misuses under App Store Guideline 4.9.
3. **Chromium & Safari Parity Script**:
   - Command: `bash .agents/skills/apple-impeccable/scripts/run-audit.sh parity src`
   - Exit Code: `0` (4 warnings).
   - *Verbatim Warnings*:
     - `▲ [WARNING] File 'src/components/shell/SuperAppHeader.astro' declares backdrop-filter but lacks GPU isolation ('isolation: isolate' / 'transform: translateZ(0)'). May cause flickering or pixel bleeding in Chromium.`
     - `▲ [WARNING] File 'src/styles/components.css' declares backdrop-filter but lacks GPU isolation...`
     - `▲ [WARNING] File 'src/styles/drawer.css' declares backdrop-filter but lacks GPU isolation...`
     - `▲ [WARNING] Found naked '100vh' / 'h-screen' usages. Prefer '100dvh' for full screens or '100svh' for sheets/modals: src/layouts/BaseLayout.astro:125`
4. **Live Application Critique**:
   - Command: `bash .agents/skills/apple-impeccable/scripts/run-audit.sh critique http://localhost:4321`
   - Exit Code: `0` (4 warnings).
   - *Key Telemetry*: Flagged 41 anti-patterns on live DOM, including undersized functional text (10.88px badges, 10px labels), low contrast (4.02:1 on CampaignBanner), skipped headings (`h1` to `h3`), and naked viewport units.

---

### 1.2 Domain 1: Interactive Touch Targets (Apple HIG 44x44pt Rule)

Analysis of `touch-targets-audit.json` (137 violations) and `capture-summary.json` against live DOM inspection:

| Category | Component / Selector | Rendered Dimensions | Affected Routes / Viewports | Code Location | Root Flaw Description |
|---|---|---|---|---|---|
| **Header Action** | `button#cagp-btn-a11y-quick` | **36.0 × 44.0 px** (Width Deficient) | 24 routes (Desktop / Tablet) | `src/components/shell/SuperAppHeader.astro:171` | Declares `w-11 h-11 min-w-[44px] min-h-[44px]`, but desktop breakpoint overrides with `sm:w-9 sm:h-9 sm:min-w-[36px] sm:min-h-[36px]`, shrinking width to 36px. |
| **Header Action** | `button#cagp-btn-passport` | **38.0 × 44.0 px** (Width Deficient) | 24 routes (Desktop / Tablet) | `src/components/shell/SuperAppHeader.astro:185` | Declares `sm:w-9.5 sm:h-9.5 sm:min-w-[36px] sm:min-h-[36px]`, computing to 38px width on desktop. |
| **Header Action** | `button#cagp-mobile-menu-btn` | **38.0 × 44.0 px** (Width Deficient on Tablet) | 24 routes (Tablet `sm:` to `lg:`) | `src/components/shell/SuperAppHeader.astro:199` | Declares `sm:w-9.5 sm:h-9.5 sm:min-w-[36px] sm:min-h-[36px]`. |
| **Document Reader** | `summary.cursor-pointer` | **340.0 × 16.0 px** (Height Deficient) | 8 routes (`/documentos/[slug]`, Mobile) | `src/pages/documentos/[slug].astro:204` | Lacks vertical padding (`py-0`). Text height computes to 16px, creating a 16px tall interactive touch target across all 8 official document readers. |
| **Document Reader** | `summary.font-['Oswald']` | **300.0 × 40.0 px** (Mobile) / **1038.0 × 24.0 px** (Desktop) | `/` and Drawer | `src/components/home/HomeBussola.astro:21` | Declares `py-1` (4px top/bottom). Height reaches only 24px (desktop) or 40px (mobile), below 44px minimum. |
| **Floating Action** | `button#cagp-back-to-top` | **38.8 × 44.0 px** (Width Deficient) | All long routes (Mobile) | `src/components/shell/BackToTop.astro:8` | Text `span` is hidden on mobile (`hidden sm:inline`). Button contains only icon with `p-2.5`, computing to 38.8px total width. |
| **Settings Controls** | `button` ("A-") | **42.0 × 44.0 px** (Width Deficient) | `/configuracoes` (Mobile & Desktop) | `src/components/settings/SettingsA11ySection.tsx:38` | Declares `min-h-[44px] px-3.5 py-1.5`, but lacks `min-w-[44px]`. "A-" text width yields 42px. |
| **Settings Controls** | `button` ("A") | **37.0 × 44.0 px** (Width Deficient) | `/configuracoes` (Mobile & Desktop) | `src/components/settings/SettingsA11ySection.tsx:38` | Lacks `min-w-[44px]`. "A" text width yields 37px. |
| **Settings Controls** | `input.w-5.h-5` (Checkboxes) | **20.0 × 44.0 px** (Native Input Box) | `/configuracoes` (Mobile & Desktop) | `src/components/settings/SettingsA11ySection.tsx:61,79,97` | Native checkbox is `20x20px`. Enclosing label is 44px tall, but input element itself does not expand bounding box. |
| **Sheet Segmented Tabs** | `PassportSheet` Tabs | **~160.0 × 28.0 px** (Height Deficient) | Passport Sheet Overlay | `src/components/shell/PassportSheet.tsx:85,97` | Declares `py-1.5 px-3` without `min-h-[44px]`. Computed height is only ~28px. |
| **Sheet Action Chips** | `CampusSheet` Buttons | **~130.0 × 28.0 px** (Height Deficient) | Campus Sheet Overlay | `src/components/shell/CampusSheet.tsx:101,113` | Declares `py-1.5 px-2.5` without `min-h-[44px]`. Computed height is only ~28px. |
| **Breadcrumb Links** | `a.hover:text-[#8B1E2D]` ("Início") | **42.0 × 44.0 px** (Width Deficient) | 8 document reader routes | `src/pages/documentos/[slug].astro:141` | Standalone link "Início" without hit-area padding. |
| **External Citations** | Raw text URLs (`a[href^="http"]`) | **~100–390 × 16.0–19.0 px** | Document readers & guides | `src/pages/documentos/[slug].astro:227` | Inline markdown hyperlinks rendered without line-height hit compensation. |

#### 🔍 Critical Adversarial Finding: Upstream Telemetry Attribution Discrepancy
- In `worker_m1/handoff.md` (line 74), worker_m1 reported:
  > *"Undersized touch targets: 1 (`#cagp-drawer-close` button measuring 32x32px)."*
- **Verification via Code Inspection**:
  - `src/styles/drawer.css` lines 73–76:
    ```css
    .cagp-drawer-close-btn {
      width: 44px;
      height: 44px;
      min-width: 44px;
      min-height: 44px;
    }
    ```
- **Verification via Raw JSON**:
  - `capture-summary.json` (`overlays.mobile_drawer.touchTargetsSample[0]`):
    ```json
    {
      "identifier": "summary.font-['Oswald'].text-xs.font-bold.uppercase",
      "tag": "summary",
      "text": "VER MAPA ESTRUTURAL DOS 5 EIXOS CANÔNICO",
      "width": 300,
      "height": 40,
      "deficientHeight": true
    }
    ```
- **Finding**: `#cagp-drawer-close` is fully compliant at 44x44px. The single failing element inside the Mobile Drawer was the `<summary>` accordion trigger at 300x40px. Worker M1 misattributed the element in their written narrative report.

---

### 1.3 Domain 2: Safe Areas & Viewport Dynamics

1. **Fixed Header Safe Area Handling**:
   - `src/components/shell/SuperAppHeader.astro:12-13`:
     ```html
     <header id="cagp-super-app-header" class="sticky top-2 sm:top-3 lg:top-4 ... " style="padding-top: env(safe-area-inset-top, 0px);">
     ```
   - *Observation*: The header applies `padding-top: env(safe-area-inset-top, 0px)`. However, the sticky positioning rule uses `top: 0.5rem` (`top-2`). On iOS devices with Dynamic Island (inset = 59px) or notch (inset = 44px–47px), `top: 0.5rem` fixes the container outer box at 8px from the top of the physical screen rather than respecting the safe boundary.
2. **Mobile Drawer Missing Safe Area Inset Top**:
   - `src/styles/drawer.css:49,53`:
     ```css
     .cagp-drawer-panel {
       padding: 1.25rem 1rem;
       padding-bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px));
     }
     ```
   - *Observation*: While `padding-bottom` incorporates `env(safe-area-inset-bottom)`, `padding-top` is hardcoded to `1.25rem` (20px). On an iPhone 14/15/16 Pro with Dynamic Island (59px safe inset), the drawer header (`.cagp-drawer-header`) starts at 20px, causing the close button and CAGP crest to sit directly behind the hardware camera punch-hole.
3. **Desktop Floating Dock Hardcoded Bottom**:
   - `src/components/shell/DesktopFloatingDock.tsx:88`:
     ```tsx
     <aside className="hidden lg:flex fixed bottom-5 left-1/2 -translate-x-1/2 ... ">
     ```
   - *Observation*: Hardcodes `bottom: 1.25rem` (`bottom-5`). Lacks `env(safe-area-inset-bottom)`. On large tablets (iPad Pro 12.9" in desktop landscape mode) displaying the desktop dock, the dock impinges on the iOS Home indicator bar.
4. **Viewport Units: Naked `100vh` Usages**:
   - `src/layouts/BaseLayout.astro:125`:
     ```html
     <body class="bg-[#F7F5F0] text-[#0A0A0A] font-['Inter'] antialiased min-h-screen flex flex-col">
     ```
     `min-h-screen` compiles to `min-height: 100vh`. Naked `100vh` fails to account for mobile browser URL bar retraction, causing jarring height shifts and bottom clipping when the bar collapses.
   - `src/pages/documentos/[slug].astro:248,257`:
     ```html
     <aside class=" ... max-h-[calc(100vh-6rem)] ... ">
     <nav id="cagp-toc-nav" class=" ... max-h-[calc(100vh-10rem)] ... ">
     ```
     Uses naked `100vh` instead of `100dvh`.
5. **Modal Sheets Using `dvh` Instead of `svh`**:
   - `src/components/shell/BottomSheet.tsx:81`:
     ```tsx
     const heightClass = detent === 'large' ? 'h-[90dvh] md:max-h-[85dvh]' : 'h-[55dvh] md:max-h-[70dvh]';
     ```
   - *Observation*: Apple Impeccable specifications explicitly mandate `100svh` / `90svh` for modal sheets. When using Dynamic Viewport Height (`dvh`), if the mobile browser address bar is expanded, a `90dvh` container will overflow the visible screen, pushing sheet action buttons beneath the browser UI.
6. **Anti-Accessibility Zoom & Gesture Blocking (Severe Anti-Pattern)**:
   - `src/layouts/BaseLayout.astro:32`:
     ```html
     <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
     ```
   - `src/layouts/BaseLayout.astro:55-58`:
     ```javascript
     // Bloqueio de Zoom com Pinça (Web App Apple HIG)
     document.addEventListener('gesturestart', function(e) { e.preventDefault(); }, { passive: false });
     document.addEventListener('gesturechange', function(e) { e.preventDefault(); }, { passive: false });
     document.addEventListener('gestureend', function(e) { e.preventDefault(); }, { passive: false });
     ```
   - *Observation*: The code explicitly disables user scaling and intercepts multi-touch pinch-to-zoom gestures. Labeling this as "Web App Apple HIG" is a severe false rationalization. Apple HIG and WCAG 1.4.4 explicitly prohibit blocking zoom on web applications because it renders content inaccessible to users with low vision.

---

### 1.4 Domain 3: Materials, Liquid Glass & Compositing Parity

Evaluation of `materials-glass-audit.json` (289 elements detected) and source styling:

1. **GPU Isolation Deficit (100% Failure)**:
   - Total backdrop-filter surfaces detected: **289 elements**.
   - `isolation: auto`: **289 / 289 (100%)**.
   - `hasGpuIsolation`: **0% declared `isolation: isolate`**. (48 elements had contextual CSS transforms, while 241 elements / 83% had `transform: none` and `will-change: auto`).
   - *Compositing Impact*: In Chromium (Chrome 156), rendering non-isolated `backdrop-filter: blur(24px)` over scrolling DOM trees forces continuous compositor re-rasterization of the parent stacking context, triggering frame drops and subpixel text jitter during fast flick-scrolling.
2. **Two-Layer Spatial Model Evaluation**:
   - *Compliance*: Content cards (`.cagp-card`, `.bg-white`, `.bg-[#F7F5F0]`) correctly remain opaque. Liquid Glass is not misused as a card background.
   - *Functional Surfaces*: Header pill islands (`bg-white/95 backdrop-blur-xl`), mobile bottom nav (`bg-white/95 backdrop-blur-xl`), drawer backdrop (`blur(4px)`), and drawer panel (`blur(24px) saturate(140%)`).
3. **Aesthetic Conflict: Neo-Brutalist 2px Hard Stroke vs. Apple Specular Hairline**:
   - All 289 glass surfaces enforce a hard, opaque `2px solid #0A0A0A` border with hard drop shadows (`shadow-[2.5px_2.5px_0px_#0A0A0A]` or `shadow-[3px_3px_0px_#0A0A0A]`).
   - *HIG Critique*: Apple Liquid Glass is modeled on optical transparency, featuring subtle 0.5px specular highlights (`rgba(255, 255, 255, 0.4)` top edge) and soft ambient shadows. Wrapping optical glass in abrasive 2px comic-book borders shatters the physical material metaphor, creating heavy visual visual interference around floating navigation pills.
4. **Defective `prefers-reduced-transparency` Fallback**:
   - `src/styles/components.css:386-392`:
     ```css
     @media (prefers-reduced-transparency: reduce) {
       .cagp-glass-surface,
       .cagp-liquid-curtain {
         backdrop-filter: none !important;
         -webkit-backdrop-filter: none !important;
         background-color: #FFFFFF !important;
       }
     }
     ```
   - *Observation*: The media query only styles `.cagp-glass-surface` and `.cagp-liquid-curtain`. Grep search across `src/` reveals neither class is used on the active navigation elements. Header, bottom dock, back-to-top, and mobile drawer all use inline Tailwind classes (`backdrop-blur-xl`). Therefore, **95%+ of glass surfaces completely ignore `prefers-reduced-transparency: reduce`**.

---

### 1.5 Domain 4: Typography, Color Contrast & Dynamic Type

1. **WCAG 2.1 AA Contrast Failure (4.02:1 vs 4.5:1 Required)**:
   - File: `src/components/shell/CampaignBanner.astro:12`
   - Rendered across all 24 public routes (50 instances captured).
   - Text: `"Chapa Semente"` (`strong.text-[#FF8718].font-bold`)
   - Foreground: `#FF8718` (`rgb(255, 135, 24)`)
   - Background: `#5B2E85` (`rgb(91, 46, 133)`)
   - Font Size: `11px` (Bold, 700)
   - **Measured Contrast Ratio: 4.02:1**.
   - *HIG Standard*: Under 18.5px bold (14pt), text requires a minimum contrast of **4.5:1**. At 4.02:1, this fails WCAG AA and Apple HIG accessibility baselines.
   - *Validation*: In High Contrast AAA mode (`data-a11y-contrast="high"`), the ratio shifts to **21.0:1**, verifying that the defect is isolated to the default theme.
2. **Functional UI Text Below the 11px Floor (799 Occurrences)**:
   - Primary Offenders:
     - Top Bar Sublabel: `span.hidden.xl:block.text-[10px]` ("Gestão Pública • FAFICH") — **10.0px** (24 routes).
     - BottomNav Dock Labels: `span.text-[10px].font-['Oswald'].uppercase` ("Início", "Curso", "Grade", "Acervo", "CAGP", "Ajustes") — **10.0px** (105 instances across mobile routes).
     - System Badges: `span.cagp-badge` computed at **10.88px** ("Turno Noturno", "Central Curricular 10P", "27 Obrigatórias • 1.860h", "68 Optativas Homologadas", "120h Formação Livre").
     - Elective Catalog Metadata: Department codes and workload chips — **10.0px**.
   - *HIG Standard*: Functional, content-bearing UI text below 11px fails legibility standards on high-DPI and mobile displays. Only non-interactive legal copyright text is permitted at 10px.
3. **Missing Synthetic Bold & Oblique Prevention (`font-synthesis: none`)**:
   - Search: `grep -r "font-synthesis" src/` returned 0 matches.
   - *Observation*: `font-synthesis: none` is completely absent. When an unsupported font weight or italic style is rendered, browsers automatically synthesize distorted fake glyphs.
4. **Missing Firefox macOS Smoothing**:
   - `src/styles/global.css:51` sets `-webkit-font-smoothing: antialiased;`, but omits `-moz-osx-font-smoothing: grayscale;`.

---

## 2. Logic Chain

1. **Ergonomic Integrity**:
   - The Apple HIG 44x44pt rule is derived from the average human index finger contact pad (8mm–10mm).
   - Live browser CDP measurements revealed 137 sub-44px targets. The most critical failures are the document reader disclosure headers ($340\times 16$px) and the desktop topbar action buttons ($36\times 44$px and $38\times 44$px).
   - On touch-enabled laptops (Chromebooks, Surface) and iPads, clicking a 36px or 16px target results in high target miss rates.
2. **Hardware Safe Area Integrity**:
   - While the mobile bottom nav correctly accounts for `env(safe-area-inset-bottom)`, the mobile drawer completely omits `env(safe-area-inset-top)`.
   - On modern iPhones, this causes hardware clipping where the drawer close button intersects the Dynamic Island.
3. **Accessibility & User Agency**:
   - Disabling viewport zooming (`user-scalable=no`) and canceling `gesturestart` events directly violates WCAG 1.4.4 and Apple Human Interface Guidelines regarding user empowerment.
   - Text contrast on the campaign banner (4.02:1) fails WCAG AA requirements for normal text.
4. **Graphics Pipeline & Chromium Parity**:
   - 289 backdrop-filter elements lack `isolation: isolate;` or `transform: translateZ(0);`. In Chromium, this forces continuous layer invalidation during page scroll, degrading the 60fps / 120fps fluid scrolling experience expected of an Apple-grade application.
5. **Brand Conformity**:
   - The app strictly complies with App Store Guideline 4.9 (no counterfeit Apple Pay buttons). However, under App Store Guideline 4.0 (Design) and Guideline 2.1 (Performance/Accessibility), the app would be rejected in pre-production review due to touch target and contrast violations.

---

## 3. Strict Apple HIG Violations Table

| ID | Domain | Severity | Route / Component | Exact Selector & Rendered Box | Guideline Citation | Required Remediation |
|---|---|---|---|---|---|---|
| **V-01** | Touch Ergonomics | **CRITICAL** | `SuperAppHeader.astro:171` | `button#cagp-btn-a11y-quick`<br>Dimensions: **36.0 × 44.0 px** | Apple HIG *Touch Targets*: "Maintain a minimum tappable area of 44pt × 44pt." | Remove `sm:w-9 sm:h-9 sm:min-w-[36px] sm:min-h-[36px]`. Enforce `w-11 h-11 min-w-[44px] min-h-[44px]`. |
| **V-02** | Touch Ergonomics | **CRITICAL** | `SuperAppHeader.astro:185` | `button#cagp-btn-passport`<br>Dimensions: **38.0 × 44.0 px** | Apple HIG *Touch Targets*: "Maintain a minimum tappable area of 44pt × 44pt." | Remove `sm:w-9.5 sm:h-9.5 sm:min-w-[36px] sm:min-h-[36px]`. Maintain `min-w-[44px] min-h-[44px]`. |
| **V-03** | Touch Ergonomics | **CRITICAL** | `documentos/[slug].astro:204` | `summary.cursor-pointer`<br>Dimensions: **340.0 × 16.0 px** | Apple HIG *Touch Targets*: 44pt minimum height for interactive disclosure triggers. | Add `min-h-[44px] py-3` to `<summary>` and flex alignment for chevron. |
| **V-04** | Touch Ergonomics | **HIGH** | `BackToTop.astro:8` | `button#cagp-back-to-top`<br>Dimensions: **38.8 × 44.0 px** | Apple HIG *Touch Targets*: Floating action buttons must meet 44x44px. | Add `min-w-[44px] min-h-[44px] w-11 h-11 justify-center` on mobile. |
| **V-05** | Touch Ergonomics | **HIGH** | `SettingsA11ySection.tsx:38` | `button` ("A-", "A")<br>Dimensions: **37.0 × 44.0 px**, **42.0 × 44.0 px** | Apple HIG *Touch Targets*: Segmented steppers must maintain 44px width. | Add `min-w-[44px]` to all font stepper buttons. |
| **V-06** | Touch Ergonomics | **HIGH** | `PassportSheet.tsx:85,97` | Segmented Tab Buttons<br>Dimensions: **~160.0 × 28.0 px** | Apple HIG *Segmented Controls*: Touch targets must be at least 44pt tall. | Add `min-h-[44px]` and `py-2.5` to sheet tabs. |
| **V-07** | Touch Ergonomics | **HIGH** | `CampusSheet.tsx:101,113` | `.ics` and Alarm Buttons<br>Dimensions: **~130.0 × 28.0 px** | Apple HIG *Buttons*: Action buttons must meet 44pt height. | Add `min-h-[44px] py-2.5` to all sheet buttons. |
| **V-08** | Accessibility | **CRITICAL** | `BaseLayout.astro:32,55-58` | `<meta name="viewport">` & `gesturestart` listener | WCAG 1.4.4 *Resize Text* & Apple HIG *Accessibility*: "Never disable zoom." | Remove `maximum-scale=1, user-scalable=no` and delete gesture-blocking script. |
| **V-09** | Accessibility | **CRITICAL** | `CampaignBanner.astro:12` | `strong.text-[#FF8718]` on `#5B2E85`<br>Contrast: **4.02:1** (Need 4.5:1) | WCAG 2.1 AA 1.4.3 *Contrast (Minimum)*: Normal text must achieve 4.5:1. | Darken background to `#4A236D` or brighten text to `#FFA347` (4.65:1). |
| **V-10** | Safe Areas | **HIGH** | `drawer.css:49` | `.cagp-drawer-panel`<br>Lacks `env(safe-area-inset-top)` | Apple HIG *Layout*: Respect hardware safe areas for Dynamic Island. | Set `padding-top: calc(1.25rem + env(safe-area-inset-top, 0px));`. |
| **V-11** | Safe Areas | **MEDIUM** | `DesktopFloatingDock.tsx:88` | `aside.fixed.bottom-5`<br>Hardcoded `bottom-5` | Apple HIG *Layout*: Bottom dock must clear Home indicator. | Change to `bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px))`. |
| **V-12** | Viewports | **HIGH** | `BaseLayout.astro:125` | `body.min-h-screen`<br>Naked `100vh` usage | Apple Impeccable *Dynamic Viewports*: Use `100dvh` for root screens. | Replace `min-h-screen` with `min-h-[100dvh]`. |
| **V-13** | Viewports | **HIGH** | `BottomSheet.tsx:81` | Modal height `h-[90dvh]` | Apple Impeccable *Dynamic Viewports*: Modals must use `100svh`. | Replace `h-[90dvh]` with `h-[90svh] max-h-[90svh]`. |
| **V-14** | Materials | **HIGH** | 289 glass instances | `backdrop-filter` elements<br>`isolation: auto` (100%) | Apple Impeccable *Compositing Parity*: Mandatory GPU isolation. | Add `isolation: isolate; transform: translateZ(0);` to glass surfaces. |
| **V-15** | Materials | **MEDIUM** | `components.css:386` | Unused `.cagp-glass-surface` fallback | Apple HIG *Materials*: Honor `prefers-reduced-transparency`. | Bind `@media (prefers-reduced-transparency: reduce)` to `[class*="backdrop-blur"]`. |
| **V-16** | Materials & Craft | **MEDIUM** | Header, BottomNav, Dock | Translucent glass with `2px solid #0A0A0A` border | Apple HIG *Materials*: Translucent glass requires specular hairline borders. | Replace hard 2px black border with 0.5px subtle hairline (`border-[0.5px] border-black/15 shadow-sm`). |
| **V-17** | Typography | **HIGH** | Global (`src/`) | 799 instances of functional UI text < 11px | Apple HIG *Typography*: Functional UI text floor is 11pt. | Increase badge and sublabel floor from `text-[10px]` to `text-[11px]` (0.6875rem). |
| **V-18** | Typography | **HIGH** | `global.css:47` | Missing `font-synthesis: none` | Apple Impeccable *Chromium/Safari Parity*: Prevent synthetic glyph smearing. | Add `font-synthesis: none;` to `html, body`. |
| **V-19** | Typography | **LOW** | `global.css:51` | Missing `-moz-osx-font-smoothing: grayscale` | Apple Impeccable *Parity*: Cross-engine font smoothing parity. | Add `-moz-osx-font-smoothing: grayscale;` to `html`. |

---

## 4. Caveats

1. **Strictly Read-Only Evaluation**: In adherence to the prompt and `PROJECT.md`, zero project source code was modified or deleted during this evaluation.
2. **Platform & Engine Coverage**: Testing was performed on Google Chrome / Playwright Chromium 156 on Linux. WebKit engine nuances were evaluated against authoritative Apple HIG guidelines and Safari technical specifications.
3. **High Contrast Mode Resilience**: The contrast violation on `CampaignBanner.astro` (4.02:1) is resolved when High Contrast Mode (`data-a11y-contrast="high"`) is active (measured at 21.0:1). The remediation is required for the default color scheme.

---

## 5. Conclusion

The CAGP Super App Discente demonstrates significant strengths: full adherence to App Store Guideline 4.9 (0 counterfeit Apple Pay marks), pristine implementation of High Contrast AAA mode (21:1 contrast), and strict preservation of the two-layer spatial model (keeping content cards opaque).

However, **the application fails pre-production release readiness against strict Apple HIG standards**. The evaluation identified **19 distinct violations**, including **4 Critical blockers**:
1. Systematic failure of the 44x44pt touch target rule across 137 elements (including topbar actions and document reader summaries measuring only 16px).
2. Intentional blocking of pinch-to-zoom (`user-scalable=no` and `gesturestart` interception), violating WCAG 1.4.4 and Apple HIG Accessibility principles.
3. WCAG AA contrast failure on the campaign banner (4.02:1).
4. Total omission of GPU layer isolation (`isolation: isolate`) across all 289 backdrop-filter elements, accompanied by Dynamic Island safe-area clipping in the mobile drawer.

**Verdict**: **REQUEST_CHANGES (RELEASE BLOCKED)**. Pre-production approval is withheld until the critical and high findings in Table 3 are remediated.

---

## 6. Verification Method

To independently reproduce and verify all observations, metrics, and findings:

1. **Verify Live Dev Server & Routes**:
   ```bash
   npx astro dev status
   curl -sI http://localhost:4321/
   ```
2. **Run Authoritative HIG & Parity Audit Tooling**:
   ```bash
   bash .agents/skills/apple-impeccable/scripts/run-audit.sh parity src
   bash .agents/skills/apple-impeccable/scripts/run-audit.sh appledesign src
   bash .agents/skills/apple-impeccable/scripts/run-audit.sh critique http://localhost:4321
   ```
3. **Inspect Raw Telemetry Datasets**:
   - Touch Targets: `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/worker_m1/touch-targets-audit.json`
   - Contrast & Text Floor: `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/worker_m1/contrast-audit.json`
   - Materials & Glass: `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/worker_m1/materials-glass-audit.json`
   - Overlays & Capture Summary: `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/worker_m1/capture-summary.json`
4. **Reproduce Touch Target Dimensions via Node**:
   ```bash
   node -e '
   const fs = require("fs");
   const data = JSON.parse(fs.readFileSync(".agents/teamwork/worker_m1/touch-targets-audit.json", "utf8"));
   console.log("Desktop header a11y button:", data["/@desktop"].samples[0]);
   console.log("Desktop header passport button:", data["/@desktop"].samples[1]);
   '
   ```
5. **Verify Safe Area & Zoom Blocking in Source**:
   - `grep -n "user-scalable" src/layouts/BaseLayout.astro`
   - `grep -n "gesturestart" src/layouts/BaseLayout.astro`
   - `grep -n "padding-top" src/styles/drawer.css`
