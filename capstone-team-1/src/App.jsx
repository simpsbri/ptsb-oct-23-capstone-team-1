import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import JobList from './components/Main/JobList'
import data_jobs from './data/data.json'

function App() {
  const [jobs, setJobs] = useState([])
  const [filters, setFilters] = useState([])

  useEffect(() => setJobs(data_jobs))

  // filter function
  const filterFunc = ({ role, level, tools, languages }) => {
    if (filters.length === 0) {
      return true
    }

    const tags = [role, level]

    return tags.some((tag) => filters.includes(tag))
  }

  const filteredJobs = jobs.filter(filterFunc)

  return (
    <div className='w-full min-h-screen'>
      <Header />
      <div className='max-w-7xl mx-auto'>{/* use filter function here */}</div>

      {/* joblist component here */}
      <JobList filteredJobs={filteredJobs} />
      {/* Footer component here */}
      <Footer />
    </div>
  )
}

export default App
