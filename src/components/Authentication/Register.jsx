import React from 'react'
import { useRef, useState, useEffect } from 'react'
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Box } from '@mui/material'
import axios from 'axios'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTER_URL = '/register'

const Register = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const userRef = useRef()
  const errRef = useRef()

  // const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false)
  // const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [company_name, setCompany_name] = useState('')
  const [primary_contact, setPrimary_contact] = useState('')
  const [primary_contact_email, setPrimary_contact_email] = useState('')
  const [initialProject, setInitialProject] = useState('')
  const [Phone, setPhone] = useState('')

  const viteUrl = import.meta.env.VITE_WEB_ADDRESS

  async function handleSave(event) {
    event.preventDefault()

    const newBusiness = {
      company_name,
      primary_contact,
      primary_contact_email,
      initialProject,
      Phone,
    }

    try {
      // Send a POST request to save the new document in MongoDB
      const response = await axios.post(`${viteUrl}register`, newBusiness)
      setIsSubmitted(true)
    } catch (error) {
      console.error(error)
      // Handle error here
    }
  }
  // useEffect(() => {
  //   const result = PWD_REGEX.test(pwd)

  //   setValidPwd(result)
  //   const match = pwd === matchPwd
  //   setValidMatch(match)
  // }, [pwd, matchPwd])

  if (isSubmitted) {
    return (
      <section className='p-10 bg-primary_dark_cyan flex w-full flex-row '>
        <div>
          <h1 className='text-xl font-bold mb-4'>
            Thank you for your interest
          </h1>
          <p>
            Thank you for your interest in supporting the Front Range Community
            College Capstone Program. Our program manager will reach out
            shortly. In the meantime feel free to learn more on our website:{' '}
            <a href='https://frontrange.uprighted.com/'>
              https://frontrange.uprighted.com/
            </a>
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className='p-10 bg-primary_dark_cyan flex w-full flex-row '>
      <div>
        <h1 className='text-xl font-bold mb-4'>Contact Us</h1>
        <form onSubmit={(event) => handleSave(event)}>
          <Box
            component='div'
            sx={{
              '& > :not(style)': { m: 0.5, width: '30ch' },
            }}
            noValidate
            autoComplete='off'
            className='p-2'
          >
            <TextField
              required
              id='primary_contact'
              label='Name'
              placeholder='Name'
              value={primary_contact}
              onChange={(event) => setPrimary_contact(event.target.value)}
            />
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
            <TextField
              required
              id='outlined-required'
              label='Email'
              placeholder='Email'
              value={primary_contact_email}
              onChange={(event) => setPrimary_contact_email(event.target.value)}
            />
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
            <TextField
              required
              id='outlined-required'
              label='Phone'
              placeholder='Phone'
              value={Phone}
              onChange={(event) => setPhone(event.target.value)}
            />
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
            <TextField
              required
              id='outlined-required'
              label='Company/Agency'
              placeholder='Company/Agency'
              value={company_name}
              onChange={(event) => setCompany_name(event.target.value)}
            />
          </Box>

          <Box
            component='div'
            sx={{
              '& > :not(style)': {
                m: 1,
                width: isSmallScreen ? '75%' : '35ch',
              },
            }}
            noValidate
            autoComplete='off'
            className='p-2'
          >
            <TextField
              id='initialProject'
              label='What is the issue you are trying to solve for? '
              variant='standard'
              fullWidth
              value={initialProject}
              onChange={(event) => setInitialProject(event.target.value)}
            />
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
              <Button variant='contained' type='submit'>
                Submit
              </Button>
            </Stack>
          </Box>
        </form>
      </div>
    </section>
  )
}

export default Register
