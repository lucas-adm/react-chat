import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/livechat/:path*',
        destination: 'http://localhost:8080/livechat/:path*',
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://avatars.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
