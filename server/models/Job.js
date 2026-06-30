import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title:{
    type:String,
    required:true,
  },

  description: {
    type: String,
    required: true,
  },
  parsedJD: {
    type: Object,
    default: {},
  },
  status: {
    type: String,
    enum: ["active", "paused", "closed"],
    default: "active",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Job", jobSchema);
