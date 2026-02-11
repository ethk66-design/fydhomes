"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

const WhyChooseUs = () => {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemsRef.current.forEach((el, index) => {
      if (el) {
        el.style.animationDelay = `${index * 100}ms`;
      }
    });
  }, []);

  const features = [
    {
      title: "Powerful Digital Reach",
      description: "With a growing influence across YouTube and Instagram, FYD Homes connects with thousands daily — showcasing property walkthroughs, expert tips, and real-time updates that help you make informed decisions.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG-FYD-1024x683-2.png",
      alt: "Powerful Digital Reach"
    },
    {
      title: "Kochi-Focused, Widely Connected",
      description: "We specialize in Kochi's real estate landscape, with access to top properties across the city. Whether you're buying, selling, or investing, our local knowledge ensures you get the right options at the right time.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG-2-FYD-1024x683-3.png",
      alt: "Kochi-Focused, Widely Connected"
    },
    {
      title: "Transparent & Responsible Service",
      description: "From the first inquiry to final handover, we prioritize honesty, clarity, and customer care. Every property we promote is verified, and every client is treated with long-term commitment.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG-3-FYD-1024x683-2.png",
      alt: "Transparent & Responsible Service"
    }
  ];

  return (
    <section className="py-[60px] md:py-[80px] bg-[#f9f9f9]">
      <div className="container mx-auto px-5">
        <div className="text-center mb-[50px]">
          <span className="text-[#1db954] uppercase tracking-wider font-semibold text-sm mb-2 block animate-fade-in-up">
            Why Choose Us
          </span>
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#222222] mb-4 animate-fade-in-up animation-delay-100">
            Your Trusted Real Estate Partner
          </h2>
          <p className="max-w-[700px] mx-auto text-[#666666] leading-relaxed animate-fade-in-up animation-delay-200">
            We bring transparency, expertise, and a digital-first approach to help you find the perfect property in Kochi.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => { itemsRef.current[index] = el; }}
              className="flex flex-col animate-fadeInUp"
            >
              {/* Image Container */}
              <div className="relative mb-[20px] rounded-[8px] overflow-hidden aspect-[1024/683]">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <h3 className="h3 text-[20px] font-semibold mb-[15px] leading-[1.4] text-[#000000]">
                  {feature.title}
                </h3>
                <p className="text-[16px] font-normal leading-[1.7] text-[#333333] m-0">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;