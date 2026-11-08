# Part 7: Playbook Mestre de Prompts Literais & Roadmap de Execução Passo a Passo (`06-phased-implementation-roadmap.md`)
## SuperApp CAGP FAFICH/UFMG — Chapa Semente ("Proposta Materializada para Conquista de Votos")

> [!IMPORTANT]
> **Manual Operacional de Prompts Literais (Copy & Paste)**: Este documento foi reconstruído do zero para servir como seu **arsenal de prompts prontos para copiar e colar no agente de IA**. Cada etapa traz exatamente quais comandos (`/plan`, `/grill-me`, `/boost`, `/goal`, `/teamwork`, `/browser`), quais skills (`impeccable`, `neobrutalism-design-system`, `motion`, `apple-design`, `astro-developer`, `critical-code-reviewer`, `review-testing`) e quais instruções passo a passo enviar ao agente para refinar **Animações, Sidebar, Tour, Fotos Ampliadas, Responsividade Multi-Tela (320px a Ultrawide), Restrição de Dark Mode e cada uma das 26 Telas**.

---

## 1. Mapa Rápido de Comandos Slash & Skills para seus Prompts

| Comando / Skill | Quando usar no início do seu Prompt | O que ele aciona no Agente |
| :--- | :--- | :--- |
| **`/grill-me`** | Antes de mexer em fluxos complexos (Tour, Sidebar, Home, Chapa Semente, Calculadora 600h) | Faz o agente te entrevistar pergunta por pergunta (com opção recomendada) até fechar 100% das decisões de design e UX antes de codar. |
| **`/plan`** | Sempre que quiser revisar o plano técnico detalhado (arquivos, diffs e testes) antes da execução | Gera o artefato de plano de implementação com botão **Proceed** e só altera o código após sua aprovação. |
| **`/impeccable`** | Em **todos** os prompts de UI/UX (`bolder`, `overdrive`, `animate`, `adapt`, `delight`, `polish`, `distill`, `onboard`, `audit`) | Ativa o motor mestre de qualidade, unificação BoldKit + Neobrutalism, foco na conversão de votos da Chapa Semente e piso de qualidade (`craft-floor.md`). |
| **`/motion`** | Ao trabalhar em animações `motion/react`, molas táteis, fotos interativas, Sidebar, Drawers e Canvas Shaders | Ativa as diretrizes de física de mola, `AnimatePresence`, `layoutId` e performance a 60fps sem redução de movimento. |
| **`/neobrutalism-design-system`** | Ao padronizar cards, botões, tabelas, gráficos, stickers, selos e blocos BoldKit | Garante bordas sólidas de `3px` (`#16181d`), sombras duras de `4px` a `8px`, mecânica de clique e tokens rL9Ap. |
| **`/apple-design`** | Ao calibrar responsividade (`320px` a `1920px+`), alvos de toque `44x44pt` e `safe-area-inset` | Garante ergonomia móvel perfeita no iOS/Android sem perder a agressividade estética Neobrutalista. |
| **`/boost`** ou **`/goal`** | Quando quiser que o agente execute uma bateria longa de telas sem parar até passar em todos os testes | Ativa execução profunda, verificação contínua e rigor máximo até concluir 100% do escopo. |

---

## 2. Regras Inegociáveis Embutidas em Todos os Prompts

1. **Foco Principal = Proposta Materializada para Conquistar Votos**: O SuperApp é a **Proposta 3 do Eixo 1 da Chapa Semente entregue antes da eleição (25 e 26/11/2026)**. Toda tela e ferramenta deve encantar o aluno e converter essa utilidade em voto na Chapa Semente.
2. **Unificação Estrita BoldKit.dev + Neobrutalism.com**: Borda `3px solid #16181d`, raio `12px`, sombras duras sem blur (`4px 4px 0 #16181d` a `8px 8px 0 #16181d`), clique mecânico (`translate-x-[3px] translate-y-[3px] shadow-none`), stickers e carimbos.
3. **Foco Total nas Animações (Ignorando `prefers-reduced-motion`)**: Todas as animações (`motion/react`, molas, marquees, 23 Canvas Shaders 60fps, transições de Sidebar e Tour) ficam **100% ativas sempre**, removendo qualquer bloqueio de `prefers-reduced-motion`.
4. **Destaque no Aumento das Fotos + Animações nas Fotos**: Fotos da Chapa Semente, lideranças, espaços da FAFICH e acervo histórico significativamente ampliadas (`aspect-[4/5]`, molduras editoriais grandes) com zoom elástico e rotação no hover/toque (`photoCardHover`).
5. **Responsividade Multi-Tela (`320px` a `1920px+`)**: Layout perfeito em celulares compactos (`320px`), smartphones modernos (`375px–430px`), tablets em retrato/paisagem (`768px–1024px`), notebooks (`1280px–1440px`) e ultrawide (`1920px+`).
6. **Restrição Estrita de Dark Mode (`Light Mode Exclusivo`)**: Proibido Dark Mode (`dark:*`, `.dark`, `prefers-color-scheme: dark`). Forçar `color-scheme: light` sobre Papel Quente (`#f4f5f7`/`#f4f0ea`), Cartão Branco (`#ffffff`) e Tinta Preta (`#16181d`), mantendo apenas o Alto Contraste AAA (`data-a11y-contrast="high"`).

