# Part 2: 1:1 Shared Components Comparative Matrix (53 Components)

This document provides an exhaustive, 1-to-1 technical breakdown for all **53 UI components** implemented concurrently in both **Neobrutalism.com** and **BoldKit.dev**.

---

## Master Quick-Reference Matrix

| # | Component | Category | Neobrutalism Primitive | BoldKit Primitive | Neobrutalism CLI Add | BoldKit CLI Add |
| :-: | :--- | :--- | :---: | :---: | :--- | :--- |
| 1 | **`button`** | Form Controls & Inputs | `@base-ui/react` | `radix-ui` | `.../r/button.json` | `.../r/button.json` |
| 2 | **`button-group`** | Form Controls & Inputs | `@base-ui/react` | `Native React` | `.../r/button-group.json` | `.../r/button-group.json` |
| 3 | **`checkbox`** | Form Controls & Inputs | `@base-ui/react` | `radix-ui` | `.../r/checkbox.json` | `.../r/checkbox.json` |
| 4 | **`combobox`** | Form Controls & Inputs | `Native React` | `Native React` | `.../r/combobox.json` | `.../r/combobox.json` |
| 5 | **`field`** | Form Controls & Inputs | `Native React` | `Native React` | `.../r/field.json` | `.../r/field.json` |
| 6 | **`input`** | Form Controls & Inputs | `Native React` | `Native React` | `.../r/input.json` | `.../r/input.json` |
| 7 | **`input-group`** | Form Controls & Inputs | `Native React` | `Native React` | `.../r/input-group.json` | `.../r/input-group.json` |
| 8 | **`input-otp`** | Form Controls & Inputs | `input-otp` | `input-otp` | `.../r/input-otp.json` | `.../r/input-otp.json` |
| 9 | **`label`** | Form Controls & Inputs | `Native React` | `radix-ui` | `.../r/label.json` | `.../r/label.json` |
| 10 | **`native-select`** | Form Controls & Inputs | `Native React` | `Native React` | `.../r/native-select.json` | `.../r/native-select.json` |
| 11 | **`radio-group`** | Form Controls & Inputs | `@base-ui/react` | `radix-ui` | `.../r/radio-group.json` | `.../r/radio-group.json` |
| 12 | **`select`** | Form Controls & Inputs | `@base-ui/react` | `radix-ui` | `.../r/select.json` | `.../r/select.json` |
| 13 | **`slider`** | Form Controls & Inputs | `@base-ui/react` | `Native React` | `.../r/slider.json` | `.../r/slider.json` |
| 14 | **`switch`** | Form Controls & Inputs | `@base-ui/react` | `radix-ui` | `.../r/switch.json` | `.../r/switch.json` |
| 15 | **`textarea`** | Form Controls & Inputs | `Native React` | `Native React` | `.../r/textarea.json` | `.../r/textarea.json` |
| 16 | **`toggle`** | Form Controls & Inputs | `@base-ui/react` | `radix-ui` | `.../r/toggle.json` | `.../r/toggle.json` |
| 17 | **`toggle-group`** | Form Controls & Inputs | `@base-ui/react` | `radix-ui` | `.../r/toggle-group.json` | `.../r/toggle-group.json` |
| 18 | **`breadcrumb`** | Navigation & Menus | `@base-ui/react` | `radix-ui` | `.../r/breadcrumb.json` | `.../r/breadcrumb.json` |
| 19 | **`context-menu`** | Navigation & Menus | `@base-ui/react` | `radix-ui` | `.../r/context-menu.json` | `.../r/context-menu.json` |
| 20 | **`dropdown-menu`** | Navigation & Menus | `@base-ui/react` | `radix-ui` | `.../r/dropdown-menu.json` | `.../r/dropdown-menu.json` |
| 21 | **`menubar`** | Navigation & Menus | `@base-ui/react` | `radix-ui` | `.../r/menubar.json` | `.../r/menubar.json` |
| 22 | **`navigation-menu`** | Navigation & Menus | `@base-ui/react` | `radix-ui` | `.../r/navigation-menu.json` | `.../r/navigation-menu.json` |
| 23 | **`pagination`** | Navigation & Menus | `Native React` | `Native React` | `.../r/pagination.json` | `.../r/pagination.json` |
| 24 | **`alert`** | Feedback, Overlays & Dialogs | `Native React` | `Native React` | `.../r/alert.json` | `.../r/alert.json` |
| 25 | **`alert-dialog`** | Feedback, Overlays & Dialogs | `@base-ui/react` | `radix-ui` | `.../r/alert-dialog.json` | `.../r/alert-dialog.json` |
| 26 | **`dialog`** | Feedback, Overlays & Dialogs | `@base-ui/react` | `radix-ui` | `.../r/dialog.json` | `.../r/dialog.json` |
| 27 | **`drawer`** | Feedback, Overlays & Dialogs | `@base-ui/react` | `Native React` | `.../r/drawer.json` | `.../r/drawer.json` |
| 28 | **`hover-card`** | Feedback, Overlays & Dialogs | `@base-ui/react` | `radix-ui` | `.../r/hover-card.json` | `.../r/hover-card.json` |
| 29 | **`popover`** | Feedback, Overlays & Dialogs | `@base-ui/react` | `radix-ui` | `.../r/popover.json` | `.../r/popover.json` |
| 30 | **`sheet`** | Feedback, Overlays & Dialogs | `@base-ui/react` | `radix-ui` | `.../r/sheet.json` | `.../r/sheet.json` |
| 31 | **`toast`** | Feedback, Overlays & Dialogs | `@base-ui/react` | `radix-ui` | `.../r/toast.json` | `.../r/toast.json` |
| 32 | **`tooltip`** | Feedback, Overlays & Dialogs | `@base-ui/react` | `radix-ui` | `.../r/tooltip.json` | `.../r/tooltip.json` |
| 33 | **`accordion`** | Data Display & Layout | `@base-ui/react` | `radix-ui` | `.../r/accordion.json` | `.../r/accordion.json` |
| 34 | **`avatar`** | Data Display & Layout | `@base-ui/react` | `radix-ui` | `.../r/avatar.json` | `.../r/avatar.json` |
| 35 | **`badge`** | Data Display & Layout | `@base-ui/react` | `Native React` | `.../r/badge.json` | `.../r/badge.json` |
| 36 | **`card`** | Data Display & Layout | `Native React` | `Native React` | `.../r/card.json` | `.../r/card.json` |
| 37 | **`collapsible`** | Data Display & Layout | `@base-ui/react` | `radix-ui` | `.../r/collapsible.json` | `.../r/collapsible.json` |
| 38 | **`data-table`** | Data Display & Layout | `Native React` | `Native React` | `.../r/data-table.json` | `.../r/data-table.json` |
| 39 | **`kbd`** | Data Display & Layout | `Native React` | `Native React` | `.../r/kbd.json` | `.../r/kbd.json` |
| 40 | **`marquee`** | Data Display & Layout | `Native React` | `Native React` | `.../r/marquee.json` | `.../r/marquee.json` |
| 41 | **`resizable`** | Data Display & Layout | `react-resizable-panels` | `react-resizable-panels` | `.../r/resizable.json` | `.../r/resizable.json` |
| 42 | **`scroll-area`** | Data Display & Layout | `@base-ui/react` | `radix-ui` | `.../r/scroll-area.json` | `.../r/scroll-area.json` |
| 43 | **`sidebar`** | Data Display & Layout | `@base-ui/react` | `Native React` | `.../r/sidebar.json` | `.../r/sidebar.json` |
| 44 | **`table`** | Data Display & Layout | `Native React` | `Native React` | `.../r/table.json` | `.../r/table.json` |
| 45 | **`tabs`** | Data Display & Layout | `@base-ui/react` | `radix-ui` | `.../r/tabs.json` | `.../r/tabs.json` |
| 46 | **`calendar`** | Date & Scheduling | `react-day-picker` | `react-day-picker` | `.../r/calendar.json` | `.../r/calendar.json` |
| 47 | **`date-picker`** | Date & Scheduling | `Composed / Native` | `Native React` | `.../r/date-picker.json` | `.../r/date-picker.json` |
| 48 | **`progress`** | Status & Indicators | `@base-ui/react` | `radix-ui` | `.../r/progress.json` | `.../r/progress.json` |
| 49 | **`skeleton`** | Status & Indicators | `Native React` | `Native React` | `.../r/skeleton.json` | `.../r/skeleton.json` |
| 50 | **`spinner`** | Status & Indicators | `Native React` | `Native React` | `.../r/spinner.json` | `.../r/spinner.json` |
| 51 | **`carousel`** | Interactive & Composite Flows | `embla-carousel-react` | `embla-carousel-react` | `.../r/carousel.json` | `.../r/carousel.json` |
| 52 | **`command`** | Interactive & Composite Flows | `cmdk` | `radix-ui` | `.../r/command.json` | `.../r/command.json` |
| 53 | **`questionnaire`** | Interactive & Composite Flows | `Native React` | `Native React` | `.../r/questionnaire.json` | `.../r/questionnaire.json` |

