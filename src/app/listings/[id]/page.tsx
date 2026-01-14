import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import PropertyTitleSection from "@/components/sections/property-title-section";
import PropertyGallery from "@/components/sections/property-gallery";
import GeneralInformation from "@/components/sections/general-information";
import PropertyOverviewTable from "@/components/sections/property-overview-table";
import HighlightsVideo from "@/components/sections/highlights-video";
import CTABanner from "@/components/sections/cta-banner";
import SimilarListings from "@/components/sections/similar-listings";

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { id } = await params;

  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header Spacer (handled by sticky header in layout) */}
      <div className="h-[90px]"></div>

      <PropertyTitleSection 
        title={property.title}
        price={property.price}
        beds={property.beds}
        baths={property.baths}
        sqft={parseInt(property.area) || 0}
        parkings={property.parkings || 0}
        status={property.status || "For Sale"}
      />
      
      <PropertyGallery images={property.images} />
      
      <GeneralInformation 
        propertyType={property.property_type || "Villa"}
        beds={property.beds}
        baths={property.baths}
        sqft={parseInt(property.area) || 0}
        description={property.description}
        garages={property.parkings || 0}
      />
      
      <PropertyOverviewTable 
        price={property.price}
        size={property.area}
        beds={property.beds}
        baths={property.baths}
        status={property.status || "For Sale"}
        propertyType={property.property_type || "Villa"}
        garages={property.parkings || 0}
      />
      
      <HighlightsVideo />
      
      <CTABanner />
      
      <SimilarListings />
    </main>
  );
}
