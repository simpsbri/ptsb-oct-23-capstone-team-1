import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: import.meta.process.env.EMAIL_USER,
    pass: import.meta.process.env.EMAIL_PASSWORD,
  },
});

const sendEmailNotification = async (projectData, recipient) => {
  const mailOptions = {
    from: import.meta.process.env.EMAIL_USER,
    to: recipient,
    subject: "New Project Submission",
    text: `A new project has been submitted: ${projectData.name}`,
    // Include more details as necessary
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${recipient}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmailNotification;