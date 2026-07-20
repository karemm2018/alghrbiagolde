'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, ShieldCheck, Clock, HelpCircle } from 'lucide-react';

export default function WhyUsSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.05 : 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const CARDS = [
    {
      icon: Award,
      title: 'جودة بناء وتشييد ممتازة',
      desc: 'نلتزم بمعايير الكود السعودي للبناء مع توفير ضمانات إنشائية شاملة على الهياكل والسباكة والكهرباء.',
    },
    {
      icon: ShieldCheck,
      title: 'الشفافية المطلقة',
      desc: 'عقود قانونية موثقة وخالية من أي رسوم خفية أو بنود غير معلنة. الثقة هي الأساس بيننا وبين عملائنا.',
    },
    {
      icon: Clock,
      title: 'خبرة 15 عاماً',
      desc: 'نفخر بتسليم أكثر من 25 مشروعاً ناجحاً وأكثر من 500 وحدة سكنية لعائلات تنعم بالاستقرار الآن.',
    },
    {
      icon: HelpCircle,
      title: 'دعم ما بعد البيع',
      desc: 'فريق صيانة ودعم فني متاح لتلبية احتياجاتك وإصلاح الأعطال الطارئة حتى بعد تسليم المفاتيح.',
    },
  ];

  return (
    <section id="about-section" className="relative w-full overflow-hidden py-20 sm:py-24 bg-gradient-to-br from-[#FAF8F5] via-[#FFFFFF] to-[#F5EFE4] border-y border-slate-200/50 z-10">
      <div className="absolute top-0 start-1/4 w-[400px] h-[400px] bg-gradient-to-br from-gold-primary/5 to-transparent rounded-full blur-3xl -z-10 animate-pulse duration-[8000ms]"></div>
      <div className="absolute bottom-0 end-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-brand-primary/5 to-transparent rounded-full blur-3xl -z-10 animate-pulse duration-[10000ms]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="flex flex-col items-center text-center mb-12 sm:mb-16"
        >
          <motion.span variants={fadeUpVariants} className="inline-block py-1.5 px-4 text-xs font-extrabold text-gold-deep bg-gold-primary/10 border border-gold-primary/30 rounded-full uppercase mb-3.5">
            سر تميزنا
          </motion.span>
          <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-[#060D1A] liquid-gold-heading leading-tight font-el-messiri">
            لماذا يختار العملاء شركة الغربية الذهبية؟
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center"
        >
          {CARDS.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeUpVariants}
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group relative p-8 bg-white border border-gold-primary/50 rounded-3xl shadow-[0_25px_60px_rgba(201,169,110,0.12)] hover:shadow-[0_30px_70px_rgba(201,169,110,0.18)] transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
              >
                <div className="absolute top-0 start-0 end-0 h-1 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent rounded-t-full"></div>

                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-deep shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <IconComp className="w-7 h-7 text-gold-deep drop-shadow-[0_2px_4px_rgba(201,169,110,0.3)]" />
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-gold-deep mb-3 transition-colors duration-200">{card.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
