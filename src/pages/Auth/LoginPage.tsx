import React, { ChangeEvent, useState } from 'react'
import { Button, Container, TextField, Typography } from "@mui/material"
import { authQueryClient } from '../../queries';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
const [email, setEmail] = useState<string>('');
const [password, setPassword] = useState<string>('');

const navigate = useNavigate()

  const { useLogin } = authQueryClient;

  const {mutate: loginMutate, error} = useLogin({
    onSuccess:(data)=>
    {
      localStorage.setItem("email", data.email); 
      localStorage.setItem("username", data.username)
      navigate('/Books')
    }, 
    onError:()=>{localStorage.clear()}})

  return (
    <Container>

      <div className='space-y-6 w-96 max-md:w-full m-auto text-center'>     
        <div className='mb-9 mt-24'> 
          <Typography variant='h3'>Login</Typography>
        </div> 
          <TextField size='small' fullWidth label='Email' value={email} onChange={(event: ChangeEvent<HTMLInputElement>)=>setEmail(event.target.value)} />
          <TextField size='small' fullWidth label='Password' value={password} onChange={(event: ChangeEvent<HTMLInputElement>)=>setPassword(event.target.value)} />
          {error?.response?.data?.errorMessage && <div className='text-red-500 text-sm'>{error.response.data.errorMessage}</div>}          
          <Button color='success' variant='contained' onClick={()=>loginMutate({email: email, password: password})}>Sign in</Button>
        </div>
    </Container>
  );
}

export default LoginPage