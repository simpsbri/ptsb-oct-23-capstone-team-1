import React from 'react'
import { Box, Snackbar, IconButton } from '@mui/material'
import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'
import PasswordInput from './PasswordInput'
import EmailInput from './EmailInput'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../../../server/middleware/setAuth'
import { useEffect } from 'react'
import './Login.css'

const viteUrl = import.meta.env.VITE_WEB_ADDRESS
import CloseIcon from '@mui/icons-material/Close'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    if (userInfo && userInfo.token) {
      login(userInfo.token, userInfo.role, userInfo)
    }
  }, [])

  // // Snackbar state and handlers
  const [open, setOpen] = useState(false)
  const handleClick = () => setOpen(true)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const action = (
    <React.Fragment>
      <Button color='secondary' size='small' onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  )

  console.log(viteUrl)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!email || !password) {
      console.error('Please fill in all fields')
      setLoading(false)
      return
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${viteUrl}api/user/login`,
        { email, password },
        config,
      )
      login(data.token, data.role, data) // Pass the user's role as the second argument
      console.log(data) // Log the response data to the console

      // login(data.token, data.user.role, data.user); // Update context with the user's information

      localStorage.setItem('userInfo', JSON.stringify(data))
      // Handle the response here

      // Clear the email and password fields
      setEmail('')
      setPassword('')

      // Scroll to the top of the page
      window.scrollTo(0, 0)

      setSnackbarMessage('Login successful') // Set the Snackbar's message
      handleClick() // Open the Snackbar
    } catch (err) {
      console.error(err.message)
      setSnackbarMessage('Error login, try again') // Set the Snackbar's message
      handleClick() // Open the Snackbar
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id='loginSection'
      className='p-10 bg-primary_dark_cyan flex w-full flex-row '
    >
      <div className='loginForm'>
        <h1 id='loginText' className='text-xl font-bold mb-4'>
          Login
        </h1>
        <form onSubmit={submitHandler}>
          <Box id='emailInput'>
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
                // password={password}
                // setPassword={setPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <Button
                variant='contained'
                type='submit'
                style={{ backgroundColor: '#0b4a8f', color: 'white' }}
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </form>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={snackbarMessage}
        action={action}
      />
    </section>
  )
}

export default Login
