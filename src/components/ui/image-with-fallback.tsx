import React from 'react';
import { preload } from 'react-dom';

// Supabase Native Image Transformation Interceptor
export function optimizeSupabaseUrl(url: string, width = 800, quality = 75): string {
    if (!url) return '';
    // If it's a Supabase storage URL, rewrite it to use their native /render/image/ endpoint
    if (url.includes('/storage/v1/object/public/')) {
        // Ensure width is a number even if passed as string-hint
        const w = typeof width === 'string' ? parseInt(width) : width;
        return url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/')
            + `?width=${w || 800}&quality=${quality}`;
    }
    return url;
}

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
    src?: string;
    // We keep these for TypeScript compatibility with old Next.js props, but they are mostly ignored by raw <img>
    fill?: boolean;
    priority?: boolean;
    quality?: number | string;
    unoptimized?: boolean;
    width?: number | string; // Explicitly re-declare to ensure it's captured
}

const ImageWithFallback = ({
    src,
    fallbackSrc = '/assets/placeholder-house.svg',
    alt,
    className,
    priority = false,
    loading = priority ? "eager" : "lazy", // Aggressive lazy loading by default, unless priority
    decoding = "async",
    fill,
    quality = 75,
    width,
    ...props
}: ImageWithFallbackProps) => {
    
    // Determine the source to use. If `src` is falsy, immediately fallback.
    const activeSrc = src || fallbackSrc;

    if (!activeSrc) {
        return null;
    }

    // Apply Supabase compression
    const finalSrc = optimizeSupabaseUrl(activeSrc, Number(width) || 800, Number(quality));

    // Force browser to fetch LCP images eagerly before the DOM is fully parsed
    if (priority) {
        preload(finalSrc, { as: 'image', fetchPriority: 'high' });
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            {...props}
            src={finalSrc}
            width={width}
            alt={alt || "Property Image"}
            loading={loading}
            decoding={decoding}
            fetchPriority={priority ? "high" : "auto"}
            className={`${className || ""} ${fill ? "absolute inset-0 w-full h-full object-cover" : ""}`.trim()}
            style={props.style}
        />
    );
};

export default ImageWithFallback;

