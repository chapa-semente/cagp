# Task Assignment — Reviewer M2-2: Apple Impeccable Ergonomics & SuperApp UX Blind-Spot Audit

## 2026-11-05T18:43:30Z

### Role & Identity
You are a `teamwork_reviewer` conducting the Apple Impeccable Ergonomics, SuperApp UX Architecture & Blind-Spot Discovery component of Milestone 2.
Your working directory: `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/reviewer_m2_2/`

### Mandatory Reading
Read:
- `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/ORIGINAL_REQUEST.md`
- `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/orchestrator/PROJECT.md`
- `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/explorer_survey_3/handoff.md` (Rubrics, matrices, and /grill-me framework)
- `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/worker_m1/handoff.md` (Live browser execution data)
- Inspect datasets in `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/worker_m1/`:
  - `impeccable-audit.json`
  - `capture-summary.json`
  - `materials-glass-audit.json`
  - Screenshots in `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/worker_m1/screenshots/`

### Scope & Mission
Evaluate all 24 public routes, sub-views, and overlays against the Apple Impeccable reference routing matrix and SuperApp UX critique framework:
1. **Thumb Zone vs Eye Zone Ergonomics (Mobile 390x844)**:
   - Audit placement of high-frequency actions across mobile layouts.
   - Critique top header navigation buttons requiring hard reach (>70% Y coordinates) vs BottomNav dock placement.
   - Propose ergonomic redistribution based on the 35% bottom thumb zone rule.
2. **Cognitive Load & Information Density**:
   - Audit the 51 `nested-cards` instances and dense tables across `/percurso`, `/acg`, `/estagio`, `/tcc`.
   - Critique lack of progressive disclosure or collapsing accordions in data-heavy screens.
3. **Editorial & Typographic Craft**:
   - Audit the 383 `line-length` violations (paragraphs exceeding 75ch on desktop without `max-w-prose`).
   - Audit the 86 `straggler` headings and widowed words.
   - Audit the 21 `skipped-heading` levels (`h1` -> `h3`).
4. **Motion, Springs & Tactile Feedback**:
   - Evaluate spring curves (`cubic-bezier(0.25, 1, 0.5, 1)`), tactile `:active` compression (scale 0.965), `-webkit-tap-highlight-color: transparent`, and `@media (prefers-reduced-motion: reduce)` fallbacks.
5. **Live Tooling Execution**:
   - Run `bash .agents/skills/apple-impeccable/scripts/run-audit.sh critique http://localhost:4321/` and `run-audit.sh parity src`.
   - Document tool outputs, warnings, and findings.

### Output
Write your comprehensive audit to:
`/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/reviewer_m2_2/handoff.md`
Include structured tables: Exploratory UX Blind Spots, Ergonomic Rating, Root UX Flaws, and Actionable Redesign Remedies.
When finished, send your completion message.
Remember: DO NOT modify any project source files!

## 2026-11-05T18:43:43Z
System trigger received: You are a teamwork_reviewer conducting the Apple Impeccable Ergonomics, SuperApp UX Architecture & Blind-Spot Discovery for Milestone 2. Read ORIGINAL_REQUEST.md and DISPATCH.md. Update progress in progress.md. Write handoff report to handoff.md and send message to parent.
