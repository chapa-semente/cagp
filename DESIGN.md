---
name: CAGP UFMG Super App
description: App Shell discente unificado (Apple HIG + Papelaria Institucional Opaca & Chancela Candanga)
colors:
  institutional-wine: "#8B1E2D"
  cagp-crimson: "#9E2424"
  candango-gold: "#E8A317"
  homologated-green: "#15803D"
  normative-amber: "#B45309"
  critical-red: "#DC2626"
  ufmg-blue: "#005A9C"
  warm-paper: "#FBF8F3"
  surface-sand: "#F4F1EA"
  surface-white: "#FFFFFF"
  border-stone: "#DFDBD2"
  ink-black: "#0A0A0A"
  ink-charcoal: "#292524"
  ink-muted: "#57534E"
typography:
  display:
    fontFamily: "Oswald, sans-serif"
    fontSize: "clamp(1.35rem, 2.5vw, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Oswald, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.02em"
  title:
    fontFamily: "Public Sans Variable, Public Sans, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 700
    lineHeight: 1.35
  body:
    fontFamily: "Public Sans Variable, Public Sans, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.04em"
  micro:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.625rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.04em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  banner: "28px"
  pill: "9999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.institutional-wine}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.md}"
    padding: "10px 18px"
  button-primary-hover:
    backgroundColor: "{colors.cagp-crimson}"
  button-secondary:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.lg}"
    padding: "10px 18px"
  button-neutral:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.ink-charcoal}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  card-surface:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.xl}"
    padding: "24px"
---

# Design System: CAGP UFMG Super App

## Overview

**Creative North Star: "O Dossiê Tátil da Gestão Pública (Apple HIG + Papelaria Institucional Opaca)"**

O sistema visual do Super App do Centro Acadêmico de Gestão Pública (CAGP FAFICH/UFMG — *"Os Candangos"*) unifica todas as 32 páginas dos 5 eixos canônicos sob uma única linguagem: a ergonomia estrutural do **Apple Human Interface Guidelines (`apple-design`)** materializada em **papelaria pública opaca, tinta de alto contraste e chancelas de deferimento**. A interface opera em modo claro aquecido sobre fundo papel (`#FBF8F3`), otimizada para leitura imediata por estudantes do turno noturno em deslocamento pelo campus Pampulha (FAFICH, RU II Setorial e pontos do ônibus circular).

Este sistema rejeita dois extremos: de um lado, recusa o *Liquid Glass* (`backdrop-filter: blur`), transparências esfumaçadas e efeitos vítreos que contradizem a materialidade do papel timbrado e degradam a fluidez em celulares intermediários; de outro, elimina o excesso de caixas neo-brutalistas com bordas pretas grossas (`2px solid #0A0A0A`) e sombras duras deslocadas (`4px 4px 0`) nos containers de layout. A força institucional concentra-se na barra lateral ativa, nos cabeçalhos vinho e no **carimbo de borda dupla (`.cagp-stamp-badge`)**, enquanto os módulos operacionais (calculadoras, checklists, grafo curricular, acervo e transparência) funcionam como folhas de dossiê limpas, contínuas e divididas por filetes de pedra de `1px`.

Todas as páginas seguem a sequência disciplinada de refino **(`distill` → `layout` → `colorize` → `animate` → `delight`)**:
1. **`distill`:** eliminação de *eyebrows/kickers* acima de títulos, fim de cards aninhados dentro de cards e remoção de botões/avisos duplicados na mesma vista.
2. **`layout`:** adaptação por *size classes* do Apple HIG (Tab Bar opaca no mobile `< 768px`, Rail de `88px` no tablet `768px–1279px`, Sidebar de `264px` com até 2 níveis no desktop `≥ 1280px`), ritmo macro de `32px` entre seções e piso tátil estrito de `44px × 44px`.
3. **`colorize`:** semântica cromática inequívoca para estados reais de operação e normas do PPC 2020, sempre acompanhada de ícone vetorial e rótulo textual.
4. **`animate`:** zero coreografia de carregamento; movimento reservado ao impacto físico do carimbo, troca de abas/perfis e expansão de gavetas (`0fr → 1fr`), respeitando `prefers-reduced-motion`.
5. **`delight`:** reconhecimento humano com a voz de *"Os Candangos"* nos marcos reais conquistados pelo estudante (conclusão de checklists, 300h/600h de extensão/AAC, elegibilidade ao Art. 41 e lembretes de sobrevivência noturna).

