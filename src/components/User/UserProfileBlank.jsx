import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import nodemailer from 'nodemailer'
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItem,
  ListItemText,
  Alert,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import newUserEmail from '../../../server/emailSend/newUserEmail'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button

    ['link', 'image'], // link and image, video
  ],
}
const viteUrl = import.meta.env.VITE_WEB_ADDRESS

import './user.css'

function generatePassword(length) {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const NewUserProfile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isBusiness, setIsBusiness] = useState(false)
  const [isCapstone, setIsCapstone] = useState(false)
  const [bio, setBio] = useState('')
  const [languages, setLanguages] = useState([])
  const [businessId, setBusinessId] = useState('')

  const [businesses, setBusinesses] = useState([])
  const [selectedBusiness, setSelectedBusiness] = useState('')
  const theme = useTheme()

  const [message, setMessage] = useState('')
  const messageRef = useRef()

  const navigate = useNavigate()

  async function handleSave(event) {
    event.preventDefault()
    const password = generatePassword(10) // Generate a random password

    // After the user is created, send the email
    newUserEmail(email, password)

    const newUser = {
      name,
      email,
      password,
      isAdmin,
      isBusiness,
      isCapstone,
      role,
      bio,
      languages,
      businessId: selectedBusiness,
    }

    try {
      // Send a POST request to save the new document in MongoDB
      const response = await axios.post(
        `${viteUrl}api/user/createNewUser`,
        newUser,
      )

      // Set the success message
      setMessage('Successful Save')

      setTimeout(() => {}, 2000)
    } catch (error) {
      console.error(error)
      if (error.response) {
        console.error('Error data:', error.response.data)
        console.error('Error status:', error.response.status)
        console.error('Error headers:', error.response.headers)
      }
    }
  }

  useEffect(() => {
    axios
      .get(`${viteUrl}businesses`)
      .then((response) => {
        setBusinesses(response.data)
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }, [])

  useEffect(() => {
    if (message && messageRef.current) {
      messageRef.current.focus()
    }
  }, [message])

  return (
    <>
      <Box className='flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid'>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant='h2'>
              New User Profile
              {message && <div>{message}</div>}
            </Typography>
          </Grid>
          <Grid item xs style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* Placeholder for status field */}
          </Grid>
        </Grid>

        {/* Business Info */}
        <form onSubmit={(event) => handleSave(event)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor='name'>Name</InputLabel>
              <FormControl fullWidth>
                <TextField
                  id='name'
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='email'>Email</InputLabel>
              <FormControl fullWidth>
                <TextField
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <FormControl fullWidth>
                <TextField
                  id='password'
                  name='password'
                  value={password}
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                  disabled
                />
              </FormControl>
            </Grid> */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='business-select-label'>Business</InputLabel>
                <Select
                  labelId='business-select-label'
                  id='business-select'
                  value={selectedBusiness}
                  label='Business'
                  onChange={(event) => {
                    setSelectedBusiness(event.target.value)
                  }}
                  className='userBusinessSelect'
                >
                  {businesses.map((business, index) => (
                    <MenuItem value={business._id} key={business._id}>
                      {business.company_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <InputLabel htmlFor='role'>Company/Agency Role</InputLabel>
              <FormControl fullWidth>
                <TextField
                  id='role'
                  name='role'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='isAdmin'>User Type</InputLabel>
              <FormControl fullWidth>
                <Select
                  id='isAdmin'
                  name='isAdmin'
                  value={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.value)}
                >
                  <MenuItem value={'Admin'}>Admin</MenuItem>
                  <MenuItem value={'Business'}>Business</MenuItem>
                  <MenuItem value={'Capstone'}>Capstone</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <InputLabel htmlFor='bio'>Bio</InputLabel>

              <FormControl fullWidth>
                <ResizableBox
                  width={Infinity}
                  height={200}
                  minConstraints={[Infinity, 100]}
                  maxConstraints={[Infinity, 300]}
                  style={{
                    position: 'relative',
                  }}
                >
                  <ReactQuill
                    id='bio'
                    value={bio}
                    onChange={setBio}
                    modules={modules}
                    style={{
                      height: '100%',
                      overflowY: 'auto',
                    }}
                  />
                </ResizableBox>
              </FormControl>
            </Grid>
          </Grid>

          {/* Save Button */}
          <Box className='flex mt-4'>
            <Button
              onClick={handleSave}
              variant='contained'
              sx={{
                mr: '1rem',
                backgroundColor: '#9eb8d0',
                color: 'white',
                fontWeight: 'bold',
                p: '0.5rem 1.5rem',
                borderRadius: '0.5rem',
                '&:hover': {
                  backgroundColor: '#9eb8d0',
                },
              }}
            >
              Save
            </Button>
            <Link
              to='/admin/users'
              variant='contained'
              sx={{
                '&:hover': {
                  color: '#9eb8d0',
                },
              }}
              className='bg-primary_dark_cyan text-white font-bold p-2 rounded self-start mr-4 h-10'
            >
              Back to Users
            </Link>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default NewUserProfile
