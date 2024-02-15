import React, {ChangeEvent, FC, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { genreQueryClient } from '../../queries';
import { InputLabel, TextField, TextareaAutosize } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query'
import { GenreReturnDto, GenreUpdateDto } from '../../models/Genre';

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

const GenreEditModal: FC<GenreEditModalProps> = ({genreId, handleModalState, open, setGenreId}) => {
  const emptyGenre = {name: '', description: ''}

  const [genre, setGenre] = useState<GenreUpdateDto>(emptyGenre);

  const { name, description } = genre;

  const handleClose = () => {handleModalState(false); setGenreId(null); queryClient.invalidateQueries()};

  const queryClient = useQueryClient()
  const { useGenreById, useUpdateGenre } = genreQueryClient;

  const { mutate: genreMutate, error } = useUpdateGenre(
    genreId, 
    genre,
    {onSuccess: handleClose});

  useGenreById(genreId,{enabled: !!genreId, onSuccess: (data: GenreReturnDto)=>{
    setGenre(data);
  }});

  

  return (
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
            <Button className='flex-1' color="success" variant="contained" disabled={!name || !description} onClick={()=>genreMutate({id: genreId, body: genre})}>Confirm</Button>
            <Button className='flex-1' color="success" variant="contained" onClick={()=>handleModalState(!open)}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

interface GenreEditModalProps {
  handleModalState: (open: boolean) => void;
  setGenreId: (genreId: number | null) => void;
  open: boolean;
  genreId: number;
}

export default GenreEditModal;