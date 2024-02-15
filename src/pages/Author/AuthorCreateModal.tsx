import React, {ChangeEvent, FC, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { authorQueryClient } from '../../queries';
import {  TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query'
import { AuthorCreateDto } from '../../models/Author';

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

const AuthorCreateModal: FC<AuthorCreateModalProps> = ({handleModalState, open}) => {
  const emptyAuthor = {firstName: '', lastName: ''}
  const [author, setAuthor] = useState<AuthorCreateDto>(emptyAuthor);
  const { firstName, lastName } = author;

  const handleClose = () => {
    handleModalState(false); 
    queryClient.invalidateQueries();  
    setAuthor(emptyAuthor)};

  const queryClient = useQueryClient()
  const { useCreateAuthor } = authorQueryClient;

  const { mutate: authorCreate, error } = useCreateAuthor(
    {onSuccess: handleClose}
  );

  return(
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style} className='space-y-6'>

          <TextField size='small' fullWidth label='First name' value={firstName} onChange={(event: ChangeEvent<HTMLInputElement>)=>setAuthor({...author, firstName: event.target.value})} />
          {error?.response?.data.firstName && <div className='text-red-500 text-sm'>{error.response.data.firstName}</div>}

          <TextField size='small' fullWidth label='Last name' value={lastName} onChange={(event: ChangeEvent<HTMLInputElement>)=>setAuthor({...author, lastName: event.target.value})} />
          {error?.response?.data.lastName && <div className='text-red-500 text-sm'>{error.response.data.lastName}</div>}

            <div className='flex space-x-2'>
            <Button className='flex-1' color="success" variant='contained' disabled={!firstName || !lastName} onClick={()=>authorCreate(author)}>Confirm</Button>
            <Button className='flex-1' color="success" variant='contained' onClick={()=>handleModalState(!open)}>Cancel</Button>
            </div>
        </Box>
      </Modal>
    </div>
  )
}

interface AuthorCreateModalProps {
  handleModalState: (open: boolean) => void;
  open: boolean;
}

export default AuthorCreateModal;