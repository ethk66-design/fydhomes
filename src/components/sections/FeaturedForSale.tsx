import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, BedDouble, Bath } from 'lucide-react';

const featuredProperties = [
  {
    id: 1,
    title: "Beautiful 5 BHK Fully Furnished House for Sale in Pukkattupady",
    price: "₹1.35 cr",
    beds: 4,
    baths: 4,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_54-PM-758x564-3.jpeg",
    labels: ["FOR SALE", "USED"]
  },
  {
    id: 2,
    title: "A Well-Designed 3BHK On 3 Cents Near Kakkanad | KUZHIVELIPADY",
    price: "₹",
    beds: 3,
    baths: 3,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_51-PM-4.jpeg",
    labels: ["FOR SALE"]
  },
  {
    id: 3,
    title: "Fully Furnished Villa For Sale With Everything A Family Needs | Thevakkal",
    price: "₹1.25 CR",
    beds: 4,
    baths: 3,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_54-PM-1-758x564-5.jpeg",
    labels: ["FOR SALE", "USED"]
  },
  {
    id: 4,
    title: "Every Malayali Would Dream Of A Home With Amenities Like This | Luxury Gated Villa |THEVAKKAL",
    price: "₹2.75 CR",
    beds: 4,
    baths: 5,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_55-PM-1-758x564-6.jpeg",
    labels: ["FOR SALE"]
  }
];

export function FeaturedForSale() {
  return (
    <section className="bg-white py-[80px]">
      <div className="container mx-auto px-5 lg:px-[15px] max-w-[1170px]">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full border border-[#2D7A8C] flex items-center justify-center p-[2px]">
                <div className="w-full h-full rounded-full bg-[#2D7A8C]"></div>
              </div>
              <span className="text-[12px] font-semibold text-[#2D7A8C] uppercase tracking-wider">Properties</span>
            </div>
              <h2 className="text-[32px] font-bold font-sans text-black leading-tight">
                Featured For Sale
              </h2>
            </div>


          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center border border-[#EEEEEE] text-[#5C5C5C] hover:bg-[#F4F8FB] transition-colors rounded-sm">
              <ChevronLeft size={18} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-[#EEEEEE] text-[#5C5C5C] hover:bg-[#F4F8FB] transition-colors rounded-sm">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Property Grid/Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7.5">
          {featuredProperties.map((property) => (
            <div 
              key={property.id} 
              className="bg-white border border-[#EEEEEE] rounded-sm shadow-sm overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Image Container */}
              <div className="relative aspect-[758/564] w-full">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                
                {/* Ribbon Labels */}
                <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                  {property.labels.map((label, idx) => (
                    <span 
                      key={idx}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm ${
                        label === 'FOR SALE' ? 'bg-black text-white' : 'bg-[#1DB954] text-white'
                      }`}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                {/* Internal arrows (visual only as per screenshot) */}
                <div className="absolute inset-y-0 left-2 flex items-center opacity-0 hover:opacity-100 transition-opacity">
                   <ChevronLeft size={24} className="text-white drop-shadow-md cursor-pointer" />
                </div>
                <div className="absolute inset-y-0 right-2 flex items-center opacity-0 hover:opacity-100 transition-opacity">
                   <ChevronRight size={24} className="text-white drop-shadow-md cursor-pointer" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-[14px] line-clamp-2 font-semibold text-black mb-4 leading-[1.4] h-10">
                  {property.title}
                </h3>
                
                <div className="flex items-center justify-between border-t border-[#EEEEEE] pt-3">
                   <div className="text-[15px] font-bold text-[#2D7A8C]">
                    {property.price}
                   </div>
                   
                   <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-[#5C5C5C]">
                        <BedDouble size={16} className="text-[#5C5C5C]/60" />
                        <span className="text-[13px]">{property.beds}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#5C5C5C]">
                        <Bath size={16} className="text-[#5C5C5C]/60" />
                        <span className="text-[13px]">{property.baths}</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2D7A8C]/30 cursor-pointer"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#2D7A8C]/30 cursor-pointer"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#2D7A8C] cursor-pointer"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#2D7A8C]/30 cursor-pointer"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#2D7A8C]/30 cursor-pointer"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#2D7A8C]/30 cursor-pointer"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#2D7A8C]/30 cursor-pointer"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#2D7A8C]/30 cursor-pointer"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedForSale;