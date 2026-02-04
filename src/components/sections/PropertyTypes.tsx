'use client';

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

import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

interface PropertyTypesProps {
  images?: Record<string, string>;
}

export function PropertyTypes({ images }: PropertyTypesProps) {
  return (
    <section className="bg-white py-8 sm:py-10 md:py-[40px]">
      <div className="container mx-auto px-4 sm:px-5 max-w-[1170px]">
        <div className="mb-6 sm:mb-[40px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-[18px] h-[18px] rounded-full border border-primary flex items-center justify-center">
              <div className="w-[6px] h-[6px] rounded-full bg-primary"></div>
            </div>
            <span className="text-[11px] sm:text-[12px] font-semibold text-primary uppercase tracking-[1px]">Lifestyle</span>
          </div>
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-black m-0">Explore Property Types</h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-[30px]"
        >
          {propertyTypes.map((type, index) => {
            const imageKey = type.title.toLowerCase();
            const imageUrl = images?.[imageKey] || type.image;

            // Determine filter based on title
            let href = `/listings?type=${type.title}`;
            if (type.title === 'RENT') {
              href = '/listings?type=Rent'; // This triggers listing_type filter in page.tsx
            } else if (type.title === 'VILLA') {
              href = '/listings?type=Villa';
            } else if (type.title === 'RESIDENTIAL') {
              href = '/listings?type=Residential';
            } else if (type.title === 'PLOT') {
              href = '/listings?type=Plot';
            } else if (type.title === 'COMMERCIAL') {
              href = '/listings?type=Commercial';
            } else if (type.title === 'OFFICE') {
              href = '/listings?type=Office';
            } else {
              // Default capitalize
              href = `/listings?type=${type.title.charAt(0).toUpperCase() + type.title.slice(1).toLowerCase()}`;
            }

            return (
              <motion.a
                key={index}
                variants={item}
                href={href}
                className="flex items-center bg-white border border-[#eeeeee] p-[10px] rounded-[4px] hover:shadow-card transition-all duration-300 group"
              >
                <div className="relative w-[80px] h-[70px] sm:w-[100px] sm:h-[80px] overflow-hidden rounded-[2px] flex-shrink-0">
                  <Image
                    src={imageUrl}
                    alt={type.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="ml-4 sm:ml-[20px] flex flex-col justify-center">
                  <h3 className="text-[13px] sm:text-[14px] font-bold text-black uppercase mb-[4px] tracking-[0.5px]">
                    {type.title}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-[#5c5c5c] font-medium m-0">
                    {type.count}
                  </p>
                </div>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
}
