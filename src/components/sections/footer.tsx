import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full bg-white font-sans text-[#1a1a1a]">
      {/* Upper Footer Section */}
      <div className="container mx-auto px-[15px] pt-[80px] pb-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] lg:gap-[40px]">
          
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <div className="mb-[20px]">
              <a href="/">
                <Image 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0149254b-b2ea-40e6-ad6a-70e092f9e191-fydhomes-in/assets/icons/FYD-LOGO-4.png"
                  alt="Find Your Dream Home"
                  width={160}
                  height={100}
                  className="object-contain h-auto"
                />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-bold text-[16px] mb-[25px]">Quick Links</h4>
            <ul className="space-y-[12px]">
              <li>
                <a href="/" className="text-[#1a1a1a] hover:text-[#2b7387] text-[14px] transition-colors">Home</a>
              </li>
              <li>
                <a href="/about" className="text-[#1a1a1a] hover:text-[#2b7387] text-[14px] transition-colors">About</a>
              </li>
              <li>
                <a href="/listings" className="text-[#1a1a1a] hover:text-[#2b7387] text-[14px] transition-colors">Listings</a>
              </li>
              <li>
                <a href="/contact" className="text-[#1a1a1a] hover:text-[#2b7387] text-[14px] transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social Profiles Column */}
          <div>
            <h4 className="font-bold text-[16px] mb-[25px]">Social Profiles</h4>
            <ul className="space-y-[12px]">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#1a1a1a] hover:text-[#2b7387] text-[14px] transition-colors">Facebook</a>
              </li>
              <li>
                <a href="https://www.instagram.com/findyourdreamhome_/" target="_blank" rel="noopener noreferrer" className="text-[#1a1a1a] hover:text-[#2b7387] text-[14px] transition-colors">Instagram</a>
              </li>
              <li>
                <a href="https://www.youtube.com/@findyourdreamhome6667" target="_blank" rel="noopener noreferrer" className="text-[#1a1a1a] hover:text-[#2b7387] text-[14px] transition-colors">Youtube</a>
              </li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div>
            <h4 className="font-bold text-[16px] mb-[25px]">Contact Us</h4>
            <div className="space-y-[12px]">
              <p className="text-[14px] leading-[1.6] mb-0">
                Call us: <a href="tel:+919544593991" className="hover:text-[#2b7387] transition-colors">+91 9544593991</a>
              </p>
              <p className="text-[14px] leading-[1.6] mb-0">
                <a href="mailto:info@fydhomes.com" className="hover:text-[#2b7387] transition-colors">info@fydhomes.com</a>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-[#e5e5e5] py-[20px]">
        <div className="container mx-auto px-[15px] flex flex-col md:flex-row justify-between items-center text-[12px] text-[#737373]">
          <div className="order-2 md:order-1 mt-[10px] md:mt-0">
            © FYD Media 2025 - All rights reserved
          </div>
          <div className="order-1 md:order-2 flex items-center space-x-[20px]">
            <a href="/privacy-policy" className="hover:text-[#2b7387] transition-colors">Privacy Policy</a>
            <a href="/terms-conditions" className="hover:text-[#2b7387] transition-colors">Terms & Conditions</a>
            <div className="hidden lg:flex items-center text-[#1a1a1a] font-medium ml-[10px]">
              <span>Need Help? Chat with us</span>
              <a 
                href="https://wa.me/919544593991" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-[8px] bg-[#1db954] p-[8px] rounded-full text-white"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.002 12.05c0 2.123.554 4.197 1.604 6.013L0 24l6.135-1.609a11.83 11.83 0 005.912 1.586h.005c6.634 0 12.045-5.413 12.048-12.051a11.85 11.85 0 00-3.535-8.52z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;