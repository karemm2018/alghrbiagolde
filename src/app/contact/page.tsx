// src/app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Building,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Send,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  ArrowUpLeft,
  Navigation,
  User,
  HelpCircle
} from 'lucide-react';
import { useInquiryStore } from '../../store/useInquiryStore';

export default function ContactPage() {
  const openInquiry = useInquiryStore((state) => state.open);

  // Form States
  const [residentType, setResidentType] = useState<'citizen' | 'resident'>('citizen');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Active Branch Switcher State
  const [activeBranch, setActiveBranch] = useState<'jeddah' | 'riyadh'>('jeddah');

  // Stagger entry animations
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Submit Handler for contact form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    // Simulate API request
    setTimeout(() => {
      setIsSending(false);
      setFormSuccess(true);
      // Reset form fields
      setResidentType('citizen');
      setName('');
      setPhone('');
      setEmail('');
      setSubject('general');
      setMessage('');
      
      // Auto dismiss success screen after 4 seconds
      setTimeout(() => {
        setFormSuccess(false);
      }, 4000);
    }, 1800);
  };

  return (
    <div className="bg-[#060D1A] text-white min-h-screen relative overflow-x-hidden font-sans select-none dir-rtl bg-[linear-gradient(rgba(201,169,110,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,110,0.015)_1px,transparent_1px)] bg-[size:50px_50px]">
      
      {/* Static Glowing spots - radial gradient, zero CPU overhead (no keyframe animations) */}
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-gold-primary/8 to-transparent rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-brand-primary/8 to-transparent rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* ----------------------------------------------------
         1. Parallax Luxury Hero Banner
         ---------------------------------------------------- */}
      <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Background Image - Priority loaded & optimized */}
        <Image
          src="/hero-bg-3.webp"
          alt="شركة الغربية الذهبية للتطوير العقاري"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark Luxury Gradient Overlay - Lightened for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060D1A]/20 via-[#060D1A]/55 to-[#060D1A] z-10" />

        {/* Content on Top */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-12 sm:mt-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block py-1.5 px-4 text-[9px] sm:text-[10px] font-extrabold text-gold-primary bg-gold-primary/10 border border-gold-primary/30 rounded-full uppercase tracking-wider mb-4"
          >
            الريادة والخدمة الاستثنائية
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight font-el-messiri"
          >
            قنوات الاتصال المباشر لـ <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-gold-light via-gold-primary to-gold-warm bg-clip-text text-transparent font-black">نخبة المستثمرين العقاريين</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed mt-4 font-sans"
          >
            نقدّم تجربة استشارية متكاملة تتوافق مع تطلعاتكم. تواصلوا معنا مباشرة عبر قنوات الاتصال الهاتفي والمراسلة الرقمية.
          </motion.p>
        </div>
      </section>

      {/* ----------------------------------------------------
         2. Main Content: Form & Corporate Branches Info
         ---------------------------------------------------- */}
      <section className="py-12 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-12 items-stretch">
          
          {/* Right Column: Luxury Message Form (Col span 7) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpVariants}
            className="lg:col-span-7"
          >
            <div className="p-5 sm:p-8 bg-[#FAF8F5] border border-gold-primary/35 rounded-[2.5rem] shadow-[0_30px_70px_rgba(201,169,110,0.12)] h-full flex flex-col justify-between relative overflow-hidden group">
              {/* Metallic Gold Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-primary/5 to-transparent blur-2xl pointer-events-none rounded-full" />
              
              <AnimatePresence mode="wait">
                {!formSuccess ? (
                  <motion.div
                    key="contact-form"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.05 } }
                    }}
                  >
                    <motion.h3 
                      variants={fadeUpVariants}
                      className="text-lg sm:text-xl font-bold text-[#060D1A] mb-2 font-el-messiri text-right"
                    >
                      إرسال استفسار استثماري
                    </motion.h3>
                    <motion.p 
                      variants={fadeUpVariants}
                      className="text-[11px] sm:text-xs text-slate-500 mb-5 leading-relaxed text-right"
                    >
                      يرجى تعبئة الحقول وسيقوم مستشارنا العقاري المعتمد بالتواصل معكم في غضون 24 ساعة لتقديم الاستشارة اللازمة.
                    </motion.p>

                    <form onSubmit={handleContactSubmit} className="space-y-3.5">
                      {/* Resident / Citizen Selection */}
                      <motion.div variants={fadeUpVariants} className="text-right">
                        <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                          الصفة
                        </span>
                        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-200/40 border border-slate-200/60 rounded-xl">
                          <button
                            type="button"
                            onClick={() => setResidentType('citizen')}
                            className={`py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 font-el-messiri cursor-pointer text-center ${
                              residentType === 'citizen'
                                ? 'bg-white text-gold-deep border border-slate-200/30 shadow-sm font-extrabold'
                                : 'text-slate-500 hover:text-slate-800 bg-transparent'
                            }`}
                          >
                            مواطن
                          </button>
                          <button
                            type="button"
                            onClick={() => setResidentType('resident')}
                            className={`py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 font-el-messiri cursor-pointer text-center ${
                              residentType === 'resident'
                                ? 'bg-white text-gold-deep border border-slate-200/30 shadow-sm font-extrabold'
                                : 'text-slate-500 hover:text-slate-800 bg-transparent'
                            }`}
                          >
                            مقيم
                          </button>
                        </div>
                      </motion.div>

                      {/* Name input */}
                      <motion.div variants={fadeUpVariants} className="text-right">
                        <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                          الاسم بالكامل
                        </label>
                        <div className="relative text-slate-400/80 focus-within:text-gold-primary transition-colors duration-300">
                          <User className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                          <input
                            id="contact-name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white border border-slate-200/80 focus:border-gold-primary focus:bg-white rounded-xl ps-10 pe-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-gold-primary/40 transition-all duration-300"
                            placeholder="الاسم الثلاثي للمستثمر"
                          />
                        </div>
                      </motion.div>

                      {/* Grid: Phone & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <motion.div variants={fadeUpVariants} className="text-right">
                          <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                            رقم الجوال
                          </label>
                          <div className="relative text-slate-400/80 focus-within:text-gold-primary transition-colors duration-300">
                            <Phone className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                            <input
                              id="contact-phone"
                              type="tel"
                              required
                              pattern="^(05|009665|\+9665)\d{8}$"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full bg-white border border-slate-200/80 focus:border-gold-primary focus:bg-white rounded-xl ps-10 pe-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-gold-primary/40 transition-all duration-300 text-left font-mono"
                              placeholder="05xxxxxxxx"
                            />
                          </div>
                        </motion.div>

                        <motion.div variants={fadeUpVariants} className="text-right">
                          <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                            البريد الإلكتروني (اختياري)
                          </label>
                          <div className="relative text-slate-400/80 focus-within:text-gold-primary transition-colors duration-300">
                            <Mail className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                            <input
                              id="contact-email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-white border border-slate-200/80 focus:border-gold-primary focus:bg-white rounded-xl ps-10 pe-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-gold-primary/40 transition-all duration-300 text-left font-mono"
                              placeholder="username@domain.com"
                            />
                          </div>
                        </motion.div>
                      </div>

                      {/* Dropdown / Subject */}
                      <motion.div variants={fadeUpVariants} className="text-right">
                        <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 mb-1.5">
                          موضوع الاستفسار
                        </label>
                        <div className="relative text-slate-400/80 focus-within:text-gold-primary transition-colors duration-300">
                          <HelpCircle className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                          <select
                            id="contact-subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full bg-white border border-slate-200/80 focus:border-gold-primary focus:bg-white rounded-xl ps-10 pe-10 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-gold-primary/40 transition-all duration-300 appearance-none cursor-pointer font-el-messiri"
                          >
                            <option value="general" className="bg-white text-slate-800">استفسار عام</option>
                            <option value="buy" className="bg-white text-slate-800">شراء وحدة سكنية فاخرة</option>
                            <option value="invest" className="bg-white text-slate-800">فرص ومشاريع استثمارية</option>
                            <option value="visit" className="bg-white text-slate-800">طلب حجز موعد معاينة ميدانية</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gold-primary">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>

                      {/* Message body */}
                      <motion.div variants={fadeUpVariants} className="text-right">
                        <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1.5">
                          تفاصيل الرسالة الاستثمارية
                        </label>
                        <div className="relative text-slate-400/80 focus-within:text-gold-primary transition-colors duration-300">
                          <MessageCircle className="absolute start-3.5 top-3.5 w-4 h-4 pointer-events-none" />
                          <textarea
                            id="contact-message"
                            required
                            rows={3}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-white border border-slate-200/80 focus:border-gold-primary focus:bg-white rounded-xl ps-10 pe-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-gold-primary/40 transition-all duration-300 resize-none"
                            placeholder="اكتب استفسارك بالتفصيل للمشروع أو المواصفات..."
                          />
                        </div>
                      </motion.div>

                      {/* Submit Button */}
                      <motion.div variants={fadeUpVariants} className="pt-2">
                        <button
                          type="submit"
                          disabled={isSending}
                          className="w-full py-3 px-6 rounded-full text-xs sm:text-sm font-extrabold btn-premium-gold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 font-el-messiri disabled:opacity-50 shadow-md"
                        >
                          {isSending ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-bg-midnight" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              <span>جاري إرسال طلبكم...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 shrink-0" />
                              <span>إرسال الرسالة الاستثمارية</span>
                            </>
                          )}
                        </button>
                      </motion.div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-gold-primary/10 border-2 border-gold-primary flex items-center justify-center shadow-lg shadow-gold-primary/5">
                      <CheckCircle className="w-10 h-10 text-gold-primary" />
                    </div>
                    
                    <div className="space-y-2 max-w-md">
                      <h4 className="text-xl sm:text-2xl font-extrabold text-[#060D1A] font-el-messiri">
                        تم استلام رسالتكم بنجاح
                      </h4>
                      <p className="text-xs sm:text-sm text-gold-deep font-semibold">
                        رقم المتابعة الخاص بطلبكم: <span className="font-mono text-slate-800">#AG-{Math.floor(1000 + Math.random() * 9000)}</span>
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed pt-2">
                        نشكر اهتمامكم بشركة الغربية الذهبية. تم توجيه رسالتكم للقسم المعني وسيتواصل معكم المستشار الاستثماري المختص عبر الهاتف أو الواتساب خلال ساعات معدودة.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Left Column: Branch Switcher, Details, Map (Unified Premium Card) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpVariants}
            className="lg:col-span-5"
          >
            <div className="p-6 sm:p-8 bg-[#FAF8F5] border border-gold-primary/35 rounded-[2.5rem] shadow-[0_30px_70px_rgba(201,169,110,0.12)] h-full flex flex-col justify-between gap-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-primary/5 to-transparent blur-2xl pointer-events-none rounded-full" />
              
              {/* Switcher & Header */}
              <div className="space-y-4">
                <motion.h3 
                  variants={fadeUpVariants}
                  className="text-xs font-extrabold text-gold-primary uppercase tracking-wider font-serif text-right"
                >
                  CORPORATE OFFICES / مكاتبنا وفروعنا
                </motion.h3>
                
                <motion.div 
                  variants={fadeUpVariants}
                  className="grid grid-cols-2 gap-2 p-1 bg-slate-200/50 border border-slate-200/80 rounded-full"
                >
                  <button
                    type="button"
                    onClick={() => setActiveBranch('jeddah')}
                    className={`py-2 rounded-full text-xs font-bold transition-all duration-300 font-el-messiri cursor-pointer ${
                      activeBranch === 'jeddah'
                        ? 'btn-premium-gold shadow-md shadow-gold-primary/10'
                        : 'text-slate-600 hover:text-[#060D1A] bg-transparent'
                    }`}
                  >
                    المركز الرئيسي (جدة)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveBranch('riyadh')}
                    className={`py-2 rounded-full text-xs font-bold transition-all duration-300 font-el-messiri cursor-pointer ${
                      activeBranch === 'riyadh'
                        ? 'btn-premium-gold shadow-md shadow-gold-primary/10'
                        : 'text-slate-600 hover:text-[#060D1A] bg-transparent'
                    }`}
                  >
                    فرع نجد (الرياض)
                  </button>
                </motion.div>
              </div>

              <div className="flex-1 flex flex-col justify-center min-h-[220px]">
                <AnimatePresence mode="wait">
                  {activeBranch === 'jeddah' ? (
                    <motion.div
                      key="jeddah-branch"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                      }}
                      className="space-y-5 text-right"
                    >
                      <motion.div variants={fadeUpVariants} className="flex items-center gap-2 pb-2 border-b border-slate-200">
                        <Building className="w-5 h-5 text-gold-primary shrink-0" />
                        <h4 className="font-bold text-[#060D1A] text-base font-el-messiri">المركز الرئيسي - جدة</h4>
                      </motion.div>
                      
                      <div className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                        <motion.p variants={fadeUpVariants} className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-gold-primary shrink-0 mt-0.5" />
                          <span>برج الغربية الذهبية، حي الروضة، طريق الملك عبد العزيز، جدة</span>
                        </motion.p>
                        <motion.p variants={fadeUpVariants} className="flex items-center gap-2.5">
                          <Phone className="w-4 h-4 text-gold-primary shrink-0" />
                          <span className="font-mono" dir="ltr">+966 12 600 0000</span>
                        </motion.p>
                        <motion.p variants={fadeUpVariants} className="flex items-center gap-2.5">
                          <Mail className="w-4 h-4 text-gold-primary shrink-0" />
                          <span className="font-mono text-xs">jeddah@alghrbiagolden.com</span>
                        </motion.p>
                        <motion.p variants={fadeUpVariants} className="flex items-center gap-2.5">
                          <Clock className="w-4 h-4 text-gold-primary shrink-0" />
                          <span>الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً</span>
                        </motion.p>
                      </div>

                      <motion.div variants={fadeUpVariants} className="pt-2 flex flex-wrap gap-3">
                        <a
                          href="tel:+966126000000"
                          className="py-2.5 px-5 btn-premium-gold text-xs font-bold rounded-full flex items-center gap-2 transition-all shadow-sm"
                        >
                          <Phone className="w-3.5 h-3.5" /> اتصل بنا
                        </a>
                        <a
                          href="https://wa.me/966558837846"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-5 border border-slate-200 hover:border-gold-primary bg-white hover:bg-gold-primary/10 text-slate-700 hover:text-gold-deep rounded-full text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> مراسلة فورية
                        </a>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="riyadh-branch"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                      }}
                      className="space-y-5 text-right"
                    >
                      <motion.div variants={fadeUpVariants} className="flex items-center gap-2 pb-2 border-b border-slate-200">
                        <Building className="w-5 h-5 text-gold-primary shrink-0" />
                        <h4 className="font-bold text-[#060D1A] text-base font-el-messiri">مكتب فرع الرياض</h4>
                      </motion.div>
                      
                      <div className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                        <motion.p variants={fadeUpVariants} className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-gold-primary shrink-0 mt-0.5" />
                          <span>برج الفيصلية، الطابق 18، طريق الملك فهد، العليا، الرياض</span>
                        </motion.p>
                        <motion.p variants={fadeUpVariants} className="flex items-center gap-2.5">
                          <Phone className="w-4 h-4 text-gold-primary shrink-0" />
                          <span className="font-mono" dir="ltr">+966 11 400 0000</span>
                        </motion.p>
                        <motion.p variants={fadeUpVariants} className="flex items-center gap-2.5">
                          <Mail className="w-4 h-4 text-gold-primary shrink-0" />
                          <span className="font-mono text-xs">riyadh@alghrbiagolden.com</span>
                        </motion.p>
                        <motion.p variants={fadeUpVariants} className="flex items-center gap-2.5">
                          <Clock className="w-4 h-4 text-gold-primary shrink-0" />
                          <span>الأحد - الخميس: 9:00 صباحاً - 5:00 مساءً</span>
                        </motion.p>
                      </div>

                      <motion.div variants={fadeUpVariants} className="pt-2 flex flex-wrap gap-3">
                        <a
                          href="tel:+966114000000"
                          className="py-2.5 px-5 btn-premium-gold text-xs font-bold rounded-full flex items-center gap-2 transition-all shadow-sm"
                        >
                          <Phone className="w-3.5 h-3.5" /> اتصل بنا
                        </a>
                        <a
                          href="https://wa.me/966558837846"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-5 border border-slate-200 hover:border-gold-primary bg-white hover:bg-gold-primary/10 text-slate-700 hover:text-gold-deep rounded-full text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> مراسلة فورية
                        </a>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* HQ Building Showcase & Google Maps Link (Docked at the bottom) */}
              <motion.div 
                variants={fadeUpVariants}
                className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-4 items-center"
              >
                {/* Thumbnail of HQ Building */}
                <div className="relative w-full sm:w-20 h-20 rounded-xl overflow-hidden border border-gold-primary/20 shrink-0 shadow-sm">
                  <Image
                    src="/projects/villa_3d_render.webp"
                    alt="مقر المركز الرئيسي"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-right flex-1 space-y-1">
                  <h4 className="font-extrabold text-[#060D1A] text-xs sm:text-sm font-el-messiri">موقع المركز الرئيسي</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                    برج الغربية الذهبية، طريق الملك عبد العزيز، جدة.
                  </p>
                  <div className="pt-1">
                    <a
                      href="https://maps.google.com/?q=Al+Ghrbia+Golden+Jeddah"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gold-primary hover:text-gold-light text-[10px] font-extrabold transition-colors font-el-messiri"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>عرض الاتجاهات على خرائط Google</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------
         3. Social Media Grid Section (Premium Glass Cards)
         ---------------------------------------------------- */}
      <section className="py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="flex flex-col items-center text-center mb-12"
        >
          <motion.span variants={fadeUpVariants} className="inline-block py-1.5 px-4 text-[10px] font-extrabold text-gold-primary bg-gold-primary/10 border border-gold-primary/30 rounded-full uppercase tracking-widest mb-3">
            منصاتنا الرقمية
          </motion.span>
          <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-white leading-tight font-el-messiri">
            تواصل معنا عبر شبكاتنا الاجتماعية
          </motion.h2>
          <motion.div variants={fadeUpVariants} className="mt-4 flex items-center justify-center gap-2">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold-primary/60"></div>
            <div className="w-2 h-2 rotate-45 border border-gold-primary/50 bg-[#060D1A]"></div>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold-primary/60"></div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Instagram Card */}
          <motion.div
            variants={fadeUpVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 bg-[#FAF8F5] border border-gold-primary/35 rounded-3xl shadow-[0_15px_40px_rgba(201,169,110,0.08)] flex flex-col justify-between items-start text-right transition-all duration-300 relative overflow-hidden group min-h-[270px]"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold-primary/5 to-transparent blur-xl pointer-events-none rounded-full" />
            <div className="w-full">
              <div className="w-12 h-12 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary shadow-inner mb-4 transition-all duration-300 group-hover:bg-gold-primary group-hover:text-bg-midnight group-hover:border-gold-primary">
                <Instagram className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-[#060D1A] text-base font-el-messiri transition-colors duration-300 group-hover:text-gold-deep">إنستغرام</h4>
              <span className="text-[10px] sm:text-xs text-gold-deep font-mono font-semibold" dir="ltr">@alghrbiagolden</span>
              <p className="text-xs text-slate-600 leading-relaxed mt-3 mb-6 font-sans transition-colors duration-300 group-hover:text-slate-800">
                تابع تغطياتنا الميدانية وجولاتنا الحية لمشاريعنا الفاخرة وتصاميمنا العصرية أولاً بأول.
              </p>
            </div>
            <a
              href="https://instagram.com/alghrbiagolden"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-white hover:bg-gold-primary/10 border border-slate-200 hover:border-gold-primary rounded-full text-xs font-bold text-slate-700 hover:text-gold-deep flex items-center justify-center gap-2 transition-all duration-300 shadow-sm mt-auto"
            >
              <span>متابعة الآن</span>
              <ArrowUpLeft className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* YouTube Card */}
          <motion.div
            variants={fadeUpVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 bg-[#FAF8F5] border border-gold-primary/35 rounded-3xl shadow-[0_15px_40px_rgba(201,169,110,0.08)] flex flex-col justify-between items-start text-right transition-all duration-300 relative overflow-hidden group min-h-[270px]"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold-primary/5 to-transparent blur-xl pointer-events-none rounded-full" />
            <div className="w-full">
              <div className="w-12 h-12 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary shadow-inner mb-4 transition-all duration-300 group-hover:bg-gold-primary group-hover:text-bg-midnight group-hover:border-gold-primary">
                <Youtube className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-[#060D1A] text-base font-el-messiri transition-colors duration-300 group-hover:text-gold-deep">يوتيوب</h4>
              <span className="text-[10px] sm:text-xs text-gold-deep font-mono font-semibold" dir="ltr">Golden Western</span>
              <p className="text-xs text-slate-600 leading-relaxed mt-3 mb-6 font-sans transition-colors duration-300 group-hover:text-slate-800">
                شاهد العروض السينمائية وجولات الفيديو عالية الدقة لوحداتنا السكنية ومشاريعنا الكبرى.
              </p>
            </div>
            <a
              href="https://youtube.com/@alghrbiagolden"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-white hover:bg-gold-primary/10 border border-slate-200 hover:border-gold-primary rounded-full text-xs font-bold text-slate-700 hover:text-gold-deep flex items-center justify-center gap-2 transition-all duration-300 shadow-sm mt-auto"
            >
              <span>زيارة القناة</span>
              <ArrowUpLeft className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* LinkedIn Card */}
          <motion.div
            variants={fadeUpVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 bg-[#FAF8F5] border border-gold-primary/35 rounded-3xl shadow-[0_15px_40px_rgba(201,169,110,0.08)] flex flex-col justify-between items-start text-right transition-all duration-300 relative overflow-hidden group min-h-[270px]"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold-primary/5 to-transparent blur-xl pointer-events-none rounded-full" />
            <div className="w-full">
              <div className="w-12 h-12 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary shadow-inner mb-4 transition-all duration-300 group-hover:bg-gold-primary group-hover:text-bg-midnight group-hover:border-gold-primary">
                <Linkedin className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-[#060D1A] text-base font-el-messiri transition-colors duration-300 group-hover:text-gold-deep">لينكد إن</h4>
              <span className="text-[10px] sm:text-xs text-gold-deep font-mono font-semibold" dir="ltr">company/alghrbiagolden</span>
              <p className="text-xs text-slate-600 leading-relaxed mt-3 mb-6 font-sans transition-colors duration-300 group-hover:text-slate-800">
                تواصل معنا للمشاركات المهنية والفرص الاستثمارية والشركات الاستراتيجية العقارية.
              </p>
            </div>
            <a
              href="https://linkedin.com/company/alghrbiagolden"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-white hover:bg-gold-primary/10 border border-slate-200 hover:border-gold-primary rounded-full text-xs font-bold text-slate-700 hover:text-gold-deep flex items-center justify-center gap-2 transition-all duration-300 shadow-sm mt-auto"
            >
              <span>تواصل مهنياً</span>
              <ArrowUpLeft className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* X (Twitter) Card */}
          <motion.div
            variants={fadeUpVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className="p-6 bg-[#FAF8F5] border border-gold-primary/35 rounded-3xl shadow-[0_15px_40px_rgba(201,169,110,0.08)] flex flex-col justify-between items-start text-right transition-all duration-300 relative overflow-hidden group min-h-[270px]"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold-primary/5 to-transparent blur-xl pointer-events-none rounded-full" />
            <div className="w-full">
              <div className="w-12 h-12 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary shadow-inner mb-4 transition-all duration-300 group-hover:bg-gold-primary group-hover:text-bg-midnight group-hover:border-gold-primary">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <h4 className="font-extrabold text-[#060D1A] text-base font-el-messiri transition-colors duration-300 group-hover:text-gold-deep">منصة إكس</h4>
              <span className="text-[10px] sm:text-xs text-gold-deep font-mono font-semibold" dir="ltr">@alghrbiagolden</span>
              <p className="text-xs text-slate-600 leading-relaxed mt-3 mb-6 font-sans transition-colors duration-300 group-hover:text-slate-800">
                بق على اطلاع بآخر أخبار التطوير العقاري وتحديثات أعمال التشييد وبناء مشاريعنا الجارية.
              </p>
            </div>
            <a
              href="https://x.com/alghrbiagolden"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-white hover:bg-gold-primary/10 border border-slate-200 hover:border-gold-primary rounded-full text-xs font-bold text-slate-700 hover:text-gold-deep flex items-center justify-center gap-2 transition-all duration-300 shadow-sm mt-auto"
            >
              <span>آخر التحديثات</span>
              <ArrowUpLeft className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
