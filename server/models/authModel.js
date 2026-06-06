import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["jobseeker", "employer", "admin"],
      default: "jobseeker"
    },

    phone: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    title: {
      type: String
    },
    experience: {
      type: String,
    },
    skills: {
      type: [String],
      default: [],
    },
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    resume: {
      filename: String,
      originalName: String,
      size: String,
      contentType: String,
      data: Buffer,
      uploadedAt: Date,
    },
    companyName: {
      type: String
    },
    industry: {
      type: String,
    },
    companySize: {
      type: String,
    },
    website: {
      type: String,
    },
    description: {
      type: String,
    },
    postedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
