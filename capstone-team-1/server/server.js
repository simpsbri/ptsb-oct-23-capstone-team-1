import express from "express";
import dotenv from "dotenv";
const PORT = 4000;
const app = express();
import connectDB from "./config/db.js";
import colors from "colors";
import userRoutes from "./api/users.js";

dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});