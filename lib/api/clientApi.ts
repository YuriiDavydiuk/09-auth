import { nextServer } from '@/lib/api/api';
import { Note } from '@/types/note';
import { User } from '@/types/user';

/// fetch Notes
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

// create NewNote
export interface NewNote {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export const createNote = async (newNote: NewNote) => {
  const response = await nextServer.post<Note>(`/notes`, newNote);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

//AUTH

export interface LoginRequest  {
    email: string;
    password: string
}


export const register = async(data: LoginRequest) => {
    const res = await nextServer.post<User>(`auth/register`, data)
    return res.data
};

export const login = () => {};

export const logout = () => {};

export const checkSession = () => {};

export const getMe = () => {};

export const updateMe = () => {};
