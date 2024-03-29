import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
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
} from '@mui/material'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import './user.css'

const NewUserProfile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
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

    const newUser = {
      name,
      email,
      password,
      isAdmin,
      role,
      bio,
      languages,
      businessId: selectedBusiness,
    }

    try {
      // Send a POST request to save the new document in MongoDB
      const response = await axios.post(
        'http://localhost:4000/users/createNewUser',
        newUser,
      )
      console.log(response.data) // Optional: Log the response data

      // Set the success message
      setMessage('Successful Save')

      // Redirect to /users after a delay to allow the message to be seen

      setTimeout(() => {
        navigate('/users')
      }, 2000)
    } catch (error) {
      console.error(error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', error.response.data)
        console.error('Error status:', error.response.status)
        console.error('Error headers:', error.response.headers)
      }
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:4000/businesses')
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
            <Grid item xs={12}>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <FormControl fullWidth>
                <TextField
                  id='password'
                  name='password'
                  value={password}
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </Grid>
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
                    console.log(event.target.value)
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
              <InputLabel htmlFor='role'>Role</InputLabel>
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
              <InputLabel htmlFor='bio'>Bio</InputLabel>
              <FormControl fullWidth>
                <TextField
                  id='bio'
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  multiline
                  rows={4}
                />
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
              to='/users'
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
