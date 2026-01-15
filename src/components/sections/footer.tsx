import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-container bg-white pt-10 sm:pt-[60px] pb-0 font-sans border-t border-[#EAEAEA]">
      <div className="container mx-auto px-4 sm:px-5 max-w-[1200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 sm:pb-[50px]">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="footer-logo mb-6">
              <a href="/">
                <img
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/icons/FYD-LOGO-2.png"
                  alt="Find Your Dream Home"
                  width={200}
                  height={80}
                  className="object-contain max-w-[160px] sm:max-w-[200px]"
                />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[13px] sm:text-[14px] font-[700] uppercase mb-4 sm:mb-6 text-black tracking-wider">Quick Links</h3>
            <ul className="list-none p-0 m-0">
              <li className="mb-2 sm:mb-3">
                <a href="/" className="text-[13px] sm:text-[14px] text-[#666666] hover:text-black transition-colors duration-200">
                  Home
                </a>
              </li>
              <li className="mb-2 sm:mb-3">
                <a href="/about" className="text-[13px] sm:text-[14px] text-[#666666] hover:text-black transition-colors duration-200">
                  About
                </a>
              </li>
              <li className="mb-2 sm:mb-3">
                <a href="/listings" className="text-[13px] sm:text-[14px] text-[#666666] hover:text-black transition-colors duration-200">
                  Listings
                </a>
              </li>
              <li className="mb-2 sm:mb-3">
                <a href="/contact" className="text-[13px] sm:text-[14px] text-[#666666] hover:text-black transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] sm:text-[14px] font-[700] uppercase mb-4 sm:mb-6 text-black tracking-wider">Social Profiles</h3>
            <ul className="list-none p-0 m-0">
              <li className="mb-2 sm:mb-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] sm:text-[14px] text-[#666666] hover:text-black transition-colors duration-200"
                >
                  Facebook
                </a>
              </li>
              <li className="mb-2 sm:mb-3">
                <a
                  href="https://instagram.com/findyourdreamhome_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] sm:text-[14px] text-[#666666] hover:text-black transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
              <li className="mb-2 sm:mb-3">
                <a
                  href="https://youtube.com/@findyourdreamhome6667"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] sm:text-[14px] text-[#666666] hover:text-black transition-colors duration-200"
                >
                  Youtube
                </a>
              </li>
            </ul>
          </div>

          <div>
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
              <a href="/privacy-policy" className="text-[12px] sm:text-[13px] text-black font-medium hover:text-[#D32F2F] transition-colors">
                Privacy Policy
              </a>
              <div className="h-4 w-[1px] bg-[#EAEAEA] hidden sm:block"></div>
              <a href="/terms-conditions" className="text-[12px] sm:text-[13px] text-black font-medium hover:text-[#D32F2F] transition-colors">
                Terms & Conditions
              </a>
              <div className="hidden xl:flex items-center gap-2 bg-[#F7F8F9] px-3 py-1.5 rounded-[4px]">
                <span className="text-[11px] text-[#666666]">Need Help? <strong className="text-black font-bold">Chat with us</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/919544593991"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float fixed bottom-4 right-4 sm:bottom-[30px] sm:right-[30px] w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.2)] z-[9999] hover:scale-110 transition-transform duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-message-circle sm:w-[30px] sm:h-[30px]"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          <path d="M8 12h.01" />
          <path d="M12 12h.01" />
          <path d="M16 12h.01" />
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
