import { create } from 'zustand';
import { User } from '@/lib/api/clientApi'

interface AuthStore {
    isAuthed: boolean;
    user: User | null;

}