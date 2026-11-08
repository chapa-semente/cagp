# Part 6: Shell Navigation Islands, 26 Astro Pages & Dynamic Modes (`05-shell-navigation-and-pages.md`)

## Executive Summary

This document evaluates the global application shell (`BaseLayout.astro`, `src/components/shell/`) and all **26 Astro route pages** (`src/pages/`), formalizing the **Smart Scroll CampaignBanner**, the **3 Dynamic Visitor Modes** (`Persuade`, `Operate`, `Read`), and mobile touch ergonomics grounded in Apple HIG.

---

## 1. Global Shell & Navigation Islands (21 Active Components)

Located in [`src/components/shell/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell):

| Shell Island | Architecture Role | Ergonomics & Safe-Area |
| :--- | :--- | :--- |
| [`A11ySheet.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/A11ySheet.tsx) | Acessibilidade Rápida | Touch targets 44pt / Focus trap |
| [`A11yTabContent.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/A11yTabContent.tsx) | Seletores de Fonte/Tema | 44pt altura tátil / feedback direto |
| [`AppShellSidebar.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/AppShellSidebar.astro) | Sidebar Desktop Base | Transições fluidas de largura |
| [`AppShellSidebarIsland.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/AppShellSidebarIsland.tsx) | Gaveta Móvel & Desktop | Z-index 1100 (sobrepõe banner) |
| [`AxisNavBar.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/AxisNavBar.astro) | Pílulas do Eixo Ativo | `.scroll-mask-x` / 44pt de altura |
| [`AxisOverview.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/AxisOverview.astro) | Resumo do Eixo Temático | Cartões Neobrutalistas rL9Ap |
| [`BackToTop.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/BackToTop.astro) | Botão Voltar ao Topo | 44x44pt / offset inferior móvel |
| [`BottomNav.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/BottomNav.astro) | 5 Eixos Mobile (< 768px) | `pb-[env(safe-area-inset-bottom)]` / 48px |
| [`BottomSheet.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/BottomSheet.tsx) | Gaveta Inferior Vaul | Gesto de arraste para baixo / mola |
| [`CampaignBanner.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/CampaignBanner.astro) | Banner Chapa Semente | **Smart Scroll**: colapso para 24px no scroll-down |
| [`CampusSheet.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/CampusSheet.tsx) | Plantão Noturno & RU II | Status ao vivo / horários circulares |
| [`DynamicToast.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/DynamicToast.astro) | Dynamic Island Toast | Z-index 1060 / Alertas de campus |
| [`GlobalCanvasBackdrop.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/GlobalCanvasBackdrop.tsx) | Backdrop WebGL Reativo | 60fps sempre ativo (ignora `prefers-reduced-motion`) |
| [`GlobalContextMenu.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/GlobalContextMenu.tsx) | Menu de Contexto | Long-press no mobile / 44pt itens |
| [`GlobalSheets.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/GlobalSheets.tsx) | Despachante de Modais | Radix Dialog / Vaul integration |
| [`PageFooter.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/PageFooter.astro) | Rodapé Institucional | Licença MIT / Respeita BottomNav |
| [`PassportSheet.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/PassportSheet.tsx) | Modal Passaporte Discente | Editor de avatar e selos candangos |
| [`SettingsTabContent.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/SettingsTabContent.tsx) | Preferências Discentes | Switches acessíveis de 44pt |
| [`ShortcutsSheet.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/ShortcutsSheet.tsx) | Consulta de Atalhos (⌘K) | Modal desktop de produtividade |
| [`SuperAppHeader.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/SuperAppHeader.astro) | Topbar Mobile Sub-rotas | 44x44pt botões / safe-area-inset-top |
| [`SuperAppWelcomeModal.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/shell/SuperAppWelcomeModal.tsx) | Onboarding & Perfil | Cartões táteis de momento discente |

---

## 2. Astro Pages Inventory (Total de 26 Rotas Compiladas)

