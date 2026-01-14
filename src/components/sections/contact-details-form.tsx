import React from 'react';
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react';

const ContactDetailsForm = () => {
  return (
    <section className="bg-white py-[60px]">
      <div className="container mx-auto max-w-[1140px] px-[15px]">
        <div className="flex flex-col md:flex-row gap-0 md:gap-[30px]">
          {/* Left Column: Get Experts help */}
          <div className="w-full md:w-1/3 mb-10 md:mb-0">
            <h2 className="font-serif text-[28px] font-bold leading-[1.3] text-black mb-[20px]">
              Get Experts help
            </h2>
            <ul className="list-none p-0 flex flex-col gap-[15px]">
              <li>
                <a 
                  href="tel:+919544593991" 
                  className="flex items-center gap-[12px] text-[15px] text-black hover:text-[#1db043] transition-colors duration-200"
                >
                  <Phone size={16} fill="currentColor" strokeWidth={0} className="text-black" />
                  <span>+91 9544593991</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+919037013117" 
                  className="flex items-center gap-[12px] text-[15px] text-black hover:text-[#1db043] transition-colors duration-200"
                >
                  <Phone size={16} fill="currentColor" strokeWidth={0} className="text-black" />
                  <span>+91 9037013117</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@fydhomes.in" 
                  className="flex items-center gap-[12px] text-[15px] text-black hover:text-[#1db043] transition-colors duration-200"
                >
                  <Mail size={16} className="text-black" />
                  <span>info@fydhomes.in</span>
                </a>
              </li>
              <li className="flex items-start gap-[12px] text-[15px] text-black">
                <MapPin size={16} className="text-black mt-1 flex-shrink-0" />
                <span>Pukkattupady, Kerala 683561</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="w-full md:w-2/3">
            <div className="mb-[25px]">
              <h2 className="font-serif text-[28px] font-bold leading-[1.3] text-black">
                Personal Information
              </h2>
            </div>

            <form className="space-y-[15px]" onSubmit={(e) => e.preventDefault()}>
              {/* Row 1: Personal Info Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px]">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-[12px] border border-[#ececec] text-[15px] text-[#5c5c5c] focus:border-[#1db043] focus:outline-none transition-colors duration-200 rounded-none h-[48px]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-[12px] border border-[#ececec] text-[15px] text-[#5c5c5c] focus:border-[#1db043] focus:outline-none transition-colors duration-200 rounded-none h-[48px]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full p-[12px] border border-[#ececec] text-[15px] text-[#5c5c5c] focus:border-[#1db043] focus:outline-none transition-colors duration-200 rounded-none h-[48px]"
                  />
                </div>
              </div>

              {/* Row 2: City Dropdown */}
              <div className="relative">
                <select className="w-full p-[12px] pr-[40px] border border-[#ececec] text-[15px] text-[#5c5c5c] focus:border-[#1db043] focus:outline-none transition-colors duration-200 rounded-none appearance-none h-[48px] bg-white">
                  <option value="">City</option>
                  <option value="kakkanad">Kakkanad</option>
                  <option value="kochi">Kochi</option>
                  <option value="pukkattupady">Pukkattupady</option>
                </select>
                <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={14} className="text-[#5c5c5c]" />
                </div>
              </div>

              {/* Section Header: Property Details */}
              <div className="mt-[25px] mb-[10px]">
                <label className="text-[13px] font-medium text-black">Property Details</label>
              </div>

              {/* Row 3: Property Type Dropdown */}
              <div className="relative">
                <select className="w-full p-[12px] pr-[40px] border border-[#ececec] text-[15px] text-[#5c5c5c] focus:border-[#1db043] focus:outline-none transition-colors duration-200 rounded-none appearance-none h-[48px] bg-white">
                  <option value="">Property Type</option>
                  <option value="commercial">Commercial</option>
                  <option value="office">- Office</option>
                  <option value="shop">- Shop</option>
                  <option value="plot">PLOT</option>
                  <option value="rent">RENT</option>
                  <option value="residential">Residential</option>
                  <option value="apartment">- Apartment</option>
                  <option value="villa">- Villa</option>
                </select>
                <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={14} className="text-[#5c5c5c]" />
                </div>
              </div>

              {/* Row 4: Area Dropdown */}
              <div className="relative">
                <select className="w-full p-[12px] pr-[40px] border border-[#ececec] text-[15px] text-[#5c5c5c] focus:border-[#1db043] focus:outline-none transition-colors duration-200 rounded-none appearance-none h-[48px] bg-white">
                  <option value="">Area</option>
                  <option value="aluva">ALUVA</option>
                  <option value="edapally">Edapally</option>
                  <option value="infopark">INFOPARK</option>
                  <option value="kakanad">Kakanad</option>
                  <option value="kizhakkambalam">KIZHAKKAMBALAM</option>
                  <option value="pukkatupady">PUKKATUPADY</option>
                </select>
                <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={14} className="text-[#5c5c5c]" />
                </div>
              </div>

              {/* Row 5: Budget Input */}
              <div>
                <input
                  type="text"
                  placeholder="Your Budget"
                  className="w-full p-[12px] border border-[#ececec] text-[15px] text-[#5c5c5c] focus:border-[#1db043] focus:outline-none transition-colors duration-200 rounded-none h-[48px]"
                />
              </div>

              {/* Row 6: Message TextArea */}
              <div>
                <textarea
                  placeholder="Enquiry Purpose (Rent/Sale)"
                  rows={4}
                  className="w-full p-[12px] border border-[#ececec] text-[15px] text-[#5c5c5c] focus:border-[#1db043] focus:outline-none transition-colors duration-200 rounded-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#1db043] hover:bg-[#199438] text-white font-sans text-sm font-bold uppercase py-[14px] px-[30px] transition-colors duration-200 rounded-none cursor-pointer tracking-wider"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDetailsForm;