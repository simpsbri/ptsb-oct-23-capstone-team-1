import axios from 'axios'

async function getAdminEmails() {
  try {
    const response = await axios.get('http://localhost:4000/api/user')

    const admins = response.data.filter((user) => user.isAdmin === 'Admin') // Use filter on response.data

    const emails = admins.map((admin) => admin.email)

    return emails
  } catch (error) {
    console.error(error)
  }
}

export default getAdminEmails
