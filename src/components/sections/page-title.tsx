"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

const PageTitle = ({ bgImage }: { bgImage?: string }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.color = bgImage ? '#ffffff' : '#222222';
    }
  }, [bgImage]);

  return (
    <section className="relative overflow-hidden pt-[70px] sm:pt-[90px]">
      {bgImage && (
        <div className="absolute inset-0">
          <Image src={bgImage} alt="Page Title Background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      <div className="relative z-10 container mx-auto max-w-[1170px] px-4 sm:px-[15px]">
        <div className="flex flex-col py-10 sm:py-[60px] md:py-[80px]">
          <div className="w-full">
            <div
              className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-both"
            >
              <h1
                ref={titleRef}
                className="text-[#222222] font-bold text-[32px] sm:text-[40px] md:text-[48px] m-0 p-0 leading-[1.2]"
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
