# Ergonomia de Toque e Layout Tátil (Apple HIG para Web/PWA)

O padrão de ergonomia do Apple Human Interface Guidelines (HIG) baseia-se na fisiologia humana: as pontas dos dedos têm área de contato de aproximadamente 8mm a 10mm. Interfaces digitais que ignoram esse fator geram frustração, toques acidentais e perda de precisão.

Este guia define as regras mandatórias de layout e ergonomia tátil para qualquer superfície Web, PWA ou Híbrida com paridade 1:1 entre Chromium e Safari.

---

## 1. Regra dos 44x44px (Touch Target Mínimo)

> [!IMPORTANT]
> **Todo elemento interativo deve possuir uma área clicável/tocável de no mínimo 44x44px (ou 44pt).**
> Isso inclui botões de ação, ícones de navegação, fechar modal, checkboxes, itens de menu e tabs.

### 1.1 Elementos Visuais Compactos com Área Expandida
Muitos designs demandam ícones visuais pequenos (ex: 20x20px ou 24x24px). Nunca reduza a área de toque efetiva nesses casos! Utilize áreas de toque invisíveis via pseudo-elementos ou padding:

```css
/* Padrão com Pseudo-Elemento ::after */
.touch-target-44 {
  position: relative;
  min-width: 24px;
  min-height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.touch-target-44::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 44px;
  min-height: 44px;
  width: max(100%, 44px);
  height: max(100%, 44px);
  z-index: 1;
}
```

### 1.2 Espaçamento Mínimo Entre Alvos Interativos
Elementos tocáveis adjacentes devem manter uma separação física mínima de **8px** (idealmente **12px a 16px**) para evitar acionamentos concorrentes por imprecisão do polegar.

---

## 2. Safe Area Insets & Viewport Dinâmica (`dvh`, `svh`, `lvh`)

Dispositivos modernos (iPhone com Dynamic Island, aparelhos com telas curvas, entalhes e barras gestuais inferiores do Android e iOS) exigem tratamento explícito de áreas seguras e viewport dinâmica.

### 2.1 Meta Tag Obrigatória
O cabeçalho HTML da página deve habilitar `viewport-fit=cover`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

### 2.2 Unidades Dinâmicas de Viewport: `dvh`, `svh` e `lvh`
O valor clássico `100vh` gera saltos de layout e esconde elementos no Chrome Mobile e Safari iOS quando a barra de endereço surge ou encolhe. Utilize a unidade correta para cada caso:

1. **`100dvh` (Dynamic Viewport Height)**:
   - Acompanha dinamicamente a expansão e retração das barras do navegador em tempo real.
   - **Uso obrigatório**: Raiz da aplicação, páginas e contêineres de scroll de tela inteira.
   ```css
   .app-screen-container {
     min-height: 100dvh;
   }
   ```

2. **`100svh` (Small Viewport Height)**:
   - Baseia-se no menor tamanho possível da viewport (barras do navegador totalmente visíveis).
   - **Uso obrigatório**: **Bottom Sheets, Modais e Drawers**. Impede que o modal salte de tamanho bruscamente ao abrir o teclado virtual ou rolar.
   ```css
   .app-bottom-sheet {
     max-height: calc(100svh - env(safe-area-inset-top, 20px) - 24px);
   }
   ```

3. **`100lvh` (Large Viewport Height)**:
   - Baseia-se no maior tamanho possível da viewport (barras do navegador retraídas).
   - **Uso obrigatório**: Telas imersivas de splash e ilustrações full-bleed que preenchem toda a área física.
   ```css
   .app-hero-background {
     height: 100lvh;
   }
   ```

### 2.3 Safe Area Insets, Dynamic Island e Entalhes de Tela
Nunca utilize paddings fixos no topo ou rodapé de barras de navegação fixas. Utilize a função `env()` com valores mínimos de segurança:

- **Dynamic Island (iPhone 14/15/16 Pro)**: Requer até 59px de respiro no topo.
- **Notch Tradicional (iPhone X a 13)**: Requer 44px a 47px.
- **Camera Cutouts Android (Chromium)**: Requer 24px a 40px no topo em modo tela cheia / PWA.
- **Home Indicator / Barra de Gestos**: Requer 34px na base no iOS e 16px a 24px no Android.

```css
/* Header fixo / Barra superior (acomoda Dynamic Island e Notch) */
.app-header {
  position: sticky;
  top: 0;
  padding-top: max(12px, env(safe-area-inset-top, 12px));
  padding-left: max(16px, env(safe-area-inset-left, 16px));
  padding-right: max(16px, env(safe-area-inset-right, 16px));
}

/* Bottom Navigation Bar / Tab Bar (acomoda Home Bar do iOS e gestos do Android) */
.app-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: max(16px, env(safe-area-inset-bottom, 16px));
  padding-left: max(16px, env(safe-area-inset-left, 16px));
  padding-right: max(16px, env(safe-area-inset-right, 16px));
}
```

---

## 3. Continuous Corner Radii (Squircle) & Cantos Concêntricos

O acabamento característico da Apple vem do raio contínuo de curvatura suave (*squircle*) e do alinhamento geométrico perfeito entre recipientes e seus elementos internos.

### 3.1 Curvatura Contínua Responsiva em Chromium e Safari
Para que os cantos arredondados tenham a suavidade ótica de um produto físico da Apple em qualquer tamanho de componente:

```html
<!-- Definição SVG universal para contorno contínuo escalável -->
<svg width="0" height="0" class="sr-only" aria-hidden="true">
  <defs>
    <clipPath id="apple-squircle-clip" clipPathUnits="objectBoundingBox">
      <path d="M 0,0.5 C 0,0.12 0.12,0 0.5,0 C 0.88,0 1,0.12 1,0.5 C 1,0.88 0.88,1 0.5,1 C 0.12,1 0,0.88 0,0.5 Z" />
    </clipPath>
  </defs>
</svg>
```

```css
/* Aplicação responsiva */
.card-squircle {
  border-radius: 20px;
  corner-shape: squircle; /* Safari & Chromium experimental */
  -webkit-clip-path: url(#apple-squircle-clip);
  clip-path: url(#apple-squircle-clip);
}
```

### 3.2 Regra dos Cantos Concêntricos
Quando um elemento com cantos arredondados está contido dentro de outro elemento arredondado, o raio interno deve acompanhar a espessura do espaçamento interno (*padding*):

$$\text{Raio Interno} = \max(0, \text{Raio Externo} - \text{Padding})$$

```css
/* Card Container */
.card-container {
  border-radius: 20px;
  padding: 12px;
}

/* Elemento Interno (ex: Thumbnail ou Botão Interno) */
.card-inner-item {
  /* 20px - 12px = 8px */
  border-radius: 8px;
}
```

Ignorar essa proporção gera a sensação de cantos desalinhados ou amassados visualmente.

### 3.3 Escala de Bordas Arredondadas Recomendada
- **Badges e Tags**: `border-radius: 6px` ou `9999px` (pill)
- **Botões e Campos de Texto**: `border-radius: 10px` a `12px`
- **Cards e Diálogos Compactos**: `border-radius: 16px` a `20px`
- **Modais, Sheets e Painéis Flutuantes**: `border-radius: 24px` a `32px`

---

## 4. Arquitetura da "Thumb Zone" (Alcance do Polegar)

Em interfaces móveis, 75% das interações ocorrem com uma única mão.
- **Zona Fácil (Inferior)**: Ações primárias, navegação de abas (Tabs), confirmações principais e gatilhos de criação.
- **Zona Neutra (Centro)**: Conteúdo principal, cartões informativos, rolagem de listas.
- **Zona Difícil (Superior)**: Ações secundárias, filtros, fechar/cancelar ou avatar de configurações.

```
+-----------------------------------+
|  [Filtro]        ZONA DIFÍCIL     |  <-- Ações secundárias / Avatar
|                                   |
|                                   |
|             ZONA NEUTRA           |  <-- Leitura e exploração
|                                   |
|                                   |
|  [Tab 1]   [Tab 2]   [AÇÃO ⚡]     |  <-- Ações frequentes & Navegação
+-----------------------------------+
|       safe-area-inset-bottom      |  <-- Barra gestual
+-----------------------------------+
```
