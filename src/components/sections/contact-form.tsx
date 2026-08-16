import React from 'react';
import { Phone, AtSign, MapPin } from 'lucide-react';

const ContactForm = () => {
  return (
    <section className="bg-[#0A192F] py-10 sm:py-16 md:py-[80px]">
      <div className="container mx-auto px-4 sm:px-[15px] max-w-[1170px]">
        <div className="flex flex-wrap -mx-4 sm:-mx-[15px]">
          <div className="w-full lg:w-1/3 px-4 sm:px-[15px] mb-8 lg:mb-0">
            <h2 className="font-display text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-white leading-[1.3] mb-6 sm:mb-[30px] animate-in fade-in slide-in-from-bottom-4 duration-700">
              Get Experts help
            </h2>
            <ul className="space-y-3 sm:space-y-[15px]">
              <li className="flex items-center gap-3 sm:gap-[12px] group">
                <a href="tel:+919544593991" className="flex items-center gap-3 sm:gap-[12px] text-gray-300 text-[13px] sm:text-[14px] hover:text-[#E3572D] transition-colors">
                  <span className="text-[#E3572D]">
                    <Phone size={14} className="sm:w-4 sm:h-4" />
                  </span>
                  +91 9544593991
                </a>
              </li>
              <li className="flex items-center gap-3 sm:gap-[12px] group">
                <a href="tel:+919037013117" className="flex items-center gap-3 sm:gap-[12px] text-gray-300 text-[13px] sm:text-[14px] hover:text-[#E3572D] transition-colors">
                  <span className="text-[#E3572D]">
                    <Phone size={14} className="sm:w-4 sm:h-4" />
                  </span>
                  +91 9037013117
                </a>
              </li>
              <li className="flex items-center gap-3 sm:gap-[12px] group">
                <a href="mailto:info@fydhomes.in" className="flex items-center gap-3 sm:gap-[12px] text-gray-300 text-[13px] sm:text-[14px] hover:text-[#E3572D] transition-colors">
                  <span className="text-[#E3572D]">
                    <AtSign size={14} className="sm:w-4 sm:h-4" />
                  </span>
                  info@fydhomes.in
                </a>
              </li>
              <li className="flex items-start gap-3 sm:gap-[12px]">
                <span className="text-[#E3572D] mt-[3px]">
                  <MapPin size={14} className="sm:w-4 sm:h-4" />
                </span>
                <a
                  href="https://share.google/tF8bnCOkQn1AlbGIW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 text-[13px] sm:text-[14px] hover:text-[#E3572D] transition-colors"
                >
                  9/490T, Chandanathil Square Complex Pukkattupady, Edathala, Ernakulam, Kerala 683561
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-2/3 px-4 sm:px-[15px]">
            <div className="mb-5 sm:mb-[25px]">
              <h2 className="font-display text-[16px] sm:text-[18px] font-semibold text-white mb-4 sm:mb-[20px]">
                Personal Information
              </h2>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xl">

              <form className="space-y-4 sm:space-y-[20px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-[20px]">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full h-[46px] sm:h-[50px] px-4 sm:px-[15px] border border-gray-200 rounded-[4px] text-[13px] sm:text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E3572D] transition-colors bg-[#f8f9fa] shadow-sm"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full h-[46px] sm:h-[50px] px-4 sm:px-[15px] border border-gray-200 rounded-[4px] text-[13px] sm:text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E3572D] transition-colors bg-[#f8f9fa] shadow-sm"
                    />
                  </div>
                  <div className="form-group sm:col-span-2 md:col-span-1">
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className="w-full h-[46px] sm:h-[50px] px-4 sm:px-[15px] border border-gray-200 rounded-[4px] text-[13px] sm:text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E3572D] transition-colors bg-[#f8f9fa] shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-[20px]">
                  <div className="form-group">
                    <select className="w-full h-[46px] sm:h-[50px] px-4 sm:px-[15px] border border-gray-200 rounded-[4px] text-[13px] sm:text-[14px] text-gray-600 focus:outline-none focus:border-[#E3572D] transition-colors bg-[#f8f9fa] appearance-none cursor-pointer shadow-sm">
                      <option value="">City</option>
                      <option value="kakkanad">Kakkanad</option>
                      <option value="kochi">Kochi</option>
                      <option value="pukkattupady">Pukkattupady</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 sm:pt-[10px]">
                  <h2 className="font-display text-[13px] sm:text-[14px] font-semibold text-gray-800 mb-3 sm:mb-[15px]">
                    Property Details
                  </h2>
                </div>

                <div className="form-group">
                  <select className="w-full h-[46px] sm:h-[50px] px-4 sm:px-[15px] border border-gray-200 rounded-[4px] text-[13px] sm:text-[14px] text-gray-600 focus:outline-none focus:border-[#E3572D] transition-colors bg-[#f8f9fa] appearance-none cursor-pointer shadow-sm">
                    <option value="">Property Type</option>
                    <option value="commercial">Commercial</option>
                    <option value="plot">Plot</option>
                    <option value="residential">Residential</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>

                <div className="form-group">
                  <select className="w-full h-[46px] sm:h-[50px] px-4 sm:px-[15px] border border-gray-200 rounded-[4px] text-[13px] sm:text-[14px] text-gray-600 focus:outline-none focus:border-[#E3572D] transition-colors bg-[#f8f9fa] appearance-none cursor-pointer shadow-sm">
                    <option value="">Area</option>
                    <option value="aluva">Aluva</option>
                    <option value="infopark">Infopark</option>
                    <option value="kakkanad">Kakkanad</option>
                    <option value="pukkattupady">Pukkattupady</option>
                  </select>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Your Budget"
                    className="w-full h-[46px] sm:h-[50px] px-4 sm:px-[15px] border border-gray-200 rounded-[4px] text-[13px] sm:text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E3572D] transition-colors bg-[#f8f9fa] shadow-sm"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    placeholder="Enquiry Purpose (Rent/Sale)"
                    rows={4}
                    className="w-full p-4 sm:p-[15px] border border-gray-200 rounded-[4px] text-[13px] sm:text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E3572D] transition-colors bg-[#f8f9fa] resize-none shadow-sm"
                  ></textarea>
                </div>

                <div className="form-group pt-2 sm:pt-[10px]">
                  <button
                    type="submit"
                    className="w-full bg-[#E3572D] hover:bg-[#16243E] text-white font-bold text-[13px] sm:text-[14px] uppercase tracking-[0.05em] py-3.5 sm:py-[15px] px-6 sm:px-[30px] rounded-[4px] transition-colors duration-300 shadow-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
