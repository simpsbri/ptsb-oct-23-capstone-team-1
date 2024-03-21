import express from 'express'
import { PORT } from './config/config.js'
import { connectDB } from './config/db.js'
import { setupMiddleware } from './config/middleware.js'
import businessRoutes from '../server/api/business.js'
import colors from 'colors'

import cors from 'cors'
const app = express()

setupMiddleware(app)

connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use('/businesses', businessRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
