import React from 'react';

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
    { label: 'Price', value: price, secondaryLabel: 'Rooms', secondaryValue: rooms.toString() },
    { label: 'Property Size', value: size, secondaryLabel: 'Garages', secondaryValue: garages.toString() },
    { label: 'Land Area', value: landArea, secondaryLabel: 'Property Status', secondaryValue: status },
    { label: 'Bedrooms', value: beds.toString(), secondaryLabel: 'Property Type', secondaryValue: propertyType },
    { label: 'Bathrooms', value: baths.toString(), secondaryLabel: '', secondaryValue: '' },
  ];

  return (
    <section className="py-[60px] bg-white">
      <div className="container mx-auto px-[20px] max-w-[1240px]">
        <div className="flex flex-col lg:flex-row gap-[30px]">
          {/* Section Header */}
          <div className="lg:w-1/3">
            <div className="section-marker relative pl-8 mb-[12px] flex items-center gap-[8px] text-[10px] font-bold uppercase tracking-[0.1em] text-[#00AEEF]">
              <span className="absolute left-0 w-3 h-3 border-2 border-[#00AEEF] rounded-full flex items-center justify-center">
                <span className="w-1 h-1 bg-[#00AEEF] rounded-full"></span>
              </span>
              Details
            </div>
            <h2 className="font-display text-[24px] font-normal leading-[1.3] text-[#000000]">
              Property Overview
            </h2>
          </div>

          {/* Table Container */}
          <div className="lg:w-2/3">
            <div className="bg-[#F7F8F9] p-[20px] rounded-[4px]">
              <div className="overflow-hidden">
                <table className="w-full border-collapse">
                  <tbody>
                    {propertyData.map((row, index) => (
                      <tr 
                        key={index} 
                        className="border-b border-[#EAEAEA] last:border-0"
                      >
                        {/* Primary Column Pair */}
                        <td className="py-[12px] px-[16px] w-1/4">
                          <span className="font-sans text-[13px] font-medium text-[#000000]">
                            {row.label}
                          </span>
                        </td>
                        <td className="py-[12px] px-[16px] text-right lg:text-left w-1/4">
                          <span className="font-sans text-[13px] text-[#666666]">
                            {row.value}
                          </span>
                        </td>

                        {/* Secondary Column Pair */}
                        <td className="py-[12px] px-[16px] w-1/4 hidden md:table-cell">
                          <span className="font-sans text-[13px] font-medium text-[#000000]">
                            {row.secondaryLabel}
                          </span>
                        </td>
                        <td className="py-[12px] px-[16px] text-right w-1/4 hidden md:table-cell">
                          <span className="font-sans text-[13px] text-[#666666]">
                            {row.secondaryValue}
                          </span>
                        </td>
                      </tr>
                    ))}
                    
                    {/* Mobile only layout for secondary values */}
                    <tr className="md:hidden border-b border-[#EAEAEA]">
                       <td className="py-[12px] px-[16px]"><span className="font-sans text-[13px] font-medium text-[#000000]">Rooms</span></td>
                       <td className="py-[12px] px-[16px] text-right"><span className="font-sans text-[13px] text-[#666666]">{rooms}</span></td>
                    </tr>
                    <tr className="md:hidden border-b border-[#EAEAEA]">
                       <td className="py-[12px] px-[16px]"><span className="font-sans text-[13px] font-medium text-[#000000]">Garages</span></td>
                       <td className="py-[12px] px-[16px] text-right"><span className="font-sans text-[13px] text-[#666666]">{garages}</span></td>
                    </tr>
                    <tr className="md:hidden border-b border-[#EAEAEA]">
                       <td className="py-[12px] px-[16px]"><span className="font-sans text-[13px] font-medium text-[#000000]">Property Status</span></td>
                       <td className="py-[12px] px-[16px] text-right"><span className="font-sans text-[13px] text-[#666666]">{status}</span></td>
                    </tr>
                    <tr className="md:hidden">
                       <td className="py-[12px] px-[16px]"><span className="font-sans text-[13px] font-medium text-[#000000]">Property Type</span></td>
                       <td className="py-[12px] px-[16px] text-right"><span className="font-sans text-[13px] text-[#666666]">{propertyType}</span></td>
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
