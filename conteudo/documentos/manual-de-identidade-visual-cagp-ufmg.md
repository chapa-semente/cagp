# Manual de Identidade Visual & Diretrizes da Marca: CAGP UFMG

**Entidade:** Centro Acadêmico de Gestão Pública (CAGP)  
**Instituição:** Faculdade de Filosofia e Ciências Humanas (FAFICH) / Universidade Federal de Minas Gerais (UFMG)  
**Versão da Identidade:** 2.0 (Vetorização Geométrica Fiel)  
**Finalidade:** Documentação técnica, especificações de design gráfico, engenharia de layout e diretrizes canônicas para humanos, desenvolvedores e agentes de Inteligência Artificial.

---

## 0. Metadados para Agentes e Modelos de IA (Machine-Readable Block)

```yaml
brand:
  name: "Centro Acadêmico de Gestão Pública"
  acronym: "CAGP"
  unit: "FAFICH"
  university: "UFMG"
  category: "Representação Estudantil Universitária / Gestão Pública"
historical_foundation:
  artwork: "Os Candangos (Título original: Dois Guerreiros)"
  author: "Bruno Giorgi (1905–1993)"
  year: 1959
  location: "Praça dos Três Poderes, Brasília - DF, Brasil"
  symbolic_synthesis: "Trabalho coletivo, soberania popular, edificação do Estado republicano e governança democrática"
palette:
  primary_dark: "#0A0A0A"
  primary_light: "#FFFFFF"
  accent_red_light_bg: "#9E2424"
  accent_red_dark_bg: "#D32F2F"
  surface_dark: "#121214"
typography:
  display_geometry: "Grotesque Geometric Condensed Sans-serif"
  suggested_display_fonts: ["Oswald Bold", "DIN Condensed Bold", "League Gothic"]
  suggested_support_fonts: ["Oswald Regular", "Roboto Condensed Light", "Inter Regular"]
vector_specifications:
  grid_master: "1000x1000"
  baseline_y: 905.0
  divider_bar_y: 832.5
  divider_thickness: 5.0
  letter_m_apex: "Flat truncated horizontal plateau at y = 905.0 (stroke-width: 4.2px)"
  clearspace_unit_X: "49px (width of letter C)"
  clearspace_min: "1.5X (73.5px)"
  horizontal_lockup_gap: "85px (1.73X)"
asset_count: 12
```

---

## 1. Visão Geral e Semiótica da Marca

A marca do **CAGP** articula a tradição acadêmica crítica das Ciências Sociais da FAFICH com a práxis analítica e transformadora da Gestão Pública na Universidade Federal de Minas Gerais (UFMG).

```
                  |
             \    |    /
              \ O | O /      <- Os Candangos de Bruno Giorgi (1959)
            ----\---/----    <- Hastes / Prumo da Administração Pública
               |     |
               |     |       <- Pilares da Governança e do Estado
              /       \
             (         )     <- Bases / Raízes no Interesse Coletivo
```

### 1.1 O Símbolo: "Os Candangos" de Bruno Giorgi (1959)
O símbolo gráfico da marca é uma estilização vetorial de alto contraste da icônica escultura monumental em bronze **"Dois Guerreiros"** (popularmente consagrada como **"Os Candangos"**), esculpida pelo artista ítalo-brasileiro **Bruno Giorgi em 1959** e localizada na **Praça dos Três Poderes, em Brasília**.

