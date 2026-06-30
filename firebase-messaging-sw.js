// ═══════════════════════════════════════════════
//  firebase-messaging-sw.js
//  Service worker DÉDIÉ à Firebase Cloud Messaging.
//  Coexiste avec sw.js (cache + notifs locales) — ne pas fusionner,
//  Firebase a besoin de son propre fichier avec ce nom exact.
// ═══════════════════════════════════════════════

importScripts('https://www.gstatic.com/firebasejs/10.13.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBavyD0A_MzW_9D-eDqrlNZXDVqgxN343Q",
  authDomain: "my-training-push.firebaseapp.com",
  projectId: "my-training-push",
  storageBucket: "my-training-push.firebasestorage.app",
  messagingSenderId: "857104272216",
  appId: "1:857104272216:web:206d257b4985980118b32d",
});

const messaging = firebase.messaging();

// Déclenché quand un push FCM arrive ET que l'app n'est pas au premier plan
// (onglet fermé, en arrière-plan, ou écran verrouillé). Le payload "notification"
// envoyé par le Worker Cloudflare est affiché automatiquement par défaut, mais on
// le gère nous-mêmes ici pour avoir les mêmes options (tag, actions) que sw.js.
messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || 'Repos terminé !';
  const options = {
    body: (payload.notification && payload.notification.body) || "C'est reparti 💪",
    icon: './icon-192.png',
    // Badge = silhouette monochrome dédiée (spec Android/Chrome), pas
    // l'icône couleur complète — voir notifyLocal() dans app.html pour le
    // même correctif appliqué côté notifications locales.
    badge: './badge-96.png',
    tag: 'mytraining-rest',
    renotify: true,
    requireInteraction: true,
    // Pas de boutons d'action: un simple tap suffit (voir notifyLocal dans
    // app.html pour la même simplification côté notifications locales).
  };

  self.registration.showNotification(title, options);
});

// Même comportement de clic que dans sw.js, pour une expérience cohérente
// qu'on reçoive la notif via le système local (sw.js) ou via push (ce fichier).
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientsArr) {
      if (clientsArr.length) {
        return clientsArr[0].focus();
      }
      return self.clients.openWindow('./');
    })
  );
});
