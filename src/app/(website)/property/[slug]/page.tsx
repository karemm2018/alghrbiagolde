// src/app/property/[slug]/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PROPERTIES } from '@/lib/mockData';
import { getPropertyBySlug } from '@/app/actions/properties';
import MediaGallery from '@/components/ui/MediaGallery';
import { PropertyFavoriteShare, PropertySidebarInquiry } from '@/components/property/PropertyActions';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Building2,
  Compass,
  Layers,
  Car,
  ChevronLeft,
  ShieldCheck,
  Eye,
  Info,
  Sparkles,
  Map,
  CheckCircle
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata dynamically on the server for search engine optimization
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  return {
    title: property ? `${property.title} | شركة الغربية الذهبية` : 'وحدة عقارية فاخرة',
    description: property?.description || 'تصفح تفاصيل ومواصفات الوحدة العقارية المعروضة تملّكاً واستثماراً.',
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  // Generate backup images if the property has only 1 image in mockup data
  const galleryImages =
    property.media.images && property.media.images.length > 1
      ? property.media.images
      : [
          property.media.images[0] || '/properties/apartment.webp',
          '/properties/villa.webp',
          '/properties/penthouse.webp',
          '/properties/apartment.webp'
        ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(price) + ' ر.س';
  };

  const propertyTypeLabel = (() => {
    switch (property.type) {
      case 'apartment': return 'شقة سكنية';
      case 'villa': return 'فيلا فاخرة';
      case 'annex': return 'ملحق روف';
      case 'penthouse': return 'بنتهاوس فاخر';
      case 'duplex': return 'دوبلكس راقي';
      default: return 'وحدة عقارية';
    }
  })();

  const propertyStatusLabel = (() => {
    switch (property.status) {
      case 'available': return 'متاحة للبيع';
      case 'reserved': return 'محجوزة';
      case 'sold': return 'تم البيع';
      case 'coming_soon': return 'قريباً';
      default: return 'نشط';
    }
  })();

  const statusColorClass = (() => {
    switch (property.status) {
      case 'available': return 'bg-status-available/10 text-status-available border-status-available/30';
      case 'reserved': return 'bg-status-reserved/10 text-status-reserved border-status-reserved/30';
      case 'sold': return 'bg-status-sold/10 text-status-sold border-status-sold/30';
      case 'coming_soon': return 'bg-status-soon/10 text-status-soon border-status-soon/30';
      default: return 'bg-white/10 text-white';
    }
  })();

  const directionLabel = (() => {
    if (!property.specs.direction) return 'غير محدد';
    switch (property.specs.direction) {
      case 'north': return 'شمالية';
      case 'south': return 'جنوبية';
      case 'east': return 'شرقية';
      case 'west': return 'غربية';
      case 'corner': return 'على زاوية';
      default: return property.specs.direction;
    }
  })();

  const whatsappLink = `https://wa.me/966550085811?text=${encodeURIComponent(
    `السلام عليكم، أرغب في الاستفسار عن تفاصيل: ${property.title} (${property.pricing.price} ر.س)`
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
              <Link href="/properties" className="hover:text-gold-primary transition-colors">الوحدات السكنية</Link>
            </li>
            <ChevronLeft className="w-3.5 h-3.5 text-text-subtle" />
            <li className="text-text-secondary truncate max-w-[200px] sm:max-w-none" aria-current="page">
              {property.title}
            </li>
          </ol>
        </nav>

        {/* 2. Title & Action Row */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3.5 py-1 text-xs font-extrabold border rounded-full bg-gold-primary/10 text-gold-light border-gold-primary/20 font-sans">
                {propertyTypeLabel}
              </span>
              <span className={`px-3.5 py-1 text-xs font-extrabold border rounded-full font-sans ${statusColorClass}`}>
                {propertyStatusLabel}
              </span>
              {property.project.slug !== 'independent' && (
                <Link
                  href={`/projects/${property.project.slug}`}
                  className="px-3.5 py-1 text-xs font-extrabold border rounded-full bg-brand-primary/10 text-brand-light border-brand-primary/20 hover:border-gold-primary/40 hover:text-gold-light transition-all font-sans"
                >
                  {property.project.name}
                </Link>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-el-messiri leading-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-1.5 mt-2 text-xs sm:text-sm text-text-muted">
              <MapPin className="w-4 h-4 text-gold-primary shrink-0" />
              <span>{property.location.address}</span>
            </div>
          </div>

          {/* Share & Favorite Component (Client Side) */}
          <PropertyFavoriteShare title={property.title} />
        </section>

        {/* 3. Reusable Client Photo Gallery & Video Player (Full Width) */}
        <div className="w-full">
          <MediaGallery images={galleryImages} videos={property.media.videos} title={property.title} />
        </div>

        {/* 4. Split Layout Section: Pricing & Inquiry (Right) vs Map (Left) - Equal Height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Right side: stacked pricing and inquiry cards */}
          <div className="flex flex-col gap-6 justify-between h-full">
            
            {/* Pricing Card */}
            <section className="bg-[#0E203D]/60 backdrop-blur-xl border border-gold-primary/45 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex-1 flex flex-col justify-center">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-deep via-gold-primary to-gold-deep"></div>
              
              <span className="text-[10px] text-text-muted block mb-1">قيمة العقار الإجمالية</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gold-primary font-el-messiri leading-none mb-6">
                {formatPrice(property.pricing.price)}
              </h2>

              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-xs text-text-secondary">
                <div>
                  <span className="text-[9px] text-text-muted block mb-1">سعر المتر المربع</span>
                  <span className="font-extrabold text-white font-sans text-sm">{formatPrice(property.pricing.pricePerMeter)} / م²</span>
                </div>
                <div>
                  <span className="text-[9px] text-text-muted block mb-1">قابلية التفاوض</span>
                  <span className={`font-extrabold text-sm ${property.pricing.isNegotiable ? 'text-status-available' : 'text-text-muted'}`}>
                    {property.pricing.isNegotiable ? 'قابل للتفاوض' : 'السعر نهائي'}
                  </span>
                </div>
              </div>
            </section>

            {/* Inquiry Card */}
            <section className="bg-[#0E203D]/50 backdrop-blur-xl border border-gold-primary/35 rounded-3xl p-6 sm:p-8 shadow-2xl flex-1 flex flex-col justify-center">
              <h3 className="text-sm sm:text-base font-extrabold text-white mb-4 font-el-messiri">استفسر عن العقار</h3>
              <PropertySidebarInquiry whatsappLink={whatsappLink} />
            </section>

          </div>

          {/* Left side: Map Stretching to match height of stacked cards */}
          <section className="bg-[#0E203D]/50 backdrop-blur-xl border border-gold-primary/35 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between h-full min-h-[350px]">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-white font-el-messiri flex items-center gap-2">
                  <Map className="w-5 h-5 text-gold-primary" />
                  <span>الموقع الجغرافي</span>
                </h2>
                <p className="text-xs text-text-muted mt-1">يقع العقار في حي {property.location.district} بمدينة {property.location.city}</p>
              </div>
            </div>

            {/* Real Google Maps Container */}
            <div className="relative w-full flex-1 rounded-2xl overflow-hidden border border-gold-primary/30 shadow-lg bg-[#0B1A30] group/map min-h-[220px]">
              <iframe
                src={`https://maps.google.com/maps?q=${property.location.coordinates.lat},${property.location.coordinates.lng}&z=15&output=embed`}
                className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                allowFullScreen
                loading="lazy"
                title={property.title}
              ></iframe>
              
              {/* Overlay Badge */}
              <div className="absolute bottom-3 end-3 bg-bg-midnight/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-[10px] text-gold-light flex items-center gap-1.5 pointer-events-none group-hover/map:border-gold-primary/45 transition-colors duration-300">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-primary" />
                <span className="font-bold">متوافق مع الكود السعودي للبناء</span>
              </div>
            </div>
          </section>

        </div>

        {/* 5. Specifications Grid Panel (Full Width) */}
        <section className="bg-[#0E203D]/50 backdrop-blur-xl border border-gold-primary/35 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h2 className="text-base sm:text-lg font-extrabold text-white mb-6 font-el-messiri flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold-primary" />
            <span>مواصفات وتفاصيل الوحدة</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            
            {/* Spec item 1: Area */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-gold-primary/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary mb-3 shadow-[0_4px_10px_rgba(201,169,110,0.15)] group-hover:scale-105 transition-transform duration-300">
                <Maximize2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-text-muted mb-0.5">المساحة الإجمالية</span>
              <span className="text-sm font-extrabold text-white font-sans">{property.specs.area} م²</span>
            </div>

            {/* Spec item 2: Bedrooms */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-gold-primary/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary mb-3 shadow-[0_4px_10px_rgba(201,169,110,0.15)] group-hover:scale-105 transition-transform duration-300">
                <Bed className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-text-muted mb-0.5">غرف النوم</span>
              <span className="text-sm font-extrabold text-white">{property.specs.bedrooms} غرف</span>
            </div>

            {/* Spec item 3: Bathrooms */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-gold-primary/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary mb-3 shadow-[0_4px_10px_rgba(201,169,110,0.15)] group-hover:scale-105 transition-transform duration-300">
                <Bath className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-text-muted mb-0.5">دورات المياه</span>
              <span className="text-sm font-extrabold text-white">{property.specs.bathrooms} حمامات</span>
            </div>

            {/* Spec item 4: Parking */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-gold-primary/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary mb-3 shadow-[0_4px_10px_rgba(201,169,110,0.15)] group-hover:scale-105 transition-transform duration-300">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-text-muted mb-0.5">موقف سيارات</span>
              <span className="text-sm font-extrabold text-white">
                {property.specs.parking ? `${property.specs.parking} موقف` : 'غير متاح'}
              </span>
            </div>

            {/* Spec item 5: Floor */}
            {property.specs.floor !== undefined && (
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-gold-primary/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary mb-3 shadow-[0_4px_10px_rgba(201,169,110,0.15)] group-hover:scale-105 transition-transform duration-300">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-text-muted mb-0.5">الطابق / الدور</span>
                <span className="text-sm font-extrabold text-white">
                  {property.specs.floor === 0 ? 'الأرضي' : `${property.specs.floor}`}
                </span>
              </div>
            )}

            {/* Spec item 6: Direction */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-gold-primary/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary mb-3 shadow-[0_4px_10px_rgba(201,169,110,0.15)] group-hover:scale-105 transition-transform duration-300">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-text-muted mb-0.5">اتجاه الواجهة</span>
              <span className="text-sm font-extrabold text-white">{directionLabel}</span>
            </div>

            {/* Spec item 7: View */}
            {property.specs.view && (
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-gold-primary/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary mb-3 shadow-[0_4px_10px_rgba(201,169,110,0.15)] group-hover:scale-105 transition-transform duration-300">
                  <Eye className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-text-muted mb-0.5">الإطلالة</span>
                <span className="text-sm font-extrabold text-white truncate max-w-[110px]">{property.specs.view}</span>
              </div>
            )}

            {/* Spec item 8: Kitchen */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center group hover:border-gold-primary/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary mb-3 shadow-[0_4px_10px_rgba(201,169,110,0.15)] group-hover:scale-105 transition-transform duration-300">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-text-muted mb-0.5">المطبخ</span>
              <span className="text-sm font-extrabold text-white">{property.specs.kitchen ? 'مستقل وجاهز' : 'غير مجهز'}</span>
            </div>

          </div>
        </section>

        {/* 6. Description (Full Width) */}
        <section className="bg-[#0E203D]/50 backdrop-blur-xl border border-gold-primary/35 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 start-0 w-24 h-24 bg-gold-primary/5 rounded-full blur-2xl pointer-events-none" />
          <h2 className="text-base sm:text-lg font-extrabold text-white mb-4 font-el-messiri">الوصف التفصيلي</h2>
          <p className="text-sm text-text-secondary leading-relaxed font-sans whitespace-pre-line">
            {property.description}
          </p>
        </section>

        {/* 7. Amenities, Project Banner & Safety summary Cards Grid */}
        <div className={`grid grid-cols-1 ${property.project.slug !== 'independent' ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-8 items-stretch`}>
          
          {/* Amenities Checklist */}
          {property.specs.features && property.specs.features.length > 0 && (
            <section className="bg-[#0E203D]/50 backdrop-blur-xl border border-gold-primary/35 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-white mb-6 font-el-messiri flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-gold-primary" />
                  <span>الضمانات والتجهيزات</span>
                </h2>

                <div className="grid grid-cols-1 gap-3">
                  {property.specs.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.01] border border-white/5 hover:border-gold-primary/20 transition-colors">
                      <CheckCircle className="w-4 h-4 text-gold-primary shrink-0" />
                      <span className="text-xs font-bold text-slate-100">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Project Banner link (if associated) */}
          {property.project.slug !== 'independent' && (
            <section className="bg-gradient-to-br from-[#0F2342] to-[#0A1628] border border-gold-primary/40 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gold-primary">
                  <Building2 className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">مشروع عقاري متكامل</span>
                </div>
                
                <div>
                  <h4 className="text-base font-extrabold text-white font-el-messiri">{property.project.name}</h4>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">تنتمي هذه الشقة لمجمعنا السكني المكتمل الخدمات بحي السلامة والروضة بجدة.</p>
                </div>
              </div>

              <Link
                href={`/projects/${property.project.slug}`}
                className="w-full mt-6 py-2.5 text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-gold-primary/30 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <span>عرض تفاصيل المشروع الكامل</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </section>
          )}

          {/* Safety & Warranties summary Card */}
          <section className="bg-[#0E203D]/50 backdrop-blur-xl border border-gold-primary/35 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white font-el-messiri flex items-center gap-1.5 mb-6">
                <ShieldCheck className="w-5 h-5 text-gold-primary shrink-0" />
                <span>ضمانات الغربية الذهبية</span>
              </h3>
              <ul className="space-y-3.5 text-xs text-text-secondary list-disc list-inside ps-2">
                <li>ضمان 15 سنة على الهيكل الإنشائي والخرسانات.</li>
                <li>ضمان 5 سنوات على أعمال السباكة والكهرباء والدهانات.</li>
                <li>ضمان 2 سنتين على الأنظمة الذكية والمصاعد والمضخات.</li>
                <li>توافر خزان أرضي وعلوي مستقل لكل وحدة سكنية.</li>
              </ul>
            </div>
          </section>

        </div>

      </div>
    </main>
  );
}

// Generate static params for prerendering dynamic page routes
export async function generateStaticParams() {
  return PROPERTIES.map((p) => ({
    slug: p.slug,
  }));
}
