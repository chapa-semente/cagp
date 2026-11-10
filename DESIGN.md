---
name: Super App Discente — Chapa Semente • CAGP UFMG
description: O Balcão que Germina — neobrutalismo sóbrio sobre a identidade da Chapa Semente (roxo, laranja, petróleo, areia) que traduz a burocracia da UFMG em passos resolvíveis no celular, à noite.
colors:
  semente-purple: "#5B2A85"
  semente-purple-hover: "#4A216E"
  semente-purple-tint: "#EFE7F6"
  germinar-orange: "#FE8812"
  germinar-orange-hover: "#E07406"
  germinar-tint: "#FFEEDB"
  orange-text: "#A85300"
  petroleo-teal: "#266264"
  petroleo-deep: "#134E4A"
  petroleo-tint: "#E2EDEA"
  areia: "#F4F2EC"
  areia-funda: "#E7E3D8"
  branco: "#FFFFFF"
  grafite: "#1F1F1F"
  grafite-secundario: "#4A4740"
  grafite-apagado: "#5E5A52"
  cagp-rubro: "#9E2424"
  success: "#166534"
  success-tint: "#DCFCE7"
  warning: "#92400E"
  warning-tint: "#FEF3C7"
  destructive: "#B91C1C"
  destructive-tint: "#FEE2E2"
  info: "#005A9C"
  info-tint: "#DBEAFE"
typography:
  display:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0.03em"
  display-sm:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0.02em"
  headline:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.04em"
    fontFeature: "'tnum' 1"
  numeral:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "'tnum' 1"
  button:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.03em"
  accent:
    fontFamily: "'Permanent Marker', cursive"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
  20: "80px"
components:
  button-primary:
    backgroundColor: "{colors.semente-purple}"
    textColor: "{colors.branco}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.semente-purple-hover}"
    textColor: "{colors.branco}"
  button-accent:
    backgroundColor: "{colors.germinar-orange}"
    textColor: "{colors.grafite}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
    height: "44px"
  button-accent-hover:
    backgroundColor: "{colors.germinar-orange-hover}"
    textColor: "{colors.grafite}"
  button-secondary:
    backgroundColor: "{colors.petroleo-teal}"
    textColor: "{colors.branco}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
    height: "44px"
  button-outline:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.grafite}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
    height: "44px"
  button-outline-hover:
    backgroundColor: "{colors.areia-funda}"
    textColor: "{colors.grafite}"
  card-ficha:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.grafite}"
    rounded: "{rounded.lg}"
    padding: "20px"
  card-cartaz:
    backgroundColor: "{colors.semente-purple}"
    textColor: "{colors.branco}"
    rounded: "{rounded.xl}"
    padding: "32px"
  band-cartaz:
    backgroundColor: "{colors.semente-purple}"
    textColor: "{colors.branco}"
    padding: "48px 16px"
  band-petroleo:
    backgroundColor: "{colors.petroleo-teal}"
    textColor: "{colors.branco}"
    padding: "48px 16px"
  block-papel:
    backgroundColor: "{colors.areia}"
    textColor: "{colors.grafite}"
    typography: "{typography.body}"
    padding: "0px"
    width: "68ch"
  page-head:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.grafite}"
    rounded: "{rounded.lg}"
    padding: "20px"
  input:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.grafite}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "10px 14px"
    height: "48px"
  badge:
    backgroundColor: "{colors.semente-purple}"
    textColor: "{colors.branco}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "4px 8px"
  badge-outline:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.grafite}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "4px 8px"
  stamp-deferido:
    backgroundColor: "{colors.success-tint}"
    textColor: "{colors.success}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "4px 10px"
  stamp-pendente:
    backgroundColor: "{colors.warning-tint}"
    textColor: "{colors.warning}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "4px 10px"
  stamp-indeferido:
    backgroundColor: "{colors.destructive-tint}"
    textColor: "{colors.destructive}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "4px 10px"
  sticker-simulado:
    backgroundColor: "{colors.warning-tint}"
    textColor: "{colors.grafite}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  semente-signature:
    backgroundColor: "{colors.semente-purple-tint}"
    textColor: "{colors.grafite}"
    rounded: "{rounded.lg}"
    padding: "20px"
  bottom-nav:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.grafite}"
    height: "64px"
---

# Design System: Super App Discente — Chapa Semente • CAGP UFMG

## Overview

**Creative North Star: "O Balcão que Germina"**

O site é o balcão que a UFMG nunca teve, montado pela identidade da Chapa Semente. Você chega com pressa, depois do trabalho, e sai com o passo, o formulário e o contato na mão; cada trâmite resolvido é uma semente que germina. O lema da chapa é a regra de composição: **toda mudança começa pequena**. Um passo por vez, um destaque por tela, uma ação clara.

A linguagem é um **neobrutalismo sóbrio**: o manual pede "clareza visual e elegância sóbria", blocos chapados e respiro generoso; o neobrutalismo dá o gesto tátil do balcão (contorno grafite, sombra dura, o botão que afunda como um carimbo). O resultado é menos grito e mais papel bem impresso: contornos de 2px, sombras curtas, muito espaço em areia, cor em grandes blocos nítidos. O volume cresce só onde a campanha fala (o Cartaz), e mesmo ali a voz vem do *color blocking*, das formas orgânicas da folha e da semente e da fotografia real do campus com a base em dithering, nunca de enfeite.

O isotipo dá o significado de cada cor, e a interface o respeita. A **semente roxa** é o núcleo: o que sustenta (navegação, ação principal, autoridade). A **folha laranja** é o que brota: destaque, conquista, o número grande, a ideia nova. O **petróleo** é o equilíbrio frio dos dados. A **areia** é o solo e o papel. A **pessoa** do símbolo é o estudante, e entra na tela como fotografia real, em cor, com a base dissolvida em pixels como uma impressão. Os pilares IDEIA · PARTICIPAÇÃO · FUTURO não são decoração: viram laranja, gente e progresso.

