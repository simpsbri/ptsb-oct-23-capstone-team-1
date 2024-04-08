import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
const viteUrl = import.meta.env.VITE_WEB_ADDRESS

const UserCard = ({ user, handleEditClick }) => {
  const {
    _id,
    name,
    email,
    isAdmin,
    isCapstone,
    isBusiness,
    role,
    postedAt,
    status,
    businessId,
  } = user
  const [businesses, setBusinesses] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${viteUrl}/businesses`)
        setBusinesses(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // Find the business that matches the businessId
  const business = businesses.find((business) => business._id === businessId)

  return (
    <div className='flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid sm:flex-row'>
      <div className='flex-flex-col-justify-between ml-4'>
        {/* user info */}
        <h1 className='py-2 text-primary_dark_cyan text-xl'>
          {/* Wrap the user name in a Link component */}
          <Link to={`/admin/users/${_id}`} className='hover:text-teal-700'>
            {name}
          </Link>

          {isAdmin && (
            <span className='bg-primary_dark_cyan rounded-full px-3 text-base text-white ml-4'>
              {isAdmin}
            </span>
          )}
          {isBusiness && (
            <span className='bg-primary_dark_cyan rounded-full px-3 text-base text-white ml-4'>
              Business
            </span>
          )}
          {isCapstone && (
            <span className='bg-primary_dark_cyan rounded-full px-3 text-base text-white ml-4'>
              Capstone
            </span>
          )}
        </h1>
        <p className='text-dark_gray_cyan text-base'>{email}</p>
        {/* job info */}
        <p className='flex items-center gap-2 text-dark_gray_cyan text-base pr-6'>
          {role} - {status} - {postedAt}
        </p>
      </div>
      {/* Associated Business Name */}
      <div className='flex items-center mt-4 mx-4 pt-4 sm:ml-auto'>
        {business && (
          <h4 className='text-dark_gray_cyan text-xl'>
            {business.company_name}
          </h4>
        )}{' '}
      </div>
    </div>
  )
}

export default UserCard
