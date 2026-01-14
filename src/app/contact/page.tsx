"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-white pt-[120px]">
      {/* Hero Section */}
      <section className="bg-[#f4f8fb] py-[60px] md:py-[80px]">
        <div className="container mx-auto px-5">
          <div className="max-w-[800px]">
            <h1 className="text-[40px] md:text-[56px] font-bold text-black leading-tight mb-6">
              Contact Us
            </h1>
            <p className="text-[18px] text-[#5c5c5c] leading-relaxed">
              Have questions about a property or want to discuss your real estate needs? We're here to help. Reach out to our team today.
            </p>
          </div>
        </div>
      </section>

      <section className="py-[80px]">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-[28px] font-bold mb-8">Get In Touch</h2>
                <div className="space-y-6">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-[#2b7489]/10 rounded-full flex-shrink-0 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#2b7489]" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#2b7489] mb-1">Phone</h3>
                      <p className="text-black font-medium text-[18px]">+91 94970 80000</p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-[#1db954]/10 rounded-full flex-shrink-0 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#1db954]" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#1db954] mb-1">Email</h3>
                      <p className="text-black font-medium text-[18px]">info@fydhomes.in</p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-[#2b7489]/10 rounded-full flex-shrink-0 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#2b7489]" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#2b7489] mb-1">Location</h3>
                      <p className="text-black font-medium text-[16px]">Infopark Road, Kakkanad, Kochi, Kerala</p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-[#1db954]/10 rounded-full flex-shrink-0 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#1db954]" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#1db954] mb-1">Working Hours</h3>
                      <p className="text-black font-medium text-[16px]">Mon - Sat: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Connect */}
              <div className="pt-8 border-t border-[#eeeeee]">
                <h3 className="text-[18px] font-bold mb-4">Follow Our Journey</h3>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/findyourdreamhome_/" className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#1db954] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="https://www.youtube.com/@findyourdreamhome6667" className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#1db954] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 shadow-[0_10px_50px_rgba(0,0,0,0.08)] rounded-[20px] border border-[#eeeeee]">
                <h2 className="text-[28px] font-bold mb-8">Send a Message</h2>
                
                {submitted ? (
                  <div className="bg-[#1db954]/10 p-10 rounded-[15px] text-center">
                    <div className="w-16 h-16 bg-[#1db954] text-white rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-[#5c5c5c]">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-[#2b7489] font-bold uppercase text-xs tracking-widest hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[13px] font-bold uppercase tracking-wider mb-2">Full Name</label>
                        <input 
                          required
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className="w-full h-[54px] px-5 bg-[#f8fafc] border border-[#eeeeee] rounded-[8px] focus:outline-none focus:border-[#2b7489] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold uppercase tracking-wider mb-2">Email Address</label>
                        <input 
                          required
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your Email"
                          className="w-full h-[54px] px-5 bg-[#f8fafc] border border-[#eeeeee] rounded-[8px] focus:outline-none focus:border-[#2b7489] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[13px] font-bold uppercase tracking-wider mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your Phone"
                          className="w-full h-[54px] px-5 bg-[#f8fafc] border border-[#eeeeee] rounded-[8px] focus:outline-none focus:border-[#2b7489] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold uppercase tracking-wider mb-2">Subject</label>
                        <input 
                          type="text" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Subject"
                          className="w-full h-[54px] px-5 bg-[#f8fafc] border border-[#eeeeee] rounded-[8px] focus:outline-none focus:border-[#2b7489] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-bold uppercase tracking-wider mb-2">Message</label>
                      <textarea 
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="How can we help you?"
                        className="w-full p-5 bg-[#f8fafc] border border-[#eeeeee] rounded-[8px] focus:outline-none focus:border-[#2b7489] transition-colors resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="h-[60px] px-10 bg-black text-white font-bold uppercase tracking-[2px] rounded-[8px] hover:bg-[#2b7489] transition-all duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[450px] w-full bg-[#f0f0f0] overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62860.63914868834!2d76.32637255452243!3d10.034185108365287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c441b8f041b%3A0x6b4c34d85834925e!2sKakkanad%2C%20Kochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1705244512345!5m2!1sen!2sin" 
          className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
          allowFullScreen={true}
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </main>
  );
}
