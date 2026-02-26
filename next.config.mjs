/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co', // All Supabase projects (Wildcard)
            },
            {
                protocol: 'https',
                hostname: 'vexsmxrfxbatpyelugch.supabase.co', // Current Project
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com', // Google Auth (Future proofing)
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com', // Common backup
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com', // Placeholder images
            }
        ],
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
