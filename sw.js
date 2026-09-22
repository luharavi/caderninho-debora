/* Caderninho da Débora — funcionamento offline.
   Estratégia: o app tenta a rede primeiro (para receber atualizações assim que
   saírem) e cai no cache quando não há internet. Fontes ficam em cache próprio. */

const CACHE = 'caderninho-v1';
const FONTES = 'caderninho-fontes-v1';

const ESSENCIAIS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icone-192.png',
  './icone-512.png',
  './icone-180.png',
  './icone-mascara-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ESSENCIAIS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(nomes => Promise.all(
        nomes.filter(n => n !== CACHE && n !== FONTES).map(n => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  /* Google Fonts: uma vez baixadas, servem do cache para sempre. */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(FONTES).then(c =>
        c.match(e.request).then(guardado =>
          guardado || fetch(e.request).then(r => {
            if (r && (r.ok || r.type === 'opaque')) c.put(e.request, r.clone());
            return r;
          }).catch(() => guardado)
        )
      )
    );
    return;
  }

  if (url.origin !== location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then(r => {
        if (r && r.ok) {
          const copia = r.clone();
          caches.open(CACHE).then(c => c.put(e.request, copia)).catch(() => {});
        }
        return r;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
