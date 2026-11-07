# Manual de Identidade Visual & Diretrizes da Marca: portal minhaUFMG

**Plataforma:** Portal de Serviços e Sistemas Integrados da UFMG (minhaUFMG)

**Instituição:** Universidade Federal de Minas Gerais (UFMG)

**Órgão Técnico/Gestor:** Diretoria de Tecnologia da Informação (DTI) / Centro de Comunicação (CEDECOM)

**Finalidade:** Documentação técnica, engenharia gráfica, padronização cromática, acessibilidade digital e diretrizes canônicas para desenvolvedores de software, designers de interface (UI/UX) e modelos de Inteligência Artificial.

---

## 0. Metadados para Agentes e Modelos de IA (Machine-Readable Block)

```yaml
brand:
  name: "minhaUFMG"
  entity: "Portal de Sistemas e Serviços Integrados"
  institution: "Universidade Federal de Minas Gerais (UFMG)"
  managing_units: ["DTI - Diretoria de Tecnologia da Informação", "CEDECOM"]
  category: "Plataforma Digital Institucional / Governança Acadêmica e Administrativa"
morphology:
  lockup_primary: "Vertical Centralizado (Símbolo no topo + Wordmark inferior)"
  symbol_anatomy: "Árvore do Conhecimento estilizada com volutas espirais orgânicas"
  symbol_elements:
    stem: "Tronco sinuoso vertical único com ancoragem curva à esquerda na base"
    canopy: "Ramificação em 4 espirais/volutas contínuas (topo, laterais e núcleo)"
    lateral_shape: "Cúpula dextra com dupla curvatura sinuosa e olho espiralado interno"
  wordmark:
    prefix: "minha (Caixa-baixa, sem serifa condensada, peso Medium/Bold, Preto)"
    acronym: "UFMG (Caixa-alta, sem serifa condensada, peso Bold, Verde Institucional)"
palette:
  primary_green:
    cmyk: "85, 10, 100, 0"
    rgb: [13, 152, 71]
    hex: "#0D9847"
    pantone: "Pantone 355 C"
  primary_black:
    cmyk: "0, 0, 0, 100"
    rgb: [0, 0, 0]
    hex: "#000000"
    pantone: "Pantone Black C"
  pure_white:
    cmyk: "0, 0, 0, 0"
    rgb: [255, 255, 255]
    hex: "#FFFFFF"
  dark_surface:
    cmyk: "70, 60, 55, 75"
    rgb: [18, 20, 24]
    hex: "#121418"
typography:
  display_family: "Humanist Neo-Grotesque Condensed Sans-serif"
  suggested_fonts: ["DIN 1451 Mittelschrift Condensed", "Univers Condensed Bold", "Roboto Condensed", "Franklin Gothic Condensed"]
proportions:
  symbol_to_text_height_ratio: "3.4 : 1"
  gap_ratio: "0.28H (relativo à altura do texto)"
  clearspace_unit_X: "Largura da letra 'm' (minúsculo)"
  clearspace_min: "1.0X perimetral"

```

---

## 1. Visão Geral e Semiótica da Marca

O **minhaUFMG** é a principal porta de entrada digital para a vida acadêmica, científica e funcional da Universidade Federal de Minas Gerais. Sua identidade visual articula a **pessoalidade e o pertencimento** do usuário com a **solidez institucional** da universidade, rompendo a barreira da burocracia governamental por meio de uma linguagem gráfica orgânica e integradora.

```
                  ( @ )           <- Voluta Superior (Conhecimento / Expansão)
                /   |   \
             ( @ )  |  ( @ )      <- Copa em Espirais (Desenvolvimento / Broto)
               \    |   /
                 \  |  /
                    |             <- Tronco Central (Sustentação Tecnológica)
                   /              <- Raiz Sinuosa (Origem e Pertencimento)

               minhaUFMG          <- Contraste: Afeto ("minha") + Força ("UFMG")

```

### 1.1 O Símbolo: A Árvore das Volutas do Conhecimento

O ícone do portal é composto pela figura estilizada de uma árvore/broto germinativo desenhado inteiramente por linhas sinuosas e espirais contínuas (*arabescos*):

