import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/job.js";
import resumeRoutes from "./routes/resumes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);
app.use("/api/resumes", resumeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
