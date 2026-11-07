# Part 1: Getting Started & Foundations Correlation Matrix (22 Items)

This document provides an exhaustive, 3-layer architectural correlation crossing **Apple's 6 Getting Started and 16 Foundations guidelines** with **Neobrutalism.com** and **BoldKit.dev**.

---

## Layer 2: Macro-Thematic Group Analysis

### 1. Philosophy & Principles: Deference vs Brutalist Impact
Apple's design foundation rests on the 8 core principles reintroduced in 2026: *Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight*. Apple prioritizes **deference**—the interface subtly steps back so content takes center stage.
Conversely, **Neobrutalism** and **BoldKit** take inspiration from raw architectural brutalism: the construction materials (borders, shadows, structural grids) are deliberately exposed and celebrated. Affordances are never hidden behind subtle gestures; buttons look physical, borders are heavy, and contrast is unapologetic.

### 2. Materials & Spatial Layering: Liquid Glass vs Solid Paper
The most profound technical divergence lies in surface material treatment:
- **Apple Design**: Relies extensively on **Liquid Glass**, materials, Gaussian blur filters, and vibrancy shaders that let background content dynamically bleed through foreground navigation sheets.
- **Neobrutalism & BoldKit**: Completely reject faux translucency. Surfaces are **100% opaque**, modeled after physical cut paper cards with high-contrast pastel or neon fills, bounded by 2px or 3px solid black strokes, and casting unblurred 4px hard drop shadows.

### 3. Accessibility & Sizing: The 44pt Mandate
Apple HIG enforces a strict minimum interactive touch target of **44x44pt** on iOS/iPadOS to prevent missed taps. In Neobrutalism, default buttons are 40px (`h-10`), requiring an explicit `h-11` or `size-lg` override for HIG compliance. BoldKit buttons default to **44px height (`h-11 px-5`)**, satisfying Apple's touch accessibility baseline out of the box. Both brutalist libraries guarantee maximum WCAG contrast (21:1) by using pure black borders on bright fills.

---

## Layer 3: 22 Individual Tripartite Technical Cards

### 1.1 `design-principles.md` — Design Principles
> **Apple Guideline Summary**: Explore fundamental principles that guide design across Apple platforms.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/design-principles.md`](../../apple_design/skill/references/hig/design-principles.md) |
| **Neobrutalism File(s)** | `neobrutalism/styling/globals.css` |
| **BoldKit File(s)** | `boldkit/styles/globals.css, motion-core.ts` |
| **Common Ground** | Both prioritize user focus, clear affordances, and predictable interaction models. |
| **Particularities & Divergences** | Apple promotes subtle deference, optical harmony, and fluid transitions; Brutalism embraces radical transparency, explicit 2px/3px borders, and unapologetic contrast. |

**Web / React Implementation Recipe**:
- Use semantic HTML elements wrapped in high-contrast Tailwind utility classes (`border-2 border-border shadow-shadow` or `border-3 border-foreground`).

---

### 1.2 `designing-for-ios.md` — Designing For Ios
> **Apple Guideline Summary**: People depend on their iPhone to help them stay connected, play games, view media, accomplish tasks, and track personal data in any location and while on the go.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/designing-for-ios.md`](../../apple_design/skill/references/hig/designing-for-ios.md) |
| **Neobrutalism File(s)** | `neobrutalism/hooks/use-mobile.ts` |
| **BoldKit File(s)** | `boldkit/blocks-code/application/dashboard-layout.tsx (mobile drawer)` |
| **Common Ground** | Ergonomic mobile thumb reachability, bottom-oriented navigation, and touch-friendly control heights. |
| **Particularities & Divergences** | Apple mandates 44x44pt minimum touch targets and rounded tab bars; Brutalism uses thick tactile buttons (`h-11 px-5`) and hard drop shadows. |

**Web / React Implementation Recipe**:
- Apply `min-h-[44px] min-w-[44px]` to all interactive controls and use safe-area padding (`pb-[env(safe-area-inset-bottom)]`).

---

### 1.3 `designing-for-ipados.md` — Designing For Ipados
> **Apple Guideline Summary**: People value the power, mobility, and flexibility of iPad as they enjoy media, play games, perform detailed productivity tasks, and bring their creations to life.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/designing-for-ipados.md`](../../apple_design/skill/references/hig/designing-for-ipados.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/resizable.tsx` |
| **BoldKit File(s)** | `boldkit/blocks-code/marketing/bento-grid.tsx` |
| **Common Ground** | Adaptive multi-pane workflows, pointer hover transformations, and keyboard shortcut support. |
| **Particularities & Divergences** | Apple uses SplitViewController and floating toolbars; BoldKit provides multi-column Bento grids and resizable panel groups. |

**Web / React Implementation Recipe**:
- Implement fluid grid containers using CSS Grid (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`) with tactile brutalist card borders.

---

### 1.4 `designing-for-macos.md` — Designing For Macos
> **Apple Guideline Summary**: People rely on the power, spaciousness, and flexibility of a Mac as they perform in-depth productivity tasks, view media or content, and play games, often using several apps at once.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/designing-for-macos.md`](../../apple_design/skill/references/hig/designing-for-macos.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/menubar.tsx` |
| **BoldKit File(s)** | `boldkit/blocks-code/application/dashboard-layout.tsx` |
| **Common Ground** | Information density, desktop menubars, multi-window split ergonomics, and precision pointer control. |
| **Particularities & Divergences** | Apple relies on the systemwide top menu bar and window chrome traffic lights; Brutalism integrates in-app bordered menubars and retro window frames. |

**Web / React Implementation Recipe**:
- Combine `menubar.tsx` with a desktop dashboard shell containing fixed sidebar navigation and a persistent top utility toolbar.

---

### 1.5 `designing-for-games.md` — Designing For Games
> **Apple Guideline Summary**: When people play your game on an Apple device, they dive into the world you designed while relying on the platform features they love.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/designing-for-games.md`](../../apple_design/skill/references/hig/designing-for-games.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/carousel.tsx` |
| **BoldKit File(s)** | `boldkit/canvas-effects/ (23 shaders), ascii-shapes.tsx` |
| **Common Ground** | Immersive audiovisual feedback, playful interaction loops, and custom thematic styling. |
| **Particularities & Divergences** | Apple relies on Metal, Game Center, and full-screen immersion; BoldKit provides 23 interactive canvas shaders (CRT, Plasma, MatrixRain) and 3D ASCII shapes. |

**Web / React Implementation Recipe**:
- Embed an interactive WebGL or HTML5 canvas component behind your main UI container using `absolute inset-0 pointer-events-none`.

---

### 1.6 `designing-for-iphone-duo.md` — Designing For Iphone Duo
> **Apple Guideline Summary**: An app designed for iPhone Duo adapts seamlessly to both displays, providing a continuous experience as the device opens and closes.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/designing-for-iphone-duo.md`](../../apple_design/skill/references/hig/designing-for-iphone-duo.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/resizable.tsx` |
| **BoldKit File(s)** | `boldkit/ui/resizable.tsx` |
| **Common Ground** | Handling dual-screen postures, physical display hinge/seams, and posture transitions. |
| **Particularities & Divergences** | Apple guides apps to avoid placing active controls or text directly over the hinge seam; Brutalism uses discrete bordered panes cleanly separated by visual gutters. |

**Web / React Implementation Recipe**:
- Use CSS Viewport Segments API or media queries (`@media (horizontal-viewport-segments: 2)`) to place panels on opposite sides of the seam.

---

### 1.7 `accessibility.md` — Accessibility
> **Apple Guideline Summary**: Accessible user interfaces empower everyone to have a great experience with your app or game.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/accessibility.md`](../../apple_design/skill/references/hig/accessibility.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/ (ARIA roles in all components)` |
| **BoldKit File(s)** | `boldkit/ (Radix UI primitives tested with axe-core)` |
| **Common Ground** | Full keyboard navigation, screen reader accessibility (ARIA), high visual contrast, and reduced motion accommodation. |
| **Particularities & Divergences** | Apple relies on VoiceOver rotor navigation, Dynamic Type scaling, and system contrast settings; Brutalism inherently achieves WCAG AAA contrast (21:1 black on white) with visible focus rings. |

**Web / React Implementation Recipe**:
- Ensure all buttons adhere to `focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2` and `min-h-[44px]`.

---

### 1.8 `app-icons.md` — App Icons
> **Apple Guideline Summary**: A unique, memorable icon expresses your app’s or game’s purpose and personality and helps people recognize it at a glance.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/app-icons.md`](../../apple_design/skill/references/hig/app-icons.md) |
| **Neobrutalism File(s)** | `neobrutalism/public/favicon.ico` |
| **BoldKit File(s)** | `boldkit/extras/shapes.md (64 retro SVG seals and stars)` |
| **Common Ground** | Memorable brand recognition, clean silhouette, and instant conceptual communication. |
| **Particularities & Divergences** | Apple enforces continuous-curvature squircles with system grid guidelines; Brutalism embraces multi-pointed starbursts (4 to 12 points), retro postal stamps, and ink badges. |

