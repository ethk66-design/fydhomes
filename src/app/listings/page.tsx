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

  let finalListingType = listing_type;
  let finalPropertyType = type;

  if (type === "Rent" || type === "Sale" || type === "rent" || type === "sale") {
    finalListingType = type;
    finalPropertyType = undefined;
  }
  
  if (finalPropertyType && finalPropertyType !== "Property Type") {
    query = query.eq("type", finalPropertyType);
  }
  
  if (finalListingType) {
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
    <main className="min-h-screen bg-white pb-12 sm:pb-20">
      <div className="h-[60px] sm:h-[80px] bg-[#f4f8fb]"></div>
      
      <div className="bg-[#f4f8fb] pt-8 sm:pt-12 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-5">
          <h1 className="text-center mb-8 sm:mb-12 text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-black uppercase tracking-tight">
            {pageTitle}
          </h1>
          <Suspense fallback={<div className="text-center">Loading filters...</div>}>
            <SearchFilter />
          </Suspense>
        </div>
      </div>

      <div className="container mx-auto mt-10 sm:mt-16 md:mt-20 px-4 sm:px-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-10 border-b border-[#eeeeee] pb-4 gap-2">
          <p className="text-[#5c5c5c] font-medium text-sm sm:text-base">
            Showing <span className="text-black font-bold">{properties?.length || 0}</span> properties
            {(keyword || type || area || listing_type) && (
              <span className="ml-2 text-xs uppercase tracking-widest text-[#2d7a8c]"> (Filtered)</span>
            )}
          </p>
        </div>

        {properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-20 bg-[#f4f8fb] rounded-lg border-2 border-dashed border-[#eeeeee]">
            <h3 className="text-[#5c5c5c] font-medium text-sm sm:text-base">No properties match your search criteria.</h3>
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
