import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, BedDouble, Bath, Square } from 'lucide-react';

const rentalProperties = [
  {
    id: 1,
    title: '4BHK FULLY FURNISHED FOR RENT | PUKKATUPADY |ALUVA|FYD32',
    price: '29000.00',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_46_08-PM-758x564-23.jpeg',
    beds: 4,
    baths: 4,
    sqft: 2200,
    badges: ['FOR RENT']
  },
  {
    id: 2,
    title: 'COMMERCIAL PROPERTIES IN KIZHAKKAMBALAM/ OFFICE SPACE |FYD27',
    price: '30000.00',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_46_10-PM-1-758x564-24.jpeg',
    beds: 0,
    baths: 0,
    sqft: 1200,
    badges: ['FOR RENT', 'FOR SALE', 'FEATURED']
  },
  {
    id: 3,
    title: '3 BHK RENT PUKKATUPADY | FYD 23',
    price: '30000.00 RS',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_46_12-PM-758x564-26.jpeg',
    beds: 3,
    baths: 3,
    sqft: 0,
    badges: ['FOR RENT', 'FOR SALE', 'FEATURED']
  },
  {
    id: 4,
    title: 'HOME FOR RENT PUKKATTUPADY | FYD13',
    price: '25000.00',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_46_10-PM-1-758x564-24.jpeg',
    beds: 3,
    baths: 3,
    sqft: 1800,
    badges: ['FOR RENT']
  }
];

const FeaturedForRent = () => {
  return (
    <section className="bg-white py-[80px]">
      <div className="container mx-auto px-[15px] max-w-[1230px]">
        {/* Section Header */}
        <div className="flex flex-col mb-[40px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-[18px] h-[18px] rounded-full border border-[#2b7387] flex items-center justify-center">
              <div className="w-[8px] h-[8px] rounded-full bg-[#2b7387]"></div>
            </div>
            <span className="text-[12px] font-bold text-[#2b7387] tracking-wider uppercase font-sans">
              Properties
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-[32px] font-bold text-[#1a1a1a] font-serif leading-[1.3] m-0">
              Featured For Rent
            </h2>
            
            <div className="flex items-center gap-2">
              <button className="w-[40px] h-[30px] flex items-center justify-center border border-[#e5e5e5] rounded-[4px] bg-white hover:bg-[#f4f7f8] transition-colors">
                <ChevronLeft className="w-[16px] h-[16px] text-[#737373]" />
              </button>
              <button className="w-[40px] h-[30px] flex items-center justify-center border border-[#e5e5e5] rounded-[4px] bg-white hover:bg-[#f4f7f8] transition-colors">
                <ChevronRight className="w-[16px] h-[16px] text-[#737373]" />
              </button>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {rentalProperties.map((property) => (
            <div 
              key={property.id} 
              className="bg-white rounded-[4px] border border-[#e5e5e5] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.05)] transition-shadow group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-[4px]">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-[10px] left-[10px] flex flex-wrap gap-1">
                  {property.badges.map((badge, idx) => (
                    <span 
                      key={idx}
                      className={`text-[10px] font-bold px-[8px] py-[4px] rounded-[2px] text-white uppercase tracking-wider ${
                        badge === 'FEATURED' ? 'bg-[#1db954]' : 'bg-[#1a1a1a]'
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-[15px] flex flex-col flex-grow">
                <h3 className="text-[14px] font-medium text-[#1a1a1a] line-clamp-2 mb-[15px] h-[40px] font-sans leading-[1.4] hover:text-[#2b7387] cursor-pointer transition-colors">
                  {property.title}
                </h3>
                
                <div className="mt-auto">
                  <p className="text-[18px] font-bold text-[#1a1a1a] mb-[15px] font-sans leading-none">
                    ₹{property.price}
                  </p>

                  <div className="flex items-center justify-between pt-[15px] border-t border-[#f4f7f8] text-[#737373]">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <BedDouble className="w-[14px] h-[14px]" />
                      <span className="text-[12px] font-medium whitespace-nowrap">{property.beds > 0 ? property.beds : '-'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <Bath className="w-[14px] h-[14px]" />
                      <span className="text-[12px] font-medium whitespace-nowrap">{property.baths > 0 ? property.baths : '-'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <Square className="w-[14px] h-[14px]" />
                      <span className="text-[12px] font-medium whitespace-nowrap">{property.sqft > 0 ? property.sqft : '-'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots (Mobile/Slider UI) */}
        <div className="flex justify-center mt-[30px] gap-2">
          <div className="w-[6px] h-[6px] rounded-full bg-[#1a1a1a]"></div>
          <div className="w-[6px] h-[6px] rounded-full bg-[#e5e5e5]"></div>
          <div className="w-[6px] h-[6px] rounded-full bg-[#e5e5e5]"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedForRent;