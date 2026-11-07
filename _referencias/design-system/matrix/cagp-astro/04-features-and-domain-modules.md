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

## 3. Page Companion & Widget Components (`src/components/`)

In addition to the core feature architecture in `src/components/features/`, the codebase contains **35 specialized companion components** located across 15 top-level domain directories in `src/components/`. These components are directly imported into Astro route pages to provide localized widgets, settings panels, PWA modais, and institutional sections.

### Companion Component Catalog (35 Files)

| Directory | Component | Type | Visitor Mode | Associated Page / Purpose |
| :--- | :--- | :---: | :---: | :--- |
| `calculators/` | [`LinearHud.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/calculators/LinearHud.tsx) | React Island | `Operate` | Real-time linear progress HUD for 600h academic completion |
| `calouros/` | [`CalourosVideos.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/calouros/CalourosVideos.astro) | Astro Static | `Read / Persuade` | [`calouros.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/calouros.astro) - Welcome & campus navigation video guides |
| `curriculum/` | [`CurriculumSvgMap.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/curriculum/CurriculumSvgMap.tsx) | React Island | `Operate` | [`curso.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/curso.astro) - Interactive SVG dependency graph of curriculum semesters |
| `curso/` | [`CursoColegiado.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/curso/CursoColegiado.astro) | Astro Static | `Read` | [`curso.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/curso.astro) - Colegiado contact and office hour directory |
| `curso/` | [`CursoVisao.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/curso/CursoVisao.astro) | Astro Static | `Read` | Course educational vision and academic mission |
| `curso/` | [`CursoEgressos.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/curso/CursoEgressos.astro) | Astro Static | `Read` | Alumni career placement and professional pathways |
| `curso/` | [`CursoIngresso.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/curso/CursoIngresso.astro) | Astro Static | `Read` | SiSU & Obtenção de Novo Título admission guidelines |
| `documentos/` | [`DocumentosTutorialDrca.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/documentos/DocumentosTutorialDrca.astro) | Astro Static | `Read` | [`documentos.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/documentos.astro) - Step-by-step DRCA protocol guide |
| `gestao/` | [`GestaoContas.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/gestao/GestaoContas.astro) | Astro Static | `Read` | [`gestao.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/gestao.astro) - Financial ledger & accountability statements |
| `gestao/` | [`GestaoOrganograma.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/gestao/GestaoOrganograma.astro) | Astro Static | `Read` | Organizational chart of the 9 CAGP directorates |
| `gestao/` | [`GestaoEquipe.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/gestao/GestaoEquipe.astro) | Astro Static | `Read` | Current student union representatives directory |
| `home/` | [`HomeWorkspaceA.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/home/HomeWorkspaceA.tsx) | React Island | `Operate` | [`index.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/index.astro) - Student workspace A dashboard |
| `optativas/` | [`OptativasFormacaoLivre.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/optativas/OptativasFormacaoLivre.astro) | Astro Static | `Read / Operate` | [`optativas.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/optativas.astro) - Formação Livre catalog guide |
| `passport/` | [`TalentBankEditor.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/passport/TalentBankEditor.tsx) | React Island | `Operate` | Student skill inventory & public portfolio editor |
| `passport/` | [`AvatarRenderer.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/passport/AvatarRenderer.tsx) | React Island | `Operate` | Brutalist 8-bit dynamic avatar generation engine |
| `passport/` | [`PassportCard.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/passport/PassportCard.tsx) | React Island | `Operate` | Student digital ID & credential passport pass |
| `pesquisa/` | [`PesquisaIc.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/pesquisa/PesquisaIc.astro) | Astro Static | `Read` | [`pesquisa.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/pesquisa.astro) - Iniciação Científica (IC/CNPq) guide |
| `pesquisa/` | [`PesquisaImersao.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/pesquisa/PesquisaImersao.astro) | Astro Static | `Read` | Academic extension & field immersion directory |
| `pesquisa/` | [`PesquisaNucleos.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/pesquisa/PesquisaNucleos.astro) | Astro Static | `Read` | Research labs and public policy think tank groups |
| `pwa/` | [`PwaCredenciamentoPill.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/pwa/PwaCredenciamentoPill.tsx) | React Island | `Persuade` | Global sticky badge for election day voting registration |
| `pwa/` | [`PwaElectionCredenciamentoModal.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/pwa/PwaElectionCredenciamentoModal.tsx) | React Island | `Persuade` | Electoral accreditation modal with calendar sync |
| `settings/` | [`SettingsInteractive.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/settings/SettingsInteractive.tsx) | React Island | `Operate` | [`configuracoes.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/configuracoes.astro) - Master preferences coordinator |
| `settings/` | [`SettingsAlertsSection.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/settings/SettingsAlertsSection.tsx) | React Island | `Operate` | Notification subscription manager (RU, AAC, Ônibus) |
| `settings/` | [`SettingsA11ySection.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/settings/SettingsA11ySection.tsx) | React Island | `Operate` | Accessibility controls (Dyslexia font, contrast scale) |
| `settings/` | [`SettingsVaultSection.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/settings/SettingsVaultSection.tsx) | React Island | `Operate` | Vault data backup, import, export & storage purge |
| `sobre/` | [`SobreGovernanca.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/sobre/SobreGovernanca.astro) | Astro Static | `Read` | [`sobre.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/sobre.astro) - CAGP statutes and deliberative assembly rules |
| `sobre/` | [`SobrePrincipios.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/sobre/SobrePrincipios.astro) | Astro Static | `Read` | Core democratic, inclusive and public tenets |
| `sobre/` | [`SobreEsferas.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/sobre/SobreEsferas.astro) | Astro Static | `Read` | Representation spheres (Colegiado, Congregação, DCE) |
| `sobre/` | [`SobreCollageBanner.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/sobre/SobreCollageBanner.tsx) | React Island | `Experience` | Neobrutalist photo collage header of campus history |
| `tcc/` | [`TccModalidades.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/tcc/TccModalidades.astro) | Astro Static | `Read` | [`tcc.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/tcc.astro) - Monograph vs scientific article rules |
| `widgets/` | [`OverviewStageWidget.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/widgets/OverviewStageWidget.tsx) | React Island | `Operate` | [`index.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/pages/index.astro) - Quick stage & internship widget |
| `widgets/` | [`OverviewCalcWidget.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/widgets/OverviewCalcWidget.tsx) | React Island | `Operate` | Quick 600h hours tracker widget on homepage |
| `widgets/` | [`OverviewGestaoWidget.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/widgets/OverviewGestaoWidget.astro) | Astro Static | `Read` | Direct contact & office hours banner widget |
| `widgets/` | [`OverviewFaqWidget.astro`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/widgets/OverviewFaqWidget.astro) | Astro Static | `Read` | Top frequent questions search accordion widget |
| `widgets/` | [`OverviewGuardianWidget.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/widgets/OverviewGuardianWidget.tsx) | React Island | `Operate` | 120-day countdown warning widget |
| `widgets/` | [`OverviewCalouroWidget.tsx`](file:///home/gsathler/Nextcloud/Projects/cagp/src/components/widgets/OverviewCalouroWidget.tsx) | React Island | `Operate` | First 30 days checklist quick widget |
