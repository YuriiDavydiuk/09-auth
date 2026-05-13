import { nextServer } from './api';
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

export interface RegisterRequest {
  email: string;
  password: string;
}

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>(`auth/register`, data);
  return res.data;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

interface CheckSessionRequest {
  success: boolean;
}

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export interface UpdateRequest {
  email: string;
  username: string;
}

export const updateMe = async (data: UpdateRequest) => {
  const res = await nextServer.patch<User>('/users/me', data);
  return res.data;
};
