import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import sendEmailNotification from "./sendEmailNotification";
import validateProjectData from "./middleware/ValidateInputMiddleware";

const app = express();
app.use(bodyParser.json());

app.post("/submitProject", validateProjectData, async (req, res) => {
  const { projectData, recipient } = req.body;
  try {
    await sendEmailNotification(projectData, recipient);
    res.json({ message: "Project submitted and email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending email" });
  }
});

const PORT = import.meta.process.env.PORT || 5127;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
