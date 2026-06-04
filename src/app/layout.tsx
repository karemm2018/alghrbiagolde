// src/app/layout.tsx
import type { Metadata } from 'next';
import { Cairo, Tajawal, Aref_Ruqaa } from 'next/font/google';
import '../styles/globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-tajawal',
  display: 'swap',
  weight: ['400', '500', '700'],
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ['arabic'],
  variable: '--font-aref-ruqaa',
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: { 
    default: 'شركة الغربية الذهبية | عقارات فاخرة بالسعودية', 
    template: '%s | الغربية الذهبية' 
  },
  description: 'حرفية تشييد وتميّز عقاري — نعتمد أحدث التقنيات لربط عملائنا بأفضل الفرص السكنية والاستثمارية في جدة والرياض ومكة.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${cairo.variable} ${tajawal.variable} ${arefRuqaa.variable} font-cairo bg-bg-midnight antialiased text-text-primary`}>
        {children}
      </body>
    </html>
  );
}
