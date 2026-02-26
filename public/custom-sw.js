/**
 * AGASA-Inspect — Custom Service Worker
 * Stratégies de cache :
 * - CACHE FIRST : assets statiques (HTML, CSS, JS, images, polices)
 * - NETWORK FIRST : API Convex (fallback IndexedDB)
 * - Pré-cache : app shell + pages critiques
 */

const CACHE_NAME = 'agasa-inspect-v2';
const STATIC_CACHE = 'agasa-static-v2';
const API_CACHE = 'agasa-api-v2';

// Pages à pré-cacher
const PRECACHE_URLS = [
    '/',
    '/login',
    '/dashboard',
    '/inspections',
    '/inspections/nouvelle',
    '/inspections/en-cours',
    '/pv',
    '/pv/nouveau',
    '/sync',
    '/carte',
    '/offline.html',
];

// Extensions statiques
const STATIC_EXTENSIONS = ['.js', '.css', '.woff', '.woff2', '.ttf', '.ico', '.png', '.jpg', '.svg', '.webp'];

// ═══ INSTALL ═══
self.addEventListener('install', (event) => {
    console.log('[SW] Install — pré-cache app shell');
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            return cache.addAll(PRECACHE_URLS).catch((err) => {
                console.warn('[SW] Pré-cache partiel:', err);
            });
        })
    );
    self.skipWaiting();
});

// ═══ ACTIVATE ═══
self.addEventListener('activate', (event) => {
    console.log('[SW] Activate — nettoyage anciens caches');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== STATIC_CACHE && name !== API_CACHE && name !== CACHE_NAME)
                    .map((name) => {
                        console.log('[SW] Suppression cache:', name);
                        return caches.delete(name);
                    })
            );
        })
    );
    self.clients.claim();
});

// ═══ FETCH ═══
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET and Convex WebSocket
    if (request.method !== 'GET') return;
    if (url.protocol === 'ws:' || url.protocol === 'wss:') return;

    // Strategy: NETWORK FIRST for API/Convex
    if (url.hostname.includes('convex') || url.pathname.startsWith('/api/')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // Strategy: CACHE FIRST for static assets
    if (isStaticAsset(url.pathname)) {
        event.respondWith(cacheFirst(request));
        return;
    }

    // Strategy: NETWORK FIRST for pages (HTML navigation)
    if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // Default: CACHE FIRST
    event.respondWith(cacheFirst(request));
});

// ═══ STRATEGIES ═══

async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        return new Response('Hors ligne', { status: 503, statusText: 'Service Unavailable' });
    }
}

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(API_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        const cached = await caches.match(request);
        if (cached) return cached;

        // For navigation requests, return cached index
        if (request.mode === 'navigate') {
            const fallback = await caches.match('/');
            if (fallback) return fallback;
        }

        return new Response(JSON.stringify({ error: 'offline', message: 'Données hors ligne' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

function isStaticAsset(pathname) {
    return STATIC_EXTENSIONS.some((ext) => pathname.endsWith(ext));
}

// ═══ MESSAGES ═══
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'GET_CACHE_STATUS') {
        caches.keys().then((names) => {
            event.ports[0].postMessage({
                type: 'CACHE_STATUS',
                caches: names,
                online: self.navigator?.onLine ?? true,
            });
        });
    }

    if (event.data && event.data.type === 'SYNC_STATUS') {
        // Notify all clients about sync status
        self.clients.matchAll().then((clients) => {
            clients.forEach((client) => {
                client.postMessage({
                    type: 'SYNC_UPDATE',
                    ...event.data.payload,
                });
            });
        });
    }
});

// ═══ BACKGROUND SYNC ═══
self.addEventListener('sync', (event) => {
    if (event.tag === 'agasa-sync') {
        console.log('[SW] Background sync triggered');
        event.waitUntil(
            self.clients.matchAll().then((clients) => {
                clients.forEach((client) => {
                    client.postMessage({ type: 'TRIGGER_SYNC' });
                });
            })
        );
    }
});

console.log('[SW] AGASA-Inspect Service Worker chargé — v2');
