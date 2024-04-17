// import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.VITE_EMAIL_USER,
    pass: process.env.VITE_EMAIL_PASSWORD,
  },
})

function newUserEmail(email, password) {
  let mailOptions = {
    from: process.env.VITE_EMAIL_USER,
    to: email,
    subject: 'Welcome to Our Platform',
    text: `Welcome to our platform. We are glad to have you. Your new password is: ${password}`,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
  })
}

export default newUserEmail
