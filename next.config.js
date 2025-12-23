/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Disable dev overlay and indicators
  devIndicators: false,
  // Add this to allow local network access
  allowedDevOrigins: [
    'http://192.168.29.251:3000',
    'http://localhost:3000',
  ],
};

module.exports = nextConfig;