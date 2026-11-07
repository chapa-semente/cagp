# Part 1C: Quadripartite Design Architecture & Anti-Conflict Rules (`00-design-system-specification.md`)

## Executive Summary

The CAGP SuperApp design system synthesizes **four design traditions** into a cohesive visual language tailored for high-contrast student ergonomics, mobile accessibility, and fast rendering in Astro 7 on **GitHub Pages**.

```
       [Neobrutalism.com]                   [BoldKit.dev]
      (Semantic Tokens, 2px/3px,           (Mechanical Tactile Press,
       Hard Offset Shadows)                 Blocks, Canvas Shaders)
                  ↘                             ↙
                   [CAGP UFMG / SEMENTE SUPERAPP]
                  ↗                             ↖
        [Apple Design HIG]                   [Impeccable Engine]
     (Safe-Area, 44pt Touch Targets,       (4 Visitor Modes, Craft Floor,
      Dynamic Type, System Gestures)        Bolder/Quieter Dialing)
```

---

## 1. Visual Hierarchy & The Tetra-Layer Palette

The visual design is grounded in the **Tetra-Layer Theme** defined in `src/styles/neobrutalism.css` and `src/styles/global.css`:

```css
:root {
  /* Geometry & Outlines */
  --radius: 0.75rem;          /* 12px / rounded-xl (Apple Squircle curvature) */
  --border-w: 3px;             /* Bold 3px deep ink stroke */
  --border: #16181d;          /* Deep ink outline */
  --shadow-color: #16181d;

  /* Hard Neobrutalist Offset Shadows (No blur) */
  --shadow-xs: 1px 1px 0 0 var(--shadow-color);
  --shadow-sm: 2px 2px 0 0 var(--shadow-color);
  --shadow: 3px 3px 0 0 var(--shadow-color);
  --shadow-md: 4px 4px 0 0 var(--shadow-color);
  --shadow-lg: 6px 6px 0 0 var(--shadow-color);
  --shadow-xl: 10px 10px 0 1px var(--shadow-color);

  /* Tetra-Layer Official Brand Palette */
  --primary: #5B2A86;                  /* Roxo Semente: Leadership, Vision & Innovation */
  --primary-hover: #4A216E;
  --primary-foreground: #ffffff;

  --accent: #FF8811;                   /* Laranja Germinar: High-Conversion CTAs, Energy & Action */
  --accent-hover: #E07406;
  --accent-foreground: #000000;

  --petrol: #134E4A;                   /* Verde Petróleo: Academic Success, 600h ACG, Estágio Art. 41 & Transparency */
  --petrol-hover: #0F3D3E;
  --petrol-foreground: #ffffff;

  --secondary: #9E2424;                /* Vermelho CAGP/FAFICH: Student Struggle, UFMG Identity & 120-Day Deadlines */
  --secondary-hover: #8B1E2D;
  --secondary-foreground: #ffffff;

  /* Surface & Canvas Tokens */
  --background: #f4f0ea;               /* Paper Cream (Light mode default) */
  --foreground: #16181d;               /* Readable Deep Graphite Ink */
  --card: #ffffff;
  --card-foreground: #16181d;
  --muted: #e7e2d9;
  --muted-foreground: #4a4d57;
}

/* REGRA INVIOLÁVEL: MODO CLARO EXCLUSIVO (LIGHT MODE ONLY)
 * Não há suporte nem alternância para modo escuro (.dark).
 * Toda a identidade gráfica, contraste tátil e legibilidade operam
 * exclusivamente na base Papel Creme (#F4F0EA) com contorno Preto Tinta (#16181D).
 */
```

### Semantic Token Allocation
| Color Token | Hex Code | Role in SuperApp | Example Applications |
| :--- | :--- | :--- | :--- |
| **Roxo Semente** (`--primary`) | `#5B2A86` | Identidade & Liderança | Topbar badges, headers de chapa, links principais, borders ativos |
| **Laranja Germinar** (`--accent`) | `#FF8811` | Ação & Conversão (CTA) | Botões de votação, credenciamento eleitoral, badges de acolhimento |
| **Verde Petróleo** (`--petrol`) | `#134E4A` | Sucesso Acadêmico & Transparência | Barra de progresso das 600h, selo de Estágio Art. 41 aprovado, gráficos do CA |
| **Vermelho CAGP** (`--secondary`) | `#9E2424` | Tradição UFMG & Prazos Críticos | Alertas do ACG Guardian (120 dias), cabeçalho FAFICH, comunicados urgentes |
| **Papel Creme** (`--background`) | `#F4F0EA` | Conforto de Leitura Neobrutalista | Fundo geral da aplicação no modo claro (não ofuscante) |
| **Preto Tinta** (`--border`) | `#16181D` | Afordância Tátil | Traço de 3px em todos os cards, botões, modais e divisores |

