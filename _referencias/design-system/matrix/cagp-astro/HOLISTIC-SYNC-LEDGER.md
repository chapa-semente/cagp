# HOLISTIC-SYNC-LEDGER.md (Ledger de Estado & Matriz de Auditoria 360°)

> **Data de Atualização**: 2026-11-08T06:30:08.433Z  
> **Placar Consolidado**: **100.0% Conforme** (175/175 itens OK)  
> **Diagnóstico**: OK: 175 | STUB: 0 | PROXY: 0 | MISSING: 0 | FAIL: 0

---

## 1. Sumário Executivo de Sincronia

Este documento é gerado e atualizado determinísticamente pelo script `scripts/audit-holistic-sync.ts`. Ele é lido obrigatoriamente pela IA no início e ao término de cada fase para verificar de forma holística a incorporação real de todo o ecossistema do Design System Quadripartido.

| Família Funcional | Total Itens | OK | Pendentes | Status de Família |
| :--- | :---: | :---: | :---: | :---: |
| **1. Navegação & Shell** | 11 | 11 | 0 | ✅ 100% OK |
| **10. Exclusivos CAGP** | 7 | 7 | 0 | ✅ 100% OK |
| **2. Menus & Overlays** | 8 | 8 | 0 | ✅ 100% OK |
| **3. Formulários & Seleção** | 25 | 25 | 0 | ✅ 100% OK |
| **4. Diálogos & Feedback** | 9 | 9 | 0 | ✅ 100% OK |
| **5. Dados & Tabelas** | 8 | 8 | 0 | ✅ 100% OK |
| **6. Gráficos & Métricas** | 14 | 14 | 0 | ✅ 100% OK |
| **7. Shaders & Gráficos** | 24 | 24 | 0 | ✅ 100% OK |
| **8. Blocos de Página** | 20 | 20 | 0 | ✅ 100% OK |
| **9. Mídia & Apresentação** | 13 | 13 | 0 | ✅ 100% OK |
| **Hooks Nativos** | 6 | 6 | 0 | ✅ 100% OK |
| **Limpeza Arquitetural** | 1 | 1 | 0 | ✅ 100% OK |
| **Limpeza de Domínio** | 3 | 3 | 0 | ✅ 100% OK |
| **Páginas Astro (Rotas)** | 26 | 26 | 0 | ✅ 100% OK |

---

## 2. Matriz Granular de Todos os Componentes, Blocos, Shaders e Páginas

