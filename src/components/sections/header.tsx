'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Instagram, Youtube, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-[#EAEAEA] sticky top-0 z-[1000]">
      <div className="container mx-auto max-w-[1200px] px-4 sm:px-5 md:px-10 h-[80px] sm:h-[100px] flex items-center justify-between">

        <div className="flex-shrink-0">
          <a href="/" className="block">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/0149254b-b2ea-40e6-ad6a-70e092f9e191/image-1768459775863.png?width=8000&height=8000&resize=contain"
              alt="fyd homes"
              width={240}
              height={90}
              className="h-[60px] sm:h-[90px] w-auto object-contain"
              priority
            />
          </a>
        </div>

        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-6 xl:gap-10">
            <li>
              <a
                href="/"
                className="text-[13px] xl:text-[14px] font-semibold text-black hover:text-[#D32F2F] uppercase tracking-wider transition-colors duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-[13px] xl:text-[14px] font-semibold text-black hover:text-[#D32F2F] uppercase tracking-wider transition-colors duration-200"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/listings"
                className="text-[13px] xl:text-[14px] font-semibold text-black hover:text-[#D32F2F] uppercase tracking-wider transition-colors duration-200"
              >
                Listings
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-[13px] xl:text-[14px] font-semibold text-black hover:text-[#D32F2F] uppercase tracking-wider transition-colors duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            <a
              href="https://www.instagram.com/findyourdreamhome_/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#333333] text-white hover:bg-[#D32F2F] transition-all duration-300"
            >
              <Instagram size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://www.youtube.com/@findyourdreamhome6667"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#D32F2F] text-white hover:bg-[#CC0000] transition-all duration-300"
            >
              <Youtube size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="sr-only">Youtube</span>
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-black hover:text-[#D32F2F] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-[#EAEAEA] shadow-lg overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="flex flex-col gap-1">
                <li>
                  <a
                    href="/"
                    className="block py-3 px-4 text-[15px] font-semibold text-black hover:text-[#D32F2F] hover:bg-gray-50 rounded-md uppercase tracking-wider transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="block py-3 px-4 text-[15px] font-semibold text-black hover:text-[#D32F2F] hover:bg-gray-50 rounded-md uppercase tracking-wider transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/listings"
                    className="block py-3 px-4 text-[15px] font-semibold text-black hover:text-[#D32F2F] hover:bg-gray-50 rounded-md uppercase tracking-wider transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Listings
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="block py-3 px-4 text-[15px] font-semibold text-black hover:text-[#D32F2F] hover:bg-gray-50 rounded-md uppercase tracking-wider transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </a>
                </li>
              </ul>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#EAEAEA] px-4 sm:hidden">
                <a
                  href="https://www.instagram.com/findyourdreamhome_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#333333] text-white hover:bg-[#D32F2F] transition-all duration-300"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.youtube.com/@findyourdreamhome6667"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#D32F2F] text-white hover:bg-[#CC0000] transition-all duration-300"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
