import React from 'react'
import MessageModal from './BusinessMessageModal'

const MessageComponent = ({ messages }) => {
  return (
    <div className='flex flex-col w-full px-4 justify-between bg-white shadow-md my-5 mx-10 p-6 rounded-md border-teal-500 border-solid-2'>
      <h2 className='text-2xl font-bold mb-4'>Messages</h2>
      <MessageModal />
      {messages.map((message, index) => (
        <div key={index} className='mt-4 bg-gray-500 p-4 rounded-md shadow-md'>
          <p className='text-gray-700 pl-8'>{message}</p>
        </div>
      ))}
    </div>
  )
}

export default MessageComponent
