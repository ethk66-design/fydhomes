"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ImageWithFallback from '@/components/ui/image-with-fallback';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Buy', href: '/listings?type=sale' },
    { name: 'Rent', href: '/listings?type=rent' },
    { name: 'Projects', href: '/projects' },
    { name: 'Sell', href: '/sell' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/findyourdreamhome_/',
      icon: (
        <svg
          className="w-5 h-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect width="24" height="24" rx="6" fill="url(#instagram-gradient)" />
          <path d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" stroke="white" strokeWidth="2" />
          <path d="M16 12C16 14.2091 14.2091 16 12 16C9.7908 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" fill="transparent" stroke="white" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
          <defs>
            <linearGradient id="instagram-gradient" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEDA77" />
              <stop offset="0.25" stopColor="#F58529" />
              <stop offset="0.5" stopColor="#DD2A7B" />
              <stop offset="0.75" stopColor="#8134AF" />
              <stop offset="1" stopColor="#515BD4" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      name: 'Youtube',
      href: 'https://www.youtube.com/@findyourdreamhome6667',
      icon: (
        <svg
          className="w-5 h-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect width="24" height="24" rx="6" fill="#FF0000" />
          <path d="M10 15L15 12L10 9V15Z" fill="white" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] w-full transition-all duration-300 border-b border-[#0F172A] ${isScrolled ? 'bg-[#16243E] shadow-xl py-2' : 'bg-[#16243E] py-4'
        }`}
    >
      <div className="container mx-auto px-5 lg:px-0">
        <div className="flex items-center justify-between h-[90px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block relative h-[70px] lg:h-[80px] w-[130px] lg:w-[156px]">
              <ImageWithFallback
                src="/assets/fyd-logo.png"
                alt="fyd homes"
                fill
                className="object-contain transition-transform duration-300"
                unoptimized={true}
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu - Center Aligned */}
          <div className="hidden lg:flex flex-grow justify-center">
            <ul className="flex items-center space-x-10">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[15px] font-medium uppercase tracking-[0.5px] text-white hover:text-[#E3572D] transition-colors font-sans"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section: Social Icons & Hamburger */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <div className="hidden sm:flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-white/5 hover:bg-white/15 border border-white/5 pl-2 pr-3 py-1.5 rounded-full text-white transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                  <span className="text-[12px] font-semibold tracking-wide font-sans">{social.name}</span>
                </a>
              ))}
            </div>

            {/* Mobile-only CTA */}
            <Link
              href="/listings"
              className="lg:hidden text-[12px] font-bold uppercase tracking-[0.5px] bg-[#E3572D] text-white px-4 py-2 rounded-[4px] hover:opacity-90 active:scale-95 transition-all"
            >
              Listings
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white"
              aria-label="Toggle Navigation"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#16243E] z-[999] transition-transform duration-500 ease-in-out transform lg:hidden top-[90px] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col p-8 space-y-6">
          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-2xl font-bold text-white border-b border-[#0F172A] pb-4 block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-6 pt-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-white hover:text-[#E3572D] transition-colors"
              >
                {React.cloneElement(social.icon as React.ReactElement<{ className?: string }>, {
                  className: 'w-8 h-8',
                })}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;