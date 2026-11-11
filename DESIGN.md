---
name: Super App Discente — Chapa Semente • CAGP UFMG
description: O Balcão que Germina — neobrutalismo vivo sobre a identidade da Chapa Semente (roxo, laranja, petróleo, areia) ampliada pelo ciclo da planta (raiz, broto, fruto), que traduz a burocracia da UFMG em passos resolvíveis no celular, à noite.
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
  raiz: "#8A4B2A"
  raiz-tint: "#F3E3D5"
  broto: "#6DB33F"
  broto-deep: "#2F6B1E"
  broto-tint: "#E4F2D8"
  fruto: "#FFC83D"
  fruto-tint: "#FFF2C7"
  cagp-rubro: "#9E2424"
  ufmg-red: "#C4161C"
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

A linguagem é um **neobrutalismo sóbrio**: o manual pede "clareza visual e elegância sóbria", blocos chapados e respiro generoso; o neobrutalismo dá o gesto tátil do balcão (contorno grafite, sombra dura, o botão que afunda como um carimbo). O resultado é menos grito e mais papel bem impresso: contornos de 2px, sombras curtas, muito espaço em areia, cor em grandes blocos nítidos. O volume cresce só onde a campanha fala (o Cartaz), e mesmo ali a voz vem do *color blocking*, das formas orgânicas da folha e da semente e da fotografia real do campus, inteira e em cor, nunca de enfeite.

O isotipo dá o significado de cada cor, e a interface o respeita. A **semente roxa** é o núcleo: o que sustenta (navegação, ação principal, autoridade). A **folha laranja** é o que brota: destaque, conquista, o número grande, a ideia nova. O **petróleo** é o equilíbrio frio dos dados. A **areia** é o solo e o papel. A **pessoa** do símbolo é o estudante, e entra na tela como fotografia real, em cor original e inteira. Os pilares IDEIA · PARTICIPAÇÃO · FUTURO não são decoração: viram laranja, gente e progresso.

As referências estruturais seguem sendo o **Neobrutalism.com** (disciplina: uma sombra por nível, o press exato, poucos tokens) e o **BoldKit** (carimbo, layered card, motion), vendorizados em `src/components/ui/` e `src/components/boldkit/`. Deles vem o comportamento, nunca a paleta nem os enfeites (neon, burst, estrela, escudo). A **Chapa Semente** é a base cromática; o **CAGP** é selo. Modo exclusivamente claro. Primeiro celular (375px), à noite, com sinal ruim e uma mão.

**Virada de 10/11/2026: o site vivo.** O layout e a navegação ficaram; a expressão subiu. O site agora cresce como a semente do nome: **semente → raiz → broto → planta → fruto**. Cada aba é um estágio com cor própria (Hoje = semente roxa, Guias = raiz terra, Chapa = broto verde, Meu curso = planta petróleo, Mais = fruto amarelo), e o estágio pinta a cabeça de página, o solo (fundo), as sombras e o ramo que cresce com a rolagem. A carga expressiva vale para todas as páginas, inclusive guias e ferramentas (decisão do Gabriel: "máximo em tudo", mesmo com custo de contraste em decoração). O que não muda: texto de leitura grafite sobre claro, alvos de toque, a ordem do conteúdo. Onde este documento ainda disser "sóbrio" ou restringir cor a Cartaz, vale esta virada. Fonte: `src/lib/estagios.ts` e `src/styles/estagios.css`.

**Mais em 11/11/2026, depois do teste do Gabriel:** o kit vale para o site inteiro (toda caixa com contorno e sombra dura tem 3px; a ficha sobe para sombra de 4px), a abertura aparece uma vez por sessão e o resto é esqueleto, a aba Mais é página também no celular, a sidebar agrupa as páginas da aba ativa com ícone e sem repetir o nome da aba, a `/chapa-semente` perdeu a calculadora do topo e os dois tours usam as molduras de folha, o botão laranja em folha e adesivos.

**Regras gerais da revisão página por página (11/11/2026, `src/styles/global.css`, fim do arquivo):** caixa com contorno e sem raio declarado ganha raio de 12px (canto reto não existe); caixinha quadrada que só tem um ícone vira quadro de folha; título de seção (`h2`–`h4`) nunca fica em caixa alta; parágrafo, item de lista e célula não descem de 14px e nada desce de 12px; ficha dentro de ficha perde a sombra e fica com 2px. Nomes de disciplina que vêm em CAIXA ALTA do SIGA passam por `src/lib/nomeDisciplina.ts`. Antes de escrever um utilitário solto numa página, conferir se uma destas regras já resolve.

**Virada de 11/11/2026: o kit Semente.** Depois da amostra aprovada pelo Gabriel (a página `/amostra` foi apagada quando o kit terminou de se espalhar; a referência agora é `src/styles/semente-kit.css`), o site ficou mais expressivo e mais próximo do neobrutalismo de BoldKit e Neobrutalism.com, sem sair da geometria do símbolo. Oito regras mudaram e valem sobre qualquer trecho antigo deste documento:
1. **Ilustração com tinta.** Os desenhos de estágio são adesivos recortados: formas cheias com contorno grafite, montadas só com as duas curvas do símbolo (`src/lib/sementeGeometry.ts`, `src/lib/estagioIlustra.ts`, `EstagioIlustra.astro`). O traço fino de `EstagioArt` saiu.
2. **A planta veste as cores do logo em todas as abas:** caule e cabeça roxos, folha laranja; verde-broto e amarelo-fruto de apoio. O estágio muda o bloco, a terra e o tamanho da planta, não a cor da folha.
3. **Folhas que respiram.** Depois de brotar, as folhas das ilustrações balançam de leve em laço (3,6s). É o único laço decorativo além do marquee.
4. **Inclinação de colagem.** Quadros de atalho (−3°/+2°), cartões deslizantes (±1,2°) e adesivos (−4° a −6°) podem inclinar. Texto de leitura, formulários e passos de trâmite continuam retos.
5. **Adesivos.** Etiqueta curta inclinada com sombra dupla (laranja + grafite) para número, rótulo de cartão e valor de slider. No máximo um por bloco; nunca como eyebrow de título.
6. **Cantos de folha.** O raio assimétrico do símbolo (pontas no alto à direita e embaixo à esquerda: `18px 5px 18px 5px` e proporcionais) vale em quadros de ícone, no botão de destaque, no indicador das abas e na caixa de marcar. Fichas e inputs seguem em 12px.
7. **Cartão em camadas** (duas folhas de cor por trás) vale para o cartão-saldo de cada aba, além de passaporte e carta.
8. **Sombra dura de 4 a 5px** em controles, quadros e blocos de aba; a Ficha comum segue em 3px e o Cartaz em 6px.
Peças do kit em `src/styles/semente-kit.css` (prefixo `sk-`): quadro de ícone com a folha brotando, grade de atalhos, cartões deslizantes, cartão-saldo, slider com a semente, interruptor que brota, ficha de marcar com carimbo, progresso em caule, adesivo. As abas trocam as listas de linhas por estes blocos; a home mantém o herói da Chapa. O ramo, no celular, é a borda de baixo do cabeçalho (a semente rola e deixa caule e folhas); no desktop segue na margem direita.

**Key Characteristics:**
- Fundo de página no **solo do estágio** (lilás, terra clara, verde claro, petróleo claro ou amarelo claro; `--estagio-solo`), nunca branco frio nem cinza; grafite (`#1F1F1F`) como única tinta escura. Areia continua nas superfícies internas.
- Três volumes: Cartaz (campanha, *color blocking*), Ficha (trâmite), Papel (leitura). Cada página tem um volume dominante.
- Contorno grafite 2px nas fichas e 3px em controles e peças de Cartaz; sombra dura curta (3px na Ficha, 6px no Cartaz); o clique afunda exatamente na sombra.
- Poppins Regular e Bold em tudo, com algarismos tabulares para números de protocolo; Permanent Marker só na palavra que precisa de voz.
- Caixa alta só no grito (título de página, botão, badge, rótulo), sempre com tracking ampliado.
- Laranja como destaque raro; texto sobre roxo e petróleo sempre branco.
- Fotografia real em cor original, inteira e sem máscara ou textura por cima; duotone roxo só em capas de Cartaz.
- Campanha como assinatura no fim do trâmite, nunca como pedágio antes dele. Única exceção: o tour obrigatório da primeira visita (ver Components › Tour da Chapa).
- Movimento expressivo e sempre ligado: molas, a moldura do app parada enquanto o conteúdo anda, reveal guiado pela rolagem e o carimbo que bate e assenta. **Blur e `backdrop-filter` são proibidos** no projeto inteiro, inclusive em animação.
- Um sistema de ícones só: Phosphor Bold, mais quatro ícones de aba desenhados com a geometria da Semente. Zero emoji.
- Voz híbrida por volume: o Cartaz fala solto, como gente de 2026 que vive na internet; a Ficha fala reto, como quem resolve o trâmite.

## Voice

A voz muda de volume junto com a tela. O site é jovem, brasileiro e cronicamente online no que é campanha, e sério e exato no que é trâmite. Nunca os dois na mesma frase.

- **Cartaz** (tour, `/chapa-semente`, herói da home, 404, vazio, conquista): solto, segunda pessoa, gíria de 2026 com moderação, piada que o estudante reconhece da própria rotina ("Ninguém te contou? A gente conta.", "Essa página sumiu igual seu RA no 1º dia."). Nunca meme datado, nunca deboche de quem pergunta, nunca promessa que o site não cumpre.
- **Ficha** (passos, prazos, formulários, normas): direta, verbo no início, número e prazo exatos ("Peça o TCE no SEI até o dia 15. Passo 2 de 4."). No máximo **uma piscadela por tela**, sempre fora do passo em si (no título de seção, no vazio, na confirmação).
- **Papel** (normas, FAQ, história): neutro e claro. Sem gíria.
- **Rótulos e botões:** verbo + objeto, na língua do estudante, nunca na do sistema. "Levar pro outro celular", não "Exportar token Base64". "Lembrar no meu calendário", não "Ativar alarme .ics". "Seus documentos", não "Cofre 120d".
- **Jargão interno proibido na tela:** Eixo, Hub, Canônico, Facetada, Token, Workspace, Bússola. Siglas da UFMG (DRCA, SIGA, SEI, FUMP, ACG) ficam, com a primeira menção explicada.
- **Chapa:** primeira pessoa do plural ("organizamos", "entregamos"), como pede o manual §9.

## Colors

A paleta oficial do manual, em blocos chapados: três campos de cor da Semente sobre areia e grafite, com o rubro do CAGP guardado no selo e tintas claras só para estado.

### Primary
- **Roxo Profundo** (`semente-purple`): a semente, núcleo e autoridade. Botão primário, item ativo de navegação, anel de foco, faixas e painéis do Cartaz, títulos de alto impacto, badge padrão. Hover em `semente-purple-hover`.
- **Roxo Lavado** (`semente-purple-tint`): fundo da Assinatura Semente, do Accordion aberto e de destaques de proposta no volume Ficha. Nunca fundo de página inteira.

### Secondary
- **Verde-Petróleo** (`petroleo-teal`): equilíbrio frio e sobriedade. Blocos de dados, infográficos, Transparência, progresso das 600h, botão secundário, faixas analíticas do Cartaz. (Não é mais cor de aba ativa: ver The One Active Color Rule.) Lê bem como texto sobre areia (6.2:1).
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

### Acentos botânicos (o ciclo da planta)
Três cores novas ampliam a paleta do manual, sempre chapadas (tokens em `global.css`, uso em `estagios.css`):
- **Terra de raiz** (`raiz`, `#8A4B2A`, texto branco 6.8:1): o estágio Guias, o eixo "Transparência e gestão" no tour das propostas, a linha de sábado dos ônibus.
- **Verde-broto** (`broto`, `#6DB33F`, texto grafite 6.6:1; `broto-deep` para sombra e texto verde): o estágio Chapa, folhas do ramo e dos desenhos, fundo dos mapas de itinerário (`broto-tint`).
- **Amarelo-fruto** (`fruto`, `#FFC83D`, texto grafite): o estágio Mais, frutos dos desenhos, destaque de aviso útil (o bloco "Saiu da aula às 22h30?"), partidas com observação (`fruto-tint`).

| Aba | Estágio | Bloco | Texto | Solo | Sombra |
|---|---|---|---|---|---|
| Hoje | Semente | `#5B2A85` | branco | `#EFE7F6` | roxo |
| Guias | Raiz | `#8A4B2A` | branco | `#F3E3D5` | terra |
| Chapa | Broto | `#6DB33F` | grafite | `#E4F2D8` | `#2F6B1E` |
| Meu curso | Planta | `#266264` | branco | `#E3F0EF` | petróleo |
| Mais | Fruto | `#FFC83D` | grafite | `#FFF2C7` | laranja |

### Institutional seal
- **Rubro CAGP** (`cagp-rubro`): somente o selo CAGP e contextos estritamente institucionais (atalho SIGA). Não é cor de eixo, botão, badge informativo, gráfico nem erro.
- **Vermelho UFMG** (`ufmg-red`, `#C4161C`): a palavra "UFMG" e o traço sob "CAGP" no selo do CAGP no rodapé. Nunca verde/petróleo nesse selo, e nunca fora de marca institucional da UFMG.

### Status
- `success`, `warning`, `destructive`, `info` com tintas `-tint`: cores funcionais, fora da paleta de marca e por isso nunca decorativas. Servem a alerta, validação, carimbos (DEFERIDO, PENDENTE, INDEFERIDO, HOMOLOGADO) e ao sticker SIMULADO. A cor forte vai no texto e no ícone (todas ≥5:1 sobre a própria tinta); a tinta vai no fundo; o contorno continua grafite.

