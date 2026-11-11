// src/components/property/PropertyCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Property } from '@/lib/mockData';
import { Bed, Bath, Ruler, MapPin, ArrowLeft } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function PropertyCard({ property }: PropertyCardProps) {
  // Format currency with English numerals
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(price) + ' ر.س';
  };

  // Format area with English numerals
  const formatArea = (area: number) => {
    return `${new Intl.NumberFormat('en-US').format(area)} م²`;
  };

  // Get realistic property image based on type
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

  // Translate status badge
  const renderStatusBadge = (status: Property['status']) => {
    switch (status) {
      case 'available':
        return (
          <span className="px-3 py-1 text-[10px] font-extrabold text-white bg-status-available border border-status-available rounded-full shadow-[0_4px_12px_rgba(34,169,110,0.3)]">
            متاح للبيع
          </span>
        );
      case 'reserved':
        return (
          <span className="px-3 py-1 text-[10px] font-extrabold text-white bg-status-reserved border border-status-reserved rounded-full shadow-[0_4px_12px_rgba(212,136,58,0.3)]">
            محجوز
          </span>
        );
      case 'sold':
        return (
          <span className="px-3 py-1 text-[10px] font-extrabold text-white bg-status-sold border border-status-sold rounded-full shadow-[0_4px_12px_rgba(192,57,43,0.3)]">
            مباع
          </span>
        );
      case 'coming_soon':
        return (
          <span className="px-3 py-1 text-[10px] font-extrabold text-white bg-status-soon border border-status-soon rounded-full shadow-[0_4px_12px_rgba(36,112,194,0.3)]">
            قريباً
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="group relative flex flex-col h-full bg-bg-navy/45 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/22 transition-all duration-500 shadow-[0_12px_36px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:border-white/35 hover:bg-bg-navy/60 hover:shadow-[0_24px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.08)]"
    >
      {/* Top Gold Shimmer Bar */}
      <div className="absolute top-0 start-0 w-full h-[2.5px] bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

      {/* Thumbnail Image Container (Cinematic 16/10 ratio to optimize card height) */}
      <div className="relative aspect-[16/10] rounded-t-2xl overflow-hidden bg-bg-deep shrink-0">
        {/* Subtle overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10 pointer-events-none"></div>
        
        {/* Location Tag Badge inside image (Top Right in RTL) */}
        <div className="absolute top-3 start-3 z-20 flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold text-white bg-slate-900/85 backdrop-blur-md border border-white/15 rounded-full shadow-md max-w-[65%]">
          <MapPin className="w-3 h-3 text-gold-primary shrink-0" />
          <span className="truncate">{property.location.district}، {property.location.city}</span>
        </div>

        {/* Status Badge (Top Left in RTL) */}
        <div className="absolute top-3 end-3 z-20">
          {renderStatusBadge(property.status)}
        </div>

        {/* Type tag overlay (Bottom Right in RTL) */}
        <div className="absolute bottom-3 start-3 z-20">
          <span className="px-2.5 py-1 text-[9px] font-extrabold text-white bg-slate-900/85 backdrop-blur-md border border-white/10 rounded-md uppercase">
            {property.type === 'annex' ? 'ملحق روف' : property.type === 'villa' ? 'فيلا مستقلة' : property.type === 'penthouse' ? 'بنتهاوس' : 'شقة سكنية'}
          </span>
        </div>

        {/* Premium Image with slow pan/scale effect on hover */}
        <Image 
          src={getPropertyImage(property.type)} 
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[6000ms] ease-luxury group-hover:scale-112 z-0"
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4 text-right justify-between min-w-0">
        <div>
          {/* Project Name */}
          <motion.div variants={itemVariants} className="flex items-center gap-1 mb-1 text-[11px] font-semibold text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-primary"></span>
            <span>{property.project.name}</span>
          </motion.div>

          {/* Title */}
          <motion.h3 variants={itemVariants} className="text-sm sm:text-base font-extrabold text-text-primary mb-2.5 line-clamp-1 leading-snug hover-premium-gold">
            {property.title}
          </motion.h3>

          {/* Key Specs Icons (Always 3 columns in a single compact row) */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-1 py-1.5 px-1 sm:px-2 rounded-xl bg-white/[0.04] border border-white/10 mb-3 text-[11px] text-text-secondary">
            <div className="flex flex-col items-center justify-center gap-0.5 text-center min-w-0">
              <span className="text-[9px] text-text-muted uppercase">الغرف</span>
              <div className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-gold-primary shrink-0" />
                <span className="font-bold text-text-primary font-mono text-xs">{property.specs.bedrooms}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-0.5 text-center border-x border-white/10 min-w-0">
              <span className="text-[9px] text-text-muted uppercase">الحمامات</span>
              <div className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-gold-primary shrink-0" />
                <span className="font-bold text-text-primary font-mono text-xs">{property.specs.bathrooms}</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-0.5 text-center min-w-0">
              <span className="text-[9px] text-text-muted uppercase">المساحة</span>
              <div className="flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5 text-gold-primary shrink-0" />
                <span className="font-bold text-text-primary font-mono text-xs">{formatArea(property.specs.area)}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row: Price and Button ALWAYS in one single horizontal row */}
        <motion.div variants={itemVariants} className="border-t border-white/10 pt-2.5 mt-auto flex items-center justify-between gap-2 min-w-0">
          <div className="text-right min-w-0">
            <span className="text-[9px] text-text-muted block leading-none mb-1">السعر الإجمالي</span>
            <span className="text-xs sm:text-sm lg:text-base font-extrabold text-gold-primary font-el-messiri whitespace-nowrap leading-none block">
              {formatPrice(property.pricing.price)}
            </span>
          </div>
          <Link
            href={`/property/${property.slug}`}
            className="shrink-0 flex items-center justify-center gap-1.5 py-1.5 px-3 sm:px-3.5 text-xs font-bold btn-premium-gold rounded-xl cursor-pointer font-el-messiri transition-all hover:scale-102 active:scale-98 shadow-md"
          >
            <span>عرض التفاصيل</span>
            <ArrowLeft className="w-3 h-3 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
