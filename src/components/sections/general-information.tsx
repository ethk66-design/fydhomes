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
    <section className="py-8 sm:py-12 md:py-[60px] bg-white">
      <div className="container mx-auto px-4 sm:px-[20px] max-w-[1200px]">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-[30px]">
          <div className="md:w-1/3">
            <div className="section-marker mb-2 sm:mb-[12px]">
              <span className="text-[10px] font-bold tracking-[0.1em] text-[#00AEEF]">PROPERTY</span>
            </div>
            <h2 className="font-display text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[1.3] text-[#000000] mb-4 sm:mb-[20px]">
              General Information
            </h2>
          </div>

          <div className="md:w-2/3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 sm:gap-y-[30px] gap-x-4 sm:gap-x-[20px] mb-6 sm:mb-[40px]">
              <div className="flex flex-col">
                <span className="text-[14px] sm:text-[15px] font-bold text-[#000000]">{propertyType}</span>
                <span className="text-[11px] sm:text-[12px] text-[#666666] tracking-tight">Property Type</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Bed className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#666666]" strokeWidth={1.5} />
                  <span className="text-[14px] sm:text-[15px] font-bold text-[#000000]">{beds}</span>
                </div>
                <span className="text-[11px] sm:text-[12px] text-[#666666] tracking-tight ml-[22px] sm:ml-[26px]">Bedrooms</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Bath className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#666666]" strokeWidth={1.5} />
                  <span className="text-[14px] sm:text-[15px] font-bold text-[#000000]">{baths}</span>
                </div>
                <span className="text-[11px] sm:text-[12px] text-[#666666] tracking-tight ml-[22px] sm:ml-[26px]">Bathrooms</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Car className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#666666]" strokeWidth={1.5} />
                  <span className="text-[14px] sm:text-[15px] font-bold text-[#000000]">{garages}</span>
                </div>
                <span className="text-[11px] sm:text-[12px] text-[#666666] tracking-tight ml-[22px] sm:ml-[26px]">Garages</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Maximize className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#666666]" strokeWidth={1.5} />
                  <span className="text-[14px] sm:text-[15px] font-bold text-[#000000]">{sqft}</span>
                </div>
                <span className="text-[11px] sm:text-[12px] text-[#666666] tracking-tight ml-[22px] sm:ml-[26px]">SQFT</span>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 border-t border-[#EAEAEA] pt-6 sm:pt-[30px]">
              <h3 className="text-[14px] sm:text-[16px] font-bold text-[#000000] mb-3 sm:mb-[15px]">Description</h3>
              <div className="text-[13px] sm:text-[15px] leading-[1.6] text-[#666666] space-y-4">
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
