import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios' // Import axios
import BusinessProfile from '../components/BusinessList/BusinessProfile'

const Business = () => {
  return (
    <div>
      <BusinessProfile />
    </div>
  )
}

export default Business
