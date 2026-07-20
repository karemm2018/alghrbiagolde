'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';

const PanoramaViewer = dynamic(() => import('@/components/ui/PanoramaViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] sm:h-[450px] bg-bg-midnight/20 animate-pulse rounded-2xl flex items-center justify-center text-text-muted text-xs">
      جاري تحميل العرض البانورامي...
    </div>
  )
});

interface VirtualTourSectionProps {
  onOpenInquiry: () => void;
}

export default function VirtualTourSection({ onOpenInquiry }: VirtualTourSectionProps) {
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
    <section className="relative w-full overflow-hidden py-20 sm:py-24 bg-bg-deep">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#FFFFFF] to-[#F5EFE4] border-y border-slate-200/50 z-0 shadow-inner"></div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Info Details */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-start space-y-4 lg:space-y-6 z-10"
        >
          <motion.span variants={fadeUpVariants} className="inline-block py-1.5 px-4 text-xs font-extrabold text-gold-deep bg-gold-primary/10 border border-gold-primary/30 rounded-full">
            تجربة غامرة فريدة
          </motion.span>
          <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-bg-midnight liquid-gold-heading">
            جولة افتراضية تفاعلية 360°
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
            عش تجربة التواجد الفعلي داخل أرقى مشاريعنا السكنية. اسحب الصورة البانورامية للمشاهدة حولك واكتشف التفاصيل الهندسية والتشطيبات الفاخرة للغرف المزدوجة والصالات الواسعة.
          </motion.p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="button"
              className="py-3 px-6 text-xs sm:text-sm font-extrabold btn-premium-gold min-w-[200px] min-h-[44px]"
              onClick={onOpenInquiry}
            >
              احجز جولة حضورية خاصة
            </button>
          </div>
        </motion.div>

        {/* Interactive Panorama Canvas */}
        <div className="lg:col-span-8 w-full z-10 rounded-3xl overflow-hidden border border-gold-primary/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] bg-bg-royal/20 p-1 hover:border-gold-primary/50 transition-all duration-500">
          <PanoramaViewer
            imageSrc="/projects/panorama-penthouse.webp"
            heightClass="h-[400px] sm:h-[450px]"
          />
        </div>
      </div>
    </section>
  );
}
