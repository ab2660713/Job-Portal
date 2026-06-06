import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/userController.js";

import {
    getEmployerProfile,
    updateEmployerProfile,
  } from "../controllers/userController.js";
const router = express.Router();
  
  router.get("/employer/profile", protect, getEmployerProfile);
  router.put("/employer/profile", protect, updateEmployerProfile);
  
router.get("/profile", protect, getMyProfile);
router.put("/profile", protect, updateMyProfile);

export default router;
