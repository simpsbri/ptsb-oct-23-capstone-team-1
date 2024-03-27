import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'
import PasswordInput from './PasswordInput'
import EmailInput from './EmailInput'

const Login = () => {
  const [password, setPassword] = useState('')
  return (
    <section className='p-10 bg-primary_dark_cyan flex w-full flex-row '>
      <div>
        <h1 className='text-xl font-bold mb-4'>Login</h1>
        <form>
          <Box>
            <EmailInput />
          </Box>

          <Box>
            <div
              style={
                {
                  // display: 'flex',
                  // justifyContent: 'center',
                  // padding: '4rem 0',
                }
              }
            >
              <PasswordInput
                password={password}
                handlePassword={(e) => setPassword(e.target.value)}
              />
            </div>
          </Box>

          <Box
            component='div'
            sx={{
              '& > :not(style)': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete='off'
            className='p-2'
          >
            <Stack spacing={2} direction='row'>
              <Button variant='contained'>Submit</Button>
            </Stack>
          </Box>
        </form>
      </div>
    </section>
  )
}

export default Login
