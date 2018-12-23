// version track
const vn = "version-x";

// files to cache
const appCash = [
  '/cat2.jpg'
];

// install and save files to cache
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(vn).then((cache) => {
            return cache.addAll(appCash);
        })
    );
});

// Listen for messages from client
self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    } else if (event.data.action === 'clearOld') {
        event.waitUntil(
            caches.keys().then((keys) => Promise.all(
                keys.map((k) => {
                    if (!k.includes(vn)) {
                        return caches.delete(k);
                    }
                })
            )).then(() => {
                console.log('old caches are cleared');
            })
        )
    }
});

// Serve if request already exists in cache
self.addEventListener('fetch', e => {
    const url = new URL(e.request.url);
    (appCash.includes(url.pathname)) ? e.respondWith(caches.match(url)) : console.log("Fetching: " + url);
});


