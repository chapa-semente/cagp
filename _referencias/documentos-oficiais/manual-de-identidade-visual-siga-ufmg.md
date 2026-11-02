# Manual de Identidade Visual & Diretrizes da Marca: SIGA UFMG

**Plataforma:** Sistema Integrado de Gestão Acadêmica (SIGA)

**Instituição:** Universidade Federal de Minas Gerais (UFMG)

**Órgãos Gestores:** Diretoria de Tecnologia da Informação (DTI) / Centro de Computação (Cecom) / Departamento de Registro e Controle Acadêmico (DRCA)

**Documentos de Referência:** `siga-ufmg-fundo-branco.webp` (Assinatura Plana) e `siga-ufmg-fundo-azul.webp` (Ícone de Aplicativo / Mobile Badge)

**Finalidade:** Especificação técnica de design, normatização gráfica, engenharia de layout vetorial, acessibilidade cromática e parametrização canônica para desenvolvedores de software, designers de interface (UI/UX) e modelos de Inteligência Artificial.

---

## 0. Metadados para Agentes e Modelos de IA (Machine-Readable Block)

```yaml
brand:
  name: "Sistema Integrado de Gestão Acadêmica"
  acronym: "SIGA"
  full_brand_name: "SIGA UFMG"
  institution: "Universidade Federal de Minas Gerais (UFMG)"
  managing_units:
    - "DTI - Diretoria de Tecnologia da Informação"
    - "Cecom - Centro de Computação"
    - "DRCA - Departamento de Registro e Controle Acadêmico"
  category: "Sistema de Informação Acadêmica / Governança Universitária / Mobile App"
morphology:
  type: "Logotipo Caligráfico Contínuo / Ligadura Conceitual com Símbolo Integrado"
  flow_characteristic: "Traçado vetorial monofilar unificado de fluxo contínuo (fita vetorial única)"
  key_components:
    letter_s: "S curvilíneo em caixa-baixa cujo terminal superior se estende e fusiona-se diretamente na haste do 'i'"
    letter_i: "Ponto circular flutuante desmembrado + haste vertical que mergulha abaixo da linha de base em laço em U profundo"
    letter_g: "Laço ascendente originado do 'i' que contorna o bojo superior e conecta-se organicamente ao 'a'"
    letter_a: "Bojo circular de terminação inferior horizontal prolongada"
    arrow_terminal: "Ponta de seta triangular orientada a 0° (dextra) que finaliza o traçado do 'a'"
    hidden_u_loop: "Curvatura inferior em vale ('U') sob as letras 'i' e 'g', ecoando a inicial da UFMG"
palette:
  primary_siga_blue:
    cmyk: "100, 85, 10, 45"
    rgb: [0, 39, 118]
    hex: "#002776"
    pantone: "Pantone 280 C"
  pure_white:
    cmyk: "0, 0, 0, 0"
    rgb: [255, 255, 255]
    hex: "#FFFFFF"
    pantone: "Pure White"
  dark_surface:
    cmyk: "80, 70, 50, 80"
    rgb: [11, 17, 30]
    hex: "#0B111E"
  accent_blue_dark:
    cmyk: "85, 55, 0, 0"
    rgb: [33, 112, 228]
    hex: "#2170E4"
proportions:
  aspect_ratio_wordmark: "1.72 : 1 (Largura: 200px | Altura: 116px no master de 240px)"
  app_icon_corner_radius: "22% (Squircle contínuo / Superelipse iOS & Material Design)"
  clearspace_unit_X: "Diâmetro do ponto circular do 'i'"
  clearspace_min: "1.5X perimetral"

```

---

## 1. Visão Geral e Semiótica da Marca

O **SIGA** é a espinha dorsal de processamento, gestão e controle acadêmico da UFMG, centralizando a vida do discente desde o registro da matrícula e escolha de disciplinas até a colação de grau e emissão do diploma.

A identidade visual sintetiza essa missão por meio de um **traçado contínuo e direcional**:

```
                       ( O )            <- Ponto do "i": O Indivíduo / Ponto de Início
                                           
        /-----------\    |    /------\    /------\
       |      s      \---|---|   g    \--/   a    \---------->  <- Seta: Futuro e Formatura
        \_______/        |    \______/   \_______/
                         \____________/
                                ^
                                |
                     Arco em U: O Solo e a Instituição (UFMG)

```

### 1.1 A Metáfora do Fluxo Contínuo (*Continuous Academic Path*)

Diferente de identidades tradicionais compostas por fontes de catálogo separadas por espaçamento (*kerning*), a palavra **"siga"** é desenhada como **uma única linha condutora ininterrupta**:

