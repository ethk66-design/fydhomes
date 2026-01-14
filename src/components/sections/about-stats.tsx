import React from 'react';

/**
 * AboutStats component clones the "Your Trusted Real Estate Partner in Kochi" section
 * with a descriptive text block and three distinct stat cards.
 */
const AboutStats = () => {
  const stats = [
    {
      value: "295K+",
      label: "Instagram Followers",
    },
    {
      value: "16.4k+",
      label: "Youtube Subscribers",
    },
    {
      value: "500+",
      label: "Total Customers",
    },
  ];

  return (
    <section className="bg-white py-[80px] lg:py-[100px]">
      <div className="container mx-auto px-4 max-w-[1170px]">
        {/* Top Header & Text Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
               {/* Small decorative circle icon common in this theme's section headers */}
               <div className="w-4 h-4 rounded-full border-2 border-primary/30 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
               </div>
               <span className="text-[13px] uppercase tracking-wider text-text-meta font-bold">About Us</span>
            </div>
            <h2 className="text-[32px] md:text-[36px] font-semibold font-serif leading-[1.2] text-text-main max-w-md">
              Your Trusted Real Estate Partner in Kochi
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] leading-[1.8] text-text-body font-sans">
              At Find Your Dream Home, we help you buy, sell, rent, or build with confidence. From prime plots to luxury villas, our local expertise and personalized service make your real estate journey smooth and successful.
            </p>
            <a
              href="/about"
              className="inline-block bg-primary text-white px-[30px] py-[12px] text-[14px] font-semibold rounded-[3px] transition-all duration-300 hover:brightness-110 uppercase tracking-wide"
            >
              More Information
            </a>
          </div>
        </div>

        {/* Stats Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#f8f9fa] border border-[#eeeeee] rounded-[4px] p-8 md:p-10 text-left transition-all duration-300 hover:shadow-card hover:-translate-y-1"
            >
              <div className="mb-2">
                <span className="text-[42px] font-bold font-sans text-text-main leading-tight">
                  {stat.value}
                </span>
              </div>
              <div>
                <span className="text-[18px] font-medium font-sans text-primary">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;