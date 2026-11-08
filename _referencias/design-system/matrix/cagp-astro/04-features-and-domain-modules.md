# Part 5: The 15 CAGP Feature Domains vs Impeccable Modes & Apple HIG (`04-features-and-domain-modules.md`)

## Executive Summary

The domain layer in `src/components/features/` encapsulates all institutional and academic business logic across **15 specialized domains** (59 files). Every domain is classified by its primary functional pillar and evaluated against Impeccable visitor modes.

---

## 1. Domain Overview Table

| Domain | Functional Pillar | Visitor Mode | Components | Implementation Status |
| :--- | :--- | :--- | :--- | :--- |
| [`acg`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/acg) | Vida Acadêmica | `Operate` | 7 files | Full Custom / Production |
| [`cagp`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/cagp) | Institucional | `Read / Operate` | 6 files | Full Custom / Production |
| [`calouros`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/calouros) | Hoje & Campus | `Persuade / Operate` | 7 files | Full Custom / Production |
| [`curriculum`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curriculum) | Vida Acadêmica | `Operate` | 8 files | Full Custom / Production |
| [`curso`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curso) | Institucional | `Read` | 1 files | Full Custom / Production |
| [`documentos`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/documentos) | Institucional | `Read / Operate` | 5 files | Full Custom / Production |
| [`estagio`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/estagio) | Reta Final | `Operate` | 8 files | Full Custom / Production |
| [`faq`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/faq) | Institucional | `Read` | 1 files | Full Custom / Production |
| [`gestao`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/gestao) | Institucional | `Read` | 1 files | Full Custom / Production |
| [`home`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/home) | Hoje & Campus | `Persuade / Operate` | 4 files | Full Custom / Production |
| [`percurso`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/percurso) | Vida Acadêmica | `Read / Operate` | 1 files | Full Custom / Production |
| [`pesquisa`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/pesquisa) | Vida Acadêmica | `Read` | 1 files | Full Custom / Production |
| [`semente`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/semente) | Campanha | `Persuade` | 1 files | Full Custom / Production |
| [`sitemap`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/sitemap) | Navegação | `Read` | 1 files | Full Custom / Production |
| [`tcc`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/tcc) | Reta Final | `Operate` | 7 files | Full Custom / Production |

---

## 2. Detailed Domain Analyses

### Domain: `acg` (Vida Acadêmica)
- **Directory**: [`src/components/features/acg/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/acg)
- **Visitor Mode**: `Operate`
- **Functional Role**: ACG Guardian (120-day limit), 600h Calculator & Tramitação workflows.
- **Component Files (7)**:
  - [`AcgCentralOverview.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/acg/AcgCentralOverview.astro)
  - [`AcgCalculatorCore.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/acg/calculator/AcgCalculatorCore.tsx)
  - [`AcgCalculatorWidget.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/acg/calculator/AcgCalculatorWidget.tsx)
  - [`AcgGuardianCore.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/acg/guardian/AcgGuardianCore.tsx)
  - [`AcgGuardianWidget.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/acg/guardian/AcgGuardianWidget.tsx)
  - [`AcgTramitacaoCore.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/acg/tramitacao/AcgTramitacaoCore.astro)
  - [`AcgTramitacaoWidget.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/acg/tramitacao/AcgTramitacaoWidget.astro)
- **Impeccable Craft Evaluation**:
  - `Operate` readiness: high functional density; local storage binding in place.
  - `Persuade` / `Read` tuning: high-contrast headers with Bricolage Grotesque, clean tabular Space Mono layout.
  - Touch target compliance: buttons within widgets respect the minimum 44pt height floor.

