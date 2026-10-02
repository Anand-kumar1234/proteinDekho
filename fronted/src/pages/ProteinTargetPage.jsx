import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  calculateProteinTarget,
  ACTIVITY_LEVELS,
  FITNESS_GOALS,
  DIET_PREFERENCES,
} from "../utils/proteinCalculator";
import apiClient from "../services/apiClient";

export default function ProteinTargetPage() {
  const navigate = useNavigate();

  // Unit system
  const [unitSystem, setUnitSystem] = useState("metric"); // 'metric' or 'imperial'

  // Form inputs
  const [sex, setSex] = useState("male");
  const [age, setAge] = useState(25);
  const [weightKg, setWeightKg] = useState(70);
  const [weightLbs, setWeightLbs] = useState(154);
  const [heightCm, setHeightCm] = useState(172);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(8);
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal] = useState("muscle_gain");
  const [diet, setDiet] = useState("veg");

  // Output state
  const [results, setResults] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Sync weight units
  const handleWeightChange = (val, system) => {
    const num = Number(val);
    if (system === "metric") {
      setWeightKg(val);
      setWeightLbs(num ? Math.round(num * 2.20462) : "");
    } else {
      setWeightLbs(val);
      setWeightKg(num ? Math.round(num / 2.20462) : "");
    }
  };

  // Sync height units
  const handleHeightMetricChange = (val) => {
    setHeightCm(val);
    const num = Number(val);
    if (num) {
      const totalInches = num / 2.54;
      setHeightFt(Math.floor(totalInches / 12));
      setHeightIn(Math.round(totalInches % 12));
    }
  };

  const handleHeightImperialChange = (ft, inc) => {
    setHeightFt(ft);
    setHeightIn(inc);
    const totalInches = (Number(ft) || 0) * 12 + (Number(inc) || 0);
    setHeightCm(Math.round(totalInches * 2.54));
  };

  // Run calculation
  const runCalculation = () => {
    const activeWeight = Number(weightKg) || 70;
    const activeHeight = Number(heightCm) || 170;
    const activeAge = Number(age) || 25;

    const res = calculateProteinTarget({
      weight: activeWeight,
      height: activeHeight,
      age: activeAge,
      sex,
      activity,
      goal,
      diet,
    });

    setResults(res);
  };

  // Calculate automatically on mount & initial values
  useEffect(() => {
    runCalculation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Show Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Save to profile
  const handleSaveToProfile = async () => {
    if (!results) return;

    try {
      setSaving(true);
      const token = localStorage.getItem("accessToken");

      if (token) {
        await apiClient("/api/nutrition/profile", {
          method: "POST",
          body: {
            age: Number(age),
            sex,
            weight: Number(weightKg),
            height: Number(heightCm),
            activityLevel: activity,
            goal,
          },
        });
        showToast("✅ Target saved to your Nutrition Profile!");
      } else {
        // Save to guest localStorage
        localStorage.setItem(
          "user_protein_target",
          JSON.stringify({
            proteinTarget: results.targetProtein,
            dailyCalories: results.targetCalories,
            diet,
            updatedAt: new Date().toISOString(),
          })
        );
        showToast("✅ Target saved locally for your session!");
      }
    } catch (err) {
      console.warn("Could not save to server:", err);
      // Fallback local save
      localStorage.setItem(
        "user_protein_target",
        JSON.stringify({
          proteinTarget: results.targetProtein,
          dailyCalories: results.targetCalories,
          diet,
        })
      );
      showToast("✅ Target saved to browser storage!");
    } finally {
      setSaving(false);
    }
  };

  // Copy summary
  const handleCopySummary = () => {
    if (!results) return;
    const summary = `🥗 ProteinDekho Nutrition Plan
- Daily Protein: ${results.targetProtein}g (${results.proteinPerKg}g/kg body weight)
- Optimal Range: ${results.minProtein}g - ${results.maxProtein}g
- Target Calories: ${results.targetCalories} kcal/day
- Macros: Protein ${results.macros.protein}g | Carbs ${results.macros.carbs}g | Fats ${results.macros.fats}g | Fiber ${results.macros.fiber}g
- 4-Meal Timing: Breakfast ~${results.mealDistribution.breakfast.protein}g | Lunch ~${results.mealDistribution.lunch.protein}g | Snack ~${results.mealDistribution.snacks.protein}g | Dinner ~${results.mealDistribution.dinner.protein}g
Calculated at ProteinDekho (ICMR-NIN verified)`;

    navigator.clipboard.writeText(summary);
    showToast("📋 Plan copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-2xl transition animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Top Banner */}
      <section className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 px-4 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-200 border border-emerald-400/30">
            🌱 ICMR-NIN & Sports Nutrition Calibrated
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Indian Protein Target Calculator
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-emerald-100">
            Find your exact daily protein and macronutrient requirement based on authentic Indian body types, activity, fitness goals, and vegetarian/desi diets.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="mx-auto max-w-6xl px-4 -mt-6">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Form (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">Your Metrics</h2>
                <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setUnitSystem("metric")}
                    className={`rounded-lg px-3 py-1 transition ${
                      unitSystem === "metric"
                        ? "bg-white text-emerald-700 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Metric (kg/cm)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnitSystem("imperial")}
                    className={`rounded-lg px-3 py-1 transition ${
                      unitSystem === "imperial"
                        ? "bg-white text-emerald-700 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Imperial (lbs/ft)
                  </button>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {/* Sex */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Biological Sex
                  </label>
                  <div className="mt-1.5 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSex("male")}
                      className={`flex items-center justify-center gap-2 rounded-2xl border py-2.5 text-sm font-semibold transition ${
                        sex === "male"
                          ? "border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20"
                          : "border-slate-200 hover:bg-slate-50 text-slate-600"
                      }`}
                    >
                      <span>👨</span> Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setSex("female")}
                      className={`flex items-center justify-center gap-2 rounded-2xl border py-2.5 text-sm font-semibold transition ${
                        sex === "female"
                          ? "border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20"
                          : "border-slate-200 hover:bg-slate-50 text-slate-600"
                      }`}
                    >
                      <span>👩</span> Female
                    </button>
                  </div>
                </div>

                {/* Age & Weight */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Age (Years)
                    </label>
                    <input
                      type="number"
                      min="12"
                      max="100"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Weight ({unitSystem === "metric" ? "kg" : "lbs"})
                    </label>
                    <input
                      type="number"
                      min="30"
                      max="300"
                      value={unitSystem === "metric" ? weightKg : weightLbs}
                      onChange={(e) => handleWeightChange(e.target.value, unitSystem)}
                      className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Height */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Height
                  </label>
                  {unitSystem === "metric" ? (
                    <div className="relative mt-1.5">
                      <input
                        type="number"
                        min="100"
                        max="240"
                        value={heightCm}
                        onChange={(e) => handleHeightMetricChange(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500 focus:bg-white"
                      />
                      <span className="absolute right-4 top-2.5 text-xs font-medium text-slate-400">
                        cm
                      </span>
                    </div>
                  ) : (
                    <div className="mt-1.5 grid grid-cols-2 gap-3">
                      <div className="relative">
                        <input
                          type="number"
                          min="3"
                          max="7"
                          value={heightFt}
                          onChange={(e) =>
                            handleHeightImperialChange(e.target.value, heightIn)
                          }
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500 focus:bg-white"
                        />
                        <span className="absolute right-4 top-2.5 text-xs font-medium text-slate-400">
                          ft
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="11"
                          value={heightIn}
                          onChange={(e) =>
                            handleHeightImperialChange(heightFt, e.target.value)
                          }
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500 focus:bg-white"
                        />
                        <span className="absolute right-4 top-2.5 text-xs font-medium text-slate-400">
                          in
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Activity Level */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Daily Activity Level
                  </label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500 focus:bg-white"
                  >
                    {ACTIVITY_LEVELS.map((act) => (
                      <option key={act.id} value={act.id}>
                        {act.label} — {act.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fitness Goal */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Primary Goal
                  </label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500 focus:bg-white"
                  >
                    {FITNESS_GOALS.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.label} ({g.description})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Diet Preference */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Dietary Pattern
                  </label>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    {DIET_PREFERENCES.map((dp) => (
                      <button
                        key={dp.id}
                        type="button"
                        onClick={() => setDiet(dp.id)}
                        className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                          diet === dp.id
                            ? "border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>{dp.icon}</span> {dp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculate Button */}
                <button
                  type="button"
                  onClick={runCalculation}
                  className="mt-4 w-full rounded-2xl bg-emerald-600 py-3.5 text-sm font-extrabold text-white shadow-md transition hover:bg-emerald-700 active:scale-[0.99]"
                >
                  ⚡ Recalculate Protein Target
                </button>
              </div>
            </div>

            {/* Quick Scientific Note */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 text-xs text-slate-500 leading-relaxed space-y-2">
              <p className="font-bold text-slate-700">🔬 Why ICMR-NIN Standards Matter:</p>
              <p>
                Standard sedentary Indian diets require ~0.83g protein/kg body weight. For active training, fat loss, or muscle building, requirements increase to 1.6 - 2.2g/kg. Due to plant amino acid bioavailability, vegetarian/vegan targets are optimized with a +5% factor to ensure complete essential amino acid profile.
              </p>
            </div>
          </div>

          {/* Right Results (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {results && (
              <>
                {/* Main Hero Card */}
                <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                        Recommended Daily Intake
                      </span>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-5xl font-black text-slate-900 sm:text-6xl">
                          {results.targetProtein}
                        </span>
                        <span className="text-2xl font-bold text-emerald-600">
                          grams / day
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        Optimal target range:{" "}
                        <strong className="text-slate-700">
                          {results.minProtein}g – {results.maxProtein}g
                        </strong>{" "}
                        daily
                      </p>
                    </div>

                    <div className="rounded-2xl bg-emerald-50 px-5 py-3 text-center sm:text-right border border-emerald-100">
                      <span className="text-xs font-semibold text-emerald-800">
                        Protein Intensity
                      </span>
                      <p className="text-2xl font-black text-emerald-700">
                        {results.proteinPerKg}{" "}
                        <span className="text-sm font-bold">g/kg</span>
                      </p>
                      <span className="text-[11px] text-emerald-600">
                        bodyweight ratio
                      </span>
                    </div>
                  </div>

                  {/* Secondary Metrics */}
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 text-center">
                    <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase">
                        Target Calories
                      </span>
                      <p className="mt-1 text-xl font-extrabold text-slate-800">
                        {results.targetCalories}
                      </p>
                      <span className="text-[10px] text-slate-500">kcal/day</span>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase">
                        Est. BMR
                      </span>
                      <p className="mt-1 text-xl font-extrabold text-slate-800">
                        {results.bmr}
                      </p>
                      <span className="text-[10px] text-slate-500">base burn</span>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase">
                        TDEE Energy
                      </span>
                      <p className="mt-1 text-xl font-extrabold text-slate-800">
                        {results.tdee}
                      </p>
                      <span className="text-[10px] text-slate-500">maintenance</span>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase">
                        Target Fiber
                      </span>
                      <p className="mt-1 text-xl font-extrabold text-slate-800">
                        {results.macros.fiber}g
                      </p>
                      <span className="text-[10px] text-slate-500">daily gut goal</span>
                    </div>
                  </div>

                  {/* Macronutrient Split */}
                  <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Macronutrient Breakdown</span>
                      <span className="text-slate-400">Total: {results.targetCalories} kcal</span>
                    </div>

                    {/* Multi-colored Bar */}
                    <div className="mt-3 flex h-3 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        style={{ width: `${results.macros.proteinPct}%` }}
                        className="bg-emerald-500"
                        title={`Protein: ${results.macros.proteinPct}%`}
                      />
                      <div
                        style={{ width: `${results.macros.carbsPct}%` }}
                        className="bg-amber-400"
                        title={`Carbs: ${results.macros.carbsPct}%`}
                      />
                      <div
                        style={{ width: `${results.macros.fatsPct}%` }}
                        className="bg-sky-400"
                        title={`Fats: ${results.macros.fatsPct}%`}
                      />
                    </div>

                    {/* Macro Details */}
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 mr-1" />
                        <span className="font-bold text-slate-700">Protein</span>
                        <p className="text-slate-500 font-semibold">
                          {results.macros.protein}g ({results.macros.proteinPct}%)
                        </p>
                      </div>
                      <div>
                        <span className="inline-block h-2 w-2 rounded-full bg-amber-400 mr-1" />
                        <span className="font-bold text-slate-700">Carbs</span>
                        <p className="text-slate-500 font-semibold">
                          {results.macros.carbs}g ({results.macros.carbsPct}%)
                        </p>
                      </div>
                      <div>
                        <span className="inline-block h-2 w-2 rounded-full bg-sky-400 mr-1" />
                        <span className="font-bold text-slate-700">Fats</span>
                        <p className="text-slate-500 font-semibold">
                          {results.macros.fats}g ({results.macros.fatsPct}%)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 4-Meal Timing Blueprint */}
                  <div className="mt-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Recommended 4-Meal Protein Pacing
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      <div className="rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-xs">
                        <span className="text-lg">🌅</span>
                        <p className="text-xs font-bold text-slate-700 mt-1">Breakfast</p>
                        <p className="text-base font-extrabold text-emerald-600">
                          ~{results.mealDistribution.breakfast.protein}g
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-xs">
                        <span className="text-lg">☀️</span>
                        <p className="text-xs font-bold text-slate-700 mt-1">Lunch</p>
                        <p className="text-base font-extrabold text-emerald-600">
                          ~{results.mealDistribution.lunch.protein}g
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-xs">
                        <span className="text-lg">🍎</span>
                        <p className="text-xs font-bold text-slate-700 mt-1">Snack</p>
                        <p className="text-base font-extrabold text-emerald-600">
                          ~{results.mealDistribution.snacks.protein}g
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-xs">
                        <span className="text-lg">🌙</span>
                        <p className="text-xs font-bold text-slate-700 mt-1">Dinner</p>
                        <p className="text-base font-extrabold text-emerald-600">
                          ~{results.mealDistribution.dinner.protein}g
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Actions */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/meal-planner?protein=${results.targetProtein}&calories=${results.targetCalories}&diet=${diet}`
                        )
                      }
                      className="flex-1 rounded-2xl bg-emerald-600 px-5 py-3.5 text-center text-sm font-extrabold text-white shadow-md transition hover:bg-emerald-700 active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      <span>🥗</span> Plan My Meals for This Target
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveToProfile}
                      disabled={saving}
                      className="rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-3.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100 active:scale-[0.99] disabled:opacity-50"
                    >
                      {saving ? "Saving..." : "💾 Save to Profile"}
                    </button>

                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                      title="Copy Plan Summary"
                    >
                      📋
                    </button>
                  </div>
                </div>

                {/* High Protein Desi Sources Section */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Top Desi Protein Sources for You
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Selected from our ICMR-NIN verified database ({diet.toUpperCase()} diet)
                      </p>
                    </div>
                    <Link
                      to="/foods"
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline"
                    >
                      Browse All Foods →
                    </Link>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {results.foodSuggestions.slice(0, 6).map((food, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:bg-emerald-50/50 hover:border-emerald-200 gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <div>
                                <p className="font-bold text-slate-900 text-sm">
                                  {food.name}
                                </p>
                                <p className="text-xs text-slate-500 font-medium">
                                  {food.hindi} • {food.category}
                                </p>
                              </div>
                              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-black text-emerald-800 shrink-0">
                                {food.proteinPer100g}g
                              </span>
                            </div>
                            <p className="mt-1.5 text-xs text-slate-600 italic line-clamp-2">
                              💡 {food.tip}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-200/60 pt-2 text-[11px] text-slate-500">
                          <span>Typical: {food.serving}</span>
                          <span className="font-bold text-emerald-700">
                            ~{food.proteinPerServing} protein
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}