* **A Árvore do Conhecimento e da Vida:** O símbolo remete diretamente à árvore em crescimento, metáfora do desenvolvimento intelectual, da pesquisa contínua e da colheita de saberes que a universidade proporciona ao longo da trajetória de alunos, docentes e servidores.
* **As Espirais e Volutas (Diálogo com as Artes de Minas Gerais):** As curvas em espiral que formam a copa resgatam formalmente as volutas barrocas mineiras de Aleijadinho e Mestre Ataíde, reinterpretadas em um traçado vetorial limpo, contínuo e moderno. A espiral simboliza também a evolução não linear do aprendizado (*a espiral do conhecimento*).
* **Estrutura de Rede e Conectividade:** O desenho unificado do tronco que se desdobra em nós espirais reflete os sistemas digitais, as redes de informação da DTI/Cecom e a integração de múltiplos serviços em um ponto focal único de acesso.

### 1.2 A Composição Tipográfica: "minha" + "UFMG"

A marca nominativa estabelece um contraste visual e psicológico deliberado:

* **"minha" (Caixa-baixa, Preto):** O pronome possessivo em letras minúsculas transmite proximidade, acessibilidade, personalização e acolhimento. Representa o espaço privativo do estudante ou servidor dentro da imensidão da universidade.
* **"UFMG" (Caixa-alta, Verde):** A sigla universitária em maiúsculas impõe autoridade, tradição, segurança da informação e validação pública federal.
* **Fusão Sem Espaço:** A junção direta `minha` + `UFMG` forma uma palavra-valise única, expressando que a universidade é construída a partir da experiência individual de cada membro de sua comunidade.

---

## 2. Sistema Cromático Oficial

Diferente da marca institucional-mãe da UFMG (que emprega o Vermelho Rubro e o Preto), o portal **minhaUFMG** adota historicamente o **Verde Esmeralda Institucional**, cor associada à vitalidade, crescimento, renovação e ambientes digitais de suporte e interação.

| Nome da Cor | CMYK | RGB (sRGB) | HEX | Pantone (Aprox.) | Aplicação Principal |
| --- | --- | --- | --- | --- | --- |
| **Verde minhaUFMG** | `85, 10, 100, 0` | `13, 152, 71` | `#0D9847` | Pantone 355 C / 347 C | Símbolo integral da Árvore de Volutas e sigla em caixa-alta `UFMG`. |
| **Preto Profundo** | `0, 0, 0, 100` | `0, 0, 0` | `#000000` | Pantone Black C | Termo em caixa-baixa `minha` em aplicações sobre fundo claro. |
| **Branco Puro** | `0, 0, 0, 0` | `255, 255, 255` | `#FFFFFF` | Branco Opaco | Fundo padrão de tela/documentos e versão invertida (negativa total). |
| **Verde Alto Contraste (Dark)** | `80, 0, 95, 0` | `22, 192, 92` | `#16C05C` | Pantone 802 C | Versão do verde ajustada exclusivamente para fundos escuros (Dark Mode). |
| **Superfície Dark Mode** | `70, 60, 55, 75` | `18, 20, 24` | `#121418` | Pantone 426 C | Fundo padrão escuro para interfaces, autenticações SSO e telas noturnas. |

### Índices de Contraste e Acessibilidade Digital (WCAG 2.1)

* **Preto (`#000000`) sobre Branco (`#FFFFFF`):** Contraste de **$21:1$** (Conformidade Nível AAA).
* **Verde minhaUFMG (`#0D9847`) sobre Branco (`#FFFFFF`):** Contraste de **$4.6:1$** (Aprovado em Nível AA para elementos de display, botões e logotipos).
* **Branco (`#FFFFFF`) sobre Verde minhaUFMG (`#0D9847`):** Contraste de **$4.6:1$** (Conformidade Nível AA).
* **Verde Alto Contraste (`#16C05C`) sobre Dark (`#121418`):** Contraste de **$9.3:1$** (Conformidade Nível AAA em modo noturno).

---

## 3. Tipografia Institucional e Anatomia Vetorial

### 3.1 Tipografia do Logotipo

A tipografia do wordmark não utiliza as serifas clássicas romanas da marca-mãe da reitoria; adota uma **família sem serifa neo-grotesca condensada**, otimizada para interfaces de computadores e telas móveis:

* **Características Morfológicas:**
* Proporção condensada vertical com hastes espessas e ritmo uniforme.
* O glifo `i` possui ponto quadrado/retangular alinhado com o corte reto da haste.
* O glifo `a` é de dois andares (*double-storey*), típico das fontes de alta legibilidade informacional.
* O conjunto `UFMG` possui vértices limpos, sem serifa, com a barra transversal do `F` ligeiramente recuada e o `G` com espora vertical sem barra interna invasiva.


* **Fontes Equivalentes para Composição de Identidades Satélites:**
* *DIN 1451 Mittelschrift Condensed*
* *Univers 57 Condensed*
* *Roboto Condensed (Google Fonts - Open Source)*
* *Franklin Gothic Condensed*



