import cron from 'node-cron'
import sendEmail30 from './sendEmailThirtyDays.js'
import sendEmail60 from './sendEmailSixtyDays.js'
import sendEmail90 from './sendEmailNinetyDays.js'
import dotenv from 'dotenv'

dotenv.config()

// Schedule task to run every day at 7AM
cron.schedule('34 17 * * *', function () {
  console.log('Running sendEmailNotification at 07:00 AM every day')
  sendEmail30()
  sendEmail60()
  sendEmail90()
})
