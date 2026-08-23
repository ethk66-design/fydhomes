import React from 'react';
import Link from 'next/link';
import ImageWithFallback from '@/components/ui/image-with-fallback';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-container bg-[#0F172A] pt-10 sm:pt-[60px] pb-0 font-sans border-t border-[#EAEAEA]">
      <div className="container mx-auto px-4 sm:px-5 max-w-[1200px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-10 sm:pb-[50px]">
          {/* LOGO & CONTACT COLUMN */}
          <div className="col-span-1 lg:col-span-1 text-center sm:text-left">
            <div className="footer-logo mb-6 flex justify-center sm:justify-start -mt-3 sm:-mt-5">
              <Link href="/">
                <ImageWithFallback
                  src="/assets/fyd-logo.png"
                  alt="Find Your Dream Home"
                  width={280}
                  height={100}
                  className="object-contain max-w-[200px] sm:max-w-[280px]"
                  unoptimized={true}
                />
              </Link>
            </div>

            {/* Mobile Contact Info */}
            <div className="text-center sm:text-left block sm:hidden">
              <h3 className="text-[13px] sm:text-[14px] font-[700] uppercase mb-3 sm:mb-6 text-white tracking-wider">Contact Us</h3>
              <div className="contact-details">
                <p className="text-[13px] sm:text-[14px] text-gray-300 mb-2 sm:mb-3 leading-relaxed">
                  +91 9778393991
                </p>
                <p className="text-[13px] sm:text-[14px] text-gray-300 mb-2 sm:mb-3 leading-relaxed">
                  info@fydhomes.com
                </p>
              </div>
            </div>
          </div>

          {/* QUICK LINKS COLUMN */}
          <div className="text-center sm:text-left">
            <h3 className="text-[13px] sm:text-[14px] font-[700] uppercase mb-4 sm:mb-6 text-white tracking-wider">Quick Links</h3>
            <ul className="list-none p-0 m-0 flex flex-col items-center sm:items-start">
              <li className="mb-2 sm:mb-3">
                <Link href="/" className="text-[13px] sm:text-[14px] text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li className="mb-2 sm:mb-3">
                <Link href="/about" className="text-[13px] sm:text-[14px] text-gray-300 hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li>
              <li className="mb-2 sm:mb-3">
                <Link href="/listings" className="text-[13px] sm:text-[14px] text-gray-300 hover:text-white transition-colors duration-200">
                  Listings
                </Link>
              </li>
              <li className="mb-2 sm:mb-3">
                <Link href="/contact" className="text-[13px] sm:text-[14px] text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL PROFILES COLUMN */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1 text-center sm:text-left">
            <h3 className="text-[13px] sm:text-[14px] font-[700] uppercase mb-4 sm:mb-6 text-white tracking-wider">Social Profiles</h3>
            <ul className="list-none p-0 m-0 flex sm:block justify-center gap-4 sm:gap-0">
              <li className="mb-2 sm:mb-3">
                <a
                  href="https://www.facebook.com/people/FIND-YOUR-DREAM-HOME/100077314248446/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] sm:text-[14px] text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-center sm:justify-start group"
                >
                  <span className="sm:hidden block p-2 bg-gray-100 rounded-full group-hover:bg-[#E3572D] group-hover:text-white transition-colors">
                    <Facebook size={18} />
                  </span>
                  <span className="hidden sm:inline">Facebook</span>
                </a>
              </li>
              <li className="mb-2 sm:mb-3">
                <a
                  href="https://www.instagram.com/findyourdreamhome_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] sm:text-[14px] text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-center sm:justify-start group"
                >
                  <span className="sm:hidden block p-2 bg-gray-100 rounded-full group-hover:bg-[#E3572D] group-hover:text-white transition-colors">
                    <Instagram size={18} />
                  </span>
                  <span className="hidden sm:inline">Instagram</span>
                </a>
              </li>
              <li className="mb-2 sm:mb-3">
                <a
                  href="https://www.youtube.com/@findyourdreamhome6667"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] sm:text-[14px] text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-center sm:justify-start group"
                >
                  <span className="sm:hidden block p-2 bg-gray-100 rounded-full group-hover:bg-[#E3572D] group-hover:text-white transition-colors">
                    <Youtube size={18} />
                  </span>
                  <span className="hidden sm:inline">Youtube</span>
                </a>
              </li>
            </ul>
          </div>

          {/* DESKTOP CONTACT COLUMN (Hidden on Mobile/Tablet) */}
          <div className="text-center sm:text-left hidden lg:block">
            <h3 className="text-[13px] sm:text-[14px] font-[700] uppercase mb-4 sm:mb-6 text-white tracking-wider">Contact Us</h3>
            <div className="contact-details">
              <p className="text-[13px] sm:text-[14px] text-gray-300 mb-2 sm:mb-3 leading-relaxed">
                Call us : +91 9778393991
              </p>
              <p className="text-[13px] sm:text-[14px] text-gray-300 mb-2 sm:mb-3 leading-relaxed">
                info@fydhomes.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sub-footer bg-[#0F172A] border-t border-white/10 py-4 sm:py-[25px]">
        <div className="container mx-auto px-4 sm:px-5 max-w-[1200px]">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pt-4 sm:pt-0">
            <div className="copyright text-[12px] sm:text-[13px] text-gray-400 text-center md:text-left font-medium">
              © FYD Media 2026 - All rights reserved
            </div>

            <div className="privacy-links flex flex-row items-center justify-center md:justify-end gap-3 sm:gap-4">
              <Link href="/privacy-policy" className="text-[12px] sm:text-[13px] text-gray-400 font-medium hover:text-[#E3572D] transition-colors">
                Privacy Policy
              </Link>
              <div className="h-3 w-[1px] bg-white/20"></div>
              <Link href="/terms-conditions" className="text-[12px] sm:text-[13px] text-gray-400 font-medium hover:text-[#E3572D] transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
