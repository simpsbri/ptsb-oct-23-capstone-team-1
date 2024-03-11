import BusinessCard from './BusinessCard'

const BusinessList = ({ handleTagClick, filteredBusinesses }) => {
  return (
    <div className='flex flex-col items-center mx-auto h-96'>
      <div className='font-bold mb-4'>Businesses</div>
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
