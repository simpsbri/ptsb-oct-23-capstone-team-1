import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios' // Import axios
import ProjectProfile from '../components/ProjectList/ProjectProfile'

const ProjectOverview = () => {
  return (
    <div>
      <ProjectProfile />
    </div>
  )
}

export default ProjectOverview
