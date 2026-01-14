import React from 'react';
import { Bed, Bath, Car, Maximize } from 'lucide-react';

interface GeneralInformationProps {
  propertyType?: string;
  beds?: number;
  baths?: number;
  garages?: number;
  sqft?: number;
  description?: string;
}

const GeneralInformation = ({
  propertyType = "Villa",
  beds = 0,
  baths = 0,
  garages = 0,
  sqft = 0,
  description = ""
}: GeneralInformationProps) => {
  return (
    <section className="py-[60px] bg-white">
      <div className="container mx-auto px-[20px] max-w-[1200px]">
        <div className="flex flex-col md:flex-row gap-[30px]">
          {/* Left Column: Title */}
          <div className="md:w-1/3">
            <div className="section-marker mb-[12px]">
              <span className="text-[10px] font-bold tracking-[0.1em] text-[#00AEEF]">PROPERTY</span>
            </div>
            <h2 className="font-display text-[24px] font-normal leading-[1.3] text-[#000000] mb-[20px]">
              General Information
            </h2>
          </div>

          {/* Right Column: Key Details Grid and Description */}
          <div className="md:w-2/3">
            {/* Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-[30px] gap-x-[20px] mb-[40px]">
              {/* Property Type */}
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-[#000000]">{propertyType}</span>
                <span className="text-[12px] text-[#666666] tracking-tight">Property Type</span>
              </div>

              {/* Bedrooms */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Bed className="w-[18px] h-[18px] text-[#666666]" strokeWidth={1.5} />
                  <span className="text-[15px] font-bold text-[#000000]">{beds}</span>
                </div>
                <span className="text-[12px] text-[#666666] tracking-tight ml-[26px]">Bedrooms</span>
              </div>

              {/* Bathrooms */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Bath className="w-[18px] h-[18px] text-[#666666]" strokeWidth={1.5} />
                  <span className="text-[15px] font-bold text-[#000000]">{baths}</span>
                </div>
                <span className="text-[12px] text-[#666666] tracking-tight ml-[26px]">Bathrooms</span>
              </div>

              {/* Garages */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Car className="w-[18px] h-[18px] text-[#666666]" strokeWidth={1.5} />
                  <span className="text-[15px] font-bold text-[#000000]">{garages}</span>
                </div>
                <span className="text-[12px] text-[#666666] tracking-tight ml-[26px]">Garages</span>
              </div>

              {/* SQFT */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Maximize className="w-[18px] h-[18px] text-[#666666]" strokeWidth={1.5} />
                  <span className="text-[15px] font-bold text-[#000000]">{sqft}</span>
                </div>
                <span className="text-[12px] text-[#666666] tracking-tight ml-[26px]">SQFT</span>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-8 border-t border-[#EAEAEA] pt-[30px]">
              <h3 className="text-[16px] font-bold text-[#000000] mb-[15px]">Description</h3>
              <div className="text-[15px] leading-[1.6] text-[#666666] space-y-4">
                <p className="whitespace-pre-line">
                  {description || "No description available for this property."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneralInformation;
