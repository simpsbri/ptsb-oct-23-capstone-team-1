import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const PORT = 4000;
const app = express();
import connectDB from "./config/db.js";
import userRouter from "./api/users.js";

dotenv.config();
connectDB();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
