// src/app/algharbia-cp/settings/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import AdminBreadcrumb from '../../../components/admin/layout/AdminBreadcrumb';
import { uploadFile, deleteFile } from '../../../lib/supabase/storage';
import { compressImageToWebP } from '../../../lib/image';
import { toast } from 'sonner';
import {
  Image as ImageIcon,
  Type,
  BarChart2,
  Users,
  Quote,
  Phone,
  Globe,
  Save,
  Loader2,
  CheckCircle2,
  Upload,
} from 'lucide-react';

type SettingsTab = 'hero' | 'stats' | 'testimonials' | 'partners' | 'contact' | 'seo';

const TABS: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: 'hero', label: 'الصفحة الرئيسية', icon: ImageIcon },
  { id: 'stats', label: 'الإحصائيات', icon: BarChart2 },
  { id: 'testimonials', label: 'شهادات العملاء', icon: Quote },
  { id: 'partners', label: 'الشركاء', icon: Users },
  { id: 'contact', label: 'بيانات التواصل', icon: Phone },
  { id: 'seo', label: 'SEO', icon: Globe },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('hero');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Mock form states
  const [heroTitle, setHeroTitle] = useState('نعتمد أحدث التقنيات');
  const [heroSubtitle, setHeroSubtitle] = useState('لنربطكم بأفضل الفرص السكنية والاستثمارية');
  const [statProjects, setStatProjects] = useState('75');
  const [statUnits, setStatUnits] = useState('850');
  const [statClients, setStatClients] = useState('1200');
  const [statYears, setStatYears] = useState('14');
  const [unifiedNumber, setUnifiedNumber] = useState('920016581');
  const [mobileNumber, setMobileNumber] = useState('+966554498018');
  const [companyEmail, setCompanyEmail] = useState('info@alghrbiagolde.com');
  const [address, setAddress] = useState('جدة، حي الصفا، شارع الأمير سلطان');
  const [seoTitle, setSeoTitle] = useState('شركة الغربية الذهبية | عقارات فاخرة بالسعودية');
  const [seoDescription, setSeoDescription] = useState('حرفية تشييد وتميّز عقاري — نعتمد أحدث التقنيات لربط عملائنا بأفضل الفرص السكنية والاستثمارية');

  // Slider Images State & Logic
  const [sliderImages, setSliderImages] = useState<string[]>([
    '/hero-bg-3.webp',
    '/hero-bg-luxury.webp',
    '/hero-bg-2.webp',
  ]);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const triggerImageChange = (index: number) => {
    setActiveImageIndex(index);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || activeImageIndex === null) return;

    const index = activeImageIndex;
    setUploadingIndex(index);

    try {
      const oldUrl = sliderImages[index];
      if (oldUrl && oldUrl.includes('/storage/')) {
        const getStoragePathFromUrl = (url: string) => {
          const match = url.match(/\/storage\/v1\/object\/public\/media\/(.+)$/);
          return match && match[1] ? decodeURIComponent(match[1]) : null;
        };
        const oldPath = getStoragePathFromUrl(oldUrl);
        if (oldPath) {
          await deleteFile('media', oldPath);
        }
      }

      const webpFile = await compressImageToWebP(file);
      const uniqueName = `hero-slider-${index}-${Date.now()}.webp`;
      const filePath = `settings/${uniqueName}`;

      const res = await uploadFile('media', filePath, webpFile, { contentType: 'image/webp' });
      if (res) {
        setSliderImages((prev) => {
          const next = [...prev];
          next[index] = res.url;
          return next;
        });
        toast.success(`تم تغيير الصورة ${index + 1} بنجاح`);
      }
    } catch (err: any) {
      console.error('Failed to change slider image:', err);
      toast.error('فشل تغيير الصورة: ' + (err.message || 'خطأ غير معروف'));
    } finally {
      setUploadingIndex(null);
      setActiveImageIndex(null);
      if (e.target) e.target.value = '';
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  return (
    <div>
      <AdminBreadcrumb items={[{ label: 'إعدادات الموقع' }]} />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--neu-text-heading)]">إعدادات الموقع</h2>
          <p className="text-sm text-[var(--neu-text-muted)] mt-1">تحكم بكل محتويات الموقع من مكان واحد</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="neu-btn neu-btn-primary"
        >
          {saving ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> حفظ...</>
          ) : saved ? (
            <><CheckCircle2 className="w-4 h-4" /> تم الحفظ</>
          ) : (
            <><Save className="w-4 h-4" /> حفظ التغييرات</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Tabs Sidebar */}
        <div className="lg:col-span-1">
          <div className="neu-card p-3 space-y-1 sticky top-[calc(var(--topbar-height)+28px)]">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`sidebar-nav-item w-full ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="lg:col-span-3">
          {/* Hero Section */}
          {activeTab === 'hero' && (
            <div className="neu-card space-y-6">
              <h3 className="text-lg font-bold text-[var(--neu-text-heading)] border-b border-white/5 pb-4">
                إعدادات الصفحة الرئيسية (Hero)
              </h3>

              <div>
                <label className="neu-label" htmlFor="heroTitleInput">العنوان الرئيسي</label>
                <input id="heroTitleInput" type="text" placeholder="العنوان الرئيسي" title="العنوان الرئيسي" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className="neu-input" />
              </div>

              <div>
                <label className="neu-label" htmlFor="heroSubtitleInput">العنوان الفرعي</label>
                <input id="heroSubtitleInput" type="text" placeholder="العنوان الفرعي" title="العنوان الفرعي" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} className="neu-input" />
              </div>

              <div>
                <label className="neu-label">صور الخلفية (Hero Slider)</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                  {sliderImages.map((src, i) => (
                    <div key={i} className="relative h-32 rounded-xl overflow-hidden bg-[var(--neu-depressed)] group border border-white/5">
                      <Image
                        src={src}
                        alt={`صورة الخلفية ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => triggerImageChange(i)}
                          disabled={uploadingIndex !== null}
                          className="neu-btn neu-btn-primary neu-btn-sm"
                        >
                          {uploadingIndex === i ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Upload className="w-3.5 h-3.5" />
                          )}
                          <span>{uploadingIndex === i ? 'جاري الرفع...' : 'تغيير'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  title="تغيير صورة الخلفية"
                />
              </div>
            </div>
          )}

          {/* Stats Section */}
          {activeTab === 'stats' && (
            <div className="neu-card space-y-6">
              <h3 className="text-lg font-bold text-[var(--neu-text-heading)] border-b border-white/5 pb-4">
                أرقام الإحصائيات
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="neu-label" htmlFor="statProjectsInput">عدد المشاريع</label>
                  <input id="statProjectsInput" type="number" placeholder="عدد المشاريع" title="عدد المشاريع" value={statProjects} onChange={(e) => setStatProjects(e.target.value)} className="neu-input" dir="ltr" />
                </div>
                <div>
                  <label className="neu-label" htmlFor="statUnitsInput">عدد الوحدات</label>
                  <input id="statUnitsInput" type="number" placeholder="عدد الوحدات" title="عدد الوحدات" value={statUnits} onChange={(e) => setStatUnits(e.target.value)} className="neu-input" dir="ltr" />
                </div>
                <div>
                  <label className="neu-label" htmlFor="statClientsInput">عدد العملاء</label>
                  <input id="statClientsInput" type="number" placeholder="عدد العملاء" title="عدد العملاء" value={statClients} onChange={(e) => setStatClients(e.target.value)} className="neu-input" dir="ltr" />
                </div>
                <div>
                  <label className="neu-label" htmlFor="statYearsInput">سنوات الخبرة</label>
                  <input id="statYearsInput" type="number" placeholder="سنوات الخبرة" title="سنوات الخبرة" value={statYears} onChange={(e) => setStatYears(e.target.value)} className="neu-input" dir="ltr" />
                </div>
              </div>
            </div>
          )}

          {/* Testimonials */}
          {activeTab === 'testimonials' && (
            <div className="neu-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[var(--neu-text-heading)]">شهادات العملاء</h3>
                <button className="neu-btn neu-btn-secondary neu-btn-sm">
                  + إضافة شهادة
                </button>
              </div>
              <p className="text-sm text-[var(--neu-text-muted)]">
                سيتم ربط هذا القسم بقاعدة البيانات لإدارة الشهادات ديناميكياً.
              </p>
            </div>
          )}

          {/* Partners */}
          {activeTab === 'partners' && (
            <div className="neu-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[var(--neu-text-heading)]">الشركاء</h3>
                <button className="neu-btn neu-btn-secondary neu-btn-sm">
                  + إضافة شريك
                </button>
              </div>
              <p className="text-sm text-[var(--neu-text-muted)]">
                سيتم ربط هذا القسم بقاعدة البيانات لإدارة الشركاء ديناميكياً.
              </p>
            </div>
          )}

          {/* Contact */}
          {activeTab === 'contact' && (
            <div className="neu-card space-y-6">
              <h3 className="text-lg font-bold text-[var(--neu-text-heading)] border-b border-white/5 pb-4">
                بيانات التواصل
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="neu-label" htmlFor="unifiedNumberInput">الرقم الموحد</label>
                  <input id="unifiedNumberInput" type="text" placeholder="الرقم الموحد" title="الرقم الموحد" value={unifiedNumber} onChange={(e) => setUnifiedNumber(e.target.value)} className="neu-input" dir="ltr" />
                </div>
                <div>
                  <label className="neu-label" htmlFor="mobileNumberInput">رقم الجوال</label>
                  <input id="mobileNumberInput" type="text" placeholder="رقم الجوال" title="رقم الجوال" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="neu-input" dir="ltr" />
                </div>
                <div>
                  <label className="neu-label" htmlFor="companyEmailInput">البريد الإلكتروني</label>
                  <input id="companyEmailInput" type="email" placeholder="البريد الإلكتروني" title="البريد الإلكتروني" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} className="neu-input" dir="ltr" />
                </div>
                <div>
                  <label className="neu-label" htmlFor="addressInput">العنوان</label>
                  <input id="addressInput" type="text" placeholder="العنوان" title="العنوان" value={address} onChange={(e) => setAddress(e.target.value)} className="neu-input" />
                </div>
              </div>
            </div>
          )}

          {/* SEO */}
          {activeTab === 'seo' && (
            <div className="neu-card space-y-6">
              <h3 className="text-lg font-bold text-[var(--neu-text-heading)] border-b border-white/5 pb-4">
                إعدادات محركات البحث (SEO)
              </h3>
              <div>
                <label className="neu-label" htmlFor="seoTitleInput">عنوان الصفحة الرئيسية (Title Tag)</label>
                <input id="seoTitleInput" type="text" placeholder="عنوان الصفحة الرئيسية" title="عنوان الصفحة الرئيسية" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="neu-input" />
                <p className="text-xs text-[var(--neu-text-muted)] mt-1">{seoTitle.length}/60 حرف</p>
              </div>
              <div>
                <label className="neu-label" htmlFor="seoDescriptionInput">وصف الصفحة (Meta Description)</label>
                <textarea id="seoDescriptionInput" placeholder="وصف الصفحة" title="وصف الصفحة" value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} className="neu-input neu-textarea" rows={3} />
                <p className="text-xs text-[var(--neu-text-muted)] mt-1">{seoDescription.length}/160 حرف</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
