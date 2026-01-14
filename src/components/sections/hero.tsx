import React from 'react';
import { PhoneAlt } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative w-full bg-white font-sans">
      <div className="container mx-auto px-4 lg:px-[15px] max-w-[1230px]">
        {/* Top Text Content Split Layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start pt-[60px] lg:pt-[80px] pb-[40px] lg:pb-[60px] gap-8">
          {/* Left Column - Headline */}
          <div className="w-full lg:w-[60%] lg:max-w-[700px]">
            <h1 className="font-serif text-[42px] lg:text-[60px] font-bold leading-[1.1] text-[#1a1a1a] mb-0 tracking-tight">
              Find Your Perfect Home And Experience Exceptional Living
            </h1>
          </div>

          {/* Right Column - Subtext & CTA */}
          <div className="w-full lg:w-[35%] flex flex-col items-start pt-2">
            <p className="text-[#1a1a1a] text-[16px] leading-[1.6] mb-6">
              Whether you’re buying, selling, or investing, our expert team is here to guide you every step of the way. Find your perfect place with ease.
            </p>
            <a
              href="tel:+919544593991"
              className="inline-flex items-center justify-center bg-[#2B7387] hover:bg-[#235d6e] text-white px-6 py-3.5 rounded-[4px] font-medium text-[14px] transition-colors duration-200 gap-2"
            >
              <PhoneAlt size={16} fill="white" />
              <span>CALL US +91 9544593991</span>
            </a>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="relative w-full mb-[100px]">
          <div className="relative rounded-[15px] overflow-hidden shadow-card aspect-[1480/750] max-h-[750px] w-full">
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG_7368-758x564-2.jpg"
              alt="Luxury Contemporary Home Architecture"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Search Bar Floating Element */}
          <div className="absolute -bottom-[60px] left-1/2 -translate-x-1/2 w-[95%] lg:w-[90%] bg-white rounded-[10px] shadow-[0px_10px_30px_rgba(0,0,0,0.1)] p-6 z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#1a1a1a]">SEARCH</label>
                <input
                  type="text"
                  placeholder="Search keyword"
                  className="w-full border border-[#e5e5e5] rounded-[4px] px-3 py-2.5 text-[14px] focus:outline-none focus:ring-1 focus:ring-[#2B7387]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#1a1a1a]">LOOKING FOR</label>
                <select className="w-full border border-[#e5e5e5] rounded-[4px] px-3 py-2.5 text-[14px] appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-[#2B7387]">
                  <option>Property Type</option>
                  <option>Villa</option>
                  <option>Apartment</option>
                  <option>Plot</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#1a1a1a]">SEARCH BY AREA</label>
                <select className="w-full border border-[#e5e5e5] rounded-[4px] px-3 py-2.5 text-[14px] appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-[#2B7387]">
                  <option>Area</option>
                  <option>Kakkanad</option>
                  <option>Aluva</option>
                  <option>Pukkattupady</option>
                </select>
              </div>
              <div>
                <button className="w-full bg-[#1DB954] hover:bg-[#1aa34a] text-white py-[11px] rounded-[4px] flex items-center justify-center transition-colors duration-200">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;