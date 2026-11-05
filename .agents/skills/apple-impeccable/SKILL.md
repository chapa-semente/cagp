---
name: apple-impeccable
description: >
  Orchestrates Apple Human Interface Guidelines ergonomics, materials, and tactile polish
  with Impeccable's automated visual audit, live browser inspection, and state hardening.
  Theme-agnostic: automatically binds to project-defined design tokens and brand colors.
  Routes dynamically via reference-routing-matrix.md across 160+ specialized guides and scripts.
  Guarantees 1:1 identical Apple feature parity across Google Chrome (Chromium-based) and Apple Safari (WebKit).
argument-hint: '[critique | audit | design | tokens | hig | appledesign | parity | harden] [target-file-or-url]'
user-invocable: true
allowed-tools: [Bash, Read, Write, Edit]
---

# Apple-Impeccable: Orquestrador de Design Tátil e Hardening Técnico

Use esta skill quando precisar criar, refinar, auditar ou blindar interfaces frontend (Web, PWA, Astro, React, Vue, Svelte, Tailwind v4/v3) unindo o **refinamento tátil, ergonomia de toque e profundidade de materiais do Apple HIG** com o **motor de auditoria técnica, cobertura de estados e acessibilidade do Impeccable**, garantindo **paridade idêntica 1:1 tanto no Google Chrome (Chromium) quanto no Apple Safari (WebKit)** sem recorrer a experiências degradadas ou fallbacks.

---

## Princípios Fundamentais

### 1. Neutralidade Temática Total

> [!CRITICAL]
> **Zero Cores Hardcoded da Apple (`SystemBlue`, `SystemGray`, etc.).**
> A estética da Apple é adotada exclusivamente em seus **papéis funcionais, ergonomia física e propriedades de movimento**. A paleta de cores, tipografia e identidade de marca pertencem 100% ao projeto. Todas as referências de cor devem usar papéis semânticos (`--app-accent`, `--app-surface-canvas`, `--app-surface-card`, `--app-border-hairline`, `--app-text-primary`).

### 2. Paridade Idêntica Chromium & Safari (Zero Fallback / Degradação)

> [!CRITICAL]
> **Zero Degradação Graciosa ou Experiência Empobrecida.**
> A meta-skill não aceita fallbacks simplificados para navegadores baseados em Chromium. Todas as características de hardware e software da Apple devem se comportar de maneira estritamente idêntica no Google Chrome (Chromium) e no Apple Safari (WebKit):
> 1. **Materiais & Liquid Glass**: `backdrop-filter` e `-webkit-backdrop-filter` simultâneos, blur real, supersaturação, reflexo especular e bordas hairline de 0.5px com isolamento GPU (`isolation: isolate`, `transform: translateZ(0)`).
> 2. **Squircles & Cantos Contínuos**: Curvatura contínua Apple escalável via SVG `<clipPath clipPathUnits="objectBoundingBox">`, CSS Houdini Paint API e `corner-shape: squircle`.
> 3. **Física de Molas & Rubber-Banding**: Curvas de mola idênticas (`cubic-bezier(0.25, 1, 0.5, 1)`), feedback elástico `:active`, remoção do tap highlight azul do Chromium e controlador de overscroll bounce (rubber-banding) no Chromium.
> 4. **Safe Areas & Viewport Dinâmica**: Adaptação precisa a `env(safe-area-inset-*)`, suporte à Dynamic Island / entalhes, e diferenciação rigorosa de viewport (`dvh` para telas cheias, `svh` para modais/sheets, `lvh` para backgrounds imersivos).
> 5. **Tipografia & Dynamic Type**: Suavização idêntica (`-webkit-font-smoothing: antialiased`, `-moz-osx-font-smoothing: grayscale`), prevenção de negritos sintéticos (`font-synthesis: none`) e proporções Dynamic Type sem distorção.
> 6. **Feedback Multissensorial**: Vibração tátil no Chromium/Android (`navigator.vibrate`) e cliques acústicos sutis universais via Web Audio API.

