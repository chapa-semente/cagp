# Paridade Total Chromium & Safari: Experiência Apple Idêntica 1:1

A meta-skill **`apple-impeccable`** rejeita a filosofia de "degradação graciosa" e "fallbacks simplificados". O objetivo absoluto é entregar **paridade idêntica 1:1 de todas as features, materiais, proporções tipográficas e sensação tátil da Apple** tanto no **Google Chrome / Chromium-based** (Chrome, Edge, Brave, Android Chrome, WebView) quanto no **Apple Safari** (WebKit no iOS, iPadOS e macOS).

Nenhum usuário deve receber uma experiência empobrecida ou visualmente distinta em função do motor de renderização.

---

## 1. Materiais e Liquid Glass com Paridade Óptica

O acabamento característico de vidro acetinado translúcido da Apple depende de desfoque de fundo em tempo real, saturação cromática e reflexos especulares de luz.

### 1.1 Regra dos Prefixos Duplos Obrigatórios
O Safari WebKit exige o prefixo `-webkit-`, enquanto o Chromium exige a versão padrão. Ambos devem ser declarados com valores rigorosamente idênticos:

```css
.apple-liquid-glass {
  /* Fundo translúcido com token semântico do projeto (75% a 85% opacidade) */
  background-color: color-mix(in srgb, var(--app-surface-canvas) 80%, transparent);
  
  /* Desfoque e realce cromático idênticos em WebKit e Chromium */
  -webkit-backdrop-filter: blur(20px) saturate(190%) contrast(105%);
  backdrop-filter: blur(20px) saturate(190%) contrast(105%);
  
  /* Borda hairline de precisão ótica (0.5px real) */
  border: 0.5px solid color-mix(in srgb, var(--app-border-hairline) 65%, transparent);
  
  /* Reflexo especular sutil na borda superior e sombra difusa inferior */
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.22),
    0 8px 32px 0 rgba(0, 0, 0, 0.08);
}
```

### 1.2 Solução do Bug de Composição no Chromium (Flicker & Bleed)
No Chromium, elementos com `backdrop-filter` combinados a `border-radius` podem sofrer artefatos visuais ou vazamento de pixels durante animações ou rolagem. A paridade 1:1 é obtida forçando aceleração em camada GPU independente:

```css
.apple-liquid-glass {
  /* Força isolamento de contexto e aceleração de hardware no Chromium */
  isolation: isolate;
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
```

---

## 2. Cantos Contínuos (Squircles) em Ambos os Motores

Os cantos de hardware e software da Apple não utilizam arcos circulares simples (`border-radius` padrão), mas sim **curvatura contínua** (superelipses Lamé de grau $n \approx 4-5$), onde a taxa de curvatura inicia suavemente em zero, atinge o pico e retorna suavemente.

> [!WARNING]
> **Nunca use caminhos CSS `path('M 0,20 ...')` com pixels fixos em `clip-path`**, pois eles não redimensionam com o container e cortam elementos de dimensões diferentes de 100x100px.

### 2.1 Técnica A: SVG Superellipse Responsivo (Universal 1:1)
Para componentes que devem escalar perfeitamente a qualquer dimensão (avatares, cartões, botões) mantendo a superelipse matemática idêntica no Chromium e Safari, utilize `<clipPath clipPathUnits="objectBoundingBox">` com coordenadas normalizadas de `0` a `1`:

```html
<!-- SVG invisível injetado no DOM uma única vez (ex: BaseLayout) -->
<svg width="0" height="0" class="sr-only" aria-hidden="true" focusable="false">
  <defs>
    <clipPath id="apple-squircle-clip" clipPathUnits="objectBoundingBox">
      <path d="M 0,0.5 C 0,0.12 0.12,0 0.5,0 C 0.88,0 1,0.12 1,0.5 C 1,0.88 0.88,1 0.5,1 C 0.12,1 0,0.88 0,0.5 Z" />
    </clipPath>
  </defs>
</svg>
```

Aplicação em CSS:
```css
.apple-squircle-responsive {
  -webkit-clip-path: url(#apple-squircle-clip);
  clip-path: url(#apple-squircle-clip);
}
```

### 2.2 Técnica B: CSS Paint API (Houdini) no Chromium + `corner-shape` no Safari
Para containers de proporções arbitrárias com raio de canto fixo (ex: 20px contínuos em um card de 400x150px):

