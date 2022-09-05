import { NavigationRoute, registerRoute, Route } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

const DAY = 60 * 60 * 24;

// Navigations
registerRoute(
  new NavigationRoute(
    new NetworkFirst({
      cacheName: "navigations",
    })
  )
);

// Fonts
registerRoute(
  new Route(
    ({ request }) => request.destination === "font",
    new CacheFirst({
      cacheName: "font-assets",
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: 30 * DAY,
        }),
      ],
    })
  )
);

// CSS
registerRoute(
  new Route(
    ({ request }) => request.destination === "style",
    new CacheFirst({
      cacheName: "style-assets",
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: 30 * DAY,
        }),
      ],
    })
  )
);

// Images
registerRoute(
  new Route(
    ({ request }) => request.destination === "image",
    new CacheFirst({
      cacheName: "image-assets",
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: 30 * DAY,
        }),
      ],
    })
  )
);

// Operating Files
registerRoute(
  /(?:html|webmanifest|js)/,
  new NetworkFirst({
    cacheName: "file-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * DAY,
      }),
    ],
  })
);
