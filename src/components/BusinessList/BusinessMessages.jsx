import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import './business.css'
import axios from 'axios'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { AuthContext } from '../../../server/middleware/setAuth'

const viteUrl = import.meta.env.VITE_WEB_ADDRESS

function BusinessMessages() {
  const { auth } = useContext(AuthContext)
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState('')
  const [showModal, setShowModal] = useState(false)
  const { id } = useParams()
  const { id: businessId } = useParams() // Declare and initialize businessId using useParams

  const fetchMessages = () => {
    fetch(`${viteUrl}messages`)
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
    try {
      // Declare and initialize messageData
      const messageData = {
        messageText,
        businessId,
        userId: auth.user._id,
        userName: auth.user.name,
      }

      const response = await fetch(`${viteUrl}messages`, {
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
      const response = await axios.delete(`${viteUrl}messages/${messageId}`)

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
      {auth.user.isAdmin === 'Admin' && (
        <button
          type='button'
          onClick={() => setShowModal(true)}
          className='myButton'
        >
          Create Message
        </button>
      )}

      {showModal && (
        <div className='fixed z-10 inset-0'>
          <div className='flex items-end justify-center min-h-screen pt-1 px-1 pb-2 text-center sm:block sm:p-0'>
            <div className='fixed inset-0 transition-opacity'>
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>
            <div
              className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-4 sm:align-middle sm:max-w-lg sm:w-full'
              role='dialog'
              aria-modal='true'
              aria-labelledby='modal-headline'
            >
              <div className='bg-white px-2 pt-3 pb-2 sm:p-3 sm:pb-2'>
                <form onSubmit={handleNewMessageSubmit}>
                  <h1 className='text-2xl font-bold mb-4'>Message</h1>
                  <ReactQuill value={messageText} onChange={setMessageText} />
                  <button type='submit' className='myButton'>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <table className='table-auto w-full border'>
        <thead className='bg-white'>
          <tr className='bg-white'>
            <th className='px-4 py-2 border'>Message</th>
            <th className='px-4 py-2 border'>Created By</th>
            <th className='px-4 py-2 border'>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {messages
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((message, index) => {
              return (
                <tr key={message._id}>
                  <td
                    className='border px-4 py-2'
                    style={{ border: '1px solid black' }}
                  >
                    <div
                      className='text-gray-800'
                      dangerouslySetInnerHTML={{ __html: message.messageText }}
                    />
                  </td>
                  <td
                    className='border px-4 py-2'
                    style={{ border: '1px solid black', textAlign: 'center' }}
                  >
                    {message.userName ? message.userName : 'User not found'}
                  </td>
                  <td
                    className='border px-4 py-2'
                    style={{ border: '1px solid black', textAlign: 'center' }}
                  >
                    {new Date(message.createdAt).toLocaleString()}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
      {/* {messages
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
                <div
                  className='text-gray-800'
                  dangerouslySetInnerHTML={{ __html: message.messageText }}
                  style={{ marginLeft: '20px' }}
                />
                <div>
                  {message.userName ? message.userName : 'User not found'}
                </div>
                {auth.user.isAdmin === 'Admin' && (
                  <button
                    onClick={() => handleDeleteMessage(message._id)}
                    className='deleteButton'
                  >
                    Delete
                  </button>
                )}
              </div>

              <p>Created: {new Date(message.createdAt).toLocaleString()}</p>
              <hr />
            </div>
          )
        })} */}
    </div>
  )
}

export default BusinessMessages
