import { Hero } from "@/components/sections/hero";
import { AboutPartner } from "@/components/sections/AboutPartner";
import { FeaturedForSale } from "@/components/sections/FeaturedForSale";
import { FeaturedForRent } from "@/components/sections/FeaturedForRent";
import { PropertyTypes } from "@/components/sections/PropertyTypes";
import { ExpertGuidance } from "@/components/sections/ExpertGuidance";
import { Testimonials } from "@/components/sections/testimonials";
import { Newsletter } from "@/components/sections/newsletter";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <AboutPartner />
      <FeaturedForSale />
      <FeaturedForRent />
      <PropertyTypes />
      <ExpertGuidance />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
