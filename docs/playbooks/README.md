# Índice Central de Playbooks & Refinamento: Impeccable + Apple Design

> **Documentação de Engenharia de Design e Governança Editorial do Super App CAGP UFMG**  
> **Versão:** 3.0.0  
> **Status:** Ativo e Homologado

---

## Estrutura da Documentação de Playbooks

Esta pasta reúne todos os manuais operacionais, guias editoriais e matrizes de prompts prontos para transformar o Super App página por página:

| Arquivo | Descrição e Objetivo | Público-Alvo |
| :--- | :--- | :--- |
| [**`00-MASTER-ORCHESTRATION-PLAYBOOK.md`**](file:///home/gsathler/Nextcloud/Projects/cagp/docs/playbooks/00-MASTER-ORCHESTRATION-PLAYBOOK.md) | **Manual Mestre de Orquestração:** Explicação detalhada de como funciona a orquestração via `/impeccable` e `/apple-design`, tabela dos 24 verbos do Impeccable, pipeline recomendado em 4 etapas e protocolo de verificação. | Desenvolvedores e Agentes de IA |
| [**`01-CONTENT-ARCHITECTURE-MIGRATION.md`**](file:///home/gsathler/Nextcloud/Projects/cagp/docs/playbooks/01-CONTENT-ARCHITECTURE-MIGRATION.md) | **Guia Editorial de Conteúdo Desacoplado:** Como publicar notícias, editar o regimento/estatuto e atualizar disciplinas da grade simplesmente criando arquivos Markdown (`.md`) em `/conteudo/` sem programar. | Gestão do CAGP e Redatores |
| [**`02-APPLE-DESIGN-HIG-RULES.md`**](file:///home/gsathler/Nextcloud/Projects/cagp/docs/playbooks/02-APPLE-DESIGN-HIG-RULES.md) | **Diretrizes Apple HIG em Astro + Tailwind v4:** Padrões técnicos de código para alvos de toque ($\ge 44\text{pt}$), superfícies sólidas e opacas (sem Liquid Glass nem Modo Escuro), *Bottom Sheets* deslizantes e controles segmentados. | Desenvolvedores e Agentes de IA |
| [**`03-PAGE-BY-PAGE-COMMANDS.md`**](file:///home/gsathler/Nextcloud/Projects/cagp/docs/playbooks/03-PAGE-BY-PAGE-COMMANDS.md) | **Matriz de Comandos Prontos (Copiar e Colar):** Blocos de prompts especializados para cada página e módulo do sistema, prontos para envio ao agente no chat. | Usuário / Pair Programmer |

---

## Como Iniciar uma Rodada de Refinamento

1. Abra o arquivo [`03-PAGE-BY-PAGE-COMMANDS.md`](file:///home/gsathler/Nextcloud/Projects/cagp/docs/playbooks/03-PAGE-BY-PAGE-COMMANDS.md).
2. Escolha o módulo ou página que deseja aprimorar (ex: *Eixo 1: Início & Mural de Notícias* ou *Eixo 3: Central Curricular & Grafo 10P*).
3. Copie o prompt pronto correspondente e envie para o agente no chat.
4. O agente executará os comandos do Impeccable com a precisão do Apple Design e validará com `npm run typecheck` e `npm run build`.
