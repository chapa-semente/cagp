# Handoff Report: Architecture, Dependencies, and Dev Server Execution Survey

## 1. Observation

Direct observations from codebase inspection, system environment discovery, and execution tests:

### 1.1 Project Framework, Language, and Toolchain
- **Project Configuration (`package.json`)**:
  - Name: `"cagp-ufmg-superapp"`
  - Version: `"3.0.0"`
  - Module type: `"type": "module"` (ESM)
  - Engine requirement: `"node": ">=22.0.0"`
  - Core Framework: Astro 7.4.4 (`"astro": "^7.4.4"`)
  - UI Library: React 19.0.0 (`"react": "^19.0.0"`, `"react-dom": "^19.0.0"`, `"@astrojs/react": "^4.2.1"`)
  - Styling: Tailwind CSS v4 (`"@tailwindcss/vite": "^4.0.9"`, `"tailwindcss": "^4.0.9"`), Bootstrap Icons (`"bootstrap-icons": "^1.11.3"`), and root SCSS (`_variables.scss`)
  - Schema / Validation: Zod 3.24.2 (`"zod": "^3.24.2"`)
  - Language & Toolchain: TypeScript 5.7.3 (`"typescript": "^5.7.3"`), Vitest 3.0.7 / 3.2.7 (`"vitest": "^3.0.7"`), JSDOM 26.0.0 (`"jsdom": "^26.0.0"`), React Testing Library 16.2.0 (`"@testing-library/react": "^16.2.0"`)
- **Astro Configuration (`astro.config.mjs`)**:
  - Line 14: `output: 'static'` (Static Site Generation / SSG mode)
  - Line 15: `outDir: './dist'`
  - Line 16-18: `site: isGitHubActions && githubRepo ? ... : 'https://cagp-ufmg.github.io'`
  - Line 19-21: `base: isGitHubActions && repoName && !isUserPage ? '/${repoName}' : '/'` (defaults to `'/'` in local development)
  - Line 23: `plugins: [tailwindcss()]` via `@tailwindcss/vite`
  - Line 35: `integrations: [react()]`
- **Build & Test Outputs**:
  - `npm run typecheck` runs `tsc -b` and exits cleanly with code 0.
  - `npm test` runs `vitest run`, passing 6/6 test files and 36/36 tests in 1.06s.
  - `npm run build` runs `astro build && node scripts/generate-sw-manifest.mjs`, compiling 24 static pages and generating `dist/sw.js` with 276 precache assets in 1.89s.

### 1.2 Route Topology (24 Public Routes)
Static inspection of `src/pages/` and build manifest confirms 24 public routes:
1. Top-Level Pages (16 routes):
   - `/` (`src/pages/index.astro`) — Portal Home & Super App Discente
   - `/acg` (`src/pages/acg.astro`) — Atividades Complementares de Graduação
   - `/calouros` (`src/pages/calouros.astro`) — Guia do Calouro
   - `/configuracoes` (`src/pages/configuracoes.astro`) — Preferências e Acessibilidade Universal
   - `/curso` (`src/pages/curso.astro`) — Estrutura Institucional e Coordenação
   - `/documentos` (`src/pages/documentos.astro`) — Acervo de Documentos Oficiais
   - `/estagio` (`src/pages/estagio.astro`) — Guia de Estágio e Convênios
   - `/estagio-tcc` (`src/pages/estagio-tcc.astro`) — Hub Integrado de Práticas
   - `/faq` (`src/pages/faq.astro`) — Central de Dúvidas Frequentes
   - `/gestao` (`src/pages/gestao.astro`) — Gestão CAGP e Transparência
   - `/mapa-do-site` (`src/pages/mapa-do-site.astro`) — Mapa de Navegação Completo
   - `/optativas` (`src/pages/optativas.astro`) — Catálogo e Filtros de Optativas
   - `/percurso` (`src/pages/percurso.astro`) — Percurso Curricular e Fluxograma
   - `/pesquisa` (`src/pages/pesquisa.astro`) — Linhas de Pesquisa e Extensão
   - `/sobre` (`src/pages/sobre.astro`) — História e Estatuto
   - `/tcc` (`src/pages/tcc.astro`) — Diretrizes de TCC
2. Dynamic Route Collection (`/documentos/[slug]`, 8 routes):
   Defined in `src/pages/documentos/[slug].astro` via `getCollection('documentosOficiais')`:
   - `/documentos/ppc-gestao-publica-ufmg`
   - `/documentos/regulamento-gestao-publica-ufmg`
   - `/documentos/regimento-interno-cagp-ufmg`
   - `/documentos/percurso-bacharelado-nucleo-geral`
   - `/documentos/percurso-bacharelado-nucleo-complementar`
   - `/documentos/percurso-bacharelado-nucleo-avancado`
   - `/documentos/ementario-gestao-publica-ufmg`
   - `/documentos/transcricao-recepcao-ingressantes-2024-2`