#### Transposição Simbólica para a Gestão Pública:
* **Homenagem ao Trabalho e à Construção Coletiva:** Os *candangos* foram os trabalhadores vindos de todo o país para edificar a nova capital federal. Para a Gestão Pública, o monumento recorda que o Estado, as instituições e as políticas públicas não são abstrações burocráticas, mas construções concretas erguidas pela força do trabalho e pelo esforço da classe trabalhadora.
* **Dialética de Forças e Prumo Institucional:** As duas linhas verticais delgadas que tangenciam a escultura estilizam o prumo, as hastes de alinhamento da construção civil e as tensões constitutivas da esfera pública: a relação entre Estado e sociedade civil, planejamento técnico e controle social, legalidade e legitimidade democrática.
* **União Fraternal e Democracia:** As duas figuras unidas pela cintura e com hastes apontadas ao horizonte erguem-se simbolicamente de frente aos três poderes da República, representando a deliberação coletiva, a *accountability*, a defesa intransigente dos direitos sociais e a soberania popular na gestão das coisas públicas.

### 1.2 A Mancha Tipográfica
* **CAGP:** Monograma principal em caixa-alta, caracteres condensados de traço uniforme e cantos levemente arredondados, transmitindo solidez, precisão técnica e institucionalidade.
* **Linha de Acento:** Filete horizontal em vermelho rubro, atuando como linha do horizonte, ancoragem geométrica e elemento conector.
* **FAFICH UFMG:** Subtítulo de suporte com proporção balanceada e diferenciação cromática intencional: `FAFICH` em tom neutro e `UFMG` harmonizado na cor rubra do filete.

---

## 2. Sistema Cromático Oficial

A paleta de cores adota um contraste visual assertivo entre preto, branco e rubro, assegurando impacto estético e conformidade estrita com padrões internacionais de acessibilidade (WCAG 2.1).

| Nome da Cor | HEX | RGB | CMYK | Pantone (Aprox.) | Função e Regra de Aplicação |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Preto Profundo** | `#0A0A0A` | `$10, 10, 10$` | `$0, 0, 0, 100$` | Pantone Black 6 C | Aplicação primária em fundos claros: símbolo, sigla `CAGP` e palavra `FAFICH`. |
| **Rubro Institucional** | `#9E2424` | `$158, 36, 36$` | `$20, 95, 90, 10$` | Pantone 187 C | Cor de acento em fundos claros: filete horizontal divisor e sigla `UFMG`. |
| **Rubro Alto Contraste** | `#D32F2F` | `$211, 47, 47$` | `$0, 90, 85, 0$` | Pantone 485 C | Cor de acento exclusiva para **fundos escuros**: filete horizontal e sigla `UFMG`. Garante contraste WCAG AAA. |
| **Branco Puro** | `#FFFFFF` | `$255, 255, 255$` | `$0, 0, 0, 0$` | Pure White | Fundo de contraste positivo e inversão integral de elementos em superfícies escuras. |
| **Chumbo Dark Surface** | `#121214` | `$18, 18, 20$` | `$75, 68, 62, 78$` | Pantone 419 C | Superfície escura recomendada para Dark Mode, websites, cenografia e vestuário. |

### Índices de Contraste e Acessibilidade (WCAG 2.1)
* **Fundo `#FFFFFF` com `#0A0A0A`:** Contraste de **$19.8:1$** (Aprovado em Nível AAA).
* **Fundo `#FFFFFF` com `#9E2424`:** Contraste de **$6.2:1$** (Aprovado em Nível AA para texto corrente e AAA para display).
* **Fundo `#121214` com `#FFFFFF`:** Contraste de **$18.9:1$** (Aprovado em Nível AAA).
* **Fundo `#121214` com `#D32F2F`:** Contraste de **$4.9:1$** (Aprovado em Nível AA).

---

## 3. Tipografia Institucional e Engenharia Vetorial

### 3.1 Tipografia da Marca (Logotipo em Curvas Nativas)
Os elementos tipográficos oficiais foram desenhados como trajetos vetoriais contínuos (`<path>`), garantindo reprodução imutável em qualquer software, sistema operacional ou navegador, sem necessidade de arquivos `.ttf` ou `.otf` embutidos.

* **Detalhe Construtivo Crítico da Letra "M" (UFMG):**
  * O vértice central inferior da letra `M` da palavra `UFMG` é **chapado horizontalmente** (truncado reto em $y = 905.0$).
  * A coordenada do traço é `L 608.5 902.9 L 609.5 902.9`, que com a metade da espessura de traço ($2.1\text{ px}$) ancora perfeitamente na linha de base $y = 905.0$.
  * **Proibição Absoluta:** É vetado o uso de vértices pontiagudos ou triangulares na junção do `M` que ultrapassem a linha de base inferior estabelecida pelas letras adjacentes (`U`, `F` e `G`).

### 3.2 Tipografia de Suporte para Peças e Diagramação
Para documentos, apresentações, editais, relatórios e peças digitais:

| Nível Hierárquico | Família Tipográfica Recomendada | Peso / Estilo | Aplicação Principal |
| :--- | :--- | :--- | :--- |
| **Títulos e Chamadas** | Oswald / DIN Condensed / League Gothic | *Bold* ou *Medium* (Caixa-alta) | Cabeçalhos de campanhas, títulos de eventos, capas. |
| **Subtítulos e Destaques** | Oswald / Roboto Condensed | *Light* ou *Regular* | Subtítulos, chamadas secundárias, datas e locais. |
| **Corpo de Texto e Leitura** | Inter / Roboto / Source Sans 3 | *Regular* e *Medium* | Artigos, editais, comunicados, posts e web. |

---

## 4. Grid, Proporções e Áreas de Respiro

O sistema espacial e proporcional do CAGP estrutura-se sobre um plano cartesiano com base modular de $1000 \times 1000\text{ unidades}$.

```
        |<------------------ Largura CAGP (306 px) ------------------>|
  y=52  |                       | Fio Esquerdo (x=390.5)               |
        |                       |                                      |
  y=164 |                 /\__/\_  <- Candangos (Largura corpo: 398 px)|
        |                |  ||  |                                      |
  y=638 |                |__||__|                                      |
        |                                                              |
        |====================== RESPIRO (y=638 a 669) =================|
        |                                                              |
  y=669 |    CCCC        AAAA        GGGG        PPPP                  | (Altura: 135 px)
  y=804 |    CCCC        AAAA        GGGG        PPPP                  |
        |                                                              |
  y=832 |    -----------------[ Linha Rubra: 312 px ]------------------| (Espessura: 5 px)
        |                                                              |
  y=856 |    FAFICH (Preto)                  UFMG (Rubro)              | (Altura: 49 px)
  y=905 |______________________________________________________________| (Baseline Plana)
```

### 4.1 Unidade Modular de Respiro ($X$)
* A unidade modular de referência $X$ é definida matematicamente pela **largura da letra `C` do monograma principal**:
  $$X = 49\text{ px (em escala 1000}\times\text{1000)}$$
* **Área de Proteção Mínima (Clearspace):** Em torno de qualquer aplicação da marca, deve-se resguardar uma margem perimetral desobstruída de, no mínimo:
  $$\text{Margem Mínima} = 1.5X = 73.5\text{ px}$$
* Nenhum texto, botão, linha, foto cortada ou borda de página pode penetrar nesse raio de proteção.

### 4.2 Proporções do Lockup Horizontal
* **Equilíbrio Óptico 1:1:** O corpo da escultura de Bruno Giorgi (do topo das cabeças até as bases dos pés bulbosos, desconsiderando os fios) é escalado na proporção de **$1:1$ com a altura total da mancha do bloco tipográfico** ($219\text{ px}$ da escultura contra $217\text{ px}$ do conjunto de texto).
* **Distância Lateral de Respiro:** O espaçamento horizontal livre entre a extremidade direita da escultura (fio inclinado) e a borda esquerda do texto (`C` e linha divisória) é rigidamente fixado em:
  $$\text{Distância Horizontal} = 85\text{ px } (\approx 1.73X)$$
  Essa distância impede a colisão ótica entre o fio inclinado e o início da letra `C`.
