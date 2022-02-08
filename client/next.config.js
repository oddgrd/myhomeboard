/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const prod = process.env.NODE_ENV === 'production';

const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Referrer-Policy',
    value: 'no-referrer',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'require-corp',
  },
  {
    key: 'Content-Security-Policy',
    value: `default-src 'self'; connect-src 'self' https://api.myhomeboard.no vitals.vercel-insights.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' lh3.googleusercontent.com res.cloudinary.com data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; object-src 'none'`,
  },
];

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
    // https://github.com/GoogleChrome/workbox/issues/1790
    disable: !prod,
    // https://github.com/shadowwalker/next-pwa/issues/288
    buildExcludes: [/middleware-manifest\.json$/],
  },
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
  async headers() {
    return prod
      ? [
          {
            source: '/(.*)',
            headers: securityHeaders,
          },
        ]
      : [];
  },
});
