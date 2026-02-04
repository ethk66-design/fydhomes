"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

/**
 * AnimatedCounter component to count up numbers
 */
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 400 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        const isFloat = value % 1 !== 0;
        ref.current.textContent = latest.toFixed(isFloat ? 1 : 0) + suffix;
      }
    });
  }, [springValue, suffix, value]);

  return <span ref={ref} />;
};

export function AboutPartner() {
  const stats = [
    {
      value: 295,
      suffix: "K+",
      label: "Instagram Followers",
    },
    {
      value: 16.4,
      suffix: "k+",
      label: "Youtube Subscribers",
    },
    {
      value: 500,
      suffix: "+",
      label: "Total Customers",
    },
  ];

  return (
    <section className="py-8 sm:py-10 md:py-[40px] bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-5 max-w-[1170px]">
        <div className="flex flex-col lg:flex-row justify-between mb-10 sm:mb-16 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-[#2b7489]">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-dot"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="1" />
                </svg>
              </span>
              <span className="uppercase text-[11px] sm:text-[12px] font-bold tracking-widest text-[#2b7489]">
                About Us
              </span>
            </div>
            <h2 className="text-[26px] sm:text-[32px] md:text-[40px] leading-[1.2] font-bold text-black max-w-[450px]">
              Your Trusted Real Estate Business In Kochi
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-[45%] flex flex-col items-start lg:mt-6"
          >
            <p className="text-[#5c5c5c] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.6] mb-6 sm:mb-8 text-left">
              At Find Your Dream Home, we help you buy, sell, rent, or build with
              confidence. From prime plots to luxury villas, our local expertise
              and personalized service make your real estate journey smooth and
              successful.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/about"
              className="bg-[#205c6d] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-[4px] text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.5px] hover:bg-[#1a4b59] transition-colors"
            >
              More Information
            </motion.a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-[#f4f8fb] rounded-[10px] py-8 sm:py-11 px-6 sm:px-9 flex flex-col items-start hover:shadow-md transition-all"
            >
              <span className="text-[32px] sm:text-[44px] font-bold text-black mb-1 leading-none tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-[#2b7489] font-semibold text-[15px] sm:text-[17px]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutPartner;