**Web / React Implementation Recipe**:
- Export SVG brand seals with 3px solid black outlines and flat vibrant fills (`fill-primary stroke-foreground stroke-[3px]`).

---

### 1.9 `branding.md` — Branding
> **Apple Guideline Summary**: Apps and games express their unique brand identity in ways that make them instantly recognizable while feeling at home on the platform and giving people a consistent experience.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/branding.md`](../../apple_design/skill/references/hig/branding.md) |
| **Neobrutalism File(s)** | `neobrutalism/styling/globals.css` |
| **BoldKit File(s)** | `boldkit/components/sticker.md, logo-cloud.tsx` |
| **Common Ground** | Expressing unique organizational identity and personality across user touchpoints. |
| **Particularities & Divergences** | Apple advises brand deference (content first, subtle branding); Brutalism celebrates unapologetic, prominent branding via rotated stickers, tape stamps, and bold typography. |

**Web / React Implementation Recipe**:
- Use the BoldKit `<Sticker>` component with `rotate-[-3deg] shadow-hard` to showcase brand badges and verified marks.

---

### 1.10 `color.md` — Color
> **Apple Guideline Summary**: Judicious use of color can enhance communication, evoke your brand, provide visual continuity, communicate status and feedback, and help people understand information.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/color.md`](../../apple_design/skill/references/hig/color.md) |
| **Neobrutalism File(s)** | `neobrutalism/styling/globals.css (--main, --background)` |
| **BoldKit File(s)** | `boldkit/styles/globals.css (--primary, neon, clash)` |
| **Common Ground** | Semantic communication (destructive red, warning yellow, success green) and aesthetic tone. |
| **Particularities & Divergences** | Apple uses muted, translucent system tints that adapt subtly between light/dark mode; BoldKit provides hyper-vibrant Neon and Clash palettes paired with stark solid black borders. |

**Web / React Implementation Recipe**:
- Define clear CSS variables in Tailwind v4 `@theme` block: `--color-primary`, `--color-destructive`, `--color-accent`.

---

### 1.11 `dark-mode.md` — Dark Mode
> **Apple Guideline Summary**: Dark Mode is a systemwide appearance setting that uses a dark color palette to provide a comfortable viewing experience tailored for low-light environments.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/dark-mode.md`](../../apple_design/skill/references/hig/dark-mode.md) |
| **Neobrutalism File(s)** | `neobrutalism/styling/globals.css (.dark class)` |
| **BoldKit File(s)** | `boldkit/hooks/use-theme.tsx & styles/globals.css` |
| **Common Ground** | Low-light eye comfort, battery efficiency on OLED, and automatic system preference detection. |
| **Particularities & Divergences** | Apple utilizes deep layered greys with translucent vibrancy materials; Brutalism inverts black borders to pure white (`border-white`) and black backgrounds while maintaining hard offset shadows. |

**Web / React Implementation Recipe**:
- Implement `use-theme.tsx` toggling a `.dark` root class that remaps `--border: 0 0% 100%` and `--shadow-color: 0 0% 100%`.

---

### 1.12 `icons.md` — Icons
> **Apple Guideline Summary**: An effective icon is a graphic asset that expresses a single concept in ways people instantly understand.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/icons.md`](../../apple_design/skill/references/hig/icons.md) |
| **Neobrutalism File(s)** | `lucide-react (stroke-based icons)` |
| **BoldKit File(s)** | `lucide-react, @lobehub/icons-static-svg` |
| **Common Ground** | Universal visual shorthand communicating actions and objects across interfaces. |
| **Particularities & Divergences** | Apple utilizes SF Symbols with 9 optical weights aligning with system text; Web Brutalism standardizes on 24x24 Lucide SVG icons with bold strokes (`stroke-[2.5px]`). |

**Web / React Implementation Recipe**:
- Render icons inside square bordered badge containers: `<div className="size-10 border-2 border-black flex items-center justify-center bg-main"><Icon className="size-5" /></div>`.

---

