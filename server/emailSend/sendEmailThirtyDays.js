import nodemailer from 'nodemailer'
import { subDays, startOfDay } from 'date-fns'
import axios from 'axios'

import dotenv from 'dotenv'

import getAdminEmails from './adminEmails.js'

dotenv.config()
const viteUrl = process.env.VITE_WEB_ADDRESS

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.VITE_EMAIL_USER,
    pass: process.env.VITE_EMAIL_PASSWORD,
  },
})

const sendEmail30 = async () => {
  try {
    const response = await axios.get(`${viteUrl}businesses`)
    const businesses = response.data

    const today = startOfDay(new Date())
    const thirtyDaysAgo = subDays(today, 30)
    const sixtyDaysAgo = subDays(today, 60)
    const adminEmails = await getAdminEmails()

    let businessesNotContacted = businesses.filter((business) => {
      const lastContactedDate = startOfDay(new Date(business.lastContactedDate))

      return (
        lastContactedDate > sixtyDaysAgo && lastContactedDate < thirtyDaysAgo
      )
    })

    if (businessesNotContacted.length > 0) {
      let emailBody =
        'Here is the list of businesses not contacted in the last 30 days:\n\n'
      businessesNotContacted.forEach((business) => {
        let formattedDate
        if (business.lastContactedDate) {
          formattedDate = new Date(
            business.lastContactedDate,
          ).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        } else {
          formattedDate = 'Not Contacted'
        }
        emailBody += `Company Name: ${business.company_name}, \n Contact: ${business.primary_contact}, \n Email: ${business.primary_contact_email},\n Status: ${business.businessStatus}, Last Contacted: ${formattedDate}\n`
      })

      const mailOptions = {
        from: process.env.VITE_EMAIL_USER, // sender address
        to: adminEmails.join(','), // list of receivers
        subject: 'Businesses not contacted in the last 30 days',
        text: emailBody,
      }

      try {
        await transporter.sendMail(mailOptions)
        console.log(`Email sent`)
      } catch (error) {
        console.error('Error sending email:', error)
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export default sendEmail30
