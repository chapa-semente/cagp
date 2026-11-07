# Part 0: Apple HIG & Neobrutalism Tripartite Master Index & 124-Item Table

Welcome to the **Master Correlation Matrix and Architectural Analysis** crossing **Apple's complete Human Interface Guidelines (124 references)** with the two leading Neobrutalist design ecosystems: **Neobrutalism.com** and **BoldKit.dev**.

---

## Executive Architecture: The Three Paradigms

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               TRIPARTITE DESIGN TAXONOMY                               │
├──────────────────────────┬─────────────────────────────┬───────────────────────────────┤
│      Apple Design (HIG)  │      Neobrutalism.com       │          BoldKit.dev          │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ • Core Idea: Deference,  │ • Core Idea: Editorial,     │ • Core Idea: Hyper-tactile,   │
│   Clarity, Depth         │   high-contrast flat art    │   bold, motion-driven UI      │
│ • Material: Translucent  │ • Material: Solid flat      │ • Material: Opaque surfaces,  │
│   Liquid Glass, vibrancy │   colors (bg-main, pastel)  │   neon/clash color palettes   │
│ • Stroke: Hairline /     │ • Stroke: border-2          │ • Stroke: border-3            │
│   Subtle border radiance │   (2px solid black)         │   (3px heavy tactile stroke)  │
│ • Shadows: Soft diffuse  │ • Shadows: Semantic         │ • Shadows: Hard offset        │
│   ambient drop shadows   │   shadow-shadow (4px)       │   4px 4px 0px hsl(...)        │
│ • Motion: Fluid Apple    │ • Motion: Minimal linear    │ • Motion: Stepped physics,    │
│   spring physics         │   marquees & orbits         │   ink stamps, 6 keyframe anims│
│ • Touch: Strict 44x44pt  │ • Touch: h-10 px-4          │ • Touch: h-11 px-5            │
│   minimum touch targets  │   (40px height)             │   (44px height = HIG compliant│
│ • Font: SF Pro, Dynamic  │ • Font: DM Sans,            │ • Font: Uppercase bold,       │
│   Type text scaling      │   normal title case         │   tracking-wide, monospace    │
└──────────────────────────┴─────────────────────────────┴───────────────────────────────┘
```

---

## Layer 1: Master Exhaustive 124-Item Correlation Table

| # | HIG Guideline | Section | Neobrutalism Equivalent | BoldKit Equivalent | Key Common Ground | Core Particularity / Divergence |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | [`accessibility`](../../apple_design/skill/references/hig/accessibility.md) | Foundations | `accessible semantic HTML` | `accessible Radix UI + axe-core` | WCAG compliance and assistive tech | Apple: VoiceOver, 44pt targets, Dynamic Type; Brutalist: 21:1 black/white contrast, clear focus rings |
| 2 | [`action-sheets`](../../apple_design/skill/references/hig/action-sheets.md) | Components | `drawer.tsx / sheet.tsx` | `drawer.tsx / sheet.tsx` | Contextual actions sliding from screen edge | Apple: rounded sheet anchored to bottom; Brutalist: slide-over drawer with 3px border |
| 3 | [`activity-views`](../../apple_design/skill/references/hig/activity-views.md) | Components | `popover + button` | `button-group.tsx` | System share sheet | Apple: native iOS/macOS sharing sheet; Brutalist: web share API trigger or social button group |
| 4 | [`airplay`](../../apple_design/skill/references/hig/airplay.md) | Technologies | `media streaming API` | `media streaming API` | Wireless AV beaming | Apple: AirPlay route picker; Web: Google Cast or WebRTC fallback |
| 5 | [`alerts`](../../apple_design/skill/references/hig/alerts.md) | Components | `alert-dialog.tsx` | `alert-dialog.tsx` | Critical interruption requiring user confirmation | Apple: centered glass dialog with 2 stacked buttons; Brutalist: high-contrast box with hard offset shadow |
| 6 | [`app-clips`](../../apple_design/skill/references/hig/app-clips.md) | Technologies | `pwa / web manifest` | `manifest.webmanifest (PWA)` | Ephemeral lightweight app experience | Apple: App Clip code NFC/QR; Web: Progressive Web App with instant service worker |
| 7 | [`app-icons`](../../apple_design/skill/references/hig/app-icons.md) | Foundations | `favicon / brand assets` | `shapes.md (64 retro seals)` | App brand mark recognition | Apple: rounded squircle with grid grid; BoldKit: 64 SVG brutalist starburst seals |
| 8 | [`app-shortcuts`](../../apple_design/skill/references/hig/app-shortcuts.md) | Components | `kbd.tsx / command.tsx` | `command.tsx` | System and app shortcut execution | Apple: Shortcuts app integration; Brutalist: command palette (`cmdk`) |
| 9 | [`apple-in-app-purchase`](../../apple_design/skill/references/hig/apple-in-app-purchase.md) | Technologies | `pricing table` | `pricing-section.tsx` | Digital subscriptions and unlocks | Apple: StoreKit 2 paywalls; BoldKit: tiered pricing block with monthly/annual switch |
| 10 | [`apple-pay`](../../apple_design/skill/references/hig/apple-pay.md) | Technologies | `payment trigger button` | `invoice.tsx / pricing-section.tsx` | One-touch secure checkout | Apple: strict brand button specs; Web: Apple Pay JS or Stripe Elements checkout button |
| 11 | [`apple-pencil-and-scribble`](../../apple_design/skill/references/hig/apple-pencil-and-scribble.md) | Inputs | `canvas-draw` | `canvas-effects (pointer)` | Stylus precision and handwriting input | Apple: PencilKit with hover and tilt; BoldKit: mouse ripple and canvas pointer tracking |
| 12 | [`augmented-reality`](../../apple_design/skill/references/hig/augmented-reality.md) | Technologies | `webxr fallback` | `canvas-effects (3D shaders)` | Spatial digital overlays on camera view | Apple: ARKit with RealityKit; BoldKit: 3D ASCII shapes and perspective shaders |
| 13 | [`boxes`](../../apple_design/skill/references/hig/boxes.md) | Components | `card.tsx` | `card.tsx` | Visual framing of related items | Apple: macOS NSBox frame; Brutalist: 2px/3px bordered card container |
| 14 | [`branding`](../../apple_design/skill/references/hig/branding.md) | Foundations | `typography & color tokens` | `sticker.md / logo-cloud.tsx` | Visual brand expression | Apple: subtle deference to content; Brutalism: loud, opinionated borders, badges and tape stickers |
| 15 | [`buttons`](../../apple_design/skill/references/hig/buttons.md) | Components | `button.tsx` | `button.tsx` | Interactive primary/secondary triggers | Apple: tinted pill / fluid springs; Neo: 2px flat stroke; BoldKit: 3px stroke + 4px hard shadow + CSS animations |
| 16 | [`charting-data`](../../apple_design/skill/references/hig/charting-data.md) | Patterns | `chart.tsx (Recharts)` | `ui/chart/* (14 charts)` | Visual data communication | Apple: clear layout without chartjunk; BoldKit: high-contrast brutalist palettes and toolbars |
| 17 | [`charts`](../../apple_design/skill/references/hig/charts.md) | Components | `chart.tsx (Recharts)` | `ui/chart/* (14 chart types)` | Data visualization and metrics | Apple: Apple Charts framework; Brutalist: Recharts with thick strokes, high-contrast toolbars, and export |
| 18 | [`collaboration-and-sharing`](../../apple_design/skill/references/hig/collaboration-and-sharing.md) | Patterns | `message.tsx / avatar.tsx` | `team-section.tsx` | Multi-user sharing workflows | Apple: CloudKit sharing sheet; BoldKit: team member cards with social links |
| 19 | [`collections`](../../apple_design/skill/references/hig/collections.md) | Components | `carousel.tsx / card.tsx` | `bento-grid.tsx` | Multi-item grid or collection layouts | Apple: UICollectionView grid; BoldKit: bento-grid marketing block |
| 20 | [`color-wells`](../../apple_design/skill/references/hig/color-wells.md) | Components | `popover + button` | `popover + button` | Color selection trigger | Apple: native OS color picker; Brutalist: swatch grid in hard-bordered popover |
| 21 | [`color`](../../apple_design/skill/references/hig/color.md) | Foundations | `globals.css (--main, --background)` | `globals.css (--primary, neon, clash)` | Color harmony and functional roles | Apple: system semantic tints (blue, green, red); BoldKit: neon accents and high-contrast clash fills |
| 22 | [`column-views`](../../apple_design/skill/references/hig/column-views.md) | Components | `resizable.tsx` | `resizable.tsx` | Finder-style hierarchical column browser | Apple: multi-column browser; Brutalist: resizable panels |
| 23 | [`combo-boxes`](../../apple_design/skill/references/hig/combo-boxes.md) | Components | `combobox.tsx` | `combobox.tsx` | Text input coupled with search suggestions | Apple: editable dropdown list; Brutalist: cmdk + Popover composition |
| 24 | [`context-menus`](../../apple_design/skill/references/hig/context-menus.md) | Components | `context-menu.tsx` | `context-menu.tsx` | Right-click or long-press contextual actions | Apple: preview card + menu list; Brutalist: hard-shadow menu |
| 25 | [`controls`](../../apple_design/skill/references/hig/controls.md) | Components | `button.tsx / toggle.tsx` | `button.tsx / switch.tsx` | Control Center and Lock Screen action controls | Apple: circular widget controls; Brutalist: brutalist button group |
| 26 | [`dark-mode`](../../apple_design/skill/references/hig/dark-mode.md) | Foundations | `dark variant in globals.css` | `use-theme.tsx & dark tokens` | Appearance mode adaptation | Apple: deep blacks with vibrancy materials; Brutalist: inverted white borders with black surfaces |
| 27 | [`design-principles`](../../apple_design/skill/references/hig/design-principles.md) | Getting Started | `globals.css tokens` | `motion-core.ts & tokens` | Core foundational design guidelines | Apple: 8 principles (Agency, Familiarity, Simplicity); Brutalism: radical transparency, high affordance, anti-skimming |
| 28 | [`designing-for-games`](../../apple_design/skill/references/hig/designing-for-games.md) | Getting Started | `interactive widgets` | `canvas-effects (23 shaders)` | Immersive, playful interaction | Apple: Game Center, full screen; BoldKit: 23 canvas shaders, ASCII shapes |
| 29 | [`designing-for-ios`](../../apple_design/skill/references/hig/designing-for-ios.md) | Getting Started | `mobile-first layouts` | `mobile drawer / sidebar` | Phone-scale ergonomic conventions | Apple: thumb zone, bottom tab bar, 44pt touch targets; Brutalist: thick border touch controls |
| 30 | [`designing-for-ipados`](../../apple_design/skill/references/hig/designing-for-ipados.md) | Getting Started | `responsive grid` | `bento-grid / split layouts` | Tablet multitasking and spacious layouts | Apple: sidebar + split view; BoldKit: bento-grid and resizable layouts |
| 31 | [`designing-for-iphone-duo`](../../apple_design/skill/references/hig/designing-for-iphone-duo.md) | Getting Started | `responsive breakpoints` | `resizable / multi-column` | Dual-display / foldable posture adaptation | Apple: seam-aware split layouts; Brutalist: multi-pane responsive containers |
| 32 | [`designing-for-macos`](../../apple_design/skill/references/hig/designing-for-macos.md) | Getting Started | `desktop components` | `dashboard-layout.tsx` | Dense pointer-driven desktop UI | Apple: top menu bar, multi-window; BoldKit: complete dashboard shell |
| 33 | [`disclosure-controls`](../../apple_design/skill/references/hig/disclosure-controls.md) | Components | `collapsible.tsx / accordion.tsx` | `collapsible.tsx / accordion.tsx` | Progressive disclosure disclosure toggle | Apple: rotating chevron disclosure; Brutalist: bordered accordion with hard shadow |
| 34 | [`dock-menus`](../../apple_design/skill/references/hig/dock-menus.md) | Components | `context-menu.tsx` | `context-menu.tsx` | Desktop launch icon menu | Apple: macOS Dock popup; Brutalist: right-click context menu |
| 35 | [`drag-and-drop`](../../apple_design/skill/references/hig/drag-and-drop.md) | Patterns | `data-table (sortable)` | `dropzone.tsx` | Direct visual manipulation of data | Apple: spring-loaded folder dragging; BoldKit: drag-and-drop file upload with progress |
| 36 | [`edit-menus`](../../apple_design/skill/references/hig/edit-menus.md) | Components | `context-menu.tsx` | `context-menu.tsx` | Cut/copy/paste selection menu | Apple: black pill floating menu; Brutalist: bordered command palette |
| 37 | [`entering-data`](../../apple_design/skill/references/hig/entering-data.md) | Patterns | `field.tsx / form.md` | `field.tsx / multi-step-form.tsx` | Input ergonomics and error avoidance | Apple: inline validation with auto-focus; Brutalist: grouped bordered fields with explicit labels |
| 38 | [`feedback`](../../apple_design/skill/references/hig/feedback.md) | Patterns | `toast.tsx / alert.tsx` | `alert.tsx / sonner.tsx` | System status and user action response | Apple: subtle haptic & audio pings; Brutalist: high-contrast callouts with hard shadows |
| 39 | [`file-management`](../../apple_design/skill/references/hig/file-management.md) | Patterns | `attachment.tsx` | `dropzone.tsx / client.tsx` | Document handling and storage | Apple: Files app UIDocumentPicker; Neobrutalism: attachment file cards with progress |
| 40 | [`focus-and-selection`](../../apple_design/skill/references/hig/focus-and-selection.md) | Components | `composed primitive` | `composed primitive` | System interaction concept | Apple native convention vs Brutalist high-contrast web alternative |
| 41 | [`game-controls`](../../apple_design/skill/references/hig/game-controls.md) | Inputs | `kbd.tsx` | `ascii-shapes.tsx` | Gamepad and hardware button inputs | Apple: Game Controller framework; Brutalist: WASD keyboard navigation bindings |
| 42 | [`gauges`](../../apple_design/skill/references/hig/gauges.md) | Components | `progress.tsx (composed)` | `gaugechart.tsx` | Metered value visualization | Apple: watchOS/iOS circular gauge; BoldKit: speedometer-style gauge chart with zones |
| 43 | [`generative-ai`](../../apple_design/skill/references/hig/generative-ai.md) | Technologies | `bubble.tsx / message.tsx` | `mauthor.tsx (AI Chat Suite)` | LLM prompting, streaming, and generation UX | Apple: Apple Intelligence writing tools; Brutalist: dedicated streaming chat scroller and message cards |
| 44 | [`gestures`](../../apple_design/skill/references/hig/gestures.md) | Inputs | `carousel.tsx (swipe)` | `carousel.tsx (touch swipe)` | Direct touch manipulation | Apple: pinch, pan, rotation recognizers; Web: Embla touch drag carousel |
| 45 | [`going-full-screen`](../../apple_design/skill/references/hig/going-full-screen.md) | Patterns | `modal dialogs` | `dashboard-layout.tsx` | Distraction-free immersion | Apple: macOS native fullscreen; Brutalist: full-viewport canvas shaders or shells |
| 46 | [`gyro-and-accelerometer`](../../apple_design/skill/references/hig/gyro-and-accelerometer.md) | Inputs | `motion primitives` | `canvas-effects (orientation)` | Device motion and tilt sensors | Apple: Core Motion; BoldKit: GravityWells and DotWave reacting to motion |
| 47 | [`home-screen-quick-actions`](../../apple_design/skill/references/hig/home-screen-quick-actions.md) | Components | `dropdown-menu.tsx` | `dropdown-menu.tsx` | App icon long-press shortcuts | Apple: SpringBoard popup menu; Brutalist: web action shortcuts |
| 48 | [`icloud`](../../apple_design/skill/references/hig/icloud.md) | Technologies | `local storage / cloud sync` | `cloud storage adapter` | Multi-device state synchronization | Apple: CloudKit automatic sync; Web: IndexedDB with Supabase / Firebase sync |
| 49 | [`icons`](../../apple_design/skill/references/hig/icons.md) | Foundations | `lucide-react icons` | `lucide-react icons` | Symbolic concept representation | Apple: SF Symbols with optical weights; Brutalist: stroke-based Lucide icons with solid backgrounds |
| 50 | [`image-views`](../../apple_design/skill/references/hig/image-views.md) | Components | `image-card.tsx` | `card.tsx` | Image rendering container | Apple: aspect-fit image container; Neobrutalism: image-card with brutalist caption |
| 51 | [`image-wells`](../../apple_design/skill/references/hig/image-wells.md) | Components | `image-card.tsx` | `card.tsx / dropzone.tsx` | Image container with drop target | Apple: native image container; BoldKit: drag-and-drop dropzone |
| 52 | [`images`](../../apple_design/skill/references/hig/images.md) | Foundations | `image-card.tsx` | `card.tsx / halftone shader` | Visual asset presentation | Apple: high-DPI @2x/@3x scale factors; BoldKit: halftone and CRT retro shaders |
| 53 | [`inclusion`](../../apple_design/skill/references/hig/inclusion.md) | Foundations | `internationalization tokens` | `inclusive color tokens` | Accessible communication for all | Apple: gender-neutral copy, cultural adaptation; Brutalist: clear plain language |
| 54 | [`keyboards`](../../apple_design/skill/references/hig/keyboards.md) | Inputs | `kbd.tsx / command.tsx` | `kbd.tsx / command.tsx` | Hardware keyboard interaction | Apple: full keyboard navigation; Brutalist: explicit focus-visible rings and kbd shortcuts |
| 55 | [`labels`](../../apple_design/skill/references/hig/labels.md) | Components | `label.tsx` | `label.tsx` | Accessible text identifying an element | Apple: San Francisco label; Brutalist: bold uppercase tracking font |
| 56 | [`launching`](../../apple_design/skill/references/hig/launching.md) | Patterns | `skeleton.tsx` | `onboarding-flow.tsx` | App cold start experience | Apple: instant launch screen matching first view; BoldKit: onboarding wizard with step tracker |
| 57 | [`layout`](../../apple_design/skill/references/hig/layout.md) | Foundations | `container & grid tokens` | `bento-grid.tsx / dashboard-layout.tsx` | Spatial hierarchy and responsiveness | Apple: 8pt grid with safe area insets; Brutalist: rigid grid with 2px/3px dividing strokes |
| 58 | [`liquid-glass`](../../apple_design/skill/references/hig/liquid-glass.md) | Foundations (Curated) | `none (antipattern in flat brutalism)` | `none / CRT shader alternative` | Translucent glassmorphism with specular border | Apple: Liquid Glass material; Brutalism: explicitly rejects faux glass in favor of tactile solid paper surfaces |
| 59 | [`lists-and-tables`](../../apple_design/skill/references/hig/lists-and-tables.md) | Components | `table.tsx / data-table.md` | `table.tsx / data-table.tsx` | Tabular and listed data presentation | Apple: grouped inset rounded list; Brutalist: high-contrast bordered grid with striped rows |
| 60 | [`live-activities`](../../apple_design/skill/references/hig/live-activities.md) | Components | `marker.tsx / bubble.tsx` | `statcard.tsx / visitors.tsx` | Real-time glanceable updates | Apple: Dynamic Island live state; Brutalist: live visitor badge or marker |
| 61 | [`live-viewing-apps`](../../apple_design/skill/references/hig/live-viewing-apps.md) | Patterns | `message-scroller.tsx` | `canvas-effects (realtime)` | Continuous immersion in streaming media | Apple: camera controls overlay; Brutalist: auto-following streaming chat scroller |
| 62 | [`loading`](../../apple_design/skill/references/hig/loading.md) | Patterns | `spinner.tsx / skeleton.tsx` | `mathcurveloader.tsx / spinner.tsx` | Wait time indication | Apple: skeleton shimmer with minimal spinners; BoldKit: 15 mathematical parametric curve loaders |
| 63 | [`machine-learning`](../../apple_design/skill/references/hig/machine-learning.md) | Technologies | `smart combobox` | `smart command palette` | On-device intelligent suggestions | Apple: Core ML; Brutalist: client-side fast search filtering in cmdk |
| 64 | [`managing-accounts`](../../apple_design/skill/references/hig/managing-accounts.md) | Patterns | `form.md` | `auth-forms.tsx` | Identity, sign-in and profile management | Apple: Sign in with Apple, Face ID; BoldKit: full auth forms with login, OTP, and password reset |
| 65 | [`managing-notifications`](../../apple_design/skill/references/hig/managing-notifications.md) | Patterns | `toast.tsx` | `sonner.tsx` | Timely updates when app is backgrounded | Apple: notification banners; Brutalist: in-app toast stack |
| 66 | [`maps`](../../apple_design/skill/references/hig/maps.md) | Technologies | `map container` | `map container` | Geographic navigation and pins | Apple: MapKit; Web: Leaflet / Mapbox with brutalist high-contrast map tiles |
| 67 | [`materials`](../../apple_design/skill/references/hig/materials.md) | Foundations | `code.css` | `styles/globals.css` | Depth, layering, and surface hierarchy | Apple: translucent blur & vibrancy; Brutalism: opaque flat layers with hard 4px drop shadows |
| 68 | [`menus`](../../apple_design/skill/references/hig/menus.md) | Components | `dropdown-menu.tsx` | `dropdown-menu.tsx` | Vertical list of commands | Apple: rounded blur menu; Brutalist: bordered list with hover fills |
| 69 | [`modality`](../../apple_design/skill/references/hig/modality.md) | Patterns | `dialog.tsx` | `dialog.tsx` | Focused task preventing parent view interaction | Apple: dimmed backdrop + scale transition; Brutalist: high-opacity backdrop + hard shadow box |
| 70 | [`motion`](../../apple_design/skill/references/hig/motion.md) | Foundations | `animate-marquee, animate-orbit` | `motion.css (6 brutalist animations)` | Interface dynamics and transitions | Apple: fluid spring physics; BoldKit: stepped 4-step mechanical easing and stamp impacts |
| 71 | [`multitasking`](../../apple_design/skill/references/hig/multitasking.md) | Patterns | `resizable.tsx` | `dashboard-layout.tsx` | Multi-app concurrent execution | Apple: Stage Manager / Split View; Brutalist: resizable panel groups |
| 72 | [`nfc`](../../apple_design/skill/references/hig/nfc.md) | Technologies | `web nfc API` | `web nfc API` | Near-field radio contact triggers | Apple: Core NFC; Web: Web NFC API or QR code alternative |
| 73 | [`notifications`](../../apple_design/skill/references/hig/notifications.md) | Components | `toast.tsx` | `toast.tsx / sonner.tsx` | System and in-app alerts | Apple: banner alerts with actions; Brutalist: paper-stack toasts or sonner notifications |
| 74 | [`offering-help`](../../apple_design/skill/references/hig/offering-help.md) | Patterns | `tooltip.tsx` | `tooltip.tsx / faq-section.tsx` | Contextual user assistance | Apple: inline info buttons; BoldKit: full FAQ section block with accordions |
| 75 | [`onboarding`](../../apple_design/skill/references/hig/onboarding.md) | Patterns | `questionnaire.tsx` | `onboarding-flow.tsx / tour.tsx` | First-run education and setup | Apple: interactive feature walkthrough; BoldKit: dedicated onboarding flow and product tour |
| 76 | [`outline-views`](../../apple_design/skill/references/hig/outline-views.md) | Components | `accordion.tsx` | `tree-view.tsx` | Hierarchical expandable tree structure | Apple: disclosure triangle outline; BoldKit: tree-view component |
| 77 | [`page-controls`](../../apple_design/skill/references/hig/page-controls.md) | Components | `carousel.tsx (dots)` | `carousel.tsx (dots)` | Dot indicators for horizontal page navigation | Apple: small fading white dots; Brutalist: bordered numbered pills or hard dots |
| 78 | [`panels`](../../apple_design/skill/references/hig/panels.md) | Components | `card.tsx` | `card.tsx / layered-card.tsx` | Content grouping container | Apple: translucent materials; Brutalist: thick 2px/3px bordered cards with offset shadow |
| 79 | [`path-controls`](../../apple_design/skill/references/hig/path-controls.md) | Components | `breadcrumb.tsx` | `breadcrumb.tsx` | Hierarchical path navigation | Apple: clickable breadcrumb trail; Brutalist: uppercase font with slash / arrow dividers |
| 80 | [`pickers`](../../apple_design/skill/references/hig/pickers.md) | Components | `select.tsx` | `select.tsx` | Item selection from a discrete set | Apple: 3D rotating wheel on iOS; Brutalist: dropdown menu list |
| 81 | [`playing-audio`](../../apple_design/skill/references/hig/playing-audio.md) | Patterns | `audio primitives` | `canvas-effects (audio-reactive)` | Acoustic feedback and media playback | Apple: AVPlayer with automatic audio ducking; Brutalist: web audio API integration |
| 82 | [`playing-haptics`](../../apple_design/skill/references/hig/playing-haptics.md) | Patterns | `web vibration API` | `motion.css (visual haptics)` | Tactile physical feedback | Apple: Core Haptics engine; BoldKit: visual stamp-in and recoil physics simulating physical click |
| 83 | [`playing-video`](../../apple_design/skill/references/hig/playing-video.md) | Patterns | `carousel.tsx (video)` | `hero-section.tsx (media frame)` | Video content rendering | Apple: Picture in Picture; BoldKit: brutalist bordered video mockup frame |
| 84 | [`pointing-devices`](../../apple_design/skill/references/hig/pointing-devices.md) | Inputs | `hover-card.tsx` | `hover-card.tsx / bk-interactive` | Mouse cursor and trackpad ergonomics | Apple: iPadOS adaptive cursor; BoldKit: .bk-interactive hover snap translations |
| 85 | [`pop-up-buttons`](../../apple_design/skill/references/hig/pop-up-buttons.md) | Components | `select.tsx` | `select.tsx` | Single-selection trigger menus | Apple: native iOS picker / macOS menu; Brutalist: Radix/Base UI custom popover |
| 86 | [`popovers`](../../apple_design/skill/references/hig/popovers.md) | Components | `popover.tsx` | `popover.tsx` | Transient content anchored to a trigger | Apple: arrow-pointed floating glass bubble; Brutalist: sharp-corner bordered card with shadow-shadow |
| 87 | [`printing`](../../apple_design/skill/references/hig/printing.md) | Patterns | `code.css (@media print)` | `chart-export.ts (PNG/SVG export)` | Hard-copy rendering and export | Apple: AirPrint formatting; BoldKit: one-click PNG/SVG snapshot export with title stamp |
| 88 | [`privacy`](../../apple_design/skill/references/hig/privacy.md) | Foundations | `form description text` | `auth-forms.tsx (consent check)` | Transparent user data handling | Apple: permission prompts and nutrition labels; Brutalist: prominent bordered notice cards |
| 89 | [`progress-indicators`](../../apple_design/skill/references/hig/progress-indicators.md) | Components | `progress.tsx / spinner.tsx` | `progress.tsx / spinner.tsx / math-curve-progress.tsx` | Task progress visualization | Apple: thin blue bar or native circular spinner; Brutalist: thick border bar with hatched or solid fill |
| 90 | [`pull-down-buttons`](../../apple_design/skill/references/hig/pull-down-buttons.md) | Components | `dropdown-menu.tsx` | `dropdown-menu.tsx` | Action menus attached to button triggers | Apple: native popup list; Brutalist: hard-shadow menu items with borders |
| 91 | [`rating-indicators`](../../apple_design/skill/references/hig/rating-indicators.md) | Components | `badge.tsx (composed)` | `rating.tsx` | Star or numeric rating displays | Apple: 5-star display; BoldKit: interactive half-star rating selector |
| 92 | [`ratings-and-reviews`](../../apple_design/skill/references/hig/ratings-and-reviews.md) | Patterns | `badge.tsx` | `testimonials.tsx / rating.tsx` | Customer feedback collection | Apple: SKStoreReviewController; BoldKit: testimonials block with star ratings |
| 93 | [`right-to-left`](../../apple_design/skill/references/hig/right-to-left.md) | Foundations | `direction.tsx (@base-ui)` | `rtl-ready Tailwind utilities` | Bidirectional language layout mirroring | Neobrutalism: dedicated Base UI direction provider; BoldKit: logical Tailwind properties |
| 94 | [`scroll-views`](../../apple_design/skill/references/hig/scroll-views.md) | Components | `scroll-area.tsx` | `scroll-area.tsx` | Scrollable viewport with custom scrollbars | Apple: invisible fading rubber-band scrollbar; Brutalist: prominent thick black scroll thumb |
| 95 | [`search-fields`](../../apple_design/skill/references/hig/search-fields.md) | Components | `input-group.tsx` | `input-group.tsx` | Search input with icon prefix | Apple: centered placeholder with glass background; Brutalist: bordered addon group |
| 96 | [`searching`](../../apple_design/skill/references/hig/searching.md) | Patterns | `command.tsx / combobox.tsx` | `command.tsx / combobox.tsx` | Content discovery across an app | Apple: Spotlight search; Brutalist: fast cmdk command palette with keyboard shortcuts |
| 97 | [`segmented-controls`](../../apple_design/skill/references/hig/segmented-controls.md) | Components | `toggle-group.tsx` | `toggle-group.tsx` | Mutually exclusive discrete options | Apple: sliding pill background; Brutalist: bordered box tabs with hard shadows |
| 98 | [`settings`](../../apple_design/skill/references/hig/settings.md) | Patterns | `tabs.tsx / switch.tsx` | `settings-page.tsx` | Application configuration panels | Apple: iOS Settings grouped lists; BoldKit: full settings page with profile, security, danger zone |
| 99 | [`sf-symbols`](../../apple_design/skill/references/hig/sf-symbols.md) | Foundations | `lucide-react` | `lucide-react` | Systemwide icon typography alignment | Apple: SF Symbols matching San Francisco text; Web: Lucide icons matching font weights |
| 100 | [`sheets`](../../apple_design/skill/references/hig/sheets.md) | Components | `sheet.tsx` | `sheet.tsx` | Partial-modal content presentation | Apple: detent-based card sheet; Brutalist: slide-over panel with hard borders |
| 101 | [`sidebars`](../../apple_design/skill/references/hig/sidebars.md) | Components | `sidebar.tsx` | `sidebar.tsx` | Hierarchical primary navigation | Apple: translucent source list; Brutalist: collapsible bordered navigation column |
| 102 | [`sign-in-with-apple`](../../apple_design/skill/references/hig/sign-in-with-apple.md) | Technologies | `auth button` | `auth-forms.tsx (OAuth)` | Privacy-preserving one-touch sign in | Apple: mandatory for apps offering social logins; BoldKit: OAuth button in auth-forms block |
| 103 | [`siri`](../../apple_design/skill/references/hig/siri.md) | Technologies | `voice search / command` | `command.tsx (omni-search)` | Voice assistant queries and commands | Apple: SiriKit shortcuts; Brutalist: command palette as instant omni-bar |
| 104 | [`sliders`](../../apple_design/skill/references/hig/sliders.md) | Components | `slider.tsx` | `slider.tsx` | Continuous or stepped value adjustment | Apple: thin rounded track; Brutalist: thick track with high-contrast square/circle thumb |
| 105 | [`snippets`](../../apple_design/skill/references/hig/snippets.md) | Components | `card.tsx` | `card.tsx` | Siri result cards | Apple: Siri glanceable card; Brutalist: compact brutalist card |
| 106 | [`split-views`](../../apple_design/skill/references/hig/split-views.md) | Components | `resizable.tsx` | `resizable.tsx` | Multi-column master-detail layout | Apple: fluid pane resizing; Brutalist: react-resizable-panels with brutalist handle |
| 107 | [`status-bars`](../../apple_design/skill/references/hig/status-bars.md) | Components | `badge.tsx` | `badge.tsx` | System indicators at top of screen | Apple: iOS status bar; Brutalist: header status bar |
| 108 | [`steppers`](../../apple_design/skill/references/hig/steppers.md) | Components | `number-field (composed)` | `stepper.tsx / number-field.tsx` | Discrete incremental changes | Apple: +/- joined rounded control; BoldKit: number-field with 3px buttons |
| 109 | [`tab-bars`](../../apple_design/skill/references/hig/tab-bars.md) | Components | `tabs.tsx` | `tabs.tsx` | Primary bottom or top app navigation | Apple: bottom translucent bar with SF Symbols; Brutalist: bordered box tabs with contrast fills |
| 110 | [`tab-views`](../../apple_design/skill/references/hig/tab-views.md) | Components | `tabs.tsx` | `tabs.tsx` | Section switching within views | Apple: segmented tab control; Brutalist: high-contrast bordered tabs |
| 111 | [`text-fields`](../../apple_design/skill/references/hig/text-fields.md) | Components | `input.tsx` | `input.tsx` | Single-line text entry | Apple: subtle rounded pill background; Brutalist: thick 2px/3px black border + hard shadow |
| 112 | [`text-views`](../../apple_design/skill/references/hig/text-views.md) | Components | `textarea.tsx` | `textarea.tsx` | Multi-line text entry | Apple: inset scrollable view; Brutalist: bordered container with hard shadow |
| 113 | [`the-menu-bar`](../../apple_design/skill/references/hig/the-menu-bar.md) | Components | `menubar.tsx` | `menubar.tsx` | Desktop application menu bar | Apple: systemwide top menu bar; Brutalist: in-window brutalist menubar |
| 114 | [`toggles`](../../apple_design/skill/references/hig/toggles.md) | Components | `switch.tsx` | `switch.tsx` | Binary on/off states | Apple: iOS rounded green toggle switch; Brutalist: rectangular thumb with thick stroke |
| 115 | [`token-fields`](../../apple_design/skill/references/hig/token-fields.md) | Components | `badge.tsx (composed)` | `tag-input.tsx` | Multi-token input for tags/recipients | Apple: auto-wrapping token bubbles; BoldKit: dedicated tag-input component |
| 116 | [`toolbars`](../../apple_design/skill/references/hig/toolbars.md) | Components | `button-group.tsx` | `chart-toolbar.tsx / button-group.tsx` | Action controls at top or bottom | Apple: subtle borderless icons in bar; Brutalist: united bordered unit with hard shadow |
| 117 | [`typography`](../../apple_design/skill/references/hig/typography.md) | Foundations | `--base-font-family (DM Sans)` | `font-bold uppercase tracking-wide` | Information hierarchy and text legibility | Apple: San Francisco, Dynamic Type; Brutalism: punchy uppercase headers, monospace numerals |
| 118 | [`undo-and-redo`](../../apple_design/skill/references/hig/undo-and-redo.md) | Patterns | `kbd.tsx (Ctrl+Z)` | `kbd.tsx (Cmd+Z hints)` | Reversible user actions | Apple: shake to undo / 3-finger swipe; Brutalist: explicit kbd shortcut badges with action snackbars |
| 119 | [`virtual-keyboards`](../../apple_design/skill/references/hig/virtual-keyboards.md) | Components | `kbd.tsx` | `kbd.tsx` | Keyboard shortcut visualization / entry | Apple: software touch keyboard; Brutalist: tactile brutalist keycaps |
| 120 | [`voiceover`](../../apple_design/skill/references/hig/voiceover.md) | Inputs | `accessible ARIA roles` | `axe-core tested primitives` | Screen reader assistive navigation | Apple: VoiceOver rotor; Brutalist: semantic HTML with accessible labels and ARIA live regions |
| 121 | [`web-views`](../../apple_design/skill/references/hig/web-views.md) | Components | `card.tsx (composed)` | `card.tsx (composed)` | Embedded web content container | Apple: WKWebView; Brutalist: bordered iframe wrapper |
| 122 | [`widgets`](../../apple_design/skill/references/hig/widgets.md) | Technologies | `card.tsx` | `statcard.tsx / bento-grid.tsx` | Glanceable home screen widgets | Apple: rounded widget families (small, medium, large); BoldKit: statcard and bento cells |
| 123 | [`windows`](../../apple_design/skill/references/hig/windows.md) | Components | `resizable.tsx` | `dashboard-layout.tsx` | Desktop application surfaces | Apple: titlebar with traffic light buttons; Brutalist: retro title bar with monospace headers |
| 124 | [`writing`](../../apple_design/skill/references/hig/writing.md) | Foundations | `clear UI copy` | `clear microcopy in blocks` | Clarity and tone of interface text | Apple: concise, friendly, active voice; Brutalism: direct, unvarnished, no-fluff instructions |

---

## Top 40 Critical Topics Executive Deep Dive

For rapid lookup, here is the synthesis of the 40 most impactful UX touchpoints across Apple HIG and Brutalism:

### `buttons.md` — Buttons & Call to Action
> Apple uses rounded tinted pills with fluid spring clicks; Neobrutalism uses 2px borders with pastel fills; BoldKit uses 3px borders with hard 4px shadows and 6 brutalist CSS animations (pulse, shake, pop).

### `modality.md` — Modality & Overlays
> Apple prioritizes non-modal sheets with detents; Brutalism uses high-contrast dialogs with opaque backdrops and sharp hard-shadow boxes.

### `materials.md` — Materials & Translucency
> Apple relies on blur, vibrancy, and Liquid Glass for hierarchy; Brutalism strictly rejects fake translucency in favor of solid opaque paper layers and hard borders.

### `accessibility.md` — Accessibility & Sizing
> Apple enforces 44x44pt touch targets and Dynamic Type; BoldKit buttons default to 44px (h-11), directly satisfying Apple HIG, while high-contrast black strokes guarantee maximum 21:1 WCAG contrast.

### `color.md` — Color Strategy
> Apple uses subtle system tint accents; Neobrutalism uses editorial pastel fills; BoldKit uses high-energy Neon (pink, green, blue) and Clash palettes.

### `typography.md` — Typography & Scale
> Apple uses SF Pro with 11 Dynamic Type scales; Brutalism emphasizes bold uppercase headers, heavy letter spacing, and monospace data numerals.

### `entering-data.md` — Data Entry Ergonomics
> Apple focuses on inline validation and system keyboards; Brutalism uses thick-bordered grouped inputs (`input-group`) with explicit floating labels.

### `tab-bars.md` — Primary Navigation
> Apple uses bottom translucent tab bars on iOS; Brutalism uses bordered rectangular tabs with hard shadows and active button states.

### `sidebars.md` — Desktop / Tablet Sidebars
> Apple uses translucent source lists; BoldKit provides a collapsible 3px bordered sidebar and complete application dashboard shell.

### `charts.md` — Charts & Visualizations
> Apple Charts framework focuses on clean, decluttered data lines; BoldKit provides 14 Recharts variations with brutalist toolbars, color zones, and PNG/SVG export.

### `motion.md` — Motion & Transitions
> Apple uses fluid organic spring physics; BoldKit provides stepped 4-step mechanical easing and hard stamp impacts (`motion.css`).

### `onboarding.md` — First-Run Experience
> Apple recommends lightweight permission requests; BoldKit provides a complete 6-step onboarding wizard block (`onboarding-flow.tsx`).

### `settings.md` — Settings & Preferences
> Apple uses grouped inset table cells; BoldKit provides a full multi-section settings page block with profile, security, and danger zone.

### `managing-accounts.md` — Authentication
> Apple enforces Sign in with Apple; BoldKit provides ready-to-use authentication blocks with login, signup, and OTP inputs.

### `apple-pay.md` — Payment & E-Commerce
> Apple strictly forbids modifying the Apple Pay button; Brutalism must keep the official Apple Pay mark while styling surrounding checkout cards in brutalism.

### `generative-ai.md` — AI & Conversations
> Apple emphasizes native writing tools; Neobrutalism provides 5 modular chat primitives (`bubble`, `message`, `marker`), and BoldKit bundles `m.author`.

### `split-views.md` — Multi-Pane Layouts
> Apple uses SplitViewController; both Neobrutalism and BoldKit implement `resizable.tsx` using `react-resizable-panels`.

### `notifications.md` — In-App Alerts & Toasts
> Apple uses banner alerts; BoldKit provides `sonner.tsx` and retro paper-stack toasts with stacked offset depth.

### `progress-indicators.md` — Progress Indication
> Apple uses thin blue bars or native circular spinners; BoldKit features 15 mathematical parametric curve loaders (`mathcurveloader.tsx`).

### `gauges.md` — Gauges & Meters
> Apple uses watchOS-style radial gauges; BoldKit provides a dedicated `gaugechart.tsx` speedometer with animated needles and threshold zones.

### `lists-and-tables.md` — Tables & Data Grids
> Apple uses inset grouped tables; both systems implement TanStack Table with brutalist borders and sorting controls.

### `searching.md` — Search & Discovery
> Apple uses Spotlight and search fields; both brutalist systems implement keyboard-driven command palettes (`cmdk`).

### `steppers.md` — Steppers & Form Wizards
> Apple uses +/- segment controls; BoldKit provides multi-step form state management and numbered stepper badges.

### `sliders.md` — Continuous Range Inputs
> Apple uses thin pill tracks; both brutalist systems provide high-contrast sliders with visible value tooltips.

### `toggles.md` — Switches & Toggles
> Apple uses iOS green rounded switches; both brutalist systems feature rectangular high-contrast toggles with thick borders.

### `dark-mode.md` — Dark Appearance
> Apple uses deep black backgrounds with vibrancy; Brutalism inverts strokes from black to white while maintaining hard shadows.

### `status-bars.md` — Glanceable Status
> Apple uses the top system status bar; Brutalism uses high-contrast badges and live visitor chips.

### `widgets.md` — Glanceable Cards
> Apple uses widget families; BoldKit provides stat cards (`statcard.tsx`) and asymmetric bento grid cells.

### `context-menus.md` — Contextual Menus
> Apple uses blurred preview cards; Brutalism uses bordered context menus with hard offset shadows.

### `popovers.md` — Transient Popovers
> Apple uses pointed translucent bubbles; Brutalism uses rectangular bordered cards with zero blur.

### `dialogs.md` — Dialog Confirmations
> Apple uses centered rounded alerts; Brutalism uses thick-bordered confirmation boxes with hard shadows.

### `action-sheets.md` — Bottom Slide Sheets
> Apple uses rounded sheets anchored to screen edge; both brutalist systems provide slide-over drawers using Vaul/Radix.

### `scroll-views.md` — Scroll Containers
> Apple uses invisible fading scrollbars; Brutalism uses thick black scrollbars that celebrate the mechanical scroll mechanism.

### `keyboards.md` — Keyboard Navigation
> Apple requires full keyboard access; Brutalism pairs full focus-visible black rings with `kbd.tsx` keycap badges.

### `gestures.md` — Touch Interactions
> Apple uses native multi-touch gestures; both brutalist systems use Embla Carousel for smooth touch swipe and drag.

### `branding.md` — Brand Identity
> Apple advocates brand deference; Brutalism celebrates high-energy branding with stickers, stamps, and tape effects.

### `liquid-glass.md` — Liquid Glass Specification
> Apple’s flagship glassmorphism material; brutalism explicitly avoids faux glass, using raw tactile solid surfaces instead.

### `cross-platform.md` — Cross-Platform Translation
> Bridging Apple concepts to Flutter, React Native, Tauri, Electron, and Next.js / Tailwind.

### `code-audit.md` — HIG Code Audit Rules
> Automated rules for detecting touch target violations, hand-drawn Apple Pay buttons, and contrast failures.

### `design-principles.md` — The 8 Foundational Principles
> Apple’s Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, and Delight compared directly against brutalist engineering.

---

## Navigation to Modular Parts

Explore the detailed analyses, macro-thematic block comparisons, and individual tripartite cards in the sub-documents:

1. **[Part 1: Getting Started & Foundations (22 items)](01-getting-started-and-foundations.md)** — Apple 8 Principles, Liquid Glass, Typography, Color, Motion, Accessibility.
2. **[Part 2: Patterns & Workflows (24 items)](02-patterns-and-workflows.md)** — Modality, Data Entry, Onboarding, Settings, Accounts, Collaboration, etc.
3. **[Part 3: Complete 57 Components Matrix](03-components-complete-matrix.md)** — All 57 UI component guidelines mapped 1:1 against Neobrutalism & BoldKit.
4. **[Part 4: Inputs & Technologies (20 items)](04-inputs-and-technologies.md)** — Keyboards, Gestures, Apple Pencil, Apple Pay, In-App Purchase, GenAI, Live Activities, Siri.
5. **[Part 5: Cross-Platform Translations & HIG Code Audit](05-cross-platform-and-audit.md)** — Flutter, React Native, Tauri, Electron translation & App Store rejection traps.
6. **[Part 6: Apple-Compliant Brutalism Synthesis & Decision Guide](06-skill-synthesis-and-decision-guide.md)** — Decision trees, token harmonization, and hybrid engineering.