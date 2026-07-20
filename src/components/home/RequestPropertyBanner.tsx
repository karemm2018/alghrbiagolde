'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

interface RequestPropertyBannerProps {
  onOpenInquiry: () => void;
}

export default function RequestPropertyBanner({ onOpenInquiry }: RequestPropertyBannerProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.05 : 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative w-full md:h-[70vh] min-h-[600px] overflow-hidden py-16 md:py-0 bg-bg-deep flex items-center">
      {/* Light Background Divider */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#FFFFFF] to-[#F5EFE4] -skew-y-2 origin-top-right border-y border-border-gold/25 z-0 shadow-inner"></div>

      <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 z-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-16">

        {/* Text Column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          className="flex-[0.5] w-full md:w-[35%] text-center md:text-start space-y-6 z-10 flex flex-col items-center md:items-start"
        >
          <motion.span variants={fadeUpVariants} className="inline-block py-1.5 px-4 text-xs font-extrabold text-gold-deep bg-gold-primary/10 border border-gold-primary/30 rounded-full">
            خدمة اطلب عقارك المتميزة
          </motion.span>
          <motion.h2 variants={fadeUpVariants} className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-bg-midnight mb-2 liquid-gold-heading">
            اطلب عقارك
          </motion.h2>

          {/* Calligraphy Brush stroke style text */}
          <motion.div
            initial={{ scale: shouldReduceMotion ? 1 : 1.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              type: "spring",
              stiffness: 35,
              damping: 16,
              delay: 0.1
            }}
            className="relative inline-block"
          >
            <div className="absolute top-[52%] -translate-y-1/2 start-[-20px] end-[-25px] h-6 sm:h-7 md:h-8.5 bg-gradient-to-r from-[#9A7A40] via-[#C9A96E] to-[#9A7A40] border-y border-[#E8C98A]/40 z-0 rounded-[1px] shadow-sm"></div>

            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white relative z-10 font-aref-ruqaa [-webkit-text-stroke:5px_#FAF8F5] sm:[-webkit-text-stroke:7px_#FAF8F5] md:[-webkit-text-stroke:8px_#FAF8F5] [text-shadow:0_8px_20px_rgba(6,13,26,0.14)] select-none">
              بخطوة
            </span>

            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-bg-midnight absolute inset-0 z-[15] font-aref-ruqaa [-webkit-text-stroke:3px_#7A5E2A] select-none pointer-events-none">
              بخطوة
            </span>

            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white absolute inset-0 z-20 font-aref-ruqaa pointer-events-none select-none">
              بخطوة
            </span>
          </motion.div>

          <motion.p variants={fadeUpVariants} className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed mt-4">
            لا داعي للبحث الطويل والمجهد. حدد مواصفات منزلك أو استثمارك العقاري وسيقوم مستشارونا الماليون والعقاريون بتوفير أفضل الفرص المتوافقة مع تطلعاتك.
          </motion.p>

          <motion.div variants={fadeUpVariants} className="pt-4">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="py-3.5 px-12 text-xs sm:text-sm font-extrabold bg-bg-midnight hover:bg-gold-primary text-white hover:text-bg-midnight border border-border-gold/30 rounded-full cursor-pointer hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-md hover:shadow-xl shadow-bg-midnight/10 min-h-[44px]"
            >
              اطلب الآن
            </button>
          </motion.div>
        </motion.div>

        {/* Image Column */}
        <motion.div
          initial={{ scale: shouldReduceMotion ? 1 : 1.4, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            type: "spring",
            stiffness: 28,
            damping: 18,
            delay: 0.3
          }}
          className="flex-none md:flex-[1.3] w-full md:w-[65%] h-[280px] sm:h-[380px] md:h-[560px] lg:h-[640px] relative z-10 group bg-transparent"
        >
          <Image
            src="/projects/villa_3d_render.webp"
            alt="تصميم ثلاثي الأبعاد لفيلا فخمة"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-contain transition-transform duration-[6000ms] ease-luxury group-hover:translate-y-[-10px] group-hover:scale-105"
          />
        </motion.div>
      </div>
    </section>
  );
}
