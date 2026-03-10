"use client";

import React, { useState, useEffect } from 'react';

// Supabase Native Image Transformation Interceptor
export function optimizeSupabaseUrl(url: string, width = 800, quality = 75): string {
    if (!url) return '';
    // If it's a Supabase storage URL, rewrite it to use their native /render/image/ endpoint
    if (url.includes('/storage/v1/object/public/')) {
        return url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/')
            + `?width=${width}&quality=${quality}`;
    }
    return url;
}

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
    src: string;
    // We keep these for TypeScript compatibility with old Next.js props, but they are mostly ignored by raw <img>
    fill?: boolean;
    priority?: boolean;
    quality?: number | string;
    unoptimized?: boolean;
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
    unoptimized,
    ...props
}: ImageWithFallbackProps) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setImgSrc(src);
        setHasError(false);
    }, [src]);

    if (!src && !fallbackSrc) {
        return null;
    }

    // Apply Supabase compression
    const finalSrc = hasError ? fallbackSrc : optimizeSupabaseUrl(imgSrc, 800, Number(quality));

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            {...props}
            src={finalSrc}
            alt={alt || "Property Image"}
            loading={loading}
            decoding={decoding}
            fetchPriority={priority ? "high" : "auto"}
            className={className}
            onError={() => {
                if (!hasError) {
                    setHasError(true);
                }
            }}
            style={fill ? { width: '100%', height: '100%', objectFit: 'cover', ...props.style } : props.style}
        />
    );
};

export default ImageWithFallback;

