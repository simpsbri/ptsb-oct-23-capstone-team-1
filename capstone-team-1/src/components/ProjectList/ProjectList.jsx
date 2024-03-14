import ProjectCard from './ProjectCard'
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import axios from 'axios'

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
      <Header />

      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col'>
          {projects.map((job) => (
            <ProjectCard job={job} key={job.id} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProjectList
