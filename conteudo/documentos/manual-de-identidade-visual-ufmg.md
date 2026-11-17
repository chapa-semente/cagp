# Manual de Identidade Visual & Diretrizes da Marca: UFMG

**Instituição:** Universidade Federal de Minas Gerais (UFMG)

**Órgão Responsável:** Centro de Comunicação da UFMG (CEDECOM)

**Documentos de Origem:** `VARIACOES_marcaufmg.eps` e `ASSINATURAS_marcaufmg.eps` (Adobe Illustrator CS4 / AGM Core Engine)

**Finalidade:** Especificação técnica de design, normatização gráfica, engenharia de layout, acessibilidade cromática e parametrização canônica para diagramadores, desenvolvedores web e agentes de Inteligência Artificial.

---

## 0. Metadados para Agentes e Modelos de IA (Machine-Readable Block)

```yaml
brand:
  name: "Universidade Federal de Minas Gerais"
  acronym: "UFMG"
  origin_office: "CEDECOM - Centro de Comunicação da UFMG"
  category: "Instituição Federal de Ensino Superior (IFES)"
  foundation_year: 1927
morphology:
  anatomy: "Híbrido Clássico-Gestual (Serifado Romano + Caligráfico Cursivo)"
  components:
    letter_u: "Didone/Bodoni Roman Serif (Caixa-alta, hastes contrastadas, serifas retas)"
    letter_f: "Didone/Bodoni Roman Serif (Caixa-alta, barra mediana alinhada)"
    letter_m: "Calligraphic Cursive Swash (Itálico gestual humanista, dinâmico, inclinado)"
    letter_g: "Didone/Bodoni Roman Serif (Caixa-alta com espora e terminação terminal curva)"
    accent_bar: "Traço horizontal retangular espesso sob a letra M (ancoragem de peso)"
  subtitle_typography: "Humanist Grotesque / Sans-serif Lapidar (UNIVERSIDADE FEDERAL DE MINAS GERAIS)"
palette:
  primary_black:
    cmyk: "0, 0, 0, 100"
    rgb: [0, 0, 0]
    hex: "#000000"
    pantone: "Pantone Black C"
  primary_red:
    cmyk: "0, 100, 100, 15"
    rgb: [196, 22, 28]
    hex: "#C4161C"
    pantone: "Pantone 187 C / 200 C"
  secondary_dark_red:
    cmyk: "0, 100, 100, 20"
    rgb: [184, 18, 23]
    hex: "#B81217"
  pure_white:
    cmyk: "0, 0, 0, 0"
    rgb: [255, 255, 255]
    hex: "#FFFFFF"
  neutral_gray_annotation:
    cmyk: "64.17, 55.27, 51.23, 26.84"
    rgb: [89, 93, 97]
    hex: "#595D61"
variations:
  formats: ["Horizontal Completa", "Horizontal Reduzida (Sigla)", "Vertical/Bloco Centralizado"]
  chromatic: ["Policromática (Preto + Vermelho)", "Monocromática Positiva (Preto 100%)", "Monocromática Negativa (Branco Vazado)", "Escala de Cinza"]
signatures: ["Institucional", "Realização", "Co-organização", "Apoio", "Patrocínio", "Parceria", "Coligadas"]

```

---

## 1. Visão Geral e Semiótica da Marca

A marca da **Universidade Federal de Minas Gerais (UFMG)** é um dos símbolos mais reconhecidos do ensino superior e da produção científica brasileira. Sua identidade visual sintetiza a coexistência harmônica entre **tradição acadêmica secular** e **vanguarda criativa e científica**.

```
    U   F    _M_    G
   [Serif]  [Cursivo [Serif]
            + Barra]
   ==========================
   UNIVERSIDADE FEDERAL DE MINAS GERAIS

```

### 1.1 A Tensão Tipográfica: Tradição vs. Contemporaneidade

A singularidade do logotipo da UFMG reside na composição contrastante entre dois universos tipográficos distintos:

1. **A Solidez Romana (Letras "U", "F" e "G"):**
* Desenhadas em estilo romano clássico de transição/moderno (estilo *Didone / Bodoni*).
* Apresentam serifas filiformes bem delineadas, forte contraste entre traços grossos e finos e terminação vertical pura.
* Evocam a fundação em 1927, o rigor do método científico, a autoridade do saber universitário e a perenidade do patrimônio público.


2. **O Gesto Humanista e Dinâmico (Letra "M"):**
* Desenhada como um ideograma caligráfico cursivo em itálico fluido (*swash cursive*).
* Destaca-se imediatamente em cor rubra, quebrando a rigidez das letras serifadas neutras.
* Representa a alma das Minas Gerais: a criatividade, a pluralidade, a cultura viva, a inquietude da pesquisa e o calor das relações humanas no ambiente acadêmico.


3. **A Barra de Apoio Sob o "M":**
* Um segmento retangular horizontal plano posicionado diretamente abaixo das pernas do "M".
* Estabelece a ancoragem física e compositiva da letra cursiva em relação à linha de base (*baseline*) dos glifos "U", "F" e "G", impedindo o desequilíbrio ótico gerado pela curvatura inferior do glifo gestual.



### 1.2 A Assinatura por Extenso (Subtítulo Institucional)

A denominação **UNIVERSIDADE FEDERAL DE MINAS GERAIS** em caixa-alta é composta em tipografia sem serifa geométrica humanista, com kerning arejado (*letter-spacing* positivo), conferindo legibilidade técnica perfeita mesmo em reduções extremas.

---

## 2. Sistema Cromático Oficial

A análise espectral dos arquivos PostScript e das matrizes CMYK originais do CEDECOM revela os valores exatos de reprodução da marca:

| Nome da Cor | CMYK | RGB (sRGB) | HEX | Pantone Equivalente | Função Institucional |
| --- | --- | --- | --- | --- | --- |
| **Vermelho UFMG** | `0, 100, 100, 15` | `196, 22, 28` | `#C4161C` | Pantone 187 C | Aplicação primária exclusiva no glifo **"M"** e na **barra horizontal inferior**. |
| **Preto Institucional** | `0, 0, 0, 100` | `0, 0, 0` | `#000000` | Pantone Black C | Letras **"U"**, **"F"**, **"G"** e assinatura por extenso em superfícies claras. |
| **Branco Puro** | `0, 0, 0, 0` | `255, 255, 255` | `#FFFFFF` | Branco Opaco | Aplicação total em fundos escuros (marca negativa/vazada) e fundo padrão. |
| **Cinza de Retícula** | `0, 0, 0, 40` a `60` | `168, 170, 173` | `#A8AAAD` | Pantone Cool Gray 6 C | Variações em meio-tom monocromático e separações de chancelas. |
| **Cinza Neutro Técnico** | `64.17, 55.27, 51.23, 26.84` | `89, 93, 97` | `#595D61` | Pantone 424 C | Linhas auxiliares e textos descritivos nos gabaritos do CEDECOM. |

### 2.1 Índices de Acessibilidade e Contraste (WCAG 2.1)

* **Preto (`#000000`) sobre Branco (`#FFFFFF`):** Contraste de **$21:1$** (Conformidade máxima Nível AAA).
* **Vermelho UFMG (`#C4161C`) sobre Branco (`#FFFFFF`):** Contraste de **$5.9:1$** (Conformidade Nível AA para texto comum e Nível AAA para elementos gráficos/display).
* **Branco (`#FFFFFF`) sobre Vermelho UFMG (`#C4161C`):** Contraste de **$5.9:1$** (Excelente legibilidade para caixas de destaque e aplicações especiais).

---

## 3. Matriz de Variações e Aplicações da Marca

Conforme sistematizado no arquivo canônico `VARIACOES_marcaufmg.eps`, a identidade visual é homologada nas seguintes configurações:

```
+-------------------------------------------------------------------------+
|                  MATRIZ DE VARIAÇÕES (CEDECOM/UFMG)                     |
+------------------------------------+------------------------------------+
| 1. POLICROMIA PREFERENCIAL         | 2. MONOCROMÁTICA POSITIVA (PB)     |
| [U, F, G: Preto | M e Barra: Verm.] | [Toda em Preto 100% K]             |
| Fundo: Branco ou neutro claríssimo | Fundo: Claro / Impressão 1 cor     |
+------------------------------------+------------------------------------+
| 3. NEGATIVA / VAZADA               | 4. ESCALA DE CINZA                 |
| [Todos os elementos em Branco]     | [U,F,G: Preto 100% | M: Cinza 50%] |
| Fundo: Preto, Vermelho UFMG, fotos | Fundo: Impressão jornal/PB tons    |
+------------------------------------+------------------------------------+

```

### 3.1 Versão Preferencial (Policromática)

* **Aplicação:** É a versão obrigatória para a grande maioria das peças impressas e digitais.
* **Composição:** Letras "U", "F" e "G" em Preto 100% K; letra "M" e barra inferior em Vermelho UFMG (`C:0 M:100 Y:100 K:15`).

### 3.2 Versão Monocromática Positiva

* **Aplicação:** Destinada a publicações a uma única cor (como documentos oficiais timbrados monocromáticos, faturas, notas de empenho, anúncios de jornal P&B, carimbos e gravações a laser/baixo relevo).
* **Composição:** 100% Preto em todos os componentes tipográficos e no traço inferior.

### 3.3 Versão Negativa (Vazada)

* **Aplicação:** Obrigatória sobre fundos pretos, superfícies institucionais escuras, tecidos escuros ou fotografias de baixa luminosidade com alto contraste.
* **Composição:** Todos os glifos ("U", "F", "M", "G"), a barra horizontal e o subtítulo por extenso invertidos inteiramente para Branco Puro (`#FFFFFF`).
* **Vedação:** É estritamente vedado manter a letra "M" em vermelho quando aplicada sobre fundos vermelhos ou escuros de baixo contraste cromático.

### 3.4 Versão em Escala de Cinza (Halftone)

* **Aplicação:** Publicações científicas, relatórios técnicos xerográficos ou cadernos de jornais com retícula de meios-tons.
* **Composição:** Glifos "U", "F", "G" e subtítulo a $100\%$ Preto; glifo "M" e barra inferior reticulados a $50\%$ ou $60\%$ de Preto.

---

## 4. Grid Construtivo, Alinhamento e Áreas de Proteção

### 4.1 Proporções Estruturais e Alinhamento

* **Altura da Marca (H):** A altura do corpo das letras maiúsculas "U", "F" e "G" serve como a constante de proporção mestra ($H$).
* **O Vértice do "M":** O arco superior da letra "M" estende-se ligeiramente acima da linha superior (*cap-height*) de "U" e "F" (cerca de $1.08H$), conferindo o ritmo visual orgânico típico das ligaturas cursivas.
* **Posição da Barra:** O filete sob o "M" possui espessura proporcional à largura da haste principal do "F" e se posiciona simetricamente sob o vão inferior da curva do "M", alinhado à margem inferior da linha de base de "U" e "G".

```
     |<- - - - - - - - Comprimento Total da Sigla - - - - - - - ->|
     +-------+-------+-----------------------------+-------+------+
     |   U   |   F   |              M              |   G   |      |
     |       |       |             ---             |       |  (H) |
     +-------+-------+-----------------------------+-------+------+
     |                 UNIVERSIDADE FEDERAL                | (0.2H)
     |                   DE MINAS GERAIS                   |
     +-----------------------------------------------------+

```

### 4.2 Área de Não-Interferência (Clearspace)

* Para preservar a visibilidade e a força institucional da marca, deve-se resguardar ao redor de qualquer aplicação uma margem perimetral livre de qualquer texto, imagem, fio ou elemento gráfico.
* **Medida Mínima:** A distância de respiro perimetral é equivalente a **$1/2$ da altura da letra "U"** ($0.5H$) em todas as quatro direções (superior, inferior, esquerda e direita).

### 4.3 Limites Mínimos de Redução

Para assegurar a legibilidade e a integridade das serifas finas:

* **Impressão Offset/Digital (300 dpi):**
* Versão Completa (com extenso): Largura mínima de **$32\text{ mm}$**.
* Versão Somente Sigla: Largura mínima de **$18\text{ mm}$**.


* **Mídias Digitais e Telas (72/96 dpi):**
* Versão Completa: Largura mínima de **$120\text{ px}$**.
* Versão Somente Sigla: Largura mínima de **$60\text{ px}$**.
* Ícone/Favicon: Recomenda-se a estilização da letra "M" rubra isolada com traço de base em $16\times16\text{ px}$ ou $32\times32\text{ px}$.



---

## 5. Sistema de Assinaturas e Chancelas Conjuntas

Com base no arquivo `ASSINATURAS_marcaufmg.eps`, a UFMG adota réguas canônicas para situações de coparticipação institucional, eventos, patrocínios e parcerias públicas ou privadas.

### 5.1 Categorias de Chancelas Padronizadas

As assinaturas vêm sempre encimadas ou precedidas pela tipografia institucional de categorização em corpo menor e caixa-alta:

1. **REALIZAÇÃO:** Quando a UFMG, suas Pró-Reitorias, Unidades Acadêmicas ou Órgãos Especiais são os autores/promotores integrais do evento ou projeto.
2. **CO-ORGANIZAÇÃO:** Quando o evento é estruturado em igualdade técnica e administrativa com outra universidade, instituto ou entidade de classe.
3. **APOIO / APOIO INSTITUCIONAL:** Quando a UFMG cede chancela acadêmica, espaço físico ou respaldo científico sem co-financiamento primário.
4. **PATROCÍNIO:** Para peças onde a instituição aporta fomento ou bolsas (FUMP, Fundep, editais específicos).
5. **PARCERIA / COLIGADAS:** Para fundações de apoio (FUNDEP, FCO), polos de inovação tecnológica, hospitais universitários (HC-UFMG) e centros de extensão.