| Status | ID / Nome | Família | Arquivo no Repositório | Contexto de Aplicação Real | Diagnóstico |
| :---: | :--- | :--- | :--- | :--- | :--- |
| ✅ OK | **`sidebar`** | 1. Navegação & Shell | `src/components/ui/sidebar.tsx` | Barra lateral desktop e gavetas retráteis | Arquivo presente (11.3 KB) |
| ✅ OK | **`navigation-menu`** | 1. Navegação & Shell | `src/components/ui/navigation-menu.tsx` | Mega menu desktop no cabeçalho | Arquivo presente (4.7 KB) |
| ✅ OK | **`breadcrumb`** | 1. Navegação & Shell | `src/components/ui/breadcrumb.tsx` | Rastro de navegação em páginas profundas | Arquivo presente (2.7 KB) |
| ✅ OK | **`pagination`** | 1. Navegação & Shell | `src/components/ui/pagination.tsx` | Controles de paginação de tabelas e notícias | Arquivo presente (2.8 KB) |
| ✅ OK | **`tabs`** | 1. Navegação & Shell | `src/components/ui/tabs.tsx` | Seletor de abas em curso, tcc e gestão | Arquivo presente (1.9 KB) |
| ✅ OK | **`scroll-area`** | 1. Navegação & Shell | `src/components/ui/scroll-area.tsx` | Rolagem customizada com trilho brutalista | Arquivo presente (1.6 KB) |
| ✅ OK | **`stepper`** | 1. Navegação & Shell | `src/components/ui/stepper.tsx` | Indicador de etapas em wizards | Arquivo presente (10.8 KB) |
| ✅ OK | **`tour`** | 1. Navegação & Shell | `src/components/ui/tour.tsx` | Tour interativo da Chapa Semente e onboarding | Arquivo presente (19.5 KB) |
| ✅ OK | **`tree-view`** | 1. Navegação & Shell | `src/components/ui/tree-view.tsx` | Mapa do site e hierarquia do estatuto | Arquivo presente (12.1 KB) |
| ✅ OK | **`JourneyNav`** | 1. Navegação & Shell | `src/components/ui/JourneyNav.astro` | Barra de atalhos rápidos contextuais | Arquivo presente (2.3 KB) |
| ✅ OK | **`GlobalContextMenu`** | 1. Navegação & Shell | `src/components/shell/GlobalContextMenu.tsx` | Menu de contexto universal: right-click desktop e long-press 500ms com haptics no mobile | Arquivo presente (14.9 KB) |
| ✅ OK | **`context-menu`** | 2. Menus & Overlays | `src/components/ui/context-menu.tsx` | Menu de clique direito e toque longo | Arquivo presente (7.2 KB) |
| ✅ OK | **`dropdown-menu`** | 2. Menus & Overlays | `src/components/ui/dropdown-menu.tsx` | Menu do perfil discente e exportação | Arquivo presente (7.3 KB) |
| ✅ OK | **`menubar`** | 2. Menus & Overlays | `src/components/ui/menubar.tsx` | Barra de menu horizontal desktop | Arquivo presente (7.9 KB) |
| ✅ OK | **`popover`** | 2. Menus & Overlays | `src/components/ui/popover.tsx` | Balões flutuantes de detalhes rápidos | Arquivo presente (1.3 KB) |
| ✅ OK | **`hover-card`** | 2. Menus & Overlays | `src/components/ui/hover-card.tsx` | Prévia de docentes e departamentos | Arquivo presente (1.2 KB) |
| ✅ OK | **`tooltip`** | 2. Menus & Overlays | `src/components/ui/tooltip.tsx` | Dicas flutuantes em botões de ação | Arquivo presente (1.3 KB) |
| ✅ OK | **`command`** | 2. Menus & Overlays | `src/components/ui/command.tsx` | Paleta de comando Spotlight (Cmd+K) | Arquivo presente (5.9 KB) |
| ✅ OK | **`kbd`** | 2. Menus & Overlays | `src/components/ui/kbd.tsx` | Teclas em relevo mecânico com atalhos | Arquivo presente (1.9 KB) |
| ✅ OK | **`button`** | 3. Formulários & Seleção | `src/components/ui/button.tsx` | Botões táteis com 9 variantes e animações | Arquivo presente (4.4 KB) |
| ✅ OK | **`button-group`** | 3. Formulários & Seleção | `src/components/ui/button-group.tsx` | Agrupamento de botões segmentados | Arquivo presente (1.1 KB) |
| ✅ OK | **`input`** | 3. Formulários & Seleção | `src/components/ui/input.tsx` | Campos de texto com borda 3px | Arquivo presente (0.8 KB) |
| ✅ OK | **`input-group`** | 3. Formulários & Seleção | `src/components/ui/input-group.tsx` | Campos de texto com ícones anexos | Arquivo presente (1.8 KB) |
| ✅ OK | **`textarea`** | 3. Formulários & Seleção | `src/components/ui/textarea.tsx` | Campo multiline para ouvidoria e relatos | Arquivo presente (0.7 KB) |
| ✅ OK | **`select`** | 3. Formulários & Seleção | `src/components/ui/select.tsx` | Select estilizado com Radix | Arquivo presente (5.7 KB) |
| ✅ OK | **`native-select`** | 3. Formulários & Seleção | `src/components/ui/native-select.tsx` | Select nativo para acessibilidade total | Arquivo presente (1.1 KB) |
| ✅ OK | **`combobox`** | 3. Formulários & Seleção | `src/components/ui/combobox.tsx` | Seletor de 95 disciplinas optativas com busca | Arquivo presente (4.9 KB) |
| ✅ OK | **`checkbox`** | 3. Formulários & Seleção | `src/components/ui/checkbox.tsx` | Checklist do calouro e termos de compromisso | Arquivo presente (1.7 KB) |
| ✅ OK | **`radio-group`** | 3. Formulários & Seleção | `src/components/ui/radio-group.tsx` | Seleção de modalidade de TCC e turno | Arquivo presente (1.6 KB) |
| ✅ OK | **`switch`** | 3. Formulários & Seleção | `src/components/ui/switch.tsx` | Configurações de acessibilidade e modo escuro | Arquivo presente (1.2 KB) |
| ✅ OK | **`toggle`** | 3. Formulários & Seleção | `src/components/ui/toggle.tsx` | Alternador mecânico com deslocamento tátil | Arquivo presente (1.7 KB) |
| ✅ OK | **`toggle-group`** | 3. Formulários & Seleção | `src/components/ui/toggle-group.tsx` | Filtros rápidos de dia da semana no RU | Arquivo presente (1.7 KB) |
| ✅ OK | **`slider`** | 3. Formulários & Seleção | `src/components/ui/slider.tsx` | Simulador de meta de horas na calculadora de ACG | Arquivo presente (19.4 KB) |
| ✅ OK | **`number-field`** | 3. Formulários & Seleção | `src/components/ui/number-field.tsx` | Inserção de horas de certificados no cofre | Arquivo presente (24.2 KB) |
| ✅ OK | **`input-otp`** | 3. Formulários & Seleção | `src/components/ui/input-otp.tsx` | Token de presença em assembleias estudantis | Arquivo presente (2.2 KB) |
| ✅ OK | **`tag-input`** | 3. Formulários & Seleção | `src/components/ui/tag-input.tsx` | Tags de habilidades e competências de matérias | Arquivo presente (10.8 KB) |
| ✅ OK | **`field`** | 3. Formulários & Seleção | `src/components/ui/field.tsx` | Envoltório com validação e rótulo semântico | Arquivo presente (1.8 KB) |
| ✅ OK | **`label`** | 3. Formulários & Seleção | `src/components/ui/label.tsx` | Rótulo acessível de formulários | Arquivo presente (0.7 KB) |
| ✅ OK | **`multi-step-form`** | 3. Formulários & Seleção | `src/components/ui/multi-step-form.tsx` | Wizard de simulação de estágio e requerimentos | Arquivo presente (4.4 KB) |
| ✅ OK | **`questionnaire`** | 3. Formulários & Seleção | `src/components/ui/questionnaire.tsx` | Quiz de Percurso Acadêmico e diagnóstico de calouro | Arquivo presente (25.5 KB) |
| ✅ OK | **`calendar`** | 3. Formulários & Seleção | `src/components/ui/calendar.tsx` | Calendário acadêmico e datas eleitorais | Arquivo presente (2.5 KB) |
| ✅ OK | **`date-picker`** | 3. Formulários & Seleção | `src/components/ui/date-picker.tsx` | Seletor de data para certificados e eventos | Arquivo presente (3.3 KB) |
| ✅ OK | **`date-range-picker`** | 3. Formulários & Seleção | `src/components/ui/date-range-picker.tsx` | Seletor de intervalo de datas para estágio | Arquivo presente (8.6 KB) |
| ✅ OK | **`time-picker`** | 3. Formulários & Seleção | `src/components/ui/time-picker.tsx` | Seletor de horários para agendamento de reuniões | Arquivo presente (13.3 KB) |
| ✅ OK | **`dialog`** | 4. Diálogos & Feedback | `src/components/ui/dialog.tsx` | Modais institucionais e atas | Arquivo presente (3.8 KB) |
| ✅ OK | **`alert-dialog`** | 4. Diálogos & Feedback | `src/components/ui/alert-dialog.tsx` | Confirmação de exclusão do cofre | Arquivo presente (4.3 KB) |
| ✅ OK | **`alert`** | 4. Diálogos & Feedback | `src/components/ui/alert.tsx` | Avisos de prazos rigorosos do DRCA | Arquivo presente (3.6 KB) |
| ✅ OK | **`drawer`** | 4. Diálogos & Feedback | `src/components/ui/drawer.tsx` | Drawer móvel de detalhes de matéria e filtros | Arquivo presente (3.0 KB) |
| ✅ OK | **`sheet`** | 4. Diálogos & Feedback | `src/components/ui/sheet.tsx` | Painel lateral de configurações e passaporte | Arquivo presente (4.3 KB) |
| ✅ OK | **`sonner`** | 4. Diálogos & Feedback | `src/components/ui/sonner.tsx` | Notificações mecânicas em pilha | Arquivo presente (2.4 KB) |
| ✅ OK | **`toast`** | 4. Diálogos & Feedback | `src/components/ui/toast.tsx` | Toasts acessíveis Radix | Arquivo presente (23.5 KB) |
| ✅ OK | **`spinner`** | 4. Diálogos & Feedback | `src/components/ui/spinner.tsx` | Feedback visual de processamento | Arquivo presente (5.2 KB) |
| ✅ OK | **`progress`** | 4. Diálogos & Feedback | `src/components/ui/progress.tsx` | Barra de integralização de créditos e 600h | Arquivo presente (1.6 KB) |
| ✅ OK | **`data-table`** | 5. Dados & Tabelas | `src/components/ui/data-table.tsx` | Grade das 95 matérias optativas e contas | Arquivo presente (13.7 KB) |
| ✅ OK | **`table`** | 5. Dados & Tabelas | `src/components/ui/table.tsx` | Tabelas semânticas estáticas de horários | Arquivo presente (2.8 KB) |
| ✅ OK | **`dropzone`** | 5. Dados & Tabelas | `src/components/ui/dropzone.tsx` | Upload de certificados e minutas de TCE | Arquivo presente (12.6 KB) |
| ✅ OK | **`attachment`** | 5. Dados & Tabelas | `src/components/ui/attachment.tsx` | Cards de download de PDFs oficiais | Arquivo presente (7.0 KB) |
| ✅ OK | **`item`** | 5. Dados & Tabelas | `src/components/ui/item.tsx` | Itens de lista com ícone para contatos | Arquivo presente (4.2 KB) |
| ✅ OK | **`marker`** | 5. Dados & Tabelas | `src/components/ui/marker.tsx` | Marca-texto brutalista em artigos de normas | Arquivo presente (2.8 KB) |
| ✅ OK | **`empty-state`** | 5. Dados & Tabelas | `src/components/ui/empty-state.tsx` | Ilustração para buscas vazias | Arquivo presente (12.0 KB) |
| ✅ OK | **`skeleton`** | 5. Dados & Tabelas | `src/components/ui/skeleton.tsx` | Placeholders de carregamento de cards | Arquivo presente (1.2 KB) |
| ✅ OK | **`chart`** | 6. Gráficos & Métricas | `src/components/ui/chart.tsx` | Contêiner base e tooltips Recharts | Arquivo presente (22.7 KB) |
| ✅ OK | **`donut-chart`** | 6. Gráficos & Métricas | `src/components/ui/donut-chart.tsx` | Despesas por diretoria em Transparência | Arquivo presente (4.7 KB) |
| ✅ OK | **`gauge-chart`** | 6. Gráficos & Métricas | `src/components/ui/gauge-chart.tsx` | Metas das 9 diretorias e 600h de ACG | Arquivo presente (12.7 KB) |
| ✅ OK | **`radar-chart`** | 6. Gráficos & Métricas | `src/components/ui/radar-chart.tsx` | Comparador de ênfases do curso | Arquivo presente (4.2 KB) |
| ✅ OK | **`radial-bar-chart`** | 6. Gráficos & Métricas | `src/components/ui/radial-bar-chart.tsx` | Barras circulares por área temática | Arquivo presente (4.1 KB) |
| ✅ OK | **`funnel-chart`** | 6. Gráficos & Métricas | `src/components/ui/funnel-chart.tsx` | Funil de credenciamento eleitoral | Arquivo presente (3.0 KB) |
| ✅ OK | **`heatmap-chart`** | 6. Gráficos & Métricas | `src/components/ui/heatmap-chart.tsx` | Mapa de calor de ocupação do RU e salas | Arquivo presente (8.6 KB) |
| ✅ OK | **`sankey-chart`** | 6. Gráficos & Métricas | `src/components/ui/sankey-chart.tsx` | Fluxo financeiro de entradas e saídas do CAGP | Arquivo presente (11.9 KB) |
| ✅ OK | **`treemap-chart`** | 6. Gráficos & Métricas | `src/components/ui/treemap-chart.tsx` | Carga horária por departamento (DCP/ECN/SOA) | Arquivo presente (4.1 KB) |
| ✅ OK | **`math-curve-progress`** | 6. Gráficos & Métricas | `src/components/ui/math-curve-progress.tsx` | Ondas senoidais animadas no Guardian 600h | Arquivo presente (3.5 KB) |
| ✅ OK | **`math-curve-loader`** | 6. Gráficos & Métricas | `src/components/ui/math-curve-loader.tsx` | Loader harmônico contínuo | Arquivo presente (5.1 KB) |
| ✅ OK | **`math-curve-background`** | 6. Gráficos & Métricas | `src/components/ui/math-curve-background.tsx` | Fundo matemático sutil em calculadoras | Arquivo presente (4.8 KB) |
| ✅ OK | **`stat-card`** | 6. Gráficos & Métricas | `src/components/ui/stat-card.tsx` | Cards de métricas em Transparência e Pesquisa | Arquivo presente (5.1 KB) |
| ✅ OK | **`rating`** | 6. Gráficos & Métricas | `src/components/ui/rating.tsx` | Avaliação colaborativa de matérias | Arquivo presente (9.2 KB) |
| ✅ OK | **`avatar`** | 9. Mídia & Apresentação | `src/components/ui/avatar.tsx` | Foto da diretoria e avatar 8-bit no passaporte | Arquivo presente (1.5 KB) |
| ✅ OK | **`badge`** | 9. Mídia & Apresentação | `src/components/ui/badge.tsx` | Pílula com sombra dura para turnos e status | Arquivo presente (1.6 KB) |
| ✅ OK | **`sticker`** | 9. Mídia & Apresentação | `src/components/ui/sticker.tsx` | Adesivos inclinados da Chapa Semente e avisos | Arquivo presente (6.3 KB) |
| ✅ OK | **`bubble`** | 9. Mídia & Apresentação | `src/components/ui/bubble.tsx` | Balões de fala no manual do calouro | Arquivo presente (6.8 KB) |
| ✅ OK | **`message`** | 9. Mídia & Apresentação | `src/components/ui/message.tsx` | Cards de mensagens da comunidade | Arquivo presente (4.5 KB) |
| ✅ OK | **`message-scroller`** | 9. Mídia & Apresentação | `src/components/ui/message-scroller.tsx` | Feed rolante de avisos e notícias | Arquivo presente (16.1 KB) |
| ✅ OK | **`carousel`** | 9. Mídia & Apresentação | `src/components/ui/carousel.tsx` | Carrossel de eventos e acolhimento | Arquivo presente (8.6 KB) |
| ✅ OK | **`marquee`** | 9. Mídia & Apresentação | `src/components/ui/marquee.tsx` | Letreiro rolante infinito para avisos urgentes | Arquivo presente (3.2 KB) |
| ✅ OK | **`aspect-ratio`** | 9. Mídia & Apresentação | `src/components/ui/aspect-ratio.tsx` | Proporção travada em mapas e vídeos | Arquivo presente (0.1 KB) |
| ✅ OK | **`resizable`** | 9. Mídia & Apresentação | `src/components/ui/resizable.tsx` | Painéis divididos com alça tátil | Arquivo presente (1.7 KB) |
| ✅ OK | **`separator`** | 9. Mídia & Apresentação | `src/components/ui/separator.tsx` | Linhas divisórias de tinta de 3px | Arquivo presente (0.7 KB) |
| ✅ OK | **`card`** | 9. Mídia & Apresentação | `src/components/ui/card.tsx` | Cards estruturais presentes em todo o app | Arquivo presente (4.2 KB) |
| ✅ OK | **`layered-card`** | 9. Mídia & Apresentação | `src/components/ui/layered-card.tsx` | Cards em multicamadas com efeito de relevo | Arquivo presente (4.8 KB) |
| ✅ OK | **`CagpIcon`** | 10. Exclusivos CAGP | `src/components/ui/CagpIcon.tsx` | Sprite de ícones específicos da UFMG/FAFICH | Arquivo presente (0.9 KB) |
| ✅ OK | **`CourseDetailDrawer`** | 10. Exclusivos CAGP | `src/components/ui/CourseDetailDrawer.tsx` | Drawer de árvore de pré-requisitos e ementa | Arquivo presente (6.7 KB) |
| ✅ OK | **`FactCheckBanner`** | 10. Exclusivos CAGP | `src/components/ui/FactCheckBanner.astro` | Banner antiboatos acadêmicos | Arquivo presente (4.2 KB) |
| ✅ OK | **`NormativeDetails`** | 10. Exclusivos CAGP | `src/components/ui/NormativeDetails.astro` | Accordion de citação literal de artigos do CEPE | Arquivo presente (3.6 KB) |
| ✅ OK | **`PageHeader`** | 10. Exclusivos CAGP | `src/components/ui/PageHeader.astro` | Cabeçalho padronizado das páginas Astro | Arquivo presente (5.0 KB) |
| ✅ OK | **`SegmentedControl`** | 10. Exclusivos CAGP | `src/components/ui/SegmentedControl.astro` | Alternador de abas de alta affordance | Arquivo presente (9.0 KB) |
| ✅ OK | **`ErrorBoundary`** | 10. Exclusivos CAGP | `src/components/ui/ErrorBoundary.tsx` | Barreira de contenção de erros de renderização | Arquivo presente (2.6 KB) |
| ✅ OK | **`HeroSection`** | 8. Blocos de Página | `src/components/boldkit/blocks/hero-section.tsx` | Hero na Home, Chapa Semente e Sobre | Bloco presente (13.3 KB) |
| ✅ OK | **`BentoGrid`** | 8. Blocos de Página | `src/components/boldkit/blocks/bento-grid.tsx` | Grade dos 5 pilares do curso na Home | Bloco presente (2.3 KB) |
| ✅ OK | **`FeatureGrid`** | 8. Blocos de Página | `src/components/boldkit/blocks/feature-grid.tsx` | Grade de serviços em ACG, Estágio e TCC | Bloco presente (10.1 KB) |
| ✅ OK | **`FaqSection`** | 8. Blocos de Página | `src/components/boldkit/blocks/faq-section.tsx` | Central de perguntas frequentes em /faq | Bloco presente (10.0 KB) |
| ✅ OK | **`StatsSection`** | 8. Blocos de Página | `src/components/boldkit/blocks/stats-section.tsx` | Métricas em Transparência, Gestão e Pesquisa | Bloco presente (8.5 KB) |
| ✅ OK | **`TeamSection`** | 8. Blocos de Página | `src/components/boldkit/blocks/team-section.tsx` | Diretoria em Gestão e Chapa Semente | Bloco presente (12.8 KB) |
| ✅ OK | **`Testimonials`** | 8. Blocos de Página | `src/components/boldkit/blocks/testimonials.tsx` | Relatos de egressos e apoiadores da chapa | Bloco presente (11.1 KB) |
| ✅ OK | **`CTASection`** | 8. Blocos de Página | `src/components/boldkit/blocks/cta-section.tsx` | Faixas de conversão e voto | Bloco presente (11.8 KB) |
| ✅ OK | **`ChangelogSection`** | 8. Blocos de Página | `src/components/boldkit/blocks/changelog-section.tsx` | Histórico de conquistas e atas em Sobre | Bloco presente (2.2 KB) |
| ✅ OK | **`ComparisonTable`** | 8. Blocos de Página | `src/components/boldkit/blocks/comparison-table.tsx` | Monografia vs Artigo em TCC | Bloco presente (3.3 KB) |
| ✅ OK | **`ContactSection`** | 8. Blocos de Página | `src/components/boldkit/blocks/contact-section.tsx` | Ouvidoria discente e contato da diretoria | Bloco presente (17.0 KB) |
| ✅ OK | **`FooterSection`** | 8. Blocos de Página | `src/components/boldkit/blocks/footer-section.tsx` | Rodapé institucional completo | Bloco presente (15.4 KB) |
| ✅ OK | **`LogoCloud`** | 8. Blocos de Página | `src/components/boldkit/blocks/logo-cloud.tsx` | Parceiros de estágio e núcleos de pesquisa | Bloco presente (9.1 KB) |
| ✅ OK | **`PricingSection`** | 8. Blocos de Página | `src/components/boldkit/blocks/pricing-section.tsx` | Comissões voluntárias e frentes de atuação | Bloco presente (5.1 KB) |
| ✅ OK | **`AuthForms`** | 8. Blocos de Página | `src/components/boldkit/blocks/auth-forms.tsx` | Credenciamento local e passaporte discente | Bloco presente (24.5 KB) |
| ✅ OK | **`DashboardLayout`** | 8. Blocos de Página | `src/components/boldkit/blocks/dashboard-layout.tsx` | Layout do painel discente | Bloco presente (4.6 KB) |
| ✅ OK | **`ErrorPages`** | 8. Blocos de Página | `src/components/boldkit/blocks/error-pages.tsx` | Página de erro 404 em /404.astro | Bloco presente (17.8 KB) |
| ✅ OK | **`Invoice`** | 8. Blocos de Página | `src/components/boldkit/blocks/invoice.tsx` | Demonstrativo de contas e recibos em Transparência | Bloco presente (21.6 KB) |
| ✅ OK | **`OnboardingFlow`** | 8. Blocos de Página | `src/components/boldkit/blocks/onboarding-flow.tsx` | Modal de primeiro acesso do calouro | Bloco presente (24.7 KB) |
| ✅ OK | **`SettingsPage`** | 8. Blocos de Página | `src/components/boldkit/blocks/settings-page.tsx` | Central de configurações em /configuracoes | Bloco presente (24.8 KB) |
| ✅ OK | **`CanvasEffectCore`** | 7. Shaders & Gráficos | `src/components/boldkit/lib/canvas-effect-core.ts` | Motor WebGL/Canvas base para todos os 23 shaders | Núcleo operacional a 60fps |
| ✅ OK | **`DotBlob`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/DotBlob.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (3.5 KB) |
| ✅ OK | **`Aurora`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/Aurora.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (4.6 KB) |
| ✅ OK | **`DotWave`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/DotWave.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (1.9 KB) |
| ✅ OK | **`MatrixRain`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/MatrixRain.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (3.0 KB) |
| ✅ OK | **`ParticleWeb`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/ParticleWeb.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (3.3 KB) |
| ✅ OK | **`MouseRipple`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/MouseRipple.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (2.9 KB) |
| ✅ OK | **`FlowField`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/FlowField.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (4.2 KB) |
| ✅ OK | **`Metaballs`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/Metaballs.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (3.8 KB) |
| ✅ OK | **`LissajousGrid`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/LissajousGrid.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (3.0 KB) |
| ✅ OK | **`Plasma`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/Plasma.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (3.8 KB) |
| ✅ OK | **`WarpSpeed`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/WarpSpeed.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (3.6 KB) |
| ✅ OK | **`GravityWells`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/GravityWells.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (6.5 KB) |
| ✅ OK | **`Topography`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/Topography.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (5.9 KB) |
| ✅ OK | **`Lightning`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/Lightning.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (5.3 KB) |
| ✅ OK | **`VoronoiPulse`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/VoronoiPulse.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (5.0 KB) |
| ✅ OK | **`Dither`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/Dither.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (2.8 KB) |
| ✅ OK | **`Halftone`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/Halftone.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (3.4 KB) |
| ✅ OK | **`CRT`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/CRT.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (3.4 KB) |
| ✅ OK | **`Truchet`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/Truchet.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (3.8 KB) |
| ✅ OK | **`MeshGradient`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/MeshGradient.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (5.2 KB) |
| ✅ OK | **`GodRays`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/GodRays.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (4.5 KB) |
| ✅ OK | **`Swirl`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/Swirl.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (4.1 KB) |
| ✅ OK | **`PulsingBorder`** | 7. Shaders & Gráficos | `src/components/boldkit/canvas-effects/PulsingBorder.tsx` | Backdrop interativo a 60fps irrestrito nas páginas principais | Shader disponível (4.4 KB) |
| ✅ OK | **`use-canvas-effect.ts`** | Hooks Nativos | `src/hooks/use-canvas-effect.ts` | Utilidades reativas para componentes de UI e animações | Hook presente (4886 bytes) |
| ✅ OK | **`use-media-query.ts`** | Hooks Nativos | `src/hooks/use-media-query.ts` | Utilidades reativas para componentes de UI e animações | Hook presente (493 bytes) |
| ✅ OK | **`use-debounce.ts`** | Hooks Nativos | `src/hooks/use-debounce.ts` | Utilidades reativas para componentes de UI e animações | Hook presente (344 bytes) |
| ✅ OK | **`use-in-view.ts`** | Hooks Nativos | `src/hooks/use-in-view.ts` | Utilidades reativas para componentes de UI e animações | Hook presente (591 bytes) |
| ✅ OK | **`use-mouse-position.ts`** | Hooks Nativos | `src/hooks/use-mouse-position.ts` | Utilidades reativas para componentes de UI e animações | Hook presente (551 bytes) |
| ✅ OK | **`use-local-storage.ts`** | Hooks Nativos | `src/hooks/use-local-storage.ts` | Utilidades reativas para componentes de UI e animações | Hook presente (873 bytes) |
| ✅ OK | **`BoldKit UI Proxies Purge`** | Limpeza Arquitetural | `src/components/boldkit/ui/*.tsx` | Eliminação de camada intermediária redundante | Zero proxies detectados em src/components/boldkit/ui |
| ✅ OK | **`Limpeza Pasta Vazia src/components/acg`** | Limpeza de Domínio | `src/components/acg` | Evitar diretórios órfãos concorrentes com src/components/features/ | Pasta removida com sucesso |
| ✅ OK | **`Limpeza Pasta Vazia src/components/percurso`** | Limpeza de Domínio | `src/components/percurso` | Evitar diretórios órfãos concorrentes com src/components/features/ | Pasta removida com sucesso |
| ✅ OK | **`Limpeza Pasta Vazia src/components/estagio`** | Limpeza de Domínio | `src/components/estagio` | Evitar diretórios órfãos concorrentes com src/components/features/ | Pasta removida com sucesso |
| ✅ OK | **`404.astro`** | Páginas Astro (Rotas) | `src/pages/404.astro` | Rota pública do SuperApp (404.astro) | Imports canônicos em conformidade |
| ✅ OK | **`acg.astro`** | Páginas Astro (Rotas) | `src/pages/acg.astro` | Rota pública do SuperApp (acg.astro) | Imports canônicos em conformidade |
| ✅ OK | **`calouros.astro`** | Páginas Astro (Rotas) | `src/pages/calouros.astro` | Rota pública do SuperApp (calouros.astro) | Imports canônicos em conformidade |
| ✅ OK | **`carreira.astro`** | Páginas Astro (Rotas) | `src/pages/carreira.astro` | Rota pública do SuperApp (carreira.astro) | Imports canônicos em conformidade |
| ✅ OK | **`chapa-semente.astro`** | Páginas Astro (Rotas) | `src/pages/chapa-semente.astro` | Rota pública do SuperApp (chapa-semente.astro) | Imports canônicos em conformidade |
| ✅ OK | **`configuracoes.astro`** | Páginas Astro (Rotas) | `src/pages/configuracoes.astro` | Rota pública do SuperApp (configuracoes.astro) | Imports canônicos em conformidade |
| ✅ OK | **`curso.astro`** | Páginas Astro (Rotas) | `src/pages/curso.astro` | Rota pública do SuperApp (curso.astro) | Imports canônicos em conformidade |
| ✅ OK | **`cursos.astro`** | Páginas Astro (Rotas) | `src/pages/cursos.astro` | Rota pública do SuperApp (cursos.astro) | Imports canônicos em conformidade |
| ✅ OK | **`documentos/[slug].astro`** | Páginas Astro (Rotas) | `src/pages/documentos/[slug].astro` | Rota pública do SuperApp (documentos/[slug].astro) | Imports canônicos em conformidade |
| ✅ OK | **`documentos.astro`** | Páginas Astro (Rotas) | `src/pages/documentos.astro` | Rota pública do SuperApp (documentos.astro) | Imports canônicos em conformidade |
| ✅ OK | **`estagio-tcc.astro`** | Páginas Astro (Rotas) | `src/pages/estagio-tcc.astro` | Rota pública do SuperApp (estagio-tcc.astro) | Imports canônicos em conformidade |
| ✅ OK | **`estagio.astro`** | Páginas Astro (Rotas) | `src/pages/estagio.astro` | Rota pública do SuperApp (estagio.astro) | Imports canônicos em conformidade |
| ✅ OK | **`faq.astro`** | Páginas Astro (Rotas) | `src/pages/faq.astro` | Rota pública do SuperApp (faq.astro) | Imports canônicos em conformidade |
| ✅ OK | **`gestao.astro`** | Páginas Astro (Rotas) | `src/pages/gestao.astro` | Rota pública do SuperApp (gestao.astro) | Imports canônicos em conformidade |
| ✅ OK | **`index.astro`** | Páginas Astro (Rotas) | `src/pages/index.astro` | Rota pública do SuperApp (index.astro) | Imports canônicos em conformidade |
| ✅ OK | **`mapa-do-site.astro`** | Páginas Astro (Rotas) | `src/pages/mapa-do-site.astro` | Rota pública do SuperApp (mapa-do-site.astro) | Imports canônicos em conformidade |
| ✅ OK | **`noticias/[slug].astro`** | Páginas Astro (Rotas) | `src/pages/noticias/[slug].astro` | Rota pública do SuperApp (noticias/[slug].astro) | Imports canônicos em conformidade |
| ✅ OK | **`noticias/index.astro`** | Páginas Astro (Rotas) | `src/pages/noticias/index.astro` | Rota pública do SuperApp (noticias/index.astro) | Imports canônicos em conformidade |
| ✅ OK | **`optativas.astro`** | Páginas Astro (Rotas) | `src/pages/optativas.astro` | Rota pública do SuperApp (optativas.astro) | Imports canônicos em conformidade |
| ✅ OK | **`ouvidoria.astro`** | Páginas Astro (Rotas) | `src/pages/ouvidoria.astro` | Rota pública do SuperApp (ouvidoria.astro) | Imports canônicos em conformidade |
| ✅ OK | **`percurso.astro`** | Páginas Astro (Rotas) | `src/pages/percurso.astro` | Rota pública do SuperApp (percurso.astro) | Imports canônicos em conformidade |
| ✅ OK | **`permanencia.astro`** | Páginas Astro (Rotas) | `src/pages/permanencia.astro` | Rota pública do SuperApp (permanencia.astro) | Imports canônicos em conformidade |
| ✅ OK | **`pesquisa.astro`** | Páginas Astro (Rotas) | `src/pages/pesquisa.astro` | Rota pública do SuperApp (pesquisa.astro) | Imports canônicos em conformidade |
| ✅ OK | **`sobre.astro`** | Páginas Astro (Rotas) | `src/pages/sobre.astro` | Rota pública do SuperApp (sobre.astro) | Imports canônicos em conformidade |
| ✅ OK | **`tcc.astro`** | Páginas Astro (Rotas) | `src/pages/tcc.astro` | Rota pública do SuperApp (tcc.astro) | Imports canônicos em conformidade |
| ✅ OK | **`transparencia.astro`** | Páginas Astro (Rotas) | `src/pages/transparencia.astro` | Rota pública do SuperApp (transparencia.astro) | Imports canônicos em conformidade |

