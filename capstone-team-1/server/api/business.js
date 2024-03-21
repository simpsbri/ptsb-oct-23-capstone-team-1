import express from 'express'
import mongoose from 'mongoose'
import Business from '../models/businessModel.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const businesses = await Business.find()
    res.json(businesses)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
router.get('/:_id', async (req, res) => {
  try {
    const business = await Business.findById(req.params._id)
    if (business == null) {
      return res.status(404).json({ message: 'Cannot find business' })
    }
    res.json(business)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const newBusiness = new Business({
    company_name: req.body.company_name,
    id: req.body.id,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    Zip: req.body.Zip,
    Phone: req.body.phone,
    Overview: req.body.Overview,
    Projects: req.body.Projects,
    businessUsers: req.body.businessUsers,
    primary_contact: req.body.primary_contact,
    primary_contact_email: req.body.primary_contact_email,
  })

  try {
    const savedBusiness = await newBusiness.save()
    res.status(201).json(savedBusiness)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
router.put('/:id', getBusiness, async (req, res) => {
  if (req.body.company_name != null) {
    ;(res.business.company_name = req.body.company_name),
      (res.business.street = req.body.street),
      (res.business.city = req.body.city),
      (res.business.state = req.body.state),
      (res.business.Zip = req.body.zip),
      (res.business.Phone = req.body.phone),
      (res.business.Overview = req.body.overview),
      (res.business.Projects = req.body.projects),
      (res.business.businessUsers = req.body.businessUsers),
      (res.business.primary_contact = req.body.primary_contact),
      (res.business.primary_contact_email = req.body.primary_contact_email)
  }

  try {
    const updatedBusiness = await res.business.save()
    res.json(updatedBusiness)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Middleware to find a business by ID
async function getBusiness(req, res, next) {
  let business
  try {
    business = await Business.findById(req.params.id)
    if (business == null) {
      return res.status(404).json({ message: 'Cannot find business' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.business = business
  next()
}

export default router
