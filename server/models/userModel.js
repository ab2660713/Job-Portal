import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["jobseeker", "employer", "admin"],
      default: "jobseeker",
    },

    phone: String,
    location: String,

    /* ===== JOB SEEKER ===== */
    title: String,
    experience: String,
    skills: { type: [String], default: [] },
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    resume: {
  filename: String,
  originalName: String,
  size: String,
  contentType: String,
  data: Buffer,
  uploadedAt: Date,

},



    /* ===== EMPLOYER ===== */
    companyName: String,
    industry: String,
    companySize: String,
    website: String,
    description: String,

    postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
  { timestamps: true }
);

/* 🔥 overwrite error fix */
const Users = mongoose.models.Users || mongoose.model("Users", userSchema);
export default Users;
