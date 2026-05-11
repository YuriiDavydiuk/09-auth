'use client';
import css from './NoteForm.module.css';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, NewNote } from '@/lib/api';

import { useNoteDraftStore } from '@/lib/store/noteStore';
import { useState } from 'react';

type Tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

interface FormValues {
  title: string;
  content: string;
  tag: Tag;
}

const initialDraft: FormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

export default function NoteForm() {
  const draft = useNoteDraftStore(state => state.draft);
  const setDraft = useNoteDraftStore(state => state.setDraft);
  const clearDraft = useNoteDraftStore(state => state.clearDraft);

  const queryClient = useQueryClient();
  const router = useRouter();

  const [data, setData] = useState<FormValues>(draft ?? initialDraft);

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const updated = { ...data, [event.target.name]: event.target.value };
    setData(updated);
    setDraft(updated);
  };

  const handleSubmit = (formData: FormData) => {
    const values: NewNote = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NewNote['tag'],
    };
    mutation.mutate(values);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
          value={data.title}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
          value={data.content}
          required
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select} onChange={handleChange} value={data.tag}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={() => router.back()}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
