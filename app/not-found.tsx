import Link from 'next/link';
import css from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
   metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),

  title: 'NoteHub - Page Not Found',
  description: 'Oops! The page you are looking for does not exist or is unavailable.',
  openGraph: {
    url: '/',
    title: 'NoteHub - Page Not Found',
    description:
      'The requested page could not be found. Visit the NoteHub homepage to access your notes and stay productive.',
    images: [
      {
        url: '/notehub-og-not-found.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Page Not Found',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.desc}>Sorry, the page you are looking for does not exist.</p>

      <Link href="/" className={css.link}>
        Go back home
      </Link>
    </div>
  );
}