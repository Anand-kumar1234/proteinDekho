import DailyLog from "../models/DailyLog.js";
import Food from "../models/Food.js";

// ==========================================
// ADD FOOD TO DAILY LOG
// ==========================================

export const addFoodToDailyLog = async (req, res) => {
  try {
    // 🆕 NEW:
    // Logged-in user authMiddleware se milega.
    const userId = req.user._id;

    const {
      foodId,
      meal,
      quantity,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!foodId || !meal || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Food, meal and quantity are required",
      });
    }

    // 🆕 NEW:
    // Sirf allowed meals accept karenge.
    const allowedMeals = [
      "breakfast",
      "lunch",
      "dinner",
      "snacks",
    ];

    if (!allowedMeals.includes(meal)) {
      return res.status(400).json({
        success: false,
        message: "Invalid meal type",
      });
    }

    const numericQuantity = Number(quantity);

    if (
      !Number.isFinite(numericQuantity) ||
      numericQuantity <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity",
      });
    }

    // ==========================================
    // FIND FOOD
    // ==========================================

    // 🆕 NEW:
    // Food database se original nutrition data lenge.
    const food = await Food.findById(foodId);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    // ==========================================
    // CALCULATE NUTRITION
    // ==========================================

    // 🆕 NEW:
    // Yahan hum assume kar rahe hain ki Food ka
    // nutrition data standardServingSize ke according hai.
    //
    // Example:
    // 100g Paneer = 265 kcal
    //
    // User ne 200g khaya:
    // 265 × 200 / 100 = 530 kcal

    const servingSize = Number(
      food.standardServingSize
    );

    if (
      !Number.isFinite(servingSize) ||
      servingSize <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid food serving size",
      });
    }

    const multiplier =
      numericQuantity / servingSize;

    const calories =
      Number(food.macros?.calories || 0) * multiplier;

    const protein =
      Number(food.macros?.protein || 0) * multiplier;

    const carbs =
      Number(food.macros?.carbs || 0) * multiplier;

    const fats =
      Number(food.macros?.fats || 0) * multiplier;

    const fiber =
      Number(food.macros?.fiber || 0) * multiplier;

    // ==========================================
    // GET TODAY'S DATE
    // ==========================================

    // 🆕 NEW:
    // Abhi simple YYYY-MM-DD format use kar rahe hain.
    const date = new Date()
      .toISOString()
      .split("T")[0];

    // ==========================================
    // FIND / CREATE DAILY LOG
    // ==========================================

    // 🆕 NEW:
    // Same user + same date ka existing log milega.
    // Nahi mila to naya create hoga.

    let dailyLog = await DailyLog.findOne({
      userId,
      date,
    });

    if (!dailyLog) {
      dailyLog = new DailyLog({
        userId,
        date,
      });
    }

    // ==========================================
    // FOOD ENTRY
    // ==========================================

    // 🆕 NEW:
    // Food ka nutrition snapshot save kar rahe hain.

    const foodEntry = {
      foodId: food._id,
      foodName: food.name,
      quantity: numericQuantity,
      servingUnit: food.servingUnit || "g",

      calories,
      protein,
      carbs,
      fats,
      fiber,
    };

    // ==========================================
    // ADD FOOD TO MEAL
    // ==========================================

    // 🆕 NEW:
    // Dynamic meal ke andar food push karenge.

    dailyLog[meal].push(foodEntry);

    // ==========================================
    // UPDATE DAILY TOTALS
    // ==========================================

    // 🆕 NEW:
    // Daily total nutrition update.

    dailyLog.totalCalories += calories;
    dailyLog.totalProtein += protein;
    dailyLog.totalCarbs += carbs;
    dailyLog.totalFats += fats;
    dailyLog.totalFiber += fiber;

    // ==========================================
    // SAVE
    // ==========================================

    await dailyLog.save();

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Food added successfully",
      dailyLog,
    });

  } catch (error) {
    console.error(
      "Add food to daily log error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ==========================================
// GET TODAY'S DAILY LOG
// ==========================================

export const getTodayLog = async (req, res) => {
  try {
    // 🆕 NEW:
    // Logged-in user.
    const userId = req.user._id;

    // 🆕 NEW:
    // Today's date.
    const date = new Date()
      .toISOString()
      .split("T")[0];

    const dailyLog = await DailyLog.findOne({
      userId,
      date,
    });

    // 🆕 NEW:
    // Agar user ne aaj kuch add nahi kiya.
    if (!dailyLog) {
      return res.status(200).json({
        success: true,
        message: "No food logged today",
        dailyLog: null,
      });
    }

    return res.status(200).json({
      success: true,
      dailyLog,
    });

  } catch (error) {
    console.error(
      "Get daily log error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ==========================================
// REMOVE FOOD FROM DAILY LOG
// ==========================================

export const removeFoodFromDailyLog = async (
  req,
  res
) => {
  try {
    // 🆕 NEW:
    const userId = req.user._id;

    const { meal, foodEntryId } = req.body;

    if (!meal || !foodEntryId) {
      return res.status(400).json({
        success: false,
        message: "Meal and food entry ID are required",
      });
    }

    const allowedMeals = [
      "breakfast",
      "lunch",
      "dinner",
      "snacks",
    ];

    if (!allowedMeals.includes(meal)) {
      return res.status(400).json({
        success: false,
        message: "Invalid meal type",
      });
    }

    // 🆕 NEW:
    const date = new Date()
      .toISOString()
      .split("T")[0];

    const dailyLog = await DailyLog.findOne({
      userId,
      date,
    });

    if (!dailyLog) {
      return res.status(404).json({
        success: false,
        message: "Daily log not found",
      });
    }

    // 🆕 NEW:
    // Remove karne se pehle entry find karenge.
    const mealItems = dailyLog[meal];

    const foodIndex = mealItems.findIndex(
      (item) =>
        item._id.toString() === foodEntryId
    );

    if (foodIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Food entry not found",
      });
    }

    // 🆕 NEW:
    // Removed food ki nutrition values nikalenge.
    const removedFood =
      mealItems[foodIndex];

    // 🆕 NEW:
    // Daily totals se nutrition minus karenge.
    dailyLog.totalCalories -=
      removedFood.calories;

    dailyLog.totalProtein -=
      removedFood.protein;

    dailyLog.totalCarbs -=
      removedFood.carbs;

    dailyLog.totalFats -=
      removedFood.fats;

    dailyLog.totalFiber -=
      removedFood.fiber;

    // 🆕 NEW:
    // Meal se food remove.
    mealItems.splice(foodIndex, 1);

    // 🆕 NEW:
    // Floating point issues se bachne ke liye
    // totals ko minimum 0 rakhenge.
    dailyLog.totalCalories =
      Math.max(0, dailyLog.totalCalories);

    dailyLog.totalProtein =
      Math.max(0, dailyLog.totalProtein);

    dailyLog.totalCarbs =
      Math.max(0, dailyLog.totalCarbs);

    dailyLog.totalFats =
      Math.max(0, dailyLog.totalFats);

    dailyLog.totalFiber =
      Math.max(0, dailyLog.totalFiber);

    await dailyLog.save();

    return res.status(200).json({
      success: true,
      message: "Food removed successfully",
      dailyLog,
    });

  } catch (error) {
    console.error(
      "Remove food error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};