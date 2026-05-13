import { nextServer } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';
import { cookies } from 'next/headers';

interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

export const getNotes = async (
  page: number,
  search: string,
  tag: string
): Promise<NoteResponse> => {
  const response = await nextServer.get<NoteResponse>(`/notes`, {
    params: {
      page,
      perPage: 12,
      search,
      tag: tag === 'all' ? undefined : tag,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export const getMe = async () => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};


export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб proxy мав доступ до нових cookie
  return res;
};



