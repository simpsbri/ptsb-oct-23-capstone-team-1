import React, { useState } from 'react'
import axios from 'axios'

function MessageModal({ businessId }) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleSubmit = async () => {
    try {
      await axios.post(`/businesses/${businessId}/messages`, { message })
      setMessage('')
      handleClose()
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  return (
    <div>
      <button onClick={handleOpen}>Create New</button>

      {isOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>Add a Message</h2>
            <input
              type='text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSubmit}>Save Changes</button>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageModal
