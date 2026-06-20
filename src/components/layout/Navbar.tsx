// src/components/layout/Navbar.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, Briefcase, Info, Phone, X } from 'lucide-react';
import { useInquiryStore } from '../../store/useInquiryStore';

export default function Navbar() {
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const openInquiry = useInquiryStore((state) => state.open);

  const navLinks = [
    { href: '/', label: 'الرئيسية', icon: Home },
    { href: '/properties', label: 'العقارات', icon: Building2 },
    { href: '/projects', label: 'مشاريعنا', icon: Briefcase },
    { href: '/about', label: 'من نحن', icon: Info },
    { href: '/contact', label: 'التواصل', icon: Phone },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-45 bg-gradient-to-b from-[#0D213F]/90 to-[#08172D]/95 backdrop-blur-2xl border border-gold-primary/25 rounded-[2.2rem] sm:rounded-full transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:border-gold-primary/45 hover:shadow-[0_20px_60px_rgba(201,169,110,0.1),inset_0_1px_1px_rgba(255,255,255,0.2)]">
      <div className="px-4 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo (Right side in RTL) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center">
            <Image
              src="/logo.webp"
              alt="الغربية الذهبية"
              width={48}
              height={48}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <div className="text-right flex flex-col justify-center">
            <span className="block text-xs sm:text-sm font-extrabold text-white leading-tight font-el-messiri">
              الغربية <span className="bg-gradient-to-r from-gold-light via-gold-primary to-gold-warm bg-clip-text text-transparent font-black">الذهبية</span>
            </span>
            <span className="block text-[6px] sm:text-[8px] text-gold-primary/90 tracking-[0.2em] font-serif uppercase font-medium -mt-0.5">
              AL GHRBIA GOLDEN
            </span>
          </div>
        </div>

        {/* Navigation links (Center) */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-semibold relative bg-[#060D1A]/40 border border-white/5 rounded-full p-1.5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.3)]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-xs xl:text-sm transition-all duration-300 flex items-center gap-2 rounded-full group ${
                  isActive
                    ? 'text-gold-primary font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-gold-primary/10 border border-gold-primary/30 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 z-10 ${isActive ? 'text-gold-primary' : 'text-slate-400 group-hover:text-gold-primary/85'}`} />
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA Button & Mobile Trigger (Left side in RTL) */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            className="py-1.5 px-3 sm:py-2.5 sm:px-5 text-[10px] sm:text-xs font-bold btn-premium-gold shrink-0 font-el-messiri"
            onClick={openInquiry}
          >
            <span>احجز جولتك <span className="hidden sm:inline">الخاصة</span></span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-white/10 text-slate-300 hover:text-gold-primary transition-colors cursor-pointer shrink-0"
            title="القائمة"
            aria-label="القائمة"
          >
            {showMobileMenu ? (
              <X className="w-5 h-5 text-gold-primary" />
            ) : (
              <svg className="w-5 h-5 text-gold-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Dropdown */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute top-full left-0 right-0 w-full mt-3.5 md:hidden z-40 overflow-hidden"
          >
            <div className="p-5 bg-gradient-to-b from-[#0D213F]/95 to-[#08172D]/98 backdrop-blur-2xl border border-gold-primary/20 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col gap-2.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setShowMobileMenu(false)}
                    className={`px-4 py-3 text-xs sm:text-sm transition-all flex items-center gap-3 rounded-xl border ${
                      isActive
                        ? 'text-gold-primary font-bold bg-gold-primary/10 border-gold-primary/30 shadow-[inset_0_1px_10px_rgba(201,169,110,0.05)]'
                        : 'text-slate-300 hover:text-white border-transparent hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-gold-primary' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                    {isActive && <span className="ms-auto w-1.5 h-1.5 rounded-full bg-gold-primary shadow-[0_0_8px_#C9A96E]"></span>}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
