// src/app/golden-cp/layout.tsx
'use client';

import React, { useState } from 'react';
import '../../styles/admin.css';
import AdminSidebar from '../../components/admin/layout/AdminSidebar';
import AdminTopbar from '../../components/admin/layout/AdminTopbar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === '/golden-cp/login';

  if (isLoginPage) {
    return children;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen(!mobileOpen)}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        newSubmissionsCount={0}
      />
      <div className="admin-main">
        <AdminTopbar
          onToggleMobile={() => setMobileOpen(!mobileOpen)}
        />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
