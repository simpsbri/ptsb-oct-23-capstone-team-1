import cron from 'node-cron'
import sendEmailNotificationThirtyDays from './emailNotificationThirtyDays'
import sendEmailNotificationSixtyDays from './emailNotificationSixtyDays'
import sendEmailNotificationNinetyDays from './emailNotificationNinetyDays'

// Schedule task to run every day at 7AM
cron.schedule('0 7 * * *', function () {
  console.log('Running sendEmailNotification at 07:00 AM every day')
  sendEmailNotificationThirtyDays()
  sendEmailNotificationSixtyDays()
  sendEmailNotificationNinetyDays()
})
