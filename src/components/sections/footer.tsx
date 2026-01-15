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
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/0149254b-b2ea-40e6-ad6a-70e092f9e191/image-1768459789386.png?width=8000&height=8000&resize=contain"
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
          viewBox="0 0 24 24" 
          width="28" 
          height="28" 
          fill="currentColor"
          className="text-white sm:w-[30px] sm:h-[30px]"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
