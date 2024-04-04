import express from 'express'
import mongoose from 'mongoose'
import Business from '../models/businessModel.js'
import getAdminEmails from '../emailSend/adminEmails.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
const router = express.Router()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.VITE_EMAIL_USER,
    pass: process.env.VITE_EMAIL_PASSWORD,
  },
})

router.post('/', async (req, res) => {
  const newBusiness = new Business({
    company_name: req.body.company_name,
    Phone: req.body.phone,
    initialProject: req.body.initialProject,
    primary_contact: req.body.primary_contact,
    primary_contact_email: req.body.primary_contact_email,
    businessStatus: 'new',
    lastContactedDate: undefined,
  })
  try {
    const savedBusiness = await newBusiness.save()
    const adminEmails = await getAdminEmails()
    let info = await transporter.sendMail({
      from: process.env.VITE_EMAIL_USER, // sender address
      to: adminEmails.join(','), // list of receivers
      subject: 'New Business Created', // Subject line
      text: `A new business has been created: ${newBusiness.company_name}\n\nPrimary Contact: ${newBusiness.primary_contact}\nPrimary Contact Email: ${newBusiness.primary_contact_email}\n\n\nOverview: ${newBusiness.Overview}`,
    })
    res.status(201).json(savedBusiness)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

export default router
