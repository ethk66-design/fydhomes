"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Youtube, Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Listings", href: "/listings" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] w-full bg-white transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-6 max-w-[1140px]">
        <div className="flex items-center justify-between h-[90px]">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/fyd-homes-scaled-e1754756623724-1.png"
                alt="fyd homes"
                width={140}
                height={60}
                className="h-[60px] w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="nav-link relative text-[#000000] font-sans text-[14px] font-medium uppercase tracking-wider transition-colors hover:text-[#357388] after:content-[''] after:absolute after:left-0 after:-top-1 after:w-0 after:h-[2px] after:bg-[#357388] after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Icons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://www.instagram.com/findyourdreamhome_/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center bg-[#333333] text-white rounded-full hover:bg-[#357388] transition-colors"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.youtube.com/@findyourdreamhome6667"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center bg-[#cc0000] text-white rounded-full hover:opacity-90 transition-opacity"
            >
              <Youtube size={16} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#000000]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-[#e6e6e6] transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="block text-[15px] font-medium uppercase text-[#000000] hover:text-[#357388]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-4 mt-8 pt-6 border-t border-[#e6e6e6]">
            <a
              href="https://www.instagram.com/findyourdreamhome_/"
              className="text-[#333333] hover:text-[#357388]"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.youtube.com/@findyourdreamhome6667"
              className="text-[#cc0000] hover:opacity-80"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;