As referências estruturais seguem sendo o **Neobrutalism.com** (disciplina: uma sombra por nível, o press exato, poucos tokens) e o **BoldKit** (carimbo, layered card, motion), vendorizados em `src/components/ui/` e `src/components/boldkit/`. Deles vem o comportamento, nunca a paleta nem os enfeites (neon, burst, estrela, escudo). A **Chapa Semente** é a base cromática; o **CAGP** é selo. Modo exclusivamente claro. Primeiro celular (375px), à noite, com sinal ruim e uma mão.

**Key Characteristics:**
- Fundo de página em Areia (`#F4F2EC`), nunca branco frio nem cinza; grafite (`#1F1F1F`) como única tinta escura.
- Três volumes: Cartaz (campanha, *color blocking*), Ficha (trâmite), Papel (leitura). Cada página tem um volume dominante.
- Contorno grafite 2px nas fichas e 3px em controles e peças de Cartaz; sombra dura curta (3px na Ficha, 6px no Cartaz); o clique afunda exatamente na sombra.
- Poppins Regular e Bold em tudo, com algarismos tabulares para números de protocolo; Permanent Marker só na palavra que precisa de voz.
- Caixa alta só no grito (título de página, botão, badge, rótulo), sempre com tracking ampliado.
- Laranja como destaque raro; texto sobre roxo e petróleo sempre branco.
- Fotografia real em cor original, com a base dissolvida em pixels de dithering translúcidos; duotone roxo só em capas de Cartaz.
- Campanha como assinatura no fim do trâmite, nunca como pedágio antes dele. Única exceção: o tour obrigatório da primeira visita (ver Components › Tour da Chapa).

## Colors

A paleta oficial do manual, em blocos chapados: três campos de cor da Semente sobre areia e grafite, com o rubro do CAGP guardado no selo e tintas claras só para estado.

### Primary
- **Roxo Profundo** (`semente-purple`): a semente, núcleo e autoridade. Botão primário, item ativo de navegação, anel de foco, faixas e painéis do Cartaz, títulos de alto impacto, badge padrão. Hover em `semente-purple-hover`.
- **Roxo Lavado** (`semente-purple-tint`): fundo da Assinatura Semente, do Accordion aberto e de destaques de proposta no volume Ficha. Nunca fundo de página inteira.

### Secondary
- **Verde-Petróleo** (`petroleo-teal`): equilíbrio frio e sobriedade. Blocos de dados, infográficos, Transparência, progresso das 600h, aba ativa, botão secundário, faixas analíticas do Cartaz. Lê bem como texto sobre areia (6.2:1).
- **Petróleo Escuro** (`petroleo-deep`): hover do petróleo e texto petróleo pequeno onde se quer mais peso.
- **Petróleo Lavado** (`petroleo-tint`): fundo de bloco de dados e de "dica prática".

### Tertiary
- **Laranja Vibrante** (`germinar-orange`): a folha, o que brota. Um CTA de destaque por tela, números de grande porte, formas orgânicas, badges de chamada, a conquista. Sempre com texto grafite por cima (6.9:1). Hover em `germinar-orange-hover`.
- **Laranja Lavado** (`germinar-tint`): fundo de destaque leve para conquista ou novidade (texto em `orange-text` ou grafite).
- **Laranja Contraste** (`orange-text`): obrigatório para texto pequeno e legenda alaranjados sobre fundo claro (4.8:1 sobre areia).

### Neutral
- **Areia / Papel Natural** (`areia`): fundo oficial da página e do volume Papel; o "solo" do sistema.
- **Areia Funda** (`areia-funda`): trilhos de progresso, hover de outline, fundo da barra de abas, sub-blocos dentro de fichas, skeleton.
- **Branco Puro** (`branco`): fichas, inputs, popovers, sheets, barra inferior; texto sobre roxo e petróleo.
- **Preto Grafite** (`grafite`): texto, todos os contornos, todas as sombras, carimbos. É a única tinta escura (14.7:1 sobre areia).
- **Grafite Secundário** (`grafite-secundario`): subtítulos e descrições (8.3:1). **Grafite Apagado** (`grafite-apagado`): metadados e datas (6.1:1). Ambos quentes, derivados do grafite; nunca cinza azulado.

### Institutional seal
- **Rubro CAGP** (`cagp-rubro`): somente o selo CAGP e contextos estritamente institucionais (atalho SIGA). Não é cor de eixo, botão, badge informativo, gráfico nem erro.

### Status
- `success`, `warning`, `destructive`, `info` com tintas `-tint`: cores funcionais, fora da paleta de marca e por isso nunca decorativas. Servem a alerta, validação, carimbos (DEFERIDO, PENDENTE, INDEFERIDO, HOMOLOGADO) e ao sticker SIMULADO. A cor forte vai no texto e no ícone (todas ≥5:1 sobre a própria tinta); a tinta vai no fundo; o contorno continua grafite.

### Named Rules
**The Flat Poster Rule.** Toda área de cor é bloco chapado sólido. Zero degradês lineares, radiais ou mesh, zero transparência sobre cor (`bg-primary/10`), zero vidro. Translucidez só na fotografia: o dithering pixelado da base e o duotone roxo de capa (ver Components › Fotografia).

**The Sand Not Gray Rule.** O claro do sistema é quente: areia, areia funda e branco. Cinzas frios (`#f4f5f7`, `#e5e7ec`, `#4a4e58`) e pretos azulados (`#16181d`) saem do código; viram `areia`, `areia-funda`, `grafite-secundario` e `grafite`.

**The White On Color Rule.** Sobre roxo e petróleo, todo texto é branco puro (`#FFFFFF`). Sobre laranja, todo texto é grafite. Não existe texto roxo sobre petróleo, laranja sobre roxo nem cinza sobre cor.

**The Orange Is The Leaf Rule.** Laranja Vibrante é destaque: linha, caixa, número grande, palavra isolada, forma orgânica. Nunca frase, parágrafo ou texto pequeno; texto pequeno alaranjado usa `orange-text`.

**The Rubro Is a Seal Rule.** Rubro só no selo do CAGP. Abas de navegação não têm cor própria: a aba ativa veste roxo (os `color` de `navigationRegistry.ts` não pintam interface).

**The One Loud Color Rule.** Cada tela tem no máximo um campo chapado grande de cor quente ou roxa. Roxo e petróleo podem dividir uma composição em blocos nítidos (o *color blocking* do manual), mas laranja nunca é campo de fundo grande.

## Typography

**Família única:** Poppins, apenas Regular (400) e Bold (700), como autoriza o manual (§5.2).
**Destaque:** Permanent Marker Regular (400), tipografia secundária oficial do manual (§5.3); token `--font-accent`.
**Números de protocolo:** Poppins com algarismos tabulares (`font-variant-numeric: tabular-nums`). Space Mono sai do sistema: o manual só autoriza Poppins e Permanent Marker.
**Acessibilidade:** OpenDyslexic (400/700) substitui todas as famílias quando o painel é ativado.

**Character:** Poppins Bold em caixa alta e tracking aberto é o letreiro do cartaz, a voz da assinatura `CHAPA GESTÃO PÚBLICA`. Poppins Regular em caixa de frase é o atendente explicando o passo, com entrelinha folgada. Os números (horas, códigos, prazos) são Poppins Bold tabular: a sensação de protocolo vem do alinhamento, não de uma fonte "técnica". Permanent Marker é a caneta da chapa escrevendo por cima, rara.

### Hierarchy
- **Display** (700, `display-sm` 1.75rem no celular → `display` 2.25rem ≥640px, lh 1.05, caixa alta, tracking 0.02–0.03em, `text-wrap: balance`): título de página. Um por página.
- **Headline** (700, 1.25rem → 1.5rem, lh 1.2, caixa de frase): títulos de seção ("Como pedir o aproveitamento").
- **Title** (700, 1.125rem, lh 1.3, caixa de frase): título de ficha, de passo, de item de lista.
- **Body** (400, 1rem, lh 1.6, `text-wrap: pretty`, máx. 68ch): todo texto de leitura. No desktop pode descer para Body-sm só dentro de fichas densas, nunca no volume Papel.
- **Body-sm** (400, 0.875rem, lh 1.5): descrição de ficha, legenda, metadado em prosa. Piso absoluto de texto corrido.
- **Label** (700, 0.75rem, caixa alta, tracking 0.04em, tabular): códigos (DCP 135), horas, datas, prazos, badges, chips de status, carimbos, direção do JourneyNav. Só aparece em caixa alta e curto (até ~5 palavras); nunca como eyebrow acima de título.
- **Numeral** (700, 2.5rem+, lh 1, tabular): número de grande porte (horas integralizadas, contagem, prazo em dias). É o lugar natural do laranja (folha) ou do roxo.
- **Button** (700, 0.875rem, caixa alta, tracking 0.03em): botões e abas.
- **Accent** (Permanent Marker 400, ≥1.25rem, até 4 palavras, `normal-case tracking-normal`): uma vez por tela, só no volume Cartaz (herói, painel da chapa, lema no rodapé, numeral de erro). Nunca em navegação, botão, rótulo, carimbo, dado, prazo, nome de pessoa, lista ou texto < 20px.

### Named Rules
**The Shout Only Rule.** Caixa alta é grito e só serve a quatro coisas: título de página, botão, badge/rótulo e carimbo. Sempre com tracking ampliado (+20 a +40, ou 0.02–0.04em). Headline e Title são caixa de frase. Parágrafo em caixa alta é proibido.

**The Two Faces Rule.** Só Poppins e Permanent Marker. Nenhuma terceira família (Space Mono, Inter, system-ui) entra por gosto; números ganham caráter pelo `tabular-nums` e pelo peso, não por outra fonte.

**The 14px Floor Rule.** Nada que se lê como frase fica abaixo de 14px; no celular, texto de leitura é 16px. 12px existe só no Label (caixa alta, Bold, curto).

**The Two Weights Rule.** Só 400 e 700. `font-medium`, `font-semibold`, `font-extrabold` e `font-black` não existem nesta marca.

**The Wordmark Is an Asset Rule.** SEMENTE e CAGP nunca são redigitados nem imitados com fonte; sempre os arquivos de `public/logos/`.

## Layout

### Volumes
Cada página declara um volume dominante (ligado ao `mode` do `BaseLayout`):

| Volume | Modo | Onde | Contêiner | Expressão |
|---|---|---|---|---|
| **Cartaz** | Persuade / Experience | Home (herói), /chapa-semente, Carta-Proposta, 404 | Faixas de cor de ponta a ponta (roxo, petróleo) em divisões nítidas sobre areia; painéis-vitrine com contorno 3px e sombra 6px | Formas orgânicas (folha, semente, semicírculo), fotografia com faixa de dithering (duotone roxo na capa), numeral laranja, Permanent Marker |
| **Ficha** | Operate | Guias de trâmite, ferramentas, hubs de eixo, catálogos | Fichas brancas, contorno 2px e sombra 3px, sobre areia | Nenhuma; só ícones funcionais e carimbos de estado |
| **Papel** | Read | Normas, FAQ, história, textos longos dentro de guias | Sem caixa: texto direto na areia, coluna de 68ch | Nenhuma; separação por espaço e régua grafite 2px |

Uma página Ficha pode conter blocos Papel e no máximo **um** momento Cartaz (o resultado de um simulador com carimbo). Cartaz nunca aparece dentro de Papel.

### Grade e ritmo
- Base de 4px, com respiro generoso (manual §10.2: *generous whitespace and margins*). Dentro de uma ficha: 16–20px. Entre fichas irmãs: 20px no celular, 24px no desktop. Entre seções: 48px no celular, 64–80px no desktop. O ritmo vem da diferença entre os degraus; nada de espaçamento uniforme na página inteira.
- Contêiner: 1440px (1600px em 2xl), gutter 16px no celular e 24px ≥640px. Guias limitam a coluna principal a 72rem; Papel a 68ch.
- **Color blocking (Cartaz):** a composição se divide em blocos horizontais ou verticais nítidos entre areia, roxo e petróleo, de ponta a ponta do contêiner, sem contorno nem sombra entre eles. A divisa pode ser reta ou uma curva orgânica (semicírculo, arco da folha), nunca diagonal ou serrilhada.
- **Zona de proteção dos logos:** livre ao redor do símbolo e da assinatura, no mínimo a largura do núcleo da semente (≈ 1/5 da altura do símbolo; na prática ≥ 12px num símbolo de 64px). Logo nunca encosta na borda da tela, do cartão ou da faixa.
- Desktop ≥1024px em guias: coluna principal + trilho lateral direito (sumário de passos, contatos), sticky.
- Sem rolagem horizontal. Tabelas largas viram lista de fichas no celular.
- A raiz aceita 93.75 / 100 / 112.5 / 125% pelo painel de acessibilidade; tudo em rem.

### Shell
- **Celular (<768px):** cabeçalho compacto de 56px (voltar, título, busca, perfil) + barra inferior fixa de 64px com as 5 abas. Sem menu ☰: o que não cabe na barra vive na aba Mais.
- **Desktop (≥768px):** trilho lateral com as mesmas 5 abas (≥1280px: ícone + nome, com as páginas da aba ativa abaixo; tablet: ícone + rótulo curto), cabeçalho com busca (⌘K) e perfil; barra inferior some.
- **Faixa de campanha:** roxo chapado com texto branco e marquee no topo; aparece aberta no volume Cartaz e colapsada desde o início em Ficha e Papel.
- **Abas (Modelo B, por tarefa):** Hoje · Guias · Chapa · Meu curso · Mais, definidas só em `src/lib/navigationRegistry.ts`. Barra, cabeçalho, trilho, busca, hubs, JourneyNav e transições leem do registro; nenhum componente mantém mapa de rotas próprio.
  - **Hoje** (`/`): o que acontece agora; herói da Chapa, RU e circular, prazos, mural.
  - **Guias** (`/guias`): todo trâmite com passo a passo, agrupado por momento (Começando, Durante o curso, Terminando) e os **Documentos mais pedidos** no topo, prontos para abrir e mandar no WhatsApp (`src/data/documentosMaisPedidos.json`).
  - **Chapa** (`/chapa-semente`, `/gestao`): integrantes, propostas e como votar. Fica na barra enquanto o site promove a chapa.
  - **Meu curso** (`/meu-curso`): ferramentas com estado salvo no aparelho (horas 600h, grade, cursos que contam horas, formatura).
  - **Mais** (painel por cima da página; `/mais` no desktop e sem JS): Carreira, O CAGP (ouvidoria, transparência, sobre) e Este site (ajustes, mapa).
- **Dono da rota:** cada rota pertence a uma única aba, e é ela que acende. Hubs podem ter atalhos para rotas de outras abas sem mudar o dono.

### Arquétipos de página
Toda página nova escolhe um destes; não se inventa estrutura por página.

1. **Hub de aba** (`/guias`, `/meu-curso`, `/mais`; Ficha). Cabeça de página condensada → bloco de ação principal da aba (em Guias, os Documentos mais pedidos) → grupos de no máximo 5 linhas (`HubItemList`: ícone, título, uma linha do que resolve). Sem cards soltos em grade.
2. **Guia de trâmite** (`/estagio`, `/acg`, `/tcc`, `/permanencia`, `/documentos`; Ficha + Papel). Cabeça de página → abas (máx. 4) → em cada aba: resumo de 3 linhas ("o que é · quem pode · prazo") → passo a passo numerado com formulário e contato no próprio passo → base normativa (Papel, recolhível) → Assinatura Semente → JourneyNav.
3. **Ferramenta** (calculadora 600h, simulador Art. 41, Passaporte; Ficha). Entrada em cima/à esquerda, resultado embaixo/à direita; o resultado ganha o único momento Cartaz da página (carimbo + numeral). Estado salvo localmente é dito na tela.
4. **Catálogo** (`/optativas`, `/cursos`, `/documentos`, `/noticias`; Ficha). Busca + filtros em chips, contagem tabular, lista de itens; detalhe em Drawer no celular e Sheet no desktop. Conteúdo simulado leva o sticker SIMULADO no item e o `SIMULATION_NOTICE` no topo.
5. **Leitura** (normas, `/faq`, história, `/sobre`; Papel). Título, sumário, texto em 68ch, Accordion para perguntas, citação normativa como bloco branco com contorno grafite 2px e rótulo da fonte ("ART. 15, § 4º") acima. Nunca faixa colorida lateral.
6. **Campanha** (home herói, `/chapa-semente`, Carta-Proposta; Cartaz). Color blocking roxo/petróleo sobre areia, formas orgânicas, fotografia real dos 11 integrantes e do campus, numeral laranja, o lema em Permanent Marker. Cada bloco aponta para uma função real do site (a prova, não o discurso).
7. **Erro e vazio** (404, offline, lista vazia). Uma frase do que aconteceu, uma ação e um link; o 404 pode ser Cartaz com o símbolo isolado.

### Named Rules
**The Small Change Rule.** "Toda mudança começa pequena": uma ação principal por bloco, um destaque laranja por tela, um passo de cada vez. Se a tela tem duas coisas pedindo atenção igual, uma delas sai.

**The Content-First Rule.** No celular (375×812), a primeira informação útil começa dentro dos primeiros 480px. Cabeçalho do app + cabeça de página + abas somam no máximo ~300px.

**The Chrome Budget Rule.** Acima do conteúdo, só três camadas: cabeçalho do app, cabeça de página, abas. Barra de "voltar" separada, faixa tricolor, badges em série e faixa de campanha não entram nessa pilha.

**The Signature at the End Rule.** A campanha entra depois que o estudante foi atendido: Assinatura Semente no fim do guia, antes do JourneyNav. Exceção única e decidida (10/11/2026): o tour obrigatório da primeira visita.

**The One Float Rule.** Acima da barra inferior cabe no máximo um elemento flutuante por vez.

## Elevation & Depth

Profundidade é física e curta: papel bem impresso colado sobre a areia. Sombra dura em grafite, para baixo e à direita, sem desfoque, e **mais curta do que o neobrutalismo de catálogo**, para manter a sobriedade do manual. Interação é deslocamento: o elemento afunda exatamente o tamanho da sombra, como um carimbo pressionado.

### Shadow Vocabulary
- **Chip** (`2px 2px 0 0 grafite`): badge, carimbo, input em repouso, botão compacto, pílula ativa da navegação.
- **Ficha** (`3px 3px 0 0 grafite`): botão em repouso, ficha, input em foco, sheet, popover. A sombra padrão do sistema.
- **Cartaz** (`6px 6px 0 0 grafite`): painéis-vitrine do Cartaz (painel da chapa, carta-proposta, ficha-resultado de ferramenta). Ficha interativa sobe de 3px para 5px no hover.
- Faixas de *color blocking* não têm sombra nem contorno: a profundidade delas é o próprio contraste de cor.

### Named Rules
**The One Shadow Per Volume Rule.** Papel = 0, Ficha = 3px, Cartaz = 6px (só em painéis, nunca em faixas). Ficha dentro de ficha não tem sombra; ganha fundo `areia-funda` ou `petroleo-tint`.

**The Press-Into-Shadow Rule.** Hover: translate −1px e sombra +2px. Active: translate igual à sombra e sombra 0. 150ms com `--ease-snap`. Nunca glow, blur ou escala.

**The No Shadow On Brand Rule.** Logo, símbolo, wordmark e fotografias nunca recebem sombra, contorno brilhante, chanfro ou efeito 3D (manual, Regra 03). A sombra é da ficha que os contém, não do asset.

**The Opaque Paper Rule.** `backdrop-filter` é anulado; toda superfície é opaca.

## Shapes

Retângulos firmes com cantos **sutilmente arredondados**, como o lettering do wordmark (manual §5.1): **12px** em fichas, botões, inputs e sheets; **16px** em painéis do Cartaz; **8px** em badges, carimbos e botões compactos; **6px** no sticker SIMULADO; **pílula** só em indicadores (status, eixo ativo, trilho de progresso).

Contorno grafite: **2px** em fichas, divisórias internas, itens aninhados, badges e carimbos; **3px** em controles interativos (botão, input, aba ativa) e painéis do Cartaz. Linha cinza de 1px não existe.

**Formas orgânicas** (manual §7.1) são a única decoração do sistema: o arco da folha, a gota da semente, o semicírculo, recortes curvilíneos e traços fluidos. Servem de máscara para fotografia, divisor de seção entre blocos de cor e elemento de apoio no fundo do Cartaz, sempre chapadas em laranja, roxo ou petróleo, sempre desenhadas como SVG com a geometria do símbolo (nunca círculo genérico aproximando silhueta). Shapes BoldKit (burst, estrela, escudo), stickers decorativos e rotação de conteúdo não pertencem à marca. Rotação só em carimbo (−2° a +2°).

## Components

Mapa de origem: cada primitivo está vendorizado em `src/components/ui/`. A coluna "Referência" indica de qual biblioteca vem o comportamento.

| Componente | Referência | Volumes | Regra local |
|---|---|---|---|
| Button, Button Group | neobrutalism.com | todos | press-into-shadow exato |
| Badge | BoldKit | Ficha, Cartaz | Label Poppins; máx. 1 na cabeça de página no celular |
| Card | BoldKit | Ficha, Cartaz | `card-ficha` ou `card-cartaz`, nada intermediário |
| Item | neobrutalism.com | Ficha | linha de lista de trâmite/documento |
| Layered Card | BoldKit | Cartaz | só vitrine (passaporte, carta) |
| Stamp | BoldKit | todos | só com significado de estado |
| Tabs / SegmentedControl | neobrutalism.com | Ficha | máx. 4 abas, rolagem horizontal no celular |
| Stepper, Timeline | BoldKit | Ficha | o passo a passo dos trâmites |
| Accordion, Collapsible | neobrutalism.com | Papel | FAQ, base normativa |
| Alert | BoldKit | Ficha, Papel | prazos e avisos, com ícone e tinta de status |
| Input, Field, Input Group, Textarea | neobrutalism.com | Ficha | label sempre visível |
| Native Select | neobrutalism.com | Ficha | preferido no celular |
| Checkbox, Switch | BoldKit | Ficha | checklists do calouro e do formando |
| Progress, Stat Card | BoldKit | Ficha | horas 600h: trilho areia funda, preenchimento petróleo, numeral tabular |
| Table, Data Table | neobrutalism.com | Ficha | desktop; vira lista de Item no celular |
| Drawer / Sheet | BoldKit | Ficha | Drawer no celular, Sheet ≥768px |
| Dialog, Alert Dialog | neobrutalism.com | Ficha | só confirmação destrutiva |
| Toast | BoldKit | todos | 1 por vez, acima da barra inferior |
| Empty, Skeleton | neobrutalism.com | todos | skeleton em `areia-funda`, sem shimmer |
| Marquee | BoldKit | Cartaz | só a faixa de campanha; 1 por página |
| Charts | BoldKit | Ficha | petróleo e roxo como séries principais, laranja como destaque de um ponto, areia funda como grade; nunca rubro |
| Tour, Questionnaire | BoldKit / neobrutalism.com | Cartaz | tour da chapa (`SementeTour.tsx`, não o popover genérico de `ui/tour.tsx`) e escolha de perfil |
| Kbd, Command | BoldKit | Ficha | só desktop (busca ⌘K) |

Fora do sistema: Shapes BoldKit (burst, star, shield), Sticker decorativo, Math Curve *, ASCII Shapes, Rating, Pricing, Testimonials e Logo Cloud com apoios (não há dados reais), e os efeitos de canvas que não dialogam com a geometria orgânica da marca.

### Buttons
Táteis e sóbrios; afundam na própria sombra como um carimbo.
- **Shape:** 12px; compactos (36px de altura) em 8px. Altura mínima 44px; 48px para o CTA principal no celular.
- **Primary:** roxo, texto branco, contorno grafite 3px, sombra Ficha (3px). Uma ação primária por bloco.
- **Accent:** laranja, texto grafite. O CTA de maior energia (a folha), no máximo um por tela (votar, tour, abrir passaporte).
- **Secondary:** petróleo, texto branco; ações analíticas (exportar, simular).
- **Outline:** branco, texto grafite, hover em areia funda; ação de apoio.
- **Ghost / Link:** sem sombra nem contorno; link é roxo sublinhado com offset 0.22em.
- **Estados:** hover translate −1px + sombra 5px; active translate 3px + sombra 0; foco outline 2px roxo com offset 2px (laranja sobre campo roxo); desabilitado 50%, sem sombra. Rótulo é verbo + objeto ("Baixar o TCE").

### Chips / Badges
- **Style:** Label (Poppins 700 12px caixa alta, tracking 0.04em, tabular), contorno grafite 2px, raio 8px, sombra Chip.
- **Variants:** roxo (padrão), laranja (chamada), petróleo (dado/institucional), grafite, outline branco, e estados (fundo `-tint`, texto na cor forte). A variante `ufmg` só identifica conteúdo da UFMG.
- **Filtro:** chip selecionável em catálogos; selecionado = roxo + texto branco + afunda; área de toque de 44px.

### Cards / Containers
- **Ficha** (`card-ficha`): branco, contorno grafite 2px, raio 12px, sombra 3px, padding 20px (24px ≥768px). Título em Title (caixa de frase), descrição em Body-sm, ação no rodapé. Ficha clicável inteira tem um único link e sobe no hover.
- **Painel Cartaz** (`card-cartaz`): roxo (ou petróleo) com texto branco, contorno 3px, raio 16px, sombra 6px, padding 32px; aceita forma orgânica, fotografia, numeral laranja e accent.
- **Faixa Cartaz** (`band-cartaz`, `band-petroleo`): bloco de cor de ponta a ponta, sem contorno, sombra nem raio; texto branco; divisa reta ou curva orgânica com a faixa vizinha.
- **Bloco Papel** (`block-papel`): sem caixa; texto em 68ch sobre areia; régua grafite 2px sob Headline.
- **Aninhamento:** sub-blocos dentro de uma ficha usam fundo `areia-funda` ou `petroleo-tint`, sem contorno extra e sem sombra.

### Inputs / Fields
- **Style:** branco, contorno grafite 3px, raio 12px, altura 48px, sombra Chip; texto 16px no celular.
- **Label:** visível acima, Body-sm 700 em caixa de frase; ajuda abaixo em Body-sm `grafite-secundario`.
- **Focus:** outline 2px roxo com offset + sombra sobe para Ficha.
- **Error:** contorno `destructive`, mensagem abaixo com ícone, dizendo como corrigir. **Disabled:** 50%.

### Navigation
- **Barra inferior (celular):** 5 abas, ícone em pílula 44×28, rótulo `mobileLabel` em Poppins 700 12px caixa alta (Hoje · Guias · Chapa · Meu curso · Mais); se a escala de fonte aumentar, o rótulo quebra em duas linhas em vez de vazar. Branca, contorno superior grafite 3px. Ativo: pílula roxa com ícone branco. A aba Chapa usa o **símbolo oficial da Semente** (asset policromático, sobre branco quando ativa) no lugar de ícone, para ter presença sem gastar o laranja da tela. A aba Mais abre um Drawer com a lista agrupada (`aria-haspopup="dialog"`).
- **Cabeçalho (celular):** 56px, branco: `[‹] título · [Buscar] [Perfil]`. Na raiz da aba não há seta e o título é o nome da aba; dentro dela, o título é o `shortLabel` da página e a seta volta pelo histórico quando a página anterior é do próprio site (senão, leva ao hub da aba). Perfil como botão-avatar de 44px. Nada de sino nem menu.
- **Trilho lateral (desktop):** as 5 abas com ícone e nome; a aba ativa em roxo lista suas páginas abaixo. No tablet, ícone + rótulo curto (nunca número sem rótulo).
- **Breadcrumb (≥768px):** Início › Aba › Página, derivado do registro.
- **Abas** (`SegmentedControl`): barra em areia funda, sticky, contorno 2px; aba ativa em petróleo com texto branco, contorno 2px e sombra Chip; Button em caixa alta. Rótulo curto e sem numeração. No celular, uma linha rolável com snap.
- **JourneyNav:** duas fichas (anterior / próximo) no fim da página, com título e uma linha; direção em Label. A ordem é a do registro, **dentro da mesma aba** (nunca uma corrente global que termina em campanha).

### Cabeça de página (signature)
O único cabeçalho de página. Ficha branca, contorno 2px, sombra 3px (no Cartaz, faixa roxa de ponta a ponta com título branco).
- **Conteúdo:** Display, subtítulo em Body `grafite-secundario` (máx. 2 linhas no celular), badges normativos (1 no celular, até 3 no desktop). Breadcrumb só no desktop. Sem eyebrow: o eixo já está no cabeçalho do app.

### Passo a passo de trâmite (signature)
O coração do volume Ficha. Stepper vertical com o número do passo em Numeral roxo (tabular), cada passo uma ficha: título-verbo, uma ou duas frases e, **na própria ficha**, o que se precisa (formulário, link do SEI/SIGA, e-mail do setor, prazo em Label). Passo concluído ganha carimbo VISTO e o número passa a laranja (a folha brotou).

### Carimbos, sticker SIMULADO e Passaporte (signature)
- **Carimbo:** Label (Poppins 700 caixa alta, tracking 0.04em), contorno grafite 2px, sombra Chip, rotação −2° a +2°, fundo `-tint` e texto na cor de status. É o uso que o manual prevê para o grafite ("carimbos, documentos"). Vocabulário fechado: DEFERIDO (success), HOMOLOGADO (info), PENDENTE (warning), INDEFERIDO (destructive), VISTO (grafite sobre areia funda). Variante da chapa: roxo com texto branco. O carimbo grande de resultado pode trazer o símbolo Semente monocromático preto (asset `semente-simbolo-preto`), como o selo de autenticidade do manual.
- **Sticker SIMULADO:** etiqueta `warning-tint` com texto grafite, raio 6px, colada em todo item fictício (notícias, vagas, talentos, lançamentos).
- **Passaporte Discente:** Layered Card com os carimbos das etapas conquistadas; único lugar onde carimbos se acumulam.

### Fotografia (signature)
A "pessoa" do símbolo entra na tela como gente real, **em cor original**, com uma assinatura de impressão na base. Decisão do site que substitui a Regra 04 do manual (P&B obrigatório): a foto mantém a cor, e a marca aparece no acabamento.
- **Faixa de dithering:** os ~20% inferiores de toda foto se dissolvem em pixels quadrados translúcidos, por pontilhado ordenado (Bayer 4×4): densos junto à foto, esparsos na borda, como uma cópia xerox que perde tinta. Os pixels "apagados" ficam a 35% e revelam a superfície cinza/areia por baixo; nada some por completo. Bordas nítidas, sem desfoque e sem degradê suave: é um degradê **pixelado**, não gradiente de cor.
- **Implementação:** máscara CSS em `global.css` (camada sólida nos 80% superiores + tile SVG de dithering em `repeat-x` nos 20% inferiores, com `mask-size: auto 20%` para os quadrados continuarem quadrados em qualquer tamanho). Aplicada automaticamente às fotos de `/images/chapa/`, `/imagens/semente/foto_*`, Os Candangos e campus; para outra foto, use a classe `.cagp-photo`.
- **Escopo:** todas as fotografias (integrantes, campus, Os Candangos, notícias). Ficam fora: prints de tutorial, logos, ícones e peças de campanha já finalizadas.
- **Texto sobre foto:** legenda ou nome entram na faixa de dithering, em branco sobre fundo grafite sólido (etiqueta), nunca solto sobre a imagem.
- **Duotone de capa:** só no Cartaz (capa do herói, banner de encerramento): camada roxa (`#5B2A85`) em `mix-blend-mode: multiply` via `.cagp-photo-duotone`, mantendo a faixa de dithering.
- **Recorte:** retângulo de 12px ou máscara orgânica (folha, semente, semicírculo). Avatares dos integrantes: quadrado de 12px com contorno 2px.
- **Proibido:** filtros de cor (sépia, saturação forçada), vinheta, degradê suave sobre a foto, banco de imagem genérico.

### Tour da Chapa (signature)
O tour obrigatório da primeira visita (`src/components/features/semente/SementeTour.tsx`, roteiro em `src/lib/sementeTour.ts`). Volume Cartaz do começo ao fim.
- **Fluxo:** abertura com os 11 rostos e o lema → "Em que momento do curso você está?" (4 opções, reordena as pessoas) → para cada integrante, uma tela de história e um spotlight na ferramenta real → fechamento com a votação. Sem "pular" na primeira visita; ao rever (botões "Rever o tour da chapa"), há fechar.
- **Tela de história:** bloco chapado de ponta a ponta, roxo e petróleo alternando por pessoa; foto grande com contorno 3px e faixa de dithering; nome e cargo em etiqueta grafite na faixa; a dor do estudante como pergunta (Display) e uma frase de quem resolveu. No máximo ~30 palavras. Segmentos de progresso: feitos em branco, atual em laranja, por vir só contornados.
- **Spotlight:** o bloco de cor se recolhe (`clip-path`) no cartão Cartaz (contorno 3px, sombra 6px) ancorado embaixo; a página fica sob grafite com um recorte da ferramenta contornado em laranja 3px. Um alvo por parada, com `data-tour="<id>"` na página; `tests/sementeTour.test.ts` confere todos.
- **Fechamento:** quando, onde e o que levar; agenda, tela inicial e convite no WhatsApp como ações de apoio; "Vou votar na Semente" desce o carimbo SEMENTE PLANTADA. Item simulado (mural) leva o sticker SIMULADO.
- **Técnica:** montado com `transition:persist` no BaseLayout, troca de página pelo ClientRouter por trás do bloco de cor (sem recarregar); página de trás `inert`; foco no título de cada tela; setas avançam e voltam; fotos em `public/images/chapa/tour/*.webp`.

### Logos (signature)
- **Escolha do asset por fundo** (`public/logos/semente/`): areia e branco → policromático (`semente-horizontal`, `semente-vertical`, `semente-simbolo`); roxo e petróleo → negativo (`-branco`); fotografia → badge (`semente-horizontal-badge-laranja` ou `-petroleo`); impressão P&B, carimbo e documento → `-preto`.
- **Proibido:** distorcer, rotacionar, deitar ou inverter; recolorir fora da paleta ou com filtro CSS; sombra, glow, chanfro ou 3D; encostar na borda; redigitar o wordmark.
- **Assinatura textual** (quando o asset não cabe, ex. rodapé de documento gerado): `CHAPA GESTÃO PÚBLICA · SEMENTE` em Poppins 700 caixa alta com tracking 0.04em, sem tentar imitar o lettering.

### Assinatura Semente (signature)
Ficha em `semente-purple-tint`, contorno grafite 2px, sem sombra, no fim de cada guia: símbolo Semente policromático (asset, com zona de proteção), rótulo em Label roxo "PROPOSTA 3 · EM AÇÃO", uma frase do que a chapa fez nesta página (primeira pessoa do plural, como pede o manual §9: "organizamos", "entregamos"), nome e diretoria responsável quando houver, e um link outline "Conhecer a proposta". Sem citação longa, sem botão laranja, sem expansão.

### Movimento
O movimento explica estado; não decora seção. Tokens em `src/styles/global.css` (`--ease-snap`, `--ease-stamp`, `--duration-press` 150ms, `--duration-view` 220ms, `--duration-stamp` 240ms), espelhando o L1 do BoldKit.