### Named Rules
**The Flat Poster Rule.** Toda área de cor é bloco chapado sólido. Zero degradês lineares, radiais ou mesh, zero transparência sobre cor (`bg-primary/10`), zero vidro. Translucidez só no duotone roxo de capa da fotografia (ver Components › Fotografia).

**The Sand Not Gray Rule.** O claro do sistema é quente: o solo do estágio no fundo da página, areia, areia funda e branco nas superfícies. Cinzas frios (`#f4f5f7`, `#e5e7ec`, `#4a4e58`) e pretos azulados (`#16181d`) saem do código; viram `areia`, `areia-funda`, `grafite-secundario` e `grafite`.

**The White On Color Rule.** Sobre roxo e petróleo, todo texto é branco puro (`#FFFFFF`). Sobre laranja, todo texto é grafite. Não existe texto roxo sobre petróleo, laranja sobre roxo nem cinza sobre cor.

**The Orange Is The Leaf Rule.** Laranja Vibrante é destaque: linha, caixa, número grande, palavra isolada, forma orgânica. Nunca frase, parágrafo ou texto pequeno; texto pequeno alaranjado usa `orange-text`.

**The Rubro Is a Seal Rule.** Rubro e vermelho UFMG só no selo do CAGP. As abas têm cor de estágio (ver tabela acima), nunca rubro.

**The One Active Color Rule.** Dentro da página, todo estado "selecionado" (aba de página, chip de filtro, perfil escolhido, item do trilho) é roxo Semente com texto branco (token `--color-active`). Exceção desde 10/11/2026: a **aba da navegação** ativa (barra inferior e trilho) veste a cor do próprio estágio, e as inativas mostram o ícone sobre o solo do seu estágio.

**The Stage Leads Rule** (substitui One Loud Color). A cor dominante de uma tela é a do seu estágio; as outras cores do ciclo entram como apoio em blocos nítidos (ícones de lista, linhas de ônibus, faixa do rodapé). Laranja segue sendo destaque e cabeçalho de bloco pequeno, não fundo de página.

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
- **Accent — a caneta da chapa** (Permanent Marker 400, ≥1.25rem, `normal-case tracking-normal`): **uma palavra por tela**, sempre com o mesmo gesto: a palavra escrita à mão em roxo (branco sobre cor) e um traço laranja que se desenha por baixo (`underline`) ou em volta (`circle`). Componentes `MarkerWord.astro` / `marker-word.tsx`; no `PageHeader`, a prop `marker` escreve uma palavra do título. Vale no Cartaz e nos **picos da utilidade**: resultado da calculadora 600h, checklist concluído, 404, vazio, conquista. Nunca em navegação, botão, rótulo, carimbo, dado, prazo, nome de pessoa, lista, frase inteira ou texto < 20px.

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
| **Cartaz** | Persuade / Experience | Home (herói), /chapa-semente, Carta-Proposta, 404 | Faixas de cor de ponta a ponta (roxo, petróleo) em divisões nítidas sobre areia; painéis-vitrine com contorno 3px e sombra 6px | Formas orgânicas (folha, semente, semicírculo), fotografia inteira em cor (duotone roxo na capa), numeral laranja, Permanent Marker |
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
- **Celular (<768px):** cabeçalho compacto de 56px (voltar, título, busca, mandar, perfil) + barra inferior fixa de 64px com as 5 abas. Sem menu ☰: o que não cabe na barra vive na aba Mais.
- **Desktop (≥768px):** trilho lateral com as mesmas 5 abas (≥1280px: ícone + nome, com as páginas da aba ativa abaixo; tablet: ícone + rótulo curto), cabeçalho com busca (⌘K) e perfil; barra inferior some.
- **Faixa de campanha:** não existe faixa global no topo (ela comia o orçamento de cabeçalho). A campanha vive no herói da home (com o único marquee do site na base), na aba Chapa, no tour e na Assinatura Semente no fim dos guias.
- **Abas (Modelo B, por tarefa):** Hoje · Guias · Chapa 2 · Meu curso · Mais, definidas só em `src/lib/navigationRegistry.ts`. Barra, cabeçalho, trilho, busca, hubs, JourneyNav e transições leem do registro; nenhum componente mantém mapa de rotas próprio.
  - **Hoje** (`/`): vitrine da chapa até a eleição (faixa Cartaz com os 12 rostos, contagem e um CTA laranja "Como votar"), depois "Hoje à noite" (RU e Circular), "Resolver agora" (atalhos da fase do curso), "Com o CA", seu progresso (só com dado salvo) e o mural simulado. No celular, "Hoje à noite" vem logo abaixo da faixa.
  - **Guias** (`/guias`): todo trâmite com passo a passo, agrupado por momento (Começando, Durante o curso, Terminando) e os **Documentos mais pedidos** no topo, prontos para abrir e mandar no WhatsApp (`src/data/documentosMaisPedidos.json`).
  - **Chapa 2** (`/chapa-semente`, `/gestao`): integrantes, propostas e como votar. O rótulo da aba leva o número da chapa desde 11/11/2026. Fica na barra enquanto o site promove a chapa.
  - **Meu curso** (`/meu-curso`): ferramentas com estado salvo no aparelho (horas 600h, grade, cursos que contam horas, formatura).
  - **Mais** (`/mais`, uma página como as outras, no celular e no desktop; o painel por cima saiu em 11/11/2026): Carreira, O CAGP (ouvidoria, transparência, sobre) e Este site (ajustes, mapa).
- **Dono da rota:** cada rota pertence a uma única aba, e é ela que acende. Hubs podem ter atalhos para rotas de outras abas sem mudar o dono.
- **Faixa "da semente ao fruto"** (`EstagiosFaixa.astro`): acima do rodapé, em todas as páginas, cinco blocos chapados de ponta a ponta, um por aba, com o desenho do estágio (`EstagioArt.astro`) e o nome da aba. É navegação e é a assinatura visual do ciclo.
- **Rodapé:** duas chancelas lado a lado (Chapa Semente como realizadora, selo CAGP com "FAFICH" em grafite e "UFMG" em vermelho UFMG), ecossistema UFMG, atendimento e colunas de links. A linha de direitos é só `© 2026 Chapa Semente`: sem nome do CAGP como titular, sem link do GitHub e sem menção a licença ou código aberto.

### Arquétipos de página
Toda página nova escolhe um destes; não se inventa estrutura por página.

1. **Hub de aba** (`/guias`, `/meu-curso`, `/mais`; Ficha). Cabeça de página condensada → bloco de ação principal da aba (em Guias, os Documentos mais pedidos) → grupos de no máximo 5 linhas (`HubItemList`: ícone, título, uma linha do que resolve). Sem cards soltos em grade.
2. **Guia de trâmite** (`/estagio`, `/acg`, `/tcc`, `/permanencia`, `/documentos`; Ficha + Papel). Cabeça de página → abas (máx. 4) → em cada aba: resumo de 3 linhas ("o que é · quem pode · prazo") → passo a passo numerado com formulário e contato no próprio passo → base normativa (Papel, recolhível) → Assinatura Semente → JourneyNav. Peças prontas em `src/components/ui/tramite/`: `TramiteResumo`, `TramitePassos` (número roxo, régua grafite, ações dentro do passo), `TramiteModelos` (um documento por linha, PDF · Word · Google Docs) e `TramiteAcoes`. `/estagio` e `/acg` são a referência.
3. **Ferramenta** (calculadora 600h, simulador Art. 41, Passaporte; Ficha). Entrada em cima/à esquerda, resultado embaixo/à direita; o resultado ganha o único momento Cartaz da página (carimbo + numeral). Estado salvo localmente é dito na tela.
4. **Catálogo** (`/optativas`, `/cursos`, `/documentos`, `/noticias`; Ficha). Busca + filtros em chips, contagem tabular, lista de itens; detalhe em Drawer no celular e Sheet no desktop. Conteúdo simulado leva o sticker SIMULADO no item e o `SIMULATION_NOTICE` no topo.
5. **Leitura** (normas, `/faq`, história, `/sobre`; Papel). Título, sumário, texto em 68ch, Accordion para perguntas, citação normativa como bloco branco com contorno grafite 2px e rótulo da fonte ("ART. 15, § 4º") acima. Nunca faixa colorida lateral.
6. **Campanha** (home herói, `/chapa-semente`, Carta-Proposta; Cartaz). Color blocking roxo/petróleo sobre areia, formas orgânicas, fotografia real dos 12 integrantes e do campus, numeral laranja, o lema em Permanent Marker. Cada bloco aponta para uma função real do site (a prova, não o discurso).
7. **Erro e vazio** (404, offline, lista vazia). Uma frase do que aconteceu, uma ação e um link. O 404 é Cartaz: símbolo negativo, numeral, uma piada com a caneta ("Essa página *sumiu* igual seu RA no 1º dia."), um CTA laranja "Voltar pro início" e a lista das 5 abas.

### Named Rules
**The Small Change Rule.** "Toda mudança começa pequena": uma ação principal por bloco, um destaque laranja por tela, um passo de cada vez. Se a tela tem duas coisas pedindo atenção igual, uma delas sai.

**The Content-First Rule.** No celular (375×812), a primeira informação útil começa dentro dos primeiros 480px. Cabeçalho do app + cabeça de página + abas somam no máximo ~300px.

**The Chrome Budget Rule.** Acima do conteúdo, só três camadas: cabeçalho do app, cabeça de página, abas. Barra de "voltar" separada, faixa tricolor, badges em série e faixa de campanha não entram nessa pilha.

**The Signature at the End Rule.** A campanha entra depois que o estudante foi atendido: Assinatura Semente no fim do guia, antes do JourneyNav. Exceção única e decidida (10/11/2026): o tour obrigatório da primeira visita.

**The One Float Rule.** Acima da barra inferior cabe no máximo um elemento flutuante por vez.

**The One Owner Rule.** Cada função tem um dono só; os outros lugares são atalhos que abrem o dono, nunca cópias.
- **Fase do curso** (`cagp_user_role_v1`): escolhida em **Seu perfil** (o tour pergunta uma vez e grava lá). A home, o trilho e a carteirinha só leem.
- **Levar pro outro celular** (backup `CAGP1:`): **Seu perfil**. Ajustes só aponta.
- **RU, Circular e lembretes** (`.ics`): folha **Campus agora**. A home mostra o resumo "Hoje à noite".
- **Acessibilidade**: folha **Ajustes** (aba Leitura) e a página `/configuracoes`, com o mesmo conteúdo.
- **Como votar**: `/gestao`. A home, a /chapa-semente e o tour levam para lá.
- **Avisos**: uma cápsula só (`DynamicToast.astro`; em React, `@/lib/toast`).
- **Navegação**: barra inferior + Mais no celular, trilho no desktop. Sem ☰, sem menu de clique direito.

## Elevation & Depth

Profundidade é física e curta: papel bem impresso colado sobre a areia. Sombra dura em grafite, para baixo e à direita, sem desfoque, e **mais curta do que o neobrutalismo de catálogo**, para manter a sobriedade do manual. Interação é deslocamento: o elemento afunda exatamente o tamanho da sombra, como um carimbo pressionado.

### Shadow Vocabulary
- **Chip** (`2px 2px 0 0 grafite`): badge, carimbo, input em repouso, botão compacto, pílula ativa da navegação.
- **Cor da sombra:** desde 10/11/2026 a sombra dura veste a cor do estágio (`--shadow-color`, definido por `html[data-estagio]`); o contorno continua grafite. Cabeça de página e painéis de Cartaz mantêm sombra grafite. No contraste alto volta a grafite.
- **Ficha** (`3px 3px 0 0`): botão em repouso, ficha, input em foco, sheet, popover. A sombra padrão do sistema.
- **Cartaz** (`6px 6px 0 0 grafite`): painéis-vitrine do Cartaz (painel da chapa, carta-proposta, ficha-resultado de ferramenta). Ficha interativa sobe de 3px para 5px no hover.
- Faixas de *color blocking* não têm sombra nem contorno: a profundidade delas é o próprio contraste de cor.

### Named Rules
**The One Shadow Per Volume Rule.** Papel = 0, Ficha = 3px, Cartaz = 6px (só em painéis, nunca em faixas). Ficha dentro de ficha não tem sombra; ganha fundo `areia-funda` ou `petroleo-tint`.

**The Press-Into-Shadow Rule.** Hover: translate −1px e sombra +2px. Active: translate igual à sombra e sombra 0. `--duration-press` com `--ease-spring-snappy`. Nunca glow, blur ou escala.

**The No Shadow On Brand Rule.** Logo, símbolo, wordmark e fotografias nunca recebem sombra, contorno brilhante, chanfro ou efeito 3D (manual, Regra 03). A sombra é da ficha que os contém, não do asset.

