/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
};

// next-pwa uses webpack plugins incompatible with Turbopack (dev mode).
// Only wrap in production where webpack is used for the build.
if (process.env.NODE_ENV === 'production') {
  const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    importScripts: ['/custom-sw.js'],
  });
  module.exports = withPWA(nextConfig);
} else {
  module.exports = nextConfig;
}
