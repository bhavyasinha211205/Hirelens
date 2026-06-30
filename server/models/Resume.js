import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },

  fileName: {
    type: String,
    required: true,
  },

  filePath: {
    type: String,
    required: true,
  },

  extractedText: {
    type: String,
    default: "",
  },

  // Gemini parsed resume
  parsedResume: {
    type: Object,
    default: {},
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Resume", resumeSchema);
