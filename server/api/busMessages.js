import express from 'express'
import mongoose from 'mongoose'
import BusMessage from '../models/businessMessageModel.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const messages = await BusMessage.find()
    res.json(messages)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const newMessage = new BusMessage(req.body)
    const savedMessage = await newMessage.save()
    res.status(201).json(savedMessage)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const message = await BusMessage.findByIdAndDelete(req.params.id)
    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }
    res.json({ message: 'Message deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
export default router
