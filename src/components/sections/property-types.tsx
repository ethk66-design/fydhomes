import React from 'react';
import Image from 'next/image';

interface PropertyType {
  title: string;
  count: string;
  image: string;
}

const propertyTypes: PropertyType[] = [
  {
    title: 'VILLA',
    count: '33 Properties',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG_7368-758x564-2.jpg',
  },
  {
    title: 'RESIDENTIAL',
    count: '5 Properties',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG_7368-758x564-2.jpg',
  },
  {
    title: 'PLOT',
    count: '1 Property',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG_7368-758x564-2.jpg',
  },
  {
    title: 'COMMERCIAL',
    count: '1 Property',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG_7368-758x564-2.jpg',
  },
  {
    title: 'OFFICE',
    count: '1 Property',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG_7368-758x564-2.jpg',
  },
  {
    title: 'RENT',
    count: '1 Property',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG_7368-758x564-2.jpg',
  },
];

const PropertyTypesSection = () => {
  return (
    <section className="bg-white py-[80px]">
      <div className="container px-[15px] mx-auto max-w-[1230px]">
        {/* Section Header */}
        <div className="mb-[30px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center border border-[#2b7387] rounded-full w-5 h-5">
              <div className="w-2.5 h-2.5 bg-[#2b7387] rounded-full"></div>
            </div>
            <span className="text-[12px] font-medium tracking-widest text-[#2b7387] uppercase font-sans">
              LIFESTYLE
            </span>
          </div>
          <h2 className="text-[32px] font-bold text-[#1a1a1a] font-serif leading-[1.3]">
            Explore Property Types
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {propertyTypes.map((type, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center bg-[#f4f7f8] rounded-[4px] p-2 hover:bg-gray-100 transition-colors duration-200 border border-transparent hover:border-[#e5e5e5]"
            >
              <div className="relative w-[80px] h-[70px] flex-shrink-0 overflow-hidden rounded-[2px] mr-[15px]">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#1a1a1a] uppercase leading-tight mb-1">
                  {type.title}
                </span>
                <span className="text-[13px] text-[#737373] font-sans">
                  {type.count}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypesSection;