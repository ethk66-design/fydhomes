"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Instagram, Youtube, Menu, X } from "lucide-react";

/**
 * Header Section Component
 * Pixel-perfect clone of the FYD Homes navigation header.
 * 
 * Includes:
 * - Responsive container with 1170px max-width (standard boxed layout)
 * - Site logo on the left
 * - Centered navigation links (Home, About, Listings, Contact)
 * - Social media icons (Instagram, YouTube) on the right
 * - Mobile menu functionality
 */

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Listings", href: "/listings" },
    { name: "Contact", href: "/contact", current: true },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/findyourdreamhome_/",
      icon: <Instagram size={14} />,
      bgColor: "#333333",
    },
    {
      name: "Youtube",
      href: "https://www.youtube.com/@findyourdreamhome6667",
      icon: <Youtube size={14} />,
      bgColor: "#c4302b", // YouTube specific red from screenshot palette
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e6e6e6]">
      <div className="container mx-auto px-[15px] max-w-[1170px] xl:max-w-[1480px]">
        <div className="flex items-center justify-between h-[90px]">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <a href="https://fydhomes.in" className="block">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/fyd-homes-scaled-e1754756623724-1.png"
                alt="fyd homes"
                width={150}
                height={50}
                className="object-contain h-[50px] w-auto"
                priority
              />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-[25px]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`nav-link relative py-2 text-[14px] font-medium uppercase tracking-[0.02em] transition-all duration-300 hover:text-primary ${
                  link.current
                    ? "text-primary after:content-[''] after:absolute after:top-[-25px] after:left-0 after:w-full after:h-[2px] after:bg-primary"
                    : "text-[#222222]"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Icons (Right Side) */}
          <div className="hidden lg:flex items-center space-x-[10px]">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-circle hover:opacity-80 transition-opacity flex items-center justify-center rounded-full text-white"
                style={{ backgroundColor: social.bgColor, width: "32px", height: "32px" }}
              >
                <span className="sr-only">{social.name}</span>
                {social.icon}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#222222] p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#e6e6e6] absolute w-full left-0 animate-in fade-in slide-in-from-top-4 duration-300">
          <ul className="flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`block px-[15px] py-3 text-[14px] font-medium uppercase tracking-[0.02em] border-b border-gray-50 last:border-0 ${
                    link.current ? "text-primary" : "text-[#222222]"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="px-[15px] py-4 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="icon-circle text-white flex items-center justify-center rounded-full"
                  style={{ backgroundColor: social.bgColor, width: "32px", height: "32px" }}
                >
                  {social.icon}
                </a>
              ))}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;