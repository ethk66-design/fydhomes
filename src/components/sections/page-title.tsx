import React from 'react';

const PageTitle = () => {
  return (
    <section className="bg-white pt-[70px] sm:pt-[90px]">
      <div className="container mx-auto max-w-[1170px] px-4 sm:px-[15px]">
        <div className="flex flex-col py-10 sm:py-[60px] md:py-[80px]">
          <div className="w-full">
            <div 
              className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both"
              style={{
                animationDuration: '1000ms',
                animationFillMode: 'both'
              }}
            >
              <h1 
                className="text-[#222222] font-display font-bold text-[32px] sm:text-[40px] md:text-[48px] m-0 p-0 leading-[1.2]"
                style={{
                  fontFamily: '"Roboto Slab", Serif',
                  fontWeight: 700,
                  color: '#222222',
                  lineHeight: '1.2'
                }}
              >
                Contact us
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageTitle;
