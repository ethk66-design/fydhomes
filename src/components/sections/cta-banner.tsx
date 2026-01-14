import React from 'react';
import Image from 'next/image';

const CTABanner = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image Container */}
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px]">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_46_12-PM-758x564-26.jpeg"
          alt="Scenic sunset background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        {/* Optional Overlay to match the deeper tones in screenshots */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content Box Container */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-white p-8 md:p-12 max-w-[500px] shadow-lg rounded-sm animate-in fade-in slide-in-from-left-4 duration-700">
            <h2 className="font-serif text-[28px] md:text-[32px] font-semibold leading-[1.2] text-black mb-4">
              Looking To Buy Or Sell? Get Expert Guidance Today!
            </h2>
            <p className="font-sans text-[15px] text-[#5F6973] leading-[1.6] mb-8">
              Contact us now for a free consultation and let our team of experts guide you through the process.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#2B6E83] text-white font-sans text-[13px] font-bold tracking-wider px-8 py-3 rounded-sm transition-all duration-200 hover:brightness-110 uppercase"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;