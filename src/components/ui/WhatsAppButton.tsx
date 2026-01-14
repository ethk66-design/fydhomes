"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "+919544593991";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[2000] bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:scale-110 transition-transform duration-300 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-black px-3 py-1.5 rounded-md text-[13px] font-semibold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
