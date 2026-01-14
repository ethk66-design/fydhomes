import React from 'react';
import Image from 'next/image';
import { BedDouble, Bath, Square, ChevronLeft, ChevronRight } from 'lucide-react';

const properties = [
  {
    id: 1,
    title: "4BHK FULLY FURNISHED FOR RENT | PUKKATUPADY |ALUVA|FYD32",
    price: "₹29000.00",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_55-PM-2-758x564-7.jpeg",
    beds: 4,
    baths: 4,
    size: 2000,
    tags: ["FOR RENT"]
  },
  {
    id: 2,
    title: "COMMERCIAL PROPERTIES IN KIZHAKKAMBALAM/ OFFICE SPACE |FYD27",
    price: "₹30000.00",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_55-PM-758x564-8.jpeg",
    beds: 0,
    baths: 2,
    size: 1100,
    tags: ["FOR RENT", "FOR SALE"]
  },
  {
    id: 3,
    title: "3 BHK RENT PUKKATUPADY | FYD 23",
    price: "₹30000.00 RS",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_56-PM-758x564-9.jpeg",
    beds: 3,
    baths: 3,
    size: 1600,
    tags: ["FEATURED", "FOR RENT", "SOLD OUT"]
  },
  {
    id: 4,
    title: "HOME FOR RENT PUKKATTUPADY | FYD13",
    price: "₹25000.00",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_57-PM-758x564-10.jpeg",
    beds: 3,
    baths: 3,
    size: 1400,
    tags: ["FOR RENT"]
  }
];

export default function FeaturedForRent() {
  return (
    <section className="bg-white py-[80px]">
      <div className="container px-[1.25rem] max-w-[1170px] mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded-full border border-[#2d7a8c] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2d7a8c]"></div>
          </div>
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#2d7a8c] font-sans">
            Properties
          </span>
        </div>

          <div className="flex justify-between items-end mb-[30px]">
            <h2 className="text-[32px] font-bold font-sans text-black leading-[1.3] m-0">
              Featured For Rent
            </h2>
          <div className="flex gap-2">
            <button className="w-11 h-8 flex items-center justify-center border border-[#eeeeee] hover:bg-gray-50 transition-colors">
              <ChevronLeft size={16} className="text-[#5c5c5c]" />
              <span className="sr-only">Prev</span>
            </button>
            <button className="w-11 h-8 flex items-center justify-center border border-[#eeeeee] hover:bg-gray-50 transition-colors">
              <ChevronRight size={16} className="text-[#5c5c5c]" />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
          {properties.map((property) => (
            <div 
              key={property.id} 
              className="bg-white border border-[#eeeeee] flex flex-col hover:shadow-card transition-grow group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                  {property.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className={`text-[10px] font-bold px-2 py-1 uppercase rounded-sm ${
                        tag === 'FEATURED' ? 'bg-[#1db954] text-white' :
                        tag === 'SOLD OUT' ? 'bg-black text-white' :
                        'bg-black/60 text-white backdrop-blur-sm'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-[14px] font-bold text-black mb-3 line-clamp-2 leading-tight uppercase font-sans tracking-wide">
                  {property.title}
                </h3>
                
                <div className="text-[16px] font-bold text-[#2d7a8c] mb-4 font-sans">
                  {property.price}
                </div>

                <div className="mt-auto pt-4 border-t border-[#eeeeee] flex items-center justify-between text-[#5c5c5c]">
                  <div className="flex items-center gap-1.5">
                    <BedDouble size={16} className="text-[#5c5c5c]/60" />
                    <span className="text-[13px] font-medium">{property.beds}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath size={16} className="text-[#5c5c5c]/60" />
                    <span className="text-[13px] font-medium">{property.baths}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Square size={14} className="text-[#5c5c5c]/60" />
                    <span className="text-[13px] font-medium">{property.size}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Indicator Placeholder */}
        <div className="flex justify-center gap-1.5 mt-10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2d7a8c]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#eeeeee]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#eeeeee]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#eeeeee]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#eeeeee]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#eeeeee]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#eeeeee]"></div>
        </div>
      </div>
    </section>
  );
}