* **Alinhamento do Centro de Gravidade:** O filete horizontal rubro alinha-se no mesmo plano horizontal da cintura anatômica dos Candangos ($y \approx 215\text{ px}$ na escala horizontal).

### 4.3 Dimensões Mínimas de Reprodução

| Aplicação | Versão Vertical | Versão Horizontal | Símbolo Isolado |
| :--- | :---: | :---: | :---: |
| **Impressão Gráfica (300 DPI)** | Largura: $25\text{ mm}$ | Altura: $15\text{ mm}$ | Altura: $8\text{ mm}$ |
| **Interfaces Digitais / Telas** | Largura: $80\text{ px}$ | Altura: $36\text{ px}$ | Dimensão: $16\times16\text{ px}$ (Favicon) |

---

## 5. Catálogo Oficial dos Arquivos Vetoriais (12 Variações + 1)

A suíte oficial de arquivos SVG é composta por 12 variações divididas em três disposições funcionais, mais uma 13ª variação monocromática (ver 5.1). Todos ficam em `logos/cagp/`; as demais subpastas de `logos/` guardam marcas de terceiros (ver `AGENTS.md`):

```
logos/cagp/
├── 01_vertical_fundo_claro.svg
├── 02_vertical_transparente_positivo.svg
├── 03_vertical_fundo_escuro.svg
├── 04_vertical_transparente_negativo.svg
├── 05_horizontal_fundo_claro.svg
├── 06_horizontal_transparente_positivo.svg
├── 07_horizontal_fundo_escuro.svg
├── 08_horizontal_transparente_negativo.svg
├── 09_simbolo_fundo_claro.svg
├── 10_simbolo_transparente_positivo.svg
├── 11_simbolo_fundo_escuro.svg
├── 12_simbolo_transparente_negativo.svg
└── 13_horizontal_cagp_essencial.svg   # variação adicional pós-v2.0
```

### 5.1 Matriz Técnica e Descrição Exata dos Documentos

| Arquivo SVG | Orientação | Fundo | Símbolo / Texto | Cor Acento (`UFMG`) | Aplicação Primária |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `01_vertical_fundo_claro.svg` | Vertical | `#FFFFFF` | `#0A0A0A` | `#9E2424` | Capas de documentos oficiais, ofícios timbrados e relatórios institucionais. |
| `02_vertical_transparente_positivo.svg` | Vertical | Transparente | `#0A0A0A` | `#9E2424` | Cartazes, posts de feed claro e sobreposições em papéis texturizados claros. |
| `03_vertical_fundo_escuro.svg` | Vertical | `#121214` | `#FFFFFF` | `#D32F2F` | Apresentações em Dark Mode, crachás pretos, totens e telas noturnas. |
| `04_vertical_transparente_negativo.svg` | Vertical | Transparente | `#FFFFFF` | `#D32F2F` | Sobreposição sobre fotografias escuras contrastadas ou fundos coloridos. |
| `05_horizontal_fundo_claro.svg` | Horizontal | `#FFFFFF` | `#0A0A0A` | `#9E2424` | Cabeçalhos largos de e-mail institucional, ofícios em paisagem e formulários. |
| `06_horizontal_transparente_positivo.svg`| Horizontal | Transparente | `#0A0A0A` | `#9E2424` | Barra de navegação (*navbar*) clara de websites e réguas de patrocinadores em fundo claro. |
| `07_horizontal_fundo_escuro.svg` | Horizontal | `#121214` | `#FFFFFF` | `#D32F2F` | Headers de websites escuros, slides panorâmicos em modo escuro. |
| `08_horizontal_transparente_negativo.svg`| Horizontal | Transparente | `#FFFFFF` | `#D32F2F` | *Navbars* escuras, réguas de apoiadores sobre fundo escuro e camisetas da gestão. |
| `09_simbolo_fundo_claro.svg` | Ícone | `#FFFFFF` | `#0A0A0A` | — | Foto de perfil de redes sociais (Instagram, WhatsApp, X, LinkedIn). |
| `10_simbolo_transparente_positivo.svg` | Ícone | Transparente | `#0A0A0A` | — | Selos monocromáticos, carimbos oficiais, botons e corte a laser. |
| `11_simbolo_fundo_escuro.svg` | Ícone | `#121214` | `#FFFFFF` | — | Favicons escuros, botões de aplicativo mobile e avatares escuros. |
| `12_simbolo_transparente_negativo.svg` | Ícone | Transparente | `#FFFFFF` | — | Marcas d'água em vídeos institucionais, apresentações e estampas de vestuário. |
| `13_horizontal_cagp_essencial.svg` | Horizontal | Transparente | `#0A0A0A` | — (monocromático) | Variação adicionada após a v2.0 (sem cor de acento). Regras de uso a definir; até lá, tratar como o `06` em fundo claro. |

