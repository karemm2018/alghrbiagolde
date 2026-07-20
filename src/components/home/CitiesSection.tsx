'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Property } from '@/lib/mockData';

interface CitiesSectionProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  properties: Property[];
}

export default function CitiesSection({ selectedCity, setSelectedCity, properties }: CitiesSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.05 : 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const getCityCount = (city: string) => {
    return properties.filter(p => p.location.city === city).length;
  };

  const CITIES = [
    {
      id: 'جدة',
      name: 'جدة',
      subtitle: 'عروس البحر الأحمر',
      image: '/cities/jeddah.webp',
      alt: 'واجهة مدينة جدة',
      count: getCityCount('جدة'),
      delay: 0,
    },
    {
      id: 'الرياض',
      name: 'الرياض',
      subtitle: 'عاصمة الحداثة والفرص',
      image: '/cities/riyadh.webp',
      alt: 'أبراج مدينة الرياض',
      count: getCityCount('الرياض'),
      delay: 0.1,
    },
    {
      id: 'مكه',
      name: 'مكة المكرمة',
      subtitle: 'قبلة العالم وبوابة الإيمان',
      image: '/cities/makkah.webp',
      alt: 'المسجد الحرام بمكة المكرمة',
      count: getCityCount('مكه'),
      delay: 0.2,
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-bg-deep via-bg-navy to-bg-deep border-t border-border-gold/15 pt-28 sm:pt-36 lg:pt-40 pb-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.span variants={fadeUpVariants} className="inline-block py-1.5 px-4 text-xs sm:text-sm font-extrabold text-gold-primary bg-gold-primary/10 border border-gold-primary/30 rounded-full uppercase mb-3.5 tracking-wider">
            وجهاتنا الرئيسية
          </motion.span>
          <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-text-primary mb-3 liquid-gold-heading">
            اختر وجهتك المفضلة في المملكة
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-xs sm:text-sm text-text-secondary max-w-xl mx-auto">
            نساعدك على امتلاك منزل أحلامك في أرقى أحياء المدن الرئيسية
          </motion.p>
        </motion.div>

        {/* Responsive Grid: Single column on small mobile, 3 columns on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {CITIES.map((city) => {
            const isSelected = selectedCity === city.id;
            return (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: city.delay }}
                className={`group relative h-44 sm:h-56 md:h-72 rounded-2xl overflow-hidden border cursor-pointer transition-all duration-500 ${
                  isSelected
                    ? 'ring-2 ring-gold-primary/70 border-gold-primary scale-[1.02] shadow-[0_0_20px_rgba(201,169,110,0.3)] z-20'
                    : selectedCity !== 'all'
                    ? 'opacity-40 scale-95 border-border-gold/10'
                    : 'border-border-gold/20 hover:border-gold-primary/50'
                }`}
                onClick={() => setSelectedCity(isSelected ? 'all' : city.id)}
              >
                {/* Selection Indicator Badge */}
                {isSelected && (
                  <span className="absolute top-3 end-3 z-30 bg-gold-primary text-bg-midnight p-1.5 rounded-full shadow-lg border border-gold-light/20 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-bg-midnight stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}

                {/* Golden luxury overlay */}
                <div className={`absolute inset-0 bg-gold-primary/5 transition-opacity duration-500 z-15 ${isSelected ? 'opacity-100' : 'opacity-0'}`}></div>

                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/95 via-bg-deep/30 to-transparent z-10"></div>
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src={city.image}
                    alt={city.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/20 to-bg-deep/40"></div>
                </div>

                <div className="absolute bottom-4 start-4 sm:bottom-6 sm:start-6 z-20 text-start">
                  <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-white mb-1 font-el-messiri">{city.name}</h3>
                  <p className="text-xs text-gold-light font-semibold uppercase tracking-wider">{city.subtitle}</p>
                  <p className="text-xs text-white/70 font-bold mt-1.5 font-mono">
                    {city.count} عقار متاح
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
