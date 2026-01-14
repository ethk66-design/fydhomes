import React from 'react';
import { Heart, Share2, Printer } from 'lucide-react';

interface PropertyTitleSectionProps {
  title?: string;
  price?: string;
  beds?: number;
  baths?: number;
  parkings?: number;
  sqft?: number;
  status?: string;
}

const PropertyTitleSection = ({
  title = "Property Title",
  price = "Price On Request",
  beds = 0,
  baths = 0,
  parkings = 0,
  sqft = 0,
  status = "For Sale"
}: PropertyTitleSectionProps) => {
  return (
    <section className="bg-white">
      <div className="container mx-auto max-w-[1240px] px-5 pt-10 pb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          {/* Left Column: Title and Meta */}
          <div className="flex-1">
            <h1 className="text-[32px] font-bold leading-[1.2] text-[#000000] mb-5 tracking-[-0.02em] font-sans">
              {title}
            </h1>
            
            {/* Meta Icons Row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6">
              <div className="flex items-center gap-2">
                <i className="houzez-icon icon-hotel-double-bed-1 text-[#666666] text-lg"></i>
                <span className="text-[13px] font-medium text-[#666666] tracking-wide">{beds}</span>
                <span className="text-[13px] font-medium text-[#666666] uppercase">Beds</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="houzez-icon icon-bathroom-shower-1 text-[#666666] text-lg"></i>
                <span className="text-[13px] font-medium text-[#666666] tracking-wide">{baths}</span>
                <span className="text-[13px] font-medium text-[#666666] uppercase">Baths</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="houzez-icon icon-car-1 text-[#666666] text-lg"></i>
                <span className="text-[13px] font-medium text-[#666666] tracking-wide">{parkings}</span>
                <span className="text-[13px] font-medium text-[#666666] uppercase">Parkings</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="houzez-icon icon-real-estate-dimensions-plan-1 text-[#666666] text-lg"></i>
                <span className="text-[13px] font-medium text-[#666666] tracking-wide">{sqft}</span>
                <span className="text-[13px] font-medium text-[#666666] uppercase">SQFT</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <span className="inline-block bg-[#303030] text-white text-[11px] font-bold uppercase px-3 py-1 rounded-[2px] tracking-wider">
                {status}
              </span>
            </div>
          </div>

          {/* Right Column: Price and Tools */}
          <div className="flex flex-col items-start md:items-end shrink-0">
            <div className="text-[28px] font-bold text-[#000000] mb-6 font-sans">
              {price}
            </div>

            {/* Action Tools */}
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center border border-[#EAEAEA] rounded-[2px] transition-colors hover:bg-gray-50 group">
                <Heart className="w-4 h-4 text-[#000000] group-hover:text-accent" />
              </button>
              
              <div className="relative group">
                <button className="w-8 h-8 flex items-center justify-center border border-[#EAEAEA] rounded-[2px] transition-colors hover:bg-gray-50">
                  <Share2 className="w-4 h-4 text-[#000000]" />
                </button>
              </div>

              <button className="w-8 h-8 flex items-center justify-center border border-[#EAEAEA] rounded-[2px] transition-colors hover:bg-gray-50">
                <Printer className="w-4 h-4 text-[#000000]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @font-face {
          font-family: 'houzez-icon';
          src: url('https://fydhomes.in/wp-content/themes/houzez/fonts/houzez-icon.ttf') format('truetype');
        }
        .houzez-icon {
          font-family: 'houzez-icon' !important;
          font-style: normal;
          font-weight: normal;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
        }
        .icon-hotel-double-bed-1:before { content: "\\e987"; }
        .icon-bathroom-shower-1:before { content: "\\e91e"; }
        .icon-car-1:before { content: "\\e937"; }
        .icon-real-estate-dimensions-plan-1:before { content: "\\e9bc"; }
      `}} />
    </section>
  );
};

export default PropertyTitleSection;
