import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

const NutritionProfilePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    weight: "",
    height: "",
    activityLevel: "",
    goal: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await apiClient("/api/nutrition/profile", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      console.log("Nutrition profile:", data);

      // 🆕 UPDATED:
      // Nutrition profile successfully save hone ke baad
      // user ko direct Dashboard par bhejenge.
      navigate("/dashboard");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">

      <div className="mx-auto max-w-xl">

        <div className="rounded-2xl bg-white p-6 shadow-md">

          <h1 className="text-2xl font-bold text-gray-900">
            Complete Your Nutrition Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your details to calculate your daily calorie
            and protein targets.
          </p>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >

            {/* Age */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Age
              </label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
                required
              />
            </div>

            {/* Sex */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Sex
              </label>

              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
                required
              >
                <option value="">
                  Select
                </option>

                <option value="male">
                  Male
                </option>

                <option value="female">
                  Female
                </option>
              </select>
            </div>

            {/* Weight */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Weight (kg)
              </label>

              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="e.g. 70"
                className="w-full rounded-lg border px-4 py-3"
                required
              />
            </div>

            {/* Height */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Height (cm)
              </label>

              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="e.g. 175"
                className="w-full rounded-lg border px-4 py-3"
                required
              />
            </div>

            {/* Activity */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Activity Level
              </label>

              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
                required
              >
                <option value="">
                  Select activity level
                </option>

                <option value="sedentary">
                  Sedentary
                </option>

                <option value="light">
                  Light Activity
                </option>

                <option value="moderate">
                  Moderate Activity
                </option>

                <option value="very_active">
                  Very Active
                </option>

                <option value="extra_active">
                  Extra Active
                </option>
              </select>
            </div>

            {/* Goal */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Your Goal
              </label>

              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
                required
              >
                <option value="">
                  Select your goal
                </option>

                <option value="weight_loss">
                  Weight Loss
                </option>

                <option value="maintenance">
                  Maintenance
                </option>

                <option value="muscle_gain">
                  Muscle Gain
                </option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
            >
              {loading
                ? "Calculating..."
                : "Calculate My Targets"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default NutritionProfilePage;