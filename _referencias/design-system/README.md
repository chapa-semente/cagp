# Catálogo Mestre de Referências Neobrutalistas: Neobrutalism.com & BoldKit.dev

Bem-vindo ao repositório unificado de documentação integral em Markdown dos dois maiores ecossistemas de design **Neobrutalism UI** da atualidade.

Esta documentação foi compilada de forma **100% autossuficiente**: cada arquivo contém o código-fonte TypeScript completo, comandos do Shadcn CLI, dependências necessárias e todos os exemplos práticos embutidos inline diretamente no markdown.

---

## Estatísticas Gerais da Coleta

| Métrica | Neobrutalism.com | BoldKit.dev | Total Consolidado |
| :--- | :---: | :---: | :---: |
| **Componentes UI** | **64** | **84** | **148** |
| **Blocos de Layout** | — | **20** | **20** |
| **Efeitos Canvas Interativos** | — | **23** | **23** |
| **Gráficos Brutalistas (Charts)** | Integrado | **14 variações** | **Completo** |
| **Formas SVG & ASCII** | Integrado | **64 shapes** | **64+** |
| **Arquivos Markdown Gerados** | **65** | **108** | **173 arquivos** |

---

## Estrutura de Diretórios

```
_referencias/design-system/
├── README.md                               # Este catálogo mestre
├── neobrutalism/
│   ├── README.md                           # Índice e guia do Neobrutalism.com
│   └── components/                         # 64 arquivos .md autossuficientes
│       ├── accordion.md
│       ├── button.md
│       ├── dialog.md
│       └── ...
└── boldkit/
    ├── README.md                           # Índice e guia do BoldKit.dev
    ├── components/                         # 84 arquivos .md autossuficientes
    │   ├── accordion.md
    │   ├── button.md
    │   └── ...
    ├── blocks/
    │   ├── marketing/                      # 13 blocos de página (Hero, Bento, CTA, etc.)
    │   └── application/                    # 7 blocos de app (Auth, Dashboard, Settings, etc.)
    └── extras/
        ├── canvas-effects.md               # 23 efeitos em HTML5 Canvas
        ├── charts.md                       # Gráficos Recharts neobrutalistas
        └── shapes.md                       # 64 Formas decorativas SVG
```

---

## Matriz Comparativa de Componentes UI

A tabela abaixo cruza todos os componentes disponíveis em ambas as bibliotecas com links diretos para cada documentação:

| Componente | Neobrutalism.com | BoldKit.dev |
| :--- | :---: | :---: |
| **`accordion`** | [✅ Accordion](neobrutalism/components/accordion.md) | [✅ Accordion](boldkit/components/accordion.md) |
| **`alert`** | [✅ Alert](neobrutalism/components/alert.md) | [✅ Alert](boldkit/components/alert.md) |
| **`alert-dialog`** | [✅ Alert Dialog](neobrutalism/components/alert-dialog.md) | [✅ Alert Dialog](boldkit/components/alert-dialog.md) |
| **`ascii-shapes`** | — | [✅ ASCII Shapes](boldkit/components/ascii-shapes.md) |
| **`aspect-ratio`** | — | [✅ Aspect Ratio](boldkit/components/aspect-ratio.md) |
| **`attachment`** | [✅ Attachment](neobrutalism/components/attachment.md) | — |
| **`avatar`** | [✅ Avatar](neobrutalism/components/avatar.md) | [✅ Avatar](boldkit/components/avatar.md) |
| **`badge`** | [✅ Badge](neobrutalism/components/badge.md) | [✅ Badge](boldkit/components/badge.md) |
| **`breadcrumb`** | [✅ Breadcrumb](neobrutalism/components/breadcrumb.md) | [✅ Breadcrumb](boldkit/components/breadcrumb.md) |
| **`bubble`** | [✅ Bubble](neobrutalism/components/bubble.md) | — |
| **`button`** | [✅ Button](neobrutalism/components/button.md) | [✅ Button](boldkit/components/button.md) |
| **`button-group`** | [✅ Button Group](neobrutalism/components/button-group.md) | [✅ Button Group](boldkit/components/button-group.md) |
| **`calendar`** | [✅ Calendar](neobrutalism/components/calendar.md) | [✅ Calendar](boldkit/components/calendar.md) |
| **`card`** | [✅ Card](neobrutalism/components/card.md) | [✅ Card](boldkit/components/card.md) |
| **`carousel`** | [✅ Carousel](neobrutalism/components/carousel.md) | [✅ Carousel](boldkit/components/carousel.md) |
| **`chart`** | [✅ Chart](neobrutalism/components/chart.md) | — |
| **`checkbox`** | [✅ Checkbox](neobrutalism/components/checkbox.md) | [✅ Checkbox](boldkit/components/checkbox.md) |
| **`collapsible`** | [✅ Collapsible](neobrutalism/components/collapsible.md) | [✅ Collapsible](boldkit/components/collapsible.md) |
| **`combobox`** | [✅ Combobox](neobrutalism/components/combobox.md) | [✅ Combobox](boldkit/components/combobox.md) |
| **`command`** | [✅ Command](neobrutalism/components/command.md) | [✅ Command](boldkit/components/command.md) |
| **`context-menu`** | [✅ Context Menu](neobrutalism/components/context-menu.md) | [✅ Context Menu](boldkit/components/context-menu.md) |
| **`data-table`** | [✅ Data Table](neobrutalism/components/data-table.md) | [✅ Data Table](boldkit/components/data-table.md) |
| **`date-picker`** | [✅ Date Picker](neobrutalism/components/date-picker.md) | [✅ Date Picker](boldkit/components/date-picker.md) |
| **`date-range-picker`** | — | [✅ Date Range Picker](boldkit/components/date-range-picker.md) |
| **`dialog`** | [✅ Dialog](neobrutalism/components/dialog.md) | [✅ Dialog](boldkit/components/dialog.md) |
| **`direction`** | [✅ Direction](neobrutalism/components/direction.md) | — |
| **`donutchart`** | — | [✅ DonutChart](boldkit/components/donutchart.md) |
| **`drawer`** | [✅ Drawer](neobrutalism/components/drawer.md) | [✅ Drawer](boldkit/components/drawer.md) |
| **`dropdown-menu`** | [✅ dropdown-menu](neobrutalism/components/dropdown-menu.md) | [✅ Dropdown Menu](boldkit/components/dropdown-menu.md) |
| **`dropzone`** | — | [✅ Dropzone](boldkit/components/dropzone.md) |
| **`empty`** | [✅ Empty](neobrutalism/components/empty.md) | — |
| **`emptystate`** | — | [✅ EmptyState](boldkit/components/emptystate.md) |
| **`error-boundary`** | — | [✅ Error Boundary](boldkit/components/error-boundary.md) |
| **`field`** | [✅ Field](neobrutalism/components/field.md) | [✅ Field](boldkit/components/field.md) |
| **`form`** | [✅ Form](neobrutalism/components/form.md) | — |
| **`gaugechart`** | — | [✅ GaugeChart](boldkit/components/gaugechart.md) |
| **`hover-card`** | [✅ Hover Card](neobrutalism/components/hover-card.md) | [✅ Hover Card](boldkit/components/hover-card.md) |
| **`image-card`** | [✅ Image Card](neobrutalism/components/image-card.md) | — |
| **`input`** | [✅ Input](neobrutalism/components/input.md) | [✅ Input](boldkit/components/input.md) |
| **`input-group`** | [✅ Input Group](neobrutalism/components/input-group.md) | [✅ Input Group](boldkit/components/input-group.md) |
| **`input-otp`** | [✅ Input OTP](neobrutalism/components/input-otp.md) | [✅ Input OTP](boldkit/components/input-otp.md) |
| **`item`** | [✅ Item](neobrutalism/components/item.md) | — |
| **`kbd`** | [✅ Kbd](neobrutalism/components/kbd.md) | [✅ Kbd](boldkit/components/kbd.md) |
| **`label`** | [✅ Label](neobrutalism/components/label.md) | [✅ Label](boldkit/components/label.md) |
| **`layered-card`** | — | [✅ Layered Card](boldkit/components/layered-card.md) |
| **`marker`** | [✅ Marker](neobrutalism/components/marker.md) | — |
| **`marquee`** | [✅ Marquee](neobrutalism/components/marquee.md) | [✅ Marquee](boldkit/components/marquee.md) |
| **`math-curve-background`** | — | [✅ Math Curve Background](boldkit/components/math-curve-background.md) |
| **`math-curve-progress`** | — | [✅ Math Curve Progress](boldkit/components/math-curve-progress.md) |
| **`mathcurveloader`** | — | [✅ MathCurveLoader](boldkit/components/mathcurveloader.md) |
| **`mauthor`** | — | [✅ m.author](boldkit/components/mauthor.md) |
| **`menubar`** | [✅ Menubar](neobrutalism/components/menubar.md) | [✅ Menubar](boldkit/components/menubar.md) |
| **`message`** | [✅ Message](neobrutalism/components/message.md) | — |
| **`message-scroller`** | [✅ Message Scroller](neobrutalism/components/message-scroller.md) | — |
| **`motion`** | — | [✅ Motion](boldkit/components/motion.md) |
| **`multi-step-form`** | — | [✅ Multi-Step Form](boldkit/components/multi-step-form.md) |
| **`native-select`** | [✅ Native Select](neobrutalism/components/native-select.md) | [✅ Native Select](boldkit/components/native-select.md) |
| **`navigation-menu`** | [✅ "Navigation Menu"](neobrutalism/components/navigation-menu.md) | [✅ Navigation Menu](boldkit/components/navigation-menu.md) |
| **`number-field`** | — | [✅ Number Field](boldkit/components/number-field.md) |
| **`pagination`** | [✅ Pagination](neobrutalism/components/pagination.md) | [✅ Pagination](boldkit/components/pagination.md) |
| **`popover`** | [✅ Popover](neobrutalism/components/popover.md) | [✅ Popover](boldkit/components/popover.md) |
| **`progress`** | [✅ Progress](neobrutalism/components/progress.md) | [✅ Progress](boldkit/components/progress.md) |
| **`questionnaire`** | [✅ Questionnaire](neobrutalism/components/questionnaire.md) | [✅ Questionnaire](boldkit/components/questionnaire.md) |
| **`radarchart`** | — | [✅ RadarChart](boldkit/components/radarchart.md) |
| **`radialbarchart`** | — | [✅ RadialBarChart](boldkit/components/radialbarchart.md) |
| **`radio-group`** | [✅ Radio Group](neobrutalism/components/radio-group.md) | [✅ Radio Group](boldkit/components/radio-group.md) |
| **`rating`** | — | [✅ Rating](boldkit/components/rating.md) |
| **`resizable`** | [✅ Resizable](neobrutalism/components/resizable.md) | [✅ Resizable](boldkit/components/resizable.md) |
| **`scroll-area`** | [✅ Scroll Area](neobrutalism/components/scroll-area.md) | [✅ Scroll Area](boldkit/components/scroll-area.md) |
| **`select`** | [✅ Select](neobrutalism/components/select.md) | [✅ Select](boldkit/components/select.md) |
| **`separator`** | — | [✅ Separator](boldkit/components/separator.md) |
| **`sheet`** | [✅ Sheet](neobrutalism/components/sheet.md) | [✅ Sheet](boldkit/components/sheet.md) |
| **`sidebar`** | [✅ Sidebar](neobrutalism/components/sidebar.md) | [✅ Sidebar](boldkit/components/sidebar.md) |
| **`skeleton`** | [✅ Skeleton](neobrutalism/components/skeleton.md) | [✅ Skeleton](boldkit/components/skeleton.md) |
| **`slider`** | [✅ Slider](neobrutalism/components/slider.md) | [✅ Slider](boldkit/components/slider.md) |
| **`sonner`** | — | [✅ Sonner](boldkit/components/sonner.md) |
| **`sparkline`** | — | [✅ Sparkline](boldkit/components/sparkline.md) |
| **`spinner`** | [✅ Spinner](neobrutalism/components/spinner.md) | [✅ Spinner](boldkit/components/spinner.md) |
| **`statcard`** | — | [✅ StatCard](boldkit/components/statcard.md) |
| **`stepper`** | — | [✅ Stepper](boldkit/components/stepper.md) |
| **`sticker`** | — | [✅ Sticker](boldkit/components/sticker.md) |
| **`switch`** | [✅ Switch](neobrutalism/components/switch.md) | [✅ Switch](boldkit/components/switch.md) |
| **`table`** | [✅ Table](neobrutalism/components/table.md) | [✅ Table](boldkit/components/table.md) |
| **`tabs`** | [✅ Tabs](neobrutalism/components/tabs.md) | [✅ Tabs](boldkit/components/tabs.md) |
| **`tag-input`** | — | [✅ Tag Input](boldkit/components/tag-input.md) |
| **`textarea`** | [✅ Textarea](neobrutalism/components/textarea.md) | [✅ Textarea](boldkit/components/textarea.md) |
| **`time-picker`** | — | [✅ Time Picker](boldkit/components/time-picker.md) |
| **`timeline`** | — | [✅ Timeline](boldkit/components/timeline.md) |
| **`toast`** | [✅ Toast](neobrutalism/components/toast.md) | [✅ Toast](boldkit/components/toast.md) |
| **`toggle`** | [✅ Toggle](neobrutalism/components/toggle.md) | [✅ Toggle](boldkit/components/toggle.md) |
| **`toggle-group`** | [✅ Toggle Group](neobrutalism/components/toggle-group.md) | [✅ Toggle Group](boldkit/components/toggle-group.md) |
| **`tooltip`** | [✅ Tooltip](neobrutalism/components/tooltip.md) | [✅ Tooltip](boldkit/components/tooltip.md) |
| **`tour`** | — | [✅ Tour](boldkit/components/tour.md) |
| **`tree-view`** | — | [✅ Tree View](boldkit/components/tree-view.md) |
| **`visitors`** | — | [✅ visitors](boldkit/components/visitors.md) |

