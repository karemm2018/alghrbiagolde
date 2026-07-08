// src/components/admin/layout/AdminTopbar.tsx
'use client';

import React from 'react';
import { Menu, Bell, ExternalLink, Search } from 'lucide-react';

interface AdminTopbarProps {
  onToggleSidebar: () => void;
  onToggleMobile: () => void;
  pageTitle?: string;
}

export default function AdminTopbar({ onToggleSidebar, onToggleMobile, pageTitle }: AdminTopbarProps) {
  return (
    <header className="admin-topbar">
      {/* Mobile menu button */}
      <button
        onClick={onToggleMobile}
        className="lg:hidden flex items-center justify-center neu-btn-icon neu-raised-sm ms-0 me-3"
        aria-label="فتح القائمة"
      >
        <Menu className="w-5 h-5 text-[var(--neu-text-secondary)]" />
      </button>

      {/* Desktop sidebar toggle */}
      <button
        onClick={onToggleSidebar}
        className="hidden lg:flex items-center justify-center neu-btn-icon neu-raised-sm"
        aria-label="تبديل القائمة"
      >
        <Menu className="w-5 h-5 text-[var(--neu-text-secondary)]" />
      </button>

      {/* Page title */}
      {pageTitle && (
        <h1 className="text-lg font-bold text-[var(--neu-text-heading)] me-4 hidden sm:block">
          {pageTitle}
        </h1>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Quick search */}
      <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl neu-inset-sm me-3">
        <Search className="w-4 h-4 text-[var(--neu-text-muted)]" />
        <input
          type="text"
          placeholder="بحث سريع..."
          className="bg-transparent border-none outline-none text-sm text-[var(--neu-text-primary)] placeholder-[var(--neu-text-muted)] w-48 font-inherit"
        />
      </div>

      {/* Notifications */}
      <button
        className="flex items-center justify-center neu-btn-icon neu-raised-sm relative me-2"
        aria-label="الإشعارات"
        title="الإشعارات"
      >
        <Bell className="w-5 h-5 text-[var(--neu-text-secondary)]" />
      </button>

      {/* View site link */}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center neu-btn-icon neu-raised-sm"
        aria-label="عرض الموقع"
        title="عرض الموقع"
      >
        <ExternalLink className="w-5 h-5 text-[var(--neu-text-secondary)]" />
      </a>
    </header>
  );
}
