import express from 'express'
import mongoose from 'mongoose'
import User from '../models/userModel.js'

const router = express.Router()

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get a single user by ID
router.get('/:_id', async (req, res) => {
  try {
    const user = await User.findById(req.params._id)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
    } else {
      res.json(user)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// PUT update user by ID
router.put('/:_id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params._id, req.body)
    res.json(updatedUser)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.put('/create', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
      role: req.body.role,
      status: req.body.status,
      bio: req.body.bio,
      businessId: req.body.businessId,
    })
    res.status(201).json(newUser)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

export default router