**Key Characteristics:**
- **Papelaria 100% Opaca (Zero Liquid Glass / Zero Blur):** todas as barras de navegação, cabeçalhos, gavetas e folhas de dossiê usam superfícies sólidas (`#FFFFFF`, `#FBF8F3`, `#F4F1EA`) separadas por filetes `#DFDBD2` de `1px`.
- **Dossiê de Folha Única (Zero Nested Cards):** módulos complexos usam uma única superfície branca (`rounded-3xl`) subdividida internamente por filetes horizontais e verticais (`divide-[#DFDBD2]`), nunca caixas dentro de caixas.
- **Gesto-Assinatura Híbrido (O Carimbo):** o selo técnico `.cagp-stamp-badge` com borda dupla (`3px double`) e leve rotação (`-1.25deg` a `-1.5deg`) chancela etapas concluídas, regras normativas e marcos das 600h.
- **Iconografia Vetorial Autoral (`CagpIcon`):** conjunto unificado em grid `24x24` com traço `1.75px` e terminações arredondadas em todas as páginas, substituindo fontes de ícones externas.

## Colors

A paleta combina a autoridade institucional do bordô do CAGP com superfícies de papel aquecido e cores semânticas de sinalização universitária e normativa.

### Primary
- **Institutional Wine** (`#8B1E2D`): cor primária de comando e identidade do CAGP; veste o eixo ativo na sidebar, o banner da Home, botões primários, abas ativas de destaque e carimbos homologados.
- **CAGP Crimson** (`#9E2424`): estado `:hover` das ações primárias e identificador cromático do sistema SIGA UFMG.

### Secondary
- **Candango Gold** (`#E8A317`): marcador de conquistas discentes, barra de progresso das 600h (Extensão + AAC), anel global de foco por teclado (`:focus-visible`, `2.5px solid`) e insígnia do Turno Noturno.

### Tertiary
- **Homologated Green** (`#15803D`): estado operacional aberto (RU II Setorial e Circular Interno), etapas de checklist concluídas, situação regular no PPC 2020, carimbo `is-deferido` e sistema SEI UFMG.
- **Normative Amber** (`#B45309`): alerta de janela crítica (últimas saídas do circular às 22h15–22h45, trava de 120 dias do Art. 15, § 4º), tarjas obrigatórias de conteúdo simulado (`simulated: true`) e sistema Moodle.
- **Critical Red** (`#DC2626`): bloqueio formal de pré-requisito no SIGA (ex.: `ECN 140 → ECN 044`), indeferimento normativo (`is-indeferido`) e expiração de prazo.
- **UFMG Blue** (`#005A9C`): referências ao Colegiado DCP (Sala F-2039), progresso das 27 disciplinas obrigatórias e sistema MinhaUFMG.

### Neutral
- **Warm Paper** (`#FBF8F3`): plano de fundo geral da aplicação e faixa interna de leitura secundária dentro dos dossiês.
- **Surface Sand** (`#F4F1EA`): trilhas de barras de progresso, fundo de controles segmentados (`SegmentedControl`), cabeçalhos de tabelas e estados `:hover` neutros.
- **Surface White** (`#FFFFFF`): superfície opaca de dossiês, cartões principais, sidebar, barra inferior mobile e gavetas modais.
- **Border Stone** (`#DFDBD2`): filete estrutural de `1px` que separa seções, colunas de tabelas e itens de dossiê sem peso visual excessivo.
- **Ink Black / Charcoal / Muted** (`#0A0A0A`, `#292524`, `#57534E`): hierarquia de tinta com contraste WCAG AA/AAA garantido sobre `#FFFFFF`, `#FBF8F3` e `#F4F1EA` (`#0A0A0A` = 19.6:1; `#292524` = 14.8:1; `#57534E` = 7.2:1 sobre branco).

### Named Rules
**The Opaque Paper Material Rule (`apple-design` sem Liquid Glass).** Nenhuma superfície do aplicativo utiliza `backdrop-filter: blur()`, efeito fosco ou vidro translúcido. A separação entre camadas fixas (Sidebar, BottomNav, Topbars, Modais) e o conteúdo rolável ocorre exclusivamente por contraste tonal opaco (`#FFFFFF` sobre `#FBF8F3`) e filete pedra de `1px` (`#DFDBD2`).

**The Tinted-On-Wine Rule (`colorize`).** Sobre superfícies em vinho institucional (`#8B1E2D`), textos secundários nunca utilizam cinza neutro; aplicam creme aquecido (`#FFFDF9`, contraste 11.4:1) e rosa-claro (`#FCE7EB`, contraste 9.6:1).

**The Semantic State Rule (`colorize` + `apple-design`).** Cada cor de estado tem significado único em todas as páginas e nunca comunica sozinha: todo indicador verde (`#15803D`), âmbar (`#B45309`) ou vermelho (`#DC2626`) vem acompanhado de rótulo textual explícito e ícone vetorial correspondente.

## Typography

**Display & Section Font:** `Oswald` (auto-hospedada via `@fontsource/oswald`, pesos 500, 600, 700)
**Body & UI Font:** `Public Sans Variable` (auto-hospedada via `@fontsource-variable/public-sans`, pesos 400–800)
**Label & Data Font:** `JetBrains Mono` (auto-hospedada via `@fontsource/jetbrains-mono`, pesos 400, 500, 700)

**Character:** `Oswald` imprime voz de manchete pública e chancela oficial aos títulos de página, cabeçalhos de módulo e carimbos; `Public Sans Variable` garante legibilidade calma e aberta em textos longos de resoluções, ementas e guias; `JetBrains Mono` estrutura códigos curriculares (`DCP 089`, `ECN 140`), contadores de horas (`300h / 600h`), valores financeiros e horários.

### Hierarchy
- **Display** (`700`, `clamp(1.35rem, 2.5vw, 1.875rem)`, line-height `1.15`, tracking `-0.01em`, uppercase, `text-wrap: balance`): título principal (`h1`) de cada página e saudação do banner da Home.
- **Headline** (`700`, `1.125rem` / `18px`, line-height `1.2`, tracking `0.02em`, uppercase, `text-wrap: balance`): cabeçalhos de módulos (`h2`) em todas as páginas.
- **Title** (`700`, `0.9375rem` / `15px`, line-height `1.35`): títulos de itens de dossiê, disciplinas, notícias e serviços (`h3`).
- **Body** (`400–500`, `0.875rem` / `14px`, line-height `1.55`, medida de `65ch–72ch`, `text-wrap: pretty`): textos explicativos, artigos de notícias, regras normativas e descrições.
- **Label & Micro** (`600–700`, `0.6875rem` / `11px` piso mínimo, line-height `1.25–1.3`, tracking `0.04em`, `tabular-nums`): códigos de disciplinas, selos normativos, atalhos de teclado (`⌘K`), contadores e metadados.

### Named Rules
**The No-Eyebrow Rule (`distill`).** Cabeçalhos de página (`PageHeader`) e títulos de seção (`h1`, `h2`) nunca exibem um *kicker* ou *eyebrow* textual acima do título. O título em `Oswald` carrega seu próprio peso hierárquico, apoiado apenas pela barra de sub-rotas do eixo ou por pílulas de status ao lado.

**The Tabular Numerals & 11px Floor Rule (`apple-design`).** Todo número, horário, porcentagem, carga horária, prazo de 120 dias e cifra do Portal da Transparência aplica `font-variant-numeric: tabular-nums`. Nenhum texto visível na interface fica abaixo do piso de legibilidade de `11px` (`0.6875rem`), escalando proporcionalmente com o Dynamic Type (`data-a11y-font="sm|md|lg|xl"`).

## Layout

A arquitetura espacial aplica o modelo de *size classes* do Apple HIG (`layout.md › Size classes` e `sidebars.md`) na estrutura da **Proposta A: App Shell**, mantendo as mesmas funcionalidades em qualquer largura:

