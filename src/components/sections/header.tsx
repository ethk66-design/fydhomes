import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Youtube, Menu, X } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#e5e5e5] shadow-sm">
      <div className="container mx-auto px-[15px] flex items-center justify-between h-[80px] lg:h-[90px]">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Link href="/" className="block">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/fyd-homes-scaled-e1754756623724-1.png"
              alt="FYD HOMES"
              width={140}
              height={50}
              className="h-auto w-auto max-h-[60px] object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-[35px] absolute left-1/2 transform -translate-x-1/2">
          <Link
            href="/"
            className="text-[14px] font-medium text-[#1a1a1a] hover:text-[#2b7387] uppercase tracking-wider transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-[14px] font-medium text-[#1a1a1a] hover:text-[#2b7387] uppercase tracking-wider transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/listings"
            className="text-[14px] font-medium text-[#1a1a1a] hover:text-[#2b7387] uppercase tracking-wider transition-colors duration-200"
          >
            Listings
          </Link>
          <Link
            href="/contact"
            className="text-[14px] font-medium text-[#1a1a1a] hover:text-[#2b7387] uppercase tracking-wider transition-colors duration-200"
          >
            Contact
          </Link>
        </nav>

        {/* Right Section: Social Icons & Mobile Menu Toggle */}
        <div className="flex items-center space-x-[15px]">
          {/* Social Icons (Hidden on small mobile if needed, but per instruction on right) */}
          <div className="hidden sm:flex items-center space-x-[12px]">
            <a
              href="https://www.instagram.com/findyourdreamhome_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[#f4f7f8] text-[#1a1a1a] hover:bg-[#2b7387] hover:text-white transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.youtube.com/@findyourdreamhome6667"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[#f4f7f8] text-[#1a1a1a] hover:bg-[#2b7387] hover:text-white transition-all duration-300"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
          </div>

          {/* Mobile Menu Toggle (Lucide Menu Icon) */}
          <button
            className="lg:hidden flex items-center justify-center p-2 text-[#1a1a1a] hover:text-[#2b7387]"
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;