import React from 'react';
import Image from 'next/image';

const ExpertGuidance = () => {
  // Asset provided in the prompt
  const backgroundImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_46_13-PM-758x564-27.jpeg";

  return (
    <section className="relative w-full py-[80px] md:py-[100px] overflow-hidden bg-white">
      <div className="container mx-auto px-5">
        <div className="relative w-full min-h-[400px] md:min-h-[500px] rounded-lg overflow-hidden shadow-lg">
          {/* Background Image Container */}
          <div className="absolute inset-0 z-0">
            <Image
              src={backgroundImage}
              alt="Looking To Buy Or Sell? Get Expert Guidance Today!"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Overlay to ensure text readability if needed, though screenshot shows clean background */}
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Content Box */}
          <div className="relative z-10 h-full flex items-center px-6 md:px-12 py-10 md:py-0">
            <div className="bg-white/95 md:bg-white p-8 md:p-12 max-w-[500px] rounded-sm shadow-card animate-fadeInUp">
              <h2 className="font-serif text-[28px] md:text-[32px] font-bold leading-[1.2] text-black mb-4">
                Looking To Buy Or Sell? <br />
                Get Expert Guidance Today!
              </h2>
              
              <p className="font-sans text-[16px] leading-[1.6] text-[#5c5c5c] mb-8">
                Contact us now for a free consultation and let our team of experts guide you through the process.
              </p>

              <a 
                href="/contact" 
                className="inline-block bg-[#2D7A8C] hover:bg-[#2D7A8C]/90 text-white font-sans text-[14px] font-semibold uppercase tracking-[0.5px] px-8 py-4 rounded-[4px] transition-all duration-200"
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