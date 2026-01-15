import React from 'react';
import { Phone } from 'lucide-react';

export function FindPerfectHome() {
  return (
    <section className="py-12 sm:py-16 md:py-[80px] bg-white">
      <div className="container mx-auto px-4 sm:px-5 max-w-[1170px]">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
          <div className="lg:w-[55%]">
            <h2 className="font-serif text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-bold leading-[1.15] text-black tracking-[-0.02em]">
              Find Your Perfect Home And Experience Exceptional Living
            </h2>
          </div>

          <div className="lg:w-[40%] flex flex-col items-start">
            <p className="text-[#5c5c5c] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.7] mb-6 sm:mb-8">
              Whether you're buying, selling, or investing, our expert team is here to guide you every step of the way. Find your perfect place with ease.
            </p>
            <a
              href="tel:+919544593991"
              className="inline-flex items-center gap-2.5 bg-[#205c6d] text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-[4px] text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.5px] hover:bg-[#1a4b59] transition-colors"
            >
              <Phone size={16} className="sm:w-[18px] sm:h-[18px]" />
              CALL US +91 9544593991
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FindPerfectHome;
