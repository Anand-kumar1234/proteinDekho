import mongoose from "mongoose";

// ==========================================
// FOOD ENTRY SCHEMA
// ==========================================
// 🆕 NEW:
// Ek meal ke andar jo food add hoga uski details.
// Nutrition values ko snapshot ke roop mein save
// karenge taaki future mein Food database change
// hone par purane logs change na ho.

const foodEntrySchema = new mongoose.Schema(
  {
    // Food collection ka reference
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },

    // 🆕 NEW:
    // Food ka naam bhi save kar rahe hain.
    // Isse daily log display karna easy hoga.
    foodName: {
      type: String,
      required: true,
      trim: true,
    },

    // 🆕 NEW:
    // User ne kitni quantity khayi.
    quantity: {
      type: Number,
      required: true,
      min: 0.1,
    },

    // 🆕 NEW:
    // Example: gram, serving, bowl etc.
    servingUnit: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================================
    // NUTRITION SNAPSHOT
    // ==========================================
    // 🆕 NEW:
    // Food add karte waqt uski nutrition values
    // yahan store hongi.

    calories: {
      type: Number,
      required: true,
      min: 0,
    },

    protein: {
      type: Number,
      required: true,
      min: 0,
    },

    carbs: {
      type: Number,
      required: true,
      min: 0,
    },

    fats: {
      type: Number,
      required: true,
      min: 0,
    },

    fiber: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    _id: true,
  }
);


// ==========================================
// DAILY LOG SCHEMA
// ==========================================
// 🆕 NEW:
// Har user ka har din ka ek nutrition log.

const dailyLogSchema = new mongoose.Schema(
  {
    // ==========================================
    // USER
    // ==========================================

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Signup",
      required: true,
      index: true,
    },

    // ==========================================
    // DATE
    // ==========================================
    // 🆕 NEW:
    // Kis date ka food log hai.
    // Example: 2026-09-28

    date: {
      type: String,
      required: true,
    },

    // ==========================================
    // MEALS
    // ==========================================

    breakfast: {
      type: [foodEntrySchema],
      default: [],
    },

    lunch: {
      type: [foodEntrySchema],
      default: [],
    },

    dinner: {
      type: [foodEntrySchema],
      default: [],
    },

    snacks: {
      type: [foodEntrySchema],
      default: [],
    },

    // ==========================================
    // DAILY TOTALS
    // ==========================================
    // 🆕 NEW:
    // Pure din ka total nutrition.
    // Har food add/remove hone par controller
    // in values ko update karega.

    totalCalories: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalProtein: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalCarbs: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalFats: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalFiber: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);


// ==========================================
// UNIQUE DAILY LOG
// ==========================================
// 🆕 NEW:
// Ek user ke liye ek date par sirf ek DailyLog.
// Example:
// user A + 2026-09-28 = one document

dailyLogSchema.index(
  {
    userId: 1,
    date: 1,
  },
  {
    unique: true,
  }
);


// ==========================================
// MODEL
// ==========================================
// 🆕 NEW:

const DailyLog = mongoose.model(
  "DailyLog",
  dailyLogSchema
);

export default DailyLog;