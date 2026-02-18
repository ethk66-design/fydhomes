"use client";

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends ImageProps {
    fallbackSrc?: string;
}

const ImageWithFallback = ({
    src,
    fallbackSrc = '/assets/placeholder-house.svg',
    alt,
    ...props
}: ImageWithFallbackProps) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [useUnoptimized, setUseUnoptimized] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setImgSrc(src);
        setUseUnoptimized(false);
        setHasError(false);
    }, [src]);

    if (!src && !fallbackSrc) {
        return null;
    }

    return (
        <Image
            {...props}
            src={hasError ? fallbackSrc : imgSrc}
            alt={alt || "Property Image"}
            unoptimized={useUnoptimized}
            onError={() => {
                if (!useUnoptimized) {
                    // First failure: Try unoptimized (bypassing next.config.mjs domain check)
                    setUseUnoptimized(true);
                } else {
                    // Second failure: Show placeholder
                    setHasError(true);
                }
            }}
        />
    );
};

export default ImageWithFallback;
