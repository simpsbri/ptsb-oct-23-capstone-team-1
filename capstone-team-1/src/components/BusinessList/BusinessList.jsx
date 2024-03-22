import React, { useEffect, useState } from 'react'
import BusinessCard from './BusinessCard'
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const BusinessList = ({ handleTagClick, latestMessage }) => {
  const navigate = useNavigate()
  const [businesses, setBusinesses] = useState([])

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
          <div className='font-bold text-center mx-auto w-4/10'>Businesses</div>
          <div className='flex items-center'>
            <Button
              variant='contained'
              color='inherit'
              className='w-2/10'
              onClick={() => navigate('createNewBusiness')}
            >
              Create New
            </Button>
          </div>
        </div>
        <div className='flex flex-col w-full px-4'>
          {businesses.map((business, index) => {
            return (
              <BusinessCard
                key={index}
                business={business}
                handleTagClick={handleTagClick}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default BusinessList
