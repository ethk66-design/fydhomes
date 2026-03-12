"use client";

import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { optimizeSupabaseUrl } from '@/components/ui/image-with-fallback';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image_url: string;
  content: string;
  rating: number;
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch('/api/testimonials');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (data) {
          setTestimonials(data);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      }
    }
    fetchTestimonials();
  }, []);

  return (
    <section className="py-8 sm:py-10 md:py-[40px] bg-white">
      <div className="container mx-auto max-w-[1170px] px-4 sm:px-5">
        <div className="mb-6 sm:mb-[30px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full border border-primary flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
            </div>
            <span className="uppercase text-[12px] sm:text-[14px] font-semibold tracking-[0.5px] text-primary">TESTIMONIALS</span>
          </div>
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-black leading-[1.3] mb-0">
            Client Testimonials: Trust <br className="hidden sm:block" />And Success
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-[30px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#F4F8FB] p-5 sm:p-[30px] rounded-[8px] border border-[#EEEEEE] transition-all duration-500 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between animate-fadeInUp"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div>
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#F9A825] text-[#F9A825]" />
                  ))}
                </div>
                <p className="text-[#5C5C5C] text-[13px] sm:text-[15px] leading-[1.6] italic mb-4 sm:mb-6">
                  &quot;{testimonial.content}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={testimonial.image_url ? optimizeSupabaseUrl(testimonial.image_url, 100, 75) : '/assets/placeholder-house.svg'}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = '/assets/placeholder-house.svg'; }}
                  />
                </div>
                <div>
                  <h3 className="text-black font-semibold text-[14px] sm:text-[16px] leading-[1.2]">
                    {testimonial.name}
                  </h3>
                  <p className="text-[#5C5C5C] text-[11px] sm:text-[13px] uppercase tracking-[0.2px]">
                    {testimonial.role}
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