---

## 3. Sequência de Prompts Literais — Camadas Globais & Componentes Críticos

### ETAPA 0: Alinhamento Rápido de Decisões Visuais (`/grill-me` + `/plan`)
Use este prompt quando quiser alinhar detalhes finos com o agente antes de disparar mudanças em massa:

```text
/grill-me /plan /impeccable
Leia as especificações canônicas em:
- _referencias/design-system/matrix/cagp-astro/00-briefing-and-vision.md
- _referencias/design-system/matrix/cagp-astro/00-product-spec-and-journeys.md
- _referencias/design-system/matrix/cagp-astro/00-design-system-specification.md

Quero alinhar e planejar a execução da padronização estrita BoldKit.dev + Neobrutalism.com no SuperApp CAGP com foco em:
1. Materializar a proposta da Chapa Semente para conquistar votos na eleição da FAFICH/UFMG.
2. Ativar animações expressivas em 100% da interface ignorando prefers-reduced-motion.
3. Restringir estritamente o Dark Mode (forçar Light Mode exclusivo, mantendo apenas Alto Contraste AAA).
4. Aumentar substancialmente o tamanho das fotos com animações de zoom/tilt.
5. Garantir responsividade impecável entre 320px, 375px-430px, 768px-1024px, 1280px-1440px e 1920px+.

Inspecione o código atual em src/ e me faça perguntas objetivas (uma por vez, com recomendação) sobre qualquer ponto em aberto antes de gerar o plano de implementação.
```

---

### ETAPA 1: Fundação CSS, Restrição de Dark Mode, Motor de Animações (`motion.ts`) & Responsividade Base
Este prompt prepara toda a base de estilos (`src/styles/`) e a biblioteca central de física (`src/lib/motion.ts`):

```text
/plan /impeccable /motion /neobrutalism-design-system /apple-design
Execute a Etapa 1 da padronização fundacional do SuperApp CAGP seguindo _referencias/design-system/matrix/cagp-astro/00-design-system-specification.md e 01-tokens-and-foundations.md:

1. CRIAR/ATUALIZAR `src/lib/motion.ts`:
   - Exporte `FORCE_EXPRESSIVE_MOTION = true`.
   - Exporte os presets de mola: `tactileSpring` (stiffness: 450, damping: 30), `bounceSpring` (stiffness: 500, damping: 22), `photoZoomSpring` (stiffness: 380, damping: 24), `drawerSpring` (stiffness: 350, damping: 35).
   - Exporte variantes prontas: `photoCardHover` (`scale: 1.06, rotate: -1.5, y: -4`), `cardHoverVariants` (`x: -2, y: -2`, sombra expandida `6px 6px 0 #16181d`), `buttonTapVariants` (`x: 3, y: 3`), `staggerContainer` e `staggerItem`.

2. REMOVER BLOQUEIOS DE `prefers-reduced-motion`:
   - Vasculhe `src/styles/global.css`, `src/styles/animations.css`, `src/styles/boldkit.css`, `src/components/shell/GlobalCanvasBackdrop.tsx`, `src/components/ui/marquee.tsx` e todos os componentes em `src/components/boldkit/canvas-effects/`.
   - Remova ou neutralize qualquer `@media (prefers-reduced-motion: reduce)` ou verificação JS de ` matchMedia('(prefers-reduced-motion: reduce)')` que pause ou desative animações, marquees ou Canvas Shaders. Todas as animações devem rodar sempre a 60fps.

3. RESTRINGIR ESTRITAMENTE O DARK MODE (MODO CLARO EXCLUSIVO):
   - Em `src/layouts/BaseLayout.astro` e `src/styles/global.css`, force `color-scheme: light !important` no `<html>` e `:root`.
   - Remova/bloqueie qualquer classe `.dark`, variante `dark:*` ou `@media (prefers-color-scheme: dark)` que escureça superfícies fora do modo `html[data-a11y-contrast="high"]`.
   - Em `src/components/shell/SettingsTabContent.tsx`, `src/components/shell/A11yTabContent.tsx` e `src/pages/configuracoes.astro`, garanta que não exista toggle de Dark Mode comum (apenas o modo claro editorial Semente e o switch de Alto Contraste AAA para acessibilidade).

4. RESPONSIVIDADE MULTI-TELA & UTILITÁRIOS:
   - Adicione `.scroll-mask-x` em `src/styles/components.css` para rolagem horizontal suave sem corte seco em abas e filtros no mobile (`320px–430px`).
   - Garanta alvos táteis mínimos de `44x44pt` com pseudo-elemento `before:inset-[-4px]` nas variantes `xs` e `sm` de `src/components/ui/button.tsx`.
   - Verifique que não exista `overflow-x` indesejado de `320px` até `1920px+`.
```

---

### ETAPA 2: Sidebar Animada, Header, BottomNav & CampaignBanner Smart Scroll (Shell Global)
Prompt literal focado exclusivamente na arquitetura de navegação, Sidebar, responsividade entre Mobile/Tablet/Desktop e banner de campanha:

```text
/plan /impeccable /motion /apple-design /neobrutalism-design-system
Refine passo a passo todo o Shell Global e a Sidebar do SuperApp CAGP em `src/layouts/BaseLayout.astro` e `src/components/shell/`:

1. SIDEBAR EXPRESSIVA & RESPONSIVA (`src/components/shell/AppShellSidebar.astro`, `src/components/shell/AppShellSidebarIsland.tsx`, `src/components/ui/sidebar.tsx`, `src/styles/sidebar.css`):
   - Padronize a Sidebar estritamente no estilo BoldKit + Neobrutalism: borda direita de `3px solid #16181d`, cartões de eixo com sombra dura, badges em `Space Mono` e destaque da Chapa Semente no topo/rodapé da sidebar (CTA direto para `/chapa-semente` com selo "Proposta Materializada — Vote Semente").
   - Adicione animações expressivas com `motion/react`:
     * Indicador ativo deslizante com `layoutId="sidebar-active-indicator"` e mola `tactileSpring`.
     * Micro-interação no hover dos links (`x: 4`, elevação de sombra dura) e compressão mecânica no tap (`x: 2, y: 2`).
     * Expansão/colapso da sidebar no desktop (`1280px+`) com transição de mola fluida (`drawerSpring`).
     * No Tablet (`768px–1024px`) e Mobile (`< 768px`), a gaveta da Sidebar deve abrir com `z-[1100]` (acima do `CampaignBanner` `z-[1050]`), backdrop opaco pontilhado neobrutalista e física de mola sem qualquer travamento.

2. CAMPAIGN BANNER COM SMART SCROLL & CONVERSÃO DE VOTOS (`src/components/shell/CampaignBanner.astro`):
   - Destaque claramente que este SuperApp é uma **Proposta da Chapa Semente Materializada** e inclua botão CTA vibrante Laranja Germinar (`#FF8811`) para conhecer as 14 propostas e votar nos dias 25 e 26/11.
   - Implemente o comportamento **Smart Scroll**:
     * No topo da página (`scrollY <= 80px`), exibe o banner completo com animação sutil de brilho/selo.
     * Ao rolar para baixo (`scrollY > 80px`), colapsa suavemente com transição elástica para uma micro-faixa tricolor Semente de `24px` de altura com o botão tátil `"Compromisso Semente ▼"`.
     * Ao rolar para cima ou clicar no botão, restaura o banner completo instantaneamente.

3. MODOS DINÂMICOS NO `BaseLayout.astro`, `SuperAppHeader.astro` & `BottomNav.astro`:
   - Adicione a prop `mode?: 'persuade' | 'operate' | 'read'` em `src/layouts/BaseLayout.astro` (`data-visitor-mode={mode}`).
   - Em `SuperAppHeader.astro` e `BottomNav.astro`, aplique bordas de `3px solid #16181d`, alvos de toque de `44x44pt`, respeito a `safe-area-inset-top` e `safe-area-inset-bottom`, e feedback tátil animado ao trocar de eixo nos 5 pilares móveis.
```

---

### ETAPA 3: Tour Guiado Interativo, Onboarding Discente & Passaporte Semente
Prompt literal focado no componente de **Tour**, **Welcome Modal**, **Onboarding** e **Passaporte Discente**:

```text
/plan /impeccable /motion /neobrutalism-design-system
Use as referências `onboard.md`, `animate.md` e `delight.md` da skill `/impeccable` para refinar o Tour Guiado, o Onboarding e o Passaporte Discente:

1. TOUR GUIADO INTERATIVO (`src/components/ui/tour.tsx` e `src/components/boldkit/blocks/onboarding-flow.tsx`):
   - Padronize o popover e os cartões do Tour com estética estrita BoldKit + Neobrutalism: borda `3px solid #16181d`, sombra dura `6px 6px 0 #16181d`, cabeçalho Roxo Semente (`#5B2A86`) ou Laranja Germinar (`#FF8811`), contador de passos em `Space Mono` (`PASSO 01/05`) e barra de progresso mecânica listrada.
   - Adicione animações expressivas (`motion/react` sem redução de movimento):
     * Transição do recorte/spotlight entre os elementos da tela com interpolação de mola (`tactileSpring`).
     * Entrada de cada card do tour com `<AnimatePresence mode="wait">` e `bounceSpring` (`scale: 0.92 -> 1`, `y: 12 -> 0`).
     * Botões `"Próximo →"`, `"← Anterior"` e `"Concluir Tour"` com clique mecânico e 44px de altura mínima.
   - Responsividade do Tour: em telas móveis (`320px–767px`), posicione o card do Tour automaticamente na parte inferior ou superior segura (`max-w-[calc(100vw-2rem)]`) para nunca cortar fora da viewport; em tablets e desktops, ancore ao lado do elemento destacado.

