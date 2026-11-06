# Arquitetura do Sistema — Super App CAGP UFMG

> **Portal Institucional & Super App Discente — Bacharelado em Gestão Pública (FAFICH/UFMG)**  
> **Versão:** 3.0.0 (`cagp-ufmg-superapp`)  
> **Status:** Proposta de Super App Discente (Entrega final prevista: Fim de Fevereiro de 2027)

---

## Documentação Modular Completa

A documentação detalhada da arquitetura técnica, dividida por subsistemas e com foco em modularidade, manutenibilidade e escalabilidade, está organizada no diretório [`docs/architecture/`](file:///home/gsathler/Nextcloud/Projects/cagp/docs/architecture/):

| Capítulo | Descrição e Conteúdo |
| :--- | :--- |
| [**README (Índice Central)**](file:///home/gsathler/Nextcloud/Projects/cagp/docs/architecture/README.md) | Mapa geral de navegação técnica e visão consolidada dos capítulos. |
| [**00. Visão Geral & Paradigma Modular**](file:///home/gsathler/Nextcloud/Projects/cagp/docs/architecture/00-overview.md) | Filosofia de Micro-Apps, divisão em 3 camadas (*Core Rules*, *Data*, *UI*) e paradigma Zero-Server. |
| [**01. Arquitetura Orientada a Registros**](file:///home/gsathler/Nextcloud/Projects/cagp/docs/architecture/01-registry-system.md) | Catálogo único da verdade ([`navigationRegistry.ts`](file:///home/gsathler/Nextcloud/Projects/cagp/src/lib/navigationRegistry.ts) e [`shortcutsCatalog.ts`](file:///home/gsathler/Nextcloud/Projects/cagp/src/lib/shortcutsCatalog.ts)). |
| [**02. Estado Local & Barramento de Eventos**](file:///home/gsathler/Nextcloud/Projects/cagp/docs/architecture/02-event-bus-and-vault.md) | Contratos Zod do Student Vault, persistência no `localStorage`, eventos `cagp:vault-updated` e motor de acessibilidade. |
| [**03. Funções & Motores de Negócio**](file:///home/gsathler/Nextcloud/Projects/cagp/docs/architecture/03-modules-and-functions.md) | Calculadora 600h, Guardião do Prazo de 120 dias (Art. 15), Simulador de Estágio (Art. 41) e Grafo 10P. |
| [**04. Camada de Dados & Content Collections**](file:///home/gsathler/Nextcloud/Projects/cagp/docs/architecture/04-content-collections.md) | Catálogo de 95 disciplinas, resoluções em JSON, e isolamento de dados simulados até fev/2027. |
| [**05. Casca Global & Orquestração de Telas**](file:///home/gsathler/Nextcloud/Projects/cagp/docs/architecture/05-app-shell-and-sheets.md) | [`BaseLayout.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/layouts/BaseLayout.astro), orquestrador [`GlobalSheets.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/GlobalSheets.tsx), busca Spotlight (⌘K) e responsividade multi-dispositivo. |
| [**06. Playbooks de Extensibilidade**](file:///home/gsathler/Nextcloud/Projects/cagp/docs/architecture/06-extensibility-playbooks.md) | Receitas passo a passo: como criar novos micro-apps, atualizar regras normativas e adicionar novos modais. |

---

## Síntese Executiva

- **PWA Offline-First:** Compilado como site estático (SSG) via Astro 7, com hidratação seletiva de ilhas React 19 e Service Worker com estratégia Anti-Lie-Fi (timeout de 2,5s).
- **Zero-Server / Soberania Discente:** Dados do estudante salvos exclusivamente no dispositivo do usuário, garantindo privacidade plena sem backend centralizado.
- **Conformidade Normativa com o PPC 2020:** Algoritmos em TypeScript puro que refletem fielmente as 300h de Extensão, 300h de AAC, trava de 120 dias e pré-requisitos acadêmicos do Colegiado DCP/UFMG.
