"use client";

import React from 'react';

/**
 * AboutContent Section Component
 * 
 * Clones the "Finding You Homes, Building Dreams — Right Here in Kochi" section
 * with a two-column responsive layout for body paragraphs.
 */
export default function AboutContent() {
  return (
    <section className="bg-white py-[80px] md:py-[100px] overflow-hidden">
      <div className="container mx-auto max-w-[1140px] px-5">
        <div className="flex flex-col gap-8 md:gap-12">
          
          {/* Section Heading - Responsive H2 with fade-in-up animation logic */}
          <div className="w-full max-w-[800px] animate-fade-in-up">
            <h2 className="font-serif text-[32px] md:text-[40px] font-semibold text-black leading-[1.2] mb-0 tracking-tight">
              Finding You Homes, Building Dreams — <br className="hidden md:block" />
              Right Here in Kochi
            </h2>
          </div>

          {/* Two-Column Body Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px] gap-y-8 md:gap-y-0 text-[#555555] font-sans text-[16px] leading-[1.8] animate-fade-in-up">
            
            {/* Left Column */}
            <div className="space-y-6">
              <p>
                At <em className="italic">Find Your Dream Home</em>, we&apos;re more than just a real estate service — we&apos;re a team driven by the vision to help individuals and families find their perfect space in Kochi. With deep roots in this vibrant city, we understand its neighborhoods, culture, and the evolving real estate landscape better than anyone else. Whether you&apos;re buying your first home, investing in a plot, or searching for a rental that fits your lifestyle, we&apos;re here to guide you with clarity and care.
              </p>
              
              <p>
                Our services are designed to simplify every step of your property journey. From buying, selling, and renting homes to handling construction projects and marketing real estate online, we provide end-to-end support under one roof. 
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <p>
                With a team of experienced professionals and a growing network of property listings, we bring transparency, expertise, and personal attention to every client we serve.
              </p>

              <p>
                What sets us apart is our commitment to relationships. We don&apos;t just deal with properties — we help build futures. At <em className="italic">Find Your Dream Home</em>, we believe that every home has a story, and we&apos;re proud to be part of yours. As Kochi continues to grow, we stand ready to be your trusted partner in making confident, rewarding real estate decisions.
              </p>
            </div>
            
          </div>
        </div>
      </div>

      <style jsx global>{`
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}