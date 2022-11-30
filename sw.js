importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  'index.html',
  'galeria.html',
  'nuevos.html',
  'app.js',
  'sw.js',
  'manifest.webmanifest',
  'css/bootstrap.min.css',
  'js/bootstrap.min.js',
]);

// workbox.routing.registerRoute(
//   ({ request }) => request.destination === 'image',
//   new workbox.strategies.NetworkOnly()
// );

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'document',
    new workbox.strategies.CacheFirst()
);


workbox.routing.setCatchHandler(async context => {
    console.log("entro");
    console.log(context);
    console.log(context.request);

    if (context.request.destination === 'image') {
        return workbox.precaching.matchPrecache('icons/icon-1024.png');
    } else if (context.request.destination === 'document') {
        return workbox.precaching.matchPrecache('404.html');
    }
    return Response.error();
})
