// src/components/property/ProjectActions.tsx
'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useInquiryStore } from '@/store/useInquiryStore';

interface ProjectInquiryProps {
  whatsappLink: string;
}

export function ProjectSidebarInquiry({ whatsappLink }: ProjectInquiryProps) {
  const openInquiry = useInquiryStore((state) => state.open);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={openInquiry}
        className="w-full py-3 text-xs sm:text-sm font-bold btn-premium-gold flex items-center justify-center gap-2 cursor-pointer font-el-messiri shadow-lg shadow-gold-primary/10"
      >
        <Phone className="w-4 h-4 shrink-0" />
        <span>حجز استشارة أو موعد زيارة</span>
      </button>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3 text-xs sm:text-sm font-bold bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 hover:border-[#25D366]/40 rounded-full flex items-center justify-center gap-2 transition-all duration-300 text-center font-el-messiri"
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        <span>مراسلة عبر واتساب</span>
      </a>
    </div>
  );
}
