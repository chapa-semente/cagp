# Task Assignment — Worker M1: Live Browser Execution & State Capture

## 2026-11-05T18:16:00Z

### Role & Identity
You are a `teamwork_worker` executing Milestone 1: Live Browser Execution & Multi-Route Inspection.
Your working directory: `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/worker_m1/`

### Mandatory Reading
Read:
- `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/ORIGINAL_REQUEST.md`
- `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/orchestrator/PROJECT.md`
- `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/explorer_survey_1/handoff.md`
- `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/explorer_survey_2/handoff.md`

### Hard Constraints
1. **NO SOURCE CODE MODIFICATIONS**: You must NOT modify, edit, or delete any project source code files in `/home/gsathler/Nextcloud/Projects/cagp/src/` or configuration files. You may only write scripts and reports within your working directory (`/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/worker_m1/`).
2. **GENUINE LIVE BROWSER EXECUTION**: You must launch the Astro dev server (`npx astro dev --background`) on port 4321, verify it responds with 200 OK, and execute a genuine headless browser session (Playwright Chromium via `NODE_PATH` or Google Chrome) to visit all public routes, render them, and capture live DOM metrics.
3. **MANDATORY INTEGRITY WARNING**:
> DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

### Concrete Mission
1. Verify no leftover process blocks port 4321 (`npx astro dev stop` defensively first).
2. Start the dev server in background mode: `npx astro dev --background`. Verify with `npx astro dev status` and `curl -sI http://localhost:4321/`.
3. Create a Playwright / Node automation script in `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/worker_m1/` (execute using `NODE_PATH="/home/gsathler/.npm/_npx/e41f203b7505f1fb/node_modules" node ...`).
4. In the live browser session:
   - Visit all 24 public routes (14 primary routes + 8 `/documentos/[slug]` + 2 redirect hubs).
   - Test Mobile (390x844) and Desktop (1440x900) viewports.
   - For interactive pages, click/switch SegmentedControl tabs (`#hoje`, `#apps`, `#cagp`, `#grafo`, `#optativas`, etc.).
   - Trigger global sheets and dialogs (Spotlight [⌘K], Passport, Campus, A11y, Shortcuts, Welcome Tour).
   - Test theme toggles: toggle `data-a11y-contrast="high"` and `data-a11y-font="xl"`.
   - Collect computed layout metrics:
     * Interactive elements bounding boxes (flag any $< 44\times 44$px).
     * Element positioning and Thumb Zone adherence (bottom 35% on mobile).
     * Viewport units (`100dvh` vs `100vh`) and safe area insets (`env(safe-area-inset-*)`).
     * Computed foreground/background colors and contrast ratios.
     * Liquid Glass elements (`backdrop-filter`) and check for GPU isolation (`isolation: isolate` or `transform: translateZ(0)`).
   - Capture console warnings or errors from the browser.
5. Keep the dev server running for the subsequent audit milestone, or document the exact command to re-verify.
6. Write a comprehensive execution report to:
   `/home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/worker_m1/handoff.md`
   Documenting exact commands run, routes visited, DOM metrics extracted, and logs captured.


## 2026-11-05T18:16:54Z
Received activation from parent (526c3e23-dab2-44fa-aace-fff0d311bb71):
Execute Milestone 1: Live Browser Execution & State Capture.
Working directory: /home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/worker_m1/
MANDATORY INTEGRITY WARNING: DO NOT CHEAT. All implementations must be genuine.
Write handoff report to /home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/worker_m1/handoff.md and send message to parent.
