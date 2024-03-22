import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLatestMessage } from './useLatestMessage'

const BusinessCard = ({ business, handleTagClick }) => {
  const {
    company_name,
    isNew,
    Overview,
    logo,
    primary_contact,
    primary_contact_email,
    _id,
    Projects,
  } = business

  const [busMessages, setBusMessages] = useState([])
  const latestMessage = useLatestMessage(busMessages, _id)
  const [backgroundColor, setBackgroundColor] = useState('')

  useEffect(() => {
    fetch('http://localhost:4000/messages')
      .then((response) => response.json())
      .then((data) => {
        setBusMessages(data)
      })
      .catch((error) => console.error('Error:', error))

    if (latestMessage) {
      const messageDate = new Date(latestMessage.createdAt)
      const currentDate = new Date()
      const differenceInDays = Math.ceil(
        (currentDate - messageDate) / (1000 * 60 * 60 * 24),
      )

      if (differenceInDays > 30) {
        setBackgroundColor('lightcoral')
      } else {
        setBackgroundColor('white')
      }
    }
  }, [latestMessage])

  const tags = Array.isArray(Projects) ? Projects : [Projects]

  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className='flex flex-col justify-between shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid sm:flex-row'
    >
      <div className='flex-flex-col-justify-between ml-4'>
        {/* company name with logo */}
        <h1 className='py-2 text-primary_dark_cyan text-lg flex items-center gap-2'>
          <Link
            to={`/businesses/${business._id}`}
            className='flex items-center gap-2'
          >
            {logo && (
              <img
                src={logo}
                alt={`${company_name} logo`}
                className='w-9 h-9 object-cover'
              />
            )}
            {company_name}
          </Link>
          {isNew && (
            <span className='bg-primary_dark_cyan rounded-full px-3 text-base text-white'>
              New!
            </span>
          )}
          {/* {isFeatured && (
            <span className='bg-gray-700 rounded-xl px-3 text-base text-white'>
              Featured
            </span>
          )} */}
        </h1>
        {/* primary contact info */}
        <p className='flex items-center gap-2 text-dark_gray_cyan text-base pr-6'>
          {primary_contact}
        </p>

        {/* primary contact email */}
        <p className='flex items-center gap-2 text-dark_gray_cyan text-base pr-6'>
          {primary_contact_email}
        </p>

        {/* job info */}
        <p className='flex items-center gap-2 text-dark_gray_cyan text-base pr-6'>
          {Overview}
        </p>
        {latestMessage && (
          <p className='flex items-center gap-2 text-dark_gray_cyan text-base pr-6'>
            <b>Latest message:</b> {latestMessage.messageText}
            <br />
            <b>Created At:</b>
            {new Date(latestMessage.createdAt).toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              month: 'numeric',
              day: 'numeric',
              year: '2-digit',
              hour12: true,
            })}
          </p>
        )}
      </div>
      {/* Job tags */}
      <div className='flex flex-wrap items-center mt-4 mx-4 pt-4 border-t border-gray-500 border-solid sm:ml-auto sm:border-0 sm:pt-0'>
        {tags.map((tag, index) => (
          <button
            key={`tag-${index}`}
            className='text-primary_dark_cyan bg-light_grayish_cyan_filter_pill font-bold p-2 rounded mr-4 mb-4 sm:mb-0 sm:ml-auto'
            onClick={() => handleTagClick(tag)} // Add onClick event to handle tag clicks
          >
            {tag.projectName}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BusinessCard
