// src/app/algharbia-cp/settings/page.tsx
'use client';

import React, { useState } from 'react';
import AdminBreadcrumb from '../../../components/admin/layout/AdminBreadcrumb';
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
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { seedDatabase } from '@/app/actions/properties';

type SettingsTab = 'hero' | 'stats' | 'testimonials' | 'partners' | 'contact' | 'seo' | 'sync';

const TABS: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: 'hero', label: 'الصفحة الرئيسية', icon: ImageIcon },
  { id: 'stats', label: 'الإحصائيات', icon: BarChart2 },
  { id: 'testimonials', label: 'شهادات العملاء', icon: Quote },
  { id: 'partners', label: 'الشركاء', icon: Users },
  { id: 'contact', label: 'بيانات التواصل', icon: Phone },
  { id: 'seo', label: 'SEO', icon: Globe },
  { id: 'sync', label: 'مزامنة البيانات', icon: RefreshCw },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('hero');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const [showSyncConfirm, setShowSyncConfirm] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: boolean; message: string } | null>(null);

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
                  {['/hero-bg-3.webp', '/hero-bg-luxury.webp', '/hero-bg-2.webp'].map((src, i) => (
                    <div key={i} className="relative h-32 rounded-xl overflow-hidden bg-[var(--neu-depressed)] group">
                      <div className="w-full h-full bg-[var(--neu-surface)] flex items-center justify-center">
                        <span className="text-xs text-[var(--neu-text-muted)]">صورة {i + 1}</span>
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="neu-btn neu-btn-primary neu-btn-sm">
                          <Upload className="w-3.5 h-3.5" />
                          تغيير
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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
                سيتم ربط هذا القسم بقاعدة بيانات Supabase لإدارة الشهادات ديناميكياً.
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
                سيتم ربط هذا القسم بقاعدة بيانات Supabase لإدارة الشركاء ديناميكياً.
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

          {/* Sync Tab */}
          {activeTab === 'sync' && (
            <div className="neu-card space-y-6">
              <h3 className="text-lg font-bold text-[var(--neu-text-heading)] border-b border-white/5 pb-4">
                مزامنة بيانات قاعدة البيانات
              </h3>
              <p className="text-sm text-[var(--neu-text-muted)]">
                هذا الخيار يُتيح لك مزامنة قاعدة البيانات (Supabase) ورفع كافة البيانات الديمو الافتراضية المجهزة مسبقاً (16 عقاراً و5 مشاريع) إلى الجداول الحقيقية.
              </p>
              <div className="bg-[var(--neu-depressed)] border border-[var(--neu-gold)]/20 p-4 rounded-2xl flex flex-col gap-2">
                <span className="font-semibold text-sm text-[var(--neu-gold)]">⚠️ تحذير هام:</span>
                <span className="text-xs text-[var(--neu-text-secondary)]">
                  عند القيام بالمزامنة، سيتم مسح أي عقارات أو مشاريع حالية في قاعدة البيانات، وإعادة إدراج العقارات والمشاريع التجريبية النظيفة كبيانات ديناميكية.
                </span>
              </div>
              <div>
                <button
                  onClick={() => setShowSyncConfirm(true)}
                  disabled={syncing}
                  className="neu-btn neu-btn-gold py-3 px-6 text-base font-semibold"
                >
                  {syncing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      جاري المزامنة...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      مزامنة ورفع البيانات التجريبية
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sync Confirmation Modal */}
      {showSyncConfirm && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[210] flex items-center justify-center p-4"
          onClick={() => !syncing && setShowSyncConfirm(false)}
          role="dialog"
          aria-label="تأكيد المزامنة"
        >
          <div
            className="neu-card w-full max-w-md p-6 text-center animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-[var(--neu-gold)]/10 border-2 border-[var(--neu-gold)]/20 flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-[var(--neu-gold)]" />
            </div>
            
            <h3 className="text-lg font-bold text-[var(--neu-text-heading)] mb-2">تأكيد مزامنة البيانات</h3>
            <p className="text-sm text-[var(--neu-text-secondary)] mb-6 font-medium">
              هل أنت متأكد من رغبتك في مسح الجداول ورفع البيانات الديمو الافتراضية؟
              <br />
              <strong>تحذير:</strong> هذا الإجراء سيقوم بحذف كافة العقارات والمشاريع المضافة حالياً واستبدالها بالبيانات التجريبية الافتراضية.
            </p>

            <div className="flex gap-3">
              <button
                onClick={async () => {
                  setSyncing(true);
                  try {
                    const res = await seedDatabase();
                    if (res.success) {
                      setSyncResult({ success: true, message: "تمت مزامنة كافة المشاريع والعقارات التجريبية بنجاح إلى قاعدة البيانات الديناميكية!" });
                    } else {
                      setSyncResult({ success: false, message: "حدث خطأ أثناء المزامنة: " + res.error });
                    }
                  } catch (e: any) {
                    setSyncResult({ success: false, message: "فشل إجراء المزامنة: " + e.message });
                  } finally {
                    setSyncing(false);
                    setShowSyncConfirm(false);
                  }
                }}
                disabled={syncing}
                className="neu-btn neu-btn-primary bg-[var(--neu-gold)] hover:bg-[var(--neu-gold)]/90 border-0 flex-1 text-[var(--neu-bg-primary)] font-bold animate-pulse"
              >
                {syncing ? 'جاري المزامنة...' : 'نعم، ابدأ المزامنة'}
              </button>
              <button
                onClick={() => setShowSyncConfirm(false)}
                disabled={syncing}
                className="neu-btn neu-btn-secondary flex-1"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sync Result Notification Modal */}
      {syncResult && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[210] flex items-center justify-center p-4"
          onClick={() => setSyncResult(null)}
          role="dialog"
          aria-label="نتيجة المزامنة"
        >
          <div
            className="neu-card w-full max-w-md p-6 text-center animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              syncResult.success 
                ? 'bg-green-500/10 border-2 border-green-500/20 text-green-500' 
                : 'bg-[var(--neu-danger)]/10 border-2 border-[var(--neu-danger)]/20 text-[var(--neu-danger)]'
            }`}>
              {syncResult.success ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <AlertCircle className="w-8 h-8" />
              )}
            </div>
            
            <h3 className="text-lg font-bold text-[var(--neu-text-heading)] mb-2">
              {syncResult.success ? 'نجاح العملية' : 'فشل العملية'}
            </h3>
            <p className="text-sm text-[var(--neu-text-secondary)] mb-6 font-medium">
              {syncResult.message}
            </p>

            <button
              onClick={() => setSyncResult(null)}
              className="neu-btn neu-btn-primary w-full"
            >
              موافق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
