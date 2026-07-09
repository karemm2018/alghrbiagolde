// src/app/algharbia-cp/submissions/page.tsx
'use client';

import React, { useState } from 'react';
import AdminBreadcrumb from '../../../components/admin/layout/AdminBreadcrumb';
import AdminSelect from '../../../components/admin/AdminSelect';
import {
  Search,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle2,
  Eye,
  Filter,
  MessageSquareText,
} from 'lucide-react';

const MOCK_SUBMISSIONS = [
  { id: '1', name: 'أبو محمد الشهري', phone: '0554498018', email: 'mohammed@email.com', subject: 'استفسار عن ملحق أمل ستارز', message: 'أرغب في معرفة تفاصيل الملحق المتوفر في مشروع أمل ستارز وأقرب موعد لمعاينة الموقع.', type: 'property_inquiry' as const, resident_type: 'citizen', status: 'new' as const, created_at: '2026-07-08T14:30:00' },
  { id: '2', name: 'سارة القحطاني', phone: '0551234567', email: '', subject: 'استفسار عام', message: 'أريد معرفة المشاريع المتاحة في جدة.', type: 'contact' as const, resident_type: 'citizen', status: 'new' as const, created_at: '2026-07-08T12:15:00' },
  { id: '3', name: 'خالد العمري', phone: '0559876543', email: 'khalid@gmail.com', subject: 'استفسار عن مشروع ريناد غاليري', message: 'هل يوجد وحدات متاحة في مشروع ريناد غاليري؟', type: 'inquiry' as const, resident_type: 'resident', status: 'reviewed' as const, created_at: '2026-07-07T18:00:00' },
  { id: '4', name: 'فاطمة الحربي', phone: '0557654321', email: '', subject: 'طلب معاينة', message: 'أرغب في حجز موعد لمعاينة فيلا أبو هايل.', type: 'property_inquiry' as const, resident_type: 'citizen', status: 'closed' as const, created_at: '2026-07-06T09:45:00' },
];

const STATUS_MAP = {
  new: { label: 'جديد', class: 'neu-badge-danger neu-badge-dot' },
  reviewed: { label: 'تمت المراجعة', class: 'neu-badge-warning neu-badge-dot' },
  closed: { label: 'مغلق', class: 'neu-badge-success neu-badge-dot' },
};

const TYPE_MAP = {
  contact: 'تواصل عام',
  inquiry: 'استفسار مشروع',
  property_inquiry: 'استفسار عقار',
};

export default function SubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = MOCK_SUBMISSIONS.filter((s) => {
    const matchSearch = !searchQuery || s.name.includes(searchQuery) || s.phone.includes(searchQuery);
    const matchStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchType = typeFilter === 'all' || s.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const selectedSubmission = MOCK_SUBMISSIONS.find((s) => s.id === selectedId);

  return (
    <div>
      <AdminBreadcrumb items={[{ label: 'الاستفسارات' }]} />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--neu-text-heading)]">إدارة الاستفسارات</h2>
          <p className="text-sm text-[var(--neu-text-muted)] mt-1">
            {MOCK_SUBMISSIONS.filter((s) => s.status === 'new').length} استفسار جديد بانتظار المراجعة
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="neu-card mb-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--neu-text-muted)]" />
            <input
              type="text"
              placeholder="ابحث بالاسم أو رقم الجوال..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="neu-input neu-input-search"
            />
          </div>
          <AdminSelect
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'all', label: 'كل الحالات' },
              { value: 'new', label: 'جديد' },
              { value: 'reviewed', label: 'تمت المراجعة' },
              { value: 'closed', label: 'مغلق' },
            ]}
            className="w-full md:w-40"
            placeholder="تصفية حسب الحالة"
          />
          <AdminSelect
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { value: 'all', label: 'كل الأنواع' },
              { value: 'contact', label: 'تواصل عام' },
              { value: 'inquiry', label: 'استفسار مشروع' },
              { value: 'property_inquiry', label: 'استفسار عقار' },
            ]}
            className="w-full md:w-44"
            placeholder="تصفية حسب النوع"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Submissions List */}
        <div className="xl:col-span-2">
          <div className="neu-table-wrapper overflow-x-auto">
            <table className="neu-table">
              <thead>
                <tr>
                  <th>المرسل</th>
                  <th className="hidden sm:table-cell">النوع</th>
                  <th>الحالة</th>
                  <th className="hidden md:table-cell">التاريخ</th>
                  <th>إجراء</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((sub) => (
                  <tr
                    key={sub.id}
                    className={`cursor-pointer ${selectedId === sub.id ? '!bg-[var(--neu-gold-glow)]' : ''}`}
                    onClick={() => setSelectedId(sub.id)}
                  >
                    <td>
                      <div>
                        <p className="font-semibold text-[var(--neu-text-heading)]">{sub.name}</p>
                        <p className="text-xs text-[var(--neu-text-muted)] mt-0.5">{sub.subject}</p>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell">
                      <span className="text-xs text-[var(--neu-text-secondary)]">{TYPE_MAP[sub.type]}</span>
                    </td>
                    <td>
                      <span className={`neu-badge ${STATUS_MAP[sub.status].class}`}>
                        {STATUS_MAP[sub.status].label}
                      </span>
                    </td>
                    <td className="hidden md:table-cell">
                      <span className="text-xs text-[var(--neu-text-muted)]">
                        {new Date(sub.created_at).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <a href={`tel:${sub.phone}`} className="neu-btn neu-btn-ghost neu-btn-sm" title="اتصال">
                          <Phone className="w-4 h-4" />
                        </a>
                        <a
                          href={`https://wa.me/966${sub.phone.replace(/^0/, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="neu-btn neu-btn-ghost neu-btn-sm text-[var(--neu-gold)]"
                          title="واتساب"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <MessageSquareText className="w-12 h-12 text-[var(--neu-text-muted)] mb-3 opacity-30" />
                <p className="text-[var(--neu-text-secondary)] font-medium">لا توجد استفسارات مطابقة</p>
              </div>
            )}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="hidden xl:block">
          {selectedSubmission ? (
            <div className="neu-card sticky top-[calc(var(--topbar-height)+28px)]">
              <h3 className="text-lg font-bold text-[var(--neu-text-heading)] mb-4">تفاصيل الاستفسار</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-[var(--neu-text-muted)] mb-1">الاسم</p>
                  <p className="font-semibold text-[var(--neu-text-heading)]">{selectedSubmission.name}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--neu-text-muted)] mb-1">رقم الجوال</p>
                  <a href={`tel:${selectedSubmission.phone}`} className="font-semibold text-[var(--neu-gold)] hover:underline" dir="ltr">
                    {selectedSubmission.phone}
                  </a>
                </div>
                {selectedSubmission.email && (
                  <div>
                    <p className="text-xs text-[var(--neu-text-muted)] mb-1">البريد الإلكتروني</p>
                    <a href={`mailto:${selectedSubmission.email}`} className="text-sm text-[var(--neu-text-secondary)] hover:text-[var(--neu-gold)]" dir="ltr">
                      {selectedSubmission.email}
                    </a>
                  </div>
                )}
                <div>
                  <p className="text-xs text-[var(--neu-text-muted)] mb-1">النوع</p>
                  <span className="neu-badge neu-badge-gold">{TYPE_MAP[selectedSubmission.type]}</span>
                </div>
                <div>
                  <p className="text-xs text-[var(--neu-text-muted)] mb-1">نوع الإقامة</p>
                  <p className="text-sm text-[var(--neu-text-secondary)]">
                    {selectedSubmission.resident_type === 'citizen' ? 'مواطن' : 'مقيم'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--neu-text-muted)] mb-1">الرسالة</p>
                  <p className="text-sm text-[var(--neu-text-primary)] leading-relaxed neu-inset-sm rounded-xl p-3">
                    {selectedSubmission.message}
                  </p>
                </div>

                {/* Status Change */}
                <div>
                  <p className="text-xs text-[var(--neu-text-muted)] mb-2">تغيير الحالة</p>
                  <div className="flex gap-2">
                    {(['new', 'reviewed', 'closed'] as const).map((s) => (
                      <button
                        key={s}
                        className={`neu-btn neu-btn-sm flex-1 ${
                          selectedSubmission.status === s
                            ? 'neu-btn-primary'
                            : 'neu-btn-secondary'
                        }`}
                      >
                        {STATUS_MAP[s].label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Admin Notes */}
                <div>
                  <p className="text-xs text-[var(--neu-text-muted)] mb-2">ملاحظات إدارية</p>
                  <textarea
                    placeholder="أضف ملاحظاتك هنا..."
                    className="neu-input neu-textarea"
                    rows={3}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <a
                    href={`https://wa.me/966${selectedSubmission.phone.replace(/^0/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neu-btn neu-btn-primary neu-btn-sm flex-1"
                  >
                    <MessageCircle className="w-4 h-4" />
                    واتساب
                  </a>
                  <a
                    href={`tel:${selectedSubmission.phone}`}
                    className="neu-btn neu-btn-secondary neu-btn-sm flex-1"
                  >
                    <Phone className="w-4 h-4" />
                    اتصال
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="neu-card flex flex-col items-center justify-center py-16 text-center sticky top-[calc(var(--topbar-height)+28px)]">
              <Eye className="w-10 h-10 text-[var(--neu-text-muted)] mb-3 opacity-30" />
              <p className="text-sm text-[var(--neu-text-muted)]">اختر استفساراً لعرض التفاصيل</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
