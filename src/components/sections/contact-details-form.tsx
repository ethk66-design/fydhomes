"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react';

const ContactDetailsForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    propertyType: '',
    area: '',
    budget: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Location: ${formData.city}, ${formData.area}. Type: ${formData.propertyType}. Budget: ${formData.budget}. ${formData.message}`,
          source: 'contact'
        })
      });

      if (!res.ok) throw new Error('Failed to submit');

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        propertyType: '',
        area: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  if (submitted) {
    return (
      <section className="bg-white py-[60px]">
        <div className="container mx-auto max-w-[1140px] px-[15px]">
          <div className="bg-[#1db043]/10 p-12 rounded-[15px] text-center max-w-[600px] mx-auto">
            <div className="w-16 h-16 bg-[#1db043] text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
            <p className="text-[#5c5c5c] mb-8">Thank you for your interest. Our experts will get back to you within 24 hours.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-[#1db043] font-bold uppercase text-xs tracking-widest hover:underline"
            >
              Send another message
            </button>
          </div>
        </div>
      </section>
    );
  }

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

            <form className="space-y-[15px]" onSubmit={handleSubmit}>
              {/* Row 1: Personal Info Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px]">
                <div>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full p-[12px] border border-[#ececec] text-[15px] text-[#5c5c5c] focus:border-[#1db043] focus:outline-none transition-colors duration-200 rounded-none h-[48px]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-[12px] border border-[#ececec] text-[15px] text-[#5c5c5c] focus:border-[#1db043] focus:outline-none transition-colors duration-200 rounded-none h-[48px]"
                  />
                </div>
                <div>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full p-[12px] border border-[#ececec] text-[15px] text-[#5c5c5c] focus:border-[#1db043] focus:outline-none transition-colors duration-200 rounded-none h-[48px]"
                  />
                </div>
              </div>

              {/* Row 2: City Dropdown */}
              <div className="relative">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-[12px] pr-[40px] border border-[#ececec] text-[15px] text-[#5c5c5c] focus:border-[#1db043] focus:outline-none transition-colors duration-200 rounded-none appearance-none h-[48px] bg-white"
                >
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
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full p-[12px] pr-[40px] border border-[#ececec] text-[15px] text-[#5c5c5c] focus:border-[#1db043] focus:outline-none transition-colors duration-200 rounded-none appearance-none h-[48px] bg-white"
                >
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
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full p-[12px] pr-[40px] border border-[#ececec] text-[15px] text-[#5c5c5c] focus:border-[#1db043] focus:outline-none transition-colors duration-200 rounded-none appearance-none h-[48px] bg-white"
                >
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
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Your Budget"
                  className="w-full p-[12px] border border-[#ececec] text-[15px] text-[#5c5c5c] focus:border-[#1db043] focus:outline-none transition-colors duration-200 rounded-none h-[48px]"
                />
              </div>

              {/* Row 6: Message TextArea */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enquiry Purpose (Rent/Sale)"
                  rows={4}
                  className="w-full p-[12px] border border-[#ececec] text-[15px] text-[#5c5c5c] focus:border-[#1db043] focus:outline-none transition-colors duration-200 rounded-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1db043] hover:bg-[#199438] text-white font-sans text-sm font-bold uppercase py-[14px] px-[30px] transition-colors duration-200 rounded-none cursor-pointer tracking-wider disabled:bg-[#cccccc]"
                >
                  {loading ? 'SUBMITTING...' : 'SUBMIT'}
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