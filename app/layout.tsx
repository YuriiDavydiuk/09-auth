import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './global.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),

  title: 'NoteHub - Simple Note Manager',
  description:
    'NoteHub is a clean and efficient app for writing, editing, and organizing personal notes',
    
  openGraph: {
    url: '/',
    title: 'NoteHub - Simple Note Manager',
    description:
      'NoteHub is a clean and efficient app for writing, editing, and organizing personal notes',

    images: [
      {
        url: '/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: `NoteHub - Simple Note Manager`,
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}