import React from 'react';
import Link from 'next/link';
import ImageWithFallback from '@/components/ui/image-with-fallback';
import { BedDouble, Bath, Scaling, MapPin, Trees } from 'lucide-react';

import { Property } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const firstImage = property.images && property.images.length > 0
    ? property.images[0]
    : '/assets/placeholder-house.svg';

  return (
    <div
      className="bg-white border border-[#eeeeee] flex flex-col hover:shadow-card transition-grow group h-full relative"
    >
      {/* Static Image - First image only, full display */}
      <div className="relative w-full aspect-video overflow-hidden bg-[#f8f9fa]">
        <ImageWithFallback
          src={firstImage}
          alt={property.title}
          fill
          width={400}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover w-full h-full object-center"
        />

        {/* Overlays (Tags) - Pointer events none so they don't block slider */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {property.status === 'featured' && (
            <span className="text-[10px] font-bold px-2 py-1 uppercase rounded-sm bg-[#1db954] text-white">
              FEATURED
            </span>
          )}
          {property.tags?.map(tag => {
            if (tag === 'budget-friendly') {
              return (
                <span key={tag} className="text-[10px] font-bold px-2 py-1 uppercase rounded-sm bg-[#00AEEF] text-white">
                  BUDGET FRIENDLY
                </span>
              );
            }
            return (
              <span key={tag} className="text-[10px] font-bold px-2 py-1 uppercase rounded-sm bg-gray-800 text-white">
                {tag}
              </span>
            );
          })}
          {property.listing_type && (
            <span className="text-[10px] font-bold px-2 py-1 uppercase rounded-sm bg-black/60 text-white backdrop-blur-sm">
              FOR {property.listing_type.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Content Section - Wrapped in Link for navigation */}
      <Link href={`/listings/${property.id}`} className="flex flex-col flex-grow text-inherit no-underline">
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-[14px] font-bold text-black mb-2 line-clamp-2 leading-tight uppercase tracking-wide group-hover:text-[#2d7a8c] transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center gap-1 text-[#5c5c5c] text-[12px] mb-3">
            <MapPin size={12} />
            <span>{property.location}</span>
          </div>

          <div className="text-[16px] font-bold text-[#2d7a8c] mb-4">
            {formatPrice(property.price)}
          </div>

          <div className="mt-auto pt-4 border-t border-[#eeeeee] flex items-center justify-between gap-2 sm:gap-1 text-[#5c5c5c] overflow-x-auto [-webkit-overflow-scrolling:touch] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex items-center gap-1 shrink-0 snap-start">
              <BedDouble size={14} className="text-[#5c5c5c]/60" />
              <span className="text-[11px] font-medium whitespace-nowrap">{property.beds || 0}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0 snap-start">
              <Bath size={14} className="text-[#5c5c5c]/60" />
              <span className="text-[11px] font-medium whitespace-nowrap">{property.baths || 0}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0 snap-start">
              <Scaling size={14} className="text-[#5c5c5c]/60" />
              <span className="text-[11px] font-medium whitespace-nowrap">{property.area || 'N/A'}</span>
            </div>
            {property.land_area && (
              <div className="flex items-center gap-1 shrink-0 snap-start">
                <Trees size={14} className="text-[#2d7a8c]" />
                <span className="text-[11px] font-medium whitespace-nowrap">{property.land_area}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
