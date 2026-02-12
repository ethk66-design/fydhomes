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
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setImgSrc(src);
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
            onError={() => {
                setHasError(true);
            }}
        />
    );
};

export default ImageWithFallback;
