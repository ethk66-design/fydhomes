import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactInfoForm = () => {
  return (
    <section className="bg-white py-20 px-4 md:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[30px]">
          
          {/* Left Column: Contact Details */}
          <div className="md:col-span-4 lg:col-span-4 animate-in fade-in duration-700">
            <h2 className="font-serif text-[28px] font-bold text-black mb-6 leading-[1.3]">
              Get Experts help
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <a 
                  href="tel:+919544593991" 
                  className="flex items-center gap-3 text-[14px] text-black hover:text-[#1db945] transition-colors"
                >
                  <Phone className="w-[18px] h-[18px] text-[#1db945]" />
                  <span>+91 9544593991</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <a 
                  href="tel:+919037013117" 
                  className="flex items-center gap-3 text-[14px] text-black hover:text-[#1db945] transition-colors"
                >
                  <Phone className="w-[18px] h-[18px] text-[#1db945]" />
                  <span>+91 9037013117</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <a 
                  href="mailto:info@fydhomes.in" 
                  className="flex items-center gap-3 text-[14px] text-black hover:text-[#1db945] transition-colors"
                >
                  <Mail className="w-[18px] h-[18px] text-[#1db945]" />
                  <span>info@fydhomes.in</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-black">
                <MapPin className="w-[18px] h-[18px] text-[#1db945] mt-0.5 shrink-0" />
                <span>Pukkattupady, Kerala 683561</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="md:col-span-8 lg:col-span-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6">
              <h2 className="font-serif text-[28px] font-bold text-black mb-1.5 leading-[1.3]">
                Personal Information
              </h2>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full bg-white border border-[#e5e5e5] rounded-[4px] px-[15px] py-3 text-[14px] font-sans focus:border-[#1db945] outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full bg-white border border-[#e5e5e5] rounded-[4px] px-[15px] py-3 text-[14px] font-sans focus:border-[#1db945] outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Phone number" 
                    className="w-full bg-white border border-[#e5e5e5] rounded-[4px] px-[15px] py-3 text-[14px] font-sans focus:border-[#1db945] outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1">
                <select className="w-full bg-white border border-[#e5e5e5] rounded-[4px] px-[15px] py-3 text-[14px] font-sans text-gray-500 focus:border-[#1db945] outline-none appearance-none cursor-pointer transition-colors">
                  <option value="">City</option>
                  <option value="kakkanad">Kakkanad</option>
                  <option value="kochi">Kochi</option>
                  <option value="pukkattupady">Pukkattupady</option>
                </select>
              </div>

              <div className="pt-4">
                <h3 className="font-sans text-[15px] font-medium text-black mb-4">
                  Property Details
                </h3>
                <div className="space-y-4">
                  <select className="w-full bg-white border border-[#e5e5e5] rounded-[4px] px-[15px] py-3 text-[14px] font-sans text-gray-500 focus:border-[#1db945] outline-none appearance-none cursor-pointer transition-colors">
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

                  <select className="w-full bg-white border border-[#e5e5e5] rounded-[4px] px-[15px] py-3 text-[14px] font-sans text-gray-500 focus:border-[#1db945] outline-none appearance-none cursor-pointer transition-colors">
                    <option value="">Area</option>
                    <option value="aluva">ALUVA</option>
                    <option value="edapally">Edapally</option>
                    <option value="infopark">INFOPARK</option>
                    <option value="kakanad">Kakanad</option>
                    <option value="pukkatupady">PUKKATUPADY</option>
                  </select>

                  <input 
                    type="text" 
                    placeholder="Your Budget" 
                    className="w-full bg-white border border-[#e5e5e5] rounded-[4px] px-[15px] py-3 text-[14px] font-sans focus:border-[#1db945] outline-none transition-colors"
                  />

                  <textarea 
                    placeholder="Enquiry Purpose (Rent/Sale)" 
                    rows={4}
                    className="w-full bg-white border border-[#e5e5e5] rounded-[4px] px-[15px] py-3 text-[14px] font-sans focus:border-[#1db945] outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full bg-[#1db945] text-white font-bold text-[14px] uppercase tracking-wider py-[14px] rounded-[4px] hover:bg-[#17a33d] transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#1db945] outline-none"
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

export default ContactInfoForm;