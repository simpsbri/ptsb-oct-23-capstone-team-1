import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EditBusinessForm from './EditBusiness'
import axios from 'axios'

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
    <div className='flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid'>
      {/* Logo */}
      <img
        src={business.logo}
        alt={`${business.company_name}'s logo`}
        className='rounded-full mb-4'
        style={{ width: '128px', height: '128px' }}
      />

      {/* Profile Header */}
      <h1 className='text-2xl text-primary_dark_cyan font-bold mb-4'>
        Business Profile
      </h1>

      {/* Business Info */}
      <form onSubmit={(event) => handleSave(event, business.id)}>
        <div className='mb-4'>
          {/* Name with Link */}
          <label
            htmlFor='company_name'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Company Name:
          </label>
          <input
            type='text'
            id='company_name'
            value={company_name}
            onChange={(e) => setCompany_name(e.target.value)}
            className='bg-transparent focus:outline-none focus:ring-2 focus:ring-primary_dark_cyan focus:border-transparent outline-gray-300'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='address'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Address
          </label>
          <div className='text-dark_gray_cyan text-base flex items-center'>
            <div className='mr-2'>
              <label htmlFor='street' className='sr-only'>
                Street
              </label>
              <input
                type='text'
                id='street'
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className='bg-transparent focus:outline-none focus:ring-2 focus:ring-primary_dark_cyan focus:border-transparent'
              />
            </div>
            <div className='mr-2'>
              <label htmlFor='city' className='sr-only'>
                City
              </label>
              <input
                type='text'
                id='city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className='bg-transparent focus:outline-none focus:ring-2 focus:ring-primary_dark_cyan focus:border-transparent'
              />
            </div>
            <div className='mr-2'>
              <label htmlFor='state' className='sr-only'>
                State
              </label>
              <input
                type='text'
                id='state'
                value={state}
                onChange={(e) => setState(e.target.value)}
                className='bg-transparent focus:outline-none focus:ring-2 focus:ring-primary_dark_cyan focus:border-transparent'
              />
            </div>
            <div>
              <label htmlFor='zip' className='sr-only'>
                Zip
              </label>
              <input
                type='text'
                id='zip'
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className='bg-transparent focus:outline-none focus:ring-2 focus:ring-primary_dark_cyan focus:border-transparent'
              />
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <label
            htmlFor='overview'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Overview
          </label>
          <textarea
            id='overview'
            value={Overview}
            onChange={(e) => setOverview(e.target.value)}
            className='w-full h-32 resize-none border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary_dark_cyan focus:border-transparent'
            style={{
              minWidth: '75vw',
              minHeight: '20vh',
            }}
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='projects'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Projects
          </label>
          <ul>
            {business.Projects.map((project, index) => (
              <li key={index} className='text-dark_gray_cyan text-base'>
                {project}
              </li>
            ))}
          </ul>
        </div>

        {/* Save Button */}
        <button
          type='submit'
          className='bg-primary_dark_cyan text-white font-bold p-2 rounded self-start mr-4 h-10'
        >
          Save
        </button>
        <Link
          to='/businesses'
          className='bg-primary_dark_cyan text-white font-bold p-2 rounded self-start mr-4 h-10'
        >
          Back to List
        </Link>
      </form>
    </div>
  )
}

export default BusinessProfile
