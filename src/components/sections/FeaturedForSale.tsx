"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Property } from '@/lib/types';
import PropertyCard from '@/components/PropertyCard';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

export function FeaturedForSale() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch('/api/properties?listing_type=Sale&status=featured&limit=4');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProperties(data || []);
      } catch (err) {
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  return (
    <section className="bg-white py-8 sm:py-10 md:py-[40px] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-5 lg:px-[15px] max-w-[1170px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full border border-[#2D7A8C] flex items-center justify-center p-[2px]">
                <div className="w-full h-full rounded-full bg-[#2D7A8C]"></div>
              </div>
              <span className="text-[11px] sm:text-[12px] font-semibold text-[#2D7A8C] uppercase tracking-wider">Properties</span>
            </div>
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-black leading-tight">
              Featured For Sale
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/listings?type=sale"
              className="text-[12px] font-bold text-[#2D7A8C] uppercase tracking-wider hover:underline mr-4"
            >
              View All
            </Link>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7.5"
          >
            {properties.length > 0 ? (
              properties.map((property) => (
                <motion.div
                  key={property.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-[#5c5c5c]">
                No properties available for sale at the moment.
              </div>
            )}
          </motion.div>
        )}

        <div className="flex md:hidden justify-center mt-6 sm:mt-8">
          <Link
            href="/listings?type=sale"
            className="bg-[#205c6d] text-white px-6 sm:px-8 py-3 rounded-sm text-[12px] sm:text-[13px] font-bold uppercase tracking-wider"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
