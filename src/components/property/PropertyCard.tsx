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

      {/* Thumbnail Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-deep">
        {/* Subtle overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 start-4 z-20">
          {renderStatusBadge(property.status)}
        </div>

        {/* Type tag overlay */}
        <div className="absolute bottom-4 start-4 z-20">
          <span className="px-2.5 py-1 text-[9px] font-extrabold text-white bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-md uppercase">
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
      <div className="flex flex-col flex-1 p-6 text-right">
        {/* Project Name */}
        <motion.div variants={itemVariants} className="flex items-center gap-1 mb-2 text-xs font-semibold text-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-primary"></span>
          <span>{property.project.name}</span>
        </motion.div>

        {/* Title */}
        <motion.h3 variants={itemVariants} className="text-sm sm:text-base font-extrabold text-text-primary mb-3 line-clamp-1 leading-snug hover-premium-gold">
          {property.title}
        </motion.h3>

        {/* Address / Location */}
        <motion.div variants={itemVariants} className="flex items-center gap-1.5 text-xs text-text-secondary mb-4">
          <MapPin className="w-3.5 h-3.5 text-gold-primary shrink-0" />
          <span className="line-clamp-1">{property.location.district}، {property.location.city}</span>
        </motion.div>

        {/* Key Specs Icons (Glass Theme styled) */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2 py-3 px-2 rounded-xl bg-white/[0.04] border border-white/10 mb-5 text-xs text-text-secondary">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-[10px] text-text-muted uppercase">الغرف</span>
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-gold-primary" />
              <span className="font-bold text-text-primary font-mono">{property.specs.bedrooms}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 border-x border-white/10">
            <span className="text-[10px] text-text-muted uppercase">الحمامات</span>
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-gold-primary" />
              <span className="font-bold text-text-primary font-mono">{property.specs.bathrooms}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-[10px] text-text-muted uppercase">المساحة</span>
            <div className="flex items-center gap-1">
              <Ruler className="w-3.5 h-3.5 text-gold-primary" />
              <span className="font-bold text-text-primary font-mono">{formatArea(property.specs.area)}</span>
            </div>
          </div>
        </motion.div>

        {/* Financial Values */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
          <div>
            <p className="text-[9px] text-text-muted uppercase mb-0.5">السعر الإجمالي</p>
            <p className="text-lg font-extrabold text-gold-primary font-el-messiri">
              {formatPrice(property.pricing.price)}
            </p>
          </div>
          {property.pricing.monthlyInstallment && (
            <div className="text-end">
              <p className="text-[9px] text-text-muted uppercase mb-0.5">قسط شهري متوقع</p>
              <p className="text-sm font-bold text-text-primary font-mono">
                {new Intl.NumberFormat('en-US').format(property.pricing.monthlyInstallment)} ر.س
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Card Footer - Single Premium Details Button */}
      <motion.div variants={itemVariants} className="border-t border-white/10 p-4 bg-white/[0.02]">
        <Link
          href={`/property/${property.slug}`}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-extrabold text-gold-primary bg-gold-primary/[0.08] border border-gold-primary/25 rounded-xl hover:bg-gold-primary hover:text-bg-midnight transition-all duration-300 hover:shadow-[0_8px_24px_rgba(201,169,110,0.2)] active:scale-[0.97] cursor-pointer group/btn"
        >
          <span>عرض التفاصيل</span>
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-1" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
