'use client';

import React, { useState } from 'react';
import ImageWithFallback from '@/components/ui/image-with-fallback';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#16243E] border-b border-[#0F172A] sticky top-0 z-[1000]">
      <div className="container mx-auto max-w-[1200px] px-4 sm:px-5 md:px-10 h-[80px] sm:h-[100px] flex items-center justify-between">

        {/* Logo — 30% larger than original */}
        <div className="flex-shrink-0">
          <Link href="/" className="block">
            <ImageWithFallback
              src="/assets/fyd-logo.png"
              alt="fyd homes"
              width={312}
              height={117}
              className="h-[78px] sm:h-[117px] w-auto object-contain"
              unoptimized={true}
              priority
            />
          </Link>
        </div>

        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-6 xl:gap-10">
            <li>
              <Link href="/" className="text-[13px] xl:text-[14px] font-semibold text-white hover:text-[#E3572D] uppercase tracking-wider transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-[13px] xl:text-[14px] font-semibold text-white hover:text-[#E3572D] uppercase tracking-wider transition-colors duration-200">
                About
              </Link>
            </li>
            <li>
              <Link href="/listings" className="text-[13px] xl:text-[14px] font-semibold text-white hover:text-[#E3572D] uppercase tracking-wider transition-colors duration-200">
                Listings
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-[13px] xl:text-[14px] font-semibold text-white hover:text-[#E3572D] uppercase tracking-wider transition-colors duration-200">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Colored Social Icons with Text Labels */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://www.instagram.com/findyourdreamhome_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/15 border border-white/10 pl-2 pr-3 py-1.5 rounded-full text-white transition-all duration-200"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="url(#ig-grad-header)" />
                <rect x="5" y="5" width="14" height="14" rx="4" stroke="white" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="3.5" stroke="white" strokeWidth="1.5" fill="none" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
                <defs>
                  <linearGradient id="ig-grad-header" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FEDA77" />
                    <stop offset="0.25" stopColor="#F58529" />
                    <stop offset="0.5" stopColor="#DD2A7B" />
                    <stop offset="0.75" stopColor="#8134AF" />
                    <stop offset="1" stopColor="#515BD4" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[12px] font-semibold tracking-wide">Instagram</span>
            </a>
            <a
              href="https://www.youtube.com/@findyourdreamhome6667"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/15 border border-white/10 pl-2 pr-3 py-1.5 rounded-full text-white transition-all duration-200"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="#FF0000" />
                <path d="M10 15.5L16 12L10 8.5V15.5Z" fill="white" />
              </svg>
              <span className="text-[12px] font-semibold tracking-wide">Youtube</span>
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
              className="flex items-center gap-2 bg-gray-100/10 text-white hover:bg-[#E3572D] rounded-full px-3 py-2 transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="url(#ig-grad-mobile)" />
                <rect x="5" y="5" width="14" height="14" rx="4" stroke="white" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="3.5" stroke="white" strokeWidth="1.5" fill="none" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
                <defs>
                  <linearGradient id="ig-grad-mobile" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FEDA77" />
                    <stop offset="0.25" stopColor="#F58529" />
                    <stop offset="0.5" stopColor="#DD2A7B" />
                    <stop offset="0.75" stopColor="#8134AF" />
                    <stop offset="1" stopColor="#515BD4" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-sm font-semibold">Instagram</span>
            </a>
            <a
              href="https://www.youtube.com/@findyourdreamhome6667"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-100/10 text-white hover:bg-[#E3572D] rounded-full px-3 py-2 transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="#FF0000" />
                <path d="M10 15.5L16 12L10 8.5V15.5Z" fill="white" />
              </svg>
              <span className="text-sm font-semibold">Youtube</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
