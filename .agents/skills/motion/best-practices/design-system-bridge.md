# Ponte Arquitetural: Motion + Design System Local (CAGP / Neobrutalism / BoldKit)

Este guia estabelece as convenções obrigatórias para o uso da biblioteca **Motion** (`motion/react`) no contexto do Design System unificado do projeto CAGP UFMG SuperApp, integrando referências de **Neobrutalism**, **BoldKit** e **Impeccable/Apple HIG**.

---

## 1. Princípios de Movimento Neobrutalista

No Neobrutalismo, animações não devem ser "borradas" ou excessivamente elásticas como em designs corporativos genéricos. O movimento reflete solidez, peso mecânico e precisão gráfica.

1. **Física Mecânica & Tátil**:
   - Transições de clique (`whileTap`) e hover (`whileHover`) devem simular botões físicos táteis ou relevo de papel/carimbo.
   - O deslocamento no eixo espacial (`translate`) deve ser acompanhado pelo deslocamento inverso da sombra sólida projetada (`box-shadow`), mantendo o objeto "ancorado".
   - Exemplo clássico Neobrutalista:
     - Repouso: `transform: translate(0, 0)`, `box-shadow: 4px 4px 0px 0px #000`
     - Hover: `transform: translate(-2px, -2px)`, `box-shadow: 6px 6px 0px 0px #000`
     - Active / Tap: `transform: translate(2px, 2px)`, `box-shadow: 2px 2px 0px 0px #000`

2. **Curvas de Transição**:
   - Prefira molas firmes e com amortecimento rápido (`stiffness: 400`, `damping: 25-30`).
   - Evite oscilações longas (overshoot excessivo) em elementos de navegação ou controles de formulário para não degradar a usabilidade.

---

## 2. Integração com BoldKit Motion Core

O projeto já disponibiliza primitivas em `@boldkit/lib/motion-core` e o adapter React em `src/components/ui/motion.tsx`.

* **Quando usar `@boldkit/lib/motion-core`**:
  - Efeitos em nível de página / scroll reveal (`observeReveal`, `staggerChildren`).
  - Efeitos de Canvas (`src/components/boldkit/canvas-effects/`).
  - Detecção centralizada de acessibilidade via `prefersReducedMotion()`.

* **Quando usar `motion/react` diretamente**:
  - Microinterações em componentes interativos individuais (Cards, Modais, Drawers, Botões, Badges, Tabs).
  - Animações condicionais de saída com `<AnimatePresence>`.
  - Transições de layout com `layoutId` (ex: abas selecionadas, troca de abas com indicador deslizante).

---


## 3. Práticas em Páginas Astro & Ilhas React

1. **Ilhas Interativas**: Componentes que utilizam `motion/react` devem ser hidratados com diretivas adequadas no Astro:
   - `client:load` para componentes acima da dobra ou essenciais para a primeira interação.
   - `client:visible` para componentes mais abaixo no scroll.
   - `client:idle` para animações decorativas secundárias.
2. **SSR Safety**: Nunca acesse diretamente `window` ou propriedades do DOM no corpo principal do componente sem proteger com `useEffect` ou checagens SSR (`typeof window !== 'undefined'`). O Motion cuida internamente disso ao renderizar em servidor, gerando HTML inicial estático.
3. **Importações**: Nunca importe de `framer-motion`. Utilize sempre:
   ```tsx
   import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
   ```

---

## 4. Presets Canônicos de Mola Neobrutalista

Conforme formalizado em `_referencias/design-system/matrix/cagp-astro/00-design-system-specification.md`, utilize os tokens centrais:

```typescript
// Presets unificados de física tátil
export const tactileSpring = { type: "spring" as const, stiffness: 450, damping: 30 };
export const bounceSpring = { type: "spring" as const, stiffness: 500, damping: 25 };
export const drawerSpring = { type: "spring" as const, stiffness: 350, damping: 35 };

export const staggerContainer = (delay = 0.05) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: delay } }
});
```

- **Alvos**: Todos os cards interativos recebem `whileHover={{ scale: 1.02 }}` e `whileTap={{ scale: 0.98 }}` com `transition={tactileSpring}`.
- **Abas e Modais**: Trocas de visão utilizam `<AnimatePresence mode="wait">` com fade + translação suave em Y.
