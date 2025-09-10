import type { NextConfig } from 'next';

const repo = 'slide';
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: assetPrefix,
  basePath: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
