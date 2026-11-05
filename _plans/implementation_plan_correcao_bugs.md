# Plano de Correção de Bugs Ao Vivo (`/browser`) & Refinamento UI/UX (`/apple-design`) — CAGP UFMG Super App

## 1. Visão Geral e Diagnóstico Ao Vivo (`http://127.0.0.1:4321`)

Renderizamos o servidor de desenvolvimento do Astro (`http://127.0.0.1:4321`) e executamos uma auditoria completa via navegador automatizado (`/browser`) em **Desktop (`1440×900` e `1342×900`)** e **Mobile (`390×844` — iPhone 15 Pro)**, inspecionando todas as 17 rotas, modais, gavetas, ilhas interativas, caixas delimitadoras (`getBoundingClientRect()`), folhas de estilo computadas e logs de console/rede.

> [!IMPORTANT]
> **Invariante de Integridade Factual:** Nenhuma informação acadêmica, carga horária (`3.000h`, `1.860h`, `600h`, `300h`, `180h`, `120h`), artigo regimental (`PPC 2020`, `Versão N-20229`, `CEPE`), ementa ou rota será removida ou alterada factualmente. Todas as intervenções são estritamente de **engenharia de interface, correção de bugs de hidratação/DOM, responsividade, ergonomia tátil, animações e acessibilidade**.

---

## 2. Evidências Visuais Capturadas no Navegador (`/browser`)

````carousel
![BUG-03: Em larguras de notebook (1342px), as 3 ilhas do SuperAppHeader somam 1357px, gerando overflow horizontal e cortando o botão do Passaporte à direita.](/home/gsathler/.gemini/antigravity/brain/8d88965e-c1cc-47d1-88c6-55dbdfa8bf44/audit_header_overflow_1342px.png)
<!-- slide -->
![BUG-13: No SuperAppWelcomeModal, a regra min-h-[44px] aplicada diretamente nos botões h-2 dos indicadores de slide deforma os pontos em barras verticais de 44px de altura.](/home/gsathler/.gemini/antigravity/brain/8d88965e-c1cc-47d1-88c6-55dbdfa8bf44/audit_welcome_modal_stretched_dots.png)
<!-- slide -->
![BUG-11: No Modo Alto Contraste AAA, o seletor curinga * força fundo preto nos filhos da pílula ativa 'Início' (criando um retângulo preto dentro da pílula amarela) e apaga barras de progresso e pontos de status.](/home/gsathler/.gemini/antigravity/brain/8d88965e-c1cc-47d1-88c6-55dbdfa8bf44/audit_high_contrast_bugs.png)
<!-- slide -->
![BUG-04 & BUG-07: No Mobile (390x844), ao rolar a página, as 2 ilhas do topo cobrem as abas HOJE e CAGP enquanto APPS vaza pelo buraco central; na base, o BottomNav exibe apenas ícones mudos sem rótulos.](/home/gsathler/.gemini/antigravity/brain/8d88965e-c1cc-47d1-88c6-55dbdfa8bf44/audit_mobile_header_gap_overlap.png)
<!-- slide -->
![BUG-14 & BUG-17: Em /percurso no Mobile (390x844), a 5ª aba (DOSSIÊ) desaparece cortada atrás do botão lateral de densidade, e o AxisNavBar corta 'TCC (180H)' sem indicador de scroll.](/home/gsathler/.gemini/antigravity/brain/8d88965e-c1cc-47d1-88c6-55dbdfa8bf44/audit_percurso_mobile_clipped_tabs.png)
<!-- slide -->
![BUG-04 & BUG-15: Em /percurso#grafo no Desktop, o header flutuante sobrepõe o título da seção durante o scroll, e clicar numa disciplina (ex: DCP 124) abre a ementa abaixo dos 650px do quadro (fora da tela).](/home/gsathler/.gemini/antigravity/brain/8d88965e-c1cc-47d1-88c6-55dbdfa8bf44/audit_percurso_grafo_desktop.png)
<!-- slide -->
![BUG-06: No Desktop (1440x900), o DesktopFloatingDock sobrepõe cards interativos na dobra inicial e o rodapé no final da página.](/home/gsathler/.gemini/antigravity/brain/8d88965e-c1cc-47d1-88c6-55dbdfa8bf44/audit_dock_footer_overlap.png)
````

---

## 3. Matriz Completa dos 25 Bugs & Otimizações Identificados

| ID | Severidade | Componente / Rota | Diagnóstico Técnico no Browser & Código | Solução Proposta |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-01** | 🔴 **P0 Crítico** | [astro.config.mjs](file:///home/gsathler/Nextcloud/Projects/cagp/astro.config.mjs) / Todas as Ilhas React | `SyntaxError: The requested module '/node_modules/react-dom/client.js' does not provide an export named 'createRoot'`. Todas as ilhas React falham ao hidratar no dev server porque `@astrojs/react/dist/client.js` importa `react-dom/client.js` (CJS) sem pré-empacotamento ESM do Vite. | Adicionar `vite.optimizeDeps.include: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'react/jsx-dev-runtime', '@astrojs/react/client.js']` em [astro.config.mjs](file:///home/gsathler/Nextcloud/Projects/cagp/astro.config.mjs). |
| **BUG-02** | 🟡 **P2 Médio** | [OptativasCatalogExplorer.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curriculum/catalog/OptativasCatalogExplorer.tsx), [PassportSheet.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/PassportSheet.tsx) | Aviso no DevTools: `A form field element should have an id or name attribute`. Inputs de busca/token sem `id`/`name` explícitos. | Adicionar `id` e `name` semânticos em todos os `<input>` e `<select>` das ilhas React. |
| **BUG-03** | 🟠 **P1 Alto** | [SuperAppHeader.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/SuperAppHeader.astro) | Entre `1024px` e `1358px`, as 3 ilhas somam `1357px+`, gerando barra de rolagem horizontal e cortando `#cagp-btn-passport` na borda direita. | Compactar rótulos secundários da Ilha 3 (`Buscar`, `⌘K`, texto `CAMPUS`) abaixo de `1360px` (`hidden min-[1360px]:inline`) e ajustar gaps/paddings do nav central entre `1024px–1360px`. |
| **BUG-04** | 🟠 **P1 Alto** | [SuperAppHeader.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/SuperAppHeader.astro) & [BaseLayout.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/layouts/BaseLayout.astro) | Ao rolar a página (`scrollY > 16px`), o conteúdo e o `SegmentedControl` vazam pelos buracos transparentes entre as ilhas flutuantes (no mobile, `APPS` aparece no buraco enquanto `HOJE` e `CAGP` ficam cobertos). | Ativar uma cortina contínua de *Liquid Glass* (`.is-scrolled-edge`) no container do `SuperAppHeader` quando `window.scrollY > 16` e adicionar `scroll-padding-top: 6rem` no `html`. |
| **BUG-05** | 🟡 **P2 Médio** | [SuperAppHeader.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/SuperAppHeader.astro) & [DesktopFloatingDock.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/DesktopFloatingDock.tsx) | Alvos de toque `< 44×44px`: `.cagp-island-dropdown-btn` (`height: 36px`), botões mobile da Ilha 3 (`36×44px`), itens do Dock (`36×44px` e `32×44px`). | Garantir `min-w-[44px] min-h-[44px]` nos botões da Ilha 3 no mobile e `min-h-[40px]`/`44px` nos gatilhos de navegação. |
| **BUG-06** | 🟠 **P1 Alto** | [DesktopFloatingDock.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/DesktopFloatingDock.tsx) | O Dock flutuante inferior no Desktop cobre botões de ação primária (como `"ABRIR DOSSIÊ COMPLETO →"` em `/percurso`) e o rodapé. | Tornar `DesktopFloatingDock` oculto por padrão no Desktop (`showDesktopDock: false` em `cagp_a11y_prefs_v2`), já que toda a navegação está no `SuperAppHeader` superior, podendo ser ativado opcionalmente nas Configurações. |
| **BUG-07** | 🟠 **P1 Alto** | [BottomNav.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/BottomNav.astro) | No Mobile (`390×844`), a barra inferior exibe 6 ícones mudos (`40×44px`, `innerText === ""`) e usa `role="toolbar"` dentro de `<nav>`. | Remover `role="toolbar"`, exibir rótulos claros de 1 palavra (`Início`, `Curso`, `Grade`, `Acervo`, `CAGP`, `Ajustes`) abaixo de cada ícone (`10px`) com alvo `>= 48×46px`. |
| **BUG-08** | 🟠 **P1 Alto** | [HomeHeroHub.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/home/HomeHeroHub.tsx) & [index.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/index.astro) | No Mobile, o controle segmentado `[Passaporte] [UFMG no Agora]` empilha logo acima do `SegmentedControl` `[Hoje] [Apps] [CAGP]`, criando dupla barra de abas e 51 elementos com fonte `< 11px`. | No Mobile (`< lg`), exibir o Passaporte compacto com uma faixa integrada ao vivo `"UFMG no Agora"` (RU II + Circular + Secretaria) e botão expansível, eliminando a tablist duplicada. |
| **BUG-09** | 🔴 **P1 Alto** | [global.css](file:///home/gsathler/Nextcloud/Projects/cagp/src/styles/global.css) & [A11ySheet.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/A11ySheet.tsx) | Os botões de escala tipográfica (`A-`, `A`, `A+`, `A++`) mudam `data-a11y-font="sm\|md\|lg\|xl"` no `<html>`, mas **não existe nenhuma regra CSS** correspondente em `src/styles/` (`fontSize` permanece `16px` fixo). | Implementar `html[data-a11y-font="sm\|md\|lg\|xl"]` em [global.css](file:///home/gsathler/Nextcloud/Projects/cagp/src/styles/global.css) escalando o `font-size` raiz (`93.75%`, `100%`, `112.5%`, `125%`). |
| **BUG-10** | 🔴 **P1 Alto** | [animations.css](file:///home/gsathler/Nextcloud/Projects/cagp/src/styles/animations.css) & [NormativeDetails.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/ui/NormativeDetails.astro) | O botão `"Reduzir Movimento"` define `data-a11y-motion="reduced"`, mas **não existe regra CSS** correspondente, e a Web Animations API em `NormativeDetails.astro` ignora a preferência. | Adicionar suporte a `html[data-a11y-motion="reduced"]` em [animations.css](file:///home/gsathler/Nextcloud/Projects/cagp/src/styles/animations.css) e checar a preferência antes de animar `<details>` via JS. |
| **BUG-11** | 🔴 **P1 Alto** | [global.css](file:///home/gsathler/Nextcloud/Projects/cagp/src/styles/global.css) (`data-a11y-contrast="high"` + Dark Mode) | O seletor curinga `html[data-a11y-contrast="high"] * { background-color: #000 !important }` pinta os `<span>`/`<i>` internos de links ativos de preto dentro da pílula amarela e esconde barras de progresso/status dots. Além disso, falta o **Modo Noturno ("Modo Noturno FAFICH")**. | Corrigir a especificidade dos filhos de `.is-active` / `[aria-selected="true"]`, barras de progresso e status dots no Alto Contraste AAA, e implementar o **Modo Noturno semântico (`data-theme="dark"`)** com suporte a `light`/`dark`/`system`. |
| **BUG-12** | 🔴 **P1 Alto** | [PassportSheet.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/PassportSheet.tsx) & [GlobalSheets.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/GlobalSheets.tsx) | Clicar em `"Abrir →"` em "Configurações do Super App" dentro do `PassportSheet` navega para `/configuracoes` em vez de abrir a `A11ySheet` in-place. | Substituir o `<a href="/configuracoes">` em [PassportSheet.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/PassportSheet.tsx) por um `<button>` que fecha o Passaporte e dispara `window.dispatchEvent(new CustomEvent('cagp:open-settings'))`. |
| **BUG-13** | 🟠 **P1 Alto** | [SuperAppWelcomeModal.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/SuperAppWelcomeModal.tsx) | Os pontos indicadores de slide (`h-2`) recebem `min-height: 44px` da regra global de botões, esticando-se em barras verticais de `44px` de altura! Além disso, o modal bloqueia a tela inteira após `800ms`. | Converter a saudação inicial em um **TipKit Card** flutuante não-bloqueante no canto inferior com botão `"Conhecer em 30s"`, e encapsular os dots visuais (`<span class="h-2 ...">`) dentro de um `<button class="min-w-[44px] min-h-[44px] flex items-center justify-center">`. |
| **BUG-14** | 🔴 **P1 Alto** | [SegmentedControl.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/ui/SegmentedControl.astro) (`/percurso`, `/calouros`, `/curso`) | No Mobile (`390×844`), controles com 5 abas cortam a 5ª aba (`DOSSIÊ`, `FUMP`, `INGRESSO`) atrás do botão lateral de densidade (`Ver Tudo`). | Tornar `.cagp-workspace-tabs` um carrossel horizontal com `overflow-x: auto`, `scroll-snap-type: x proximity`, fade lateral e auto-centralização (`scrollIntoView({ inline: 'center' })`) ao selecionar uma aba. |
| **BUG-15** | 🔴 **P1 Alto** | [CurriculumGraphDynamic.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curriculum/graph/CurriculumGraphDynamic.tsx) & [CurriculumGraph.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/curriculum/CurriculumGraph.tsx) | Em `/percurso#grafo`: (1) clicar numa matéria abre os detalhes abaixo dos `650px` do quadro Kanban (fora da tela); (2) o Mapa Cartográfico SVG (`CurriculumSvgMap.tsx` + `CurriculumDetailDrawer.tsx`) está órfão e inacessível. | Integrar o alternador **`[Colunas 10P + Optativas]` / `[Mapa SVG de Conexões & Trilhas]`** dentro de `CurriculumGraphDynamic.tsx` e abrir o `CurriculumDetailDrawer` (ou modal de ementa) como **Sheet/Modal visível imediatamente** ao clicar em qualquer matéria. |
| **BUG-16 a 22** | 🟡 **P2 Médio** | Checkboxes, Steppers e Botões em `/percurso`, `/calouros`, `/acg`, `/estagio`, `BottomSheet`, `MobileDrawer` | Checkboxes (`16×44px` ou `20×44px`), botões `+/-` da calculadora ACG (`40×44px`), botões fechar de sheets/drawer (`36×44px`) abaixo de `44×44px`. | Envolver checkboxes em `<label class="min-w-[44px] min-h-[44px] inline-flex items-center justify-center">` (ou aumentar área clicável) e ajustar botões para `w-11 h-11 min-w-[44px] min-h-[44px]`. |
| **BUG-17** | 🟡 **P2 Médio** | [AxisNavBar.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/AxisNavBar.astro) | No Mobile (`390×844`), a 4ª pílula (`TCC (180H)`) fica cortada na borda direita sem indicador visual de que a barra rola horizontalmente, e a pílula ativa não auto-centraliza. | Adicionar máscara/gradiente de fade horizontal nas bordas de `.cagp-axis-subnav` e auto-scroll (`scrollIntoView({ inline: 'center', block: 'nearest' })`) para o link `.is-active`. |
| **BUG-23** | 🟠 **P1 Alto** | [PageFooter.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/PageFooter.astro), [configuracoes.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/configuracoes.astro), [mapa-do-site.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/mapa-do-site.astro) | Clicar em "Configurações" no rodapé navega para `/configuracoes`, que pisca uma tela inteira e redireciona via JS para `/?openSettings=true` (tirando o usuário da página atual). | Fazer o botão "Configurações" no `PageFooter.astro` disparar `cagp:open-settings` diretamente na página atual; em `/configuracoes`, renderizar `SettingsInteractive` diretamente (sem redirecionar para `/`). |
| **BUG-24** | 🟠 **P1 Alto** | Múltiplos arquivos (`JourneyNav`, `PageFooter`, `SuperAppHeader`, `MobileDrawer`, `faq`, `documentos/[slug]`, etc.) | Dezenas de `href="/..."` e downloads de PDF não usam `route()` nem `asset()` de [paths.ts](file:///home/gsathler/Nextcloud/Projects/cagp/src/lib/paths.ts), quebrando em deploys com subpath no GitHub Pages. | Padronizar `route()` e `asset()` em todos os componentes de navegação, páginas de redirecionamento e links de documentos. |
| **BUG-25** | 🟡 **P2 Médio** | [components.css](file:///home/gsathler/Nextcloud/Projects/cagp/src/styles/components.css) & [passport.css](file:///home/gsathler/Nextcloud/Projects/cagp/src/styles/passport.css) | `.cagp-reading-ruler` está duplicado com alturas conflitantes (`54px` em `components.css` vs `36px` em `passport.css`), e falta fallback para `@media (prefers-reduced-transparency: reduce)`. | Consolidar `.cagp-reading-ruler` em `components.css` e adicionar fallbacks opacos para `prefers-reduced-transparency: reduce`. |

---

## 4. Mudanças Propostas por Camada Arquitetural

### Camada 0: Correção Crítica de Hidratação Vite/Astro (`BUG-01`)

#### [MODIFY] [astro.config.mjs](file:///home/gsathler/Nextcloud/Projects/cagp/astro.config.mjs)
- Configurar `vite.optimizeDeps.include` para pré-empacotar `react`, `react-dom`, `react-dom/client`, `react/jsx-runtime`, `react/jsx-dev-runtime` e `@astrojs/react/client.js`, garantindo que todas as ilhas `<astro-island>` hidratem sem `SyntaxError` tanto no servidor dev quanto no build.

```js
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '@astrojs/react/client.js',
      ],
    },
  },
```

---

### Camada 1: Storage Schema & Preferências do Usuário (`studentVault.ts`)

#### [MODIFY] [studentVault.ts](file:///home/gsathler/Nextcloud/Projects/cagp/src/lib/storage/studentVault.ts)
- Estender `cagp_a11y_prefs_v2` com `theme: z.enum(['system', 'light', 'dark']).default('system')` e `showDesktopDock: z.boolean().default(false)` mantendo 100% de retrocompatibilidade com dados já salvos no `localStorage`.

#### [MODIFY] [storage.test.ts](file:///home/gsathler/Nextcloud/Projects/cagp/tests/storage.test.ts)
- Adicionar asserções unitárias para os novos campos `theme` e `showDesktopDock`.

---

### Camada 2: Fundações CSS, Acessibilidade Real, Modo Noturno FAFICH & Alto Contraste (`BUG-09`, `BUG-10`, `BUG-11`, `BUG-25`)

#### [MODIFY] [global.css](file:///home/gsathler/Nextcloud/Projects/cagp/src/styles/global.css)
1. **Scroll Padding & Prevenção de Colisão com Header (`BUG-04`)**:
   - Adicionar `scroll-padding-top: 6rem;` em `html`.
2. **Escala Tipográfica Dinâmica Real (`BUG-09`)**:
   - `html[data-a11y-font="sm"] { font-size: 93.75%; }` (`15px`)
   - `html[data-a11y-font="md"] { font-size: 100%; }` (`16px`)
   - `html[data-a11y-font="lg"] { font-size: 112.5%; }` (`18px`)
   - `html[data-a11y-font="xl"] { font-size: 125%; }` (`20px`)
3. **Correção do Modo Alto Contraste AAA (`BUG-11`)**:
   - Impedir que filhos (`span`, `i`, `kbd`) de elementos ativos (`.is-active *`, `[aria-selected="true"] *`, `[aria-current="page"] *`) recebam `background-color: #000 !important; color: #ff0 !important`, corrigindo o retângulo preto dentro da pílula amarela `Início`.
   - Preservar visibilidade de barras de progresso (`.bg-\[\#8B1E2D\]`, `.bg-\[\#15803D\]`, `.bg-emerald-600`) e indicadores de status em Alto Contraste usando preenchimento `#FFFF00 !important` com borda contrastante.
4. **Modo Noturno Semântico ("Modo Noturno FAFICH" — `html[data-theme="dark"]:not([data-a11y-contrast="high"])`)**:
   - Variáveis e overrides semânticos para superfícies (`#121210` fundo, `#1C1C19` superfície elevada, `#252521` cards, `#F4F1EA` texto primário, `#A8A29E` texto secundário, `#383832` bordas, `#D4AF37` ouro Candango, `#E06D53` coral rubi legível em fundo escuro).
5. **Correção do Bug dos Botões Indicadores Esticados (`BUG-13`)**:
   - Ajustar a regra global de `min-height: 44px` em `global.css` para não deformar elementos puramente decorativos ou dots com classe `.cagp-dot-btn` (ou usar estrutura interna `<button class="min-w-[44px] min-h-[44px]"><span class="h-2 ..."></span></button>`).
6. **Pose Compacta para Paisagem Mobile (`@media (max-height: 500px) and (orientation: landscape)`)**:
   - Compactar alturas de barras flutuantes e sheets em modo horizontal.

#### [MODIFY] [animations.css](file:///home/gsathler/Nextcloud/Projects/cagp/src/styles/animations.css)
- Adicionar suporte completo a `html[data-a11y-motion="reduced"]` (`BUG-10`), desativando animações infinitas e reduzindo durações de transição para `0.01ms`.

#### [MODIFY] [components.css](file:///home/gsathler/Nextcloud/Projects/cagp/src/styles/components.css) & [passport.css](file:///home/gsathler/Nextcloud/Projects/cagp/src/styles/passport.css)
- Remover a definição duplicada de `.cagp-reading-ruler` em `passport.css` (`BUG-25`) e adicionar `@media (prefers-reduced-transparency: reduce)` em `components.css`.

#### [MODIFY] [grafo.css](file:///home/gsathler/Nextcloud/Projects/cagp/src/styles/grafo.css)
- Aumentar `.grafo-node text.node-code` para `11px` e `.grafo-node text.node-name` para `9.5px`, além de suporte ao Modo Noturno no canvas SVG `.cagp-grafo-viewport`.

---

### Camada 3: Shell Global, Header sem Overflow, Cortina Scroll-Edge & BottomNav (`BUG-03`, `BUG-04`, `BUG-05`, `BUG-06`, `BUG-07`)

#### [MODIFY] [BaseLayout.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/layouts/BaseLayout.astro)
- **Script Anti-FOUC**: Resolver `data-theme` (`light` / `dark` a partir de `p.theme` ou `window.matchMedia('(prefers-color-scheme: dark)')`) e `data-desktop-dock` antes da primeira pintura.
- **Manutenção do Lock de Pinch-to-Zoom**: Preservar integralmente `user-scalable=no` e os listeners de `gesture*` conforme decidido no alinhamento.
- **Listener de `cagp:open-settings` / `cagp:open-a11y`**: Garantir que ambos abram a gaveta de configurações/acessibilidade em qualquer página.

#### [MODIFY] [SuperAppHeader.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/SuperAppHeader.astro) & [navbar.css](file:///home/gsathler/Nextcloud/Projects/cagp/src/styles/navbar.css)
- **Eliminação do Overflow entre `1024px` e `1358px` (`BUG-03`)**:
  - Na Ilha 3, ocultar o texto `"Buscar"`, o badge `<kbd>⌘K</kbd>` e o texto `"CAMPUS"` entre `1024px` e `1360px` (`hidden min-[1360px]:inline`), exibindo-os em telas largas (`>= 1360px`) e mantendo os ícones + ponto pulsante de status sempre visíveis.
  - Ajustar o espaçamento dos itens da Ilha 2 (`gap-0.5 xl:gap-1`, `px-2 xl:px-3`) para que as 3 ilhas caibam com folga em `1024px`.
- **Cortina *Scroll-Edge* (`BUG-04`)**:
  - Adicionar um listener leve de scroll (`window.scrollY > 16`) que aplica `.is-scrolled` ao `<header id="cagp-super-header">`, ativando uma faixa contínua de *Liquid Glass* (`backdrop-blur-md bg-[#F4F1EA]/88 dark:bg-[#121210]/88 border-b border-[#DFDBD2]/80 shadow-xs`) de ponta a ponta para que o `SegmentedControl` e os títulos da página nunca fiquem vazando pelos buracos entre as ilhas.
- **Alvos de Toque `>= 44×44px` (`BUG-05`) & Botão Rápido de Tema/A11y**:
  - Alterar os botões mobile da Ilha 3 de `w-9 h-9` (`36px`) para `w-11 h-11 min-w-[44px] min-h-[44px] sm:w-auto sm:h-10`.
  - Adicionar botão rápido `#cagp-btn-a11y` (`Alt+A` / Tema & Acessibilidade) na Ilha 3.
  - Usar `route('/')` nos links para a página inicial (`BUG-24`).

#### [MODIFY] [BottomNav.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/BottomNav.astro)
- **Rótulos Visíveis e Semântica (`BUG-07`)**:
  - Remover `role="toolbar"` do container interno.
  - Exibir o rótulo curto (`item.label`: `Início`, `Curso`, `Grade`, `Acervo`, `CAGP` + `Ajustes`) em fonte `text-[10px] font-['Oswald'] uppercase font-bold tracking-tight leading-none mt-0.5` abaixo de cada ícone.
  - Expandir cada item para `min-w-[50px] min-h-[46px] px-1.5 py-1 rounded-2xl flex flex-col items-center justify-center`.

#### [MODIFY] [DesktopFloatingDock.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/DesktopFloatingDock.tsx)
- **Fim da Sobreposição de CTAs e Rodapé (`BUG-06`)**:
  - Ler `showDesktopDock` de `cagp_a11y_prefs_v2` (padrão `false`). Se `false`, retornar `null` no Desktop (pois toda a navegação de eixos e utilitários já está na barra superior `SuperAppHeader`). Quando ativado pelo usuário nas configurações, renderizar com alvos `w-11 h-11 min-w-[44px] min-h-[44px]`.

#### [MODIFY] [MobileDrawer.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/MobileDrawer.astro) & [drawer.css](file:///home/gsathler/Nextcloud/Projects/cagp/src/styles/drawer.css)
- Aumentar `#cagp-drawer-close` de `36×36px` para `44×44px` (`BUG-13`).
- Adicionar gesto de swipe para a esquerda (`touchstart`/`touchend` com `deltaX < -60px`) para fechar o drawer.
- Adicionar padding inferior extra e indicador de fade no scroll do corpo do drawer, além de converter os `href="/..."` para `route(...)` (`BUG-24`).

---

### Camada 4: Barras de Abas Mobile (`SegmentedControl` & `AxisNavBar`), Sheets Adaptativos & Onboarding (`BUG-12`, `BUG-13`, `BUG-14`, `BUG-17`, `BUG-19`, `BUG-23`)

#### [MODIFY] [SegmentedControl.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/ui/SegmentedControl.astro)
- **Correção do Corte da 5ª Aba no Mobile (`BUG-14`, `BUG-19`)**:
  - Fazer `.cagp-workspace-tabs` usar `flex-1 min-w-0 overflow-x-auto scrollbar-none scroll-smooth snap-x snap-proximity` com `pr-2` para nunca ficar escondido atrás do botão lateral `Ver Tudo`.
  - No script `activateTab()`, chamar `activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })` para centralizar automaticamente a aba ativa em telas de `390px`.

#### [MODIFY] [AxisNavBar.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/AxisNavBar.astro)
- **Indicador de Scroll Horizontal & Auto-Centralização (`BUG-17`)**:
  - Adicionar classes de fade nas extremidades horizontais no mobile e script em `astro:page-load` para centralizar o item `.is-active` na barra horizontal.

#### [MODIFY] [BottomSheet.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/BottomSheet.tsx)
- **Adaptação Multiplataforma (`Bottom Sheet` no Mobile → `Centered Form Sheet` em `md+`)**:
  - Em `md+` (`>= 768px`), centralizar o painel (`md:items-center md:justify-center md:p-6`) com cantos `md:rounded-2xl md:border-2 md:max-w-xl md:max-h-[85dvh]`, ocultando a pílula de arraste (`md:hidden`).
  - Aumentar o botão de fechar (`✕`) de `w-9 h-9` para `w-11 h-11 min-w-[44px] min-h-[44px]` (`BUG-13`).
  - Adicionar fechamento via tecla `Escape` e trava de rolagem do `document.body` enquanto aberto.

#### [MODIFY] [SuperAppWelcomeModal.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/SuperAppWelcomeModal.tsx)
- **TipKit Contextual Não-Bloqueante & Correção dos Dots Esticados (`BUG-13`)**:
  - Ao carregar pela primeira vez, exibir um **card compacto flutuante (estilo Apple TipKit)** no canto inferior direito (`bottom-20 md:bottom-6 right-4 z-[1045] max-w-sm`) com o resumo de boas-vindas e dois botões: **`"Conhecer em 30s"`** (abre o tour de 3 passos sob demanda) e **`"Dispensar"`** (`✕` `44×44px`).
  - No modal do tour, corrigir os botões indicadores de slide envolvendo a pílula visual (`<span className="h-2 rounded-full ..." />`) dentro de um `<button className="min-w-[44px] min-h-[44px] flex items-center justify-center">`, eliminando as barras verticais esticadas vistas na Screenshot `#2`.

#### [MODIFY] [PassportSheet.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/PassportSheet.tsx), [PageFooter.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/PageFooter.astro), [SettingsTabContent.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/SettingsTabContent.tsx) & [configuracoes.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/configuracoes.astro)
- **Abertura In-Place de Configurações (`BUG-12`, `BUG-23`)**:
  - Em `PassportSheet.tsx`, trocar o `<a href="/configuracoes">` por um `<button type="button">` que fecha o `PassportSheet` e dispara `window.dispatchEvent(new CustomEvent('cagp:open-settings'))` após `60ms`.
  - Em `PageFooter.astro`, trocar o link `/configuracoes` por um botão que dispara `cagp:open-settings` in-place (sem tirar o usuário da página atual), e aplicar `route()` nos demais links do rodapé.
  - Em `configuracoes.astro`, renderizar o componente `SettingsInteractive` diretamente na página (em vez de redirecionar com `window.location.replace('/?openSettings=true')`), para que acessos diretos à URL `/configuracoes` funcionem sem flash de redirecionamento.

---

### Camada 5: Grafo Híbrido em `/percurso#grafo`, Dobra Inicial Mobile & Ilhas Interativas (`BUG-08`, `BUG-15`, `BUG-16`, `BUG-18`, `BUG-20`, `BUG-21`)

#### [MODIFY] [CurriculumGraphDynamic.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curriculum/graph/CurriculumGraphDynamic.tsx) & [CurriculumDetailDrawer.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/curriculum/CurriculumDetailDrawer.tsx)
- **Grafo Híbrido (`[Colunas 10P + Optativas]` vs `[Mapa SVG de Conexões & Trilhas]`) + Detalhes em Modal/Sheet Visível (`BUG-15`)**:
  - Adicionar na barra superior do `CurriculumGraphDynamic.tsx` um seletor de modo:
    1. **`Colunas 10P & Optativas`**: O quadro interativo de 10 semestres com adição de optativas e formação livre.
    2. **`Mapa Cartográfico SVG & Trilhas`**: Renderiza o `CurriculumSvgMap.tsx` com filtro das trilhas temáticas (`TRACK_NAMES`) e legenda cartográfica das travas do SIGA (`ECN 140` → `ECN 044`) e encadeamentos pedagógicos!
  - Quando o estudante clicar em qualquer disciplina (seja nas colunas 10P ou no Mapa SVG), abrir o dossiê da disciplina (`CurriculumDetailDrawer` / modal de ementa, pré-requisitos e botão de conclusão) em um **Modal/Sheet overlay centralizado/inferior com backdrop** (`z-[1055]`), garantindo feedback visual imediato em qualquer posição de rolagem!
  - Aumentar a área de toque dos checkboxes de conclusão de disciplinas para `44×44px` (`BUG-16`).

#### [MODIFY] [HomeHeroHub.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/home/HomeHeroHub.tsx)
- **Fim da Dupla Barra de Abas na Home Mobile (`BUG-08`)**:
  - No Mobile (`< lg`), ocultar a `tablist` `[Passaporte] [UFMG no Agora]` que colidia com o `SegmentedControl` `[Hoje] [Apps] [CAGP]`.
  - Integrar dentro do card do Passaporte no mobile uma faixa compacta ao vivo **"UFMG no Agora"** (exibindo o status em tempo real do **RU II**, **Circular Interno** e **Secretaria/CEAG**) com botão `"Ver painel completo do Campus"` que abre a `CampusSheet` ou expande os detalhes.
  - Elevar micro-textos de `text-[10px]` para `text-[11px]` (`0.6875rem`).

#### [MODIFY] [A11yTabContent.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/A11yTabContent.tsx), [A11ySheet.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/A11ySheet.tsx), [SettingsA11ySection.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/settings/SettingsA11ySection.tsx) & [SettingsInteractive.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/settings/SettingsInteractive.tsx)
- Adicionar seletor de **Tema Visual (`Claro` · `Noturno` · `Sistema`)** e toggle **Dock Flutuante Desktop (`Oculto` · `Visível`)**.
- Garantir que todas as alterações atualizem os atributos `data-theme`, `data-a11y-font`, `data-a11y-contrast`, `data-a11y-motion`, `data-a11y-spacing` e `data-a11y-ruler` em tempo real no `document.documentElement`.

#### [MODIFY] [CalouroChecklistCore.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/calouros/checklist/CalouroChecklistCore.tsx), [AcgCalculatorCore.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/acg/calculator/AcgCalculatorCore.tsx), [Art41SimulatorCore.tsx](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/estagio/art41/Art41SimulatorCore.tsx) & [NormativeDetails.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/ui/NormativeDetails.astro)
- Aumentar os alvos de toque de checkboxes (`CalouroChecklistCore`, `Art41SimulatorCore`) e botões `+/-` (`AcgCalculatorCore`, de `w-10` para `w-11 min-w-[44px] min-h-[44px]`) (`BUG-18`, `BUG-20`, `BUG-21`).
- Em `NormativeDetails.astro`, verificar `prefers-reduced-motion` e `document.documentElement.dataset.a11yMotion === 'reduced'` antes de animar, e cancelar animações concorrentes ao clicar rápido.

#### [MODIFY] Padronização de `route()` e `asset()` (`BUG-24`)
- Aplicar `route()` e `asset()` em [JourneyNav.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/ui/JourneyNav.astro), [faq.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/faq.astro), [documentos/[slug].astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/documentos/%5Bslug%5D.astro), [optativas.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/optativas.astro), [estagio-tcc.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/estagio-tcc.astro) e [mapa-do-site.astro](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/mapa-do-site.astro).

---

## 5. Plano de Verificação Automatizada e Visual (`/browser`)

1. **Testes Estáticos, Unitários e Build de Produção**:
   ```bash
   npm run typecheck
   npm test
   npm run build
   ```
2. **Re-verificação Ao Vivo no `/browser` (`http://127.0.0.1:4321`)**:
   - Confirmar **zero erros de hidratação** (`SyntaxError: createRoot`) no console do navegador em todas as páginas (`BUG-01`).
   - Verificar **zero overflow horizontal** (`scrollWidth <= clientWidth`) em `390px`, `768px`, `1024px`, `1280px`, `1342px` e `1440px` (`BUG-03`).
   - Testar ao vivo no `A11ySheet` a troca de **Tema (`Claro` / `Noturno` / `Alto Contraste`)**, **Tamanho da Fonte (`A-` a `A++`)** e **Movimento Reduzido**, comprovando via `getComputedStyle` que a tipografia escala e o Alto Contraste não quebra a pílula ativa nem as barras de progresso (`BUG-09`, `BUG-10`, `BUG-11`).
   - Verificar em `/percurso` (Mobile `390×844` e Desktop `1440×900`) que a 5ª aba (`DOSSIÊ`) está acessível e centraliza ao clicar (`BUG-14`), e que a aba `GRAFO` alterna entre `Colunas 10P` e `Mapa SVG` abrindo o modal de detalhes visível ao clicar em uma disciplina (`BUG-15`).
   - Capturar novas screenshots "Depois" para o `walkthrough.md` comprovando todas as correções.
