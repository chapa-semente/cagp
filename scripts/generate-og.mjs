// generate-og.mjs — Gera os banners de compartilhamento (prévia de link e kit de divulgação).
//
// Rede social não lê SVG nem roda o site: a prévia de um link é um JPG parado. Este script monta cada
// banner como vetor (scripts/og/moldes.mjs), abre num Chrome sem janela com as fontes do site e grava:
//
//   public/og/<nome>.jpg        1200×630   prévia de link (WhatsApp, X, Facebook, Instagram Direct)
//   public/og/kit/<nome>.jpg    em pé      story (1080×1920) e feed (1080×1350) do kit de divulgação
//
// Os textos e os pareamentos vêm do próprio site, nada é digitado aqui:
//   src/data/compartilhamento.json     páginas, documentos, normas, cargo curto e foco de cada foto
//   src/lib/chapaSementeData.ts        nomes dos 12 integrantes
//   src/lib/sementeTour.ts             a dor de cada integrante (gancho do banner de pessoa)
//   src/lib/propostasTour.ts           as 14 propostas, quem puxa cada uma e a fala literal do briefing
//
//   node scripts/generate-og.mjs                  todos os banners
//   node scripts/generate-og.mjs --so=proposta    só os que começam com "proposta"
//   node scripts/generate-og.mjs --fase=depois    barra sem data nem adesivo (depois de 26/11/2026)
//
// Rode de novo quando mudar um texto, uma foto ou um molde, e suba `versao` em compartilhamento.json:
// o WhatsApp guarda a prévia antiga de um endereço, e a versão entra no endereço da imagem.
import { spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { criarMoldes, SUBLINHAR } from './og/moldes.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public/og');
const PORT = 9334;
const CHROME = process.env.CHROME_BIN || 'google-chrome-stable';
const arg = (nome, padrao) => process.argv.find((a) => a.startsWith(`--${nome}=`))?.split('=')[1] ?? padrao;
const fase = arg('fase', 'antes');
const so = arg('so', '');
if (!['antes', 'dia', 'depois'].includes(fase)) throw new Error(`--fase deve ser antes, dia ou depois (veio "${fase}")`);

const ler = (rel) => readFileSync(join(root, rel), 'utf8');
const dataUri = (rel, mime) => `data:${mime};base64,${readFileSync(join(root, rel)).toString('base64')}`;

// ---------- dados do site ----------
const dados = JSON.parse(ler('src/data/compartilhamento.json'));
const maisPedidos = JSON.parse(ler('src/data/documentosMaisPedidos.json'));

const ordem = [];
const pessoas = {};
for (const [, id, nome] of ler('src/lib/chapaSementeData.ts').matchAll(/\n\s*id: '(\w+)',\s*name: '([^']+)',/g)) {
  const cfg = dados.pessoas[id];
  if (!cfg) throw new Error(`Falta "${id}" em compartilhamento.json › pessoas`);
  ordem.push(id);
  pessoas[id] = { nome, cargo: cfg.cargo, fx: cfg.foco[0], fy: cfg.foco[1] };
}
if (ordem.length !== 12) throw new Error(`Esperava 12 integrantes em chapaSementeData.ts, achei ${ordem.length}`);

const ganchos = Object.fromEntries(
  [...ler('src/lib/sementeTour.ts').matchAll(/leaderId: '(\w+)',[\s\S]*?hook: '([^']+)'/g)].map(([, id, hook]) => [id, hook]),
);
for (const id of ordem) if (!ganchos[id]) throw new Error(`Falta o gancho de "${id}" em sementeTour.ts`);

const eixoDe = Object.fromEntries(
  [...ler('src/components/features/semente/CartaPropostaInteractive.tsx').matchAll(/\bid: (\d+),\s*eixoId: (\d)/g)].map(([, n, e]) => [n, Number(e)]),
);
const propostas = [...ler('src/lib/propostasTour.ts').matchAll(/\{\s*id: (\d+),([\s\S]*?)\n  \},/g)].map(([, n, corpo]) => {
  const campo = (nome) => {
    const m = corpo.match(new RegExp(`${nome}: (?:'([^']*)'|"([^"]*)")`));
    if (!m) throw new Error(`Proposta ${n}: não achei "${nome}" em propostasTour.ts`);
    return m[1] ?? m[2];
  };
  return { n: Number(n), eixo: eixoDe[n], titulo: campo('titulo'), pessoa: campo('leaderId'), fala: campo('fala'), modelo: /simulado: true/.test(corpo) };
});
if (propostas.length !== 14 || propostas.some((p) => !p.eixo)) throw new Error(`Esperava 14 propostas com eixo, achei ${propostas.length}`);

const docsPedidos = maisPedidos.grupos.flatMap((g) => g.documentos);

// ---------- Chrome sem janela (mesmo caminho de scripts/capture-tour-shots.mjs) ----------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const profile = mkdtempSync(join(tmpdir(), 'og-banners-'));
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