### 1.3 Local Dev Server Lifecycle & Port Binding
- **Node & NPM Version**:
  - `node`: `v26.13.0`
  - `npm`: `12.2.1`
- **Astro 7 CLI Background Process Commands**:
  Astro 7 includes built-in background daemon controls:
  - Start in background: `npx astro dev --background` (default port 4321, binds `http://localhost:4321`). Output observed:
    `{"message":"Dev server running at http://localhost:4321 (pid 15667)\n Stop: astro dev stop\n Status: astro dev status\n Logs: astro dev logs","label":"SKIP_FORMAT","level":"info"}`
  - Check status: `npx astro dev status`
    `{"message":"Dev server running at http://localhost:4321 (pid 15667, uptime 2s, background)","label":"SKIP_FORMAT","level":"info"}`
  - Check logs: `npx astro dev logs`
  - Stop server: `npx astro dev stop`
    `{"message":"Stopped dev server (pid 15667).","label":"SKIP_FORMAT","level":"info"}`
- **Alternative Static Preview Server**:
  - Command: `npx astro preview --background` (serves `./dist` directly on port 4321 with identical stop/status commands).
- **HTTP Verification**:
  - `curl -sI http://localhost:4321/` returned `HTTP/1.1 200 OK`, `content-type: text/html`.

### 1.4 Browser Automation and CDP Tools Available
- **System Google Chrome**:
  - Binary path: `/home/gsathler/.config/Antigravity/bin/google-chrome` (symlinked to `/usr/bin/google-chrome-stable`).
  - Chromium symlink: `/home/gsathler/.config/Antigravity/bin/chromium` -> `/usr/bin/google-chrome-stable`.
  - Version: `Google Chrome 156.0.8078.79`.
  - Headless execution verified: `google-chrome --headless=new --dump-dom about:blank` executed successfully.
  - Remote debugging supported via `--remote-debugging-port=<port>`.
- **Node.js 26 Runtime Capabilities**:
  - Native `globalThis.WebSocket` and `globalThis.fetch` confirmed available in Node `v26.13.0`, allowing zero-dependency Chrome DevTools Protocol (CDP) client scripts.
- **Playwright Availability**:
  - Playwright CLI v1.64.1 is available via `npx playwright`.
  - Playwright module is present in `~/.npm/_npx/e41f203b7505f1fb/node_modules/playwright`.
  - Node scripts can import Playwright directly using:
    `NODE_PATH="/home/gsathler/.npm/_npx/e41f203b7505f1fb/node_modules" node <script>.js`
  - Browser binaries cached at `~/.cache/ms-playwright/`:
    - `chromium-1248` (Playwright Chromium 156.0.8078.4): Fully functional.
    - `firefox-1555` (Playwright Firefox 157.0): Fully functional.
    - `webkit-2370`: Launch fails with error `Host system is missing dependencies to run browsers (libicu74, libxml2, libflite1)`.
    - System Chrome: Playwright can launch `/home/gsathler/.config/Antigravity/bin/google-chrome` via `executablePath` without issues.
- **Impeccable Inspection Engine**:
  - Binary: `.agents/skills/impeccable/scripts/bin/linux-x64/impeccable` (v4.7.0).
  - Live URL audit verified:
    `.agents/skills/impeccable/scripts/bin/linux-x64/impeccable detect http://localhost:4321/ --json`
    Executes a headless Puppeteer browser pass over the running URL, evaluates layout and DOM, and reports structured JSON with selectors and WCAG violations (e.g. `low-contrast`, `undersized-ui-text`, `tiny-text`, `skipped-heading`, `cream-palette`).
- **Apple Impeccable Audit Runner**:
  - Script: `.agents/skills/apple-impeccable/scripts/run-audit.sh`
  - Syntax validated (`bash -n`), test run on `src/pages/index.astro` completed with zero fatal errors and 2 consultative warnings.

---

## 2. Logic Chain

1. **Tech Stack & Toolchain Compatibility**:
   - `package.json` specifies Node `>=22.0.0`. The host environment is `v26.13.0` and npm `12.2.1`.
   - Astro 7.4.4 with `@astrojs/react` and `@tailwindcss/vite` compiles cleanly in both dev and static build modes.
   - Tests execute with Vitest and JSDOM, confirming DOM and React component logic are healthy before any browser audit begins.

2. **Server Lifecycle Management**:
   - Astro 7 natively supports background daemon management (`astro dev --background`, `astro dev status`, `astro dev stop`).
   - This eliminates the need for manual PID hunting or external tools like `pm2` or `nohup`.
   - The server binds to port 4321 and serves pages with base path `'/'`.

3. **Browser Automation Feasibility**:
   - System Chrome 156 and Playwright Chromium 156 are both functional in headless mode.
   - Node 26 provides native `WebSocket` and `fetch`, and Playwright can be loaded with `NODE_PATH` without altering `package.json`.
   - Impeccable CLI binary (v4.7.0) natively audits live URLs using an internal Puppeteer runner, accepting `--viewport`, `--json`, and `--cdp`.
   - Therefore, the subsequent audit agents have three robust avenues for live browser rendering:
     a) `impeccable detect http://localhost:4321/<route> --json` (instant automated anti-pattern & accessibility audit)
     b) Playwright scripts launched with `NODE_PATH` (custom interaction, screenshot capture, DOM queries)
     c) Headless Chrome with remote debugging port (`--remote-debugging-port=9222`) connecting to CDP.

4. **Execution Hazards & Defensive Measures**:
   - Observation: When `impeccable detect` finds anti-patterns (e.g. low contrast text), it exits with status code 2 by design.
   - Consequence: In bash scripts using `set -e` or compound commands (`astro dev --background && ... && astro dev stop`), an audit finding causes the command chain to abort before `astro dev stop` is called, leaving the dev server running as a zombie process on port 4321.
   - Remedy: Dev server start and stop must always be enclosed in a protective wrapper (e.g. `trap 'npx astro dev stop' EXIT` in bash, or `try / finally` in Node).
   - WebKit limitation: Playwright WebKit cannot run due to missing Linux libraries (`libicu74`). Any multi-browser audit matrix must restrict execution to Chromium / Google Chrome (and optionally Firefox).

---

## 3. Caveats

- **Playwright WebKit**: Missing system shared libraries (`libicu74`, `libxml2`, `libflite1`). WebKit testing is unavailable in this environment unless system packages are installed via root/sudo (which is not permissible). Chromium and Google Chrome are 100% operational.
- **Port Availability**: If another process or previous unclean run occupies port 4321, Astro will attempt to bind or error. Always execute `npx astro dev stop` or verify port status prior to test runs.
- **Static vs Dev Route Consistency**: `astro dev` serves routes dynamically, while `astro build && astro preview` serves pre-rendered HTML. Both bind to port 4321 and serve the identical 24 routes.

---

## 4. Conclusion

1. **Architecture**: Astro 7.4.4 static site with React 19 and Tailwind CSS v4. Clean codebase with zero external database or backend API dependencies.
2. **Routes**: Exactly 24 public routes (16 top-level + 8 `/documentos/[slug]`).
3. **Dev Server Launch**: Start with `npx astro dev --background` (port 4321); check with `npx astro dev status`; terminate with `npx astro dev stop`.
4. **Browser Automation Ready**: Headless Google Chrome 156 (`/usr/bin/google-chrome-stable`), Playwright Chromium 156 (via `NODE_PATH`), and Impeccable CLI (v4.7.0) are fully operational and ready for live browser rendering and inspection.
5. **No Project Source Modification**: All survey actions were completely read-only; no project source code files were altered.

---

## 5. Verification Method

To independently verify all findings:

1. **Verify TypeScript & Vitest**:
   ```bash
   npm run typecheck
   npm test
   ```
2. **Verify Static Build and 24 Routes**:
   ```bash
   npm run build
   # Check generated route count:
   find dist -name "index.html" | wc -l # Expects 24
   ```
3. **Verify Dev Server Lifecycle**:
   ```bash
   npx astro dev --background
   npx astro dev status
   curl -sI http://localhost:4321/
   npx astro dev stop
   npx astro dev status
   ```
4. **Verify Playwright & Chrome Automation**:
   ```bash
   NODE_PATH="/home/gsathler/.npm/_npx/e41f203b7505f1fb/node_modules" node -e '
   const { chromium } = require("playwright");
   (async () => {
     const b = await chromium.launch({ headless: true });
     console.log("Chromium version:", b.version());
     await b.close();
   })();'
   ```
5. **Verify Impeccable URL Detection**:
   ```bash
   npx astro dev --background
   sleep 2
   .agents/skills/impeccable/scripts/bin/linux-x64/impeccable detect http://localhost:4321/ --json > /tmp/test-findings.json || true
   npx astro dev stop
   head -n 20 /tmp/test-findings.json
   ```

**Invalidation conditions**:
- Node version drops below `22.0.0`.
- Port 4321 is blocked by an unmonitored external process.
- Project dependencies modified without `npm install`.
