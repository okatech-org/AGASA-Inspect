/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ENABLE_DEMO_MODE: 'true',
  },
};

module.exports = nextConfig;
