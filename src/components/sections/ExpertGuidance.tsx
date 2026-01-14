"use client";

import React from 'react';
import Image from 'next/image';

const ExpertGuidance = () => {
  // Asset provided in the prompt
  const backgroundImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_46_13-PM-758x564-27.jpeg";

  return (
    <section className="relative w-full py-[80px] md:py-[100px] overflow-hidden bg-white">
      <div className="container mx-auto px-5">
          <div className="relative w-full min-h-[450px] md:min-h-[550px] rounded-[10px] overflow-hidden shadow-2xl">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
              <Image
                src={backgroundImage}
                alt="Looking To Buy Or Sell? Get Expert Guidance Today!"
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Content Box */}
            <div className="relative z-10 h-full flex items-center px-6 md:px-16 py-12 md:py-20">
              <div className="bg-white p-8 md:p-14 max-w-[550px] rounded-[10px] shadow-xl animate-fadeInUp">
                <h2 className="font-sans text-[32px] md:text-[42px] font-bold leading-[1.1] text-[#1a1a1a] mb-6">
                  Looking To Buy Or Sell?<br />
                  Get Expert Guidance Today!
                </h2>
                
                <p className="font-sans text-[18px] leading-[1.5] text-[#4a4a4a] mb-10 max-w-[450px]">
                  Contact us now for a free consultation and let our team of experts guide you through the process.
                </p>
  
                <a 
                  href="/contact" 
                  className="inline-block bg-[#2b7489] hover:bg-[#236071] text-white font-sans text-[15px] font-bold uppercase tracking-[1px] px-10 py-4 rounded-[6px] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  CONTACT US
                </a>
              </div>
            </div>
          </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ExpertGuidance;