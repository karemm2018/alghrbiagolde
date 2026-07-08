// src/app/properties/page.tsx
'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PROPERTIES, Property } from '@/lib/mockData';
import PropertyCard from '@/components/property/PropertyCard';
import CustomSelect from '@/components/ui/CustomSelect';
import { useInquiryStore } from '@/store/useInquiryStore';
import {
  Search,
  MapPin,
  Building2,
  Ruler,
  Bed,
  Bath,
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
  Compass
} from 'lucide-react';

// Sub-component for horizontal detailed card view
const DetailedPropertyCard = ({ property, openInquiry }: { property: Property; openInquiry: () => void }) => {
  let typeLabel = '';
  if (property.type === 'apartment') typeLabel = 'شقة سكنية';
  else if (property.type === 'villa') typeLabel = 'فيلا مستقلة';
  else if (property.type === 'annex') typeLabel = 'ملحق روف';
  else if (property.type === 'penthouse') typeLabel = 'بنتهاوس فاخر';
  else if (property.type === 'duplex') typeLabel = 'دوبلكس';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(price) + ' ر.س';
  };

  const formatArea = (area: number) => {
    return `${new Intl.NumberFormat('en-US').format(area)} م²`;
  };

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
          src={property.media.thumbnail || '/properties/apartment.webp'} 
          alt={property.title}
          fill
          sizes="(max-width: 1024px) 100vw, 35vw"
          className="object-cover transition-transform duration-[6000ms] group-hover:scale-108 z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-slate-950/70 via-transparent to-transparent z-10"></div>
        <div className="absolute top-4 start-4 z-20">
          <span className="px-3 py-1 text-[10px] font-extrabold text-white bg-status-available border border-status-available rounded-full shadow-[0_4px_12px_rgba(34,169,110,0.3)]">
            {property.status === 'available' ? 'متاح للبيع' : 'محجوز'}
          </span>
        </div>
      </div>

      {/* Info Block */}
      <div className="flex-1 p-6 sm:p-8 flex flex-col text-right justify-between">
        <div>
          <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5 text-xs text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-primary"></span>
                <span>{property.project.name}</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight font-el-messiri group-hover:text-gold-primary transition-colors">
                {property.title}
              </h3>
            </div>
            <div className="text-right lg:text-left">
              <span className="text-[9px] text-text-muted block mb-0.5">السعر الإجمالي</span>
              <span className="text-lg sm:text-xl font-extrabold text-gold-primary font-el-messiri">
                {formatPrice(property.pricing.price)}
              </span>
              {property.pricing.pricePerMeter > 0 && (
                <span className="block text-[10px] text-text-secondary mt-0.5 font-mono">
                  ({formatPrice(property.pricing.pricePerMeter)} / م²)
                </span>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-4">
            <MapPin className="w-3.5 h-3.5 text-gold-primary shrink-0" />
            <span>{property.location.address}</span>
          </div>

          {/* Description */}
          <p className="text-xs text-text-secondary leading-relaxed mb-5 line-clamp-2">
            {property.description}
          </p>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/5 mb-5 text-xs text-text-secondary text-center">
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-[9px] text-text-muted">المساحة</span>
              <div className="flex items-center gap-1 font-bold text-white">
                <Ruler className="w-3.5 h-3.5 text-gold-primary" />
                <span>{formatArea(property.specs.area)}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 border-s sm:border-s-0 sm:border-x border-white/5">
              <span className="text-[9px] text-text-muted">الغرف</span>
              <div className="flex items-center gap-1 font-bold text-white">
                <Bed className="w-3.5 h-3.5 text-gold-primary" />
                <span>{property.specs.bedrooms}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 border-s border-white/5">
              <span className="text-[9px] text-text-muted">الحمامات</span>
              <div className="flex items-center gap-1 font-bold text-white">
                <Bath className="w-3.5 h-3.5 text-gold-primary" />
                <span>{property.specs.bathrooms}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 border-s border-white/5">
              <span className="text-[9px] text-text-muted">الفئة</span>
              <span className="font-extrabold text-gold-light">{typeLabel}</span>
            </div>
          </div>

          {/* Features */}
          {property.specs.features && property.specs.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {property.specs.features.slice(0, 4).map((feat, idx) => (
                <span 
                  key={idx} 
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-text-secondary bg-white/[0.04] border border-white/10 rounded-lg"
                >
                  <Check className="w-3 h-3 text-gold-primary" />
                  <span>{feat}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5 mt-auto">
          <button 
            type="button"
            onClick={openInquiry}
            className="py-2.5 px-6 text-xs font-bold btn-premium-gold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer font-el-messiri transition-transform active:scale-95"
          >
            <span>طلب معاينة خاصة</span>
          </button>
          
          <a 
            href={`https://wa.me/9665xxxxxxxx?text=${encodeURIComponent(`السلام عليكم، أريد الاستفسار عن الوحدة العقارية: ${property.title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-4 text-xs font-bold bg-gold-primary/10 text-gold-light border border-gold-primary/25 rounded-xl hover:bg-gold-primary hover:text-bg-midnight transition-all duration-300 flex items-center justify-center gap-1.5 font-el-messiri"
          >
            <MessageCircle className="w-4 h-4" />
            <span>واتساب</span>
          </a>

          <a 
            href="tel:+9665xxxxxxxx"
            className="py-2.5 px-4 text-xs font-bold bg-white/[0.04] text-text-secondary border border-white/10 rounded-xl hover:bg-white/[0.08] hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 font-el-messiri"
          >
            <Phone className="w-4 h-4" />
            <span>اتصال</span>
          </a>

          <Link 
            href={`/property/${property.slug}`}
            className="ms-auto py-2 px-3 text-xs font-bold text-text-muted hover:text-gold-primary transition-colors flex items-center gap-1"
          >
            <span>عرض التفاصيل</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function PropertiesPage() {
  const shouldReduceMotion = useReducedMotion();
  const openInquiry = useInquiryStore((state) => state.open);

  // Layout switcher state
  const [viewMode, setViewMode] = useState<'grid' | 'detailed' | 'carousel' | 'table'>('grid');

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRooms, setSelectedRooms] = useState('all');
  const [selectedBaths, setSelectedBaths] = useState('all');
  const [minPrice, setMinPrice] = useState('all');
  const [maxPrice, setMaxPrice] = useState('all');
  const [minArea, setMinArea] = useState('all');
  const [maxArea, setMaxArea] = useState('all');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isAdvancedOpenComplete, setIsAdvancedOpenComplete] = useState(false);

  // References
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Dynamic lists extraction
  const cityOptions = useMemo(() => {
    const citiesSet = new Set<string>();
    PROPERTIES.forEach(p => citiesSet.add(p.location.city));
    const citiesArray = Array.from(citiesSet);
    return [
      { value: 'all', label: 'كل المدن' },
      ...citiesArray.map(c => ({ value: c, label: c }))
    ];
  }, []);

  const typeOptions = useMemo(() => [
    { value: 'all', label: 'كل الأنواع' },
    { value: 'apartment', label: 'شقة' },
    { value: 'villa', label: 'فيلا' },
    { value: 'annex', label: 'ملحق' },
    { value: 'penthouse', label: 'بنتهاوس' },
    { value: 'duplex', label: 'دوبلكس' }
  ], []);

  const roomOptions = useMemo(() => [
    { value: 'all', label: 'الكل' },
    { value: '2', label: 'غرفتين' },
    { value: '3', label: '٣ غرف' },
    { value: '4', label: '٤ غرف' },
    { value: '5', label: '٥ غرف' },
    { value: '6', label: '٦ غرف فأكثر' }
  ], []);

  const bathOptions = useMemo(() => [
    { value: 'all', label: 'الكل' },
    { value: '2', label: 'حمامين' },
    { value: '3', label: '٣ حمامات' },
    { value: '4', label: '٤ حمامات' },
    { value: '5', label: '٥ حمامات فأكثر' }
  ], []);

  const minPriceOptions = useMemo(() => [
    { value: 'all', label: 'الحد الأدنى للسعر' },
    { value: '500000', label: '٥٠٠,٠٠٠ ر.س' },
    { value: '750000', label: '٧٥٠,٠٠٠ ر.س' },
    { value: '1000000', label: '١,٠٠٠,٠٠٠ ر.س' },
    { value: '1500000', label: '١,٥٠٠,٠٠٠ ر.س' },
    { value: '2000000', label: '٢,٠٠٠,٠٠٠ ر.س' },
    { value: '5000000', label: '٥,٠٠٠,٠٠٠ ر.س' },
    { value: '10000000', label: '١٠,٠٠٠,٠٠٠ ر.س' }
  ], []);

  const maxPriceOptions = useMemo(() => [
    { value: 'all', label: 'الحد الأقصى للسعر' },
    { value: '750000', label: '٧٥٠,٠٠٠ ر.س' },
    { value: '1000000', label: '١,٠٠٠,٠٠٠ ر.س' },
    { value: '1500000', label: '١,٥٠٠,٠٠٠ ر.س' },
    { value: '2000000', label: '٢,٠٠٠,٠٠٠ ر.س' },
    { value: '5000000', label: '٥,٠٠٠,٠٠٠ ر.س' },
    { value: '10000000', label: '١٠,٠٠٠,٠٠٠ ر.س' },
    { value: '20000000', label: '٢٠,٠٠٠,٠٠٠ ر.س' }
  ], []);

  const minAreaOptions = useMemo(() => [
    { value: 'all', label: 'الحد الأدنى للمساحة' },
    { value: '100', label: '١٠٠ م²' },
    { value: '150', label: '١٥٠ م²' },
    { value: '200', label: '٢٠٠ م²' },
    { value: '250', label: '٢٥٠ م²' },
    { value: '300', label: '٣٠٠ م²' },
    { value: '400', label: '٤٠٠ م²' }
  ], []);

  const maxAreaOptions = useMemo(() => [
    { value: 'all', label: 'الحد الأقصى للمساحة' },
    { value: '150', label: '١٥٠ م²' },
    { value: '200', label: '٢٠٠ م²' },
    { value: '250', label: '٢٥٠ م²' },
    { value: '300', label: '٣٠٠ م²' },
    { value: '400', label: '٤٠٠ م²' },
    { value: '500', label: '٥٠٠ م²' },
    { value: '1000', label: '١٠٠٠ م²' }
  ], []);

  // Extract unique districts dynamically depending on the selected city
  const districtOptions = useMemo(() => {
    const districtsSet = new Set<string>();
    PROPERTIES.forEach(p => {
      if (selectedCity === 'all' || p.location.city === selectedCity) {
        districtsSet.add(p.location.district);
      }
    });
    const districtsArray = Array.from(districtsSet);
    return [
      { value: 'all', label: 'كل الأحياء' },
      ...districtsArray.map(d => ({ value: d, label: d }))
    ];
  }, [selectedCity]);

  // Extract unique amenities list dynamically
  const availableAmenities = useMemo(() => {
    const amenitiesSet = new Set<string>();
    PROPERTIES.forEach(p => {
      if (p.specs.features) {
        p.specs.features.forEach(feat => amenitiesSet.add(feat));
      }
    });
    return Array.from(amenitiesSet);
  }, []);

  // Filter properties logic
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(p => {
      // 1. Keyword search
      const query = searchQuery.trim().toLowerCase();
      if (query !== '') {
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        const matchDistrict = p.location.district.toLowerCase().includes(query);
        const matchCity = p.location.city.toLowerCase().includes(query);
        const matchProject = p.project.name.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchDistrict && !matchCity && !matchProject) return false;
      }

      // 2. City
      if (selectedCity !== 'all' && p.location.city !== selectedCity) return false;

      // 3. District
      if (selectedDistrict !== 'all' && p.location.district !== selectedDistrict) return false;

      // 4. Type
      if (selectedType !== 'all' && p.type !== selectedType) return false;

      // 5. Rooms
      if (selectedRooms !== 'all') {
        const roomsNum = p.specs.bedrooms;
        if (selectedRooms === '6') {
          if (roomsNum < 6) return false;
        } else {
          if (roomsNum.toString() !== selectedRooms) return false;
        }
      }

      // 6. Bathrooms
      if (selectedBaths !== 'all') {
        const bathsNum = p.specs.bathrooms;
        if (selectedBaths === '5') {
          if (bathsNum < 5) return false;
        } else {
          if (bathsNum.toString() !== selectedBaths) return false;
        }
      }

      // 7. Price
      if (minPrice !== 'all' && p.pricing.price < Number(minPrice)) return false;
      if (maxPrice !== 'all' && p.pricing.price > Number(maxPrice)) return false;

      // 8. Area
      if (minArea !== 'all' && p.specs.area < Number(minArea)) return false;
      if (maxArea !== 'all' && p.specs.area > Number(maxArea)) return false;

      // 9. Amenities (Logical AND: property must match all selected amenities)
      if (selectedAmenities.length > 0) {
        if (!p.specs.features) return false;
        const hasAll = selectedAmenities.every(feat => p.specs.features?.includes(feat));
        if (!hasAll) return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedCity,
    selectedDistrict,
    selectedType,
    selectedRooms,
    selectedBaths,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    selectedAmenities
  ]);

  // Reset all filters helper
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setSelectedDistrict('all');
    setSelectedType('all');
    setSelectedRooms('all');
    setSelectedBaths('all');
    setMinPrice('all');
    setMaxPrice('all');
    setMinArea('all');
    setMaxArea('all');
    setSelectedAmenities([]);
  };

  // Toggle amenity selection helper
  const handleToggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  // Track the number of active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery !== '') count++;
    if (selectedCity !== 'all') count++;
    if (selectedDistrict !== 'all') count++;
    if (selectedType !== 'all') count++;
    if (selectedRooms !== 'all') count++;
    if (selectedBaths !== 'all') count++;
    if (minPrice !== 'all') count++;
    if (maxPrice !== 'all') count++;
    if (minArea !== 'all') count++;
    if (maxArea !== 'all') count++;
    count += selectedAmenities.length;
    return count;
  }, [
    searchQuery,
    selectedCity,
    selectedDistrict,
    selectedType,
    selectedRooms,
    selectedBaths,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    selectedAmenities
  ]);

  // Dynamic filter visibility depending on options availability
  const showCityFilter = useMemo(() => cityOptions.length > 2, [cityOptions]);
  const showDistrictFilter = useMemo(() => districtOptions.length > 2, [districtOptions]);

  const gridColsClass = useMemo(() => {
    let cols = 2; // Search query takes col-span-2
    if (showCityFilter) cols += 1;
    if (showDistrictFilter) cols += 1;
    return `grid grid-cols-1 md:grid-cols-${cols} gap-4`;
  }, [showCityFilter, showDistrictFilter]);

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
  }, [viewMode, filteredProperties]);

  // Carousel layout buttons trigger helpers
  const handleCarouselNav = (direction: 'next' | 'prev') => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const amount = container.clientWidth * 0.8;
      const sign = direction === 'next' ? -1 : 1; // negative leftwards in RTL
      container.scrollBy({ left: amount * sign, behavior: 'smooth' });
    }
  };

  // Helper for marquee repetition in carousel layout
  const carouselPropertiesList = useMemo(() => {
    return filteredProperties;
  }, [filteredProperties]);

  return (
    <main className="min-h-screen bg-bg-midnight relative overflow-x-hidden" dir="rtl">
      {/* ----------------------------------------------------
         1. Full-screen Hero Section (80vh & Full Width)
         ---------------------------------------------------- */}
      <section className="relative h-[80vh] w-full flex items-center justify-center bg-bg-deep overflow-hidden">
        {/* Background Image with Slow Zoom effect */}
        <div className="absolute inset-0 z-0 select-none">
          <Image 
            src="/hero-bg-properties.png" 
            alt="Luxury properties background"
            fill
            priority
            className="object-cover scale-105"
          />
          {/* Lightened premium overlay for readability and visual clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A]/90 via-[#060D1A]/55 to-[#060D1A]/15"></div>
        </div>

        {/* Banner Contents (Centered vertically with balanced padding and shifted 10vh down below floating navbar) */}
        <div className="relative z-10 max-w-5xl w-[90%] mx-auto text-center flex flex-col items-center justify-center pt-28 sm:pt-36 pb-12 sm:pb-16 translate-y-[10vh]">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-extrabold text-gold-primary tracking-widest uppercase block mb-4 font-serif text-center"
          >
            LIVING GOLDEN LUXURY
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl xs:text-2xl sm:text-5xl lg:text-6xl font-black text-white leading-tight font-el-messiri mb-6 drop-shadow-xl text-center"
          >
            استكشف <span className="bg-gradient-to-r from-gold-light via-gold-primary to-gold-warm bg-clip-text text-transparent">الوحدات العقارية الفاخرة</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-base text-text-secondary leading-relaxed mb-10 max-w-2xl drop-shadow-md text-center"
          >
            مجموعتنا الفريدة من الوحدات السكنية الفاخرة المصممة خصيصاً لتلبي تطلعاتكم في العيش الراقي، بمواقع استراتيجية وتشطيبات عالمية الجودة في أفضل مناطق التوسع العمراني.
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
              <span>تواصل معنا للمعاينة</span>
            </button>

            <Link
              href="/#projects-section"
              className="w-full sm:w-auto py-3.5 px-10 text-xs sm:text-sm font-bold bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-gold-primary/50 rounded-full flex items-center justify-center gap-2 transition-all duration-300 font-el-messiri hover:scale-102 active:scale-98 text-center"
            >
              <Compass className="w-4 h-4 shrink-0 text-gold-primary" />
              <span>تصفح المشاريع السكنية</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Background ambient light effects */}
      <div className="absolute top-[80vh] start-0 w-[45vw] h-[45vw] bg-gradient-to-br from-gold-primary/8 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] end-0 w-[35vw] h-[35vw] bg-gradient-to-tr from-brand-primary/5 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* 2. Listings Wrapper */}
      <div id="properties-listings-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 relative z-10">

        {/* Filter panel card */}
        <section className="bg-bg-navy/35 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl mb-10 transition-all duration-300">
          <div className="flex flex-col gap-6">
            
            {/* Primary filter row */}
            <div className={gridColsClass}>
              {/* Search input */}
              <div className="relative w-full text-right md:col-span-2">
                <label htmlFor="prop-search" className="sr-only">البحث عن وحدة</label>
                <div className="relative">
                  <input 
                    id="prop-search"
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث باسم الوحدة، الحي، أو المشروع..."
                    className="w-full bg-white/10 border border-border-gold/30 hover:border-gold-primary/50 focus:border-gold-primary rounded-xl ps-12 pe-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-gold-primary transition-all duration-300"
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
                  onAnimationStart={() => setIsAdvancedOpenComplete(false)}
                  onAnimationComplete={() => {
                    if (showAdvanced) setIsAdvancedOpenComplete(true);
                  }}
                  className={`w-full ${isAdvancedOpenComplete ? 'overflow-visible' : 'overflow-hidden'}`}
                >
                  <div className="border-t border-white/10 pt-6 flex flex-col gap-6">
                    
                    {/* Select options row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Property Type */}
                      <CustomSelect 
                        id="type-select"
                        title="نوع العقار"
                        options={typeOptions}
                        value={selectedType}
                        onChange={setSelectedType}
                      />
                      
                      {/* Rooms count */}
                      <CustomSelect 
                        id="rooms-select"
                        title="عدد الغرف"
                        options={roomOptions}
                        value={selectedRooms}
                        onChange={setSelectedRooms}
                      />

                      {/* Bathrooms count */}
                      <CustomSelect 
                        id="baths-select"
                        title="عدد الحمامات"
                        options={bathOptions}
                        value={selectedBaths}
                        onChange={setSelectedBaths}
                      />

                      {/* Area range */}
                      <div className="grid grid-cols-2 gap-2">
                        <CustomSelect 
                          id="min-area-select"
                          title="أقل مساحة"
                          options={minAreaOptions}
                          value={minArea}
                          onChange={setMinArea}
                        />
                        <CustomSelect 
                          id="max-area-select"
                          title="أقصى مساحة"
                          options={maxAreaOptions}
                          value={maxArea}
                          onChange={setMaxArea}
                        />
                      </div>
                    </div>

                    {/* Price options row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <CustomSelect 
                        id="min-price-select"
                        title="الحد الأدنى للسعر"
                        options={minPriceOptions}
                        value={minPrice}
                        onChange={setMinPrice}
                      />
                      <CustomSelect 
                        id="max-price-select"
                        title="الحد الأقصى للسعر"
                        options={maxPriceOptions}
                        value={maxPrice}
                        onChange={setMaxPrice}
                      />
                    </div>

                    {/* Amenities tag selectors */}
                    <div>
                      <span className="block text-xs font-bold text-text-secondary mb-3">المميزات والخدمات الخاصة:</span>
                      <div className="flex flex-wrap gap-2">
                        {availableAmenities.map((amenity) => {
                          const isSelected = selectedAmenities.includes(amenity);
                          return (
                            <button
                              key={amenity}
                              type="button"
                              onClick={() => handleToggleAmenity(amenity)}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all duration-300 flex items-center gap-1.5 ${
                                isSelected 
                                  ? 'bg-gold-primary border-gold-primary text-bg-midnight font-bold shadow-md shadow-gold-primary/10'
                                  : 'bg-white/5 border-white/10 text-text-secondary hover:border-gold-primary/40 hover:text-white'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                              <span>{amenity}</span>
                            </button>
                          );
                        })}
                      </div>
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
                تم العثور على <strong className="text-gold-primary font-mono text-sm">{filteredProperties.length}</strong> وحدة مطروحة
              </div>
            </div>

          </div>
        </section>

        {/* Display modes switcher row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h2 className="text-lg font-bold text-white font-el-messiri flex items-center gap-2">
            <Building className="w-5 h-5 text-gold-primary" />
            <span>قائمة الوحدات المتاحة</span>
          </h2>

          {/* Buttons Group */}
          <div className="flex items-center bg-bg-royal/30 border border-border-gold/15 rounded-xl p-1 shrink-0 select-none">
            {/* Grid */}
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              aria-label="عرض الكروت"
              title="عرض كروت العقارات"
              className={`p-2 rounded-lg transition-all duration-300 cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-gold-primary text-bg-midnight shadow-md' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            {/* Detailed Cards */}
            <button
              type="button"
              onClick={() => setViewMode('detailed')}
              aria-label="عرض التفاصيل الكاملة"
              title="عرض الكروت التفصيلية"
              className={`p-2 rounded-lg transition-all duration-300 cursor-pointer ${
                viewMode === 'detailed' 
                  ? 'bg-gold-primary text-bg-midnight shadow-md' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>

            {/* Carousel */}
            <button
              type="button"
              onClick={() => setViewMode('carousel')}
              aria-label="عرض المعرض التفاعلي"
              title="عرض تصفح الكاروسل"
              className={`p-2 rounded-lg transition-all duration-300 cursor-pointer ${
                viewMode === 'carousel' 
                  ? 'bg-gold-primary text-bg-midnight shadow-md' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Table */}
            <button
              type="button"
              onClick={() => setViewMode('table')}
              aria-label="عرض الجداول"
              title="عرض جدول التفاصيل"
              className={`p-2 rounded-lg transition-all duration-300 cursor-pointer ${
                viewMode === 'table' 
                  ? 'bg-gold-primary text-bg-midnight shadow-md' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              <TableProperties className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Listings content render based on viewMode */}
        <section className="min-h-[250px]">
          {filteredProperties.length > 0 ? (
            <AnimatePresence mode="wait">
              
              {/* Grid Mode */}
              {viewMode === 'grid' && (
                <motion.div
                  key="grid-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                >
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </motion.div>
              )}

              {/* Detailed Rows Mode */}
              {viewMode === 'detailed' && (
                <motion.div
                  key="detailed-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col gap-6"
                >
                  {filteredProperties.map((property) => (
                    <DetailedPropertyCard 
                      key={property.id} 
                      property={property} 
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
                    {carouselPropertiesList.map((property) => (
                      <div 
                        key={property.id} 
                        className="w-[290px] sm:w-[350px] shrink-0 snap-center"
                      >
                        <PropertyCard property={property} />
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
                >
                  <div 
                    ref={tableWrapperRef} 
                    className="custom-table-wrapper w-full max-h-[60vh] overflow-auto rounded-2xl border-2 border-gold-primary/50 bg-[#0F2342]/90 backdrop-blur-xl shadow-2xl scrollbar-thin scrollbar-thumb-gold-primary scrollbar-track-transparent" 
                    dir="rtl"
                  >
                    <table className="w-full min-w-[950px] text-right text-xs sm:text-[13px] table-auto border-collapse">
                      <thead className="sticky top-0 z-20 shadow-md">
                        <tr className="border-b border-border-gold/30 text-gold-primary font-el-messiri bg-[#18325C]">
                          <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 first:border-s-0 last:border-e-0 text-right bg-[#18325C]">الصورة</th>
                          <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 first:border-s-0 last:border-e-0 text-right bg-[#18325C]">اسم الوحدة</th>
                          <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 first:border-s-0 last:border-e-0 text-right bg-[#18325C]">النوع</th>
                          <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 first:border-s-0 last:border-e-0 text-right bg-[#18325C]">الموقع</th>
                          <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 first:border-s-0 last:border-e-0 text-right bg-[#18325C]">المساحة</th>
                          <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 first:border-s-0 last:border-e-0 text-right bg-[#18325C]">الغرف / الحمامات</th>
                          <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 first:border-s-0 last:border-e-0 text-right bg-[#18325C]">السعر الإجمالي</th>
                          <th className="py-4 px-5 font-bold whitespace-nowrap text-center border-x border-border-gold/15 first:border-s-0 last:border-e-0 bg-[#18325C]">التفاصيل</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-gold/15 text-white bg-[#0F2342]/40">
                        {filteredProperties.map((property) => {
                          let typeLabel = '';
                          if (property.type === 'apartment') typeLabel = 'شقة';
                          else if (property.type === 'villa') typeLabel = 'فيلا';
                          else if (property.type === 'annex') typeLabel = 'ملحق';
                          else if (property.type === 'penthouse') typeLabel = 'بنتهاوس';
                          else if (property.type === 'duplex') typeLabel = 'دوبلكس';

                          return (
                            <tr key={property.id} className="odd:bg-[#0F2342]/40 even:bg-[#142B4E]/60 hover:bg-gold-primary/[0.08] transition-colors duration-150 border-b border-border-gold/10 last:border-b-0">
                              {/* Image */}
                              <td className="py-3 px-5 border-x border-border-gold/10 first:border-s-0 last:border-e-0 text-right">
                                <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-border-gold/20 shadow-sm shrink-0">
                                  <Image 
                                    src={property.media.thumbnail || '/properties/apartment.webp'} 
                                    alt={property.title}
                                    fill
                                    sizes="56px"
                                    className="object-cover"
                                  />
                                </div>
                              </td>

                              {/* Title */}
                              <td className="py-3 px-5 font-semibold border-x border-border-gold/10 first:border-s-0 last:border-e-0 text-right whitespace-nowrap">
                                <span className="font-bold text-white block">{property.title}</span>
                                <span className="text-[10px] text-text-muted block mt-0.5">{property.project.name}</span>
                              </td>

                              {/* Type */}
                              <td className="py-3 px-5 border-x border-border-gold/10 first:border-s-0 last:border-e-0 text-right whitespace-nowrap">
                                <span className="inline-block py-0.5 px-2.5 text-[11px] font-bold text-gold-light bg-gold-primary/[0.08] border border-gold-primary/20 rounded-full">
                                  {typeLabel}
                                </span>
                              </td>

                              {/* Location */}
                              <td className="py-3 px-5 text-text-secondary border-x border-border-gold/10 first:border-s-0 last:border-e-0 text-right whitespace-nowrap">
                                {property.location.city}، {property.location.district}
                              </td>

                              {/* Area */}
                              <td className="py-3 px-5 font-bold border-x border-border-gold/10 first:border-s-0 last:border-e-0 text-right whitespace-nowrap font-mono">
                                {new Intl.NumberFormat('en-US').format(property.specs.area)} م²
                              </td>

                              {/* Specs */}
                              <td className="py-3 px-5 text-text-secondary border-x border-border-gold/10 first:border-s-0 last:border-e-0 text-right whitespace-nowrap font-mono">
                                {property.specs.bedrooms} غرف / {property.specs.bathrooms} حمامات
                              </td>

                              {/* Price */}
                              <td className="py-3 px-5 font-bold text-gold-primary font-mono border-x border-border-gold/10 first:border-s-0 last:border-e-0 text-right whitespace-nowrap">
                                {new Intl.NumberFormat('en-US').format(property.pricing.price)} ر.س
                              </td>

                              {/* Details button */}
                              <td className="py-3 px-5 text-center border-x border-border-gold/10 first:border-s-0 last:border-e-0">
                                <Link
                                  href={`/property/${property.slug}`}
                                  className="py-1.5 px-5 text-xs font-bold btn-premium-gold rounded-md inline-block font-el-messiri whitespace-nowrap text-center"
                                >
                                  التفاصيل
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          ) : (
            /* Empty state */
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-bg-royal/10 border border-border-gold/15 rounded-3xl max-w-md mx-auto shadow-2xl backdrop-blur-md"
            >
              <Building className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-bold text-white font-el-messiri mb-2">لا توجد نتائج مطابقة</h3>
              <p className="text-xs text-text-secondary px-6 mb-6 leading-relaxed">
                لم نجد أي وحدات عقارية تطابق خيارات التصفية المحددة. يرجى تعديل خيارات البحث أو إعادة تعيين لوحة الفلاتر.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="py-3 px-8 text-xs font-bold btn-premium-gold rounded-xl flex items-center justify-center gap-1.5 mx-auto cursor-pointer font-el-messiri active:scale-95 transition-transform"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة تعيين لوحة الفلاتر</span>
              </button>
            </motion.div>
          )}
        </section>

      </div>
    </main>
  );
}
