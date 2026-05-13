'use client';

import css from './EditProfilePage.module.css';
import Image from 'next/image';
import { updateMe, UpdateRequest } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';

export default function EditProfile() {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const router = useRouter();

  const handleUpdate = async (formData: FormData) => {
    const values: UpdateRequest = {
      username: formData.get('username') as string,
    };
    const updateUser = await updateMe(values);
    setUser(updateUser);
    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar ?? '/241817.jpg'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleUpdate}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={user?.username ?? ''}
              className={css.input}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={() => router.back()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
