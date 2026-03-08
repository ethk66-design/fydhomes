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
  const heroBg = await getPageAsset('/about', 'hero_bg', "https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/ChatGPT-Image-Aug-9-2025-11_24_54-AM-11.png");

  // Fetch Team Agent Images
  const agent1 = await getPageAsset('/about', 'about_team_agent_1', "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
  const agent2 = await getPageAsset('/about', 'about_team_agent_2', "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
  const agent3 = await getPageAsset('/about', 'about_team_agent_3', "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
  const agent4 = await getPageAsset('/about', 'about_team_agent_4', "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
  const teamImages = [agent1, agent2, agent3, agent4];

  // Fetch Feature Thumbnail Images
  const feature1 = await getPageAsset('/about', 'about_feature_img_1', "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80");
  const feature2 = await getPageAsset('/about', 'about_feature_img_2', "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80");
  const feature3 = await getPageAsset('/about', 'about_feature_img_3', "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80");
  const featureImages = [feature1, feature2, feature3];

  return (
    <main className="min-h-screen bg-white pt-[70px] sm:pt-[90px]">
      <AboutHero heroImage={heroBg} />
      <MissionStatement />
      <WhyChooseUs featureImages={featureImages} />
      <TeamGrid agentImages={teamImages} />
      <CTAConsultation />
      <FAQAccordion />
    </main>
  );
}
