import React, { useState } from 'react'
import { Container } from "@mui/material"
import { libraryQueryClient } from '../../queries';
import { useQueryClient } from '@tanstack/react-query';
import LibraryTable from './LibraryTable';
import BaseResponse from '../../models/BaseResponse';
import { LibraryDisplay, LibraryReturnDto } from '../../models/Library';


const LibraryPage = () => {
  const [libraries, setLibraries] = useState<LibraryDisplay[]>([])

  const queryClient = useQueryClient()
  const { useAllLibraries, deleteLibrary } = libraryQueryClient;

  const onDeleteButtonClick = async (id: number) =>{
    await deleteLibrary(id);
    queryClient.invalidateQueries([]);
  }

  useAllLibraries({
    onSuccess: (data: BaseResponse<LibraryReturnDto[]> | void) => {
      let libraries: LibraryDisplay[] = [];
      if (data && data.content.length !== 0) {
        libraries = data.content.map((library) => ({
          id: library.id,
          name: library.name,
          location: library.location,
          booksNames: library.books.map((book) => book.title).join(', ') || '',
        }));
      }

      setLibraries(libraries);
    },
    onError: () => {
      setLibraries([]);
    },
  })

  return (
    <Container>
      <LibraryTable rows={libraries} onDeleteButtonClick={onDeleteButtonClick}/>
    </Container>
  );
}

export default LibraryPage