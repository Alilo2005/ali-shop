import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Explicit domains list to satisfy Next/Image host checks
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'picsum.photos',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  serverExternalPackages: ['@prisma/client'],
};

export default nextConfig;
