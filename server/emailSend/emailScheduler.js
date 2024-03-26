import cron from 'node-cron'
import sendEmailNotificationThirtyDays from './sendEmailThirtyDays.js'
import sendEmail60 from './sendEmailSixtyDays.js'
import sendEmail90 from './sendEmailNinetyDays.js'
import dotenv from 'dotenv'

dotenv.config()
console.log(process.env.REACT_APP_EMAIL_USER)

// Schedule task to run every day at 7AM
cron.schedule('28 9 * * *', function () {
  console.log('Running sendEmailNotification at 07:00 AM every day')
  sendEmailNotificationThirtyDays()
  sendEmail60()
  sendEmail90()
})
