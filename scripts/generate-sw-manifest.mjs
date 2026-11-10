// Gera o dist/sw.js final a partir de public/sw.js (roda depois do `astro build`).
//
// - Precache = só o "casco" do app (páginas, JS/CSS, fontes latinas, ícones, logos da Semente e
//   fotos do tour). PDFs, fotos e ilustrações entram no cache quando a pessoa abre.
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

const SHELL = [
  /^(.+\/)?index\.html$/, // páginas
  /^_astro\/.+\.(js|css)$/,
  // Fontes: só woff2 (todo navegador com SW lê woff2) e só subconjuntos usados em português.
  /^_astro\/(?!.*(devanagari|cyrillic|greek|vietnamese|hebrew|arabic|thai|math|symbols)).+\.woff2$/,
  /^manifest\.webmanifest$/,
  /^favicon/,
  /^imagens\/pwa\//,
  /^logos\/semente\//,
  /^images\/chapa\/tour\//,
];

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

const entries = allFiles
  .filter((rel) => sharedImages.has(rel) || SHELL.some((re) => re.test(rel)))
  .sort()
  .map((rel) => {
    // Página: guarda só a forma com barra final (curso/), a URL que o site usa.
    const url = rel === 'index.html' ? './' : rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
    const rev = rel.startsWith('_astro/') ? null : hash(fs.readFileSync(path.join(distDir, rel)));
    return [url, rev];
  });

if (!entries.some(([url]) => url === './')) fail('a página inicial (index.html) não entrou no precache.');
if (!entries.some(([url]) => url.startsWith('_astro/'))) fail('nenhum arquivo de /_astro/ entrou no precache.');

const swSource = fs.readFileSync(swSrcPath, 'utf8');
const VERSION_RE = /const VERSION = '[^']*';/;
const PRECACHE_RE = /const PRECACHE = \[\];/;
if (!VERSION_RE.test(swSource)) fail("public/sw.js precisa ter a linha `const VERSION = 'dev';`.");
if (!PRECACHE_RE.test(swSource)) fail('public/sw.js precisa ter a linha `const PRECACHE = [];`.');

const manifestJson = JSON.stringify(entries);
const version = hash(manifestJson + swSource);
const output = swSource
  .replace(VERSION_RE, () => `const VERSION = '${version}';`)
  .replace(PRECACHE_RE, () => `const PRECACHE = ${manifestJson};`);

fs.writeFileSync(swDistPath, output, 'utf8');

const bytes = entries.reduce((sum, [url]) => {
  const rel = url === './' ? 'index.html' : url.endsWith('/') ? `${url}index.html` : url;
  return sum + fs.statSync(path.join(distDir, rel)).size;
}, 0);
console.log(
  `[SW-Manifest] ${entries.length} arquivos no precache (${(bytes / 1e6).toFixed(1)} MB sem compressão), versão ${version}`
);
