// src/app/about/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import CountUp from 'react-countup';
import {
  Award,
  ShieldCheck,
  Clock,
  Eye,
  Target,
  Quote,
  Heart,
  Landmark,
  Building2,
  Trophy,
  Calendar,
  Briefcase,
  ChevronLeft
} from 'lucide-react';
import { useInquiryStore } from '../../store/useInquiryStore';

// Sub-component for luxury split-word text animations
const AnimateWords = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(' ');
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={`inline-block ${className || ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.04,
            delayChildren: delay
          }
        }
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="inline-block mx-[0.15em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function AboutPage() {
  const openInquiry = useInquiryStore((state) => state.open);
  const shouldReduceMotion = useReducedMotion();
  const [activeTimelineYear, setActiveTimelineYear] = useState<number | null>(null);

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : '10vh' },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Core values mock data
  const values = [
    {
      icon: Award,
      title: 'الجودة الفائقة',
      description: 'لا نساوم أبداً في اختيار المواد ومقاييس البناء. نلتزم بأعلى المعايير الهندسية لضمان استدامة عقاراتنا وفخامتها المطلقة.'
    },
    {
      icon: ShieldCheck,
      title: 'الشفافية المطلقة',
      description: 'نبني جسوراً من الثقة المتينة مع شركائنا ومستثمرينا عبر الصدق والوضوح التام في كافة مراحل التطوير والتعاقد.'
    },
    {
      icon: Landmark,
      title: 'الابتكار المستدام',
      description: 'ندمج أحدث التقنيات الذكية ومفاهيم الهندسة الصديقة للبيئة لتقديم مجتمعات سكنية عصرية تضمن توفير الطاقة والراحة.'
    },
    {
      icon: Heart,
      title: 'التركيز على العميل',
      description: 'نضع احتياجات العميل وتطلعاته الاستثمارية في مقدمة أولوياتنا قبل وخلال ومرحلة ما بعد تسليم الوحدات السكنية.'
    }
  ];

  // Timeline events mock data
  const timelineEvents = [
    {
      year: 2012,
      title: 'التأسيس والإنطلاقة الأولى',
      description: 'تأسست الشركة بمقرها الرئيسي واضعة التميز الهندسي ومصداقية التنفيذ نصب عينيها لبدء مشاريع عمرانية فريدة بالمنطقة الغربية.',
      badge: 'الخطوة الأولى'
    },
    {
      year: 2017,
      title: 'برنامج أمل ستارز والريادة السكنية',
      description: 'إطلاق وتسليم سلسلة مشاريع "أمل ستارز" بأرقى أحياء جدة، مسجلين تسليم أكثر من 250 وحدة سكنية متكاملة لعملائنا.',
      badge: 'إنجازات فارقة'
    },
    {
      year: 2021,
      title: 'التوسع الجغرافي والشراكات الكبرى',
      description: 'دخول سوق التطوير العقاري في الرياض بمشاريع نوعية، واعتماد مشاريعنا لدى البنوك والجهات التمويلية الوطنية الكبرى.',
      badge: 'آفاق جديدة'
    },
    {
      year: 2026,
      title: 'الاستدامة والحلول السكنية الذكية',
      description: 'تبني حلول البناء المستدام الصديق للبيئة وتطوير مشاريع ذكية بالكامل تواكب أسلوب الحياة العصري وتطلعات رؤية 2030.',
      badge: 'الريادة المستقبلية'
    }
  ];

  return (
    <div className="bg-[#060D1A] text-white min-h-screen relative overflow-x-hidden font-tajawal select-none dir-rtl">
      
      {/* ----------------------------------------------------
         1. Luxury Cinematic Hero Section (FullScreen / 90vh) - Dark Theme
         ---------------------------------------------------- */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-bg-deep">
        {/* Ken Burns background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.06 }}
            transition={{ duration: 16, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse' }}
            className="relative w-full h-full"
          >
            <Image
              src="/hero-bg-2.webp"
              alt="تطوير عقاري فاخر الغربية الذهبية"
              fill
              className="object-cover object-center opacity-65"
              priority
            />
          </motion.div>
        </div>

        {/* Luxury Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060D1A]/20 via-[#060D1A]/55 to-[#060D1A] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_#060D1A_90%)] z-10 opacity-60" />

        {/* Glowing Ambient Light Leaks */}
        <div className="absolute top-[8%] right-[8%] w-[600px] h-[600px] bg-gradient-to-br from-gold-primary/15 via-transparent to-transparent rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse duration-[10000ms]" />

        {/* Hero Content Area */}
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-12 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block py-1.5 px-4 text-[9px] sm:text-[10px] font-extrabold text-gold-light bg-gold-primary/15 border border-gold-primary/45 rounded-lg uppercase tracking-wider mb-6 font-el-messiri shadow-[0_0_15px_rgba(201,169,110,0.15)] whitespace-nowrap"
          >
            مسيرة الريادة والتميّز العقاري / EST. 2012
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight font-el-messiri drop-shadow-[0_8px_30px_rgba(0,0,0,0.7)] select-none">
            <span className="block mb-2">بناء الغد برؤية</span>
            <span className="bg-gradient-to-r from-gold-light via-gold-primary to-gold-warm bg-clip-text text-transparent font-black block sm:inline-block relative hover:scale-[1.015] transition-transform duration-500">
              الغربية الذهبية
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
            </span>
          </h1>

          <div className="text-xs sm:text-sm md:text-base text-slate-200 max-w-3xl mx-auto leading-relaxed mt-6 font-tajawal font-medium">
            <AnimateWords
              text="نصنع المجتمعات العمرانية الفاخرة التي تلبي شغف الرفاهية والخصوصية، ونكرس خبراتنا الهندسية لصياغة بيئات معيشية واستثمارية مستدامة تعيد تعريف جودة الحياة."
              delay={0.4}
            />
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-4 justify-center items-center z-30"
          >
            <Link
              href="/properties"
              className="py-3 px-8 text-xs sm:text-sm font-extrabold btn-premium-gold flex items-center justify-center gap-2 rounded-full cursor-pointer hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-gold-primary/10 whitespace-nowrap"
            >
              <Building2 className="w-4 h-4 text-bg-midnight shrink-0" />
              <span>تصفح العقارات</span>
            </Link>
            
            <Link
              href="/projects"
              className="py-3 px-8 text-xs sm:text-sm font-extrabold btn-premium-glass flex items-center justify-center gap-2 rounded-full cursor-pointer hover:scale-[1.03] transition-all duration-300 shadow-lg whitespace-nowrap"
            >
              <Briefcase className="w-4 h-4 text-gold-primary shrink-0" />
              <span>مشاريعنا العقارية</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------
         2. Legacy & Identity Section (Our Story) with Statistics Card - Light Theme
         ---------------------------------------------------- */}
      <div className="bg-gradient-to-br from-[#FAF8F5] via-[#FFFFFF] to-[#F5EFE4] border-y border-slate-200/50 relative z-10">
        
        {/* 1.5. Floating Premium Statistics Card - Dark Theme */}
        <div className="relative z-30 max-w-6xl mx-auto w-[92%] -mt-[calc(3rem+5vh)] sm:-mt-[calc(4rem+5vh)] mb-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
            className="py-6 px-8 sm:py-8 sm:px-12 bg-gradient-to-br from-[#0A1628]/95 via-[#0A1628]/98 to-[#060D1A]/95 border border-gold-primary/30 rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl relative overflow-hidden"
          >
            {/* Subtle gold line on top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
            
            {/* Soft ambient light leak */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-primary/5 blur-3xl pointer-events-none rounded-full" />
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10">
              {/* Stat 1 */}
              <motion.div variants={fadeUpVariants} className="text-center flex flex-col items-center justify-center group cursor-default relative">
                <span className="block text-3xl sm:text-4xl md:text-5xl font-black text-gold-primary font-mono tracking-tight leading-none mb-3 drop-shadow-[0_2px_10px_rgba(201,169,110,0.25)]">
                  <CountUp end={15} duration={2.5} enableScrollSpy scrollSpyOnce />+
                </span>
                <span className="block text-xs sm:text-sm font-extrabold text-white font-el-messiri uppercase tracking-wider mb-1">
                  عاماً من الخبرة العقارية
                </span>
                <span className="block text-[10px] text-slate-400 font-tajawal">
                  مسيرة متواصلة من التطوير المتميز
                </span>
                <div className="absolute left-0 top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-gold-primary/20 to-transparent hidden lg:block" />
              </motion.div>

              {/* Stat 2 */}
              <motion.div variants={fadeUpVariants} className="text-center flex flex-col items-center justify-center group cursor-default relative">
                <span className="block text-3xl sm:text-4xl md:text-5xl font-black text-gold-primary font-mono tracking-tight leading-none mb-3 drop-shadow-[0_2px_10px_rgba(201,169,110,0.25)]">
                  <CountUp end={5000} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />+
                </span>
                <span className="block text-xs sm:text-sm font-extrabold text-white font-el-messiri uppercase tracking-wider mb-1">
                  وحدة سكنية واستثمارية
                </span>
                <span className="block text-[10px] text-slate-400 font-tajawal">
                  تم تسليمها وفق أعلى مواصفات الجودة
                </span>
                <div className="absolute left-0 top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-gold-primary/20 to-transparent hidden lg:block" />
              </motion.div>

              {/* Stat 3 */}
              <motion.div variants={fadeUpVariants} className="text-center flex flex-col items-center justify-center group cursor-default relative">
                <span className="block text-3xl sm:text-4xl md:text-5xl font-black text-gold-primary font-mono tracking-tight leading-none mb-3 drop-shadow-[0_2px_10px_rgba(201,169,110,0.25)]">
                  <CountUp end={2.5} decimals={1} duration={2.5} enableScrollSpy scrollSpyOnce />B+
                </span>
                <span className="block text-xs sm:text-sm font-extrabold text-white font-el-messiri uppercase tracking-wider mb-1">
                  ريال حجم الاستثمارات
                </span>
                <span className="block text-[10px] text-slate-400 font-tajawal">
                  إدارة محفظة عقارية ضخمة وقيمة متنامية
                </span>
                <div className="absolute left-0 top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-gold-primary/20 to-transparent hidden lg:block" />
              </motion.div>

              {/* Stat 4 */}
              <motion.div variants={fadeUpVariants} className="text-center flex flex-col items-center justify-center group cursor-default relative">
                <span className="block text-3xl sm:text-4xl md:text-5xl font-black text-gold-primary font-mono tracking-tight leading-none mb-3 drop-shadow-[0_2px_10px_rgba(201,169,110,0.25)]">
                  <CountUp end={98} duration={2.5} enableScrollSpy scrollSpyOnce />%
                </span>
                <span className="block text-xs sm:text-sm font-extrabold text-white font-el-messiri uppercase tracking-wider mb-1">
                  نسبة رضا وسعادة العملاء
                </span>
                <span className="block text-[10px] text-slate-400 font-tajawal">
                  شراكة متينة وخدمة عملاء استثنائية
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Our Story section */}
        <section className="relative w-full overflow-hidden pt-12 pb-24">
          {/* Soft Gold glows to enhance light theme luxury */}
          <div className="absolute top-10 left-1/4 w-[350px] h-[350px] bg-gold-primary/5 rounded-full blur-3xl -z-10 animate-pulse duration-[8000ms]" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
            >
              {/* Right Column: Identity Content */}
              <div className="lg:col-span-7 space-y-6 text-right order-2 lg:order-1">
                <div className="block">
                  <motion.span
                    variants={fadeUpVariants}
                    className="inline-block py-1 px-3 text-[10px] font-extrabold text-gold-deep bg-gold-primary/10 border border-gold-primary/30 rounded-lg font-el-messiri whitespace-nowrap"
                  >
                    قصتنا وإرثنا العقاري
                  </motion.span>
                </div>
                
                <motion.h2
                  variants={fadeUpVariants}
                  className="text-2xl sm:text-4xl font-extrabold text-[#060D1A] leading-tight font-el-messiri liquid-gold-heading"
                >
                  مفهوم ريادي للتطوير العقاري <br />
                  <span className="text-gold-deep font-black">يصنع فارقاً مستداماً</span>
                </motion.h2>
                
                <motion.p
                  variants={fadeUpVariants}
                  className="text-xs sm:text-sm text-slate-600 leading-relaxed font-tajawal transition-colors duration-300 hover:text-slate-900"
                >
                  تأسست شركة الغربية الذهبية للتطوير العقاري لتكون نموذجاً وطنياً رائداً في صياغة البيئات والمجتمعات العمرانية الفاخرة بالمملكة العربية السعودية. نحن لا نبني مجرد جدران خرسانية صامتة، بل نصمم بيئات متكاملة تنبض بالحياة والرقي، مستعينين بأفضل الخبرات الهندسية وأرقى التصاميم المعمارية العالمية التي تتناسب مع هوية وثقافة مجتمعنا السعودي وتواكب تطلعات رؤية المملكة 2030.
                </motion.p>

                <motion.p
                  variants={fadeUpVariants}
                  className="text-xs sm:text-sm text-slate-600 leading-relaxed font-tajawal transition-colors duration-300 hover:text-slate-900"
                >
                  نحن نؤمن بأن شراكتنا مع عملائنا تبدأ من الخطوة الأولى للتصميم وتستمر كإرث عقاري مستدام، ملتزمين بمبادئ التسليم المنضبط والشفافية التامة، مما جعلنا الاختيار الأول لنخبة المستثمرين والباحثين عن مسكن يجمع بين الخصوصية والرفاهية المطلقة في جدة والرياض ومكة المكرمة.
                </motion.p>

                {/* Quote Card updated for Light background */}
                <motion.div
                  variants={fadeUpVariants}
                  className="p-6 sm:p-8 bg-white border border-slate-200/80 border-s-4 border-s-gold-primary rounded-2xl relative overflow-hidden my-6 shadow-lg group/quote cursor-default"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gold-primary/5 blur-xl pointer-events-none rounded-full" />
                  <Quote className="absolute top-4 left-6 w-14 h-14 text-gold-primary/10 select-none pointer-events-none group-hover/quote:scale-110 transition-transform duration-500" />
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-tajawal transition-colors duration-300 group-hover/quote:text-slate-900">
                    "رؤيتنا الاستثمارية ترتكز على تقديم منتجات عقارية لا تفقد قيمتها بمرور الزمن، بل تنمو كأصول عقارية مستدامة تضمن الرفاهية الكاملة وتلبي تطلعات الأجيال القادمة."
                  </p>
                  <span className="block text-[10px] sm:text-xs font-bold text-gold-deep mt-4 font-el-messiri transition-all duration-300 group-hover/quote:translate-x-[-4px]">
                    — رئيس مجلس الإدارة، شركة الغربية الذهبية
                  </span>
                </motion.div>
              </div>

              {/* Left Column: Collage */}
              <div className="lg:col-span-5 relative order-1 lg:order-2 flex items-center justify-center p-4">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleUpVariants}
                  className="relative w-full max-w-[420px] aspect-[4/5]"
                >
                  {/* Gold glow behind collage */}
                  <div className="absolute inset-0 bg-gold-primary/15 blur-2xl pointer-events-none rounded-full" />

                  {/* Back Main Image */}
                  <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-gold-primary/45 shadow-[0_20px_50px_rgba(201,169,110,0.18)] group/img1 z-10 transition-all duration-500 hover:border-gold-primary/70">
                    <Image
                      src="/projects/amal-stars-showcase.webp"
                      alt="مشروع الغربية الفاخر"
                      fill
                      className="object-cover transition-transform duration-[2000ms] group-hover/img1:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Foreground Floating Image */}
                  <motion.div
                    whileHover={{ y: -10, x: -5, scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="absolute bottom-[-24px] start-[-32px] w-[55%] aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-[0_20px_45px_rgba(201,169,110,0.25)] z-20 group/img2 cursor-pointer"
                  >
                    <Image
                      src="/properties/villa.webp"
                      alt="تصميم الفلل المستقلة"
                      fill
                      className="object-cover transition-transform duration-700 group-hover/img2:scale-108"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover/img2:opacity-0 transition-opacity duration-300" />
                  </motion.div>

                  {/* Floating badge */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-[-20px] end-[-20px] w-24 h-24 bg-gradient-to-br from-gold-deep via-gold-primary to-gold-warm border border-gold-light/45 rounded-full p-2 z-25 flex flex-col items-center justify-center text-center shadow-lg pointer-events-none"
                  >
                    <span className="block text-[8px] font-black text-bg-midnight leading-none font-el-messiri">15 عامًا من</span>
                    <span className="block text-[12px] font-black text-bg-midnight font-el-messiri mt-0.5">الحرفية</span>
                    <span className="block text-[7px] text-bg-midnight/70 font-mono tracking-widest mt-1">EXPERIENCE</span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* ----------------------------------------------------
         3. Vision & Mission Section - Dark Theme
         ---------------------------------------------------- */}
      <section className="py-24 bg-gradient-to-b from-bg-deep via-bg-navy to-bg-deep border-y border-border-gold/15 relative z-10">
        {/* Glow leaks */}
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-gradient-to-br from-brand-royal/8 via-transparent to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
          >
            {/* Vision Card (Cream Colored inverted card) */}
            <motion.div
              variants={fadeUpVariants}
              whileHover={{ y: -8, scale: 1.015 }}
              className="p-8 sm:p-12 bg-[#FAF8F5] border border-gold-primary/45 rounded-[2.5rem] shadow-[0_30px_70px_rgba(201,169,110,0.15)] flex flex-col justify-between relative overflow-hidden group cursor-default transition-all duration-500"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-primary/5 to-transparent blur-2xl pointer-events-none rounded-full" />
              
              <div className="text-right space-y-4">
                <div className="w-14 h-14 rounded-full bg-gold-primary/10 border border-gold-primary/35 flex items-center justify-center text-gold-deep shadow-inner mb-6 transition-all duration-500 group-hover:bg-gold-primary group-hover:text-bg-midnight group-hover:scale-105">
                  <Eye className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#060D1A] font-el-messiri transition-colors duration-300 group-hover:text-gold-deep">
                  رؤيتنا الاستراتيجية
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-tajawal transition-colors duration-300 group-hover:text-slate-800">
                  أن نتبوأ الصدارة كأكثر المطورين العقاريين ثقة وتفضيلاً في المملكة العربية السعودية، عبر صياغة مفاهيم سكنية مبتكرة ترتقي بجودة الحياة وتخلق قيمة استثمارية مستدامة تتجاوز توقعات عملائنا الأوفياء وتساهم في إعمار مستقبل حضري مشرف يخدم تطلعات رؤية 2030.
                </p>
              </div>

              <div className="pt-6 mt-8 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[9px] font-bold text-gold-deep uppercase font-mono tracking-wider">Vision 2030 Aligned</span>
                <Trophy className="w-4 h-4 text-gold-primary" />
              </div>
            </motion.div>

            {/* Mission Card (Cream Colored inverted card) */}
            <motion.div
              variants={fadeUpVariants}
              whileHover={{ y: -8, scale: 1.015 }}
              className="p-8 sm:p-12 bg-[#FAF8F5] border border-gold-primary/45 rounded-[2.5rem] shadow-[0_30px_70px_rgba(201,169,110,0.15)] flex flex-col justify-between relative overflow-hidden group cursor-default transition-all duration-500"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-primary/5 to-transparent blur-2xl pointer-events-none rounded-full" />
              
              <div className="text-right space-y-4">
                <div className="w-14 h-14 rounded-full bg-gold-primary/10 border border-gold-primary/35 flex items-center justify-center text-gold-deep shadow-inner mb-6 transition-all duration-500 group-hover:bg-gold-primary group-hover:text-bg-midnight group-hover:scale-105">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#060D1A] font-el-messiri transition-colors duration-300 group-hover:text-gold-deep">
                  رسالتنا التشغيلية
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-tajawal transition-colors duration-300 group-hover:text-slate-800">
                  الالتزام الصارم بأعلى مستويات الجودة الهندسية والمصداقية التشغيلية، وتهيئة بيئات سكنية واستثمارية فائقة الأمان والاستدامة، تلبي أسلوب الحياة العصري للنخبة وتسهم إيجاباً في تنمية القطاع العقاري والاقتصادي للوطن.
                </p>
              </div>

              <div className="pt-6 mt-8 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[9px] font-bold text-gold-deep uppercase font-mono tracking-wider">Uncompromising Commitment</span>
                <ShieldCheck className="w-4 h-4 text-gold-primary" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------
         4. Dynamic Interactive Legacy Timeline - Light Theme
         ---------------------------------------------------- */}
      <section className="py-24 relative z-10 bg-gradient-to-br from-[#FAF8F5] via-[#FFFFFF] to-[#F5EFE4] border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="inline-block py-1.5 px-4 text-[10px] font-extrabold text-gold-deep bg-gold-primary/10 border border-gold-primary/30 rounded-lg uppercase tracking-widest mb-3.5 font-el-messiri whitespace-nowrap">
              رحلة التطوير العقاري
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#060D1A] leading-tight font-el-messiri liquid-gold-heading">
              مسيرة مكللة بالإنجازات والنمو
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto font-tajawal">
              تصفح المراحل التاريخية التي صنعت فارقًا حقيقيًا في تاريخ التطوير السكني والاستثماري بالمملكة
            </p>
          </div>

          {/* Interactive Timeline Body */}
          <div className="relative mt-12">
            
            {/* Base Horizontal Connecting line (Visible on desktop) */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-200 -translate-y-1/2 hidden lg:block z-0" />
            
            {/* Active Highlight Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-primary to-transparent -translate-y-1/2 hidden lg:block z-0 opacity-40" />

            {/* Events Grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10 items-stretch">
              {timelineEvents.map((evt, idx) => {
                const isActive = activeTimelineYear === evt.year;
                return (
                  <motion.div
                    key={evt.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                    className="relative flex flex-col items-center text-center group cursor-pointer h-full"
                    onMouseEnter={() => setActiveTimelineYear(evt.year)}
                    onMouseLeave={() => setActiveTimelineYear(null)}
                  >
                    
                    {/* Glowing point bubble representing Year */}
                    <div className="relative z-10 mb-6 flex flex-col items-center">
                      {/* Floating tag */}
                      <span className="absolute top-[-30px] px-2.5 py-1 text-[8px] font-bold bg-gold-primary/10 border border-gold-primary/25 text-gold-deep rounded-lg opacity-85 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {evt.badge}
                      </span>
                      
                      {/* Glowing Ring */}
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-md ${
                        isActive 
                          ? 'bg-gold-primary border-gold-light scale-110 shadow-[0_0_20px_rgba(201,169,110,0.4)]' 
                          : 'bg-white border-slate-300 text-slate-800 group-hover:border-gold-primary/50 group-hover:scale-105'
                      }`}>
                        <span className={`text-sm font-black font-mono tracking-tight ${
                          isActive ? 'text-bg-midnight' : 'text-slate-800 group-hover:text-gold-deep'
                        }`}>
                          {evt.year}
                        </span>
                      </div>
                    </div>

                    {/* Timeline card detailing each event */}
                    <motion.div
                      className={`p-6 rounded-2xl border transition-all duration-500 text-right w-full min-h-[170px] flex flex-col justify-between flex-1 ${
                        isActive
                          ? 'bg-[#060D1A] border-gold-primary shadow-[0_20px_45px_rgba(0,0,0,0.3)] text-white scale-[1.015]'
                          : 'bg-white border-slate-200 shadow-sm text-[#060D1A]'
                      }`}
                    >
                      <div>
                        <h3 className={`text-sm sm:text-base font-extrabold font-el-messiri transition-colors duration-300 mb-2 ${
                          isActive ? 'text-white' : 'text-[#060D1A] group-hover:text-gold-deep'
                        }`}>
                          {evt.title}
                        </h3>
                        <p className={`text-xs leading-relaxed font-tajawal transition-colors duration-300 ${
                          isActive ? 'text-slate-300' : 'text-slate-500 group-hover:text-slate-800'
                        }`}>
                          {evt.description}
                        </p>
                      </div>
                      
                      {/* Card bottom details */}
                      <div className="pt-4 border-t border-slate-700/10 mt-4 flex items-center justify-between">
                        <span className={`text-[9px] font-bold font-mono tracking-wider ${
                          isActive ? 'text-gold-light' : 'text-slate-400'
                        }`}>
                          AL GHRBIA LEGACY
                        </span>
                        <Calendar className={`w-3.5 h-3.5 ${
                          isActive ? 'text-gold-light' : 'text-slate-500'
                        }`} />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
         5. Core Values Section - Dark Theme
         ---------------------------------------------------- */}
      <section className="py-24 bg-gradient-to-b from-bg-deep via-bg-navy to-bg-deep border-y border-border-gold/15 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="flex flex-col items-center text-center mb-16"
          >
            <motion.span variants={fadeUpVariants} className="inline-block py-1.5 px-4 text-[10px] font-extrabold text-gold-primary bg-gold-primary/10 border border-gold-primary/30 rounded-lg uppercase tracking-widest mb-3 font-el-messiri whitespace-nowrap">
              مبادئنا وقيمنا الراسخة
            </motion.span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight font-el-messiri liquid-gold-heading">
              الركائز الأساسية التي تقود مسيرتنا اليومية
            </h2>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold-primary/60"></div>
              <div className="w-2 h-2 rotate-45 border border-gold-primary/50 bg-[#060D1A]"></div>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold-primary/60"></div>
            </div>
          </motion.div>

          {/* 4 Columns Values Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
          >
            {values.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUpVariants}
                  whileHover={{ y: -10, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="group relative p-8 bg-gradient-to-br from-bg-navy/80 to-bg-deep/95 border border-gold-primary/30 hover:border-gold-primary/75 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between h-full cursor-pointer overflow-hidden text-right"
                >
                  {/* Card top gold line */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold-primary to-transparent rounded-t-full opacity-100"></div>

                  {/* Soft glow leak in card */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gold-primary/5 blur-2xl pointer-events-none rounded-full" />

                  <div>
                    {/* Icon container */}
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary shadow-inner group-hover:bg-gold-primary group-hover:text-bg-midnight group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 drop-shadow-[0_2px_4px_rgba(201,169,110,0.3)]" />
                    </div>

                    <h3 className="text-sm sm:text-base font-extrabold text-gold-primary mb-3 transition-colors duration-200 group-hover:text-white font-el-messiri">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-tajawal group-hover:text-white transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>



      {/* ----------------------------------------------------
         7. Operational System & Partners Section - Light Theme
         ---------------------------------------------------- */}
      <section className="py-24 relative z-10 bg-gradient-to-br from-[#FAF8F5] via-[#FFFFFF] to-[#F7F3EB] border-b border-slate-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* Right Column: Text Information */}
            <div className="lg:col-span-6 space-y-6 text-right order-2 lg:order-1">
              <div className="block">
                <motion.span variants={fadeUpVariants} className="inline-block py-1 px-3 text-[10px] font-extrabold text-gold-deep bg-gold-primary/10 border border-gold-primary/30 rounded-lg font-el-messiri whitespace-nowrap">
                  منظومة العمل المتكاملة
                </motion.span>
              </div>
              
              <motion.h2
                variants={fadeUpVariants}
                className="text-xl sm:text-3xl font-extrabold text-[#060D1A] leading-snug font-el-messiri liquid-gold-heading"
              >
                التميز الإداري والبناء الممنهج <br />
                <span className="text-gold-deep font-black">لضمان دقة وموثوقية التنفيذ</span>
              </motion.h2>
              
              <motion.p
                variants={fadeUpVariants}
                className="text-xs sm:text-sm text-slate-600 leading-relaxed font-tajawal transition-colors duration-300 hover:text-slate-900"
              >
                في شركة الغربية الذهبية، نتبع منهجية تشغيلية صارمة تبدأ من اختيار المواقع الاستراتيجية في كبرى مدن المملكة، مروراً بدراسات الجدوى المالية وتصاميم النمذجة المتقدمة، ووصولاً للتشييد والرقابة الميدانية اليومية. هذا الترتيب الممنهج يضمن بقاء مشاريعنا متوافقة تماماً مع الجداول الزمنية ومطابقة لأرقى متطلبات الجودة.
              </motion.p>

              <motion.p
                variants={fadeUpVariants}
                className="text-xs sm:text-sm text-slate-600 leading-relaxed font-tajawal transition-colors duration-300 hover:text-slate-900"
              >
                تعتمد مسيرتنا أيضاً على شراكات استراتيجية مع كبرى الجهات والمنظومات الوطنية المعنية بالتطوير الإسكاني والتنظيمي، مما يضمن موثوقية كاملة لكافة صكوكنا العقارية ومنتجاتنا التمويلية المعتمدة لدى جميع البنوك السعودية.
              </motion.p>
              
              {/* CTA Button Link */}
              <motion.div variants={fadeUpVariants} className="pt-2">
                <button
                  type="button"
                  onClick={openInquiry}
                  className="py-3 px-8 text-xs sm:text-sm font-extrabold btn-premium-gold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 font-el-messiri shadow-md"
                >
                  <span>احجز استشارتك المجانية الآن</span>
                  <ChevronLeft className="w-4 h-4 shrink-0" />
                </button>
              </motion.div>
            </div>

            {/* Left Column: Partner Logos / Credentials */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <motion.div
                variants={scaleUpVariants}
                className="p-8 sm:p-10 bg-white border border-slate-200 shadow-md rounded-[2.5rem] text-right relative overflow-hidden group cursor-default"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
                
                <h3 className="font-extrabold text-[#060D1A] text-base sm:text-lg font-el-messiri mb-3">
                  الجهات التمويلية والتنظيمية الشريكة
                </h3>
                
                <p className="text-xs text-slate-600 leading-relaxed font-tajawal mb-8">
                  نعتز بشراكتنا واعتماد مشاريعنا لدى كبرى الجهات العقارية والمالية في المملكة لتوفير الحلول التمويلية الميسرة لكافة المستثمرين والمواطنين.
                </p>

                {/* Grid of Partners */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#FAF8F5] border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:border-gold-primary hover:shadow-md transition-all duration-300 group/part">
                    <span className="block text-xs font-black text-slate-800 font-el-messiri transition-colors duration-300 group-hover/part:text-gold-deep">وزارة الإسكان</span>
                    <span className="block text-[8px] text-slate-400 font-mono tracking-widest mt-1">MINISTRY OF HOUSING</span>
                  </div>
                  <div className="p-4 bg-[#FAF8F5] border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:border-gold-primary hover:shadow-md transition-all duration-300 group/part">
                    <span className="block text-xs font-black text-slate-800 font-el-messiri transition-colors duration-300 group-hover/part:text-gold-deep">الهيئة العامة للعقار</span>
                    <span className="block text-[8px] text-slate-400 font-mono tracking-widest mt-1">REAL ESTATE AUTHORITY</span>
                  </div>
                  <div className="p-4 bg-[#FAF8F5] border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:border-gold-primary hover:shadow-md transition-all duration-300 group/part">
                    <span className="block text-xs font-black text-slate-800 font-el-messiri transition-colors duration-300 group-hover/part:text-gold-deep">برنامج وافي</span>
                    <span className="block text-[8px] text-slate-400 font-mono tracking-widest mt-1">WAFI APPROVED</span>
                  </div>
                  <div className="p-4 bg-[#FAF8F5] border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:border-gold-primary hover:shadow-md transition-all duration-300 group/part">
                    <span className="block text-xs font-black text-slate-800 font-el-messiri transition-colors duration-300 group-hover/part:text-gold-deep">سكني</span>
                    <span className="block text-[8px] text-slate-400 font-mono tracking-widest mt-1">SAKANI COMPATIBLE</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
