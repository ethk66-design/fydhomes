import React from 'react';
import Image from 'next/image';
import { Phone, Search } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-20 pb-0 overflow-hidden bg-white">
      <div className="container mx-auto px-5 max-w-[1170px]">
        {/* Top Header/Text Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-12">
            <div className="lg:w-1/2">
                <h1 className="font-sans text-[44px] md:text-[48px] font-bold leading-[1.1] text-black mb-5 animate-in fade-in slide-in-from-bottom-5 duration-700">
                  Find Your Perfect Home And Experience Exceptional Living
                </h1>
              </div>
              <div className="lg:w-[40%] flex flex-col items-start pt-2">
                <p className="font-sans text-[15px] md:text-[16px] text-[#5C5C5C] leading-[1.6] mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                  Whether you’re buying, selling, or investing, our expert team is here to guide you every step of the way. Find your perfect place with ease.
                </p>
                <a 
                  href="tel:+919544593991"
                  className="inline-flex items-center justify-center bg-[#205c6d] hover:bg-[#1a4b59] text-white px-8 py-[14px] rounded-[4px] font-sans font-bold text-[13px] uppercase tracking-[1px] transition-all duration-200 group"
                >
                    <Phone size={16} className="mr-3" />
                    CALL US +91 9544593991
                  </a>
                </div>
              </div>


          {/* Featured Image and Search Section Container */}
          <div className="relative mt-8 animate-in fade-in duration-1000">
            <div className="rounded-[10px] overflow-hidden shadow-card">
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
              <div className="absolute left-0 right-0 bottom-[-30px] md:bottom-[-25px] px-4 md:px-10 flex justify-center">
                  <div className="w-full max-w-[1070px] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-[#eeeeee] flex flex-col md:flex-row items-center gap-0 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
                    
                    {/* Keyword Field */}
                    <div className="w-full md:flex-[1.2] flex flex-col gap-2 px-6 border-r border-[#eeeeee]">
                      <label className="text-[11px] font-bold text-black uppercase tracking-[1px]">SEARCH</label>
                      <input 
                        type="text" 
                        placeholder="Search keyword" 
                        className="w-full h-[35px] text-[15px] focus:outline-none placeholder:text-[#999999]"
                      />
                    </div>
    
                    {/* Property Type Field */}
                    <div className="w-full md:flex-1 flex flex-col gap-2 px-6 border-r border-[#eeeeee]">
                      <label className="text-[11px] font-bold text-black uppercase tracking-[1px]">LOOKING FOR</label>
                      <select className="w-full h-[35px] text-[15px] bg-white appearance-none cursor-pointer focus:outline-none text-[#555555]">
                        <option>Property Type</option>
                        <option>Villa</option>
                        <option>Residential</option>
                        <option>Plot</option>
                        <option>Commercial</option>
                        <option>Rent</option>
                      </select>
                    </div>
    
                    {/* Area Field */}
                    <div className="w-full md:flex-1 flex flex-col gap-2 px-6 border-r border-[#eeeeee]">
                      <label className="text-[11px] font-bold text-black uppercase tracking-[1px]">SEARCH BY AREA</label>
                      <select className="w-full h-[35px] text-[15px] bg-white appearance-none cursor-pointer focus:outline-none text-[#555555]">
                        <option>Area</option>
                        <option>Aluva</option>
                        <option>Kakkanad</option>
                        <option>Pukkattupady</option>
                        <option>Infopark</option>
                      </select>
                    </div>
    
                    {/* Search Button */}
                    <div className="w-full md:w-auto px-6">
                      <button className="w-full md:w-[60px] lg:w-[60px] h-[55px] bg-[#1db954] hover:bg-[#1aa34a] text-white flex items-center justify-center rounded-[4px] transition-colors duration-200">
                        <Search size={22} strokeWidth={2.5} />
                      </button>
                    </div>


              </div>
            </div>
        </div>
      </div>
      {/* Spacer to handle the overlapping search bar */}
      <div className="h-20 lg:h-32"></div>
    </section>
  );
};

export default Hero;