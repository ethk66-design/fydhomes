import React from 'react';
import Image from 'next/image';
import { Instagram, Youtube, Menu, X } from 'lucide-react';

const Header = () => {
  return (
    <header className="relative w-full z-50 bg-white">
      <div className="container mx-auto px-4 lg:px-[15px] max-w-[1170px]">
        <div className="flex items-center justify-between h-[100px] lg:h-[120px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="block">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/fyd-homes-scaled-e1754756623724-1.png"
                alt="fyd homes"
                width={160}
                height={52}
                className="h-auto w-[120px] lg:w-[160px] object-contain"
                priority
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-grow">
            <ul className="flex items-center space-x-[30px]">
              <li>
                <a
                  href="/"
                  className="text-black font-medium text-[15px] hover:text-[#2b6e83] transition-colors duration-200 uppercase tracking-wider"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-black font-medium text-[15px] hover:text-[#2b6e83] transition-colors duration-200 uppercase tracking-wider"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/listings"
                  className="text-black font-medium text-[15px] hover:text-[#2b6e83] transition-colors duration-200 uppercase tracking-wider"
                >
                  Listings
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-black font-medium text-[15px] hover:text-[#2b6e83] transition-colors duration-200 uppercase tracking-wider"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Social Icons & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4 lg:space-x-3">
            <div className="hidden sm:flex items-center space-x-3">
              <a
                href="https://www.instagram.com/findyourdreamhome_/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[#333333] text-white hover:bg-[#2b6e83] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@findyourdreamhome6667"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[#cd201f] text-white hover:opacity-90 transition-all duration-300"
                aria-label="Youtube"
              >
                <Youtube size={18} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-black hover:text-[#2b6e83] transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Subtle bottom border for mobile transition areas if needed, though instruction says transparent */}
      <div className="h-[1px] bg-black/5 w-full lg:hidden" />
    </header>
  );
};

export default Header;