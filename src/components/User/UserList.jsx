import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserCard from './UserCard'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

const UserList = () => {
  const navigate = useNavigate()

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users')
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

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
        </div>
        {Array.isArray(users) &&
          users.map((user) => <UserCard key={user._id} user={user} />)}
      </div>
    </>
  )
}

export default UserList
