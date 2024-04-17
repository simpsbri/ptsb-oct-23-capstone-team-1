import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { AuthContext } from '../../../server/middleware/setAuth'
import './project.css'

const ProjectCard = ({ project, onDelete }) => {
  const { auth } = useContext(AuthContext)

  const { projectTitle, details, _id, status, projectType, createdAt } = project

  const formattedCreatedAt = createdAt
    ? new Date(createdAt).toLocaleString()
    : 'Recently'

  const linkPath =
    auth.user.isAdmin === 'Admin'
      ? `/admin/projects/${_id}`
      : auth.user.isAdmin === 'Business'
        ? `/business/projects/${_id}`
        : auth.user.isAdmin === 'Capstone'
          ? `/capstone/projects/${_id}`
          : '/not-authorized'

  return (
    <div className='flex flex-col justify-between bg-white shadow-md my-5  p-6 rounded-md border-teal-500 border-solid sm:flex-row'>
      <div className='flex flex-col justify-between ml-4'>
        <h1 className='text-xl font-bold cursor-pointer'>
          <Link
            to={linkPath}
            className='text-primary_dark_cyan hover:underline'
            style={{ marginLeft: 0 }}
          >
            {projectTitle}
          </Link>
        </h1>
        <div
          className='text-base mt-2'
          dangerouslySetInnerHTML={{ __html: details.substring(0, 50) }}
        />
        <p className='flex items-center gap-2 text-dark_gray_cyan text-base'>
          Posted: {formattedCreatedAt} • Status: {status}
        </p>
        <div className='flex flex-wrap'>
          {projectType.map((type, index) => (
            <div
              key={index}
              className='text-primary_dark_cyan bg-light_grayish_cyan_filter_pill font-bold p-2 rounded mr-4 mb-4 sm:mb-0'
            >
              {type}
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center mt-4 mx-4 pt-4 border-t border-gray-500 border-solid sm:ml-auto sm:border-0 sm:pt-0'></div>
    </div>
  )
}

export default ProjectCard
