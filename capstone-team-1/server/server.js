import express from 'express';
import dotenv from 'dotenv';
// const PORT = 4000;
const app = express();
import connectDB from './config/db.js';
import colors from 'colors';

dotenv.config();
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
