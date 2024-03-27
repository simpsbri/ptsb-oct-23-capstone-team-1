import React from 'react'
import { useRef, useState, useEffect } from 'react'
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
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

  const [company_name, setCompany_name] = useState('')
  const [primary_contact, setPrimary_contact] = useState('')
  const [primary_contact_email, setPrimary_contact_email] = useState('')
  const [initialProject, setInitialProject] = useState('')
  const [Phone, setPhone] = useState('')

  async function CreateNewBusiness(event) {
    event.preventDefault()

    const newBusiness = {
      company_name,
      primary_contact,
      primary_contact_email,
    }

    try {
      // Send a POST request to save the new document in MongoDB
      const response = await axios.post(
        'http://localhost:4000/businesses/createNewBusiness',
        newBusiness,
      )
      console.log(response.data) // Optional: Log the response data

      navigate('/businesses')
    } catch (error) {
      console.error(error)
      // Handle error here
    }
  }

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    console.log(result)
    console.log(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  return (
    <section className='p-10 bg-primary_dark_cyan flex w-full flex-row '>
      <div>
        <h1 className='text-xl font-bold mb-4'>Contact Us</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            CreateNewBusiness({
              primary_contact,
              primary_contact_email,
              company_name,
              Phone,
              initialProject,
            })
          }}
        >
          <Box
            component='form'
            sx={{
              '& > :not(style)': { m: 0.5, width: '30ch' },
            }}
            noValidate
            autoComplete='off'
            className='p-2'
          >
            <TextField
              required
              id='primary_contact_name'
              label='Required'
              defaultValue='Name'
            />
          </Box>

          <Box
            component='form'
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
              label='Required'
              defaultValue='primary_contact_email'
            />
          </Box>

          <Box
            component='form'
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
              label='Required'
              defaultValue='Phone'
            />
          </Box>

          <Box
            component='form'
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
              label='Required'
              defaultValue='company_name'
            />
          </Box>

          <Box
            component='form'
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
            />
          </Box>
          <Box
            component='form'
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

export default Register
