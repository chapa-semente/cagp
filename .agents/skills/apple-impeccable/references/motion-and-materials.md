# Movimento, Materiais Translúcidos e Resposta Tátil: Paridade 1:1 Chromium & Safari

A sensação de acabamento "nativo" e fluidez tátil observada no ecossistema Apple provém de três forças sincronizadas:
1. **Física de Molas (Spring Motion)** que obedece à inércia, amortecimento e aceleração física real.
2. **Materiais Liquid Glass com Profundidade Óptica**, desfoque em tempo real (`backdrop-filter`), saturação e especularidade idênticos no Chromium e no Safari.
3. **Resposta Multissensorial Tátil**: feedback elástico `:active`, haptic feedback (Vibration API no Chromium/Android), áudio acústico sutil (Web Audio API) e momentum scrolling com overscroll bounce (rubber-banding).

Nenhuma dessas propriedades deve ser simplificada ou degradada: a meta é paridade idêntica 1:1 em qualquer navegador moderno.

---

## 1. Curvas de Movimento e Física de Molas (Springs)

As animações nunca utilizam transições lineares ou curvas robóticas genéricas. A física de molas Apple é calibrada por resposta temporal e taxa de amortecimento:

```css
:root {
  /* Mola Snappy: microinterações, botões, switches, toggles (0.35s / damping: 0.7) */
  --ease-spring-snappy: cubic-bezier(0.25, 1, 0.5, 1);
  
  /* Mola Smooth: transições de modais, sheets, painéis retráteis (0.5s / damping: 0.85) */
  --ease-spring-smooth: cubic-bezier(0.32, 0.72, 0, 1);
  
  /* Curva de desaceleração natural para entradas em cena */
  --ease-out-natural: cubic-bezier(0.16, 1, 0.3, 1);
  
  /* Mola Bouncy: alertas, confirmações e feedback com leve sobressalto */
  --ease-spring-bouncy: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 1.1 Durações Recomendadas por Tipo de Ação
- **Microinterações (hover, active, toggle)**: `120ms` a `180ms`. O feedback deve parecer instantâneo ao dedo.
- **Transições de Componentes Médios (menus, dropdowns, accordions)**: `240ms` a `300ms`.
- **Transições de Telas / Sheets / Diálogos**: `350ms` a `450ms`.

---

## 2. Feedback Tátil no Toque (`:active`), Haptics, Áudio & Momentum

Para que a sensação ao tocar em um dispositivo Android rodando Chrome seja indistinguível de um iPhone no Safari:

### 2.1 Eliminação do Flash do Chromium e Compressão Elástica
O Chromium Mobile exibe por padrão um flash azul/cinza (`tap highlight`) que mascara a física de molas. Deve ser anulado globalmente:

```css
/* Elimina highlight obsoleto e prepara renderização tátil */
* {
  -webkit-tap-highlight-color: transparent;
}

.interactive-tactile {
  transition: 
    transform 0.18s var(--ease-spring-snappy), 
    filter 0.15s ease, 
    background-color 0.15s ease;
  will-change: transform;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
}

/* Estado de compressão física ao pressionar (Apple Spring Feedback) */
.interactive-tactile:active {
  transform: scale(0.965);
  filter: brightness(0.93);
}

/* Variação mais sutil para cartões e áreas grandes */
.interactive-card:active {
  transform: scale(0.985);
  filter: brightness(0.97);
}
```

### 2.2 Haptic Feedback Multissensorial (Chromium & Android)
No Chromium (Android), aciona-se a `Navigator Vibration API` para reproduzir o impulso curto do Taptic Engine da Apple (10ms a 18ms):

```typescript
export function triggerHaptic(type: 'light' | 'medium' | 'success' | 'error' = 'light') {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    switch (type) {
      case 'light':
        navigator.vibrate(10); // Impulso tátil ultra-curto (Taptic tap)
        break;
      case 'medium':
        navigator.vibrate(18); // Impulso tátil médio
        break;
      case 'success':
        navigator.vibrate([10, 35, 12]); // Confirmação em pulso duplo
        break;
      case 'error':
        navigator.vibrate([25, 45, 25, 45, 25]); // Alerta de erro
        break;
    }
  }
}
```

### 2.3 Feedback Sonoro Acústico Sutil (Web Audio API)
Tanto no Safari quanto no Chromium, cliques táteis discretos completam o feedback de botões, switches e conclusões sem carregar assets de som externos:

```typescript
let audioCtx: AudioContext | null = null;

export function playTactileClick(type: 'tick' | 'pop' = 'tick') {
  if (typeof window === 'undefined') return;
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  if (!audioCtx) audioCtx = new AudioContextClass();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const ctx = audioCtx;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  if (type === 'tick') {
    osc.frequency.setValueAtTime(1800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.008);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.008);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.008);
  } else {
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.025);
    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  }
}
```

### 2.4 Momentum Scrolling e Overscroll Bounce (Rubber-Banding) no Chromium
No Safari iOS, o efeito elástico de rolagem é nativo. No Chromium, aplicamos isolamento de rolagem para prevenir pull-to-refresh acidental e integramos o controlador elástico UIKit:

```css
.scrollable-content {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
  scroll-behavior: smooth;
}
```

**Controlador Elástico UIKit para Chromium**:
```typescript
export function enableRubberBand(element: HTMLElement) {
  let startY = 0;
  let atBoundary = false;

  element.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
    const atTop = element.scrollTop <= 0;
    const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
    atBoundary = atTop || atBottom;
    element.style.transition = 'none';
  }, { passive: true });

  element.addEventListener('touchmove', (e) => {
    if (!atBoundary) return;
    const deltaY = e.touches[0].clientY - startY;
    const dim = element.clientHeight || 400;
    // Fórmula assintótica UIKit da Apple
    const rubberY = Math.sign(deltaY) * (dim * (1.0 - (1.0 / ((Math.abs(deltaY) * 0.55 / dim) + 1.0))));
    element.style.transform = `translateY(${rubberY}px)`;
  }, { passive: true });

  const restore = () => {
    element.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
    element.style.transform = 'translateY(0)';
  };

  element.addEventListener('touchend', restore, { passive: true });
  element.addEventListener('touchcancel', restore, { passive: true });
}
```

---

## 3. Materiais Translúcidos: Liquid Glass com Paridade Óptica Total

O Liquid Glass da Apple combina desfoque Gaussiano profundo, supersaturação cromática de fundo e reflexo especular de luz na borda superior.

```css
.material-liquid-glass {
  /* Camada base de cor semântica do projeto (75% a 85% de opacidade) */
  background-color: color-mix(in srgb, var(--app-surface-canvas) 80%, transparent);
  
  /* Paridade obrigatória: duplo prefixo com exatamente os mesmos parâmetros */
  -webkit-backdrop-filter: blur(20px) saturate(190%) contrast(105%);
  backdrop-filter: blur(20px) saturate(190%) contrast(105%);
  
  /* Borda hairline de precisão de 0.5px */
  border: 0.5px solid color-mix(in srgb, var(--app-border-hairline) 65%, transparent);
  
  /* Especularidade óptica: luz incidente no topo e sombra difusa inferior */
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.22),
    0 10px 30px -10px rgba(0, 0, 0, 0.12);

  /* BLINDAGEM DE GPU: Evita bugs de corte de sub-pixel e cintilação no Chromium */
  isolation: isolate;
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
```

### 3.1 Especificações da Borda Hairline de 0.5px
No ecossistema Apple Retina e nas telas AMOLED modernas de alta densidade no Android/Chrome:
- O valor `0.5px` é renderizado diretamente pelo motor de subpixel.
- A cor da borda deve usar `color-mix(in srgb, var(--app-border-hairline) 65%, transparent)` para fundir-se oticamente à translucidez do vidro.

---

## 4. Cantos Contínuos (Squircles Responsivos)

Para evitar cantos circulares mecânicos e garantir a curvatura suave e contínua do hardware Apple sem cortes ou deformações em elementos de qualquer tamanho:

### 4.1 SVG Clip-Path Proporcional (Universal 1:1)
```html
<svg width="0" height="0" class="sr-only" aria-hidden="true">
  <defs>
    <clipPath id="apple-squircle-clip" clipPathUnits="objectBoundingBox">
      <path d="M 0,0.5 C 0,0.12 0.12,0 0.5,0 C 0.88,0 1,0.12 1,0.5 C 1,0.88 0.88,1 0.5,1 C 0.12,1 0,0.88 0,0.5 Z" />
    </clipPath>
  </defs>
</svg>
```

```css
.squircle-card {
  clip-path: url(#apple-squircle-clip);
  -webkit-clip-path: url(#apple-squircle-clip);
}
```

### 4.2 CSS Rounding 4 & Houdini
```css
.squircle-element {
  border-radius: var(--card-radius, 20px);
  corner-shape: squircle; /* Safari TP & Chromium Experimental */
}
```

---

## 5. Acessibilidade Mandatória: `prefers-reduced-motion`

Usuários com sensibilidade vestibular têm transições espaciais preservadas de forma segura e não perturbadora:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .interactive-tactile:active,
  .interactive-card:active {
    transform: none !important;
    filter: none !important;
    opacity: 0.85; /* Resposta imediata por opacidade */
  }
}
```
