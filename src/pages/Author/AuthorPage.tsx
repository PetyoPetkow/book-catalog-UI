import React, {} from 'react'
import { Container } from "@mui/material"
import { authorQueryClient } from '../../queries';
import { useQueryClient } from '@tanstack/react-query';
import AuthorTable from './AuthorTable';


const AuthorPage = () => {
  const queryClient = useQueryClient()
  const { useAllAuthors, deleteAuthor } = authorQueryClient;

  const onDeleteButtonClick = async (id: number) =>{
    await deleteAuthor(id);
    queryClient.invalidateQueries([]);
  }

  const { data } = useAllAuthors()

  return (
    <Container>
      {data && <AuthorTable rows={data.content} onDeleteButtonClick={onDeleteButtonClick}/>}
    </Container>
  );
}

export default AuthorPage