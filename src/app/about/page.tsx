import React from 'react';
import AboutHero from '@/components/sections/about-hero';
import AboutContent from '@/components/sections/about-content';
import WhyChooseUs from '@/components/sections/why-choose-us';
import OurTeam from '@/components/sections/our-team';
import CTABanner from '@/components/sections/cta-banner';
import FAQSection from '@/components/sections/faq';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <AboutContent />
      <WhyChooseUs />
      <OurTeam />
      <CTABanner />
      <FAQSection />
    </main>
  );
}
