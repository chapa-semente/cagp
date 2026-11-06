---
target: src/pages/index.astro
total_score: 29.5
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
target_identity: "file:/home/gsathler/Nextcloud/Projects/cagp/src/pages/index.astro"
target_fingerprint: "sha256:6b5c60c90efa662123ac7ff2fa55a4d23c60c6c3d53617d382bdcbdaba9166e8"
target_path: /home/gsathler/Nextcloud/Projects/cagp/src/pages/index.astro
timestamp: 2026-11-06T14-05-22Z
slug: src-pages-index-astro
---
Method: dual-agent (A: 3c3c9478-5c5d-444b-8553-c47a4337b962 · B: 4a6ce0f3-13fe-481f-821c-b092278b9194)

### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|:-----:|-----------|
| 1 | Visibility of System Status | 3.0 | Status ao vivo do RU II e Circular funcionam, mas botões de alarme só salvam flag local sem Web Notification real. |
| 2 | Match System / Real World | 3.5 | Linguagem hiperfiel à FAFICH/UFMG (Bandejão RU II, F-2039, Circular, Art. 41, carimbo de deferimento). |
| 3 | User Control and Freedom | 3.0 | Troca instantânea de perfis e reversibilidade; contudo, o banner de campanha não possui dispensa definitiva. |
| 4 | Consistency and Standards | 2.0 | Grave cisma: Home/Casca em papelaria contínua vs páginas internas legadas em neo-brutalismo (bordas pretas 2px, sombras duras e 535 ícones Bootstrap). |
| 5 | Error Prevention | 3.0 | Excelente trava de pré-requisito ECN 140 → ECN 044 e teto de 300h de AAC; falta confirmação para limpar dados do cofre. |
| 6 | Recognition Rather Than Recall | 3.5 | Seletor de momento discente adapta a visão sem exigir decoreba de resoluções. Spotlight global (⌘K) eficiente. |
| 7 | Flexibility and Efficiency | 3.5 | Suporte a atalhos (⌘K), exportação direta .ics e navegação adaptativa para mobile, tablet rail e desktop. |
| 8 | Aesthetic and Minimalist Design | 2.0 | Poluição na 1ª dobra com até 7 badges simultâneos em caixa alta e invasividade cromática do topo partidário. |
| 9 | Error Recovery | 2.5 | Indicação clara de modo offline; contudo, certificados >120 dias exibem trava punitiva sem plano de ação/recurso. |
| 10 | Help and Documentation | 3.5 | Base normativa rica: links diretos para resoluções CEPE, PPC 2020 e ementário oficial em PDF. |
| **Total** | | **29.5/40** | **Good (73.75%) — Base sólida com necessidade de unificação estrutural e alívio de ruído** |

### Design Specificity Verdict

- **LLM Assessment (Assessment A):** O projeto possui especificidade discente extraordinária. Não é um portal universitário genérico: ele resolve as dores reais do estudante noturno trabalhador da FAFICH (jantar das 17h30 no RU II, último circular das 22h30, trava de 120 dias da AAC, dispensa de estágio pelo Art. 41). O componente de assinatura `.cagp-stamp-badge` (borda dupla, inclinação orgânica e animação mecânica) evoca a secretaria acadêmica da FAFICH com autenticidade tátil. Contudo, a identidade se quebra pela sobreposição eleitoral do `CampaignBanner` no topo e pelo abismo visual entre a Home moderna e as páginas internas legadas.
- **Deterministic Scan (Assessment B):** A fonte direta `src/pages/index.astro` e `src/components/shell` e `src/components/home` apresentaram **0 violações determinísticas**. No escopo expandido de páginas e componentes, o detector sinalizou 3 avisos de tipografia/raio em `documentos/[slug].astro` e 6 avisos em exploradores curriculares (`text-[8px]`/`text-[9px]`).
- **Browser Live Evidence (`http://localhost:4321/`):** Detectou comprimento de linha excessivo no `#cagp-banner-text` (~130 caracteres em desktop sem max-width), padding vertical apertado (2-3px) nos badges do RU e Colegiado, contraste insuficiente (2.6:1 com `#99a1af`) no rodapé `PageFooter.astro:41`, e uso residual de `backdrop-blur-*` em múltiplos componentes globais. O aviso do detector sobre paleta bege/creme (`#FBF8F3`) foi classificado como **FALSO POSITIVO**, pois representa o token canônico da marca ("O Dossiê Tátil da Gestão Pública").

### Overall Impression
O Super App CAGP atingiu uma fundação arquitetônica invejável: zero-server, offline-first, atalhos adaptativos, responsividade calibrada em três tamanhos de tela e regras normativas reais. Contudo, ele atualmente opera sob uma "dupla personalidade": a Home respira o padrão Dossiê de Papel do Apple HIG, enquanto as subpáginas respiram neo-brutalismo dos primórdios do projeto. A experiência de entrada sofre com sobrecarga de badges e sobreposição partidária. Unificar a linguagem para a folha contínua e focar estritamente nas 2-3 tarefas primárias de cada página é o passaporte para o nível out-of-distribution.

### What's Working
1. **Hiperespecificidade Institucional:** Resolve os gargalos mais críticos da vida do aluno da FAFICH (horários do RU II, Circular, Art. 41 e Trava de 120 dias da AAC) com dados exatos do PPC 2020.
2. **Componente de Assinatura (Carimbo Mecânico):** O selo `.cagp-stamp-badge` traz peso material e recompensa tangível a cada etapa curricular validada.
3. **Student Vault 100% Descentralizado:** Armazenamento seguro e instantâneo no `localStorage` via Zod, garantindo uso contínuo e sem login nos pontos sem sinal do campus Pampulha.

### Priority Issues

- **[P0] Cisma Visual: Dossiê de Papel (Home/Shell) vs. Neo-Brutalismo Legado (Páginas Internas)**
  - *Por que importa:* Quebra a sensação de um sistema operacional único e passa a impressão de páginas desconectadas ou inacabadas.
  - *Fix:* Refatorar os módulos de `/calouros`, `/acg`, `/tcc`, `/estagio`, `/noticias` e `/faq` para o padrão de folha contínua (`bg-white rounded-3xl border border-[#DFDBD2] divide-y divide-[#DFDBD2]`), eliminando bordas pretas de 2px e sombras duras, e substituir 535 ícones Bootstrap Icons (`bi bi-*`) pelo componente autoral `CagpIcon`.
  - *Comando sugerido:* `/impeccable polish` (combinado com `/impeccable distill`)

- **[P1] Invasividade e Dissonância Cromática da Faixa de Campanha**
  - *Por que importa:* Ocupa a posição de maior autoridade visual da tela (topo absoluto em todas as páginas) com uma paleta agressiva (roxo, laranja e verde-petróleo) de propaganda de chapa, conflitando com a sobriedade institucional republicana.
  - *Fix:* Converter a autoria da Chapa Semente e a nota de proposta em uma assinatura discreta e elegante de rodapé institucional (`PageFooter.astro`) ou transformá-la em uma barra institucional recolhível e dispensável com a paleta oficial (`#FBF8F3`, `#DFDBD2`, `#8B1E2D`).
  - *Comando sugerido:* `/impeccable quieter`

- **[P1] Sobrecarga Cognitiva e Proliferação de Badges na Primeira Dobra**
  - *Por que importa:* Até 7 selos concorrentes em caixa alta disputam atenção com o seletor de perfil, status do campus, notícias e alertas, gerando paralisia de escolha para o estudante que acessa em trânsito.
  - *Fix:* Aplicar a regra *No-Eyebrow*, agrupar os 6 passos do calouro em 2 fases curtas (3 itens cada), esconder ações terciárias (como download de `.ics`) em menus secundários e unificar as tarjas em uma linha única de contexto discente.
  - *Comando sugerido:* `/impeccable distill`

- **[P2] Falsa Sensação de Alarme e Resíduos de Blur**
  - *Por que importa:* Os botões "Alarme RU" e "Alarme Circular" não disparam notificações de sistema se o navegador for fechado, induzindo o estudante ao erro; além disso, classes `backdrop-blur-*` violam a regra Zero Liquid Glass e degradam a performance em aparelhos modestos.
  - *Fix:* Transformar a ação do alarme em "Adicionar ao Calendário (.ics)" ou integrar a Web Notifications API com Service Worker; substituir `backdrop-blur-*` por superfícies opacas sólidas (`bg-white` ou `#FBF8F3` com borda `#DFDBD2`).
  - *Comando sugerido:* `/impeccable harden`

### Persona Red Flags
- **Alex (Estudante Noturno Trabalhador):** Chega correndo à FAFICH às 18h50 com fome e pouca bateria. Tem que rolar pela faixa eleitoral e pela saudação antes de descobrir se as catracas do RU II ainda estão abertas. O alarme do RU na tela não soa no bolso.
- **Jordan (Calouro no Primeiro Mês):** Desorientado com siglas acadêmicas. Depara-se com 6 tarefas densas de checklist cheias de referências regulamentares ("Res. CEPE 06/19", "DCP 135", "ECN 140") sem um glossário imediato. Ao clicar no Guia do Calouro, a tela muda para caixas neo-brutalistas pretas.
- **Sam (Usuário de Leitor de Tela / Acessibilidade):** Ao navegar por cabeçalhos, o primeiro `h1` fica abaixo de múltiplos botões e banners; rótulos de rodapé com contraste 2.6:1 falham na leitura para baixa visão.
- **Riley (Formando sob Pressão de 600h):** Recebe o alerta vermelho "TRAVA DE 120 DIAS ATIVA", mas não tem indicação clara de quais certificados correm risco imediato de perda nem cálculo automático de equivalência de carteira assinada no Art. 41.

### Minor Observations
- O termo "Student Vault" deve ser nacionalizado para "Cofre Discente" ou "Dados no Dispositivo".
- O badge `simulated: true` nas notícias concorre com a manchete em telas mobile compactas.
- Na visualização tablet, a expansão da sidebar com backdrop escuro comporta-se como modal invasivo em vez de uma sidebar colapsável fluida estilo iPadOS.

### Questions to Consider
- Se um estudante estiver na parada da FAFICH às 22h38 com 8% de bateria na chuva, quais são as únicas 2 informações vitais que ele precisa ver nos primeiros 3 segundos?
- Como a identidade da Chapa Semente pode se posicionar como uma chancela de rodapé transparente e respeitosa, deixando o topo 100% dedicado à vida discente?
- Podemos erradicar completamente os 535 ícones Bootstrap Icons residuais e consagrar o SVG autoral `CagpIcon` em todo o projeto?
