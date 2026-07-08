// src/components/admin/layout/AdminSidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  FolderKanban,
  MessageSquareText,
  Settings,
  BarChart3,
  ImageIcon,
  LogOut,
  ChevronRight,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleMobile: () => void;
  newSubmissionsCount?: number;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: boolean;
}

interface NavSection {
  section: string;
  items: NavItem[];
}

const NAV_ITEMS: NavSection[] = [
  {
    section: 'الرئيسية',
    items: [
      { label: 'لوحة التحكم', href: '/golden-cp', icon: LayoutDashboard },
    ],
  },
  {
    section: 'إدارة المحتوى',
    items: [
      { label: 'العقارات', href: '/golden-cp/properties', icon: Building2 },
      { label: 'المشاريع', href: '/golden-cp/projects', icon: FolderKanban },
      { label: 'الوسائط', href: '/golden-cp/media', icon: ImageIcon },
    ],
  },
  {
    section: 'التواصل',
    items: [
      { label: 'الاستفسارات', href: '/golden-cp/submissions', icon: MessageSquareText, badge: true },
    ],
  },
  {
    section: 'النظام',
    items: [
      { label: 'التحليلات', href: '/golden-cp/analytics', icon: BarChart3 },
      { label: 'إعدادات الموقع', href: '/golden-cp/settings', icon: Settings },
    ],
  },
];


export default function AdminSidebar({ collapsed, mobileOpen, onToggleMobile, newSubmissionsCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/golden-cp') return pathname === '/golden-cp';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggleMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
        role="navigation"
        aria-label="القائمة الجانبية"
      >
        {/* Logo */}
        <div className="sidebar-logo">
          <Image
            src="/logo-new.webp"
            alt="الغربية الذهبية"
            width={40}
            height={40}
            className="rounded-xl shrink-0"
            priority
          />
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-[var(--neu-text-heading)] truncate">الغربية الذهبية</span>
              <span className="text-[10px] text-[var(--neu-text-muted)] tracking-wider">GOLDEN WESTERN</span>
            </div>
          )}

          {/* Mobile close button */}
          <button
            onClick={onToggleMobile}
            className="lg:hidden ms-auto p-1.5 rounded-lg text-[var(--neu-text-muted)] hover:text-[var(--neu-gold)] transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((section) => (
            <div key={section.section}>
              {!collapsed && (
                <div className="sidebar-section-label">{section.section}</div>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`sidebar-nav-item ${active ? 'active' : ''}`}
                    onClick={() => {
                      if (mobileOpen) onToggleMobile();
                    }}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="w-[20px] h-[20px] shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                    {item.badge && newSubmissionsCount > 0 && (
                      <span className="badge">{newSubmissionsCount}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom: Logout */}
        <div className="p-3 border-t border-white/5">
          <form action="/golden-cp/login" method="GET">
            <button
              type="submit"
              className="sidebar-nav-item w-full text-[var(--neu-danger)] hover:!text-[var(--neu-danger)]"
              title="تسجيل الخروج"
            >
              <LogOut className="w-[20px] h-[20px] shrink-0" />
              {!collapsed && <span>تسجيل الخروج</span>}
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
