import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  getMyJobs,
  toggleJobStatus,
  updateJob,
} from "../controllers/jobController.js";
import protect from "../middleware/authMiddleware.js";
import {
  getFeaturedJobs,
  searchJobs,
  getJobCategories,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/", protect, createJob);
router.get("/", getAllJobs);
router.get("/my", protect, getMyJobs);
router.get("/featured", getFeaturedJobs);
router.get("/search", searchJobs);
router.get("/categories", getJobCategories);
router.put("/:id", protect, updateJob);
router.patch("/:id/status", protect, toggleJobStatus);
router.delete("/:id", protect, deleteJob);
router.get("/:id", getJobById);

export default router;
