import React, { useState } from 'react'
import './Registration.css'

function Registration() {
  const [businessName, setBusinessName] = useState('')
  const [primary_contact, setPrimary_Contact] = useState('')
  const [primary_email, setPrimary_Email] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // handle form submission here
  }

  return (
    <div className='registration-form'>
      <h2 className='registration-title'>Get in touch!</h2>
      <p>
        Are you interested in learning more about our capstone project process?
        Simply send us a message and our program manager will reach out.
        <br />
        <br />
      </p>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-field'>
          <label htmlFor='businessName' className='form-label'>
            Company Name:
          </label>
          <input
            type='text'
            id='businessName'
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className='form-input'
          />
        </div>
        <div className='form-field'>
          <label htmlFor='primary_contact' className='form-label'>
            Primary Contact:
          </label>
          <input
            type='text'
            id='primary_contact'
            value={primary_contact}
            onChange={(e) => setPrimary_Contact(e.target.value)}
            className='form-input'
          />
        </div>
        <div className='form-field'>
          <label htmlFor='email' className='form-label'>
            Email:
          </label>
          <input
            type='email'
            id='email'
            value={primary_email}
            onChange={(e) => setPrimary_Email(e.target.value)}
            className='form-input'
          />
        </div>
        <button type='submit' className='form-button'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Registration
