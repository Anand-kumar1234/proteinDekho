import express from "express";

import {
  saveNutritionProfile,
  getNutritionProfile,
} from "../controllers/nutritionProfileController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 Login required
router.post(
  "/profile",
  authMiddleware,
  saveNutritionProfile
);

// 🔐 Login required
router.get(
  "/profile",
  authMiddleware,
  getNutritionProfile
);

export default router;