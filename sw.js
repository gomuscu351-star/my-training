// ═══════════════════════════════════════════════
//  SERVICE WORKER — Network-first pour HTML, cache pour assets statiques
//  + notifications locales (déclenchées par l'app elle-même, sans serveur)
// ═══════════════════════════════════════════════
// IMPORTANT: incrémenter ce numéro à CHAQUE mise à jour de app.html
// pour forcer le rafraîchissement chez tous les utilisateurs.
const CACHE = 'mytraining-v24';

// Clic sur la notification → ouvrir/focus l'app, et gérer les actions
// rapides (Relancer / OK) affichées directement sur la notification.
self.addEventListener('notificationclick', function(event){
  event.notification.close();

  // Plus de boutons d'action sur la notification: un simple tap suffit à
  // rouvrir/focus l'app, sans logique de relance automatique différenciée.
  event.waitUntil(
    self.clients.matchAll({ type:'window', includeUncontrolled:true }).then(function(clientsArr){
      if(clientsArr.length){
        return clientsArr[0].focus();
      }
      return self.clients.openWindow('./');
    })
  );
});

const STATIC_ASSETS = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-192-maskable.png',
  './icon-512-maskable.png',
  './hdr-logo-silhouette.png',
  './badge-96.png',
  './app.html',
  './index.html',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC_ASSETS).catch(()=>{}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;

  const url = e.request.url;
  const isHTML = url.endsWith('app.html') || url.endsWith('index.html') || url.endsWith('/')
              || e.request.mode === 'navigate'
              || (e.request.headers.get('accept')||'').includes('text/html');

  // JS/CSS sont du code applicatif, pas des assets statiques (icônes, manifest).
  // Si app.html est un jour scindé en fichiers séparés (<script src="...">), ces
  // fichiers DOIVENT suivre la même stratégie network-first que app.html, sinon
  // une mise à jour de app.js ne sera jamais vue par un utilisateur ayant déjà
  // mis ce fichier en cache (cache-first ne revérifie jamais le réseau).
  const isAppCode = /\.(js|css)$/.test(url.split('?')[0]);

  if(isHTML || isAppCode){
    // NETWORK-FIRST avec timeout explicite: toujours essayer d'avoir la
    // dernière version en ligne, MAIS sans attendre indéfiniment. Dans une
    // TWA (APK généré par PWABuilder), un fetch() hors-ligne peut rester en
    // attente bien plus longtemps qu'en Chrome desktop avant de rejeter
    // (le comportement réseau natif Android diffère), ce qui bloquait le
    // splash screen indéfiniment au lieu de basculer sur le cache — la
    // course contre un timeout de 3s garantit un repli rapide dans tous
    // les cas, hors-ligne ou réseau très lent/capricieux.
    const NETWORK_TIMEOUT_MS = 3000;
    const networkFetch = fetch(e.request);
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('network-timeout')), NETWORK_TIMEOUT_MS)
    );
    e.respondWith(
      Promise.race([networkFetch, timeout]).then(res => {
        if(res && res.status === 200){
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() =>
        caches.match(e.request).then(cached => cached || (isHTML ? caches.match('./app.html') : undefined))
      )
    );
    return;
  }

  // CACHE-FIRST uniquement pour les vrais assets statiques (icônes, manifest, polices) — change rarement
  e.respondWith(
    caches.match(e.request).then(cached => {
      if(cached) return cached;
      return fetch(e.request.clone()).then(res => {
        if(!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => cached);
    })
  );
});
