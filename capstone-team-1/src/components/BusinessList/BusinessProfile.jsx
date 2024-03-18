import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EditBusinessForm from './EditBusiness'
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
} from '@mui/material'

const BusinessProfile = ({ business, onSave }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [company_name, setCompany_name] = useState(business.company_name || '')
  const [street, setStreet] = useState(business.street || '')
  const [city, setCity] = useState(business.city || '')
  const [state, setState] = useState(business.state || '')
  const [zip, setZip] = useState(business.Zip || '')
  const [Overview, setOverview] = useState(business.Overview || '')

  const handleSave = async (event, businessId) => {
    event.preventDefault()
    try {
      const response = await axios.put(
        `http://localhost:5173/businesses/src/data/businessList/${businessId}`,
        {
          company_name,
          street,
          city,
          state,
          zip,
          Overview,
        },
      )

      if (!response.data.ok) {
        throw new Error('Failed to save business')
      }

      onSave(response.data.business)
      setIsEditing(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Box className='flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid'>
        {/* Logo */}
        <Box
          component='img'
          src={business.logo}
          alt={`${business.company_name}'s logo`}
          className='rounded-full mb-4'
          style={{ width: '128px', height: '128px' }}
        />

        {/* Profile Header */}
        <Typography
          variant='h2'
          component='h1'
          className='text-2xl text-primary_dark_cyan font-bold mb-4'
        >
          Business Profile
        </Typography>

        {/* Business Info */}
        <form onSubmit={(event) => handleSave(event, business.id)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor='company_name'>Company Name</InputLabel>
              <FormControl fullWidth>
                <TextField
                  id='company_name'
                  value={company_name}
                  onChange={(e) => setCompany_name(e.target.value)}
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
                  />{' '}
                </Box>{' '}
              </FormControl>{' '}
            </Grid>{' '}
            <Grid item xs={12}>
              <InputLabel htmlFor='overview'>Overview</InputLabel>
              <FormControl fullWidth>
                {' '}
                <TextField
                  id='overview'
                  value={Overview}
                  onChange={(e) => setOverview(e.target.value)}
                  multiline
                  rows={4}
                />{' '}
              </FormControl>{' '}
            </Grid>{' '}
            <Grid item xs={12}>
              {' '}
              <Typography
                variant='h6'
                component='h2'
                className='text-sm font-medium text-gray-700 mb-1'
              >
                {' '}
                Projects{' '}
              </Typography>{' '}
              <ul>
                {' '}
                {business.Projects.map((project, index) => (
                  <li key={index} className='text-dark_gray_cyan text-base'>
                    {' '}
                    {project}{' '}
                  </li>
                ))}{' '}
              </ul>{' '}
            </Grid>{' '}
          </Grid>

          {/* Save Button */}
          <Box className='flex mt-4'>
            <Button
              type='submit'
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
      </Box>
    </>
  )
}

export default BusinessProfile
