'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Star, Quote, ChevronRight, ChevronLeft } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "تجربة ممتازة في التملك مع شركة الغربية الذهبية. الشقة واسعة والتشطيبات الترا سوبر لوكس والموقف الخاص مريح جداً.",
    author: "أبو محمد",
    project: "جدة، حي السلامة - مشروع أمل ستارز",
    initials: "أ م",
    rating: 5
  },
  {
    id: 2,
    quote: "برنامج إتمام التمويلي سهل علي الكثير من العقبات في حساب القسط وحساب الدفعة الأولى، التوثيق كان سريع جداً.",
    author: "سالم العتيبي",
    project: "الرياض، حي الملقا - مستثمر",
    initials: "س ع",
    rating: 5
  },
  {
    id: 3,
    quote: "فيلا مخطط السعيد رائعة ومطابقة تماماً للمواصفات المعروضة في الموقع. التعامل راقي والضمانات شاملة.",
    author: "خالد الحربي",
    project: "جدة، مخطط السعيد - مالك فيلا",
    initials: "خ خ",
    rating: 5
  },
  {
    id: 4,
    quote: "دقة في المواعيد وجودة في التنفيذ تفوق التوقعات. سكنت في شقتنا الجديدة منذ 6 أشهر وكل شيء ممتاز والخدمات متكاملة.",
    author: "عبد الرحمن السديس",
    project: "مكة المكرمة، حي النسيم - مالك شقة",
    initials: "ع س",
    rating: 5
  },
  {
    id: 5,
    quote: "كمطور عقاري أقدر التفاصيل الهندسية الممتازة التي تنفذها شركة الغربية الذهبية. تشطيبات راقية واستغلال ذكي للمساحات.",
    author: "م. سلطان المقاطي",
    project: "جدة، حي النعيم - مستثمر عقاري",
    initials: "س م",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);
  const minSwipeDistance = 50;

  const handleNext = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (isTestimonialHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [isTestimonialHovered]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.05 : 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-24 bg-gradient-to-b from-bg-deep via-bg-navy to-bg-deep border-y border-border-gold/15 z-10">
      <div className="absolute top-0 end-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gold-primary/5 to-transparent rounded-full blur-3xl -z-10 animate-pulse duration-[8000ms]"></div>
      <div className="absolute bottom-0 start-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-brand-primary/5 to-transparent rounded-full blur-3xl -z-10 animate-pulse duration-[10000ms]"></div>

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
          <motion.span variants={fadeUpVariants} className="inline-block py-1.5 px-4 text-xs font-extrabold text-gold-primary bg-bg-royal/60 border border-border-gold/20 rounded-full uppercase mb-3.5">
            آراء عملائنا
          </motion.span>
          <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-text-primary liquid-gold-heading leading-tight font-el-messiri">
            تجارب حقيقية لشركاء النجاح
          </motion.h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-12">
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.01, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="relative bg-bg-royal/45 backdrop-blur-2xl border border-gold-primary/30 rounded-[2.5rem] p-8 sm:p-12 md:p-16 shadow-[0_45px_90px_rgba(0,0,0,0.55)] hover:shadow-[0_55px_100px_rgba(201,169,110,0.15)] transition-all duration-500 overflow-hidden text-center min-h-[380px] sm:min-h-[340px] flex flex-col justify-between cursor-pointer"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseEnter={() => setIsTestimonialHovered(true)}
            onMouseLeave={() => setIsTestimonialHovered(false)}
          >
            <div className="absolute top-0 start-0 end-0 h-1.5 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent rounded-t-full"></div>

            <div className="absolute top-4 end-8 text-gold-primary/10 pointer-events-none select-none">
              <Quote className="w-24 h-24 rotate-180" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonialIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col items-center justify-center flex-1"
              >
                <div className="flex gap-1 text-gold-primary mb-6 drop-shadow-[0_2px_8px_rgba(201,169,110,0.45)]">
                  {[...Array(TESTIMONIALS[currentTestimonialIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                <p className="text-base sm:text-lg md:text-xl text-slate-100 leading-relaxed font-bold mb-8 max-w-2xl px-2">
                  "{TESTIMONIALS[currentTestimonialIndex].quote}"
                </p>

                <div className="flex flex-col items-center gap-4 mt-2">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-gold-deep via-gold-primary to-gold-light opacity-40 blur-[2px]"></div>
                    <div className="relative w-14 h-14 rounded-full bg-bg-royal border border-gold-primary/30 flex items-center justify-center font-black text-gold-primary text-sm shadow-md">
                      {TESTIMONIALS[currentTestimonialIndex].initials}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-white">
                      {TESTIMONIALS[currentTestimonialIndex].author}
                    </h3>
                    <p className="text-xs text-text-muted font-medium mt-0.5">
                      {TESTIMONIALS[currentTestimonialIndex].project}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation Controls with 44x44px touch targets */}
          <div className="flex justify-center md:block mt-8 md:mt-0">
            <button
              type="button"
              onClick={handlePrev}
              className="md:absolute md:top-1/2 md:-end-6 md:-translate-y-1/2 mx-2 md:mx-0 w-12 h-12 rounded-full bg-bg-royal/80 backdrop-blur-md border border-border-gold/20 hover:border-gold-primary text-white hover:text-gold-primary flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer z-10 min-w-[44px] min-h-[44px]"
              aria-label="التقييم السابق"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="md:absolute md:top-1/2 md:-start-6 md:-translate-y-1/2 mx-2 md:mx-0 w-12 h-12 rounded-full bg-bg-royal/80 backdrop-blur-md border border-border-gold/20 hover:border-gold-primary text-white hover:text-gold-primary flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer z-10 min-w-[44px] min-h-[44px]"
              aria-label="التقييم التالي"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Dot Indicators with 44x44px minimum hit targets */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentTestimonialIndex(idx)}
                className="p-2 cursor-pointer flex items-center justify-center min-w-[44px] min-h-[44px]"
                aria-label={`الانتقال إلى التقييم ${idx + 1}`}
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentTestimonialIndex
                      ? 'bg-gold-primary shadow-[0_0_8px_rgba(201,169,110,0.6)] w-7'
                      : 'bg-gold-primary/20 hover:bg-gold-primary/40 w-2'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
