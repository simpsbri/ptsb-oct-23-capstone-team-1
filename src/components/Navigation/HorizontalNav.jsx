import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './HorizontalNav.css'
import { Badge } from '@mui/material'

function HorizontalNav() {
  const [showBadge, setShowBadge] = useState(false)
  const [businesses, setBusinesses] = useState([])
  const [oldBusinessesCount, setOldBusinessesCount] = useState(0)

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      const oldBusinesses = businesses.filter((business) => {
        if (business.lastContactedDate === null) {
          return true
        }
        const lastContactedDate = new Date(business.lastContactedDate)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return lastContactedDate < thirtyDaysAgo
      })

      setOldBusinessesCount(oldBusinesses.length)
    }, 10000)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [businesses])

  return (
    <nav style={{ width: '100%' }} className='mb-12'>
      <ul style={{ display: 'flex' }}>
        <li>
          <Link to='/' className='navlink'>
            Home
          </Link>
        </li>
        <li>
          <Badge badgeContent={oldBusinessesCount} color='warning'>
            <Link to='/businesses' className='navlink'>
              Businesses
            </Link>
          </Badge>
        </li>
        <li>
          <Link to='/users' className='navlink'>
            Users
          </Link>
        </li>
        <li>
          <Link to='/projects' className='navlink'>
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default HorizontalNav
