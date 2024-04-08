import axios from 'axios'

import dotenv from 'dotenv'
dotenv.config()

const viteUrl = process.env.VITE_URL

async function getAdminEmails() {
  try {
    const response = await axios.get(`${viteUrl}api/user`)

    const admins = response.data.filter((user) => user.isAdmin === 'Admin') // Use filter on response.data

    const emails = admins.map((admin) => admin.email)

    return emails
  } catch (error) {
    console.error(error)
  }
}

export default getAdminEmails
