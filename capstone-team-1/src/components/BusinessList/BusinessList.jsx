import React, { useEffect, useState } from 'react'
import BusinessCard from './BusinessCard'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import axios from 'axios'
import { Button } from '@mui/material'

const BusinessList = ({ handleTagClick }) => {
  const [businesses, setBusinesses] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('src/data/businessList.json')
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
      <div className='flex flex-col items-center mx-auto h-96'>
        <div className='flex items-center justify-between w-full mb-4'>
          <div className='font-bold text-center mx-auto w-4/10'>Businesses</div>
          <div className='flex items-center'>
            <Button variant='contained' color='inherit' className='w-2/10'>
              Create New
            </Button>
          </div>
        </div>
        <div className='flex flex-col'>
          {businesses.map((business) => (
            <BusinessCard business={business} key={business.id} />
          ))}
        </div>
      </div>
    </>
  )
}

export default BusinessList
