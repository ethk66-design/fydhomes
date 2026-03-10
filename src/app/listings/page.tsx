import { prisma } from "@/lib/db";
import { getSeoMetadata } from "@/lib/seo";
import SearchFilter from "@/components/sections/SearchFilter";
import ListingGrid from "@/components/sections/ListingGrid";
import { Suspense } from "react";
import { Prisma } from "@prisma/client";
import { Property } from "@/lib/types";
import { parsePrice, parseArea } from "@/lib/searchUtils";

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
    minPrice?: string;
    maxPrice?: string;
    beds?: string;
    baths?: string;
    minArea?: string;
    maxArea?: string;
  }>;
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const params = await searchParams;
  const keyword = params.keyword;
  const type = params.type;
  const area = params.area;
  const listing_type = params.listing_type;

  // New Advanced Filters
  const minPrice = params.minPrice ? parseFloat(params.minPrice) : null;
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : null;
  const bedsParam = params.beds ? parseInt(params.beds, 10) : null;
  const bathsParam = params.baths ? parseInt(params.baths, 10) : null;
  const minArea = params.minArea ? parseFloat(params.minArea) : null;
  const maxArea = params.maxArea ? parseFloat(params.maxArea) : null;

  // Build Prisma query filters
  const where: Prisma.PropertyWhereInput = {
    AND: [
      { status: 'active' } // Always only show active listings
    ]
  };

  const andConditions = where.AND as Prisma.PropertyWhereInput[];

  if (keyword) {
    const keywordCondition = { contains: keyword, mode: 'insensitive' as const };
    andConditions.push({
      OR: [
        { title: keywordCondition },
        { location: keywordCondition },
        { description: keywordCondition }
      ]
    });
  }

  let finalListingType = listing_type;
  let finalPropertyType = type;

  if (type === "Rent" || type === "Sale" || type === "rent" || type === "sale") {
    finalListingType = type;
    finalPropertyType = undefined;
  }

  if (finalPropertyType && finalPropertyType !== "Property Type") {
    andConditions.push({ type: finalPropertyType });
  }

  if (finalListingType) {
    const formattedListingType = finalListingType.charAt(0).toUpperCase() + finalListingType.slice(1).toLowerCase();
    andConditions.push({ listing_type: formattedListingType });
  }

  if (area && area !== "Area") {
    andConditions.push({
      location: { contains: area, mode: 'insensitive' as const }
    });
  }

  // Exact Integers can be Prisma queried safely
  if (bedsParam !== null && !isNaN(bedsParam)) {
    andConditions.push({ beds: { gte: bedsParam } });
  }
  if (bathsParam !== null && !isNaN(bathsParam)) {
    andConditions.push({ baths: { gte: bathsParam } });
  }

  // import { Property } from "@/lib/types"; // Removed nested import

  let properties: Property[] = [];
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
      take: 1000, // Maximized limit to ensure we grab all valid properties before string parsing math
    });

    const parsedProperties = rawProperties.map(p => {
      const numericPrice = parsePrice(p.price);
      const nArea1 = parseArea(p.area);
      const nArea2 = parseArea(p.land_area);
      const maxNumericArea = Math.max(nArea1 || 0, nArea2 || 0);
      const numericArea = maxNumericArea > 0 ? maxNumericArea : null;

      return {
        ...p,
        images: p.images.map(img => img.url),
        tags: p.tags.map(t => t.tag),
        created_at: p.created_at.toISOString(),
        updated_at: p.updated_at.toISOString(),
        _numericPrice: numericPrice,
        _numericArea: numericArea
      }
    });

    let filtered = parsedProperties;

    // Apply strict numeric boundary filters based on the parsed strings
    if (minPrice !== null && !isNaN(minPrice)) {
      filtered = filtered.filter(p => p._numericPrice !== null && p._numericPrice >= minPrice);
    }
    if (maxPrice !== null && !isNaN(maxPrice)) {
      filtered = filtered.filter(p => p._numericPrice !== null && p._numericPrice <= maxPrice);
    }
    if (minArea !== null && !isNaN(minArea)) {
      filtered = filtered.filter(p => p._numericArea !== null && p._numericArea >= minArea);
    }
    if (maxArea !== null && !isNaN(maxArea)) {
      filtered = filtered.filter(p => p._numericArea !== null && p._numericArea <= maxArea);
    }

    properties = filtered as unknown as Property[];
  } catch (error: unknown) {
    console.error("Error fetching properties:", error);
    // Return empty array or handle error UI
    // If it's a critical DB error, we might want to show it in dev/admin mode?
    // For now, let's return empty array but ensure we log it visibly.
    return (
      <main className="min-h-screen bg-white pb-12 sm:pb-20 pt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">System Error</h1>
          <p className="text-gray-600 mb-4">Unable to load properties. Please try again later.</p>
          {true && (
            <pre className="text-left bg-gray-100 p-4 rounded overflow-auto text-xs">
              {error instanceof Error ? error.message : 'Unknown error'}
              {JSON.stringify(error, null, 2)}
            </pre>
          )}
        </div>
      </main>
    );
  }

  const pageTitle = finalListingType
    ? `Properties for ${finalListingType.toLowerCase() === 'sale' ? 'Sale' : 'Rent'}`
    : "Property Listings";

  return (
    <main className="min-h-screen bg-white pb-12 sm:pb-20">
      <div className="h-[20px] sm:h-[40px] bg-[#f4f8fb]"></div>

      <div className="bg-[#f4f8fb] pt-4 sm:pt-6 pb-8 sm:pb-12">
        <div className="container mx-auto px-4 sm:px-5">
          <h1 className="text-center mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl font-bold text-black uppercase tracking-tight">
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