---

## 6. Diretrizes de Uso Incorreto (Do's and Don'ts)

Para preservar a integridade geométrica e institucional da marca, é estritamente proibido:

1. **Distorção Dimensional:** É expressamente vedado esticar, achatar ou distorcer a escala vertical ou horizontal de forma assimétrica.
2. **Alteração da Geometria do "M":** Não substituir o traçado vetorial original por fontes de sistema que gerem pontas triangulares agudas descendo além da linha de base de `UFMG`.
3. **Cromias Desconectadas:** Não aplicar tons de vermelho que destoem dos padrões (`#9E2424` para fundos claros e `#D32F2F` para fundos escuros). A palavra `FAFICH` deve sempre acompanhar a cor principal do texto.
4. **Supressão dos Fios:** Não remover os fios verticais que acompanham a escultura de Bruno Giorgi, pois descaracterizam a representação original da obra.
5. **Aplicação de Efeitos Decorativos:** A marca é estritamente bidimensional e moderna. É proibido aplicar chanfros, gradientes, bisel, texturas ou sombras projetadas (*drop shadows*).
6. **Inversão de Baixo Contraste:** Nunca aplicar a versão positiva preta sobre superfícies escuras, nem a versão negativa branca sobre fundos brancos.

---

## 7. Instruções Técnicas para Desenvolvedores e Agentes de IA

### 7.1 Tokens CSS Custom Properties
```css
:root {
  --cagp-color-black: #0A0A0A;
  --cagp-color-white: #FFFFFF;
  --cagp-color-red-light: #9E2424;
  --cagp-color-red-dark: #D32F2F;
  --cagp-color-surface-dark: #121214;
  --cagp-font-display: 'Oswald', 'DIN Condensed', sans-serif;
  --cagp-font-body: 'Inter', -apple-system, sans-serif;
}
```

### 7.2 Configuração de Tema Tailwind CSS (`tailwind.config.js`)
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        cagp: {
          black: '#0A0A0A',
          white: '#FFFFFF',
          red: {
            DEFAULT: '#9E2424',
            bright: '#D32F2F',
          },
          dark: '#121214',
        }
      },
      fontFamily: {
        cagpTitle: ['Oswald', 'sans-serif'],
        cagpBody: ['Inter', 'sans-serif'],
      }
    }
  }
}
```

### 7.3 Instrução de Prompt para Modelos de Visão e Imagem (AI System Prompt)
> *"When generating promotional, academic, or institutional material for CAGP UFMG, ensure the visual identity strictly reproduces the stylized 'Os Candangos' sculpture (Bruno Giorgi, 1959, Praça dos Três Poderes, Brasília) rendered in flat 2D high-contrast vectors (black on white or white on dark surface #121214), anchored by a signature crimson red line (#9E2424 on light backgrounds or #D32F2F on dark backgrounds) and stark, humanist, modernist sans-serif typography. Keep the clearspace area of at least 1.5X unobstructed."*