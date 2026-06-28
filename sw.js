// ═══════════════════════════════════════════════
//  SERVICE WORKER — Network-first pour HTML, cache pour assets statiques
//  + notifications locales (déclenchées par l'app elle-même, sans serveur)
// ═══════════════════════════════════════════════
// IMPORTANT: incrémenter ce numéro à CHAQUE mise à jour de app.html
// pour forcer le rafraîchissement chez tous les utilisateurs.
const CACHE = 'mytraining-v22';

// Clic sur la notification → ouvrir/focus l'app, et gérer les actions
// rapides (Relancer / OK) affichées directement sur la notification.
self.addEventListener('notificationclick', function(event){
  event.notification.close();

  if(event.action === 'dismiss'){
    return; // rien à faire, juste fermer
  }

  const wantsRestart = event.action === 'restart-rest';

  event.waitUntil(
    self.clients.matchAll({ type:'window', includeUncontrolled:true }).then(function(clientsArr){
      if(clientsArr.length){
        const client = clientsArr[0];
        if(wantsRestart) client.postMessage({ type:'restart-rest' });
        return client.focus();
      }
      // App fermée: on l'ouvre avec un paramètre que app.html lira au
      // chargement pour relancer automatiquement le repos si demandé.
      return self.clients.openWindow(wantsRestart ? './?action=restart-rest' : './');
    })
  );
});

const STATIC_ASSETS = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-192-maskable.png',
  './icon-512-maskable.png',
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
    // NETWORK-FIRST: toujours essayer d'avoir la dernière version en ligne.
    // Si hors ligne, on retombe sur la version en cache.
    e.respondWith(
      fetch(e.request).then(res => {
        if(res && res.status === 200){
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() =>
        caches.match(e.request).then(cached => cached || (isHTML ? caches.match('./index.html') : undefined))
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
