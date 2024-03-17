import React from 'react'
import { Link } from 'react-router-dom'

const BusinessProfile = ({ business }) => {
  const {
    businessId,
    name,
    address,
    contactInfo,
    category,
    description,
    logo,
  } = business // Assume `businessId`, `logo`, and `description` are passed in

  return (
    <div className='flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid'>
      <div className='flex flex-col justify-between ml-4'>
        {/* Logo */}
        <img
          src={logo}
          alt={`${name}'s logo`}
          className='w-32 h-32 rounded-full mb-4'
        />

        {/* Profile Header */}
        <h1 className='text-2xl text-primary_dark_cyan font-bold mb-4'>
          Business Profile
        </h1>

        {/* Business Info */}
        <div className='mb-4'>
          {/* Name with Link */}
          <h2 className='py-2 text-primary_dark_cyan text-lg'>
            <Link to={`/businesses/${businessId}`} className='hover:underline'>
              {name}
            </Link>{' '}
            {/* Make sure this path is correct based on your router setup */}
          </h2>
          <p className='text-dark_gray_cyan text-base'>{address}</p>
          <p className='text-dark_gray_cyan text-base'>{contactInfo}</p>
          <p className='text-dark_gray_cyan text-base'>{category}</p>
        </div>

        {/* Description */}
        <p className='text-dark_gray_cyan text-base mb-4'>{description}</p>

        {/* Edit Business Button */}
        <button className='bg-primary_dark_cyan text-white font-bold p-2 rounded self-start'>
          Edit Business
        </button>
      </div>
    </div>
  )
}

export default BusinessProfile
