// const FILES_TO_CACHE = [
//     "./index.html",
//     "./offline.html",
//     "./assets/icons/192.png"
// ];

// const APP_PREFIX = 'CampusConnect-';
// const VERSION = 'version_01';
// const CACHE_NAME = APP_PREFIX + VERSION;

// // Install SW
// self.addEventListener('install', function (e) {
//     e.waitUntil(
//         caches.open(CACHE_NAME).then(function (cache) {
//             console.log('installing cache : ' + CACHE_NAME)
//             return cache.addAll(FILES_TO_CACHE)
//         })
//     )
// });

// // Listen for requests
// self.addEventListener('activate', function (e) {
//     e.waitUntil(
//         caches.keys().then(function (keyList) {
//             let cacheKeeplist = keyList.filter(function (key) {
//                 return key.indexOf(APP_PREFIX);
//             });
//             cacheKeeplist.push(CACHE_NAME);

//             return Promise.all(
//                 keyList.map(function (key, i) {
//                     if (cacheKeeplist.indexOf(key) === -1) {
//                         console.log('deleting cache : ' + keyList[i]);
//                         return caches.delete(keyList[i]);
//                     }
//                 })
//             );
//         })
//     );
// });

// // Activate the SW
// self.addEventListener('fetch', function (e) {
//     console.log('fetch request : ' + e.request.url)
//     e.respondWith(
//         caches.match(e.request).then(function (request) {
//             if (request) { // if cache is available, respond with cache
//                 console.log('responding with cache : ' + e.request.url)
//                 return request
//             } else {       // if there are no cache, try fetching request
//                 console.log('file is not cached, fetching : ' + e.request.url)
//                 return fetch(e.request)
//             }
//         })
//     )
// });

const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offline.html' ];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request) 
                    .catch(() => caches.match('offline.html'))
            })
    )
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
            
    )
});