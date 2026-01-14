import React from 'react';

const PropertyOverview = () => {
  const overviewItems = [
    { label: 'Price', value: '₹1.55 CR' },
    { label: 'Rooms', value: '5' },
    { label: 'Property Size', value: '2460 SQFT' },
    { label: 'Garages', value: '3' },
    { label: 'Land Area', value: '5.5 CENT' },
    { label: 'Property Status', value: 'For Sale' },
    { label: 'Bedrooms', value: '4' },
    { label: 'Property Type', value: 'Villa' },
    { label: 'Bathrooms', value: '4' },
  ];

  // Group items into pairs for the two-column layout
  // Matching the visual structure: 
  // Col 1: Price, Property Size, Land Area, Bedrooms, Bathrooms
  // Col 2: Rooms, Garages, Property Status, Property Type
  const column1 = [
    overviewItems[0], // Price
    overviewItems[2], // Property Size
    overviewItems[4], // Land Area
    overviewItems[6], // Bedrooms
    overviewItems[8], // Bathrooms
  ];

  const column2 = [
    overviewItems[1], // Rooms
    overviewItems[3], // Garages
    overviewItems[5], // Property Status
    overviewItems[7], // Property Type
  ];

  return (
    <section className="py-[60px] bg-white">
      <div className="container mx-auto max-w-[1170px] px-[15px]">
        <div className="flex flex-col lg:flex-row gap-[30px]">
          {/* Left Side: Section Title */}
          <div className="lg:w-1/3">
            <div className="section-label mb-[10px] flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border border-[var(--color-brand-blue)] flex items-center justify-center p-[2px]">
                <div className="w-full h-full rounded-full bg-[var(--color-brand-blue)]"></div>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#004274]">Details</span>
            </div>
            <h2 className="text-[24px] font-bold font-display text-black mb-[30px] lg:mb-0">
              Property Overview
            </h2>
          </div>

          {/* Right Side: Data Grid */}
          <div className="lg:w-2/3">
            <div className="bg-[#F8F9FA] p-[30px] rounded-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px]">
                {/* Column 1 */}
                <div className="flex flex-col">
                  {column1.map((item, index) => (
                    <div 
                      key={`col1-${index}`} 
                      className={`flex justify-between items-center py-[12px] border-b border-[#E5E5E5] last:border-b-0 md:last:border-b`}
                    >
                      <span className="text-[13px] text-[#666666] font-sans">
                        {item.label}
                      </span>
                      <span className="text-[13px] text-black font-semibold font-sans">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Column 2 */}
                <div className="flex flex-col">
                  {column2.map((item, index) => (
                    <div 
                      key={`col2-${index}`} 
                      className="flex justify-between items-center py-[12px] border-b border-[#E5E5E5] last:border-b-0"
                    >
                      <span className="text-[13px] text-[#666666] font-sans">
                        {item.label}
                      </span>
                      <span className="text-[13px] text-black font-semibold font-sans">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyOverview;