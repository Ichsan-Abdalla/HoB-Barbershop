const $versi = 'v0.a';
const $caches = [
	'./index.html','./style.css','./script.js','./logo.png','./icon.png','./1.jpg','./2.jpg','./3.jpg','./4.jpg','./5.jpg','./6.jpg','./7.jpg','./harga.jpg','./erwin.jpg','./ryan.jpg','./Poppins-Regular.woff'
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
			).then(_=>{window.location.reload();});
		})
});

self.addEventListener('fetch', e => {
	e.respondWith(
		caches.match(e.request).then(response => {
			return response || fetch(e.request);
		})
	);
});
