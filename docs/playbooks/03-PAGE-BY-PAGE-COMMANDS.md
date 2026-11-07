# Matriz de Comandos Página a Página: Prompts Prontos para Execução

> **Biblioteca de Prompts Especializados para Copiar e Colar no Chat do Agente**  
> **Como Usar:** Copie o bloco de prompt correspondente à página que você deseja refinar e envie diretamente para o agente. Cada bloco é autocontido e especifica os comandos do Impeccable e as regras Apple HIG adequadas para aquela superfície.  
> **Localização:** [`docs/playbooks/03-PAGE-BY-PAGE-COMMANDS.md`](file:///home/gsathler/Nextcloud/Projects/cagp/docs/playbooks/03-PAGE-BY-PAGE-COMMANDS.md)

---

## Índice Rápido de Superfícies

1. [Módulo 0: Casca Global & App Shell](#modulo-0-casca-global--app-shell)
2. [Eixo 1: Início (Hoje) & Mural de Notícias](#eixo-1-inicio-hoje--mural-de-noticias)
3. [Eixo 2: Curso, Calouros & Pesquisa](#eixo-2-curso-calouros--pesquisa)
4. [Eixo 3: Central Curricular, Grafo 10P & Calculadoras](#eixo-3-central-curricular-grafo-10p--calculadoras)
5. [Eixo 4: Acervo, Documentos Oficiais & FAQ](#eixo-4-acervo-documentos-oficiais--faq)
6. [Eixo 5: Sobre o CAGP, Transparência & Gestão](#eixo-5-sobre-o-cagp-transparencia--gestao)
7. [Módulo Especial: Configurações & Student Vault](#modulo-especial-configuracoes--student-vault)

---

## Módulo 0: Casca Global & App Shell

**Arquivos:** [`src/layouts/BaseLayout.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/layouts/BaseLayout.astro), [`src/components/shell/SuperAppHeader.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/SuperAppHeader.astro), [`src/components/shell/BottomNav.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/BottomNav.astro), [`src/components/shell/GlobalSheets.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/GlobalSheets.tsx).  
**Verbos Impeccable:** `layout`, `adapt`, `polish`.

### Prompt para Copiar e Colar:

```markdown
Execute o refinamento da Casca Global (App Shell) do projeto utilizando as skills /impeccable e /apple-design.

Alvos principais:
- src/layouts/BaseLayout.astro
- src/components/shell/SuperAppHeader.astro
- src/components/shell/BottomNav.astro
- src/components/shell/GlobalSheets.tsx

Comandos Impeccable:
1. `adapt`: Garanta suporte a safe areas móveis (env(safe-area-inset-bottom) no BottomNav e env(safe-area-inset-top) no Header) com alturas dinâmicas usando `dvh`.
2. `layout`: Assegure alvos de toque mínimos de 44x44pt em todos os botões do header e na barra de navegação inferior.
3. `polish`: Aplique o acabamento refinado com superfícies brancas opacas e sólidas, borda sutil de 1px (`border-[#DFDBD2]`), cantos arredondados contínuos e relevo tátil.

Regras Estritas:
- PROIBIDO usar Liquid Glass, backdrop-blur ou efeitos translúcidos/vidro.
- PROIBIDO implementar modo escuro (Dark Mode). O app é estritamente no tema claro acadêmico (#FBF8F3 / #FFFFFF).
- Não alterar as rotas e chaves de navegação de src/lib/navigationRegistry.ts.
- Preservar o atalho ⌘K / Ctrl+K de busca rápida e o atalho ? de ajuda.
- Validar rodando `npm run typecheck` e `npm run build`.
```

---

## Eixo 1: Início (Hoje) & Mural de Notícias

**Arquivos:** [`src/pages/index.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/index.astro), [`src/pages/noticias/index.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/noticias/index.astro), [`src/pages/noticias/[slug].astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/noticias/[slug].astro).  
**Verbos Impeccable:** `distill`, `typeset`, `layout`, `polish`.

### Prompt para Copiar e Colar:

```markdown
Execute o refinamento da página de Início e do Mural de Notícias utilizando as skills /impeccable e /apple-design.

Alvos:
- src/pages/index.astro
- src/pages/noticias/index.astro
- src/pages/noticias/[slug].astro
- src/components/features/cagp/CagpNewsMural.tsx

Comandos Impeccable:
1. `distill`: Elimine redundâncias visuais na página inicial. Simplifique os widgets de status do campus e destaque as prioridades imediatas do estudante noturno (RU II e Circular).
2. `typeset`: Na leitura de notícias ([slug].astro), restrinja a largura do texto a max-w-[70ch], entrelinha relaxada (leading-relaxed) e subtítulo limpo.
3. `layout`: Organize os cartões do mural em grade responsiva com espaçamento harmônico (gap-4 sm:gap-6).
4. `polish`: Adicione estados de foco/hover táteis e carimbos administrativos institucionais com a paleta Vinho (#8B1E2D) e Ouro (#E8A317).

Regras Estritas:
- As notícias devem ser consumidas exclusivamente da coleção Astro em `/conteudo/noticias/*.md`.
- Validar rodando `npm run typecheck` e `npm run build`.
```

---

## Eixo 2: Curso, Calouros & Pesquisa

**Arquivos:** [`src/pages/curso.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/curso.astro), [`src/pages/calouros.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/calouros.astro), [`src/pages/pesquisa.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/pesquisa.astro).  
**Verbos Impeccable:** `typeset`, `clarify`, `layout`, `adapt`.

### Prompt para Copiar e Colar:

```markdown
Execute o refinamento das páginas do Eixo Curso (Visão Institucional, Guia do Calouro e Pesquisa) utilizando as skills /impeccable e /apple-design.

Alvos:
- src/pages/curso.astro
- src/pages/calouros.astro
- src/pages/pesquisa.astro
- Componentes em src/components/curso/, src/components/calouros/, src/components/pesquisa/

Comandos Impeccable:
1. `clarify`: No Guia do Calouro, converta instruções densas em passos acionáveis (Checklist do Calouro, primeiros dias no turno noturno, localização da Sala F-2039).
2. `typeset`: Garanta hierarquia clara entre títulos de núcleos de pesquisa e suas descrições de extensão.
3. `layout`: Modularize blocos com muitos parágrafos em cartões escaneáveis com ícones semânticos da biblioteca do projeto.
4. `adapt`: Certifique-se de que tabelas e listas de horários funcionem perfeitamente no celular sem rolagem horizontal indesejada.

Regras Estritas:
- Alvos de toque com min-h-[44px] em todos os links e botões de download.
- Validar rodando `npm run typecheck` e `npm run build`.
```

---

## Eixo 3: Central Curricular, Grafo 10P & Calculadoras

**Arquivos:** [`src/pages/percurso.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/percurso.astro), [`src/pages/optativas.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/optativas.astro), [`src/pages/acg.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/acg.astro), [`src/pages/estagio.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/estagio.astro), [`src/pages/tcc.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/tcc.astro).  
**Verbos Impeccable:** `harden`, `delight`, `layout`, `adapt`.

### Prompt para Copiar e Colar:

```markdown
Execute o refinamento da Central Curricular e das Ferramentas Interativas (Grafo 10P, Calculadora 600h e Simulador de Estágio Art. 41) utilizando as skills /impeccable e /apple-design.

Alvos:
- src/pages/percurso.astro (Grafo Dinâmico e 27 Obrigatórias)
- src/pages/optativas.astro (Catálogo de Optativas)
- src/pages/acg.astro (Calculadora 600h e Guardião 120d)
- src/pages/estagio.astro (Simulador Art. 41)
- src/pages/tcc.astro (Modalidades de TCC)

Comandos Impeccable:
1. `harden`: Proteja as calculadoras contra entradas inválidas, garantindo feedback imediato em caso de valores zerados ou fora dos limites do barema PPC 2020.
2. `layout`: No Grafo Curricular e na Linha do Tempo das 27 Obrigatórias, garanta que os detalhes expansíveis de ementa abram suavemente e que os pré-requisitos tenham destaque claro.
3. `adapt`: No mobile, ofereça visualização em lista/timeline das matérias como alternativa à navegação complexa do grafo SVG.
4. `delight`: Adicione feedback visual tátil aos seletores e barras de progresso (animações de preenchimento do anel de integralização).

Regras Estritas:
- Preservar a leitura das 95 disciplinas através da coleção `/conteudo/disciplinas/*.md`.
- Manter o cálculo de horas conforme a Resolução de 21/11/2024 e o Art. 15 §4º.
- Validar rodando `npm run typecheck` e `npm run build`.
```

---

## Eixo 4: Acervo, Documentos Oficiais & FAQ

**Arquivos:** [`src/pages/documentos.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/documentos.astro), [`src/pages/documentos/[slug].astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/documentos/[slug].astro), [`src/pages/faq.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/faq.astro).  
**Verbos Impeccable:** `distill`, `typeset`, `clarify`, `polish`.

### Prompt para Copiar e Colar:

```markdown
Execute o refinamento do Acervo de Documentos Oficiais e da Central de Dúvidas (FAQ) utilizando as skills /impeccable e /apple-design.

Alvos:
- src/pages/documentos.astro
- src/pages/documentos/[slug].astro (Leitor Editorial de Transcrições Oficiais)
- src/pages/faq.astro

Comandos Impeccable:
1. `typeset`: No leitor de documentos oficiais ([slug].astro), calibra a tipografia editorial (títulos H1, H2, H3, citações e artigos de lei) para parecer um documento oficial impresso de alta qualidade.
2. `clarify`: No FAQ, agrupe perguntas em categorias temáticas com busca instantânea e respostas objetivas com links diretos para os formulários oficiais.
3. `distill`: Remova repetições de avisos de download de PDF, mantendo uma barra de ações fixa e discreta com o botão de download no topo.
4. `polish`: Ajuste o índice lateral de navegação rápida (*Table of Contents*) para destacar a seção ativa conforme o usuário rola o texto.

Regras Estritas:
- Os documentos oficiais são alimentados a partir de `/conteudo/documentos/*.md`.
- Validar rodando `npm run typecheck` e `npm run build`.
```

---

## Eixo 5: Sobre o CAGP, Transparência & Gestão

**Arquivos:** [`src/pages/sobre.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/sobre.astro), [`src/pages/transparencia.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/transparencia.astro), [`src/pages/gestao.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/gestao.astro).  
**Verbos Impeccable:** `bolder`, `layout`, `clarify`, `polish`.

### Prompt para Copiar e Colar:

```markdown
Execute o refinamento das páginas institucionais do CAGP (História & Princípios, Portal da Transparência e Organograma da Gestão) utilizando as skills /impeccable e /apple-design.

Alvos:
- src/pages/sobre.astro
- src/pages/transparencia.astro
- src/pages/gestao.astro
- Componentes em src/components/sobre/ e src/components/gestao/

Comandos Impeccable:
1. `bolder`: Dê presença cívica e peso institucional à página Sobre o CAGP, destacando a história de fundação da gestão pública na UFMG e seus princípios.
2. `layout`: No Portal da Transparência e na Gestão de Contas, formate tabelas financeiras e organogramas em cartões modulares e limpos.
3. `clarify`: Explique com transparência a composição de cada diretoria executiva, atribuições estatutárias e formas de contato com a representação discente.
4. `polish`: Aplique acabamento refinado aos cartões de membros com fotos/iniciais, cargos e badges de atuação.

Regras Estritas:
- Validar rodando `npm run typecheck` e `npm run build`.
```

---

## Módulo Especial: Configurações & Student Vault

**Arquivos:** [`src/pages/configuracoes.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/configuracoes.astro), [`src/components/settings/SettingsInteractive.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/settings/SettingsInteractive.tsx).  
**Verbos Impeccable:** `harden`, `adapt`, `polish`.

### Prompt para Copiar e Colar:

```markdown
Execute o refinamento da Central de Configurações, Acessibilidade e Backup do Student Vault utilizando as skills /impeccable e /apple-design.

Alvos:
- src/pages/configuracoes.astro
- src/components/settings/SettingsInteractive.tsx
- src/components/settings/SettingsAlertsSection.tsx
- src/components/settings/SettingsA11ySection.tsx
- src/components/settings/SettingsVaultSection.tsx

Comandos Impeccable:
1. `harden`: Valide a rotina de exportação e importação de JSON do Student Vault (backup dos dados do aluno no localStorage) com mensagens claras de sucesso ou erro.
2. `adapt`: Transforme os toggles de configuração e seletores de fonte (OpenDyslexic, Alto Contraste) em controles nativos no estilo Apple Settings (iOS Switch).
3. `polish`: Ajuste o agrupamento das seções em cartões arredondados com divisores suaves, seguindo a estética de ajustes do macOS/iOS.

Regras Estritas:
- Garantir alvos de clique mínimos de 44x44pt em todos os switches.
- Validar rodando `npm run typecheck` e `npm run build`.
```
