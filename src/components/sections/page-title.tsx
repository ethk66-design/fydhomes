import React from 'react';

const PageTitle = () => {
  return (
    <section className="bg-white pt-[60px] pb-[60px] md:pt-[80px] md:pb-[40px]">
      <div className="container mx-auto max-w-[1140px] px-[15px]">
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="animate-in fade-in-up duration-700 slide-in-from-bottom-5">
              <h1 className="font-serif text-[32px] md:text-[42px] font-bold text-black leading-[1.2] mb-0">
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