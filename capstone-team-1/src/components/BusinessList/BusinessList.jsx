import React, { useEffect, useState } from 'react'
import BusinessCard from './BusinessCard'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import axios from 'axios'

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
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />

      <div className='flex flex-col items-center mx-auto h-96'>
        <div className='font-bold mb-4'>Businesses</div>
        <div className='flex flex-col'>
          {businesses.map((business) => (
            <BusinessCard business={business} key={business.id} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default BusinessList
