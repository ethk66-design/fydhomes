import React from 'react';
import Link from 'next/link';
import ImageWithFallback from '@/components/ui/image-with-fallback';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] pt-12 sm:pt-16 pb-0 font-sans border-t border-[#EAEAEA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        {/* Main Footer Wrap */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10 lg:gap-8 pb-12">

          {/* LOGO & BRAND DESCRIPTION */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link href="/" className="mb-6 block">
              <ImageWithFallback
                src="/assets/fyd-logo.png"
                alt="Find Your Dream Home"
                width={280}
                height={100}
                className="object-contain max-w-[200px] md:max-w-[250px]"
                unoptimized={true}
              />
            </Link>
            <p className="text-[13px] sm:text-[14px] text-gray-400 leading-relaxed max-w-sm mb-6">
              Experience the pinnacle of luxury living. We provide exclusive access to the most luxurious properties in prime locations across Kerala.
            </p>
            {/* Desktop Quick Contact */}
            <div className="hidden lg:flex flex-col gap-3">
              <a href="tel:+919544593991" className="flex items-center gap-3 text-gray-300 hover:text-[#E3572D] transition-colors text-[14px]">
                <Phone size={16} className="text-[#E3572D]" /> +91 9544593991
              </a>
              <a href="mailto:info@fydhomes.com" className="flex items-center gap-3 text-gray-300 hover:text-[#E3572D] transition-colors text-[14px]">
                <Mail size={16} className="text-[#E3572D]" /> info@fydhomes.com
              </a>
            </div>
          </div>

          {/* LINKS & SOCIALS FLEX CONTAINER */}
          <div className="w-full lg:w-2/3 flex flex-col sm:flex-row justify-center lg:justify-end gap-10 sm:gap-16 lg:gap-24">

            {/* QUICK LINKS */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h3 className="text-[15px] font-[700] uppercase mb-6 text-white tracking-wider">Quick Links</h3>
              <ul className="flex flex-col gap-3">
                <li><Link href="/" className="text-[14px] text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-[14px] text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/listings" className="text-[14px] text-gray-300 hover:text-white transition-colors">Properties</Link></li>
                <li><Link href="/contact" className="text-[14px] text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* SOCIAL PROFILES */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h3 className="text-[15px] font-[700] uppercase mb-6 text-white tracking-wider">Social Profiles</h3>
              <ul className="flex sm:flex-col gap-5 sm:gap-3 justify-center">
                <li>
                  <a href="https://www.facebook.com/people/FIND-YOUR-DREAM-HOME/100077314248446/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[14px] text-gray-300 hover:text-white transition-colors group">
                    <span className="p-2.5 bg-white/5 rounded-full group-hover:bg-[#E3572D] transition-colors"><Facebook size={18} /></span>
                    <span className="hidden sm:inline">Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/findyourdreamhome_/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[14px] text-gray-300 hover:text-white transition-colors group">
                    <span className="p-2.5 bg-white/5 rounded-full group-hover:bg-[#E3572D] transition-colors"><Instagram size={18} /></span>
                    <span className="hidden sm:inline">Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@findyourdreamhome6667" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[14px] text-gray-300 hover:text-white transition-colors group">
                    <span className="p-2.5 bg-white/5 rounded-full group-hover:bg-[#E3572D] transition-colors"><Youtube size={18} /></span>
                    <span className="hidden sm:inline">Youtube</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* MOBILE ONLY CONTACT BLOCK */}
            <div className="flex lg:hidden flex-col items-center sm:items-start text-center sm:text-left">
              <h3 className="text-[15px] font-[700] uppercase mb-6 text-white tracking-wider">Contact Us</h3>
              <ul className="flex flex-col gap-3 items-center sm:items-start">
                <li><a href="tel:+919544593991" className="text-[14px] text-gray-300 hover:text-[#E3572D] transition-colors">+91 9544593991</a></li>
                <li><a href="mailto:info@fydhomes.com" className="text-[14px] text-gray-300 hover:text-[#E3572D] transition-colors">info@fydhomes.com</a></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* SUB-FOOTER */}
      <div className="bg-[#0F172A] border-t border-white/10 py-5 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[13px] text-gray-400 font-medium text-center md:text-left">
              © FYD Media 2026 - All rights reserved.
            </div>

            <div className="flex items-center justify-center gap-4">
              <Link href="/privacy-policy" className="text-[13px] text-gray-400 font-medium hover:text-[#E3572D] transition-colors">
                Privacy Policy
              </Link>
              <div className="h-3 w-[1px] bg-white/20"></div>
              <Link href="/terms-conditions" className="text-[13px] text-gray-400 font-medium hover:text-[#E3572D] transition-colors">
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
