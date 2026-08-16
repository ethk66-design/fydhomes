'use client';

import React, { useState } from 'react';
import ImageWithFallback from '@/components/ui/image-with-fallback';
import Link from 'next/link';
import { Instagram, Youtube, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#16243E] border-b border-[#0F172A] sticky top-0 z-[1000]">
      <div className="container mx-auto max-w-[1200px] px-4 sm:px-5 md:px-10 h-[80px] sm:h-[100px] flex items-center justify-between">

        <div className="flex-shrink-0">
          <Link href="/" className="block">
            <ImageWithFallback
              src="/assets/fyd-logo.png"
              alt="fyd homes"
              width={240}
              height={90}
              className="h-[60px] sm:h-[90px] w-auto object-contain"
              unoptimized={true}
              priority
            />
          </Link>
        </div>

        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-6 xl:gap-10">
            <li>
              <Link
                href="/"
                className="text-[13px] xl:text-[14px] font-semibold text-white hover:text-[#E3572D] uppercase tracking-wider transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-[13px] xl:text-[14px] font-semibold text-white hover:text-[#E3572D] uppercase tracking-wider transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/listings"
                className="text-[13px] xl:text-[14px] font-semibold text-white hover:text-[#E3572D] uppercase tracking-wider transition-colors duration-200"
              >
                Listings
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-[13px] xl:text-[14px] font-semibold text-white hover:text-[#E3572D] uppercase tracking-wider transition-colors duration-200"
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
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#333333] text-white hover:bg-[#E3572D] transition-all duration-300"
            >
              <Instagram size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://www.youtube.com/@findyourdreamhome6667"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#E3572D] text-white hover:bg-[#16243E] transition-all duration-300"
            >
              <Youtube size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="sr-only">Youtube</span>
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-white hover:text-[#E3572D] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Backdrop for click-outside */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden absolute top-[80px] sm:top-[100px] left-0 right-0 bg-[#16243E]/95 backdrop-blur-md border-b border-[#0F172A] shadow-xl z-50 transition-all duration-300 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <nav className="container mx-auto px-6 py-6">
          <ul className="flex flex-col gap-4">
            {['Home', 'About', 'Listings', 'Contact'].map((item) => (
              <li key={item}>
                <Link
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="block text-[18px] font-bold text-white hover:text-[#E3572D] tracking-wide transition-colors py-2 border-b border-[#0F172A]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 mt-6">
            <a
              href="https://www.instagram.com/findyourdreamhome_/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100/10 text-white hover:bg-[#E3572D] hover:text-white transition-all duration-300"
            >
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://www.youtube.com/@findyourdreamhome6667"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100/10 text-white hover:bg-[#E3572D] hover:text-white transition-all duration-300"
            >
              <Youtube size={20} />
              <span className="sr-only">Youtube</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