### 3. Postura Consultiva e Exemplificativa (Não Ditatorial)

> [!NOTE]
> **A Decisão Final Pertence Sempre ao Usuário e ao Raciocínio da IA.**
> A meta-skill **não impõe regras dogmáticas nem dita layouts de forma autoritária**. Toda crítica ou recomendação de UX atua como uma consultoria colaborativa:
> 1. **Diagnóstico Empático**: Identifica atritos ergonômicos e gargalos de densidade cognitiva.
> 2. **Sugestões de Realocação**: Propõe redistribuição espacial fundamentada (Thumb Zone vs Eye Zone, cards colapsáveis e bottom sheets).
> 3. **Exemplos Práticos Prontos**: Fornece snippets de código funcionais integrados aos design tokens do projeto.
> 4. **Análise de Trade-offs**: Apresenta opções alternativas com prós e contras transparentes, empoderando o usuário e a IA a definirem a arquitetura final.

---

## Roteamento Contextual Dinâmico (Índice Mestre)

> [!IMPORTANT]
> **Consumo Sob Demanda e Eficiência de Contexto**: Para evitar sobrecarga de contexto e garantir decisões de design precisas, **consulte sempre a [Matriz de Roteamento Multidimensional](references/reference-routing-matrix.md)** antes de projetar, refinar ou auditar qualquer interface.
> 
> 1. Localize a fase do ciclo de desenvolvimento (Fase 0 a Fase 6) e o componente específico na matriz.
> 2. Leia **apenas** os 2 a 4 arquivos especializados do Apple HIG e do Impeccable indicados na linha correspondente.
> 3. Dispare o script ou comando executável indicado pela matriz para validação imediata.

---

## Estrutura de Referências da Meta-Skill

Consulte os guias especializados sob `references/` conforme o objetivo do trabalho:

| Referência | Finalidade | Quando Consultar |
| :--- | :--- | :--- |
| [`references/reference-routing-matrix.md`](references/reference-routing-matrix.md) | **Matriz de Roteamento Multidimensional** conectando 116 guias HIG, 45 guias Impeccable, guias Apple Design e scripts | **Consulta obrigatória antes de qualquer tarefa de UI/UX** |
| [`references/superapp-ux-critique.md`](references/superapp-ux-critique.md) | **Guia de Crítica de UX & Super Apps** (Thumb Zone, Fluid Glass, Onboarding, Realocação de Seções e Protocolo Consultivo) | Ao realizar crítica de telas, redesenhar navegação ou executar `run-audit.sh critique` |
| [`references/conflict-resolution.md`](references/conflict-resolution.md) | Matriz de precedência oficial e desempates entre Apple HIG e Impeccable | Sempre que houver dúvida entre minimalismo visual e ergonomia tátil |
| [`references/semantic-tokens-system.md`](references/semantic-tokens-system.md) | Dicionário de papéis semânticos, tokens Dynamic Type, Tailwind v4 (`@theme`), CSS Vars | Ao iniciar o mapeamento de temas ou criar novos componentes |
| [`references/ergonomic-touch-layout.md`](references/ergonomic-touch-layout.md) | Regra dos 44x44px, Safe Areas (`env()`), Dynamic Island, Viewports (`dvh`, `svh`, `lvh`) | Ao definir layouts, botões, modais e barras de navegação |
| [`references/motion-and-materials.md`](references/motion-and-materials.md) | Curvas de mola (springs), feedback `:active`, Liquid Glass, áudio sutil e rubber-banding | Ao criar microinterações, transições e superfícies translúcidas |
| [`references/chromium-safari-parity.md`](references/chromium-safari-parity.md) | Paridade 1:1 Chromium & Safari sem fallbacks (Liquid Glass, Squircles, Springs, Viewports, Haptics, Áudio) | Ao implementar ou validar componentes e comportamentos idênticos entre os motores |

