// src/app/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { PROPERTIES, PROJECTS, Property, Project } from '@/lib/mockData';
import PropertyCard from '@/components/property/PropertyCard';
import {
  Search,
  MapPin,
  Building,
  DollarSign,
  Layers,
  ChevronDown,
  Phone,
  Mail,
  Download,
  HelpCircle,
  Award,
  ShieldCheck,
  CheckCircle,
  Clock,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  MessageCircle
} from 'lucide-react';
import CustomSelect from '@/components/ui/CustomSelect';

const PanoramaViewer = dynamic(() => import('@/components/ui/PanoramaViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] sm:h-[450px] bg-bg-midnight/20 animate-pulse rounded-2xl flex items-center justify-center text-text-muted text-xs">
      جاري تحميل العرض البانورامي...
    </div>
  )
});

const HERO_IMAGES = [
  '/hero-bg-3.webp',
  '/hero-bg-luxury.webp',
  '/hero-bg-2.webp',

];

const CITY_OPTIONS = [
  { value: 'all', label: 'كل المدن' },
  { value: 'جدة', label: 'جدة' },
  { value: 'الرياض', label: 'الرياض' },
  { value: 'مكه', label: 'مكة المكرمة' }
];

const TYPE_OPTIONS = [
  { value: 'all', label: 'كل الفئات' },
  { value: 'flat', label: 'شقة سكينة' },
  { value: 'villa', label: 'فيلا مستقلة' },
  { value: 'roof', label: 'ملحق روف / بنتهاوس' },
  { value: 'investment', label: 'فرص استثمارية' }
];

const ROOMS_OPTIONS = [
  { value: 'all', label: 'أي عدد' },
  { value: '4', label: '4 غرف' },
  { value: '5', label: '5 غرف' },
  { value: '6', label: '6 غرف' }
];

const PRICE_OPTIONS = [
  { value: 'all', label: 'أي سعر' },
  { value: '600000', label: 'حتى 600,000 ر.س' },
  { value: '800000', label: 'حتى 800,000 ر.س' },
  { value: '1000000', label: 'حتى 1,000,000 ر.س' },
  { value: '2000000', label: 'حتى 2,000,000 ر.س' },
  { value: '20000000', label: 'حتى 20,000,000 ر.س' }
];

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

const PARTNERS = [
  { id: 1, src: '/1.png', alt: 'شركة الحالي للتطوير العقاري والمقاولات' },
  { id: 2, src: '/2.png', alt: 'دهانات جوتن' },
  { id: 3, src: '/3.png', alt: 'شركة سابك' },
  { id: 4, src: '/4.png', alt: 'مصنع نخبة الغربية للبلك' },
];

export default function HomePage() {
  // Reduced motion hook for accessibility compliance
  const shouldReduceMotion = useReducedMotion();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.05 : 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Slideshow state
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [animateZoom, setAnimateZoom] = useState(false);

  React.useEffect(() => {
    // Trigger zoom-in immediately on mount
    const zoomTimeout = setTimeout(() => {
      setAnimateZoom(true);
    }, 50);

    const timer = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 6000); // 6 seconds slide interval for smooth luxury transition

    return () => {
      clearTimeout(zoomTimeout);
      clearInterval(timer);
    };
  }, []);

  // Testimonial Carousel state and touch handlers
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

  // Testimonial Autoplay Effect (with hover pause functionality)
  React.useEffect(() => {
    if (isTestimonialHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5500); // Autoplay interval set to 5.5 seconds for reading comfort
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

  // Filter States
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRooms, setSelectedRooms] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<string>('all');

  // Visible cards count state
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Reset visible count when filters change
  React.useEffect(() => {
    setVisibleCount(6);
  }, [selectedCity, selectedType, selectedRooms, maxPrice]);

  // Interactive States
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Search Submit Handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filters are reactive, search scroll triggers
    const listingsSection = document.getElementById('listings-section');
    listingsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter Logic
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(property => {
      const cityMatch = selectedCity === 'all' || property.location.city === selectedCity;

      let typeMatch = true;
      if (selectedType !== 'all') {
        if (selectedType === 'flat') typeMatch = property.type === 'apartment';
        else if (selectedType === 'villa') typeMatch = property.type === 'villa';
        else if (selectedType === 'roof') typeMatch = property.type === 'annex' || property.type === 'penthouse';
        else if (selectedType === 'investment') typeMatch = property.featured;
      }

      const roomsMatch = selectedRooms === 'all' || property.specs.bedrooms.toString() === selectedRooms;
      const priceMatch = maxPrice === 'all' || property.pricing.price <= Number(maxPrice);

      return cityMatch && typeMatch && roomsMatch && priceMatch;
    });
  }, [selectedCity, selectedType, selectedRooms, maxPrice]);

  return (
    <div className="relative min-h-screen bg-bg-midnight text-text-primary overflow-x-hidden font-cairo" dir="rtl">

      {/* ----------------------------------------------------
         1. Fixed Glassmorphic Navigation Header (Navbar)
         ---------------------------------------------------- */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-45 bg-white/10 backdrop-blur-xl border border-border-gold/30 rounded-full transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-border-gold/50">
        <div className="px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">

          {/* Logo (Right side in RTL) */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <Image
                src="/logo.webp"
                alt="الغربية الذهبية"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <div className="text-right flex flex-col justify-center">
              <span className="block text-sm font-extrabold text-white leading-tight font-tajawal">
                الغربية <span className="bg-gradient-to-r from-gold-light via-gold-primary to-gold-warm bg-clip-text text-transparent font-black">الذهبية</span>
              </span>
              <span className="block text-[8px] text-gold-primary/90 tracking-[0.2em] font-serif uppercase font-medium -mt-0.5">
                AL GHRBIA GOLDEN
              </span>
            </div>
          </div>

          {/* Navigation links (Center) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a href="#" className="text-white border-b-2 border-gold-primary pb-1">الرئيسية</a>
            <a href="#listings-section" className="text-text-secondary hover:text-white transition-colors duration-200">العروض العقارية</a>
            <a href="#projects-section" className="text-text-secondary hover:text-white transition-colors duration-200">مشاريعنا المميزة</a>
            <a href="#about-section" className="text-text-secondary hover:text-white transition-colors duration-200">لماذا نحن؟</a>
            <a href="#contact-section" className="text-text-secondary hover:text-white transition-colors duration-200">تواصل معنا</a>
          </nav>

          {/* CTA Button (Left side in RTL) */}
          <div>
            <button
              type="button"
              className="py-2.5 px-5 text-xs btn-premium-gold"
              onClick={() => setShowInquiryModal(true)}
            >
              احجز جولتك الخاصة
            </button>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------
         2. Hero Section (FullScreen Visual)
         ---------------------------------------------------- */}
      <section className="relative h-screen w-full flex items-center justify-center bg-bg-deep overflow-hidden">
        {/* Dark luxury fallback background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-deep/15 via-bg-midnight/70 to-bg-midnight/90 z-0"></div>

        {/* Slideshow background images */}
        {HERO_IMAGES.map((imgSrc, index) => (
          <div
            key={imgSrc}
            className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out z-0 ${index === currentHeroIndex ? 'opacity-75' : 'opacity-0'}`}
          >
            <Image
              src={imgSrc}
              alt={`خلفية الهيكل الفخم ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-fill transition-transform duration-[6500ms] ease-luxury ${index === currentHeroIndex && animateZoom ? 'scale-[1.08]' : 'scale-100'
                }`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-midnight/80 via-transparent to-transparent z-10"></div>

        {/* Hero Content Container */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="relative max-w-5xl w-[92%] mx-auto text-center z-20 flex flex-col items-center justify-center"
        >
          <motion.span
            variants={fadeUpVariants}
            className="inline-block py-1 px-3 mb-4 text-[10px] font-bold text-gold-primary bg-bg-royal/60 border border-border-gold/30 rounded-full animate-pulse"
          >
            الجيل الجديد من الفخامة العقارية بالسعودية
          </motion.span>

          {/* Highly Transparent Inner Card for Title and Text */}
          <motion.div
            variants={fadeUpVariants}
            className="px-4 py-3 sm:px-6 sm:py-4 max-w-2xl w-full bg-bg-midnight/10 backdrop-blur-md border border-gold-primary/45 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center gap-2.5"
          >
            <motion.h1
              variants={fadeUpVariants}
              className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-primary leading-snug liquid-gold-heading"
            >
              <span className="block text-gold-primary mb-2">نعتمد أحدث التقنيات</span>
              <span className="block text-text-secondary font-bold text-[0.88em]">لنربطكم بأفضل الفرص السكنية والاستثمارية</span>
            </motion.h1>
            <motion.p
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed"
            >
              مشاريع سكنية استثنائية وحلول تمويلية متكاملة تلبي تطلعاتكم العقارية في أرقى مدن المملكة.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator - vertical pulsing line */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <span className="text-[10px] text-text-muted uppercase font-mono">اسحب للأسفل</span>
          <div className="indicator-pulse-line rounded-full"></div>
        </div>
      </section>

      {/* ----------------------------------------------------
         3. Advanced Search Bar Component
         ---------------------------------------------------- */}
      <section className="relative z-30 max-w-6xl mx-auto px-4 -mt-28 sm:-mt-38">
        <form
          onSubmit={handleSearch}
          className="p-6 md:p-8 bg-white/10 backdrop-blur-xl border border-border-gold/30 rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.65)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end hover:border-border-gold/50 transition-all duration-500"
        >
          {/* Filter 1: City */}
          <div>
            <label htmlFor="search-city" className="block text-xs font-bold text-text-muted mb-2 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gold-primary" /> المدينة
            </label>
            <CustomSelect
              id="search-city"
              title="تصفية بالمدينة"
              options={CITY_OPTIONS}
              value={selectedCity}
              onChange={setSelectedCity}
            />
          </div>

          {/* Filter 2: Type */}
          <div>
            <label htmlFor="search-type" className="block text-xs font-bold text-text-muted mb-2 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-gold-primary" /> نوع العقار
            </label>
            <CustomSelect
              id="search-type"
              title="تصفية بنوع العقار"
              options={TYPE_OPTIONS}
              value={selectedType}
              onChange={setSelectedType}
            />
          </div>

          {/* Filter 3: Rooms */}
          <div>
            <label htmlFor="search-rooms" className="block text-xs font-bold text-text-muted mb-2 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-gold-primary" /> عدد الغرف
            </label>
            <CustomSelect
              id="search-rooms"
              title="تصفية بعدد الغرف"
              options={ROOMS_OPTIONS}
              value={selectedRooms}
              onChange={setSelectedRooms}
            />
          </div>

          {/* Filter 4: Max Price */}
          <div>
            <label htmlFor="search-price" className="block text-xs font-bold text-text-muted mb-2 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-gold-primary" /> السعر الأقصى
            </label>
            <CustomSelect
              id="search-price"
              title="تصفية بالحد الأقصى للسعر"
              options={PRICE_OPTIONS}
              value={maxPrice}
              onChange={setMaxPrice}
            />
          </div>

          {/* Search CTA Button */}
          <div>
            <button
              type="submit"
              className="w-full text-sm py-3.5 px-4 btn-premium-gold"
            >
              <Search className="w-4 h-4" />
              <span>البحث عن عقار</span>
            </button>
          </div>
        </form>
      </section>

      {/* ----------------------------------------------------
         4. Cities Quick Grid
         ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-text-primary mb-3 liquid-gold-heading">اختر وجهتك المفضلة في المملكة</motion.h2>
          <motion.p variants={fadeUpVariants} className="text-sm text-text-secondary max-w-xl mx-auto">نساعدك على امتلاك منزل أحلامك في أرقى أحياء المدن الرئيسية</motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* City 1: Jeddah */}
          <div
            className={`group relative h-48 rounded-2xl overflow-hidden border border-border-gold/30 cursor-pointer transition-all duration-300 ${selectedCity === 'جدة' ? 'ring-2 ring-gold-primary' : ''}`}
            onClick={() => setSelectedCity(selectedCity === 'جدة' ? 'all' : 'جدة')}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-bg-midnight/90 via-bg-midnight/35 to-transparent z-10"></div>
            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/cities/jeddah.webp"
                alt="واجهة مدينة جدة"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/30 to-bg-midnight/70"></div>
            </div>
            <div className="absolute bottom-5 right-5 z-20">
              <h3 className="text-lg font-bold text-white mb-1">جدة</h3>
              <p className="text-[10px] text-gold-light font-semibold uppercase">عروس البحر الأحمر</p>
            </div>
          </div>

          {/* City 2: Riyadh */}
          <div
            className={`group relative h-48 rounded-2xl overflow-hidden border border-border-gold/30 cursor-pointer transition-all duration-300 ${selectedCity === 'الرياض' ? 'ring-2 ring-gold-primary' : ''}`}
            onClick={() => setSelectedCity(selectedCity === 'الرياض' ? 'all' : 'الرياض')}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-bg-midnight/90 via-bg-midnight/35 to-transparent z-10"></div>
            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/cities/riyadh.webp"
                alt="أبراض مدينة الرياض"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/30 to-bg-midnight/70"></div>
            </div>
            <div className="absolute bottom-5 right-5 z-20">
              <h3 className="text-lg font-bold text-white mb-1">الرياض</h3>
              <p className="text-[10px] text-gold-light font-semibold uppercase">عاصمة الحداثة والفرص</p>
            </div>
          </div>

          {/* City 3: Makkah */}
          <div
            className={`group relative h-48 rounded-2xl overflow-hidden border border-border-gold/30 cursor-pointer transition-all duration-300 ${selectedCity === 'مكه' ? 'ring-2 ring-gold-primary' : ''}`}
            onClick={() => setSelectedCity(selectedCity === 'مكه' ? 'all' : 'مكه')}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-bg-midnight/90 via-bg-midnight/35 to-transparent z-10"></div>
            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/cities/makkah.webp"
                alt="المسجد الحرام بمكة المكرمة"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/30 to-bg-midnight/70"></div>
            </div>
            <div className="absolute bottom-5 right-5 z-20">
              <h3 className="text-lg font-bold text-white mb-1">مكة المكرمة</h3>
              <p className="text-[10px] text-gold-light font-semibold uppercase">قبلة العالم وبوابة الإيمان</p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
         5 & 6. Listings Section - Full Width & Light Background
         ---------------------------------------------------- */}
      <div className="w-full bg-gradient-to-b from-bg-deep via-bg-navy to-bg-deep border-y border-border-gold/15 py-16">

        {/* 5. Categories Tab Selection */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className={`py-3 px-6 rounded-xl text-xs font-bold transition-all duration-300 border cursor-pointer hover:scale-[1.03] active:scale-[0.97] ${selectedType === 'all'
                ? 'bg-gold-primary text-bg-midnight border-gold-primary font-extrabold shadow-lg shadow-gold-primary/10'
                : 'bg-bg-royal/40 hover:bg-bg-royal/70 text-text-secondary border-border-gold/20 hover:border-gold-primary hover:text-white'
                }`}
              onClick={() => setSelectedType('all')}
            >
              الكل
            </button>
            <button
              type="button"
              className={`py-3 px-6 rounded-xl text-xs font-bold transition-all duration-300 border cursor-pointer hover:scale-[1.03] active:scale-[0.97] ${selectedType === 'flat'
                ? 'bg-gold-primary text-bg-midnight border-gold-primary font-extrabold shadow-lg shadow-gold-primary/10'
                : 'bg-bg-royal/40 hover:bg-bg-royal/70 text-text-secondary border-border-gold/20 hover:border-gold-primary hover:text-white'
                }`}
              onClick={() => setSelectedType('flat')}
            >
              شقق سكينة
            </button>
            <button
              type="button"
              className={`py-3 px-6 rounded-xl text-xs font-bold transition-all duration-300 border cursor-pointer hover:scale-[1.03] active:scale-[0.97] ${selectedType === 'villa'
                ? 'bg-gold-primary text-bg-midnight border-gold-primary font-extrabold shadow-lg shadow-gold-primary/10'
                : 'bg-bg-royal/40 hover:bg-bg-royal/70 text-text-secondary border-border-gold/20 hover:border-gold-primary hover:text-white'
                }`}
              onClick={() => setSelectedType('villa')}
            >
              فلل فخمة
            </button>
            <button
              type="button"
              className={`py-3 px-6 rounded-xl text-xs font-bold transition-all duration-300 border cursor-pointer hover:scale-[1.03] active:scale-[0.97] ${selectedType === 'roof'
                ? 'bg-gold-primary text-bg-midnight border-gold-primary font-extrabold shadow-lg shadow-gold-primary/10'
                : 'bg-bg-royal/40 hover:bg-bg-royal/70 text-text-secondary border-border-gold/20 hover:border-gold-primary hover:text-white'
                }`}
              onClick={() => setSelectedType('roof')}
            >
              أروف / بنتهاوس
            </button>
            <button
              type="button"
              className={`py-3 px-6 rounded-xl text-xs font-bold transition-all duration-300 border cursor-pointer hover:scale-[1.03] active:scale-[0.97] ${selectedType === 'investment'
                ? 'bg-gold-primary text-bg-midnight border-gold-primary font-extrabold shadow-lg shadow-gold-primary/10'
                : 'bg-bg-royal/40 hover:bg-bg-royal/70 text-text-secondary border-border-gold/20 hover:border-gold-primary hover:text-white'
                }`}
              onClick={() => setSelectedType('investment')}
            >
              عروض الاستثمار
            </button>
          </div>
        </section>

        {/* 6. Latest Offers Listings Grid */}
        <section id="listings-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12"
          >
            <div className="text-right mb-4 md:mb-0">
              <motion.span variants={fadeUpVariants} className="block text-xs font-semibold text-gold-primary uppercase">قائمتنا المحدثة</motion.span>
              <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-text-primary mt-1 liquid-gold-heading">تصفح آخر العروض والفرص الحالية</motion.h2>
            </div>
            <motion.span variants={fadeUpVariants} className="text-xs text-text-muted">
              تم العثور على <strong className="text-gold-primary font-mono">{filteredProperties.length}</strong> وحدة مطروحة
            </motion.span>
          </motion.div>

          {filteredProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.slice(0, visibleCount).map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                  />
                ))}
              </div>
              {filteredProperties.length > visibleCount && (
                <div className="text-center mt-12">
                  <button
                    type="button"
                    onClick={() => setVisibleCount(prev => prev + 6)}
                    className="py-3.5 px-12 text-xs sm:text-sm font-extrabold bg-bg-midnight hover:bg-gold-primary text-white hover:text-bg-midnight border border-border-gold/30 rounded-full cursor-pointer hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-md hover:shadow-xl shadow-bg-midnight/10"
                  >
                    عرض المزيد من الوحدات العقارية
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-bg-royal/20 border border-border-gold/20 rounded-2xl max-w-md mx-auto shadow-xl">
              <Building className="w-12 h-12 text-text-muted mx-auto mb-3" />
              <p className="text-sm font-semibold text-text-secondary">عذراً، لم نجد أي عروض تطابق فلاتر البحث الحالية.</p>
              <button
                type="button"
                className="mt-4 text-xs font-bold text-gold-primary underline hover:text-gold-light cursor-pointer"
                onClick={() => {
                  setSelectedCity('all');
                  setSelectedType('all');
                  setSelectedRooms('all');
                  setMaxPrice('all');
                }}
              >
                إعادة تهيئة الفلاتر
              </button>
            </div>
          )}
        </section>

      </div>

      {/* ----------------------------------------------------
         6.5. Request Property Custom Banner (اطلب عقارك بخطوة) - Full Width & Light Background
         ---------------------------------------------------- */}
      <section className="relative w-full md:h-[70vh] min-h-[600px] overflow-hidden py-16 md:py-0 my-16 bg-transparent flex items-center">
        {/* Slanted Premium Light Background Divider */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#FFFFFF] to-[#F5EFE4] -skew-y-2 origin-top-right border-y border-border-gold/25 z-0 shadow-inner"></div>

        <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 z-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-16">

          {/* Right Column: Text & Call to Action (Appears right on RTL) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } }
            }}
            className="flex-[0.5] w-full md:w-[25%] text-center md:text-right space-y-6 md:pr-18 z-10 flex flex-col items-center md:items-start"
          >
            <motion.span variants={fadeUpVariants} className="inline-block py-1.5 px-4 text-[10px] font-extrabold text-gold-deep bg-gold-primary/10 border border-gold-primary/30 rounded-full">
              خدمة اطلب عقارك المتميزة
            </motion.span>
            <motion.h2 variants={fadeUpVariants} className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-bg-midnight mb-2 liquid-gold-heading">
              اطلب عقارك
            </motion.h2>

            {/* Calligraphy Brush stroke style text */}
            <motion.div
              initial={{ scale: 2.2, rotate: 12, opacity: 0 }}
              whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                type: "spring",
                stiffness: 35,
                damping: 16,
                mass: 1.5,
                delay: 0.1
              }}
              className="relative inline-block"
            >
              {/* Premium Metallic Gold Bar behind (exactly centered vertically with top/bottom borders) */}
              <div className="absolute top-[52%] -translate-y-1/2 right-[-20px] left-[-25px] h-6 sm:h-7 md:h-8.5 bg-gradient-to-r from-[#9A7A40] via-[#C9A96E] to-[#9A7A40] border-y border-[#E8C98A]/40 z-0 rounded-[1px] shadow-sm"></div>

              {/* Layer 1: Thick White Stroke (Masks the gold bar and forms the premium white outline border, thickness tuned to keep loops open) */}
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] font-black text-white relative z-10 font-aref-ruqaa [-webkit-text-stroke:5px_#FAF8F5] sm:[-webkit-text-stroke:7px_#FAF8F5] md:[-webkit-text-stroke:8px_#FAF8F5] [text-shadow:0_8px_20px_rgba(6,13,26,0.14),0_2px_6px_rgba(201,169,110,0.4)] select-none">
                بخطوة
              </span>

              {/* Layer 2: Dark Gold Outline Stroke (Ensures clean text definition and premium luxury look) */}
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] font-black text-bg-midnight absolute inset-0 z-[15] font-aref-ruqaa [-webkit-text-stroke:3px_#7A5E2A] select-none pointer-events-none">
                بخطوة
              </span>

              {/* Layer 3: Solid Light Fill (Solid white text fill overlayed exactly on top for a clean, premium look) */}
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] font-black text-white absolute inset-0 z-20 font-aref-ruqaa pointer-events-none select-none">
                بخطوة
              </span>
            </motion.div>

            <motion.p variants={fadeUpVariants} className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed mt-4">
              لا داعي للبحث الطويل والمجهد. حدد مواصفات منزلك أو استثمارك العقاري وسيقوم مستشارونا الماليون والعقاريون بتوفير أفضل الفرص المتوافقة مع تطلعاتك.
            </motion.p>

            <motion.div variants={fadeUpVariants} className="pt-4">
              <button
                type="button"
                onClick={() => setShowInquiryModal(true)}
                className="py-3.5 px-12 text-xs sm:text-sm font-extrabold bg-bg-midnight hover:bg-gold-primary text-white hover:text-bg-midnight border border-border-gold/30 rounded-full cursor-pointer hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-md hover:shadow-xl shadow-bg-midnight/10"
              >
                اطلب الآن
              </button>
            </motion.div>
          </motion.div>

          {/* Left Column: Stunning 3D Render Image (Appears left on RTL) */}
          <motion.div
            initial={{ scale: 1.9, rotate: -15, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              type: "spring",
              stiffness: 28,
              damping: 18,
              mass: 1.8,
              delay: 0.45
            }}
            className="flex-none md:flex-[1.3] w-full md:w-[65%] h-[280px] sm:h-[380px] md:h-[560px] lg:h-[640px] xl:h-[700px] min-h-[280px] relative z-10 group bg-transparent"
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

      {/* ----------------------------------------------------
         7. Featured Project Highlight Showcase
         ---------------------------------------------------- */}
      <section id="projects-section" className="bg-bg-navy/40 border-y border-border-gold/20 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUpVariants} className="block text-xs font-semibold text-gold-primary uppercase">مشاريعنا العقارية الكبرى</motion.span>
            <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-text-primary mt-1 liquid-gold-heading">نسعى لإيجاد مجتمعات سكنية متكاملة</motion.h2>
          </motion.div>

          {/* Project Display details - Alternating (Amal Stars) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual Cover */}
            <div className="relative aspect-[16/10] lg:aspect-square rounded-2xl overflow-hidden border border-border-gold shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-bg-midnight via-transparent to-transparent z-10"></div>
              <div className="absolute inset-0">
                <Image
                  src="/projects/amal-stars-showcase.webp"
                  alt="واجهة مجمع أمل ستارز السكني"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/30 to-bg-midnight/80"></div>
              </div>
              <div className="absolute bottom-6 right-6 z-20">
                <span className="px-3 py-1 text-[10px] font-bold text-bg-midnight bg-gold-primary rounded-md uppercase">مشروع مكتمل</span>
              </div>
            </div>

            {/* Info details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="space-y-6 text-right"
            >
              <motion.h3 variants={fadeUpVariants} className="text-2xl font-bold text-text-primary liquid-gold-heading">{PROJECTS[0].name}</motion.h3>
              <motion.p variants={fadeUpVariants} className="text-xs text-gold-primary font-semibold -mt-3">{PROJECTS[0].tagline}</motion.p>

              <motion.p variants={fadeUpVariants} className="text-sm text-text-secondary leading-relaxed">
                {PROJECTS[0].description}
              </motion.p>

              {/* Bullet specs */}
              <div className="grid grid-cols-2 gap-4 py-4 px-5 rounded-xl bg-bg-royal/30 border border-border-white/5 text-xs">
                <div>
                  <span className="block text-text-muted mb-0.5">موقع المشروع</span>
                  <span className="font-bold text-text-primary">{PROJECTS[0].location.district}، {PROJECTS[0].location.city}</span>
                </div>
                <div>
                  <span className="block text-text-muted mb-0.5">تاريخ التسليم</span>
                  <span className="font-bold text-text-primary">{PROJECTS[0].specs.completionDate}</span>
                </div>
                <div className="mt-2">
                  <span className="block text-text-muted mb-0.5">إجمالي الوحدات</span>
                  <span className="font-bold text-text-primary font-mono">{PROJECTS[0].specs.totalUnits} وحدة</span>
                </div>
                <div className="mt-2">
                  <span className="block text-text-muted mb-0.5">الوحدات المتاحة للحجز</span>
                  <span className="font-bold text-status-available font-mono">{PROJECTS[0].specs.availableUnits} وحدة جاهزة</span>
                </div>
              </div>

              {/* PDF brochure download action */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="/brochure-amal-stars.pdf"
                  download
                  className="py-3 px-6 text-xs btn-premium-gold min-w-[220px]"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل بروفايل المشروع (PDF)</span>
                </a>
                <a
                  href="#listings-section"
                  onClick={() => {
                    setSelectedCity('جدة');
                    setSelectedType('all');
                  }}
                  className="py-3 px-6 text-xs btn-premium-glass min-w-[220px]"
                >
                  <span>استعرض عروض المجمع</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
         7.5. Interactive 360° Virtual Tour - Full Width & Light Background
         ---------------------------------------------------- */}
      <section className="relative w-full overflow-hidden py-24 my-16 bg-transparent">
        {/* Premium Light Background Divider */}
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
            className="lg:col-span-4 space-y-6 text-right z-10"
          >
            <motion.span variants={fadeUpVariants} className="inline-block py-1.5 px-4 text-[10px] font-extrabold text-gold-deep bg-gold-primary/10 border border-gold-primary/30 rounded-full">
              تجربة غامرة فريدة
            </motion.span>
            <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-bg-midnight liquid-gold-heading">جولة افتراضية تفاعلية 360°</motion.h2>
            <motion.p variants={fadeUpVariants} className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
              عش تجربة التواجد الفعلي داخل أرقى مشاريعنا السكنية. اسحب الصورة البانورامية للمشاهدة حولك واكتشف التفاصيل الهندسية والتشطيبات الفاخرة للغرف المزدوجة والصالات الواسعة.
            </motion.p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                className="py-3 px-6 text-xs btn-premium-gold min-w-[200px]"
                onClick={() => setShowInquiryModal(true)}
              >
                احجز جولة حضورية خاصة
              </button>
            </div>
          </motion.div>

          {/* Interactive Panorama Canvas with Premium Dark Framed Border */}
          <div className="lg:col-span-8 w-full z-10 rounded-3xl overflow-hidden border border-gold-primary/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] bg-bg-royal/20 p-1 hover:border-gold-primary/50 transition-all duration-500">
            <PanoramaViewer
              imageSrc="/projects/panorama-penthouse.webp"
              heightClass="h-[400px] sm:h-[450px]"
            />
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
         7.8. Contact Form Section (اتصل بنا)
         ---------------------------------------------------- */}
      <section id="contact-section" className="relative w-full overflow-hidden py-24 bg-gradient-to-b from-bg-navy via-bg-deep to-bg-navy border-y border-border-gold/15 z-10">
        {/* Ambient Radial Gold/Blue Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gold-primary/10 via-brand-primary/10 to-gold-primary/10 rounded-full blur-3xl z-0 pointer-events-none opacity-80 animate-pulse duration-[8000ms]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">

          {/* Centered Header */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <div className="h-[2px] w-12 bg-gold-primary"></div>
              <span className="text-sm font-extrabold text-gold-primary font-tajawal uppercase tracking-wider">اتصل بنا</span>
              <div className="h-[2px] w-12 bg-gold-primary"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight font-tajawal">أبق على اتصال</h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xl mx-auto font-cairo">
              تمتلك شركتنا العقارية عدداً من القوائم الفاخرة والحصرية المثالية للعملاء الدوليين.
            </p>
          </div>

          {/* Centered Glassmorphic Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl mx-auto mt-12 z-10"
          >
            <div className="relative bg-bg-navy/70 backdrop-blur-xl border border-gold-primary/45 p-6 sm:p-10 rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
              {/* Form header decoration line */}
              <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-gold-primary to-transparent"></div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('شكراً لتواصلك معنا. سيقوم مستشارنا العقاري بالاتصال بك قريباً.');
                }}
                className="space-y-6 text-right"
              >
                {/* Group 1: معلومات شخصية */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gold-primary border-r-2 border-gold-primary pr-2.5">معلومات شخصية</h3>

                  {/* Row 1: اللقب (يختار), الاسم الأول, اسم العائلة */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <select
                        title="اللقب"
                        defaultValue="يختار"
                        className="w-full bg-[#0F2040]/70 border border-white/20 focus:border-gold-primary/70 focus:bg-[#152A54]/80 rounded-xl px-4 py-3 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-all duration-300"
                      >
                        <option value="يختار" disabled>يختار</option>
                        <option value="السيد">السيد</option>
                        <option value="السيدة">السيدة</option>
                        <option value="شركة">شركة / جهة</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="الاسم الأول"
                        className="w-full bg-bg-royal/40 border border-white/20 focus:border-gold-primary/70 focus:bg-bg-royal/60 rounded-xl px-4 py-3 text-xs text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="اسم العائلة"
                        className="w-full bg-bg-royal/40 border border-white/20 focus:border-gold-primary/70 focus:bg-bg-royal/60 rounded-xl px-4 py-3 text-xs text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Row 2: عنوان البريد الإلكتروني, رقم التليفون */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="عنوان البريد الإلكتروني"
                        className="w-full bg-bg-royal/40 border border-white/20 focus:border-gold-primary/70 focus:bg-bg-royal/60 rounded-xl px-4 py-3 text-xs text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="رقم التليفون"
                        className="w-full bg-bg-royal/40 border border-white/20 focus:border-gold-primary/70 focus:bg-bg-royal/60 rounded-xl px-4 py-3 text-xs text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-all duration-300 text-left font-mono"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                {/* Group 2: معلومات الملكية */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-bold text-gold-primary border-r-2 border-gold-primary pr-2.5">معلومات الملكية</h3>

                  {/* Row 1: يكتب (نوع العقار المفضّل), الرمز البريدي, مدينة */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <select
                        title="نوع العقار / المشروع المفضل"
                        defaultValue="يكتب"
                        className="w-full bg-[#0F2040]/70 border border-white/20 focus:border-gold-primary/70 focus:bg-[#152A54]/80 rounded-xl px-4 py-3 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-all duration-300"
                      >
                        <option value="يكتب">يكتب</option>
                        <option value="شقة">شقة</option>
                        <option value="فيلا">فيلا</option>
                        <option value="مشروع ابو هايل افينيو">مشروع ابو هايل افينيو</option>
                        <option value="مشروع امل ستارز">مشروع امل ستارز</option>
                        <option value="مشروع ريناد غاليري">مشروع ريناد غاليري</option>
                        <option value="مشروع هتان التيسير">مشروع هتان التيسير</option>
                        <option value="ملحق">ملحق</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="الرمز البريدي"
                        className="w-full bg-bg-royal/40 border border-white/20 focus:border-gold-primary/70 focus:bg-bg-royal/60 rounded-xl px-4 py-3 text-xs text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-all duration-300 font-mono"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="مدينة"
                        className="w-full bg-bg-royal/40 border border-white/20 focus:border-gold-primary/70 focus:bg-bg-royal/60 rounded-xl px-4 py-3 text-xs text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Row 2: غرف النوم, الحمامات, ميزانيتك */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <select
                        title="غرف النوم"
                        defaultValue="غرف نوم"
                        className="w-full bg-[#0F2040]/70 border border-white/20 focus:border-gold-primary/70 focus:bg-[#152A54]/80 rounded-xl px-4 py-3 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-all duration-300"
                      >
                        <option value="غرف نوم" disabled>غرف نوم</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6+">6+</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="الحمامات"
                        className="w-full bg-bg-royal/40 border border-white/20 focus:border-gold-primary/70 focus:bg-bg-royal/60 rounded-xl px-4 py-3 text-xs text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="ميزانيتك"
                        className="w-full bg-bg-royal/40 border border-white/20 focus:border-gold-primary/70 focus:bg-bg-royal/60 rounded-xl px-4 py-3 text-xs text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 text-xs font-bold text-white bg-gold-primary hover:bg-gold-warm rounded-xl transition-all duration-300 shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    إرسال
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ----------------------------------------------------
         10. Why Us Section (Stats & Values - Light Theme & Premium Cards)
         ---------------------------------------------------- */}
      <section id="about-section" className="relative w-full overflow-hidden py-24 bg-gradient-to-br from-[#FAF8F5] via-[#FFFFFF] to-[#F5EFE4] border-y border-slate-200/50 z-10">


        {/* Luxury Decorative Soft Blurs */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-gold-primary/5 to-transparent rounded-full blur-3xl -z-10 animate-pulse duration-[8000ms]"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-brand-primary/5 to-transparent rounded-full blur-3xl -z-10 animate-pulse duration-[10000ms]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="flex flex-col items-center text-center mb-16"
          >
            <motion.span variants={fadeUpVariants} className="inline-block py-1.5 px-4 text-[10px] font-extrabold text-gold-deep bg-gold-primary/10 border border-gold-primary/30 rounded-full uppercase mb-3.5">
              سر تميزنا
            </motion.span>
            <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-[#060D1A] liquid-gold-heading leading-tight font-tajawal">لماذا يختار العملاء شركة الغربية الذهبية؟</motion.h2>
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

            {/* Card 1 */}
            <motion.div
              variants={fadeUpVariants}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -6 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group relative p-8 bg-white border border-gold-primary/50 rounded-3xl shadow-[0_25px_60px_rgba(201,169,110,0.12)] hover:shadow-[0_30px_70px_rgba(201,169,110,0.18)] transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
            >
              {/* Card top gold line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent rounded-t-full opacity-100"></div>

              {/* Icon Badge container */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-deep shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Award className="w-7 h-7 text-gold-deep drop-shadow-[0_2px_4px_rgba(201,169,110,0.3)]" />
              </div>

              <h3 className="text-sm sm:text-base font-extrabold text-gold-deep mb-3 transition-colors duration-200">جودة بناء وتشييد ممتازة</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                نلتزم بمعايير الكود السعودي للبناء مع توفير ضمانات إنشائية شاملة على الهياكل والسباكة والكهرباء.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={fadeUpVariants}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -6 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group relative p-8 bg-white border border-gold-primary/50 rounded-3xl shadow-[0_25px_60px_rgba(201,169,110,0.12)] hover:shadow-[0_30px_70px_rgba(201,169,110,0.18)] transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
            >
              {/* Card top gold line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent rounded-t-full opacity-100"></div>

              {/* Icon Badge container */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-deep shadow-inner group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-7 h-7 text-gold-deep drop-shadow-[0_2px_4px_rgba(201,169,110,0.3)]" />
              </div>

              <h3 className="text-sm sm:text-base font-extrabold text-gold-deep mb-3 transition-colors duration-200">الشفافية المطلقة</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                عقود قانونية موثقة وخالية من أي رسوم خفية أو بنود غير معلنة. الثقة هي الأساس بيننا وبين عملائنا.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={fadeUpVariants}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -6 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group relative p-8 bg-white border border-gold-primary/50 rounded-3xl shadow-[0_25px_60px_rgba(201,169,110,0.12)] hover:shadow-[0_30px_70px_rgba(201,169,110,0.18)] transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
            >
              {/* Card top gold line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent rounded-t-full opacity-100"></div>

              {/* Icon Badge container */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-deep shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-7 h-7 text-gold-deep drop-shadow-[0_2px_4px_rgba(201,169,110,0.3)]" />
              </div>

              <h3 className="text-sm sm:text-base font-extrabold text-gold-deep mb-3 transition-colors duration-200">خبرة 15 عاماً</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                نفخر بتسليم أكثر من 25 مشروعاً ناجحاً وأكثر من 500 وحدة سكنية لعائلات تنعم بالاستقرار الآن.
              </p>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              variants={fadeUpVariants}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -6 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group relative p-8 bg-white border border-gold-primary/50 rounded-3xl shadow-[0_25px_60px_rgba(201,169,110,0.12)] hover:shadow-[0_30px_70px_rgba(201,169,110,0.18)] transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
            >
              {/* Card top gold line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent rounded-t-full opacity-100"></div>

              {/* Icon Badge container */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-deep shadow-inner group-hover:scale-110 transition-transform duration-300">
                <HelpCircle className="w-7 h-7 text-gold-deep drop-shadow-[0_2px_4px_rgba(201,169,110,0.3)]" />
              </div>

              <h3 className="text-sm sm:text-base font-extrabold text-gold-deep mb-3 transition-colors duration-200">دعم ما بعد البيع</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                فريق صيانة ودعم فني متاح لتلبية احتياجاتك وإصلاح الأعطال الطارئة حتى بعد تسليم المفاتيح.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------
         11. Testimonials Professional Carousel (Dark Navy Theme - Glassmorphism)
         ---------------------------------------------------- */}
      <section className="relative w-full overflow-hidden py-24 bg-gradient-to-b from-bg-deep via-bg-navy to-bg-deep border-y border-border-gold/15 z-10">


        {/* Luxury Decorative Soft Blurs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gold-primary/5 to-transparent rounded-full blur-3xl -z-10 animate-pulse duration-[8000ms]"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-brand-primary/5 to-transparent rounded-full blur-3xl -z-10 animate-pulse duration-[10000ms]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="flex flex-col items-center text-center mb-16"
          >
            <motion.span variants={fadeUpVariants} className="inline-block py-1.5 px-4 text-[10px] font-extrabold text-gold-primary bg-bg-royal/60 border border-border-gold/20 rounded-full uppercase mb-3.5">
              آراء عملائنا
            </motion.span>
            <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-text-primary liquid-gold-heading leading-tight font-tajawal">
              تجارب حقيقية لشركاء النجاح
            </motion.h2>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative max-w-4xl mx-auto px-4 sm:px-12">

            {/* Main Card with Swipe support & Premium Lighter Blue Glassmorphism */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="relative bg-bg-royal/45 backdrop-blur-2xl border border-gold-primary/30 rounded-[2.5rem] p-8 sm:p-12 md:p-16 shadow-[0_45px_90px_rgba(0,0,0,0.55)] hover:shadow-[0_55px_100px_rgba(201,169,110,0.15)] transition-all duration-500 overflow-hidden text-center min-h-[380px] sm:min-h-[340px] flex flex-col justify-between cursor-pointer"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseEnter={() => setIsTestimonialHovered(true)}
              onMouseLeave={() => setIsTestimonialHovered(false)}
            >
              {/* Card Accent line on top - Gradient Gold Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent rounded-t-full"></div>

              {/* Elegant Metallic Gold Quotes Mark - Elevated design feature */}
              <div className="absolute top-4 right-8 text-gold-primary/10 pointer-events-none select-none">
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
                  {/* Rating Stars with soft gold glow shadow */}
                  <div className="flex gap-1 text-gold-primary mb-6 drop-shadow-[0_2px_8px_rgba(201,169,110,0.45)]">
                    {[...Array(TESTIMONIALS[currentTestimonialIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-current" />
                    ))}
                  </div>

                  {/* Quote Text - High-Contrast Lighter Slate/White */}
                  <p className="text-base sm:text-lg md:text-xl text-slate-100 leading-relaxed font-bold mb-8 max-w-2xl px-2 [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
                    "{TESTIMONIALS[currentTestimonialIndex].quote}"
                  </p>

                  {/* Author Info with Gradient Halo ring */}
                  <div className="flex flex-col items-center gap-4 mt-2">
                    <div className="relative">
                      {/* Glowing luxury gold halo ring */}
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-gold-deep via-gold-primary to-gold-light opacity-40 blur-[2px]"></div>
                      <div className="relative w-14 h-14 rounded-full bg-bg-royal border border-gold-primary/30 flex items-center justify-center font-black text-gold-primary text-sm shadow-md">
                        {TESTIMONIALS[currentTestimonialIndex].initials}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-white">
                        {TESTIMONIALS[currentTestimonialIndex].author}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-text-muted font-medium mt-0.5">
                        {TESTIMONIALS[currentTestimonialIndex].project}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Navigation Arrows (Sides on desktop, below on mobile) */}
            <div className="flex justify-center md:block mt-8 md:mt-0">
              {/* Prev Button (Right arrow in RTL) */}
              <button
                type="button"
                onClick={handlePrev}
                className="md:absolute md:top-1/2 md:-right-6 md:-translate-y-1/2 mx-2 md:mx-0 w-12 h-12 rounded-full bg-bg-royal/80 backdrop-blur-md border border-border-gold/20 hover:border-gold-primary text-white hover:text-gold-primary flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer z-10"
                aria-label="التقييم السابق"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Next Button (Left arrow in RTL) */}
              <button
                type="button"
                onClick={handleNext}
                className="md:absolute md:top-1/2 md:-left-6 md:-translate-y-1/2 mx-2 md:mx-0 w-12 h-12 rounded-full bg-bg-royal/80 backdrop-blur-md border border-border-gold/20 hover:border-gold-primary text-white hover:text-gold-primary flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer z-10"
                aria-label="التقييم التالي"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentTestimonialIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentTestimonialIndex
                    ? 'bg-gold-primary shadow-[0_0_8px_rgba(201,169,110,0.6)] w-6'
                    : 'bg-gold-primary/20 hover:bg-gold-primary/40 w-1.5'
                    }`}
                  aria-label={`الانتقال إلى التقييم ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
         11.5. Success Partners Section (شركاء النجاح) - Light Premium Theme with Infinite Marquee
         ---------------------------------------------------- */}
      <section className="relative w-full overflow-hidden py-28 bg-gradient-to-br from-[#FAF8F5] via-[#FFFFFF] to-[#F7F3EB] border-b border-slate-200/40 z-10">
        
        {/* Luxury Architectural Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,169,110,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,0.02)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none -z-10 opacity-70" />

        {/* Soft elegant background glow shapes */}
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-gradient-to-br from-gold-primary/6 to-transparent rounded-full blur-3xl -z-10 animate-pulse duration-[12000ms]"></div>
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-gradient-to-tl from-gold-warm/6 to-transparent rounded-full blur-3xl -z-10 animate-pulse duration-[15000ms]"></div>
        
        <div className="relative w-full mx-auto z-10">
          
          {/* Centered Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="flex flex-col items-center text-center mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <motion.span variants={fadeUpVariants} className="inline-block py-1.5 px-4 text-[10px] font-extrabold text-gold-deep bg-gold-primary/10 border border-gold-primary/30 rounded-full uppercase mb-3.5 tracking-wider">
              شركاء النجاح
            </motion.span>
            <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-[#060D1A] liquid-gold-heading leading-tight font-tajawal">نعتز بثقتهم لبناء مستقبل واعد</motion.h2>
            
            {/* Elegant luxury gold separator */}
            <motion.div 
              variants={fadeUpVariants}
              className="mt-5 flex items-center justify-center gap-2"
            >
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gold-primary/60"></div>
              <div className="w-2.5 h-2.5 rotate-45 border border-gold-primary/70 bg-[#FAF8F5] shadow-sm"></div>
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gold-primary/60"></div>
            </motion.div>
          </motion.div>

          {/* Centered Partners Grid Container - Displays all 4 cards statically with staggered spring entrance animations */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
            dir="rtl"
          >
            {PARTNERS.map((partner) => (
              <motion.div
                key={partner.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.96 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { type: "spring", stiffness: 100, damping: 18 }
                  }
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative flex items-center justify-center p-6 bg-white border border-gold-primary/30 hover:border-gold-primary/60 rounded-3xl h-[130px] transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={140}
                    height={70}
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------
         12. Bottom Footer - Centered & Ultra-Premium with Layered Skyline SVG
         ---------------------------------------------------- */}
      <footer className="relative bg-[#0A1628] pt-24 pb-0 overflow-hidden flex flex-col justify-between" dir="rtl">
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
                  <h4 className="text-md font-extrabold text-white leading-tight font-tajawal">
                    الغربية <span className="bg-gradient-to-r from-gold-light via-gold-primary to-gold-warm bg-clip-text text-transparent font-black">الذهبية</span>
                  </h4>
                  <p className="text-[8px] text-gold-primary/90 tracking-[0.2em] font-serif uppercase font-medium -mt-0.5">
                    AL GHRBIA GOLDEN
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-cairo">
                أرقى المجمعات السكنية والفلل الفاخرة in المملكة العربية السعودية. نجسّد الفخامة في كل تفصيل إنشائي وتصميمي لنقدم تجربة عيش تليق بتطلعات عملائنا.
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
              <h3 className="text-sm font-bold text-white border-r-2 border-gold-primary pr-3 leading-none font-cairo">روابط سريعة</h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li><a href="#" className="hover:text-gold-primary hover:ps-1 transition-all duration-300 block">الرئيسية</a></li>
                <li><a href="#listings-section" className="hover:text-gold-primary hover:ps-1 transition-all duration-300 block">الوحدات العقارية المعروضة</a></li>
                <li><a href="#projects-section" className="hover:text-gold-primary hover:ps-1 transition-all duration-300 block">مشاريعنا المميزة</a></li>
                <li><a href="#about-section" className="hover:text-gold-primary hover:ps-1 transition-all duration-300 block">لماذا الغربية الذهبية؟</a></li>
                <li><a href="#contact-section" className="hover:text-gold-primary hover:ps-1 transition-all duration-300 block">اتصل بنا</a></li>
              </ul>
            </div>

            {/* Column 3: Featured Projects */}
            <div className="flex flex-col space-y-5">
              <h3 className="text-sm font-bold text-white border-r-2 border-gold-primary pr-3 leading-none font-cairo">مشاريعنا الفاخرة</h3>
              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-available"></span>
                  <a href="#projects-section" className="hover:text-gold-primary transition-colors duration-200 font-cairo">مجمع أبو هايل نورت (متاح)</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-available"></span>
                  <a href="#projects-section" className="hover:text-gold-primary transition-colors duration-200 font-cairo">فيلا مخطط السعيد (متاح)</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-soon"></span>
                  <a href="#projects-section" className="hover:text-gold-primary transition-colors duration-200 font-cairo">ملحق روف أمل ستارز (قريباً)</a>
                </li>
              </ul>
            </div>

            {/* Column 4: Private Consultation */}
            <div className="flex flex-col space-y-5">
              <h3 className="text-sm font-bold text-white border-r-2 border-gold-primary pr-3 leading-none font-cairo">الاستشارات العقارية</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-cairo">
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
                onClick={() => setShowInquiryModal(true)}
                className="w-full py-3 px-4 text-xs btn-premium-gold cursor-pointer"
              >
                طلب جولة معاينة خاصة
              </button>
            </div>

          </div>

          {/* Social Row & Corporate details */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
            {/* Social circle buttons */}
            <div className="flex items-center gap-4">
              {/* WhatsApp */}
              <a href="https://api.whatsapp.com/send?phone=966558837846" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-bg-royal/60 border border-gold-primary/35 flex items-center justify-center hover:bg-bg-royal hover:border-gold-primary text-gold-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(201,169,110,0.4)] shadow-md" aria-label="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
              {/* Instagram */}
              <a href="#" className="w-11 h-11 rounded-full bg-bg-royal/60 border border-gold-primary/35 flex items-center justify-center hover:bg-bg-royal hover:border-gold-primary text-gold-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(201,169,110,0.4)] shadow-md" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              {/* X / Twitter */}
              <a href="#" className="w-11 h-11 rounded-full bg-bg-royal/60 border border-gold-primary/35 flex items-center justify-center hover:bg-bg-royal hover:border-gold-primary text-gold-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(201,169,110,0.4)] shadow-md" aria-label="X (Twitter)">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-11 h-11 rounded-full bg-bg-royal/60 border border-gold-primary/35 flex items-center justify-center hover:bg-bg-royal hover:border-gold-primary text-gold-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(201,169,110,0.4)] shadow-md" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              {/* Facebook */}
              <a href="#" className="w-11 h-11 rounded-full bg-bg-royal/60 border border-gold-primary/35 flex items-center justify-center hover:bg-bg-royal hover:border-gold-primary text-gold-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(201,169,110,0.4)] shadow-md" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              {/* YouTube */}
              <a href="#" className="w-11 h-11 rounded-full bg-bg-royal/60 border border-gold-primary/35 flex items-center justify-center hover:bg-bg-royal hover:border-gold-primary text-gold-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(201,169,110,0.4)] shadow-md" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Corporate Registration Info */}
            <div className="text-right text-[10px] text-slate-400 leading-relaxed font-cairo">
              <p className="font-semibold text-slate-300">شركة الغربية الذهبية للتطوير العقاري | سجل تجاري: 4030489953 | الرقم الموحد: 920016581</p>
              <p>جدة، حي السلامة، طريق الأمير سلطان | البريد الإلكتروني: info@alghrbia.sa | Alghrbia Golden Real Estate Development</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="relative w-full bg-[#060D1A]/90 backdrop-blur-sm py-4 z-10 text-center pointer-events-auto">
          {/* Premium gradient divider */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/35 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400">
            <p className="mb-2 sm:mb-0">
              © {new Date().getFullYear()} شركة الغربية الذهبية للتطوير العقاري. جميع الحقوق محفوظة.
            </p>
            <p className="opacity-75 font-cairo">
              صُمم بالفخامة الرقمية لتلبية تطلعات الكود السعودي للبناء.
            </p>
          </div>
        </div>
      </footer>

      {/* ----------------------------------------------------
         13. General Inquiry Popup Modal
         ---------------------------------------------------- */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060D1A]/85 backdrop-blur-md transition-all duration-500 animate-fade-in" onClick={() => setShowInquiryModal(false)}>
          <div
            className="relative w-full max-w-3xl bg-[#0A1628]/85 backdrop-blur-3xl border border-gold-primary/35 shadow-[0_40px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(201,169,110,0.2)] rounded-3xl p-10 text-right transform transition-all duration-500 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gold-primary/10 to-transparent blur-3xl pointer-events-none rounded-full" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-brand-primary/10 to-transparent blur-3xl pointer-events-none rounded-full" />

            {/* Close Button */}
            <button
              type="button"
              className="absolute top-6 left-6 p-2.5 text-slate-400 hover:text-gold-primary bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-300 cursor-pointer"
              onClick={() => setShowInquiryModal(false)}
              aria-label="إغلاق"
              title="إغلاق نافذة الحجز"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-8 pb-4 border-b border-white/10">
              <span className="text-[10px] font-bold text-gold-primary tracking-widest block mb-1.5 font-serif uppercase">
                PRIVATE RESERVATION
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-white leading-tight font-tajawal">
                حجز جولتك الخاصة / <span className="bg-gradient-to-r from-gold-light via-gold-primary to-gold-warm bg-clip-text text-transparent">طلب معاينة عقارية فاخرة</span>
              </h4>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setInquirySuccess(true);
                setTimeout(() => {
                  setShowInquiryModal(false);
                  setInquirySuccess(false);
                }, 2000);
              }}
              className="space-y-6"
            >
              {/* Row 1: Name, Phone, City */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">الاسم بالكامل</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/15 focus:border-gold-primary/70 focus:bg-white/10 rounded-xl px-5 py-3.5 text-xs sm:text-sm text-text-primary placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-all duration-300"
                    placeholder="الاسم الثلاثي"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">رقم الجوال</label>
                  <input
                    type="tel"
                    required
                    pattern="^(05|009665|\+9665)\d{8}$"
                    className="w-full bg-white/5 border border-white/15 focus:border-gold-primary/70 focus:bg-white/10 rounded-xl px-5 py-3.5 text-xs sm:text-sm text-left font-mono text-text-primary placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-all duration-300"
                    placeholder="05xxxxxxxx"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry-city" className="block text-xs font-semibold text-slate-300 mb-2">المدينة</label>
                  <select
                    id="inquiry-city"
                    title="اختر المدينة لحجز الجولة"
                    className="w-full bg-[#0F2040] border border-white/15 focus:border-gold-primary/70 focus:bg-[#152A54] rounded-xl px-5 py-3.5 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-all duration-300"
                  >
                    <option value="جدة">جدة</option>
                    <option value="الرياض">الرياض</option>
                    <option value="مكة">مكة المكرمة</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Property Type, Additional Notes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
                <div>
                  <label htmlFor="inquiry-type" className="block text-xs font-semibold text-slate-300 mb-2">نوع العقار المفضل</label>
                  <select
                    id="inquiry-type"
                    title="اختر نوع العقار المفضل لجولتك"
                    className="w-full bg-[#0F2040] border border-white/15 focus:border-gold-primary/70 focus:bg-[#152A54] rounded-xl px-5 py-3.5 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-all duration-300"
                  >
                    <option value="شقة">شقة سكينة</option>
                    <option value="فيلا">فيلا مستقلة</option>
                    <option value="ملحق">ملحق / روف</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-2">ملاحظات إضافية</label>
                  <textarea
                    rows={1}
                    className="w-full bg-white/5 border border-white/15 focus:border-gold-primary/70 focus:bg-white/10 rounded-xl px-5 py-3 text-xs sm:text-sm text-text-primary placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-gold-primary/50 transition-all duration-300 resize-none"
                    placeholder="تفاصيل إضافية لطلب المعاينة..."
                  ></textarea>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 px-6 text-xs sm:text-sm font-bold btn-premium-gold !rounded-xl"
                >
                  تأكيد حجز الجولة العقارية الفاخرة
                </button>
              </div>
            </form>

            {inquirySuccess && (
              <div className="mt-4 p-4 bg-status-available/10 border border-status-available/20 rounded-md text-status-available text-xs font-bold text-center animate-pulse">
                ✓ تم تسجيل طلب الجولة بنجاح!
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
