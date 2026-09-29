import apiClient from "../../services/apiClient";

// ==========================================
// GET TODAY'S DAILY LOG
// ==========================================

export const getTodayLog = async () => {
  return await apiClient("/api/daily-log/today");
};


// ==========================================
// ADD FOOD
// ==========================================

export const addFoodToDailyLog = async (foodId, meal, quantity) => {
  return await apiClient("/api/daily-log/add", {
    method: "POST",

    body: JSON.stringify({
      foodId,
      meal,
      quantity,
    }),
  });
};


// ==========================================
// REMOVE FOOD
// ==========================================

export const removeFoodFromDailyLog = async (
  meal,
  foodEntryId
) => {
  return await apiClient("/api/daily-log/remove", {
    method: "DELETE",

    body: JSON.stringify({
      meal,
      foodEntryId,
    }),
  });
};