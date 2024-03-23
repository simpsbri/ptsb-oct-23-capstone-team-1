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
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(updatedUser)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

export default router
