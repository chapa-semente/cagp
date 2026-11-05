# Matriz de Precedência e Resolução de Conflitos: Apple HIG vs. Impeccable

A meta-skill **`apple-impeccable`** combina duas filosofias de design e engenharia frontend de classe mundial:
1. **Apple Human Interface Guidelines (HIG)**: O teto de experiência do usuário, refinamento tátil, ergonomia de toque e coerência material.
2. **Impeccable Engine**: O piso inegociável de qualidade técnica, integridade estrutural, cobertura de estados de borda e acessibilidade universal.

Para garantir que essas duas disciplinas trabalhem em harmonia contínua sem atritos conceituais, esta matriz define as regras de precedência e os desempates operacionais com paridade idêntica 1:1 no Chromium e no Safari.

---

## 1. A Regra de Ouro: Neutralidade Temática Total

> [!CRITICAL]
> **A identidade da marca do projeto sempre anula paletas proprietárias da Apple.**
> 
> A Apple HIG recomenda cores de sistema específicas (como `SystemBlue`, `SystemGray`, `SF Pro`). **Essas recomendações NUNCA são aplicadas literalmente.**
> - Todas as cores, tipografias e identidades visuais devem ser derivadas das configurações do projeto (`_brand.yml`, `tailwind.config`, `@theme`, `variables.css`).
> - A Apple HIG fornece apenas o **papel semântico** (ex: cor de destaque, superfície elevada, separador sutil) e o **comportamento dinâmico** (ex: contraste sob translucidez, física de spring, proporções Dynamic Type).

---

## 2. Matriz de Precedência por Domínio

| Domínio de Design / Engenharia | Precedência Primária | Precedência Secundária | Regra de Desempate |
| :--- | :--- | :--- | :--- |
| **Cores e Identidade Visual** | **Projeto (`_brand.yml` / Tokens)** | Apple HIG (Apenas Papéis) | Zero cores proprietárias da Apple (`#007AFF`). Utilizar sempre variáveis semânticas (`--app-accent`, `--app-surface-canvas`). |
| **Ergonomia e Touch Targets** | **Apple HIG (44x44px mínimo)** | Impeccable (Layout & Spacing) | O tamanho mínimo de clique de 44x44px (ou 44pt) nunca pode ser reduzido por motivos de "minimalismo" ou "compactação visual". Use áreas de toque expandidas invisíveis se o elemento visual for menor. |
| **Acessibilidade e Contraste** | **Impeccable (WCAG AA/AAA)** | Apple HIG (Materiais & Translucidez) | Se um efeito de translucidez (`backdrop-filter`) violar o contraste mínimo de 4.5:1 para texto normal, a exigência de contraste da Impeccable calibra a proporção de opacidade no `color-mix` e o realce da borda hairline, mantendo o Liquid Glass ativo e idêntico em ambos os motores sem remover o blur. |
| **Estados de Interface (Edge States)** | **Impeccable (5 Estados Fundamentais)** | Apple HIG (Apresentação Visual) | Impeccable exige cobertura completa dos 5 estados: *Ideal*, *Loading*, *Empty*, *Error* e *Partial*. O Apple HIG determina como esses estados devem ser apresentados (feedback empático, skeletons contínuos, ausência de jargão). |
| **Movimento e Microinterações** | **Apple HIG (Spring Physics)** | Impeccable (Performance & Reduced Motion) | Animações devem adotar física de molas suaves (`cubic-bezier(0.25, 1, 0.5, 1)`), mas respeitar obrigatoriamente a diretiva `@media (prefers-reduced-motion: reduce)` da Impeccable. |
| **Áreas Seguras e Viewport** | **Apple HIG (Safe Area Insets & Dynamic Island)** | Impeccable (Viewport Adapters) | Elementos fixos devem respeitar `env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`, `dvh` para telas cheias e `svh` para modais/sheets. |
| **Cantos e Squircles** | **Apple HIG (Curvatura Contínua)** | Impeccable (Geometria Responsiva) | Squircles devem usar SVG com `clipPathUnits="objectBoundingBox"` para adaptar-se a qualquer resolução sem cortes fixos de pixel. |

---

## 3. Cenários Práticos de Arbitragem

### Cenário A: Botão Minimalista vs. Área de Toque
- **Conflito**: Impeccable sugere um ícone de fechar sutil de 24x24px para manter o cabeçalho desobstruído.
- **Resolução (HIG Vence)**: O ícone pode ter 24x24px visualmente, mas deve possuir um touch target de no mínimo 44x44px via padding ou pseudo-elemento (`::after` cobrindo a área circundante).

```css
/* Resolução em CSS */
.modal-close-button {
  width: 24px;
  height: 24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Área de toque expandida ergonômica (HIG 44x44px) */
.modal-close-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 44px;
  min-height: 44px;
  width: 100%;
  height: 100%;
}
```

---

### Cenário B: Liquid Glass / Translucidez vs. Legibilidade
- **Conflito**: A estética Apple HIG sugere barra flutuante translúcida com `backdrop-filter: blur(20px)`. Sob fundos claros ou dinâmicos, o contraste do texto pode cair abaixo de 4.5:1.
- **Resolução (Harmonia 1:1 Sem Degradação)**: Em vez de desativar o blur ou reverter para fundo opaco simples, calibra-se o `color-mix` com maior proporção da superfície semântica (82% a 88%) e aplica-se contraste tipográfico de texto primário (`--app-text-primary`) com borda hairline contrastante. Ambos os motores (Chromium e Safari) continuam renderizando o material translúcido completo.

```css
/* Resolução em CSS com Paridade Total e Contraste WCAG */
.glass-surface {
  background: color-mix(in srgb, var(--app-surface-canvas) 85%, transparent);
  -webkit-backdrop-filter: blur(20px) saturate(190%) contrast(105%);
  backdrop-filter: blur(20px) saturate(190%) contrast(105%);
  border-bottom: 0.5px solid color-mix(in srgb, var(--app-border-hairline) 75%, transparent);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 4px 20px rgba(0, 0, 0, 0.06);
  isolation: isolate;
  transform: translateZ(0);
}
```

---

### Cenário C: Estados Vazios e Feedback de Erro
- **Conflito**: Impeccable sinaliza que uma tabela ou lista não possui tela para erro de rede ou busca sem resultados.
- **Resolução Conjunta**:
  1. A regra de cobertura técnica da Impeccable obriga a implementação dos estados *Empty* e *Error*.
  2. A regra de estilo do HIG define a forma: ilustração vetorial contínua ou ícone expressivo, título curto e direto, mensagem instrutiva em tom humano (sem códigos de erro frios) e botão de ação primária proeminente com a cor `--app-accent`.

---

### Cenário D: Modais e Painéis Suspensos (Viewport Shifts)
- **Conflito**: O uso de `100vh` ou `100dvh` em Bottom Sheets provoca saltos visuais incômodos quando o teclado virtual surge ou a barra de endereço encolhe no Chromium Mobile e Safari iOS.
- **Resolução (Estabilidade com `svh`)**: Modais e Sheets utilizam `100svh` (`max-height: calc(100svh - env(...) - 16px)`), mantendo o painel firme e estável independente das oscilações da barra do browser. A raiz da aplicação utiliza `100dvh`.
