import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-[1200px] mx-auto z-20 -mt-[90px] md:-mt-[110px] px-[15px]">
      <div className="bg-white rounded-[10px] shadow-[0px_4px_10px_rgba(0,0,0,0.05)] p-[20px] md:p-[30px_40px]">
        <form className="flex flex-col md:flex-row items-end gap-[15px] md:gap-[20px]">
          
          {/* Keyword Search */}
          <div className="flex-1 w-full">
            <label className="block text-[14px] font-medium text-[#1a1a1a] mb-[8px] font-sans">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search keyword"
                className="w-full h-[50px] bg-white border border-[#e5e5e5] rounded-[5px] px-[15px] py-[10px] text-[15px] text-[#1a1a1a] focus:outline-none focus:border-[#2b7387] placeholder:text-[#a8a8a8] font-sans transition-colors"
              />
            </div>
          </div>

          {/* Property Type Dropdown */}
          <div className="w-full md:w-[25%] lg:w-[22%]">
            <label className="block text-[14px] font-medium text-[#1a1a1a] mb-[8px] font-sans">
              Looking for
            </label>
            <div className="relative">
              <select className="appearance-none w-full h-[50px] bg-white border border-[#e5e5e5] rounded-[5px] pl-[15px] pr-[35px] py-[10px] text-[15px] text-[#1a1a1a] focus:outline-none focus:border-[#2b7387] font-sans transition-colors bg-no-repeat bg-[right_15px_center]">
                <option value="">Property Type</option>
                <option value="commercial">Commercial</option>
                <option value="office">- Office</option>
                <option value="shop">- Shop</option>
                <option value="plot">PLOT</option>
                <option value="rent">RENT</option>
                <option value="residential">Residential</option>
                <option value="apartment">- Apartment</option>
                <option value="condo">- Condo</option>
                <option value="multi-family">- Multi Family Home</option>
                <option value="single-family">- Single Family Home</option>
                <option value="studio">- Studio</option>
                <option value="villa">- Villa</option>
              </select>
              <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none text-[#737373]">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          {/* Area Selection Dropdown */}
          <div className="w-full md:w-[25%] lg:w-[22%]">
            <label className="block text-[14px] font-medium text-[#1a1a1a] mb-[8px] font-sans">
              Search By Area
            </label>
            <div className="relative">
              <select className="appearance-none w-full h-[50px] bg-white border border-[#e5e5e5] rounded-[5px] pl-[15px] pr-[35px] py-[10px] text-[15px] text-[#1a1a1a] focus:outline-none focus:border-[#2b7387] font-sans transition-colors">
                <option value="">Area</option>
                <option value="aluva">ALUVA</option>
                <option value="infopark">INFOPARK</option>
                <option value="kakkanad">KAKKANAD</option>
                <option value="kalamasery">KALAMASERY</option>
                <option value="kizhakkambalam">KIZHAKKAMBALAM</option>
                <option value="pukkatupady">PUKKATUPADY</option>
                <option value="vazhakulam">VAZHAKULAM</option>
              </select>
              <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none text-[#737373]">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full md:w-[60px]">
            <button
              type="submit"
              className="w-full md:w-[60px] h-[50px] bg-[#1db954] hover:bg-[#1aa34a] text-white flex items-center justify-center rounded-[5px] transition-all duration-200"
              aria-label="Search"
            >
              <Search size={22} strokeWidth={2.5} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SearchBar;