### 3.2 Tipografia de Interface do Portal (UI/UX)

Para garantir coesão no ecossistema de telas e sistemas autenticados:

| Nível na Interface | Família Tipográfica | Peso / Estilo | Aplicação |
| --- | --- | --- | --- |
| **Títulos de Módulos e Portlets** | Roboto / Inter | *Bold* (Caixa-alta/baixa) | Cabeçalhos de serviços (Siga, SEI, E-mail). |
| **Labels e Navegação de Menu** | Roboto Condensed / Inter | *Semi-Bold* ou *Medium* | Barras laterais de navegação e abas do usuário. |
| **Textos Correntes e Notificações** | Open Sans / Inter / System UI | *Regular* e *Light* | Avisos institucionais, formulários de NIP e FAQs. |
| **Dados e Protocolos Numéricos** | JetBrains Mono / Roboto Mono | *Regular* | Matrícula, senhas de autenticação, CPF e chaves CAFe. |

---

## 4. Grid, Proporções e Áreas de Respiro

O logotipo padrão do **minhaUFMG** estrutura-se em um esquema de empilhamento vertical (*vertical stack*), balanceando o peso orgânico da copa da árvore com o bloco tipográfico térreo.

```
         |<--------- Largura Copa: 62% --------->|
   y=0   +---------------------------------------+
         |                 ( @ )                 |
         |                /  |  \                |
         |             ( @ ) | ( @ )             |  (Altura Símbolo: ~77% do total)
         |               \   |  /                |
         |                   |                   |
         |                  /                    |
   y=77% +---------------------------------------+
   y=80% +================ RESPIRO =============+  (Distância de respiro: ~3% a 5%)
   y=83% |       minha           UFMG            |  (Altura Tipografia: ~17% do total)
   y=100%+---------------------------------------+
         |<-- 55% Largura -->|<-- 45% Largura -->|

```

### 4.1 Relações Proporcionais Fundamentais

* **Altura Relativa Símbolo vs. Texto:** A altura total do símbolo (do cume da espiral mais alta até a ponta curvada do tronco) corresponde a aproximadamente **$3.4$ vezes a altura do corpo das letras maiúsculas de "UFMG"**.
* **Centralização do Tronco:** O tronco vertical do símbolo não se alinha ao centro geométrico total da palavra `minhaUFMG`, mas sim **ao ponto de articulação ótica entre o final da letra "a" e o início da letra "U"**, funcionando como uma haste de transição entre o pessoal e o institucional.

### 4.2 Unidade Modular de Respiro ($X$)

* A unidade modular de referência $X$ é definida pela **largura da letra minúscula "m"**:

$$\text{Área de Proteção Mínima} = 1.0X \text{ em todos os lados}$$


* Nenhuma caixa de texto, fotografia, divisor de tela, botão ou elemento gráfico concorrente pode penetrar no raio perimetral de proteção de $1.0X$.

### 4.3 Dimensões Mínimas de Reprodução

| Meio de Reprodução | Configuração Vertical | Configuração Horizontal | Ícone / Símbolo Isolado |
| --- | --- | --- | --- |
| **Mídias Digitais / Telas** | Largura: $90\text{ px}$ | Altura: $32\text{ px}$ | $16\times16\text{ px}$ (Favicon / App Icon) |
| **Material Gráfico Impresso** | Altura: $28\text{ mm}$ | Altura: $12\text{ mm}$ | Altura: $10\text{ mm}$ |

---

## 5. Matriz de Variações de Assinatura da Marca

```
+-----------------------------------------------------------------------------------+
|                        MATRIZ DE VARIAÇÕES (minhaUFMG)                           |
+-----------------------------------------+-----------------------------------------+
| 1. VERTICAL POLICROMÁTICA (PREFERENCIAL) | 2. HORIZONTAL DE SISTEMA (NAVBAR)       |
| Símbolo: Verde (#0D9847) no topo        | Símbolo à esquerda + Wordmark à direita |
| 'minha': Preto (#000000)                | Proporção linear para cabeçalhos web    |
| 'UFMG': Verde (#0D9847)                 | Uso prioritário em telas de autenticação|
+-----------------------------------------+-----------------------------------------+
| 3. NEGATIVA TOTAL (FUNDO ESCURO)        | 4. MONOCROMÁTICA PRETA (1 COR)          |
| Símbolo: Branco Puro (#FFFFFF)          | Símbolo: Preto 100% K                   |
| 'minha': Branco Puro (#FFFFFF)          | 'minha': Preto 100% K                   |
| 'UFMG': Verde Claro (#16C05C) ou Branco | 'UFMG': Preto 100% K                    |
+-----------------------------------------+-----------------------------------------+

```

