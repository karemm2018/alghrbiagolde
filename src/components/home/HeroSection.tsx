'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

const HERO_IMAGES = [
  '/hero-bg-3.webp',
  '/hero-bg-luxury.webp',
  '/hero-bg-2.webp',
];

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [animateZoom, setAnimateZoom] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setAnimateZoom(false);
    const zoomTimeout = setTimeout(() => {
      setAnimateZoom(true);
    }, 100);
    return () => clearTimeout(zoomTimeout);
  }, [currentHeroIndex]);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.05 : 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center bg-bg-deep overflow-hidden">
      {/* Dark luxury fallback background & radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-deep/15 via-bg-midnight/70 to-bg-midnight/90 z-0"></div>

      {/* Slideshow background images */}
      {HERO_IMAGES.map((imgSrc, index) => (
        <div
          key={imgSrc}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out z-0 ${
            index === currentHeroIndex ? 'opacity-75' : 'opacity-0'
          }`}
        >
          <Image
            src={imgSrc}
            alt={`خلفية الهيكل الفخم ${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover transition-transform duration-[6500ms] ease-luxury ${
              index === currentHeroIndex && animateZoom && !shouldReduceMotion ? 'scale-[1.08]' : 'scale-100'
            }`}
          />
        </div>
      ))}

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-midnight/85 via-transparent to-transparent z-10"></div>

      {/* Hero Content - Fluid Clamp Typography with padding for elevated search bar */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.25 } }
        }}
        className="relative max-w-5xl w-[92%] mx-auto text-center z-20 flex flex-col items-center justify-center px-4 pb-16 sm:pb-24 pt-12"
      >
        <motion.h1
          variants={fadeUpVariants}
          whileHover={shouldReduceMotion ? {} : { scale: 1.015 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="font-el-messiri leading-[1.4] drop-shadow-[0_6px_30px_rgba(0,0,0,0.6)] cursor-default select-none group"
        >
          <span className="block text-[#F5E6C8] font-bold mb-3 sm:mb-6 [text-shadow:0_2px_20px_rgba(245,230,200,0.25)] transition-all duration-500 group-hover:text-white text-[clamp(1.75rem,5.5vw,4.5rem)]">
            نعتمد أحدث التقنيات
          </span>
          <span className="block text-white font-semibold [text-shadow:0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:text-gold-light text-[clamp(0.95rem,2.2vw,2.25rem)]">
            لنربطكم بأفضل الفرص السكنية والاستثمارية
          </span>
        </motion.h1>
      </motion.div>
    </section>
  );
}
