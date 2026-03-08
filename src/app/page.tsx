import { Hero } from "@/components/sections/hero";
import { getSeoMetadata } from "@/lib/seo";

export const revalidate = 3600; // Revalidate every hour

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
  const heroBg = await getPageAsset('/', 'hero_bg', "https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/IMG_7368-758x564-2.jpg");
  const ctaBg = await getPageAsset('/', 'cta_bg', "/expert-guidance-bg.png");
  const newsletterBg = await getPageAsset('/', 'newsletter_bg', "https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-12-at-1_41_55-PM-758x564-28.jpeg");

  // Fetch Property Counts using Database Aggregation (High Performance)
  const typeGroups = await db.property.groupBy({
    by: ['type'],
    where: {
      status: { in: ['active', 'featured'] }
    },
    _count: true,
  });

  const rentCount = await db.property.count({
    where: {
      status: { in: ['active', 'featured'] },
      listing_type: 'Rent'
    }
  });

  // Helper to safely get count from groups
  const getCount = (typeName: string) =>
    typeGroups.find(g => g.type === typeName)?._count || 0;

  const counts = {
    villa: getCount('Villa'),
    residential: getCount('Residential'),
    plot: getCount('Plot'),
    commercial: getCount('Commercial'),
    office: getCount('Office'),
    rent: rentCount,
  };

  // Fetch Property Type Images
  const propertyTypeImages = {
    villa: await getPageAsset('/', 'property_type_villa', "https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg"),
    residential: await getPageAsset('/', 'property_type_residential', "https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg"),
    plot: await getPageAsset('/', 'property_type_plot', "https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg"),
    commercial: await getPageAsset('/', 'property_type_commercial', "https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg"),
    office: await getPageAsset('/', 'property_type_office', "https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg"),
    rent: await getPageAsset('/', 'property_type_rent', "https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg"),
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
      <Newsletter bgImage={newsletterBg} />
    </main>
  );
}
