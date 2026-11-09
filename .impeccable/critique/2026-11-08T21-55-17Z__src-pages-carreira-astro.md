---
target: src/pages/carreira.astro
total_score: 19
max_score: 40
na_heuristics: 
p0_count: 3
p1_count: 5
target_identity: "file:/home/gsathler/Nextcloud/Projects/cagp/src/pages/carreira.astro"
target_fingerprint: "sha256:b91be7d4fd0356f12974f44727ab94c5da8a440bf59e888f6e942195d61716ca"
target_path: /home/gsathler/Nextcloud/Projects/cagp/src/pages/carreira.astro
timestamp: 2026-11-08T21-55-17Z
slug: src-pages-carreira-astro
---
# Critique & Craft Floor Audit: Carreira & Simulador Art. 41

Method: dual-agent (A: 4efa4a6a-6d37-4a70-a3d6-3bdebc27706e · B: b2ca54f7-dd1b-42d2-bd87-f36c112a7619)

## Design Health Score

| # | Heurística | Score | Problema Chave |
|---|-----------|:-----:|----------------|
| 1 | Visibility of System Status | 2/4 | Links órfãos sem destino (#tutorial, #obrigatorio, #termo-aceite); wizard TCE finaliza sem rota clara. |
| 2 | Match System / Real World | 2/4 | Componente DateRangePicker em inglês ("Last 7 days"); fusão de campanha política com rito burocrático. |
| 3 | User Control and Freedom | 2/4 | Ausência de reset/limpeza do checklist no studentVault; navegação de abas perde o contexto com âncoras mortas. |
| 4 | Consistency and Standards | 1/4 | Atrito entre tokens neobrutalistas (#16181d) e shadcn (border-border); duplicação de acervo de modelos (Drawer vs Lista). |
| 5 | Error Prevention | 2/4 | Botão de protocolar ativo com 0 requisitos; botão de exclusão de competência com 20x20px induz a erro. |
| 6 | Recognition Rather Than Recall | 2/4 | 7 modelos espalhados e duplicados entre abas 1 e 2; discente precisa memorizar caminhos dispersos. |
| 7 | Flexibility and Efficiency | 2/4 | Ausência de anéis de foco por teclado (focus-visible); sem atalhos ou seleção em lote. |
| 8 | Aesthetic and Minimalist Design | 1/4 | Piso de ruído saturado; 18 cards aninhados; 15 eyebrows redundantes; 21 botões concorrentes. |
| 9 | Error Recovery | 2/4 | Sem orientação acionável para requisitos pendentes do Art. 41; validação nativa de URL árida. |
| 10 | Help and Documentation | 3/4 | Excelente embasamento normativo (Art. 41, Lei 11.788), mas enterrado sob densidade caótica. |
| **Total** | | **19/40** | **Insatisfatório (Requer Reformulação Estrutural)** |

## Design Specificity Verdict

- **LLM Assessment**: A interface possui forte especificidade de domínio e conteúdo normativo da UFMG (DCP 135/136, Art. 41 da N-20229, SEPLAG, PBH, MROSC), porém foi soterrada por clichês neobrutalistas decorativos repetitivos. Há uma colisão de registros (Persuade vs Operate): a primeira dobra de uma página operacional exibe dois grandes cartões de citação de campanha política com avatares e bordas pretas pesadas antes do Segmented Control. O componente DateRangePicker vazou sem tropicalização com termos em inglês.
- **Deterministic Scan**: O scanner regex estático nativo do script acusou 0 findings diretos em arquivos `.astro`/`.tsx` devido à falta de parsing AST de DOM compilado. O auditor B executou parsing profundo, detectando:
  - 46 ocorrências de texto sub-12px (text-[10px] e text-[11px]);
  - 18 estruturas de cards aninhados (nested cards);
  - 15 eyebrows redundantes acima de headings;
  - 1 quebra direta de contraste WCAG AA no carimbo homologado do FactCheckBanner (3.46:1 sobre fundo verde claro, exigindo >= 4.5:1);
  - 12 grupos de elementos interativos desprovidos de `:focus-visible`, feedback `:active` ou estados `:disabled`.
- **Visual Overlays**: Indisponível em ambiente headless CLI sem script de injeção em navegador aberto.

## Overall Impression
Um hub discente rico em conteúdo regimental e utilidade prática essencial para formandos, mas que sofre de sobrecarga cognitiva aguda e hipertrofia de contêineres. O excesso de bordas 3px, sombras duras e caixas aninhadas transforma uma ferramenta de trabalho em um mosaico visual ruidoso.

## What's Working
1. **Riqueza e Fidelidade Normativa**: O detalhamento das regras da UFMG (Art. 41 da N-20229, DCP 135/136, Lei 11.788/2008) e a checagem no FactCheckBanner trazem segurança jurídica real ao discente.
2. **Integração com o Cofre Discente (studentVault)**: Persistência local transparente e reativa de checklists, competências e momentos profissionais sem fricção de login.
3. **Padrão de Simulação Paso-a-Passo**: A lógica interativa do Art. 41 desmistifica uma dispensa complexa em 5 critérios regimentais objetivos.

## Priority Issues

### [P0] Duplicação Estrutural & IA Rompida (Concorrência Drawer vs. Lista & Âncoras Mortas)
- **Problema**: O acervo de 7 modelos de estágio e links para Google Forms é renderizado duas vezes na mesma página (em `EstagioDocumentDrawerAndGuide.tsx` e `EstagioTceCore.astro`), e links âncora internos (`#tutorial`, `#obrigatorio`, `#termo-aceite`) apontam para IDs inexistentes no DOM.
- **Por que importa**: Discentes perdem a confiança no sistema, clicam em botões mortos e ficam em dúvida sobre qual modelo baixar.
- **Fix**: Remover o embutimento concorrente do Drawer na Aba 2, consolidar a matriz canônica de 7 modelos e corrigir todos os fragmentos de URL.
- **Comando Sugerido**: `/impeccable layout`

### [P0] Poluição de Campanha na Primeira Dobra (Conflito Operate vs. Persuade)
- **Problema**: No modo `operate`, a primeira dobra entre o PageHeader e o SegmentedControl é ocupada por dois cards de citação política com bordas de 3px e sombras duras, empurrando o controle funcional da página para fora da visualização inicial.
- **Por que importa**: Viola a Lei de Fitts e o Squint Test: o discente que acessa a página para resolver um estágio precisa rolar antes de encontrar qualquer navegação de carreira.
- **Fix**: Realocar as citações políticas para a página institucional da chapa (`/chapa-semente`) ou condensá-las em rodapé sutil, deixando o SegmentedControl imediatamente abaixo do PageHeader.
- **Comando Sugerido**: `/impeccable distill`

### [P0] Falha de Contraste WCAG AA no Selo Homologado
- **Problema**: `FactCheckBanner.astro` utiliza `text-success` (`#15803D`) sobre `bg-success/20` (`#D0E5D8`), atingindo apenas 3.46:1 a 3.79:1 de contraste para texto de 12px, reprovando o piso de 4.5:1.
- **Por que importa**: Prejudica diretamente discentes com baixa acuidade visual ou sob iluminação solar/ambiente desfavorável.
- **Fix**: Atualizar o token de texto no FactCheckBanner para `#166534` ou `#14532D` (atingindo > 5.3:1).
- **Comando Sugerido**: `/impeccable colorize`

### [P1] Erradicação dos Cards Aninhados (Nested Cards Ban)
- **Problema**: 18 ocorrências de contêineres com borda 3px e sombra dura colocados dentro de outros contêineres com borda e sombra (ex: no Art41SimulatorCore, CarreiraTalentosTab, EstagioTceCore e FactCheckBanner).
- **Por que importa**: Gera cansaço visual, aumenta a profundidade artificial e destrói o ritmo de leitura.
- **Fix**: Aplanar a estrutura: remover bordas e sombras de recipientes internos, adotando divisores finos (`divide-y`), recuos semânticos e hierarquia tipográfica.
- **Comando Sugerido**: `/impeccable layout`

### [P1] Piso Tipográfico Sub-12px (46 Ocorrências de text-[10px] e text-[11px])
- **Problema**: 46 tags de texto em caixas de status, metadados, badges e links com tamanhos ilegíveis de 10px e 11px.
- **Por que importa**: Viola o piso de acessibilidade do Craft Floor, forçando o discente a aproximar a tela.
- **Fix**: Normalizar todos os textos para no mínimo `text-xs` (12px) ou `text-sm` (14px).
- **Comando Sugerido**: `/impeccable typeset`

### [P1] Ausência de Anéis de Foco (focus-visible) e Estados Faltantes
- **Problema**: 12 grupos de botões, abas e links não possuem estilo para navegação por teclado (`focus-visible:`), além de botões sem feedback `active:` ou estados desabilitados.
- **Por que importa**: Torna a página inavegável para quem utiliza teclado ou leitor de tela (WCAG 2.4.7).
- **Fix**: Adicionar `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring` e micro-deslocamento tátil em todos os controles.
- **Comando Sugerido**: `/impeccable harden`

### [P1] Desconexão do Componente DateRangePicker em Inglês
- **Problema**: O seletor de período do Art. 41 exibe presets em inglês ("Today", "Last 7 days", "This month"), incompatíveis com comprovação funcional de anos/semestres no serviço público.
- **Por que importa**: Quebra a heurística de correspondência com o mundo real e a seriedade institucional do Super App.
- **Fix**: Substituir presets genéricos de e-commerce por presets úteis de serviço público ("Último ano letivo", "Semestre anterior", "Período integral") com textos em português.
- **Comando Sugerido**: `/impeccable clarify`

## Persona Red Flags

- **Alex (Power User / Formando)**: Não consegue navegar por teclado por falta de `focus-visible`. Precisa rolar múltiplos blocos e desvendar duas listas duplicadas para achar o modelo oficial de PAE.
- **Jordan (First-Timer / Calouro)**: Chega na página e é confrontado com jargões e uma primeira aba de banco de talentos/vagas em vez de um fluxo calmo de orientação de estágio. Fica desorientado entre "Aproveitamento Servidor" e "Não Obrigatório".
- **Discente Trabalhador Noturno**: Ao tentar simular o Art. 41, o DateRangePicker oferece "Last 7 days" em inglês para quem precisa comprovar 12 meses de vínculo em órgão governamental. O botão de enviar o pedido permanece ativo mesmo com 0 critérios, gerando dúvida se a documentação já está pronta.

## Minor Observations
- Botão de exclusão de competência (`×`) em `CarreiraTalentosTab` possui apenas 20x20px, violando a recomendação de alvos de toque de 44x44px.
- Falta de botão para resetar/limpar simulação do Art. 41 e talentos cadastrados no cofre local.
- Uso de animação `animate-[bk-stamp-in]` simulando carimbo ao vivo para texto puramente estático.
- Convivência de classes hardcoded de cores (`text-[#3F3C38]`, `bg-[#134E4A]`, `text-[#854D0E]`) que deveriam usar tokens CSS centralizados do sistema neobrutalista rL9Ap.

## Questions to Consider
- O que aconteceria se o SegmentedControl assumisse o topo imediato abaixo do PageHeader, permitindo que o discente escolha em 1 clique o que veio fazer (1. Vagas, 2. Art. 41 Servidor, 3. Estágio & TCE, 4. TCC)?
- Os 7 modelos de estágio e os Google Forms precisam de 21 botões espalhados, ou uma tabela/lista limpa com busca e filtro por tipo resolveria com 80% menos ruído?
- As citações eleitorais de Lara Soares e Lívia Martins agregam valor na rotina cartorial de quem está emitindo um TCE na FAFICH, ou pertencem exclusivamente à página da Chapa Semente?
