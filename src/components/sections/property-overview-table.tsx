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
    <section className="py-8 sm:py-12 md:py-[60px] bg-white">
      <div className="container mx-auto px-4 sm:px-[20px] max-w-[1240px]">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-[30px]">
          <div className="lg:w-1/3">
            <div className="section-marker relative pl-6 sm:pl-8 mb-2 sm:mb-[12px] flex items-center gap-[8px] text-[10px] font-bold uppercase tracking-[0.1em] text-[#00AEEF]">
              <span className="absolute left-0 w-3 h-3 border-2 border-[#00AEEF] rounded-full flex items-center justify-center">
                <span className="w-1 h-1 bg-[#00AEEF] rounded-full"></span>
              </span>
              Details
            </div>
            <h2 className="font-display text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[1.3] text-[#000000]">
              Property Overview
            </h2>
          </div>

          <div className="lg:w-2/3">
            <div className="bg-[#F7F8F9] p-3 sm:p-4 md:p-[20px] rounded-[4px]">
              <div className="overflow-hidden">
                <table className="w-full border-collapse">
                  <tbody>
                    {propertyData.map((row, index) => (
                      <tr
                        key={index}
                        className="border-b border-[#EAEAEA] last:border-0"
                      >
                        <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] w-1/4">
                          <span className="font-sans text-[12px] sm:text-[13px] font-medium text-[#000000]">
                            {row.label}
                          </span>
                        </td>
                        <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] text-right lg:text-left w-1/4">
                          <span className="font-sans text-[12px] sm:text-[13px] text-[#666666]">
                            {row.value}
                          </span>
                        </td>

                        <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] w-1/4 hidden md:table-cell">
                          <span className="font-sans text-[12px] sm:text-[13px] font-medium text-[#000000]">
                            {row.secondaryLabel}
                          </span>
                        </td>
                        <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] text-right w-1/4 hidden md:table-cell">
                          <span className="font-sans text-[12px] sm:text-[13px] text-[#666666]">
                            {row.secondaryValue}
                          </span>
                        </td>
                      </tr>
                    ))}

                    <tr className="md:hidden border-b border-[#EAEAEA]">
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px]"><span className="font-sans text-[12px] sm:text-[13px] font-medium text-[#000000]">Rooms</span></td>
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] text-right"><span className="font-sans text-[12px] sm:text-[13px] text-[#666666]">{rooms}</span></td>
                    </tr>
                    <tr className="md:hidden border-b border-[#EAEAEA]">
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px]"><span className="font-sans text-[12px] sm:text-[13px] font-medium text-[#000000]">Garages</span></td>
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] text-right"><span className="font-sans text-[12px] sm:text-[13px] text-[#666666]">{garages}</span></td>
                    </tr>
                    <tr className="md:hidden border-b border-[#EAEAEA]">
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px]"><span className="font-sans text-[12px] sm:text-[13px] font-medium text-[#000000]">Property Status</span></td>
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] text-right"><span className="font-sans text-[12px] sm:text-[13px] text-[#666666]">{status}</span></td>
                    </tr>
                    <tr className="md:hidden">
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px]"><span className="font-sans text-[12px] sm:text-[13px] font-medium text-[#000000]">Property Type</span></td>
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] text-right"><span className="font-sans text-[12px] sm:text-[13px] text-[#666666]">{propertyType}</span></td>
                    </tr>
                    <tr className="md:hidden border-b border-[#EAEAEA]">
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px]"><span className="font-sans text-[12px] sm:text-[13px] font-medium text-[#000000]">Land Area</span></td>
                      <td className="py-2.5 sm:py-[12px] px-2 sm:px-[16px] text-right"><span className="font-sans text-[12px] sm:text-[13px] text-[#666666]">{landArea || 'N/A'}</span></td>
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
