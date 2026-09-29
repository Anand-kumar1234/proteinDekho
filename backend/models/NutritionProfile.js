import mongoose from "mongoose";

const nutritionProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Signup",
      required: true,
      unique: true,
      index: true,
    },

    age: {
      type: Number,
      required: true,
      min: 13,
      max: 120,
    },

    sex: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    weight: {
      type: Number,
      required: true,
      min: 20,
      max: 500,
    },

    height: {
      type: Number,
      required: true,
      min: 100,
      max: 250,
    },

    activityLevel: {
      type: String,
      enum: [
        "sedentary",
        "light",
        "moderate",
        "very_active",
        "extra_active",
      ],
      required: true,
    },

    goal: {
      type: String,
      enum: [
        "weight_loss",
        "maintenance",
        "muscle_gain",
      ],
      required: true,
    },

    bmr: {
      type: Number,
      required: true,
    },

    dailyCalories: {
      type: Number,
      required: true,
    },

    proteinTarget: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NutritionProfile = mongoose.model(
  "NutritionProfile",
  nutritionProfileSchema
);

export default NutritionProfile;