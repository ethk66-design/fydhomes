"use client";

import React from 'react';
import Link from 'next/link';
import ImageWithFallback from '@/components/ui/image-with-fallback';
import PropertyImageSlider from '@/components/ui/property-image-slider';
import { BedDouble, Bath, Scaling, MapPin, Trees } from 'lucide-react';


import { Property } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // Use PropertyImageSlider for the image section
  // Fallback handled inside the slider if images array is empty
  const images = property.images && property.images.length > 0
    ? property.images
    : ['/assets/placeholder-house.svg'];

  return (
    <div
      className="bg-white border border-[#eeeeee] flex flex-col hover:shadow-card transition-grow group h-full relative"
    >
      {/* Image Slider Section - Handles its own internal clicks/swipes */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <PropertyImageSlider
          images={images}
          alt={property.title}
          aspectRatio="aspect-[4/3]"
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

          <div className="mt-auto pt-4 border-t border-[#eeeeee] flex items-center justify-between text-[#5c5c5c]">
            <div className="flex items-center gap-1.5">
              <BedDouble size={16} className="text-[#5c5c5c]/60" />
              <span className="text-[13px] font-medium">{property.beds || 0}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath size={16} className="text-[#5c5c5c]/60" />
              <span className="text-[13px] font-medium">{property.baths || 0}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Scaling size={16} className="text-[#5c5c5c]/60" />
              <span className="text-[13px] font-medium">{property.area || 'N/A'}</span>
            </div>
          </div>

          {property.land_area && (
            <div className="pt-3 mt-3 border-t border-dashed border-[#eeeeee] flex items-center gap-2 text-[#5c5c5c]">
              <div className="flex items-center gap-1.5">
                <Trees size={14} className="text-[#2d7a8c]" />
                <span className="text-[13px] font-medium">{property.land_area}</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
