import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
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

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { id } = useParams()
  const [user, setUser] = useState({})
  const [saveSuccess, setSaveSuccess] = useState(false)
  const saveSuccessRef = useRef(null)
  const [saveError, setSaveError] = useState(false)
  const saveErrorRef = useRef(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [bio, setBio] = useState('')
  const [languages, setLanguages] = useState([])
  const [businessId, setBusinessId] = useState('')
  const theme = useTheme()

  const [businesses, setBusinesses] = useState([])
  const [selectedBusiness, setSelectedBusiness] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:4000/businesses')
      .then((response) => {
        console.log(response)
        setBusinesses(response.data)
        console.log('Businesses' + response.data)
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/${id}`)
        setName(response.data.name)
        setEmail(response.data.email)
        setPassword(response.data.password)
        setRole(response.data.role)
        setBio(response.data.bio)
        setLanguages(response.data.languages)
        setBusinessId(response.data.businessId)
        setSelectedBusiness(String(response.data.businessId))
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [id])

  const handleSave = async () => {
    if (!id) {
      console.error('User ID is undefined')
      return
    }

    try {
      const userData = {
        name,
        email,
        password,
        role,
        bio,
        languages,
        businessId: selectedBusiness,
      }
      console.log('User Data:', userData)

      const response = await axios.put(
        `http://localhost:4000/users/${id}`,
        userData,
      )
      if (response.status === 200) {
        setSaveSuccess(true)
        setSaveError(false)
      } else {
        setSaveError(true)
      }
    } catch (error) {
      console.error('An error occurred while updating the profile:', error)
      setSaveError(true)
    }
  }

  return (
    <>
      <Box className='flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid'>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant='h2'>User Profile</Typography>
          </Grid>
          <Grid item xs style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* Placeholder for status field */}
          </Grid>
        </Grid>

        {saveSuccess && (
          <Alert variant='filled' severity='success' ref={saveSuccessRef}>
            Updates save successfully.
          </Alert>
        )}
        {saveError && (
          <Alert variant='filled' severity='error' ref={saveErrorRef}>
            Updates not successful.
          </Alert>
        )}

        {/* Business Info */}
        <form onSubmit={(event) => handleSave(event, user.id)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor='name'>Name</InputLabel>
              <FormControl fullWidth>
                <TextField
                  id='name'
                  name='name'
                  autoComplete='name'
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
                  autoComplete='email'
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
                  autoComplete='password'
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
                  autoComplete='role'
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

export default UserProfile
