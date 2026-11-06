# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

PWA responsivo offline-first (Service Worker), com dock flutuante no desktop e navegação inferior no mobile. Base: Astro 7 (SSG) + ilhas React 19 + Tailwind v4, hospedado como site estático.

## Users

- **Primários:** estudantes de graduação do Bacharelado em Gestão Pública (FAFICH/UFMG), com ênfase no turno noturno e em estudantes trabalhadores.
- **Segmentos com necessidades próprias:** calouros (acolhimento, primeiros 30 dias), formandos (600h, estágio, TCC) e membros da gestão discente do CAGP.
- **Público externo:** pessoas interessadas em ingressar no curso, que avaliam a graduação antes de prestar vestibular/SISU.

## Product Purpose

Super App e portal institucional que centraliza a vida do curso e acaba com a dispersão de informações:

- **Acadêmica:** notícias (acadêmicas, congressos, seminários, eventos da atlética, calourada do CAGP).
- **Burocrática:** documentos oficiais, normas, formulários e tramitação.
- **Curricular:** guia de como se formar (grade 10P, optativas, 600h, estágio, TCC).
- **Política / institucional:** informações do Centro Acadêmico, incluindo estatuto e portal da transparência.
- **Vitrine:** apresentar o curso de forma atraente para quem pensa em ingressar.

Funções inteligentes adaptadas a cada perfil, sem barreira de login e sem depender de servidores centrais. O sucesso significa que cada estudante resolve sua dúvida ou tarefa do curso sem precisar caçar a informação em vários canais.

## Positioning

Solução *Zero-Server / Student Vault* 100% descentralizada: os dados do estudante ficam no `localStorage`, validados com Zod. Responde a particularidades reais do curso que nenhum portal genérico cobre: a trava de 120 dias para AAC, o Art. 41 para dispensa de estágio, o teto de 600h de extensão/atividades, o grafo curricular interativo e os horários do campus Pampulha.

## Operating Context

- Uso em trânsito no campus Pampulha, com sinal 4G/Wi-Fi instável (FAFICH, RU II, pontos do circular).
- Apoio a decisões de matrícula no SIGA.
- Preparação de processos formais no SEI-UFMG.
- Rotina noturna: jantar no RU II, último circular, prazos de AAC.

## Capabilities and Constraints

- Os dados oficiais e as regras de negócio já estão registrados no código e no acervo (`src/content/`, `src/lib/`, `public/documentos/`, `_referencias/documentos-oficiais/`). **O trabalho atual é refinamento de UX/UI**, não a criação de conteúdo nem de regras.
- Sem backend, sem login e sem coleta de dados. A personalização por perfil precisa ser derivada localmente (Student Vault).
- A navegação é organizada em 5 eixos canônicos (`src/lib/navigationRegistry.ts`): Hoje, Curso, Currículo, Acervo, O CAGP.
- **Status do projeto:** o Super App é uma **proposta**. A versão final será entregue no **fim de fevereiro de 2027**.
- Portal da transparência e feed de notícias: escopo confirmado. Até a versão final, rodam com **dados simulados**. A fonte real e o fluxo de publicação continuam **em aberto** (sem backend).

## Brand Commitments

- Nome e identidade do Centro Acadêmico de Gestão Pública (CAGP, "Os Candangos"), com os logos em `logos/` e os tokens de marca em `_brand.yml`.
- **Referência de design obrigatória:** a *Proposta A: App Shell* (app shell + sidebar no tablet/desktop) do protótipo em `_referencias/prototipos/prot_tipo_cagp_ufmg_responsivo_mobile_tablet_e_desktop.html`. A Proposta B (Portal Bento) do mesmo arquivo não foi escolhida.
- **Princípios de UX/UI obrigatórios:** Impeccable + Apple Human Interface Guidelines, conforme `.agents/skills/apple-design/`.

## Evidence on Hand

- PDFs oficiais do curso (PPC, Regimento, Resoluções) em `public/documentos/` e `_referencias/documentos-oficiais/`.
- Catálogo de disciplinas (27 obrigatórias, 68 optativas) em `src/content/disciplinas/`.
- Logos e materiais de identidade em `logos/` e `_referencias/identidade_visual_chapa_semente/`.
- **Conteúdo simulado autorizado:** não há depoimentos, números de egressos, notícias nem dados de transparência reais. Esse conteúdo **pode e deve ser criado** para demonstrar a proposta, desde que:
  - cada bloco simulado traga um **aviso visível** de que se trata de simulação (ex.: "Conteúdo simulado — o Super App é uma proposta; a versão final será entregue no fim de fevereiro de 2027");
  - o conteúdo seja verossímil e coerente com o curso, sem atribuir falas ou números a pessoas ou órgãos reais identificáveis;
  - fique isolado em fonte de dados própria e marcada (ex.: flag `simulated`), para ser trocado pelos dados reais sem refatorar a interface.
- Dados oficiais e normativos (PPC, resoluções, disciplinas, regras de 600h/AAC/Art. 41) **nunca** são simulados.

## Product Principles

1. **Autonomia e privacidade plena:** os dados pertencem ao estudante, sem rastreamento e sem banco externo.
2. **Resiliência de campus:** navegação e consulta a ementas e regulamentos sempre funcionam offline.
3. **Fidelidade normativa:** alinhamento exato às resoluções do CEPE e às deliberações do Colegiado DCP.
4. **Ergonomia noturna:** acesso imediato aos serviços críticos de sobrevivência discente e à rotina do campus.
5. **Um app, vários perfis:** calouro, veterano, formando, gestão e público externo encontram primeiro o que importa para eles.

## Refinement Scope

Passes de refino de UX/UI do Impeccable obrigatórios até a versão final, nesta ordem (cada um parte do resultado do anterior):

1. **`distill`:** enxugar as telas até o essencial, cortando ruído, redundância e etapas desnecessárias.
2. **`layout`:** espaçamento, ritmo e hierarquia visual coerentes no mobile, tablet e desktop (app shell da Proposta A).
3. **`colorize`:** cor com função (estado, eixo, perfil, alerta) a partir dos tokens de `_brand.yml`.
4. **`animate`:** movimento com propósito (transições entre eixos, feedback de ações, estados de carregamento), respeitando a preferência de redução de movimento do Student Vault.
5. **`delight`:** toques de personalidade do CAGP / "Os Candangos" em momentos-chave (onboarding, conquistas das 600h, conclusão de checklists), sem atrapalhar tarefas.

## Accessibility & Inclusion

Preferências já suportadas e que devem ser preservadas: escala tipográfica, alto contraste, modo dislexia, régua visual e redução de movimento (`cagp_a11y_prefs_v2`). Meta: WCAG AA ou superior.