Para consultas diretas ao acervo aprofundado, use os diretórios [`.agents/skills/apple-design/references/hig/`](../apple-design/references/hig/) e [`.agents/skills/impeccable/reference/`](../impeccable/reference/).

---

## Procedimentos Passo a Passo

### Passo 0: Roteamento Contextual & Descoberta de Tema (Obrigatório)

1. **Consulta à Matriz de Roteamento**:
   - Abra [`references/reference-routing-matrix.md`](references/reference-routing-matrix.md).
   - Identifique a fase da tarefa (Fase 0: Tokens, Fase 1: Layout, Fase 2: Componentes, Fase 3: Hardening, Fase 4: Multiplataforma & Paridade, Fase 5: Auditoria).
   - Carregue sob demanda **apenas** os documentos especificados para o componente ou fluxo em questão.

2. **Descoberta de Identidade e Tema**:
   - Antes de escrever ou sugerir qualquer estilo, inspecione a identidade visual do projeto atual:
     a. Verifique se existe `_brand.yml`, `brand.json` ou arquivo similar na raiz do repositório.
     b. Caso não exista, procure por `@theme` em arquivos CSS ou `tailwind.config.*`.
     c. Extraia:
        - Cor primária institucional -> `--app-accent`
        - Cor de fundo base -> `--app-surface-canvas`
        - Superfícies secundárias e cards -> `--app-surface-card` e `--app-surface-elevated`
        - Cor de texto primária -> `--app-text-primary`
        - Tipografia de títulos e corpo -> `--font-display` e `--font-body`

---

### Fluxo 1: Criação e Polimento de Componentes (`design` / `polish`)

Ao construir um componente com sensibilidade tátil nativa e paridade total:

1. **Ergonomia de Toque (HIG 44x44px)**:
   - Garanta que todo elemento clicável/tocável tenha área interativa mínima de 44x44px.
   - Para ícones menores (ex: 20px ou 24px), adicione a área invisível via padding ou pseudo-elemento:
     ```css
     .icon-button::after {
       content: '';
       position: absolute;
       inset: -10px;
       min-width: 44px;
       min-height: 44px;
     }
     ```
2. **Safe Area Insets, Dynamic Island e Viewport Dinâmica**:
   - Elementos fixos no topo ou base devem aplicar `env(safe-area-inset-top)` e `env(safe-area-inset-bottom)`.
   - Utilize `100dvh` para telas cheias da aplicação e `100svh` para modais, sheets e drawers flutuantes.
3. **Cantos Concêntricos e Squircles Responsivos**:
   - Ajuste o raio interno do container filho: `raio_filho = max(0, raio_pai - padding)`.
   - Aplique curvatura contínua via SVG `<clipPath clipPathUnits="objectBoundingBox">`, CSS Houdini ou `corner-shape: squircle`.
4. **Feedback Tátil `:active`, Mola Elástica & Áudio Sutil**:
   - Forneça compressão imediata com mola elástica, eliminando delay de toque:
     ```css
     .btn-tactile {
       transition: transform 0.18s cubic-bezier(0.25, 1, 0.5, 1), filter 0.15s ease;
       touch-action: manipulation;
       user-select: none;
       -webkit-user-select: none;
     }
     .btn-tactile:active {
       transform: scale(0.965);
       filter: brightness(0.93);
     }
     ```
   - Em microinterações críticas (toggles, botões de ação), acione micro-clique acústico via Web Audio API e vibração tátil no Android.
5. **Materiais Liquid Glass com Paridade Total**:
   - Declare sempre `-webkit-backdrop-filter: blur(20px) saturate(190%)` e `backdrop-filter: blur(20px) saturate(190%)` simultâneos.
   - Aplique `isolation: isolate` e `transform: translateZ(0)` para eliminar artefatos de composição GPU e sangramento de pixels no Chromium.
   - Adicione borda hairline de 0.5px (`border: 0.5px solid color-mix(...)`) e reflexo especular superior.
