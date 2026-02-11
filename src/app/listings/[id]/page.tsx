import { prisma } from "@/lib/db";
import { stripHtml } from "@/lib/utils";
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

// Enable Incremental Static Regeneration (ISR)
export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  // Return empty array to make pages dynamic (no static pre-generation)
  // This avoids database connection during build time on Hostinger
  return [];
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: 'asc' } },
    },
  });

  if (!property) return {};

  const title = property.meta_title || `${property.title} | FYD Homes`;
  const description = property.meta_description || stripHtml(property.description)?.slice(0, 160) || "View property details";
  const image = property.images && property.images.length > 0 ? property.images[0].url : null;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: 'asc' } },
      tags: true,
    },
  });

  if (!property) {
    notFound();
  }

  const propertyData = {
    ...property,
    images: property.images.map(img => img.url),
    tags: property.tags.map(t => t.tag),
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header Spacer (handled by sticky header in layout) */}
      <div className="h-[90px]"></div>

      <PropertyTitleSection
        title={propertyData.title}
        price={propertyData.price || undefined}
        beds={propertyData.beds || 0}
        baths={propertyData.baths || 0}
        sqft={parseInt(propertyData.area || '0') || 0}
        parkings={propertyData.parkings || 0}
        status={propertyData.status || "For Sale"}
        landArea={propertyData.land_area}
      />

      <PropertyGallery images={propertyData.images} propertyTitle={propertyData.title} />

      <GeneralInformation
        propertyType={propertyData.type || "Villa"}
        beds={propertyData.beds || 0}
        baths={propertyData.baths || 0}
        sqft={parseInt(propertyData.area || '0') || 0}
        description={propertyData.description || undefined}
        garages={propertyData.parkings || 0}
        landArea={propertyData.land_area || undefined}
      />

      <PropertyOverviewTable
        price={propertyData.price || undefined}
        size={propertyData.area || undefined}
        beds={propertyData.beds || undefined}
        baths={propertyData.baths || undefined}
        status={propertyData.status || "For Sale"}
        propertyType={propertyData.type || "Villa"}
        garages={propertyData.parkings || 0}
        landArea={propertyData.land_area || undefined}
      />

      <HighlightsVideo videoUrl={propertyData.youtube_video} />

      <CTABanner />

      <SimilarListings />
    </main>
  );
}
