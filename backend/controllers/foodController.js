import Food from "../models/Food.js";

export const foodData = async (req, res) => {
  try {
    const food = await Food.find();

    res.status(200).json({
      success: true,
      data: food,
      message: "food data fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};