// Gera o dist/sw.js final a partir de public/sw.js (roda depois do `astro build`).
//
// - Precache = só o "casco" do app (páginas, JS/CSS, fontes latinas, ícones, logos da Semente e
//   fotos do tour), dividido em duas listas:
//     PRECACHE      = núcleo (CORE_PAGES + o JS/CSS que elas carregam + fontes, ícones e logos da
//                     moldura). A instalação só espera por ele.
//     PRECACHE_REST = o resto do casco. Desce depois, em segundo plano.
//   Fotos e ilustrações entram no cache quando a pessoa abre. Documentos (PDF/DOCX) nunca entram.
// - Cada entrada leva uma revisão (hash do conteúdo); /_astro/ já tem hash no nome (revisão null).
//   O SW novo copia do cache antigo tudo que não mudou e só baixa o resto.
// - VERSION = hash do casco + do código do SW. Deploy sem mudança no casco gera um sw.js idêntico,
//   e o navegador nem reinstala (antes era Date.now(): todo deploy rebaixava tudo).
// - Caminhos relativos ao escopo, sem base path: o mesmo dist funciona em /cagp/ ou num domínio
//   próprio, sem depender das variáveis do GitHub Actions.
// - Falha o build (exit 1) se algo não bater, em vez de publicar um SW vazio em silêncio.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const distDir = path.resolve('dist');
const swSrcPath = path.resolve('public/sw.js');
const swDistPath = path.join(distDir, 'sw.js');

function fail(msg) {
  console.error(`[SW-Manifest] ERRO: ${msg}`);
  process.exit(1);
}

if (!fs.existsSync(distDir)) fail('dist/ não existe. Rode `astro build` antes.');
if (!fs.existsSync(swSrcPath)) fail('public/sw.js não existe.');

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

// Fontes: só woff2 (todo navegador com SW lê woff2) e só subconjuntos usados em português.
// A fonte de ícones entra em qualquer formato: sem ela a moldura abre offline sem ícone nenhum.
const FONT_RE = /^_astro\/(?!.*(devanagari|cyrillic|greek|vietnamese|hebrew|arabic|thai|math|symbols)).+\.woff2$/;
const ICON_FONT_RE = /^_astro\/phosphor-[^/]+\.woff2?$/;
// A OpenDyslexic só é usada por quem liga a opção em Acessibilidade: fica na segunda etapa.
const LATE_FONT_RE = /opendyslexic/i;

const SHELL = [
  /^(.+\/)?index\.html$/, // páginas
  /^_astro\/.+\.(js|css)$/,
  FONT_RE,
  ICON_FONT_RE,
  /^manifest\.webmanifest$/,
  /^favicon/,
  /^imagens\/pwa\//,
  /^logos\/semente\//,
  /^images\/chapa\/tour\//,
];

// Núcleo: as cinco abas, os documentos e os guias mais procurados. O que elas carregam de JS/CSS
// é descoberto lendo o próprio build (abaixo), então a lista não precisa acompanhar o código.
const CORE_PAGES = [
  '', // Hoje
  'guias/',
  'documentos/',
  'chapa-semente/',
  'gestao/', // eleição e como votar
  'meu-curso/',
  'mais/',
  'calouros/',
  'estagio/',
  'permanencia/',
  'tcc/',
  'formatura/',
  'faq/',
];
// Arquivos do casco que toda página usa, além do JS/CSS: entram no núcleo.
const CORE_ASSETS = [/^manifest\.webmanifest$/, /^favicon/, /^imagens\/pwa\//, /^logos\/semente\//];

const hash = (buf) => crypto.createHash('sha256').update(buf).digest('hex').slice(0, 12);

const allFiles = walk(distDir)
  .map((full) => path.relative(distDir, full).split(path.sep).join('/'))
  .filter((rel) => rel !== 'sw.js' && !rel.endsWith('.map'));

// Imagens da moldura do site (logos do rodapé, selos parceiros): qualquer imagem pequena que
// aparece em pelo menos 1/4 das páginas entra no casco, sem precisar manter lista à mão.
// Sem isso o app offline abria com os logos quebrados.
const SHARED_IMAGE_MAX_BYTES = 150_000;
const pages = allFiles.filter((rel) => rel.endsWith('index.html'));
const pageHtml = pages.map((rel) => fs.readFileSync(path.join(distDir, rel), 'utf8'));
const sharedImages = new Set(
  allFiles.filter((rel) => {
    if (rel.startsWith('_astro/') || !/\.(png|jpe?g|webp|avif|svg|gif)$/i.test(rel)) return false;
    if (fs.statSync(path.join(distDir, rel)).size > SHARED_IMAGE_MAX_BYTES) return false;
    const needles = [`/${rel}"`, `/${encodeURI(rel)}"`];
    const uses = pageHtml.filter((html) => needles.some((n) => html.includes(n))).length;
    return uses >= Math.max(2, pages.length / 4);
  })
);

// JS/CSS que uma página carrega: o que o HTML cita em /_astro/ mais os imports estáticos de cada
// arquivo, em cadeia. Imports dinâmicos (import('...')) ficam de fora: são carga sob demanda.
const allSet = new Set(allFiles);
function astroClosure(pageRel) {
  const html = fs.readFileSync(path.join(distDir, pageRel), 'utf8');
  const seen = new Set();
  const stack = [...html.matchAll(/_astro\/([A-Za-z0-9_.\-]+\.(?:js|css))/g)].map((m) => `_astro/${m[1]}`);
  while (stack.length) {
    const rel = stack.pop();
    if (seen.has(rel) || !allSet.has(rel)) continue;
    seen.add(rel);
    if (!rel.endsWith('.js')) continue;
    const js = fs.readFileSync(path.join(distDir, rel), 'utf8');
    for (const m of js.matchAll(/(?:from|import)\s*"\.\/([^"]+\.js)"/g)) stack.push(`_astro/${m[1]}`);
  }
  return seen;
}

const core = new Set();
for (const page of CORE_PAGES) {
  const rel = `${page}index.html`;
  if (!allSet.has(rel)) fail(`a página do núcleo "${page || '/'}" não existe no build (CORE_PAGES).`);
  core.add(rel);
  for (const dep of astroClosure(rel)) core.add(dep);
}

const toEntry = (rel) => {
  // Página: guarda só a forma com barra final (curso/), a URL que o site usa.
  const url = rel === 'index.html' ? './' : rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
  const rev = rel.startsWith('_astro/') ? null : hash(fs.readFileSync(path.join(distDir, rel)));
  return [url, rev];
};

const shellFiles = allFiles.filter((rel) => sharedImages.has(rel) || SHELL.some((re) => re.test(rel))).sort();
const isCore = (rel) =>
  core.has(rel) ||
  sharedImages.has(rel) ||
  CORE_ASSETS.some((re) => re.test(rel)) ||
  ICON_FONT_RE.test(rel) ||
  (FONT_RE.test(rel) && !LATE_FONT_RE.test(rel));
const entries = shellFiles.filter(isCore).map(toEntry);
const restEntries = shellFiles.filter((rel) => !isCore(rel)).map(toEntry);

if (!entries.some(([url]) => url === './')) fail('a página inicial (index.html) não entrou no precache.');
if (!entries.some(([url]) => url.startsWith('_astro/'))) fail('nenhum arquivo de /_astro/ entrou no precache.');
if ([...entries, ...restEntries].some(([url]) => /^documentos\/[^/]+\.[a-z0-9]+$/i.test(url)))
  fail('um documento (PDF/DOCX) entrou no precache; eles nunca devem ser guardados.');

const swSource = fs.readFileSync(swSrcPath, 'utf8');
const VERSION_RE = /const VERSION = '[^']*';/;
const PRECACHE_RE = /const PRECACHE = \[\];/;
const REST_RE = /const PRECACHE_REST = \[\];/;
if (!VERSION_RE.test(swSource)) fail("public/sw.js precisa ter a linha `const VERSION = 'dev';`.");
if (!PRECACHE_RE.test(swSource)) fail('public/sw.js precisa ter a linha `const PRECACHE = [];`.');
if (!REST_RE.test(swSource)) fail('public/sw.js precisa ter a linha `const PRECACHE_REST = [];`.');

const manifestJson = JSON.stringify(entries);
const restJson = JSON.stringify(restEntries);
const version = hash(manifestJson + restJson + swSource);
const output = swSource
  .replace(VERSION_RE, () => `const VERSION = '${version}';`)
  .replace(PRECACHE_RE, () => `const PRECACHE = ${manifestJson};`)
  .replace(REST_RE, () => `const PRECACHE_REST = ${restJson};`);

fs.writeFileSync(swDistPath, output, 'utf8');

const mb = (list) =>
  (
    list.reduce((sum, [url]) => {
      const rel = url === './' ? 'index.html' : url.endsWith('/') ? `${url}index.html` : url;
      return sum + fs.statSync(path.join(distDir, rel)).size;
    }, 0) / 1e6
  ).toFixed(1);
console.log(
  `[SW-Manifest] núcleo: ${entries.length} arquivos (${mb(entries)} MB) · resto: ${restEntries.length} arquivos (${mb(restEntries)} MB), sem compressão · versão ${version}`
);
