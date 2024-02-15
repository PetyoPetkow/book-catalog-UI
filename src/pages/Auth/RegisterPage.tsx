import React, { ChangeEvent, useState } from 'react'
import { Button, Container, TextField, Typography } from "@mui/material"
import { authQueryClient } from '../../queries';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
const [email, setEmail] = useState<string>('');
const [username, setUsername] = useState<string>('');
const [password, setPassword] = useState<string>('');

  const { useRegister } = authQueryClient;
  const navigate = useNavigate()

  const {mutate: loginMutate, error} = useRegister({onSuccess:()=>{navigate('/Login')}})

  return (
    <Container>

      <div className='space-y-6 w-96 max-md:w-full m-auto text-center'>     
        <div className='mb-9 mt-24'> 
          <Typography variant='h3'>Register</Typography>
        </div> 
          <TextField size='small' fullWidth label='Email' value={email} onChange={(event: ChangeEvent<HTMLInputElement>)=>setEmail(event.target.value)} />
          {error?.response?.data?.email && <div className='text-red-500 text-sm'>{error.response.data.email}</div>}
          <TextField size='small' fullWidth label='Username' value={username} onChange={(event: ChangeEvent<HTMLInputElement>)=>setUsername(event.target.value)} />
          {error?.response?.data?.username && <div className='text-red-500 text-sm'>{error.response.data.username}</div>}
          <TextField size='small' fullWidth label='Password' value={password} onChange={(event: ChangeEvent<HTMLInputElement>)=>setPassword(event.target.value)} />
          {error?.response?.data?.password && <div className='text-red-500 text-sm'>{error.response.data.password}</div>}          
          {error?.response?.data?.errorMessage && <div className='text-red-500 text-sm'>{error.response.data.errorMessage}</div>}
          <Button color='success' variant='contained' onClick={()=>loginMutate({email: email, username: username, password: password})}>Sign in</Button>
        </div>
    </Container>
  );
}

export default RegisterPage