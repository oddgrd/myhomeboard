const { nodeModuleNameResolver } = require('typescript');

/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self' *.myhomeboard.no; connect-src 'self' *.myhomeboard.no vitals.vercel-insights.com; img-src 'self' lh3.googleusercontent.com res.cloudinary.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
  },
];

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com"],
  },
  async headers() {
    return process.env.NODE_ENV === "production" ? [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ] : [];
  },
};
