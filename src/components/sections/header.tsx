'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Youtube, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-[#EAEAEA] sticky top-0 z-[1000]">
      <div className="container mx-auto max-w-[1200px] px-4 sm:px-5 md:px-10 h-[80px] sm:h-[100px] flex items-center justify-between">

        <div className="flex-shrink-0">
          <Link href="/" className="block">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/0149254b-b2ea-40e6-ad6a-70e092f9e191/image-1768459775863.png?width=8000&height=8000&resize=contain"
              alt="fyd homes"
              width={240}
              height={90}
              className="h-[60px] sm:h-[90px] w-auto object-contain"
              priority
            />
          </Link>
        </div>

        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-6 xl:gap-10">
            <li>
              <Link
                href="/"
                className="text-[13px] xl:text-[14px] font-semibold text-black hover:text-[#D32F2F] uppercase tracking-wider transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-[13px] xl:text-[14px] font-semibold text-black hover:text-[#D32F2F] uppercase tracking-wider transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/listings"
                className="text-[13px] xl:text-[14px] font-semibold text-black hover:text-[#D32F2F] uppercase tracking-wider transition-colors duration-200"
              >
                Listings
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-[13px] xl:text-[14px] font-semibold text-black hover:text-[#D32F2F] uppercase tracking-wider transition-colors duration-200"
              >
                Contact
              </Link>
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden absolute top-[80px] sm:top-[100px] left-0 right-0 bg-white/95 backdrop-blur-md border-b border-[#EAEAEA] shadow-xl z-50"
          >
            <nav className="container mx-auto px-6 py-6">
              <ul className="flex flex-col gap-4">
                {['Home', 'About', 'Listings', 'Contact'].map((item) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="block text-[18px] font-bold text-black hover:text-[#D32F2F] tracking-wide transition-colors py-2 border-b border-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="flex items-center gap-4 mt-6">
                <a
                  href="https://www.instagram.com/findyourdreamhome_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-black hover:bg-[#D32F2F] hover:text-white transition-all duration-300"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.youtube.com/@findyourdreamhome6667"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-black hover:bg-[#D32F2F] hover:text-white transition-all duration-300"
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