### 1.13 `images.md` — Images
> **Apple Guideline Summary**: To make sure your artwork looks great on all devices you support, learn how the system displays content and how to deliver art at the appropriate scale factors.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/images.md`](../../apple_design/skill/references/hig/images.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/image-card.tsx` |
| **BoldKit File(s)** | `boldkit/canvas-effects/Halftone.tsx, Dither.tsx` |
| **Common Ground** | Visual storytelling, content display, and high-fidelity asset rendering. |
| **Particularities & Divergences** | Apple emphasizes photorealistic high-DPI @2x/@3x assets; Brutalism frequently incorporates retro stylized image treatments such as Bayer dithering and halftone dot screens. |

**Web / React Implementation Recipe**:
- Wrap `<img>` tags in a 3px solid frame with hard drop shadow: `<img className="border-3 border-black shadow-hard object-cover" />`.

---

### 1.14 `inclusion.md` — Inclusion
> **Apple Guideline Summary**: Inclusive apps and games put people first by prioritizing respectful communication and presenting content and functionality in ways that everyone can access and understand.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/inclusion.md`](../../apple_design/skill/references/hig/inclusion.md) |
| **Neobrutalism File(s)** | `neobrutalism/lib/utils.ts` |
| **BoldKit File(s)** | `boldkit/components/error-boundary.md` |
| **Common Ground** | Universal accessibility, respectful human-centric copy, and cultural adaptability. |
| **Particularities & Divergences** | Apple provides guidelines for cultural neutrality and universal accessibility; Brutalism ensures clarity through unvarnished, direct language and high legibility. |

**Web / React Implementation Recipe**:
- Write plain, descriptive text without jargon and ensure all images provide descriptive `alt` attributes.

---

### 1.15 `layout.md` — Layout
> **Apple Guideline Summary**: A consistent layout that adapts across display sizes, orientations, and multitasking configurations helps people understand and enjoy your app or game on all their devices.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/layout.md`](../../apple_design/skill/references/hig/layout.md) |
| **Neobrutalism File(s)** | `neobrutalism/styling/globals.css (--spacing-container)` |
| **BoldKit File(s)** | `boldkit/blocks-code/marketing/bento-grid.tsx` |
| **Common Ground** | Spatial organization, visual hierarchy, consistent margins, and responsive breakpoints. |
| **Particularities & Divergences** | Apple utilizes an 8pt baseline grid with safe area margins; Brutalism employs rigid, visible bounding boxes with exposed dividing lines and offset card containers. |

**Web / React Implementation Recipe**:
- Structure layouts using CSS grid with solid border dividers: `grid grid-cols-1 md:grid-cols-12 gap-0 border-3 border-black [&>*]:border-r-3 [&>*]:border-b-3`.

---

### 1.16 `materials.md` — Materials
> **Apple Guideline Summary**: A material is a visual effect that creates a sense of depth, layering, and hierarchy between foreground and background elements.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/materials.md`](../../apple_design/skill/references/hig/materials.md) |
| **Neobrutalism File(s)** | `neobrutalism/styling/globals.css` |
| **BoldKit File(s)** | `boldkit/styles/globals.css` |
| **Common Ground** | Establishing depth, spatial hierarchy, and visual separation between overlapping surfaces. |
| **Particularities & Divergences** | Apple relies heavily on translucency, Gaussian background blur, and vibrancy materials; Brutalism explicitly rejects blur and faux transparency in favor of solid opaque paper layers. |

**Web / React Implementation Recipe**:
- Layer surfaces using explicit z-indices and hard drop shadows: `bg-card border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

### 1.17 `motion.md` — Motion
> **Apple Guideline Summary**: Beautiful, fluid motions bring the interface to life, conveying status, providing feedback and instruction, and enriching the visual experience of your app or game.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/motion.md`](../../apple_design/skill/references/hig/motion.md) |
| **Neobrutalism File(s)** | `neobrutalism/styling/globals.css (marquee, orbit)` |
| **BoldKit File(s)** | `boldkit/styles/motion.css, lib/motion-core.ts` |
| **Common Ground** | Providing feedback, guiding spatial orientation, and bringing interfaces to life. |
| **Particularities & Divergences** | Apple specifies smooth, fluid spring curves that mimic organic physics; BoldKit provides stepped mechanical easings (`steps(4, end)`) and ink stamp impacts (`bk-stamp-in`). |

**Web / React Implementation Recipe**:
- Import BoldKit's `motion.css` and use `--bk-ease-snap` for tactile button recoil transitions.

---

### 1.18 `privacy.md` — Privacy
> **Apple Guideline Summary**: Privacy is paramount: it’s critical to be transparent about the privacy-related data and resources you require and essential to protect the data people allow you to access.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/privacy.md`](../../apple_design/skill/references/hig/privacy.md) |
| **Neobrutalism File(s)** | `neobrutalism/components/form.md` |
| **BoldKit File(s)** | `boldkit/blocks-code/application/auth-forms.tsx` |
| **Common Ground** | Transparency regarding data collection, user consent, and purpose specification. |
| **Particularities & Divergences** | Apple uses system modal permission sheets and App Privacy Nutrition Labels; Brutalism uses clear, high-visibility bordered consent callouts and explicit opt-in checkboxes. |

