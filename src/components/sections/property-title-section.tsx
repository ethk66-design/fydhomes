"use client"

import React, { useState, useEffect } from 'react';
import { Heart, Share2, Printer, BedDouble, Bath, Car, Scaling, Facebook, Linkedin, Twitter, Mail, Trees } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PropertyTitleSectionProps {
  title?: string;
  price?: string;
  beds?: number;
  baths?: number;
  parkings?: number;
  sqft?: number;
  status?: string;
  isNegotiable?: boolean;
  landArea?: string | null;
}

const PropertyTitleSection = ({
  title = "Property Title",
  price = "Price On Request",
  beds = 0,
  baths = 0,
  parkings = 0,
  sqft = 0,
  status = "For Sale",
  isNegotiable: _isNegotiable = false,
  landArea = null
}: PropertyTitleSectionProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      // Check local storage for liked state
      // Simple implementation: storing liked IDs in a JSON array
      const likedProperties = JSON.parse(localStorage.getItem('liked_properties') || '[]');
      // Assuming 'title' is unique enough for this demo, or we should have passed an ID.
      // Using title as a fallback key for now as ID isn't in props, but ideally should be ID.
      setIsLiked(likedProperties.includes(title));
    }
  }, [title]);

  const handlePrint = () => {
    window.print();
  };

  const toggleLike = () => {
    const newState = !isLiked;
    setIsLiked(newState);

    const likedProperties = JSON.parse(localStorage.getItem('liked_properties') || '[]');
    if (newState) {
      if (!likedProperties.includes(title)) likedProperties.push(title);
      toast.success('Added to favorites');
    } else {
      const index = likedProperties.indexOf(title);
      if (index > -1) likedProperties.splice(index, 1);
      toast.info('Removed from favorites');
    }
    localStorage.setItem('liked_properties', JSON.stringify(likedProperties));
  };

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`Check out this property: ${title} - ${currentUrl}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`,
    email: `mailto:?subject=${encodeURIComponent(`Check out this property: ${title}`)}&body=${encodeURIComponent(`I found this amazing property and wanted to share it with you: ${currentUrl}`)}`
  };
  return (
    <section className="bg-white">
      <div className="container mx-auto max-w-[1240px] px-4 sm:px-5 pt-6 sm:pt-10 pb-4 sm:pb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 sm:gap-6">
          <div className="flex-1">
            <h1 className="text-[22px] sm:text-[26px] md:text-[32px] font-bold leading-[1.2] text-[#000000] mb-3 sm:mb-5 tracking-[-0.02em]">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <BedDouble className="text-[#666666] w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[12px] sm:text-[13px] font-medium text-[#666666] tracking-wide">{beds}</span>
                <span className="text-[12px] sm:text-[13px] font-medium text-[#666666] uppercase">Beds</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Bath className="text-[#666666] w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[12px] sm:text-[13px] font-medium text-[#666666] tracking-wide">{baths}</span>
                <span className="text-[12px] sm:text-[13px] font-medium text-[#666666] uppercase">Baths</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Car className="text-[#666666] w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[12px] sm:text-[13px] font-medium text-[#666666] tracking-wide">{parkings}</span>
                <span className="text-[12px] sm:text-[13px] font-medium text-[#666666] uppercase">Parkings</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Scaling className="text-[#666666] w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[12px] sm:text-[13px] font-medium text-[#666666] tracking-wide">{sqft}</span>
                <span className="text-[12px] sm:text-[13px] font-medium text-[#666666] uppercase">SQFT</span>
              </div>
              {landArea && (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Trees className="text-[#666666] w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-[12px] sm:text-[13px] font-medium text-[#666666] tracking-wide">{landArea}</span>
                  <span className="text-[12px] sm:text-[13px] font-medium text-[#666666] uppercase">Land</span>
                </div>
              )}
            </div>

            <div className="mb-4">
              <span className="inline-block bg-[#303030] text-white text-[10px] sm:text-[11px] font-bold uppercase px-2.5 sm:px-3 py-1 rounded-[2px] tracking-wider">
                {status}
              </span>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start shrink-0 gap-4">
            <div className="flex flex-col items-end">
              <div className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-[#000000] md:mb-1">
                {formatPrice(price)}
              </div>
            </div>

            <div className="flex items-center gap-1 print:hidden">
              <button
                onClick={toggleLike}
                className="w-8 h-8 flex items-center justify-center border border-[#EAEAEA] rounded-[2px] transition-colors hover:bg-gray-50 group"
                title={isLiked ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`w-4 h-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-[#000000] group-hover:text-red-500'}`} />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative group">
                    <button className="w-8 h-8 flex items-center justify-center border border-[#EAEAEA] rounded-[2px] transition-colors hover:bg-gray-50" aria-label="Share property">
                      <Share2 className="w-4 h-4 text-[#000000]" />
                    </button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-[#222222] text-white border-none">
                  <DropdownMenuItem asChild className="focus:bg-[#333333] focus:text-white cursor-pointer">
                    <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      {/* WhatsApp Icon (using inline SVG as it's not standard in this Lucide version) */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                      WhatsApp
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-[#333333] focus:text-white cursor-pointer">
                    <a href="https://pinterest.com/pin/create/button/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      {/* Pinterest (using inline SVG) */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 14.5c2.5 3.3 2.5 8.8 0 11.5" /><path d="M12 22v-8.3" /><path d="M8 8a4 4 0 1 1 8 0" /></svg>
                      Pinterest
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-[#333333] focus:text-white cursor-pointer">
                    <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-[#333333] focus:text-white cursor-pointer">
                    <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-[#333333] focus:text-white cursor-pointer">
                    <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      Linkedin
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-[#333333] focus:text-white cursor-pointer">
                    <a href={shareLinks.email} className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                onClick={handlePrint}
                className="w-8 h-8 flex items-center justify-center border border-[#EAEAEA] rounded-[2px] transition-colors hover:bg-gray-50"
                title="Print this page"
              >
                <Printer className="w-4 h-4 text-[#000000]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          nav, footer, .print\\:hidden {
            display: none !important;
          }
          body {
            background: white !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PropertyTitleSection;