**The Opaque Paper Rule.** `backdrop-filter` é anulado e blur é proibido; toda superfície é opaca. Scrim de modal é grafite chapado a 70%, sem textura.

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
| Toast | próprio (`DynamicToast`) | todos | 1 por vez, acima da barra inferior; React chama `@/lib/toast` |
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
- **Barra inferior (celular):** 5 abas, ícone em pílula 44×28, rótulo `mobileLabel` em Poppins 700 12px caixa alta (Hoje · Guias · Chapa 2 · Meu curso · Mais); se a escala de fonte aumentar, o rótulo quebra em duas linhas em vez de vazar. Branca, contorno superior grafite 3px. Ativo: pílula roxa com ícone branco, que **viaja de uma aba à outra** na troca de página (view transition `cagp-nav-pill`). Os ícones de Hoje, Guias, Meu curso e Mais são próprios (ver Ícones). A aba Chapa usa o **símbolo oficial da Semente** (asset policromático, sobre branco quando ativa) no lugar de ícone, para ter presença sem gastar o laranja da tela.
- **Cabeçalho (celular):** 56px, branco: `[‹] título · [Buscar] [Mandar] [Perfil]`. **Mandar** (decisão do Gabriel em 11/11/2026: toda página tem botão de compartilhar) abre o menu de compartilhar com a prévia da página aberta; no trilho do desktop é o botão "Mandar esta página", acima de Seu perfil (só o ícone no tablet). Na raiz da aba não há seta e o título é o nome da aba; dentro dela, o título é o `shortLabel` da página e a seta volta pelo histórico quando a página anterior é do próprio site (senão, leva ao hub da aba). Perfil como botão-avatar de 44px que abre **Seu perfil**. Na home, o símbolo da Semente vem antes do título. Nada de sino nem menu; a home usa este mesmo cabeçalho.
- **Trilho lateral (desktop):** as 5 abas com ícone e nome; a aba ativa em roxo lista suas páginas abaixo. No tablet, ícone + rótulo curto (nunca número sem rótulo).
- **Breadcrumb (≥768px):** Início › Aba › Página, derivado do registro.
- **Abas** (`SegmentedControl`): barra em areia funda, sticky, contorno 2px; a aba ativa é um **indicador roxo que desliza** por baixo dos rótulos com `--ease-spring` (contorno 2px, sombra Chip, afunda ao toque), como o segmented control do iOS com sombra dura. Sem JS a própria aba pinta de roxo. Button em caixa alta, rótulo curto e sem numeração. No celular, uma linha rolável com snap; o fade da borda só aparece do lado que tem aba escondida.
- **JourneyNav:** duas fichas (anterior / próximo) no fim da página, com título e uma linha; direção em Label. A ordem é a do registro, **dentro da mesma aba** (nunca uma corrente global que termina em campanha).

### Cabeça de página (signature)
O único cabeçalho de página (`PageHeader.astro`, classe `.cagp-page-head`). **Bloco de cor do estágio** com contorno 3px, raio 16px e sombra grafite de 6px; uma folha grande na cor de apoio brota do canto superior direito e o desenho do estágio (`EstagioArt`: semente, raízes, broto, planta, frutos) se desenha à direita ao carregar. No modo Persuade a página traz o próprio herói.
- **Conteúdo:** Display, subtítulo em Body na cor do bloco (máx. 2 linhas no celular), badges normativos (1 no celular, até 3 no desktop). Breadcrumb só no desktop. Sem eyebrow: o eixo já está no cabeçalho do app.

### Passo a passo de trâmite (signature)
O coração do volume Ficha. Stepper vertical com o número do passo em Numeral roxo (tabular), cada passo uma ficha: título-verbo, uma ou duas frases e, **na própria ficha**, o que se precisa (formulário, link do SEI/SIGA, e-mail do setor, prazo em Label). Passo concluído ganha carimbo VISTO e o número passa a laranja (a folha brotou).

### Carimbos, sticker SIMULADO e Passaporte (signature)
- **Carimbo:** Label (Poppins 700 caixa alta, tracking 0.04em), contorno grafite 2px, sombra Chip, rotação −2° a +2°, fundo `-tint` e texto na cor de status. É o uso que o manual prevê para o grafite ("carimbos, documentos"). Vocabulário fechado: DEFERIDO (success), HOMOLOGADO (info), PENDENTE (warning), INDEFERIDO (destructive), VISTO (grafite sobre areia funda). Variante da chapa: roxo com texto branco. O carimbo grande de resultado pode trazer o símbolo Semente monocromático preto (asset `semente-simbolo-preto`), como o selo de autenticidade do manual.
- **Sticker SIMULADO:** etiqueta `warning-tint` com texto grafite, raio 6px, colada em todo item fictício (notícias, vagas, talentos, lançamentos).
- **Passaporte Discente:** Layered Card com os carimbos das etapas conquistadas; único lugar onde carimbos se acumulam.

### Fotografia (signature)
A "pessoa" do símbolo entra na tela como gente real, **em cor original e inteira**. Decisão do site que substitui a Regra 04 do manual (P&B obrigatório): a foto mantém a cor, e a marca aparece na moldura (contorno grafite, raio, recorte), nunca sobre a imagem.
- **Sem textura:** nenhuma foto recebe faixa de dithering, pontilhado, quadriculado, reticulado ou degradê na base. A imagem aparece inteira, com bordas nítidas, sobre a superfície da moldura. (A antiga faixa de dithering Bayer 4×4 nos 20% inferiores foi retirada em 10/11/2026.)
- **Escopo:** vale para todas as fotografias (integrantes, campus, Os Candangos, notícias).
- **Texto sobre foto:** legenda ou nome entram em etiqueta grafite sólida com texto branco, encostada na base da foto, nunca soltos sobre a imagem.
- **Duotone de capa:** só no Cartaz (capa do herói, banner de encerramento): camada roxa (`#5B2A85`) em `mix-blend-mode: multiply` via `.cagp-photo-duotone`.
- **Recorte:** retângulo de 12px ou máscara orgânica (folha, semente, semicírculo). Avatares dos integrantes: quadrado de 12px com contorno 2px.
- **Proibido:** filtros de cor (sépia, saturação forçada), vinheta, degradê suave sobre a foto, banco de imagem genérico.

### Tour da Chapa (signature)
O tour obrigatório da primeira visita (`src/components/features/semente/SementeTour.tsx`, roteiro em `src/lib/sementeTour.ts`). Volume Cartaz do começo ao fim.
- **Fluxo:** abertura com os 12 rostos e o lema → "Em que momento do curso você está?" (4 opções, reordena as pessoas) → para cada integrante, uma tela de história e um spotlight na ferramenta → fechamento com a votação e o convite para o tour das propostas. Sem "pular" na primeira visita; ao rever, há fechar.
- **Capturas estáticas (10/11/2026):** o tour **não navega** pelo site. O spotlight acontece sobre uma fotografia real da ferramenta (`public/images/chapa/tour/shots/<id>-{mobile,desktop}.webp`), com a posição do alvo em `src/data/sementeTourShots.json`. As capturas são geradas por `node scripts/capture-tour-shots.mjs http://localhost:4330` a partir do build (rodar de novo quando o visual de uma ferramenta mudar). Tela em pé usa a captura de celular; o resto, a de desktop. A captura da próxima parada é pré-carregada enquanto a pessoa lê.
- **Tela de história:** bloco chapado de ponta a ponta, roxo e petróleo alternando por pessoa; foto grande e inteira com contorno 3px; nome e cargo em etiqueta grafite na base da foto; a dor do estudante como pergunta (Display) e uma frase de quem resolveu. No máximo ~30 palavras.
- **Spotlight:** o bloco de cor se recolhe (`clip-path`) no cartão Cartaz ancorado embaixo; a captura sobe do rodapé e fica sob grafite, com o recorte da ferramenta contornado em laranja 3px. `data-tour="<id>"` continua nas páginas: é o que o script fotografa (`tests/sementeTour.test.ts` confere todos).
- **Fechamento:** quando, onde e o que levar; agenda, tela inicial, WhatsApp e "Ver as 14 propostas, uma por uma" como ações de apoio; "Vou votar na Semente" desce o carimbo SEMENTE PLANTADA.

