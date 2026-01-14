import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

/**
 * SearchBar Component
 * 
 * Clones the search interface overlaying the hero image background.
 * Contains fields for Keyword search, Property Type dropdown, and Area selection.
 */
const SearchBar = () => {
  return (
    <div className="relative z-10 -mt-16 md:-mt-20 px-4">
      <div className="container mx-auto max-w-[1170px]">
        <div className="bg-white p-6 md:p-[30px] rounded-[4px] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
          <form className="flex flex-wrap items-end gap-y-4 md:gap-x-4">
            {/* Keyword Search Field */}
            <div className="w-full md:flex-1 lg:basis-[30%]">
              <label 
                htmlFor="keyword" 
                className="block text-[#000000] font-sans text-[13px] font-medium mb-2"
              >
                SEARCH
              </label>
              <div className="relative">
                <input
                  id="keyword"
                  type="text"
                  placeholder="Search keyword"
                  className="w-full h-[50px] px-[15px] border border-[#EEEEEE] rounded-[4px] text-[16px] text-[#5F6973] focus:outline-none focus:border-[#2b6e83] transition-colors placeholder:text-[#999999]"
                />
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div className="w-full md:flex-1 lg:basis-[25%]">
              <label 
                htmlFor="property-type" 
                className="block text-[#000000] font-sans text-[13px] font-medium mb-2"
              >
                LOOKING FOR
              </label>
              <div className="relative">
                <select
                  id="property-type"
                  className="w-full h-[50px] appearance-none px-[15px] border border-[#EEEEEE] rounded-[4px] text-[16px] text-[#5F6973] bg-white focus:outline-none focus:border-[#2b6e83] cursor-pointer pr-10"
                  defaultValue=""
                >
                  <option value="" disabled>Property Type</option>
                  <option value="commercial">Commercial</option>
                  <option value="plot">PLOT</option>
                  <option value="rent">RENT</option>
                  <option value="residential">Residential</option>
                  <option value="villa">Villa</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#5F6973]">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            {/* Area Selection Field */}
            <div className="w-full md:flex-1 lg:basis-[25%]">
              <label 
                htmlFor="area" 
                className="block text-[#000000] font-sans text-[13px] font-medium mb-2"
              >
                SEARCH BY AREA
              </label>
              <div className="relative">
                <select
                  id="area"
                  className="w-full h-[50px] appearance-none px-[15px] border border-[#EEEEEE] rounded-[4px] text-[16px] text-[#5F6973] bg-white focus:outline-none focus:border-[#2b6e83] cursor-pointer pr-10"
                  defaultValue=""
                >
                  <option value="" disabled>Area</option>
                  <option value="aluva">ALUVA</option>
                  <option value="infopark">INFOPARK</option>
                  <option value="kakanad">Kakanad</option>
                  <option value="kakkanad">KAKKANAD</option>
                  <option value="kizhakkambalam">KIZHAKKAMBALAM</option>
                  <option value="pukkatupady">PUKKATUPADY</option>
                  <option value="tevakkal">TEVAKKAL</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#5F6973]">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="w-full md:w-auto md:min-w-[70px] lg:basis-[10%]">
              <button
                type="submit"
                className="w-full h-[50px] bg-[#1db043] hover:bg-[#199a3a] text-white flex items-center justify-center rounded-[4px] transition-all cursor-pointer group"
                aria-label="Search"
              >
                <Search size={22} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;