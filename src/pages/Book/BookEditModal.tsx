import React, {FC, useState, ChangeEvent, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { authorQueryClient, bookQueryClient, genreQueryClient } from '../../queries';
import { BookReturnDto, BookUpdateDto } from '../../models/Book';
import { Checkbox, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BookEditModal: FC<BookEditModalProps> = ({bookId, handleModalState, open, setBookId}) => {
  const emptyBook = { title: '' ,authorId: 0, isbn: '', available: false, publishedDate: '', genreIds: []}

  const [book, setBook] = useState<BookUpdateDto>(emptyBook)
  const { title, authorId, isbn, available, publishedDate, genreIds } = book;

  const handleClose = () => {handleModalState(false); setBookId(null); queryClient.invalidateQueries()};

  const queryClient = useQueryClient()
  const { useBookById, useUpdateBook } = bookQueryClient;
  const { useAllAuthors } = authorQueryClient;
  const { useAllGenres } = genreQueryClient;

  const { mutate: bookMutate, error } = useUpdateBook(
    bookId, 
    book,
    {onSuccess: handleClose});

  useBookById(bookId,{enabled: !!bookId, onSuccess: (data: BookReturnDto)=>{
    const {author, available, genres, publishedDate, isbn, title} = data;
    setBook({title: title, authorId: author.id, available: available, genreIds: genres.map((genre)=>genre.id), isbn: isbn, publishedDate: publishedDate})
  }});

  const {data: authors} = useAllAuthors();
  const {data: genres} = useAllGenres()

  const handleCheckboxChange = (checkboxId: number) => {
    const updatedIds = genreIds.includes(checkboxId)
      ? genreIds.filter((id) => id !== checkboxId) 
      : [...genreIds, checkboxId];
    setBook({...book, genreIds: updatedIds});
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style} className='space-y-5'>
          <TextField size='small' fullWidth label='Title' value={title} onChange={(event: ChangeEvent<HTMLInputElement>)=>setBook({...book, title: event.target.value})} />
          {error?.response?.data.title && <div className='text-red-500 text-sm'>{error.response.data.title}</div>}

          <div>
            <InputLabel>Author</InputLabel>
            <Select fullWidth size='small' value={authorId} onChange={(event: SelectChangeEvent<number>)=>{setBook({...book, authorId: Number(event.target.value)})}}>
              {authors && authors.content.map((author) => (
                <MenuItem key={author.id} value={author.id}>
                  {author.firstName} {author.lastName}
                </MenuItem>
              ))}
            </Select>
          </div>

          <TextField size='small' fullWidth label='ISBN' value={isbn} onChange={(event: ChangeEvent<HTMLInputElement>)=>setBook({...book, isbn: event.target.value})} />
          {error?.response?.data.isbn && <div className='text-red-500 text-sm'>{error.response.data.isbn}</div>}
          
          <div>
            <InputLabel>Available</InputLabel>
            <Select fullWidth size='small' value={available} onChange={(event: SelectChangeEvent<boolean>)=>{setBook({...book, available: event.target.value === "true" ? true : false})}}>
                <MenuItem key={'true'} value={'true'}>
                  true
                </MenuItem>
                <MenuItem key={'false'} value={'false'}>
                  false
                </MenuItem>
            </Select>
          </div>

          <div>
            <InputLabel>Publishing date</InputLabel>
            <TextField size='small' fullWidth type='date' value={publishedDate} onChange={(event: ChangeEvent<HTMLInputElement>)=>setBook({...book, publishedDate: event.target.value})} />
            {error?.response?.data.publishedDate && <div className='text-red-500 text-sm'>{error.response.data.publishedDate}</div>}
          </div>

          <div>
            {
            genres && genres.content.length !== 0 ? genres.content.map((genre)=> (
              <FormControlLabel
                control={
                  <Checkbox checked={genreIds.includes(genre.id)} onChange={()=>handleCheckboxChange(genre.id)} />
                }
                label={genre.name}
              />            
              ))
            :
            <>No genres present!</>
            }
          </div>
          {error?.response?.data.genreIds && <div className='text-red-500 text-sm'>{error.response.data.genreIds}</div>}

          {error?.response?.data.errorMessage && <div className='text-red-500 text-sm'>{error.response.data.errorMessage}</div>}

          <div className='flex space-x-2'>
          <Button className='flex-1' color="success" variant="contained" onClick={()=>bookMutate({id: bookId, body: book})}>Confirm</Button>
          <Button className='flex-1' color="success" variant="contained" onClick={handleClose}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

interface BookEditModalProps {
  handleModalState: (open: boolean) => void;
  setBookId: (bookId: number | null) => void;
  open: boolean;
  bookId: number;
}

export default BookEditModal;