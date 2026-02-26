/**
 * Custom Supabase Image Loader for Next.js
 * 
 * This loader bypasses Vercel's Image Optimization API (which has a 
 * 1000-image limit on the Hobby tier) by using Supabase Storage's
 * built-in image transformation endpoint.
 * 
 * For Supabase URLs: Appends width/quality params for server-side resizing.
 * For other URLs: Returns the URL as-is (handled normally by Next.js).
 * 
 * Usage in next.config.mjs:
 *   images: { loader: 'custom', loaderFile: './src/lib/supabase-image-loader.ts' }
 */

interface ImageLoaderParams {
    src: string;
    width: number;
    quality?: number;
}

export default function supabaseImageLoader({ src, width, quality }: ImageLoaderParams): string {
    // Only transform Supabase Storage URLs
    if (src.includes('supabase.co/storage/')) {
        // Supabase image transformation API:
        // /storage/v1/object/public/bucket/path → /storage/v1/render/image/public/bucket/path
        const transformedUrl = src.replace(
            '/storage/v1/object/public/',
            '/storage/v1/render/image/public/'
        );

        const params = new URLSearchParams();
        params.set('width', String(width));
        params.set('quality', String(quality || 75));
        params.set('resize', 'contain');

        return `${transformedUrl}?${params.toString()}`;
    }

    // For non-Supabase URLs (e.g., local assets), return as-is
    // Next.js will handle these through its default pipeline
    return src;
}
