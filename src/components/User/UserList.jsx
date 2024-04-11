import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserCard from './UserCard'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

const viteUrl = import.meta.env.VITE_WEB_ADDRESS

const UserList = () => {
  const navigate = useNavigate()

  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${viteUrl}api/user`)
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <div>
        <div style={{ textAlign: 'center' }}>
          <h2>User List</h2>
        </div>
        <div className='flex justify-between w-full mb-4'>
          <div className='flex ml-5'>
            <button
              variant='contained'
              // color='inherit'
              className='bg-green-500 text-white addNewButton'
              onClick={() => navigate('createNewUser')}
            >
              <AddIcon />
              Create New
            </button>
          </div>
          <div>
            <input
              type='text'
              placeholder='Search Users'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='p-2 border rounded-md shadow-sm w-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mr-4'
            />
          </div>
        </div>
        {filteredUsers.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </>
  )
}

export default UserList