1. **A Jornada Integrada:** As quatro letras minúsculas (`s`, `i`, `g`, `a`) formam uma só fita vetorial contínua. Essa topologia representa o percurso acadêmico do estudante, no qual cada fase é desdobramento direto e inseparável da anterior.
2. **O Imperativo "Siga":** Do ponto de vista verbal, o vocábulo é o imperativo afirmativo do verbo *seguir* ("vá em frente", "continue o caminho", "oriente-se"). A marca atua como um sinalizador pedagógico e operacional dentro do ecossistema universitário.
3. **A Seta de Conclusão e Futuro:** O traçado final da perna inferior da letra `a` não se encerra em corte comum, mas se transforma em uma **seta horizontal apontada para a direita**. Ela representa o avanço acadêmico, a conclusão das etapas, a integralização curricular e o egresso profissional capacitado para a sociedade.
4. **O Laço Oculto em "U" (*The Under-Loop*):** Ao descer da haste do `i` até abaixo da linha de base e subir para desenhar a curva do `g`, a linha desenha um vale côncavo em formato de **"U"**. Trata-se de uma citação subliminar à inicial da **UFMG**, simbolizando que toda a trajetória acadêmica é acolhida, sustentada e balizada pela Universidade.
5. **O Ponto do "i" (O Aluno / O Foco Humano):** O ponto da letra `i` é o único elemento fisicamente desprendido de todo o logotipo. Posiciona-se perfeitamente circular sobre o início do mergulho da haste, representando o indivíduo (estudante, professor ou pesquisador) como foco central de todos os processos do sistema.

---

## 2. Sistema Cromático Oficial

A identidade do SIGA apoia-se em uma paleta minimalista de alto contraste baseada no **Azul Profundo Tecnológico** e no **Branco Puro**, conferindo clareza operacional, solidez sistêmica e fácil visualização em telas de computadores e smartphones:

| Nome da Cor | CMYK | RGB (sRGB) | HEX | Pantone Equivalente | Função e Aplicação |
| --- | --- | --- | --- | --- | --- |
| **Azul SIGA (Royal Escuro)** | `100, 85, 10, 45` | `0, 39, 118` | `#002776` | Pantone 280 C | Cor primária oficial: preenchimento do logotipo em superfícies claras e fundo do ícone mobile. |
| **Branco Puro** | `0, 0, 0, 0` | `255, 255, 255` | `#FFFFFF` | Pure White | Aplicação do logotipo no ícone mobile, versão negativa e fundo da aplicação preferencial. |
| **Azul Display (Dark Mode)** | `85, 55, 0, 0` | `33, 112, 228` | `#2170E4` | Pantone 2728 C | Cor de realce alternativa para tipografia em ambientes de interface escura (Dark UI). |
| **Superfície Dark Mode** | `80, 70, 50, 80` | `11, 17, 30` | `#0B111E` | Pantone 532 C | Superfície escura de fundo para interfaces noturnas de sistema. |
| **Preto Puro (Monocromia)** | `0, 0, 0, 100` | `0, 0, 0` | `#000000` | Pantone Black C | Impressão P&B a uma cor, carimbos funcionais e extratos xerográficos. |

### Índices de Acessibilidade e Contraste (WCAG 2.1)

* **Azul SIGA (`#002776`) sobre Fundo Branco (`#FFFFFF`):** Contraste de **$13.1:1$** (Aprovado em Nível AAA para qualquer tamanho de texto ou elemento gráfico).
* **Branco (`#FFFFFF`) sobre Fundo Azul SIGA (`#002776`):** Contraste de **$13.1:1$** (Conformidade Nível AAA no ícone mobile e cabeçalhos).
* **Azul Display (`#2170E4`) sobre Superfície Dark (`#0B111E`):** Contraste de **$5.4:1$** (Aprovado em Nível AA para botões e links em modo noturno).

---

## 3. Morfologia e Engenharia do Traçado Vetorial

A marca do SIGA foi construída sobre princípios caligráficos fluidos aliados à precisão da geometria vetorial:

```
    Y=62   -------- [ Ponto do 'i' (Círculo: diâmetro 16px) ] --------
    Y=83   +-- (Início do S) ----------------------------------------+
           |                                                         |
           |      sssss         iiii      ggggg        aaaaa         | (Linha Média / X-Height)
           |     s     s         ||      g     g      a     a        |
    Y=146  |      ssssss         ||       gggggg       aaaaaa----->  | (Linha de Base Principal)
           |                     ||            |             (Seta)  |
           |                      \___________/                      | (Descendente em U)
    Y=177  +---------------------------------------------------------+
           |<- X=20 ---------------------------------------- X=219 ->|

```

### 3.1 Anatomia Métrica dos Componentes (Gabarito 240 × 240)

