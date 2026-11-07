# Part 2: Patterns & Workflows Correlation Matrix (24 Items)

This document provides an exhaustive, 3-layer architectural correlation crossing **Apple's 24 Application Pattern guidelines** with **Neobrutalism.com** and **BoldKit.dev**.

---

## Layer 2: Macro-Thematic Group Analysis

### 1. Workflow Architecture: System Delegation vs Self-Contained Blocks
A core structural difference between Apple platforms and Web Brutalism lies in **workflow delegation**:
- **Apple Design**: Strongly encourages delegating high-stakes workflows (Authentication, Payments, File Selection, Share Sheets, In-App Purchases) to **system-managed controllers** (`Sign in with Apple`, `PKPaymentAuthorizationController`, `UIDocumentPickerViewController`, `UIActivityViewController`). Apps must strictly adhere to system presentation rules.
- **Neobrutalism & BoldKit**: Supply **complete, self-contained layout blocks** (`auth-forms.tsx`, `settings-page.tsx`, `onboarding-flow.tsx`, `invoice.tsx`). The application owns the entire UI lifecycle, skinning every input, button, and status indicator with thick 3px borders and hard offset shadows.

### 2. Modality & Progressive Disclosure: Detents vs Hard Dialogs
- **Apple Modality**: Promotes non-modal sheets with detents (medium, large) that let users interact with background views while browsing secondary content. Alerts are reserved strictly for critical confirmations.
- **Web Brutalism**: Employs high-contrast, centered modal `<Dialog>` containers with opaque dark backdrops (`bg-overlay`) and hard drop shadows (`shadow-[6px_6px_0px_#000]`). For non-modal flows, it uses persistent bordered `<Card>` and `<Accordion>` components.

---

## Layer 3: 24 Individual Tripartite Technical Cards

### 2.1 `charting-data.md` — Charting Data
> **Apple Guideline Summary**: Presenting data in a chart can help you communicate information with clarity and appeal.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/charting-data.md`](../../apple_design/skill/references/hig/charting-data.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/chart.tsx` |
| **BoldKit File(s)** | `boldkit/ui/chart/* (14 specialized charts), chart-toolbar.tsx` |
| **Common Ground** | Presenting numerical trends, distributions, and comparisons with clarity and accessible color palettes. |
| **Particularities & Divergences** | Apple Charts uses uncluttered minimal axes and native VoiceOver chart audio graphs; BoldKit features high-contrast brutalist borders, threshold bands, custom toolbars, and instant PNG/SVG export. |

**Web / React Implementation Recipe**:
- Compose `<ChartContainer>` with `<ChartToolbar>` and Recharts primitives (`<BarChart>`, `<LineChart>`) styled with `border-3 border-foreground`.

---

### 2.2 `collaboration-and-sharing.md` — Collaboration And Sharing
> **Apple Guideline Summary**: Great collaboration and sharing experiences are simple and responsive, letting people engage with the content while communicating effectively with others.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/collaboration-and-sharing.md`](../../apple_design/skill/references/hig/collaboration-and-sharing.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/message.tsx, avatar.tsx` |
| **BoldKit File(s)** | `boldkit/blocks-code/marketing/team-section.tsx, testimonials.tsx` |
| **Common Ground** | Multi-user avatar presentation, shared content attribution, and social sharing flows. |
| **Particularities & Divergences** | Apple utilizes native CloudKit share sheets and presence bubbles; Brutalism uses thick-bordered avatar clusters (`border-2 border-black rounded-full`) and social card grids. |

**Web / React Implementation Recipe**:
- Render overlapping avatar stacks with high-contrast outlines: `<div className="flex -space-x-2 [&>*]:border-2 [&>*]:border-black" />`.

---

### 2.3 `drag-and-drop.md` — Drag And Drop
> **Apple Guideline Summary**: Using drag and drop, people can move or duplicate selected photos, text, and other content by dragging the selection from one location to another.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/drag-and-drop.md`](../../apple_design/skill/references/hig/drag-and-drop.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/data-table.md` |
| **BoldKit File(s)** | `boldkit/ui/dropzone.tsx` |
| **Common Ground** | Direct physical manipulation for file upload, ordering, and data transfer. |
| **Particularities & Divergences** | Apple provides spring-loaded dragging with fluid lift animations; BoldKit provides a dedicated brutalist `<Dropzone>` with dashed border highlights and upload progress bars. |

**Web / React Implementation Recipe**:
- Implement HTML5 drag events wrapped in `<div className="border-3 border-dashed border-foreground p-8 bg-muted hover:bg-secondary">`.

---

### 2.4 `entering-data.md` — Entering Data
> **Apple Guideline Summary**: When you need information from people, design ways that make it easy for them to provide it without making mistakes.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/entering-data.md`](../../apple_design/skill/references/hig/entering-data.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/field.tsx, form.md` |
| **BoldKit File(s)** | `boldkit/ui/field.tsx, multi-step-form.tsx, input-group.tsx` |
| **Common Ground** | Guiding user input, preventing errors, and providing immediate inline validation feedback. |
| **Particularities & Divergences** | Apple utilizes subtle inline helper text and system keyboards; Brutalism wraps controls in explicit `<Field>` containers with uppercase bold labels and red-bordered error cards. |

**Web / React Implementation Recipe**:
- Combine React Hook Form + Zod with `<Field error={errors.name?.message}>` and brutalist `<Input>`.

---

### 2.5 `feedback.md` — Feedback
> **Apple Guideline Summary**: Feedback helps people know what’s happening, discover what they can do next, understand the results of actions, and avoid mistakes.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/feedback.md`](../../apple_design/skill/references/hig/feedback.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/alert.tsx, toast.tsx` |
| **BoldKit File(s)** | `boldkit/ui/alert.tsx, sonner.tsx, toast.tsx` |
| **Common Ground** | Acknowledging user actions and communicating background task outcomes. |
| **Particularities & Divergences** | Apple relies on subtle haptic taps and banner alerts; Brutalism displays high-contrast alert callouts with 3px solid borders and hard offset shadows. |

**Web / React Implementation Recipe**:
- Trigger notifications using Sonner with brutalist styling: `toast.success("Saved!", { className: "border-3 border-black shadow-hard" })`.

---

### 2.6 `file-management.md` — File Management
> **Apple Guideline Summary**: Some apps can support documents and files that people expect to manage throughout the system.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/file-management.md`](../../apple_design/skill/references/hig/file-management.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/attachment.tsx` |
| **BoldKit File(s)** | `boldkit/ui/dropzone.tsx, blocks-code/application/invoice.tsx` |
| **Common Ground** | Organizing, displaying, and managing uploaded documents and files. |
| **Particularities & Divergences** | Apple integrates the native Files app UIDocumentPicker; Neobrutalism provides dedicated `<Attachment>` cards displaying file size, mime-type badges, and download triggers. |

**Web / React Implementation Recipe**:
- Use `<Attachment fileName="report.pdf" fileSize="2.4MB" onDownload={...} />` with hard shadow styling.

---

### 2.7 `going-full-screen.md` — Going Full Screen
> **Apple Guideline Summary**: iPhone, iPad, and Mac offer full-screen modes that let people expand a window to fill the screen, hiding system controls and providing a distraction-free environment.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/going-full-screen.md`](../../apple_design/skill/references/hig/going-full-screen.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/dialog.tsx` |
| **BoldKit File(s)** | `boldkit/blocks-code/application/dashboard-layout.tsx` |
| **Common Ground** | Maximizing viewport utilization and eliminating interface distractions. |
| **Particularities & Divergences** | Apple triggers macOS native fullscreen spaces; Web Brutalism utilizes full-viewport dashboard shells with collapsible sidebars. |

**Web / React Implementation Recipe**:
- Use `h-screen w-screen overflow-hidden flex flex-col` for distraction-free brutalist application shells.

---

### 2.8 `launching.md` — Launching
> **Apple Guideline Summary**: A streamlined launch experience helps people start using your app or game immediately.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/launching.md`](../../apple_design/skill/references/hig/launching.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/skeleton.tsx` |
| **BoldKit File(s)** | `boldkit/blocks-code/application/onboarding-flow.tsx` |
| **Common Ground** | Minimizing perceived launch latency and welcoming the user to the app. |
| **Particularities & Divergences** | Apple requires launch screens that mimic the initial UI structure; Brutalism pairs high-contrast skeleton loaders with an immediate onboarding wizard. |

**Web / React Implementation Recipe**:
- Render `<Skeleton className="h-12 w-full border-2 border-black bg-muted animate-pulse" />` while data hydrates.

---

### 2.9 `live-viewing-apps.md` — Live Viewing Apps
> **Apple Guideline Summary**: As you design a live-viewing app, prioritize the content and create fun, fluid interactions that encourage immersion in the live-viewing experience.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/live-viewing-apps.md`](../../apple_design/skill/references/hig/live-viewing-apps.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/message-scroller.tsx` |
| **BoldKit File(s)** | `boldkit/canvas-effects/ (realtime shaders)` |
| **Common Ground** | Managing continuous real-time data streams and video / audio feeds. |
| **Particularities & Divergences** | Apple uses Dynamic Island and live activity widgets; Neobrutalism provides `<MessageScroller>` with ResizeObserver auto-following for streaming tokens. |

**Web / React Implementation Recipe**:
- Wrap streaming LLM output in `<MessageScroller threshold={80}>` to keep the log pinned to the bottom during generation.

---

### 2.10 `loading.md` — Loading
> **Apple Guideline Summary**: The best content-loading experience finishes before people become aware of it.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/loading.md`](../../apple_design/skill/references/hig/loading.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/spinner.tsx, skeleton.tsx` |
| **BoldKit File(s)** | `boldkit/ui/mathcurveloader.tsx, spinner.tsx` |
| **Common Ground** | Communicating background activity and progress during wait times. |
| **Particularities & Divergences** | Apple prefers subtle circular progress rings and skeleton shimmers; BoldKit provides 15 mathematical parametric curve loaders (Lissajous, Rose, Astroid). |

**Web / React Implementation Recipe**:
- Embed `<MathCurveLoader variant="rose" className="size-16" />` for an eye-catching retro loading state.

---

### 2.11 `managing-accounts.md` — Managing Accounts
> **Apple Guideline Summary**: When it doesn’t create an unnecessary barrier to your experience, an account can be a convenient way for people to access their content and track personal details.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/managing-accounts.md`](../../apple_design/skill/references/hig/managing-accounts.md) |
| **Neobrutalism File(s)** | `neobrutalism/components/form.md` |
| **BoldKit File(s)** | `boldkit/blocks-code/application/auth-forms.tsx` |
| **Common Ground** | User onboarding, sign-in, credential management, and profile editing. |
| **Particularities & Divergences** | Apple enforces Sign in with Apple and Face ID; BoldKit provides complete pre-built `<AuthForms>` with tabs for login, registration, and OTP verification. |

**Web / React Implementation Recipe**:
- Deploy BoldKit's `auth-forms.tsx` block directly in your Next.js auth routes.

---

### 2.12 `managing-notifications.md` — Managing Notifications
> **Apple Guideline Summary**: Notifications can give people timely and important information, whether the device is locked or in use.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/managing-notifications.md`](../../apple_design/skill/references/hig/managing-notifications.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/toast.tsx` |
| **BoldKit File(s)** | `boldkit/ui/sonner.tsx, toast.tsx` |
| **Common Ground** | Delivering timely information when users are engaged elsewhere in the app. |
| **Particularities & Divergences** | Apple uses push notification alerts; Web applications utilize stacked in-app toasts powered by Sonner or retro brutalist paper stacks. |

**Web / React Implementation Recipe**:
- Mount `<Toaster position="bottom-right" toastOptions={{ className: "border-3 border-black shadow-hard" }} />` at application root.

---

### 2.13 `modality.md` — Modality
> **Apple Guideline Summary**: Modality is a design technique that presents content in a separate, dedicated mode that prevents interaction with the parent view and requires an explicit action to dismiss.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/modality.md`](../../apple_design/skill/references/hig/modality.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/dialog.tsx, sheet.tsx` |
| **BoldKit File(s)** | `boldkit/ui/dialog.tsx, sheet.tsx` |
| **Common Ground** | Focusing user attention on a critical subtask requiring explicit dismissal. |
| **Particularities & Divergences** | Apple favors non-modal bottom sheets on iOS and modal sheets on macOS; Brutalism renders hard-bordered centered dialogs with dark backdrops. |

**Web / React Implementation Recipe**:
- Use Radix `<DialogContent className="border-3 border-foreground shadow-[6px_6px_0px_#000] bg-background">`.

---

### 2.14 `multitasking.md` — Multitasking
> **Apple Guideline Summary**: Multitasking lets people switch quickly from one app to another, performing tasks in each.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/multitasking.md`](../../apple_design/skill/references/hig/multitasking.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/resizable.tsx` |
| **BoldKit File(s)** | `boldkit/ui/resizable.tsx, dashboard-layout.tsx` |
| **Common Ground** | Enabling concurrent viewing and editing across multiple documents or views. |
| **Particularities & Divergences** | Apple manages multitasking via Split View and Stage Manager; Brutalism implements flexible multi-panel layouts via `react-resizable-panels`. |

**Web / React Implementation Recipe**:
- Implement `<ResizablePanelGroup direction="horizontal">` with thick draggable gutter handles.

---

### 2.15 `offering-help.md` — Offering Help
> **Apple Guideline Summary**: Although the most effective experiences are approachable and intuitive, you can provide contextual help when necessary.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/offering-help.md`](../../apple_design/skill/references/hig/offering-help.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/tooltip.tsx, hover-card.tsx` |
| **BoldKit File(s)** | `boldkit/ui/tooltip.tsx, blocks-code/marketing/faq-section.tsx` |
| **Common Ground** | Providing contextual assistance without cluttering primary workflows. |
| **Particularities & Divergences** | Apple uses info icons and onboarding tooltips; BoldKit combines micro `<Tooltip>` controls with a full pre-built `<FAQSection>` block. |

**Web / React Implementation Recipe**:
- Wrap auxiliary hints in `<Tooltip><TooltipTrigger>...</TooltipTrigger><TooltipContent className="border-2 border-black shadow-hard">...</TooltipContent></Tooltip>`.

---

### 2.16 `onboarding.md` — Onboarding
> **Apple Guideline Summary**: Onboarding can help people get a quick start using your app or game.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/onboarding.md`](../../apple_design/skill/references/hig/onboarding.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/questionnaire.tsx` |
| **BoldKit File(s)** | `boldkit/blocks-code/application/onboarding-flow.tsx, ui/tour.tsx, stepper.tsx` |
| **Common Ground** | Guiding new users through initial account setup, permissions, and feature discovery. |
| **Particularities & Divergences** | Apple encourages brief, zero-friction initial setups; BoldKit provides a full 6-step onboarding wizard block (`onboarding-flow.tsx`) and an interactive `<Tour>` spotlight guide. |

**Web / React Implementation Recipe**:
- Render `<OnboardingFlow onComplete={handleFinish} />` with step indicators and goal-selection cards.

---

### 2.17 `playing-audio.md` — Playing Audio
> **Apple Guideline Summary**: People expect rich audio experiences that automatically adjust when the context changes on the device.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/playing-audio.md`](../../apple_design/skill/references/hig/playing-audio.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/ (audio player wrappers)` |
| **BoldKit File(s)** | `boldkit/canvas-effects/ (audio reactive shaders)` |
| **Common Ground** | Managing media playback, volume balance, and background acoustic states. |
| **Particularities & Divergences** | Apple integrates AVPlayer with automatic audio ducking; Web Brutalism connects the Web Audio API with reactive canvas shaders (Plasma, DotBlob). |

**Web / React Implementation Recipe**:
- Bind Web Audio analyser frequency data to Canvas effect uniforms for interactive music visualizations.

---

### 2.18 `playing-haptics.md` — Playing Haptics
> **Apple Guideline Summary**: Playing haptics can engage people’s sense of touch and bring their familiarity with the physical world into your app or game.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/playing-haptics.md`](../../apple_design/skill/references/hig/playing-haptics.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/button.tsx (press physics)` |
| **BoldKit File(s)** | `boldkit/styles/motion.css (visual haptic stamps)` |
| **Common Ground** | Engaging the user's physical sense of touch for tactile confirmation. |
| **Particularities & Divergences** | Apple utilizes the hardware Taptic Engine; BoldKit emulates tactile feedback on web using instant CSS recoil animations (`--bk-dur-instant: 80ms`) and stamp impact keyframes. |

**Web / React Implementation Recipe**:
- Add `.bk-interactive` to buttons to trigger a 2px snap into shadow on click.

---

### 2.19 `playing-video.md` — Playing Video
> **Apple Guideline Summary**: People expect to enjoy rich video experiences on their devices, regardless of the app or game they’re using.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/playing-video.md`](../../apple_design/skill/references/hig/playing-video.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/carousel.tsx` |
| **BoldKit File(s)** | `boldkit/blocks-code/marketing/hero-section.tsx` |
| **Common Ground** | Presenting rich video playback with responsive aspect ratios and playback controls. |
| **Particularities & Divergences** | Apple supports Picture-in-Picture and full-screen video; BoldKit embeds video players inside high-contrast mockup window frames with 3px solid borders. |

**Web / React Implementation Recipe**:
- Wrap video in `<div className="aspect-video border-3 border-black shadow-hard"><video controls ... /></div>`.

---

### 2.20 `printing.md` — Printing
> **Apple Guideline Summary**: An iOS, iPadOS, macOS, or visionOS app can integrate system-provided print functionality when it makes sense, presenting custom printer- and document-specific options if necessary.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/printing.md`](../../apple_design/skill/references/hig/printing.md) |
| **Neobrutalism File(s)** | `neobrutalism/styling/code.css (@media print)` |
| **BoldKit File(s)** | `boldkit/lib/chart-export.ts (PNG/SVG export)` |
| **Common Ground** | Exporting and formatting hard-copy documents and snapshots. |
| **Particularities & Divergences** | Apple uses AirPrint with automatic layout reformatting; BoldKit provides one-click client-side PNG/SVG chart export with custom titles and brutalist stamps. |

**Web / React Implementation Recipe**:
- Call `exportChartAsPng(chartRef, "Sales-2026")` to download print-ready brutalist data graphics.

---

### 2.21 `ratings-and-reviews.md` — Ratings And Reviews
> **Apple Guideline Summary**: People often view the ratings and reviews for an app or game before they download it.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/ratings-and-reviews.md`](../../apple_design/skill/references/hig/ratings-and-reviews.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/badge.tsx` |
| **BoldKit File(s)** | `boldkit/ui/rating.tsx, blocks-code/marketing/testimonials.tsx` |
| **Common Ground** | Gathering user satisfaction feedback and displaying social proof. |
| **Particularities & Divergences** | Apple triggers system SKStoreReviewController dialogs; BoldKit provides an interactive `<Rating>` component (stars, hearts) and a complete `<Testimonials>` section block. |

**Web / React Implementation Recipe**:
- Use `<Rating value={rating} onChange={setRating} max={5} />` with custom brutalist star icons.

---

### 2.22 `searching.md` — Searching
> **Apple Guideline Summary**: People use various search techniques to find content on their device, within an app, and within a document or file.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/searching.md`](../../apple_design/skill/references/hig/searching.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/command.tsx, combobox.tsx` |
| **BoldKit File(s)** | `boldkit/ui/command.tsx, combobox.tsx` |
| **Common Ground** | Rapid content discovery and command execution across the application. |
| **Particularities & Divergences** | Apple uses Spotlight and search bars; both brutalist systems implement keyboard-driven command menus via `cmdk` with instant filtering and shortcut badges. |

**Web / React Implementation Recipe**:
- Press `Cmd+K` to open `<CommandDialog className="border-3 border-black shadow-hard">`.

---

### 2.23 `settings.md` — Settings
> **Apple Guideline Summary**: People expect apps and games to just work, but they also appreciate having ways to customize the experience to fit their needs.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/settings.md`](../../apple_design/skill/references/hig/settings.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/tabs.tsx, switch.tsx` |
| **BoldKit File(s)** | `boldkit/blocks-code/application/settings-page.tsx` |
| **Common Ground** | User preference configuration, security controls, and account management. |
| **Particularities & Divergences** | Apple uses grouped inset table cells in iOS Settings; BoldKit provides a comprehensive multi-section `<SettingsPage>` block with profile, notifications, appearance, and danger zones. |

**Web / React Implementation Recipe**:
- Deploy BoldKit's `settings-page.tsx` block to instantly stand up a complete settings area.

---

### 2.24 `undo-and-redo.md` — Undo And Redo
> **Apple Guideline Summary**: Undo and redo gives people easy ways to reverse many types of actions, which can also help people explore and experiment safely as they learn a new interface or task.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/undo-and-redo.md`](../../apple_design/skill/references/hig/undo-and-redo.md) |
| **Neobrutalism File(s)** | `neobrutalism/ui/kbd.tsx` |
| **BoldKit File(s)** | `boldkit/ui/kbd.tsx, toast.tsx (undo action)` |
| **Common Ground** | Allowing users to reverse accidental actions safely. |
| **Particularities & Divergences** | Apple uses "Shake to Undo" on iOS and Cmd+Z on macOS; Web Brutalism pairs `<Kbd>Ctrl+Z</Kbd>` keycap indicators with toast notification action buttons ("UNDO"). |

**Web / React Implementation Recipe**:
- Show an action toast: `toast("Item deleted", { action: { label: "UNDO", onClick: restoreItem } })`.

---
