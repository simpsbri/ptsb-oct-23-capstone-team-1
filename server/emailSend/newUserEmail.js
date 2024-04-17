import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
  service: 'gmail', // replace with your email service
  auth: {
    user: process.env.VITE_EMAIL_USER,
    pass: process.env.VITE_EMAIL_PASSWORD,
  },
})

function newUserEmail(email, password) {
  // setup email data with unicode symbols
  let mailOptions = {
    from: process.env.VITE_EMAIL_USER, // sender address
    to: email, // list of receivers
    subject: 'Welcome to Our Platform', // Subject line
    text: `Welcome to our platform. We are glad to have you. Your new password is: ${password}`,
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
  })
}

export default newUserEmail
