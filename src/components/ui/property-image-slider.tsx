"use client";

import React, { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ImageWithFallback from '@/components/ui/image-with-fallback';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyImageSliderProps {
    images: string[];
    alt: string;
    aspectRatio?: string;
    className?: string;
    width?: number | string;
    disabled?: boolean;
}

export default function PropertyImageSlider({
    images,
    alt,
    aspectRatio = "aspect-video",
    className,
    width,
    disabled = false
}: PropertyImageSliderProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        loop: true,
        watchDrag: !disabled,
        active: !disabled
    });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    React.useEffect(() => {
        if (!emblaApi || disabled) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect, disabled]);

    // Ensure we always have at least one image
    const slideImages = images.length > 0 ? images : ['/assets/placeholder-house.svg'];
    const displayImages = disabled ? [slideImages[0]] : slideImages;

    return (
        <div className={cn("relative group overflow-hidden", aspectRatio, className)}>
            <div className="overflow-hidden h-full" ref={disabled ? null : emblaRef}>
                <div className="flex h-full touch-pan-y">
                    {displayImages.map((src, index) => {
                        return (
                            <div className="relative flex-[0_0_100%] min-w-0 h-full overflow-hidden bg-white group/slide" key={index}>
                                <ImageWithFallback
                                    src={src}
                                    alt={`${alt} - Image ${index + 1}`}
                                    fill
                                    width={width}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover w-full h-full scale-[0.90] transition-transform duration-500 group-hover/slide:scale-[0.92]"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Arrows (Desktop: Hover Only / Mobile: Always Hidden - Swipe Only) */}
            {!disabled && displayImages.length > 1 && (
                <>
                    <button
                        className="hidden md:flex absolute top-1/2 left-2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 z-10"
                        onClick={scrollPrev}
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        className="hidden md:flex absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 z-10"
                        onClick={scrollNext}
                        aria-label="Next image"
                    >
                        <ChevronRight size={16} />
                    </button>

                    {/* Pagination Dots (Interactive on Mobile/Desktop) */}
                    <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0 z-10 pointer-events-auto">
                        {displayImages.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Go to image ${index + 1}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (emblaApi) emblaApi.scrollTo(index);
                                }}
                                className="p-3 touch-manipulation focus:outline-none"
                            >
                                <div
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-all duration-300 shadow-sm",
                                        index === selectedIndex ? "bg-white scale-125" : "bg-white/60"
                                    )}
                                />
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
