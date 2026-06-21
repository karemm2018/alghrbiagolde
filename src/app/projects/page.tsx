// src/app/projects/page.tsx
'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PROJECTS, Project } from '@/lib/mockData';
import CustomSelect from '@/components/ui/CustomSelect';
import { useInquiryStore } from '@/store/useInquiryStore';
import {
  Search,
  MapPin,
  Building2,
  LayoutGrid,
  List,
  SlidersHorizontal,
  TableProperties,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Phone,
  MessageCircle,
  X,
  Check,
  Building,
  RotateCcw,
  Sliders,
  Filter,
  Calendar,
  Compass,
  Download
} from 'lucide-react';

// Sub-component for horizontal detailed project card view
const DetailedProjectCard = ({ project, openInquiry }: { project: Project; openInquiry: () => void }) => {
  let statusLabel = '';
  let statusClass = '';
  if (project.status === 'completed') {
    statusLabel = 'جاهز للتسليم';
    statusClass = 'bg-status-available border-status-available shadow-[0_4px_12px_rgba(34,169,110,0.3)]';
  } else if (project.status === 'under_construction') {
    statusLabel = 'تحت الإنشاء';
    statusClass = 'bg-status-reserved border-status-reserved shadow-[0_4px_12px_rgba(212,136,58,0.3)]';
  } else if (project.status === 'upcoming') {
    statusLabel = 'قريباً';
    statusClass = 'bg-status-soon border-status-soon shadow-[0_4px_12px_rgba(36,112,194,0.3)]';
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(price) + ' ر.س';
  };

  const whatsappLink = `https://wa.me/966550085811?text=${encodeURIComponent(`السلام عليكم، أرغب في الاستفسار عن تفاصيل ${project.name}`)}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col lg:flex-row bg-[#0F2342]/70 backdrop-blur-xl border border-border-gold/30 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-gold-primary/50"
    >
      {/* Image Block */}
      <div className="relative w-full lg:w-[35%] aspect-[16/10] lg:aspect-auto min-h-[240px] overflow-hidden bg-bg-deep">
        <Image 
          src={project.media.hero || '/properties/apartment.webp'} 
          alt={project.name}
          fill
          sizes="(max-width: 1024px) 100vw, 35vw"
          className="object-cover transition-transform duration-[6000ms] group-hover:scale-108 z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-slate-950/70 via-transparent to-transparent z-10"></div>
        <div className="absolute top-4 start-4 z-20">
          <span className={`px-3 py-1 text-[10px] font-extrabold text-white border rounded-full ${statusClass}`}>
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Info Block */}
      <div className="flex-1 p-6 sm:p-8 flex flex-col text-right justify-between">
        <div>
          <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5 text-xs text-text-muted">
                <MapPin className="w-3.5 h-3.5 text-gold-primary shrink-0" />
                <span>{project.location.city} • {project.location.district}</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight font-el-messiri group-hover:text-gold-primary transition-colors">
                {project.name}
              </h3>
            </div>
            <div className="text-right lg:text-left">
              <span className="text-[9px] text-text-muted block mb-0.5">نطاق الأسعار</span>
              <span className="text-lg sm:text-xl font-extrabold text-gold-primary font-el-messiri">
                {formatPrice(project.priceRange.min)} - {formatPrice(project.priceRange.max)}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/5 mb-6 text-xs text-text-secondary text-center">
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-[9px] text-text-muted">المنطقة</span>
              <span className="font-bold text-white">{project.location.district}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 border-s sm:border-s-0 sm:border-x border-white/5">
              <span className="text-[9px] text-text-muted">إجمالي الوحدات</span>
              <span className="font-bold text-white">{project.specs.totalUnits} شقة</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 border-s border-white/5">
              <span className="text-[9px] text-text-muted">الوحدات المتاحة</span>
              <span className="font-bold text-gold-light">{project.specs.availableUnits} شقة</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 border-s border-white/5">
              <span className="text-[9px] text-text-muted">تاريخ التسليم</span>
              <span className="font-bold text-white">{project.specs.completionDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-white/5 pt-5">
          <Link
            href={`/properties?project=${project.slug}`}
            className="w-full sm:w-auto py-2.5 px-6 text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-gold-primary/40 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center"
          >
            <span>استعراض وحدات المشروع</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </Link>

          <a
            href="/brochure-placeholder.pdf"
            download
            className="w-full sm:w-auto py-2.5 px-6 text-xs font-bold bg-gold-primary/10 hover:bg-gold-primary/20 text-gold-primary border border-gold-primary/25 hover:border-gold-primary/50 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تحميل البروفايل PDF</span>
          </a>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-2.5 px-6 text-xs font-bold bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 hover:border-[#25D366]/40 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>استفسار واتساب</span>
          </a>

          <button
            type="button"
            onClick={openInquiry}
            className="w-full sm:w-auto py-2.5 px-6 text-xs font-bold btn-premium-gold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer font-el-messiri transition-all hover:scale-102 active:scale-98"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>طلب تفاصيل المشروع</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Sub-component for standard project card (grid/carousel)
const ProjectCard = ({ project, openInquiry }: { project: Project; openInquiry: () => void }) => {
  let statusLabel = '';
  let statusClass = '';
  if (project.status === 'completed') {
    statusLabel = 'جاهز للتسليم';
    statusClass = 'bg-status-available border-status-available shadow-[0_4px_12px_rgba(34,169,110,0.3)]';
  } else if (project.status === 'under_construction') {
    statusLabel = 'تحت الإنشاء';
    statusClass = 'bg-status-reserved border-status-reserved shadow-[0_4px_12px_rgba(212,136,58,0.3)]';
  } else if (project.status === 'upcoming') {
    statusLabel = 'قريباً';
    statusClass = 'bg-status-soon border-status-soon shadow-[0_4px_12px_rgba(36,112,194,0.3)]';
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(price) + ' ر.س';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-[#0F2342]/70 backdrop-blur-xl border border-border-gold/30 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-gold-primary/50 flex flex-col h-full text-right"
    >
      {/* Image Block */}
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-deep shrink-0">
        <Image 
          src={project.media.hero || '/properties/apartment.webp'} 
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[6000ms] group-hover:scale-108 z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-10"></div>
        <div className="absolute top-4 start-4 z-20">
          <span className={`px-3 py-1 text-[10px] font-extrabold text-white border rounded-full ${statusClass}`}>
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Info Block */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-2 text-xs text-text-muted">
            <MapPin className="w-3.5 h-3.5 text-gold-primary shrink-0" />
            <span>{project.location.city} • {project.location.district}</span>
          </div>

          <h3 className="text-lg font-extrabold text-white mb-2 leading-tight font-el-messiri group-hover:text-gold-primary transition-colors">
            {project.name}
          </h3>

          <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-2">
            {project.tagline || project.description}
          </p>

          <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 mb-4 text-[11px] text-text-secondary text-center">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-text-muted">تاريخ التسليم</span>
              <span className="font-bold text-white">{project.specs.completionDate}</span>
            </div>
            <div className="flex flex-col gap-0.5 flex-1">
              <span className="text-[9px] text-text-muted">الوحدات المتاحة</span>
              <span className="font-bold text-gold-light">{project.specs.availableUnits} من {project.specs.totalUnits}</span>
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div>
          <div className="border-t border-white/5 pt-4 flex items-center justify-between gap-4">
            <div className="text-right">
              <span className="text-[9px] text-text-muted block">تبدأ الأسعار من</span>
              <span className="text-base font-extrabold text-gold-primary font-el-messiri">
                {formatPrice(project.priceRange.min)}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <a
                href="/brochure-placeholder.pdf"
                download
                title="تحميل البروفايل PDF"
                className="p-2 rounded-xl bg-white/5 hover:bg-gold-primary/10 border border-white/10 hover:border-gold-primary/40 text-text-secondary hover:text-gold-primary transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={openInquiry}
                className="py-2 px-4 text-xs font-bold btn-premium-gold rounded-xl cursor-pointer font-el-messiri transition-all hover:scale-102 active:scale-98 shadow-md"
              >
                تفاصيل
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  const openInquiry = useInquiryStore((state) => state.open);
  const isReducedMotion = useReducedMotion();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<string>('all');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'detailed' | 'carousel' | 'table'>('grid');

  // DOM Refs
  const carouselRef = useRef<HTMLDivElement>(null);
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  // Extract unique cities dynamically
  const cityOptions = useMemo(() => {
    const citiesSet = new Set<string>();
    PROJECTS.forEach(proj => citiesSet.add(proj.location.city));
    const citiesArray = Array.from(citiesSet);
    return [
      { value: 'all', label: 'كل المدن' },
      ...citiesArray.map(c => ({ value: c, label: c }))
    ];
  }, []);

  const statusOptions = [
    { value: 'all', label: 'كل الحالات' },
    { value: 'completed', label: 'جاهز للتسليم' },
    { value: 'under_construction', label: 'تحت الإنشاء' },
    { value: 'upcoming', label: 'قريباً' }
  ];

  // Dynamic districts options depending on selected city
  const districtOptions = useMemo(() => {
    const list = [{ value: 'all', label: 'كل الأحياء' }];
    const uniqueDistricts = new Set<string>();

    PROJECTS.forEach(proj => {
      if (selectedCity === 'all' || proj.location.city === selectedCity) {
        uniqueDistricts.add(proj.location.district);
      }
    });

    uniqueDistricts.forEach(dist => {
      list.push({ value: dist, label: dist });
    });

    return list;
  }, [selectedCity]);

  // Dynamic filter visibility depending on options availability
  const showCityFilter = useMemo(() => cityOptions.length > 2, [cityOptions]);
  const showDistrictFilter = useMemo(() => districtOptions.length > 2, [districtOptions]);

  const gridColsClass = useMemo(() => {
    let cols = 2; // Search query takes col-span-2
    if (showCityFilter) cols += 1;
    if (showDistrictFilter) cols += 1;
    return `grid grid-cols-1 md:grid-cols-${cols} gap-4`;
  }, [showCityFilter, showDistrictFilter]);

  // Price select options
  const minPriceOptions = [
    { value: 'all', label: 'الحد الأدنى' },
    { value: '500000', label: '500 ألف ر.س' },
    { value: '700000', label: '700 ألف ر.س' },
    { value: '1000000', label: '1 مليون ر.س' }
  ];

  const maxPriceOptions = [
    { value: 'all', label: 'الحد الأقصى' },
    { value: '750000', label: '750 ألف ر.س' },
    { value: '1000000', label: '1 مليون ر.س' },
    { value: '2000000', label: '2 مليون ر.س' },
    { value: '15000000', label: '15 مليون ر.س' }
  ];

  // Filtering Logic
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(proj => {
      // 1. Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const inName = proj.name.toLowerCase().includes(query);
        const inDistrict = proj.location.district.toLowerCase().includes(query);
        const inTagline = proj.tagline?.toLowerCase().includes(query) || false;
        const inDesc = proj.description.toLowerCase().includes(query);
        if (!inName && !inDistrict && !inTagline && !inDesc) return false;
      }

      // 2. City
      if (selectedCity !== 'all' && proj.location.city !== selectedCity) return false;

      // 3. District
      if (selectedDistrict !== 'all' && proj.location.district !== selectedDistrict) return false;

      // 4. Status
      if (selectedStatus !== 'all' && proj.status !== selectedStatus) return false;

      // 5. Price Min
      if (minPrice !== 'all' && proj.priceRange.min < parseInt(minPrice)) return false;

      // 6. Price Max
      if (maxPrice !== 'all' && proj.priceRange.max > parseInt(maxPrice)) return false;

      return true;
    });
  }, [
    searchQuery,
    selectedCity,
    selectedDistrict,
    selectedStatus,
    minPrice,
    maxPrice
  ]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim() !== '') count++;
    if (selectedCity !== 'all') count++;
    if (selectedDistrict !== 'all') count++;
    if (selectedStatus !== 'all') count++;
    if (minPrice !== 'all') count++;
    if (maxPrice !== 'all') count++;
    return count;
  }, [
    searchQuery,
    selectedCity,
    selectedDistrict,
    selectedStatus,
    minPrice,
    maxPrice
  ]);

  // Reset Filters Helper
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setSelectedDistrict('all');
    setSelectedStatus('all');
    setMinPrice('all');
    setMaxPrice('all');
  };

  // Table and Carousel horizontal scroll adjustment effect (starting from the right in RTL)
  useEffect(() => {
    if (viewMode === 'table' && tableWrapperRef.current) {
      const el = tableWrapperRef.current;
      el.scrollLeft = 0;
      const timer = setTimeout(() => {
        el.scrollLeft = 0;
      }, 55);
      return () => clearTimeout(timer);
    }
    if (viewMode === 'carousel' && carouselRef.current) {
      const el = carouselRef.current;
      el.scrollLeft = 0;
      const timer = setTimeout(() => {
        el.scrollLeft = 0;
      }, 55);
      return () => clearTimeout(timer);
    }
  }, [viewMode, filteredProjects]);

  // Carousel navigation trigger helpers
  const handleCarouselNav = (direction: 'next' | 'prev') => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const amount = container.clientWidth * 0.8;
      const sign = direction === 'next' ? -1 : 1; // negative leftwards in RTL
      container.scrollBy({ left: amount * sign, behavior: 'smooth' });
    }
  };

  const formatPriceRange = (min: number, max: number) => {
    const minF = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(min);
    const maxF = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(max);
    return `${minF} - ${maxF} ر.س`;
  };

  return (
    <main className="min-h-screen bg-bg-midnight relative overflow-x-hidden" dir="rtl">
      {/* ----------------------------------------------------
         1. Full-screen Hero Section (80vh & Full Width)
         ---------------------------------------------------- */}
      <section className="relative h-[80vh] w-full flex items-center justify-center bg-bg-deep overflow-hidden">
        {/* Background Image with Slow Zoom effect */}
        <div className="absolute inset-0 z-0 select-none">
          <Image 
            src="/hero-bg-projects.png" 
            alt="Luxury projects background"
            fill
            priority
            className="object-cover scale-105"
          />
          {/* Lightened premium overlay for readability and visual clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A]/90 via-[#060D1A]/55 to-[#060D1A]/15"></div>
        </div>

        {/* Banner Contents (Centered vertically and shifted 10vh down below floating navbar) */}
        <div className="relative z-10 max-w-5xl w-[90%] mx-auto text-center flex flex-col items-center justify-center pt-28 sm:pt-36 pb-12 sm:pb-16 translate-y-[10vh]">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-extrabold text-gold-primary tracking-widest uppercase block mb-4 font-serif text-center"
          >
            EXCLUSIVE DEVELOPMENTS
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl xs:text-2xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-el-messiri mb-6 drop-shadow-xl text-center"
          >
            اكتشف <span className="bg-gradient-to-r from-gold-light via-gold-primary to-gold-warm bg-clip-text text-transparent">مشاريعنا المعمارية الفاخرة</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-base text-text-secondary leading-relaxed mb-10 max-w-2xl drop-shadow-md text-center"
          >
            نصنع مجتمعات سكنية متكاملة تواكب تطلعاتكم، ونقدم رؤية هندسية مبتكرة تجمع الأصالة بالحداثة في مواقع استراتيجية متميزة.
          </motion.p>

          {/* Call To Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none px-4 sm:px-0"
          >
            <button
              type="button"
              onClick={openInquiry}
              className="w-full sm:w-auto py-3.5 px-10 text-xs sm:text-sm font-bold btn-premium-gold rounded-full flex items-center justify-center gap-2 cursor-pointer font-el-messiri transition-all hover:scale-102 active:scale-98 shadow-lg shadow-gold-primary/10"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>تواصل معنا للاستفسار</span>
            </button>

            <Link
              href="/properties"
              className="w-full sm:w-auto py-3.5 px-10 text-xs sm:text-sm font-bold bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-gold-primary/50 rounded-full flex items-center justify-center gap-2 transition-all duration-300 font-el-messiri hover:scale-102 active:scale-98 text-center"
            >
              <Compass className="w-4 h-4 shrink-0 text-gold-primary" />
              <span>تصفح الوحدات السكنية</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Background ambient light effects */}
      <div className="absolute top-[80vh] start-0 w-[45vw] h-[45vw] bg-gradient-to-br from-gold-primary/8 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] end-0 w-[35vw] h-[35vw] bg-gradient-to-tr from-brand-primary/5 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* 2. Listings Wrapper */}
      <div id="projects-listings-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 relative z-10">

        {/* Filter panel card */}
        <section className="bg-bg-navy/35 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl mb-10 transition-all duration-300">
          <div className="flex flex-col gap-6">
            
            {/* Primary filter row */}
            <div className={gridColsClass}>
              {/* Search input */}
              <div className="relative w-full text-right md:col-span-2">
                <label htmlFor="proj-search" className="sr-only">البحث عن مشروع</label>
                <div className="relative">
                  <input 
                    id="proj-search"
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث باسم المشروع، الحي، أو المدينة..."
                    className="w-full bg-white/10 border border-border-gold/30 hover:border-gold-primary/50 focus:border-gold-primary rounded-xl px-4 py-3 pe-12 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-gold-primary transition-all duration-300"
                  />
                  <Search className="w-5 h-5 text-text-muted absolute top-1/2 start-4 -translate-y-1/2" />
                </div>
              </div>

              {/* City selector */}
              {showCityFilter && (
                <CustomSelect 
                  id="city-select"
                  title="المدينة"
                  options={cityOptions}
                  value={selectedCity}
                  onChange={(val) => {
                    setSelectedCity(val);
                    setSelectedDistrict('all'); // reset district on city switch
                  }}
                />
              )}

              {/* District selector */}
              {showDistrictFilter && (
                <CustomSelect 
                  id="district-select"
                  title="الحي"
                  options={districtOptions}
                  value={selectedDistrict}
                  onChange={setSelectedDistrict}
                />
              )}
            </div>

            {/* Collapsible advanced filters panel */}
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/10 pt-6 flex flex-col gap-6">
                    
                    {/* Advanced parameters */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Project Status */}
                      <CustomSelect 
                        id="status-select"
                        title="حالة المشروع"
                        options={statusOptions}
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                      />
                      
                      {/* Min Price */}
                      <CustomSelect 
                        id="min-price-select"
                        title="الحد الأدنى للسعر"
                        options={minPriceOptions}
                        value={minPrice}
                        onChange={setMinPrice}
                      />

                      {/* Max Price */}
                      <CustomSelect 
                        id="max-price-select"
                        title="الحد الأقصى للسعر"
                        options={maxPriceOptions}
                        value={maxPrice}
                        onChange={setMaxPrice}
                      />
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions and active filter state indicators */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 mt-2">
              <div className="flex items-center gap-3">
                {/* Advanced filter toggle button */}
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-300 ${
                    showAdvanced 
                      ? 'bg-white/10 border-gold-primary/50 text-gold-primary' 
                      : 'bg-white/5 border-white/10 text-text-secondary hover:border-gold-primary/40 hover:text-white'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span>{showAdvanced ? 'إخفاء الفلاتر المتقدمة' : 'المزيد من الفلاتر'}</span>
                </button>

                {/* Reset button if any filter active */}
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors duration-300"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إعادة تعيين ({activeFiltersCount})</span>
                  </button>
                )}
              </div>

              {/* Status Results Count */}
              <div className="text-xs text-text-secondary">
                تم العثور على <strong className="text-gold-primary font-mono text-sm">{filteredProjects.length}</strong> مشروع مطروح
              </div>
            </div>

          </div>
        </section>

        {/* Display modes switcher row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 bg-[#0F2040]/50 backdrop-blur-md p-1 border border-white/5 rounded-2xl shadow-lg">
            {/* Grid view button */}
            <button 
              type="button"
              title="عرض الشبكة"
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-xl cursor-pointer transition-all ${
                viewMode === 'grid' 
                  ? 'bg-gold-primary/10 border border-gold-primary/30 text-gold-primary' 
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            {/* Detailed row view button */}
            <button 
              type="button"
              title="العرض التفصيلي"
              onClick={() => setViewMode('detailed')}
              className={`p-2.5 rounded-xl cursor-pointer transition-all ${
                viewMode === 'detailed' 
                  ? 'bg-gold-primary/10 border border-gold-primary/30 text-gold-primary' 
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>

            {/* Carousel view button */}
            <button 
              type="button"
              title="العرض الدائري"
              onClick={() => setViewMode('carousel')}
              className={`p-2.5 rounded-xl cursor-pointer transition-all ${
                viewMode === 'carousel' 
                  ? 'bg-gold-primary/10 border border-gold-primary/30 text-gold-primary' 
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Table view button */}
            <button 
              type="button"
              title="عرض الجدول"
              onClick={() => setViewMode('table')}
              className={`p-2.5 rounded-xl cursor-pointer transition-all ${
                viewMode === 'table' 
                  ? 'bg-gold-primary/10 border border-gold-primary/30 text-gold-primary' 
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              <TableProperties className="w-4 h-4" />
            </button>
          </div>

          <h2 className="text-lg font-bold text-white font-el-messiri border-r-2 border-gold-primary pr-3 border-e-2 pe-3 border-r-0">مشاريعنا العقارية</h2>
        </div>

        {/* ----------------------------------------------------
           3. Display Modes Render Block
           ---------------------------------------------------- */}
        <div className="relative">
          <AnimatePresence mode="wait">
            
            {/* Grid View Mode */}
            {viewMode === 'grid' && (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    openInquiry={openInquiry} 
                  />
                ))}
              </motion.div>
            )}

            {/* Detailed Row View Mode */}
            {viewMode === 'detailed' && (
              <motion.div
                key="detailed-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-6"
              >
                {filteredProjects.map((project) => (
                  <DetailedProjectCard 
                    key={project.id} 
                    project={project} 
                    openInquiry={openInquiry} 
                  />
                ))}
              </motion.div>
            )}

            {/* Carousel Mode */}
            {viewMode === 'carousel' && (
              <motion.div
                key="carousel-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative group/carousel"
              >
                {/* Sliding container with Snap scrolling */}
                <div 
                  ref={carouselRef}
                  className="w-full flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 scroll-smooth"
                  dir="rtl"
                >
                  {filteredProjects.map((project) => (
                    <div 
                      key={project.id} 
                      className="w-[290px] sm:w-[350px] shrink-0 snap-center"
                    >
                      <ProjectCard project={project} openInquiry={openInquiry} />
                    </div>
                  ))}
                </div>

                {/* Carousel navigation overlay arrows (desktop only) */}
                <button
                  type="button"
                  onClick={() => handleCarouselNav('prev')}
                  aria-label="السابق"
                  title="الرجوع للخلف"
                  className="absolute top-1/2 -start-4 -translate-y-1/2 z-20 p-2.5 rounded-full bg-bg-midnight/90 border border-gold-primary/30 hover:border-gold-primary text-gold-primary shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 hidden sm:flex cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleCarouselNav('next')}
                  aria-label="التالي"
                  title="التمرير للأمام"
                  className="absolute top-1/2 -end-4 -translate-y-1/2 z-20 p-2.5 rounded-full bg-bg-midnight/90 border border-gold-primary/30 hover:border-gold-primary text-gold-primary shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 hidden sm:flex cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* Table Mode */}
            {viewMode === 'table' && (
              <motion.div
                key="table-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full overflow-hidden"
              >
                {/* Scrollable table container */}
                <div 
                  ref={tableWrapperRef} 
                  className="w-full overflow-x-auto border border-white/10 rounded-2xl custom-table-wrapper bg-[#0F2040]/40 backdrop-blur-xl"
                  dir="rtl"
                >
                  <table className="w-full border-collapse text-right text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02] text-text-muted font-bold">
                        <th className="p-4 border-x border-white/5 first:border-s-0 last:border-e-0">اسم المشروع</th>
                        <th className="p-4 border-x border-white/5 first:border-s-0 last:border-e-0">المدينة</th>
                        <th className="p-4 border-x border-white/5 first:border-s-0 last:border-e-0">الحي</th>
                        <th className="p-4 border-x border-white/5 first:border-s-0 last:border-e-0">تاريخ التسليم</th>
                        <th className="p-4 border-x border-white/5 first:border-s-0 last:border-e-0">الوحدات المتاحة</th>
                        <th className="p-4 border-x border-white/5 first:border-s-0 last:border-e-0">نطاق الأسعار</th>
                        <th className="p-4 text-left border-x border-white/5 first:border-s-0 last:border-e-0">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-text-secondary font-medium">
                      {filteredProjects.map((project) => {
                        let statusText = '';
                        if (project.status === 'completed') statusText = 'جاهز للتسليم';
                        else if (project.status === 'under_construction') statusText = 'تحت الإنشاء';
                        else if (project.status === 'upcoming') statusText = 'قريباً';

                        return (
                          <tr 
                            key={project.id} 
                            className="hover:bg-white/[0.02] transition-colors duration-200"
                          >
                            {/* Project Name & Thumbnail */}
                            <td className="p-4 flex items-center gap-3 border-x border-white/5 first:border-s-0 last:border-e-0">
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-bg-deep shrink-0 border border-white/10">
                                <Image 
                                  src={project.media.hero || '/properties/apartment.webp'} 
                                  alt={project.name}
                                  fill
                                  sizes="40px"
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <span className="block font-bold text-white text-xs sm:text-sm">{project.name}</span>
                                <span className="block text-[10px] text-text-muted mt-0.5">{statusText}</span>
                              </div>
                            </td>

                            {/* Location */}
                            <td className="p-4 text-xs sm:text-sm border-x border-white/5 first:border-s-0 last:border-e-0">{project.location.city}</td>
                            <td className="p-4 text-xs sm:text-sm border-x border-white/5 first:border-s-0 last:border-e-0">{project.location.district}</td>

                            {/* Specs */}
                            <td className="p-4 text-xs sm:text-sm border-x border-white/5 first:border-s-0 last:border-e-0">{project.specs.completionDate}</td>
                            <td className="p-4 font-mono text-xs sm:text-sm text-gold-light border-x border-white/5 first:border-s-0 last:border-e-0">
                              {project.specs.availableUnits} / {project.specs.totalUnits}
                            </td>

                            {/* Price */}
                            <td className="p-4 font-bold text-gold-primary text-xs sm:text-sm font-el-messiri border-x border-white/5 first:border-s-0 last:border-e-0">
                              {formatPriceRange(project.priceRange.min, project.priceRange.max)}
                            </td>

                            {/* Actions */}
                            <td className="p-4 text-left border-x border-white/5 first:border-s-0 last:border-e-0">
                              <div className="inline-flex items-center gap-2">
                                <a
                                  href="/brochure-placeholder.pdf"
                                  download
                                  title="تحميل البروفايل PDF"
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-gold-primary/10 border border-white/10 text-text-secondary hover:text-gold-primary transition-all cursor-pointer"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </a>
                                <Link
                                  href={`/properties?project=${project.slug}`}
                                  className="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-bold transition-all text-center"
                                >
                                  استعراض الوحدات
                                </Link>
                                <button
                                  type="button"
                                  onClick={openInquiry}
                                  className="py-1.5 px-3 rounded-lg btn-premium-gold text-[10px] font-bold transition-all"
                                >
                                  تفاصيل
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Empty view indicator if list is empty */}
            {filteredProjects.length === 0 && (
              <motion.div
                key="empty-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-center py-20 bg-bg-navy/20 border border-white/5 rounded-3xl"
              >
                <Building className="w-12 h-12 text-gold-primary/40 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-el-messiri">لم نجد مشاريع مطابقة</h3>
                <p className="text-xs text-text-secondary mb-6 max-w-sm mx-auto leading-relaxed">
                  جرب تعديل خيارات التصفية أو تغيير كلمات البحث للعثور على النتائج المتاحة.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="py-2 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold transition-all"
                >
                  إعادة تعيين كافة الفلاتر
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </main>
  );
}
