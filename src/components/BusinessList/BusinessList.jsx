import React, { useEffect, useState } from 'react'
import BusinessCard from './BusinessCard'
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const BusinessList = ({ handleTagClick, latestMessage, backgroundColor }) => {
  const navigate = useNavigate()
  const [businesses, setBusinesses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [businessStatuses, setBusinessStatuses] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/businesses')
        setBusinesses(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  if (!Array.isArray(businesses)) {
    console.log('waiting')
    return <div>Loading...</div>
  }

  return (
    <>
      <div className='flex flex-col items-center mx-auto h-96 w-full'>
        <div className='flex items-center justify-between w-full mb-4'>
          <div className='font-bold text-center mx-auto'>Businesses</div>
        </div>
        <div className='flex justify-between w-full mb-4'>
          <div className='flex ml-5'>
            <Button
              variant='contained'
              color='inherit'
              onClick={() => navigate('createNewBusiness')}
            >
              Create New
            </Button>
          </div>
          <div className='flex items-center mx-auto'>
            <label
              htmlFor='statusFilter'
              className='block text-sm font-medium text-gray-700 pr-6 mr-4'
            >
              Status Filter:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='p-2 border rounded-md shadow-sm text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
            >
              <option value='all'>All</option>
              <option value='No Messages Yet'>No Messages Yet</option>
              <option value='No Messages in 60 days'>60 days old</option>
              <option value='No Messages in 30 days'>30 days old</option>
              <option value='Active'>Active</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div>
            <input
              type='text'
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='p-2 border rounded-md shadow-sm w-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mr-4'
            />
          </div>
        </div>
        <div className='flex flex-col w-full px-4'>
          {businesses
            .filter(
              (business) =>
                business.company_name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) &&
                (statusFilter === 'all' ||
                  businessStatuses[business._id] === statusFilter),
            )
            .map((business) => (
              <BusinessCard
                key={business._id}
                business={business}
                updateStatus={(status) =>
                  setBusinessStatuses((prev) => ({
                    ...prev,
                    [business._id]: status,
                  }))
                }
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default BusinessList
