const express = require('express');
const dotenv = require('dotenv');
const PORT = 4000;
const app = express();
const connectDB = require('./config/db');
const colors = require('colors');

dotenv.config();
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
