import React from 'react';

/**
 * CTABanner Component
 * 
 * A pixel-perfect clone of the "Looking To Buy Or Sell?" call-to-action banner.
 * Features a sunset background with a Chinese fishing net, a floating white card,
 * and a prominent red "CONTACT US" button.
 */
const CTABanner: React.FC = () => {
  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{
        marginTop: '60px',
        marginBottom: '60px'
      }}
    >
      <div className="container px-5 md:px-0">
        <div 
          className="relative w-full h-[450px] md:h-[500px] rounded-[8px] overflow-hidden bg-cover bg-center flex items-center"
          style={{
            // Using a placeholder that matches the visual description since specific asset wasn't provided in <assets>
            // The image features a sunset with a traditional Chinese fishing net
            backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1590050730103-600000a06ecb?auto=format&fit=crop&q=80&w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 60%'
          }}
        >
          {/* Content Card */}
          <div className="ml-0 md:ml-12 lg:ml-20 w-full md:w-auto px-4 md:px-0">
            <div 
              className="bg-white p-8 md:p-12 max-w-[450px] shadow-lg rounded-[4px]"
              style={{
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
              }}
            >
              <h2 
                className="font-sans text-[28px] md:text-[32px] font-bold leading-[1.2] text-black mb-4"
                style={{
                  letterSpacing: '-0.02em'
                }}
              >
                Looking To Buy Or Sell? <br className="hidden md:block" />
                Get Expert Guidance Today!
              </h2>
              
              <p 
                className="text-[#666666] text-[15px] leading-[1.6] mb-8"
              >
                Contact us now for a free consultation and let our team of experts guide you through the process.
              </p>
              
              <a 
                href="/contact"
                className="inline-block bg-[#D32F2F] text-white font-bold text-[13px] tracking-[0.1em] py-[14px] px-[28px] rounded-[4px] hover:opacity-90 transition-opacity uppercase"
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