let gerados = 0;
try {
  await send('Page.enable');
  await send('Runtime.enable');

  // Palco: fontes do site embutidas, fotos e logos definidos uma vez e reusados por <use>.
  const geometria = ler('src/lib/sementeGeometry.ts');
  const curva = (nome) => geometria.match(new RegExp(`${nome} =\\s*'([^']+)'`))[1];
  const fontes = [
    ['Poppins', 400, 'node_modules/@fontsource/poppins/files/poppins-latin-400-normal.woff2'],
    ['Poppins', 700, 'node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff2'],
    ['Permanent Marker', 400, 'node_modules/@fontsource/permanent-marker/files/permanent-marker-latin-400-normal.woff2'],
  ]
    .map(([familia, peso, arq]) => `@font-face{font-family:'${familia}';font-weight:${peso};src:url(${dataUri(arq, 'font/woff2')}) format('woff2')}`)
    .join('');
  const imagens = {
    ...Object.fromEntries(ordem.map((id) => [`ph-${id}`, dataUri(`public/images/chapa/tour/${id}.webp`, 'image/webp')])),
    'lg-h': dataUri('public/logos/semente/semente-horizontal.webp', 'image/webp'),
    'lg-hb': dataUri('public/logos/semente/semente-horizontal-branco.webp', 'image/webp'),
  };
  const palco = join(profile, 'palco.html');
  writeFileSync(
    palco,
    `<!doctype html><html><head><meta charset="utf-8"><style>${fontes}html,body{margin:0;background:#fff}svg{display:block}</style></head><body>` +
      `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute"><defs id="defs">` +
      `<path id="g-folha" d="${curva('FOLHA_PATH')}"/><path id="g-gota" d="${curva('SEMENTE_PATH')}"/></defs></svg>` +
      `<div id="palco"></div><script>window.__img = ${JSON.stringify(imagens)};</script></body></html>`,
  );
  const carregou = once('Page.loadEventFired');
  await send('Page.navigate', { url: pathToFileURL(palco).href });
  await carregou;

  // Tamanho real de cada imagem (para o recorte "cover" da foto) e fontes prontas antes de medir texto.
  const medidas = await evaluate(`(async () => {
    await Promise.all([document.fonts.load('700 40px Poppins'), document.fonts.load('400 40px Poppins'), document.fonts.load("400 40px 'Permanent Marker'")]);
    const defs = document.getElementById('defs'), out = {};
    for (const [id, src] of Object.entries(window.__img)) {
      const im = new Image(); im.src = src; await im.decode();
      out[id] = { w: im.naturalWidth, h: im.naturalHeight };
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      el.setAttribute('id', id); el.setAttribute('width', im.naturalWidth); el.setAttribute('height', im.naturalHeight); el.setAttribute('href', src);
      defs.appendChild(el);
    }
    return out;
  })()`);
  for (const id of ordem) Object.assign(pessoas[id], medidas[`ph-${id}`]);

  const m = criarMoldes({ pessoas, ordem, logo: medidas['lg-h'], logoBranco: medidas['lg-hb'], fase });

  // ---------- a lista do que gerar ----------
  const trabalhos = [{ nome: 'padrao', svg: m.padrao() }];
  for (const [rota, p] of Object.entries(dados.paginas)) {
    if (!p.banner) continue;
    const b = p.banner;
    const svg = b.molde === 'home' ? m.home() : b.molde === 'chapa' ? m.chapa() : b.molde === 'votar' ? m.votar() : b.molde === 'pagina' ? m.pagina(b) : null;
    if (!svg) throw new Error(`${rota}: molde desconhecido "${b.molde}"`);
    trabalhos.push({ nome: p.imagem, svg });
  }
  for (const d of docsPedidos) {
    const cfg = dados.documentos[d.id];
    if (!cfg) throw new Error(`Falta "${d.id}" em compartilhamento.json › documentos`);
    trabalhos.push({ nome: `doc-${d.id}`, svg: m.doc({ ...cfg, formatos: d.editavel ? ['PDF', 'WORD'] : ['PDF'] }) });
  }
  for (const [slug, cfg] of Object.entries(dados.normas)) trabalhos.push({ nome: `norma-${slug}`, svg: m.doc(cfg) });
  for (const p of propostas) trabalhos.push({ nome: `proposta-${p.n}`, svg: m.proposta(p) });
  ordem.forEach((id, i) => trabalhos.push({ nome: `pessoa-${id}`, svg: m.pessoa({ id, gancho: ganchos[id], alternar: i % 2 === 1 }) }));
  trabalhos.push({ nome: 'kit/story-voto', svg: m.storyVoto(), w: 1080, h: 1920 });
  for (const p of propostas) trabalhos.push({ nome: `kit/feed-proposta-${p.n}`, svg: m.feedProposta(p), w: 1080, h: 1350 });

  mkdirSync(join(outDir, 'kit'), { recursive: true });
  let pesados = 0;
  for (const t of trabalhos) {
    if (so && !t.nome.startsWith(so)) continue;
    const w = t.w ?? 1200;
    const h = t.h ?? 630;
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false });
    await evaluate(`(async () => {
      document.getElementById('palco').innerHTML = ${JSON.stringify(t.svg)};
      ${SUBLINHAR};
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    })()`);
    const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 86, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } });
    const buf = Buffer.from(data, 'base64');
    writeFileSync(join(outDir, `${t.nome}.jpg`), buf);
    gerados++;
    const kb = Math.round(buf.length / 1024);
    // A prévia de link precisa ficar leve (o WhatsApp descarta imagem pesada); o kit é para baixar.
    if (!t.w && kb > 300) {
      pesados++;
      console.warn(`ATENÇÃO ${t.nome}.jpg: ${kb} KB (acima de 300 KB)`);
    } else console.log(`${t.nome}.jpg  ${w}×${h}  ${kb} KB`);
  }
  console.log(`ok → ${gerados} banners em public/og/ (fase: ${fase})`);
  if (pesados) process.exitCode = 1;
} finally {
  ws.close();
  chrome.kill();
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
}