* **Ponto do "i":**
* Círculo geométrico puro com largura de $15\text{ px}$ e altura de $16\text{ px}$.
* Centroide posicionado em $x = 73.7\text{ px}, y = 69.6\text{ px}$.


* **Corpo Unificado (`s-i-g-a` + Seta):**
* Largura total: $200\text{ px}$ (de $x = 20$ até $x = 219$).
* Altura total: $95\text{ px}$ (de $y = 83$ até $y = 177$).
* A espessura do traço condutor mantém-se calibrada em torno de **$11\text{ a }13\text{ px}$**, reduzindo-se suavemente nas junções internas para evitar manchas de tinta e ganho de ponto ótico (*ink traps*).


* **Abertura da Seta:**
* Altura total da ponta da seta: $23\text{ px}$ (de $y = 134$ a $y = 152$).
* Ângulo de vértice da ponta: triângulo isósceles reto de base vertical, centrado horizontalmente na linha de saída do `a`.



### 3.2 O Ícone de Aplicativo (Squircle Mobile Badge)

Na aplicação como ícone para Android, iOS e web app:

* O logotipo é aplicado em **Branco Puro** sobre um quadrilátero de cantos arredondados (*squircle* de raio $r \approx 22\%$) preenchido em **Azul SIGA (`#002776`)**.
* O conjunto "siga" é centralizado ótica e volumetricamente, respeitando a margem interna de segurança de modo que a ponta da seta e o topo do ponto do "i" mantenham distâncias proporcionais às bordas curvas.

---

## 4. Grid, Proporções e Áreas de Respiro

Para garantir legibilidade imediata e preservar a força do símbolo, define-se um sistema modular cartesiano de proporções:

```
        |<---------------- Largura Total (200 px) --------------->|
        +---------------------------------------------------------+
        |                 [  1.5X  ]                              |
        |             ( O )                                       |
        |   +-------------------------------------------------+   |
        |   |                                                 |   |
  1.5X  |   |    s      i      g      a ----->                |   | 1.5X
        |   |           \______/                              |   |
        |   +-------------------------------------------------+   |
        |                 [  1.5X  ]                              |
        +---------------------------------------------------------+

```

### 4.1 Unidade Modular de Respiro ($X$)

* A unidade modular de referência $X$ é estabelecida pelo **diâmetro do ponto circular da letra "i"**:

$$X = \text{Diâmetro do Ponto do 'i'} \approx 16\text{ px (em escala 240}\times\text{240)}$$


* **Margem de Proteção Perimetral Mínima (Clearspace):**

$$\text{Área de Respiro} = 1.5X \approx 24\text{ px}$$


* Nenhum texto auxiliar (como nome de faculdade, botões de ação, bordas de cards ou ícones de status) pode invadir essa área delimitada ao redor da marca.

### 4.2 Dimensões Mínimas de Reprodução

| Meio de Exibição | Logotipo Plano (Fundo Branco) | Ícone de Aplicativo / Badge |
| --- | --- | --- |
| **Interfaces Web e Telas (72/96 dpi)** | Largura: $80\text{ px}$ | $24\times24\text{ px}$ (Favicon: simplificado) / $48\times48\text{ px}$ |
| **Telas Mobile de Alta Resolução** | Largura: $120\text{ px}$ | $64\times64\text{ px}$ a $192\times192\text{ px}$ (Launcher Icon) |
| **Impressão Offset / Laser (300 dpi)** | Largura: $20\text{ mm}$ | Dimensão: $12\times12\text{ mm}$ |

---

## 5. Matriz de Variações e Aplicações da Marca

A marca do SIGA UFMG opera em quatro variações homologadas fundamentais:

```
+-----------------------------------------------------------------------------------+
|                         MATRIZ DE VARIAÇÕES (SIGA UFMG)                           |
+-----------------------------------------+-----------------------------------------+
| 1. POSITIVA INSTITUCIONAL (PREFERENCIAL)| 2. ÍCONE DE APLICATIVO / SQUIRCLE       |
| Traçado: Azul SIGA (#002776)            | Fundo: Caixa arredondada Azul (#002776) |
| Fundo: Branco Puro (#FFFFFF) ou claro   | Traçado: Branco Puro (#FFFFFF)          |
| Uso: Extratos, telas web, documentos    | Uso: App Store, Google Play, Launcher   |
+-----------------------------------------+-----------------------------------------+
| 3. NEGATIVA / VAZADA                    | 4. MONOCROMÁTICA TÉCNICA (1 COR PRETA)  |
| Traçado: Branco Puro (#FFFFFF)          | Traçado: Preto 100% K (#000000)         |
| Fundo: Azul SIGA, Azul escuro ou fotos  | Fundo: Branco / Impressão xerográfica   |
| Uso: Barras de navegação escuras        | Uso: Comprovantes térmicos, carimbos    |
+-----------------------------------------+-----------------------------------------+

```

