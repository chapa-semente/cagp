---
name: Super App Discente — Chapa Semente • CAGP UFMG
description: Movimento Estudantil Neoburocrata — neobrutalismo chapado que traduz a burocracia da UFMG num balcão direto.
colors:
  semente-purple: "#5B2A85"
  semente-purple-hover: "#4A216E"
  germinar-orange: "#FE8812"
  germinar-orange-hover: "#E07406"
  orange-text: "#A85300"
  petroleo-teal: "#266264"
  cagp-rubro: "#9E2424"
  ink: "#16181d"
  paper: "#f4f5f7"
  card-white: "#ffffff"
  muted-fog: "#e5e7ec"
  content-secondary: "#4a4e58"
  content-muted: "#5d626e"
  success: "#15803D"
  warning: "#B45309"
  destructive: "#DC2626"
  info: "#005A9C"
typography:
  display:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.05
  headline:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.1
  title:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  accent:
    fontFamily: "'Permanent Marker', cursive"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1
  label:
    fontFamily: "'Space Mono', monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.05em"
  button:
    fontFamily: "'Poppins', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.025em"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  2xl: "16px"
  3xl: "20px"
  full: "9999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
components:
  button-primary:
    backgroundColor: "{colors.semente-purple}"
    textColor: "{colors.card-white}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "8px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.semente-purple-hover}"
    textColor: "{colors.card-white}"
  button-accent:
    backgroundColor: "{colors.germinar-orange}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "8px 20px"
    height: "44px"
  button-accent-hover:
    backgroundColor: "{colors.germinar-orange-hover}"
    textColor: "{colors.ink}"
  button-secondary:
    backgroundColor: "{colors.petroleo-teal}"
    textColor: "{colors.card-white}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "8px 20px"
    height: "44px"
  button-outline:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    padding: "8px 20px"
    height: "44px"
  card:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  input:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
    height: "44px"
  badge:
    backgroundColor: "{colors.semente-purple}"
    textColor: "{colors.card-white}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "2px 10px"
  bottom-nav:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    height: "64px"
---

# Design System: Super App Discente — Chapa Semente • CAGP UFMG

## Overview

**Creative North Star: "Movimento Estudantil Neoburocrata"**

A burocracia da UFMG traduzida num balcão direto: carimbos, protocolos e passaportes, mas sem fila nem labirinto. O sistema é material de luta estudantil — cartaz chapado, adesivo, carimbo — firme, impresso, sem verniz. Blocos sólidos onde as coisas germinam: estrutura rígida em tinta preta, energia laranja brotando dos pontos de ação.

A linguagem é neobrutalista: contornos pretos grossos (3px), sombras duras deslocadas sem desfoque, campos de cor chapada e tipografia pesada em caixa alta. Tudo é opaco, como papel impresso ou adesivo colado; nada flutua em vidro, nada se dissolve em degradê. A densidade é de ferramenta, não de revista: muitos trâmites por tela, organizados em cartões que se comportam como fichas de protocolo. A hierarquia de marca é fixa: a **Chapa Semente** é a base cromática; o **CAGP** comparece como selo institucional.

O sistema roda só em modo claro e precisa funcionar primeiro num celular, à noite, com pressa. O vocabulário burocrático (carimbos DEFERIDO/HOMOLOGADO, passaporte discente, selos) é a assinatura gráfica: transforma o trâmite em algo tátil e resolvível.

**Key Characteristics:**
- Contorno preto de 3px em toda superfície interativa e contêiner.
- Sombra dura deslocada (offset puro, zero blur) como elevação estrutural; o clique "afunda" o elemento na sombra.
- Roxo Semente como campo de autoridade; laranja Germinar como energia de ação; verde-petróleo como apoio analítico.
- Títulos e botões em Poppins Bold, caixa alta; texto em Poppins Regular; Permanent Marker só em palavras de destaque; rótulos técnicos em Space Mono.
- Marca sempre a partir dos PNGs oficiais do manual (`public/logos/semente/*.webp`); nada de lettering imitando o wordmark.
- Vocabulário de carimbo, selo e passaporte como motivo gráfico recorrente.
- Superfícies 100% opacas; modo claro exclusivo.

## Colors

Paleta de cartaz: três campos chapados da identidade Semente sobre tinta preta e papel frio, com o rubro do CAGP reservado ao selo.

