# Part 3: Complete 57 Components Correlation Matrix

This document provides an exhaustive, 3-layer architectural correlation crossing **all 57 Apple HIG Component guidelines** with **Neobrutalism.com** and **BoldKit.dev**.

---

## Layer 2: Macro-Thematic Group Analysis

### 1. Component Archetypes: Native Apple vs Web Brutalism
Apple organizes UI into 8 functional categories (Content, Layout, Menus, Navigation, Presentation, Selection/Input, Status, System Experiences). In the React/Tailwind ecosystem, both Neobrutalism and BoldKit adhere to Shadcn component architectures, but dramatically amplify physical affordance:
- **Apple Components**: Defer to content, using borderless tinted fills, subtle radius curves, dynamic SF Symbols, and translucency.
- **Brutalist Components**: Celebrate the container itself. Every button, menu, input, and card has an explicit bounding stroke (2px or 3px solid black), a sharp drop shadow, and high tactile feedback.

### 2. Interaction Ergonomics: Springs vs Rigid Shadows
On user interaction:
- Apple controls scale slightly down or brighten smoothly via fluid spring physics.
- Brutalist controls mechanically translate **into their drop shadow** (`hover:translate-x-[4px] hover:translate-y-[4px] active:shadow-none`), creating a physical tactile click resembling arcade machine push-buttons.

---

## Layer 3: 57 Individual Tripartite Technical Cards

### Subcategory: Content (4 items)

