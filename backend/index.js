import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import foodRoutes from "./routes/foodRoutes.js";
import signupRoutes from "./routes/signupRoutes.js";
import nutritionProfileRoutes from "./routes/nutritionProfileRoutes.js";
import dailyLogRoutes from "./routes/dailyLogRoutes.js";

dotenv.config();

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// ==========================================
// DATABASE
// ==========================================

connectDB();

// ==========================================
// ROUTES
// ==========================================

app.use("/api", signupRoutes);

app.use("/api", foodRoutes);

app.use(
  "/api/nutrition",
  nutritionProfileRoutes
);

app.use(
  "/api/daily-log",
  dailyLogRoutes
);

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ProteinDekho API is running 🚀",
  });
});

// ==========================================
// VERCEL
// ==========================================

export default app;