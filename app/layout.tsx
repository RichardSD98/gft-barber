import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import Providers from './providers';
import Navbar from '../src/components/layout/Navbar';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'GFT Barber | Book Your Cut',
  description:
    'Professional barber services in Windhoek. Book your appointment at GFT Barber. Located at Begonia Street, Khomasdal. Phone: 085 244 9888',
  openGraph: {
    title: 'GFT Barber | Book Your Cut',
    description:
      'Professional barber services in Windhoek. Book your appointment at GFT Barber today.',
    type: 'website',
    siteName: 'GFT Barber',
    locale: 'en_NA',
  },
  formatDetection: {
    telephone: true,
  },
  other: {
    'business:contact_data:street_address': 'Begonia Street, Khomasdal',
    'business:contact_data:locality': 'Windhoek',
    'business:contact_data:country': 'Namibia',
    'business:contact_data:phone': '085 244 9888',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${inter.variable} font-body`}
    >
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