### 5.2 Regra de Equivalência Óptica e Hierarquia

* **Alinhamento da Barra de Chancelas:** Quando alinhada com outras marcas, a logo da UFMG deve manter **peso visual equivalente**. A altura da sigla "UFMG" deve ser nivelada visualmente à altura x das marcas parceiras.
* **Separador Vertical:** Nas assinaturas em linha, utiliza-se um filete vertical neutro em cinza (`K: 30%` ou `#D0D0D0`), com espessura de $0.5\text{ pt}$ a $1\text{ pt}$, separando o bloco da UFMG das instituições co-participantes.

---

## 6. Diretrizes de Uso Incorreto (Do's and Don'ts)

Para manter a dignidade e a padronização oficial da Universidade Federal de Minas Gerais:

1. **Proibição de Deformação Proporcional:** Nunca distorcer a marca horizontal ou verticalmente (bloquear a proporção 1:1 ao redimensionar).
2. **Imutabilidade da Tipografia:** Nunca redigitar a sigla "UFMG" com fontes correntes como Times New Roman, Arial ou Garamond. O desenho das curvas é proprietário e vetorizado.
3. **Cores Não Homologadas:** É expressamente proibido colorir o "M" em tons divergentes do Vermelho Oficial (como amarelo, verde, azul ou magenta puro).
4. **Desconexão do Traço Inferior:** Nunca remover o traço horizontal situado sob a letra "M".
5. **Efeitos Tridimensionais e Decorativos:** Proibido aplicar gradientes não oficiais, chanfros (*bevel*), relevos plásticos, contornos externos artificiais (*strokes*) ou sombras projetadas (*drop shadows*).
6. **Contraste Insuficiente:** Nunca aplicar a versão positiva com "M" vermelho sobre fundos vermelhos, laranjas, roxos ou escuros que comprometam a visibilidade da letra.
7. **Isolamento de Elementos:** Não desmembrar a letra "M" do conjunto "UFMG" para formar novas siglas ou logotipos de departamentos não autorizados pelo CEDECOM.

---

## 7. Instruções para Implementação Técnica (Front-End & IA)

### 7.1 Variáveis e Tokens CSS

```css
:root {
  /* Paleta Canônica da UFMG (CEDECOM) */
  --ufmg-color-red: #C4161C;
  --ufmg-color-red-rgb: 196, 22, 28;
  --ufmg-color-red-dark: #B81217;
  --ufmg-color-black: #000000;
  --ufmg-color-white: #FFFFFF;
  --ufmg-color-gray-technical: #595D61;
  --ufmg-color-gray-divider: #D0D0D0;

  /* Tipografia Institucional */
  --ufmg-font-serif: 'Bodoni MT', 'Didot', 'Times New Roman', serif;
  --ufmg-font-sans: 'Frutiger', 'Optima', 'Inter', -apple-system, sans-serif;
  
  /* Área de Respiro Padrão */
  --ufmg-clearspace-min: 24px;
}

```

### 7.2 Configuração de Tema Tailwind CSS (`tailwind.config.js`)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        ufmg: {
          red: {
            DEFAULT: '#C4161C',
            dark: '#B81217',
          },
          black: '#000000',
          white: '#FFFFFF',
          gray: {
            tech: '#595D61',
            light: '#F4F4F5',
            divider: '#D0D0D0',
          }
        }
      },
      fontFamily: {
        ufmgSerif: ['Didot', 'Bodoni MT', 'serif'],
        ufmgSans: ['Inter', 'Roboto', 'sans-serif'],
      }
    }
  }
}

```

### 7.3 Instrução de Prompt para Modelos de Visão e Imagem (AI System Prompt)

> *"When generating institutional, academic, scientific, or official administrative media for the Universidade Federal de Minas Gerais (UFMG), strictly adhere to the authentic CEDECOM brand identity: the acronym 'UFMG' features classical high-contrast serif Roman capital letters for 'U', 'F', and 'G' in stark black (#000000), contrasted by an iconic, dynamic, italic cursive script 'M' in signature institutional crimson red (#C4161C, CMYK 0/100/100/15) resting on a thick horizontal red baseline underline. Maintain a minimum clearspace of at least 0.5H around the logo and avoid drop shadows, 3D extrusions, or improper color variations."*