2. MODAL DE BOAS-VINDAS & SELETOR DE MOMENTO DISCENTE (`src/components/shell/SuperAppWelcomeModal.tsx`):
   - Apresente o SuperApp logo no primeiro acesso como **"A Proposta da Chapa Semente Materializada para Você"**.
   - Permita escolher o perfil (`Calouro`, `Veterano`, `Formando`, `Ingressante`) com cartões neobrutalistas animados (`staggerContainer`, hover elevado e selo carimbado ao selecionar) e botão para iniciar o Tour Guiado pela plataforma.

3. PASSAPORTE DISCENTE & AVATARES AMPLIADOS (`src/components/features/passport/PassportCard.tsx`, `src/components/passport/AvatarRenderer.tsx`, `src/components/shell/PassportSheet.tsx`):
   - Aumente significativamente o quadro do avatar/foto no Passaporte Discente com moldura de `3px`, sombra de `6px`, efeito de flip/inclinação 3D ou mola no hover/toque e carimbos (`cagp-stamp`) animados a cada conquista desbloqueada.
```

---

### ETAPA 4: Destaque no Aumento das Fotos & Animações Fotográficas em Todo o Portal
Prompt literal para ampliar as fotos e aplicar animações expressivas em todas as galerias, cards de integrantes da chapa e imagens históricas:

```text
/plan /impeccable /motion /neobrutalism-design-system
Execute uma intervenção dedicada de Destaque Fotográfico Ampliado e Fotografia Interativa (`delight` + `bolder` + `animate`) em todo o SuperApp CAGP:

1. COMPONENTES ALVO:
   - `src/components/boldkit/blocks/team-section.tsx`
   - `src/components/features/semente/CartaPropostaInteractive.tsx`
   - `src/components/features/cagp/gestao/CagpGestaoDiretoria.astro`
   - `src/components/features/cagp/historia/CagpHistoriaCore.astro`
   - `src/components/features/calouros/espacos/CalouroEspacosCore.astro`
   - `src/components/ui/avatar.tsx` e `src/components/ui/layered-card.tsx`

2. AUMENTO SUBSTANCIAL DAS FOTOS:
   - Substitua avatares pequenos ou miniaturas tímidas por molduras editoriais amplas e imponentes:
     * Em `team-section.tsx`, `CagpGestaoDiretoria.astro` e `/chapa-semente`: use containers de retrato grandes (`aspect-[4/5]`, altura mínima de `280px` a `360px` no desktop/tablet e largura total generosa no mobile), ocupando o topo inteiro do card com a foto em alta definição.
     * Em seções históricas (`/sobre`, `/curso`) e de espaços da FAFICH (`/calouros`): use molduras panorâmicas ou retratos destacados com borda `3px solid #16181d` e sombra dura `6px 6px 0 #16181d` (ou `8px 8px 0 #16181d`).

3. ANIMAÇÕES EXPRESSIVAS NAS FOTOS (SEM MOTION REDUCTION):
   - Envolva as molduras de fotos em containers animados (`motion/react` ou classes cinéticas equivalentes em Astro) usando `photoZoomSpring` / `photoCardHover`:
     * No hover/toque: zoom elástico na imagem (`scale: 1.06` a `1.08`), leve inclinação brutalista da moldura (`rotate: -1.5deg` ou `1.5deg`), elevação da sombra para `8px 8px 0 #16181d` e animação de entrada nos stickers/badges sobrepostos (ex.: cargo na Chapa Semente, período ou local da FAFICH).
   - Garanta que as imagens mantenham `object-cover` perfeito e responsividade fluida de `320px` a `1920px+`.
```

---

### ETAPA 5: Padronização das 102 Primitivas UI, 20 Blocos BoldKit, 23 Shaders & 14 Gráficos
Prompt literal para unificar todos os componentes de base antes da revisão tela por tela:

```text
/plan /impeccable /neobrutalism-design-system /motion
Padronize os componentes de `src/components/ui/` e `src/components/boldkit/` seguindo estritamente _referencias/design-system/matrix/cagp-astro/02-ui-components-matrix.md e 03-boldkit-blocks-canvas-charts.md:

1. PRIMITIVAS UI CRÍTICAS (`button.tsx`, `card.tsx`, `badge.tsx`, `tabs.tsx`, `accordion.tsx`, `dialog.tsx`, `drawer.tsx`, `sheet.tsx`, `data-table.tsx`, `stat-card.tsx`, `sticker.tsx`, `SegmentedControl.astro`, `PageHeader.astro`):
   - Garanta bordas sólidas de `3px` (`#16181d`), sombras duras `4px` a `6px`, zero `backdrop-blur`, zero estilos `dark:*` e transições táteis com mola em abas, acordeões, modais e botões.
   - Em `PageHeader.astro`: implemente suporte explícito ao modo condensado (`condensed?: boolean`) para telas `Operate` e ocultação limpa quando a página estiver em modo `Persuade` com `HeroCentered`.

