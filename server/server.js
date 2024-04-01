import express from 'express'
import { PORT } from './config/config.js'
import { connectDB } from './config/db.js'
import { setupMiddleware } from './config/middleware.js'
import businessRoutes from '../server/api/business.js'
import messagesRoutes from '../server/api/busMessages.js'
import userRouter from '../server/api/users.js'
import newBusinessRouter from '../server/api/register.js'
import projectRouter from '../server/api/projects.js'
import colors from 'colors'
import dotenv from 'dotenv'
dotenv.config()

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

app.use('/messages', messagesRoutes)
app.use('/api/user', userRouter)
app.use('/register', newBusinessRouter)
app.use('/projects', projectRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
