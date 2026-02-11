"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
          className="w-[18px] h-[18px]"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Youtube',
      href: 'https://www.youtube.com/@findyourdreamhome6667',
      icon: (
        <svg
          className="w-[18px] h-[18px]"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.688 22 12 22 12s0 3.312-.42 4.814a2.464 2.464 0 01-1.768 1.768c-1.502.42-7.812.42-7.812.42s-6.31 0-7.814-.42a2.464 2.464 0 01-1.768-1.768C2 15.312 2 12 2 12s0-3.312.42-4.814a2.464 2.464 0 011.768-1.768C5.688 5 12 5 12 5s6.312 0 7.812.418zM9.75 15.022L15.5 12 9.75 8.978v6.044z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] w-full transition-all duration-300 border-b border-[#eeeeee] ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
        }`}
    >
      <div className="container mx-auto px-5 lg:px-0">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block relative h-[60px] lg:h-[80px] w-[200px]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/0149254b-b2ea-40e6-ad6a-70e092f9e191/image-1768459775863.png?width=8000&height=8000&resize=contain"
                alt="fyd homes"
                fill
                className="object-contain object-left transition-transform duration-300"
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
                    className="text-[15px] font-medium uppercase tracking-[0.5px] text-black hover:text-[#2d7a8c] transition-colors font-sans"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section: Social Icons & Hamburger */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <div className="hidden sm:flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-full text-black hover:text-[#1db954] transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Mobile-only CTA */}
            <Link
              href="/listings"
              className="lg:hidden text-[12px] font-bold uppercase tracking-[0.5px] bg-[#1db954] text-white px-4 py-2 rounded-[4px] hover:opacity-90 active:scale-95 transition-all"
            >
              Listings
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-black"
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
        className={`fixed inset-0 bg-white z-[999] transition-transform duration-500 ease-in-out transform lg:hidden top-[80px] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col p-8 space-y-6">
          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-2xl font-bold text-black border-b border-[#eeeeee] pb-4 block"
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
                className="text-black hover:text-[#1db954] transition-colors"
              >
                {React.cloneElement(social.icon as React.ReactElement, {
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