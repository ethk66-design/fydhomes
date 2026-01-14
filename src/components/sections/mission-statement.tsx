import React from 'react';

const MissionStatement = () => {
  return (
    <section className="bg-white py-[80px] md:py-[100px]">
      <div className="container mx-auto px-6 max-w-[1140px]">
        {/* Section Heading */}
        <div className="mb-12 md:mb-16">
          <h2 className="font-display text-[32px] md:text-[36px] font-bold leading-[1.3] text-[#000000]">
            Finding You Homes, Building Dreams — <br className="hidden md:block" /> Right Here in Kochi
          </h2>
        </div>

        {/* Two-Column Descriptive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px] gap-y-6">
          {/* Left Column */}
          <div className="space-y-5">
            <p className="font-sans text-[16px] leading-[1.7] text-[#333333] m-0">
              At <em className="italic not-italic font-medium">Find Your Dream Home</em>, we&apos;re more than just a real estate service — we&apos;re a team driven by the vision to help individuals and families find their perfect space in Kochi. With deep roots in this vibrant city, we understand its neighborhoods, culture, and the evolving real estate landscape better than anyone else. Whether you&apos;re buying your first home, investing in a plot, or searching for a rental that fits your lifestyle, we&apos;re here to guide you with clarity and care.
            </p>
            <p className="font-sans text-[16px] leading-[1.7] text-[#333333] m-0">
              Our services are designed to simplify every step of your property journey. From buying, selling, and renting homes to handling construction projects and marketing real estate online, we provide end-to-end support under one roof. 
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <p className="font-sans text-[16px] leading-[1.7] text-[#333333] m-0">
              With a team of experienced professionals and a growing network of property listings, we bring transparency, expertise, and personal attention to every client we serve.
            </p>
            <p className="font-sans text-[16px] leading-[1.7] text-[#333333] m-0">
              What sets us apart is our commitment to relationships. We don&apos;t just deal with properties — we help build futures. At <em className="italic not-italic font-medium">Find Your Dream Home</em>, we believe that every home has a story, and we&apos;re proud to be part of yours. As Kochi continues to grow, we stand ready to be your trusted partner in making confident, rewarding real estate decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;