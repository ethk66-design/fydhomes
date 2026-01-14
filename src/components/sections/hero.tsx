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
                <div className="absolute left-0 right-0 bottom-[-45px] md:bottom-[-40px] px-4 md:px-10 flex justify-center">
                    <div className="w-full max-w-[1070px] bg-white p-6 md:p-8 rounded-[4px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#eeeeee] flex flex-col md:flex-row items-end gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
                      
                      {/* Keyword Field */}
                      <div className="w-full md:flex-[1.2] flex flex-col gap-2">
                        <label className="text-[12px] font-bold text-black uppercase tracking-[0.5px]">SEARCH</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="Search keyword" 
                            className="w-full h-[52px] px-4 text-[15px] border border-[#e5e7eb] rounded-[4px] focus:outline-none focus:border-[#1db954] placeholder:text-[#999999]"
                          />
                        </div>
                      </div>
      
                      {/* Property Type Field */}
                      <div className="w-full md:flex-1 flex flex-col gap-2">
                        <label className="text-[12px] font-bold text-black uppercase tracking-[0.5px]">LOOKING FOR</label>
                        <div className="relative">
                          <select className="w-full h-[52px] px-4 text-[15px] bg-white border border-[#e5e7eb] rounded-[4px] appearance-none cursor-pointer focus:outline-none focus:border-[#1db954] text-[#555555]">
                            <option>Property Type</option>
                            <option>Villa</option>
                            <option>Residential</option>
                            <option>Plot</option>
                            <option>Commercial</option>
                            <option>Rent</option>
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
                        <label className="text-[12px] font-bold text-black uppercase tracking-[0.5px]">SEARCH BY AREA</label>
                        <div className="relative">
                          <select className="w-full h-[52px] px-4 text-[15px] bg-white border border-[#e5e7eb] rounded-[4px] appearance-none cursor-pointer focus:outline-none focus:border-[#1db954] text-[#555555]">
                            <option>Area</option>
                            <option>Aluva</option>
                            <option>Kakkanad</option>
                            <option>Pukkattupady</option>
                            <option>Infopark</option>
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
                        <button className="w-full md:w-[200px] h-[52px] bg-[#1db954] hover:bg-[#1aa34a] text-white flex items-center justify-center rounded-[4px] transition-colors duration-200">
                          <Search size={20} strokeWidth={2.5} />
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