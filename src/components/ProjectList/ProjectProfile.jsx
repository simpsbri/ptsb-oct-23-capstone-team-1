import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css'
import { AuthContext } from '../../../server/middleware/setAuth' // Ensure this path is correct for your project structure

// Style for delete button
const deleteButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  fontWeight: 'bold',
  padding: '0.5rem 1.5rem',
  borderRadius: '0.5rem',
  fontSize: '0.875rem',
  '&:hover': {
    backgroundColor: 'darkred',
  },
}

const ProjectProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState({})
  const [projectTitle, setProjectTitle] = useState('')
  const [details, setDetails] = useState('')
  const [status, setStatus] = useState('')
  const [projectType, setProjectType] = useState([])
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const [businesses, setBusinesses] = useState([])
  const [selectedBusiness, setSelectedBusiness] = useState('')
  const { auth } = useContext(AuthContext)
  const viteUrl = import.meta.env.VITE_WEB_ADDRESS

  useEffect(() => {
    axios
      .get(`${viteUrl}businesses`)
      .then((response) => {
        setBusinesses(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching businesses:', error)
      })

    axios
      .get(`${viteUrl}projects/${id}`)
      .then((response) => {
        const data = response.data
        setProject(data)
        setProjectTitle(data.projectTitle || '')
        setDetails(data.details || '')
        setStatus(data.status || '')
        setProjectType(data.projectType || '')
        setSelectedBusiness(data.businessId || '')
      })
      .catch((error) => {
        console.error('Error fetching project details:', error)
      })
  }, [id])

  const handleSave = async () => {
    const projectData = {
      projectTitle,
      details,
      status,
      projectType,
      businessId: selectedBusiness,
    }

    try {
      await axios.put(`${viteUrl}projects/${id}`, projectData)
      setSaveSuccess(true)
      setSaveError(false)
      setTimeout(() => navigate('/admin/projects'), 2000) // Redirect after a successful save
    } catch (error) {
      console.error('An error occurred while updating the project:', error)
      setSaveError(true)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${viteUrl}projects/${id}`)
      navigate('/admin/projects')
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
      ['link', 'image', 'video'],
    ],
  }

  return (
    <Box className='flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md'>
      <Grid container justifyContent='space-between' alignItems='center'>
        <Grid item>
          <Typography
            variant='h2'
            component='h1'
            className='text-2xl font-bold mb-4'
          >
            Project Profile
          </Typography>
        </Grid>
        {auth.user.isAdmin === 'Admin' && (
          <Grid item xs style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: '100px', height: '50px' }}>
              <Button
                variant='contained'
                color='error'
                sx={deleteButtonStyle}
                onClick={handleDelete}
              >
                <DeleteIcon />
              </Button>
            </div>
          </Grid>
        )}
      </Grid>

      {saveSuccess && (
        <Alert severity='success'>Project updated successfully.</Alert>
      )}
      {saveError && (
        <Alert severity='error'>
          An error occurred while updating the project.
        </Alert>
      )}

      <form onSubmit={(event) => event.preventDefault()}>
        <Grid container spacing={2}>
          {/* Form fields */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Project Title'
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              disabled={auth.user.isAdmin === 'Capstone'}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id='status-select-label'>Status</InputLabel>
              <Select
                labelId='status-select-label'
                id='status'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label='Status'
                disabled={auth.user.isAdmin !== 'Admin'}
              >
                <MenuItem value='Newly Submitted'>Newly Submitted</MenuItem>
                <MenuItem value='Under Review'>Under Review</MenuItem>
                <MenuItem value='Approved'>Approved</MenuItem>
                <MenuItem value='Assigned'>Assigned</MenuItem>
                <MenuItem value='Denied'>Denied</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              label='Project Type'
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            />
          </Grid> */}
          <Grid item xs={12}>
            <Autocomplete
              multiple
              fullWidth
              options={[
                'UX/UI',
                'Software Development',
                'Data Analytics',
                'Sales',
                'Digital Marketing',
              ]} // add options as needed
              value={projectType}
              onChange={(event, newValue) => {
                setProjectType(newValue)
              }}
              renderInput={(params) => (
                <TextField {...params} label='Project Type' />
              )}
            />
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
                }}
                className='userBusinessSelect'
                disabled={auth.user.isAdmin !== 'Admin'}
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
            <Typography variant='h6' gutterBottom>
              Project Details
            </Typography>
            <ResizableBox
              width={Infinity}
              height={200}
              minConstraints={[Infinity, 100]}
              maxConstraints={[Infinity, 300]}
            >
              <ReactQuill
                theme='snow'
                value={details}
                onChange={setDetails}
                modules={modules}
                style={{ height: '100%', overflowY: 'auto' }}
              />
            </ResizableBox>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
          <Button
            onClick={handleSave}
            variant='contained'
            color='primary'
            sx={{ mr: 2 }}
            style={{ marginTop: '25px' }}
          >
            Save
          </Button>
          {auth.user.isAdmin === 'Admin' ? (
            <Link
              to='/admin/projects'
              style={{ textDecoration: 'none', marginTop: '25px' }}
            >
              <Button variant='outlined'>Back to List</Button>
            </Link>
          ) : (
            auth.user.isAdmin === 'Business' && (
              <Link
                to={`/business/businesses/${auth.user.businessId}`}
                style={{ textDecoration: 'none', marginTop: '25px' }}
              >
                <Button variant='outlined'>Back to Business Profile</Button>
              </Link>
            )
          )}
        </Box>
      </form>
    </Box>
  )
}

export default ProjectProfile
