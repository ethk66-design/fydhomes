import React from 'react';

/**
 * CTA Consultation Section
 * 
 * DESIGN INSTRUCTIONS:
 * Clone the call-to-action section titled "Looking To Buy Or Sell?" 
 * with text encouraging expert guidance and a "CONTACT US" cyan button.
 */
const CTAConsultation: React.FC = () => {
  return (
    <section 
      className="bg-white py-[80px] md:py-[100px]"
      aria-labelledby="cta-heading"
    >
      <div className="container mx-auto px-[15px] max-w-[1230px]">
        <div className="flex flex-col items-start max-w-[500px]">
          {/* Section Main Title */}
          <h2 
            id="cta-heading"
            className="font-serif text-[32px] md:text-[40px] font-bold text-[#1A1A1A] leading-[1.2] mb-[20px]"
          >
            Looking To Buy Or Sell?<br />
            Get Expert Guidance Today!
          </h2>

          {/* Section Subtext */}
          <p className="font-sans text-[16px] leading-[1.6] text-[#1A1A1A] mb-[30px]">
            Contact us now for a free consultation and let our team of experts guide you through the process.
          </p>

          {/* CTA Button */}
          <a 
            href="https://fydhomes.in/contact/"
            className="inline-flex items-center justify-center bg-[#2B7387] hover:bg-[#235d6e] text-white font-sans text-[14px] font-bold tracking-[0.5px] uppercase py-[12px] px-[25px] rounded-[4px] transition-colors duration-300 shadow-sm"
          >
            CONTACT US
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTAConsultation;