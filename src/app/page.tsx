import { Hero } from "@/components/sections/hero";
import { getSeoMetadata } from "@/lib/seo";

export const revalidate = 0;

export async function generateMetadata() {
  return getSeoMetadata("/", "FYD Homes | Find Your Dream Home in Kochi", "Your Trusted Real Estate Partner in Kochi. Find beautiful villas, residential homes, and commercial spaces.");
}
import { AboutPartner } from "@/components/sections/AboutPartner";
import { FeaturedForSale } from "@/components/sections/FeaturedForSale";
import dynamic from 'next/dynamic';

const FeaturedForRent = dynamic(() => import("@/components/sections/FeaturedForRent").then(mod => mod.FeaturedForRent));
const PropertyTypes = dynamic(() => import("@/components/sections/PropertyTypes").then(mod => mod.PropertyTypes));
const ExpertGuidance = dynamic(() => import("@/components/sections/ExpertGuidance").then(mod => mod.ExpertGuidance));
const Testimonials = dynamic(() => import("@/components/sections/testimonials").then(mod => mod.Testimonials));
const Newsletter = dynamic(() => import("@/components/sections/newsletter").then(mod => mod.Newsletter));

import { getPageAsset } from "@/lib/assets";

import { db } from "@/lib/db";

export default async function Home() {
  const heroBg = await getPageAsset('/', 'hero_bg', "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG_7368-758x564-2.jpg");
  const ctaBg = await getPageAsset('/', 'cta_bg', "/expert-guidance-bg.png");

  // Fetch Property Counts
  const properties = await db.property.findMany({
    select: { type: true, listing_type: true, status: true }
  });

  const activeProperties = properties.filter(p => p.status === 'active' || p.status === 'featured');

  const counts = {
    villa: activeProperties.filter(p => p.type?.toLowerCase() === 'villa').length,
    residential: activeProperties.filter(p => p.type?.toLowerCase() === 'residential').length,
    plot: activeProperties.filter(p => p.type?.toLowerCase() === 'plot').length,
    commercial: activeProperties.filter(p => p.type?.toLowerCase() === 'commercial').length,
    office: activeProperties.filter(p => p.type?.toLowerCase() === 'office').length,
    rent: activeProperties.filter(p => p.listing_type?.toLowerCase() === 'rent').length,
  };

  // Fetch Property Type Images
  const propertyTypeImages = {
    villa: await getPageAsset('/', 'property_type_villa', "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg"),
    residential: await getPageAsset('/', 'property_type_residential', "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg"),
    plot: await getPageAsset('/', 'property_type_plot', "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg"),
    commercial: await getPageAsset('/', 'property_type_commercial', "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg"),
    office: await getPageAsset('/', 'property_type_office', "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg"),
    rent: await getPageAsset('/', 'property_type_rent', "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg"),
  };

  return (
    <main className="min-h-screen bg-white">
      <Hero bgImage={heroBg} />
      <AboutPartner />
      <FeaturedForSale />
      <FeaturedForRent />
      <PropertyTypes images={propertyTypeImages} counts={counts} />
      <ExpertGuidance bgImage={ctaBg} />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
