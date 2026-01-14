import React from 'react';
import Image from 'next/image';
import { Bed, Bath, ChevronRight, ChevronLeft } from 'lucide-react';

interface SimilarListing {
  id: string;
  title: string;
  price: string;
  image: string;
  beds?: number;
  baths?: number;
  tags: string[];
}

const listings: SimilarListing[] = [
  {
    id: '1',
    title: 'A Good Home Near The Bus Route At An Affordable Price | Budget Friendly | 3BHK',
    price: '₹48.00 LAKH',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2026-01-14-at-11_11_16-AM-1-584x438-23.jpeg',
    beds: 3,
    baths: 3,
    tags: ['FOR SALE', 'BUDGET HOMES'],
  },
  {
    id: '2',
    title: 'A Charming Home — Own A Premium Villa Near Kochi Infopark | European-Style Villa',
    price: '₹1.29 CR',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2026-01-14-at-11_11_13-AM-584x438-24.jpeg',
    beds: 5,
    tags: ['FOR SALE'],
  },
  {
    id: '3',
    title: 'Kochi’s Closest Premium Villa Project To Infopark | 4BHK+|PERINGALA',
    price: '₹1.10 CR',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2026-01-14-at-11_11_13-AM-1-584x438-25.jpeg',
    beds: 4,
    baths: 4,
    tags: ['FOR SALE'],
  },
  {
    id: '4',
    title: 'A Quality Home On The Edappally–Pookkattupady Bus Route | Near Kakkanad',
    price: '₹85.00 LAKH',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2026-01-14-at-11_11_14-AM-1-584x438-26.jpeg',
    beds: 4,
    baths: 4,
    tags: ['FOR SALE'],
  }
];

const PropertyCard = ({ listing }: { listing: SimilarListing }) => (
  <div className="group bg-white border border-[#EAEAEA] rounded-[4px] overflow-hidden transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
    <div className="relative aspect-[4/3] overflow-hidden">
      <Image
        src={listing.image}
        alt={listing.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Navigation Arrows (Visible on Hover in original) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="bg-black/40 text-white p-1 rounded-sm">
          <ChevronLeft size={20} />
        </button>
        <button className="bg-black/40 text-white p-1 rounded-sm">
          <ChevronRight size={20} />
        </button>
      </div>
      {/* Tags */}
      <div className="absolute top-2 right-2 flex gap-1">
        {listing.tags.map((tag) => (
          <span 
            key={tag}
            className="bg-[#303030] text-white text-[10px] font-bold px-2 py-1 rounded-[2px] tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
    
    <div className="p-4">
      <h3 className="text-[#000000] text-[15px] font-medium leading-[1.4] mb-3 line-clamp-2 min-h-[42px] group-hover:text-[#D32F2F] transition-colors">
        <a href="#">{listing.title}</a>
      </h3>
      
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#EAEAEA]">
        <div className="text-[#000000] text-[16px] font-bold">
          {listing.price}
        </div>
        
        <div className="flex items-center gap-3">
          {listing.beds && (
            <div className="flex items-center gap-1">
              <Bed size={14} className="text-[#666666]" />
              <span className="text-[#666666] text-[13px]">{listing.beds}</span>
            </div>
          )}
          {listing.baths && (
            <div className="flex items-center gap-1">
              <Bath size={14} className="text-[#666666]" />
              <span className="text-[#666666] text-[13px]">{listing.baths}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const SimilarListings = () => {
  return (
    <section className="py-[60px] bg-white">
      <div className="container px-5 md:px-0">
        <div className="mb-10">
          <div className="section-marker mb-3 relative flex items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-[#00AEEF] rounded-full relative">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#00AEEF] rounded-full"></span>
            </span>
            <span className="text-[#00AEEF] text-[12px] font-bold tracking-[0.1em] uppercase">
              Similar Listings
            </span>
          </div>
          <h2 className="text-[#000000] font-display text-[24px] font-normal leading-tight mt-2">
            You May Also Like
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
          {listings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarListings;