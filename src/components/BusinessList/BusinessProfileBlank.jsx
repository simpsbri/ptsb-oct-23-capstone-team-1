import React, { useState, useEffect } from 'react'
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
} from '@mui/material'
import MessageComponent from './BusinessMessages'

const viteUrl = import.meta.env.VITE_WEB_ADDRESS

function BusinessProfileBlank() {
  const [company_name, setCompany_name] = useState('')
  const [primary_contact, setPrimary_contact] = useState('')
  const [primary_contact_email, setPrimary_contact_email] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [Zip, setZip] = useState('')
  const [Overview, setOverview] = useState('')
  const [lastContactedDate, setLastContactedDate] = useState('')
  const [website, setWebsite] = useState('')

  const navigate = useNavigate()

  async function handleSave(event) {
    event.preventDefault()

    const newBusiness = {
      company_name,
      primary_contact,
      primary_contact_email,
      street,
      city,
      state,
      Zip,
      Overview,
      lastContactedDate,
      website,
    }

    try {
      // Send a POST request to save the new document in MongoDB
      const response = await axios.post(
        `${viteUrl}businesses/createNewBusiness`,
        newBusiness,
      )

      navigate('/businesses')
    } catch (error) {
      console.error(error)
      // Handle error here
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
          Business Profile Blank
        </Typography>

        {/* Business Info */}
        <form onSubmit={(event) => handleSave(event)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor='company_name'>Company Name*</InputLabel>
              <FormControl fullWidth>
                <TextField
                  id='company_name'
                  name='company_name'
                  autoComplete='company_name'
                  value={company_name}
                  onChange={(e) => setCompany_name(e.target.value)}
                  required
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
                    value={Zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='website'>Website</InputLabel>
              <FormControl fullWidth>
                <TextField
                  id='website'
                  name='website'
                  autoComplete='website'
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='overview'>Overview</InputLabel>
              <FormControl fullWidth>
                <TextField
                  id='overview'
                  value={Overview}
                  onChange={(e) => setOverview(e.target.value)}
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
              to='/admin/businesses'
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

export default BusinessProfileBlank
