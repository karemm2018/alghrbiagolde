// src/app/golden-cp/projects/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdminBreadcrumb from '../../../components/admin/layout/AdminBreadcrumb';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  Star,
  FolderKanban,
} from 'lucide-react';

import { PROJECTS } from '../../../lib/mockData';

const STATUS_LABELS: Record<string, { label: string; class: string }> = {
  under_construction: { label: 'تحت الإنشاء', class: 'neu-badge-warning neu-badge-dot' },
  completed: { label: 'مكتمل', class: 'neu-badge-success neu-badge-dot' },
  upcoming: { label: 'قادم', class: 'neu-badge-info neu-badge-dot' },
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = PROJECTS.filter((proj) => {
    if (!searchQuery) return true;
    return proj.name.includes(searchQuery) || proj.location.city.includes(searchQuery);
  });

  return (
    <div>
      <AdminBreadcrumb items={[{ label: 'المشاريع' }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--neu-text-heading)]">إدارة المشاريع</h2>
          <p className="text-sm text-[var(--neu-text-muted)] mt-1">
            {PROJECTS.length} مشروع مسجّل
          </p>
        </div>
        <Link href="/golden-cp/projects/new" className="neu-btn neu-btn-primary">
          <Plus className="w-4 h-4" />
          إضافة مشروع
        </Link>
      </div>

      {/* Search */}
      <div className="neu-card mb-6">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--neu-text-muted)]" />
          <input
            type="text"
            placeholder="ابحث بالاسم أو المدينة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="neu-input pe-10"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredProjects.map((proj) => (
          <div key={proj.id} className="neu-card neu-card-interactive overflow-hidden p-0">
            {/* Image */}
            <div className="relative h-48 bg-[var(--neu-depressed)]">
              <Image
                src={proj.media.hero}
                alt={proj.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className={`neu-badge ${STATUS_LABELS[proj.status]?.class}`}>
                  {STATUS_LABELS[proj.status]?.label}
                </span>
              </div>
              {proj.featured && (
                <div className="absolute top-3 left-3">
                  <Star className="w-5 h-5 text-[var(--neu-gold)] fill-[var(--neu-gold)]" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-[var(--neu-text-heading)] mb-1">{proj.name}</h3>
              <p className="text-sm text-[var(--neu-text-muted)] mb-3">
                {proj.location.city}، {proj.location.district}
              </p>

              <div className="flex items-center justify-between text-sm mb-4">
                <div>
                  <span className="text-[var(--neu-text-muted)]">الوحدات: </span>
                  <span className="font-semibold text-[var(--neu-text-heading)]">
                    {proj.specs.availableUnits}/{proj.specs.totalUnits}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--neu-gold)] font-bold">
                    {proj.priceRange.min.toLocaleString('en-US')}
                  </span>
                  <span className="text-xs text-[var(--neu-text-muted)] ms-1">ر.س</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/projects/${proj.slug}`}
                  target="_blank"
                  className="neu-btn neu-btn-ghost neu-btn-sm flex-1"
                >
                  <Eye className="w-4 h-4" />
                  معاينة
                </Link>
                <Link
                  href={`/golden-cp/projects/${proj.id}`}
                  className="neu-btn neu-btn-secondary neu-btn-sm flex-1"
                >
                  <Edit3 className="w-4 h-4" />
                  تعديل
                </Link>
                <button
                  className="neu-btn neu-btn-danger neu-btn-sm"
                  title="حذف"
                  aria-label={`حذف مشروع ${proj.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="neu-card flex flex-col items-center justify-center py-16 text-center">
          <FolderKanban className="w-12 h-12 text-[var(--neu-text-muted)] mb-3 opacity-30" />
          <p className="text-[var(--neu-text-secondary)] font-medium">لا توجد مشاريع مطابقة</p>
        </div>
      )}
    </div>
  );
}
