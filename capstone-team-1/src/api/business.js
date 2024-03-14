const express = require('express')
const mongoose = require('mongoose')
const BusinessModel = require('./models/businessModel')

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:5173/business', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Create an instance of Express
const app = express()

// Define a route to load all business data
app.get('/business', async (req, res) => {
  const businessData = await BusinessModel.find()

  // Send the business data as a response
  res.json(businessData)
})
