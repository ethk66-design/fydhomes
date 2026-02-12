import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="footer-container bg-white pt-10 sm:pt-[60px] pb-0 font-sans border-t border-[#EAEAEA]">
      <div className="container mx-auto px-4 sm:px-5 max-w-[1200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 sm:pb-[50px]">
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <div className="footer-logo mb-6 flex justify-center sm:justify-start">
              <Link href="/">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/0149254b-b2ea-40e6-ad6a-70e092f9e191/image-1768459789386.png?width=8000&height=8000&resize=contain"
                  alt="Find Your Dream Home"
                  width={200}
                  height={80}
                  className="object-contain max-w-[160px] sm:max-w-[200px]"
                />
              </Link>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-[13px] sm:text-[14px] font-[700] uppercase mb-4 sm:mb-6 text-black tracking-wider">Quick Links</h3>
            <ul className="list-none p-0 m-0">
              <li className="mb-2 sm:mb-3">
                <Link href="/" className="text-[13px] sm:text-[14px] text-[#666666] hover:text-black transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li className="mb-2 sm:mb-3">
                <Link href="/about" className="text-[13px] sm:text-[14px] text-[#666666] hover:text-black transition-colors duration-200">
                  About
                </Link>
              </li>
              <li className="mb-2 sm:mb-3">
                <Link href="/listings" className="text-[13px] sm:text-[14px] text-[#666666] hover:text-black transition-colors duration-200">
                  Listings
                </Link>
              </li>
              <li className="mb-2 sm:mb-3">
                <Link href="/contact" className="text-[13px] sm:text-[14px] text-[#666666] hover:text-black transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-[13px] sm:text-[14px] font-[700] uppercase mb-4 sm:mb-6 text-black tracking-wider">Social Profiles</h3>
            <ul className="list-none p-0 m-0">
              <li className="mb-2 sm:mb-3">
                <a
                  href="https://www.facebook.com/people/FIND-YOUR-DREAM-HOME/100077314248446/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] sm:text-[14px] text-[#666666] hover:text-black transition-colors duration-200"
                >
                  Facebook
                </a>
              </li>
              <li className="mb-2 sm:mb-3">
                <a
                  href="https://www.instagram.com/findyourdreamhome_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] sm:text-[14px] text-[#666666] hover:text-black transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
              <li className="mb-2 sm:mb-3">
                <a
                  href="https://www.youtube.com/@findyourdreamhome6667"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] sm:text-[14px] text-[#666666] hover:text-black transition-colors duration-200"
                >
                  Youtube
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-[13px] sm:text-[14px] font-[700] uppercase mb-4 sm:mb-6 text-black tracking-wider">Contact Us</h3>
            <div className="contact-details">
              <p className="text-[13px] sm:text-[14px] text-[#666666] mb-2 sm:mb-3 leading-relaxed">
                Call us : +91 9544593991
              </p>
              <p className="text-[13px] sm:text-[14px] text-[#666666] mb-2 sm:mb-3 leading-relaxed">
                info@fydhomes.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sub-footer bg-white border-t border-[#EAEAEA] py-4 sm:py-[25px]">
        <div className="container mx-auto px-4 sm:px-5 max-w-[1200px]">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            <div className="copyright text-[12px] sm:text-[13px] text-[#666666] text-center md:text-left">
              © FYD Media 2025 - All rights reserved
            </div>
            <div className="privacy-links flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
              <Link href="/privacy-policy" className="text-[12px] sm:text-[13px] text-black font-medium hover:text-[#D32F2F] transition-colors">
                Privacy Policy
              </Link>
              <div className="h-4 w-[1px] bg-[#EAEAEA] hidden sm:block"></div>
              <Link href="/terms-conditions" className="text-[12px] sm:text-[13px] text-black font-medium hover:text-[#D32F2F] transition-colors">
                Terms & Conditions
              </Link>
              <div className="hidden xl:flex items-center gap-2 bg-[#F7F8F9] px-3 py-1.5 rounded-[4px]">
                <span className="text-[11px] text-[#666666]">Need Help? <strong className="text-black font-bold">Chat with us</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>


    </footer>
  );
};

export default Footer;
