import ProjectCard from './ProjectCard'

const ProjectList = ({ handleTagClick, filteredJobs }) => {
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex flex-col'>
        {filteredJobs.map((job) => (
          <ProjectCard job={job} key={job.id} />
        ))}
      </div>
    </div>
  )
}

export default ProjectList
