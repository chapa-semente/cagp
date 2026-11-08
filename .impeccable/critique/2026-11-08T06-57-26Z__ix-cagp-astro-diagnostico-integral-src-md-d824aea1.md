---
target: _referencias/design-system/matrix/cagp-astro/DIAGNOSTICO-INTEGRAL-SRC.md
total_score: 23
max_score: 40
na_heuristics: 
p0_count: 4
p1_count: 4
target_identity: "file:/home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/cagp-astro/DIAGNOSTICO-INTEGRAL-SRC.md"
target_fingerprint: "sha256:7a920c37701d7da9554959e6e40c6dc3f9998da57f15e9511ce02e043a551d77"
target_path: /home/gsathler/Nextcloud/Projects/cagp/_referencias/design-system/matrix/cagp-astro/DIAGNOSTICO-INTEGRAL-SRC.md
timestamp: 2026-11-08T06-57-26Z
slug: ix-cagp-astro-diagnostico-integral-src-md-d824aea1
---
### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Status de campus estático sem pulso visual; ausência de contador regressivo dinâmico para os 120 dias em ACG. |
| 2 | Match System / Real World | 2 | Jargões burocráticos ("Demonstrativo RREO", "Carga Paramétrica") geram atrito no estudante noturno. |
| 3 | User Control and Freedom | 3 | Cofre local robusto, mas falta diálogo de confirmação seguro ao zerar dados locais. |
| 4 | Consistency and Standards | 2 | 5 páginas usam `<h1>` inline sem `PageHeader`; sub-nav interna em `CagpTransparenciaPortal` duplica navegação global. |
| 5 | Error Prevention | 2 | Prazo peremptório de 120 dias (Art. 15) sem alerta destacado; alvos de toque < 44pt provocam mis-taps. |
| 6 | Recognition Rather Than Recall | 2 | Falta de máscaras gradientes (`.scroll-mask-x`) força o usuário a deduzir que há conteúdo lateral. |
| 7 | Flexibility and Efficiency | 3 | Command Palette ⌘K e atalhos rápidos funcionam muito bem, mas modal de atalhos aparece sem teclado físico. |
| 8 | Aesthetic and Minimalist Design | 2 | "Feature stuffing": empilhamento de múltiplos cabeçalhos, banners e cartões estatísticos na mesma tela. |
| 9 | Error Recovery | 2 | Rota 404 genérica sem atalhos rápidos contextualizados para os espaços da FAFICH. |
| 10 | Help and Documentation | 3 | Bons checklists discentes, porém textos introdutórios longos geram fadiga de leitura no mobile. |
| **Total** | | **23/40** | **Acceptable** |

### Design Specificity Verdict

