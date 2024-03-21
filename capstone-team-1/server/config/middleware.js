import express from 'express'
import cors from 'cors'

export const setupMiddleware = (app) => {
  app.use(cors())
  app.use(express.json())
}
