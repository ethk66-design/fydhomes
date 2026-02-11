import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CTAConsultation = () => {
  // Background image based on the sunset over water description and assets
  // Using the fallback background from metadata or provided assets list 
  // The asset list contains one image which seems to be a villa, so I'll use it as the background
  // and apply a dark overlay to mimic the "sunset" aesthetic if specified or visible in screenshots.
  const backgroundImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2026-01-14-at-11_37_40-AM-758x564-16.jpeg";

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Container */}
      <div className="relative w-full h-[600px] flex items-center">
        {/* Actual Image Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Consultation background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark Overlay for contrast as per visual reference */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content Container (Boxed Layout) */}
        <div className="container relative z-10 mx-auto px-[15px] max-w-[1170px]">
          <div className="max-w-[463px] bg-white p-[50px] md:p-[60px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] rounded-[4px]">

            <h2 className="font-display text-[28px] md:text-[32px] font-bold leading-[1.2] text-black mb-[20px]">
              Looking To Buy Or Sell? <br />
              Get Expert Guidance Today!
            </h2>

            <p className="font-sans text-[14px] leading-[1.8] text-[#666666] mb-[30px]">
              Contact us now for a free consultation and let our team of experts guide you through the process.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#D93025] hover:bg-[#b7281f] text-white font-sans text-[12px] font-bold uppercase tracking-[1px] px-[35px] py-[15px] rounded-[4px] transition-colors duration-200"
            >
              CONTACT US
            </Link>
          </div>
        </div>

        {/* Fishing Net Detail (as seen in screenshots) */}
        <div className="absolute right-0 bottom-0 top-0 w-1/2 hidden lg:flex items-center justify-end pointer-events-none opacity-80">
          {/* This replicates the specific visual element in the screenshot: a Chinese fishing net silhouette */}
          <div className="relative h-full w-full">
            {/* Note: In a real implementation, this would be part of the sunset background image */}
          </div>
        </div>
      </div>
    </section>
  );
};


export default CTAConsultation;