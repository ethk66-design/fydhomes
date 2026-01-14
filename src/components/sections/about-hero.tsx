import React from 'react';
import Image from 'next/image';

/**
 * AboutHero component
 * 
 * Clones the "About Us" page title section featuring:
 * 1. A large "About Us" heading with fadeInUp animation.
 * 2. A wide architectural banner image of modern houses with 10px rounded corners.
 * 
 * Primary Data Sources:
 * - HTML Structure: elementor-element-90e4be8 (title container), elementor-element-4089197 (image container)
 * - Computed Styles: H1 (50px, Roboto Slab), Container (1140px max-width)
 * - Assets: Banner image from provided list
 */

const AboutHero: React.FC = () => {
  return (
    <section className="bg-background">
      {/* Title Section */}
      <div className="container px-[20px] pt-[70px] pb-[30px] md:pt-[100px] md:pb-[40px]">
        <div className="max-w-[1140px] mx-auto">
          <h1 
            className="font-serif text-[50px] font-semibold text-foreground leading-[1.2] mb-0 animate-fade-in-up"
            style={{ 
              animationFillMode: 'forwards',
              WebkitFontSmoothing: 'antialiased'
            }}
          >
            About us
          </h1>
        </div>
      </div>

      {/* Banner Image Section */}
      <div className="container px-[20px] pb-[60px] md:pb-[80px]">
        <div className="max-w-[1140px] mx-auto transition-opacity duration-500 ease-in-out">
          <div className="relative w-full aspect-[21/9] md:aspect-[25/9] overflow-hidden rounded-[10px]">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/ChatGPT-Image-Aug-9-2025-11_24_54-AM-11.png"
              alt="Modern architectural houses in Kochi"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1140px) 100vw, 1140px"
            />
          </div>
        </div>
      </div>

      {/* Basic spacing to separate from mission section as seen in layout */}
      <div className="h-[20px] md:h-[40px]" />
    </section>
  );
};

export default AboutHero;