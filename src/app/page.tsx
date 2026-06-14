// src/app/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
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
  MessageCircle,
  Bed,
  Bath,
  Ruler
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

// Helper format functions
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(price) + ' ر.س';
};

const formatArea = (area: number) => {
  return `${new Intl.NumberFormat('en-US').format(area)} م²`;
};

const getPropertyImage = (type: Property['type']) => {
  switch (type) {
    case 'villa':
      return '/properties/villa.webp';
    case 'penthouse':
    case 'annex':
    case 'duplex':
      return '/properties/penthouse.webp';
    default:
      return '/properties/apartment.webp';
  }
};

// Component: Featured Property Card
function FeaturedPropertyCard({ property }: { property: Property }) {
  return (
    <div className="group relative w-full bg-bg-navy/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-gold-primary/40 shadow-[0_16px_48px_rgba(0,0,0,0.4)] hover:border-gold-primary/75 transition-all duration-500 mb-12">
      {/* Top golden shimmer line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left side: Image section */}
        <div className="order-1 lg:order-2 lg:col-span-7 relative h-64 sm:h-80 md:h-[400px] lg:h-auto min-h-[260px] lg:min-h-[440px] overflow-hidden bg-bg-deep">
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/75 via-transparent to-transparent z-10"></div>

          {/* Badge: Featured unit & status */}
          <div className="absolute top-6 right-6 z-20 flex flex-wrap gap-2">
            <span className="px-4 py-1.5 text-[10px] font-extrabold text-bg-midnight bg-gold-primary border border-gold-primary rounded-full shadow-lg shadow-gold-primary/25 uppercase">
              عقار مميز جداً
            </span>
            <span className="px-4 py-1.5 text-[10px] font-extrabold text-white bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full">
              {property.status === 'available' ? 'متاح للبيع' : property.status === 'reserved' ? 'محجوز' : 'مباع'}
            </span>
          </div>

          <div className="absolute bottom-6 right-6 z-20">
            <span className="px-3 py-1.5 text-[10px] font-extrabold text-gold-light bg-bg-deep/80 backdrop-blur-md border border-border-gold/20 rounded-md">
              {property.type === 'annex' ? 'ملحق روف' : property.type === 'villa' ? 'فيلا مستقلة' : property.type === 'penthouse' ? 'بنتهاوس' : 'شقة سكنية'}
            </span>
          </div>

          <Image
            src={getPropertyImage(property.type)}
            alt={property.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-[8000ms] ease-luxury group-hover:scale-108"
          />
        </div>

        {/* Right side: Content section */}
        <div className="order-2 lg:order-1 lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between text-right">
          <div>
            {/* Project connection */}
            <div className="flex items-center gap-1.5 mb-3 text-xs font-semibold text-text-muted font-el-messiri">
              <span className="w-2 h-2 rounded-full bg-gold-primary"></span>
              <span>{property.project.name}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-text-primary mb-4 leading-snug font-el-messiri group-hover:text-gold-primary transition-colors duration-300">
              {property.title}
            </h3>

            {/* Address */}
            <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-5">
              <MapPin className="w-4 h-4 text-gold-primary shrink-0" />
              <span>{property.location.district}، {property.location.city}</span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 line-clamp-4">
              {property.description}
            </p>

            {/* Features tags */}
            {property.specs.features && property.specs.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {property.specs.features.slice(0, 4).map((feat, i) => (
                  <span key={i} className="py-1 px-2.5 text-[10px] font-bold bg-white/[0.03] border border-white/10 text-text-muted rounded-md font-el-messiri">
                    {feat}
                  </span>
                ))}
              </div>
            )}

            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 mb-6 text-xs text-text-secondary">
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-[9px] text-text-muted font-el-messiri">الغرف</span>
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4 text-gold-primary" />
                  <span className="font-bold text-text-primary font-mono">{property.specs.bedrooms}</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-x border-white/10">
                <span className="text-[9px] text-text-muted font-el-messiri">الحمامات</span>
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4 text-gold-primary" />
                  <span className="font-bold text-text-primary font-mono">{property.specs.bathrooms}</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-[9px] text-text-muted font-el-messiri">المساحة</span>
                <div className="flex items-center gap-1">
                  <Ruler className="w-4 h-4 text-gold-primary" />
                  <span className="font-bold text-text-primary font-mono">{formatArea(property.specs.area)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Link */}
          <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[9px] text-text-muted uppercase mb-1 font-el-messiri">السعر الإجمالي</p>
              <p className="text-2xl font-extrabold text-gold-primary font-el-messiri">
                {formatPrice(property.pricing.price)}
              </p>
              {property.pricing.monthlyInstallment && (
                <p className="text-[10px] text-text-muted mt-1 font-el-messiri">
                  قسط شهري متوقع: <strong className="text-white font-mono">{new Intl.NumberFormat('en-US').format(property.pricing.monthlyInstallment)} ر.س</strong>
                </p>
              )}
            </div>

            <Link
              href={`/property/${property.slug}`}
              className="py-3 px-8 text-xs font-extrabold btn-premium-gold flex items-center gap-2 group/btn cursor-pointer font-el-messiri"
            >
              <span>عرض كامل التفاصيل</span>
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component: Simplified Property Card (Inside Carousel)
function SimplifiedPropertyCard({ property }: { property: Property }) {
  return (
    <div className="group relative flex flex-col h-full bg-bg-navy/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-border-gold/30 hover:bg-bg-navy/60 hover:-translate-y-1 w-[180px] sm:w-[220px] md:w-[290px] shrink-0">
      {/* Golden top highlight */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-deep">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/50 to-transparent z-10"></div>
        <Image
          src={getPropertyImage(property.type)}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 150px, 250px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 z-20">
          <span className="px-2 py-0.5 text-[8px] sm:text-[9px] font-extrabold text-white bg-gold-primary/90 rounded font-el-messiri">
            {property.type === 'annex' ? 'ملحق' : property.type === 'villa' ? 'فيلا' : property.type === 'penthouse' ? 'روف' : 'شقة'}
          </span>
        </div>
      </div>

      {/* Body info */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1 text-right">
        {/* Title */}
        <h4 className="text-xs sm:text-sm font-extrabold text-text-primary line-clamp-1 mb-1 sm:mb-2 group-hover:text-gold-light transition-colors duration-300 font-el-messiri">
          {property.title}
        </h4>

        {/* Location */}
        <div className="flex items-center gap-1 text-[10px] text-text-muted mb-2 sm:mb-3 font-el-messiri">
          <MapPin className="w-3 h-3 text-gold-primary shrink-0" />
          <span className="line-clamp-1">{property.location.district}</span>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-2 text-[10px] text-text-secondary border-t border-white/5 pt-2 mb-3 sm:mb-4 font-el-messiri">
          <span className="font-semibold">{property.specs.bedrooms} غرف</span>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <span className="font-mono">{formatArea(property.specs.area)}</span>
        </div>

        {/* Bottom price and details link */}
        <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between gap-2">
          <div>
            <p className="text-[8px] text-text-muted font-el-messiri">السعر</p>
            <p className="text-xs sm:text-sm font-extrabold text-gold-primary font-el-messiri">
              {formatPrice(property.pricing.price)}
            </p>
          </div>

          <Link
            href={`/property/${property.slug}`}
            className="py-1.5 px-4 text-[10px] font-extrabold btn-premium-gold flex items-center gap-1 cursor-pointer font-el-messiri"
          >
            <span>عرض</span>
            <ArrowLeft className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// Component: Featured Project Card
function FeaturedProjectCard({ project, onExplore }: { project: Project; onExplore: (city: string) => void }) {
  return (
    <div className="group relative w-full bg-bg-navy/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-gold-primary/40 shadow-[0_16px_48px_rgba(0,0,0,0.4)] hover:border-gold-primary/75 transition-all duration-500 mb-12">
      {/* Top golden shimmer line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left side: Image section */}
        <div className="order-1 lg:order-2 lg:col-span-7 relative h-64 sm:h-80 md:h-[400px] lg:h-auto min-h-[260px] lg:min-h-[440px] overflow-hidden bg-bg-deep">
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/75 via-transparent to-transparent z-10"></div>

          {/* Badge: Status */}
          <div className="absolute top-6 right-6 z-20 flex flex-wrap gap-2">
            <span className="px-4 py-1.5 text-[10px] font-extrabold text-bg-midnight bg-gold-primary border border-gold-primary rounded-full shadow-lg shadow-gold-primary/25 uppercase">
              مشروع مميز
            </span>
            <span className="px-4 py-1.5 text-[10px] font-extrabold text-white bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full">
              {project.status === 'completed' ? 'مشروع مكتمل' : project.status === 'under_construction' ? 'تحت الإنشاء' : 'قريباً'}
            </span>
          </div>

          <Image
            src={project.media.hero || "/projects/amal-stars-showcase.webp"}
            alt={project.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-[8000ms] ease-luxury group-hover:scale-108"
          />
        </div>

        {/* Right side: Content section */}
        <div className="order-2 lg:order-1 lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between text-right">
          <div>
            {/* Tagline */}
            <div className="flex items-center gap-1.5 mb-3 text-xs font-semibold text-gold-primary font-el-messiri">
              <span className="w-2 h-2 rounded-full bg-gold-primary"></span>
              <span>{project.tagline}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-text-primary mb-4 leading-snug font-el-messiri group-hover:text-gold-primary transition-colors duration-300">
              {project.name}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-5">
              <MapPin className="w-4 h-4 text-gold-primary shrink-0" />
              <span>{project.location.district}، {project.location.city}</span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 line-clamp-4">
              {project.description}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-6 text-xs text-text-secondary">
              <div>
                <span className="block text-text-muted mb-1.5 text-[9px] uppercase tracking-wider">تاريخ التسليم</span>
                <span className="font-bold text-text-primary text-xs sm:text-sm">{project.specs.completionDate}</span>
              </div>
              <div>
                <span className="block text-text-muted mb-1.5 text-[9px] uppercase tracking-wider">إجمالي الوحدات</span>
                <span className="font-bold text-text-primary font-mono text-xs sm:text-sm">{project.specs.totalUnits} وحدة</span>
              </div>
              <div>
                <span className="block text-text-muted mb-1.5 text-[9px] uppercase tracking-wider">نطاق الأسعار</span>
                <span className="font-bold text-gold-primary font-mono text-xs sm:text-sm">تبدأ من {formatPrice(project.priceRange.min)}</span>
              </div>
              <div>
                <span className="block text-text-muted mb-1.5 text-[9px] uppercase tracking-wider">الوحدات المتاحة</span>
                <span className="font-bold text-status-available font-mono text-xs sm:text-sm">{project.specs.availableUnits} وحدة</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={`/brochure-${project.slug}.pdf`}
              download
              className="py-3.5 px-6 text-[10px] sm:text-xs font-extrabold btn-premium-gold flex items-center gap-2 cursor-pointer font-el-messiri flex-1 justify-center"
            >
              <Download className="w-4 h-4" />
              <span>تحميل البروفايل (PDF)</span>
            </a>
            <button
              type="button"
              onClick={() => onExplore(project.location.city)}
              className="py-3.5 px-6 text-[10px] sm:text-xs font-extrabold btn-premium-glass flex items-center gap-2 cursor-pointer font-el-messiri flex-1 justify-center"
            >
              <span>استعرض المشروع</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component: Simplified Project Card (Inside Carousel)
function SimplifiedProjectCard({ project, onExplore }: { project: Project; onExplore: (city: string) => void }) {
  return (
    <div className="group relative flex flex-col h-full bg-bg-navy/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-border-gold/30 hover:bg-bg-navy/60 hover:-translate-y-1 w-[180px] sm:w-[220px] md:w-[290px] shrink-0">
      {/* Golden top highlight */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-deep">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/50 to-transparent z-10"></div>
        <Image
          src={project.media.hero || "/projects/amal-stars-showcase.webp"}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 150px, 250px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 z-20">
          <span className="px-2 py-0.5 text-[8px] sm:text-[9px] font-extrabold text-white bg-gold-primary/90 rounded font-el-messiri">
            {project.status === 'completed' ? 'مكتمل' : project.status === 'under_construction' ? 'تحت الإنشاء' : 'قريباً'}
          </span>
        </div>
      </div>

      {/* Body info */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1 text-right">
        {/* Title */}
        <h4 className="text-xs sm:text-sm font-extrabold text-text-primary line-clamp-1 mb-1 sm:mb-2 group-hover:text-gold-light transition-colors duration-300 font-el-messiri">
          {project.name}
        </h4>

        {/* Location */}
        <div className="flex items-center gap-1 text-[10px] text-text-muted mb-2 sm:mb-3 font-el-messiri">
          <MapPin className="w-3 h-3 text-gold-primary shrink-0" />
          <span className="line-clamp-1">{project.location.district}، {project.location.city}</span>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-2 text-[10px] text-text-secondary border-t border-white/5 pt-2 mb-3 sm:mb-4 font-el-messiri">
          <span className="font-semibold">{project.specs.totalUnits} وحدة</span>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <span className="font-mono">{project.specs.completionDate}</span>
        </div>

        {/* Bottom price and details link */}
        <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between gap-2">
          <div>
            <p className="text-[8px] text-text-muted font-el-messiri">يبدأ من</p>
            <p className="text-xs sm:text-sm font-extrabold text-gold-primary font-el-messiri font-mono">
              {formatPrice(project.priceRange.min)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onExplore(project.location.city)}
            className="py-1.5 px-4 text-[10px] font-extrabold btn-premium-gold flex items-center gap-1 cursor-pointer font-el-messiri shrink-0"
          >
            <span>استعرض</span>
            <ArrowLeft className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

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

  // Interval timer for slide index transitions
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 6000); // 6 seconds slide interval for smooth luxury transition
    return () => clearInterval(timer);
  }, []);

  // Smooth zoom transition triggers on every index change
  React.useEffect(() => {
    setAnimateZoom(false);
    const zoomTimeout = setTimeout(() => {
      setAnimateZoom(true);
    }, 100);
    return () => clearTimeout(zoomTimeout);
  }, [currentHeroIndex]);

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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [isFiltersOpenComplete, setIsFiltersOpenComplete] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);




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

      const queryNormalized = searchQuery.trim().toLowerCase();
      const textMatch = queryNormalized === '' ||
        property.title.toLowerCase().includes(queryNormalized) ||
        property.location.district.toLowerCase().includes(queryNormalized) ||
        property.location.city.toLowerCase().includes(queryNormalized) ||
        property.project.name.toLowerCase().includes(queryNormalized);

      return cityMatch && typeMatch && roomsMatch && priceMatch && textMatch;
    });
  }, [selectedCity, selectedType, selectedRooms, maxPrice, searchQuery]);

  // Find a featured apartment first, then fallback to any featured property, then to the first matching property.
  const featuredProperty = useMemo(() => {
    if (filteredProperties.length === 0) return null;
    const featuredApartment = filteredProperties.find(p => p.featured && p.type === 'apartment');
    if (featuredApartment) return featuredApartment;
    const anyFeatured = filteredProperties.find(p => p.featured);
    if (anyFeatured) return anyFeatured;
    return filteredProperties[0];
  }, [filteredProperties]);

  // Exclude featuredProperty from the remaining properties list for the carousel
  const carouselProperties = useMemo(() => {
    if (!featuredProperty) return [];
    return filteredProperties.filter(p => p.id !== featuredProperty.id);
  }, [filteredProperties, featuredProperty]);

  // Helper to repeat items in the marquee so the continuous animation scrolls seamlessly without gaps
  const getMarqueeItems = (items: Property[]) => {
    if (items.length === 0) return [];
    let repeated = [...items];
    while (repeated.length < 16) {
      repeated = [...repeated, ...items];
    }
    return [...repeated, ...repeated];
  };

  // Projects configuration
  const featuredProject = useMemo(() => {
    return PROJECTS.find(p => p.featured) || PROJECTS[0];
  }, []);

  const carouselProjects = useMemo(() => {
    return PROJECTS.filter(p => p.id !== featuredProject.id);
  }, [featuredProject]);

  const getProjectMarqueeItems = (items: Project[]) => {
    if (items.length === 0) return [];
    let repeated = [...items];
    while (repeated.length < 16) {
      repeated = [...repeated, ...items];
    }
    return [...repeated, ...repeated];
  };

  const handleExploreProjectCity = (city: string) => {
    setSelectedCity(city);
    setSelectedType('all');
    setSelectedRooms('all');
    setMaxPrice('all');
    setSearchQuery('');
    const listingsSection = document.getElementById('listings-section');
    listingsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-bg-midnight text-text-primary overflow-x-hidden font-el-messiri" dir="rtl">

      {/* ----------------------------------------------------
         1. Fixed Glassmorphic Navigation Header (Navbar)
         ---------------------------------------------------- */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-45 bg-white/10 backdrop-blur-xl border border-border-gold/30 rounded-[2rem] sm:rounded-full transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-border-gold/50">
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
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <Link href="/" className="text-white border-b-2 border-gold-primary pb-1">الرئيسية</Link>
            <Link href="/properties" className="text-text-secondary hover:text-white transition-colors duration-200">العقارات</Link>
            <Link href="/projects" className="text-text-secondary hover:text-white transition-colors duration-200">مشاريعنا</Link>
            <Link href="/about" className="text-text-secondary hover:text-white transition-colors duration-200">من نحن</Link>
            <Link href="/contact" className="text-text-secondary hover:text-white transition-colors duration-200">التواصل</Link>
          </nav>

          {/* CTA Button & Mobile Trigger (Left side in RTL) */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              className="py-1.5 px-3 sm:py-2.5 sm:px-5 text-[10px] sm:text-xs font-bold btn-premium-gold shrink-0 font-el-messiri"
              onClick={() => setShowInquiryModal(true)}
            >
              <span>احجز جولتك <span className="hidden sm:inline">الخاصة</span></span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-border-gold/20 text-text-secondary hover:text-white transition-colors cursor-pointer shrink-0"
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 w-full mt-2.5 md:hidden z-40 overflow-hidden"
            >
              <div className="p-5 bg-bg-navy/95 backdrop-blur-2xl border border-border-gold/25 rounded-3xl shadow-2xl flex flex-col gap-3">
                <Link 
                  href="/" 
                  onClick={() => setShowMobileMenu(false)}
                  className="px-4 py-3 text-xs sm:text-sm text-white font-bold bg-white/5 rounded-xl border border-border-gold/15 flex items-center justify-between"
                >
                  <span>الرئيسية</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-primary"></span>
                </Link>
                <Link 
                  href="/properties" 
                  onClick={() => setShowMobileMenu(false)}
                  className="px-4 py-3 text-xs sm:text-sm text-text-secondary hover:text-white transition-colors duration-200 border-b border-white/5"
                >
                  العقارات
                </Link>
                <Link 
                  href="/projects" 
                  onClick={() => setShowMobileMenu(false)}
                  className="px-4 py-3 text-xs sm:text-sm text-text-secondary hover:text-white transition-colors duration-200 border-b border-white/5"
                >
                  مشاريعنا
                </Link>
                <Link 
                  href="/about" 
                  onClick={() => setShowMobileMenu(false)}
                  className="px-4 py-3 text-xs sm:text-sm text-text-secondary hover:text-white transition-colors duration-200 border-b border-white/5"
                >
                  من نحن
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setShowMobileMenu(false)}
                  className="px-4 py-3 text-xs sm:text-sm text-text-secondary hover:text-white transition-colors duration-200"
                >
                  التواصل
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ----------------------------------------------------
         2. Hero Section (FullScreen Visual - Clean & Premium)
         ---------------------------------------------------- */}
      <section className="relative h-[100vh] w-full flex items-center justify-center bg-bg-deep overflow-hidden">
        {/* Dark luxury fallback background & overlay structure */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-deep/15 via-bg-midnight/70 to-bg-midnight/90 z-0"></div>

        {/* Slideshow background images */}
        {HERO_IMAGES.map((imgSrc, index) => (
          <div
            key={imgSrc}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out z-0 ${index === currentHeroIndex ? 'opacity-75' : 'opacity-0'}`}
          >
            <Image
              src={imgSrc}
              alt={`خلفية الهيكل الفخم ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover transition-transform duration-[6500ms] ease-luxury ${index === currentHeroIndex && animateZoom ? 'scale-[1.08]' : 'scale-100'
                }`}
            />
          </div>
        ))}
        {/* Bottom gradient overlay for premium depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-midnight/80 via-transparent to-transparent z-10"></div>

        {/* Hero Content - Ultra Premium Title Only */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.25 } }
          }}
          className="relative max-w-5xl w-[90%] mx-auto text-center z-20 flex flex-col items-center justify-center"
        >
          <motion.h1
            variants={fadeUpVariants}
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="font-el-messiri leading-[1.5] drop-shadow-[0_6px_30px_rgba(0,0,0,0.6)] cursor-default select-none group"
          >
            <span className="block text-[#F5E6C8] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-3 sm:mb-6 [text-shadow:0_2px_20px_rgba(245,230,200,0.25)] transition-all duration-500 group-hover:text-white group-hover:[text-shadow:0_2px_35px_rgba(245,230,200,0.6)]">نعتمد أحدث التقنيات</span>
            <span className="block text-white text-sm sm:text-lg md:text-xl lg:text-3xl xl:text-4xl font-semibold sm:whitespace-nowrap [text-shadow:0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:text-gold-light group-hover:[text-shadow:0_4px_25px_rgba(201,169,110,0.4)]">لنربطكم بأفضل الفرص السكنية والاستثمارية</span>
          </motion.h1>
        </motion.div>
      </section>

      {/* ----------------------------------------------------
         3. Advanced Search Bar Component
         ---------------------------------------------------- */}
      <section id="search-filter-section" className="relative z-40 w-[92%] max-w-6xl mx-auto px-4 -mt-[calc(6rem+10vh)] sm:-mt-36">
        <form
          onSubmit={handleSearch}
          className="relative w-full"
        >
          {/* Permanent, static glassmorphic search bar */}
          <div className="p-2.5 sm:p-3.5 bg-white/10 backdrop-blur-xl border border-border-gold/30 rounded-3xl sm:rounded-full shadow-[0_24px_60px_rgba(0,0,0,0.65)] hover:border-border-gold/50 relative z-50 transition-all duration-300">
            <div className="w-full bg-bg-royal/30 border border-border-gold/20 rounded-2xl sm:rounded-full p-2 flex items-center justify-between gap-2 shadow-inner">
              {/* Search Input */}
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search className="w-4 h-4 sm:w-5 h-5 text-gold-primary shrink-0" />
                <input
                  type="text"
                  placeholder="ابحث بالحي، اسم المشروع، أو المعالم..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder-white/35 font-sans text-right"
                />
              </div>

              {/* Reset Query button if text present */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-white/40 hover:text-white shrink-0 p-1.5 cursor-pointer transition-colors duration-200"
                  title="مسح البحث"
                  aria-label="مسح حقل البحث"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Search Submit Button next to filters icon */}
              <button
                type="submit"
                className="py-2 px-5 sm:py-2.5 sm:px-6 text-xs sm:text-sm font-extrabold btn-premium-gold shrink-0 flex items-center gap-1.5 cursor-pointer font-el-messiri"
              >
                <Search className="w-3.5 h-3.5 sm:w-4 h-4" />
                <span>بحث</span>
              </button>

              {/* Advanced Filter Toggle Trigger Button */}
              <button
                type="button"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer shrink-0 ${
                  showMobileFilters
                    ? 'bg-gold-primary text-bg-midnight border-gold-primary shadow-lg shadow-gold-primary/20 scale-95'
                    : 'bg-white/[0.04] text-text-secondary border-border-gold/20 hover:border-gold-primary/40 hover:text-white'
                }`}
                title="تصفية متقدمة"
                aria-label="تصفية متقدمة"
              >
                <svg className="w-4 h-4 sm:w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
              </button>
            </div>
          </div>

          {/* Collapsible Advanced Filters Card - Pushes content down */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onAnimationStart={() => setIsFiltersOpenComplete(false)}
                onAnimationComplete={() => {
                  if (showMobileFilters) setIsFiltersOpenComplete(true);
                }}
                className={`w-full mt-4 relative z-40 ${
                  isFiltersOpenComplete ? 'overflow-visible' : 'overflow-hidden'
                }`}
              >
                <div className="p-5 sm:p-7 bg-bg-navy/95 backdrop-blur-2xl border border-border-gold/25 rounded-3xl shadow-2xl flex flex-col gap-4">
                  {/* Grid of inputs - exactly matching the old layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    {/* Filter 1: City */}
                    <div className="space-y-1.5">
                      <label htmlFor="filter-city" className="block text-xs font-bold text-text-muted mb-2 flex items-center gap-1 font-el-messiri">
                        <MapPin className="w-3.5 h-3.5 text-gold-primary" /> المدينة
                      </label>
                      <CustomSelect
                        id="filter-city"
                        title="تصفية بالمدينة"
                        options={CITY_OPTIONS}
                        value={selectedCity}
                        onChange={setSelectedCity}
                      />
                    </div>

                    {/* Filter 2: Type */}
                    <div className="space-y-1.5">
                      <label htmlFor="filter-type" className="block text-xs font-bold text-text-muted mb-2 flex items-center gap-1 font-el-messiri">
                        <Building className="w-3.5 h-3.5 text-gold-primary" /> نوع العقار
                      </label>
                      <CustomSelect
                        id="filter-type"
                        title="تصفية بنوع العقار"
                        options={TYPE_OPTIONS}
                        value={selectedType}
                        onChange={setSelectedType}
                      />
                    </div>

                    {/* Filter 3: Rooms */}
                    <div className="space-y-1.5">
                      <label htmlFor="filter-rooms" className="block text-xs font-bold text-text-muted mb-2 flex items-center gap-1 font-el-messiri">
                        <Layers className="w-3.5 h-3.5 text-gold-primary" /> عدد الغرف
                      </label>
                      <CustomSelect
                        id="filter-rooms"
                        title="تصفية بعدد الغرف"
                        options={ROOMS_OPTIONS}
                        value={selectedRooms}
                        onChange={setSelectedRooms}
                      />
                    </div>

                    {/* Filter 4: Max Price */}
                    <div className="space-y-1.5">
                      <label htmlFor="filter-price" className="block text-xs font-bold text-text-muted mb-2 flex items-center gap-1 font-el-messiri">
                        <DollarSign className="w-3.5 h-3.5 text-gold-primary" /> السعر الأقصى
                      </label>
                      <CustomSelect
                        id="filter-price"
                        title="تصفية بالحد الأقصى للسعر"
                        options={PRICE_OPTIONS}
                        value={maxPrice}
                        onChange={setMaxPrice}
                      />
                    </div>

                    {/* Search CTA Button inside the old layout */}
                    <div>
                      <button
                        type="submit"
                        className="w-full text-xs sm:text-sm py-3.5 px-4 btn-premium-gold flex items-center justify-center gap-2 cursor-pointer font-el-messiri"
                      >
                        <Search className="w-4 h-4" />
                        <span>البحث وتطبيق الفلاتر</span>
                      </button>
                    </div>
                  </div>

                  {/* Reset filters action link below if any active */}
                  {(selectedCity !== 'all' || selectedType !== 'all' || selectedRooms !== 'all' || maxPrice !== 'all') && (
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCity('all');
                          setSelectedType('all');
                          setSelectedRooms('all');
                          setMaxPrice('all');
                        }}
                        className="text-xs text-text-muted hover:text-white transition-colors duration-200 underline cursor-pointer font-el-messiri"
                      >
                        إعادة تعيين الفلاتر
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </section>

      {/* ----------------------------------------------------
         4. Cities Quick Grid - Premium Destinations
         ---------------------------------------------------- */}
      <div className="w-full bg-gradient-to-b from-bg-deep via-bg-navy to-bg-deep border-t border-border-gold/15 pt-[calc(6rem+5vh)] pb-24 md:py-24">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } }
            }}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUpVariants} className="block text-xs font-semibold text-gold-primary uppercase mb-2 tracking-wider">وجهاتنا الرئيسية</motion.span>
            <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-text-primary mb-3 liquid-gold-heading">اختر وجهتك المفضلة في المملكة</motion.h2>
            <motion.p variants={fadeUpVariants} className="text-sm text-text-secondary max-w-xl mx-auto">نساعدك على امتلاك منزل أحلامك في أرقى أحياء المدن الرئيسية</motion.p>
          </motion.div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
            {/* City 1: Jeddah */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className={`group relative h-32 sm:h-52 md:h-72 rounded-2xl overflow-hidden border cursor-pointer transition-all duration-500 ${selectedCity === 'جدة'
                ? 'ring-2 ring-gold-primary/70 border-gold-primary scale-[1.02] shadow-[0_0_20px_rgba(201,169,110,0.3)] z-20'
                : (selectedCity !== 'all' ? 'opacity-35 scale-95 border-border-gold/10' : 'border-border-gold/20 hover:border-gold-primary/50')
                }`}
              onClick={() => setSelectedCity(selectedCity === 'جدة' ? 'all' : 'جدة')}
            >
              {/* Top-end Selection Badge Indicator (Left side in RTL) */}
              {selectedCity === 'جدة' && (
                <span className="absolute top-2 sm:top-3 end-2 sm:end-3 z-30 bg-gold-primary text-bg-midnight p-0.5 sm:p-1 rounded-full shadow-lg border border-gold-light/20 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-bg-midnight stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}

              {/* Golden luxury overlay on selected state */}
              <div className={`absolute inset-0 bg-gold-primary/5 transition-opacity duration-500 z-15 ${selectedCity === 'جدة' ? 'opacity-100' : 'opacity-0'}`}></div>

              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-bg-deep/20 to-transparent z-10"></div>
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <Image
                  src="/cities/jeddah.webp"
                  alt="واجهة مدينة جدة"
                  fill
                  sizes="(max-width: 768px) 33vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/20 to-bg-deep/40"></div>
              </div>
              <div className="absolute bottom-3 start-3 sm:bottom-6 sm:start-6 z-20 text-right">
                <h3 className="text-xs sm:text-base md:text-xl font-extrabold text-white mb-0.5 font-el-messiri">جدة</h3>
                <p className="text-[7px] sm:text-[9px] md:text-[10px] text-gold-light font-semibold uppercase tracking-wider">عروس البحر الأحمر</p>
                <p className="text-[8px] sm:text-[10px] md:text-[11px] text-white/60 font-bold mt-0.5 sm:mt-2 font-mono">
                  {PROPERTIES.filter(p => p.location.city === 'جدة').length} عقار متاح
                </p>
              </div>
            </motion.div>

            {/* City 2: Riyadh */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`group relative h-32 sm:h-52 md:h-72 rounded-2xl overflow-hidden border cursor-pointer transition-all duration-500 ${selectedCity === 'الرياض'
                ? 'ring-2 ring-gold-primary/70 border-gold-primary scale-[1.02] shadow-[0_0_20px_rgba(201,169,110,0.3)] z-20'
                : (selectedCity !== 'all' ? 'opacity-35 scale-95 border-border-gold/10' : 'border-border-gold/20 hover:border-gold-primary/50')
                }`}
              onClick={() => setSelectedCity(selectedCity === 'الرياض' ? 'all' : 'الرياض')}
            >
              {/* Top-end Selection Badge Indicator (Left side in RTL) */}
              {selectedCity === 'الرياض' && (
                <span className="absolute top-2 sm:top-3 end-2 sm:end-3 z-30 bg-gold-primary text-bg-midnight p-0.5 sm:p-1 rounded-full shadow-lg border border-gold-light/20 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-bg-midnight stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}

              {/* Golden luxury overlay on selected state */}
              <div className={`absolute inset-0 bg-gold-primary/5 transition-opacity duration-500 z-15 ${selectedCity === 'الرياض' ? 'opacity-100' : 'opacity-0'}`}></div>

              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/95 via-bg-deep/20 to-transparent z-10"></div>
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <Image
                  src="/cities/riyadh.webp"
                  alt="أبراض مدينة الرياض"
                  fill
                  sizes="(max-width: 768px) 33vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/20 to-bg-deep/40"></div>
              </div>
              <div className="absolute bottom-3 start-3 sm:bottom-6 sm:start-6 z-20 text-right">
                <h3 className="text-xs sm:text-base md:text-xl font-extrabold text-white mb-0.5 font-el-messiri">الرياض</h3>
                <p className="text-[7px] sm:text-[9px] md:text-[10px] text-gold-light font-semibold uppercase tracking-wider">عاصمة الحداثة والفرص</p>
                <p className="text-[8px] sm:text-[10px] md:text-[11px] text-white/60 font-bold mt-0.5 sm:mt-2 font-mono">
                  {PROPERTIES.filter(p => p.location.city === 'الرياض').length} عقار متاح
                </p>
              </div>
            </motion.div>

            {/* City 3: Makkah */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`group relative h-32 sm:h-52 md:h-72 rounded-2xl overflow-hidden border cursor-pointer transition-all duration-500 ${selectedCity === 'مكه'
                ? 'ring-2 ring-gold-primary/70 border-gold-primary scale-[1.02] shadow-[0_0_20px_rgba(201,169,110,0.3)] z-20'
                : (selectedCity !== 'all' ? 'opacity-35 scale-95 border-border-gold/10' : 'border-border-gold/20 hover:border-gold-primary/50')
                }`}
              onClick={() => setSelectedCity(selectedCity === 'مكه' ? 'all' : 'مكه')}
            >
              {/* Top-end Selection Badge Indicator (Left side in RTL) */}
              {selectedCity === 'مكه' && (
                <span className="absolute top-2 sm:top-3 end-2 sm:end-3 z-30 bg-gold-primary text-bg-midnight p-0.5 sm:p-1 rounded-full shadow-lg border border-gold-light/20 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-bg-midnight stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}

              {/* Golden luxury overlay on selected state */}
              <div className={`absolute inset-0 bg-gold-primary/5 transition-opacity duration-500 z-15 ${selectedCity === 'مكه' ? 'opacity-100' : 'opacity-0'}`}></div>

              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/95 via-bg-deep/20 to-transparent z-10"></div>
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <Image
                  src="/cities/makkah.webp"
                  alt="المسجد الحرام بمكة المكرمة"
                  fill
                  sizes="(max-width: 768px) 33vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/20 to-bg-deep/40"></div>
              </div>
              <div className="absolute bottom-3 start-3 sm:bottom-6 sm:start-6 z-20 text-right">
                <h3 className="text-xs sm:text-base md:text-xl font-extrabold text-white mb-0.5 font-el-messiri">مكة المكرمة</h3>
                <p className="text-[7px] sm:text-[9px] md:text-[10px] text-gold-light font-semibold uppercase tracking-wider">قبلة العالم وبوابة الإيمان</p>
                <p className="text-[8px] sm:text-[10px] md:text-[11px] text-white/60 font-bold mt-0.5 sm:mt-2 font-mono">
                  {PROPERTIES.filter(p => p.location.city === 'مكه').length} عقار متاح
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* ----------------------------------------------------
         5 & 6. Listings Section - Full Width & Light Background
         ---------------------------------------------------- */}
      <div className="w-full bg-gradient-to-b from-bg-deep via-bg-navy to-bg-deep border-b border-border-gold/15 pb-16">

        {/* 5. Categories Tab Selection */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className={`py-3 px-6 rounded-full text-xs font-bold transition-all duration-300 border cursor-pointer hover:scale-[1.03] active:scale-[0.97] ${selectedType === 'all'
                ? 'bg-gold-primary text-bg-midnight border-gold-primary font-extrabold shadow-lg shadow-gold-primary/10'
                : 'bg-bg-royal/40 hover:bg-bg-royal/70 text-text-secondary border-border-gold/20 hover:border-gold-primary hover:text-white'
                }`}
              onClick={() => setSelectedType('all')}
            >
              الكل
            </button>
            <button
              type="button"
              className={`py-3 px-6 rounded-full text-xs font-bold transition-all duration-300 border cursor-pointer hover:scale-[1.03] active:scale-[0.97] ${selectedType === 'flat'
                ? 'bg-gold-primary text-bg-midnight border-gold-primary font-extrabold shadow-lg shadow-gold-primary/10'
                : 'bg-bg-royal/40 hover:bg-bg-royal/70 text-text-secondary border-border-gold/20 hover:border-gold-primary hover:text-white'
                }`}
              onClick={() => setSelectedType('flat')}
            >
              شقق سكينة
            </button>
            <button
              type="button"
              className={`py-3 px-6 rounded-full text-xs font-bold transition-all duration-300 border cursor-pointer hover:scale-[1.03] active:scale-[0.97] ${selectedType === 'villa'
                ? 'bg-gold-primary text-bg-midnight border-gold-primary font-extrabold shadow-lg shadow-gold-primary/10'
                : 'bg-bg-royal/40 hover:bg-bg-royal/70 text-text-secondary border-border-gold/20 hover:border-gold-primary hover:text-white'
                }`}
              onClick={() => setSelectedType('villa')}
            >
              فلل فخمة
            </button>
            <button
              type="button"
              className={`py-3 px-6 rounded-full text-xs font-bold transition-all duration-300 border cursor-pointer hover:scale-[1.03] active:scale-[0.97] ${selectedType === 'roof'
                ? 'bg-gold-primary text-bg-midnight border-gold-primary font-extrabold shadow-lg shadow-gold-primary/10'
                : 'bg-bg-royal/40 hover:bg-bg-royal/70 text-text-secondary border-border-gold/20 hover:border-gold-primary hover:text-white'
                }`}
              onClick={() => setSelectedType('roof')}
            >
              أروف / بنتهاوس
            </button>
            <button
              type="button"
              className={`py-3 px-6 rounded-full text-xs font-bold transition-all duration-300 border cursor-pointer hover:scale-[1.03] active:scale-[0.97] ${selectedType === 'investment'
                ? 'bg-gold-primary text-bg-midnight border-gold-primary font-extrabold shadow-lg shadow-gold-primary/10'
                : 'bg-bg-royal/40 hover:bg-bg-royal/70 text-text-secondary border-border-gold/20 hover:border-gold-primary hover:text-white'
                }`}
              onClick={() => setSelectedType('investment')}
            >
              عروض الاستثمار
            </button>
          </div>
        </section>

        {/* 6. Latest Offers Listings Section */}
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
              <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-text-primary mt-1 liquid-gold-heading font-el-messiri">تصفح آخر العروض والفرص الحالية</motion.h2>
            </div>
            <motion.div
              variants={fadeUpVariants}
              className="flex items-center gap-2 text-xs text-text-muted"
            >
              <button
                type="button"
                onClick={() => {
                  const filterSection = document.getElementById('search-filter-section');
                  filterSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setShowMobileFilters(true);
                }}
                className="flex items-center justify-center p-1.5 rounded-lg bg-bg-royal/30 text-gold-primary border border-border-gold/15 hover:border-gold-primary hover:bg-gold-primary/10 transition-all duration-300 cursor-pointer shrink-0"
                title="تصفية العقارات"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
              </button>
              <span>
                تم العثور على <strong className="text-gold-primary font-mono">{filteredProperties.length}</strong> وحدة مطروحة
              </span>
            </motion.div>
          </motion.div>

          {filteredProperties.length > 0 ? (
            <div className="space-y-12">
              {/* Featured Property Card (Static) */}
              {featuredProperty && (
                <FeaturedPropertyCard property={featuredProperty} />
              )}

              {/* Carousel of Simplified Property Cards */}
              {carouselProperties.length > 0 && (
                <div className="w-full relative overflow-hidden py-4 select-none" dir="ltr">
                  <div className="flex flex-row flex-nowrap gap-4 sm:gap-6 w-max animate-marquee-ltr hover:[animation-play-state:paused] cursor-pointer">
                    {getMarqueeItems(carouselProperties).map((property, idx) => (
                      <div key={`${property.id}-marquee-${idx}`} dir="rtl">
                        <SimplifiedPropertyCard property={property} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* View All Properties Golden CTA Button */}
              <div className="text-center mt-6">
                <Link
                  href="/properties"
                  className="py-3.5 px-10 text-xs sm:text-sm font-extrabold btn-premium-gold inline-flex items-center gap-2 cursor-pointer font-el-messiri"
                >
                  <span>عرض جميع الوحدات العقارية</span>
                  <ArrowLeft className="w-4 h-4 transition-transform duration-300 -translate-x-0.5 group-hover:-translate-x-1.5" />
                </Link>
              </div>
            </div>
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
      <section className="relative w-full md:h-[70vh] min-h-[600px] overflow-hidden py-16 md:py-0 bg-bg-deep flex items-center">
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
      <section id="projects-section" className="bg-gradient-to-b from-bg-deep via-bg-navy to-bg-deep border-y border-border-gold/15 py-24">
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

          {/* Featured Project Card (Static) */}
          {featuredProject && (
            <FeaturedProjectCard project={featuredProject} onExplore={handleExploreProjectCity} />
          )}

          {/* Carousel of Simplified Project Cards */}
          {carouselProjects.length > 0 && (
            <div className="w-full relative overflow-hidden py-4 select-none" dir="ltr">
              <div className="flex flex-row flex-nowrap gap-4 sm:gap-6 w-max animate-marquee-ltr hover:[animation-play-state:paused] cursor-pointer">
                {getProjectMarqueeItems(carouselProjects).map((project, idx) => (
                  <div key={`${project.id}-marquee-${idx}`} dir="rtl">
                    <SimplifiedProjectCard project={project} onExplore={handleExploreProjectCity} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* View All Projects Golden CTA Button */}
          <div className="text-center mt-6">
            <Link
              href="/projects"
              className="py-3.5 px-10 text-xs sm:text-sm font-extrabold btn-premium-gold inline-flex items-center gap-2 cursor-pointer font-el-messiri"
            >
              <span>عرض جميع المشاريع العقارية</span>
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 -translate-x-0.5 group-hover:-translate-x-1.5" />
            </Link>
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
      <section id="contact-section" className="relative w-full overflow-hidden py-24 bg-gradient-to-b from-bg-deep via-bg-navy to-bg-deep border-y border-border-gold/15 z-10">
        {/* Ambient Radial Gold/Blue Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gold-primary/10 via-brand-primary/10 to-gold-primary/10 rounded-full blur-3xl z-0 pointer-events-none opacity-80 animate-pulse duration-[8000ms]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">

          {/* Centered Header */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <div className="h-[2px] w-12 bg-gold-primary"></div>
              <span className="text-sm font-extrabold text-gold-primary font-el-messiri uppercase tracking-wider">اتصل بنا</span>
              <div className="h-[2px] w-12 bg-gold-primary"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight font-el-messiri">أبق على اتصال</h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xl mx-auto font-el-messiri">
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
            <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-[#060D1A] liquid-gold-heading leading-tight font-el-messiri">لماذا يختار العملاء شركة الغربية الذهبية؟</motion.h2>
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
            <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-text-primary liquid-gold-heading leading-tight font-el-messiri">
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
            <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-[#060D1A] liquid-gold-heading leading-tight font-el-messiri">نعتز بثقتهم لبناء مستقبل واعد</motion.h2>

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

          {/* Centered Partners Marquee Container - Displays logos in an infinite horizontal loop */}
          <div className="w-full max-w-[1200px] mx-auto relative overflow-hidden py-4 select-none" dir="ltr">
            {/* Left Elegant Fade Overlay */}
            <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-28 md:w-36 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent pointer-events-none z-20"></div>

            {/* Right Elegant Fade Overlay */}
            <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-28 md:w-36 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent pointer-events-none z-20"></div>

            <div className="flex flex-row flex-nowrap gap-4 sm:gap-6 w-max animate-marquee-ltr hover:[animation-play-state:paused] cursor-pointer">
              {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
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

      {/* ----------------------------------------------------
         12. Bottom Footer - Centered & Ultra-Premium with Layered Skyline SVG
         ---------------------------------------------------- */}
      <footer className="relative bg-gradient-to-b from-bg-deep via-bg-navy to-bg-deep pt-24 pb-0 overflow-hidden flex flex-col justify-between" dir="rtl">
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
              <h3 className="text-sm font-bold text-white border-r-2 border-gold-primary pr-3 leading-none font-el-messiri">روابط سريعة</h3>
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
              <h3 className="text-sm font-bold text-white border-r-2 border-gold-primary pr-3 leading-none font-el-messiri">مشاريعنا الفاخرة</h3>
              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-available"></span>
                  <a href="#projects-section" className="hover:text-gold-primary transition-colors duration-200 font-el-messiri">مجمع أبو هايل نورت (متاح)</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-available"></span>
                  <a href="#projects-section" className="hover:text-gold-primary transition-colors duration-200 font-el-messiri">فيلا مخطط السعيد (متاح)</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-soon"></span>
                  <a href="#projects-section" className="hover:text-gold-primary transition-colors duration-200 font-el-messiri">ملحق روف أمل ستارز (قريباً)</a>
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
            <div className="text-right text-[10px] text-slate-400 leading-relaxed font-el-messiri">
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
            <p className="opacity-75 font-el-messiri">
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
              <h4 className="text-xl sm:text-2xl font-extrabold text-white leading-tight font-el-messiri">
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
