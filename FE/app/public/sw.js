if (!self.define) {
  let e,
    n = {};
  const s = (s, a) => (
    (s = new URL(s + ".js", a).href),
    n[s] ||
      new Promise((n) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = n), document.head.appendChild(e);
        } else (e = s), importScripts(s), n();
      }).then(() => {
        let e = n[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, i) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (n[c]) return;
    let t = {};
    const r = (e) => s(e, c),
      o = { module: { uri: c }, exports: t, require: r };
    n[c] = Promise.all(a.map((e) => o[e] || r(e))).then((e) => (i(...e), t));
  };
}
define(["./workbox-07a7b4f2"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "383950d6c95de46199f58ef71d52e421",
        },
        {
          url: "/_next/static/chunks/138-d12c856e534533dc.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/23-2e5b98c0f1ba1cce.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/389-2401c7471aa5de5b.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/711-d2a9a28807068e0c.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/892-ca8db326071ed178.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/999-57cc68fee608f544.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/app/(main)/page-fdf701672ecc3459.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-dbc06aac81781bbd.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/app/layout-51d80224c1e44826.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/app/login/info/page-79f233a03439d87f.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/app/login/page-fb40d97078327680.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/app/mypage/page-236c22d005b43bc9.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/f4e5f4e1-00dee73f91bd2154.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/fd9d1056-13aa76f036058ae3.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/framework-aec844d2ccbe7592.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/main-a394950de1624141.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/main-app-22100213b46d3e75.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/pages/_app-6a626577ffa902a4.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/pages/_error-1be831200e60c5c0.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3",
        },
        {
          url: "/_next/static/chunks/webpack-10e7ddd6ec75b563.js",
          revision: "ojDvnxSzyn-x4N2kQMayj",
        },
        {
          url: "/_next/static/css/1214d91a8bebf1aa.css",
          revision: "1214d91a8bebf1aa",
        },
        {
          url: "/_next/static/css/12b78732e58c9047.css",
          revision: "12b78732e58c9047",
        },
        {
          url: "/_next/static/css/7ad4b94dd4ae1da9.css",
          revision: "7ad4b94dd4ae1da9",
        },
        {
          url: "/_next/static/css/a2ee6b69dcd9305e.css",
          revision: "a2ee6b69dcd9305e",
        },
        {
          url: "/_next/static/css/e7a4ee3d09d9d7e0.css",
          revision: "e7a4ee3d09d9d7e0",
        },
        {
          url: "/_next/static/media/NanumSquareB.ccf112ee.ttf",
          revision: "ccf112ee",
        },
        {
          url: "/_next/static/media/NanumSquareEB.d6c2427e.ttf",
          revision: "d6c2427e",
        },
        {
          url: "/_next/static/media/NanumSquareL.c5f442a7.ttf",
          revision: "c5f442a7",
        },
        {
          url: "/_next/static/media/NanumSquareR.e314b586.ttf",
          revision: "e314b586",
        },
        {
          url: "/_next/static/ojDvnxSzyn-x4N2kQMayj/_buildManifest.js",
          revision: "2ec694eb52ae4f523f265a46bae4d768",
        },
        {
          url: "/_next/static/ojDvnxSzyn-x4N2kQMayj/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/font/NanumSquare.ttf",
          revision: "05c46ab6133e58f7b2ddd2b169ab6842",
        },
        {
          url: "/font/NanumSquareB.ttf",
          revision: "e850eb664f41c0828a8aac6f1d09b643",
        },
        {
          url: "/font/NanumSquareEB.ttf",
          revision: "9ee5085e37e8ac9dd4aa44813d9b924a",
        },
        {
          url: "/font/NanumSquareL.ttf",
          revision: "f2a56a3bef1a85a94f09f8d4ffe5eb46",
        },
        {
          url: "/font/NanumSquareR.ttf",
          revision: "05c46ab6133e58f7b2ddd2b169ab6842",
        },
        {
          url: "/font/YEONGJUSeonbi.ttf",
          revision: "d79b7148aa3c53310a178c3c71f6f9d2",
        },
        {
          url: "/icon/backArrow.svg",
          revision: "f2c209024bdd61f65a8d90c04fbe9f65",
        },
        {
          url: "/icon/bigIndexCommunicate.svg",
          revision: "036fc740ca837681a4f50a723989d34f",
        },
        {
          url: "/icon/bigIndexExtra.svg",
          revision: "40d996be5619e9fb3899e1194148aa49",
        },
        {
          url: "/icon/bigIndexPrepare.svg",
          revision: "248db85abf72e7aa1c0d342ff06f0ac1",
        },
        {
          url: "/icon/bigIndexStart.svg",
          revision: "1d6480434f72dba88d7866a72e485dca",
        },
        {
          url: "/icon/bigIndexWork.svg",
          revision: "c997d80268642df031a312615b8d122d",
        },
        {
          url: "/icon/chatting.svg",
          revision: "2009e10e8d02724662bfbef3b40432d4",
        },
        {
          url: "/icon/chattingReply.svg",
          revision: "fe3a0631c5d880fd03fe579e3c05250a",
        },
        {
          url: "/icon/dropdown.svg",
          revision: "0a7b7b118a3ff10c958e77decb70ab03",
        },
        {
          url: "/icon/dropdownClose.svg",
          revision: "4411e8e1f349306e7c63d4567c08db81",
        },
        {
          url: "/icon/enter.svg",
          revision: "724f08d32bbc8b22b39018d99f9cfc98",
        },
        {
          url: "/icon/forTeams.svg",
          revision: "82e67fb9268268cc10291f22a94dc7d0",
        },
        {
          url: "/icon/forTeamsLogoOnly.svg",
          revision: "3ceff265d37af19c2283cea48f921cb0",
        },
        {
          url: "/icon/myPageButton.svg",
          revision: "3a7c1e65f2043a084e2f38607bc86381",
        },
        {
          url: "/icon/mypage.svg",
          revision: "52802f84eca28e4b388284ef803252ff",
        },
        { url: "/icon/plus.svg", revision: "e22bb98ad6b10cf2c2bdd19c89d2ec2a" },
        { url: "/icon/reco.svg", revision: "5e3d4af7c431fcfa24cd4b273da50d36" },
        {
          url: "/icon/smile.svg",
          revision: "21560273a3f4e7c1ca6d45b97c98bd50",
        },
        {
          url: "/icon/teams.svg",
          revision: "36d162cf32a90bec7fa3f8e29cfdd2f7",
        },
        {
          url: "/icon/threeDot.svg",
          revision: "ff3eeadd7ad842004ef66a499c5a25f5",
        },
        {
          url: "/icon/threeReset.svg",
          revision: "1be32e3b6ea0970e7012c9e953f11218",
        },
        {
          url: "/icon/threeSave.svg",
          revision: "75b947eb1c842251df33bedbe4418a99",
        },
        {
          url: "/icon/threeShare.svg",
          revision: "066e3dfaef8238ba89433d224a76b3c2",
        },
        {
          url: "/icon/threeTrash.svg",
          revision: "89d8e082040cae31d61830f9baf524ae",
        },
        {
          url: "/icon/youtube.svg",
          revision: "3fa8882409fb8644cc58190c3d303a82",
        },
        {
          url: "/image/background.mp4",
          revision: "9ed7e38d084b52c92e5d2fc3c3f196cc",
        },
        {
          url: "/image/mainImage.jpg",
          revision: "2eeaefe3203df7913fb21bfab3743791",
        },
        {
          url: "/util/baseAPI.jsx",
          revision: "977f435a0df77d36d3d86818805c8625",
        },
        {
          url: "/util/getDate.jsx",
          revision: "2571e00cbe7a825f51a4985d00038123",
        },
        {
          url: "/util/getWindowSize.jsx",
          revision: "13a4f751a5d3901023e40eaeea1b9860",
        },
        {
          url: "/util/localStorage.jsx",
          revision: "313788b6ee033cdba38dfef99043b7aa",
        },
        {
          url: "/util/recoilRootProvider.jsx",
          revision: "85ab296c4da9cf9771311c2464752fde",
        },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: n,
              event: s,
              state: a,
            }) =>
              n && "opaqueredirect" === n.type
                ? new Response(n.body, {
                    status: 200,
                    statusText: "OK",
                    headers: n.headers,
                  })
                : n,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const n = e.pathname;
        return !n.startsWith("/api/auth/") && !!n.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET",
    );
});
