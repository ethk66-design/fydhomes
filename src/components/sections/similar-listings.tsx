import React from 'react';
import ImageWithFallback from '@/components/ui/image-with-fallback';
import Link from 'next/link';
import { Bed, Bath } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// Define the shape of the data coming from Prisma (relations are objects)
interface RawProperty {
  id: string;
  title: string;
  price: string | null;
  images: { url: string }[]; // Prisma relation
  beds: number | null;
  baths: number | null;
  status: string;
  tags: { tag: string }[]; // Prisma relation
}

interface SimilarListing {
  id: string;
  title: string;
  price: string;
  image: string;
  beds?: number;
  baths?: number;
  tags: string[];
}

const PropertyCard = ({ listing }: { listing: SimilarListing }) => (
  <div className="group bg-white border border-[#EAEAEA] rounded-[4px] overflow-hidden transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
    <div className="relative aspect-video overflow-hidden bg-transparent">
      <ImageWithFallback
        src={listing.image}
        fallbackSrc="/assets/placeholder-house.svg"
        alt={listing.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-fill w-full h-full transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute top-2 right-2 flex flex-wrap gap-1 max-w-[80%] justify-end">
        {listing.tags.map((tag) => (
          <span
            key={tag}
            className="bg-[#303030] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-[2px] tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="p-3 sm:p-4">
      <h3 className="text-[#000000] text-[13px] sm:text-[15px] font-medium leading-[1.4] mb-2 sm:mb-3 line-clamp-2 min-h-[36px] sm:min-h-[42px] group-hover:text-[#D32F2F] transition-colors">
        <Link href={`/listings/${listing.id}`}>{listing.title}</Link>
      </h3>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#EAEAEA]">
        <div className="text-[#000000] text-[14px] sm:text-[16px] font-bold">
          {formatPrice(listing.price)}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {(listing.beds && listing.beds > 0) ? (
            <div className="flex items-center gap-1">
              <Bed size={12} className="text-[#666666] sm:w-3.5 sm:h-3.5" />
              <span className="text-[#666666] text-[11px] sm:text-[13px]">{listing.beds}</span>
            </div>
          ) : null}
          {(listing.baths && listing.baths > 0) ? (
            <div className="flex items-center gap-1">
              <Bath size={12} className="text-[#666666] sm:w-3.5 sm:h-3.5" />
              <span className="text-[#666666] text-[11px] sm:text-[13px]">{listing.baths}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </div>
);

interface SimilarListingsProps {
  listings: RawProperty[];
}

const SimilarListings = ({ listings = [] }: SimilarListingsProps) => {
  if (!listings || listings.length === 0) return null;

  // Transform Property data to SimilarListing format
  const similarListings: SimilarListing[] = listings.map(prop => ({
    id: prop.id,
    title: prop.title,
    price: prop.price || 'Price on Request',
    image: prop.images && prop.images.length > 0 ? prop.images[0].url : '/assets/placeholder-house.svg',
    beds: prop.beds ?? undefined,
    baths: prop.baths ?? undefined,
    tags: [
      prop.status === 'active' ? 'For Sale' : prop.status,
      ...(prop.tags || []).map((t) => t.tag)
    ].filter(Boolean) as string[]
  }));

  return (
    <section className="py-8 sm:py-12 md:py-[60px] bg-white">
      <div className="container mx-auto px-4 sm:px-5 md:px-0">
        <div className="mb-6 sm:mb-10">
          <div className="section-marker mb-2 sm:mb-3 relative flex items-center gap-2">
            <span className="inline-block w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-[#00AEEF] rounded-full relative">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#00AEEF] rounded-full"></span>
            </span>
            <span className="text-[#00AEEF] text-[11px] sm:text-[12px] font-bold tracking-[0.1em] uppercase">
              Similar Listings
            </span>
          </div>
          <h2 className="text-[#000000] font-display text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-tight mt-1 sm:mt-2">
            You May Also Like
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-[30px]">
          {similarListings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarListings;

