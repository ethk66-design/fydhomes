import React from 'react';
import Image from 'next/image';

const CTABanner = () => {
  return (
    <section className="relative w-full py-[100px] flex justify-center items-center px-5 sm:px-10 lg:px-0">
      <div className="container max-w-[1140px] relative">
        <div 
          className="relative w-full h-[580px] rounded-[10px] overflow-hidden shadow-xl"
          style={{
            backgroundImage: `url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/AdobeStock_866670033-10.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay Box */}
          <div className="absolute left-[30px] sm:left-[50px] top-1/2 -translate-y-1/2 w-full max-w-[460px] bg-white p-[40px] sm:p-[60px] rounded-[10px] z-10 flex flex-col gap-[20px] fadeInUp">
            <h2 
              className="text-[#000000] font-serif text-[32px] sm:text-[36px] font-semibold leading-[1.2] m-0"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Looking To Buy Or Sell? Get Expert Guidance Today!
            </h2>
            <p className="text-[#555555] font-sans text-[16px] leading-[1.8] m-0">
              Contact us now for a free consultation and let our team of experts guide you through the process.
            </p>
            <div className="mt-[10px]">
              <a 
                href="/contact"
                className="inline-block bg-[#307185] hover:bg-[#285f70] transition-colors duration-300 text-white font-sans text-[14px] font-medium py-[12px] px-[30px] rounded-[4px] uppercase tracking-wider text-center"
              >
                CONTACT US
              </a>
            </div>
          </div>

          {/* Optional: Subtle dark overlay for better text contrast if needed on mobile */}
          <div className="md:hidden absolute inset-0 bg-black/10 z-0"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) translateY(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateY(-50%);
          }
        }
        .fadeInUp {
          animation: fadeInUp 0.7s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default CTABanner;