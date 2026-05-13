import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';

interface NotesFilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: NotesFilterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'),
    title: `Notes filtered by: ${tag}`,
    description: `Browse notes tagged with "${tag}"`,
    openGraph: {
      title: `Notes filtered by: ${tag}`,
      description: `Browse notes tagged with "${tag}"`,
      url: `/notes/filter/${tag}`,
      images: [
        {
          url: `/notehub-og-meta.jpg`,
          width: 1200,
          height: 630,
          alt: `Notes tagged with ${tag}`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesFilterPageProps) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const tag = slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => getNotes(1, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