**Web / React Implementation Recipe**:
- Pair a thick-bordered `<Checkbox>` with explicit permission copy and link to privacy policy.

---

### 1.19 `right-to-left.md` — Right To Left
> **Apple Guideline Summary**: Support right-to-left languages like Arabic and Hebrew by reversing your interface as needed to match the reading direction of the related scripts.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/right-to-left.md`](../../apple_design/skill/references/hig/right-to-left.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/direction.tsx (@base-ui)` |
| **BoldKit File(s)** | `boldkit/styles/globals.css (Tailwind RTL utilities)` |
| **Common Ground** | Bidirectional script support (Arabic, Hebrew) with mirrored navigation and layout. |
| **Particularities & Divergences** | Apple automatically mirrors system navigation controllers and chevron icons; Neobrutalism provides a dedicated `@base-ui/react/direction-provider` component. |

**Web / React Implementation Recipe**:
- Wrap the application tree in `<DirectionProvider direction="rtl">` and use logical Tailwind properties (`ms-*`, `me-*`, `border-s-*`).

---

### 1.20 `sf-symbols.md` — Sf Symbols
> **Apple Guideline Summary**: SF Symbols provides thousands of consistent, highly configurable symbols that integrate seamlessly with the San Francisco system font, automatically aligning with text in all weights and sizes.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/sf-symbols.md`](../../apple_design/skill/references/hig/sf-symbols.md) |
| **Neobrutalism File(s)** | `lucide-react` |
| **BoldKit File(s)** | `lucide-react` |
| **Common Ground** | Providing thousands of consistent, scalable vector icons aligned to system typography. |
| **Particularities & Divergences** | Apple provides proprietary SF Symbols with 9 weights and multi-color rendering modes; Web ecosystems use Lucide React icons matching standard font weights. |

**Web / React Implementation Recipe**:
- Import Lucide icons with consistent stroke weight: `<Check className="size-4 stroke-[2.5px]" />`.

---

### 1.21 `typography.md` — Typography
> **Apple Guideline Summary**: Your typographic choices can help you display legible text, convey an information hierarchy, communicate important content, and express your brand or style.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/typography.md`](../../apple_design/skill/references/hig/typography.md) |
| **Neobrutalism File(s)** | `neobrutalism/styling/globals.css (DM Sans)` |
| **BoldKit File(s)** | `boldkit/styles/globals.css (font-bold uppercase)` |
| **Common Ground** | Legibility, typographic hierarchy, reading comfort, and expressive brand voice. |
| **Particularities & Divergences** | Apple utilizes San Francisco with Dynamic Type scaling across 11 size categories; Brutalism uses bold uppercase headers, heavy letter spacing, and high-impact monospace numbers. |

**Web / React Implementation Recipe**:
- Combine high-contrast sans-serif headings with monospace numbers: `font-heading uppercase tracking-wide`.

---

### 1.22 `writing.md` — Writing
> **Apple Guideline Summary**: The words you choose within your app are an essential part of its user experience.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/writing.md`](../../apple_design/skill/references/hig/writing.md) |
| **Neobrutalism File(s)** | `neobrutalism/components/ (copy examples)` |
| **BoldKit File(s)** | `boldkit/blocks/ (microcopy specs)` |
| **Common Ground** | Clarity, brevity, tone of voice, and actionable instructional microcopy. |
| **Particularities & Divergences** | Apple champions concise, friendly, conversational language; Brutalism embraces blunt, direct, unvarnished instructions with no corporate fluff. |

**Web / React Implementation Recipe**:
- Keep button copy to 1-2 action-oriented imperative words: "SUBMIT", "DOWNLOAD", "CONNECT".

---