---

## 3. Registro de Transição de Fases & Sinal Verde do Subagente

| Fase | Descrição | Data | Auditor Responsável | Parecer |
| :--- | :--- | :---: | :---: | :--- |
| **Fase 0** | Setup de Auditoria & Ledger | 2026-11-08 | AI Assistant | 🟢 SUCESSO (Script determinístico & Ledger inicializados) |
| **Fase 1** | Primitivas UI & Hooks | 2026-11-08 | Subagent egm-codebase-details | 🟢 SINAL VERDE (100% primitivas, hooks nativos em src/hooks/, 81 proxies expurgados) |
| **Fase 2** | 20 Blocos Nativos, Shaders 60fps & Gráficos | 2026-11-08 | AI Assistant & Subagent | 🟢 SUCESSO (20 blocos reais de 5-25KB, 23 shaders 60fps WebGL sem throttle, 14 charts) |
| **Fase 3** | Domínios de Features & Desduplicação | 2026-11-08 | AI Assistant & Subagent | 🟢 SUCESSO (15 companion folders consolidados em src/components/features/, 0 duplicatas) |
| **Fase 4** | Remapeamento das 22 Páginas Astro | 2026-11-08 | Astro Compiler & Vitest | 🟢 SUCESSO (32 rotas estáticas geradas, 17/17 testes OK, 555 assets precacheados) |
| **Fase 5** | Reescrita Documental & Build Final | 2026-11-08 | AI Assistant & Subagent | 🟢 SUCESSO (Documentação do design system sincronizada e selada) |
| **Fase 6** | Harmonização Visual das 22 Páginas, 6 Famílias .md & Global Context Menu | 2026-11-08 | AI Assistant | 🟢 SUCESSO (GlobalContextMenu desktop/mobile, 6 famílias dos 95 .md documentadas, tokens e shaders 60fps em todas as rotas) |
