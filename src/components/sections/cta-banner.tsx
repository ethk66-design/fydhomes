import React from 'react';

const CTABanner: React.FC = () => {
  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{
        marginTop: '40px',
        marginBottom: '40px'
      }}
    >
      <div className="container mx-auto px-4 sm:px-5 md:px-0">
        <div 
          className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-[8px] overflow-hidden bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1590050730103-600000a06ecb?auto=format&fit=crop&q=80&w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 60%'
          }}
        >
          <div className="ml-0 md:ml-8 lg:ml-12 xl:ml-20 w-full md:w-auto px-4 md:px-0">
            <div 
              className="bg-white p-5 sm:p-6 md:p-8 lg:p-12 w-full sm:max-w-[400px] md:max-w-[420px] lg:max-w-[450px] shadow-lg rounded-[4px]"
              style={{
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
              }}
            >
              <h2 
                className="font-sans text-[22px] sm:text-[26px] md:text-[28px] lg:text-[32px] font-bold leading-[1.2] text-black mb-3 sm:mb-4"
                style={{
                  letterSpacing: '-0.02em'
                }}
              >
                Looking To Buy Or Sell? <br className="hidden sm:block" />
                Get Expert Guidance Today!
              </h2>
              
              <p 
                className="text-[#666666] text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6] mb-5 sm:mb-6 md:mb-8"
              >
                Contact us now for a free consultation and let our team of experts guide you through the process.
              </p>
              
              <a 
                href="/contact"
                className="inline-block bg-[#D32F2F] text-white font-bold text-[12px] sm:text-[13px] tracking-[0.1em] py-3 sm:py-[14px] px-5 sm:px-[28px] rounded-[4px] hover:opacity-90 transition-opacity uppercase"
              >
                CONTACT US
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
