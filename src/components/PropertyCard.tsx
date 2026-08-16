import React from 'react';
import Link from 'next/link';
import ImageWithFallback from '@/components/ui/image-with-fallback';
import { BedDouble, Bath, Scaling, MapPin, Trees } from 'lucide-react';
import { Property } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  theme?: 'light' | 'dark';
}

export default function PropertyCard({ property, theme = 'dark' }: PropertyCardProps) {
  const isLight = theme === 'light';
  const firstImage = property.images && property.images.length > 0
    ? property.images[0]
    : '/assets/placeholder-house.svg';

  return (
    <div
      className="bg-white border-[#EAEAEA] shadow-md border flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group h-full relative rounded-xl overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0A192F]">
        <ImageWithFallback
          src={firstImage}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover w-full h-full object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 to-transparent opacity-60 pointer-events-none" />

        {/* Overlays (Tags) */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 pointer-events-none">
          {property.status === 'featured' && (
            <span className="text-[10px] sm:text-xs font-bold px-3 py-1 uppercase rounded-md bg-[#E3572D] text-white shadow-lg tracking-wider">
              FEATURED
            </span>
          )}
          {property.listing_type && (
            <span className="text-[10px] sm:text-xs font-bold px-3 py-1 uppercase rounded-md bg-[#0A192F]/90 text-white backdrop-blur-md shadow-lg tracking-wider">
              FOR {property.listing_type}
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <Link href={`/listings/${property.id}`} className="flex flex-col flex-grow text-inherit no-underline">
        <div className="p-6 flex flex-col flex-grow relative z-10">
          <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm mb-3">
            <MapPin size={14} className="text-[#E3572D]" />
            <span className="truncate">{property.location}</span>
          </div>

          <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#222222] mb-3 line-clamp-2 leading-snug group-hover:text-[#E3572D] transition-colors">
            {property.title}
          </h3>

          <div className="text-[20px] font-bold text-[#E3572D] mb-6">
            {formatPrice(property.price)}
          </div>

          {/* Amenities Footer */}
          <div className="mt-auto pt-4 border-t flex items-center justify-between gap-4 overflow-x-auto [-webkit-overflow-scrolling:touch] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [scrollbar-width:none] border-[#EAEAEA] text-[#555555]">
            <div className="flex items-center gap-1.5 shrink-0 snap-start px-3 py-1.5 rounded-lg border bg-gray-50 border-[#EAEAEA]">
              <BedDouble size={16} className="text-[#E3572D]" />
              <span className="text-xs font-medium">{property.beds || 0}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 snap-start px-3 py-1.5 rounded-lg border bg-gray-50 border-[#EAEAEA]">
              <Bath size={16} className="text-[#E3572D]" />
              <span className="text-xs font-medium">{property.baths || 0}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 snap-start px-3 py-1.5 rounded-lg border bg-gray-50 border-[#EAEAEA]">
              <Scaling size={16} className="text-[#E3572D]" />
              <span className="text-xs font-medium">{property.area || 'N/A'}</span>
            </div>
            {property.land_area && (
              <div className="flex items-center gap-1.5 shrink-0 snap-start px-3 py-1.5 rounded-lg border bg-gray-50 border-[#EAEAEA]">
                <Trees size={16} className="text-[#E3572D]" />
                <span className="text-xs font-medium">{property.land_area}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
