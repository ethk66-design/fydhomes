import React from 'react';

const PageTitle = ({ bgImage }: { bgImage?: string }) => {
  return (
    <section className="relative overflow-hidden pt-[70px] sm:pt-[90px]">
      {bgImage && (
        <div className="absolute inset-0">
          <img src={bgImage} alt="Page Title Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      <div className="relative z-10 container mx-auto max-w-[1170px] px-4 sm:px-[15px]">
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
                className="text-[#222222] font-bold text-[32px] sm:text-[40px] md:text-[48px] m-0 p-0 leading-[1.2]"
                style={{
                  fontWeight: 700,
                  color: bgImage ? '#ffffff' : '#222222',
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