2. BLOCOS BOLDKIT (`hero-section.tsx`, `bento-grid.tsx`, `feature-grid.tsx`, `cta-section.tsx`, `faq-section.tsx`, `testimonials.tsx`, `stats-section.tsx`, `comparison-table.tsx`, `changelog-section.tsx`):
   - Aplique animações de entrada escalonadas (`staggerContainer` + `staggerItem` de `src/lib/motion.ts`), hover tátil nos cards do Bento Grid e CTAs que reforcem a mensagem eleitoral da Chapa Semente.

3. 23 CANVAS SHADERS & 14 GRÁFICOS RECHARTS (`src/components/boldkit/canvas-effects/*` e `src/components/boldkit/charts/*`):
   - Certifique-se de que todos os 23 shaders rodem a 60fps constantes (sem pausa por `prefers-reduced-motion`) e redimensionem perfeitamente via `ResizeObserver` em qualquer tela.
   - Nos gráficos Recharts (`donut-chart.tsx`, `gauge-chart.tsx`, `radar-chart.tsx`, etc.), force traço preto de `3px` nas barras/fatias, paleta Semente (`#5B2A86`, `#FF8811`, `#134E4A`, `#9E2424`), animações de preenchimento ativas (`isAnimationActive={true}`) e tooltips neobrutalistas com sombra dura.
```

---

## 4. Prompts Literais Passo a Passo por Tela (As 26 Rotas em `src/pages/`)

Você pode executar os prompts abaixo **por Eixo Temático** (5 baterias) ou **tela por tela** conforme preferir.

---

### BATERIA EIXO 1: Hoje & Campus (`/`, `/noticias`, `/noticias/[slug]`)

```text
/plan /impeccable /motion /neobrutalism-design-system /apple-design
Execute o refinamento completo de UX/UI, animações expressivas, destaque de fotos e responsividade nas 3 telas do Eixo 1 (Hoje & Campus), mantendo Light Mode exclusivo e foco na conquista de votos para a Chapa Semente:

1. TELA 01 — HOME / COCKPIT DISCENTE (`src/pages/index.astro`, `src/components/features/home/HomeWorkspaceA.tsx`, `HomeCampusStatusWidget.tsx`, `HomeNewsFeed.tsx`, `HomeCalouroGuide.tsx`, `HomeAcademicTools.tsx`):
   - Destaque imediato no topo: apresente o SuperApp como **Proposta Materializada da Chapa Semente** com banner/card interativo de alto impacto, sticker giratório e CTA direto para `/chapa-semente`.
   - Seletor `"Perfil Discente"` (`Calouro`, `Veterano`, `Formando`, `Ingressante`): use pílulas táteis com `.scroll-mask-x` no mobile e transição `<AnimatePresence mode="wait">` com mola `tactileSpring` ao alternar o conteúdo dos cards.
   - Widget do Plantão Noturno (RU Setorial II + Circular): aplique pulsação viva nos indicadores de status, tipografia tabular `Space Mono` e bordas `3px`.
   - Marquee Neobrutalista: mantenha rolagem contínua ativa (sem bloqueio de motion reduction) com palavras de ordem e entregas da Chapa Semente.
   - Responsividade: teste e ajuste o grid Bento para 1 coluna em `320px–639px`, 2 colunas em `640px–1023px` e 3–4 colunas em `1024px+`.

2. TELA 02 — MURAL DE NOTÍCIAS & EDITAIS (`src/pages/noticias/index.astro`, `src/components/features/cagp/CagpNewsMural.tsx`):
   - Configure `BaseLayout` com `mode="read"`.
   - Amplie as imagens/capas dos cards de notícias (`aspect-[16/10]` com borda `3px` e sombra `6px`) e adicione zoom elástico (`photoCardHover`) no hover/toque.
   - Filtros de categoria com pílulas animadas, `.scroll-mask-x` em telas pequenas e entrada escalonada (`staggerItem`) nos cards.

3. TELA 03 — LEITOR DE NOTÍCIA INDIVIDUAL (`src/pages/noticias/[slug].astro`):
   - Configure `mode="read"` com coluna central confortável (`max-w-prose` / `65–75ch`), imagem de capa ampliada com moldura neobrutalista, barra de progresso de leitura no topo e card de compartilhamento/apoio à Chapa Semente no final do artigo.
```

---

### BATERIA EIXO 2: O Curso, Calouros & Permanência (`/calouros`, `/curso`, `/permanencia`, `/pesquisa`)

```text
/plan /impeccable /motion /neobrutalism-design-system /apple-design
Execute o refinamento completo de UX/UI, animações expressivas, aumento de fotos e responsividade nas 4 telas do Eixo 2 (O Curso, Calouros & Permanência), mantendo Light Mode exclusivo e foco na conquista de votos para a Chapa Semente:

