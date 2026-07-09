// src/app/algharbia-cp/properties/new/page.tsx
import React from 'react';
import PropertyForm from '../../../../components/admin/PropertyForm';
import AdminBreadcrumb from '../../../../components/admin/layout/AdminBreadcrumb';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'إضافة عقار جديد — لوحة التحكم',
};

export default function NewPropertyPage() {
  return (
    <div>
      <AdminBreadcrumb
        items={[
          { label: 'العقارات', href: '/algharbia-cp/properties' },
          { label: 'إضافة عقار جديد' },
        ]}
      />
      <PropertyForm />
    </div>
  );
}
