// src/app/golden-cp/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import AdminBreadcrumb from '../../components/admin/layout/AdminBreadcrumb';
import {
  Building2,
  FolderKanban,
  MessageSquareText,
  Eye,
  TrendingUp,
  Users,
  Plus,
  ArrowUpLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
} from 'lucide-react';

// Temporary mock stats until Supabase is connected
const MOCK_STATS = {
  totalProperties: 17,
  totalProjects: 5,
  newSubmissions: 3,
  totalViews: 2450,
  soldUnits: 42,
  activeClients: 128,
};

const MOCK_RECENT_SUBMISSIONS = [
  { id: '1', name: 'أبو محمد الشهري', phone: '0554498018', subject: 'استفسار عن ملحق أمل ستارز', type: 'property_inquiry' as const, status: 'new' as const, created_at: '2026-07-08T14:30:00' },
  { id: '2', name: 'سارة القحطاني', phone: '0551234567', subject: 'استفسار عام', type: 'contact' as const, status: 'new' as const, created_at: '2026-07-08T12:15:00' },
  { id: '3', name: 'خالد العمري', phone: '0559876543', subject: 'استفسار عن مشروع ريناد غاليري', type: 'inquiry' as const, status: 'reviewed' as const, created_at: '2026-07-07T18:00:00' },
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

export default function DashboardPage() {
  const stats = [
    { label: 'إجمالي العقارات', value: MOCK_STATS.totalProperties, icon: Building2, color: 'gold', change: '+3 هذا الشهر' },
    { label: 'المشاريع النشطة', value: MOCK_STATS.totalProjects, icon: FolderKanban, color: 'info', change: '2 قيد الإنشاء' },
    { label: 'استفسارات جديدة', value: MOCK_STATS.newSubmissions, icon: MessageSquareText, color: 'danger', change: 'بحاجة للمراجعة' },
    { label: 'مشاهدات الموقع', value: MOCK_STATS.totalViews, icon: Eye, color: 'success', change: '+12% عن الشهر السابق' },
    { label: 'وحدات مُباعة', value: MOCK_STATS.soldUnits, icon: TrendingUp, color: 'warning', change: 'من إجمالي 225' },
    { label: 'عملاء نشطين', value: MOCK_STATS.activeClients, icon: Users, color: 'info', change: 'مسجلون بالنظام' },
  ];

  return (
    <div>
      <AdminBreadcrumb items={[{ label: 'لوحة التحكم' }]} />

      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--neu-text-heading)] mb-1">مرحباً بك 👋</h2>
        <p className="text-[var(--neu-text-secondary)] text-sm">
          إليك نظرة عامة على نشاط الموقع اليوم
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`neu-card neu-stat-card ${stat.color}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--neu-text-muted)] mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-[var(--neu-text-heading)]">
                    {stat.value.toLocaleString('en-US')}
                  </p>
                  <p className="text-xs text-[var(--neu-text-muted)] mt-2">{stat.change}</p>
                </div>
                <div className="neu-raised-sm rounded-xl p-3">
                  <Icon className="w-6 h-6 text-[var(--neu-gold)]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <Link
          href="/golden-cp/properties/new"
          className="neu-card neu-card-interactive flex items-center gap-4 group"
        >
          <div className="neu-raised-sm rounded-xl p-3 group-hover:shadow-[0_0_12px_var(--neu-gold-glow)]">
            <Plus className="w-6 h-6 text-[var(--neu-gold)]" />
          </div>
          <div>
            <p className="font-bold text-[var(--neu-text-heading)] group-hover:text-[var(--neu-gold)] transition-colors">
              إضافة عقار جديد
            </p>
            <p className="text-xs text-[var(--neu-text-muted)]">أضف وحدة عقارية للعرض</p>
          </div>
          <ArrowUpLeft className="w-5 h-5 text-[var(--neu-text-muted)] ms-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>

        <Link
          href="/golden-cp/projects/new"
          className="neu-card neu-card-interactive flex items-center gap-4 group"
        >
          <div className="neu-raised-sm rounded-xl p-3 group-hover:shadow-[0_0_12px_var(--neu-gold-glow)]">
            <FolderKanban className="w-6 h-6 text-[var(--neu-gold)]" />
          </div>
          <div>
            <p className="font-bold text-[var(--neu-text-heading)] group-hover:text-[var(--neu-gold)] transition-colors">
              إضافة مشروع جديد
            </p>
            <p className="text-xs text-[var(--neu-text-muted)]">أنشئ مشروعاً عقارياً</p>
          </div>
          <ArrowUpLeft className="w-5 h-5 text-[var(--neu-text-muted)] ms-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>

        <Link
          href="/golden-cp/submissions"
          className="neu-card neu-card-interactive flex items-center gap-4 group"
        >
          <div className="neu-raised-sm rounded-xl p-3 group-hover:shadow-[0_0_12px_var(--neu-gold-glow)] relative">
            <MessageSquareText className="w-6 h-6 text-[var(--neu-gold)]" />
            {MOCK_STATS.newSubmissions > 0 && (
              <span className="absolute -top-1 -left-1 w-5 h-5 bg-[var(--neu-danger)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {MOCK_STATS.newSubmissions}
              </span>
            )}
          </div>
          <div>
            <p className="font-bold text-[var(--neu-text-heading)] group-hover:text-[var(--neu-gold)] transition-colors">
              الاستفسارات الجديدة
            </p>
            <p className="text-xs text-[var(--neu-text-muted)]">راجع آخر الاستفسارات</p>
          </div>
          <ArrowUpLeft className="w-5 h-5 text-[var(--neu-text-muted)] ms-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>

      {/* Recent Submissions Table */}
      <div className="neu-card">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-[var(--neu-text-heading)]">آخر الاستفسارات</h3>
          <Link
            href="/golden-cp/submissions"
            className="text-sm text-[var(--neu-gold)] hover:text-[var(--neu-gold-light)] transition-colors font-medium"
          >
            عرض الكل ←
          </Link>
        </div>

        <div className="neu-table-wrapper overflow-x-auto">
          <table className="neu-table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th className="hidden sm:table-cell">النوع</th>
                <th>الموضوع</th>
                <th>الحالة</th>
                <th className="hidden md:table-cell">التاريخ</th>
                <th>إجراء</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RECENT_SUBMISSIONS.map((sub) => (
                <tr key={sub.id}>
                  <td>
                    <div>
                      <p className="font-semibold text-[var(--neu-text-heading)]">{sub.name}</p>
                      <p className="text-xs text-[var(--neu-text-muted)] mt-0.5 direction-ltr text-right">{sub.phone}</p>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell">
                    <span className="text-xs text-[var(--neu-text-secondary)]">
                      {TYPE_MAP[sub.type]}
                    </span>
                  </td>
                  <td>
                    <span className="text-sm truncate max-w-[200px] inline-block">
                      {sub.subject}
                    </span>
                  </td>
                  <td>
                    <span className={`neu-badge ${STATUS_MAP[sub.status].class}`}>
                      {STATUS_MAP[sub.status].label}
                    </span>
                  </td>
                  <td className="hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--neu-text-muted)]">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(sub.created_at).toLocaleDateString('ar-SA', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </td>
                  <td>
                    <a
                      href={`tel:${sub.phone}`}
                      className="neu-btn neu-btn-ghost neu-btn-sm"
                      title="اتصال"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {MOCK_RECENT_SUBMISSIONS.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-[var(--neu-success)] mb-3 opacity-50" />
            <p className="text-[var(--neu-text-secondary)] font-medium">لا توجد استفسارات جديدة</p>
            <p className="text-xs text-[var(--neu-text-muted)] mt-1">تم مراجعة جميع الاستفسارات ✓</p>
          </div>
        )}
      </div>
    </div>
  );
}
