// src/components/property/PropertyActions.tsx
'use client';

import React, { useState } from 'react';
import { Heart, Share2, Phone, MessageCircle, Info } from 'lucide-react';
import { useInquiryStore } from '@/store/useInquiryStore';

interface FavoriteShareProps {
  title: string;
}

export function PropertyFavoriteShare({ title }: FavoriteShareProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ رابط العقار لمشاركته!");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        type="button"
        aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
        className={`p-3 rounded-full border border-white/10 hover:border-gold-primary/40 transition-all duration-300 cursor-pointer ${
          isFavorite ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-white/5 text-text-secondary hover:text-white'
        }`}
      >
        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
      </button>
      <button
        type="button"
        onClick={handleShare}
        className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-gold-primary/40 text-text-secondary hover:text-white transition-all duration-300 cursor-pointer"
      >
        <Share2 className="w-5 h-5" />
      </button>
    </div>
  );
}

interface SidebarInquiryProps {
  whatsappLink: string;
}

export function PropertySidebarInquiry({ whatsappLink }: SidebarInquiryProps) {
  const openInquiry = useInquiryStore((state) => state.open);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={openInquiry}
        className="w-full py-3 text-xs sm:text-sm font-bold btn-premium-gold flex items-center justify-center gap-2 cursor-pointer font-el-messiri shadow-lg shadow-gold-primary/10"
      >
        <Phone className="w-4 h-4 shrink-0" />
        <span>حجز موعد للمعاينة</span>
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

      <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-[10px] text-text-muted">
        <Info className="w-4 h-4 text-gold-primary shrink-0" />
        <span>يرجى كتابة اسم العقار عند التواصل واتساب لتسهيل خدمتكم.</span>
      </div>
    </div>
  );
}