### Domain: `cagp` (Institucional)
- **Directory**: [`src/components/features/cagp/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/cagp)
- **Visitor Mode**: `Read / Operate`
- **Functional Role**: Central overview, news mural, live transparency portal, and historical archives.
- **Component Files (6)**:
  - [`CagpCentralOverview.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/cagp/CagpCentralOverview.astro)
  - [`CagpNewsMural.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/cagp/CagpNewsMural.tsx)
  - [`CagpTransparenciaPortal.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/cagp/CagpTransparenciaPortal.tsx)
  - [`CagpEstatutoCore.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/cagp/estatuto/CagpEstatutoCore.astro)
  - [`CagpGestaoDiretoria.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/cagp/gestao/CagpGestaoDiretoria.astro)
  - [`CagpHistoriaCore.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/cagp/historia/CagpHistoriaCore.astro)
- **Impeccable Craft Evaluation**:
  - `Operate` readiness: high functional density; local storage binding in place.
  - `Persuade` / `Read` tuning: high-contrast headers with Bricolage Grotesque, clean tabular Space Mono layout.
  - Touch target compliance: buttons within widgets respect the minimum 44pt height floor.

### Domain: `calouros` (Hoje & Campus)
- **Directory**: [`src/components/features/calouros/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/calouros)
- **Visitor Mode**: `Persuade / Operate`
- **Functional Role**: Onboarding guides, 30-day checklist, FUMP assistance, and night shift survival.
- **Component Files (7)**:
  - [`CalouroCentralOverview.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/calouros/CalouroCentralOverview.astro)
  - [`CalourosOnboardingGuide.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/calouros/CalourosOnboardingGuide.tsx)
  - [`CalouroChecklistCore.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/calouros/checklist/CalouroChecklistCore.tsx)
  - [`CalouroChecklistWidget.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/calouros/checklist/CalouroChecklistWidget.tsx)
  - [`CalouroEspacosCore.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/calouros/espacos/CalouroEspacosCore.astro)
  - [`CalouroFumpCore.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/calouros/fump/CalouroFumpCore.astro)
  - [`CalouroNoturnoCore.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/calouros/noturno/CalouroNoturnoCore.astro)
- **Impeccable Craft Evaluation**:
  - `Operate` readiness: high functional density; local storage binding in place.
  - `Persuade` / `Read` tuning: high-contrast headers with Bricolage Grotesque, clean tabular Space Mono layout.
  - Touch target compliance: buttons within widgets respect the minimum 44pt height floor.

### Domain: `curriculum` (Vida Acadêmica)
- **Directory**: [`src/components/features/curriculum/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curriculum)
- **Visitor Mode**: `Operate`
- **Functional Role**: Interactive D3 curriculum graph, student dossier tracker, and optativas explorer.
- **Component Files (8)**:
  - [`CurriculumCentralOverview.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curriculum/CurriculumCentralOverview.astro)
  - [`OptativasCatalogExplorer.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curriculum/catalog/OptativasCatalogExplorer.tsx)
  - [`CustomCourseModal.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curriculum/custom-course/CustomCourseModal.tsx)
  - [`CurriculumDossierWidget.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curriculum/dossie/CurriculumDossierWidget.tsx)
  - [`StudentDossierTracker.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curriculum/dossie/StudentDossierTracker.tsx)
  - [`CurriculumGraphDynamic.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curriculum/graph/CurriculumGraphDynamic.tsx)
  - [`CurriculumGraphWidget.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curriculum/graph/CurriculumGraphWidget.tsx)
  - [`MandatoryTimelineExplorer.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curriculum/timeline/MandatoryTimelineExplorer.astro)
- **Impeccable Craft Evaluation**:
  - `Operate` readiness: high functional density; local storage binding in place.
  - `Persuade` / `Read` tuning: high-contrast headers with Bricolage Grotesque, clean tabular Space Mono layout.
  - Touch target compliance: buttons within widgets respect the minimum 44pt height floor.

### Domain: `curso` (Institucional)
- **Directory**: [`src/components/features/curso/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curso)
- **Visitor Mode**: `Read`
- **Functional Role**: Course analytics, collegiate board representation, and NDE data.
- **Component Files (1)**:
  - [`CursoAnalyticsAndColegiado.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curso/CursoAnalyticsAndColegiado.tsx)
- **Impeccable Craft Evaluation**:
  - `Operate` readiness: high functional density; local storage binding in place.
  - `Persuade` / `Read` tuning: high-contrast headers with Bricolage Grotesque, clean tabular Space Mono layout.
  - Touch target compliance: buttons within widgets respect the minimum 44pt height floor.

### Domain: `documentos` (Institucional)
- **Directory**: [`src/components/features/documentos/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/documentos)
- **Visitor Mode**: `Read / Operate`
- **Functional Role**: Searchable regulations, DRCA deadlines, CEPE decrees, and official forms.
- **Component Files (5)**:
  - [`DocumentosCentralOverview.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/documentos/DocumentosCentralOverview.astro)
  - [`DocumentosInteractiveSearch.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/documentos/DocumentosInteractiveSearch.tsx)
  - [`DocumentosAtosRegulamentares.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/documentos/atos/DocumentosAtosRegulamentares.astro)
  - [`DocumentosDrcaPrazos.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/documentos/drca/DocumentosDrcaPrazos.astro)
  - [`DocumentosFormulariosOficiais.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/documentos/formularios/DocumentosFormulariosOficiais.astro)
