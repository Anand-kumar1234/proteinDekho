import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  addFoodToDailyLog,
  getTodayLog,
  removeFoodFromDailyLog,
} from "../controllers/dailyLogcontroller.js";

const router = express.Router();

// ==========================================
// ADD FOOD
// ==========================================
// 🆕 NEW:
// Login required hai, isliye authMiddleware
// pehle chalega.

router.post(
  "/add",
  authMiddleware,
  addFoodToDailyLog
);


// ==========================================
// GET TODAY'S LOG
// ==========================================
// 🆕 NEW:

router.get(
  "/today",
  authMiddleware,
  getTodayLog
);


// ==========================================
// REMOVE FOOD
// ==========================================
// 🆕 NEW:

router.delete(
  "/remove",
  authMiddleware,
  removeFoodFromDailyLog
);

export default router;