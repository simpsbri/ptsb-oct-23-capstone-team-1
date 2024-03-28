import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './business.css'
import { useLatestMessage } from './useLatestMessage'
import ReportGmailerrorredTwoToneIcon from '@mui/icons-material/ReportGmailerrorredTwoTone'
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone'
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone'
import ContactSupportTwoToneIcon from '@mui/icons-material/ContactSupportTwoTone'

const BusinessCard = ({ business, handleTagClick, updateStatus }) => {
  const {
    company_name,
    isNew,
    Overview,
    logo,
    primary_contact,
    primary_contact_email,
    _id,
    Projects,
    businessStatus,
  } = business

  const [busMessages, setBusMessages] = useState([])
  const latestMessage = useLatestMessage(busMessages, _id)
  const [backgroundColor, setBackgroundColor] = useState('')
  const [statusIcon, setStatusIcon] = useState(null)
  const [status, setStatus] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/messages')
      .then((response) => response.json())
      .then(
        (data) => {
          const businessMessages = data.filter(
            (message) => message.businessId === _id,
          )
          setBusMessages(businessMessages)

          const latestMessage = businessMessages.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          )[0]

          if (!latestMessage) {
            setBackgroundColor('gray')
            setStatusIcon(<ContactSupportTwoToneIcon />)
            setStatus('No Messages Yet')
            updateStatus('No Messages Yet')
          } else {
            const messageDate = new Date(latestMessage.createdAt)
            const currentDate = new Date()
            const differenceInDays = Math.ceil(
              (currentDate - messageDate) / (1000 * 60 * 60 * 24),
            )

            switch (true) {
              case differenceInDays > 60:
                setBackgroundColor('lightcoral')
                setStatusIcon(<ReportGmailerrorredTwoToneIcon />)
                setStatus('No Messages in 60 days')
                updateStatus('No Messages in 60 days')
                break
              case differenceInDays > 30:
                setBackgroundColor('yellow')
                setStatusIcon(<WarningTwoToneIcon />)
                setStatus('No Messages in 30 days')
                updateStatus('No Messages in 30 days')
                break
              default:
                setBackgroundColor('lightgreen')
                setStatusIcon(<ChatBubbleTwoToneIcon />)
                setStatus('Active')
                updateStatus('Active')
            }
          }
        },
        [latestMessage],
      )
      .catch((error) => {
        console.error('Error fetching messages:', error)
      })
  }, [])

  useEffect(() => {
    fetch(`http://localhost:4000/users`)
      .then((response) => response.json())
      .then((data) => {
        const filteredUsers = data.filter((user) => user.businessId === _id)
        setUsers(filteredUsers)
      })
  }, [_id])

  const tags = Array.isArray(Projects) ? Projects : [Projects]

  return (
    <div className='flex flex-col justify-between items-center shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid sm:flex-row'>
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
          <span className='bg-primary_dark_cyan rounded-full px-3 text-base text-white'>
            {businessStatus}
          </span>
        </h1>
        {/* primary contact info */}
        <p className='flex items-center gap-2 text-dark_gray_cyan text-base pr-6'>
          Primary Contact: {primary_contact}
        </p>

        {/* primary contact email */}
        <p className='flex items-center gap-2 text-dark_gray_cyan text-base pr-6'>
          Primary Contact Email: {primary_contact_email}
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
        <h3>Associated Users</h3>
        <ul className='usersList'>
          {users.map((user) => (
            <li className='usersList' key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
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

      <div
        className='h-full svg_icons'
        style={{ backgroundColor: backgroundColor }}
      >
        {statusIcon}
      </div>
    </div>
  )
}

export default BusinessCard