- **Compact Width — Mobile (`< 768px`):**
  - Coluna única com margem lateral de `12px` (`px-3`) e espaçamento vertical de `32px` (`space-y-8`) entre seções principais.
  - Barra de navegação inferior fixa e **100% opaca** (`BottomNav`, fundo `#FFFFFF`, filete superior `1px solid #DFDBD2`, respeitando `env(safe-area-inset-bottom)`) com os 5 eixos canônicos (`Início`, `O Curso`, `Percurso`, `Acervo`, `O CAGP`).
- **Regular Medium — Tablet (`768px–1279px`):**
  - `BottomNav` oculta; entra o **Rail Lateral Opaco** de `88px` fixo à esquerda (`#FFFFFF`, `border-r border-[#DFDBD2]`) com ícone + rótulo curto dos 5 eixos, atalhos e acesso rápido ao Passaporte/Busca.
  - Área de conteúdo fluida com grids de 2 a 3 colunas (`md:grid-cols-2` / `md:grid-cols-3`).
- **Regular Wide — Desktop (`≥ 1280px`):**
  - **Sidebar Completa Opaca** de `264px` com no máximo 2 níveis de hierarquia (os 5 eixos canônicos + sub-rotas do eixo ativo indentadas por filete vinho, seção personalizável *Meus Atalhos* e cartão do estudante na base).
  - Container central limitado a `1360px` (`max-w-[1360px] mx-auto`): na Home, dividido em grid de 12 colunas (`8 colunas` para o fluxo principal adaptativo por perfil + `4 colunas` fixas à direita para o Passaporte Discente e Sistemas UFMG); nas páginas internas dos eixos, organizado em cabeçalho canônico (`PageHeader`), barra de sub-vistas (`SegmentedControl`) e painéis de dossiê.

### Named Rules
**The Single-Sheet Dossier Rule (`distill` + `layout`).** É proibido aninhar cartões com borda dentro de cartões com borda (*nested cards*). Cada módulo de página é uma única folha de dossiê (`bg-white rounded-3xl border border-[#DFDBD2] overflow-hidden`) cujas subdivisões internas (métricas, listas de requisitos, atalhos correlatos, tabelas e depoimentos) são separadas por filetes pedra de `1px` (`divide-y` / `divide-x divide-[#DFDBD2]`) e faixas tonais em `#FBF8F3`.

**The Macro/Micro Rhythm Rule (`layout`).** O intervalo vertical entre seções independentes da página (`space-y-8` / `32px`) é sempre o dobro ou mais do intervalo interno entre elementos do mesmo grupo (`12px` a `16px`), garantindo que o agrupamento semântico seja imediato no *squint test*.

**The 44px Hit Target Rule (`apple-design`).** Todo controle interativo (botões, abas do `SegmentedControl`, pílulas de filtro, itens de checklist, alarmes e links de ação) possui área mínima de toque/clique de `44px × 44px` (`min-h-[44px]`).

## Elevation & Depth

O sistema adota **camadas tonais opacas com elevação mínima**. A hierarquia de profundidade nasce do contraste entre o fundo papel (`#FBF8F3`), as faixas internas areia (`#F4F1EA`) e a folha branca (`#FFFFFF`) contornada por filete pedra (`#DFDBD2`).

### Shadow Vocabulary
- **Resting Card** (`box-shadow: 0 1px 3px rgba(10, 10, 10, 0.04)`): separação sutil das folhas de dossiê brancas sobre o fundo papel em repouso.
- **Interactive Lift** (`box-shadow: 0 6px 18px rgba(10, 10, 10, 0.08)`): elevação suave exclusiva para cartões clicáveis inteiros (como artigos do Mural de Notícias e documentos do Acervo) no estado `:hover`.
- **Stamp Impression** (`box-shadow: 0 2px 6px rgba(139, 30, 45, 0.14)`): sombra de tinta do carimbo institucional `.cagp-stamp-badge`.

### Named Rules
**The Hybrid Stamp Rule (`distill` + `Elevation`).** Sombras duras sem desfoque (`box-shadow: 3px 3px 0 #0A0A0A`) e bordas pretas grossas (`border-2 border-black`) não são usadas em containers, abas, tabelas ou cartões de página; a estética de chancela física concentra-se exclusivamente no componente `.cagp-stamp-badge` com borda dupla (`3px double`).

## Shapes

