'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Building, Layers, DollarSign, X } from 'lucide-react';
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

interface SearchBarSectionProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCity: string;
  setSelectedCity: (val: string) => void;
  selectedType: string;
  setSelectedType: (val: string) => void;
  selectedRooms: string;
  setSelectedRooms: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export default function SearchBarSection({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  selectedType,
  setSelectedType,
  selectedRooms,
  setSelectedRooms,
  maxPrice,
  setMaxPrice,
  handleSearch,
}: SearchBarSectionProps) {
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [isFiltersOpenComplete, setIsFiltersOpenComplete] = useState<boolean>(false);

  return (
    <section id="search-filter-section" className="relative z-40 w-[94%] sm:w-[92%] max-w-5xl mx-auto px-2 sm:px-4 -mt-[18vh] sm:-mt-28 lg:-mt-32">
      <form onSubmit={handleSearch} className="relative w-full">
        {/* Fully rounded (pill) glassmorphic search bar container */}
        <div className="p-1.5 sm:p-2.5 bg-white/10 backdrop-blur-xl border border-border-gold/30 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:border-border-gold/50 relative z-50 transition-all duration-300">
          <div className="w-full bg-bg-royal/40 border border-border-gold/25 rounded-full p-1.5 sm:p-2 flex items-center justify-between gap-2 shadow-inner">
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 min-w-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gold-primary shrink-0" />
              <input
                id="hero-search-input"
                type="text"
                placeholder="ابحث بالحي، اسم المشروع، أو المعالم..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder-white/40 font-sans text-start min-w-0 truncate"
              />
            </div>

            {/* Clear Query button */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-white/40 hover:text-white shrink-0 p-1.5 cursor-pointer transition-colors duration-200 min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center rounded-full"
                title="مسح البحث"
                aria-label="مسح حقل البحث"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Search Submit Button - Perfectly proportioned single line */}
            <button
              type="submit"
              className="h-[42px] px-4 sm:px-6 text-xs sm:text-sm font-extrabold btn-premium-gold shrink-0 flex items-center gap-1.5 cursor-pointer font-el-messiri rounded-full whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              <span>بحث</span>
            </button>

            {/* Advanced Filter Toggle Trigger Button */}
            <button
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer shrink-0 ${
                showMobileFilters
                  ? 'bg-gold-primary text-bg-midnight border-gold-primary shadow-lg shadow-gold-primary/20 scale-95'
                  : 'bg-white/[0.06] text-text-secondary border-border-gold/25 hover:border-gold-primary/40 hover:text-white'
              }`}
              title="تصفية متقدمة"
              aria-label="تصفية متقدمة"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
            </button>
          </div>
        </div>

        {/* Collapsible Advanced Filters Card */}
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
              className={`w-full mt-4 relative z-40 ${isFiltersOpenComplete ? 'overflow-visible' : 'overflow-hidden'}`}
            >
              <div className="p-5 sm:p-7 bg-bg-midnight/95 backdrop-blur-2xl border border-border-gold/35 rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                  {/* City */}
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

                  {/* Type */}
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

                  {/* Rooms */}
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

                  {/* Max Price */}
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

                  {/* Search & Apply CTA Button - Matches CustomSelect height (46px) & rounded style */}
                  <div className="space-y-1.5">
                    <span className="block text-xs font-bold text-transparent mb-2 hidden lg:block select-none pointer-events-none">&nbsp;</span>
                    <button
                      type="submit"
                      className="w-full h-[46px] text-xs sm:text-sm font-extrabold btn-premium-gold flex items-center justify-center gap-2 cursor-pointer font-el-messiri rounded-xl sm:rounded-2xl whitespace-nowrap shadow-md"
                    >
                      <Search className="w-4 h-4 shrink-0" />
                      <span>تطبيق الفلاتر</span>
                    </button>
                  </div>
                </div>

                {/* Reset filters */}
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
      </form>
    </section>
  );
}
