import React from 'react';
import Image from 'next/image';

const Footer = () => {
  const logoUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/fyd-homes-scaled-e1754756623724-1.png";

  return (
    <footer className="w-full bg-white font-sans text-[#5C5C5C]">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-[1170px] px-5 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-4">
          
          {/* Logo & Brand Column */}
          <div className="flex flex-col items-start">
            <a href="/" className="mb-4 block">
                <Image 
                  src={logoUrl} 
                  alt="Find Your Dream Home" 
                  width={200} 
                  height={65} 
                  className="h-auto w-[180px] md:w-[200px] object-contain"
                  priority
                />
            </a>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="mb-6 text-[18px] font-semibold text-black">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="/" className="text-[15px] transition-colors hover:text-[#2d7a8c]">Home</a>
              </li>
              <li>
                <a href="/about" className="text-[15px] transition-colors hover:text-[#2d7a8c]">About</a>
              </li>
              <li>
                <a href="/listings" className="text-[15px] transition-colors hover:text-[#2d7a8c]">Listings</a>
              </li>
                <li>
                  <a href="/contact" className="text-[15px] transition-colors hover:text-[#2d7a8c]">Contact</a>
                </li>
                <li>
                  <a href="/admin/login" className="text-[15px] transition-colors hover:text-[#2d7a8c]">Admin Login</a>
                </li>
              </ul>
          </div>

          {/* Social Profiles Column */}
          <div>
            <h3 className="mb-6 text-[18px] font-semibold text-black">Social Profiles</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://facebook.com" className="text-[15px] transition-colors hover:text-[#2d7a8c]">Facebook</a>
              </li>
              <li>
                <a href="https://instagram.com/findyourdreamhome_/" className="text-[15px] transition-colors hover:text-[#2d7a8c]">Instagram</a>
              </li>
              <li>
                <a href="https://youtube.com/@findyourdreamhome6667" className="text-[15px] transition-colors hover:text-[#2d7a8c]">Youtube</a>
              </li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div>
            <h3 className="mb-6 text-[18px] font-semibold text-black">Contact Us</h3>
            <ul className="space-y-4">
              <li className="text-[15px]">
                Call us : <a href="tel:+919544593991" className="transition-colors hover:text-[#2d7a8c]">+91 9544593991</a>
              </li>
              <li className="text-[15px]">
                <a href="mailto:info@fydhomes.com" className="transition-colors hover:text-[#2d7a8c]">info@fydhomes.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#eeeeee]">
        <div className="container mx-auto flex max-w-[1170px] flex-col items-center justify-between px-5 py-6 md:flex-row">
          <div className="mb-4 md:mb-0">
            <p className="text-[14px] text-[#5C5C5C]">
              © FYD Media {new Date().getFullYear()} - All rights reserved
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <a href="/privacy-policy" className="text-[14px] transition-colors hover:text-[#2d7a8c]">Privacy Policy</a>
            <a href="/terms-conditions" className="text-[14px] transition-colors hover:text-[#2d7a8c]">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;