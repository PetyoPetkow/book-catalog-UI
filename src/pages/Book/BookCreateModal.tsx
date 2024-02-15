import React, {FC, useState, ChangeEvent} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { authorQueryClient, bookQueryClient, genreQueryClient } from '../../queries';
import { Checkbox, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query'
import { BookCreateDto } from '../../models/Book';

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

const BookCreateModal: FC<BookCreateModalProps> = ({handleModalState, open}) => {
  const emptyBook = { title: '' ,authorId: 0, isbn: '', available: false, publishedDate: '', genreIds: []}

  const [book, setBook] = useState<BookCreateDto>(emptyBook)
  const { title, authorId, isbn, available, publishedDate, genreIds } = book;

  const { useCreateBook } = bookQueryClient;
  const { useAllAuthors } = authorQueryClient;
  const { useAllGenres } = genreQueryClient;

  const handleClose = () => {
    handleModalState(false); 
    queryClient.invalidateQueries();  
    setBook(emptyBook);
  }

  const queryClient = useQueryClient()

  const {data: authors} = useAllAuthors();
  const {data: genres} = useAllGenres()

  const { mutate: bookCreate, error } = useCreateBook(
    {onSuccess: handleClose}
  );

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
            <Select fullWidth size='small' value={available} onChange={(event: SelectChangeEvent<boolean>)=>{setBook({...book, available: Boolean(event.target.value)})}}>
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
          <Button className='flex-1' color="success" variant='contained' onClick={()=>bookCreate(book)}>Create</Button>
          <Button className='flex-1' color="success" variant='contained' onClick={handleClose}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

interface BookCreateModalProps {
  handleModalState: (open: boolean) => void;
  open: boolean;
}

export default BookCreateModal;