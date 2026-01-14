import React from 'react';
import Image from 'next/image';
import { BedDouble, Bath, ChevronLeft, ChevronRight, Target } from 'lucide-react';

interface Property {
  id: number;
  title: string;
  price: string;
  beds: number;
  baths: number;
  image: string;
  badge: string[];
}

const properties: Property[] = [
  {
    id: 1,
    title: "Beautiful 5 BHK Fully Furnished House For Sale in Pukkattupady",
    price: "₹1.35 cr",
    beds: 4,
    baths: 4,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_54-PM-758x564-3.jpeg",
    badge: ["FOR SALE", "USED"]
  },
  {
    id: 2,
    title: "A Well-Designed 3BHK On 3 Cents Near Kakkanad | KUZHIVELIPADY",
    price: "₹1.25 cr",
    beds: 3,
    baths: 3,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_51-PM-4.jpeg",
    badge: ["FOR SALE"]
  },
  {
    id: 3,
    title: "Fully Furnished Villa For Sale With Everything A Family Needs | Thevakkal",
    price: "₹1.25 CR",
    beds: 4,
    baths: 3,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_54-PM-1-758x564-5.jpeg",
    badge: ["FOR SALE", "USED"]
  },
  {
    id: 4,
    title: "Every Malayali Would Dream Of A Home With Amenities Like This | Luxury gated villa | THEVAKKAL",
    price: "₹2.75 CR",
    beds: 4,
    baths: 5,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_55-PM-1-758x564-6.jpeg",
    badge: ["FOR SALE"]
  }
];

const FeaturedForSale = () => {
  return (
    <section className="bg-white py-[80px]">
      <div className="container mx-auto px-[15px] max-w-[1230px]">
        {/* Section Header */}
        <div className="mb-[30px] flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
              <span className="text-[13px] font-medium tracking-[1px] uppercase text-primary font-sans">
                PROPERTIES
              </span>
            </div>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#1a1a1a] font-serif leading-tight">
              Featured For Sale
            </h2>
          </div>
          
          {/* Slider Controls */}
          <div className="hidden md:flex gap-2">
            <button className="w-[40px] h-[34px] flex items-center justify-center border border-[#e5e5e5] rounded-[4px] bg-[#fdfdfd] text-[#a8a8a8] hover:bg-primary hover:text-white transition-colors">
              <ChevronLeft size={16} />
              <span className="sr-only">Previous</span>
            </button>
            <button className="w-[40px] h-[34px] flex items-center justify-center border border-[#e5e5e5] rounded-[4px] bg-[#fdfdfd] text-[#a8a8a8] hover:bg-primary hover:text-white transition-colors">
              <ChevronRight size={16} />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {properties.map((property) => (
            <div 
              key={property.id} 
              className="bg-white border border-[#e5e5e5] rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[758/564] group h-[190px]">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Badges */}
                <div className="absolute top-2.5 right-2.5 flex flex-wrap gap-1 justify-end">
                  {property.badge.map((tag, idx) => (
                    <span 
                      key={idx}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-[2px] text-white ${
                        tag === 'FOR SALE' ? 'bg-[#1a1a1a]' : 'bg-[#737373]'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Hover Overlay Arrow (Visual only as per original) */}
                <div className="absolute inset-y-0 right-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="bg-black/20 p-1 mr-2 rounded">
                     <ChevronRight size={20} className="text-white" />
                   </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-[14px] font-bold text-[#1a1a1a] font-sans leading-[1.4] mb-3 line-clamp-2 h-[40px]">
                  {property.title}
                </h3>
                
                <div className="mt-auto flex items-center justify-between border-t border-[#f4f7f8] pt-3">
                  <div className="text-[16px] font-bold text-[#1a1a1a]">
                    {property.price}
                  </div>
                  <div className="flex items-center gap-3 text-[#737373]">
                    <div className="flex items-center gap-1.5">
                      <BedDouble size={14} className="opacity-60" />
                      <span className="text-[13px] font-medium">{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath size={14} className="opacity-60" />
                      <span className="text-[13px] font-medium">{property.baths}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Pagination Dots (Mobile/Visual) */}
        <div className="flex justify-center gap-2 mt-[30px]">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-primary' : 'bg-[#e5e5e5]'}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedForSale;