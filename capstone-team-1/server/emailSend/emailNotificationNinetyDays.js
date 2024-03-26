import nodemailer from 'nodemailer'
import { subDays, startOfDay } from 'date-fns'
import cron from 'node-cron'
import axios from 'axios'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'simpsbri@gmail.com',
    pass: 'jcei kwdi xdcp nclv',
  },
})

const sendEmailNotificationNinetyDays = async () => {
  try {
    const response = await axios.get('http://localhost:4000/businesses')
    const businesses = response.data

    const today = startOfDay(new Date())
    const ninetyDaysAgo = subDays(today, 90)

    let businessesNotContacted = businesses.filter((business) => {
      if (business.lastContactedDate === null) {
        return true
      }
      const lastContactedDate = startOfDay(new Date(business.lastContactedDate))
      return lastContactedDate < ninetyDaysAgo
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
        emailBody += `Company Name: ${business.company_name}, \n Contact: ${business.primary_contact}, Email: ${business.primary_contact_email}, Last Contacted: ${formattedDate}\n`
      })

      const mailOptions = {
        from: 'simpsbri@gmail.com',
        to: 'brian@webkidss.org',
        subject: 'Businesses not contacted in the last 90 days',
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

export default sendEmailNotificationNinetyDays