---

## Categorized Technical Analysis Cards

### Category: Form Controls & Inputs

#### 1. `button` — Button
> **Purpose**: The BoldKit Button is a neubrutalism-styled interactive element with 7 variants (default, secondary, accent, destructive, outline, ghost, link) and 5 sizes. Built on native button semantics with full keyboard accessibility, it features thick 3px borders and hard offset shadows that translate on hover. Available for both React and Vue 3 via the shadcn CLI.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/button.md`](../neobrutalism/components/button.md) | [`boldkit/components/button.md`](../boldkit/components/button.md) |
| **Source Code** | [`neobrutalism/ui/button.tsx`](../neobrutalism/ui/button.tsx) | [`boldkit/ui/button.tsx`](../boldkit/ui/button.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/button/`](../neobrutalism/examples/button/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/button.json"` | `npx shadcn@latest add "https://boldkit.dev/r/button.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Button } from "@/components/ui/button"

// BoldKit (radix-ui)
import { Button } from "@/components/ui/button"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 2. `button-group` — Button Group
> **Purpose**: Visually joins a row or column of buttons into a single bordered unit with one hard shadow.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/button-group.md`](../neobrutalism/components/button-group.md) | [`boldkit/components/button-group.md`](../boldkit/components/button-group.md) |
| **Source Code** | [`neobrutalism/ui/button-group.tsx`](../neobrutalism/ui/button-group.tsx) | [`boldkit/ui/button-group.tsx`](../boldkit/ui/button-group.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/button-group/`](../neobrutalism/examples/button-group/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/button-group.json"` | `npx shadcn@latest add "https://boldkit.dev/r/button-group.json"` |
| **Underlying Primitive** | `@base-ui/react` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { ButtonGroup } from "@/components/ui/button-group"

// BoldKit (Native React)
import { ButtonGroup } from "@/components/ui/button-group"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `Native React`. Ensure the appropriate primitive package is installed (`npm install Native React`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 3. `checkbox` — Checkbox
> **Purpose**: The BoldKit Checkbox is a neubrutalism-styled form input built on Radix UI Checkbox, with a thick 3px border and a bold check icon for clear visual feedback. It supports controlled and uncontrolled usage, the indeterminate state for tri-state selection, and is fully keyboard and screen-reader accessible. Pair it with the Label component for properly associated, accessible form controls.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/checkbox.md`](../neobrutalism/components/checkbox.md) | [`boldkit/components/checkbox.md`](../boldkit/components/checkbox.md) |
| **Source Code** | [`neobrutalism/ui/checkbox.tsx`](../neobrutalism/ui/checkbox.tsx) | [`boldkit/ui/checkbox.tsx`](../boldkit/ui/checkbox.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/checkbox/`](../neobrutalism/examples/checkbox/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/checkbox.json"` | `npx shadcn@latest add "https://boldkit.dev/r/checkbox.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Checkbox } from "@/components/ui/checkbox"

// BoldKit (radix-ui)
import { Checkbox } from "@/components/ui/checkbox"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 4. `combobox` — Combobox
> **Purpose**: The BoldKit Combobox is a searchable dropdown built by composing Popover and Command. It gives you a neubrutalism-styled trigger with the same thick border and hard shadow as Select, but with a live-filter search input inside the dropdown. Use ComboboxTrigger for single selection or ComboboxMultiTrigger for multi-select with removable tag chips.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/combobox.md`](../neobrutalism/components/combobox.md) | [`boldkit/components/combobox.md`](../boldkit/components/combobox.md) |
| **Source Code** | [`neobrutalism/ui/combobox.tsx`](../neobrutalism/ui/combobox.tsx) | [`boldkit/ui/combobox.tsx`](../boldkit/ui/combobox.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/combobox/`](../neobrutalism/examples/combobox/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/combobox.json"` | `npx shadcn@latest add "https://boldkit.dev/r/combobox.json"` |
| **Underlying Primitive** | `Native React` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { Combobox } from "@/components/ui/combobox"

// BoldKit (Native React)
import { Combobox } from "@/components/ui/combobox"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `Native React` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 5. `field` — Field
> **Purpose**: A composition layer that pairs a label, control, description and error message into a consistent form field.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/field.md`](../neobrutalism/components/field.md) | [`boldkit/components/field.md`](../boldkit/components/field.md) |
| **Source Code** | [`neobrutalism/ui/field.tsx`](../neobrutalism/ui/field.tsx) | [`boldkit/ui/field.tsx`](../boldkit/ui/field.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/field/`](../neobrutalism/examples/field/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/field.json"` | `npx shadcn@latest add "https://boldkit.dev/r/field.json"` |
| **Underlying Primitive** | `Native React` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { Field } from "@/components/ui/field"

// BoldKit (Native React)
import { Field } from "@/components/ui/field"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `Native React` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 6. `input` — Input
> **Purpose**: The BoldKit Input is a neubrutalism-styled text field with a thick 3px border and a hard shadow that snaps to a focus ring on interaction. It supports accessible label association via htmlFor and works in both controlled and uncontrolled modes. Drop it into any form alongside the Label component for a fully accessible, visually bold input experience.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/input.md`](../neobrutalism/components/input.md) | [`boldkit/components/input.md`](../boldkit/components/input.md) |
| **Source Code** | [`neobrutalism/ui/input.tsx`](../neobrutalism/ui/input.tsx) | [`boldkit/ui/input.tsx`](../boldkit/ui/input.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/input/`](../neobrutalism/examples/input/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/input.json"` | `npx shadcn@latest add "https://boldkit.dev/r/input.json"` |
| **Underlying Primitive** | `Native React` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { Input } from "@/components/ui/input"

// BoldKit (Native React)
import { Input } from "@/components/ui/input"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `Native React` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 7. `input-group` — Input Group
> **Purpose**: Joins an input with leading or trailing addons — icons, text, or shortcuts — in a single bordered field.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/input-group.md`](../neobrutalism/components/input-group.md) | [`boldkit/components/input-group.md`](../boldkit/components/input-group.md) |
| **Source Code** | [`neobrutalism/ui/input-group.tsx`](../neobrutalism/ui/input-group.tsx) | [`boldkit/ui/input-group.tsx`](../boldkit/ui/input-group.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/input-group/`](../neobrutalism/examples/input-group/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/input-group.json"` | `npx shadcn@latest add "https://boldkit.dev/r/input-group.json"` |
| **Underlying Primitive** | `Native React` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { InputGroup } from "@/components/ui/input-group"

// BoldKit (Native React)
import { InputGroup } from "@/components/ui/input-group"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `Native React` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 8. `input-otp` — Input Otp
> **Purpose**: Accessible one-time password component with copy paste functionality and neubrutalism styling.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/input-otp.md`](../neobrutalism/components/input-otp.md) | [`boldkit/components/input-otp.md`](../boldkit/components/input-otp.md) |
| **Source Code** | [`neobrutalism/ui/input-otp.tsx`](../neobrutalism/ui/input-otp.tsx) | [`boldkit/ui/input-otp.tsx`](../boldkit/ui/input-otp.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/input-otp/`](../neobrutalism/examples/input-otp/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/input-otp.json"` | `npx shadcn@latest add "https://boldkit.dev/r/input-otp.json"` |
| **Underlying Primitive** | `input-otp` | `input-otp` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (input-otp)
import { InputOtp } from "@/components/ui/input-otp"

// BoldKit (input-otp)
import { InputOtp } from "@/components/ui/input-otp"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `input-otp` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 9. `label` — Label
> **Purpose**: Renders an accessible label associated with form controls with bold uppercase styling.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/label.md`](../neobrutalism/components/label.md) | [`boldkit/components/label.md`](../boldkit/components/label.md) |
| **Source Code** | [`neobrutalism/ui/label.tsx`](../neobrutalism/ui/label.tsx) | [`boldkit/ui/label.tsx`](../boldkit/ui/label.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/label/`](../neobrutalism/examples/label/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/label.json"` | `npx shadcn@latest add "https://boldkit.dev/r/label.json"` |
| **Underlying Primitive** | `Native React` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { Label } from "@/components/ui/label"

// BoldKit (radix-ui)
import { Label } from "@/components/ui/label"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `Native React` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 10. `native-select` — Native Select
> **Purpose**: A styled wrapper around the native select element — lightweight and accessible, for simple option lists that don't need a custom popover.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/native-select.md`](../neobrutalism/components/native-select.md) | [`boldkit/components/native-select.md`](../boldkit/components/native-select.md) |
| **Source Code** | [`neobrutalism/ui/native-select.tsx`](../neobrutalism/ui/native-select.tsx) | [`boldkit/ui/native-select.tsx`](../boldkit/ui/native-select.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/native-select/`](../neobrutalism/examples/native-select/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/native-select.json"` | `npx shadcn@latest add "https://boldkit.dev/r/native-select.json"` |
| **Underlying Primitive** | `Native React` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { NativeSelect } from "@/components/ui/native-select"

// BoldKit (Native React)
import { NativeSelect } from "@/components/ui/native-select"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `Native React` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 11. `radio-group` — Radio Group
> **Purpose**: A set of checkable buttons where only one can be checked at a time with bold neubrutalism styling.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/radio-group.md`](../neobrutalism/components/radio-group.md) | [`boldkit/components/radio-group.md`](../boldkit/components/radio-group.md) |
| **Source Code** | [`neobrutalism/ui/radio-group.tsx`](../neobrutalism/ui/radio-group.tsx) | [`boldkit/ui/radio-group.tsx`](../boldkit/ui/radio-group.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/radio-group/`](../neobrutalism/examples/radio-group/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/radio-group.json"` | `npx shadcn@latest add "https://boldkit.dev/r/radio-group.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { RadioGroup } from "@/components/ui/radio-group"

// BoldKit (radix-ui)
import { RadioGroup } from "@/components/ui/radio-group"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 12. `select` — Select
> **Purpose**: The BoldKit Select is a neubrutalism dropdown built on Radix UI Select, with a custom thick-bordered trigger and a hard-shadow content panel. Full keyboard navigation is supported — open with Space or Enter, navigate with arrow keys, and select with Enter. Use SelectGroup and SelectLabel to organize options, and wire it to a Label for accessible form fields.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/select.md`](../neobrutalism/components/select.md) | [`boldkit/components/select.md`](../boldkit/components/select.md) |
| **Source Code** | [`neobrutalism/ui/select.tsx`](../neobrutalism/ui/select.tsx) | [`boldkit/ui/select.tsx`](../boldkit/ui/select.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/select/`](../neobrutalism/examples/select/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/select.json"` | `npx shadcn@latest add "https://boldkit.dev/r/select.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Select } from "@/components/ui/select"

// BoldKit (radix-ui)
import { Select } from "@/components/ui/select"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 13. `slider` — Slider
> **Purpose**: The BoldKit Slider is a neubrutalism range input with spring-physics jelly animations, supporting both single-thumb and dual-thumb (range) modes. It is fully keyboard accessible via arrow keys and works in controlled and uncontrolled usage patterns. Tune the feel with stiffness, damping, and mass props for custom bounce and inertia.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/slider.md`](../neobrutalism/components/slider.md) | [`boldkit/components/slider.md`](../boldkit/components/slider.md) |
| **Source Code** | [`neobrutalism/ui/slider.tsx`](../neobrutalism/ui/slider.tsx) | [`boldkit/ui/slider.tsx`](../boldkit/ui/slider.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/slider/`](../neobrutalism/examples/slider/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/slider.json"` | `npx shadcn@latest add "https://boldkit.dev/r/slider.json"` |
| **Underlying Primitive** | `@base-ui/react` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Slider } from "@/components/ui/slider"

// BoldKit (Native React)
import { Slider } from "@/components/ui/slider"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `Native React`. Ensure the appropriate primitive package is installed (`npm install Native React`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 14. `switch` — Switch
> **Purpose**: A toggle switch control with bold neubrutalism styling for binary on/off states.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/switch.md`](../neobrutalism/components/switch.md) | [`boldkit/components/switch.md`](../boldkit/components/switch.md) |
| **Source Code** | [`neobrutalism/ui/switch.tsx`](../neobrutalism/ui/switch.tsx) | [`boldkit/ui/switch.tsx`](../boldkit/ui/switch.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/switch/`](../neobrutalism/examples/switch/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/switch.json"` | `npx shadcn@latest add "https://boldkit.dev/r/switch.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Switch } from "@/components/ui/switch"

// BoldKit (radix-ui)
import { Switch } from "@/components/ui/switch"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 15. `textarea` — Textarea
> **Purpose**: Displays a form textarea or a component that looks like a textarea.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/textarea.md`](../neobrutalism/components/textarea.md) | [`boldkit/components/textarea.md`](../boldkit/components/textarea.md) |
| **Source Code** | [`neobrutalism/ui/textarea.tsx`](../neobrutalism/ui/textarea.tsx) | [`boldkit/ui/textarea.tsx`](../boldkit/ui/textarea.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/textarea/`](../neobrutalism/examples/textarea/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/textarea.json"` | `npx shadcn@latest add "https://boldkit.dev/r/textarea.json"` |
| **Underlying Primitive** | `Native React` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { Textarea } from "@/components/ui/textarea"

// BoldKit (Native React)
import { Textarea } from "@/components/ui/textarea"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `Native React` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 16. `toggle` — Toggle
> **Purpose**: A two-state button that can be toggled on or off with bold neubrutalism styling.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/toggle.md`](../neobrutalism/components/toggle.md) | [`boldkit/components/toggle.md`](../boldkit/components/toggle.md) |
| **Source Code** | [`neobrutalism/ui/toggle.tsx`](../neobrutalism/ui/toggle.tsx) | [`boldkit/ui/toggle.tsx`](../boldkit/ui/toggle.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/toggle/`](../neobrutalism/examples/toggle/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/toggle.json"` | `npx shadcn@latest add "https://boldkit.dev/r/toggle.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Toggle } from "@/components/ui/toggle"

// BoldKit (radix-ui)
import { Toggle } from "@/components/ui/toggle"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 17. `toggle-group` — Toggle Group
> **Purpose**: A group of toggle buttons where only one or multiple can be selected with bold neubrutalism styling.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/toggle-group.md`](../neobrutalism/components/toggle-group.md) | [`boldkit/components/toggle-group.md`](../boldkit/components/toggle-group.md) |
| **Source Code** | [`neobrutalism/ui/toggle-group.tsx`](../neobrutalism/ui/toggle-group.tsx) | [`boldkit/ui/toggle-group.tsx`](../boldkit/ui/toggle-group.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/toggle-group/`](../neobrutalism/examples/toggle-group/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/toggle-group.json"` | `npx shadcn@latest add "https://boldkit.dev/r/toggle-group.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { ToggleGroup } from "@/components/ui/toggle-group"

// BoldKit (radix-ui)
import { ToggleGroup } from "@/components/ui/toggle-group"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

### Category: Navigation & Menus

#### 18. `breadcrumb` — Breadcrumb
> **Purpose**: Displays the path to the current resource using a hierarchy of links with bold typography.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/breadcrumb.md`](../neobrutalism/components/breadcrumb.md) | [`boldkit/components/breadcrumb.md`](../boldkit/components/breadcrumb.md) |
| **Source Code** | [`neobrutalism/ui/breadcrumb.tsx`](../neobrutalism/ui/breadcrumb.tsx) | [`boldkit/ui/breadcrumb.tsx`](../boldkit/ui/breadcrumb.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/breadcrumb/`](../neobrutalism/examples/breadcrumb/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/breadcrumb.json"` | `npx shadcn@latest add "https://boldkit.dev/r/breadcrumb.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Breadcrumb } from "@/components/ui/breadcrumb"

// BoldKit (radix-ui)
import { Breadcrumb } from "@/components/ui/breadcrumb"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 19. `context-menu` — Context Menu
> **Purpose**: Displays a menu of actions or options triggered by a right-click, with thick borders and hard shadows.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/context-menu.md`](../neobrutalism/components/context-menu.md) | [`boldkit/components/context-menu.md`](../boldkit/components/context-menu.md) |
| **Source Code** | [`neobrutalism/ui/context-menu.tsx`](../neobrutalism/ui/context-menu.tsx) | [`boldkit/ui/context-menu.tsx`](../boldkit/ui/context-menu.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/context-menu/`](../neobrutalism/examples/context-menu/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/context-menu.json"` | `npx shadcn@latest add "https://boldkit.dev/r/context-menu.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { ContextMenu } from "@/components/ui/context-menu"

// BoldKit (radix-ui)
import { ContextMenu } from "@/components/ui/context-menu"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 20. `dropdown-menu` — Dropdown Menu
> **Purpose**: Displays a menu of actions or options triggered by a button with bold neubrutalism styling.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/dropdown-menu.md`](../neobrutalism/components/dropdown-menu.md) | [`boldkit/components/dropdown-menu.md`](../boldkit/components/dropdown-menu.md) |
| **Source Code** | [`neobrutalism/ui/dropdown-menu.tsx`](../neobrutalism/ui/dropdown-menu.tsx) | [`boldkit/ui/dropdown-menu.tsx`](../boldkit/ui/dropdown-menu.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/dropdown-menu/`](../neobrutalism/examples/dropdown-menu/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/dropdown-menu.json"` | `npx shadcn@latest add "https://boldkit.dev/r/dropdown-menu.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { DropdownMenu } from "@/components/ui/dropdown-menu"

// BoldKit (radix-ui)
import { DropdownMenu } from "@/components/ui/dropdown-menu"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 21. `menubar` — Menubar
> **Purpose**: A horizontal bar of desktop-style dropdown menus, perfect for application toolbars.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/menubar.md`](../neobrutalism/components/menubar.md) | [`boldkit/components/menubar.md`](../boldkit/components/menubar.md) |
| **Source Code** | [`neobrutalism/ui/menubar.tsx`](../neobrutalism/ui/menubar.tsx) | [`boldkit/ui/menubar.tsx`](../boldkit/ui/menubar.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/menubar/`](../neobrutalism/examples/menubar/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/menubar.json"` | `npx shadcn@latest add "https://boldkit.dev/r/menubar.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Menubar } from "@/components/ui/menubar"

// BoldKit (radix-ui)
import { Menubar } from "@/components/ui/menubar"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 22. `navigation-menu` — Navigation Menu
> **Purpose**: A collection of links and dropdown panels for building site navigation, with bold borders and hard shadows.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/navigation-menu.md`](../neobrutalism/components/navigation-menu.md) | [`boldkit/components/navigation-menu.md`](../boldkit/components/navigation-menu.md) |
| **Source Code** | [`neobrutalism/ui/navigation-menu.tsx`](../neobrutalism/ui/navigation-menu.tsx) | [`boldkit/ui/navigation-menu.tsx`](../boldkit/ui/navigation-menu.tsx) |
| **Interactive Examples** | Embedded in markdown | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/navigation-menu.json"` | `npx shadcn@latest add "https://boldkit.dev/r/navigation-menu.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { NavigationMenu } from "@/components/ui/navigation-menu"

// BoldKit (radix-ui)
import { NavigationMenu } from "@/components/ui/navigation-menu"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 23. `pagination` — Pagination
> **Purpose**: Pagination with page navigation, next and previous links with neubrutalism styling.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/pagination.md`](../neobrutalism/components/pagination.md) | [`boldkit/components/pagination.md`](../boldkit/components/pagination.md) |
| **Source Code** | [`neobrutalism/ui/pagination.tsx`](../neobrutalism/ui/pagination.tsx) | [`boldkit/ui/pagination.tsx`](../boldkit/ui/pagination.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/pagination/`](../neobrutalism/examples/pagination/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/pagination.json"` | `npx shadcn@latest add "https://boldkit.dev/r/pagination.json"` |
| **Underlying Primitive** | `Native React` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { Pagination } from "@/components/ui/pagination"

// BoldKit (Native React)
import { Pagination } from "@/components/ui/pagination"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `Native React` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

### Category: Feedback, Overlays & Dialogs

#### 24. `alert` — Alert
> **Purpose**: Displays a callout for user attention with various severity levels and bold neubrutalism styling.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/alert.md`](../neobrutalism/components/alert.md) | [`boldkit/components/alert.md`](../boldkit/components/alert.md) |
| **Source Code** | [`neobrutalism/ui/alert.tsx`](../neobrutalism/ui/alert.tsx) | [`boldkit/ui/alert.tsx`](../boldkit/ui/alert.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/alert/`](../neobrutalism/examples/alert/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/alert.json"` | `npx shadcn@latest add "https://boldkit.dev/r/alert.json"` |
| **Underlying Primitive** | `Native React` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { Alert } from "@/components/ui/alert"

// BoldKit (Native React)
import { Alert } from "@/components/ui/alert"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `Native React` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 25. `alert-dialog` — Alert Dialog
> **Purpose**: A modal dialog that interrupts the user with important content and expects a response.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/alert-dialog.md`](../neobrutalism/components/alert-dialog.md) | [`boldkit/components/alert-dialog.md`](../boldkit/components/alert-dialog.md) |
| **Source Code** | [`neobrutalism/ui/alert-dialog.tsx`](../neobrutalism/ui/alert-dialog.tsx) | [`boldkit/ui/alert-dialog.tsx`](../boldkit/ui/alert-dialog.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/alert-dialog/`](../neobrutalism/examples/alert-dialog/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/alert-dialog.json"` | `npx shadcn@latest add "https://boldkit.dev/r/alert-dialog.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { AlertDialog } from "@/components/ui/alert-dialog"

// BoldKit (radix-ui)
import { AlertDialog } from "@/components/ui/alert-dialog"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 26. `dialog` — Dialog
> **Purpose**: The BoldKit Dialog is a neubrutalism modal overlay built on Radix UI Dialog, with a managed focus trap that keeps keyboard navigation inside the open panel. It supports Escape key dismissal and click-outside closing out of the box. Use it for confirmations, form collection, or any content that needs to interrupt the current flow with full accessibility compliance.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/dialog.md`](../neobrutalism/components/dialog.md) | [`boldkit/components/dialog.md`](../boldkit/components/dialog.md) |
| **Source Code** | [`neobrutalism/ui/dialog.tsx`](../neobrutalism/ui/dialog.tsx) | [`boldkit/ui/dialog.tsx`](../boldkit/ui/dialog.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/dialog/`](../neobrutalism/examples/dialog/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/dialog.json"` | `npx shadcn@latest add "https://boldkit.dev/r/dialog.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Dialog } from "@/components/ui/dialog"

// BoldKit (radix-ui)
import { Dialog } from "@/components/ui/dialog"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 27. `drawer` — Drawer
> **Purpose**: A drawer component that slides in from the bottom of the screen with neubrutalism styling.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/drawer.md`](../neobrutalism/components/drawer.md) | [`boldkit/components/drawer.md`](../boldkit/components/drawer.md) |
| **Source Code** | [`neobrutalism/ui/drawer.tsx`](../neobrutalism/ui/drawer.tsx) | [`boldkit/ui/drawer.tsx`](../boldkit/ui/drawer.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/drawer/`](../neobrutalism/examples/drawer/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/drawer.json"` | `npx shadcn@latest add "https://boldkit.dev/r/drawer.json"` |
| **Underlying Primitive** | `@base-ui/react` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Drawer } from "@/components/ui/drawer"

// BoldKit (Native React)
import { Drawer } from "@/components/ui/drawer"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `Native React`. Ensure the appropriate primitive package is installed (`npm install Native React`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 28. `hover-card` — Hover Card
> **Purpose**: For sighted users to preview content available behind a link with neubrutalism styling.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/hover-card.md`](../neobrutalism/components/hover-card.md) | [`boldkit/components/hover-card.md`](../boldkit/components/hover-card.md) |
| **Source Code** | [`neobrutalism/ui/hover-card.tsx`](../neobrutalism/ui/hover-card.tsx) | [`boldkit/ui/hover-card.tsx`](../boldkit/ui/hover-card.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/hover-card/`](../neobrutalism/examples/hover-card/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/hover-card.json"` | `npx shadcn@latest add "https://boldkit.dev/r/hover-card.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { HoverCard } from "@/components/ui/hover-card"

// BoldKit (radix-ui)
import { HoverCard } from "@/components/ui/hover-card"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 29. `popover` — Popover
> **Purpose**: Displays rich content in a portal, triggered by a button with bold neubrutalism styling.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/popover.md`](../neobrutalism/components/popover.md) | [`boldkit/components/popover.md`](../boldkit/components/popover.md) |
| **Source Code** | [`neobrutalism/ui/popover.tsx`](../neobrutalism/ui/popover.tsx) | [`boldkit/ui/popover.tsx`](../boldkit/ui/popover.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/popover/`](../neobrutalism/examples/popover/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/popover.json"` | `npx shadcn@latest add "https://boldkit.dev/r/popover.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Popover } from "@/components/ui/popover"

// BoldKit (radix-ui)
import { Popover } from "@/components/ui/popover"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 30. `sheet` — Sheet
> **Purpose**: Extends the Dialog component to display content that complements the main content of the screen.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/sheet.md`](../neobrutalism/components/sheet.md) | [`boldkit/components/sheet.md`](../boldkit/components/sheet.md) |
| **Source Code** | [`neobrutalism/ui/sheet.tsx`](../neobrutalism/ui/sheet.tsx) | [`boldkit/ui/sheet.tsx`](../boldkit/ui/sheet.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/sheet/`](../neobrutalism/examples/sheet/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/sheet.json"` | `npx shadcn@latest add "https://boldkit.dev/r/sheet.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Sheet } from "@/components/ui/sheet"

// BoldKit (radix-ui)
import { Sheet } from "@/components/ui/sheet"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 31. `toast` — Toast
> **Purpose**: First-party brutalist toast stacks with an imperative API. Toasts pile up like offset paper cards and fan out on hover. Built on Radix Toast (React) and Reka UI Toast (Vue) — no Sonner dependency.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/toast.md`](../neobrutalism/components/toast.md) | [`boldkit/components/toast.md`](../boldkit/components/toast.md) |
| **Source Code** | [`neobrutalism/ui/toast.tsx`](../neobrutalism/ui/toast.tsx) | [`boldkit/ui/toast.tsx`](../boldkit/ui/toast.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/toast/`](../neobrutalism/examples/toast/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/toast.json"` | `npx shadcn@latest add "https://boldkit.dev/r/toast.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Toast } from "@/components/ui/toast"

// BoldKit (radix-ui)
import { Toast } from "@/components/ui/toast"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 32. `tooltip` — Tooltip
> **Purpose**: A popup that displays information related to an element when it receives keyboard focus or the mouse hovers over it.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/tooltip.md`](../neobrutalism/components/tooltip.md) | [`boldkit/components/tooltip.md`](../boldkit/components/tooltip.md) |
| **Source Code** | [`neobrutalism/ui/tooltip.tsx`](../neobrutalism/ui/tooltip.tsx) | [`boldkit/ui/tooltip.tsx`](../boldkit/ui/tooltip.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/tooltip/`](../neobrutalism/examples/tooltip/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/tooltip.json"` | `npx shadcn@latest add "https://boldkit.dev/r/tooltip.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Tooltip } from "@/components/ui/tooltip"

// BoldKit (radix-ui)
import { Tooltip } from "@/components/ui/tooltip"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

### Category: Data Display & Layout

#### 33. `accordion` — Accordion
> **Purpose**: A vertically stacked set of interactive headings that each reveal a section of content with bold neubrutalism styling.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/accordion.md`](../neobrutalism/components/accordion.md) | [`boldkit/components/accordion.md`](../boldkit/components/accordion.md) |
| **Source Code** | [`neobrutalism/ui/accordion.tsx`](../neobrutalism/ui/accordion.tsx) | [`boldkit/ui/accordion.tsx`](../boldkit/ui/accordion.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/accordion/`](../neobrutalism/examples/accordion/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/accordion.json"` | `npx shadcn@latest add "https://boldkit.dev/r/accordion.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Accordion } from "@/components/ui/accordion"

// BoldKit (radix-ui)
import { Accordion } from "@/components/ui/accordion"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 34. `avatar` — Avatar
> **Purpose**: An image element with a fallback for representing the user with bold neubrutalism borders.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/avatar.md`](../neobrutalism/components/avatar.md) | [`boldkit/components/avatar.md`](../boldkit/components/avatar.md) |
| **Source Code** | [`neobrutalism/ui/avatar.tsx`](../neobrutalism/ui/avatar.tsx) | [`boldkit/ui/avatar.tsx`](../boldkit/ui/avatar.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/avatar/`](../neobrutalism/examples/avatar/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/avatar.json"` | `npx shadcn@latest add "https://boldkit.dev/r/avatar.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Avatar } from "@/components/ui/avatar"

// BoldKit (radix-ui)
import { Avatar } from "@/components/ui/avatar"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 35. `badge` — Badge
> **Purpose**: The BoldKit Badge is a compact neubrutalism label element with 5 variants (default, secondary, accent, destructive, outline) for communicating status, category, or count at a glance. It features bold uppercase typography, a 2px border, and a small hard shadow for visual pop. Use it as a status indicator, content tag, or numeric counter alongside other UI elements.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/badge.md`](../neobrutalism/components/badge.md) | [`boldkit/components/badge.md`](../boldkit/components/badge.md) |
| **Source Code** | [`neobrutalism/ui/badge.tsx`](../neobrutalism/ui/badge.tsx) | [`boldkit/ui/badge.tsx`](../boldkit/ui/badge.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/badge/`](../neobrutalism/examples/badge/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/badge.json"` | `npx shadcn@latest add "https://boldkit.dev/r/badge.json"` |
| **Underlying Primitive** | `@base-ui/react` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Badge } from "@/components/ui/badge"

// BoldKit (Native React)
import { Badge } from "@/components/ui/badge"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `Native React`. Ensure the appropriate primitive package is installed (`npm install Native React`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 36. `card` — Card
> **Purpose**: The BoldKit Card is a neubrutalism content container with a thick 3px border and hard offset shadow that grounds it on the page. It ships with CardHeader, CardContent, and CardFooter subcomponents for structured layouts. Use it to group related information, form fields, or media in a visually bold, cohesive block.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/card.md`](../neobrutalism/components/card.md) | [`boldkit/components/card.md`](../boldkit/components/card.md) |
| **Source Code** | [`neobrutalism/ui/card.tsx`](../neobrutalism/ui/card.tsx) | [`boldkit/ui/card.tsx`](../boldkit/ui/card.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/card/`](../neobrutalism/examples/card/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/card.json"` | `npx shadcn@latest add "https://boldkit.dev/r/card.json"` |
| **Underlying Primitive** | `Native React` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { Card } from "@/components/ui/card"

// BoldKit (Native React)
import { Card } from "@/components/ui/card"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `Native React` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 37. `collapsible` — Collapsible
> **Purpose**: An interactive component which expands/collapses a panel with smooth animations.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/collapsible.md`](../neobrutalism/components/collapsible.md) | [`boldkit/components/collapsible.md`](../boldkit/components/collapsible.md) |
| **Source Code** | [`neobrutalism/ui/collapsible.tsx`](../neobrutalism/ui/collapsible.tsx) | [`boldkit/ui/collapsible.tsx`](../boldkit/ui/collapsible.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/collapsible/`](../neobrutalism/examples/collapsible/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/collapsible.json"` | `npx shadcn@latest add "https://boldkit.dev/r/collapsible.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Collapsible } from "@/components/ui/collapsible"

// BoldKit (radix-ui)
import { Collapsible } from "@/components/ui/collapsible"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 38. `data-table` — Data Table
> **Purpose**: A powerful data table built on TanStack Table with sorting, filtering, pagination, row selection, and column visibility.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/data-table.md`](../neobrutalism/components/data-table.md) | [`boldkit/components/data-table.md`](../boldkit/components/data-table.md) |
| **Source Code** | [`neobrutalism/ui/data-table.tsx`](../neobrutalism/ui/data-table.tsx) | [`boldkit/ui/data-table.tsx`](../boldkit/ui/data-table.tsx) |
| **Interactive Examples** | Embedded in markdown | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/data-table.json"` | `npx shadcn@latest add "https://boldkit.dev/r/data-table.json"` |
| **Underlying Primitive** | `Native React` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { DataTable } from "@/components/ui/data-table"

// BoldKit (Native React)
import { DataTable } from "@/components/ui/data-table"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `Native React` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 39. `kbd` — Kbd
> **Purpose**: Keyboard key indicators for displaying shortcuts and hotkeys with neubrutalism styling.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/kbd.md`](../neobrutalism/components/kbd.md) | [`boldkit/components/kbd.md`](../boldkit/components/kbd.md) |
| **Source Code** | [`neobrutalism/ui/kbd.tsx`](../neobrutalism/ui/kbd.tsx) | [`boldkit/ui/kbd.tsx`](../boldkit/ui/kbd.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/kbd/`](../neobrutalism/examples/kbd/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/kbd.json"` | `npx shadcn@latest add "https://boldkit.dev/r/kbd.json"` |
| **Underlying Primitive** | `Native React` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { Kbd } from "@/components/ui/kbd"

// BoldKit (Native React)
import { Kbd } from "@/components/ui/kbd"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `Native React` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 40. `marquee` — Marquee
> **Purpose**: Auto-scrolling text ticker with neubrutalism styling - a common brutalist design element for announcements and emphasis.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/marquee.md`](../neobrutalism/components/marquee.md) | [`boldkit/components/marquee.md`](../boldkit/components/marquee.md) |
| **Source Code** | [`neobrutalism/ui/marquee.tsx`](../neobrutalism/ui/marquee.tsx) | [`boldkit/ui/marquee.tsx`](../boldkit/ui/marquee.tsx) |
| **Interactive Examples** | Embedded in markdown | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/marquee.json"` | `npx shadcn@latest add "https://boldkit.dev/r/marquee.json"` |
| **Underlying Primitive** | `Native React` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { Marquee } from "@/components/ui/marquee"

// BoldKit (Native React)
import { Marquee } from "@/components/ui/marquee"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `Native React` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 41. `resizable` — Resizable
> **Purpose**: Resizable panel groups with draggable handles for split layouts and dashboards.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/resizable.md`](../neobrutalism/components/resizable.md) | [`boldkit/components/resizable.md`](../boldkit/components/resizable.md) |
| **Source Code** | [`neobrutalism/ui/resizable.tsx`](../neobrutalism/ui/resizable.tsx) | [`boldkit/ui/resizable.tsx`](../boldkit/ui/resizable.tsx) |
| **Interactive Examples** | Embedded in markdown | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/resizable.json"` | `npx shadcn@latest add "https://boldkit.dev/r/resizable.json"` |
| **Underlying Primitive** | `react-resizable-panels` | `react-resizable-panels` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (react-resizable-panels)
import { Resizable } from "@/components/ui/resizable"

// BoldKit (react-resizable-panels)
import { Resizable } from "@/components/ui/resizable"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `react-resizable-panels` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 42. `scroll-area` — Scroll Area
> **Purpose**: Augments native scroll functionality for custom, cross-browser styling with bold scrollbar design.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/scroll-area.md`](../neobrutalism/components/scroll-area.md) | [`boldkit/components/scroll-area.md`](../boldkit/components/scroll-area.md) |
| **Source Code** | [`neobrutalism/ui/scroll-area.tsx`](../neobrutalism/ui/scroll-area.tsx) | [`boldkit/ui/scroll-area.tsx`](../boldkit/ui/scroll-area.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/scroll-area/`](../neobrutalism/examples/scroll-area/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/scroll-area.json"` | `npx shadcn@latest add "https://boldkit.dev/r/scroll-area.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { ScrollArea } from "@/components/ui/scroll-area"

// BoldKit (radix-ui)
import { ScrollArea } from "@/components/ui/scroll-area"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 43. `sidebar` — Sidebar
> **Purpose**: A collapsible sidebar component with icon-only mode, mobile drawer support, and keyboard shortcut (Cmd+B).

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/sidebar.md`](../neobrutalism/components/sidebar.md) | [`boldkit/components/sidebar.md`](../boldkit/components/sidebar.md) |
| **Source Code** | [`neobrutalism/ui/sidebar.tsx`](../neobrutalism/ui/sidebar.tsx) | [`boldkit/ui/sidebar.tsx`](../boldkit/ui/sidebar.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/sidebar/`](../neobrutalism/examples/sidebar/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/sidebar.json"` | `npx shadcn@latest add "https://boldkit.dev/r/sidebar.json"` |
| **Underlying Primitive** | `@base-ui/react` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Sidebar } from "@/components/ui/sidebar"

// BoldKit (Native React)
import { Sidebar } from "@/components/ui/sidebar"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `Native React`. Ensure the appropriate primitive package is installed (`npm install Native React`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 44. `table` — Table
> **Purpose**: A responsive table component with bold neubrutalism styling for displaying tabular data.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/table.md`](../neobrutalism/components/table.md) | [`boldkit/components/table.md`](../boldkit/components/table.md) |
| **Source Code** | [`neobrutalism/ui/table.tsx`](../neobrutalism/ui/table.tsx) | [`boldkit/ui/table.tsx`](../boldkit/ui/table.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/table/`](../neobrutalism/examples/table/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/table.json"` | `npx shadcn@latest add "https://boldkit.dev/r/table.json"` |
| **Underlying Primitive** | `Native React` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { Table } from "@/components/ui/table"

// BoldKit (Native React)
import { Table } from "@/components/ui/table"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `Native React` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 45. `tabs` — Tabs
> **Purpose**: A tabbed interface component with bold neubrutalism styling for organizing content into selectable panels.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/tabs.md`](../neobrutalism/components/tabs.md) | [`boldkit/components/tabs.md`](../boldkit/components/tabs.md) |
| **Source Code** | [`neobrutalism/ui/tabs.tsx`](../neobrutalism/ui/tabs.tsx) | [`boldkit/ui/tabs.tsx`](../boldkit/ui/tabs.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/tabs/`](../neobrutalism/examples/tabs/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/tabs.json"` | `npx shadcn@latest add "https://boldkit.dev/r/tabs.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Tabs } from "@/components/ui/tabs"

// BoldKit (radix-ui)
import { Tabs } from "@/components/ui/tabs"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

### Category: Date & Scheduling

#### 46. `calendar` — Calendar
> **Purpose**: A date field component that allows users to enter and edit date with neubrutalism styling.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/calendar.md`](../neobrutalism/components/calendar.md) | [`boldkit/components/calendar.md`](../boldkit/components/calendar.md) |
| **Source Code** | [`neobrutalism/ui/calendar.tsx`](../neobrutalism/ui/calendar.tsx) | [`boldkit/ui/calendar.tsx`](../boldkit/ui/calendar.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/calendar/`](../neobrutalism/examples/calendar/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/calendar.json"` | `npx shadcn@latest add "https://boldkit.dev/r/calendar.json"` |
| **Underlying Primitive** | `react-day-picker` | `react-day-picker` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (react-day-picker)
import { Calendar } from "@/components/ui/calendar"

// BoldKit (react-day-picker)
import { Calendar } from "@/components/ui/calendar"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `react-day-picker` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 47. `date-picker` — Date Picker
> **Purpose**: A single-date picker — a button trigger that opens a calendar in a popover, built on Calendar, Popover and Button.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/date-picker.md`](../neobrutalism/components/date-picker.md) | [`boldkit/components/date-picker.md`](../boldkit/components/date-picker.md) |
| **Source Code** | Composed on demand | [`boldkit/ui/date-picker.tsx`](../boldkit/ui/date-picker.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/date-picker/`](../neobrutalism/examples/date-picker/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/date-picker.json"` | `npx shadcn@latest add "https://boldkit.dev/r/date-picker.json"` |
| **Underlying Primitive** | `Composed / Native` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Composed / Native)
import { DatePicker } from "@/components/ui/date-picker"

// BoldKit (Native React)
import { DatePicker } from "@/components/ui/date-picker"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `Composed / Native` while BoldKit uses `Native React`. Ensure the appropriate primitive package is installed (`npm install Native React`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

### Category: Status & Indicators

#### 48. `progress` — Progress
> **Purpose**: Displays an indicator showing the completion progress of a task with bold neubrutalism styling.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/progress.md`](../neobrutalism/components/progress.md) | [`boldkit/components/progress.md`](../boldkit/components/progress.md) |
| **Source Code** | [`neobrutalism/ui/progress.tsx`](../neobrutalism/ui/progress.tsx) | [`boldkit/ui/progress.tsx`](../boldkit/ui/progress.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/progress/`](../neobrutalism/examples/progress/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/progress.json"` | `npx shadcn@latest add "https://boldkit.dev/r/progress.json"` |
| **Underlying Primitive** | `@base-ui/react` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (@base-ui/react)
import { Progress } from "@/components/ui/progress"

// BoldKit (radix-ui)
import { Progress } from "@/components/ui/progress"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `@base-ui/react` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 49. `skeleton` — Skeleton
> **Purpose**: A placeholder loading animation with neubrutalism styling to indicate content is being loaded.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/skeleton.md`](../neobrutalism/components/skeleton.md) | [`boldkit/components/skeleton.md`](../boldkit/components/skeleton.md) |
| **Source Code** | [`neobrutalism/ui/skeleton.tsx`](../neobrutalism/ui/skeleton.tsx) | [`boldkit/ui/skeleton.tsx`](../boldkit/ui/skeleton.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/skeleton/`](../neobrutalism/examples/skeleton/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/skeleton.json"` | `npx shadcn@latest add "https://boldkit.dev/r/skeleton.json"` |
| **Underlying Primitive** | `Native React` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { Skeleton } from "@/components/ui/skeleton"

// BoldKit (Native React)
import { Skeleton } from "@/components/ui/skeleton"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `Native React` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 50. `spinner` — Spinner
> **Purpose**: Loading indicators with multiple animation styles for neubrutalism design.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/spinner.md`](../neobrutalism/components/spinner.md) | [`boldkit/components/spinner.md`](../boldkit/components/spinner.md) |
| **Source Code** | [`neobrutalism/ui/spinner.tsx`](../neobrutalism/ui/spinner.tsx) | [`boldkit/ui/spinner.tsx`](../boldkit/ui/spinner.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/spinner/`](../neobrutalism/examples/spinner/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/spinner.json"` | `npx shadcn@latest add "https://boldkit.dev/r/spinner.json"` |
| **Underlying Primitive** | `Native React` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { Spinner } from "@/components/ui/spinner"

// BoldKit (Native React)
import { Spinner } from "@/components/ui/spinner"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `Native React` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

### Category: Interactive & Composite Flows

#### 51. `carousel` — Carousel
> **Purpose**: A carousel component built on Embla Carousel with keyboard navigation, touch support, and customizable navigation controls.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/carousel.md`](../neobrutalism/components/carousel.md) | [`boldkit/components/carousel.md`](../boldkit/components/carousel.md) |
| **Source Code** | [`neobrutalism/ui/carousel.tsx`](../neobrutalism/ui/carousel.tsx) | [`boldkit/ui/carousel.tsx`](../boldkit/ui/carousel.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/carousel/`](../neobrutalism/examples/carousel/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/carousel.json"` | `npx shadcn@latest add "https://boldkit.dev/r/carousel.json"` |
| **Underlying Primitive** | `embla-carousel-react` | `embla-carousel-react` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (embla-carousel-react)
import { Carousel } from "@/components/ui/carousel"

// BoldKit (embla-carousel-react)
import { Carousel } from "@/components/ui/carousel"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `embla-carousel-react` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---

#### 52. `command` — Command
> **Purpose**: A command menu component for searching and selecting actions with keyboard navigation.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/command.md`](../neobrutalism/components/command.md) | [`boldkit/components/command.md`](../boldkit/components/command.md) |
| **Source Code** | [`neobrutalism/ui/command.tsx`](../neobrutalism/ui/command.tsx) | [`boldkit/ui/command.tsx`](../boldkit/ui/command.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/command/`](../neobrutalism/examples/command/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/command.json"` | `npx shadcn@latest add "https://boldkit.dev/r/command.json"` |
| **Underlying Primitive** | `cmdk` | `radix-ui` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (cmdk)
import { Command } from "@/components/ui/command"

// BoldKit (radix-ui)
import { Command } from "@/components/ui/command"
```

**Harmonization & Interoperability Recipe**:
- **Primitive Bridge**: Neobrutalism uses `cmdk` while BoldKit uses `radix-ui`. Ensure the appropriate primitive package is installed (`npm install radix-ui`). To match BoldKit's heavy look in Neobrutalism, override className with `border-3 border-foreground shadow-[4px_4px_0px_#000]`.

---

#### 53. `questionnaire` — Questionnaire
> **Purpose**: A one-question-per-screen flow for agent clarification prompts, onboarding, surveys and intake forms. Single, multiple and freeform questions with an optional Other… answer, conditional questions, A/B/C and 1/2/3 keyboard shortcuts, and a real <form> that serializes every answer for a server POST.

| Dimension | Neobrutalism.com | BoldKit.dev |
| :--- | :--- | :--- |
| **Doc Reference** | [`neobrutalism/components/questionnaire.md`](../neobrutalism/components/questionnaire.md) | [`boldkit/components/questionnaire.md`](../boldkit/components/questionnaire.md) |
| **Source Code** | [`neobrutalism/ui/questionnaire.tsx`](../neobrutalism/ui/questionnaire.tsx) | [`boldkit/ui/questionnaire.tsx`](../boldkit/ui/questionnaire.tsx) |
| **Interactive Examples** | [`neobrutalism/examples/questionnaire/`](../neobrutalism/examples/questionnaire/) | Embedded inline in doc markdown |
| **Shadcn CLI Command** | `npx shadcn@latest add "https://neobrutalism.com/r/questionnaire.json"` | `npx shadcn@latest add "https://boldkit.dev/r/questionnaire.json"` |
| **Underlying Primitive** | `Native React` | `Native React` |
| **Border & Stroke** | `border-2 border-border` | `border-3 border-foreground` |
| **Shadow System** | `shadow-shadow` | `shadow-[4px_4px_0px_hsl(var(--shadow-color))]` |
| **Hover & Active Physics** | `hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none` | `hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]` |

**Code Import Comparison**:
```tsx
// Neobrutalism (Native React)
import { Questionnaire } from "@/components/ui/questionnaire"

// BoldKit (Native React)
import { Questionnaire } from "@/components/ui/questionnaire"
```

**Harmonization & Interoperability Recipe**:
- **Direct Swap**: Both libraries share `Native React` as the headless runtime. Switching between them requires only adjusting the border class (`border-2` vs `border-3`) and aligning shadow tokens (`shadow-shadow` vs `shadow-hard`).

---
