# Task Assignment — Reviewer M2-1: Strict Apple HIG Pre-Production Evaluation

## 2026-11-05T18:43:00Z

### Role & Identity
You are a `teamwork_reviewer` conducting the strict Apple HIG Pre-Production Evaluation component of Milestone 2.
Your working directory: `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/reviewer_m2_1/`

### Mandatory Reading
Read:
- `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/ORIGINAL_REQUEST.md`
- `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/orchestrator/PROJECT.md`
- `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/explorer_survey_3/handoff.md` (Rubrics & specifications)
- `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/worker_m1/handoff.md` (Live browser execution data)
- Inspect datasets in `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/worker_m1/`:
  - `touch-targets-audit.json`
  - `contrast-audit.json`
  - `materials-glass-audit.json`
  - `capture-summary.json`

### Scope & Mission
Evaluate all 24 public routes, sub-views, and overlays against strict Apple Human Interface Guidelines standards for pre-production release readiness:
1. **Interactive Touch Targets (44x44px rule)**:
   - Audit the 137 sub-44px targets flagged in `touch-targets-audit.json`.
   - Categorize violations across header actions, document reader summaries, back-to-top buttons, settings toggles, and modal pills.
   - Grade compliance and specify exact component selectors and dimensions.
2. **Safe Areas & Viewport Dynamics**:
   - Check fixed header, floating bottom dock, and mobile drawer for `env(safe-area-inset-*)` clearance.
   - Check root and modal viewport height units (`100dvh` and `100svh` vs naked `100vh`).
3. **Materials, Liquid Glass & Chromium/WebKit Parity**:
   - Evaluate the 289 backdrop-filter elements from `materials-glass-audit.json`.
   - Check GPU isolation (`isolation: isolate`, `transform: translateZ(0)`).
   - Evaluate visual fidelity against Apple two-layer model (functional layer glass vs content layer cards).
   - Critique neo-brutalist 2px hard borders against Apple 0.5px subtle specular hairline borders.
4. **Typography, Color Contrast & Dynamic Type**:
   - Evaluate WCAG 4.5:1 text contrast violations from `contrast-audit.json` in default and high contrast modes.
   - Audit the 799 occurrences of functional text below the 11px floor (badges, sublabels, metadata).
   - Check `-webkit-font-smoothing` and synthetic bold prevention (`font-synthesis: none`).
5. **Platform Conventions & Brand Conformity**:
   - Audit branding against App Store Guideline 4.9.
   - Run `bash .agents/skills/apple-impeccable/scripts/run-audit.sh hig src` and `run-audit.sh appledesign src`.

### Output
Write your comprehensive audit to:
`/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/reviewer_m2_1/handoff.md`
Include structured tables: Strict HIG Violations, Severity (Critical/High/Medium), Route/Component, Guideline Citation, and Required Remediation.
When finished, send your completion message.
Remember: DO NOT modify any project source files!
