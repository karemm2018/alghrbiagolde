// src/app/golden-cp/properties/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdminBreadcrumb from '../../../components/admin/layout/AdminBreadcrumb';
import AdminSelect from '../../../components/admin/AdminSelect';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  Star,
  Building2,
} from 'lucide-react';

// Temporary: import from mockData until Supabase is connected
import { PROPERTIES, Property } from '../../../lib/mockData';

const STATUS_LABELS: Record<string, { label: string; class: string }> = {
  available: { label: 'متاح', class: 'neu-badge-success neu-badge-dot' },
  reserved: { label: 'محجوز', class: 'neu-badge-warning neu-badge-dot' },
  sold: { label: 'مُباع', class: 'neu-badge-danger neu-badge-dot' },
  coming_soon: { label: 'قريباً', class: 'neu-badge-info neu-badge-dot' },
};

const TYPE_LABELS: Record<string, string> = {
  apartment: 'شقة',
  villa: 'فيلا',
  annex: 'ملحق',
  penthouse: 'بنتهاوس',
  duplex: 'دوبلكس',
};

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredProperties = PROPERTIES.filter((prop) => {
    const matchesSearch = !searchQuery ||
      prop.title.includes(searchQuery) ||
      prop.location.city.includes(searchQuery) ||
      prop.location.district.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || prop.status === statusFilter;
    const matchesType = typeFilter === 'all' || prop.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div>
      <AdminBreadcrumb items={[{ label: 'العقارات' }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--neu-text-heading)]">إدارة العقارات</h2>
          <p className="text-sm text-[var(--neu-text-muted)] mt-1">
            {PROPERTIES.length} عقار مسجّل في النظام
          </p>
        </div>
        <Link href="/golden-cp/properties/new" className="neu-btn neu-btn-primary">
          <Plus className="w-4 h-4" />
          إضافة عقار
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="neu-card mb-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--neu-text-muted)]" />
            <input
              type="text"
              placeholder="ابحث بالعنوان، المدينة، أو الحي..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="neu-input neu-input-search"
            />
          </div>

          {/* Status Filter */}
          <AdminSelect
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'all', label: 'كل الحالات' },
              { value: 'available', label: 'متاح' },
              { value: 'reserved', label: 'محجوز' },
              { value: 'sold', label: 'مُباع' },
              { value: 'coming_soon', label: 'قريباً' },
            ]}
            className="w-full md:w-40"
            placeholder="تصفية حسب الحالة"
          />

          {/* Type Filter */}
          <AdminSelect
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { value: 'all', label: 'كل الأنواع' },
              { value: 'apartment', label: 'شقة' },
              { value: 'villa', label: 'فيلا' },
              { value: 'annex', label: 'ملحق' },
              { value: 'penthouse', label: 'بنتهاوس' },
              { value: 'duplex', label: 'دوبلكس' },
            ]}
            className="w-full md:w-40"
            placeholder="تصفية حسب النوع"
          />
        </div>
      </div>

      {/* Properties Table */}
      <div className="neu-table-wrapper overflow-x-auto">
        <table className="neu-table">
          <thead>
            <tr>
              <th>العقار</th>
              <th className="hidden md:table-cell">النوع</th>
              <th>الحالة</th>
              <th className="hidden sm:table-cell">السعر</th>
              <th className="hidden lg:table-cell">المشروع</th>
              <th className="hidden xl:table-cell">المدينة</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((prop) => (
              <tr key={prop.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[var(--neu-depressed)] shrink-0 relative">
                      <Image
                        src={prop.media.thumbnail}
                        alt={prop.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[var(--neu-text-heading)] truncate max-w-[200px]">
                        {prop.title}
                      </p>
                      <p className="text-xs text-[var(--neu-text-muted)] mt-0.5">
                        {prop.specs.bedrooms} غرف · {prop.specs.area} م²
                      </p>
                    </div>
                    {prop.featured && (
                      <Star className="w-4 h-4 text-[var(--neu-gold)] fill-[var(--neu-gold)] shrink-0" />
                    )}
                  </div>
                </td>
                <td className="hidden md:table-cell">
                  <span className="neu-badge neu-badge-gold">
                    {TYPE_LABELS[prop.type] || prop.type}
                  </span>
                </td>
                <td>
                  <span className={`neu-badge ${STATUS_LABELS[prop.status]?.class || ''}`}>
                    {STATUS_LABELS[prop.status]?.label || prop.status}
                  </span>
                </td>
                <td className="hidden sm:table-cell">
                  <span className="font-semibold text-[var(--neu-gold)]">
                    {prop.pricing.price.toLocaleString('en-US')}
                  </span>
                  <span className="text-xs text-[var(--neu-text-muted)] ms-1">ر.س</span>
                </td>
                <td className="hidden lg:table-cell">
                  <span className="text-sm text-[var(--neu-text-secondary)]">
                    {prop.project.name}
                  </span>
                </td>
                <td className="hidden xl:table-cell">
                  <span className="text-sm text-[var(--neu-text-secondary)]">
                    {prop.location.city}، {prop.location.district}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/property/${prop.slug}`}
                      target="_blank"
                      className="neu-btn neu-btn-ghost neu-btn-sm"
                      title="معاينة"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/golden-cp/properties/${prop.id}`}
                      className="neu-btn neu-btn-ghost neu-btn-sm"
                      title="تعديل"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <button
                      className="neu-btn neu-btn-ghost neu-btn-sm text-[var(--neu-danger)] hover:!text-[var(--neu-danger)]"
                      title="حذف"
                      aria-label={`حذف عقار ${prop.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProperties.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Building2 className="w-12 h-12 text-[var(--neu-text-muted)] mb-3 opacity-30" />
            <p className="text-[var(--neu-text-secondary)] font-medium">لا توجد عقارات مطابقة</p>
            <p className="text-xs text-[var(--neu-text-muted)] mt-1">جرّب تغيير معايير البحث</p>
          </div>
        )}
      </div>
    </div>
  );
}
