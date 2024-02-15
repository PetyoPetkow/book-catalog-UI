import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { BookDisplay, BookReturnDto } from '../../models/Book';
import { bookQueryClient } from '../../queries';
import BaseResponse from '../../models/BaseResponse';
import { useQueryClient } from '@tanstack/react-query';
import BookTable from './BookTable';


const BookPage = () => {
  const [books, setBooks] = useState<BookDisplay[]>([])
  const [searchParam, setSearchParam] = useState<SearchParam>('title')
  const [searchValue, setSearchValue] = useState<string>('')

  const queryClient = useQueryClient()
  const { useAllBooks, useSearchBooks, deleteBook } = bookQueryClient;


  useAllBooks({
    enabled: !searchValue,
    onSuccess: (data: BaseResponse<BookReturnDto[]>)=>
  {
    const books: BookDisplay[] = data.content.map((book) => ({
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      publishedDate: book.publishedDate,
      available: book.available,
      authorName: book.author.firstName + " " + book.author.lastName,
      genresNames: book.genres.map((genre) => genre.name).join(', ') || ''
    }));

      setBooks(books)
    }});

    const { refetch: refetchSearch } = useSearchBooks(
      { [searchParam]: searchValue },
      {
        enabled: false,
        onSuccess: (data: BookReturnDto[] | void) => {
          let books: BookDisplay[] = [];
          if (data) {
            books = data.map((book) => ({
              id: book.id,
              title: book.title,
              isbn: book.isbn,
              publishedDate: book.publishedDate,
              available: book.available,
              authorName: `${book.author.firstName} ${book.author.lastName}`,
              genresNames: book.genres.map((genre) => genre.name).join(', ') || '',
            }));
          }
    
          setBooks(books);
        },
        onError: () => {
          setBooks([]);
        },
      }
    );
    

  useEffect(()=>{
    setSearchValue('')
  },[searchParam])

  useEffect(()=>{
    searchValue && refetchSearch()
  },[searchValue, refetchSearch])


const onDeleteButtonClick = async (id: number) =>{
  await deleteBook(id);
  queryClient.invalidateQueries([]);
}

  return (
    <Container>
      <div className='flex  justify-center align-bottom space-x-10 mb-4 h-fit'>
        <FormControl className='flex-0'>
          <Typography>Search by:</Typography>
          <ToggleButtonGroup
            size='small'
            color="primary"
            value={searchParam}
            exclusive
            onChange={(e: React.MouseEvent<HTMLElement>, newValue: SearchParam): void => {
              setSearchParam(newValue)
            }}
            aria-label="Platform"
          >
            <ToggleButton value="title">Title</ToggleButton>
            <ToggleButton value="authorName">Author</ToggleButton>
            <ToggleButton value="genre">Genre</ToggleButton>
        </ToggleButtonGroup>
        </FormControl>
        {true && 
        <TextField
          className='w-[250px] self-end flex-0'
          size='small'
          value={searchValue}
          onChange={(e)=>{setSearchValue(e.target.value)}}
          hiddenLabel
          id="filled-hidden-label-small"
        />}
        
      </div>
    
      <BookTable rows={books} onDeleteButtonClick={onDeleteButtonClick}/>
    </Container>
  );
}

type SearchParam = 'title' | 'authorName' | 'genre'

export default BookPage


