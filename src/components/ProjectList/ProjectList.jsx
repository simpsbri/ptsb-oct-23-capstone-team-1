import ProjectCard from './ProjectCard'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ProjectList = () => {
  const [projects, setProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:4000/projects')
      setProjects(response.data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:4000/projects/${projectId}`)
      setProjects(projects.filter((project) => project._id !== projectId))
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredProjects = projects.filter((project) =>
    project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <div className='min-w-full flex flex-col items-center mx-auto w-4/5'>
        <div className='font-bold mb-4 flex items-center justify-between w-full px-4'>
          <div style={{ width: '15%' }}>
            {' '}
            {/* Placeholder div for aligning the Projects text */}
            <TextField
              label='Search Projects'
              variant='outlined'
              size='small'
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: '100%' }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            Projects
          </div>{' '}
          {/* Center the text absolutely */}
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate('/projects/createNewProject')}
            style={{ width: '15%' }} // Placeholder div for aligning the Projects text
          >
            Create New Project
          </Button>
        </div>
        <div className='flex flex-col w-full px-4'>
          {filteredProjects.map((project) => (
            <ProjectCard
              project={project}
              key={project._id}
              onDelete={deleteProject}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default ProjectList
