import React from 'react';
import Image from 'next/image';

interface PropertyGalleryProps {
  images?: string[];
}

const PropertyGallery = ({ images = [] }: PropertyGalleryProps) => {
  const displayImages = images.length > 0 ? images : [
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2026-01-14-at-11_14_25-AM-758x564-2.jpeg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2026-01-14-at-11_14_09-AM-758x564-3.jpeg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2026-01-14-at-11_14_10-AM-758x564-4.jpeg"
  ];

  const moreCount = displayImages.length > 3 ? displayImages.length - 3 : 0;

  return (
    <section className="w-full bg-white pt-4 sm:pt-6 pb-2">
      <div className="container mx-auto px-4 sm:px-5 lg:max-w-[1480px]">
        <div className="relative group">
          {moreCount > 0 && (
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-10">
              <button 
                className="flex items-center gap-1.5 sm:gap-2 bg-white/90 hover:bg-white text-black px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-[4px] text-[12px] sm:text-[13px] font-medium shadow-sm border border-black/5 transition-colors cursor-pointer"
                aria-label="View more photos"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  width="14" 
                  height="14" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-gray-700 sm:w-4 sm:h-4"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                {moreCount} More
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-[10px] items-stretch">
            <div className="md:col-span-2 overflow-hidden rounded-[4px] relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[564px]">
              <Image 
                src={displayImages[0]} 
                alt="Property Main View" 
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            <div className="flex flex-row md:flex-col gap-2 sm:gap-[10px] h-[120px] sm:h-[150px] md:h-[450px] lg:h-[564px]">
              <div className="flex-1 overflow-hidden rounded-[4px] relative">
                <Image 
                  src={displayImages[1] || displayImages[0]} 
                  alt="Property Secondary View 1" 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex-1 overflow-hidden rounded-[4px] relative">
                <Image 
                  src={displayImages[2] || displayImages[0]} 
                  alt="Property Secondary View 2" 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyGallery;
