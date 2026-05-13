import { Metadata } from 'next';
import css from './ProfilePage.module.css';
import { getMe } from '@/lib/api/serverApi';

import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'),
  title: 'Profile - NoteHub',
  description: 'Manage your NoteHub profile.',
  openGraph: {
    title: 'Profile - NoteHub',
    description: 'Manage your NoteHub profile.',
    url: '/profile',
    images: [
      {
        url: '/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Profile - NoteHub',
      },
    ],
  },
};

export default async function Profile() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
