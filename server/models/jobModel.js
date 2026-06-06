import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    requirements: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    views: {
      type: Number,
      default: 0,
    },

    responsibilities: {
      type: [String],
      required: true,
    },

    benefits: {
      type: [String],
      default: [],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

/* 🔥 overwrite error safe */
const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default Job;
