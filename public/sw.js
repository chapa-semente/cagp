// CAGP UFMG — Service Worker Oficial (PWA Offline & Anti-Lie-Fi)
const CACHE_NAME = 'cagp-pwa-v8';
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
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          fetch(url)
            .then(async (res) => {
              if (res.ok) return cache.put(url, await cleanResponse(res));
            })
            .catch(() => {})
        )
      );
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

  // Páginas (navegação e ClientRouter): Network-first com anti-Lie-Fi timeout de 2.5s
  if (isPageRequest(req, url)) {
    event.respondWith(
      (async () => {
        try {
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Anti-Lie-Fi timeout (2.5s)')), 2500)
          );
          const networkResponse = await Promise.race([fetch(req), timeoutPromise]);
          // Redirect do servidor (ex: 301 para a versão com barra final):
          // devolve ao navegador para que ele siga o redirect normalmente.
          if (networkResponse && networkResponse.type === 'opaqueredirect') {
            return networkResponse;
          }
          if (networkResponse && networkResponse.status === 200) {
            const clean = await cleanResponse(networkResponse);
            const cache = await caches.open(CACHE_NAME);
            cache.put(req, clean.clone());
            return clean;
          }
        } catch (_) {
          // Fallback para cache imediato
        }
        const cached = await caches.match(req);
        if (cached) return cleanResponse(cached);
        const dirPath = url.pathname.endsWith('/') ? url.pathname + 'index.html' : url.pathname + '/index.html';
        const dirCached = await caches.match(dirPath);
        if (dirCached) return cleanResponse(dirCached);
        const indexCached =
          (await caches.match(`${SCOPE_BASE}/index.html`)) || (await caches.match(`${SCOPE_BASE}/`));
        if (indexCached) return cleanResponse(indexCached);
        return new Response('Sem conexão e sem cache disponível.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
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