### 5.1 Catálogo Descritivo das Variações Homologadas

1. **Vertical Policromática (Padrão):** Aplicação obrigatória em telas de *login* (Single Sign-On - Shibboleth/CAFe), cartilhas do usuário, folhetos de acolhimento de calouros e manuais de sistemas.
2. **Horizontal (Navbar / Barra Superior):** Configurada para menus de navegação de sistemas internos (como SEI-UFMG, Siga Acadêmico, Diário de Classe Digital), onde a altura vertical é restrita a $40\text{--}60\text{ px}$.
3. **Ícone Isolado (App / Favicon / Avatar):** A Árvore de Volutas verde pode ser aplicada isoladamente em ícones de aplicativos institucionais móveis, favicons de navegadores e fotos de perfil de suporte tecnológico.
4. **Negativa Monocromática:** Todos os traços preenchidos em Branco Puro (`#FFFFFF`), obrigatória sobre fundos pretos ou sobre o próprio Verde Institucional.

---

## 6. Diretrizes de Uso Incorreto (Do's and Don'ts)

Para preservar a integridade e o reconhecimento do portal oficial:

1. **Proibição de Deformação Assimétrica:** É terminantemente proibido esticar, comprimir ou aplicar escalas distorcidas na relação largura/altura do conjunto.
2. **Alteração das Cores da Marca:** Não trocar o verde institucional por azul, vermelho, amarelo ou tons fluorescentes. O termo `minha` não deve ser pintado de verde na versão preferencial.
3. **Supressão de Volutas:** Nunca simplificar ou remover partes das espirais internas da copa da árvore.
4. **Deslocamento Tipográfico:** Nunca alterar a posição do texto `minhaUFMG` em relação ao símbolo, nem separar os termos em linhas distintas sem aprovação do CEDECOM/DTI.
5. **Efeitos Gráficos Obsoletos:** Não aplicar relevos 3D, chanfros, gradientes em arco-íris, texturas ou sombras projetadas espessas (*drop shadows*).
6. **Inversão de Baixo Contraste:** Não aplicar a marca com o termo `minha` em preto sobre fundos pretos, cinzas escuros ou fotografias com baixa taxa de luminosidade.

---

## 7. Instruções Técnicas para Desenvolvedores e Agentes de IA

### 7.1 Tokens CSS Custom Properties (`theme-minhaufmg.css`)

```css
:root {
  /* Cores Canônicas minhaUFMG */
  --minhaufmg-green: #0D9847;
  --minhaufmg-green-rgb: 13, 152, 71;
  --minhaufmg-green-bright: #16C05C;
  --minhaufmg-black: #000000;
  --minhaufmg-white: #FFFFFF;
  --minhaufmg-dark-surface: #121418;
  --minhaufmg-gray-border: #E4E4E7;

  /* Tipografia */
  --minhaufmg-font-display: 'Roboto Condensed', 'DIN Alternate', -apple-system, sans-serif;
  --minhaufmg-font-interface: 'Inter', 'Roboto', system-ui, sans-serif;

  /* Respiro e Alinhamento */
  --minhaufmg-clearspace: 1.5rem;
}

```

### 7.2 Configuração de Tema Tailwind CSS (`tailwind.config.js`)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        minhaufmg: {
          green: {
            DEFAULT: '#0D9847',
            light: '#16C05C',
            dark: '#0A7336',
          },
          black: '#000000',
          dark: '#121418',
        }
      },
      fontFamily: {
        minhaDisplay: ['"Roboto Condensed"', 'sans-serif'],
        minhaUI: ['Inter', 'Roboto', 'sans-serif'],
      }
    }
  }
}

```

### 7.3 Instrução de Prompt para Modelos de Visão e Imagem (AI System Prompt)

> *"When generating digital interface mockups, login screens, or academic communications for 'minhaUFMG' (Universidade Federal de Minas Gerais), strictly reproduce its unique visual identity: a vertical lockup featuring an organic stylized tree of knowledge with elegant baroque spiral volutes at the top in emerald institutional green (#0D9847, Pantone 355 C), sitting above the wordmark 'minhaUFMG' where 'minha' is in lowercase solid black (#000000) and 'UFMG' is in uppercase bold green (#0D9847). Render it in clean, flat, high-contrast vector lines on a pure white (#FFFFFF) or deep dark surface (#121418) without 3D bevels, filters, or distortions."*
