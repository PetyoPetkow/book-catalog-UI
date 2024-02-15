import React, {ChangeEvent, FC, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { genreQueryClient } from '../../queries';
import {  InputLabel, TextField, TextareaAutosize } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query'
import { GenreCreateDto } from '../../models/Genre';

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

const GenreCreateModal: FC<GenreCreateModalProps> = ({handleModalState, open}) => {
  const emptyGenre = {name: '', description: ''}
  const [genre, setGenre] = useState<GenreCreateDto>(emptyGenre);
  const { name, description } = genre;

  const handleClose = () => {
    handleModalState(false); 
    queryClient.invalidateQueries();  
    setGenre(emptyGenre)};

  const queryClient = useQueryClient()
  const { useCreateGenre } = genreQueryClient;

  const { mutate: genreCreate, error } = useCreateGenre(
    {onSuccess: handleClose}
  );

  return(
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style} className='space-y-6'>

          <TextField size='small' fullWidth label='Genre' value={name} onChange={(event: ChangeEvent<HTMLInputElement>)=>setGenre({...genre, name: event.target.value})} />
          {error?.response?.data.name && <div className='text-red-500 text-sm'>{error.response.data.name}</div>}

          <div>
            <InputLabel>Description</InputLabel>
            <TextareaAutosize className='w-full border border-gray-300 rounded-md pl-2' maxRows={6} minRows={2} value={description} onChange={(event: ChangeEvent<HTMLTextAreaElement>)=>setGenre({...genre, description: event.target.value})} />
            {error?.response?.data.description && <div className='text-red-500 text-sm'>{error.response.data.description}</div>}
          </div>

          <div className='flex space-x-2'>
            <Button className='flex-1' color="success" variant="contained" disabled={!name || !description} onClick={()=>genreCreate(genre)}>Confirm</Button>
            <Button className='flex-1' color="success" variant="contained" onClick={()=>handleModalState(!open)}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

interface GenreCreateModalProps {
  handleModalState: (open: boolean) => void;
  open: boolean;
}

export default GenreCreateModal;