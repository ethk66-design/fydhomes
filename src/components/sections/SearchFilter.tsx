"use client";

import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';




const SearchFilter: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [area, setArea] = useState(searchParams.get('area') || '');

  // Advanced filters state
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [beds, setBeds] = useState(searchParams.get('beds') || '');
  const [baths, setBaths] = useState(searchParams.get('baths') || '');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (type) params.set('type', type);
    if (area) params.set('area', area);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (beds) params.set('beds', beds);
    if (baths) params.set('baths', baths);

    router.push(`/listings?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-20 w-full max-w-[1170px] mx-auto px-0"
    >
      <div className="bg-white p-4 sm:p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-none">
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row items-end gap-3 sm:gap-4 lg:gap-5 w-full">

            <div className="w-full lg:flex-[1.2]">
              <label className="block text-[11px] sm:text-[13px] font-semibold text-black mb-2 font-sans uppercase tracking-wide">
                SEARCH
              </label>
              <input
                type="text"
                placeholder="Search keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full h-[42px] sm:h-[45px] px-3 sm:px-4 border border-[#eeeeee] rounded-[4px] text-[13px] sm:text-[14px] text-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#2d7a8c] placeholder:text-[#5c5c5c]/50 font-sans transition-all"
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
                  className="w-full h-[42px] sm:h-[45px] px-3 sm:px-4 appearance-none border border-[#eeeeee] rounded-[4px] text-[13px] sm:text-[14px] text-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#2d7a8c] bg-white font-sans cursor-pointer transition-all"
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
                    <path d="M1 1L5 5L9 1" stroke="#5c5c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                  className="w-full h-[42px] sm:h-[45px] px-3 sm:px-4 appearance-none border border-[#eeeeee] rounded-[4px] text-[13px] sm:text-[14px] text-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#2d7a8c] bg-white font-sans cursor-pointer transition-all"
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
                    <path d="M1 1L5 5L9 1" stroke="#5c5c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            <motion.div
              className="w-full lg:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                type="submit"
                className="w-full lg:w-[100px] xl:w-[130px] h-[42px] sm:h-[45px] bg-[#1db954] hover:bg-[#1aa34a] transition-colors duration-200 flex items-center justify-center rounded-[4px]"
              >
                <Search className="text-white w-5 h-5" />
              </button>
            </motion.div>

          </div>

          {/* Advanced Filters Toggle */}
          <div className="w-full flex justify-end lg:justify-start">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-[#1db954] text-[12px] sm:text-[13px] font-bold uppercase tracking-wide flex items-center gap-2 transition-opacity hover:opacity-80 mt-1 sm:mt-0"
            >
              <SlidersHorizontal size={14} />
              {showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
            </button>
          </div>

          {/* Advanced Filters Drawer */}
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-5 pt-4 border-t border-[#eeeeee] w-full mt-2 overflow-hidden"
            >
              <div className="w-full lg:flex-1">
                <label className="block text-[11px] sm:text-[13px] font-semibold text-black mb-2 font-sans uppercase tracking-wide">
                  MIN PRICE
                </label>
                <div className="relative">
                  <select
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full h-[42px] sm:h-[45px] px-3 sm:px-4 appearance-none border border-[#eeeeee] rounded-[4px] text-[13px] sm:text-[14px] text-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#2d7a8c] bg-white font-sans cursor-pointer transition-all"
                  >
                    <option value="">Any</option>
                    <option value="5000000">₹ 50 Lakhs</option>
                    <option value="7500000">₹ 75 Lakhs</option>
                    <option value="10000000">₹ 1 Crore</option>
                    <option value="15000000">₹ 1.5 Crores</option>
                    <option value="20000000">₹ 2 Crores</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="#5c5c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="w-full lg:flex-1">
                <label className="block text-[11px] sm:text-[13px] font-semibold text-black mb-2 font-sans uppercase tracking-wide">
                  MAX PRICE
                </label>
                <div className="relative">
                  <select
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full h-[42px] sm:h-[45px] px-3 sm:px-4 appearance-none border border-[#eeeeee] rounded-[4px] text-[13px] sm:text-[14px] text-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#2d7a8c] bg-white font-sans cursor-pointer transition-all"
                  >
                    <option value="">Any</option>
                    <option value="7500000">₹ 75 Lakhs</option>
                    <option value="10000000">₹ 1 Crore</option>
                    <option value="15000000">₹ 1.5 Crores</option>
                    <option value="20000000">₹ 2 Crores</option>
                    <option value="30000000">₹ 3 Crores</option>
                    <option value="50000000">₹ 5 Crores</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="#5c5c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="w-full lg:flex-1 flex gap-3 sm:gap-4 lg:gap-5">
                <div className="flex-1">
                  <label className="block text-[11px] sm:text-[13px] font-semibold text-black mb-2 font-sans uppercase tracking-wide">
                    BEDS
                  </label>
                  <div className="relative">
                    <select
                      value={beds}
                      onChange={(e) => setBeds(e.target.value)}
                      className="w-full h-[42px] sm:h-[45px] px-3 sm:px-4 appearance-none border border-[#eeeeee] rounded-[4px] text-[13px] sm:text-[14px] text-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#2d7a8c] bg-white font-sans cursor-pointer transition-all"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="#5c5c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-[11px] sm:text-[13px] font-semibold text-black mb-2 font-sans uppercase tracking-wide">
                    BATHS
                  </label>
                  <div className="relative">
                    <select
                      value={baths}
                      onChange={(e) => setBaths(e.target.value)}
                      className="w-full h-[42px] sm:h-[45px] px-3 sm:px-4 appearance-none border border-[#eeeeee] rounded-[4px] text-[13px] sm:text-[14px] text-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#2d7a8c] bg-white font-sans cursor-pointer transition-all"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="#5c5c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default SearchFilter;
