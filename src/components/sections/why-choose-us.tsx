import React from 'react';
import Image from 'next/image';

const WhyChooseUs = () => {
  const features = [
    {
      title: "Powerful Digital Reach",
      description: "With a growing influence across YouTube and Instagram, FYD Homes connects with thousands daily — showcasing property walkthroughs, expert tips, and real-time updates that help you make informed decisions.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG-FYD-1024x683-2.png",
      alt: "Instagram and YouTube icons 3D rendering"
    },
    {
      title: "Kochi-Focused, Widely Connected",
      description: "We specialize in Kochi's real estate landscape, with access to top properties across the city. Whether you're buying, selling, or investing, our local knowledge ensures you get the right options at the right time.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG-2-FYD-1024x683-3.png",
      alt: "Aerial view of Kochi city with connection pin overlays"
    },
    {
      title: "Transparent & Responsible Service",
      description: "From the first inquiry to final handover, we prioritize honesty, clarity, and customer care. Every property we promote is verified, and every client is treated with long-term commitment.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG-3-FYD-1024x683-4.png",
      alt: "Handshake representing business agreement and trust"
    }
  ];

  return (
    <section className="bg-white py-[80px] md:py-[100px]">
      <div className="container mx-auto px-5 max-w-[1140px]">
        {/* Section Header */}
        <div className="mb-12 animate-fade-in-up">
          <h2 className="font-serif text-[32px] font-semibold text-[#000000] leading-[1.3] mb-5">
            Why choose us
          </h2>
          <div className="w-full h-px bg-[#e6e6e6] max-w-[100px] mb-8" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image Card */}
              <div className="relative aspect-[3/2] mb-6 rounded-[10px] overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <h3 className="font-sans text-[22px] font-semibold text-[#000000] leading-[1.4] mb-4">
                  {feature.title}
                </h3>
                <p className="font-sans text-[16px] font-normal text-[#555555] leading-[1.8]">
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