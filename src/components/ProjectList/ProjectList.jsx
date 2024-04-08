import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { InputAdornment } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import ProjectCard from './ProjectCard'

const viteUrl = import.meta.env.VITE_WEB_ADDRESS

const ProjectList = () => {
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

  // const deleteProject = async (projectId) => {
  //   try {
  //     await axios.delete(`${viteUrl}projects/${projectId}`);
  //     setProjects(projects.filter((project) => project._id !== projectId));
  //   } catch (error) {
  //     console.error("Error deleting project:", error);
  //   }
  // };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredProjects = projects.filter((project) =>
    project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className='flex flex-col w-full mb-4 px-4'>
      <div className='flex justify-between items-center'>
        <button
          variant='contained'
          // color='inherit'
          className='bg-green-500 text-white addNewButton'
          onClick={() => navigate('/admin/projects/createNewProject')}
        >
          <AddIcon />
          Create New
        </button>

        <h1>Projects</h1>

        <div className='w-1/3'>
          <input
            type='text'
            placeholder='Search Projects'
            value={searchTerm}
            onChange={handleSearchChange}
            className='p-2 border rounded-md shadow-sm w-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
          />
        </div>
      </div>

      <div className='w-full'>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        ) : (
          <p className='text-center'>No projects found.</p>
        )}
      </div>
    </div>
  )
}

export default ProjectList
