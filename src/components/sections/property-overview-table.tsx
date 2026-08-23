import React from 'react';
import { formatPrice } from '@/lib/utils';

interface PropertyOverviewTableProps {
  price?: string;
  size?: string;
  landArea?: string;
  beds?: number;
  baths?: number;
  rooms?: number;
  garages?: number;
  status?: string;
  propertyType?: string;
}

const PropertyOverviewTable = ({
  price = "Price On Request",
  size = "N/A",
  landArea = "N/A",
  beds = 0,
  baths = 0,
  rooms = 0,
  garages = 0,
  status = "For Sale",
  propertyType = "Villa"
}: PropertyOverviewTableProps) => {
  const propertyData = [
    { label: 'Price', value: formatPrice(price), secondaryLabel: 'Property Size', secondaryValue: size },
    { label: 'Bedrooms', value: beds.toString(), secondaryLabel: 'Bathrooms', secondaryValue: baths.toString() },
    { label: 'Parking Spaces', value: garages.toString(), secondaryLabel: 'Property Type', secondaryValue: propertyType },
    { label: 'Land Area', value: landArea || 'N/A', secondaryLabel: 'Property Status', secondaryValue: status },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-[60px] bg-[#0A192F]">
      <div className="container mx-auto px-4 sm:px-[20px] max-w-[1240px]">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-[30px]">
          <div className="lg:w-1/3">
            <div className="section-marker relative pl-6 sm:pl-8 mb-2 sm:mb-[12px] flex items-center gap-[8px] text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
              <span className="absolute left-0 w-3 h-3 border-2 border-gray-400 rounded-full flex items-center justify-center">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              </span>
              Details
            </div>
            <h2 className="font-display text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[1.3] text-white">
              Property Overview
            </h2>
          </div>

          <div className="lg:w-2/3">
            <div className="bg-[#16243E] p-3 sm:p-4 md:p-[20px] rounded-[4px]">
              <div className="overflow-hidden">
                <table className="w-full border-collapse">
                  <tbody>
                    {propertyData.map((row, index) => (
                      <tr
                        key={index}
                        className="border-b border-white/10 last:border-0"
                      >
                        <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] w-1/4">
                          <span className="font-sans text-[12px] sm:text-[13px] font-medium text-white">
                            {row.label}
                          </span>
                        </td>
                        <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] text-right lg:text-left w-1/4">
                          <span className="font-sans text-[12px] sm:text-[13px] text-gray-400">
                            {row.value}
                          </span>
                        </td>

                        <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] w-1/4 hidden md:table-cell">
                          <span className="font-sans text-[12px] sm:text-[13px] font-medium text-white">
                            {row.secondaryLabel}
                          </span>
                        </td>
                        <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] text-right w-1/4 hidden md:table-cell">
                          <span className="font-sans text-[12px] sm:text-[13px] text-gray-400">
                            {row.secondaryValue}
                          </span>
                        </td>
                      </tr>
                    ))}

                    {/* Mobile Only: Restore hidden secondary columns */}
                    <tr className="md:hidden border-b border-white/10">
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px]"><span className="font-sans text-[12px] sm:text-[13px] font-medium text-white">Property Size</span></td>
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] text-right"><span className="font-sans text-[12px] sm:text-[13px] text-gray-400">{size}</span></td>
                    </tr>
                    <tr className="md:hidden border-b border-white/10">
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px]"><span className="font-sans text-[12px] sm:text-[13px] font-medium text-white">Bathrooms</span></td>
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] text-right"><span className="font-sans text-[12px] sm:text-[13px] text-gray-400">{baths}</span></td>
                    </tr>
                    <tr className="md:hidden border-b border-white/10">
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px]"><span className="font-sans text-[12px] sm:text-[13px] font-medium text-white">Property Type</span></td>
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] text-right"><span className="font-sans text-[12px] sm:text-[13px] text-gray-400">{propertyType}</span></td>
                    </tr>
                    <tr className="md:hidden border-b border-white/10">
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px]"><span className="font-sans text-[12px] sm:text-[13px] font-medium text-white">Property Status</span></td>
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] text-right"><span className="font-sans text-[12px] sm:text-[13px] text-gray-400">{status}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyOverviewTable;
