import React from 'react';
import AboutHero from '@/components/sections/about-hero';
import MissionStatement from '@/components/sections/mission-statement';
import WhyChooseUs from '@/components/sections/why-choose-us';
import TeamGrid from '@/components/sections/team-grid';
import CTAConsultation from '@/components/sections/cta-consultation';
import FAQAccordion from '@/components/sections/faq-accordion';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-[70px] sm:pt-[90px]">
      <AboutHero />
      <MissionStatement />
      <WhyChooseUs />
      <TeamGrid />
      <CTAConsultation />
      <FAQAccordion />
    </main>
  );
}
