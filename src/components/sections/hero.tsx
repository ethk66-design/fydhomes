'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Hero() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('Property Type');
  const [area, setArea] = useState('Area');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (type !== 'Property Type') params.append('type', type);
    if (area !== 'Area') params.append('area', area);
    
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <section className="pt-6 sm:pt-12 md:pt-16 pb-0 overflow-hidden bg-white">
      <div className="container mx-auto px-4 sm:px-5 max-w-[1170px] mb-10 sm:mb-14 md:mb-20">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
          <div className="lg:w-[55%]">
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="text-[28px] sm:text-[32px] md:text-[38px] lg:text-[44px] font-bold leading-[1.15] text-black tracking-[-0.01em]">
              Find Your Perfect Home And Experience Exceptional Living
            </h1>
          </div>

          <div className="lg:w-[40%] flex flex-col items-start">
            <p className="text-[#5c5c5c] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.7] mb-6 sm:mb-8">
              Whether you&apos;re buying, selling, or investing, our expert team is here to guide you every step of the way. Find your perfect place with ease.
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
      <div className="container mx-auto px-4 sm:px-5 max-w-[1170px]">
        <div className="relative animate-in fade-in duration-1000">
          <div className="rounded-[4px] overflow-hidden">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG_7368-758x564-2.jpg"
              alt="Modern Luxury Villa"
              width={1170}
              height={564}
              className="w-full object-cover aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9]"
              priority
            />
          </div>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[calc(100%-32px)] sm:w-[calc(100%-40px)] max-w-[1000px] z-10">
              <div className="bg-white p-4 sm:p-5 md:p-6 rounded-[4px] shadow-[0_5px_30px_rgba(0,0,0,0.12)] animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-0">
                  <div className="flex-1 lg:border-r lg:border-[#e8e8e8] lg:pr-4">
                    <label className="text-[10px] sm:text-[11px] font-bold text-[#333333] uppercase tracking-[1px] mb-2 block">SEARCH</label>
                    <input 
                      type="text" 
                      placeholder="Search keyword" 
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      className="w-full h-[44px] sm:h-[46px] px-3 text-[14px] sm:text-[15px] border border-[#dddddd] rounded-[4px] focus:outline-none focus:border-[#1db954] placeholder:text-[#999999] transition-all bg-white"
                    />
                  </div>

                  <div className="flex-1 lg:border-r lg:border-[#e8e8e8] lg:px-4">
                    <label className="text-[10px] sm:text-[11px] font-bold text-[#333333] uppercase tracking-[1px] mb-2 block">LOOKING FOR</label>
                    <div className="relative">
                      <select 
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full h-[44px] sm:h-[46px] px-3 text-[14px] sm:text-[15px] bg-white border border-[#dddddd] rounded-[4px] appearance-none cursor-pointer focus:outline-none focus:border-[#1db954] text-[#555555] transition-all"
                      >
                        <option>Property Type</option>
                        <option>Commercial</option>
                        <option>Office</option>
                        <option>Plot</option>
                        <option>Rent</option>
                        <option>Residential</option>
                        <option>Villa</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L5 5L9 1" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 lg:border-r lg:border-[#e8e8e8] lg:px-4">
                    <label className="text-[10px] sm:text-[11px] font-bold text-[#333333] uppercase tracking-[1px] mb-2 block">SEARCH BY AREA</label>
                    <div className="relative">
                      <select 
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full h-[44px] sm:h-[46px] px-3 text-[14px] sm:text-[15px] bg-white border border-[#dddddd] rounded-[4px] appearance-none cursor-pointer focus:outline-none focus:border-[#1db954] text-[#555555] transition-all"
                      >
                        <option>Area</option>
                        <option>Aluva</option>
                        <option>Infopark</option>
                        <option>Kakkanad</option>
                        <option>Kizhakkambalam</option>
                        <option>Pukkattupady</option>
                        <option>Pattimattom</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L5 5L9 1" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="lg:pl-4 flex flex-col justify-end">
                    <label className="text-[10px] sm:text-[11px] font-bold text-[#333333] uppercase tracking-[1px] mb-2 block lg:opacity-0">&nbsp;</label>
                    <button 
                      onClick={handleSearch}
                      className="w-full lg:w-[160px] h-[44px] sm:h-[46px] bg-[#1db954] hover:bg-[#1aa34a] text-white flex items-center justify-center rounded-[4px] transition-colors duration-200"
                    >
                      <Search size={20} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className="h-[100px] sm:h-[80px] lg:h-[70px]"></div>
    </section>
  );
}
