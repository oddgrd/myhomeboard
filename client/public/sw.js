if(!self.define){let e,s={};const c=(c,t)=>(c=new URL(c+".js",t).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(t,r)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let i={};const a=e=>c(e,n),o={module:{uri:n},exports:i,require:a};s[n]=Promise.all(t.map((e=>o[e]||a(e)))).then((e=>(r(...e),i)))}}define(["./workbox-22294e6b"],(function(e){"use strict";importScripts("fallback-erjTtJXK9JpsDl1oqFF7c.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Logo-simple.svg",revision:"f9a92d0afed5c5a12713236ac936caf7"},{url:"/_next//static/media/Loading.99dbea1f.svg",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/107-a6620541d357c3c3.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/1bfc9850-0ce45d7c18206518.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/205-f7f13139a4a19a1c.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/512-82d494b109b394bf.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/551-0329dcdb39d5e925.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/608-c0b2993db284b9ee.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/612.b486737e1088d841.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/675-69abce8ee6e53914.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/972-cf487cc850e78608.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/984-c8ddebdadfd141f6.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/framework-3e26e20aa25c2c99.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/main-aece71aef508bf86.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/pages/_app-cf8b5f68e8531d19.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/pages/_offline-8a91bb8ffe05bb52.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/pages/board/%5Bid%5D-ea040b69a6ded4ee.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/pages/boards-593303a8b000816b.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/pages/boards/%5Bid%5D-56019c357674881f.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/pages/boards/%5Bid%5D/create-layout-f4ceb67fd43b6f91.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/pages/boards/%5Bid%5D/create-problem-4f56ad63660afd0e.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/pages/create-board-202aafa5dc294dc7.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/pages/faq-ca2ef1eb7fb035b0.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/pages/index-55ec15b19b9c5ccc.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/pages/login-db3b629cbb0edbd6.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/pages/problem/%5Bid%5D-52403ffe8d42c922.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/pages/profile/%5Bid%5D-0294529239a08a51.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/chunks/webpack-544b68882bc6c3c3.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/css/01e6b2ec75260f60.css",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/css/10f55ea11d182a4b.css",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/css/28b1cfdc31e1d337.css",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/css/5ba8636f179e5f88.css",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/css/6916627bf2274659.css",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/css/7bb14492ce4ffffd.css",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/css/829b30e93221dbc3.css",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/css/9b8d1c234411a647.css",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/css/9d15e85845e2011a.css",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/css/ab2dd22370fb67e7.css",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/css/e06f82c6208b7231.css",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/css/fccc5e7e16c59a78.css",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/erjTtJXK9JpsDl1oqFF7c/_buildManifest.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/erjTtJXK9JpsDl1oqFF7c/_middlewareManifest.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_next/static/erjTtJXK9JpsDl1oqFF7c/_ssgManifest.js",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/_offline",revision:"erjTtJXK9JpsDl1oqFF7c"},{url:"/favicon.png",revision:"477a9e843f00869f47bcb4129ea260f4"},{url:"/icons/logo120.png",revision:"f9f0057402a6fc6317a3b286457459f4"},{url:"/icons/logo128.png",revision:"4385e7826b21ee6ad8db3c25d1a9b8cb"},{url:"/icons/logo144.png",revision:"1deca45391e45a05c78dc813a0b247dd"},{url:"/icons/logo152.png",revision:"1b1c63ecdc35fdef08915de1f8e6d88e"},{url:"/icons/logo192.png",revision:"34d45c3b648755ad17fad7742912d137"},{url:"/icons/logo384.png",revision:"04093f8ddc9bfbbdd8ced864375223ba"},{url:"/icons/logo512.png",revision:"229d82e206ae70449e631cef21fce170"},{url:"/icons/logo72.png",revision:"47c9cf16af5c021d0ff033de2b07352b"},{url:"/icons/logo96.png",revision:"2e6f6fdcf7647e6391f9ebd20b667c09"},{url:"/manifest.json",revision:"fd26343fffe5fcacb4b6356f01fe2327"},{url:"/svg-to-png.sh",revision:"245bf4ee6e725458cbf55a711398c3b7"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