1. TELA 04 — GUIA DE SOBREVIVÊNCIA DO CALOURO (`src/pages/calouros.astro`, `src/components/features/calouros/CalouroCentralOverview.astro`, `CalourosOnboardingGuide.tsx`, `checklist/CalouroChecklistCore.tsx`, `espacos/CalouroEspacosCore.astro`, `fump/CalouroFumpCore.astro`, `noturno/CalouroNoturnoCore.astro`):
   - Configure `mode="operate"` com `PageHeader` condensado e remova qualquer banner Aurora duplicado que empurre o conteúdo para baixo no mobile.
   - No `CalouroChecklistCore.tsx`: adicione animação de carimbo/confete tátil (`bounceSpring`) ao marcar cada item dos primeiros 30 dias e barra de progresso animada salva no `studentVault.ts`.
   - No `CalouroEspacosCore.astro`: amplie significativamente as fotos dos espaços da FAFICH (Sala do CAGP F-4000, Colegiado F-2039, Auditório Sônia Viegas, RU II) com molduras `3px`, sombra `6px` e efeito `photoCardHover`.
   - Destaque a Proposta 7 da Chapa Semente (Recepção e Integração de Calouros) com CTA eleitoral claro.

2. TELA 05 — O BACHARELADO EM GESTÃO PÚBLICA (`src/pages/curso.astro`, `src/components/features/curso/*`):
   - Destaque a história dos Candangos de 1959 com fotos históricas ampliadas em molduras editoriais grandes, linha do tempo animada (`timeline.tsx`) e cartões comparativos de carreira pública.

3. TELA 06 — PERMANÊNCIA & ASSISTÊNCIA ESTUDANTIL FUMP (`src/pages/permanencia.astro`):
   - Configure `mode="operate"`: organize os níveis da FUMP, moradia, auxílio alimentação e bolsas em cards BoldKit de leitura rápida, simulador/passo a passo interativo animado e botão direto para acolhimento pelo CA.

4. TELA 07 — NÚCLEOS DE PESQUISA & EXTENSÃO (`src/pages/pesquisa.astro`):
   - Apresente os laboratórios e grupos de pesquisa da FAFICH/DCP em grade Bento animada (`bento-grid.tsx`) com filtros responsivos, tags em `Space Mono` e links diretos com alvos de `44x44pt`.
```

---

### BATERIA EIXO 3: Vida Acadêmica & 600h (`/acg`, `/percurso`, `/optativas`, `/cursos`)

```text
/plan /impeccable /motion /neobrutalism-design-system /apple-design
Execute o refinamento completo de UX/UI, animações expressivas e responsividade nas 4 telas do Eixo 3 (Vida Acadêmica & 600h), mantendo Light Mode exclusivo e conectando cada ferramenta à conquista de votos para a Chapa Semente:

1. TELA 08 — CENTRAL DE HORAS 600h & GUARDIÃO 120 DIAS (`src/pages/acg.astro`, `src/components/features/acg/calculator/AcgCalculatorCore.tsx`, `guardian/AcgGuardianCore.tsx`, `tramitacao/AcgTramitacaoCore.astro`):
   - Configure `mode="operate"` com cabeçalho direto `"Horas & 600h"` e microcopy canônico (`"Simular Horas"`, `"Alerta 120 Dias"`).
   - Na `AcgCalculatorCore.tsx`: anime os medidores (`gauge-chart.tsx` / barras de 300h Extensão + 300h AAC) com física de mola ao adicionar certificados e destaque com um selo **"Ferramenta Criada pela Chapa Semente"**.
   - No `AcgGuardianCore.tsx`: aplique animação de carimbo mecânico vermelho (`#9E2424`) quando um certificado estiver próximo ou acima do prazo fatal de 120 dias corridos (Art. 15).
   - Garanta layout empilhado perfeito em `320px–767px` e lado a lado em `1024px+`.

2. TELA 09 — GRAFO CURRICULAR DE 10 PERÍODOS (`src/pages/percurso.astro`, `src/components/features/curriculum/graph/CurriculumGraphDynamic.tsx`, `CourseDetailDrawer.tsx`, `PercursosComparativeMatrix.tsx`):
   - No `CurriculumGraphDynamic.tsx`: adicione `.scroll-mask-x` e controles de zoom/filtro táteis (`44x44pt`) para navegação fluida em telas móveis e tablets, com destaque animado das cadeias de pré-requisito ao clicar em uma disciplina e abertura suave do `CourseDetailDrawer.tsx`.

3. TELA 10 — CATÁLOGO DE 95 OPTATIVAS (`src/pages/optativas.astro`, `src/components/features/curriculum/catalog/OptativasCatalogExplorer.tsx`):
   - Padronize a `data-table.tsx` e os cards de disciplinas no estilo BoldKit + Neobrutalism: busca instantânea com foco Roxo Semente, filtros por departamento (DCP, FACE, FAE, etc.) com rolagem horizontal mascarada no mobile e animação nos cards filtrados.

