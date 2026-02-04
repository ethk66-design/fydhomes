import React from 'react';
import { getSeoMetadata } from "@/lib/seo";

export const revalidate = 0;

export async function generateMetadata() {
  return getSeoMetadata("/about", "About Us | FYD Homes", "Learn more about FYD Homes, our mission, vision, and the team behind your dream home.");
}

import AboutHero from '@/components/sections/about-hero';
import MissionStatement from '@/components/sections/mission-statement';
import WhyChooseUs from '@/components/sections/why-choose-us';
import TeamGrid from '@/components/sections/team-grid';
import CTAConsultation from '@/components/sections/cta-consultation';
import FAQAccordion from '@/components/sections/faq-accordion';

import { getPageAsset } from "@/lib/assets";

export default async function AboutPage() {
  const heroBg = await getPageAsset('/about', 'hero_bg', "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/ChatGPT-Image-Aug-9-2025-11_24_54-AM-11.png");

  return (
    <main className="min-h-screen bg-white pt-[70px] sm:pt-[90px]">
      <AboutHero heroImage={heroBg} />
      <MissionStatement />
      <WhyChooseUs />
      <TeamGrid />
      <CTAConsultation />
      <FAQAccordion />
    </main>
  );
}
