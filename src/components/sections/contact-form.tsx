"use client";

import React, { useState } from 'react';
import { Phone, AtSign, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const ContactForm = () => {
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
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Please enter your full name.');
      return;
    }

    if (!formData.phone.trim() && !formData.email.trim()) {
      toast.error('Please provide at least a phone number or email address so we can reach you.');
      return;
    }

    try {
      setLoading(true);

      const detailsList: string[] = [];
      if (formData.city) detailsList.push(`City: ${formData.city}`);
      if (formData.area) detailsList.push(`Area: ${formData.area}`);
      if (formData.propertyType) detailsList.push(`Property Type: ${formData.propertyType}`);
      if (formData.budget) detailsList.push(`Budget: ${formData.budget}`);

      const formattedDetails = detailsList.length > 0 ? `[${detailsList.join(' | ')}]\n` : '';
      const fullMessage = `${formattedDetails}${formData.message}`.trim();

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim() || null,
          phone: formData.phone.trim() || null,
          message: fullMessage || 'General Inquiry',
          source: 'contact_page'
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit inquiry');
      }

      toast.success('Thank you! Your message has been received. Our team will contact you shortly.');
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
    } catch (err) {
      console.error('Error submitting contact form:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#0A192F] py-10 sm:py-16 md:py-[80px]">
      <div className="container mx-auto px-4 sm:px-[15px] max-w-[1170px]">
        <div className="flex flex-wrap -mx-4 sm:-mx-[15px]">
          {/* Left Column: Direct Contact Info */}
          <div className="w-full lg:w-1/3 px-4 sm:px-[15px] mb-8 lg:mb-0">
            <h2 className="font-display text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-white leading-[1.3] mb-6 sm:mb-[30px] animate-in fade-in slide-in-from-bottom-4 duration-700">
              Get Experts help
            </h2>
            <ul className="space-y-3 sm:space-y-[15px]">
              <li className="flex items-center gap-3 sm:gap-[12px] group">
                <a href="tel:+919778393991" className="flex items-center gap-3 sm:gap-[12px] text-gray-300 text-[13px] sm:text-[14px] hover:text-[#E3572D] transition-colors">
                  <span className="text-[#E3572D]">
                    <Phone size={14} className="sm:w-4 sm:h-4" />
                  </span>
                  +91 9778393991
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

          {/* Right Column: Interactive Lead Submission Form */}
          <div className="w-full lg:w-2/3 px-4 sm:px-[15px]">
            <div className="mb-5 sm:mb-[25px]">
              <h2 className="font-display text-[16px] sm:text-[18px] font-semibold text-white mb-4 sm:mb-[20px]">
                Personal Information
              </h2>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xl">
              {submitted && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-emerald-800 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold">Inquiry Sent Successfully!</span> We have received your details and will get back to you shortly.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-[20px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-[20px]">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name *"
                      required
                      className="w-full h-[46px] sm:h-[50px] px-4 sm:px-[15px] border border-gray-200 rounded-[4px] text-[13px] sm:text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E3572D] transition-colors bg-[#f8f9fa] shadow-sm"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full h-[46px] sm:h-[50px] px-4 sm:px-[15px] border border-gray-200 rounded-[4px] text-[13px] sm:text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E3572D] transition-colors bg-[#f8f9fa] shadow-sm"
                    />
                  </div>
                  <div className="form-group sm:col-span-2 md:col-span-1">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone number *"
                      className="w-full h-[46px] sm:h-[50px] px-4 sm:px-[15px] border border-gray-200 rounded-[4px] text-[13px] sm:text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E3572D] transition-colors bg-[#f8f9fa] shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-[20px]">
                  <div className="form-group">
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full h-[46px] sm:h-[50px] px-4 sm:px-[15px] border border-gray-200 rounded-[4px] text-[13px] sm:text-[14px] text-gray-600 focus:outline-none focus:border-[#E3572D] transition-colors bg-[#f8f9fa] appearance-none cursor-pointer shadow-sm"
                    >
                      <option value="">City</option>
                      <option value="Kakkanad">Kakkanad</option>
                      <option value="Kochi">Kochi</option>
                      <option value="Pukkattupady">Pukkattupady</option>
                      <option value="Aluva">Aluva</option>
                      <option value="Ernakulam">Ernakulam</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 sm:pt-[10px]">
                  <h2 className="font-display text-[13px] sm:text-[14px] font-semibold text-gray-800 mb-3 sm:mb-[15px]">
                    Property Details
                  </h2>
                </div>

                <div className="form-group">
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full h-[46px] sm:h-[50px] px-4 sm:px-[15px] border border-gray-200 rounded-[4px] text-[13px] sm:text-[14px] text-gray-600 focus:outline-none focus:border-[#E3572D] transition-colors bg-[#f8f9fa] appearance-none cursor-pointer shadow-sm"
                  >
                    <option value="">Property Type</option>
                    <option value="Villa">Villa</option>
                    <option value="Residential">Residential</option>
                    <option value="Plot">Plot</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Office">Office</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full h-[46px] sm:h-[50px] px-4 sm:px-[15px] border border-gray-200 rounded-[4px] text-[13px] sm:text-[14px] text-gray-600 focus:outline-none focus:border-[#E3572D] transition-colors bg-[#f8f9fa] appearance-none cursor-pointer shadow-sm"
                  >
                    <option value="">Area / Location</option>
                    <option value="Aluva">Aluva</option>
                    <option value="Infopark">Infopark</option>
                    <option value="Kakkanad">Kakkanad</option>
                    <option value="Pukkattupady">Pukkattupady</option>
                    <option value="Palarivattom">Palarivattom</option>
                    <option value="Edapally">Edapally</option>
                  </select>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Your Budget (e.g. 50 Lakhs, 1.5 Cr)"
                    className="w-full h-[46px] sm:h-[50px] px-4 sm:px-[15px] border border-gray-200 rounded-[4px] text-[13px] sm:text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E3572D] transition-colors bg-[#f8f9fa] shadow-sm"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enquiry Purpose (Rent/Sale) or Specific Requirements"
                    rows={4}
                    className="w-full p-4 sm:p-[15px] border border-gray-200 rounded-[4px] text-[13px] sm:text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#E3572D] transition-colors bg-[#f8f9fa] resize-none shadow-sm"
                  ></textarea>
                </div>

                <div className="form-group pt-2 sm:pt-[10px]">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#E3572D] hover:bg-[#cf4b22] text-white font-bold text-[13px] sm:text-[14px] uppercase tracking-[0.05em] py-3.5 sm:py-[15px] px-6 sm:px-[30px] rounded-[4px] transition-colors duration-300 shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    <span>{loading ? 'Submitting...' : 'Submit Inquiry'}</span>
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
