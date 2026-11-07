# Part 5: Cross-Platform Translations & HIG Code Audit Rules

This document bridges the Apple Human Interface Guidelines with cross-platform frameworks (**Flutter**, **React Native**, **Tauri**, **Electron**, and **Next.js / Web**) and provides an exhaustive **App Store Review & HIG Code Audit Checklist**.

---

## 1. Cross-Platform Architectural Translation Dictionary

When building across platforms or translating Apple HIG requirements to Web and hybrid stacks, use this authoritative vocabulary mapping:

| Apple HIG Concept | Flutter Term | React Native Term | Tauri / Electron Term | Next.js / Tailwind CSS Equivalent | Design & Functional Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tab bar** | `BottomNavigationBar` / `NavigationBar` | `createBottomTabNavigator` | App navigation tabs | `<Tabs>` or bottom fixed navigation bar | Primary app section switching, always visible |
| **Sidebar / Split View** | `NavigationRail` + detail | Drawer / Split navigator | Sidebar + content pane | `sidebar.tsx` + `resizable.tsx` | 2- or 3-column hierarchical navigation |
| **Toolbar / Nav Bar** | `AppBar` | Header / NavigationBar | Top window toolbar | `header` + `button-group.tsx` | Contextual actions and title of current view |
| **Sheet / Popover** | `showModalBottomSheet` | ActionSheetIOS / Modal | Dialog / Floating panel | `sheet.tsx` / `drawer.tsx` / `popover.tsx` | Temporary, focused subtask presentation |
| **Liquid Glass / Materials** | `BackdropFilter(ImageFilter.blur)` | `@react-native-community/blur` | CSS `backdrop-filter: blur(...)` | `backdrop-blur-md` (or brutalist solid card) | Translucent layering separating surface levels |
| **Dynamic Type** | `MediaQuery.textScalerOf` | `PixelRatio.getFontScale()` | CSS font-size rem / zoom | Tailwind responsive typography (`text-base`, `text-lg`) | Accessible user-controlled text scaling |
| **SF Symbols** | `CupertinoIcons` / `Icons` | `@expo/vector-icons` | SVG Icon set | `lucide-react` icons (`stroke-[2.5px]`) | Consistent, weight-matched vector symbols |
| **VoiceOver** | `Semantics` / `Tooltip` | `accessibilityLabel`, `accessibilityRole` | HTML ARIA attributes | Semantic HTML + Radix accessible primitives | Screen reader assistive technology support |
| **Safe Area Insets** | `SafeArea` | `SafeAreaView` / `useSafeAreaInsets` | Window chrome margins | `pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]` | Guaranteeing content is never obscured by notches or home bars |
| **Size Classes (Compact/Regular)** | `LayoutBuilder` / `MediaQuery.sizeOf` | `useWindowDimensions()` | CSS Media / Container Queries | Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`) | Adapting UI based on available spatial dimensions |
| **Menu Bar / Dock Menu** | — | — | `Menu`, `Tray` | `menubar.tsx` / `context-menu.tsx` | Full command reachability via keyboard/pointer |
| **Apple Pay Button** | `pay` package (`ApplePayButton`) | `@stripe/stripe-react-native` | Apple Pay JS SDK | `<apple-pay-button>` via Apple Pay JS | Official, unmodified one-touch checkout trigger |

---

## 2. HIG Code Audit & App Store Rejection Checklist

When reviewing source code or preparing an application for Apple App Store review, run this automated inspection checklist:

### 2.1 Apple Pay Branding & Button Violations (App Store Guideline 4.9)
> [!CAUTION]
> Rejections under Guideline 4.9 are **blocking critical release failures**. Apple strictly forbids redrawing, recoloring, or customizing the Apple Pay button.

- **Check 1: Never draw custom Apple Pay buttons**:
  - *Forbidden*: `<button className="bg-black text-white">Apple Pay</button>` or hand-drawn Apple logo SVGs next to "Pay".
  - *Required*: Use Apple's official `<apple-pay-button>` Web Component, `-webkit-appearance: -apple-pay-button`, or native SDK platform buttons (`PayWithApplePayButton`, `PKPaymentButton`).
- **Check 2: Prohibited Alterations to the Apple Pay Mark**:
  - *Forbidden*: Applying `box-shadow`, `border-radius`, `filter`, `transform`, `aspect-ratio`, or hover animations to the Apple Pay logo.
  - *Required*: Only `height` may be adjusted (must be at least equal to other payment options). Maintain a clear safety margin of 10% of the mark's height around it.
- **Check 3: Naming & Capitalization**:
  - *Forbidden*: "ApplePay", "Apple pay", "APPLE PAY", or translated marks ("أبل باي").
  - *Required*: Exactly two words: **"Apple Pay"** with capital A and capital P.
- **Check 4: Never Disable or Hide Conditionally**:
  - *Forbidden*: Disabling the Apple Pay button or graying it out because an option (e.g. size/color) hasn't been selected yet.
  - *Required*: Keep the button active; explain missing options in a dialog after the tap.

---

### 2.2 Touch Target Sizing Violations (Guideline 2.5.5)
> [!IMPORTANT]
> Apple HIG mandates a **strict minimum touch target of 44x44 points** on iOS and iPadOS (28x28pt on macOS).

- **Neobrutalism Warning**: Default Neobrutalism buttons use `h-10 px-4` (40px height), which falls 4px short of Apple's minimum threshold on mobile devices.
  - *Fix*: Override mobile buttons to `h-11` (44px) or use `size="lg"` for touch screens.
- **BoldKit Compliance**: BoldKit buttons default to `h-11 px-5` (44px height), **satisfying Apple HIG touch requirements out of the box**.
- **Inspection Rule**:
  ```bash
  # Search for undersized interactive elements
  grep -rnE "size-[0-8]|h-[6-9]\b|h-10\b" components/ui/
  ```

---

### 2.3 Safe Area & System Gesture Collision (Guideline 4.0)
- **Home Bar & Dynamic Island Inset**:
  - *Forbidden*: Fixed bottom footers without safe-area padding that cause buttons to overlap the iOS Home indicator bar.
  - *Required*: Add `pb-[env(safe-area-inset-bottom)]` and `pt-[env(safe-area-inset-top)]` to all fixed or sticky headers and navigation bars.
- **Screen Edge Drag Conflicts**:
  - Avoid binding critical app gestures directly on the extreme left/right screen edges where they interfere with iOS interactive back-swipe navigation.

---

### 2.4 Contrast & Legibility (WCAG AA & Apple Standard)
- **Text Contrast**: Text must achieve at least **4.5:1** contrast ratio against its background (3:1 for large text 18pt+).
  - *Brutalist Advantage*: Brutalism naturally exceeds this with pure black text on vibrant fills, achieving up to 21:1.
- **Dark Mode Inversion**: Verify that hard borders and shadows invert properly in dark mode:
  ```css
  .dark {
    --border: 0 0% 100%;
    --shadow-color: 0 0% 100%;
  }
  ```

---

### 2.5 Motion Sensitivity (`prefers-reduced-motion`)
- When a user enables "Reduce Motion" in iOS Settings / macOS Accessibility:
  - All autoplay marquees, rotating ASCII shapes, and canvas shaders must cease rapid motion.
  - BoldKit's `motion.css` automatically respects `prefers-reduced-motion: reduce` by zeroing transition durations and suppressing keyframes.
