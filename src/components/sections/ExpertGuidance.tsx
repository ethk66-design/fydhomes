import React from 'react';
import Image from 'next/image';

export function ExpertGuidance() {
  const backgroundImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_46_13-PM-758x564-27.jpeg";

  return (
    <section className="relative w-full py-12 sm:py-16 md:py-[80px] lg:py-[100px] overflow-hidden bg-white">
      <div className="container mx-auto px-4 sm:px-5">
          <div className="relative w-full min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[550px] rounded-[10px] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 z-0">
              <Image
                src={backgroundImage}
                alt="Looking To Buy Or Sell? Get Expert Guidance Today!"
                fill
                className="object-cover object-center"
                priority
              />
            </div>

              <div className="relative z-10 h-full flex items-center px-4 sm:px-6 md:px-16 py-8 sm:py-10 md:py-12 lg:py-20">
                <div className="bg-white p-5 sm:p-6 md:p-8 lg:p-14 w-full sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] rounded-[10px] shadow-xl animate-in fade-in slide-in-from-bottom-5 duration-700">
                  <h2 className="font-sans text-[24px] sm:text-[28px] md:text-[32px] lg:text-[42px] font-bold leading-[1.1] text-[#1a1a1a] mb-4 sm:mb-6">

                  Looking To Buy Or Sell?<br />
                  Get Expert Guidance Today!
                </h2>
                
                <p className="font-sans text-[14px] sm:text-[16px] md:text-[18px] leading-[1.5] text-[#4a4a4a] mb-6 sm:mb-8 md:mb-10 max-w-[450px]">
                  Contact us now for a free consultation and let our team of experts guide you through the process.
                </p>
  
                <a 
                  href="/contact" 
                  className="inline-block bg-[#2b7489] hover:bg-[#236071] text-white font-sans text-[13px] sm:text-[14px] md:text-[15px] font-bold uppercase tracking-[1px] px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-[6px] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  CONTACT US
                </a>
              </div>
              </div>
            </div>
        </div>
      </section>
    );
  }
