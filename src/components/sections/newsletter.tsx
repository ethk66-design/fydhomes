import React from 'react';

/**
 * NewsletterSection component clones the "Stay Updated With Us" section.
 * Features:
 * - Medium gray background (#A8A8A8)
 * - Centralized typography (Roboto Slab for Heading, Roboto for Subtext)
 * - Flex container for input and button
 * - Vibrant green button (#1DB954)
 */
const NewsletterSection: React.FC = () => {
  return (
    <section 
      style={{ backgroundColor: '#A8A8A8' }} 
      className="py-16 md:py-20 px-4"
    >
      <div className="max-w-[1240px] mx-auto text-center">
        {/* Heading */}
        <h2 
          className="font-serif text-white text-[32px] md:text-[40px] font-bold leading-[1.2] mb-4"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Stay Updated With Us
        </h2>

        {/* Subtext */}
        <p 
          className="text-white text-base md:text-[18px] leading-[1.6] max-w-[700px] mx-auto mb-10 opacity-90 px-4"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
        >
          Sign up for our newsletter and be the first to know about new listings, market insights, and exclusive offers.
        </p>

        {/* Form Container */}
        <form 
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 max-w-[620px] mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Email Input */}
          <div className="w-full md:flex-1">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full h-[54px] px-5 rounded-[4px] border-none text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1DB954] transition-all"
              style={{
                fontFamily: 'var(--font-sans)',
                backgroundColor: '#ffffff',
                color: '#1a1a1a'
              }}
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full md:w-auto h-[54px] px-10 rounded-[4px] text-white font-bold text-[14px] uppercase tracking-wider transition-colors hover:bg-opacity-90 cursor-pointer whitespace-nowrap"
            style={{
              backgroundColor: '#1DB954',
              fontFamily: 'var(--font-sans)'
            }}
          >
            SIGN UP
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;