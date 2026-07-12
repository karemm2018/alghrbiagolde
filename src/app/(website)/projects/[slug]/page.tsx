// src/app/projects/[slug]/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PROJECTS } from '@/lib/mockData';
import { getSupabaseAdminClient } from '@/lib/supabase/admin';
import { getProjectBySlug, getPropertiesByProjectSlug } from '@/app/actions/properties';
import MediaGallery from '@/components/ui/MediaGallery';
import { ProjectSidebarInquiry } from '@/components/property/ProjectActions';
import UnitsCarousel from '@/components/property/UnitsCarousel';
import {
  Building2,
  MapPin,
  Calendar,
  LayoutGrid,
  Download,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  Info,
  Tag,
  ArrowLeft,
  Map
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate dynamic metadata for SEO on Server Side
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return {
    title: project ? `${project.name} | شركة الغربية الذهبية` : 'مشروع سكني فاخر',
    description: project?.description || 'مجمعات سكنية فاخرة بتصاميم عصرية وتشطيبات راقية تناسب تطلعاتكم في المملكة العربية السعودية.',
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Filter properties belonging to this project
  const associatedProperties = await getPropertiesByProjectSlug(project.slug);

  // Project Gallery images list - falls back to interior assets if none exist
  const galleryImages =
    project.media.gallery && project.media.gallery.length > 0
      ? [project.media.hero, ...project.media.gallery]
      : [
          project.media.hero || '/properties/apartment.webp',
          '/properties/villa.webp',
          '/properties/penthouse.webp',
          '/properties/apartment.webp'
        ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(price) + ' ر.س';
  };

  const projectStatusLabel = (() => {
    switch (project.status) {
      case 'completed': return 'جاهز للتسليم';
      case 'under_construction': return 'تحت الإنشاء';
      case 'upcoming': return 'قريباً';
      default: return 'نشط';
    }
  })();

  const statusColorClass = (() => {
    switch (project.status) {
      case 'completed': return 'bg-status-available/10 text-status-available border-status-available/30';
      case 'under_construction': return 'bg-status-reserved/10 text-status-reserved border-status-reserved/30';
      case 'upcoming': return 'bg-status-soon/10 text-status-soon border-status-soon/30';
      default: return 'bg-white/10 text-white';
    }
  })();

  const whatsappLink = `https://wa.me/966550085811?text=${encodeURIComponent(
    `السلام عليكم، أرغب في الاستفسار عن تفاصيل مشروع: ${project.name}`
  )}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A1628] via-[#0E203D] to-[#0A1628] pt-44 lg:pt-[18vh] pb-20 relative overflow-x-hidden text-right animate-fade-in" dir="rtl">
      {/* Background Ambience */}
      <div className="absolute top-[-5%] start-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-gold-primary/20 via-[#102A4E]/30 to-transparent rounded-full blur-[140px] pointer-events-none -z-10 opacity-90 animate-pulse-slow" />
      <div className="absolute top-[20%] end-[-10%] w-[45vw] h-[45vw] bg-gradient-to-tl from-gold-primary/12 via-[#102A4E]/25 to-transparent rounded-full blur-[130px] pointer-events-none -z-10 opacity-80" />
      <div className="absolute bottom-[10%] start-[10%] w-[40vw] h-[40vw] bg-gradient-to-tr from-[#0F2342]/40 via-gold-primary/5 to-transparent rounded-full blur-[150px] pointer-events-none -z-10 opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 1. Breadcrumbs */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-text-muted justify-start">
            <li>
              <Link href="/" className="hover:text-gold-primary transition-colors">الرئيسية</Link>
            </li>
            <ChevronLeft className="w-3.5 h-3.5 text-text-subtle" />
            <li>
              <Link href="/projects" className="hover:text-gold-primary transition-colors">مشاريعنا</Link>
            </li>
            <ChevronLeft className="w-3.5 h-3.5 text-text-subtle" />
            <li className="text-text-secondary truncate max-w-[200px] sm:max-w-none" aria-current="page">
              {project.name}
            </li>
          </ol>
        </nav>

        {/* 2. Title & Status Row */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3.5 py-1 text-xs font-extrabold border rounded-full bg-gold-primary/10 text-gold-light border-gold-primary/20 font-sans">
                مشروع سكني فاخر
              </span>
              <span className={`px-3.5 py-1 text-xs font-extrabold border rounded-full font-sans ${statusColorClass}`}>
                {projectStatusLabel}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-el-messiri leading-tight">
              {project.name}
            </h1>
            <div className="flex items-center gap-1.5 mt-2 text-xs sm:text-sm text-text-muted">
              <MapPin className="w-4 h-4 text-gold-primary shrink-0" />
              <span>حي {project.location.district}، {project.location.city}، المملكة العربية السعودية</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.brochureUrl || `/brochure-${project.slug}.pdf`}
              target={project.brochureUrl ? "_blank" : undefined}
              rel={project.brochureUrl ? "noopener noreferrer" : undefined}
              download={!project.brochureUrl}
              className="py-3 px-6 text-xs font-extrabold btn-premium-gold flex items-center justify-center gap-2 cursor-pointer font-el-messiri"
            >
              <Download className="w-4 h-4" />
              <span>تحميل البروفايل (PDF)</span>
            </a>
          </div>
        </section>

        {/* 3. Media Gallery (Full Width) */}
        <div className="w-full">
          <MediaGallery images={galleryImages} videos={project.media.videos} title={project.name} />
        </div>

        {/* 4. Split Layout Section: Pricing & Inquiry (Right) vs Map (Left) - Equal Height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Right side: Price Range and Inquiry stacked */}
          <div className="flex flex-col gap-6 justify-between h-full">
            
            {/* Price Range Panel */}
            <section className="bg-[#0E203D]/60 backdrop-blur-xl border border-gold-primary/45 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex-1 flex flex-col justify-center">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-deep via-gold-primary to-gold-deep"></div>
              
              <span className="text-[10px] text-text-muted block mb-1">نطاق أسعار وحدات المشروع السكنية</span>
              <h2 className="text-xl sm:text-2xl font-black text-gold-primary font-el-messiri leading-tight">
                <span className="font-sans text-xs block text-text-secondary font-normal mb-1">تبدأ من:</span>
                <span className="font-sans text-3xl font-black">{formatPrice(project.priceRange.min)}</span>
                {project.priceRange.max > project.priceRange.min && (
                  <>
                    <span className="mx-2 text-text-muted text-sm font-normal">إلى</span>
                    <span className="font-sans text-3xl font-black block mt-1">{formatPrice(project.priceRange.max)}</span>
                  </>
                )}
              </h2>

              <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-5 mt-4 text-xs text-text-secondary">
                <div>
                  <span className="text-[9px] text-text-muted block mb-0.5">نوع الاستثمار</span>
                  <span className="font-extrabold text-white">تملك سكني فاخر</span>
                </div>
                <div>
                  <span className="text-[9px] text-text-muted block mb-0.5">الدفعة الأولى</span>
                  <span className="font-extrabold text-status-available">متاحة وميسرة</span>
                </div>
              </div>
            </section>

            {/* Quick Contact Box */}
            <section className="bg-[#0E203D]/50 backdrop-blur-xl border border-gold-primary/35 rounded-3xl p-6 sm:p-8 shadow-2xl flex-1 flex flex-col justify-center">
              <h3 className="text-sm sm:text-base font-extrabold text-white mb-4 font-el-messiri">استفسر عن المشروع</h3>
              <ProjectSidebarInquiry whatsappLink={whatsappLink} />
            </section>

          </div>

          {/* Left side: Map stretching to equal height of cards */}
          <section className="bg-[#0E203D]/50 backdrop-blur-xl border border-gold-primary/35 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between h-full min-h-[350px]">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-white font-el-messiri flex items-center gap-2">
                  <Map className="w-5 h-5 text-gold-primary" />
                  <span>موقع المشروع</span>
                </h2>
                <p className="text-xs text-text-muted mt-1">المملكة العربية السعودية، مدينة {project.location.city}، حي {project.location.district}</p>
              </div>
            </div>

            {/* Real Google Maps Container */}
            <div className="relative w-full flex-1 rounded-2xl overflow-hidden border border-gold-primary/30 shadow-lg bg-[#0B1A30] group/map min-h-[220px]">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(`${project.name}، حي ${project.location.district}، ${project.location.city}`)}&z=15&output=embed`}
                className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                allowFullScreen
                loading="lazy"
                title={project.name}
              ></iframe>
              
              {/* Overlay Badge */}
              <div className="absolute bottom-3 end-3 bg-bg-midnight/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-[10px] text-gold-light flex items-center gap-1.5 pointer-events-none group-hover/map:border-gold-primary/45 transition-colors duration-300">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-primary" />
                <span className="font-bold">ضمانات تشطيب كاملة متوافقة كلياً</span>
              </div>
            </div>
          </section>

        </div>

        {/* 5. Project Highlights / Specifications Panel (Full Width) */}
        <section className="bg-[#0E203D]/50 backdrop-blur-xl border border-gold-primary/35 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h2 className="text-base sm:text-lg font-extrabold text-white mb-6 font-el-messiri flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold-primary" />
            <span>مميزات ومواصفات المجمع السكني</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center">
              <Building2 className="w-6 h-6 text-gold-primary mb-2" />
              <span className="text-[10px] text-text-muted mb-0.5">إجمالي الوحدات</span>
              <span className="text-sm font-extrabold text-white font-sans">{project.specs.totalUnits} شقة</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center">
              <LayoutGrid className="w-6 h-6 text-gold-primary mb-2" />
              <span className="text-[10px] text-text-muted mb-0.5">الوحدات المتاحة</span>
              <span className="text-sm font-extrabold text-gold-light font-sans">{project.specs.availableUnits} شقة</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center">
              <Calendar className="w-6 h-6 text-gold-primary mb-2" />
              <span className="text-[10px] text-text-muted mb-0.5">تاريخ الاستلام</span>
              <span className="text-sm font-extrabold text-white">{project.specs.completionDate}</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center">
              <Tag className="w-6 h-6 text-gold-primary mb-2" />
              <span className="text-[10px] text-text-muted mb-0.5">الحد الأدنى للسعر</span>
              <span className="text-[11px] font-extrabold text-gold-light font-sans">
                {formatPrice(project.priceRange.min)}
              </span>
            </div>
          </div>
        </section>

        {/* 6. Description & Amenities Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Description Section */}
          <div className="lg:col-span-2 h-full">
            <section className="bg-[#0E203D]/50 backdrop-blur-xl border border-gold-primary/35 rounded-3xl p-6 sm:p-8 shadow-2xl h-full">
              <h2 className="text-base sm:text-lg font-extrabold text-white mb-4 font-el-messiri">عن المشروع</h2>
              <p className="text-sm text-text-secondary leading-relaxed font-sans whitespace-pre-line">
                {project.description}
              </p>
            </section>
          </div>

          {/* Side Column: Warranties and info */}
          <section className="bg-[#0E203D]/50 backdrop-blur-xl border border-gold-primary/35 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white font-el-messiri flex items-center gap-1.5 mb-6">
                <ShieldCheck className="w-5 h-5 text-gold-primary shrink-0" />
                <span>امتيازات وضمانات المطور</span>
              </h3>
              <ul className="space-y-3.5 text-xs text-text-secondary list-disc list-inside ps-2">
                <li>هيكل إنشائي خرساني بضمانات تصل إلى 15 سنة.</li>
                <li>كود أمني ذكي للمجمع بالكامل على مدار 24 ساعة.</li>
                <li>توزيع حدائق ومسطحات خضراء داخلية بالمشروع.</li>
                <li>مواقف سيارات خاصة وسفلية آمنة ومظللة.</li>
              </ul>
            </div>
          </section>

        </div>

        {/* 7. Associated Properties List */}
        <section className="border-t border-white/10 pt-16 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-white font-el-messiri">
                وحدات سكنية متاحة في <span className="text-gold-primary">{project.name}</span>
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-1">تصفح الشقق والملحقات المتوفرة للبيع الفوري في هذا المجمع</p>
            </div>
            
            <Link
              href={`/properties?project=${project.slug}`}
              className="px-5 py-2.5 text-xs font-bold bg-white/5 hover:bg-gold-primary/10 text-white hover:text-gold-light border border-white/10 hover:border-gold-primary/30 rounded-xl transition-all text-center self-start sm:self-center"
            >
              عرض كافة الوحدات
            </Link>
          </div>

          {associatedProperties.length > 0 ? (
            <UnitsCarousel properties={associatedProperties} />
          ) : (
            <div className="p-12 rounded-3xl bg-[#0F2342]/20 border border-white/5 text-center flex flex-col items-center justify-center max-w-2xl mx-auto">
              <Info className="w-10 h-10 text-gold-primary mb-3" />
              <h3 className="text-base font-extrabold text-white mb-1">لا توجد وحدات سكنية معروضة حالياً</h3>
              <p className="text-xs text-text-muted">تم بيع كافة وحدات هذا المشروع بالكامل أو يرجى التواصل معنا للاستعلام عن توافر وحدات أوف-بلان غير معلنة.</p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

// Generate static params for prerendering dynamic project routes
export async function generateStaticParams() {
  try {
    const supabase = getSupabaseAdminClient();
    const { data } = await supabase.from('projects').select('slug');
    return ((data || []) as any[]).map((p) => ({
      slug: p.slug,
    }));
  } catch (e) {
    console.error("Error generating static params for projects:", e);
    return [];
  }
}
