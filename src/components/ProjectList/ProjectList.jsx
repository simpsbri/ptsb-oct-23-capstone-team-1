import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { InputAdornment, Autocomplete, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import ProjectCard from './ProjectCard'
import { AuthContext } from '../../../server/middleware/setAuth'

const viteUrl = import.meta.env.VITE_WEB_ADDRESS

const ProjectList = () => {
  const { auth } = useContext(AuthContext)
  const [selectedTypes, setSelectedTypes] = useState([])
  const projectTypes = [
    'UX/UI',
    'Software Development',
    'Data Analytics',
    'Sales',
    'Digital Marketing',
  ]

  const [projects, setProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${viteUrl}projects`)
        setProjects(response.data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = projects.filter((project) =>
    project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const displayedProjects =
    selectedTypes.length > 0
      ? filteredProjects.filter((project) =>
          project.projectType.some((type) => selectedTypes.includes(type)),
        )
      : filteredProjects

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <>
      <div style={{ textAlign: 'center' }} className='mb-4 px-4'>
        <h1>Projects</h1>
      </div>
      <div className='w-full flex justify-between mb-4 px-4'>
        <div className='w-1/3'>
          <button
            variant='contained'
            className='bg-green-500 text-white addNewButton'
            onClick={() => navigate('/admin/projects/createNewProject')}
          >
            <AddIcon />
          </button>
        </div>
        <div className='w-2/3'>
          {auth.user.isAdmin === 'Admin' ? (
            <input
              type='text'
              placeholder='Search Projects'
              value={searchTerm}
              onChange={handleSearchChange}
            />
          ) : auth.user.isAdmin === 'Capstone' ? (
            <Autocomplete
              multiple
              options={projectTypes}
              value={selectedTypes}
              onChange={(event, newValue) => {
                setSelectedTypes(newValue)
              }}
              style={{ minWidth: '300px' }}
              renderInput={(params) => (
                <TextField {...params} label='Filter by project type' />
              )}
            />
          ) : null}
        </div>
      </div>

      <div className='w-full'>
        {displayedProjects.length > 0 ? (
          displayedProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        ) : (
          <p className='text-center'>No projects found.</p>
        )}
      </div>
    </>
  )
}

export default ProjectList
