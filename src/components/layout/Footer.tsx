// src/components/layout/Footer.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageCircle, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';
import { useInquiryStore } from '../../store/useInquiryStore';

export default function Footer() {
  const openInquiry = useInquiryStore((state) => state.open);

  return (
    <footer className="relative bg-gradient-to-b from-[#060D1A] via-[#0A1628] to-[#060D1A] pt-24 pb-0 overflow-hidden flex flex-col justify-between" dir="rtl">
      {/* Premium gradient top divider */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent z-20" />
      {/* Glow overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-gradient-to-r from-brand-primary/10 via-gold-primary/10 to-brand-primary/10 rounded-full blur-3xl -z-10"></div>

      {/* Skyline Background - Parallax */}
      <div className="absolute inset-0 select-none pointer-events-none z-0 footer-parallax-bg" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-right">

          {/* Column 1: Brand & Credentials */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-3 text-right">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <Image
                  src="/logo.webp"
                  alt="الغربية الذهبية"
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="text-md font-extrabold text-white leading-tight font-el-messiri">
                  الغربية <span className="bg-gradient-to-r from-gold-light via-gold-primary to-gold-warm bg-clip-text text-transparent font-black">الذهبية</span>
                </h4>
                <p className="text-[8px] text-gold-primary/90 tracking-[0.2em] font-serif uppercase font-medium -mt-0.5">
                  AL GHRBIA GOLDEN
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-el-messiri">
              أرقى المجمعات السكنية والفلل الفاخرة في المملكة العربية السعودية. نجسّد الفخامة في كل تفصيل إنشائي وتصميمي لنقدم تجربة عيش تليق بتطلعات عملائنا.
            </p>

            {/* License Cards */}
            <div className="space-y-3 pt-2">
              {/* Fal Card */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 shadow-sm hover:border-gold-primary/30 transition-all duration-300">
                <div className="text-right">
                  <span className="block text-[8px] text-slate-400">الترخيص العقاري (فال)</span>
                  <span className="block text-[11px] font-bold text-white font-mono">1200021665</span>
                </div>
                <div className="px-2.5 py-1 rounded bg-gold-primary/10 border border-gold-primary/20 text-gold-light text-[9px] font-extrabold font-mono">FAL</div>
              </div>

              {/* Rega Card */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 shadow-sm hover:border-gold-primary/30 transition-all duration-300">
                <div className="text-right">
                  <span className="block text-[8px] text-slate-400">الهيئة العامة للعقار</span>
                  <span className="block text-[11px] font-bold text-white font-mono">الترخيص: 1100018593</span>
                </div>
                <div className="px-2 py-1 rounded bg-brand-primary/10 border border-brand-primary/20 text-brand-light text-[9px] font-extrabold font-mono">REGA</div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-5">
            <h3 className="text-sm font-bold text-white border-r-2 border-gold-primary pr-3 leading-none font-el-messiri">روابط سريعة</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li><a href="/" className="hover:text-gold-primary hover:ps-1 transition-all duration-300 block">الرئيسية</a></li>
              <li><a href="/#listings-section" className="hover:text-gold-primary hover:ps-1 transition-all duration-300 block">الوحدات العقارية المعروضة</a></li>
              <li><a href="/#projects-section" className="hover:text-gold-primary hover:ps-1 transition-all duration-300 block">مشاريعنا المميزة</a></li>
              <li><a href="/#about-section" className="hover:text-gold-primary hover:ps-1 transition-all duration-300 block">لماذا الغربية الذهبية؟</a></li>
              <li><a href="/#contact-section" className="hover:text-gold-primary hover:ps-1 transition-all duration-300 block">اتصل بنا</a></li>
            </ul>
          </div>

          {/* Column 3: Featured Projects */}
          <div className="flex flex-col space-y-5">
            <h3 className="text-sm font-bold text-white border-r-2 border-gold-primary pr-3 leading-none font-el-messiri">مشاريعنا الفاخرة</h3>
            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-status-available"></span>
                <a href="/#projects-section" className="hover:text-gold-primary transition-colors duration-200 font-el-messiri">مجمع أبو هايل نورت (متاح)</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-status-available"></span>
                <a href="/#projects-section" className="hover:text-gold-primary transition-colors duration-200 font-el-messiri">فيلا مخطط السعيد (متاح)</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-status-soon"></span>
                <a href="/#projects-section" className="hover:text-gold-primary transition-colors duration-200 font-el-messiri">ملحق روف أمل ستارز (قريباً)</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Private Consultation */}
          <div className="flex flex-col space-y-5">
            <h3 className="text-sm font-bold text-white border-r-2 border-gold-primary pr-3 leading-none font-el-messiri">الاستشارات العقارية</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-el-messiri">
              تواصل مباشر مع مستشارك العقاري لحجز جولات معاينة خاصة ومناقشة تفاصيل الحجز.
            </p>

            <div className="space-y-3 text-xs text-slate-300">
              <a href="tel:0558837846" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-gold-primary/40 hover:bg-white/10 transition-all duration-300 shadow-sm">
                <Phone className="w-4 h-4 text-gold-primary animate-pulse" />
                <span className="font-bold text-white font-mono" dir="ltr">0558837846</span>
              </a>

              <a href="tel:920016581" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-gold-primary/40 hover:bg-white/10 transition-all duration-300 shadow-sm">
                <Phone className="w-4 h-4 text-gold-primary" />
                <span className="font-bold text-white font-mono" dir="ltr">الرقم الموحد: 920016581</span>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 shadow-sm hover:border-gold-primary/30 transition-all duration-300">
                <MapPin className="w-4 h-4 text-gold-primary" />
                <span className="font-bold text-white">جدة ، حي الصفا</span>
              </div>

              <a href="mailto:info@alghrbia.sa" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-gold-primary/40 hover:bg-white/10 transition-all duration-300 shadow-sm">
                <Mail className="w-4 h-4 text-gold-primary" />
                <span className="font-mono text-white">info@alghrbia.sa</span>
              </a>
            </div>

            <button
              type="button"
              onClick={openInquiry}
              className="w-full py-3 px-4 text-xs btn-premium-gold cursor-pointer"
            >
              طلب جولة معاينة خاصة
            </button>
          </div>

        </div>

        {/* Social Row & Corporate details */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 mb-16 border-t border-white/5 relative z-10">
          {/* Social circle buttons */}
          <div className="flex items-center gap-4">
            {/* WhatsApp */}
            <a href="https://api.whatsapp.com/send?phone=966558837846" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-bg-royal/60 border border-gold-primary/35 flex items-center justify-center hover:bg-bg-royal hover:border-gold-primary text-gold-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(201,169,110,0.4)] shadow-md" aria-label="WhatsApp">
              <MessageCircle className="w-5 h-5" />
            </a>
            {/* Instagram */}
            <a href="https://instagram.com/alghrbiagolden" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-bg-royal/60 border border-gold-primary/35 flex items-center justify-center hover:bg-bg-royal hover:border-gold-primary text-gold-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(201,169,110,0.4)] shadow-md" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            {/* X / Twitter */}
            <a href="https://x.com/alghrbiagolden" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-bg-royal/60 border border-gold-primary/35 flex items-center justify-center hover:bg-bg-royal hover:border-gold-primary text-gold-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(201,169,110,0.4)] shadow-md" aria-label="X (Twitter)">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com/company/alghrbiagolden" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-bg-royal/60 border border-gold-primary/35 flex items-center justify-center hover:bg-bg-royal hover:border-gold-primary text-gold-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(201,169,110,0.4)] shadow-md" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            {/* Facebook */}
            <a href="#" className="w-11 h-11 rounded-full bg-bg-royal/60 border border-gold-primary/35 flex items-center justify-center hover:bg-bg-royal hover:border-gold-primary text-gold-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(201,169,110,0.4)] shadow-md" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            {/* YouTube */}
            <a href="https://youtube.com/@alghrbiagolden" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-bg-royal/60 border border-gold-primary/35 flex items-center justify-center hover:bg-bg-royal hover:border-gold-primary text-gold-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(201,169,110,0.4)] shadow-md" aria-label="YouTube">
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          {/* Corporate Registration Info */}
          <div className="text-right text-[10px] text-slate-400 leading-relaxed font-el-messiri">
            <p className="font-semibold text-slate-300">شركة الغربية الذهبية للتطوير العقاري | سجل تجاري: 4030489953 | الرقم الموحد: 920016581</p>
            <p>جدة، حي السلامة، طريق الأمير سلطان | البريد الإلكتروني: info@alghrbia.sa | Alghrbia Golden Real Estate Development</p>
          </div>
        </div>

      </div>

      {/* Skyline Footer Bottom Panel */}
      <div className="w-full relative z-10 border-t border-white/5 bg-[#060D1A]/90 backdrop-blur-md pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-[10px] sm:text-xs">
          <p className="font-mono">&copy; {new Date().getFullYear()} AL GHRBIA GOLDEN. All Rights Reserved.</p>
          <p className="opacity-75 font-el-messiri mt-1">
            صُمم بالفخامة الرقمية لتلبية تطلعات الكود السعودي للبناء.
          </p>
        </div>
      </div>
    </footer>
  );
}
