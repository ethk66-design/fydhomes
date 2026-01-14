import React from 'react';
import Image from 'next/image';

/**
 * Footer Component
 * 
 * Multi-column footer containing:
 * - Logo & Tagline (Find Your Dream Home)
 * - Quick Links
 * - Social Profiles
 * - Contact Us details
 * - Bottom Bar (Copyright & Legal)
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#e6e6e6] pt-[60px] pb-0 font-sans">
      <div className="container mx-auto max-w-[1170px] px-[15px]">
        {/* Top Section - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] mb-[60px]">
          
          {/* Column 1: Branding */}
            <div className="flex flex-col items-start">
              <div className="mb-4">
                <a href="/" className="inline-block">
                  <Image 
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/FYD-LOGO-ICONS-01-scaled-2.png" 
                    alt="Find Your Dream Home" 
                    width={200} 
                    height={80} 
                    className="object-contain"
                    style={{ height: 'auto', width: 'auto', maxWidth: '180px' }}
                  />
                </a>
              </div>
            </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display text-[18px] font-semibold text-[#222222] mb-[25px]">
              Quick Links
            </h3>
            <ul className="space-y-[12px]">
              <li>
                <a href="/" className="text-[14px] text-[#777777] hover:text-[#1db345] transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-[14px] text-[#777777] hover:text-[#1db345] transition-colors duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="/listings" className="text-[14px] text-[#777777] hover:text-[#1db345] transition-colors duration-300">
                  Listings
                </a>
              </li>
              <li>
                <a href="/contact" className="text-[14px] text-[#777777] hover:text-[#1db345] transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Profiles */}
          <div>
            <h3 className="font-display text-[18px] font-semibold text-[#222222] mb-[25px]">
              Social Profiles
            </h3>
            <ul className="space-y-[12px]">
              <li>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[14px] text-[#777777] hover:text-[#1db345] transition-colors duration-300"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/findyourdreamhome_/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[14px] text-[#777777] hover:text-[#1db345] transition-colors duration-300"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://www.youtube.com/@findyourdreamhome6667" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[14px] text-[#777777] hover:text-[#1db345] transition-colors duration-300"
                >
                  Youtube
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="font-display text-[18px] font-semibold text-[#222222] mb-[25px]">
              Contact Us
            </h3>
            <div className="space-y-[12px]">
              <p className="text-[14px] text-[#777777] m-0">
                Call us : <a href="tel:+919544593991" className="text-[#222222] hover:text-[#1db345] transition-colors">+91 9544593991</a>
              </p>
              <p className="text-[14px] text-[#777777] m-0">
                <a href="mailto:info@fydhomes.in" className="text-[#222222] hover:text-[#1db345] transition-colors">info@fydhomes.in</a>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#e6e6e6] py-[20px]">
        <div className="container mx-auto max-w-[1170px] px-[15px] flex flex-col md:flex-row justify-between items-center text-[13px] text-[#777777]">
          <div className="mb-4 md:mb-0">
            © FYD Media {currentYear} - All rights reserved
          </div>
          <div className="flex items-center space-x-[20px]">
            <a href="#" className="hover:text-[#1db345] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#1db345] transition-colors">Terms & Conditions</a>
            <span className="flex items-center gap-2">
              Need Help? <span className="font-semibold text-[#222222]">Chat with us</span>
            </span>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/919544593991" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-[20px] right-[20px] w-[50px] h-[50px] bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-[100] hover:scale-105 transition-transform"
      >
        <svg 
          viewBox="0 0 448 512" 
          width="24" 
          height="24" 
          fill="currentColor"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.3 2.5-2.4 5.5-6.4 8.3-9.6 2.8-3.2 3.7-5.5 5.5-9.1 1.9-3.7 1-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.7 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>
    </footer>
  );
}