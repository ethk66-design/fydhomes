import React from 'react';
import { Check } from 'lucide-react';

interface PropertyAmenitiesProps {
    amenities: string[];
}

const PropertyAmenities = ({ amenities = [] }: PropertyAmenitiesProps) => {
    if (!amenities || amenities.length === 0) {
        return null;
    }

    return (
        <section className="py-6 sm:py-8 md:py-[40px] bg-white border-t border-[#EAEAEA]">
            <div className="container mx-auto px-4 sm:px-[20px] max-w-[1240px]">
                <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-[30px]">
                    <div className="md:w-1/3">
                        <div className="section-marker mb-2 sm:mb-[12px]">
                            <span className="text-[10px] font-bold tracking-[0.1em] text-[#00AEEF]">FEATURES</span>
                        </div>
                        <h2 className="font-display text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[1.3] text-[#000000] mb-4 sm:mb-[20px]">
                            Amenities
                        </h2>
                    </div>

                    <div className="md:w-2/3">
                        <div className="bg-[#F7F8F9] p-4 sm:p-6 md:p-[30px] rounded-[4px]">
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 sm:gap-y-4">
                                {amenities.map((amenity, index) => (
                                    <li key={index} className="flex items-center gap-2.5">
                                        <div className="w-5 h-5 rounded-full bg-white border border-[#EAEAEA] flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-[#00AEEF]" strokeWidth={2.5} />
                                        </div>
                                        <span className="text-[13px] sm:text-[14px] text-[#444444] font-medium">
                                            {amenity}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PropertyAmenities;