```css
.apple-squircle-fixed {
  border-radius: var(--squircle-radius, 20px);
  /* Safari TP & Especificação CSS Rounding 4 */
  corner-shape: squircle;
}

/* No Chromium (que suporta CSS Paint API desde Chrome 65): */
@supports (background: paint(squircle)) {
  .apple-squircle-fixed {
    --squircle-radius: 20px;
    --squircle-smooth: 1; /* Curvatura contínua Apple */
    mask-image: paint(squircle);
    -webkit-mask-image: paint(squircle);
  }
}
```

### 2.3 Regra de Concentricidade Proporcional
Seja no Safari ou no Chromium, elementos aninhados devem respeitar a fórmula física dos cantos concêntricos:
$$\text{raio\_interno} = \max(0, \text{raio\_externo} - \text{padding})$$

---

## 3. Física de Movimento, Feedback Tátil e Momentum Scrolling

A física Apple reproduz a inércia, elasticidade e amortecimento do mundo real.

### 3.1 Molas Parametrizadas (Spring Curves)
As funções Bézier devem reproduzir as molas do framework SwiftUI/UIKit:

```css
:root {
  /* Mola Snappy: microinterações, botões, switches (equivalente a response: 0.35s, damping: 0.7) */
  --apple-spring-snappy: cubic-bezier(0.25, 1, 0.5, 1);
  
  /* Mola Smooth: modais, sheets, navegação de páginas (response: 0.5s, damping: 0.85) */
  --apple-spring-smooth: cubic-bezier(0.32, 0.72, 0, 1);
  
  /* Mola Bouncy: alertas, confirmações com leve sobressalto */
  --apple-spring-bouncy: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 3.2 Feedback Elástico `:active` & Remoção de Flash no Chromium
O Google Chrome no Android insere por padrão um flash azul/cinza desagradável (`tap highlight`) que mascara a animação de mola. É obrigatório removê-lo para expor a resposta elástica idêntica ao iOS:

```css
* {
  /* Elimina o highlight padrão do Chromium Mobile para liberar o feedback de mola */
  -webkit-tap-highlight-color: transparent;
}

.apple-interactive {
  transition: 
    transform 0.18s var(--apple-spring-snappy),
    filter 0.15s ease,
    opacity 0.15s ease;
  will-change: transform;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
}

.apple-interactive:active {
  /* Compressão física instantânea com escurecimento de superfície */
  transform: scale(0.965);
  filter: brightness(0.93);
}
```

### 3.3 Momentum Scrolling e Rubber-Banding Reproduzido no Chromium
No Safari iOS, o efeito "rubber-banding" (rebote elástico ao puxar além dos limites do container) é nativo. No Chromium, o comportamento padrão atinge uma parada rígida ou dispara o pull-to-refresh nativo da página.

Para sincronizar o comportamento no Chromium com paridade tátil idêntica:

1. **CSS Base**:
```css
.apple-scroll-container {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain; /* Bloqueia pull-to-refresh do navegador */
  scroll-behavior: smooth;
}
```

2. **Controlador Elástico de Rubber-Banding (Fórmula UIKit da Apple)**:
A Apple calcula a resistência elástica através de decaimento logarítmico assintótico:
$$d = \text{dimensão} \times \left(1.0 - \frac{1.0}{\frac{x \times 0.55}{\text{dimensão}} + 1.0}\right)$$

Implementação leve em TypeScript/JavaScript para contêineres de rolagem no Chromium:
```typescript
export function attachAppleRubberBand(el: HTMLElement) {
  let startY = 0;
  let isAtTop = false;
  let isAtBottom = false;

  el.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
    isAtTop = el.scrollTop <= 0;
    isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    el.style.transition = 'none';
  }, { passive: true });

  el.addEventListener('touchmove', (e) => {
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    if ((isAtTop && deltaY > 0) || (isAtBottom && deltaY < 0)) {
      // Aplica a fórmula matemática exata do UIKit da Apple
      const dimension = el.clientHeight || 400;
      const x = Math.abs(deltaY);
      const rubberDistance = dimension * (1.0 - (1.0 / ((x * 0.55 / dimension) + 1.0)));
      const finalY = deltaY > 0 ? rubberDistance : -rubberDistance;
      el.style.transform = `translateY(${finalY}px)`;
    }
  }, { passive: true });

  const resetSpring = () => {
    el.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
    el.style.transform = 'translateY(0px)';
  };

  el.addEventListener('touchend', resetSpring, { passive: true });
  el.addEventListener('touchcancel', resetSpring, { passive: true });
}
```

---

## 4. Viewport Dinâmica (`dvh`, `svh`, `lvh`) e Safe Areas Hardware-Aware

As interfaces Apple interagem diretamente com a Dynamic Island, entalhes de tela (notch) e a barra de gestos inferior do sistema operacional.

### 4.1 Unidades de Viewport Dinâmica: Quando usar `dvh`, `svh` e `lvh`
O antigo `100vh` é estático e quebra tanto no Safari quanto no Chrome mobile quando as barras de navegação se retraem ou se expandem. As novas unidades de viewport resolvem a paridade:

| Unidade | Definição | Caso de Uso Mandatório |
| :--- | :--- | :--- |
| **`dvh`** (*Dynamic*) | Altura dinâmica em tempo real conforme as barras do browser se movem. | Layouts de tela cheia (`min-h-dvh`), páginas principais, containers de aplicação. |
| **`svh`** (*Small*) | Altura fixa considerando as barras do navegador **totalmente visíveis**. | **Modais, Bottom Sheets e Drawers**. Impede que o modal salte de tamanho enquanto o teclado virtual ou as barras se alternam. |
| **`lvh`** (*Large*) | Altura considerando as barras **totalmente retraídas**. | Backgrounds imersivos, telas de splash e ilustrações full-bleed. |

```css
/* Layout da aplicação */
.apple-app-root {
  min-height: 100dvh;
}

/* Modais e painéis suspensos (Sheets) - Devem usar svh para estabilidade */
.apple-bottom-sheet {
  max-height: calc(100svh - env(safe-area-inset-top) - 16px);
}
```

### 4.2 Safe Area Insets, Dynamic Island e Entalhes de Tela
A meta tag HTML deve declarar obrigatoriamente `viewport-fit=cover`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

Dimensões físicas e adaptação em CSS:
- **Dynamic Island (iPhone 14/15/16 Pro)**: Ocupa até 59px de Safe Area superior.
- **Notch Tradicional (iPhone X a 13)**: Ocupa 44px a 47px.
- **Camera Cutouts Android / Chromium**: Varia de 24px a 40px no topo.
- **Home Indicator / Barra de Gestos**: Ocupa 34px na base no iOS e 16px a 24px no Android.

```css
.apple-top-nav {
  position: sticky;
  top: 0;
  /* Acomoda Dynamic Island / Entalhe com margem mínima de respiro */
  padding-top: max(12px, env(safe-area-inset-top, 12px));
  padding-left: max(16px, env(safe-area-inset-left, 16px));
  padding-right: max(16px, env(safe-area-inset-right, 16px));
}

.apple-bottom-dock {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* Respeita a Home Bar no iOS e navegação por gestos no Android */
  padding-bottom: max(16px, env(safe-area-inset-bottom, 16px));
  padding-left: max(16px, env(safe-area-inset-left, 16px));
  padding-right: max(16px, env(safe-area-inset-right, 16px));
}
```

---

## 5. Suavização de Fontes, Dynamic Type e Renderização Tipográfica 1:1

A tipografia da Apple destaca-se pela nitidez de subpixel e ausência de borrões ou deformações artificiais.

### 5.1 Suavização de Fontes e Prevenção de Faux Bold
```css
html {
  /* Suavização idêntica no Chromium e Safari (WebKit e Blink) */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  
  /* Impede que os navegadores gerem negritos ou itálicos sintéticos deformados */
  font-synthesis: none;
  
  /* Recursos OpenType para máxima legibilidade */
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}
```

### 5.2 Escala de Proporções Dynamic Type
Para reproduzir com precisão a hierarquia ótica da Apple respeitando preferências de tamanho do usuário sem quebras de layout:

| Estilo HIG | Tamanho Nativo | Leading (Altura de Linha) | Peso Semântico | Token CSS Proporcional |
| :--- | :--- | :--- | :--- | :--- |
| **Large Title** | 34pt | 41pt (1.21) | Bold (700) | `clamp(2rem, 1.8rem + 1vw, 2.125rem)` |
| **Title 1** | 28pt | 34pt (1.21) | Bold (700) | `clamp(1.625rem, 1.5rem + 0.6vw, 1.75rem)` |
| **Title 2** | 22pt | 28pt (1.27) | Bold / SemiBold (600) | `clamp(1.25rem, 1.2rem + 0.3vw, 1.375rem)` |
| **Title 3** | 20pt | 25pt (1.25) | SemiBold (600) | `1.25rem` (20px) |
| **Headline** | 17pt | 22pt (1.29) | SemiBold (600) | `1.0625rem` (17px) |
| **Body** | 17pt | 22pt (1.29) | Regular (400) | `1.0625rem` (17px) |
| **Callout** | 16pt | 21pt (1.31) | Regular (400) | `1rem` (16px) |
| **Subhead** | 15pt | 20pt (1.33) | Regular (400) | `0.9375rem` (15px) |
| **Footnote** | 13pt | 18pt (1.38) | Regular (400) | `0.8125rem` (13px) |
| **Caption 1** | 12pt | 16pt (1.33) | Regular (400) | `0.75rem` (12px) |
| **Caption 2** | 11pt | 13pt (1.18) | Medium (500) | `0.6875rem` (11px) |

---

## 6. Feedback Multissensorial: Haptics e Áudio Acústico Sutil

A percepção de solidez e qualidade Apple é essencialmente multissensorial. A combinação de resposta tátil e clique sonoro discreto transmite firmeza física em switches, botões e confirmações.

### 6.1 Módulo de Vibração Háptica (Chromium / Android)
No Chromium rodando em dispositivos móveis Android, utilizamos a `Navigator Vibration API` com impulsos milimétricos:

```typescript
export function triggerHaptic(type: 'light' | 'medium' | 'success' | 'error' = 'light') {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    switch (type) {
      case 'light':
        navigator.vibrate(10); // Impulso ultra-curto de 10ms (Taptic tap)
        break;
      case 'medium':
        navigator.vibrate(18); // Impulso médio
        break;
      case 'success':
        navigator.vibrate([10, 35, 12]); // Pulso duplo de confirmação
        break;
      case 'error':
        navigator.vibrate([25, 45, 25, 45, 25]); // Tremor de alerta
        break;
    }
  }
}
```

### 6.2 Sintetizador de Áudio Acústico Sutil (Chromium & Safari Universal)
No Safari iOS e no Chrome, sons sutis de microinterações podem ser gerados em tempo real através da `Web Audio API` sem necessidade de carregar arquivos de áudio externos (`.mp3` ou `.wav`):

```typescript
// Sintetizador de feedback sonoro sutil da Apple (Web Audio API)
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const subtleFeedbackSound = {
  // Clique mecânico sutil (equivalente ao clique de alternância de switches ou botões táteis)
  tick() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.008);
    
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.008);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.008);
  },

  // Pop suave de confirmação (diálogos, ações concluídas)
  pop() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.025);
    
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  }
};
```

---

## 7. Acessibilidade por Teclado e Foco Visível (`:focus-visible`)

Paridade de design não significa ignorar usuários de teclado no desktop (Chrome no Windows/Linux, Safari no macOS):

```css
/* Oculta anéis de foco ao clicar com mouse/toque */
:focus:not(:focus-visible) {
  outline: none;
}

/* Anel de foco com anel duplo ergonômico estilo macOS Sonoma / iOS 17 */
:focus-visible {
  outline: 2px solid var(--app-accent);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--app-accent) 25%, transparent);
}
```

---

## 8. Checklist de Verificação de Paridade Chromium-Safari

| Item de Verificação | Requisito Mandatório | Impacto de Não Conformidade |
| :--- | :--- | :--- |
| **Prefixos de Blur** | `-webkit-backdrop-filter` E `backdrop-filter` simultâneos e pareados | Vidro translúcido quebra no Safari ou no Chrome |
| **GPU Isolation** | `isolation: isolate` e `transform: translateZ(0)` | Artefatos e cintilação durante scroll no Chromium |
| **Squircles Responsivos** | SVG com `clipPathUnits="objectBoundingBox"` ou CSS Paint API | Elementos cortados a 100x100px ou cantos circulares mecânicos |
| **Highlight de Toque** | `-webkit-tap-highlight-color: transparent` | Flash azul padrão do Chromium encobre animação de mola |
| **Viewport Dinâmica** | `dvh` em containers de tela cheia, `svh` em modais e sheets | Saltos de layout quando a barra de endereços retrai ou expande |
| **Safe Areas** | `env(safe-area-inset-*)` com fallbacks de segurança | Conteúdo oculto sob a Dynamic Island ou barra de gestos |
| **Curvas de Mola** | `cubic-bezier(0.25, 1, 0.5, 1)` | Sensação mecânica/robótica em vez de física elástica Apple |
| **Rubber-Banding** | Controlador com fórmula logarítmica assintótica no Chromium | Parada rígida e sem sensação elástica fora do Safari iOS |
| **Suavização Tipográfica** | `-webkit-font-smoothing: antialiased` e `-moz-osx-font-smoothing: grayscale` | Fontes mais grossas e borradas no Chrome/macOS |
| **Dynamic Type** | Escala proporcional semântica e `font-synthesis: none` | Deformação visual ou quebra de diagramação em textos |
| **Haptics & Som** | Vibração no Android + áudio sutil Web Audio API | Interações silenciosas e sem sensação tátil de clique |
| **Hairline Borders** | `0.5px` ou `1px` com transparência via `color-mix` | Bordas grossas e pesadas que arruinam o acabamento |