### Tour das propostas (signature)
Opcional (`PropostasTour.tsx`, roteiro em `src/lib/propostasTour.ts`), aberto pelo botão na `/chapa-semente` e pelo fim do tour da chapa (evento `cagp:start-propostas-tour`). Sempre tem fechar.
- **Estrutura:** abertura com os 4 eixos como 4 estágios (Raiz = Transparência e gestão, Broto = Cultura, Planta = Acadêmico e carreira, Fruto = Comunicação) → 14 telas, uma por proposta → fechamento com "Como votar".
- **Tela de proposta:** bloco chapado na cor do eixo; um quadro areia com o número e uma **animação vetorial** própria da proposta (traço que se desenha, forma que brota; geometria pura, sem ilustração); título, o compromisso em uma frase, e a **fala da diretoria** responsável em ficha branca com foto. As falas são trechos literais de `_referencias/briefing_do_site.md`; não se inventa fala. Quando o site já mostra a proposta, um link leva à prova (com o sticker SIMULADO se for modelo).

### Abertura (splash) e esqueleto
`SplashScreen.astro`: bloco roxo com a planta do kit Semente num adesivo (cantos de folha, sombra em camadas). Aparece **uma vez por sessão**, quando a pessoa abre o site ou o app (decisão de 11/11/2026; antes aparecia em todo carregamento completo). Cada etapa revela uma parte real da planta e é um passo real do carregamento: semente = HTML, raiz = fontes, caule e folhas = página carregada, frutos = cache offline pronto. ~1,1s com tudo em cache; espera o service worker até um teto de 4,5s. Sai com um recorte que sobe. CSS e script inline; sem JS, some sozinha.
**Esqueleto** (`#cagp-skeleton`, `BaseLayout.astro` + `estagios.css`): quando a troca de página demora mais de 220ms (rede lenta), a coluna de conteúdo mostra blocos parados no formato do kit (cabeça de página na cor do estágio, seis quadros de folha, duas fichas), sem brilho nem pulso; quem avisa que está carregando é a semente rolando pela borda do cabeçalho. Some no instante em que a página nova chega.

### Ícones (signature)
Um sistema só: **Phosphor Bold**, peso único em todo o site, na cor do texto.
- **Abas da barra:** quatro ícones próprios com a geometria da Semente, no grid 256 do Phosphor e traço equivalente ao Bold (`src/lib/cagpIcons.ts › TAB_ICONS`): **Hoje** (o semicírculo nascendo no horizonte), **Guias** (o caminho em S do aro até a folha), **Meu curso** (livro aberto com a folha brotando da lombada), **Mais** (três blocos e a folha no canto). A aba Chapa usa o símbolo oficial.
- **Astro e dados:** `<CagpIcon name="…">` (SVG inline) ou a classe legada `bi bi-*`, que agora desenha o glifo Phosphor equivalente por uma fonte recortada (`src/styles/icons.css`, gerada por `node scripts/build-icons.mjs`; rodar de novo ao usar um `bi-*` novo).
- **React:** `@/components/ui/icons` (mesmos nomes que o lucide usava, desenho Phosphor Bold) ou `@phosphor-icons/react` com `weight="bold"`.
- **Moldura:** quando o ícone ganha caixa, é quadrado de 12px. Nas listas de hub (`HubItemList`) as caixas percorrem as cinco cores do ciclo, uma por linha, com contorno 2px; em outros contextos, `areia-funda` ou `primary-tint`.
- **Proibido:** emoji, glifo Unicode como ícone (→ ↗ ✓ ☀ ♀), mistura de pesos (Regular com Bold), ícone sem rótulo na navegação.

### Logos (signature)
- **Escolha do asset por fundo** (`public/logos/semente/`): areia e branco → policromático (`semente-horizontal`, `semente-vertical`, `semente-simbolo`); roxo e petróleo → negativo (`-branco`); fotografia → badge (`semente-horizontal-badge-laranja` ou `-petroleo`); impressão P&B, carimbo e documento → `-preto`.
- **Proibido:** distorcer, rotacionar, deitar ou inverter; recolorir fora da paleta ou com filtro CSS; sombra, glow, chanfro ou 3D; encostar na borda; redigitar o wordmark.
- **Assinatura textual** (quando o asset não cabe, ex. rodapé de documento gerado): `CHAPA GESTÃO PÚBLICA · SEMENTE` em Poppins 700 caixa alta com tracking 0.04em, sem tentar imitar o lettering.

### Número da chapa (signature)
A Semente é a **Chapa 2** (número divulgado em 11/11/2026; fonte única em `src/lib/chapaSementeData.ts`: `CHAPA_NUMERO`, `CHAPA_ROTULO`, `CHAPA_NOME`).
- **Como se escreve:** o pedido de voto é "Vote Chapa 2"; em título e rótulo, "Chapa 2 · Semente"; em frase, "a Semente, Chapa 2". Atribuições ("Proposta 7 da Chapa Semente", "feito pela Chapa Semente") e o texto alternativo dos logos seguem só com o nome.
- **Onde entra:** toda chamada de voto (herói da home, `/chapa-semente`, fechamento dos dois tours, pílula, `/gestao`), o rótulo da aba, o título do navegador, a Assinatura Semente e os textos que saem do site (agenda `.ics`, WhatsApp, notificação).
- **Adesivo de número** (`.sk-chapa-num`, `semente-kit.css`): o adesivo do kit no tamanho de cédula. Branco, contorno 3px, canto de folha, sombra dupla laranja + grafite, inclinado −4°; "Chapa" em Label grafite e o algarismo em Numeral roxo. Um por bloco, só no Cartaz: ao lado da chamada de voto no herói da home e ao lado do logo na `/chapa-semente` (com a zona de proteção). O número nunca entra dentro do asset do logo nem é desenhado com a caneta.

### Assinatura Semente (signature)
Ficha em `semente-purple-tint`, contorno grafite 2px, sem sombra, no fim de cada guia: símbolo Semente policromático (asset, com zona de proteção), rótulo em Label roxo "CHAPA 2 · PROPOSTA 3 EM AÇÃO", uma frase do que a chapa fez nesta página (primeira pessoa do plural, como pede o manual §9: "organizamos", "entregamos"), nome e diretoria responsável quando houver, e um link outline "Conhecer a proposta". Sem citação longa, sem botão laranja, sem expansão.

