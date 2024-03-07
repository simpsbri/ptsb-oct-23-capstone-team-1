import JobCard from './JobCard'

const JobList = ({ handleTagClick, filteredJobs }) => {
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex flex-col'>
        {filteredJobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </div>
  )
}

export default JobList
