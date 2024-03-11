import BusinessCard from './BusinessCard'

const BusinessList = ({ handleTagClick, filteredBusinesses }) => {
  console.log('filteredBusinesses:', filteredBusinesses)
  return (
    <div className='max-w-7xl mx-auto'>
      <div className>Businesses</div>
      <div className='flex flex-col'>
        {filteredBusinesses &&
          filteredBusinesses.map((business) => (
            <BusinessCard business={business} key={business.id} />
          ))}
      </div>
    </div>
  )
}

export default BusinessList
