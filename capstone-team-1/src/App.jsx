import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
// import JobList from './components/ProjectList/ProjectList'
// import data_jobs from './data/joblist.json'
import BusinessList from './components/BusinessList/BusinessList'
import businessList from './data/businessList.json'

function App() {
  const [businesses, setBusinesses] = useState([])
  const [filters, setFilters] = useState([])

  useEffect(() => setBusinesses(businessList))

  // filter function
  const filterFunc = ({ role, level, tools, languages }) => {
    if (filters.length === 0) {
      return true
    }

    const tags = [role, level]

    return tags.some((tag) => filters.includes(tag))
  }

  const filteredBusinesses = businesses.filter(filterFunc)

  return (
    <div className='w-full min-h-screen'>
      <Header />
      <div className='max-w-7xl mx-auto'>{/* use filter function here */}</div>

      {/* joblist component here */}
      <BusinessList filteredBusinesses={filteredBusinesses} />
      {/* <JobList filteredJobs={filteredJobs} /> */}
      {/* Footer component here */}
      <Footer />
    </div>
  )
}

export default App
