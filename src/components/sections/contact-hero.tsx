import React from 'react';

const ContactHero = () => {
  return (
    <section className="bg-white">
      {/* 
        The overall design defines a boxed container of 1170px for the standard layout,
        but the styling options for the contact page header suggest a generous layout.
        The animation is described as 'fadeInUp' in the HTML structure.
      */}
      <div className="container mx-auto px-[15px] max-w-[1170px]">
        <div className="pt-[40px] pb-[40px] border-b border-[#e5e5e5]">
          <div className="flex flex-wrap">
            <div className="w-full">
              {/* 
                Animations are handled via Tailwind/tw-animate. 
                fadeInUp is the requested effect from the instructions and HTML data.
              */}
              <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out fill-mode-forwards">
                <h1
                  className="font-serif text-[42px] font-bold leading-[1.2] text-black m-0 p-0"
                >
                  Contact us
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;