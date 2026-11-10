// CAGP UFMG — Service Worker (PWA offline + anti-Lie-Fi)
//
// O build (scripts/generate-sw-manifest.mjs) troca as duas constantes abaixo:
//   VERSION  -> hash do conteúdo do casco. Se nada mudou no deploy, o sw.js sai idêntico
//               e o navegador nem instala uma versão nova.
//   PRECACHE -> [caminho relativo ao escopo, revisão]. Revisão null = arquivo imutável
//               (os /_astro/ têm hash no nome). Os caminhos não carregam o base path:
//               o escopo do registro resolve (/cagp/ no GitHub Pages, / num domínio próprio).
const VERSION = 'dev';
const PRECACHE = [];

const SHELL_PREFIX = 'cagp-shell-';
const SHELL_CACHE = SHELL_PREFIX + VERSION;
// PDFs, fotos e ilustrações abertos pela pessoa. Sobrevive aos deploys (antes cada deploy
// apagava tudo e o PDF baixado ontem sumia do offline).
const RUNTIME_CACHE = 'cagp-runtime-v1';
const RUNTIME_MAX_ENTRIES = 60;
const RUNTIME_REVALIDATE_MS = 24 * 60 * 60 * 1000;
const REVS_KEY = '__cagp-precache-revs__';
const PAGE_TIMEOUT_MS = 2500;
const INSTALL_CONCURRENCY = 4;

const SCOPE = self.registration.scope; // ex: https://chapa-semente.github.io/cagp/
const SCOPE_PATH = new URL(SCOPE).pathname;
const IMMUTABLE_PATH = SCOPE_PATH + '_astro/';

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
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      const oldNames = (await caches.keys()).filter((k) => k.startsWith(SHELL_PREFIX) && k !== SHELL_CACHE);
      const olds = await Promise.all(
        oldNames.map(async (name) => {
          const c = await caches.open(name);
          return { cache: c, revs: await readRevs(c) };
        })
      );
      const revs = {};

      await runPool(PRECACHE, INSTALL_CONCURRENCY, async ([path, rev]) => {
        const url = abs(path);
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
      });

      await cache.put(REVS_KEY, new Response(JSON.stringify(revs), { headers: { 'Content-Type': 'application/json' } }));
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([SHELL_CACHE, RUNTIME_CACHE]);
      const names = await caches.keys();
      await Promise.all(names.filter((k) => !keep.has(k)).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

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
    const exact = await caches.match(req, { ignoreSearch: true });
    if (exact) return cleanResponse(exact);
    if (url.pathname.endsWith('/')) return null;
    const withSlash = await caches.match(url.origin + url.pathname + '/');
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
      const home = await caches.match(SCOPE);
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

// ─── Demais arquivos (PDFs, fotos, logos, ícones) ────────────────────────────
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

  if (url.pathname.startsWith(IMMUTABLE_PATH)) {
    event.respondWith(handleImmutable(event, req));
    return;
  }
  // Abrir um PDF pelo link também é uma navegação, mas é arquivo: vai para o cache de arquivos
  // (cache-first, sobrevive aos deploys), não para a regra de páginas.
  const last = url.pathname.split('/').pop() || '';
  const isFile = /\.[a-z0-9]+$/i.test(last) && !last.endsWith('.html');
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