**Veredito de Especificidade de Design**:
A identidade visual e a arquitetura temática são indiscutivelmente desenhadas para este produto: o casamento do Neobrutalismo tátil (rL9Ap) com a paleta oficial da Chapa Semente (#5B2A86 roxo, #FF8811 laranja, #266264 verde petróleo, #9E2424 rubro) e os arquétipos dos Candangos da FAFICH/UFMG confere alta singularidade. Não há risco de parecer um produto genérico ou descartável.

Entretanto, a interface sofre de **hipertrofia de componentes** e **concorrência severa de viewport**, com seções repetitivas introduzidas por diferentes blocos do BoldKit e primitivas do Astro.

**Avaliação da Auditoria Técnica e Heurística**:
A auditoria independente confirmou com mais de 97% de precisão factual as críticas feitas em `DIAGNOSTICO-DE-ALTA-COMPLEXIDADE-SRC.md` e `DIAGNOSTICO-INTEGRAL-SRC.md`:
1. O empilhamento vertical inicial consome mais de 500px no mobile (recolhido) e 600px (expandido).
2. Duplicação de headers em `chapa-semente.astro` (`PageHeader` + `HeroCentered` repetindo as mesmas frases) e triplicação de métricas em `transparencia.astro` (12 cartões de stats).
3. Violação das diretrizes Apple HIG nos botões `xs`/`sm`, switches e checkboxes sem envelopes táteis de 44pt.
4. Ausência total da classe `.scroll-mask-x` no CSS, causando cortes secos em rolagens horizontais.
5. Inconsistência de cabeçalhos nas rotas `permanencia.astro`, `cursos.astro`, `optativas.astro`, `ouvidoria.astro` e `estagio-tcc.astro`, que usam `<h1>` inline em vez do componente canônico `PageHeader.astro`.

### Overall Impression
O SuperApp CAGP possui uma fundação arquitetural invejável (Astro 7 + React 19, zero dependências externas de privacidade via `studentVault.ts` e 100% de testes verdes). Contudo, a experiência no smartphone está severamente asfixiada pelo excesso de camadas no topo. A maior oportunidade do projeto é **destilar e harmonizar os viewports**: recolher o banner automaticamente no scroll, consagrar os modos de visita (*Persuade*, *Operate*, *Read*) e ampliar os alvos de toque para 44pt.

### What's Working
1. **Soberania do Cofre Discente (`studentVault.ts`)**: 17 contratos Zod estritos, dados 100% locais no navegador e comunicação reativa síncrona via barramento `cagp:*`.
2. **Estética Tátil e Vocabulário Visual**: Bordas grossas de 3px, sombras duras e paleta vibrante que se conectam autenticamente com a cultura universitária da FAFICH.
3. **Robustez dos Módulos Funcionais**: A Calculadora de 600h, o Guardião de 120 dias e o Simulador do Artigo 41 (servidores públicos) resolvem dores reais e crônicas dos estudantes.

### Priority Issues

- **[P0] Viewport Squash no Mobile (< 768px)**
  - **What**: Pilha de elementos fixos e estáticos no topo consome ~500px, restando menos de 100px para o conteúdo útil.
  - **Why it matters**: Estudantes no celular precisam rolar duas telas completas para conseguir ler ou interagir com o sistema.
  - **Fix**: Transformar `CampaignBanner` em Smart Scroll (colapsando para 24px no scroll-down com persistência) e ocultar o `SuperAppHeader` em páginas com hero dominante.
  - **Suggested command**: `impeccable distill`

- **[P0] Duplicações Estruturais em `chapa-semente.astro` e `transparencia.astro`**
  - **What**: `chapa-semente.astro` empilha `PageHeader` e `HeroCentered` com textos duplicados; `transparencia.astro` empilha 12 cartões de estatísticas e uma sub-navegação redundante.
  - **Why it matters**: Fadiga visual, redundância de dados e quebra da clareza informativa.
  - **Fix**: Remover `PageHeader` em `chapa-semente.astro` (adotando modo *Persuade* puro); remover a `<nav>` interna de `CagpTransparenciaPortal.tsx` e unificar os cartões de estatísticas.
  - **Suggested command**: `impeccable distill`

- **[P0] Violação de Alvos Táteis Apple HIG (44x44pt)**
  - **What**: Botões `xs` (32px), `sm` (38px), botão `#cagp-banner-toggle-btn` (40px), switches e checkboxes possuem áreas físicas de clique inferiores a 44pt.
  - **Why it matters**: Alta incidência de toques perdidos (*mis-taps*) em dispositivos móveis e violação de acessibilidade.
  - **Fix**: Inserir envelopes táteis via pseudo-elementos (`before:content-[''] before:absolute before:inset-[-...]`) nas variantes compactas.
  - **Suggested command**: `impeccable harden`

- **[P0] Ausência de `.scroll-mask-x` e Tabelas Duplicadas**
  - **What**: A classe `.scroll-mask-x` não existe no CSS, provocando cortes abruptos em rolagens horizontais; `PercursosComparativeMatrix.tsx` renderiza duas tabelas com os mesmos dados sem wrapper de overflow.
  - **Why it matters**: Prejudica o reconhecimento de opções navegáveis e estoura o viewport no mobile.
  - **Fix**: Adicionar utilitário `.scroll-mask-x` em `components.css` e remover a tabela duplicada da matriz curricular.
  - **Suggested command**: `impeccable polish`

### Persona Red Flags

**Mariana (Estudante Trabalhadora Noturna)**:
Acessa o portal às 18h15 na fila do RU II pelo celular com bateria fraca. A pilha vertical do topo exige múltiplos scrolls apenas para ver o horário do circular ou o plantão. A calculadora de 600h está oculta na aba secundária.

**Alex (Veterano / Formando com Pressão de Prazos)**:
Quer checar a situação dos seus certificados para não perder o prazo fatal de 120 dias do Art. 15. A informação está dispersa em textos longos, sem um contador de dias restantes com alerta visual imediato.

**Jordan (Calouro no 1º Período)**:
Acessa `/calouros` no primeiro dia de aula e se depara com 3 cabeçalhos consecutivos (PageHeader + SegmentedControl + Card Aurora com título redundante), e checkboxes de 20px minúsculas no checklist de 30 dias.

### Minor Observations
- O modal de atalhos de teclado (`ShortcutsSheet`) é acionado mesmo em dispositivos sem teclado físico detectado.
- A página de erro 404 é genérica e poderia incorporar a identidade bem-humorada dos corredores da FAFICH.
- Apenas 7 arquivos em toda a codebase utilizam primitivas do `motion/react`, deixando a maioria das transições em CSS seco.

### Questions to Consider
- O que aconteceria se o `CampaignBanner` se recolhesse automaticamente assim que o estudante começasse a navegar?
- Por que manter uma página de campanha eleitoral com dois cabeçalhos oficiais disputando o topo?
- Qual a justificativa para 12 cartões de estatísticas na mesma página de Transparência se 4 indicadores consolidados informam com muito mais clareza?
