const $versi = 'v1.0';
const $caches = [
//	'./index.html'
];

self.addEventListener('install', e => {
//	e.waitUntil(
		caches.open($versi).then(cache => {
		  return cache.addAll($caches);
	  });
	//);
});

self.addEventListener('activate', e => {
		caches.keys().then(keys => {
			return Promise.all(keys 
				.filter(key => key !== $versi)
				.map(key => caches.delete(key))
			).then(_=>{window.location.reloa();});
		})
});

self.addEventListener('fetch', e => {
	e.respondWith(
		caches.match(e.request).then(response => {
			return response || fetch(e.request);
		})
	);
});