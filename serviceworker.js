var CACHE_NAME = 'sncf-voyageurs-cache-v3';
// The files we want to cache
var urlsToCache = [
    '/',
    '/readme',
    '/css/main.css',
    '/js/bundle.js',
    '/img/train.png',
    '/img/railway-station-france.jpg',
    'https://fonts.gstatic.com/s/montserrat/v6/zhcz-_WihjSQC0oHJ9TCYPk_vArhqVIZ0nv9q090hN8.woff2',
    'https://fonts.gstatic.com/s/montserrat/v6/IQHow_FEYlDC4Gzy_m8fcoWiMMZ7xLd792ULpGE4W_Y.woff2'
];

// Set the callback for the install step
self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

//delete unused cache
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('sncf-voyageurs') && cacheName!==CACHE_NAME;
                }).map(function(cacheName) {
                    console.log('delete',cacheName)
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// Set the callback when the files get fetched
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cached files available, return those
                if (response) {
                    return response;
                }

                // IMPORTANT: Clone the request. A request is a stream and
                // can only be consumed once. Since we are consuming this
                // once by cache and once by the browser for fetch, we need
                // to clone the response
                var fetchRequest = event.request.clone();

                // Start request again since there are no files in the cache
                return fetch(fetchRequest).then(
                    function (response) {
                        // If response is invalid, throw error
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have 2 stream.
                        var responseToCache = response.clone();

                        // Otherwise cache the downloaded files
                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        // And return the network response
                        return response;
                    }
                );
            })
    );
});
