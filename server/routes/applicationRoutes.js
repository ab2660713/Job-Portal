import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  applyForJob,
  downloadApplicationResume,
  getApplicantsByJob,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

import { getMyApplications } from "../controllers/applicationController.js";
const router = express.Router();

/**
 * Jobseeker applies
 */
router.post("/:jobId", protect, applyForJob);


/**
 * Jobseeker dashboard
 */
router.get("/my", protect, getMyApplications);

/**
 * Employer views applicants for job
 */
router.get("/job/:jobId", protect, getApplicantsByJob);

router.get("/:id/resume/download", protect, downloadApplicationResume);

/**
 * Shortlist / Reject
 */
router.patch("/:id/status", protect, updateApplicationStatus);

export default router;
