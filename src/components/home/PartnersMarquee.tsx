'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

const PARTNERS = [
  { id: 1, src: '/1.png', alt: 'شركة الحالي للتطوير العقاري والمقاولات' },
  { id: 2, src: '/2.png', alt: 'دهانات جوتن' },
  { id: 3, src: '/3.png', alt: 'شركة سابك' },
  { id: 4, src: '/4.png', alt: 'مصنع نخبة الغربية للبلك' },
];

export default function PartnersMarquee() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.05 : 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const MARQUEE_ITEMS = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="relative w-full overflow-hidden py-24 bg-gradient-to-br from-[#FAF8F5] via-[#FFFFFF] to-[#F7F3EB] border-b border-slate-200/40 z-10">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,169,110,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,0.02)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none -z-10 opacity-70" />

      <div className="absolute top-0 start-[10%] w-[400px] h-[400px] bg-gradient-to-br from-gold-primary/6 to-transparent rounded-full blur-3xl -z-10 animate-pulse duration-[12000ms]"></div>
      <div className="absolute bottom-0 end-[10%] w-[400px] h-[400px] bg-gradient-to-tl from-gold-warm/6 to-transparent rounded-full blur-3xl -z-10 animate-pulse duration-[15000ms]"></div>

      <div className="relative w-full mx-auto z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="flex flex-col items-center text-center mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.span variants={fadeUpVariants} className="inline-block py-1.5 px-4 text-xs font-extrabold text-gold-deep bg-gold-primary/10 border border-gold-primary/30 rounded-full uppercase mb-3.5 tracking-wider">
            شركاء النجاح
          </motion.span>
          <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-[#060D1A] liquid-gold-heading leading-tight font-el-messiri">
            نعتز بثقتهم لبناء مستقبل واعد
          </motion.h2>

          <motion.div variants={fadeUpVariants} className="mt-5 flex items-center justify-center gap-2">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gold-primary/60"></div>
            <div className="w-2.5 h-2.5 rotate-45 border border-gold-primary/70 bg-[#FAF8F5] shadow-sm"></div>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gold-primary/60"></div>
          </motion.div>
        </motion.div>

        <div className="w-full max-w-[1200px] mx-auto relative overflow-hidden py-4 select-none" dir="ltr">
          <div className="absolute top-0 bottom-0 start-0 w-20 sm:w-28 md:w-36 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent pointer-events-none z-20"></div>
          <div className="absolute top-0 bottom-0 end-0 w-20 sm:w-28 md:w-36 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent pointer-events-none z-20"></div>

          <div className="flex flex-row flex-nowrap gap-4 sm:gap-6 w-max animate-marquee-ltr hover:[animation-play-state:paused] cursor-pointer">
            {MARQUEE_ITEMS.map((partner, idx) => (
              <div
                key={`${partner.id}-marquee-${idx}`}
                dir="rtl"
                className="group relative flex items-center justify-center p-6 bg-white border border-gold-primary/30 hover:border-gold-primary/60 rounded-3xl w-[150px] sm:w-[180px] md:w-[220px] h-[90px] sm:h-[110px] md:h-[130px] transition-all duration-300 cursor-pointer overflow-hidden shrink-0 shadow-[0_8px_20px_rgba(201,169,110,0.05)] hover:shadow-[0_12px_28px_rgba(201,169,110,0.12)] hover:-translate-y-1"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={120}
                    height={60}
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
