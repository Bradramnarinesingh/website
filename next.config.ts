import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['@next/font'],
  },
  images: {
    domains: ['thebeayoutifulfoundation.com'],
  },
};

export default nextConfig;