---

## Blocos de Layout Prontos (BoldKit)

### Marketing Sections
- [**Bento Grid**](boldkit/blocks/marketing/bento-grid.md) — Asymmetric feature grid with grid-breaking hero cells.
- [**Changelog**](boldkit/blocks/marketing/changelog.md) — Dated release entries / roadmap timeline.
- [**Comparison Table**](boldkit/blocks/marketing/comparison-table.md) — Feature comparison matrix with check/x cells and a highlighted column.
- [**Contact Section**](boldkit/blocks/marketing/contact-section.md) — We'd love to hear from you. Send us a message.
- [**CTA Section**](boldkit/blocks/marketing/cta-section.md) — Join thousands of developers building with BoldKit.
- [**FAQ Section**](boldkit/blocks/marketing/faq-section.md) — Display frequently asked questions with various layouts including accordions, two-column grids, categorized tabs, with contact CTA, and simple lists.
- [**Feature Grid**](boldkit/blocks/marketing/feature-grid.md) — Everything you need to build stunning interfaces.
- [**Footer Section**](boldkit/blocks/marketing/footer-section.md) — Build bold interfaces with neubrutalism design.
- [**Hero Section**](boldkit/blocks/marketing/hero-section.md) — The neubrutalism component library for React and Vue. Bold, raw, beautiful.
- [**Logo Cloud**](boldkit/blocks/marketing/logo-cloud.md) — Display client or partner logos with various layouts including grids, animated marquees, bordered cards, and combined with statistics.
- [**Pricing Section**](boldkit/blocks/marketing/pricing-section.md) — Pricing tiers with a featured plan and an optional checkout summary panel.
- [**Stats Section**](boldkit/blocks/marketing/stats-section.md) — BoldKit powers applications for thousands of companies, from startups to enterprises.
- [**Team Section**](boldkit/blocks/marketing/team-section.md) — The talented individuals behind BoldKit.
- [**Testimonials**](boldkit/blocks/marketing/testimonials.md) — See what industry experts have to say.

