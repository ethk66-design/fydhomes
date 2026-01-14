"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SellPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '',
    location: '',
    expectedPrice: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.from('leads').insert([
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          property_type: formData.propertyType,
          location: formData.location,
          expected_price: formData.expectedPrice,
          message: formData.message,
          source: 'sell'
        }
      ]);

      if (error) throw error;
      
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        propertyType: '',
        location: '',
        expectedPrice: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting property:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-white pt-[120px]">
      {/* Hero Section */}
      <section className="bg-[#1db954] py-[60px] md:py-[100px] text-white overflow-hidden relative">
        <div className="container mx-auto px-5 relative z-10">
          <div className="max-w-[700px]">
            <h1 className="text-[40px] md:text-[64px] font-bold leading-[1.1] mb-6">
              Sell Your Property With Confidence
            </h1>
            <p className="text-[18px] md:text-[20px] opacity-90 leading-relaxed mb-8">
              Reach over 295K+ potential buyers through our extensive network and social media presence. We make selling simple, fast, and profitable.
            </p>
          </div>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <circle cx="400" cy="0" r="400" fill="white" />
          </svg>
        </div>
      </section>

      <section className="py-[80px]">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Form Section */}
            <div className="bg-white p-8 md:p-12 shadow-[0_10px_50px_rgba(0,0,0,0.08)] rounded-[20px] border border-[#eeeeee]">
              <h2 className="text-[28px] font-bold mb-8">Property Details</h2>
              
              {submitted ? (
                <div className="bg-[#1db954]/10 p-8 rounded-[15px] text-center">
                  <div className="w-16 h-16 bg-[#1db954] text-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-[#5c5c5c]">Our property experts will contact you shortly to discuss your listing.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-[#2b7489] font-bold uppercase text-xs tracking-widest hover:underline"
                  >
                    Submit another property
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[13px] font-bold uppercase tracking-wider mb-2">Full Name *</label>
                      <input 
                        required
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full h-[54px] px-5 bg-[#f8fafc] border border-[#eeeeee] rounded-[8px] focus:outline-none focus:border-[#1db954] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold uppercase tracking-wider mb-2">Phone Number *</label>
                      <input 
                        required
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your Phone"
                        className="w-full h-[54px] px-5 bg-[#f8fafc] border border-[#eeeeee] rounded-[8px] focus:outline-none focus:border-[#1db954] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[13px] font-bold uppercase tracking-wider mb-2">Property Type</label>
                      <select 
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full h-[54px] px-5 bg-[#f8fafc] border border-[#eeeeee] rounded-[8px] focus:outline-none focus:border-[#1db954] transition-colors appearance-none"
                      >
                        <option value="">Select Type</option>
                        <option value="Villa">Villa</option>
                        <option value="Residential">Residential Home</option>
                        <option value="Plot">Plot / Land</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold uppercase tracking-wider mb-2">Location</label>
                      <input 
                        type="text" 
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Property Location"
                        className="w-full h-[54px] px-5 bg-[#f8fafc] border border-[#eeeeee] rounded-[8px] focus:outline-none focus:border-[#1db954] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider mb-2">Expected Price (Optional)</label>
                    <input 
                      type="text" 
                      name="expectedPrice"
                      value={formData.expectedPrice}
                      onChange={handleChange}
                      placeholder="e.g. ₹ 85 Lakhs"
                      className="w-full h-[54px] px-5 bg-[#f8fafc] border border-[#eeeeee] rounded-[8px] focus:outline-none focus:border-[#1db954] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider mb-2">Description</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us more about your property..."
                      className="w-full p-5 bg-[#f8fafc] border border-[#eeeeee] rounded-[8px] focus:outline-none focus:border-[#1db954] transition-colors resize-none"
                    ></textarea>
                  </div>

                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full h-[60px] bg-black text-white font-bold uppercase tracking-[2px] rounded-[8px] hover:bg-[#1db954] transition-all duration-300 disabled:bg-[#cccccc]"
                    >
                      {loading ? 'Submitting...' : 'Submit Property'}
                    </button>
                </form>
              )}
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-center">
              <h2 className="text-[36px] font-bold mb-8 leading-tight">Why Sell With FYD Homes?</h2>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-[#2b7489]/10 rounded-full flex-shrink-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#2b7489]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold mb-2">Maximum Exposure</h3>
                    <p className="text-[#5c5c5c] leading-relaxed">Your property will be showcased to our 295K+ Instagram followers and 16K+ YouTube subscribers, ensuring fast results.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-[#1db954]/10 rounded-full flex-shrink-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#1db954]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold mb-2">Verified Buyers</h3>
                    <p className="text-[#5c5c5c] leading-relaxed">We pre-screen all potential buyers to save you time and ensure you only deal with serious, qualified inquiries.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-[#2b7489]/10 rounded-full flex-shrink-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#2b7489]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold mb-2">Fair Valuation</h3>
                    <p className="text-[#5c5c5c] leading-relaxed">Our experts provide detailed market analysis to help you price your property competitively for a swift sale.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
