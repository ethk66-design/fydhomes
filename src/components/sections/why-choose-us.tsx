import React from 'react';
import Image from 'next/image';

const WhyChooseUs = () => {
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
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG-3-FYD-1024x683-4.png",
      alt: "Transparent & Responsible Service"
    }
  ];

  return (
    <section className="section-padding bg-background w-full">
      <div className="container">
        {/* Section Header */}
        <div className="mb-[30px] animate-fadeInUp">
          <h2 className="h2 text-[32px] font-bold font-display mb-0">
            Why choose us
          </h2>
          <div className="h-[20px]"></div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
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
                <h3 className="h3 text-[20px] font-semibold font-sans mb-[15px] leading-[1.4] text-[#000000]">
                  {feature.title}
                </h3>
                <p className="text-[16px] font-normal font-sans leading-[1.7] text-[#333333] m-0">
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