### Banners de compartilhamento (signature)
Todo endereço do site tem uma prévia de link: título, descrição e um banner de 1200×630 (decisão de 11/11/2026, aprovada pelo Gabriel). Fonte única em `src/data/compartilhamento.json`; o `BaseLayout` escreve as etiquetas `og:` e `twitter:` com o que `src/lib/previas.ts` devolve para a rota. Os banners são vetores (`scripts/og/moldes.mjs`) fotografados por `node scripts/generate-og.mjs` com as fontes do site, e ficam em `public/og/` (fora do cache offline). Mudou um texto, uma foto ou um molde: rode o script e suba `versao` no JSON, porque o WhatsApp guarda a prévia antiga de um endereço.
- **Anatomia fixa:** bloco chapado na cor da aba (ou do eixo, nas propostas), uma etiqueta com o nome da página, o gancho em até oito palavras com **uma** palavra na caneta, um rosto ou um desenho na moldura de folha, e a barra branca com o logo (asset oficial, sempre sobre branco), a data da eleição e o adesivo do 2.
- **Sete moldes:** Cartaz da chapa (home, `/chapa-semente`, `/gestao`), Dor e resposta (guias e ferramentas: o gancho é a dor que o tour já usa e o rosto é o de quem puxou a frente), Documento na mão (o nome do documento é o maior texto), Proposta (cor do eixo, número em adesivo, fala literal do briefing), Pessoa (foto inteira em cor, nome como título), Modelo (conteúdo de exemplo leva o adesivo "Modelo · dados de exemplo") e as peças em pé do kit (`public/og/kit/`: story do voto e uma arte de feed por proposta).
- **Legibilidade:** o banner aparece com ~300px de largura no WhatsApp. O gancho não desce de 56px no original e nada que importa fica abaixo de 30px.
- **Endereços com banner próprio:** `/doc/<id>` (documentos mais pedidos; link de PDF nunca gera prévia), `/propostas/<n>` e `/chapa-semente/<nome>`. Âncora (`#proposta-7`) não tem prévia própria: rede social ignora o que vem depois do `#`.
- **Texto que sai do site:** o link é o favor, a campanha é a assinatura. A mensagem é corpo + link + uma linha de assinatura (`src/lib/compartilhar.ts`), em três tons: *útil* (documentos, guias, ferramentas), *convite* (chapa, propostas, pessoas) e *voto* (só quando a pessoa declara). A assinatura troca sozinha depois de 26/11/2026; a variação do dia da eleição fica desligada (`VARIACAO_DO_DIA_DA_ELEICAO`) até a Junta Eleitoral confirmar a regra. Depois da eleição, os banners são regerados com `--fase=depois` (sem data nem adesivo).
- **Em toda página:** o cabeçalho do celular e o trilho do desktop têm o botão de mandar a página aberta (`data-compartilhar="pagina"`, que lê as metas `cagp:mensagem` e `cagp:tom` escritas pelo `BaseLayout`, porque a moldura fica parada na troca de página).
- **Um botão só:** `BotaoCompartilhar.astro` (ou `data-compartilhar` num botão próprio; em React, `compartilhar()`). Abre o menu de compartilhar do celular e, onde ele não existe, o WhatsApp. Sempre visível: nada de compartilhar escondido em clique direito.
- **Nunca:** número de uso, depoimento ou apoio; fala entre aspas que não seja trecho literal do briefing; banner próprio para notícia ou vaga de exemplo; selo do CAGP como autor; dado da pessoa no endereço (o resultado de uma calculadora só entra no texto se ela mandar). `tests/previas.test.ts` confere que toda rota tem banner e que as regras acima valem.

### Movimento
O site se mexe como papel e carimbo: peso, mola e impacto. Movimento é **sempre ligado** (o site não encurta nem desliga animação por `prefers-reduced-motion`) e tem um teto rígido: **nenhum blur, nenhum `backdrop-filter`, nenhum `filter` de desfoque**, nem de passagem num keyframe.

**Tokens** (`src/styles/global.css`, espelhados em `src/lib/motion.ts` para `motion/react`):
- `--ease-spring-snappy` (ζ 0.88, quase sem sobra): press, troca de vista, abas. `snappySpring`.
- `--ease-spring` (ζ 0.72, passa 4% e volta): sheets, drawers, indicador da aba, fichas entrando, reveal. `tactileSpring`, `drawerSpring`.
- `--ease-spring-bouncy` (ζ 0.55, passa 12% e assenta): só celebração — carimbo, germinar, conquista. `celebrateSpring`. Nunca em navegação ou formulário.
- `--ease-snap` para saídas e cores. Durações: `--duration-press` 160ms, `--duration-view` 380ms, `--duration-spring` 520ms, `--duration-stamp` 560ms, `--duration-reveal` 640ms. Nada de `cubic-bezier` ou duração solta em componente.

**O que se mexe:**
- **Toque:** press-into-shadow em tudo que é clicável (sobe 1px e a sombra vai a 5px no hover; afunda exatamente na sombra no toque), com a mola firme. Sem escala no toque.
- **Troca de página:** a moldura do app (cabeçalho, trilho, barra inferior) fica parada; só o `<main>` anda, na direção da navegação (aba à direita entra pela direita; página filha sobe da sombra com um recorte que se abre). A pílula da aba ativa viaja até a aba nova.
- **Título que viaja:** ao tocar numa linha de lista (Hub, atalhos da home), o título da linha voa até virar o título da página aberta, e volta ao retornar (`data-vt-title` + `data-vt-href` na linha; `src/scripts/sharedTitle.ts` nomeia só a linha tocada; o `<h1>` do `PageHeader` já leva o nome da rota).
- **Abas da página:** o indicador roxo desliza com a mola; o painel novo sobe 18px com a mola.
- **Rolagem:** blocos (fichas, grupos, faixas) podem entrar guiados pela rolagem com `.cagp-reveal`, `.cagp-reveal-card` (a sombra pousa junto) e `.cagp-reveal-stagger` (filhos em cascata). Formas orgânicas do Cartaz andam mais devagar que a página com `.cagp-parallax`. É CSS scroll-driven, sem JS; onde o navegador não suporta, tudo já está visível e parado. Nunca em texto corrido do volume Papel.
- **Momento autoral: o carimbo.** Quando um estado muda (resultado do simulador do Art. 41, checklist concluído, voto declarado), o carimbo cai grande e inclinado, bate no papel, passa do ponto e assenta; só no impacto a tinta "pega" (a sombra dura aparece de uma vez) e o papel embaixo cede 3px. Classes `.cagp-big-stamp`, `.cagp-stamp-impact`, `.cagp-stamp-host-jolt`; o `key` do React remonta o carimbo a cada mudança. Carimbo em repouso é estático.
- **A caneta:** o traço laranja da `MarkerWord` se desenha uma vez ao carregar (ou guiado pela rolagem com `scroll`).
- **Germinar (Cartaz):** a folha laranja do herói cresce da base com a ginga, uma vez.
- **Crescer (todas as páginas):** um ramo ondulado na borda direita (`GrowthBackdrop.astro`) se desenha conforme a página rola; as folhas brotam no caminho e o fruto aparece no fim. Uma forma orgânica grande, num tom médio do estágio, fica parada atrás do conteúdo no canto inferior direito. CSS guiado pela rolagem, sem JS; sem suporte, o ramo aparece inteiro. Some no tour, na impressão e no contraste alto.
- **Desenho do estágio:** na cabeça de página e na faixa do rodapé, as partes da planta entram em ordem (raiz desenha, folha brota, fruto pinga).
- **Tour da Chapa:** o bloco de cor que se recolhe no cartão do spotlight (clip-path) é o gesto do tour; as fotos germinam de baixo para cima; o fim é o carimbo.
- **Números:** numerais grandes contam até o valor quando aparecem (`data-count-to`, `data-count-suffix`; `src/scripts/countUp.ts`). O HTML já traz o valor final.
- **Tour:** com o tour aberto, a troca de página por trás do bloco de cor pula a view transition (a camada de transição engolia os toques em "Próxima").