6. **Momentum Scrolling & Rubber-Banding no Chromium**:
   - Aplique `overscroll-behavior-y: contain` e associe o controlador de rebote elástico UIKit em contêineres roláveis.

---

### Fluxo 2: Blindagem Técnica e Cobertura de Estados (`harden`)

Acione o rigor do Impeccable para garantir que o componente não quebre em cenários adversos:

1. **Os 5 Estados Obrigatórios de Interface**:
   - **Ideal**: O componente preenchido com dados perfeitos.
   - **Loading**: Skeleton loaders ou indicadores de progresso suaves sem saltos de layout (*Cumulative Layout Shift - CLS*).
   - **Empty**: Ilustração ou ícone semântico, mensagem encorajadora e ação clara de recuperação.
   - **Error**: Explicação em linguagem humana do que ocorreu, instrução de recuperação e botão de tentar novamente.
   - **Partial**: Tratamento para textos longos (truncamento elegante ou quebra de linha harmoniosa) e ausência parcial de dados.
2. **Contraste WCAG**:
   - Garanta contraste mínimo de 4.5:1 para texto normal e 3:1 para elementos de interface/ícones diretamente sobre as superfícies de vidro translúcido.
3. **Garantia de Paridade Chromium-Safari**:
   - Aplique `-webkit-tap-highlight-color: transparent` para eliminar o flash azul do Chromium Mobile e liberar a resposta elástica da mola HIG.
   - Utilize unidades adequadas de viewport (`100dvh` para páginas, `100svh` para sheets/modais).
   - Configure `-webkit-font-smoothing: antialiased`, `-moz-osx-font-smoothing: grayscale` e `font-synthesis: none`.
   - Aplique `:focus-visible` para foco nítido via teclado sem poluir o toque.
   - Respeite `@media (prefers-reduced-motion: reduce)`.

---

### Fluxo 3: Auditoria Visual e Técnica Automatizada (`audit`)

Execute a suíte de validação integrada através do script auxiliar da skill:

```bash
# Executa a suíte completa (Tokens + HIG + Apple Design + Paridade Chromium-Safari + Impeccable)
bash .agents/skills/apple-impeccable/scripts/run-audit.sh all [caminho-ou-arquivo]

# Audita paridade 1:1 Chromium-Safari (prefixos duplos de backdrop-filter, dvh/svh, tap-highlight, font-smoothing)
bash .agents/skills/apple-impeccable/scripts/run-audit.sh parity [caminho-ou-arquivo]

# Audita apenas neutralidade temática e ausência de cores fixas da Apple
bash .agents/skills/apple-impeccable/scripts/run-audit.sh tokens [caminho-ou-arquivo]

# Audita critérios ergonômicos (touch targets, safe areas, reduced-motion)
bash .agents/skills/apple-impeccable/scripts/run-audit.sh hig [caminho-ou-arquivo]

# Audita diretrizes de marca Apple e Apple Pay (conforme apple-design)
bash .agents/skills/apple-impeccable/scripts/run-audit.sh appledesign [caminho-ou-arquivo]

# Dispara o detector nativo de anti-patterns do Impeccable
bash .agents/skills/apple-impeccable/scripts/run-audit.sh detect [caminho-ou-arquivo]
```

---

### Fluxo 4: Crítica Consultiva de Super App e Inspeção Visual (`critique`)

Use este fluxo para avaliar a experiência do usuário (UX), distribuição espacial, ergonomia de botões e fluidez de materiais táteis:

1. **Os 5 Pilares de Avaliação de Super App**:
   - **Arquitetura de Informação & Thumb Zone**: Ações prioritárias e docks alocados na base (ao alcance natural do polegar em dispositivos móveis); cabeçalhos desafogados no topo (*Eye Zone*).
   - **Densidade & Realocação de Seções**: Identificação de poluição visual (> 5 módulos concorrendo). Sugestão de agrupamento cognitivo em cards colapsáveis (`<details>`/accordions) ou *Bottom Sheets*.
   - **Fluid Glass & Contraste Especular**: Superfícies translúcidas com `-webkit-backdrop-filter` e `backdrop-filter` simultâneos, iluminação de borda sutil (`0.5px`) e contraste mínimo de 4.5:1 mesmo sobre fundos dinâmicos.
   - **Engenharia de Onboarding & Value-First**: O usuário experimenta valor real antes de esbarrar em barreiras de login imediato; revelação progressiva (*progressive disclosure*).
   - **Ergonomia de Botões & Ações**: Alvos mínimos de toque de 44x44px, feedback elástico `:active`, CTAs proeminentes e diferenciação explícita de ações destrutivas.

2. **Inspeção Visual ao Vivo no Navegador (Modo Dual Mobile + Desktop)**:
   - Quando o alvo for uma URL local (ex: `http://localhost:4321`):
     - **Mobile (390x844)**: Simula visualização e alcance em smartphones Android e iOS.
     - **Desktop (1440x900)**: Simula visualização widescreen em Linux, macOS e Windows.
     - Avalia layout shifts reais, contraste computado de cores e geometria de toques.

3. **Execução de Comandos**:
   ```bash
   # Crítica estática consultiva em arquivo ou diretório de componentes
   bash .agents/skills/apple-impeccable/scripts/run-audit.sh critique src/pages/index.astro

   # Inspeção visual ao vivo no navegador com viewports dual (Mobile 390x844 + Desktop 1440x900)
   bash .agents/skills/apple-impeccable/scripts/run-audit.sh critique http://localhost:4321
   ```

4. **Protocolo Consultivo de Resposta**:
   Toda devolutiva estruturada deve seguir o padrão:
   - `[Diagnóstico]` -> O que foi observado na disposição ou código atual.
   - `[Por Que Importa]` -> Fundamentação ergonômica, de acessibilidade ou cognitiva.
   - `[Sugestão de Realocação / Redesign]` -> Proposta de redistribuição de elementos.
   - `[Exemplo Prático com Tokens]` -> Código executável utilizando os tokens do projeto.
   - `[Alternativas & Trade-offs]` -> Opções e concessões para que o usuário e a IA definam o resultado final.

---

## Integração com as Skills Irmãs

A meta-skill `apple-impeccable` aproveita todo o investimento e inteligência já existentes no repositório:
- **`.agents/skills/apple-design`**: Fonte de autoridade sobre a anatomia de componentes nativos da Apple, orientações do HIG e conformidade de marca e pagamentos (`code-audit.md`).
- **`.agents/skills/impeccable`**: Motor de detecção estática de anti-patterns de design (`scripts/impeccable detect`) e heurísticas de auditoria técnica.

---

## Verificação e Comandos de Validação

Para certificar que uma implementação está 100% pronta:
1. `bash .agents/skills/apple-impeccable/scripts/run-audit.sh critique <target-or-url>` (crítica consultiva e inspeção dual de Super App).
2. `bash .agents/skills/apple-impeccable/scripts/run-audit.sh parity <target>` (paridade idêntica Chromium-Safari sem quebras).
3. `bash .agents/skills/apple-impeccable/scripts/run-audit.sh tokens <target>` (zero cores proibidas).
4. `bash .agents/skills/apple-impeccable/scripts/run-audit.sh hig <target>` (ergonomia e safe areas válidas).
5. `bash .agents/skills/apple-impeccable/scripts/run-audit.sh appledesign <target>` (zero marcas falsificadas ou glifos ilegais).
6. `bash .agents/skills/apple-impeccable/scripts/run-audit.sh detect <target>` (sem anti-patterns reportados pelo Impeccable).