- **Momento autoral: o carimbo.** Quando um estado muda (resultado do simulador do Art. 41, checklist concluído, credenciamento homologado), o carimbo desce grande e desfocado, acelera até o papel (`--ease-stamp`, 240ms) e só no impacto a tinta "pega": a sombra de 2px aparece de uma vez. A rotação final vem de `--stamp-rotate`. Classes `.cagp-big-stamp` e `.cagp-stamp-impact`; o `key` do React remonta o carimbo a cada mudança. Carimbo em repouso é estático.
- **Tour da Chapa:** o bloco de cor que se recolhe no cartão do spotlight (clip-path, ~600ms, `--ease-snap`) é o gesto do tour; as fotos germinam de baixo para cima; o fim é o carimbo. Movimento só em mudança de tela.
- **Germinar (Cartaz):** a única entrada autoral fora do carimbo é a forma orgânica que "brota" no herói da home e da /chapa-semente: a folha laranja cresce a partir da base com `clip-path`/`scale` ancorado embaixo, uma vez, ~500ms com `--ease-out-natural`. Não se repete em outras seções.
- **Feedback:** press-into-shadow em 150ms; hover ergue 1px e a sombra cresce 2px. Sem `scale` no toque.
- **Continuidade:** troca de aba e entrada de sheet/drawer em 220ms, deslocamento curto (12px) + opacidade.
- **Proibido:** entrada de seção ao rolar (`whileInView`, fade-and-rise), stagger em seções que não são lista, shimmer em skeleton, bounce/elástico, escala no toque, efeitos de canvas genéricos (matrix, plasma, warp) que não falam a geometria da marca.
- **Canvas** (`GlobalCanvasBackdrop`): só no volume Cartaz e só efeitos que dialogam com formas orgânicas e cor chapada (topografia, pontos), em roxo/petróleo sobre areia, com opacidade de bloco (nunca degradê). Em Ficha e Papel o fundo é areia parada, salvo escolha explícita do estudante.
- **Reduced motion:** durações caem para 1ms e loops param; cor e estado continuam, então todo feedback segue legível.

## Do's and Don'ts

### Do:
- **Do** usar Areia (`#F4F2EC`) como fundo de página e Grafite (`#1F1F1F`) como única tinta escura.
- **Do** declarar o volume da página (Cartaz, Ficha ou Papel) e o arquétipo antes de compor.
- **Do** contornar fichas com 2px de grafite e controles com 3px; sombra de 3px na Ficha e 6px só em painéis de Cartaz.
- **Do** construir o Cartaz com blocos chapados de roxo e petróleo em divisões nítidas sobre areia, formas orgânicas e fotografia com dithering.
- **Do** pôr texto branco sobre roxo e petróleo, e texto grafite sobre laranja.
- **Do** usar Poppins com `tabular-nums` para códigos, horas, datas, prazos e valores.
- **Do** dar tracking ampliado (0.02–0.04em) a todo texto em caixa alta.
- **Do** manter a cor original das fotos e deixar a faixa de dithering (20% inferiores) fazer a assinatura; duotone roxo só em capa de Cartaz.
- **Do** escolher o asset de logo pelo fundo (policromático, negativo, badge, preto) e respeitar a zona de proteção.
- **Do** levar o primeiro passo útil para dentro dos primeiros 480px da tela de 375×812.
- **Do** pôr formulário, link e contato dentro do passo a que pertencem.
- **Do** marcar cada item simulado com o sticker SIMULADO, além do aviso de página.
- **Do** fechar todo guia com Assinatura Semente + JourneyNav, escrita na primeira pessoa do plural.
- **Do** reservar animação de impacto ao carimbo de mudança de estado e a germinação à forma orgânica do herói.
- **Do** usar Bootstrap Icons (`bi bi-*`) ou SVG do `CagpIcon` para todo ícone.
- **Do** manter alvos de toque ≥44px e respeitar `prefers-reduced-motion` e a escala de fonte do painel.

### Don't:
- **Don't** usar cinzas frios ou pretos azulados (`#f4f5f7`, `#e5e7ec`, `#16181d`, `#0A0A0A`); o claro é areia, o escuro é grafite.
- **Don't** usar degradê de nenhum tipo entre cores da paleta, nem vidro ou `backdrop-filter`.
- **Don't** usar Laranja Vibrante em frase, parágrafo ou texto pequeno; nem como campo de fundo grande.
- **Don't** usar fonte fora de Poppins e Permanent Marker (Space Mono sai do sistema).
- **Don't** pôr caixa alta em título de ficha, seção, passo ou parágrafo.
- **Don't** pôr eyebrow acima de título, nem numerar abas ou seções quando a ordem não é informação.
- **Don't** usar emoji ou glifo como ícone.
- **Don't** usar shapes BoldKit (burst, estrela, escudo), stickers decorativos ou rotação de conteúdo; a única decoração é a forma orgânica da marca.
- **Don't** usar foto sem a faixa de dithering, nem trocar a faixa por degradê suave ou desfoque.
- **Don't** aplicar sombra, glow, contorno, filtro ou rotação em logo, símbolo ou wordmark, nem redigitar SEMENTE ou CAGP.
- **Don't** usar faixa colorida lateral (`border-left` > 1px) em ficha, alerta ou citação.
- **Don't** animar seção na rolagem nem usar canvas fora do volume Cartaz.
- **Don't** usar texto de leitura abaixo de 14px, nem pesos 500, 600, 800 ou 900.
- **Don't** empilhar barra de voltar, faixa tricolor, badges em série ou faixa de campanha acima do conteúdo.
- **Don't** mostrar dois elementos flutuantes ao mesmo tempo sobre a barra inferior.
- **Don't** usar o rubro CAGP como cor de interface, eixo ou gráfico.
- **Don't** usar componentes de prova social (Testimonials, Logo Cloud com apoios, contadores de adesão): não há dados reais.
- **Don't** introduzir modo escuro; o sistema é exclusivamente claro.