**Proibido:** blur e desfoque em qualquer forma, glow, escala no toque, rotação de texto de leitura, shimmer em skeleton, loop decorativo fora do marquee da campanha e do balanço das folhas, efeitos de canvas genéricos (matrix, plasma, warp) que não falam a geometria da marca.

**Canvas** (`GlobalCanvasBackdrop.astro` + `src/lib/canvasBackdrop.ts`, sem React): só no volume Cartaz, escolhido pelo site e nunca pelo estudante: topografia na /chapa-semente, pontos nas outras telas de campanha. O desenho é o dos efeitos BoldKit, com motor leve: 30 quadros por segundo, tabelas pré-calculadas, parado quando a abertura ou um tour cobrem a tela (`tests/canvasBackdrop.test.ts` garante que o traço não mudou). Em Ficha e Papel o fundo é o solo do estágio com o ramo e a forma orgânica. Ajustes › Leitura só tem tamanho da letra, contraste e fonte para dislexia.

## Do's and Don'ts

### Do:
- **Do** usar o solo do estágio como fundo de página (areia nas superfícies internas) e Grafite (`#1F1F1F`) como única tinta escura.
- **Do** pintar a página com o estágio da aba: cabeça em bloco de cor, sombra na cor do estágio, ramo crescendo na rolagem.
- **Do** declarar o volume da página (Cartaz, Ficha ou Papel) e o arquétipo antes de compor.
- **Do** contornar fichas com 2px de grafite e controles com 3px; sombra de 3px na Ficha e 6px só em painéis de Cartaz.
- **Do** construir o Cartaz com blocos chapados de roxo e petróleo em divisões nítidas sobre areia, formas orgânicas e fotografia real em cor.
- **Do** pôr texto branco sobre roxo e petróleo, e texto grafite sobre laranja.
- **Do** usar Poppins com `tabular-nums` para códigos, horas, datas, prazos e valores.
- **Do** dar tracking ampliado (0.02–0.04em) a todo texto em caixa alta.
- **Do** manter a cor original das fotos, inteiras, e deixar a moldura fazer a assinatura; duotone roxo só em capa de Cartaz.
- **Do** escolher o asset de logo pelo fundo (policromático, negativo, badge, preto) e respeitar a zona de proteção.
- **Do** levar o primeiro passo útil para dentro dos primeiros 480px da tela de 375×812.
- **Do** pôr formulário, link e contato dentro do passo a que pertencem.
- **Do** marcar cada item simulado com o sticker SIMULADO, além do aviso de página.
- **Do** fechar todo guia com Assinatura Semente + JourneyNav, escrita na primeira pessoa do plural.
- **Do** usar só as três molas e as durações dos tokens; ginga só em celebração.
- **Do** deixar a moldura parada e o conteúdo andar na troca de página.
- **Do** usar Phosphor Bold (`CagpIcon`, `bi bi-*` via `icons.css`, `@/components/ui/icons`) para todo ícone; os quatro ícones de aba são os próprios.
- **Do** escrever a palavra da caneta com `MarkerWord`, uma por tela.
- **Do** separar a voz por volume: solta no Cartaz, reta na Ficha, neutra no Papel.
- **Do** manter alvos de toque ≥44px e respeitar a escala de fonte do painel.

### Don't:
- **Don't** usar cinzas frios ou pretos azulados (`#f4f5f7`, `#e5e7ec`, `#16181d`, `#0A0A0A`); o claro é areia, o escuro é grafite.
- **Don't** usar degradê de nenhum tipo entre cores da paleta, nem vidro ou `backdrop-filter`.
- **Don't** usar Laranja Vibrante em frase, parágrafo ou texto pequeno; nem como campo de fundo grande.
- **Don't** usar fonte fora de Poppins e Permanent Marker (Space Mono sai do sistema).
- **Don't** pôr caixa alta em título de ficha, seção, passo ou parágrafo.
- **Don't** pôr eyebrow acima de título, nem numerar abas ou seções quando a ordem não é informação.
- **Don't** usar emoji ou glifo como ícone.
- **Don't** usar shapes BoldKit (burst, estrela, escudo) nem inclinar texto de leitura, formulário ou passo de trâmite; adesivo e inclinação só nos casos da virada de 11/11/2026.
- **Don't** aplicar faixa de dithering, pontilhado, quadriculado, degradê ou desfoque sobre a foto.
- **Don't** aplicar sombra, glow, contorno, filtro ou rotação em logo, símbolo ou wordmark, nem redigitar SEMENTE ou CAGP.
- **Don't** usar faixa colorida lateral (`border-left` > 1px) em ficha, alerta ou citação.
- **Don't** usar blur, `backdrop-filter` ou `filter: blur` em nada, nem dentro de keyframe.
- **Don't** animar texto corrido na rolagem nem usar canvas fora do volume Cartaz (o ramo e as formas do estágio são SVG/CSS, não canvas).
- **Don't** marcar seleção dentro da página com petróleo, laranja ou grafite: ativo é roxo (só a aba da navegação veste a cor do estágio).
- **Don't** pôr dado "ao vivo" que o site não tem: ônibus internos são retrato datado do site da UFMG (`/onibus-internos`), sem "próximo em X min".
- **Don't** pôr jargão interno na tela (Eixo, Hub, Canônico, Token, Workspace).
- **Don't** usar texto de leitura abaixo de 14px, nem pesos 500, 600, 800 ou 900.
- **Don't** empilhar barra de voltar, faixa tricolor, badges em série ou faixa de campanha acima do conteúdo.
- **Don't** mostrar dois elementos flutuantes ao mesmo tempo sobre a barra inferior.
- **Don't** usar o rubro CAGP como cor de interface, eixo ou gráfico.
- **Don't** usar componentes de prova social (Testimonials, Logo Cloud com apoios, contadores de adesão): não há dados reais.
- **Don't** introduzir modo escuro; o sistema é exclusivamente claro.
