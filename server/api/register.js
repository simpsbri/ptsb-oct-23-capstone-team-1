import express from 'express'
import mongoose from 'mongoose'
import Business from '../models/businessModel.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
const router = express.Router()

let transporter = nodemailer.createTransport({
  service: 'gmail', // use 'gmail' as service
  auth: {
    user: 'simpsbri@gmail.com',
    pass: 'jcei kwdi xdcp nclv',
  },
})

router.post('/', async (req, res) => {
  const newBusiness = new Business({
    company_name: req.body.company_name,
    Phone: req.body.phone,
    initialProject: req.body.initialProject,
    primary_contact: req.body.primary_contact,
    primary_contact_email: req.body.primary_contact_email,
  })
  try {
    const savedBusiness = await newBusiness.save()
    let info = await transporter.sendMail({
      from: '"Brian Simpson" <simpsbri@gmail.com>', // sender address
      to: 'brian@webkidss.org', // list of receivers
      subject: 'New Business Created', // Subject line
      text: `A new business has been created: ${newBusiness.company_name}\n\nPrimary Contact: ${newBusiness.primary_contact}\nPrimary Contact Email: ${newBusiness.primary_contact_email}\n\n\nInitialProject: ${newBusiness.initialProject}`,
    })

    res.status(201).json(savedBusiness)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

export default router
