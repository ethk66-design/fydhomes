import React from 'react';
import Image from 'next/image';

const propertyTypes = [
  {
    title: 'VILLA',
    count: '33 Properties',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg'
  },
  {
    title: 'RESIDENTIAL',
    count: '5 Properties',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg'
  },
  {
    title: 'PLOT',
    count: '1 Property',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg'
  },
  {
    title: 'COMMERCIAL',
    count: '1 Property',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg'
  },
  {
    title: 'OFFICE',
    count: '1 Property',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg'
  },
  {
    title: 'RENT',
    count: '1 Property',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg'
  }
];

const PropertyTypes = () => {
  return (
    <section className="bg-white py-[80px]">
      <div className="container px-4">
        {/* Section Header */}
        <div className="mb-[40px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-[18px] h-[18px] rounded-full border border-primary flex items-center justify-center">
              <div className="w-[6px] h-[6px] rounded-full bg-primary"></div>
            </div>
            <span className="text-[12px] font-semibold text-primary uppercase tracking-[1px]">Lifestyle</span>
          </div>
          <h2 className="text-[32px] font-bold text-black font-serif m-0">Explore Property Types</h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {propertyTypes.map((type, index) => (
            <a 
              key={index} 
              href="#" 
              className="flex items-center bg-white border border-[#eeeeee] p-[10px] rounded-[4px] hover:shadow-card transition-all duration-300 group"
            >
              {/* Thumbnail */}
              <div className="relative w-[100px] h-[80px] overflow-hidden rounded-[2px] flex-shrink-0">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="ml-[20px] flex flex-col justify-center">
                <h3 className="text-[14px] font-bold text-black uppercase mb-[4px] tracking-[0.5px]">
                  {type.title}
                </h3>
                <p className="text-[13px] text-[#5c5c5c] font-medium m-0">
                  {type.count}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypes;