import React from 'react';
import Link from 'next/link';

/**
 * AboutPreview Component
 * 
 * Clones the "Your Trusted Real Estate Partner in Kochi" section.
 * Includes descriptive text, a primary CTA button, and a three-column statistics row.
 * 
 * Design: Clean layout, teal accents (#2B7387), soft gray backgrounds (#F4F7F8), 
 * and serif typography for headings (Roboto Slab).
 */
const AboutPreview: React.FC = () => {
  return (
    <section className="bg-white py-[80px]">
      <div className="container px-[15px] mx-auto max-w-[1230px]">
        {/* Top Text Content Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-[50px] gap-8">
          <div className="w-full md:w-[45%]">
            <h2 className="font-serif text-[32px] font-bold leading-[1.3] text-[#1a1a1a] m-0 mb-[15px]">
              Your Trusted Real Estate Partner in Kochi
            </h2>
          </div>
          <div className="w-full md:w-[45%] flex flex-col items-start md:items-end">
            <p className="font-sans text-[16px] leading-[1.6] text-[#1a1a1a] mb-[20px] md:text-left">
              At Find Your Dream Home, we help you buy, sell, rent, or build with confidence. From prime plots to luxury villas, our local expertise and personalized service make your real estate journey smooth and successful.
            </p>
            <Link
              href="/about"
              className="inline-block bg-[#2b7387] text-white font-sans text-[13px] font-bold tracking-[0.5px] px-[20px] py-[10px] rounded-[4px] uppercase transition-colors hover:bg-[#235d6e]"
            >
              More Information
            </Link>
          </div>
        </div>

        {/* Statistics Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          {/* Instagram Followers */}
          <div className="bg-[#f4f7f8] rounded-[4px] p-[40px] flex flex-col items-start">
            <span className="font-sans text-[48px] font-bold text-[#1a1a1a] leading-none mb-[12px]">
              295K+
            </span>
            <span className="font-sans text-[18px] font-medium text-[#2b7387]">
              Instagram Followers
            </span>
          </div>

          {/* Youtube Subscribers */}
          <div className="bg-[#f4f7f8] rounded-[4px] p-[40px] flex flex-col items-start">
            <span className="font-sans text-[48px] font-bold text-[#1a1a1a] leading-none mb-[12px]">
              16.4k+
            </span>
            <span className="font-sans text-[18px] font-medium text-[#2b7387]">
              Youtube Subscribers
            </span>
          </div>

          {/* Total Customers */}
          <div className="bg-[#f4f7f8] rounded-[4px] p-[40px] flex flex-col items-start">
            <span className="font-sans text-[48px] font-bold text-[#1a1a1a] leading-none mb-[12px]">
              500+
            </span>
            <span className="font-sans text-[18px] font-medium text-[#2b7387]">
              Total Customers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;