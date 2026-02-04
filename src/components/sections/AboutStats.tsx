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
        // Format number to match the original decimal places or integer
        // If value has decimal (like 16.4), show 1 decimal. Else 0.
        const isFloat = value % 1 !== 0;
        ref.current.textContent = latest.toFixed(isFloat ? 1 : 0) + suffix;
      }
    });
  }, [springValue, suffix, value]);

  return <span ref={ref} />;
};

/**
 * AboutStats component clones the "Your Trusted Real Estate Partner in Kochi" section
 * with a descriptive text block and three distinct stat cards.
 */
const AboutStats = () => {
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
    <section className="bg-white py-[80px] lg:py-[100px] overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1170px]">
        {/* Top Header & Text Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              {/* Small decorative circle icon common in this theme's section headers */}
              <div className="w-4 h-4 rounded-full border-2 border-primary/30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
              </div>
              <span className="text-[13px] uppercase tracking-wider text-text-meta font-bold">About Us</span>
            </div>
            <h2 className="text-[32px] md:text-[36px] font-semibold font-serif leading-[1.2] text-text-main max-w-md">
              Your Trusted Real Estate Partner in Kochi
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-[16px] leading-[1.8] text-text-body font-sans">
              At Find Your Dream Home, we help you buy, sell, rent, or build with confidence. From prime plots to luxury villas, our local expertise and personalized service make your real estate journey smooth and successful.
            </p>
            <a
              href="/about"
              className="inline-block bg-primary text-white px-[30px] py-[12px] text-[14px] font-semibold rounded-[3px] transition-transform duration-300 hover:-translate-y-1 hover:brightness-110 uppercase tracking-wide"
            >
              More Information
            </a>
          </motion.div>
        </div>

        {/* Stats Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-[#f8f9fa] border border-[#eeeeee] rounded-[4px] p-8 md:p-10 text-left transition-all duration-300 hover:shadow-card hover:-translate-y-1"
            >
              <div className="mb-2">
                <span className="text-[42px] font-bold font-sans text-text-main leading-tight">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
              </div>
              <div>
                <span className="text-[18px] font-medium font-sans text-primary">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;