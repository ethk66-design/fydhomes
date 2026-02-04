import type { NextConfig } from "next";

// Loader path from orchids-visual-edits - use direct resolve to get the actual file
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    reactCompiler: true,
  },
  output: "standalone",
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