### 5.1 Regras de Aplicação por Contexto

1. **Sistemas Web Desktop:** No portal minhaUFMG e nas páginas de login do SIGA, utiliza-se preferencialmente a versão positiva sobre fundo branco ou a versão negativa branca integrada em cabeçalhos institucionais azuis.
2. **Aplicativos Mobile (Android / iOS):** A versão squircle com fundo azul é de uso obrigatório no ícone do lançador (*app launcher*), na tela de abertura (*splash screen*) e na loja de aplicativos.
3. **Documentos Oficiais Emitidos (PDFs e Comprovantes):** Em histórico escolar, espelho de matrícula e atestados de frequência, o logotipo deve figurar no topo superior esquerdo em versão positiva azul ou em preto absoluto quando a impressão for exclusivamente monocromática.

---

## 6. Diretrizes de Uso Incorreto (Do's and Don'ts)

Para preservar a legibilidade e a autenticidade da ferramenta oficial:

1. **Proibição de Deformação Proporcional:** Nunca esticar ou comprimir o logotipo horizontal ou verticalmente. O redimensionamento deve manter a proporção escalar de $1:1$.
2. **Desconexão do Traçado:** Jamais separar as letras `s`, `i`, `g` e `a` em glifos avulsos. A continuidade da linha é a identidade essencial do sistema.
3. **Remoção da Seta:** É expressamente proibido eliminar a ponta da seta terminal da letra `a` ou substituí-la por uma terminação redonda comum.
4. **Alteração de Cores Primárias:** Não colorir o logotipo com o vermelho da UFMG, nem com tons de verde, ciano ou amarelo. A cor oficial do SIGA é estritamente o **Azul SIGA (`#002776`)**.
5. **Efeitos Tridimensionais e Ornamentos:** Não aplicar sombras projetadas (*drop shadows*), efeitos de bisel/chanfro, contornos (*strokes*) adicionais ou texturas volumétricas.
6. **Alinhamento do Ponto:** Nunca deslocar o ponto da letra `i` para outra posição que não seja o seu eixo vertical original.
7. **Aplicação com Baixo Contraste:** Não aplicar o logotipo azul sobre superfícies pretas, azuis escuras ou fundos estampados que prejudiquem a visibilidade do laço inferior.

---

## 7. Instruções Técnicas para Desenvolvedores e Agentes de IA

### 7.1 Tokens CSS Custom Properties (`theme-siga.css`)

```css
:root {
  /* Cores Canônicas SIGA UFMG */
  --siga-color-primary: #002776;
  --siga-color-primary-rgb: 0, 39, 118;
  --siga-color-white: #FFFFFF;
  --siga-color-dark-surface: #0B111E;
  --siga-color-accent-dark: #2170E4;
  --siga-color-divider: #E2E8F0;

  /* Geometria e Grid */
  --siga-icon-radius: 22%;
  --siga-clearspace: 1.5rem;

  /* Tipografia de Apoio da Interface */
  --siga-font-interface: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
  --siga-font-data: 'JetBrains Mono', 'Roboto Mono', monospace;
}

```

### 7.2 Configuração de Tema Tailwind CSS (`tailwind.config.js`)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        siga: {
          blue: {
            DEFAULT: '#002776',
            dark: '#001A52',
            light: '#2170E4',
          },
          surface: '#0B111E',
        }
      },
      borderRadius: {
        'siga-squircle': '22%',
      },
      fontFamily: {
        sigaUI: ['Inter', 'Roboto', 'sans-serif'],
        sigaMono: ['"JetBrains Mono"', 'monospace'],
      }
    }
  }
}

```

### 7.3 Instrução de Prompt para Modelos de Visão e Imagem (AI System Prompt)

> *"When generating UI mockups, icons, or documentation for 'SIGA UFMG' (Sistema Integrado de Gestão Acadêmica da UFMG), faithfully reproduce its signature logo: the word 'siga' rendered in a single, continuous, fluid lowercase ribbon path in deep academic royal blue (#002776, Pantone 280 C), featuring a free-floating circular dot above the 'i', a pronounced U-shaped bowl dipping below the baseline connecting 'i' to 'g', and a right-pointing directional arrow seamlessly terminating the bottom stroke of the letter 'a'. For mobile icons, place this logo in solid white (#FFFFFF) centered inside a deep blue (#002776) rounded squircle (corner radius 22%) without 3D bevels, gradients, or drop shadows."*
