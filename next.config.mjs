/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'custom',
        loaderFile: './src/lib/supabase-image-loader.ts',
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        reactCompiler: true,
    },
    output: 'standalone',
    poweredByHeader: false,
};

export default nextConfig;