Located in [`src/pages/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages):

| Rota | Caminho do Arquivo | Modo Alvo | Descrição da Experiência Discente |
| :--- | :--- | :---: | :--- |
| `/` | [`src/pages/index.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/index.astro) | `Operate` | Cockpit discente dinâmico (Hoje & Campus) |
| `/noticias` | [`src/pages/noticias/index.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/noticias/index.astro) | `Read` | Mural de notícias, editais e informes da FAFICH |
| `/noticias/[slug]` | [`src/pages/noticias/[slug].astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/noticias/[slug].astro) | `Read` | Leitor de notícia individual com tipografia 65–75ch |
| `/curso` | [`src/pages/curso.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/curso.astro) | `Operate` | O Bacharelado, história dos Candangos e colegiado |
| `/calouros` | [`src/pages/calouros.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/calouros.astro) | `Operate` | Guia de Sobrevivência (Checklist 30d, RU II, Circulares) |
| `/permanencia` | [`src/pages/permanencia.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/permanencia.astro) | `Operate` | Assistência Estudantil, FUMP e auxílios de moradia |
| `/pesquisa` | [`src/pages/pesquisa.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/pesquisa.astro) | `Read` | Núcleos de pesquisa, laboratórios e editais de IC |
| `/cursos` | [`src/pages/cursos.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/cursos.astro) | `Operate` | Catálogo de cursos livres de extensão ENAP/EV.G |
| `/percurso` | [`src/pages/percurso.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/percurso.astro) | `Operate` | Grafo de disciplinas de 10 períodos e travas SIGA |
| `/optativas` | [`src/pages/optativas.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/optativas.astro) | `Operate` | Vitrine e busca TanStack de disciplinas optativas |
| `/acg` | [`src/pages/acg.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/acg.astro) | `Operate` | Central 600h: Calculadora Extensão/AAC e Guardião 120d |
| `/carreira` | [`src/pages/carreira.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/carreira.astro) | `Operate` | Banco de Talentos Discentes e editais de estágio |
| `/estagio` | [`src/pages/estagio.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/estagio.astro) | `Operate` | Estágio Supervisionado (300h) e Art. 41 para servidores |
| `/tcc` | [`src/pages/tcc.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/tcc.astro) | `Read` | Manual de Monografia, cronograma de bancas e modelos |
| `/estagio-tcc` | [`src/pages/estagio-tcc.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/estagio-tcc.astro) | `Operate` | Hub integrador de pendências de formatura |
| `/sobre` | [`src/pages/sobre.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/sobre.astro) | `Read` | História do CAGP, governança, sede F-4000 e estatuto |
| `/transparencia` | [`src/pages/transparencia.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/transparencia.astro) | `Persuade` | Cockpit Contábil Discente (Livro-Caixa e RREO) |
| `/gestao` | [`src/pages/gestao.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/gestao.astro) | `Operate` | Diretorias Executivas, equipe e contato com as pastas |
| `/ouvidoria` | [`src/pages/ouvidoria.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/ouvidoria.astro) | `Operate` | Canal confidencial de ouvidoria discente e denúncias |
| `/documentos` | [`src/pages/documentos.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/documentos.astro) | `Read` | Repositório digital de resoluções, atas e formulários |
| `/documentos/[slug]` | [`src/pages/documentos/[slug].astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/documentos/[slug].astro) | `Read` | Visualizador de norma oficial com sumário sob demanda |
| `/chapa-semente` | [`src/pages/chapa-semente.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/chapa-semente.astro) | `Persuade` | Carta-Programa oficial: 4 eixos, 14 propostas e edital |
| `/faq` | [`src/pages/faq.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/faq.astro) | `Read` | Central de dúvidas frequentes e assistente IA discente |
| `/mapa-do-site` | [`src/pages/mapa-do-site.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/mapa-do-site.astro) | `Read` | Árvore de rotas estruturada pelos 5 eixos temáticos |
| `/configuracoes` | [`src/pages/configuracoes.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/configuracoes.astro) | `Operate` | Acessibilidade (OpenDyslexic), tema e cofre local |
| `/404` | [`src/pages/404.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/404.astro) | `Persuade` | Página de erro neobrutalista temática FAFICH |

---

## 3. Arquitetura dos 3 Modos Dinâmicos de Visitação

1. **`mode="persuade"`**:
   - Usado em páginas de alto impacto de campanha (`chapa-semente`, `transparencia`).
   - O cabeçalho visual BoldKit ([`HeroCentered`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/boldkit/blocks/hero-section.tsx)) assume a apresentação, eliminando o `PageHeader.astro` duplicado.
2. **`mode="operate"`**:
   - Usado em rotas utilitárias onde o aluno quer ferramentas imediatas (`acg`, `percurso`, `estagio`, `calouros`).
   - O `PageHeader.astro` adota variante condensada (apenas 1 badge essencial e pílulas de navegação), garantindo que simuladores fiquem visíveis no primeiro viewport móvel.
3. **`mode="read"`**:
   - Usado em acervos documentais e informativos (`documentos`, `noticias`, `faq`, `sobre`).
   - Largura de linha limitada a 65–75ch, com tipografia de alto conforto e ausência de banners laterais concorrentes.

---

## 4. Política do CampaignBanner Dinâmico no Scroll

Para proteger a área útil de tela em smartphones (< 768px):
- **Ao rolar para baixo (> 80px)**: A faixa de 68px colapsa suavemente em uma micro-faixa tricolor de **24px** com o botão tátil `"Compromisso ▼"`.
- **Ao rolar para cima**: Restaura o banner completo com física suave.
- **Persistência local**: Salva a preferência em `localStorage.getItem('cagp_banner_minimized')`.

---

## 5. PWA & Offline Multiplatform Architecture

- **Manifest**: Em `public/manifest.webmanifest`, definindo ícones (192px, 512px, maskable), cor temática (`#5B2A86`) e modo standalone.
- **Service Worker**: Gerado via `scripts/generate-sw-manifest.mjs`, cacheando assets, fontes e páginas offline.
- **Cofre Discente**: `src/lib/storage/studentVault.ts` garante persistência local de notas, horas 600h e perfil sem necessidade de internet.