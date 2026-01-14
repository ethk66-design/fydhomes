"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Youtube, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
      className={cn(
        "fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ease-in-out py-4",
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-[20px] max-w-[1140px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/fyd-homes-scaled-e1754756623724-1.png"
                alt="fyd homes"
                width={150}
                height={50}
                className="h-auto w-[120px] md:w-[150px] object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-grow justify-center">
            <ul className="flex items-center space-x-[30px]">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className="nav-link text-[14px] font-medium uppercase tracking-[0.05em] text-foreground transition-colors hover:text-accent"
                  >
                    {link.name}
                  </Link>
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Icons (Right Side) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://www.instagram.com/findyourdreamhome_/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 text-white transition-transform hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.youtube.com/@findyourdreamhome6667"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF0000] text-white transition-transform hover:scale-110"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          "md:hidden absolute top-[100%] left-0 right-0 bg-white border-t border-border overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container mx-auto px-[20px] py-6">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="nav-link block text-[16px] font-medium uppercase py-2 border-b border-border last:border-0"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-4 flex items-center gap-4">
              <a
                href="https://www.instagram.com/findyourdreamhome_/"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 text-white"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@findyourdreamhome6667"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF0000] text-white"
              >
                <Youtube size={18} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;