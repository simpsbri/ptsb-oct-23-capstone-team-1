import cron from 'node-cron'
import sendEmailNotificationThirtyDays from './sendEmailThirtyDays.js'
import sendEmail60 from './sendEmailSixtyDays.js'
import sendEmail90 from './sendEmailNinetyDays.js'

// Schedule task to run every day at 7AM
cron.schedule('0 7 * * *', function () {
  console.log('Running sendEmailNotification at 07:00 AM every day')
  sendEmailNotificationThirtyDays()
  sendEmail60()
  sendEmail90()
})
