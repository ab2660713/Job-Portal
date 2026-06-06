import express from "express";
import protect from "../middleware/authMiddleware.js";
import { uploadResume } from "../middleware/multer.js";
import {
  uploadMyResume,
  getMyResume,
  downloadMyResume,
  deleteMyResume,
} from "../controllers/resumeController.js";
// import uploadResume from "../middlewares/multer.js";
const router = express.Router();

router.post("/", protect, uploadResume.single("resume"), uploadMyResume);
router.get("/", protect, getMyResume);
router.get("/download", protect, downloadMyResume);
router.delete("/", protect, deleteMyResume);

export default router;
