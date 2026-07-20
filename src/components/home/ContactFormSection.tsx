'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { z } from 'zod';
import { createSubmission } from '@/app/actions/submissions';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const contactSchema = z.object({
  title: z.string().min(1, 'الرجاء اختيار اللقب'),
  firstName: z.string().min(2, 'الاسم الأول يجب أن يكون حرفين على الأقل'),
  lastName: z.string().min(2, 'اسم العائلة يجب أن يكون حرفين على الأقل'),
  email: z.string().email('عنوان البريد الإلكتروني غير صحيح'),
  phone: z.string().min(8, 'رقم التليفون يجب أن يكون 8 أرقام على الأقل'),
  propertyType: z.string().min(1, 'الرجاء اختيار نوع العقار أو المشروع'),
  zipCode: z.string().optional(),
  city: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  budget: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactFormSection() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState<ContactFormData>({
    title: 'السيد',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyType: 'شقة',
    zipCode: '',
    city: 'جدة',
    bedrooms: '4',
    bathrooms: '3',
    budget: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      validation.error.issues.forEach(issue => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const data = validation.data;
      const fullName = `${data.title} ${data.firstName} ${data.lastName}`.trim();
      const messageNotes = `نوع العقار: ${data.propertyType} | المدينة: ${data.city || 'غير محدد'} | الرمز البريدي: ${data.zipCode || 'لا يوجد'} | الغرف: ${data.bedrooms || 'غير محدد'} | الحمامات: ${data.bathrooms || 'غير محدد'} | الميزانية: ${data.budget || 'غير محدد'}`;

      const res = await createSubmission({
        name: fullName,
        phone: data.phone,
        email: data.email,
        subject: `طلب تواصل جديد: ${data.propertyType}`,
        message: messageNotes,
        type: 'contact',
        resident_type: 'citizen',
        notes: messageNotes
      });

      if (res.success) {
        setSubmitSuccess(true);
        setFormData({
          title: 'السيد',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          propertyType: 'شقة',
          zipCode: '',
          city: 'جدة',
          bedrooms: '4',
          bathrooms: '3',
          budget: '',
        });
      } else {
        setSubmitError(res.error || 'حدث خطأ أثناء تقديم الطلب. الرجاء المحاولة مرة أخرى.');
      }
    } catch (err) {
      setSubmitError('تعذر الاتصال بالخادم. الرجاء المحاولة لاحقاً.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="relative w-full overflow-hidden py-20 sm:py-24 bg-gradient-to-b from-bg-deep via-bg-navy to-bg-deep border-y border-border-gold/15 z-10">
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gold-primary/10 via-brand-primary/10 to-gold-primary/10 rounded-full blur-3xl z-0 pointer-events-none opacity-80 animate-pulse duration-[8000ms]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-12 bg-gold-primary"></div>
            <span className="text-xs sm:text-sm font-extrabold text-gold-primary font-el-messiri uppercase tracking-wider">اتصل بنا</span>
            <div className="h-[2px] w-12 bg-gold-primary"></div>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight font-el-messiri">أبق على اتصال</h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xl mx-auto font-el-messiri">
            تمتلك شركتنا العقارية عدداً من القوائم الفاخرة والحصرية المثالية للعملاء الراغبين في التملك أو الاستثمار.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl mx-auto mt-10 sm:mt-12 z-10"
        >
          <div className="relative bg-bg-navy/70 backdrop-blur-xl border border-gold-primary/45 p-6 sm:p-10 rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
            <div className="absolute top-0 start-10 end-10 h-[2px] bg-gradient-to-r from-transparent via-gold-primary to-transparent"></div>

            {submitSuccess ? (
              <div className="py-12 px-4 text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-status-available mx-auto" />
                <h3 className="text-xl sm:text-2xl font-bold text-white font-el-messiri">تم إرسال طلبك بنجاح!</h3>
                <p className="text-sm text-text-secondary max-w-md mx-auto">
                  شكراً لتواصلك معنا. سيقوم مستشارنا العقاري بالاتصال بك في أقرب وقت.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 py-3 px-8 text-xs sm:text-sm font-extrabold btn-premium-gold rounded-full min-h-[44px]"
                >
                  إرسال طلب آخر
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-start" noValidate>
                {submitError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Group 1: Personal Info */}
                <div className="space-y-4">
                  <h3 className="text-xs sm:text-sm font-bold text-gold-primary border-s-2 border-gold-primary ps-2.5">معلومات شخصية</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="contact-title" className="block text-xs font-semibold text-text-muted">اللقب</label>
                      <select
                        id="contact-title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full bg-[#0F2040]/70 border border-white/20 focus:border-gold-primary/70 focus:bg-[#152A54]/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all min-h-[44px]"
                      >
                        <option value="السيد">السيد</option>
                        <option value="السيدة">السيدة</option>
                        <option value="شركة">شركة / جهة</option>
                      </select>
                      {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-first-name" className="block text-xs font-semibold text-text-muted">الاسم الأول *</label>
                      <input
                        id="contact-first-name"
                        name="firstName"
                        type="text"
                        placeholder="أدخل الاسم الأول"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-bg-royal/40 border border-white/20 focus:border-gold-primary/70 focus:bg-bg-royal/60 rounded-xl px-4 py-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all min-h-[44px]"
                      />
                      {errors.firstName && <p className="text-xs text-red-400 mt-1">{errors.firstName}</p>}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-last-name" className="block text-xs font-semibold text-text-muted">اسم العائلة *</label>
                      <input
                        id="contact-last-name"
                        name="lastName"
                        type="text"
                        placeholder="أدخل اسم العائلة"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-bg-royal/40 border border-white/20 focus:border-gold-primary/70 focus:bg-bg-royal/60 rounded-xl px-4 py-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all min-h-[44px]"
                      />
                      {errors.lastName && <p className="text-xs text-red-400 mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-text-muted">البريد الإلكتروني *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-bg-royal/40 border border-white/20 focus:border-gold-primary/70 focus:bg-bg-royal/60 rounded-xl px-4 py-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all min-h-[44px]"
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-text-muted">رقم التليفون *</label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        placeholder="05xxxxxxxx"
                        dir="ltr"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-bg-royal/40 border border-white/20 focus:border-gold-primary/70 focus:bg-bg-royal/60 rounded-xl px-4 py-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all text-start font-mono min-h-[44px]"
                      />
                      {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Group 2: Property Preferences */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs sm:text-sm font-bold text-gold-primary border-s-2 border-gold-primary ps-2.5">معلومات العقار المطلوب</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="contact-property-type" className="block text-xs font-semibold text-text-muted">نوع العقار</label>
                      <select
                        id="contact-property-type"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full bg-[#0F2040]/70 border border-white/20 focus:border-gold-primary/70 focus:bg-[#152A54]/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all min-h-[44px]"
                      >
                        <option value="شقة">شقة سكنية</option>
                        <option value="فيلا">فيلا مستقلة</option>
                        <option value="ملحق">ملحق روف / بنتهاوس</option>
                        <option value="مشروع ابو هايل افينيو">مشروع أبو هايل أفينيو</option>
                        <option value="مشروع امل ستارز">مشروع أمل ستارز</option>
                        <option value="مشروع ريناد غاليري">مشروع ريناد غاليري</option>
                        <option value="مشروع هتان التيسير">مشروع هتان التيسير</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-city" className="block text-xs font-semibold text-text-muted">المدينة المفضلة</label>
                      <input
                        id="contact-city"
                        name="city"
                        type="text"
                        placeholder="جدة، الرياض، مكة"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-bg-royal/40 border border-white/20 focus:border-gold-primary/70 focus:bg-bg-royal/60 rounded-xl px-4 py-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all min-h-[44px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-zip" className="block text-xs font-semibold text-text-muted">الرمز البريدي</label>
                      <input
                        id="contact-zip"
                        name="zipCode"
                        type="text"
                        placeholder="الرمز البريدي"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full bg-bg-royal/40 border border-white/20 focus:border-gold-primary/70 focus:bg-bg-royal/60 rounded-xl px-4 py-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all font-mono min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="contact-bedrooms" className="block text-xs font-semibold text-text-muted">عدد الغرف</label>
                      <select
                        id="contact-bedrooms"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        className="w-full bg-[#0F2040]/70 border border-white/20 focus:border-gold-primary/70 focus:bg-[#152A54]/80 rounded-xl px-4 py-3 text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all min-h-[44px]"
                      >
                        <option value="1">1 غرفة</option>
                        <option value="2">2 غرف</option>
                        <option value="3">3 غرف</option>
                        <option value="4">4 غرف</option>
                        <option value="5">5 غرف</option>
                        <option value="6+">6+ غرف</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-bathrooms" className="block text-xs font-semibold text-text-muted">عدد الحمامات</label>
                      <input
                        id="contact-bathrooms"
                        name="bathrooms"
                        type="number"
                        placeholder="مثال: 3"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        className="w-full bg-bg-royal/40 border border-white/20 focus:border-gold-primary/70 focus:bg-bg-royal/60 rounded-xl px-4 py-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all min-h-[44px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-budget" className="block text-xs font-semibold text-text-muted">الميزانية المتوقعة (ر.س)</label>
                      <input
                        id="contact-budget"
                        name="budget"
                        type="text"
                        placeholder="مثال: 800,000"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-bg-royal/40 border border-white/20 focus:border-gold-primary/70 focus:bg-bg-royal/60 rounded-xl px-4 py-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/65 focus:outline-none focus:ring-2 focus:ring-gold-primary/50 transition-all min-h-[44px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 text-xs sm:text-sm font-bold text-bg-midnight bg-gold-primary hover:bg-gold-warm rounded-xl transition-all duration-300 shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>جاري إرسال الطلب...</span>
                      </>
                    ) : (
                      <span>إرسال الطلب</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
