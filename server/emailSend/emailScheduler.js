import cron from 'node-cron'
import sendEmail30 from './sendEmailThirtyDays.js'
import sendEmail60 from './sendEmailSixtyDays.js'
import sendEmail90 from './sendEmailNinetyDays.js'
import dotenv from 'dotenv'

dotenv.config()

// Schedule task to run every day at 7AM
try {
  cron.schedule('0 7 * * *', function () {
    console.log('Running sendEmailNotification at 07:00 AM every day')
    sendEmail30()
    sendEmail60()
    sendEmail90()
  })
} catch (error) {
  console.error('An error occurred:', error)
}
