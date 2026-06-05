// src/app/not-found.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-bg-midnight text-text-primary flex flex-col items-center justify-center px-4 overflow-hidden font-cairo" dir="rtl">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-deep/15 via-bg-midnight/70 to-bg-midnight/90 z-0"></div>
      
      <div className="relative z-10 text-center max-w-md mx-auto space-y-6">
        <h1 className="text-7xl sm:text-9xl font-black bg-gradient-to-r from-gold-light via-gold-primary to-gold-warm bg-clip-text text-transparent font-serif tracking-widest animate-pulse">
          404
        </h1>
        
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">الصفحة غير موجودة</h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            العنوان الذي تحاول الوصول إليه غير متوفر حالياً أو تم نقله. نسعد بمساعدتك في العودة للرئيسية واستعراض أرقى العقارات.
          </p>
        </div>

        <div className="pt-4 flex justify-center">
          <Link
            href="/"
            className="py-3 px-8 text-sm btn-premium-gold flex items-center gap-2 rounded-full cursor-pointer hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-lg shadow-gold-primary/10"
          >
            <Home className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
