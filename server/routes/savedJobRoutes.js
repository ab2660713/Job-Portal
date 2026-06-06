import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  toggleSaveJob,
  getSavedJobs,
  getSavedJobIds,
} from "../controllers/savedJobController.js";

const router = express.Router();

router.post("/:jobId", protect, toggleSaveJob);
router.get("/", protect, getSavedJobs);
router.get("/ids", protect, getSavedJobIds);

export default router;