#### 3.1 `charts.md` — Charts
> **Apple Guideline Summary**: Organize data in a chart to communicate information with clarity and visual appeal.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/charts.md`](../../apple_design/skill/references/hig/charts.md) |
| **Neobrutalism File(s)** | `chart.tsx (Recharts)` |
| **BoldKit File(s)** | `ui/chart/* (14 chart types)` |
| **Common Ground** | Data visualization and metrics |
| **Particularities & Divergences** | Apple: Apple Charts framework; Brutalist: Recharts with thick strokes, high-contrast toolbars, and export |

**Web / React Implementation Recipe**:
- Import `@/components/ui/charts` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.2 `image-views.md` — Image Views
> **Apple Guideline Summary**: An image view displays a single image — or in some cases, an animated sequence of images — on a transparent or opaque background.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/image-views.md`](../../apple_design/skill/references/hig/image-views.md) |
| **Neobrutalism File(s)** | `image-card.tsx` |
| **BoldKit File(s)** | `card.tsx` |
| **Common Ground** | Image rendering container |
| **Particularities & Divergences** | Apple: aspect-fit image container; Neobrutalism: image-card with brutalist caption |

**Web / React Implementation Recipe**:
- Import `@/components/ui/image-views` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.3 `text-views.md` — Text Views
> **Apple Guideline Summary**: A text view displays multiline, styled text content, which can optionally be editable.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/text-views.md`](../../apple_design/skill/references/hig/text-views.md) |
| **Neobrutalism File(s)** | `textarea.tsx` |
| **BoldKit File(s)** | `textarea.tsx` |
| **Common Ground** | Multi-line text entry |
| **Particularities & Divergences** | Apple: inset scrollable view; Brutalist: bordered container with hard shadow |

**Web / React Implementation Recipe**:
- Import `@/components/ui/text-views` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.4 `web-views.md` — Web Views
> **Apple Guideline Summary**: A web view loads and displays rich web content, such as embedded HTML and websites, directly within your app.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/web-views.md`](../../apple_design/skill/references/hig/web-views.md) |
| **Neobrutalism File(s)** | `card.tsx (composed)` |
| **BoldKit File(s)** | `card.tsx (composed)` |
| **Common Ground** | Embedded web content container |
| **Particularities & Divergences** | Apple: WKWebView; Brutalist: bordered iframe wrapper |

**Web / React Implementation Recipe**:
- Import `@/components/ui/web-views` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

### Subcategory: Layout and Organization (9 items)

#### 3.5 `boxes.md` — Boxes
> **Apple Guideline Summary**: A box creates a visually distinct group of logically related information and components.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/boxes.md`](../../apple_design/skill/references/hig/boxes.md) |
| **Neobrutalism File(s)** | `card.tsx` |
| **BoldKit File(s)** | `card.tsx` |
| **Common Ground** | Visual framing of related items |
| **Particularities & Divergences** | Apple: macOS NSBox frame; Brutalist: 2px/3px bordered card container |

**Web / React Implementation Recipe**:
- Import `@/components/ui/boxes` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.6 `collections.md` — Collections
> **Apple Guideline Summary**: A collection manages an ordered set of content and presents it in a customizable and highly visual layout.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/collections.md`](../../apple_design/skill/references/hig/collections.md) |
| **Neobrutalism File(s)** | `carousel.tsx / card.tsx` |
| **BoldKit File(s)** | `bento-grid.tsx` |
| **Common Ground** | Multi-item grid or collection layouts |
| **Particularities & Divergences** | Apple: UICollectionView grid; BoldKit: bento-grid marketing block |

**Web / React Implementation Recipe**:
- Import `@/components/ui/collections` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.7 `column-views.md` — Column Views
> **Apple Guideline Summary**: A column view — also called a browser — lets people view and navigate a data hierarchy using a series of vertical columns.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/column-views.md`](../../apple_design/skill/references/hig/column-views.md) |
| **Neobrutalism File(s)** | `resizable.tsx` |
| **BoldKit File(s)** | `resizable.tsx` |
| **Common Ground** | Finder-style hierarchical column browser |
| **Particularities & Divergences** | Apple: multi-column browser; Brutalist: resizable panels |

**Web / React Implementation Recipe**:
- Import `@/components/ui/column-views` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.8 `disclosure-controls.md` — Disclosure Controls
> **Apple Guideline Summary**: Disclosure controls reveal and hide information and functionality related to specific controls or views.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/disclosure-controls.md`](../../apple_design/skill/references/hig/disclosure-controls.md) |
| **Neobrutalism File(s)** | `collapsible.tsx / accordion.tsx` |
| **BoldKit File(s)** | `collapsible.tsx / accordion.tsx` |
| **Common Ground** | Progressive disclosure disclosure toggle |
| **Particularities & Divergences** | Apple: rotating chevron disclosure; Brutalist: bordered accordion with hard shadow |

**Web / React Implementation Recipe**:
- Import `@/components/ui/disclosure-controls` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.9 `labels.md` — Labels
> **Apple Guideline Summary**: A label is a static piece of text that people can read and often copy, but not edit.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/labels.md`](../../apple_design/skill/references/hig/labels.md) |
| **Neobrutalism File(s)** | `label.tsx` |
| **BoldKit File(s)** | `label.tsx` |
| **Common Ground** | Accessible text identifying an element |
| **Particularities & Divergences** | Apple: San Francisco label; Brutalist: bold uppercase tracking font |

**Web / React Implementation Recipe**:
- Import `@/components/ui/labels` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.10 `lists-and-tables.md` — Lists And Tables
> **Apple Guideline Summary**: Lists and tables present data in one or more columns of rows.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/lists-and-tables.md`](../../apple_design/skill/references/hig/lists-and-tables.md) |
| **Neobrutalism File(s)** | `table.tsx / data-table.md` |
| **BoldKit File(s)** | `table.tsx / data-table.tsx` |
| **Common Ground** | Tabular and listed data presentation |
| **Particularities & Divergences** | Apple: grouped inset rounded list; Brutalist: high-contrast bordered grid with striped rows |

**Web / React Implementation Recipe**:
- Import `@/components/ui/lists-and-tables` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.11 `outline-views.md` — Outline Views
> **Apple Guideline Summary**: An outline view presents hierarchical data in a scrolling list of cells that are organized into columns and rows.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/outline-views.md`](../../apple_design/skill/references/hig/outline-views.md) |
| **Neobrutalism File(s)** | `accordion.tsx` |
| **BoldKit File(s)** | `tree-view.tsx` |
| **Common Ground** | Hierarchical expandable tree structure |
| **Particularities & Divergences** | Apple: disclosure triangle outline; BoldKit: tree-view component |

**Web / React Implementation Recipe**:
- Import `@/components/ui/outline-views` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.12 `split-views.md` — Split Views
> **Apple Guideline Summary**: A split view manages the presentation of multiple adjacent panes of content, each of which can contain a variety of components, including tables, collections, images, and custom views.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/split-views.md`](../../apple_design/skill/references/hig/split-views.md) |
| **Neobrutalism File(s)** | `resizable.tsx` |
| **BoldKit File(s)** | `resizable.tsx` |
| **Common Ground** | Multi-column master-detail layout |
| **Particularities & Divergences** | Apple: fluid pane resizing; Brutalist: react-resizable-panels with brutalist handle |

**Web / React Implementation Recipe**:
- Import `@/components/ui/split-views` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.13 `tab-views.md` — Tab Views
> **Apple Guideline Summary**: A tab view presents multiple mutually exclusive panes of content in the same area, which people can switch between using a tabbed control.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/tab-views.md`](../../apple_design/skill/references/hig/tab-views.md) |
| **Neobrutalism File(s)** | `tabs.tsx` |
| **BoldKit File(s)** | `tabs.tsx` |
| **Common Ground** | Section switching within views |
| **Particularities & Divergences** | Apple: segmented tab control; Brutalist: high-contrast bordered tabs |

**Web / React Implementation Recipe**:
- Import `@/components/ui/tab-views` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

### Subcategory: Menus and Actions (11 items)

#### 3.14 `activity-views.md` — Activity Views
> **Apple Guideline Summary**: An activity view — often called a share sheet — presents a range of tasks that people can perform in the current context.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/activity-views.md`](../../apple_design/skill/references/hig/activity-views.md) |
| **Neobrutalism File(s)** | `popover + button` |
| **BoldKit File(s)** | `button-group.tsx` |
| **Common Ground** | System share sheet |
| **Particularities & Divergences** | Apple: native iOS/macOS sharing sheet; Brutalist: web share API trigger or social button group |

**Web / React Implementation Recipe**:
- Import `@/components/ui/activity-views` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.15 `buttons.md` — Buttons
> **Apple Guideline Summary**: A button initiates an instantaneous action.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/buttons.md`](../../apple_design/skill/references/hig/buttons.md) |
| **Neobrutalism File(s)** | `button.tsx` |
| **BoldKit File(s)** | `button.tsx` |
| **Common Ground** | Interactive primary/secondary triggers |
| **Particularities & Divergences** | Apple: tinted pill / fluid springs; Neo: 2px flat stroke; BoldKit: 3px stroke + 4px hard shadow + CSS animations |

**Web / React Implementation Recipe**:
- Import `@/components/ui/buttons` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.16 `context-menus.md` — Context Menus
> **Apple Guideline Summary**: A context menu provides access to functionality that’s directly related to an item, without cluttering the interface.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/context-menus.md`](../../apple_design/skill/references/hig/context-menus.md) |
| **Neobrutalism File(s)** | `context-menu.tsx` |
| **BoldKit File(s)** | `context-menu.tsx` |
| **Common Ground** | Right-click or long-press contextual actions |
| **Particularities & Divergences** | Apple: preview card + menu list; Brutalist: hard-shadow menu |

**Web / React Implementation Recipe**:
- Import `@/components/ui/context-menus` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.17 `dock-menus.md` — Dock Menus
> **Apple Guideline Summary**: On a Mac, people can secondary click an app’s or game’s icon in the Dock to reveal a Dock menu, which presents both system-provided and custom items.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/dock-menus.md`](../../apple_design/skill/references/hig/dock-menus.md) |
| **Neobrutalism File(s)** | `context-menu.tsx` |
| **BoldKit File(s)** | `context-menu.tsx` |
| **Common Ground** | Desktop launch icon menu |
| **Particularities & Divergences** | Apple: macOS Dock popup; Brutalist: right-click context menu |

**Web / React Implementation Recipe**:
- Import `@/components/ui/dock-menus` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.18 `edit-menus.md` — Edit Menus
> **Apple Guideline Summary**: An edit menu lets people make changes to selected content in the current view, in addition to offering related commands like Copy, Select, Translate, and Look Up.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/edit-menus.md`](../../apple_design/skill/references/hig/edit-menus.md) |
| **Neobrutalism File(s)** | `context-menu.tsx` |
| **BoldKit File(s)** | `context-menu.tsx` |
| **Common Ground** | Cut/copy/paste selection menu |
| **Particularities & Divergences** | Apple: black pill floating menu; Brutalist: bordered command palette |

**Web / React Implementation Recipe**:
- Import `@/components/ui/edit-menus` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.19 `home-screen-quick-actions.md` — Home Screen Quick Actions
> **Apple Guideline Summary**: Home Screen quick actions give people a way to perform app-specific actions from the Home Screen.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/home-screen-quick-actions.md`](../../apple_design/skill/references/hig/home-screen-quick-actions.md) |
| **Neobrutalism File(s)** | `dropdown-menu.tsx` |
| **BoldKit File(s)** | `dropdown-menu.tsx` |
| **Common Ground** | App icon long-press shortcuts |
| **Particularities & Divergences** | Apple: SpringBoard popup menu; Brutalist: web action shortcuts |

**Web / React Implementation Recipe**:
- Import `@/components/ui/home-screen-quick-actions` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.20 `menus.md` — Menus
> **Apple Guideline Summary**: A menu reveals its options when people interact with it, making it a space-efficient way to present commands in your app or game.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/menus.md`](../../apple_design/skill/references/hig/menus.md) |
| **Neobrutalism File(s)** | `dropdown-menu.tsx` |
| **BoldKit File(s)** | `dropdown-menu.tsx` |
| **Common Ground** | Vertical list of commands |
| **Particularities & Divergences** | Apple: rounded blur menu; Brutalist: bordered list with hover fills |

**Web / React Implementation Recipe**:
- Import `@/components/ui/menus` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.21 `pop-up-buttons.md` — Pop Up Buttons
> **Apple Guideline Summary**: A pop-up button displays a menu of mutually exclusive options.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/pop-up-buttons.md`](../../apple_design/skill/references/hig/pop-up-buttons.md) |
| **Neobrutalism File(s)** | `select.tsx` |
| **BoldKit File(s)** | `select.tsx` |
| **Common Ground** | Single-selection trigger menus |
| **Particularities & Divergences** | Apple: native iOS picker / macOS menu; Brutalist: Radix/Base UI custom popover |

**Web / React Implementation Recipe**:
- Import `@/components/ui/pop-up-buttons` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.22 `pull-down-buttons.md` — Pull Down Buttons
> **Apple Guideline Summary**: A pull-down button displays a menu of items or actions that directly relate to the button’s purpose.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/pull-down-buttons.md`](../../apple_design/skill/references/hig/pull-down-buttons.md) |
| **Neobrutalism File(s)** | `dropdown-menu.tsx` |
| **BoldKit File(s)** | `dropdown-menu.tsx` |
| **Common Ground** | Action menus attached to button triggers |
| **Particularities & Divergences** | Apple: native popup list; Brutalist: hard-shadow menu items with borders |

**Web / React Implementation Recipe**:
- Import `@/components/ui/pull-down-buttons` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.23 `the-menu-bar.md` — The Menu Bar
> **Apple Guideline Summary**: On a Mac or an iPad, the menu bar at the top of the screen displays the top-level menus in your app or game.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/the-menu-bar.md`](../../apple_design/skill/references/hig/the-menu-bar.md) |
| **Neobrutalism File(s)** | `menubar.tsx` |
| **BoldKit File(s)** | `menubar.tsx` |
| **Common Ground** | Desktop application menu bar |
| **Particularities & Divergences** | Apple: systemwide top menu bar; Brutalist: in-window brutalist menubar |

**Web / React Implementation Recipe**:
- Import `@/components/ui/the-menu-bar` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.24 `toolbars.md` — Toolbars
> **Apple Guideline Summary**: A toolbar provides convenient access to frequently used commands, controls, navigation, and search.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/toolbars.md`](../../apple_design/skill/references/hig/toolbars.md) |
| **Neobrutalism File(s)** | `button-group.tsx` |
| **BoldKit File(s)** | `chart-toolbar.tsx / button-group.tsx` |
| **Common Ground** | Action controls at top or bottom |
| **Particularities & Divergences** | Apple: subtle borderless icons in bar; Brutalist: united bordered unit with hard shadow |

**Web / React Implementation Recipe**:
- Import `@/components/ui/toolbars` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

### Subcategory: Navigation and Search (5 items)

#### 3.25 `path-controls.md` — Path Controls
> **Apple Guideline Summary**: A path control shows the file system path of a selected file or folder.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/path-controls.md`](../../apple_design/skill/references/hig/path-controls.md) |
| **Neobrutalism File(s)** | `breadcrumb.tsx` |
| **BoldKit File(s)** | `breadcrumb.tsx` |
| **Common Ground** | Hierarchical path navigation |
| **Particularities & Divergences** | Apple: clickable breadcrumb trail; Brutalist: uppercase font with slash / arrow dividers |

**Web / React Implementation Recipe**:
- Import `@/components/ui/path-controls` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.26 `search-fields.md` — Search Fields
> **Apple Guideline Summary**: A search field lets people search a collection of content for specific terms they enter.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/search-fields.md`](../../apple_design/skill/references/hig/search-fields.md) |
| **Neobrutalism File(s)** | `input-group.tsx` |
| **BoldKit File(s)** | `input-group.tsx` |
| **Common Ground** | Search input with icon prefix |
| **Particularities & Divergences** | Apple: centered placeholder with glass background; Brutalist: bordered addon group |

**Web / React Implementation Recipe**:
- Import `@/components/ui/search-fields` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.27 `sidebars.md` — Sidebars
> **Apple Guideline Summary**: A sidebar appears on the leading side of a view and lets people navigate between areas of your app or top-level collections of content, like folders and playlists.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/sidebars.md`](../../apple_design/skill/references/hig/sidebars.md) |
| **Neobrutalism File(s)** | `sidebar.tsx` |
| **BoldKit File(s)** | `sidebar.tsx` |
| **Common Ground** | Hierarchical primary navigation |
| **Particularities & Divergences** | Apple: translucent source list; Brutalist: collapsible bordered navigation column |

**Web / React Implementation Recipe**:
- Import `@/components/ui/sidebars` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.28 `tab-bars.md` — Tab Bars
> **Apple Guideline Summary**: A tab bar lets people navigate between top-level sections of your app.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/tab-bars.md`](../../apple_design/skill/references/hig/tab-bars.md) |
| **Neobrutalism File(s)** | `tabs.tsx` |
| **BoldKit File(s)** | `tabs.tsx` |
| **Common Ground** | Primary bottom or top app navigation |
| **Particularities & Divergences** | Apple: bottom translucent bar with SF Symbols; Brutalist: bordered box tabs with contrast fills |

**Web / React Implementation Recipe**:
- Import `@/components/ui/tab-bars` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.29 `token-fields.md` — Token Fields
> **Apple Guideline Summary**: A token field is a type of text field that can convert text into tokens that are easy to select and manipulate.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/token-fields.md`](../../apple_design/skill/references/hig/token-fields.md) |
| **Neobrutalism File(s)** | `badge.tsx (composed)` |
| **BoldKit File(s)** | `tag-input.tsx` |
| **Common Ground** | Multi-token input for tags/recipients |
| **Particularities & Divergences** | Apple: auto-wrapping token bubbles; BoldKit: dedicated tag-input component |

**Web / React Implementation Recipe**:
- Import `@/components/ui/token-fields` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

### Subcategory: Presentation (8 items)

#### 3.30 `action-sheets.md` — Action Sheets
> **Apple Guideline Summary**: An action sheet is a modal view that presents choices related to an action people initiate.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/action-sheets.md`](../../apple_design/skill/references/hig/action-sheets.md) |
| **Neobrutalism File(s)** | `drawer.tsx / sheet.tsx` |
| **BoldKit File(s)** | `drawer.tsx / sheet.tsx` |
| **Common Ground** | Contextual actions sliding from screen edge |
| **Particularities & Divergences** | Apple: rounded sheet anchored to bottom; Brutalist: slide-over drawer with 3px border |

**Web / React Implementation Recipe**:
- Import `@/components/ui/action-sheets` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.31 `alerts.md` — Alerts
> **Apple Guideline Summary**: An alert gives people critical information they need right away.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/alerts.md`](../../apple_design/skill/references/hig/alerts.md) |
| **Neobrutalism File(s)** | `alert-dialog.tsx` |
| **BoldKit File(s)** | `alert-dialog.tsx` |
| **Common Ground** | Critical interruption requiring user confirmation |
| **Particularities & Divergences** | Apple: centered glass dialog with 2 stacked buttons; Brutalist: high-contrast box with hard offset shadow |

**Web / React Implementation Recipe**:
- Import `@/components/ui/alerts` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.32 `page-controls.md` — Page Controls
> **Apple Guideline Summary**: A page control displays a row of indicator images, each of which represents a page in a flat list.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/page-controls.md`](../../apple_design/skill/references/hig/page-controls.md) |
| **Neobrutalism File(s)** | `carousel.tsx (dots)` |
| **BoldKit File(s)** | `carousel.tsx (dots)` |
| **Common Ground** | Dot indicators for horizontal page navigation |
| **Particularities & Divergences** | Apple: small fading white dots; Brutalist: bordered numbered pills or hard dots |

**Web / React Implementation Recipe**:
- Import `@/components/ui/page-controls` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.33 `panels.md` — Panels
> **Apple Guideline Summary**: In a macOS app, a panel typically floats above other open windows providing supplementary controls, options, or information related to the active window or current selection.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/panels.md`](../../apple_design/skill/references/hig/panels.md) |
| **Neobrutalism File(s)** | `card.tsx` |
| **BoldKit File(s)** | `card.tsx / layered-card.tsx` |
| **Common Ground** | Content grouping container |
| **Particularities & Divergences** | Apple: translucent materials; Brutalist: thick 2px/3px bordered cards with offset shadow |

**Web / React Implementation Recipe**:
- Import `@/components/ui/panels` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.34 `popovers.md` — Popovers
> **Apple Guideline Summary**: A popover is a transient view that appears above other content when people click or tap a control or interactive area.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/popovers.md`](../../apple_design/skill/references/hig/popovers.md) |
| **Neobrutalism File(s)** | `popover.tsx` |
| **BoldKit File(s)** | `popover.tsx` |
| **Common Ground** | Transient content anchored to a trigger |
| **Particularities & Divergences** | Apple: arrow-pointed floating glass bubble; Brutalist: sharp-corner bordered card with shadow-shadow |

**Web / React Implementation Recipe**:
- Import `@/components/ui/popovers` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.35 `scroll-views.md` — Scroll Views
> **Apple Guideline Summary**: A scroll view lets people view content that’s larger than the view’s boundaries by moving the content vertically or horizontally.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/scroll-views.md`](../../apple_design/skill/references/hig/scroll-views.md) |
| **Neobrutalism File(s)** | `scroll-area.tsx` |
| **BoldKit File(s)** | `scroll-area.tsx` |
| **Common Ground** | Scrollable viewport with custom scrollbars |
| **Particularities & Divergences** | Apple: invisible fading rubber-band scrollbar; Brutalist: prominent thick black scroll thumb |

**Web / React Implementation Recipe**:
- Import `@/components/ui/scroll-views` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.36 `sheets.md` — Sheets
> **Apple Guideline Summary**: A sheet helps people perform a scoped task that’s closely related to their current context.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/sheets.md`](../../apple_design/skill/references/hig/sheets.md) |
| **Neobrutalism File(s)** | `sheet.tsx` |
| **BoldKit File(s)** | `sheet.tsx` |
| **Common Ground** | Partial-modal content presentation |
| **Particularities & Divergences** | Apple: detent-based card sheet; Brutalist: slide-over panel with hard borders |

**Web / React Implementation Recipe**:
- Import `@/components/ui/sheets` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.37 `windows.md` — Windows
> **Apple Guideline Summary**: A window presents UI views and components in your app or game.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/windows.md`](../../apple_design/skill/references/hig/windows.md) |
| **Neobrutalism File(s)** | `resizable.tsx` |
| **BoldKit File(s)** | `dashboard-layout.tsx` |
| **Common Ground** | Desktop application surfaces |
| **Particularities & Divergences** | Apple: titlebar with traffic light buttons; Brutalist: retro title bar with monospace headers |

**Web / React Implementation Recipe**:
- Import `@/components/ui/windows` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

### Subcategory: Selection and Input (10 items)

#### 3.38 `color-wells.md` — Color Wells
> **Apple Guideline Summary**: A color well lets people adjust the color of text, shapes, guides, and other onscreen elements.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/color-wells.md`](../../apple_design/skill/references/hig/color-wells.md) |
| **Neobrutalism File(s)** | `popover + button` |
| **BoldKit File(s)** | `popover + button` |
| **Common Ground** | Color selection trigger |
| **Particularities & Divergences** | Apple: native OS color picker; Brutalist: swatch grid in hard-bordered popover |

**Web / React Implementation Recipe**:
- Import `@/components/ui/color-wells` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.39 `combo-boxes.md` — Combo Boxes
> **Apple Guideline Summary**: A combo box combines a text field with a pull-down button in a single control.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/combo-boxes.md`](../../apple_design/skill/references/hig/combo-boxes.md) |
| **Neobrutalism File(s)** | `combobox.tsx` |
| **BoldKit File(s)** | `combobox.tsx` |
| **Common Ground** | Text input coupled with search suggestions |
| **Particularities & Divergences** | Apple: editable dropdown list; Brutalist: cmdk + Popover composition |

**Web / React Implementation Recipe**:
- Import `@/components/ui/combo-boxes` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.40 `image-wells.md` — Image Wells
> **Apple Guideline Summary**: An image well is an editable version of an image view.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/image-wells.md`](../../apple_design/skill/references/hig/image-wells.md) |
| **Neobrutalism File(s)** | `image-card.tsx` |
| **BoldKit File(s)** | `card.tsx / dropzone.tsx` |
| **Common Ground** | Image container with drop target |
| **Particularities & Divergences** | Apple: native image container; BoldKit: drag-and-drop dropzone |

**Web / React Implementation Recipe**:
- Import `@/components/ui/image-wells` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.41 `pickers.md` — Pickers
> **Apple Guideline Summary**: A picker displays one or more scrollable lists of distinct values that people can choose from.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/pickers.md`](../../apple_design/skill/references/hig/pickers.md) |
| **Neobrutalism File(s)** | `select.tsx` |
| **BoldKit File(s)** | `select.tsx` |
| **Common Ground** | Item selection from a discrete set |
| **Particularities & Divergences** | Apple: 3D rotating wheel on iOS; Brutalist: dropdown menu list |

**Web / React Implementation Recipe**:
- Import `@/components/ui/pickers` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.42 `segmented-controls.md` — Segmented Controls
> **Apple Guideline Summary**: A segmented control is a linear set of two or more segments, each of which functions as a button.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/segmented-controls.md`](../../apple_design/skill/references/hig/segmented-controls.md) |
| **Neobrutalism File(s)** | `toggle-group.tsx` |
| **BoldKit File(s)** | `toggle-group.tsx` |
| **Common Ground** | Mutually exclusive discrete options |
| **Particularities & Divergences** | Apple: sliding pill background; Brutalist: bordered box tabs with hard shadows |

**Web / React Implementation Recipe**:
- Import `@/components/ui/segmented-controls` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.43 `sliders.md` — Sliders
> **Apple Guideline Summary**: A slider is a horizontal track with a control, called a thumb, that people can adjust between a minimum and maximum value.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/sliders.md`](../../apple_design/skill/references/hig/sliders.md) |
| **Neobrutalism File(s)** | `slider.tsx` |
| **BoldKit File(s)** | `slider.tsx` |
| **Common Ground** | Continuous or stepped value adjustment |
| **Particularities & Divergences** | Apple: thin rounded track; Brutalist: thick track with high-contrast square/circle thumb |

**Web / React Implementation Recipe**:
- Import `@/components/ui/sliders` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.44 `steppers.md` — Steppers
> **Apple Guideline Summary**: A stepper is a two-segment control that people use to increase or decrease an incremental value.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/steppers.md`](../../apple_design/skill/references/hig/steppers.md) |
| **Neobrutalism File(s)** | `number-field (composed)` |
| **BoldKit File(s)** | `stepper.tsx / number-field.tsx` |
| **Common Ground** | Discrete incremental changes |
| **Particularities & Divergences** | Apple: +/- joined rounded control; BoldKit: number-field with 3px buttons |

**Web / React Implementation Recipe**:
- Import `@/components/ui/steppers` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.45 `text-fields.md` — Text Fields
> **Apple Guideline Summary**: A text field is a rectangular area in which people enter or edit small, specific pieces of text.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/text-fields.md`](../../apple_design/skill/references/hig/text-fields.md) |
| **Neobrutalism File(s)** | `input.tsx` |
| **BoldKit File(s)** | `input.tsx` |
| **Common Ground** | Single-line text entry |
| **Particularities & Divergences** | Apple: subtle rounded pill background; Brutalist: thick 2px/3px black border + hard shadow |

**Web / React Implementation Recipe**:
- Import `@/components/ui/text-fields` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.46 `toggles.md` — Toggles
> **Apple Guideline Summary**: A toggle lets people choose between a pair of opposing states, like on and off, using a different appearance to indicate each state.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/toggles.md`](../../apple_design/skill/references/hig/toggles.md) |
| **Neobrutalism File(s)** | `switch.tsx` |
| **BoldKit File(s)** | `switch.tsx` |
| **Common Ground** | Binary on/off states |
| **Particularities & Divergences** | Apple: iOS rounded green toggle switch; Brutalist: rectangular thumb with thick stroke |

**Web / React Implementation Recipe**:
- Import `@/components/ui/toggles` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.47 `virtual-keyboards.md` — Virtual Keyboards
> **Apple Guideline Summary**: On devices without physical keyboards, the system offers various types of virtual keyboards people can use to enter data.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/virtual-keyboards.md`](../../apple_design/skill/references/hig/virtual-keyboards.md) |
| **Neobrutalism File(s)** | `kbd.tsx` |
| **BoldKit File(s)** | `kbd.tsx` |
| **Common Ground** | Keyboard shortcut visualization / entry |
| **Particularities & Divergences** | Apple: software touch keyboard; Brutalist: tactile brutalist keycaps |

**Web / React Implementation Recipe**:
- Import `@/components/ui/virtual-keyboards` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

### Subcategory: Status (3 items)

#### 3.48 `gauges.md` — Gauges
> **Apple Guideline Summary**: A gauge displays a specific numerical value within a range of values.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/gauges.md`](../../apple_design/skill/references/hig/gauges.md) |
| **Neobrutalism File(s)** | `progress.tsx (composed)` |
| **BoldKit File(s)** | `gaugechart.tsx` |
| **Common Ground** | Metered value visualization |
| **Particularities & Divergences** | Apple: watchOS/iOS circular gauge; BoldKit: speedometer-style gauge chart with zones |

**Web / React Implementation Recipe**:
- Import `@/components/ui/gauges` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.49 `progress-indicators.md` — Progress Indicators
> **Apple Guideline Summary**: Progress indicators let people know that your app isn’t stalled while it loads content or performs lengthy operations.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/progress-indicators.md`](../../apple_design/skill/references/hig/progress-indicators.md) |
| **Neobrutalism File(s)** | `progress.tsx / spinner.tsx` |
| **BoldKit File(s)** | `progress.tsx / spinner.tsx / math-curve-progress.tsx` |
| **Common Ground** | Task progress visualization |
| **Particularities & Divergences** | Apple: thin blue bar or native circular spinner; Brutalist: thick border bar with hatched or solid fill |

**Web / React Implementation Recipe**:
- Import `@/components/ui/progress-indicators` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.50 `rating-indicators.md` — Rating Indicators
> **Apple Guideline Summary**: A rating indicator uses a series of horizontally arranged graphical symbols — by default, stars — to communicate a ranking level.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/rating-indicators.md`](../../apple_design/skill/references/hig/rating-indicators.md) |
| **Neobrutalism File(s)** | `badge.tsx (composed)` |
| **BoldKit File(s)** | `rating.tsx` |
| **Common Ground** | Star or numeric rating displays |
| **Particularities & Divergences** | Apple: 5-star display; BoldKit: interactive half-star rating selector |

**Web / React Implementation Recipe**:
- Import `@/components/ui/rating-indicators` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

### Subcategory: System Experiences (7 items)

#### 3.51 `app-shortcuts.md` — App Shortcuts
> **Apple Guideline Summary**: An App Shortcut gives people access to your app’s key functions or content throughout the system.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/app-shortcuts.md`](../../apple_design/skill/references/hig/app-shortcuts.md) |
| **Neobrutalism File(s)** | `kbd.tsx / command.tsx` |
| **BoldKit File(s)** | `command.tsx` |
| **Common Ground** | System and app shortcut execution |
| **Particularities & Divergences** | Apple: Shortcuts app integration; Brutalist: command palette (`cmdk`) |

**Web / React Implementation Recipe**:
- Import `@/components/ui/app-shortcuts` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.52 `controls.md` — Controls
> **Apple Guideline Summary**: A control provides quick access to a feature of your app from Control Center, the Lock Screen, or the Action button.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/controls.md`](../../apple_design/skill/references/hig/controls.md) |
| **Neobrutalism File(s)** | `button.tsx / toggle.tsx` |
| **BoldKit File(s)** | `button.tsx / switch.tsx` |
| **Common Ground** | Control Center and Lock Screen action controls |
| **Particularities & Divergences** | Apple: circular widget controls; Brutalist: brutalist button group |

**Web / React Implementation Recipe**:
- Import `@/components/ui/controls` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.53 `live-activities.md` — Live Activities
> **Apple Guideline Summary**: A Live Activity lets people track the progress of an activity, event, or task at a glance.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/live-activities.md`](../../apple_design/skill/references/hig/live-activities.md) |
| **Neobrutalism File(s)** | `marker.tsx / bubble.tsx` |
| **BoldKit File(s)** | `statcard.tsx / visitors.tsx` |
| **Common Ground** | Real-time glanceable updates |
| **Particularities & Divergences** | Apple: Dynamic Island live state; Brutalist: live visitor badge or marker |

**Web / React Implementation Recipe**:
- Import `@/components/ui/live-activities` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.54 `notifications.md` — Notifications
> **Apple Guideline Summary**: A notification gives people timely, high-value information they can understand at a glance.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/notifications.md`](../../apple_design/skill/references/hig/notifications.md) |
| **Neobrutalism File(s)** | `toast.tsx` |
| **BoldKit File(s)** | `toast.tsx / sonner.tsx` |
| **Common Ground** | System and in-app alerts |
| **Particularities & Divergences** | Apple: banner alerts with actions; Brutalist: paper-stack toasts or sonner notifications |

**Web / React Implementation Recipe**:
- Import `@/components/ui/notifications` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.55 `snippets.md` — Snippets
> **Apple Guideline Summary**: When someone performs a task with Siri or an App Shortcut, a snippet shows the result or asks for confirmation.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/snippets.md`](../../apple_design/skill/references/hig/snippets.md) |
| **Neobrutalism File(s)** | `card.tsx` |
| **BoldKit File(s)** | `card.tsx` |
| **Common Ground** | Siri result cards |
| **Particularities & Divergences** | Apple: Siri glanceable card; Brutalist: compact brutalist card |

**Web / React Implementation Recipe**:
- Import `@/components/ui/snippets` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.56 `status-bars.md` — Status Bars
> **Apple Guideline Summary**: A status bar appears along the upper edge of the screen and displays information about the device’s current state, like the time, cellular carrier, and battery level.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/status-bars.md`](../../apple_design/skill/references/hig/status-bars.md) |
| **Neobrutalism File(s)** | `badge.tsx` |
| **BoldKit File(s)** | `badge.tsx` |
| **Common Ground** | System indicators at top of screen |
| **Particularities & Divergences** | Apple: iOS status bar; Brutalist: header status bar |

**Web / React Implementation Recipe**:
- Import `@/components/ui/status-bars` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---

#### 3.57 `widgets.md` — Widgets
> **Apple Guideline Summary**: A widget provides quick access to essential information and focused interactions from your app or game in additional contexts.

| Dimension | Technical Detail |
| :--- | :--- |
| **Apple HIG Reference** | [`references/hig/widgets.md`](../../apple_design/skill/references/hig/widgets.md) |
| **Neobrutalism File(s)** | `card.tsx` |
| **BoldKit File(s)** | `statcard.tsx / bento-grid.tsx` |
| **Common Ground** | Glanceable home screen widgets |
| **Particularities & Divergences** | Apple: rounded widget families (small, medium, large); BoldKit: statcard and bento cells |

**Web / React Implementation Recipe**:
- Import `@/components/ui/widgets` and ensure proper border/shadow styling (`border-2 border-border shadow-shadow` for Neobrutalism or `border-3 border-foreground shadow-[4px_4px_0px_#000]` for BoldKit).

---
