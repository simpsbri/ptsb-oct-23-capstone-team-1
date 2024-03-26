import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios' // Import axios
import BusinessProfileBlank from '../components/BusinessList/BusinessProfileBlank'

const BusinessBlank = () => {
  return (
    <div>
      <BusinessProfileBlank />
    </div>
  )
}

export default BusinessBlank
