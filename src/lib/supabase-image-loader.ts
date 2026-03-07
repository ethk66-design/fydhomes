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

export default function supabaseImageLoader({ src, width: _width, quality: _quality }: ImageLoaderParams): string {
    // Only transform Supabase Storage URLs
    if (src.includes('supabase.co/storage/')) {
        // Since Supabase Image Transformation isn't fully enabled on this project tier,
        // we bypass the /render/image/ endpoint and just return the direct public URL.
        // This prevents the "400 Bad Request" errors from the Next.js `next/image` component.
        return src;
    }

    // For non-Supabase URLs (e.g., local assets), return as-is
    // Next.js will handle these through its default pipeline
    return src;
}
