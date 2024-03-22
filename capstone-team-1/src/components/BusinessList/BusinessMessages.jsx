import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './business.css'
import axios from 'axios'

function BusinessMessages() {
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState('')
  const [showModal, setShowModal] = useState(false)
  const { id } = useParams()
  const { id: businessId } = useParams() // Declare and initialize businessId using useParams

  const fetchMessages = () => {
    fetch('http://localhost:4000/messages')
      .then((response) => response.json())
      .then((data) => {
        const filteredMessages = data.filter(
          (message) => message.businessId === id,
        )
        setMessages(filteredMessages)
      })
      .catch((error) => console.error('Error:', error))
  }

  useEffect(() => {
    fetchMessages()
  }, [id])

  const handleNewMessageChange = (event) => {
    setMessageText(event.target.value)
  }

  const handleNewMessageSubmit = async () => {
    console.log(`messageText: ${messageText}, businessId: ${businessId}`) // Log the values

    try {
      // Declare and initialize messageData
      const messageData = {
        messageText,
        businessId,
      }

      const response = await fetch('http://localhost:4000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Add the new message to the messages state
      setMessages((prevMessages) => [...prevMessages, data])
    } catch (error) {
      console.error('Error:', error)
    }
  }
  const handleDeleteMessage = async (messageId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this message?',
    )
    if (!confirmDelete) {
      return
    }

    try {
      const response = await axios.delete(
        `http://localhost:4000/messages/${messageId}`,
      )

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      setMessages(
        (prevMessages) =>
          prevMessages.filter((message) => message._id !== messageId),
        fetchMessages(),
      )
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Message not found')
      } else {
        console.error('Error - Message?:', error)
      }
    }
  }

  return (
    <div className='p-6 bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Messages</h1>
      <button
        type='button'
        onClick={() => setShowModal(true)}
        className='myButton'
      >
        Create Message
      </button>

      {showModal && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div className='fixed inset-0 transition-opacity'>
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>
            <div
              className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
              role='dialog'
              aria-modal='true'
              aria-labelledby='modal-headline'
            >
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <form onSubmit={handleNewMessageSubmit}>
                  <h1 className='text-2xl font-bold mb-4'>Message</h1>
                  <textarea
                    value={messageText}
                    onChange={handleNewMessageChange}
                    className='myTextarea'
                  />
                  <button type='submit' className='myButton'>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {messages
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((message) => {
          return (
            <div key={message._id} className='p-4 bg-white rounded shadow mb-4'>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <p className='text-gray-800'>{message.messageText}</p>
                <button
                  onClick={() => handleDeleteMessage(message._id)}
                  className='deleteButton'
                >
                  Delete
                </button>
              </div>
              {/* <p className='text-gray-800'>{message._id.toString()}</p> */}
              <p>{new Date(message.createdAt).toLocaleString()}</p>
              <hr />
            </div>
          )
        })}
    </div>
  )
}

export default BusinessMessages
