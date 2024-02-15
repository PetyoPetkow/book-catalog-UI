import React from 'react'
import { Container } from "@mui/material"
import { genreQueryClient } from '../../queries';
import { useQueryClient } from '@tanstack/react-query';
import GenreTable from './GenreTable';


const GenrePage = () => {
  const queryClient = useQueryClient()
  const { useAllGenres, deleteGenre } = genreQueryClient;

  const onDeleteButtonClick = async (id: number) =>{
    await deleteGenre(id);
    queryClient.invalidateQueries([]);
  }

  const { data } = useAllGenres()

  return (
    <Container>
      <GenreTable rows={data?.content || []} onDeleteButtonClick={onDeleteButtonClick}/>
    </Container>
  );
}

export default GenrePage