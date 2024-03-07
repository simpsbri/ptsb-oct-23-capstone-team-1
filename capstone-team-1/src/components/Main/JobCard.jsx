const JobCard = ({ job, handleTagClick }) => {
  const {
    company,
    logo,
    isNew,
    isFeatured,
    position,
    role,
    postedAt,
    status,
    languages,
    tools,
  } = job

  const tags = [role]

  if (tools) {
    tags.push(...tools)
  }

  if (languages) {
    tags.push(...languages)
  }

  return (
    <div className='flex flex-col justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid sm:flex-row'>
      {/* company logo */}
      <img
        src={logo}
        alt='logo'
        className='-mt-11mb-4 w-20 h-20 sm:mt-0 sm:h-24 sm:my-0'
      />

      <div className='flex-flex-col-justify-between ml-4'>
        {/* company name */}
        <h1 className='py-2 text-primary_dark_cyan text-lg flex items-center gap-2'>
          {company}
          {isNew && (
            <span className='bg-primary_dark_cyan rounded-full px-3 text-base text-white'>
              New!
            </span>
          )}
          {isFeatured && (
            <span className='bg-gray-700 rounded-xl px-3 text-base text-white'>
              Featured
            </span>
          )}
        </h1>

        {/* job position */}
        <h1 className='text-xl font-bold cursor-pointer'>{position}</h1>

        {/* job info */}
        <p className='flex items-center gap-2 text-dark_gray_cyan text-base'>
          {postedAt} • {status}
        </p>
      </div>
      {/* Job tags */}
      <div className='flex flex-wrap items-center mt-4 mx-4 pt-4 border-t border-gray-500 border-solid sm:ml-auto sm:border-0 sm:pt-0'>
        {tags.map((tag) => (
          <button className='text-primary_dark_cyan bg-light_grayish_cyan_filter_pill font-bold p-2 rounded mr-4 mb-4 sm:mb-0'>
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

export default JobCard
