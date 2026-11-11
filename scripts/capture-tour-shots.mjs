// capture-tour-shots.mjs — Gera as capturas estáticas do tour da Chapa Semente.
//
// O tour não navega pelo site: mostra uma foto de cada ferramenta e recorta o alvo na própria foto.
// Este script abre cada parada num Chrome sem janela, rola até o alvo (`data-tour`), fotografa em
// celular e em desktop e grava onde o alvo está dentro da imagem.
//
//   pnpm build && pnpm preview --port 4330        (em outro terminal)
//   node scripts/capture-tour-shots.mjs http://localhost:4330
//
// Saída: public/images/chapa/tour/shots/<id>-{mobile,desktop}.webp e src/data/sementeTourShots.json.
// Rode de novo sempre que o visual de uma ferramenta do tour mudar.
import { spawn, execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = (process.argv[2] || 'http://localhost:4330').replace(/\/$/, '');
const outDir = join(root, 'public/images/chapa/tour/shots');
const PORT = 9333;
const CHROME = process.env.CHROME_BIN || 'google-chrome-stable';

const VARIANTS = {
  mobile: { width: 390, height: 1000, dpr: 2, mobile: true, header: 72 },
  desktop: { width: 1440, height: 1000, dpr: 1, mobile: false, header: 88 },
};

// Roteiro lido do próprio código do tour (rota, aba e alvo de cada pessoa).
const src = readFileSync(join(root, 'src/lib/sementeTour.ts'), 'utf8');
const stops = [...src.matchAll(/leaderId: '(\w+)',[\s\S]*?route: route\('([^']+)'\),(?:\s*tab: '(\w+)',)?\s*target: '([^']+)'/g)].map(
  ([, id, route, tab, target]) => ({ id, route, tab, target }),
);
if (stops.length < 12) throw new Error(`Só achei ${stops.length} paradas em sementeTour.ts`);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const profile = mkdtempSync(join(tmpdir(), 'tour-shots-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--hide-scrollbars', '--no-first-run', 'about:blank'], { stdio: 'ignore' });

async function connect() {
  for (let i = 0; i < 50; i++) {
    try {
      const tabs = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
      const page = tabs.find((t) => t.type === 'page');
      if (page) return new WebSocket(page.webSocketDebuggerUrl);
    } catch {}
    await sleep(200);
  }
  throw new Error('Chrome não respondeu');
}

const ws = await connect();
await new Promise((r) => (ws.onopen = r));
let seq = 0;
const pending = new Map();
const waiters = [];
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  } else if (msg.method) {
    for (let i = waiters.length - 1; i >= 0; i--) if (waiters[i].method === msg.method) waiters.splice(i, 1)[0].resolve();
  }
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
const once = (method) => new Promise((resolve) => waiters.push({ method, resolve }));
const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'erro na página');
  return r.result.value;
};

await send('Page.enable');
await send('Runtime.enable');
// O visitante da foto já viu o tour e a abertura: nada cobre a página.
await send('Page.addScriptToEvaluateOnNewDocument', {
  source: `try {
    localStorage.setItem('cagp_semente_tour_v2', JSON.stringify({ status: 'done', index: 0 }));
    sessionStorage.setItem('cagp_splash_off', '1');
  } catch {}`,
});

mkdirSync(outDir, { recursive: true });
const manifest = {};
try {
  for (const stop of stops) {
    manifest[stop.id] = {};
    for (const [name, v] of Object.entries(VARIANTS)) {
      await send('Emulation.setDeviceMetricsOverride', { width: v.width, height: v.height, deviceScaleFactor: v.dpr, mobile: v.mobile });
      const loaded = once('Page.loadEventFired');
      await send('Page.navigate', { url: `${base}${stop.route}` });
      await loaded;
      await sleep(1400); // ilhas React e fontes
      const rect = await evaluate(`(async () => {
        const wait = (ms) => new Promise((r) => setTimeout(r, ms));
        const tab = ${JSON.stringify(stop.tab ?? null)};
        if (tab) {
          const btn = document.querySelector('.cagp-workspace-tab[data-ws-tab="' + tab + '"]');
          if (btn && btn.getAttribute('aria-selected') !== 'true') { btn.click(); await wait(500); }
        }
        let el = null;
        for (let i = 0; i < 40 && !el; i++) {
          const c = document.querySelector(${JSON.stringify(stop.target)});
          if (c && c.getBoundingClientRect().height > 0) el = c; else await wait(100);
        }
        if (!el) return null;
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.paddingBottom = '900px';
        window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - ${v.header});
        await wait(900); // animações de entrada guiadas pela rolagem assentam
        const r = el.getBoundingClientRect();
        return { x: r.left, y: r.top, w: r.width, h: r.height };
      })()`);
      if (!rect) throw new Error(`${stop.id}: alvo ${stop.target} não apareceu em ${stop.route} (${name})`);
      const { data } = await send('Page.captureScreenshot', { format: 'png' });
      const png = join(profile, `${stop.id}-${name}.png`);
      const file = `${stop.id}-${name}.webp`;
      writeFileSync(png, Buffer.from(data, 'base64'));
      execFileSync('cwebp', ['-quiet', '-q', name === 'mobile' ? '72' : '76', png, '-o', join(outDir, file)]);
      const round = (n) => Math.round(n);
      manifest[stop.id][name] = {
        src: `/images/chapa/tour/shots/${file}`,
        w: v.width,
        h: v.height,
        rect: { x: round(rect.x), y: round(rect.y), w: round(rect.w), h: round(Math.min(rect.h, v.height - rect.y)) },
      };
      console.log(`${stop.id} ${name}: alvo ${round(rect.w)}×${round(rect.h)} em (${round(rect.x)}, ${round(rect.y)})`);
    }
  }
  writeFileSync(join(root, 'src/data/sementeTourShots.json'), `${JSON.stringify(manifest, null, 1)}\n`);
  console.log('ok → src/data/sementeTourShots.json');
} finally {
  ws.close();
  chrome.kill();
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
}
