// src/components/layout/InquiryModal.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle } from 'lucide-react';
import { useInquiryStore } from '../../store/useInquiryStore';

export default function InquiryModal() {
  const isOpen = useInquiryStore((state) => state.isOpen);
  const close = useInquiryStore((state) => state.close);
  const [inquirySuccess, setInquirySuccess] = useState<boolean>(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySuccess(true);
    setTimeout(() => {
      close();
      setInquirySuccess(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060D1A]/80 backdrop-blur-md transition-all duration-500 animate-fade-in"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-white/95 backdrop-blur-3xl border border-gold-primary/30 shadow-[0_40px_80px_rgba(201,169,110,0.15)] rounded-3xl p-6 sm:p-10 text-right transform transition-all duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 end-0 w-40 h-40 bg-gradient-to-br from-gold-primary/5 to-transparent blur-3xl pointer-events-none rounded-full" />
            <div className="absolute bottom-0 start-0 w-40 h-40 bg-gradient-to-tr from-gold-primary/5 to-transparent blur-3xl pointer-events-none rounded-full" />

            {/* Close Button */}
            <button
              type="button"
              className="absolute top-6 end-6 p-2.5 text-slate-500 hover:text-gold-primary bg-slate-100 hover:bg-slate-200/80 rounded-xl border border-slate-200/60 transition-all duration-300 cursor-pointer"
              onClick={close}
              aria-label="إغلاق"
              title="إغلاق نافذة الحجز"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-8 pb-4 border-b border-slate-200/60">
              <span className="text-[10px] font-bold text-gold-deep tracking-widest block mb-1.5 font-serif uppercase">
                PRIVATE RESERVATION
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-[#060D1A] leading-tight font-el-messiri">
                حجز جولتك الخاصة / <span className="bg-gradient-to-r from-gold-light via-gold-primary to-gold-warm bg-clip-text text-transparent">طلب معاينة عقارية فاخرة</span>
              </h4>
            </div>

            {/* Form */}
            <form onSubmit={handleInquirySubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="inquiry-name" className="block text-xs font-semibold text-slate-700 mb-2">الاسم بالكامل</label>
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    className="w-full bg-slate-50/70 border border-slate-200 focus:border-gold-primary/70 focus:bg-white rounded-xl px-5 py-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-gold-primary/40 transition-all duration-300"
                    placeholder="الاسم الثلاثي"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry-phone" className="block text-xs font-semibold text-slate-700 mb-2">رقم الجوال</label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    required
                    pattern="^(05|009665|\+9665)\d{8}$"
                    className="w-full bg-slate-50/70 border border-slate-200 focus:border-gold-primary/70 focus:bg-white rounded-xl px-5 py-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-gold-primary/40 transition-all duration-300 text-left font-mono"
                    placeholder="05xxxxxxxx"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry-city" className="block text-xs font-semibold text-slate-700 mb-2">المدينة المفضلة</label>
                  <input
                    id="inquiry-city"
                    type="text"
                    required
                    className="w-full bg-slate-50/70 border border-slate-200 focus:border-gold-primary/70 focus:bg-white rounded-xl px-5 py-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-gold-primary/40 transition-all duration-300"
                    placeholder="جدة أو الرياض"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inquiry-notes" className="block text-xs font-semibold text-slate-700 mb-2">ملاحظات أو متطلبات خاصة (اختياري)</label>
                <textarea
                  id="inquiry-notes"
                  rows={3}
                  className="w-full bg-slate-50/70 border border-slate-200 focus:border-gold-primary/70 focus:bg-white rounded-xl px-5 py-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-gold-primary/40 transition-all duration-300 resize-none"
                  placeholder="مثال: رغبة في روف بـ 5 غرف في شمال جدة..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl text-xs sm:text-sm font-extrabold btn-premium-gold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 font-el-messiri"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  <span>تأكيد طلب حجز المعاينة الخاصة</span>
                </button>
              </div>
            </form>

            {/* Success Popup inside Modal */}
            <AnimatePresence>
              {inquirySuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gold-primary/10 border border-gold-primary flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-gold-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-[#060D1A] font-el-messiri">تم إرسال طلب المعاينة الفاخرة بنجاح</h4>
                  <p className="text-xs text-slate-500 max-w-sm">سيتم الاتصال بك لتنسيق موعد الجولة الحية والخاصة مع مستشار مبيعات الغربية الذهبية.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
