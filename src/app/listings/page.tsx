import { supabase } from "@/lib/supabase";
import PropertyCard from "@/components/PropertyCard";
import SearchFilter from "@/components/sections/SearchFilter";
import { Suspense } from "react";
import Link from "next/link";

export const revalidate = 0;

interface ListingsPageProps {
  searchParams: {
    keyword?: string;
    type?: string;
    area?: string;
    listing_type?: string;
  };
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const params = await searchParams;
  const keyword = params.keyword;
  const type = params.type;
  const area = params.area;
  const listing_type = params.listing_type;

  let query = supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (keyword) {
    query = query.ilike("title", `%${keyword}%`);
  }

  // Handle both type and listing_type
  let finalListingType = listing_type;
  let finalPropertyType = type;

  // If type is "Rent" or "Sale", it's actually a listing type
  if (type === "Rent" || type === "Sale" || type === "rent" || type === "sale") {
    finalListingType = type;
    finalPropertyType = undefined;
  }
  
  if (finalPropertyType && finalPropertyType !== "Property Type") {
    query = query.eq("type", finalPropertyType);
  }
  
  if (finalListingType) {
    // Standardize to Title Case for DB match (Sale/Rent)
    const formattedListingType = finalListingType.charAt(0).toUpperCase() + finalListingType.slice(1).toLowerCase();
    query = query.eq("listing_type", formattedListingType);
  }

  if (area && area !== "Area") {
    query = query.ilike("location", `%${area}%`);
  }

  const { data: properties, error } = await query;

  if (error) {
    console.error("Error fetching properties:", error);
  }

  const pageTitle = finalListingType 
    ? `Properties for ${finalListingType.toLowerCase() === 'sale' ? 'Sale' : 'Rent'}`
    : "Property Listings";

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Header Spacer */}
      <div className="h-[80px] bg-[#f4f8fb]"></div>
      
      {/* Search Section */}
      <div className="bg-[#f4f8fb] pt-12 pb-24">
        <div className="container mx-auto">
          <h1 className="text-center mb-12 text-4xl font-bold font-serif text-black uppercase tracking-tight">
            {pageTitle}
          </h1>
          <Suspense fallback={<div>Loading filters...</div>}>
            <SearchFilter />
          </Suspense>
        </div>
      </div>

      {/* Grid Section */}
      <div className="container mx-auto mt-20 px-5">
        <div className="flex items-center justify-between mb-10 border-b border-[#eeeeee] pb-4">
          <p className="text-[#5c5c5c] font-medium">
            Showing <span className="text-black font-bold">{properties?.length || 0}</span> properties
            {(keyword || type || area || listing_type) && (
              <span className="ml-2 text-xs uppercase tracking-widest text-[#2d7a8c]"> (Filtered)</span>
            )}
          </p>
        </div>

        {properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#f4f8fb] rounded-lg border-2 border-dashed border-[#eeeeee]">
            <h3 className="text-[#5c5c5c] font-medium">No properties match your search criteria.</h3>
            <Link 
              href="/listings"
              className="mt-4 inline-block text-[#2d7a8c] font-bold uppercase text-xs tracking-widest hover:underline"
            >
              Clear all filters
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
