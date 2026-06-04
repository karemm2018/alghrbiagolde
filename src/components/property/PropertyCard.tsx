// src/components/property/PropertyCard.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Property } from '@/lib/mockData';
import { Bed, Bath, Ruler, MapPin, Phone, MessageCircle, X } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onOpenCalculator?: (property: Property) => void;
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

export default function PropertyCard({ property, onOpenCalculator }: PropertyCardProps) {
  const [showCallModal, setShowCallModal] = useState(false);

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

  const whatsappMessage = encodeURIComponent(
    `مرحباً، أنا مهتم بعقار: [ ${property.title} ] المعروض بسعر ${formatPrice(property.pricing.price)}. أرجو تزويدي بمزيد من التفاصيل.`
  );

  return (
    <>
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="group relative flex flex-col h-full bg-bg-navy/45 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/22 transition-all duration-500 shadow-[0_12px_36px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:border-white/35 hover:bg-bg-navy/60 hover:shadow-[0_24px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.08)] cursor-pointer"
        onClick={() => onOpenCalculator?.(property)}
      >
        {/* Top Gold Shimmer Bar */}
        <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

        {/* Thumbnail Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-bg-deep">
          {/* Subtle overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10"></div>
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4 z-20">
            {renderStatusBadge(property.status)}
          </div>

          {/* Type tag overlay */}
          <div className="absolute bottom-4 right-4 z-20">
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
          {/* Project & Code Tag */}
          <motion.div variants={itemVariants} className="flex justify-between items-center mb-2 text-xs font-semibold text-text-muted">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-primary"></span>
              {property.project.name}
            </span>
            <span className="text-[10px] font-mono text-gold-light bg-gold-primary/10 px-2 py-0.5 rounded border border-border-gold/20">
              Ref: {property.slug.split('-')[0].toUpperCase()}
            </span>
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
              <p className="text-lg font-extrabold text-gold-primary font-cairo">
                {formatPrice(property.pricing.price)}
              </p>
            </div>
            {property.pricing.monthlyInstallment && (
              <div className="text-left">
                <p className="text-[9px] text-text-muted uppercase mb-0.5">قسط شهري متوقع</p>
                <p className="text-sm font-bold text-text-primary font-mono">
                  {new Intl.NumberFormat('en-US').format(property.pricing.monthlyInstallment)} ر.س
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Card Footer (Actions) */}
        <motion.div variants={itemVariants} className="flex border-t border-white/10 p-4 gap-3 bg-white/[0.02]" onClick={(e) => e.stopPropagation()}>
          {/* Call button (Solid Red, Grow Hover) */}
          <button 
            type="button"
            className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 text-xs font-extrabold text-white bg-status-sold border border-status-sold rounded-full shadow-[0_4px_10px_rgba(192,57,43,0.15)] hover:bg-status-sold/90 hover:border-status-sold/90 transition-all duration-300 hover:scale-[1.08] hover:shadow-[0_8px_20px_rgba(192,57,43,0.35)] active:scale-[0.96] cursor-pointer"
            onClick={() => setShowCallModal(true)}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>اتصال</span>
          </button>

          {/* Whatsapp button (Solid Green, Grow Hover) */}
          <a
            href={`https://api.whatsapp.com/send?phone=966558837846&text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 text-xs font-extrabold text-white bg-status-available border border-status-available rounded-full shadow-[0_4px_10px_rgba(34,169,110,0.15)] hover:bg-status-available/90 hover:border-status-available/90 transition-all duration-300 text-center hover:scale-[1.08] hover:shadow-[0_8px_20px_rgba(34,169,110,0.35)] active:scale-[0.96] cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>واتساب</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Call Dialog Popup Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-midnight/80 backdrop-blur-md animate-fade-in">
          <div 
            className="relative w-full max-w-md bg-bg-royal rounded-2xl border border-border-gold shadow-2xl p-6 text-right animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button 
              type="button" 
              className="absolute top-4 left-4 p-1.5 text-text-muted hover:text-white bg-bg-navy/80 hover:bg-bg-navy rounded-full border border-border-white/10 transition-colors duration-200 cursor-pointer"
              onClick={() => setShowCallModal(false)}
              aria-label="إغلاق"
              title="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <h4 className="text-lg font-bold text-text-primary mb-4 pb-2 border-b border-border-white/10">
              تفاصيل التواصل والاستفسار
            </h4>

            {/* Content */}
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              يسعدنا استفسارك عن عقار <strong className="text-text-gold">{property.title}</strong>.<br />
              الرجاء الاتصال بفريق المبيعات مباشرة وذكر مرجع العقار لتسهيل خدمتك.
            </p>

            {/* Property Reference Info */}
            <div className="bg-bg-navy/60 border border-border-blue/10 rounded-xl p-4 mb-6">
              <p className="text-xs text-text-muted mb-1">الرقم المرجعي للعقار:</p>
              <p className="text-sm font-mono font-bold text-brand-light">{property.slug}</p>
            </div>

            {/* Direct Call Button */}
            <div className="flex gap-3">
              <a 
                href="tel:0558837846" 
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-gold-primary hover:bg-gold-warm border border-gold-primary rounded-xl shadow-lg shadow-gold-primary/10 transition-all duration-200 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>اتصل الآن: 0558837846</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
