'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MapPin, Building, DollarSign, Layers, Bed, Bath, Ruler, ArrowLeft, X } from 'lucide-react';
import { Property } from '@/lib/mockData';
import CustomSelect from '@/components/ui/CustomSelect';

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

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(price) + ' ر.س';
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

function FeaturedPropertyCard({ property }: { property: Property }) {
  return (
    <div className="group relative w-full bg-bg-navy/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-gold-primary/40 shadow-[0_16px_48px_rgba(0,0,0,0.4)] hover:border-gold-primary/75 transition-all duration-500 mb-12">
      <div className="absolute top-0 start-0 w-full h-[3px] bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left side: Image */}
        <div className="order-1 lg:order-2 lg:col-span-7 relative h-64 sm:h-80 md:h-[400px] lg:h-auto min-h-[260px] lg:min-h-[440px] overflow-hidden bg-bg-deep">
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/75 via-transparent to-transparent z-10"></div>

          <div className="absolute top-6 end-6 z-20 flex flex-wrap gap-2">
            <span className="px-4 py-1.5 text-xs font-extrabold text-bg-midnight bg-gold-primary border border-gold-primary rounded-full shadow-lg shadow-gold-primary/25 uppercase">
              عقار مميز جداً
            </span>
            <span className="px-4 py-1.5 text-xs font-extrabold text-white bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full">
              {property.status === 'available' ? 'متاح للبيع' : property.status === 'reserved' ? 'محجوز' : 'مباع'}
            </span>
          </div>

          <div className="absolute bottom-6 end-6 z-20">
            <span className="px-3.5 py-1.5 text-xs font-extrabold text-gold-light bg-bg-deep/80 backdrop-blur-md border border-border-gold/20 rounded-md">
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

        {/* Right side: Content */}
        <div className="order-2 lg:order-1 lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between text-start">
          <div>
            <div className="flex items-center gap-1.5 mb-3 text-xs font-semibold text-text-muted font-el-messiri">
              <span className="w-2 h-2 rounded-full bg-gold-primary"></span>
              <span>{property.project.name}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-text-primary mb-4 leading-snug font-el-messiri group-hover:text-gold-primary transition-colors duration-300">
              {property.title}
            </h3>

            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-text-secondary mb-5">
              <MapPin className="w-4 h-4 text-gold-primary shrink-0" />
              <span>{property.location.district}، {property.location.city}</span>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 line-clamp-4">
              {property.description}
            </p>

            {property.specs.features && property.specs.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {property.specs.features.slice(0, 4).map((feat, i) => (
                  <span key={i} className="py-1 px-3 text-xs font-bold bg-white/[0.03] border border-white/10 text-text-muted rounded-md font-el-messiri">
                    {feat}
                  </span>
                ))}
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 mb-6 text-xs text-text-secondary">
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-xs text-text-muted font-el-messiri">الغرف</span>
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4 text-gold-primary" />
                  <span className="font-bold text-text-primary font-mono text-sm">{property.specs.bedrooms}</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-x border-white/10">
                <span className="text-xs text-text-muted font-el-messiri">الحمامات</span>
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4 text-gold-primary" />
                  <span className="font-bold text-text-primary font-mono text-sm">{property.specs.bathrooms}</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-xs text-text-muted font-el-messiri">المساحة</span>
                <div className="flex items-center gap-1">
                  <Ruler className="w-4 h-4 text-gold-primary" />
                  <span className="font-bold text-text-primary font-mono text-sm">{formatArea(property.specs.area)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-text-muted uppercase mb-1 font-el-messiri">السعر الإجمالي</p>
              <p className="text-xl sm:text-2xl font-extrabold text-gold-primary font-el-messiri">
                {formatPrice(property.pricing.price)}
              </p>
              {property.pricing.monthlyInstallment && (
                <p className="text-xs text-text-muted mt-1 font-el-messiri">
                  قسط شهري متوقع: <strong className="text-white font-mono">{new Intl.NumberFormat('en-US').format(property.pricing.monthlyInstallment)} ر.س</strong>
                </p>
              )}
            </div>

            <Link
              href={`/property/${property.slug}`}
              className="py-3 px-8 text-xs sm:text-sm font-extrabold btn-premium-gold flex items-center gap-2 group/btn cursor-pointer font-el-messiri min-h-[44px]"
            >
              <span>عرض كامل التفاصيل</span>
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover/btn:-translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SimplifiedPropertyCard({ property }: { property: Property }) {
  return (
    <div className="group relative flex flex-col h-full bg-bg-navy/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-border-gold/30 hover:bg-bg-navy/60 hover:-translate-y-1 w-[280px] sm:w-[285px] md:w-[310px] shrink-0">
      <div className="absolute top-0 start-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

      <div className="relative aspect-[16/10] overflow-hidden bg-bg-deep">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/50 to-transparent z-10"></div>
        <Image
          src={getPropertyImage(property.type)}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 200px, 290px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 end-3 z-20">
          <span className="px-2.5 py-1 text-xs font-extrabold text-white bg-gold-primary/90 rounded font-el-messiri">
            {property.type === 'annex' ? 'ملحق' : property.type === 'villa' ? 'فيلا' : property.type === 'penthouse' ? 'روف' : 'شقة'}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 text-start">
        <h4 className="text-xs sm:text-sm font-extrabold text-text-primary line-clamp-1 mb-2 group-hover:text-gold-light transition-colors duration-300 font-el-messiri">
          {property.title}
        </h4>

        <div className="flex items-center gap-1.5 text-xs text-text-muted mb-3 font-el-messiri">
          <MapPin className="w-3.5 h-3.5 text-gold-primary shrink-0" />
          <span className="line-clamp-1">{property.location.district}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-text-secondary border-t border-white/5 pt-2 mb-4 font-el-messiri">
          <span className="font-semibold">{property.specs.bedrooms} غرف</span>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <span className="font-mono">{formatArea(property.specs.area)}</span>
        </div>

        <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-text-muted font-el-messiri">السعر</p>
            <p className="text-xs sm:text-sm font-extrabold text-gold-primary font-el-messiri">
              {formatPrice(property.pricing.price)}
            </p>
          </div>

          <Link
            href={`/property/${property.slug}`}
            className="py-2 px-4 text-xs font-extrabold btn-premium-gold flex items-center gap-1 cursor-pointer font-el-messiri min-h-[44px]"
          >
            <span>عرض</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

interface PropertyListingsSectionProps {
  properties: Property[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedRooms: string;
  setSelectedRooms: (rooms: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;
}

export default function PropertyListingsSection({
  properties,
  selectedCity,
  setSelectedCity,
  selectedType,
  setSelectedType,
  selectedRooms,
  setSelectedRooms,
  maxPrice,
  setMaxPrice,
}: PropertyListingsSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [showLocalFilters, setShowLocalFilters] = useState<boolean>(false);
  const [isLocalFiltersOpenComplete, setIsLocalFiltersOpenComplete] = useState<boolean>(false);
  const [propertiesViewMode, setPropertiesViewMode] = useState<'grid' | 'table'>('grid');
  const propertiesTableRef = useRef<HTMLDivElement>(null);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.05 : 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const featuredProperty = useMemo(() => {
    if (properties.length === 0) return null;
    const featuredApartment = properties.find(p => p.featured && p.type === 'apartment');
    if (featuredApartment) return featuredApartment;
    const anyFeatured = properties.find(p => p.featured);
    if (anyFeatured) return anyFeatured;
    return properties[0];
  }, [properties]);

  const carouselProperties = useMemo(() => {
    if (!featuredProperty) return [];
    return properties.filter(p => p.id !== featuredProperty.id);
  }, [properties, featuredProperty]);

  const getMarqueeItems = (items: Property[]) => {
    if (items.length === 0) return [];
    let repeated = [...items];
    while (repeated.length < 16) {
      repeated = [...repeated, ...items];
    }
    return [...repeated, ...repeated];
  };

  useEffect(() => {
    if (propertiesViewMode === 'table' && propertiesTableRef.current) {
      const el = propertiesTableRef.current;
      el.scrollLeft = el.scrollWidth;
      const timer = setTimeout(() => {
        el.scrollLeft = el.scrollWidth;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [propertiesViewMode, properties]);

  return (
    <div className="w-full bg-gradient-to-b from-bg-deep via-bg-navy to-bg-deep border-b border-border-gold/15 pb-16">
      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'flat', label: 'شقق سكنية' },
            { id: 'villa', label: 'فلل فخمة' },
            { id: 'roof', label: 'أروف / بنتهاوس' },
            { id: 'investment', label: 'عروض الاستثمار' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`py-3 px-6 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 border cursor-pointer min-h-[44px] ${
                selectedType === tab.id
                  ? 'bg-gold-primary text-bg-midnight border-gold-primary font-extrabold shadow-lg shadow-gold-primary/10'
                  : 'bg-bg-royal/40 hover:bg-bg-royal/70 text-text-secondary border-border-gold/20 hover:border-gold-primary hover:text-white'
              }`}
              onClick={() => setSelectedType(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Listings Section */}
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
          <div className="text-start mb-4 md:mb-0">
            <motion.span variants={fadeUpVariants} className="block text-xs font-semibold text-gold-primary uppercase">قائمتنا المحدثة</motion.span>
            <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-text-primary mt-1 liquid-gold-heading font-el-messiri">
              تصفح آخر العروض والفرص الحالية
            </motion.h2>
          </div>
          <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-text-muted mt-2 md:mt-0">
            {/* View Switcher */}
            <div className="flex items-center bg-bg-royal/40 border border-border-gold/15 rounded-lg p-1 shrink-0">
              <button
                type="button"
                onClick={() => setPropertiesViewMode('grid')}
                className={`px-3.5 py-2 rounded-md transition-all duration-300 cursor-pointer text-xs sm:text-sm font-semibold font-el-messiri min-h-[44px] flex items-center ${
                  propertiesViewMode === 'grid'
                    ? 'bg-gold-primary text-bg-midnight font-bold shadow-md shadow-gold-primary/10'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                كروت العرض
              </button>
              <button
                type="button"
                onClick={() => setPropertiesViewMode('table')}
                className={`px-3.5 py-2 rounded-md transition-all duration-300 cursor-pointer text-xs sm:text-sm font-semibold font-el-messiri min-h-[44px] flex items-center ${
                  propertiesViewMode === 'table'
                    ? 'bg-gold-primary text-bg-midnight font-bold shadow-md shadow-gold-primary/10'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                جدول التفاصيل
              </button>
            </div>

            {/* Local Filter Toggle */}
            <button
              type="button"
              onClick={() => setShowLocalFilters(!showLocalFilters)}
              className={`flex items-center justify-center p-2.5 rounded-lg border transition-all duration-300 cursor-pointer shrink-0 min-w-[44px] min-h-[44px] ${
                showLocalFilters
                  ? 'bg-gold-primary text-bg-midnight border-gold-primary shadow-lg shadow-gold-primary/20 scale-95'
                  : 'bg-bg-royal/30 text-gold-primary border border-border-gold/15 hover:border-gold-primary hover:bg-gold-primary/10'
              }`}
              title="تصفية العقارات"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
            </button>

            <span>
              تم العثور على <strong className="text-gold-primary font-mono">{properties.length}</strong> وحدة مطروحة
            </span>
          </motion.div>
        </motion.div>

        {/* Local Filter Card */}
        <AnimatePresence>
          {showLocalFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onAnimationStart={() => setIsLocalFiltersOpenComplete(false)}
              onAnimationComplete={() => {
                if (showLocalFilters) setIsLocalFiltersOpenComplete(true);
              }}
              className={`w-full mb-8 relative z-30 ${isLocalFiltersOpenComplete ? 'overflow-visible' : 'overflow-hidden'}`}
            >
              <div className="p-5 sm:p-7 bg-white/10 backdrop-blur-xl border border-border-gold/30 rounded-3xl shadow-2xl flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                  <div className="space-y-1.5 text-start">
                    <label htmlFor="local-filter-city" className="block text-xs font-bold text-text-muted mb-2 flex items-center gap-1 font-el-messiri">
                      <MapPin className="w-3.5 h-3.5 text-gold-primary" /> المدينة
                    </label>
                    <CustomSelect
                      id="local-filter-city"
                      title="تصفية بالمدينة"
                      options={CITY_OPTIONS}
                      value={selectedCity}
                      onChange={setSelectedCity}
                    />
                  </div>

                  <div className="space-y-1.5 text-start">
                    <label htmlFor="local-filter-type" className="block text-xs font-bold text-text-muted mb-2 flex items-center gap-1 font-el-messiri">
                      <Building className="w-3.5 h-3.5 text-gold-primary" /> نوع العقار
                    </label>
                    <CustomSelect
                      id="local-filter-type"
                      title="تصفية بنوع العقار"
                      options={TYPE_OPTIONS}
                      value={selectedType}
                      onChange={setSelectedType}
                    />
                  </div>

                  <div className="space-y-1.5 text-start">
                    <label htmlFor="local-filter-rooms" className="block text-xs font-bold text-text-muted mb-2 flex items-center gap-1 font-el-messiri">
                      <Layers className="w-3.5 h-3.5 text-gold-primary" /> عدد الغرف
                    </label>
                    <CustomSelect
                      id="local-filter-rooms"
                      title="تصفية بعدد الغرف"
                      options={ROOMS_OPTIONS}
                      value={selectedRooms}
                      onChange={setSelectedRooms}
                    />
                  </div>

                  <div className="space-y-1.5 text-start">
                    <label htmlFor="local-filter-price" className="block text-xs font-bold text-text-muted mb-2 flex items-center gap-1 font-el-messiri">
                      <DollarSign className="w-3.5 h-3.5 text-gold-primary" /> السعر الأقصى
                    </label>
                    <CustomSelect
                      id="local-filter-price"
                      title="تصفية بالحد الأقصى للسعر"
                      options={PRICE_OPTIONS}
                      value={maxPrice}
                      onChange={setMaxPrice}
                    />
                  </div>
                </div>

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
                      className="text-xs text-text-muted hover:text-white transition-colors duration-200 underline cursor-pointer font-el-messiri min-h-[44px] px-2 flex items-center"
                    >
                      إعادة تعيين الفلاتر
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {properties.length > 0 ? (
          <div className="space-y-12">
            {propertiesViewMode === 'table' ? (
              <div ref={propertiesTableRef} className="custom-table-wrapper w-full max-h-[60vh] overflow-auto rounded-2xl border-2 border-gold-primary/50 bg-[#0F2342]/90 backdrop-blur-xl shadow-2xl scrollbar-thin scrollbar-thumb-gold-primary scrollbar-track-transparent" dir="rtl">
                <table className="w-full min-w-[950px] text-start text-xs sm:text-sm table-auto border-collapse" dir="rtl">
                  <thead className="sticky top-0 z-20 shadow-md">
                    <tr className="border-b border-border-gold/30 text-gold-primary font-el-messiri bg-[#18325C]">
                      <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 text-start bg-[#18325C]">الصورة</th>
                      <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 text-start bg-[#18325C]">اسم الوحدة</th>
                      <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 text-start bg-[#18325C]">النوع</th>
                      <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 text-start bg-[#18325C]">الموقع</th>
                      <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 text-start bg-[#18325C]">المساحة</th>
                      <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 text-start bg-[#18325C]">الغرف / الحمامات</th>
                      <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 text-start bg-[#18325C]">السعر</th>
                      <th className="py-4 px-5 font-bold whitespace-nowrap text-center border-x border-border-gold/15 bg-[#18325C]">التفاصيل</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-gold/15 text-white bg-[#0F2342]/40">
                    {properties.map((property) => {
                      let typeLabel = 'شقة';
                      if (property.type === 'villa') typeLabel = 'فيلا';
                      else if (property.type === 'annex') typeLabel = 'ملحق';
                      else if (property.type === 'penthouse') typeLabel = 'بنتهاوس';
                      else if (property.type === 'duplex') typeLabel = 'دوبلكس';

                      return (
                        <tr key={property.id} className="odd:bg-[#0F2342]/40 even:bg-[#142B4E]/60 hover:bg-gold-primary/[0.08] transition-colors duration-150 border-b border-border-gold/10">
                          <td className="py-3 px-5 border-x border-border-gold/10 text-start">
                            <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-border-gold/20 shadow-sm shrink-0">
                              <Image src={property.media.thumbnail} alt={property.title} fill sizes="56px" className="object-cover" />
                            </div>
                          </td>
                          <td className="py-3 px-5 font-semibold text-white border-x border-border-gold/10 text-start whitespace-nowrap">{property.title}</td>
                          <td className="py-3 px-5 text-text-secondary border-x border-border-gold/10 text-start">
                            <span className="inline-block py-1 px-3 text-xs font-medium text-gold-primary bg-gold-primary/10 border border-gold-primary/20 rounded-full whitespace-nowrap">
                              {typeLabel}
                            </span>
                          </td>
                          <td className="py-3 px-5 text-text-secondary border-x border-border-gold/10 text-start whitespace-nowrap">
                            {property.location.city}، {property.location.district}
                          </td>
                          <td className="py-3 px-5 font-mono text-gold-primary border-x border-border-gold/10 font-semibold text-start whitespace-nowrap">
                            {property.specs.area} م²
                          </td>
                          <td className="py-3 px-5 text-text-secondary border-x border-border-gold/10 text-start whitespace-nowrap">
                            {property.specs.bedrooms} غرف / {property.specs.bathrooms} حمام
                          </td>
                          <td className="py-3 px-5 font-bold text-gold-primary font-mono border-x border-border-gold/10 text-start whitespace-nowrap">
                            {property.pricing.price.toLocaleString()} ر.س
                          </td>
                          <td className="py-3 px-5 text-center border-x border-border-gold/10">
                            <Link href={`/property/${property.slug}`} className="py-2 px-5 text-xs font-bold btn-premium-gold rounded-md inline-block font-el-messiri whitespace-nowrap min-w-[125px] min-h-[44px] flex items-center justify-center">
                              عرض كامل التفاصيل
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <>
                {featuredProperty && <FeaturedPropertyCard property={featuredProperty} />}
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
              </>
            )}

            <div className="text-center mt-6">
              <Link
                href="/properties"
                className="py-3.5 px-10 text-xs sm:text-sm font-extrabold btn-premium-gold inline-flex items-center gap-2 cursor-pointer font-el-messiri min-h-[44px]"
              >
                <span>عرض جميع الوحدات العقارية</span>
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 -translate-x-0.5 group-hover:-translate-x-1.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-bg-royal/20 border border-border-gold/20 rounded-2xl max-w-md mx-auto shadow-xl p-6">
            <Building className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-sm font-semibold text-text-secondary">عذراً، لم نجد أي عروض تطابق فلاتر البحث الحالية.</p>
            <button
              type="button"
              className="mt-4 text-xs font-bold text-gold-primary underline hover:text-gold-light cursor-pointer min-h-[44px] px-4"
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
  );
}
