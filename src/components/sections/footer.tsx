import React from 'react';
import Image from 'next/image';

const Footer = () => {
  const currentYear = 2025; // Based on the "FYD Media 2025" in screenshots

  return (
    <footer className="w-full bg-white font-sans text-[#333333]">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-[1140px] px-[1.5rem] pt-[80px] pb-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] items-start">
          
          {/* Column 1: Logo */}
          <div className="flex flex-col">
            <a href="/" className="inline-block max-w-[200px]">
              <Image 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/images/FYD-LOGO-ICONS-01-scaled-9.png"
                alt="Find Your Dream Home"
                width={200}
                height={100}
                className="object-contain"
                priority
              />
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-[20px] font-semibold text-black mb-[25px] font-sans">Quick Links</h3>
            <ul className="space-y-[12px] list-none p-0 m-0">
              <li>
                <a href="/" className="text-[14px] text-[#737373] hover:text-[#357388] transition-colors duration-200 no-underline">Home</a>
              </li>
              <li>
                <a href="/about" className="text-[14px] text-[#737373] hover:text-[#357388] transition-colors duration-200 no-underline">About</a>
              </li>
              <li>
                <a href="/listings" className="text-[14px] text-[#737373] hover:text-[#357388] transition-colors duration-200 no-underline">Listings</a>
              </li>
              <li>
                <a href="/contact" className="text-[14px] text-[#737373] hover:text-[#357388] transition-colors duration-200 no-underline">Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Profiles */}
          <div className="flex flex-col">
            <h3 className="text-[20px] font-semibold text-black mb-[25px] font-sans">Social Profiles</h3>
            <ul className="space-y-[12px] list-none p-0 m-0">
              <li>
                <a href="https://facebook.com" className="text-[14px] text-[#737373] hover:text-[#357388] transition-colors duration-200 no-underline">Facebook</a>
              </li>
              <li>
                <a href="https://www.instagram.com/findyourdreamhome_/" className="text-[14px] text-[#737373] hover:text-[#357388] transition-colors duration-200 no-underline">Instagram</a>
              </li>
              <li>
                <a href="https://www.youtube.com/@findyourdreamhome6667" className="text-[14px] text-[#737373] hover:text-[#357388] transition-colors duration-200 no-underline">Youtube</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col">
            <h3 className="text-[20px] font-semibold text-black mb-[25px] font-sans">Contact Us</h3>
            <div className="space-y-[12px]">
              <p className="text-[14px] text-[#737373] m-0 mb-[12px]">
                Call us : <a href="tel:+919544593991" className="hover:text-[#357388] transition-colors">+91 9544593991</a>
              </p>
              <p className="text-[14px] text-[#737373] m-0">
                <a href="mailto:info@fydhomes.com" className="hover:text-[#357388] transition-colors">info@fydhomes.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Strip */}
      <div className="w-full border-t border-[#e6e6e6] py-[25px]">
        <div className="container mx-auto max-w-[1140px] px-[1.5rem] flex flex-col md:flex-row justify-between items-center text-[12px] text-[#737373]">
          <div className="mb-4 md:mb-0">
            © FYD Media {currentYear} - All rights reserved
          </div>
          
          <div className="flex items-center space-x-[20px]">
            <a href="/privacy-policy" className="hover:text-[#357388] transition-colors no-underline">Privacy Policy</a>
            <a href="/terms-conditions" className="hover:text-[#357388] transition-colors no-underline">Terms &amp; Conditions</a>
            <div className="flex items-center bg-[#f5f5f5] px-3 py-1.5 rounded-md">
              <span className="text-[11px] font-semibold mr-2 uppercase tracking-wider">Need Help?</span>
              <span className="text-[11px] font-bold text-black">Chat with us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Action */}
      <a 
        href="https://wa.me/919544593991" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float bg-[#25d366] text-white fixed bottom-[20px] right-[20px] w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-lg z-[1000] hover:scale-110 transition-transform duration-300"
        aria-label="Chat with us on WhatsApp"
      >
        <svg 
          viewBox="0 0 448 512" 
          width="30" 
          height="30" 
          fill="currentColor"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.8 69.7 27.2 106.2 27.2h.1c122.3 0 222-99.6 222-222 0-59.3-23-115.1-65.1-157.1zM223.9 445.9c-33.1 0-65.5-8.9-93.7-25.7l-6.7-4-69.6 18.3 18.6-67.9-4.4-7c-18.4-29.4-28.1-63.3-28.1-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 54 81.2 54.1 130.5 0 101.7-82.8 184.5-184.6 184.5zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.6-30.6-38.1-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>
    </footer>
  );
};

export default Footer;