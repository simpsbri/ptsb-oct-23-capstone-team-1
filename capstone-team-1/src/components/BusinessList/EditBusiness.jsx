import React, { useState } from 'react'

const EditBusinessForm = ({ business, onSave }) => {
  const [company_name, setCompany_name] = useState(business.company_name)
  const [street, setStreet] = useState(business.street)
  const [city, setCity] = useState(business.city)
  const [state, setState] = useState(business.state)
  const [zip, setZip] = useState(business.zip)
  const [Overview, setOverview] = useState(business.Overview)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...business, company_name, street, city, state, zip, Overview })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={company_name}
        onChange={(e) => setCompany_name(e.target.value)}
      />
      <input
        type='text'
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
      <input
        type='text'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type='text'
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <input type='text' value={zip} onChange={(e) => setZip(e.target.value)} />
      <textarea
        value={Overview}
        onChange={(e) => setOverview(e.target.value)}
      />
      <button type='submit'>Save Changes</button>
    </form>
  )
}

export default EditBusinessForm
