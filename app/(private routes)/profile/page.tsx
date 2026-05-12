import { Metadata } from 'next';
import css from './ProfilePage.module.css'


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

export default function Profile() {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <img src="Avatar" alt="User Avatar" width={120} height={120} className={css.avatar} />
        </div>
        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
}
