'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
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
    <section className="pt-6 sm:pt-12 md:pt-24 pb-0 overflow-hidden bg-white">
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

          <div className="relative sm:absolute left-0 right-0 sm:bottom-[-45px] md:bottom-[-40px] px-0 sm:px-4 md:px-10 flex justify-center mt-4 sm:mt-0">
            <div className="w-full max-w-[1070px] bg-white p-4 sm:p-6 md:p-8 rounded-[4px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-[#eeeeee] flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] sm:text-[11px] font-bold text-black uppercase tracking-[1px]">SEARCH</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search keyword" 
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      className="w-full h-[48px] sm:h-[54px] px-4 text-[14px] sm:text-[15px] border border-[#e5e7eb] rounded-[4px] focus:outline-none focus:border-[#1db954] placeholder:text-[#bbbbbb] transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] sm:text-[11px] font-bold text-black uppercase tracking-[1px]">LOOKING FOR</label>
                  <div className="relative">
                    <select 
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full h-[48px] sm:h-[54px] px-4 text-[14px] sm:text-[15px] bg-white border border-[#e5e7eb] rounded-[4px] appearance-none cursor-pointer focus:outline-none focus:border-[#1db954] text-[#555555] transition-all"
                    >
                      <option>Property Type</option>
                      <option>Commercial</option>
                      <option>Office</option>
                      <option>Plot</option>
                      <option>Rent</option>
                      <option>Residential</option>
                      <option>Villa</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] sm:text-[11px] font-bold text-black uppercase tracking-[1px]">SEARCH BY AREA</label>
                  <div className="relative">
                    <select 
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full h-[48px] sm:h-[54px] px-4 text-[14px] sm:text-[15px] bg-white border border-[#e5e7eb] rounded-[4px] appearance-none cursor-pointer focus:outline-none focus:border-[#1db954] text-[#555555] transition-all"
                    >
                      <option>Area</option>
                      <option>Aluva</option>
                      <option>Infopark</option>
                      <option>Kakkanad</option>
                      <option>Kizhakkambalam</option>
                      <option>Pukkattupady</option>
                      <option>Pattimattom</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] sm:text-[11px] font-bold text-black uppercase tracking-[1px] opacity-0 hidden lg:block">&nbsp;</label>
                  <button 
                    onClick={handleSearch}
                    className="w-full h-[48px] sm:h-[54px] bg-[#1db954] hover:bg-[#1aa34a] text-white flex items-center justify-center rounded-[4px] transition-colors duration-200 shadow-sm"
                  >
                    <Search size={22} strokeWidth={2.5} className="sm:w-[26px] sm:h-[26px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-6 sm:h-16 lg:h-24"></div>
    </section>
  );
}
