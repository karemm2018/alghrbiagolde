'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Download, ArrowLeft } from 'lucide-react';
import { Project } from '@/lib/mockData';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(price) + ' ر.س';
};

function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative w-full bg-bg-navy/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-gold-primary/40 shadow-[0_16px_48px_rgba(0,0,0,0.4)] hover:border-gold-primary/75 transition-all duration-500 mb-12">
      <div className="absolute top-0 start-0 w-full h-[3px] bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="order-1 lg:order-2 lg:col-span-7 relative h-64 sm:h-80 md:h-[400px] lg:h-auto min-h-[260px] lg:min-h-[440px] overflow-hidden bg-bg-deep">
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/75 via-transparent to-transparent z-10"></div>

          <div className="absolute top-6 end-6 z-20 flex flex-wrap gap-2">
            <span className="px-4 py-1.5 text-xs font-extrabold text-bg-midnight bg-gold-primary border border-gold-primary rounded-full shadow-lg shadow-gold-primary/25 uppercase">
              مشروع مميز
            </span>
            <span className="px-4 py-1.5 text-xs font-extrabold text-white bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full">
              {project.status === 'completed' ? 'مشروع مكتمل' : project.status === 'under_construction' ? 'تحت الإنشاء' : 'قريباً'}
            </span>
          </div>

          <Image
            src={project.media.hero || "/projects/amal-stars-showcase.webp"}
            alt={project.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-[8000ms] ease-luxury group-hover:scale-108"
          />
        </div>

        <div className="order-2 lg:order-1 lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between text-start">
          <div>
            <div className="flex items-center gap-1.5 mb-3 text-xs font-semibold text-gold-primary font-el-messiri">
              <span className="w-2 h-2 rounded-full bg-gold-primary"></span>
              <span>{project.tagline}</span>
            </div>

            <Link href={`/projects/${project.slug}`}>
              <h3 className="text-xl sm:text-2xl font-extrabold text-text-primary mb-4 leading-snug font-el-messiri group-hover:text-gold-primary transition-colors duration-300">
                {project.name}
              </h3>
            </Link>

            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-text-secondary mb-5">
              <MapPin className="w-4 h-4 text-gold-primary shrink-0" />
              <span>{project.location.district}، {project.location.city}</span>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 line-clamp-4">
              {project.description}
            </p>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-6 text-xs text-text-secondary">
              <div>
                <span className="block text-text-muted mb-1.5 text-xs uppercase tracking-wider">تاريخ التسليم</span>
                <span className="font-bold text-text-primary text-xs sm:text-sm">{project.specs.completionDate}</span>
              </div>
              <div>
                <span className="block text-text-muted mb-1.5 text-xs uppercase tracking-wider">إجمالي الوحدات</span>
                <span className="font-bold text-text-primary font-mono text-xs sm:text-sm">{project.specs.totalUnits} وحدة</span>
              </div>
              <div>
                <span className="block text-text-muted mb-1.5 text-xs uppercase tracking-wider">نطاق الأسعار</span>
                <span className="font-bold text-gold-primary font-mono text-xs sm:text-sm">تبدأ من {formatPrice(project.priceRange.min)}</span>
              </div>
              <div>
                <span className="block text-text-muted mb-1.5 text-xs uppercase tracking-wider">الوحدات المتاحة</span>
                <span className="font-bold text-status-available font-mono text-xs sm:text-sm">{project.specs.availableUnits} وحدة</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full">
            <a
              href={project.brochureUrl || `/brochure-${project.slug}.pdf`}
              target={project.brochureUrl ? "_blank" : undefined}
              rel={project.brochureUrl ? "noopener noreferrer" : undefined}
              download={!project.brochureUrl}
              className="w-full sm:flex-1 py-3.5 px-6 text-xs sm:text-sm font-extrabold btn-premium-gold flex items-center justify-center gap-2 cursor-pointer font-el-messiri whitespace-nowrap min-h-[44px] rounded-full"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>تحميل البروفايل (PDF)</span>
            </a>
            <Link
              href={`/projects/${project.slug}`}
              className="w-full sm:flex-1 py-3.5 px-6 text-xs sm:text-sm font-extrabold btn-premium-glass flex items-center justify-center text-center gap-2 cursor-pointer font-el-messiri whitespace-nowrap min-h-[44px] rounded-full"
            >
              <span>استعرض المشروع</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SimplifiedProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex flex-col h-full bg-bg-navy/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-border-gold/30 hover:bg-bg-navy/60 hover:-translate-y-1 w-[280px] sm:w-[285px] md:w-[310px] shrink-0">
      <div className="absolute top-0 start-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

      <div className="relative aspect-[16/10] overflow-hidden bg-bg-deep">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/50 to-transparent z-10"></div>
        <Image
          src={project.media.hero || "/projects/amal-stars-showcase.webp"}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 200px, 290px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 end-3 z-20">
          <span className="px-2.5 py-1 text-xs font-extrabold text-white bg-gold-primary/90 rounded font-el-messiri">
            {project.status === 'completed' ? 'مكتمل' : project.status === 'under_construction' ? 'تحت الإنشاء' : 'قريباً'}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 text-start">
        <Link href={`/projects/${project.slug}`}>
          <h4 className="text-xs sm:text-sm font-extrabold text-text-primary line-clamp-1 mb-2 group-hover:text-gold-light transition-colors duration-300 font-el-messiri">
            {project.name}
          </h4>
        </Link>

        <div className="flex items-center gap-1 text-xs text-text-muted mb-3 font-el-messiri">
          <MapPin className="w-3.5 h-3.5 text-gold-primary shrink-0" />
          <span className="line-clamp-1">{project.location.district}، {project.location.city}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-text-secondary border-t border-white/5 pt-2 mb-4 font-el-messiri">
          <span className="font-semibold">{project.specs.totalUnits} وحدة</span>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <span className="font-mono">{project.specs.completionDate}</span>
        </div>

        <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-text-muted font-el-messiri">يبدأ من</p>
            <p className="text-xs sm:text-sm font-extrabold text-gold-primary font-el-messiri font-mono">
              {formatPrice(project.priceRange.min)}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={project.brochureUrl || `/brochure-${project.slug}.pdf`}
              target={project.brochureUrl ? "_blank" : undefined}
              rel={project.brochureUrl ? "noopener noreferrer" : undefined}
              download={!project.brochureUrl}
              title="تحميل البروفايل PDF"
              aria-label="تحميل البروفايل PDF"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-gold-primary/10 border border-white/10 text-text-secondary hover:text-gold-primary transition-all cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Download className="w-4 h-4" />
            </a>
            <Link
              href={`/projects/${project.slug}`}
              className="py-2 px-4 text-xs font-extrabold btn-premium-gold flex items-center gap-1 cursor-pointer font-el-messiri text-center min-h-[44px]"
            >
              <span>استعرض</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectHighlightSectionProps {
  projects: Project[];
}

export default function ProjectHighlightSection({ projects }: ProjectHighlightSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [projectsViewMode, setProjectsViewMode] = useState<'grid' | 'table'>('grid');
  const projectsTableRef = useRef<HTMLDivElement>(null);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.05 : 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const featuredProject = useMemo(() => {
    return projects.find(p => p.featured) || projects[0];
  }, [projects]);

  const carouselProjects = useMemo(() => {
    if (!featuredProject) return [];
    return projects.filter(p => p.id !== featuredProject.id);
  }, [projects, featuredProject]);

  const getProjectMarqueeItems = (items: Project[]) => {
    if (items.length === 0) return [];
    let repeated = [...items];
    while (repeated.length < 16) {
      repeated = [...repeated, ...items];
    }
    return [...repeated, ...repeated];
  };

  useEffect(() => {
    if (projectsViewMode === 'table' && projectsTableRef.current) {
      const el = projectsTableRef.current;
      el.scrollLeft = el.scrollWidth;
      const timer = setTimeout(() => {
        el.scrollLeft = el.scrollWidth;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [projectsViewMode]);

  return (
    <section id="projects-section" className="bg-gradient-to-b from-bg-deep via-bg-navy to-bg-deep border-y border-border-gold/15 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span variants={fadeUpVariants} className="block text-xs font-semibold text-gold-primary uppercase">مشاريعنا العقارية الكبرى</motion.span>
          <motion.h2 variants={fadeUpVariants} className="text-xl sm:text-3xl font-extrabold text-text-primary mt-1 liquid-gold-heading">نسعى لإيجاد مجتمعات سكنية متكاملة</motion.h2>

          <div className="flex justify-center mt-6">
            <div className="flex items-center bg-bg-royal/40 border border-border-gold/15 rounded-lg p-1 shrink-0">
              <button
                type="button"
                onClick={() => setProjectsViewMode('grid')}
                className={`px-4 py-2 rounded-md transition-all duration-300 cursor-pointer text-xs sm:text-sm font-semibold font-el-messiri min-h-[44px] flex items-center ${
                  projectsViewMode === 'grid'
                    ? 'bg-gold-primary text-bg-midnight font-bold shadow-md shadow-gold-primary/10'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                كروت العرض
              </button>
              <button
                type="button"
                onClick={() => setProjectsViewMode('table')}
                className={`px-4 py-2 rounded-md transition-all duration-300 cursor-pointer text-xs sm:text-sm font-semibold font-el-messiri min-h-[44px] flex items-center ${
                  projectsViewMode === 'table'
                    ? 'bg-gold-primary text-bg-midnight font-bold shadow-md shadow-gold-primary/10'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                جدول التفاصيل
              </button>
            </div>
          </div>
        </motion.div>

        {projectsViewMode === 'table' ? (
          <div ref={projectsTableRef} className="custom-table-wrapper w-full max-h-[60vh] overflow-auto rounded-2xl border-2 border-gold-primary/50 bg-[#0F2342]/90 backdrop-blur-xl shadow-2xl scrollbar-thin scrollbar-thumb-gold-primary scrollbar-track-transparent mb-12" dir="rtl">
            <table className="w-full min-w-[950px] text-start text-xs sm:text-sm table-auto border-collapse" dir="rtl">
              <thead className="sticky top-0 z-20 shadow-md">
                <tr className="border-b border-border-gold/30 text-gold-primary font-el-messiri bg-[#18325C]">
                  <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 text-start bg-[#18325C]">الصورة</th>
                  <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 text-start bg-[#18325C]">اسم المشروع</th>
                  <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 text-start bg-[#18325C]">الموقع</th>
                  <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 text-start bg-[#18325C]">إجمالي الوحدات</th>
                  <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 text-start bg-[#18325C]">الوحدات المتاحة</th>
                  <th className="py-4 px-5 font-bold whitespace-nowrap border-x border-border-gold/15 text-start bg-[#18325C]">نطاق الأسعار</th>
                  <th className="py-4 px-5 font-bold whitespace-nowrap text-center border-x border-border-gold/15 bg-[#18325C]">التفاصيل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-gold/15 text-white bg-[#0F2342]/40">
                {projects.map((project) => (
                  <tr key={project.id} className="odd:bg-[#0F2342]/40 even:bg-[#142B4E]/60 hover:bg-gold-primary/[0.08] transition-colors duration-150 border-b border-border-gold/10">
                    <td className="py-3 px-5 border-x border-border-gold/10 text-start">
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-border-gold/20 shadow-sm shrink-0">
                        <Image src={project.media.hero} alt={project.name} fill sizes="56px" className="object-cover" />
                      </div>
                    </td>
                    <td className="py-3 px-5 font-semibold border-x border-border-gold/10 text-start whitespace-nowrap">
                      <div className="flex flex-col gap-0.5 text-start">
                        <span className="font-bold text-white">{project.name}</span>
                        {project.tagline && <span className="text-xs text-text-muted">{project.tagline}</span>}
                      </div>
                    </td>
                    <td className="py-3 px-5 text-text-secondary border-x border-border-gold/10 text-start whitespace-nowrap">
                      {project.location.city}، {project.location.district}
                    </td>
                    <td className="py-3 px-5 text-text-secondary border-x border-border-gold/10 text-start whitespace-nowrap">{project.specs.totalUnits} وحدة</td>
                    <td className="py-3 px-5 text-gold-primary font-bold border-x border-border-gold/10 text-start whitespace-nowrap">
                      <span className="inline-block py-1 px-3 text-xs font-bold text-gold-primary bg-gold-primary/10 border border-gold-primary/20 rounded-full">
                        {project.specs.availableUnits} متاح
                      </span>
                    </td>
                    <td className="py-3 px-5 font-bold text-gold-primary font-mono border-x border-border-gold/10 text-start whitespace-nowrap">
                      من {project.priceRange.min.toLocaleString()} إلى {project.priceRange.max.toLocaleString()} ر.س
                    </td>
                    <td className="py-3 px-5 text-center border-x border-border-gold/10">
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href={project.brochureUrl || `/brochure-${project.slug}.pdf`}
                          target={project.brochureUrl ? "_blank" : undefined}
                          rel={project.brochureUrl ? "noopener noreferrer" : undefined}
                          download={!project.brochureUrl}
                          title="تحميل البروفايل PDF"
                          aria-label="تحميل البروفايل PDF"
                          className="p-2.5 rounded-lg bg-white/5 hover:bg-gold-primary/10 border border-white/10 text-text-secondary hover:text-gold-primary transition-all cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="py-2 px-5 text-xs font-bold btn-premium-gold rounded-md inline-block font-el-messiri whitespace-nowrap min-w-[125px] min-h-[44px] flex items-center justify-center"
                        >
                          عرض كامل التفاصيل
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            {featuredProject && <FeaturedProjectCard project={featuredProject} />}
            {carouselProjects.length > 0 && (
              <div className="w-full relative overflow-hidden py-4 select-none" dir="ltr">
                <div className="flex flex-row flex-nowrap gap-4 sm:gap-6 w-max animate-marquee-ltr hover:[animation-play-state:paused] cursor-pointer">
                  {getProjectMarqueeItems(carouselProjects).map((project, idx) => (
                    <div key={`${project.id}-marquee-${idx}`} dir="rtl">
                      <SimplifiedProjectCard project={project} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="text-center mt-6">
          <Link
            href="/projects"
            className="py-3.5 px-10 text-xs sm:text-sm font-extrabold btn-premium-gold inline-flex items-center gap-2 cursor-pointer font-el-messiri min-h-[44px]"
          >
            <span>عرض جميع المشاريع العقارية</span>
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 -translate-x-0.5 group-hover:-translate-x-1.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
