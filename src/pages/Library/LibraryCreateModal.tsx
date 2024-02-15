import React, {ChangeEvent, FC, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { bookQueryClient, libraryQueryClient } from '../../queries';
import {  Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query'
import { LibraryCreateDto } from '../../models/Library';

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

const LibraryCreateModal: FC<LibraryCreateModalProps> = ({handleModalState, open}) => {
  const emptyLibrary = {name: '', location: '', bookIds: []}
  const [library, setLibrary] = useState<LibraryCreateDto>(emptyLibrary);
  const { name, location, bookIds } = library;

  const queryClient = useQueryClient()
  const { useCreateLibrary } = libraryQueryClient;
  const { useAllBooks } = bookQueryClient;

  const handleClose = () => {
    handleModalState(false); 
    queryClient.invalidateQueries();  
    setLibrary(emptyLibrary)};

  const { mutate: libraryCreate, error } = useCreateLibrary(
    {onSuccess: handleClose}
  );

  const { data: books } = useAllBooks()

  const handleCheckboxChange = (checkboxId: number) => {
    const updatedIds = bookIds.includes(checkboxId)
      ? bookIds.filter((id) => id !== checkboxId) 
      : [...bookIds, checkboxId];
      setLibrary({...library, bookIds: updatedIds});
  };

  return(
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style} className='space-y-6'>

          <TextField size='small' fullWidth label='Name' value={name} onChange={(event: ChangeEvent<HTMLInputElement>)=>setLibrary({...library, name: event.target.value})} />
          {error?.response?.data.name && <div className='text-red-500 text-sm'>{error.response.data.name}</div>}

          <TextField size='small' fullWidth label='Location' value={location} onChange={(event: ChangeEvent<HTMLInputElement>)=>setLibrary({...library, location: event.target.value})} />
          {error?.response?.data.location && <div className='text-red-500 text-sm'>{error.response.data.location}</div>}

          <div>
            {
              books && books.content.length !== 0 ? 
              <>
              <div>Books:</div>
              {books.content.map((book)=> (
                <FormControlLabel
                  control={
                    <Checkbox checked={bookIds.includes(book.id)} onChange={()=>handleCheckboxChange(book.id)} />
                  }
                  label={book.title}
                />            
                ))}
                </>
              :
              <>No books available!</>
            }
          </div>
          {error?.response?.data.bookIds && <div className='text-red-500 text-sm'>{error.response.data.bookIds}</div>}

          <div className='flex space-x-2'>
            <Button className='flex-1' color="success" variant="contained" disabled={!name || !location} onClick={()=>libraryCreate(library)}>Confirm</Button>
            <Button className='flex-1' color="success" variant="contained" onClick={()=>handleModalState(!open)}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

interface LibraryCreateModalProps {
  handleModalState: (open: boolean) => void;
  open: boolean;
}

export default LibraryCreateModal;