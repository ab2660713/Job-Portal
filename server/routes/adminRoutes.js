import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getAdminStats,
  getAllUsers,
  deleteUser,
  getAllJobsAdmin,
  toggleJobStatusAdmin,
  deleteJobAdmin,
  toggleUserStatus,
  changeUserRole,
} from "../controllers/adminController.js";
import adminProtect from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/stats", protect, adminProtect, getAdminStats);

router.get("/users", protect, adminProtect, getAllUsers);
router.delete("/user/:id", protect, adminProtect, deleteUser);
router.put("/user/status/:id",protect, adminProtect, toggleUserStatus);
router.put("/user/role/:id",protect, adminProtect, changeUserRole);
router.get("/jobs", protect, adminProtect, getAllJobsAdmin);


router.patch("/jobs/:id/status", protect, adminProtect, toggleJobStatusAdmin);
router.delete("/jobs/:id", protect, adminProtect, deleteJobAdmin);

export default router;