4. TELA 11 — CURSOS LIVRES & FORMAÇÃO (`src/pages/cursos.astro`):
   - Conecte diretamente à **Proposta 10 da Chapa Semente (Cursos Livres)**, exibindo os cursos gratuitos (ENAP/EV.G/UFMG) em cards com badges de carga horária válidas para ACG, hover elevado e botão de inscrição/simulação.
```

---

### BATERIA EIXO 4: Reta Final, Estágio & Carreira (`/estagio`, `/tcc`, `/estagio-tcc`, `/carreira`)

```text
/plan /impeccable /motion /neobrutalism-design-system /apple-design
Execute o refinamento completo de UX/UI, animações expressivas e responsividade nas 4 telas do Eixo 4 (Reta Final, Estágio & Carreira), mantendo Light Mode exclusivo e foco na conquista de votos para a Chapa Semente:

1. TELA 12 — ESTÁGIO SUPERVISIONADO 300h & SIMULADOR ART. 41 (`src/pages/estagio.astro`, `src/components/features/estagio/art41/Art41SimulatorCore.tsx`, `tce/EstagioTceCore.astro`, `EstagioDocumentDrawerAndGuide.tsx`):
   - Configure `mode="operate"` e use o microcopy canônico **"Aproveitamento Servidor"** para a trilha do Art. 41.
   - No `Art41SimulatorCore.tsx`: adicione transições de mola entre as perguntas de elegibilidade, carimbo verde petróleo (`#134E4A`) no resultado de dispensa e download direto dos modelos de requerimento.

2. TELA 13 — MANUAL & CRONOGRAMA DE TCC (`src/pages/tcc.astro`, `src/components/features/tcc/cronograma/TccCronogramaTimeline.astro`, `modalidades/TccModalidadesExplorer.astro`):
   - Padronize a tabela comparativa (Monografia vs Artigo Científico) e a linha do tempo de defesa com bordas `3px`, sombras `4px` e animações de expansão nos detalhes normativos.

3. TELA 14 — HUB INTEGRADOR ESTÁGIO & TCC (`src/pages/estagio-tcc.astro`):
   - Crie um painel visual unificado para a persona `Formando`, com checklist animado de colação de grau, progresso salvo localmente e responsividade impecável em celulares e desktops.

4. TELA 15 — CARREIRA, VAGAS & BANCO DE TALENTOS (`src/pages/carreira.astro`, `src/components/features/carreira/*`):
   - Conecte às **Propostas 9, 11 e 12 da Chapa Semente** (Parcerias com Órgãos Públicos/OSCs, Apoio à Empresa Júnior e Divulgação Ativa de Vagas), com cards animados de oportunidades e formulário interativo do Banco de Talentos.
```

---

### BATERIA EIXO 5: Campanha Chapa Semente, Transparência & Governança (As 11 Rotas Institucionais e Eleitorais)

```text
/plan /impeccable /motion /neobrutalism-design-system /apple-design
Execute o refinamento máximo de persuasão eleitoral (`mode-persuade` + `overdrive` + `bolder` + `delight`), aumento de fotos, animações sem motion reduction e responsividade nas 11 telas do Eixo 5:

1. TELA 16 — PÁGINA OFICIAL DA CHAPA SEMENTE (`src/pages/chapa-semente.astro`, `src/components/features/semente/CartaPropostaInteractive.tsx`, `src/components/boldkit/blocks/hero-section.tsx`, `team-section.tsx`):
   - Configure `mode="persuade"`: **remova o `PageHeader.astro` duplicado** para que o `HeroCentered` com Canvas Shader 60fps seja o protagonista absoluto logo no primeiro viewport.
   - AUMENTO DAS FOTOS DOS CANDIDATOS: exiba as fotos dos integrantes da Chapa Semente em formato retrato grande (`aspect-[4/5]`, `min-h-[320px]`), com borda `3px solid #16181d`, sombra dura `8px 8px 0 #16181d`, sticker do cargo e animação `photoCardHover` (`scale: 1.06, rotate: -1.5`).
   - Na `CartaPropostaInteractive.tsx`: apresente os 4 Eixos e as 14 Propostas com filtros animados (`AnimatePresence`), destacando a **Proposta 3 (Este SuperApp já materializado)** com carimbo dourado/laranja e CTAs diretos de compromisso de voto nos dias 25 e 26 de Novembro.

2. TELA 17 — PORTAL DA TRANSPARÊNCIA & LIVRO-CAIXA ABERTO (`src/pages/transparencia.astro`, `src/components/features/cagp/CagpTransparenciaPortal.tsx`):
   - Configure `mode="persuade"`: remova o `PageHeader.astro` duplicado e a sub-navegação redundante dentro de `CagpTransparenciaPortal.tsx`.
   - Use o título canônico **"Livro-Caixa Aberto"** (Proposta 1 do Eixo 1 materializada), com gráficos Recharts animados (`donut-chart.tsx`, `chart.tsx`), cartões de balancete estilo `invoice.tsx` e filtro interativo de receitas/despesas.