- **Folhas de Dossiê e Módulos Principais:** cantos arredondados de `24px` (`rounded-3xl`) com `border: 1px solid #DFDBD2` e `overflow: hidden` para permitir faixas internas contínuas de ponta a ponta.
- **Banners de Destaque Institucional:** `28px` (`rounded-[28px]`) no cabeçalho vinho da Home e nos blocos de chamada principal.
- **Controles Internos, Linhas de Checklist e Botões de Ação:** `12px` a `16px` (`rounded-xl` / `rounded-2xl`).
- **Seletores de Perfil, Filtros de Categoria e Busca Global (`⌘K`):** formato de pílula completa (`9999px` / `rounded-full`).
- **Carimbos de Chancela (`.cagp-stamp-badge`):** retângulo técnico com raio curto de `5px`, borda dupla (`3px double`) e leve inclinação orgânica (`-1.25deg` a `-1.5deg`).
- **Proibição de Bordas Laterais Grossas:** alertas, citações e chamadas normativas (`FactCheckBanner`, avisos de simulação, relatos) usam superfície tonal (`#FEF3C7`, `#F0FDF4`, `#FBF8F3`) com filete completo de `1px`, nunca `border-left` colorido acima de `1px`.

## Components

### Buttons
- **Caráter:** diretos, táteis (`min-h-[44px]`), rotulados com verbos de ação claros (*Gerenciar prazos*, *Abrir Simulador Art. 41*, *Baixar Ementário*).
- **Primary:** fundo `#8B1E2D`, texto `#FFFFFF`, raio `12px` (`rounded-xl`), padding `10px 18px`, `:hover` em `#6E1420`, compressão tátil `:active` (`scale(0.97)`).
- **Secondary (Dossier CTA):** fundo `#0A0A0A`, texto `#FFFFFF`, raio `16px` (`rounded-2xl`), transicionando para `#8B1E2D` no `:hover`.
- **Neutral / Outline:** fundo `#FBF8F3` (ou `#FFFFFF`), filete `1px solid #DFDBD2`, texto `#292524`, `:hover` em `#F4F1EA`.

### Segmented Control & Axis Sub-Navigation (`SegmentedControl` & `AxisNavBar`)
- **Caráter:** barra de alternância de sub-vistas presente nas páginas internas dos eixos (`/curso`, `/percurso`, `/acg`, `/estagio`, `/tcc`, `/sobre`), substituindo abas neo-brutalistas por um seletor opaco estilo Apple HIG.
- **Estrutura:** trilha em `#F4F1EA` (ou `#FFFFFF`) com filete `1px solid #DFDBD2` e raio `16px` (`rounded-2xl`), abrigando botões de `min-h-[44px]` com suporte a teclado (`ArrowLeft` / `ArrowRight`).
- **Active State:** aba selecionada com preenchimento sólido `#8B1E2D` e texto `#FFFFFF` (ou `#FFFFFF` com filete `#DFDBD2` e sombra `Resting Card`), animando a entrada do painel ativo via `cagp-animate-ws-enter` (`220ms cubic-bezier(0.16, 1, 0.3, 1)`).

### Dossier Cards, Checklists & Data Ledgers
- **Caráter:** folhas de informação estruturadas sem aninhamento de caixas.
- **Estrutura:** container branco (`#FFFFFF`, `rounded-3xl`, `1px solid #DFDBD2`), cabeçalho com título `Oswald` + `.cagp-stamp-badge`, corpo principal e faixa inferior em `#FBF8F3` dividida por filetes `divide-[#DFDBD2]`.
- **Checklists Interativos (Calouro / Art. 41 / Estágio):** botões de linha inteira (`min-h-[44px]`, `rounded-2xl`) que alternam de `#FBF8F3` para `#F0FDF4` (borda `#15803D/35`) quando marcados, atualizando instantaneamente a barra de progresso e o carimbo da seção.

