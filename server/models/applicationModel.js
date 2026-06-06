import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

   

   expectedSalary: {
  type: String,
  required: true,
},
coverLetter: {
  type: String,
  required: true,
},
availableFrom: {
  type: Date,
  required: true,
},


    resume: {
      type: String, // resume file URL / filename
    },

    status: {
      type: String,
      enum: ["Under Review", "Shortlisted", "Interviewed", "Rejected"],
      default: "Under Review",
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
