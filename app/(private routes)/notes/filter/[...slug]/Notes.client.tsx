'use client';

import Link from 'next/link';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { getNotes } from '@/lib/api/clientApi';

import css from './NotesPage.module.css';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

interface NoteClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NoteClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, 300);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', currentPage, searchQuery, tag],
    queryFn: () => getNotes(currentPage, searchQuery, tag),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.notes.length > 0 && <NoteList items={data.notes} />}
    </div>
  );
}