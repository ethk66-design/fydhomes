'use client';

import React from 'react';
import ImageWithFallback from '@/components/ui/image-with-fallback';
import { motion } from 'framer-motion';
import Link from 'next/link';

const propertyTypes = [
  {
    title: 'VILLA',
    image: 'https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg'
  },
  {
    title: 'RESIDENTIAL',
    image: 'https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg'
  },
  {
    title: 'PLOT',
    image: 'https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg'
  },
  {
    title: 'COMMERCIAL',
    image: 'https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg'
  },
  {
    title: 'OFFICE',
    image: 'https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg'
  },
  {
    title: 'RENT',
    image: 'https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
};

interface PropertyTypesProps {
  images?: Record<string, string>;
  counts?: Record<string, number>;
}

export function PropertyTypes({ images, counts }: PropertyTypesProps) {
  return (
    <section className="bg-[#0A192F] py-16 sm:py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0A192F] bg-[radial-gradient(#1A365D_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>

      <div className="container mx-auto px-4 sm:px-5 max-w-7xl relative z-10">
        <div className="mb-12 sm:mb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-4 h-4 rounded-full border border-[#E3572D] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E3572D]"></div>
            </div>
            <span className="text-xs font-semibold text-[#E3572D] uppercase tracking-[2px]">Lifestyle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Explore Property Types</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Find the perfect property type that matches your lifestyle and investment goals, tailored for premium living.</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {propertyTypes.map((type, index) => {
            const imageKey = type.title.toLowerCase();
            const imageUrl = images?.[imageKey] || type.image;
            const countKey = type.title.toLowerCase();
            const countValue = counts?.[countKey] || 0;
            const countText = countValue === 1 ? '1 Property' : `${countValue} Properties`;

            let href = `/listings?type=${type.title}`;
            if (type.title === 'RENT') href = '/listings?type=Rent';
            else if (type.title === 'VILLA') href = '/listings?type=Villa';
            else if (type.title === 'RESIDENTIAL') href = '/listings?type=Residential';
            else if (type.title === 'PLOT') href = '/listings?type=Plot';
            else if (type.title === 'COMMERCIAL') href = '/listings?type=Commercial';
            else if (type.title === 'OFFICE') href = '/listings?type=Office';
            else href = `/listings?type=${type.title.charAt(0).toUpperCase() + type.title.slice(1).toLowerCase()}`;

            return (
              <motion.div key={index} variants={item}>
                <Link
                  href={href}
                  className="group relative block w-full h-[250px] sm:h-[300px] rounded-2xl overflow-hidden"
                >
                  <ImageWithFallback
                    src={imageUrl}
                    alt={type.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  {/* Dark premium gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10 transition-transform duration-300 group-hover:-translate-y-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider mb-1">
                        {type.title}
                      </h3>
                      <p className="text-sm text-[#E3572D] font-medium tracking-wide">
                        {countText}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-[#E3572D] group-hover:border-[#E3572D] transition-colors duration-300">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                        <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
}
