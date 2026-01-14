import React from 'react';
import { Phone, AtSign, MapPin } from 'lucide-react';

const ContactForm = () => {
  return (
    <section className="bg-white py-[80px]">
      <div className="container mx-auto px-[15px] max-w-[1170px]">
        <div className="flex flex-wrap -mx-[15px]">
          {/* Left Column: Contact Information */}
          <div className="w-full lg:w-1/3 px-[15px] mb-[40px] lg:mb-0">
            <h2 className="font-display text-[24px] font-semibold text-[#222222] leading-[1.3] mb-[30px] animate-in fade-in slide-in-from-bottom-4 duration-700">
              Get Experts help
            </h2>
            <ul className="space-y-[15px]">
              <li className="flex items-center gap-[12px] group">
                <a href="tel:+919544593991" className="flex items-center gap-[12px] text-[#222222] text-[14px] hover:text-[#1db345] transition-colors">
                  <span className="text-[#1db345]">
                    <Phone size={16} />
                  </span>
                  +91 9544593991
                </a>
              </li>
              <li className="flex items-center gap-[12px] group">
                <a href="tel:+919037013117" className="flex items-center gap-[12px] text-[#222222] text-[14px] hover:text-[#1db345] transition-colors">
                  <span className="text-[#1db345]">
                    <Phone size={16} />
                  </span>
                  +91 9037013117
                </a>
              </li>
              <li className="flex items-center gap-[12px] group">
                <a href="mailto:info@fydhomes.in" className="flex items-center gap-[12px] text-[#222222] text-[14px] hover:text-[#1db345] transition-colors">
                  <span className="text-[#1db345]">
                    <AtSign size={16} />
                  </span>
                  info@fydhomes.in
                </a>
              </li>
              <li className="flex items-start gap-[12px]">
                <span className="text-[#1db345] mt-[3px]">
                  <MapPin size={16} />
                </span>
                <span className="text-[#222222] text-[14px]">
                  Pukkattupady, Kerala 683561
                </span>
              </li>
            </ul>
          </div>

          {/* Right Column: Information Form */}
          <div className="w-full lg:w-2/3 px-[15px]">
            <div className="mb-[25px]">
              <h2 className="font-display text-[18px] font-semibold text-[#222222] mb-[20px]">
                Personal Information
              </h2>
            </div>
            
            <form className="space-y-[20px]">
              {/* Row 1: Name, Email, Phone */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full h-[50px] px-[15px] border border-[#e6e6e6] rounded-[4px] text-[14px] text-[#444444] focus:outline-none focus:border-[#1db345] transition-colors bg-white"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-[50px] px-[15px] border border-[#e6e6e6] rounded-[4px] text-[14px] text-[#444444] focus:outline-none focus:border-[#1db345] transition-colors bg-white"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full h-[50px] px-[15px] border border-[#e6e6e6] rounded-[4px] text-[14px] text-[#444444] focus:outline-none focus:border-[#1db345] transition-colors bg-white"
                  />
                </div>
              </div>

              {/* Row 2: City */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
                <div className="form-group">
                  <select className="w-full h-[50px] px-[15px] border border-[#e6e6e6] rounded-[4px] text-[14px] text-[#444444] focus:outline-none focus:border-[#1db345] transition-colors bg-white appearance-none cursor-pointer">
                    <option value="">City</option>
                    <option value="kakkanad">Kakkanad</option>
                    <option value="kochi">Kochi</option>
                    <option value="pukkattupady">Pukkattupady</option>
                  </select>
                </div>
              </div>

              {/* Property Details Title */}
              <div className="pt-[10px]">
                <h2 className="font-display text-[14px] font-semibold text-[#222222] mb-[15px]">
                  Property Details
                </h2>
              </div>

              {/* Row 3: Property Type */}
              <div className="form-group">
                <select className="w-full h-[50px] px-[15px] border border-[#e6e6e6] rounded-[4px] text-[14px] text-[#444444] focus:outline-none focus:border-[#1db345] transition-colors bg-white appearance-none cursor-pointer">
                  <option value="">Property Type</option>
                  <option value="commercial">Commercial</option>
                  <option value="plot">Plot</option>
                  <option value="residential">Residential</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              {/* Row 4: Area */}
              <div className="form-group">
                <select className="w-full h-[50px] px-[15px] border border-[#e6e6e6] rounded-[4px] text-[14px] text-[#444444] focus:outline-none focus:border-[#1db345] transition-colors bg-white appearance-none cursor-pointer">
                  <option value="">Area</option>
                  <option value="aluva">Aluva</option>
                  <option value="infopark">Infopark</option>
                  <option value="kakkanad">Kakkanad</option>
                  <option value="pukkattupady">Pukkattupady</option>
                </select>
              </div>

              {/* Row 5: Budget */}
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Budget"
                  className="w-full h-[50px] px-[15px] border border-[#e6e6e6] rounded-[4px] text-[14px] text-[#444444] focus:outline-none focus:border-[#1db345] transition-colors bg-white"
                />
              </div>

              {/* Row 6: Message/Purpose */}
              <div className="form-group">
                <textarea
                  placeholder="Enquiry Purpose (Rent/Sale)"
                  rows={4}
                  className="w-full p-[15px] border border-[#e6e6e6] rounded-[4px] text-[14px] text-[#444444] focus:outline-none focus:border-[#1db345] transition-colors bg-white resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="form-group pt-[10px]">
                <button
                  type="submit"
                  className="w-full bg-[#1db345] hover:bg-[#17a33d] text-white font-bold text-[14px] uppercase tracking-[0.05em] py-[15px] px-[30px] rounded-[4px] transition-colors duration-300 shadow-sm"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;