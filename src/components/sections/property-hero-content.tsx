import React from 'react';
import Link from 'next/link';
import { Heart, Share2, Printer, BedDouble, Bath, Car, Maximize } from 'lucide-react';

const PropertyHeroContent: React.FC = () => {
  return (
    <section className="bg-white pt-[60px] pb-[30px]">
      <div className="container px-[15px] mx-auto max-w-[1170px]">
        {/* Top Header Row: Title and Price */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-[20px]">
          <div className="flex-1">
            <h1 className="font-display text-[28px] font-bold leading-[1.2] text-black mb-[15px] animate-in fade-in duration-700">
              Full of premium features from the gate to the kitchen | Luxury Villa Near Aluva | PUKKATTUPADY | kunjattukara
            </h1>

            {/* Meta stats icons row */}
            <div className="flex flex-wrap items-center gap-[20px] text-black">
              <div className="flex items-center gap-[8px]">
                <BedDouble className="w-[18px] h-[18px] text-[#666666]" strokeWidth={1.5} />
                <span className="text-[14px] font-normal">4 <span className="hidden sm:inline">Beds</span></span>
              </div>
              <div className="flex items-center gap-[8px]">
                <Bath className="w-[18px] h-[18px] text-[#666666]" strokeWidth={1.5} />
                <span className="text-[14px] font-normal">4 <span className="hidden sm:inline">Baths</span></span>
              </div>
              <div className="flex items-center gap-[8px]">
                <Car className="w-[18px] h-[18px] text-[#666666]" strokeWidth={1.5} />
                <span className="text-[14px] font-normal">3 <span className="hidden sm:inline">Parkings</span></span>
              </div>
              <div className="flex items-center gap-[8px]">
                <Maximize className="w-[18px] h-[18px] text-[#666666]" strokeWidth={1.5} />
                <span className="text-[14px] font-normal">2460 SQFT</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end min-w-[160px]">
            <div className="font-display text-[24px] font-bold text-black mb-[10px]">
              ₹1.55 CR
            </div>
          </div>
        </div>

        {/* Bottom Row: Status and Tools */}
        <div className="flex flex-row justify-between items-center border-t border-[#e5e5e5] pt-[15px]">
          <div>
            <Link
              href="/listings?status=for-sale"
              className="bg-[#f5f5f5] text-[#666666] text-[10px] font-bold uppercase py-[4px] px-[10px] rounded-[2px] hover:bg-black hover:text-white transition-colors duration-200"
            >
              For Sale
            </Link>
          </div>

          <div className="flex items-center gap-[10px]">
            <button
              className="w-[30px] h-[30px] flex items-center justify-center border border-[#e5e5e5] rounded-sm hover:border-black transition-colors group"
              aria-label="Add to favorites"
            >
              <Heart className="w-[14px] h-[14px] text-black group-hover:fill-black" />
            </button>
            <button
              className="w-[30px] h-[30px] flex items-center justify-center border border-[#e5e5e5] rounded-sm hover:border-black transition-colors"
              aria-label="Share property"
            >
              <Share2 className="w-[14px] h-[14px] text-black" />
            </button>
            <button
              className="w-[30px] h-[30px] flex items-center justify-center border border-[#e5e5e5] rounded-sm hover:border-black transition-colors"
              aria-label="Print details"
            >
              <Printer className="w-[14px] h-[14px] text-black" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyHeroContent;