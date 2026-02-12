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
}

export default function PropertyImageSlider({
    images,
    alt,
    aspectRatio = "aspect-[4/3]",
    className
}: PropertyImageSliderProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
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
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    // Ensure we always have at least one image (fallback handled by ImageWithFallback, but logic here helps slider)
    const slideImages = images.length > 0 ? images : ['/assets/placeholder-house.svg'];

    return (
        <div className={cn("relative group overflow-hidden", aspectRatio, className)}>
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full touch-pan-y">
                    {slideImages.map((src, index) => (
                        <div className="relative flex-[0_0_100%] min-w-0 h-full" key={index}>
                            <ImageWithFallback
                                src={src}
                                alt={`${alt} - Image ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows (Desktop: Hover Only / Mobile: Always Hidden - Swipe Only) */}
            {slideImages.length > 1 && (
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

                    {/* Pagination Dots (Visible on Mobile) */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
                        {slideImages.map((_, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "w-1.5 h-1.5 rounded-full transition-all duration-300 shadow-sm",
                                    index === selectedIndex ? "bg-white scale-110" : "bg-white/50"
                                )}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
