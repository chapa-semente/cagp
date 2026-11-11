// CAGP UFMG — Service Worker (PWA offline + anti-Lie-Fi)
//
// O build (scripts/generate-sw-manifest.mjs) troca as duas constantes abaixo:
//   VERSION  -> hash do conteúdo do casco. Se nada mudou no deploy, o sw.js sai idêntico
//               e o navegador nem instala uma versão nova.
//   PRECACHE -> [caminho relativo ao escopo, revisão]. Revisão null = arquivo imutável
//               (os /_astro/ têm hash no nome). Os caminhos não carregam o base path:
//               o escopo do registro resolve (/cagp/ no GitHub Pages, / num domínio próprio).
//               É só o NÚCLEO: moldura, abas, guias mais usados. A instalação termina quando
//               ele está salvo, e o app já abre sem sinal.
//   PRECACHE_REST -> mesmo formato, o RESTO do site (ferramentas pesadas, páginas menos usadas,
//               fotos do tour). Desce depois, em segundo plano, quando a página avisa que está
//               ociosa (mensagem 'cagp:precache-rest'). No fim tudo abre sem sinal.
// Documentos (PDF/DOCX em /documentos/) nunca entram em cache: sempre vêm da internet.
const VERSION = 'dev';
const PRECACHE = [];
const PRECACHE_REST = [];

const SHELL_PREFIX = 'cagp-shell-';
const SHELL_CACHE = SHELL_PREFIX + VERSION;
// Fotos e ilustrações abertas pela pessoa. Sobrevive aos deploys.
const RUNTIME_CACHE = 'cagp-runtime-v1';
const RUNTIME_MAX_ENTRIES = 60;
const RUNTIME_REVALIDATE_MS = 24 * 60 * 60 * 1000;
const REVS_KEY = '__cagp-precache-revs__';
// Dentro do mapa de revisões: a versão cujo RESTO já foi baixado por inteiro.
const REST_DONE_KEY = '__rest__';
const PAGE_TIMEOUT_MS = 2500;
const INSTALL_CONCURRENCY = 4;
// O resto desce devagar para não disputar a rede com o que a pessoa está fazendo.
const REST_CONCURRENCY = 2;

const SCOPE = self.registration.scope; // ex: https://chapa-semente.github.io/cagp/
const SCOPE_PATH = new URL(SCOPE).pathname;
const IMMUTABLE_PATH = SCOPE_PATH + '_astro/';
const DOCS_PATH = SCOPE_PATH + 'documentos/';

// Arquivo (tem extensão e não é .html), em oposição a página.
function isFilePath(pathname) {
  const last = pathname.split('/').pop() || '';
  return /\.[a-z0-9]+$/i.test(last) && !last.endsWith('.html');
}
const isDocumentFile = (pathname) => pathname.startsWith(DOCS_PATH) && isFilePath(pathname);

const abs = (path) => new URL(path, SCOPE).href;

// Navegações não aceitam respostas marcadas como "redirected" (o Chrome mostra página de erro).
// O GitHub Pages responde 301 para rotas sem barra final (/cagp/carreira -> /cagp/carreira/),
// então toda resposta redirecionada é "limpa" antes de ir para o cache ou para o navegador.
async function cleanResponse(res) {
  if (!res || !res.redirected) return res;
  const body = await res.blob();
  return new Response(body, { status: res.status, statusText: res.statusText, headers: res.headers });
}

// Páginas HTML: a navegação comum (mode 'navigate') E o fetch() que o ClientRouter do Astro faz
// para trocar de página sem recarregar. Esse fetch não é 'navigate'; se caísse no cache-first dos
// assets, o app instalado receberia HTML de uma versão antiga (tour quebrado na troca de página).
function isPageRequest(req, url) {
  if (req.mode === 'navigate') return true;
  const accept = req.headers.get('accept') || '';
  if (accept.includes('text/html')) return true;
  const last = url.pathname.split('/').pop() || '';
  return last === '' || last.endsWith('.html') || !last.includes('.');
}

async function readRevs(cache) {
  try {
    const res = await cache.match(REVS_KEY);
    return res ? await res.json() : {};
  } catch (_) {
    return {};
  }
}

async function runPool(items, limit, task) {
  const queue = items.slice();
  const worker = async () => {
    while (queue.length) {
      const item = queue.shift();
      try {
        await task(item);
      } catch (_) {
        // Um arquivo que falhou não derruba a instalação: ele entra no cache quando for usado.
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
}

// ─── Instalação: baixa só o que mudou ────────────────────────────────────────
// Arquivos com a mesma revisão (ou imutáveis) são copiados do casco anterior em vez de baixados
// de novo. Num deploy que mexeu em 3 páginas, o celular baixa 3 páginas, não o casco inteiro.
async function oldShells() {
  const names = (await caches.keys()).filter((k) => k.startsWith(SHELL_PREFIX) && k !== SHELL_CACHE);
  return Promise.all(
    names.map(async (name) => {
      const c = await caches.open(name);
      return { name, cache: c, revs: await readRevs(c) };
    })
  );
}

const writeRevs = (cache, revs) =>
  cache.put(REVS_KEY, new Response(JSON.stringify(revs), { headers: { 'Content-Type': 'application/json' } }));

// Guarda uma entrada do precache no casco atual: pula se já está lá na revisão certa, copia do
// casco anterior se o conteúdo não mudou, baixa só em último caso.
async function storeEntry(cache, olds, revs, [path, rev]) {
  const url = abs(path);
  if (url in revs && revs[url] === rev && (await cache.match(url))) return;
  for (const old of olds) {
    const sameContent = rev === null ? true : old.revs[url] === rev;
    if (!sameContent) continue;
    const hit = await old.cache.match(url);
    if (hit) {
      await cache.put(url, hit);
      revs[url] = rev;
      return;
    }
  }
  // 'no-cache' revalida com o servidor: o GitHub Pages manda max-age=600, e sem isso o
  // casco novo podia guardar o HTML antigo (que aponta para /_astro/ que já não existem).
  const res = await fetch(url, { cache: rev === null ? 'default' : 'no-cache' });
  if (!res.ok) return;
  await cache.put(url, await cleanResponse(res));
  revs[url] = rev;
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      const olds = await oldShells();
      const revs = await readRevs(cache);
      await runPool(PRECACHE, INSTALL_CONCURRENCY, (entry) => storeEntry(cache, olds, revs, entry));
      await writeRevs(cache, revs);
      await self.skipWaiting();
    })()
  );
});

// ─── Segunda etapa: o resto do site, em segundo plano ────────────────────────
// Pode ser interrompida (o navegador encerra o SW ocioso): as revisões são gravadas a cada lote,
// e a próxima página aberta retoma de onde parou. Só quando tudo desceu o casco antigo é apagado;
// até lá ele continua servindo as páginas que o novo ainda não tem.
let restRun = null;
function fillRest() {
  if (!restRun) restRun = doFillRest().finally(() => (restRun = null));
  return restRun;
}

async function doFillRest() {
  const cache = await caches.open(SHELL_CACHE);
  const revs = await readRevs(cache);
  if (revs[REST_DONE_KEY] === VERSION) return;
  const olds = await oldShells();
  let stored = 0;
  await runPool(PRECACHE_REST, REST_CONCURRENCY, async (entry) => {
    await storeEntry(cache, olds, revs, entry);
    if (++stored % 12 === 0) await writeRevs(cache, revs);
  });
  const complete = PRECACHE_REST.every(([path, rev]) => abs(path) in revs && revs[abs(path)] === rev);
  if (complete) revs[REST_DONE_KEY] = VERSION;
  await writeRevs(cache, revs);
  if (complete) await Promise.all(olds.map((old) => caches.delete(old.name)));
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'cagp:precache-rest') event.waitUntil(fillRest().catch(() => {}));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const shell = await caches.open(SHELL_CACHE);
      const restDone = PRECACHE_REST.length === 0 || (await readRevs(shell))[REST_DONE_KEY] === VERSION;
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((k) => k !== SHELL_CACHE && k !== RUNTIME_CACHE)
          // Casco antigo fica até a segunda etapa terminar (ela copia dele o que não mudou).
          .filter((k) => restDone || !k.startsWith(SHELL_PREFIX))
          .map((k) => caches.delete(k))
      );
      // Documentos guardados por versões anteriores deste SW saem do aparelho.
      const runtime = await caches.open(RUNTIME_CACHE);
      const keys = await runtime.keys();
      await Promise.all(keys.filter((req) => isDocumentFile(new URL(req.url).pathname)).map((req) => runtime.delete(req)));
      await self.clients.claim();
    })()
  );
});

// Procura no casco atual primeiro e só depois nos antigos: caches.match() global devolve o
// cache mais velho antes, e serviria a página da versão anterior no lugar da nova.
async function matchShell(request, options) {
  const names = (await caches.keys()).filter((k) => k.startsWith(SHELL_PREFIX) && k !== SHELL_CACHE);
  for (const name of [SHELL_CACHE, ...names]) {
    const hit = await (await caches.open(name)).match(request, options);
    if (hit) return hit;
  }
  return undefined;
}

async function trimRuntime() {
  const cache = await caches.open(RUNTIME_CACHE);
  const keys = await cache.keys();
  // keys() vem em ordem de inserção: os mais antigos saem primeiro.
  for (let i = 0; i < keys.length - RUNTIME_MAX_ENTRIES; i++) await cache.delete(keys[i]);
}

async function putRuntime(req, res) {
  const cache = await caches.open(RUNTIME_CACHE);
  await cache.delete(req); // reinserir move a entrada para o fim da fila (LRU simples)
  await cache.put(req, res);
  await trimRuntime();
}

function isStale(res) {
  const date = Date.parse(res.headers.get('date') || '');
  return !date || Date.now() - date > RUNTIME_REVALIDATE_MS;
}

// ─── Páginas: rede primeiro ──────────────────────────────────────────────────
// Se a rede passar de 2.5s (anti-Lie-Fi), serve a MESMA página do cache se houver; senão continua
// esperando a rede. A página inicial só entra no lugar de outra quando a rede falhou de vez
// (offline): uma rota lenta virando a home com a URL errada fazia o tour não achar a ferramenta.
async function handlePage(event, req, url) {
  const network = fetch(req).then(async (res) => {
    if (res && res.type === 'opaqueredirect') return res;
    if (res && res.status === 200) {
      const clean = await cleanResponse(res);
      const copy = clean.clone();
      event.waitUntil(caches.open(SHELL_CACHE).then((c) => c.put(url.origin + url.pathname, copy)));
      return clean;
    }
    return res;
  });
  network.catch(() => {}); // evita rejeição solta quando o cache já respondeu

  const sameCached = async () => {
    const exact = await matchShell(req, { ignoreSearch: true });
    if (exact) return cleanResponse(exact);
    if (url.pathname.endsWith('/')) return null;
    const withSlash = await matchShell(url.origin + url.pathname + '/');
    return withSlash ? cleanResponse(withSlash) : null;
  };

  try {
    let timer;
    const timeout = new Promise((resolve) => (timer = setTimeout(() => resolve('timeout'), PAGE_TIMEOUT_MS)));
    const first = await Promise.race([network, timeout]);
    clearTimeout(timer);
    if (first !== 'timeout') return first;
    return (await sameCached()) || (await network);
  } catch (_) {
    const cached = await sameCached();
    if (cached) return cached;
    if (req.mode === 'navigate') {
      const home = await matchShell(SCOPE);
      if (home) return cleanResponse(home);
    }
    return new Response('Sem conexão e sem cache disponível.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

// ─── JS/CSS/fontes do build (/_astro/): cache-first, sem revalidar ───────────
// O nome do arquivo muda quando o conteúdo muda, então revalidar só gastaria a rede do celular
// (antes cada visita rebaixava todo o JS em segundo plano).
async function handleImmutable(event, req) {
  // ignoreSearch: o CSS do bootstrap-icons pede a fonte com "?<hash>" no fim.
  const cached = await caches.match(req, { ignoreSearch: true });
  if (cached) return cached;
  const res = await fetch(req);
  if (res.ok) {
    const copy = res.clone();
    event.waitUntil(caches.open(SHELL_CACHE).then((c) => c.put(req, copy)));
  }
  return res;
}

// ─── Demais arquivos (fotos, logos, ícones) ──────────────────────────────────
// Casco: servido do cache (a revisão do build já garante a versão certa).
// Resto: cache-first; revalida em segundo plano no máximo uma vez por dia.
async function handleStatic(event, req) {
  const shell = await caches.open(SHELL_CACHE);
  const inShell = await shell.match(req);
  if (inShell) return inShell;

  const runtime = await caches.open(RUNTIME_CACHE);
  const cached = await runtime.match(req);
  const refresh = () =>
    fetch(req).then(async (res) => {
      if (res.ok && res.status === 200) await putRuntime(req, res.clone());
      return res;
    });

  if (cached) {
    if (isStale(cached)) event.waitUntil(refresh().catch(() => {}));
    return cached;
  }
  try {
    return await refresh();
  } catch (err) {
    const anywhere = await caches.match(req);
    if (anywhere) return anywhere;
    throw err;
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Fora do site (fontes externas, APIs) e fora do escopo: o navegador cuida sozinho.
  if (url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE_PATH)) return;
  // Requisições parciais (vídeo, PDF em streaming) não combinam com cache.
  if (req.headers.has('range')) return;
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '0.0.0.0') return;
  if (url.pathname === SCOPE_PATH + 'sw.js') return;

  // Documentos (PDF/DOCX): o navegador busca direto na internet e nada fica guardado no aparelho.
  // Sem sinal, quem avisa é a página (BaseLayout › aviso de documento sem conexão).
  if (isDocumentFile(url.pathname)) return;

  if (url.pathname.startsWith(IMMUTABLE_PATH)) {
    event.respondWith(handleImmutable(event, req));
    return;
  }
  // Abrir um arquivo pelo link também é uma navegação, mas não é página: vai para a regra de
  // arquivos (cache-first), não para a de páginas.
  const isFile = isFilePath(url.pathname);
  if (!isFile && isPageRequest(req, url)) {
    event.respondWith(handlePage(event, req, url));
    return;
  }
  event.respondWith(handleStatic(event, req));
});

// Toque na notificação (lembretes da eleição): foca o app aberto ou abre um novo.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || SCOPE;
  event.waitUntil(
    (async () => {
      const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      const win = wins.find((w) => w.url.startsWith(SCOPE));
      if (win) {
        await win.focus();
        if ('navigate' in win && win.url !== target) return win.navigate(target).catch(() => {});
        return;
      }
      return self.clients.openWindow(target);
    })()
  );
});
