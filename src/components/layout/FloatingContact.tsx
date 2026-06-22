// src/components/layout/FloatingContact.tsx
'use client';

import React from 'react';
import { Phone } from 'lucide-react';

export default function FloatingContact() {
  const whatsappUrl = "https://wa.me/966550085811?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%B4%D8%AF%D9%86%D9%8A%20%D9%84%D9%84%D9%81%D8%B1%D8%B5%20%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D9%85%D8%AA%D8%A7%D8%AD%D8%A9%D8%9F";
  const phoneUrl = "tel:+966550085811";

  return (
    <>
      {/* 1. Floating Phone Call Button - Bottom Left */}
      <a
        href={phoneUrl}
        className="fixed bottom-6 left-6 z-45 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-gold-deep via-gold-primary to-gold-deep hover:from-gold-primary hover:to-gold-light text-bg-midnight border border-gold-light/20 flex items-center justify-center shadow-[0_4px_16px_rgba(201,169,110,0.3)] hover:shadow-[0_4px_24px_rgba(201,169,110,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 group select-none"
        title="اتصال هاتفي مباشر"
        aria-label="اتصال هاتفي مباشر"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2] animate-pulse" />
      </a>

      {/* 2. Floating WhatsApp Button - Bottom Right */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-45 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white border border-emerald-400/20 flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:shadow-[0_4px_24px_rgba(37,211,102,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 select-none"
        title="محادثة واتساب فورية"
        aria-label="محادثة واتساب فورية"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-6 h-6 sm:w-7 sm:h-7 fill-current"
        >
          <path d="M12.031 2C6.446 2 1.922 6.476 1.922 12c0 2.215.656 4.28 1.776 6.012L2 22.48l4.67-1.213C8.36 22.25 10.143 22.8 12.03 22.8c5.586 0 10.11-4.475 10.11-10c0-5.524-4.524-10-10.11-10zm6.758 14.283c-.277.778-1.611 1.483-2.22 1.53-.58.045-1.127.228-3.702-.79-3.29-1.302-5.328-4.572-5.492-4.786-.164-.214-1.332-1.745-1.332-3.328 0-1.583.847-2.36 1.144-2.673.296-.314.646-.39.862-.39s.43.003.616.012c.193.008.452-.07.708.547.256.618.874 2.106.95 2.256.075.15.126.326.025.52-.1.196-.15.318-.297.487-.148.168-.312.378-.445.508-.148.145-.304.303-.13.597.172.293.768 1.252 1.65 2.023.163.14.3.26.474.37.525.334.83.428 1.112.27.3-.17.653-.515.82-.724.168-.21.32-.178.536-.1.216.078 1.37.636 1.605.753.235.116.392.174.45.27.058.096.058.556-.22 1.334z"/>
        </svg>
      </a>
    </>
  );
}
