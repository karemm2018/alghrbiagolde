// src/components/admin/layout/AdminSidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  FolderKanban,
  MessageSquareText,
  Settings,
  BarChart3,
  ImageIcon,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  X,
  Users,
} from 'lucide-react';
import { getSupabaseBrowserClient } from '../../../lib/supabase/client';

interface AdminSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleMobile: () => void;
  onToggleCollapse: () => void;
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
      { label: 'لوحة التحكم', href: '/algharbia-cp', icon: LayoutDashboard },
    ],
  },
  {
    section: 'إدارة المحتوى',
    items: [
      { label: 'العقارات', href: '/algharbia-cp/properties', icon: Building2 },
      { label: 'المشاريع', href: '/algharbia-cp/projects', icon: FolderKanban },
      { label: 'الوسائط', href: '/algharbia-cp/media', icon: ImageIcon },
    ],
  },
  {
    section: 'التعامل',
    items: [
      { label: 'الاستفسارات', href: '/algharbia-cp/submissions', icon: MessageSquareText, badge: true },
    ],
  },
  {
    section: 'النظام',
    items: [
      { label: 'التحليلات', href: '/algharbia-cp/analytics', icon: BarChart3 },
      { label: 'إدارة الحسابات', href: '/algharbia-cp/users', icon: Users },
      { label: 'إعدادات الموقع', href: '/algharbia-cp/settings', icon: Settings },
    ],
  },
];

export default function AdminSidebar({
  collapsed,
  mobileOpen,
  onToggleMobile,
  onToggleCollapse,
  newSubmissionsCount = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === '/algharbia-cp') return pathname === '/algharbia-cp';
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.signOut();
      router.push('/algharbia-cp/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
      window.location.href = '/algharbia-cp/login';
    }
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
        {/* Sidebar Header with collapse/close controls */}
        <div className="flex items-center justify-between p-4 h-[70px] shrink-0">
          {/* Desktop collapse button */}
          <button
            onClick={onToggleCollapse}
            className={`hidden lg:flex items-center justify-center neu-btn-icon neu-raised-sm desktop-collapse-btn ${
              collapsed ? 'mx-auto' : 'ms-auto'
            }`}
            aria-label={collapsed ? 'توسيع القائمة' : 'طي القائمة'}
          >
            {collapsed ? (
              <ChevronsLeft className="w-5 h-5 text-[var(--neu-text-secondary)]" />
            ) : (
              <ChevronsRight className="w-5 h-5 text-[var(--neu-text-secondary)]" />
            )}
          </button>

          {/* Mobile close button */}
          <button
            onClick={onToggleMobile}
            className="lg:hidden ms-auto p-1.5 rounded-lg text-[var(--neu-text-muted)] hover:text-[var(--neu-gold)] transition-colors flex items-center justify-center"
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
                    className={`sidebar-nav-item ${active ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
                    onClick={() => {
                      if (mobileOpen) onToggleMobile();
                    }}
                    title={collapsed ? item.label : undefined}
                  >
                    <div className="relative flex items-center justify-center">
                      <Icon className="w-[20px] h-[20px] shrink-0" />
                      {collapsed && item.badge && newSubmissionsCount > 0 && (
                        <span className="absolute -top-1.5 -left-1.5 min-w-[16px] h-4 bg-[var(--neu-danger)] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-[var(--neu-raised)] px-1">
                          {newSubmissionsCount}
                        </span>
                      )}
                    </div>
                    {!collapsed && <span>{item.label}</span>}
                    {!collapsed && item.badge && newSubmissionsCount > 0 && (
                      <span className="badge">{newSubmissionsCount}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom: Logout */}
        <div className="p-3 flex justify-center">
          <button
            type="button"
            onClick={handleLogout}
            className={collapsed 
              ? "w-12 h-12 flex items-center justify-center rounded-xl bg-red-950/20 text-red-500 hover:bg-red-600 hover:text-white border border-red-500/20 transition-all shadow-md shrink-0 cursor-pointer" 
              : "neu-btn neu-btn-danger w-full flex items-center justify-center gap-2"
            }
            title={collapsed ? 'تسجيل الخروج' : undefined}
            aria-label="تسجيل الخروج"
          >
            <LogOut className={collapsed ? "w-6 h-6" : "w-5 h-5"} />
            {!collapsed && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
