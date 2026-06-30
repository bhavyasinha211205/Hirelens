import mongoose from "mongoose";

const candidateAnalysisSchema = new mongoose.Schema({
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

  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },

  candidateName: {
    type: String,
    default: "",
  },

  email: {
    type: String,
    default: "",
  },

  phone: {
    type: String,
    default: "",
  },

  skills: [
    {
      type: String,
    },
  ],

  matchedSkills: [
    {
      type: String,
    },
  ],

  missingSkills: [
    {
      type: String,
    },
  ],

  experience: {
    type: Number,
    default: 0,
  },

  education: {
    type: String,
    default: "",
  },

  projects: [
    {
      type: String,
    },
  ],

  atsScore: {
    type: Number,
    default: 0,
  },

  summary: {
    type: String,
    default: "",
  },

  strengths: [
    {
      type: String,
    },
  ],

  weaknesses: [
    {
      type: String,
    },
  ],

  interviewQuestions: [
    {
      type: String,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("CandidateAnalysis", candidateAnalysisSchema);
