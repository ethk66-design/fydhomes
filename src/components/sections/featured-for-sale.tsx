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
  status?: string[];
}

const PropertyCard = ({ image, title, price, beds, baths, sqft, status }: PropertyCardProps) => {
  return (
    <div className="flex flex-col bg-white border border-[#eeeeee] rounded-[4px] overflow-hidden card-hover-effect shadow-[0_2px_10px_rgba(0,0,0,0.05)] mb-4">
      <div className="relative aspect-[4/3] overflow-hidden group">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 flex gap-1">
          {status?.map((s) => (
            <span
              key={s}
              className="bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="p-[20px] flex flex-col flex-grow">
        <h3 className="text-[15px] font-medium leading-[1.4] text-[#000000] mb-2 line-clamp-2 min-h-[42px]">
          {title}
        </h3>
        <div className="text-[16px] font-bold text-[#2B6E83] mb-4">
          ₹{price}
        </div>
        <div className="mt-auto pt-4 border-t border-[#eeeeee] flex items-center gap-4 text-[#747474]">
          <div className="flex items-center gap-1.5">
            <BedDouble size={16} strokeWidth={1.5} className="text-[#2B6E83]" />
            <span className="text-[13px]">{beds}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={16} strokeWidth={1.5} className="text-[#2B6E83]" />
            <span className="text-[13px]">{baths}</span>
          </div>
          {sqft && (
            <div className="flex items-center gap-1.5">
              <Square size={14} strokeWidth={1.5} className="text-[#2B6E83]" />
              <span className="text-[13px]">{sqft}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FeaturedForSale = () => {
  const properties = [
    {
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_54-PM-758x564-3.jpeg",
      title: "Beautiful 5 BHK Fully Furnished House for Sale in Pukkattupady",
      price: "1.35 cr",
      beds: 4,
      baths: 4,
      status: ["For Sale", "Used"]
    },
    {
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_51-PM-4.jpeg",
      title: "A well-designed 3BHK on 3 cents near Kakkanad | KUZHIVELIPADY",
      price: "Details on request",
      beds: 3,
      baths: 3,
      status: ["For Sale"]
    },
    {
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_54-PM-1-758x564-5.jpeg",
      title: "Fully furnished villa for sale with everything a family needs | Thevakkal",
      price: "1.25 CR",
      beds: 4,
      baths: 3,
      status: ["For Sale", "Used"]
    },
    {
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_55-PM-1-758x564-6.jpeg",
      title: "Every Malayali would dream of a home with amenities like this | Luxury gated villa | THEVAKKAL",
      price: "2.75 CR",
      beds: 4,
      baths: 5,
      status: ["For Sale"]
    }
  ];

  return (
    <section className="py-[80px] bg-[#ffffff]">
      <div className="container px-4 mx-auto max-w-[1170px]">
        <div className="mb-[10px] flex items-center gap-2">
            <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#2B6E83] flex items-center justify-center">
                <div className="w-[6px] h-[6px] rounded-full bg-[#2B6E83]"></div>
            </div>
            <span className="text-[13px] uppercase font-bold tracking-widest text-[#747474]">Properties</span>
        </div>
        
        <div className="flex justify-between items-end mb-[40px]">
          <h2 className="text-[32px] font-semibold font-serif text-[#000000]">
            Featured For Sale
          </h2>
          <div className="flex gap-2">
            <button className="w-[40px] h-[34px] flex items-center justify-center border border-[#eeeeee] text-[#747474] hover:bg-[#2B6E83] hover:text-white transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button className="w-[40px] h-[34px] flex items-center justify-center border border-[#eeeeee] text-[#747474] hover:bg-[#2B6E83] hover:text-white transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>

        <div className="flex justify-center mt-10 gap-2">
            {[...Array(8)].map((_, i) => (
                <div 
                    key={i} 
                    className={`h-[4px] rounded-full transition-all duration-300 ${i === 0 ? 'w-4 bg-[#2B6E83]' : 'w-1 bg-[#eeeeee]'}`}
                ></div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedForSale;