import React from 'react';
import { supabase } from "@/lib/supabase";
import PropertyCard from "@/components/PropertyCard";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export async function FeaturedForRent() {
  const { data: properties, error } = await supabase
    .from("properties")
    .select("*")
    .eq("listing_type", "rent")
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    console.error("Error fetching featured rent properties:", error);
  }

  return (
    <section className="bg-white py-[80px]">
      <div className="container mx-auto px-5 lg:px-[15px] max-w-[1170px]">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full border border-[#2D7A8C] flex items-center justify-center p-[2px]">
                <div className="w-full h-full rounded-full bg-[#2D7A8C]"></div>
              </div>
              <span className="text-[12px] font-semibold text-[#2D7A8C] uppercase tracking-wider">Properties</span>
            </div>
            <h2 className="text-[32px] font-bold font-sans text-black leading-tight">
              Featured For Rent
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link 
              href="/listings?type=rent"
              className="text-[12px] font-bold text-[#2D7A8C] uppercase tracking-wider hover:underline mr-4"
            >
              View All
            </Link>
            <button className="w-10 h-10 flex items-center justify-center border border-[#EEEEEE] text-[#5C5C5C] hover:bg-[#F4F8FB] transition-colors rounded-sm">
              <ChevronLeft size={18} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-[#EEEEEE] text-[#5C5C5C] hover:bg-[#F4F8FB] transition-colors rounded-sm">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7.5">
          {properties && properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-[#5c5c5c]">
              No properties available for rent at the moment.
            </div>
          )}
        </div>

        <div className="flex md:hidden justify-center mt-8">
           <Link 
              href="/listings?type=rent"
              className="bg-[#205c6d] text-white px-8 py-3 rounded-sm text-[13px] font-bold uppercase tracking-wider"
            >
              View All Properties
            </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedForRent;
