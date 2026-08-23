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
import { getPropertyCounts, getFeaturedProperties } from "@/lib/queries";
import { Property } from "@/lib/types";
import { prisma } from "@/lib/db";

export default async function Home() {
  const heroSlidesData = await prisma.heroSlide.findMany({ orderBy: { order: 'asc' } });
  const heroSlides = heroSlidesData.length > 0 ? heroSlidesData.map((s: any) => s.image_url) : undefined;

  const [
    ctaBg,
    newsletterBg,
    { typeGroups, rentCount },
    featuredSale,
    featuredRent,
    propertyTypeImages
  ] = await Promise.all([
    getPageAsset('/', 'cta_bg', "/expert-guidance-bg.png"),
    getPageAsset('/', 'newsletter_bg', "https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-12-at-1_41_55-PM-758x564-28.jpeg"),
    getPropertyCounts(),
    getFeaturedProperties('Sale'),
    getFeaturedProperties('Rent'),
    Promise.all([
      getPageAsset('/', 'property_type_villa', "https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg"),
      getPageAsset('/', 'property_type_residential', "https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg"),
      getPageAsset('/', 'property_type_plot', "https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg"),
      getPageAsset('/', 'property_type_commercial', "https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg"),
      getPageAsset('/', 'property_type_office', "https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-1-758x564-11.jpeg"),
      getPageAsset('/', 'property_type_rent', "https://vexsmxrfxbatpyelugch.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/WhatsApp-Image-2025-12-26-at-12_45_58-PM-758x564-12.jpeg"),
    ]).then(([villa, residential, plot, commercial, office, rent]) => ({
      villa, residential, plot, commercial, office, rent
    }))
  ]);

  // Helper to safely get count from groups
  const getCount = (typeName: string) =>
    (typeGroups as { type: string | null; _count: number }[]).find(g => g.type === typeName)?._count || 0;

  const counts = {
    villa: getCount('Villa'),
    residential: getCount('Residential'),
    plot: getCount('Plot'),
    commercial: getCount('Commercial'),
    office: getCount('Office'),
    rent: rentCount,
  };

  return (
    <main className="min-h-screen">
      <Hero slides={heroSlides} />
      <AboutPartner />
      <FeaturedForSale initialProperties={featuredSale as Property[]} />
      <FeaturedForRent initialProperties={featuredRent as Property[]} />
      <PropertyTypes images={propertyTypeImages} counts={counts} />
      <ExpertGuidance bgImage="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" />
      <Testimonials />
      <Newsletter bgImage={newsletterBg} />
    </main>
  );
}
