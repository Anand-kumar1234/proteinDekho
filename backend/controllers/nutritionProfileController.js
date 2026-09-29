import NutritionProfile from "../models/NutritionProfile.js";

import {
  calculateNutritionTargets,
} from "../utils/nutritionCalculator.js";

// ==========================================
// CREATE / UPDATE NUTRITION PROFILE
// ==========================================

export const saveNutritionProfile = async (req, res) => {
  try {
    // Logged-in user authMiddleware se milega
    const userId = req.user._id;

    const {
      age,
      sex,
      weight,
      height,
      activityLevel,
      goal,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (
      age === undefined ||
      !sex ||
      weight === undefined ||
      height === undefined ||
      !activityLevel ||
      !goal
    ) {
      return res.status(400).json({
        success: false,
        message: "All nutrition profile fields are required",
      });
    }

    // ==========================================
    // NUMBER CONVERSION
    // ==========================================

    const numericAge = Number(age);
    const numericWeight = Number(weight);
    const numericHeight = Number(height);

    // ==========================================
    // BASIC VALIDATION
    // ==========================================

    if (
      !Number.isFinite(numericAge) ||
      numericAge < 13 ||
      numericAge > 120
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid age",
      });
    }

    if (
      !Number.isFinite(numericWeight) ||
      numericWeight < 20 ||
      numericWeight > 500
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid weight",
      });
    }

    if (
      !Number.isFinite(numericHeight) ||
      numericHeight < 100 ||
      numericHeight > 250
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid height",
      });
    }

    // ==========================================
    // CALCULATE TARGETS
    // ==========================================

    const targets = calculateNutritionTargets({
      sex,
      age: numericAge,
      weight: numericWeight,
      height: numericHeight,
      activityLevel,
      goal,
    });

    // ==========================================
    // CREATE OR UPDATE PROFILE
    // ==========================================

    const profile = await NutritionProfile.findOneAndUpdate(
      { userId },

      {
        userId,
        age: numericAge,
        sex,
        weight: numericWeight,
        height: numericHeight,
        activityLevel,
        goal,

        bmr: targets.bmr,
        dailyCalories: targets.dailyCalories,
        proteinTarget: targets.proteinTarget,
      },

      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
  success: true,
  message: "Nutrition profile saved successfully",

  user: {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    phone: req.user.phone,
    age: req.user.age,
  },

  profile,
});
  } catch (error) {
    console.error(
      "Save nutrition profile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ==========================================
// GET NUTRITION PROFILE
// ==========================================

export const getNutritionProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const profile = await NutritionProfile.findOne({
      userId,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Nutrition profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      profile,
    });

  } catch (error) {
    console.error(
      "Get nutrition profile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};