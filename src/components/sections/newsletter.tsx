"use client";

import React from 'react';

/**
 * Newsletter Section
 * 
 * Features:
 * - Background image of a modern building
 * - Centered content with overlay for readability
 * - 'Stay Updated With Us' heading (Roboto Slab)
 * - Email input and 'SIGN UP' button (Emerald Green)
 * - Fully responsive layout
 */

const Newsletter = () => {
  const bgImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-12-at-1_41_55-PM-758x564-28.jpeg";

  return (
    <section 
      className="relative w-full py-[80px] md:py-[100px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container relative z-10 px-5 text-center">
          <div className="max-w-[700px] mx-auto">
            {/* Section Heading */}
            <h2 className="text-white font-sans font-bold text-[32px] md:text-[36px] leading-[1.2] mb-[15px]">
              Stay Updated With Us
            </h2>

          {/* Subtext */}
          <p className="text-white/90 font-sans text-[16px] leading-[1.6] mb-[30px] px-2">
            Sign up for our newsletter and be the first to know about new listings, market insights, and exclusive offers.
          </p>

          {/* Subscription Form */}
          <form 
            className="flex flex-col md:flex-row gap-0 max-w-[550px] mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-white border-0 py-[12px] px-[20px] text-[15px] font-sans text-[#5c5c5c] rounded-t-sm md:rounded-l-sm md:rounded-tr-none focus:outline-none focus:ring-1 focus:ring-emerald-500"
              required
            />
            <button
              type="submit"
              className="bg-[#1db954] text-white font-sans font-semibold text-[14px] px-[35px] py-[14px] uppercase tracking-[0.5px] rounded-b-sm md:rounded-r-sm md:rounded-bl-none transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;