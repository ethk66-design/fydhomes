import React from 'react';
import Image from 'next/image';

const PropertyTypes = () => {
  const propertyTypes = [
    {
      title: 'VILLA',
      count: '33 Properties',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg',
      link: '#'
    },
    {
      title: 'RESIDENTIAL',
      count: '5 Properties',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg',
      link: '#'
    },
    {
      title: 'PLOT',
      count: '1 Property',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg',
      link: '#'
    },
    {
      title: 'COMMERCIAL',
      count: '1 Property',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg',
      link: '#'
    },
    {
      title: 'OFFICE',
      count: '1 Property',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg',
      link: '#'
    },
    {
      title: 'RENT',
      count: '1 Property',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg',
      link: '#'
    }
  ];

  return (
    <section className="bg-white py-[80px]">
      <div className="container px-4">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-5 h-5 flex items-center justify-center border border-[#2b6e83] rounded-full">
                <div className="w-2 h-2 bg-[#2b6e83] rounded-full"></div>
             </div>
             <span className="text-[13px] font-semibold text-[#2b6e83] tracking-widest uppercase">
               Lifestyle
             </span>
          </div>
          <h2 className="text-[32px] font-semibold text-black font-serif leading-tight">
            Explore Property Types
          </h2>
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertyTypes.map((type, index) => (
            <a 
              key={index} 
              href={type.link}
              className="group flex items-center bg-white border border-[#eeeeee] rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 p-[10px]"
            >
              {/* Thumbnail */}
              <div className="relative w-[100px] h-[75px] flex-shrink-0 overflow-hidden rounded-[3px]">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="ml-5">
                <h3 className="text-[14px] font-bold text-black uppercase mb-1 group-hover:text-[#2b6e83] transition-colors duration-300">
                  {type.title}
                </h3>
                <p className="text-[13px] text-[#747474]">
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