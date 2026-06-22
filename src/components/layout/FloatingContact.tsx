// src/components/layout/FloatingContact.tsx
'use client';

import React from 'react';
import { Phone } from 'lucide-react';

export default function FloatingContact() {
  const whatsappUrl = "https://wa.me/966550085811?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%B4%D8%AF%D9%86%D9%8A%20%D9%84%D9%84%D9%81%D8%B1%D8%B5%20%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D9%85%D8%AA%D8%A7%D8%AD%D8%A9%D8%9F";
  const phoneUrl = "tel:+966550085811";

  return (
    <div className="fixed bottom-6 left-6 z-45 flex flex-col gap-3 items-center select-none" dir="ltr">
      
      {/* 1. Floating Phone Call Button */}
      <a
        href={phoneUrl}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-gold-deep via-gold-primary to-gold-deep hover:from-gold-primary hover:to-gold-light text-bg-midnight border border-gold-light/20 flex items-center justify-center shadow-[0_4px_16px_rgba(201,169,110,0.3)] hover:shadow-[0_4px_24px_rgba(201,169,110,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 group"
        title="اتصال هاتفي مباشر"
        aria-label="اتصال هاتفي مباشر"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2] animate-pulse" />
      </a>

      {/* 2. Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white border border-emerald-400/20 flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:shadow-[0_4px_24px_rgba(37,211,102,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
        title="محادثة واتساب فورية"
        aria-label="محادثة واتساب فورية"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-5.5 h-5.5 sm:w-7 sm:h-7 fill-current"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.733-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.07 1.006 11.993 1.006c-5.452 0-9.88 4.417-9.884 9.761-.002 1.802.502 3.55 1.462 5.076L2.482 21.07l5.244-1.373-.079-.543zM15.76 13.06c-.322-.16-1.897-.932-2.193-1.04-.297-.11-.513-.16-.73.16-.214.32-.832 1.04-1.018 1.25-.187.21-.374.24-.696.08-.322-.16-1.36-.5-2.59-1.6-1.033-.92-1.73-2.05-1.93-2.4-.2-.34-.02-.53.15-.7.15-.15.32-.35.48-.53.16-.18.21-.3.32-.5.11-.2.05-.38-.03-.54-.08-.16-.73-1.76-1-2.4-.26-.63-.52-.55-.73-.56-.18-.01-.4-.01-.61-.01-.21 0-.56.08-.85.4-.3.32-1.15 1.13-1.15 2.76 0 1.63 1.19 3.2 1.35 3.42.16.22 2.34 3.58 5.68 5.02.79.34 1.4.55 1.88.7.8.25 1.52.22 2.09.13.64-.1 1.897-.77 2.163-1.48.26-.7.26-1.3.18-1.42-.08-.12-.29-.18-.61-.34z"/>
        </svg>
      </a>

    </div>
  );
}