---

## 2. Cross-Ecosystem Harmonization Rules

### 1. Mechanical Ergonomics (BoldKit + Neobrutalism)
- **Active State Translation**: Every interactive button or clickable card must translate `2px` down and right on active press to simulate physical depression:
  ```css
  .neo-btn:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 0 var(--border);
  }
  ```
- **3px Uniform Borders**: All interactive containers, inputs, and cards share `border-3 border-border`.
- **12px Continuous Squircle Curvature**: All cards, badges, and modals use `rounded-xl` (12px), aligning Apple's rounded geometry with Neobrutalist line work.

### 2. Adaptive Mobile Ergonomics & Apple HIG Compliance
- **Pointer Media Query Touch Floor (44x44pt)**:
  To eliminate touch targeting errors (*fat-finger taps*) on smartphones without sacrificing compact desktop density, interactive elements enforce a 44pt minimum only on touchscreen hardware:
  ```css
  @media (pointer: coarse) {
    button, a[role="button"], input, select, textarea, [data-interactive="true"] {
      min-height: 44px;
      min-width: 44px;
    }
  }
  @media (pointer: fine) {
    /* Compact desktop density preserved */
    .neo-btn-compact {
      height: 40px; /* h-10 */
    }
  }
  ```
- **Safe-Area Insets**: Global viewport uses `viewport-fit=cover`. Shell islands and `BottomNav.astro` respect `env(safe-area-inset-bottom)`.
- **System Back & Gesture Defense**: Navigation drawers use `vaul` and sheets use Radix Primitives with full touch gesture dismissibility.

### 3. Headless Layer Consolidation (Radix UI)
- To eliminate duplicate event managers and save ~45 KB in gzipped client bundle size on GitHub Pages, the codebase **standardizes exclusively on Radix UI** (`radix-ui`), phasing out `@base-ui/react` and leveraging native HTML `<dialog>` where appropriate.

### 4. Canvas Shaders Performance Guardrail
- Across the 23 BoldKit canvas effects, unthrottled 60fps loops are permitted **only on desktop viewports** with healthy power.
- On mobile viewports (`window.innerWidth < 768px`), battery `< 20%`, or when `navigator.connection?.saveData` is active:
  1. The frame rate is capped strictly at **30fps** (`FRAME_MS_30`), or:
  2. The shader renders a single static brutalist vector frame via `renderStaticFrame()` and cancels the `requestAnimationFrame` loop completely.

### 5. Multiplataforma Delimitada & Política de Descarte Estrito
O projeto é formalmente multiplataforma para **iOS, Android, Tablets, Smartphones e Desktop Genérico** via PWA Web-First, com a seguinte delimitação inegociável de descarte:
- ❌ **Descarte 1: Código e Projetos Nativos Separados**:
  - *Descartados*: Pastas `ios/` (Xcode, Swift, CocoaPods) e `android/` (Android Studio, Gradle, Kotlin).
  - *Justificativa*: A PWA cobre instalação na tela inicial de iOS e Android com ícone nativo, tela de splash e funcionamento offline direto pelo navegador.
- ❌ **Descarte 2: Wrappers Pesados de Desktop (Electron / Tauri)**:
  - *Descartados*: Não é necessário empacotar executáveis `.exe` ou `.dmg` de centenas de megabytes.
  - *Justificativa*: O navegador do estudante (Chrome, Edge, Safari, Firefox) já roda a aplicação com aceleração gráfica completa.
- ✅ **Preservação Integral de Componentes e Primitivas**:
  - Todos os componentes UI, blocos de layout e bibliotecas web essenciais permanecem ativos e implementados no projeto, adaptando-se de forma inteligente entre toque (`pointer: coarse`) e ponteiro fino (`pointer: fine`).

---

## 3. Anti-Conflict Integration with the Impeccable Master Skill

To allow long-running autonomous execution without destructive file overwrites:

1. **`cagp-astro/` as the Canonical Upstream Substrate**:
   - The files in `_referencias/design-system/matrix/cagp-astro/` constitute the pre-established architectural specification.
2. **Hook for `impeccable init`**:
   - When the `impeccable` skill runs `init`, it reads `_referencias/design-system/matrix/cagp-astro/00-design-system-specification.md` and detects that the design system, tokens, and component directories are already registered. It bypasses template scaffolding and reports:
     `"Existing CAGP Astro substrate detected: 91 UI primitives, 15 blocks, Tetra-Layer Semente tokens configured."`
3. **Hook for `impeccable document`**:
   - When `impeccable document` is triggered, it writes component documentation updates into `_referencias/design-system/matrix/cagp-astro/02-ui-components-matrix.md` and `04-features-and-domain-modules.md`, avoiding the creation of duplicate uncoordinated markdown documents in the repository root.
