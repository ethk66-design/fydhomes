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
    <section className="pt-24 pb-0 overflow-hidden bg-white">
      <div className="container mx-auto px-5 max-w-[1170px]">
        {/* Featured Image and Search Section Container */}
        <div className="relative animate-in fade-in duration-1000">
          <div className="rounded-[4px] overflow-hidden">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG_7368-758x564-2.jpg"
              alt="Modern Luxury Villa"
              width={1170}
              height={564}
              className="w-full object-cover aspect-[16/9] md:aspect-[21/9]"
              priority
            />
          </div>

          {/* Search Bar Overlay */}
          <div className="absolute left-0 right-0 bottom-[-45px] md:bottom-[-40px] px-4 md:px-10 flex justify-center">
            <div className="w-full max-w-[1070px] bg-white p-6 md:p-8 rounded-[4px] shadow-[0_15px_40px_rgba(0,0,0,0.1)] border border-[#eeeeee] flex flex-col md:flex-row items-end gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
              
              {/* Keyword Field */}
              <div className="w-full md:flex-[1.2] flex flex-col gap-2">
                <label className="text-[11px] font-bold text-black uppercase tracking-[1px]">SEARCH</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search keyword" 
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full h-[54px] px-4 text-[15px] border border-[#e5e7eb] rounded-[4px] focus:outline-none focus:border-[#1db954] placeholder:text-[#bbbbbb] transition-all"
                  />
                </div>
              </div>

              {/* Property Type Field */}
              <div className="w-full md:flex-1 flex flex-col gap-2">
                <label className="text-[11px] font-bold text-black uppercase tracking-[1px]">LOOKING FOR</label>
                <div className="relative">
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full h-[54px] px-4 text-[15px] bg-white border border-[#e5e7eb] rounded-[4px] appearance-none cursor-pointer focus:outline-none focus:border-[#1db954] text-[#555555] transition-all"
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

              {/* Area Field */}
              <div className="w-full md:flex-1 flex flex-col gap-2">
                <label className="text-[11px] font-bold text-black uppercase tracking-[1px]">SEARCH BY AREA</label>
                <div className="relative">
                  <select 
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full h-[54px] px-4 text-[15px] bg-white border border-[#e5e7eb] rounded-[4px] appearance-none cursor-pointer focus:outline-none focus:border-[#1db954] text-[#555555] transition-all"
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

              {/* Search Button */}
              <div className="w-full md:w-auto">
                <button 
                  onClick={handleSearch}
                  className="w-full md:w-[150px] lg:w-[200px] h-[54px] bg-[#1db954] hover:bg-[#1aa34a] text-white flex items-center justify-center rounded-[4px] transition-colors duration-200 shadow-sm"
                >
                  <Search size={26} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Spacer to handle the overlapping search bar */}
      <div className="h-24 lg:h-32"></div>
    </section>
  );
}
