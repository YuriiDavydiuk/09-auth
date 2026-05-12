


export const getNotes = async (
  page: number,
  search: string,
  tag: string
): Promise<NoteResponse> => {
  const response = await api.get<NoteResponse>(`/notes`, {
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
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};


export const getMe = () => {}

export const updateMe = () => {}