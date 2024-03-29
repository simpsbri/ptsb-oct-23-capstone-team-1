import React, { useState, useEffect, useRef } from 'react'
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
  Alert,
} from '@mui/material'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

//rich text editor
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
//resizable text area for input.
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'

import BusinessMessages from './BusinessMessages'

const BusinessProfile = () => {
  const { id } = useParams()
  const [business, setBusiness] = useState({})
  const [company_name, setCompany_name] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [overview, setOverview] = useState('')
  const [primary_contact, setPrimary_contact] = useState('')
  const [primary_contact_email, setPrimary_contact_email] = useState('')
  const [businessStatus, setBusinessStatus] = useState('New')
  const [initialProject, setInitialProject] = useState('')

  const [saveSuccess, setSaveSuccess] = useState(false)
  const saveSuccessRef = useRef(null)
  const [saveError, setSaveError] = useState(false)
  const saveErrorRef = useRef(null)

  const [passedMessages, setPassedMessages] = useState([])
  const [lastContactedDate, setLastContactedDate] = useState('')

  const theme = useTheme()
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))

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

  const fetchMessages = (id) => {
    fetch('http://localhost:4000/messages')
      .then((response) => response.json())
      .then((data) => {
        // Filter messages for the current business
        const businessMessages = data.filter(
          (message) => message.businessId === id,
        )

        // Sort messages from newest to oldest
        const sortedMessages = businessMessages.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        )

        // Update the passedMessages state
        setPassedMessages(sortedMessages)

        // If there are any messages, update the lastContactedDate state
        if (sortedMessages.length > 0) {
          setLastContactedDate(sortedMessages[0].createdAt)
        }
      })
  }

  useEffect(() => {
    if (saveSuccess && saveSuccessRef.current) {
      saveSuccessRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    // Reset saveSuccess state after 3 seconds
    const timeoutId = setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)

    // Clear timeout on component unmount
    return () => clearTimeout(timeoutId)
  }, [saveSuccess])

  useEffect(() => {
    if (saveError && saveErrorRef.current) {
      saveErrorRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    const timeoutId = setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)

    // Clear timeout on component unmount
    return () => clearTimeout(timeoutId)
  }, [saveError])

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/businesses/${id}`,
        )
        setBusiness(response.data)
        setCompany_name(response.data.company_name || '')
        setStreet(response.data.street || '')
        setCity(response.data.city || '')
        setState(response.data.state || '')
        setZip(response.data.zip || '')
        setOverview(response.data.Overview || '')
        setPrimary_contact(response.data.primary_contact || '')
        setPrimary_contact_email(response.data.primary_contact_email || '')
        setLastContactedDate(response.data.lastContactedDate || '')
        setBusinessStatus(response.data.businessStatus)
        setInitialProject(response.data.initialProject || '')
      } catch (error) {
        console.error(error)
      }
    }

    fetchBusiness()
  }, [id])

  useEffect(() => {
    fetchMessages(id)
  }, [id])

  const handleSave = async () => {
    // Ensure the businessId is defined
    if (!id) {
      console.error('Business ID is undefined')
      return
    }

    try {
      // Declare and initialize businessData
      const businessData = {
        company_name,
        street,
        city,
        state,
        zip,
        overview,
        primary_contact,
        primary_contact_email,
        lastContactedDate,
        businessStatus,
        initialProject,
      }

      // Make the PUT request
      const response = await axios.put(
        `http://localhost:4000/businesses/${id}`,
        businessData,
      )

      // Handle the response
      if (response.status === 200) {
        setSaveSuccess(true)
        setSaveError(false)
      } else {
        setSaveError(true)
      }
    } catch (error) {
      console.error(
        'An error occurred while updating the business profile:',
        error,
      )
      setSaveError(true)
    }
  }

  return (
    <>
      <Box className='flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid'>
        {/* Profile Header */}
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant={matchesXS ? 'h6' : 'h2'}>
              Business Profile
            </Typography>
          </Grid>
          <Grid item xs style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box display='flex' flexDirection='column'>
              <InputLabel id='businessStatus-label'>
                Business Status:
              </InputLabel>
              <FormControl variant='outlined'>
                <Select
                  labelId='businessStatus-label'
                  id='businessStatus'
                  value={businessStatus}
                  onChange={(e) => setBusinessStatus(e.target.value)}
                  label='Business Status'
                >
                  <MenuItem value={'New'}>New</MenuItem>
                  <MenuItem value={'UnderReview'}>Under Review</MenuItem>
                  <MenuItem value={'Active'}>Active</MenuItem>
                  <MenuItem value={'Inactive'}>Inactive</MenuItem>
                  <MenuItem value={'Denied'}>Denied</MenuItem>
                  {/* Add more MenuItem components for additional statuses if needed */}
                </Select>
              </FormControl>
            </Box>
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
        <form onSubmit={(event) => handleSave(event, business.id)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor='company_name'>Company Name</InputLabel>
              <FormControl fullWidth>
                <TextField
                  id='company_name'
                  name='company_name'
                  autoComplete='company_name'
                  value={company_name}
                  onChange={(e) => setCompany_name(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='last_contacted_date'>
                Last Contacted Date
              </InputLabel>
              <FormControl fullWidth>
                <TextField
                  id='last_contacted_date'
                  name='last_contacted_date'
                  autoComplete='last_contacted_date'
                  value={
                    isNaN(new Date(lastContactedDate))
                      ? 'Not Contacted'
                      : new Date(lastContactedDate).toLocaleDateString()
                  }
                  disabled
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='primary_contact'>Primary Contact</InputLabel>
              <FormControl fullWidth>
                <TextField
                  id='primary_contact'
                  name='primary_contact'
                  autoComplete='primary_contact'
                  value={primary_contact}
                  onChange={(e) => setPrimary_contact(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='primary_contact_email'>Email</InputLabel>
              <FormControl fullWidth>
                <TextField
                  id='primary_contact_email'
                  name='primary_contact_email'
                  autoComplete='primary_contact_email'
                  value={primary_contact_email}
                  onChange={(e) => setPrimary_contact_email(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='address'>
                Address, City, State, Zip
              </InputLabel>
              <FormControl fullWidth>
                <Box className='text-dark_gray_cyan text-base flex items-center'>
                  <TextField
                    id='street'
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className='mr-2'
                  />
                  <TextField
                    id='city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className='mr-2'
                  />
                  <TextField
                    id='state'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className='mr-2'
                  />
                  <TextField
                    id='zip'
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='initialProject'>
                Initial Project Submission
              </InputLabel>
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
                    id='initialProject'
                    value={initialProject}
                    onChange={setInitialProject}
                    modules={modules}
                    style={{
                      height: '100%',
                      overflowY: 'auto',
                    }}
                  />
                </ResizableBox>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='overview'>Company Overview</InputLabel>
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
                    id='overview'
                    value={overview}
                    onChange={setOverview}
                    modules={modules}
                    style={{
                      height: '100%',
                      overflowY: 'auto',
                    }}
                  />
                </ResizableBox>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
              <Typography
                variant='h6'
                component='h2'
                className='text-sm font-medium text-gray-700 mb-1'
              >
                Projects
              </Typography>
              <ul>
                {business.Projects.map((project, index) => (
                  <li key={index} className='text-dark_gray_cyan text-base'>
                    {project}
                  </li>
                ))}
              </ul>
            </Grid> */}
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
              to='/businesses'
              variant='contained'
              sx={{
                '&:hover': {
                  color: '#9eb8d0',
                },
              }}
              className='bg-primary_dark_cyan text-white font-bold p-2 rounded self-start mr-4 h-10'
            >
              Back to List
            </Link>
          </Box>
        </form>
        <BusinessMessages />
      </Box>
    </>
  )
}

//TODO: <h3>Associated Users</h3>
// <ul className='usersList'>
//   {users.map((user) => (
//     <li className='usersList' key={user.id}>
//       {user.name}
//     </li>
//   ))}
// </ul>

export default BusinessProfile
