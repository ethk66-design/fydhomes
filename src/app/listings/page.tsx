import { prisma } from "@/lib/db";
import { getSeoMetadata } from "@/lib/seo";
import PropertyCard from "@/components/PropertyCard";
import SearchFilter from "@/components/sections/SearchFilter";
import ListingGrid from "@/components/sections/ListingGrid";
import { Suspense } from "react";
import Link from "next/link";

export async function generateMetadata() {
  return getSeoMetadata("/listings", "Property Listings | FYD Homes", "Explore our wide range of properties for sale and rent in Kochi and surrounding areas.");
}

// Force dynamic rendering - never cache this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ListingsPageProps {
  searchParams: Promise<{
    keyword?: string;
    type?: string;
    area?: string;
    listing_type?: string;
  }>;
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const params = await searchParams;
  const keyword = params.keyword;
  const type = params.type;
  const area = params.area;
  const listing_type = params.listing_type;

  // Build Prisma query filters
  const where: any = {};

  if (keyword) {
    where.title = { contains: keyword };
  }

  let finalListingType = listing_type;
  let finalPropertyType = type;

  if (type === "Rent" || type === "Sale" || type === "rent" || type === "sale") {
    finalListingType = type;
    finalPropertyType = undefined;
  }

  if (finalPropertyType && finalPropertyType !== "Property Type") {
    where.type = finalPropertyType;
  }

  if (finalListingType) {
    const formattedListingType = finalListingType.charAt(0).toUpperCase() + finalListingType.slice(1).toLowerCase();
    where.listing_type = formattedListingType;
  }

  if (area && area !== "Area") {
    where.location = { contains: area };
  }

  let properties: any[] = [];
  try {
    const rawProperties = await prisma.property.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        tags: true,
      },
    });

    properties = rawProperties.map(p => ({
      ...p,
      images: p.images.map(img => img.url),
      tags: p.tags.map(t => t.tag),
    }));
  } catch (error) {
    console.error("Error fetching properties:", error);
  }

  const pageTitle = finalListingType
    ? `Properties for ${finalListingType.toLowerCase() === 'sale' ? 'Sale' : 'Rent'}`
    : "Property Listings";

  return (
    <main className="min-h-screen bg-white pb-12 sm:pb-20">
      <div className="h-[60px] sm:h-[80px] bg-[#f4f8fb]"></div>

      <div className="bg-[#f4f8fb] pt-8 sm:pt-12 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-5">
          <h1 className="text-center mb-8 sm:mb-12 text-2xl sm:text-3xl md:text-4xl font-bold text-black uppercase tracking-tight">
            {pageTitle}
          </h1>
          <Suspense fallback={<div className="text-center">Loading filters...</div>}>
            <SearchFilter />
          </Suspense>
        </div>
      </div>

      <ListingGrid
        properties={properties || []}
        keyword={keyword}
        type={type}
        area={area}
        listing_type={listing_type}
      />
    </main>
  );
}
