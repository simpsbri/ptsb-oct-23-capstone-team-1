import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BusinessProfile from '../components/BusinessList/BusinessProfile'
import businessList from '../data/businessList.json'

const Business = () => {
  const { id } = useParams() // useParams will return the businessId as a string
  const [business, setBusiness] = useState(null)

  useEffect(() => {
    const fetchedBusiness = businessList.find(
      (business) => business.id.toString() === id,
    )
    setBusiness(fetchedBusiness)
  }, [id])

  if (!business) {
    return <div>Loading business profile...</div>
  }

  return <BusinessProfile business={business} />
}

export default Business
