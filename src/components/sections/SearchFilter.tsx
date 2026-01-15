"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchFilter: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [area, setArea] = useState(searchParams.get('area') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (type) params.set('type', type);
    if (area) params.set('area', area);
    
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <div className="relative z-20 w-full max-w-[1170px] mx-auto px-0">
      <div className="bg-white p-4 sm:p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-none">
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-end gap-3 sm:gap-4 lg:gap-5">
          
          <div className="w-full lg:flex-[1.2]">
            <label className="block text-[11px] sm:text-[13px] font-semibold text-black mb-2 font-sans uppercase tracking-wide">
              SEARCH
            </label>
            <input
              type="text"
              placeholder="Search keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full h-[42px] sm:h-[45px] px-3 sm:px-4 border border-[#eeeeee] rounded-[4px] text-[13px] sm:text-[14px] text-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#2d7a8c] placeholder:text-[#5c5c5c]/50 font-sans"
            />
          </div>

          <div className="w-full lg:flex-1">
            <label className="block text-[11px] sm:text-[13px] font-semibold text-black mb-2 font-sans uppercase tracking-wide">
              LOOKING FOR
            </label>
            <div className="relative">
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full h-[42px] sm:h-[45px] px-3 sm:px-4 appearance-none border border-[#eeeeee] rounded-[4px] text-[13px] sm:text-[14px] text-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#2d7a8c] bg-white font-sans"
              >
                <option value="">Property Type</option>
                <option value="Commercial">Commercial</option>
                <option value="Office">Office</option>
                <option value="Plot">Plot</option>
                <option value="Rent">Rent</option>
                <option value="Residential">Residential</option>
                <option value="Villa">Villa</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="#5c5c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full lg:flex-1">
            <label className="block text-[11px] sm:text-[13px] font-semibold text-black mb-2 font-sans uppercase tracking-wide">
              SEARCH BY AREA
            </label>
            <div className="relative">
              <select 
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full h-[42px] sm:h-[45px] px-3 sm:px-4 appearance-none border border-[#eeeeee] rounded-[4px] text-[13px] sm:text-[14px] text-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#2d7a8c] bg-white font-sans"
              >
                <option value="">Area</option>
                <option value="Aluva">ALUVA</option>
                <option value="Infopark">INFOPARK</option>
                <option value="Kakkanad">KAKKANAD</option>
                <option value="Kizhakkambalam">KIZHAKKAMBALAM</option>
                <option value="Pukkattupady">PUKKATUPADY</option>
                <option value="Pattimattom">PATTIMATTOM</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="#5c5c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <button
              type="submit"
              className="w-full lg:w-[100px] xl:w-[130px] h-[42px] sm:h-[45px] bg-[#1db954] hover:bg-[#1aa34a] transition-colors duration-200 flex items-center justify-center rounded-[4px]"
            >
              <Search className="text-white w-5 h-5" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SearchFilter;
