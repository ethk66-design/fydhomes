import React from 'react';
import Image from 'next/image';

/**
 * AboutHero Section Component
 * 
 * This section features:
 * 1. A bold "About us" heading (H1) with an entrance animation.
 * 2. A large, rounded high-resolution architectural image.
 * 
 * Adheres to:
 * - Next.js 15 & React 18 standards
 * - Tailwind CSS for styling
 * - Design specifications from the provided high-level design and screenshots
 */
const AboutHero: React.FC = () => {
  // Asset link from provided list
  const heroImageUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/GHHH-01-scaled-5.png";

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Heading Container */}
      <div className="container mx-auto px-6 pt-16 pb-8 md:pt-20 md:pb-12 max-w-[1140px]">
        <div className="flex flex-col">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <h1 className="font-display text-[40px] md:text-[48px] font-bold leading-[1.2] text-black mb-0">
              About us
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Image Container */}
      <div className="container mx-auto px-6 max-w-[1140px]">
        <div className="relative w-full overflow-hidden rounded-[8px] animate-in fade-in duration-1000 ease-in-out">
          <div className="relative aspect-[16/6] md:aspect-[21/8] w-full">
            <Image
              src={heroImageUrl}
              alt="Modern Kochi property architecture"
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1140px) 100vw, 1140px"
              quality={90}
            />
          </div>
          
          {/* Subtle overlay for professional finish as seen in some variations */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </div>
      </div>

      {/* Spacing after hero image */}
      <div className="h-12 md:h-16" />
    </section>
  );
};

export default AboutHero;