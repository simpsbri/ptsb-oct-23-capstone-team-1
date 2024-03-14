import ProjectCard from './ProjectCard'
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import axios from 'axios'
import HorizontalNav from '../Navigation/HorizontalNav'

const ProjectList = ({ handleEditClick }) => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('src/data/joblist.json')
        setProjects(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
  return (
    <>
      <div className='min-w-full flex flex-col items-center mx-auto w-4/5 h-96'>
        <div className='font-bold mb-4'>Projects</div>
        <div className='flex flex-col'>
          {projects.map((job) => (
            <ProjectCard job={job} key={job.id} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ProjectList
