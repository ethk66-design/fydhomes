import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, BedDouble, Bath, Square } from 'lucide-react';

interface PropertyCardProps {
  image: string;
  title: string;
  price: string;
  beds: number;
  baths: number;
  sqft?: number;
  badges: string[];
}

const PropertyCard = ({ image, title, price, beds, baths, sqft, badges }: PropertyCardProps) => {
  return (
    <div className="flex flex-col bg-white border border-[#eeeeee] rounded-[4px] overflow-hidden card-hover-effect mb-6">
      <div className="relative aspect-[4/3] w-full overflow-hidden group">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-[15px] right-[15px] flex flex-wrap gap-1 justify-end">
          {badges.map((badge, idx) => (
            <span
              key={idx}
              className={`text-[10px] font-bold uppercase py-[3px] px-[8px] rounded-[3px] text-white ${
                badge === 'FOR RENT' ? 'bg-black/70' : 
                badge === 'FEATURED' ? 'bg-[#1db043]' : 
                badge === 'SOLD OUT' ? 'bg-black/50' : 'bg-black/70'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>
        {/* Hover Arrow Overlay (Simulated) */}
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center">
            <ChevronLeft size={20} />
          </button>
          <button className="w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="p-[20px] flex flex-col flex-grow">
        <h3 className="text-[18px] font-medium text-[#000000] line-clamp-2 min-h-[50px] mb-3 leading-[1.4] hover:text-[#2b6e83] transition-colors cursor-pointer font-sans">
          {title}
        </h3>
        <div className="mt-auto">
          <div className="text-[16px] font-bold text-[#000000] mb-4">
            ₹{price}
          </div>
          <div className="flex items-center justify-between border-t border-[#eeeeee] pt-4 text-[#747474]">
            <div className="flex items-center gap-1">
              <BedDouble size={16} />
              <span className="text-[13px]">{beds}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath size={16} />
              <span className="text-[13px]">{baths}</span>
            </div>
            {sqft ? (
              <div className="flex items-center gap-1">
                <Square size={14} />
                <span className="text-[13px]">{sqft}</span>
              </div>
            ) : (
                <div className="flex items-center gap-1">
                <Square size={14} />
                <span className="text-[13px]">{beds}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedForRent = () => {
  const properties = [
    {
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_55-PM-2-758x564-7.jpeg",
      title: "4BHK FULLY FURNISHED FOR RENT | PUKKATUPADY |ALUVA|FYD32",
      price: "29000.00",
      beds: 4,
      baths: 4,
      badges: ["FOR RENT"]
    },
    {
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_55-PM-758x564-8.jpeg",
      title: "COMMERCIAL PROPERTIES IN KIZHAKKAMBALAM/ OFFICE SPACE |FYD27",
      price: "30000.00",
      beds: 4,
      baths: 4,
      badges: ["FOR RENT", "FOR SALE"]
    },
    {
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_56-PM-758x564-9.jpeg",
      title: "3 BHK RENT PUKKATUPADY | FYD 23",
      price: "30000.00 RS",
      beds: 3,
      baths: 3,
      badges: ["FEATURED", "FOR RENT", "SOLD OUT"]
    },
    {
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_57-PM-758x564-10.jpeg",
      title: "HOME FOR RENT PUKKATTUPADY | FYD13",
      price: "25000.00",
      beds: 3,
      baths: 3,
      badges: ["FOR RENT"]
    }
  ];

  return (
    <section className="section-spacing bg-white">
      <div className="container px-4">
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full border border-[#2b6e83] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2b6e83]"></div>
            </div>
            <span className="text-[13px] font-bold text-[#2b6e83] tracking-widest uppercase">Properties</span>
          </div>
          <div className="flex justify-between items-end">
            <h2 className="text-[32px] font-semibold text-[#000000] font-serif m-0">
              Featured For Rent
            </h2>
            <div className="flex gap-2">
              <button className="w-[38px] h-[34px] border border-[#dce0e0] flex items-center justify-center rounded-[3px] text-[#747474] hover:bg-[#2b6e83] hover:text-white hover:border-[#2b6e83] transition-all">
                <span className="text-[12px] font-bold">Prev</span>
              </button>
              <button className="w-[38px] h-[34px] border border-[#dce0e0] flex items-center justify-center rounded-[3px] text-[#747474] hover:bg-[#2b6e83] hover:text-white hover:border-[#2b6e83] transition-all">
                <span className="text-[12px] font-bold">Next</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <PropertyCard
              key={index}
              image={property.image}
              title={property.title}
              price={property.price}
              beds={property.beds}
              baths={property.baths}
              badges={property.badges}
            />
          ))}
        </div>
        
        {/* Pagination Dots (Visual placeholder) */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#000000]"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedForRent;