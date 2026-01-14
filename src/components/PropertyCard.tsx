import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, Bath, Square, MapPin } from 'lucide-react';
import { Property } from '@/lib/types';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = property.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop';

  return (
    <Link 
      href={`/listings/${property.id}`}
      className="bg-white border border-[#eeeeee] flex flex-col hover:shadow-card transition-grow group cursor-pointer h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={mainImage}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {property.status === 'featured' && (
            <span className="text-[10px] font-bold px-2 py-1 uppercase rounded-sm bg-[#1db954] text-white">
              FEATURED
            </span>
          )}
          {property.listing_type && (
            <span className="text-[10px] font-bold px-2 py-1 uppercase rounded-sm bg-black/60 text-white backdrop-blur-sm">
              FOR {property.listing_type.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-[14px] font-bold text-black mb-2 line-clamp-2 leading-tight uppercase font-sans tracking-wide">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-1 text-[#5c5c5c] text-[12px] mb-3">
          <MapPin size={12} />
          <span>{property.location}</span>
        </div>

        <div className="text-[16px] font-bold text-[#2d7a8c] mb-4 font-sans">
          {property.price || 'Contact for Price'}
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
            <Square size={14} className="text-[#5c5c5c]/60" />
            <span className="text-[13px] font-medium">{property.area || 'N/A'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
