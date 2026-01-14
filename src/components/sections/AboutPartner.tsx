import React from 'react';

/**
 * AboutPartner Component
 * 
 * This component clones the 'Your Trusted Real Estate Partner in Kochi' section including:
 * 1. An informative header with text on the left/right split.
 * 2. A 'More Information' call-to-action button.
 * 3. A grid of social media and client stats cards with specific counters (295K+, 16.4K+, 500+).
 */

const AboutPartner: React.FC = () => {
  return (
    <section className="py-[80px] bg-white">
      <div className="container mx-auto px-5 max-w-[1170px]">
        {/* Header Text Section */}
        <div className="flex flex-col lg:flex-row justify-between mb-16 gap-8">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-dot"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="1" />
                </svg>
              </span>
              <span className="uppercase text-[12px] font-bold tracking-widest text-[#5c5c5c]">
                About Us
              </span>
            </div>
            <h2 className="font-serif text-[32px] md:text-[40px] leading-[1.2] font-bold text-black max-w-[450px]">
              Your Trusted Real Estate Partner In Kochi
            </h2>
          </div>

          <div className="lg:w-[45%] flex flex-col items-start lg:items-end">
            <p className="text-[#5c5c5c] text-[16px] leading-[1.6] mb-8 text-left lg:text-right">
              At Find Your Dream Home, we help you buy, sell, rent, or build with
              confidence. From prime plots to luxury villas, our local expertise
              and personalized service make your real estate journey smooth and
              successful.
            </p>
            <a
              href="/about"
              className="bg-[#2d7a8c] text-white px-6 py-3.5 rounded-[4px] text-[13px] font-bold uppercase tracking-[0.5px] hover:bg-[#246271] transition-colors"
            >
              More Information
            </a>
          </div>
        </div>

        {/* Stats Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Instagram Stat Card */}
          <div className="bg-[#f4f8fb] rounded-lg p-10 flex flex-col items-start transition-grow shadow-card">
            <span className="text-[48px] font-bold text-black mb-2 leading-none">
              295K+
            </span>
            <span className="text-[#2d7a8c] font-semibold text-[18px]">
              Instagram Followers
            </span>
          </div>

          {/* YouTube Stat Card */}
          <div className="bg-[#f4f8fb] rounded-lg p-10 flex flex-col items-start transition-grow shadow-card">
            <span className="text-[48px] font-bold text-black mb-2 leading-none">
              16.4k+
            </span>
            <span className="text-[#2d7a8c] font-semibold text-[18px]">
              Youtube Subscribers
            </span>
          </div>

          {/* Customers Stat Card */}
          <div className="bg-[#f4f8fb] rounded-lg p-10 flex flex-col items-start transition-grow shadow-card">
            <span className="text-[48px] font-bold text-black mb-2 leading-none">
              500+
            </span>
            <span className="text-[#2d7a8c] font-semibold text-[18px]">
              Total Customers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPartner;