import React, { useEffect, useState, useRef, useContext } from 'react'
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
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import './user.css'
import { AuthContext } from '../../../server/middleware/setAuth'

//rich text editor
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
//resizable text area for input.
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'
import DeleteIcon from '@mui/icons-material/Delete'

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

const UserProfile = () => {
  const { auth } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
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
  const [isAdmin, setIsAdmin] = useState(false)
  const [isBusiness, setIsBusiness] = useState(false)
  const [isCapstone, setIsCapstone] = useState(false)
  const theme = useTheme()

  const [businesses, setBusinesses] = useState([])
  const [selectedBusiness, setSelectedBusiness] = useState(
    businesses[0]?._id || 'none',
  )

  useEffect(() => {
    axios
      .get(`${viteUrl}/businesses`)
      .then((response) => {
        setBusinesses(response.data)
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${viteUrl}/api/user/${id}`)
        setName(response.data.name)
        setEmail(response.data.email)
        setPassword(response.data.password)
        setRole(response.data.role)
        setBio(response.data.bio)
        setLanguages(response.data.languages)
        setBusinessId(response.data.businessId)
        setSelectedBusiness(String(response.data.businessId))
        setIsAdmin(response.data.isAdmin)
        setIsBusiness(response.data.isBusiness)
        setIsCapstone(response.data.isCapstone)
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
        isAdmin,
        isCapstone,
        isBusiness,
      }
      console.log('User Data:', userData)

      const response = await axios.put(`${viteUrl}/api/user/${id}`, userData)
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
  } // handleSave

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${viteUrl}/api/user/${id}`)
      if (response.status === 200) {
        navigate('/admin/users')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  } // deleteUser

  useEffect(() => {
    const moreThanOneChecked =
      [isAdmin, isCapstone, isBusiness].filter(Boolean).length > 1
    if (moreThanOneChecked) {
      alert('Only one User Account type can be selected at a time.')
    }
  }, [isAdmin, isCapstone, isBusiness])

  return (
    <>
      <Box className='flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid'>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant='h2'>User Profile</Typography>
          </Grid>
          {auth.user.isAdmin === 'Admin' && (
            <Grid
              item
              xs
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button
                variant='contained'
                color='error'
                sx={{
                  backgroundColor: 'red',
                  color: 'white',
                  fontWeight: 'bold',
                  p: '0.5rem 1.5rem',
                  borderRadius: '0.5rem',
                  '&:hover': {
                    backgroundColor: 'darkred',
                  },
                }}
                onClick={handleDelete}
              >
                <DeleteIcon />
              </Button>
            </Grid>
          )}
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
                  disabled={auth.user.isAdmin !== 'Admin'}
                  onChange={(event) => {
                    setSelectedBusiness(event.target.value)
                  }}
                  className='userBusinessSelect'
                >
                  <MenuItem value='none'>
                    <em>None</em>
                  </MenuItem>
                  {businesses.map((business, index) => (
                    <MenuItem value={business._id} key={business._id}>
                      {business.company_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <InputLabel htmlFor='role'>Business/Agency Role</InputLabel>
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
            {auth.user.isAdmin === 'Admin' && (
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
            )}
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
            {auth.user.isAdmin === 'Admin' && (
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
            )}
          </Box>
        </form>
      </Box>
    </>
  )
}

export default UserProfile
