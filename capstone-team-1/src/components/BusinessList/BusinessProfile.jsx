import React, { useState, useEffect } from 'react'
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
} from '@mui/material'
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
  const [messages, setMessages] = useState([])
  const [saveSuccess, setSaveSuccess] = useState(false)

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
        setMessages(
          response.data.messages ? [...response.data.messages].reverse() : [],
        )
      } catch (error) {
        console.error(error)
      }
    }

    fetchBusiness()
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
      }

      // Make the PUT request
      const response = await axios.put(
        `http://localhost:4000/businesses/${id}`,
        businessData,
      )

      // Handle the response
      if (response.status === 200) {
        setSaveSuccess(true)
        console.log('Business profile updated successfully')
      } else {
        console.error('Failed to update business profile')
      }
    } catch (error) {
      console.error(
        'An error occurred while updating the business profile:',
        error,
      )
    }
  }

  return (
    <>
      <Box className='flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid'>
        {/* Logo */}
        {/* <Box
          component='img'
          src={business.logo}
          alt={`${business.company_name}'s logo`}
          className='rounded-full mb-4'
          style={{ width: '128px', height: '128px' }}
        /> */}

        {/* Profile Header */}
        <Typography
          variant='h2'
          component='h1'
          className='text-2xl text-primary_dark_cyan font-bold mb-4'
        >
          Business Profile
        </Typography>
        {saveSuccess && (
          <Typography
            variant='h2'
            component='h1'
            className='text-2xl text-red-500 font-bold mb-4 text-center'
          >
            Data save successfully!
          </Typography>
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
              <InputLabel htmlFor='overview'>Overview</InputLabel>
              <FormControl fullWidth>
                <TextField
                  id='overview'
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  multiline
                  rows={4}
                />
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

export default BusinessProfile