### Primary
- **Roxo Semente Profundo** (`semente-purple`): campo de autoridade. Faixa de campanha, heróis, botão primário, badge padrão, anel de foco. Escurece para `semente-purple-hover` no hover.

### Secondary
- **Verde-Petróleo** (`petroleo-teal`): equilíbrio frio. Blocos de dados, gráficos, marcadores secundários, divisórias analíticas e o botão secundário.

### Tertiary
- **Laranja Germinar** (`germinar-orange`): energia e ação. CTAs de destaque, números grandes, formas orgânicas, badges de chamada. Sempre com texto em tinta (`ink`) por cima, nunca branco. Hover em `germinar-orange-hover`.
- **Laranja Contraste** (`orange-text`): a única forma de laranja permitida em texto pequeno sobre fundo claro.

### Neutral
- **Tinta Grafite** (`ink`): texto principal, todos os contornos de 3px e a cor de todas as sombras duras.
- **Papel Frio** (`paper`): fundo da página.
- **Branco Ficha** (`card-white`): cartões, inputs, popovers, barra inferior.
- **Névoa** (`muted-fog`): superfícies sutis, hover de botões outline, trilhos.
- **Texto Secundário** (`content-secondary`) e **Texto Apagado** (`content-muted`): descrições e metadados.

### Institutional seal
- **Rubro CAGP** (`cagp-rubro`): somente selo/marca do CAGP e contextos institucionais (sigla UFMG, atalho SIGA). Não é cor de interface.

### Status
- `success`, `warning`, `destructive`, `info`: estados semânticos de alerta, validação e carimbos (DEFERIDO, PENDENTE, INDEFERIDO).

### Named Rules
**The Flat Poster Rule.** Toda área de cor é bloco chapado sólido. Zero degradês lineares, radiais ou mesh entre cores da paleta.

**The Orange Never Reads Rule.** `germinar-orange` nunca é cor de texto de leitura. Texto laranja pequeno sobre claro usa `orange-text`; texto sobre campo laranja usa `ink`.

**The Rubro Is a Seal Rule.** O rubro do CAGP aparece apenas como selo institucional. Botões, seleção de texto, cursor e scrollbar vestem a Semente.

## Typography

**Display & Body Font:** Poppins — apenas Regular (400) e Bold (700), como autoriza o manual. Classes `font-extrabold`/`font-black` renderizam em Bold.
**Accent Font:** Permanent Marker (400) — substitui a Cinema Outfit do manual (indisponível). Token `--font-accent` / classe `font-accent`.
**Label/Mono Font:** Space Mono (400/700, monospace) — exceção técnica mantida para números de protocolo.
**Acessibilidade:** OpenDyslexic (400/700) substitui as famílias quando o painel de acessibilidade é ativado.

**Character:** Uma geométrica sólida (Poppins) para o título do cartaz e o passo a passo, um traço de marcador à mão para a palavra que precisa de voz, e uma mono de protocolo para números, códigos de disciplina e rótulos de carimbo.

### Hierarchy
- **Display** (700, 1.5rem no celular → 2.25rem a partir de 640px, lh ~1.05): título de página em modo Persuade/Read; caixa alta, `text-wrap: balance`.
- **Headline** (700, 1.25rem → 1.875rem): título de página em modo Operate/condensado e seções principais.
- **Title** (700, 1.25rem): títulos de cartão e de ficha.
- **Body** (400, 1rem, lh 1.5): texto corrido e inputs no celular; `text-wrap: pretty`. Em telas ≥768px, inputs e cartões descem para **Body-sm** (0.875rem).
- **Label** (Space Mono 700, 0.75rem, tracking 0.05em, caixa alta): eyebrows, códigos (DCP-124), metadados, chips de status. Números sempre `tabular-nums`.
- **Button** (Poppins 700, 0.875rem, tracking 0.025em, caixa alta): botões e badges.
- **Accent** (Permanent Marker 400, ≥1.125rem): a voz da chapa escrita à mão sobre o mundo impresso — no máximo um por bloco, até ~4 palavras, sempre `font-normal normal-case tracking-normal`. Usos atuais: destaque de título dos heróis (`titleHighlight` em `hero-section.tsx`); lema *"Toda mudança começa pequena."* no rodapé e no painel Semente da /sobre; "Potencial em ação" no painel de identidade da /chapa-semente; "já é" no título da Carta-Proposta; slogan "Germinar o CAGP" na vitrine de diretorias; adesivo "Turno Noturno" da home; numeral fantasma das páginas de erro.
  - **Nunca:** navegação, botões, rótulos, chips, carimbos (carimbo é Poppins/mono, não caneta), dados, prazos, citações longas, nome de pessoa, texto < 18px.

### Named Rules
**The Protocol Mono Rule.** Código de disciplina, carga horária, data, prazo e valor monetário vão em Space Mono com algarismos tabulares — são números de protocolo, não prosa.

**The Wordmark Is an Asset Rule.** O wordmark SEMENTE e a sigla CAGP nunca são redigitados em fonte; sempre os arquivos de `public/logos/`.

**The Official Asset Rule.** Logos e símbolo vêm dos 12 PNGs oficiais do manual, recortados por `scripts/generate-pwa-icons.mjs` para `public/logos/semente/` (horizontal, vertical, badge, símbolo — policromático, preto e branco). Sobre roxo, use as versões `-branco`; sobre claro, a policromática. Nunca rotacionar, recolorir com filtro CSS ou aplicar sombra no logo.

## Layout

- **Base de 4px** (escala Tailwind). Cartões usam 20px de respiro interno (14px na variante compacta); gaps comuns de 8–16px.
- **Contêiner:** largura máxima 1440px (1600px em 2xl), gutter de 12px no celular e 24px a partir de 640px. Sem rolagem horizontal (`overflow-x: clip` na raiz).
- **Celular primeiro (<768px):** barra de navegação inferior fixa com os 5 eixos, alvos mínimos de 44–48px, `padding-bottom` do corpo reservando a barra e a safe-area.
- **Desktop (≥768px):** a barra inferior some; um trilho lateral de ícones à esquerda carrega os eixos, e o cabeçalho traz busca e atalhos.
- **Navegação por eixos:** Hoje, Acolhimento, Trajetória 600h, Carreira, O CAGP. Cada página pertence a um eixo e exibe breadcrumb + barra do eixo no cabeçalho.
- **Faixa de campanha:** banner roxo fixo no topo, com micro-faixa tricolor; colapsa para 24px ao rolar.
- **Escala de fonte do usuário:** a raiz aceita 93.75% / 100% / 112.5% / 125% pelo painel de acessibilidade; layouts devem crescer em rem.

## Elevation & Depth

Elevação é estrutural e física, nunca atmosférica. Toda profundidade vem de sombra dura em `ink`, deslocada para baixo e à direita, sem desfoque — o objeto parece um adesivo ou recorte de papel colado sobre outro. Interação é deslocamento: no hover o elemento avança contra a sombra (ou se ergue, nos cartões), no clique afunda até a sombra zerar.

### Shadow Vocabulary
- **Hairline** (`1px 1px 0 0 ink`): ícones e microchips.
- **Chip** (`2px 2px 0 0 ink`): badges e botões no hover.
- **Rest** (`4px 4px 0 0 ink`): botões em repouso, input em foco.
- **Card** (`6px 6px 0 0 ink`): cartões e painéis.
- **Card lifted** (`8px 8px 0 0 ink`): cartão interativo no hover; heróis.
- **Stage** (`10px 10px 0 1px ink` / `16px 16px 0 1px ink`): palcos de destaque raros.

### Named Rules
**The Opaque Paper Rule.** Zero vidro, zero blur: `backdrop-filter` é anulado globalmente. Toda superfície é opaca.

**The Press-Into-Shadow Rule.** Estado ativo = translate de 2–3px na direção da sombra + sombra reduzida ou nula. Nunca se usa sombra difusa ou glow para indicar estado.

## Shapes

Retângulos firmes com cantos suavizados, contornados em 3px de tinta. O raio padrão é 12px (`rounded.lg`) para botões, cartões e inputs; tamanhos compactos (botões sm/xs, badges) caem para 8px. Pílulas (`full`) aparecem em indicadores e pontos de status. Contorno de 3px é a regra; 2px só em microelementos e no modo de alto contraste. Formas orgânicas (folha, semente) e shapes BoldKit entram como decoração chapada em laranja/roxo, nunca como contêiner de conteúdo.

## Components

### Buttons
Táteis e confiantes: blocos de cor contornados que afundam na própria sombra.
- **Shape:** cantos suavizados (12px); compactos em 8px. Altura mínima 44px (48px no `lg`, 54px no `xl`).
- **Primary:** roxo Semente, texto branco, contorno ink 3px, sombra Rest, Poppins Bold caixa alta.
- **Accent:** laranja Germinar com texto ink — o CTA de maior energia (votar, tour, passaporte).
- **Secondary:** verde-petróleo com texto branco.
- **Outline:** branco ficha, texto ink; hover em névoa.
- **Ghost / Link:** sem sombra; ghost ganha contorno no hover; link em roxo sublinhado.
- **Hover / Active:** translate 2px + sombra Chip; active translate 3px + sombra zero. Foco: outline 2px em roxo com offset 2px. Vibração háptica curta (12ms) ao tocar.

### Chips / Badges
- **Style:** contorno ink 3px, raio 8px, sombra 2px, Poppins Bold caixa alta 0.75rem.
- **Variants:** semente (roxo), accent (laranja), teal, dark (ink), outline, e estados (success/warning/info com fundos claros e texto escuro). A variante `ufmg` só identifica conteúdo da UFMG.

### Cards / Containers
- **Corner Style:** 12px.
- **Background:** branco ficha; variantes chapadas em roxo, laranja ou névoa.
- **Shadow Strategy:** Card (6px); interativo sobe para Card lifted (8px) no hover e afunda no clique.
- **Border:** ink 3px.
- **Internal Padding:** 20px (14px compacto).

### Inputs / Fields
- **Style:** branco ficha, contorno ink 3px, raio 12px, altura mínima 44px, sombra Chip. Texto 1rem no celular (evita zoom do iOS), 0.875rem no desktop.
- **Focus:** outline 2px roxo com offset + sombra sobe para Rest.
- **Error / Disabled:** contorno `destructive` em `aria-invalid`; desabilitado a 50% de opacidade.

### Navigation
- **Bottom nav (celular):** rótulos curtos de `mobileLabel` em `navigationRegistry.ts` (Hoje · Acolhida · 600h · Carreira · CAGP), nome completo para leitor de tela; barra branca fixa com contorno superior ink 3px e sombra invertida; 5 eixos em grade, ícone dentro de pílula 44×28 e rótulo Poppins Bold caixa alta 0.75rem. Ativo ganha pílula preenchida.
- **Trilho lateral (desktop):** coluna de botões-ícone quadrados contornados; o eixo ativo fica em roxo.
- **Faixa de campanha:** banner roxo com marquee e micro-faixa tricolor no topo do viewport.

### Carimbos & Passaporte (signature)
Selos e carimbos burocráticos (DEFERIDO, HOMOLOGADO, INDEFERIDO) com animação de impacto curta (~240ms) e o Passaporte Discente — o vocabulário gráfico que transforma trâmite concluído em conquista visível.

## Do's and Don'ts

### Do:
- **Do** contornar toda superfície interativa e todo cartão com 3px de `ink`.
- **Do** usar sombra dura deslocada (offset, zero blur) em `ink` para elevação, e afundar o elemento na sombra ao clicar.
- **Do** manter alvos de toque ≥44px e pensar primeiro no celular com a barra inferior.
- **Do** pôr texto `ink` sobre laranja Germinar e branco sobre roxo Semente / verde-petróleo.
- **Do** usar Space Mono tabular para códigos, horas, datas e valores.
- **Do** aplicar os logos SEMENTE e CAGP a partir dos arquivos oficiais.
- **Do** respeitar `prefers-reduced-motion` e a escala de fonte do painel de acessibilidade.

### Don't:
- **Don't** usar degradês entre cores da paleta, nem glassmorphism ou `backdrop-filter`.
- **Don't** usar `germinar-orange` como cor de texto de leitura.
- **Don't** usar o rubro do CAGP como cor de interface (botão, seleção, cursor, scrollbar); ele é selo.
- **Don't** usar sombras difusas, glows ou elevação em blur.
- **Don't** redigitar os wordmarks SEMENTE ou CAGP em fonte.
- **Don't** introduzir modo escuro; o sistema é exclusivamente claro.
