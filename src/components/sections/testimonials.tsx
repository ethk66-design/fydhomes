import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: `"It was honestly difficult to choose just one house—because they had such a wide collection! They patiently took us through every option, explaining details and helping us compare. Their hospitality was so warm and friendly, we felt like family. The entire journey was smooth and memorable."`,
    name: "Unnikrishnan",
    role: "INFOPARK",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/icons/WhatsApp-Image-2025-07-16-at-11_03_39-PM-1-1.jpeg"
  },
  {
    id: 2,
    rating: 5,
    text: `"We discovered them through social media and were truly impressed by their wide collection of budget-friendly and affordable homes. Choosing just one was tough because every house had something special! They patiently guided us through each visit, and their hospitality made us feels good"`,
    name: "Sunil Mathew",
    role: "NRI",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/icons/WhatsApp-Image-2025-07-16-at-11_03_39-PM-2-2.jpeg"
  },
  {
    id: 3,
    rating: 5,
    text: `"We got to know about them through their social media handle—and we're so glad we did! They took us along every step of the way, showed us multiple houses patiently until we found the one that felt just right. Even after the purchase, their support has been amazing. Truly a dream home experience!"`,
    name: "Tirumali",
    role: "Rapper/Stage Artist",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/icons/WhatsApp-Image-2025-07-16-at-11_03_39-PM-3.jpeg"
  }
];

export default function Testimonials() {
  return (
    <section className="bg-white py-[80px]">
      <div className="container mx-auto px-[15px] max-w-[1230px]">
        {/* Section Title */}
        <div className="mb-[40px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full border border-teal flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-teal"></div>
            </div>
            <span className="text-teal text-[14px] font-medium tracking-wide uppercase">
              Testimonials
            </span>
          </div>
          <h2 className="text-[#1A1A1A] text-[32px] font-bold font-serif leading-[1.3]">
            Client Testimonials: Trust <br /> And Success
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-[#F4F7F8] p-[30px] rounded-[10px] flex flex-col h-full"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-[20px]">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill="#FFB100" 
                    color="#FFB100" 
                  />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-[#1A1A1A] text-[16px] leading-[1.6] mb-[30px] flex-grow italic">
                {testimonial.text}
              </p>

              {/* Profile */}
              <div className="flex items-center gap-[15px] mt-auto">
                <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full border-2 border-white shadow-sm">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#1A1A1A] font-bold text-[16px]">
                    {testimonial.name}
                  </span>
                  <span className="text-teal text-[13px] font-medium uppercase tracking-tight">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}