3. TELA 18 — SOBRE O CAGP & HISTÓRIA (`src/pages/sobre.astro`, `src/components/features/cagp/historia/CagpHistoriaCore.astro`, `estatuto/CagpEstatutoCore.astro`):
   - Amplie as fotografias históricas e da sede F-4000 com molduras neobrutalistas animadas e apresente o Estatuto em acordeões táteis de fácil leitura (`65–75ch`).

4. TELA 19 — GESTÃO & DIRETORIAS (`src/pages/gestao.astro`, `src/components/features/cagp/gestao/CagpGestaoDiretoria.astro`):
   - Exiba as 9 diretorias com fotos/retratos ampliados, atribuições claras e botão de contato direto com cada pasta.

5. TELA 20 — OUVIDORIA DISCENTE SEGURA (`src/pages/ouvidoria.astro`, `src/components/features/ouvidoria/*`):
   - Use o rótulo acolhedor canônico **"Fala com o CA"** (Proposta 14 da Chapa Semente), formulário multi-etapas animado (`multi-step-form.tsx`) com garantia visual de sigilo local e feedback de protocolo carimbado.

6. TELAS 21 & 22 — ACERVO DE DOCUMENTOS & LEITOR NORMATIVO (`src/pages/documentos.astro` e `src/pages/documentos/[slug].astro`):
   - Configure `mode="read"`, busca instantânea por resoluções/atas, sumário recolhível em gaveta no mobile e cartões de download com borda `3px` e sombra `4px`.

7. TELA 23 — CENTRAL DE DÚVIDAS FREQUENTES (`src/pages/faq.astro`, `src/components/boldkit/blocks/faq-section.tsx`):
   - Acordeões BoldKit com animação de altura fluida, busca instantânea por palavra-chave e card final convidando a conhecer as propostas da Chapa Semente.

8. TELA 24 — MAPA DO SITE INTERATIVO (`src/pages/mapa-do-site.astro`):
   - Árvore visual dos 5 Eixos e 26 rotas com cards neobrutalistas animados no hover e atalho `⌘K`.

9. TELA 25 — CONFIGURAÇÕES, ACESSIBILIDADE & COFRE LOCAL (`src/pages/configuracoes.astro`, `src/components/shell/SettingsTabContent.tsx`, `A11yTabContent.tsx`):
   - Garanta que **não exista opção de Dark Mode** (restringido estritamente ao modo claro editorial Semente), mantendo os seletores de tamanho de fonte (`sm`, `md`, `lg`, `xl`), fonte `OpenDyslexic`, **Alto Contraste AAA** e exportação/backup do cofre `studentVault.ts`.

10. TELA 26 — PÁGINA 404 NEOBRUTALISTA (`src/pages/404.astro`, `src/components/boldkit/blocks/error-pages.tsx`):
    - Configure `mode="persuade"` com animação expressiva, ilustração/sticker brutalista da FAFICH, busca rápida `⌘K` e botão para voltar à Home ou conhecer a Chapa Semente.
```

---

## 5. Etapa Final: Prompt Literal de Auditoria 360°, Responsividade & Homologação

Depois de aplicar os prompts acima, cole este prompt final para validar que todas as diretrizes (animações sem motion reduction, fotos ampliadas, zero dark mode, responsividade multi-tela e conversão eleitoral) estão 100% aprovadas:

```text
/impeccable /apple-design /neobrutalism-design-system /motion
Ative os modos `audit`, `critique` e `polish` do `/impeccable` junto com as skills `critical-code-reviewer` e `review-testing` para executar a homologação 360° do SuperApp CAGP:

1. AUDITORIA DE REGRAS INEGOCIÁVEIS:
   - Confirme que não resta nenhum bloqueio `prefers-reduced-motion` desativando animações CSS, `motion/react` ou Canvas Shaders.
   - Confirme que o Dark Mode está 100% restrito (`color-scheme: light` ativo, zero classes `.dark` ou `prefers-color-scheme: dark` ativas, preservando apenas `data-a11y-contrast="high"`).
   - Confirme que as fotos em `/chapa-semente`, `team-section.tsx`, `/sobre`, `/curso`, `/calouros` e `PassportCard.tsx` estão ampliadas e com animação `photoCardHover` ativa.
   - Confirme a responsividade sem `overflow-x` e com alvos táteis `>= 44x44pt` nos breakpoints `320px`, `375px`, `768px`, `1024px`, `1280px` e `1920px`.

2. EXECUÇÃO DETERMINÍSTICA DE TESTES E BUILD:
   - Rode `pnpm typecheck` (`tsc -b` ou `tsc --noEmit`).
   - Rode `pnpm test` (Vitest).
   - Rode `pnpm run verify:holistic` (se disponível) e `pnpm build` para validar a compilação limpa de todas as rotas estáticas.
   - Apresente o relatório final de conformidade.
```
