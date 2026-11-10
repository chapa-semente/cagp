// CAGP UFMG — Service Worker Oficial (PWA Offline & Anti-Lie-Fi)
const CACHE_NAME = 'cagp-pwa-v9';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/curso.html',
  '/calouros.html',
  '/pesquisa.html',
  '/percurso.html',
  '/optativas.html',
  '/acg.html',
  '/estagio.html',
  '/tcc.html',
  '/documentos.html',
  '/faq.html',
  '/mapa-do-site.html',
  '/sobre.html',
  '/gestao.html',
  '/estagio-tcc.html',
  '/manifest.webmanifest'
];

// Base path derivado do escopo do SW (ex: '/cagp' no GitHub Pages, '' na raiz)
const SCOPE_BASE = new URL(self.registration.scope).pathname.replace(/\/$/, '');

// Navegações não aceitam respostas marcadas como "redirected" (o Chrome mostra
// página de erro). O GitHub Pages responde 301 para rotas sem barra final
// (/cagp/carreira -> /cagp/carreira/), então toda resposta redirecionada é
// "limpa" antes de ir para o cache ou para o navegador.
async function cleanResponse(res) {
  if (!res || !res.redirected) return res;
  const body = await res.blob();
  return new Response(body, {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
  });
}

// Páginas HTML: a navegação comum (mode 'navigate') E o fetch() que o ClientRouter do Astro faz
// para trocar de página sem recarregar. Esse fetch não é 'navigate'; antes ele caía no cache-first
// dos assets e o app instalado recebia HTML de uma versão antiga (tour quebrado na troca de página).
function isPageRequest(req, url) {
  if (req.mode === 'navigate') return true;
  if (url.origin !== self.location.origin) return false;
  const accept = req.headers.get('accept') || '';
  if (accept.includes('text/html')) return true;
  const last = url.pathname.split('/').pop() || '';
  return last === '' || last.endsWith('.html') || !last.includes('.');
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // No máximo 4 downloads por vez: o celular continua navegando enquanto o SW se instala.
      const queue = PRECACHE_ASSETS.slice();
      const worker = async () => {
        while (queue.length) {
          const url = queue.shift();
          try {
            const res = await fetch(url);
            if (res.ok) await cache.put(url, await cleanResponse(res));
          } catch (_) {}
        }
      };
      await Promise.all(Array.from({ length: 4 }, worker));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Ambiente Local / Preview: Sempre direto da rede para evitar cache obsoleto durante testes
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '0.0.0.0') {
    event.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  // Páginas (navegação e ClientRouter): rede primeiro. Se a rede passar de 2.5s (anti-Lie-Fi),
  // serve a MESMA página do cache se houver; senão continua esperando a rede. A página inicial só
  // entra no lugar de outra quando a rede falhou de vez (offline): antes, uma rota lenta virava a
  // home com a URL errada e o tour não achava a ferramenta.
  if (isPageRequest(req, url)) {
    event.respondWith(
      (async () => {
        const network = fetch(req).then(async (res) => {
          if (res && res.type === 'opaqueredirect') return res;
          if (res && res.status === 200) {
            const clean = await cleanResponse(res);
            const cache = await caches.open(CACHE_NAME);
            cache.put(req, clean.clone());
            return clean;
          }
          return res;
        });
        network.catch(() => {}); // evita rejeição solta quando o cache já respondeu
        const sameCached = async () => {
          const exact = await caches.match(req, { ignoreSearch: true });
          if (exact) return cleanResponse(exact);
          const withSlash = url.pathname.endsWith('/') ? null : await caches.match(url.pathname + '/');
          return withSlash ? cleanResponse(withSlash) : null;
        };
        const offlineFallback = async () => {
          const cached = await sameCached();
          if (cached) return cached;
          if (req.mode === 'navigate') {
            const home = (await caches.match(`${SCOPE_BASE}/`)) || (await caches.match(`${SCOPE_BASE}/index.html`));
            if (home) return cleanResponse(home);
          }
          return new Response('Sem conexão e sem cache disponível.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          });
        };
        try {
          const timeout = new Promise((resolve) => setTimeout(() => resolve('timeout'), 2500));
          const first = await Promise.race([network, timeout]);
          if (first !== 'timeout') return first;
          const cached = await sameCached();
          if (cached) return cached;
          return await network;
        } catch (_) {
          return offlineFallback();
        }
      })()
    );
    return;
  }

  // Documentos, assets e fontes: Cache-first com revalidação em background
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        fetch(req).then((res) => {
          if (res && res.status === 200) {
            caches.open(CACHE_NAME).then((c) => c.put(req, res));
          }
        }).catch(() => {});
        return cached;
      }
      return fetch(req).then((res) => {
        if (res && res.status === 200) {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, resClone));
        }
        return res;
      });
    })
  );
});