### Normative & Simulation Banners (`FactCheckBanner` & `SimulationNotice`)
- **Caráter:** avisos institucionais de alta legibilidade integrados ao fluxo de leitura, sem modais interruptivos.
- **Avisos de Simulação (`simulated: true`):** faixa única por módulo simulado em `#FEF3C7/80`, filete `1px solid #B45309/30`, texto `#78350F` e tag `simulated: true` em `JetBrains Mono`.
- **Fact-Check / Regra Oficial:** superfície branca ou creme com carimbo `.cagp-stamp-badge` identificando a fonte normativa (`PPC 2020`, `Art. 15, § 4º`, `Art. 41`, `Regimento CAGP`) e gaveta expansível (`0fr → 1fr`) para o excerto literal da resolução.

### Signature Component: Carimbo Institucional (`.cagp-stamp-badge`) & Chancela Candanga (`delight` + `animate`)
- **Estrutura:** `border: 3px double`, tipografia `Oswald` bold uppercase (`12px`), `font-variant-numeric: tabular-nums`, rotação de `-1.25deg` a `-1.5deg` e animação física `cagpStampImpact` (`240ms cubic-bezier(0.16, 1, 0.3, 1)`).
- **Variantes Semânticas:**
  - `is-deferido`: verde `#15803D` sobre `#F0FDF4` (etapas 100% concluídas, curso regular, nota 4 MEC).
  - `is-homologado`: vinho `#8B1E2D` sobre `#FEF3C7` (em progresso ativo, trava de 120 dias monitorada, requisitos parciais).
  - `is-visto`: carvão `#292524` sobre `#F4F1EA` (estado inicial aguardando ação do estudante).
  - `is-indeferido`: vermelho `#DC2626` sobre `#FEF2F2` (mito reprovado no Fact-Check ou trava bloqueante do SIGA).
- **Momento de Delight (*Chancela dos Candangos*):** quando o estudante atinge 100% de um checklist ou meta de horas (6/6 vistos do Calouro, 3/3 requisitos do Art. 41, 600h na Calculadora ACG), o dossiê revela uma faixa de homologação (`cagp-seal-unlock`) com o próximo passo prático da jornada acadêmica.

## Do's and Don'ts

### Do:
- **Do** aplicar a sequência `distill → layout → colorize → animate → delight` em todas as páginas dos 5 eixos, consolidando informações correlatas em dossiês de folha única divididos por filetes `#DFDBD2` de `1px`.
- **Do** usar superfícies 100% opacas (`#FFFFFF`, `#FBF8F3`, `#F4F1EA`) na `BottomNav`, `AppShellSidebar`, `SegmentedControl`, cabeçalhos e modais, garantindo zero `backdrop-filter: blur`.
- **Do** utilizar exclusivamente o sistema vetorial autoral `CagpIcon` (`24x24`, traço `1.75px`) em novos componentes e páginas refatoradas, sempre acompanhado de rótulo visível ou `aria-label`.
- **Do** manter todas as fontes (`Oswald`, `Public Sans Variable`, `JetBrains Mono`) e ativos auto-hospedados para funcionamento 100% offline via Service Worker no campus Pampulha.
- **Do** preservar um único aviso visível de simulação (`SIMULATION_NOTICE` / `simulated: true`) em cada seção demonstrativa (Notícias, Portal da Transparência e Relatos de Carreira) até a entrega final de fevereiro de 2027.

### Don't:
- **Don't** usar *Liquid Glass*, `backdrop-blur`, fundos semitransparentes esfumaçados ou *glassmorphism* em nenhuma barra, cartão ou modal.
- **Don't** aninhar cartões com borda dentro de outros cartões com borda (*nested cards*); use divisórias de `1px` (`divide-x` / `divide-y divide-[#DFDBD2]`) e faixas tonais `#FBF8F3`.
- **Don't** colocar *eyebrows* ou *kickers* acima de títulos `h1` e `h2` (`PageHeader` ou cabeçalhos de seção); deixe o título em `Oswald` liderar diretamente.
- **Don't** usar bordas pretas grossas (`2px solid #0A0A0A`), sombras duras sem desfoque (`4px 4px 0 #0A0A0A`) ou `border-left` colorido acima de `1px` nos containers de layout; reserve a estética de chancela exclusivamente ao `.cagp-stamp-badge`.
- **Don't** criar animações de entrada em cascata no carregamento da página que atrasem a leitura; toda página deve renderizar imediatamente visível e respeitar `prefers-reduced-motion` e `data-a11y-motion="reduced"`.
