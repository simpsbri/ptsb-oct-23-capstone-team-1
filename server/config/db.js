import mongoose from 'mongoose'
import { MONGO_URI } from './config.js'

export const connectDB = () => {
  mongoose
    .connect(MONGO_URI, {})
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err))
}
