"use client";

import React from 'react';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Unnikrishnan",
      location: "INFOPARK",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop",
      quote: "It was honestly difficult to choose just one house—because they had such a wide collection! They patiently took us through every option, explaining details and helping us compare. Their hospitality was so warm and friendly, we felt like family. The entire journey was smooth and memorable.",
      rating: 5,
    },
    {
      name: "Sunil Mathew",
      location: "NRI",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop",
      quote: "We discovered them through social media and were truly impressed by their wide collection of budget-friendly and affordable homes. Choosing just one was tough because every house had something special! They patiently guided us through each visit, and their hospitality made us feels good",
      rating: 5,
    },
    {
      name: "Tirumali",
      location: "Rapper/Stage Artist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop",
      quote: "We got to know about them through their social media handle—and we're so glad we did! They took us along every step of the way, showed us multiple houses patiently until we found the one that felt just right. Even after the purchase, their support has been amazing. Truly a dream home experience!",
      rating: 5,
    },
  ];

  return (
    <section className="py-[80px] bg-white">
      <div className="container mx-auto max-w-[1170px] px-5">
        <div className="mb-[30px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full border border-primary flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
            </div>
              <span className="uppercase text-[14px] font-semibold tracking-[0.5px] text-primary">TESTIMONIALS</span>
            </div>
            <h2 className="font-sans text-[32px] font-bold text-black leading-[1.3] mb-0">
              Client Testimonials: Trust <br />And Success
            </h2>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-[#F4F8FB] p-[30px] rounded-[8px] border border-[#EEEEEE] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between"
            >
              <div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F9A825] text-[#F9A825]" />
                  ))}
                </div>
                <p className="text-[#5C5C5C] text-[15px] leading-[1.6] italic mb-6">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-300">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-black font-semibold text-[16px] leading-[1.2]">
                    {testimonial.name}
                  </h3>
                  <p className="text-[#5C5C5C] text-[13px] uppercase tracking-[0.2px]">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
