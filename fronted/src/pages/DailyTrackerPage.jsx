import { useEffect, useState } from "react";

import {
  getTodayLog,
  addFoodToDailyLog,
  removeFoodFromDailyLog,
} from "../features/tracker/trackerService";

import apiClient from "../services/apiClient";

function DailyTrackerPage() {
  const [dailyLog, setDailyLog] = useState(null);
  const [foods, setFoods] = useState([]);

  const [selectedFood, setSelectedFood] = useState("");
  const [meal, setMeal] = useState("breakfast");
  const [quantity, setQuantity] = useState(100);

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // ==========================================
  // GET TODAY'S LOG
  // ==========================================

  const fetchDailyLog = async () => {
    try {
      const data = await getTodayLog();

      setDailyLog(data.dailyLog || data.log || null);
    } catch (error) {
      console.error("Daily log error:", error);
    }
  };

  // ==========================================
  // GET FOODS
  // ==========================================

  const fetchFoods = async () => {
    try {
      const data = await apiClient("/api/food");

      setFoods(data.foods || data.data || []);
    } catch (error) {
      console.error("Food fetch error:", error);
      setFoods([]);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([
        fetchDailyLog(),
        fetchFoods(),
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  // ==========================================
  // ADD FOOD
  // ==========================================

  const handleAddFood = async (e) => {
    e.preventDefault();

    if (!selectedFood) {
      alert("Please select a food");
      return;
    }

    if (!quantity || Number(quantity) <= 0) {
      alert("Please enter valid quantity");
      return;
    }

    try {
      setAdding(true);

      await addFoodToDailyLog(
        selectedFood,
        meal,
        Number(quantity)
      );

      setSelectedFood("");
      setQuantity(100);

      await fetchDailyLog();

    } catch (error) {
      console.error("Add food error:", error);
      alert(error.message || "Failed to add food");
    } finally {
      setAdding(false);
    }
  };

  // ==========================================
  // REMOVE FOOD
  // ==========================================

  const handleRemoveFood = async (
    mealName,
    foodEntryId
  ) => {
    try {
      await removeFoodFromDailyLog(
        mealName,
        foodEntryId
      );

      await fetchDailyLog();

    } catch (error) {
      console.error("Remove food error:", error);
      alert(error.message || "Failed to remove food");
    }
  };

  // ==========================================
  // MEAL DATA
  // ==========================================

  const getMealItems = (mealName) => {
    if (!dailyLog) return [];

    return dailyLog[mealName] || [];
  };

  // ==========================================
  // MEAL SECTION
  // ==========================================

  const MealSection = ({
    title,
    mealName,
    icon,
  }) => {
    const items = getMealItems(mealName);

    return (
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:shadow-lg">

        {/* Meal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-xl">
              {icon}
            </div>

            <div>
              <h2 className="font-bold text-gray-900">
                {title}
              </h2>

              <p className="text-xs text-gray-400">
                {items.length} food
                {items.length !== 1 ? "s" : ""}
              </p>
            </div>

          </div>

        </div>

        {/* Food Items */}
        <div className="p-5">

          {items.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-gray-200 py-8 text-center">

              <div className="text-3xl">
                🍽️
              </div>

              <p className="mt-2 text-sm font-medium text-gray-500">
                No food added yet
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Add your {title.toLowerCase()} food above
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {items.map((item) => (

                <div
                  key={item._id}
                  className="group flex items-center justify-between rounded-2xl bg-gray-50 p-4 transition hover:bg-green-50"
                >

                  <div className="min-w-0">

                    <p className="truncate font-semibold text-gray-900">
                      {item.foodName || item.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {item.quantity}{" "}
                      {item.servingUnit || "g"}
                    </p>

                    <div className="mt-2 flex gap-3 text-xs">

                      <span className="font-medium text-orange-600">
                        {Number(item.calories || 0).toFixed(0)} kcal
                      </span>

                      <span className="font-medium text-green-600">
                        {Number(item.protein || 0).toFixed(1)}g protein
                      </span>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveFood(
                        mealName,
                        item._id
                      )
                    }
                    className="ml-3 rounded-xl px-3 py-2 text-xs font-semibold text-red-500 opacity-70 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">

        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

          <p className="mt-4 font-medium text-gray-600">
            Loading your nutrition tracker...
          </p>

        </div>

      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/60 via-gray-50 to-white px-4 py-8">

      <div className="mx-auto max-w-7xl">

        {/* =====================================
            HERO
        ===================================== */}

        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-white shadow-xl md:p-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <div className="mb-3 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                🥗 DAILY NUTRITION
              </div>

              <h1 className="text-3xl font-extrabold md:text-4xl">
                Daily Nutrition Tracker
              </h1>

              <p className="mt-2 max-w-xl text-sm text-green-50 md:text-base">
                Track your meals, calories and protein intake
                throughout the day.
              </p>

            </div>

            <div className="rounded-2xl bg-white/15 px-6 py-4 text-center backdrop-blur">

              <p className="text-xs font-medium text-green-50">
                TODAY
              </p>

              <p className="mt-1 text-lg font-bold">
                {new Date().toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>

            </div>

          </div>

        </div>

        {/* =====================================
            DAILY TOTALS
        ===================================== */}

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Calories */}

          <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Calories
                </p>

                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {Math.round(
                    dailyLog?.totalCalories || 0
                  )}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  kcal consumed
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl">
                🔥
              </div>

            </div>

          </div>

          {/* Protein */}

          <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Protein
                </p>

                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {Number(
                    dailyLog?.totalProtein || 0
                  ).toFixed(1)}
                  <span className="ml-1 text-base">
                    g
                  </span>
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  protein consumed
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-xl">
                💪
              </div>

            </div>

          </div>

          {/* Carbs */}

          <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Carbs
                </p>

                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {Number(
                    dailyLog?.totalCarbs || 0
                  ).toFixed(1)}
                  <span className="ml-1 text-base">
                    g
                  </span>
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  carbohydrates
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                🍞
              </div>

            </div>

          </div>

          {/* Fats */}

          <div className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Fats
                </p>

                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {Number(
                    dailyLog?.totalFats || 0
                  ).toFixed(1)}
                  <span className="ml-1 text-base">
                    g
                  </span>
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  fat consumed
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-xl">
                🥑
              </div>

            </div>

          </div>

        </div>

        {/* =====================================
            ADD FOOD
        ===================================== */}

        <div className="mb-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">

          <div className="mb-6">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-xl">
                ➕
              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Add Food
                </h2>

                <p className="text-sm text-gray-500">
                  Add something you ate today
                </p>

              </div>

            </div>

          </div>

          <form
            onSubmit={handleAddFood}
            className="grid gap-4 md:grid-cols-4"
          >

            {/* Food */}

            <div className="md:col-span-1">

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Food
              </label>

              <select
                value={selectedFood}
                onChange={(e) =>
                  setSelectedFood(e.target.value)
                }
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                required
              >

                <option value="">
                  Select food
                </option>

                {foods.map((food) => (

                  <option
                    key={food._id}
                    value={food._id}
                  >
                    {food.name}
                  </option>

                ))}

              </select>

            </div>

            {/* Meal */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Meal
              </label>

              <select
                value={meal}
                onChange={(e) =>
                  setMeal(e.target.value)
                }
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
              >

                <option value="breakfast">
                  🌅 Breakfast
                </option>

                <option value="lunch">
                  ☀️ Lunch
                </option>

                <option value="dinner">
                  🌙 Dinner
                </option>

                <option value="snacks">
                  🍎 Snacks
                </option>

              </select>

            </div>

            {/* Quantity */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Quantity
              </label>

              <div className="relative">

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value)
                  }
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                  placeholder="100"
                  required
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  g
                </span>

              </div>

            </div>

            {/* Button */}

            <div className="flex items-end">

              <button
                type="submit"
                disabled={adding || foods.length === 0}
                className="w-full rounded-2xl bg-gray-900 px-5 py-3.5 font-bold text-white shadow-lg transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {adding
                  ? "Adding..."
                  : "+ Add Food"}
              </button>

            </div>

          </form>

          {foods.length === 0 && (
            <p className="mt-4 rounded-xl bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
              No food options available. Please check your food API/data.
            </p>
          )}

        </div>

        {/* =====================================
            MEALS
        ===================================== */}

        <div className="mb-4">

          <h2 className="text-2xl font-bold text-gray-900">
            Today's Meals
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Everything you've added today
          </p>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <MealSection
            title="Breakfast"
            mealName="breakfast"
            icon="🌅"
          />

          <MealSection
            title="Lunch"
            mealName="lunch"
            icon="☀️"
          />

          <MealSection
            title="Dinner"
            mealName="dinner"
            icon="🌙"
          />

          <MealSection
            title="Snacks"
            mealName="snacks"
            icon="🍎"
          />

        </div>

      </div>

    </div>
  );
}

export default DailyTrackerPage;