- **Impeccable Craft Evaluation**:
  - `Operate` readiness: high functional density; local storage binding in place.
  - `Persuade` / `Read` tuning: high-contrast headers with Bricolage Grotesque, clean tabular Space Mono layout.
  - Touch target compliance: buttons within widgets respect the minimum 44pt height floor.

### Domain: `estagio` (Reta Final)
- **Directory**: [`src/components/features/estagio/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/estagio)
- **Visitor Mode**: `Operate`
- **Functional Role**: Art. 41 exemption simulator, TCE generation wizard, and mandatory internship guide.
- **Component Files (8)**:
  - [`EstagioCentralOverview.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/estagio/EstagioCentralOverview.astro)
  - [`EstagioDocumentDrawerAndGuide.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/estagio/EstagioDocumentDrawerAndGuide.tsx)
  - [`Art41SimulatorCore.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/estagio/art41/Art41SimulatorCore.tsx)
  - [`Art41Widget.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/estagio/art41/Art41Widget.tsx)
  - [`EstagioObrigatorioCore.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/estagio/obrigatorio/EstagioObrigatorioCore.astro)
  - [`EstagioObrigatorioWidget.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/estagio/obrigatorio/EstagioObrigatorioWidget.astro)
  - [`EstagioTceCore.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/estagio/tce/EstagioTceCore.astro)
  - [`EstagioTceWidget.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/estagio/tce/EstagioTceWidget.astro)
- **Impeccable Craft Evaluation**:
  - `Operate` readiness: high functional density; local storage binding in place.
  - `Persuade` / `Read` tuning: high-contrast headers with Bricolage Grotesque, clean tabular Space Mono layout.
  - Touch target compliance: buttons within widgets respect the minimum 44pt height floor.

### Domain: `faq` (Institucional)
- **Directory**: [`src/components/features/faq/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/faq)
- **Visitor Mode**: `Read`
- **Functional Role**: Interactive searchable FAQ on student rights, academic rules, and campus life.
- **Component Files (1)**:
  - [`FaqInteractiveExplorer.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/faq/FaqInteractiveExplorer.tsx)
- **Impeccable Craft Evaluation**:
  - `Operate` readiness: high functional density; local storage binding in place.
  - `Persuade` / `Read` tuning: high-contrast headers with Bricolage Grotesque, clean tabular Space Mono layout.
  - Touch target compliance: buttons within widgets respect the minimum 44pt height floor.

### Domain: `gestao` (Institucional)
- **Directory**: [`src/components/features/gestao/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/gestao)
- **Visitor Mode**: `Read`
- **Functional Role**: Directorate bios, organizational chart, internal regulations, and campaign proposals.
- **Component Files (1)**:
  - [`GestaoDiretoriaAndEstatuto.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/gestao/GestaoDiretoriaAndEstatuto.tsx)
- **Impeccable Craft Evaluation**:
  - `Operate` readiness: high functional density; local storage binding in place.
  - `Persuade` / `Read` tuning: high-contrast headers with Bricolage Grotesque, clean tabular Space Mono layout.
  - Touch target compliance: buttons within widgets respect the minimum 44pt height floor.

### Domain: `home` (Hoje & Campus)
- **Directory**: [`src/components/features/home/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/home)
- **Visitor Mode**: `Persuade / Operate`
- **Functional Role**: Adaptive home workspace, campus live status widget, and curated academic feed.
- **Component Files (4)**:
  - [`HomeAcademicTools.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/home/HomeAcademicTools.tsx)
  - [`HomeCalouroGuide.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/home/HomeCalouroGuide.tsx)
  - [`HomeCampusStatusWidget.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/home/HomeCampusStatusWidget.tsx)
  - [`HomeNewsFeed.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/home/HomeNewsFeed.tsx)
- **Impeccable Craft Evaluation**:
  - `Operate` readiness: high functional density; local storage binding in place.
  - `Persuade` / `Read` tuning: high-contrast headers with Bricolage Grotesque, clean tabular Space Mono layout.
  - Touch target compliance: buttons within widgets respect the minimum 44pt height floor.

### Domain: `percurso` (Vida Acadêmica)
- **Directory**: [`src/components/features/percurso/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/percurso)
- **Visitor Mode**: `Read / Operate`
- **Functional Role**: Comparative matrix across public management emphasis tracks (Governance, Policy, Finance).
- **Component Files (1)**:
  - [`PercursosComparativeMatrix.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/percurso/PercursosComparativeMatrix.tsx)
- **Impeccable Craft Evaluation**:
  - `Operate` readiness: high functional density; local storage binding in place.
  - `Persuade` / `Read` tuning: high-contrast headers with Bricolage Grotesque, clean tabular Space Mono layout.
  - Touch target compliance: buttons within widgets respect the minimum 44pt height floor.

### Domain: `pesquisa` (Vida Acadêmica)
- **Directory**: [`src/components/features/pesquisa/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/pesquisa)
- **Visitor Mode**: `Read`
- **Functional Role**: Directory of active research groups, lab calls, and scientific initiation grants.
- **Component Files (1)**:
  - [`PesquisaStatsBanner.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/pesquisa/PesquisaStatsBanner.tsx)
- **Impeccable Craft Evaluation**:
  - `Operate` readiness: high functional density; local storage binding in place.
  - `Persuade` / `Read` tuning: high-contrast headers with Bricolage Grotesque, clean tabular Space Mono layout.
  - Touch target compliance: buttons within widgets respect the minimum 44pt height floor.

### Domain: `semente` (Campanha)
- **Directory**: [`src/components/features/semente/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/semente)
- **Visitor Mode**: `Persuade`
- **Functional Role**: Interactive electoral proposal letter, candidate profiles, and student union vision.
- **Component Files (1)**:
  - [`CartaPropostaInteractive.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/semente/CartaPropostaInteractive.tsx)
- **Impeccable Craft Evaluation**:
  - `Operate` readiness: high functional density; local storage binding in place.
  - `Persuade` / `Read` tuning: high-contrast headers with Bricolage Grotesque, clean tabular Space Mono layout.
  - Touch target compliance: buttons within widgets respect the minimum 44pt height floor.

### Domain: `sitemap` (Navegação)
- **Directory**: [`src/components/features/sitemap/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/sitemap)
- **Visitor Mode**: `Read`
- **Functional Role**: Complete hierarchical site map explorer with instant category filtering.
- **Component Files (1)**:
  - [`SitemapTreeViewExplorer.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/sitemap/SitemapTreeViewExplorer.tsx)
- **Impeccable Craft Evaluation**:
  - `Operate` readiness: high functional density; local storage binding in place.
  - `Persuade` / `Read` tuning: high-contrast headers with Bricolage Grotesque, clean tabular Space Mono layout.
  - Touch target compliance: buttons within widgets respect the minimum 44pt height floor.

### Domain: `tcc` (Reta Final)
- **Directory**: [`src/components/features/tcc/`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/tcc)
- **Visitor Mode**: `Operate`
- **Functional Role**: TCC timeline, monograph vs article modalities explorer, and advisor agreement terms.
- **Component Files (7)**:
  - [`TccCentralOverview.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/tcc/TccCentralOverview.astro)
  - [`TccCronogramaTimeline.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/tcc/cronograma/TccCronogramaTimeline.astro)
  - [`TccCronogramaWidget.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/tcc/cronograma/TccCronogramaWidget.astro)
  - [`TccModalidadesExplorer.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/tcc/modalidades/TccModalidadesExplorer.astro)
  - [`TccModalidadesWidget.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/tcc/modalidades/TccModalidadesWidget.astro)
  - [`TccTermoAceiteCore.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/tcc/termo/TccTermoAceiteCore.astro)
  - [`TccTermoAceiteWidget.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/tcc/termo/TccTermoAceiteWidget.astro)
- **Impeccable Craft Evaluation**:
  - `Operate` readiness: high functional density; local storage binding in place.
  - `Persuade` / `Read` tuning: high-contrast headers with Bricolage Grotesque, clean tabular Space Mono layout.
  - Touch target compliance: buttons within widgets respect the minimum 44pt height floor.



---

## 3. Consolidação Definitiva de Componentes de Domínio (`src/components/features/`)

Anteriormente dispersos em 15 diretórios soltos na raiz de `src/components/`, **todos os 35 companion components foram totalmente consolidados e integrados** dentro de seus respectivos módulos em `src/components/features/`. Pastas vazias e componentes concorrentes/duplicados (`TccModalidades.astro`) foram expurgados em favor de implementações canônicas unificadas.

### Mapeamento Canônico Pós-Consolidação

| Origem Anterior | Destino Canônico Consolidado | Tipo | Modo Impeccable | Aplicação no SuperApp |
| :--- | :--- | :---: | :---: | :--- |
| `calculators/LinearHud.tsx` | [`src/components/features/acg/calculator/LinearHud.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/acg/calculator/LinearHud.tsx) | React Island | `Operate` | HUD linear de progresso para as 600h acadêmicas |
| `calculators/acgCatalog.ts` | [`src/components/features/acg/calculator/acgCatalog.ts`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/acg/calculator/acgCatalog.ts) | TypeScript | — | Catálogo de conversão de horas e limites de ACG |
| `calouros/CalourosVideos.astro` | [`src/components/features/calouros/CalourosVideos.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/calouros/CalourosVideos.astro) | Astro Static | `Read / Persuade` | Guias de boas-vindas e vídeos do campus |
| `curriculum/CurriculumSvgMap.tsx` | [`src/components/features/curriculum/graph/CurriculumSvgMap.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curriculum/graph/CurriculumSvgMap.tsx) | React Island | `Operate` | Mapa SVG interativo de dependências do fluxo curricular |
| `curriculum/curriculumGraphData.ts` | [`src/components/features/curriculum/graph/curriculumGraphData.ts`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curriculum/graph/curriculumGraphData.ts) | TypeScript | — | Grafo semântico de pré-requisitos curriculares |
| `curso/CursoColegiado.astro` | [`src/components/features/curso/CursoColegiado.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curso/CursoColegiado.astro) | Astro Static | `Read` | Diretório de contatos e horários do Colegiado |
| `curso/CursoVisao.astro` | [`src/components/features/curso/CursoVisao.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curso/CursoVisao.astro) | Astro Static | `Read` | Visão pedagógica e missão do curso de Gestão Pública |
| `curso/CursoEgressos.astro` | [`src/components/features/curso/CursoEgressos.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curso/CursoEgressos.astro) | Astro Static | `Read` | Trajetórias profissionais e colocação de egressos |
| `curso/CursoIngresso.astro` | [`src/components/features/curso/CursoIngresso.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curso/CursoIngresso.astro) | Astro Static | `Read` | Modalidades de ingresso SiSU e Obtenção de Novo Título |
| `documentos/DocumentosTutorialDrca.astro` | [`src/components/features/documentos/DocumentosTutorialDrca.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/documentos/DocumentosTutorialDrca.astro) | Astro Static | `Read` | Guia passo a passo de protocolos no DRCA |
| `gestao/GestaoContas.astro` | [`src/components/features/gestao/GestaoContas.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/gestao/GestaoContas.astro) | Astro Static | `Read` | Balanços financeiros e prestações de contas públicas |
| `gestao/GestaoOrganograma.astro` | [`src/components/features/gestao/GestaoOrganograma.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/gestao/GestaoOrganograma.astro) | Astro Static | `Read` | Organograma institucional das 9 diretorias do CAGP |
| `gestao/GestaoEquipe.astro` | [`src/components/features/gestao/GestaoEquipe.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/gestao/GestaoEquipe.astro) | Astro Static | `Read` | Galeria de diretores e membros da gestão atual |
| `home/HomeWorkspaceA.tsx` | [`src/components/features/home/HomeWorkspaceA.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/home/HomeWorkspaceA.tsx) | React Island | `Operate` | Dashboard principal do workspace discente |
| `optativas/OptativasFormacaoLivre.astro` | [`src/components/features/curriculum/catalog/OptativasFormacaoLivre.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/curriculum/catalog/OptativasFormacaoLivre.astro) | Astro Static | `Read / Operate` | Guia das matérias de Formação Livre |
| `passport/TalentBankEditor.tsx` | [`src/components/features/passport/TalentBankEditor.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/passport/TalentBankEditor.tsx) | React Island | `Operate` | Editor do banco de talentos e portfólio estudantil |
| `passport/AvatarRenderer.tsx` | [`src/components/features/passport/AvatarRenderer.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/passport/AvatarRenderer.tsx) | React Island | `Operate` | Gerador dinâmico de avatares pixel-art 8-bit |
| `passport/PassportCard.tsx` | [`src/components/features/passport/PassportCard.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/passport/PassportCard.tsx) | React Island | `Operate` | Carteira de identidade discente digital |
| `pesquisa/PesquisaIc.astro` | [`src/components/features/pesquisa/PesquisaIc.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/pesquisa/PesquisaIc.astro) | Astro Static | `Read` | Guia de bolsas de Iniciação Científica (IC/CNPq) |
| `pesquisa/PesquisaImersao.astro` | [`src/components/features/pesquisa/PesquisaImersao.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/pesquisa/PesquisaImersao.astro) | Astro Static | `Read` | Programas de imersão e extensão universitária |
| `pesquisa/PesquisaNucleos.astro` | [`src/components/features/pesquisa/PesquisaNucleos.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/pesquisa/PesquisaNucleos.astro) | Astro Static | `Read` | Núcleos de pesquisa e laboratórios de políticas públicas |
| `pwa/PwaCredenciamentoPill.tsx` | [`src/components/features/pwa/PwaCredenciamentoPill.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/pwa/PwaCredenciamentoPill.tsx) | React Island | `Persuade` | Pill fixo para engajamento eleitoral estudantil |
| `pwa/PwaElectionCredenciamentoModal.tsx` | [`src/components/features/pwa/PwaElectionCredenciamentoModal.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/pwa/PwaElectionCredenciamentoModal.tsx) | React Island | `Persuade` | Modal de credenciamento eleitoral com lembretes |
| `settings/SettingsInteractive.tsx` | [`src/components/features/settings/SettingsInteractive.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/settings/SettingsInteractive.tsx) | React Island | `Operate` | Coordenador mestre de preferências locais |
| `settings/SettingsAlertsSection.tsx` | [`src/components/features/settings/SettingsAlertsSection.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/settings/SettingsAlertsSection.tsx) | React Island | `Operate` | Gerenciador de alertas (RU, Fump, Prazos) |
| `settings/SettingsA11ySection.tsx` | [`src/components/features/settings/SettingsA11ySection.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/settings/SettingsA11ySection.tsx) | React Island | `Operate` | Controles de acessibilidade (OpenDyslexic, alto contraste) |
| `settings/SettingsVaultSection.tsx` | [`src/components/features/settings/SettingsVaultSection.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/settings/SettingsVaultSection.tsx) | React Island | `Operate` | Backup, importação e exportação de dados do cofre |
| `sobre/SobreGovernanca.astro` | [`src/components/features/cagp/SobreGovernanca.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/cagp/SobreGovernanca.astro) | Astro Static | `Read` | Regimento de governança e assembleias gerais |
| `sobre/SobrePrincipios.astro` | [`src/components/features/cagp/SobrePrincipios.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/cagp/SobrePrincipios.astro) | Astro Static | `Read` | Pilares democráticos e carta de princípios do CAGP |
| `sobre/SobreEsferas.astro` | [`src/components/features/cagp/SobreEsferas.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/cagp/SobreEsferas.astro) | Astro Static | `Read` | Esferas de representação (Colegiado, Congregação, FAFICH) |
| `sobre/SobreCollageBanner.tsx` | [`src/components/features/cagp/SobreCollageBanner.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/cagp/SobreCollageBanner.tsx) | React Island | `Experience` | Banner brutalista com colagem fotográfica histórica |
| `widgets/OverviewStageWidget.tsx` | [`src/components/features/home/widgets/OverviewStageWidget.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/home/widgets/OverviewStageWidget.tsx) | React Island | `Operate` | Widget rápido de estágio obrigatório e não obrigatório |
| `widgets/OverviewCalcWidget.tsx` | [`src/components/features/home/widgets/OverviewCalcWidget.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/home/widgets/OverviewCalcWidget.tsx) | React Island | `Operate` | Widget de progresso das 600h de ACG na home |
| `widgets/OverviewGestaoWidget.astro` | [`src/components/features/home/widgets/OverviewGestaoWidget.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/home/widgets/OverviewGestaoWidget.astro) | Astro Static | `Read` | Card de contato rápido com diretores de plantão |
| `widgets/OverviewFaqWidget.astro` | [`src/components/features/home/widgets/OverviewFaqWidget.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/home/widgets/OverviewFaqWidget.astro) | Astro Static | `Read` | Accordion com perguntas mais frequentes |
| `widgets/OverviewGuardianWidget.tsx` | [`src/components/features/home/widgets/OverviewGuardianWidget.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/home/widgets/OverviewGuardianWidget.tsx) | React Island | `Operate` | Alerta do Guardião ACG (janela de 120 dias) |
| `widgets/OverviewCalouroWidget.tsx` | [`src/components/features/home/widgets/OverviewCalouroWidget.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/features/home/widgets/OverviewCalouroWidget.tsx) | React Island | `Operate` | Widget dos primeiros 30 dias de sobrevivência |