### Application Sections
- [**Auth Forms**](boldkit/blocks/application/auth-forms.md) — Authentication forms including login, signup, forgot password, OTP verification, and split layout variants.
- [**Client**](boldkit/blocks/application/client.md) — Invoice and billing components including full invoice documents, compact receipts, summary cards, and list views with status indicators.
- [**Dashboard Layout**](boldkit/blocks/application/dashboard-layout.md) — Application shell with sidebar, stat-card row, a chart, and a data-table.
- [**Error Pages**](boldkit/blocks/application/error-pages.md) — Something unexpected happened. Please try again.
- [**Onboarding Flow**](boldkit/blocks/application/onboarding-flow.md) — User onboarding components including step wizards, welcome screens, profile setup, workspace creation, goal selection, and completion screens.
- [**Settings Page**](boldkit/blocks/application/settings-page.md) — Complete settings page components including profile, notifications, security, appearance, and danger zone sections.

---

## Recursos Extras de Alta Fidelidade

- **[Canvas Effects Animados](boldkit/extras/canvas-effects.md)**: Aurora, MatrixRain, Plasma, CRT, Dither, DotWave, GravityWells e outros 16 efeitos com baixo consumo e suporte a reduced motion.
- **[Gráficos e Estatísticas (Charts)](boldkit/extras/charts.md)**: Toolbars, gráficos de rosca (donut), linhas, barras e áreas com paleta neobrutalista de alto contraste.
- **[Formas SVG e Selos Retrô](boldkit/extras/shapes.md)**: Mais de 64 elementos decorativos, estrelas de 4 a 12 pontas, selos e ASCII art.
