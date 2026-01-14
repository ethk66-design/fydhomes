import React from 'react';
import Image from 'next/image';
import { Instagram, Youtube, Menu, X } from 'lucide-react';

/**
 * Header component for FYD Homes.
 * Cloned with pixel-perfect accuracy based on provided design instructions and assets.
 */
export default function Header() {
  return (
    <header className="w-full bg-white border-b border-[#EAEAEA] sticky top-0 z-[1000]">
      <div className="container mx-auto max-w-[1200px] px-5 sm:px-10 h-[90px] flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <a href="/" className="block">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/fyd-homes-scaled-e1754756623724-1.png"
              alt="fyd homes"
              width={160}
              height={50}
              className="h-[50px] w-auto object-contain"
              priority
            />
          </a>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-10">
            <li>
              <a 
                href="/" 
                className="text-[14px] font-semibold text-black hover:text-[#D32F2F] uppercase tracking-wider transition-colors duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/about" 
                className="text-[14px] font-semibold text-black hover:text-[#D32F2F] uppercase tracking-wider transition-colors duration-200"
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="/listings" 
                className="text-[14px] font-semibold text-black hover:text-[#D32F2F] uppercase tracking-wider transition-colors duration-200"
              >
                Listings
              </a>
            </li>
            <li>
              <a 
                href="/contact" 
                className="text-[14px] font-semibold text-black hover:text-[#D32F2F] uppercase tracking-wider transition-colors duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Social Media Icons & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href="https://www.instagram.com/findyourdreamhome_/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#333333] text-white hover:bg-[#D32F2F] transition-all duration-300"
            >
              <Instagram size={18} />
              <span className="sr-only">Instagram</span>
            </a>
            <a 
              href="https://www.youtube.com/@findyourdreamhome6667" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#D32F2F] text-white hover:bg-[#CC0000] transition-all duration-300"
            >
              <Youtube size={18} />
              <span className="sr-only">Youtube</span>
            </a>
          </div>
          
          {/* Mobile Menu Toggle (Simplified for clone structure) */}
          <button className="lg:hidden p-2 text-black hover:text-[#D32F2F] transition-colors">
            <Menu size={32} />
          </button>
        </div>
      </div>
    </header>
  );
}