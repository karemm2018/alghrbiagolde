// src/app/algharbia-cp/properties/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
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
  Loader2,
} from 'lucide-react';
import { getPropertiesListAdmin, deleteProperty } from '@/app/actions/properties';

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
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const fetchProperties = async () => {
    setLoading(true);
    const data = await getPropertiesListAdmin();
    setProperties(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`هل أنت متأكد من رغبتك في حذف العقار "${title}"؟`)) {
      const res = await deleteProperty(id);
      if (res.success) {
        setProperties((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("فشل حذف العقار: " + res.error);
      }
    }
  };

  const filteredProperties = properties.filter((prop) => {
    const titleText = prop.title || '';
    const cityText = prop.city || prop.location?.city || '';
    const districtText = prop.district || prop.location?.district || '';
    
    const matchesSearch = !searchQuery ||
      titleText.includes(searchQuery) ||
      cityText.includes(searchQuery) ||
      districtText.includes(searchQuery);
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
            {properties.length} عقار مسجّل في النظام
          </p>
        </div>
        <Link href="/algharbia-cp/properties/new" className="neu-btn neu-btn-primary">
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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 className="w-10 h-10 text-[var(--neu-gold)] animate-spin mb-3" />
            <p className="text-sm text-[var(--neu-text-secondary)]">جاري تحميل العقارات من قاعدة البيانات...</p>
          </div>
        ) : (
          <>
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
                {filteredProperties.map((prop) => {
                  const bedroomsVal = prop.bedrooms !== undefined ? prop.bedrooms : prop.specs?.bedrooms;
                  const areaVal = prop.area !== undefined ? prop.area : prop.specs?.area;
                  const priceVal = prop.price !== undefined ? prop.price : prop.pricing?.price;
                  const thumbnailSrc = prop.thumbnail || prop.media?.thumbnail || '/properties/placeholder.webp';
                  const projectName = prop.projects?.name || prop.project?.name || 'عقار منفصل';
                  const cityVal = prop.city || prop.location?.city || '';
                  const districtVal = prop.district || prop.location?.district || '';

                  return (
                    <tr key={prop.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-[var(--neu-depressed)] shrink-0 relative">
                            <Image
                              src={thumbnailSrc}
                              alt={prop.title}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-[var(--neu-text-heading)] truncate max-w-[200px]">
                              {prop.title}
                            </p>
                            <p className="text-xs text-[var(--neu-text-muted)] mt-0.5">
                              {bedroomsVal} غرف · {areaVal} م²
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
                          {priceVal ? priceVal.toLocaleString('en-US') : '0'}
                        </span>
                        <span className="text-xs text-[var(--neu-text-muted)] ms-1">ر.س</span>
                      </td>
                      <td className="hidden lg:table-cell">
                        <span className="text-sm text-[var(--neu-text-secondary)]">
                          {projectName}
                        </span>
                      </td>
                      <td className="hidden xl:table-cell">
                        <span className="text-sm text-[var(--neu-text-secondary)]">
                          {cityVal}، {districtVal}
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
                            href={`/algharbia-cp/properties/${prop.id}`}
                            className="neu-btn neu-btn-ghost neu-btn-sm"
                            title="تعديل"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(prop.id, prop.title)}
                            className="neu-btn neu-btn-ghost neu-btn-sm text-[var(--neu-danger)] hover:!text-[var(--neu-danger)]"
                            title="حذف"
                            aria-label={`حذف عقار ${prop.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredProperties.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Building2 className="w-12 h-12 text-[var(--neu-text-muted)] mb-3 opacity-30" />
                <p className="text-[var(--neu-text-secondary)] font-medium">لا توجد عقارات مطابقة</p>
                <p className="text-xs text-[var(--neu-text-muted)] mt-1">جرّب تغيير معايير البحث</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
