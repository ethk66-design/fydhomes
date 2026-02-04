"use client";

import { motion } from "framer-motion";
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/lib/types";
import Link from "next/link";

interface ListingGridProps {
    properties: Property[];
    keyword?: string;
    type?: string;
    area?: string;
    listing_type?: string;
}

export default function ListingGrid({ properties, keyword, type, area, listing_type }: ListingGridProps) {
    return (
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
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
                >
                    {properties.map((property) => (
                        <motion.div
                            key={property.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                            }}
                        >
                            <PropertyCard property={property} />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 sm:py-20 bg-[#f4f8fb] rounded-lg border-2 border-dashed border-[#eeeeee]"
                >
                    <h3 className="text-[#5c5c5c] font-medium text-sm sm:text-base">No properties match your search criteria.</h3>
                    <Link
                        href="/listings"
                        className="mt-4 inline-block text-[#2d7a8c] font-bold uppercase text-xs tracking-widest hover:underline"
                    >
                        Clear all filters
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
