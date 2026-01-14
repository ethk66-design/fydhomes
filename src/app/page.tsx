import { Hero } from "@/components/sections/Hero";
import { AboutPartner } from "@/components/sections/AboutPartner";
import { FeaturedForSale } from "@/components/sections/FeaturedForSale";
import { FeaturedForRent } from "@/components/sections/FeaturedForRent";
import { PropertyTypes } from "@/components/sections/PropertyTypes";
import { ExpertGuidance } from "@/components/sections/ExpertGuidance";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";

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
