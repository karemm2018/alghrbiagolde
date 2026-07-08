// src/app/(website)/layout.tsx
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import InquiryModal from '@/components/layout/InquiryModal';
import FloatingContact from '@/components/layout/FloatingContact';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <InquiryModal />
      <FloatingContact />
    </>
  );
}
