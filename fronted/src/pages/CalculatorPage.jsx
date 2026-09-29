import { useState } from "react";

function ProteinTargetPage() {
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("maintain");
  const [activity, setActivity] = useState("moderate");
  const [result, setResult] = useState(null);

  const calculateProtein = () => {
    const weightValue = Number(weight);

    if (!weightValue || weightValue <= 0) {
      alert("Please enter a valid weight");
      return;
    }

    let proteinPerKg = 1.2;

    // Goal ke according base protein
    if (goal === "maintain") {
      proteinPerKg = 1.2;
    }

    if (goal === "lose") {
      proteinPerKg = 1.6;
    }

    if (goal === "gain") {
      proteinPerKg = 1.6;
    }

    // Activity ke according adjustment
    if (activity === "light") {
      proteinPerKg += 0.1;
    }

    if (activity === "moderate") {
      proteinPerKg += 0.2;
    }

    if (activity === "high") {
      proteinPerKg += 0.4;
    }

    const protein = Math.round(weightValue * proteinPerKg);

    setResult({
      protein,
      proteinPerKg: proteinPerKg.toFixed(1),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-10">

      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="text-center">

          <p className="font-semibold uppercase tracking-wide text-green-600">
            ProteinDekho
          </p>

          <h1 className="mt-2 text-4xl font-extrabold text-gray-900">
            Daily Protein Target
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Find an estimated daily protein target based on
            your body weight, activity and goal.
          </p>

        </div>

        {/* Main */}

        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          {/* Form */}

          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-2xl font-bold">
              Your Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter your information below.
            </p>

            <div className="mt-6 space-y-5">

              {/* Weight */}

              <div>

                <label className="mb-2 block font-semibold">
                  Body Weight
                </label>

                <div className="flex">

                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Example: 70"
                    className="w-full rounded-l-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
                  />

                  <div className="flex items-center rounded-r-xl bg-gray-100 px-4 font-semibold text-gray-600">
                    kg
                  </div>

                </div>

              </div>

              {/* Goal */}

              <div>

                <label className="mb-2 block font-semibold">
                  Your Goal
                </label>

                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
                >
                  <option value="maintain">
                    Maintain Weight
                  </option>

                  <option value="lose">
                    Lose Fat / Weight
                  </option>

                  <option value="gain">
                    Build Muscle / Gain
                  </option>
                </select>

              </div>

              {/* Activity */}

              <div>

                <label className="mb-2 block font-semibold">
                  Activity Level
                </label>

                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
                >

                  <option value="light">
                    Lightly Active
                  </option>

                  <option value="moderate">
                    Moderately Active
                  </option>

                  <option value="high">
                    Highly Active
                  </option>

                </select>

              </div>

              {/* Button */}

              <button
                onClick={calculateProtein}
                className="w-full rounded-xl bg-green-600 px-5 py-4 font-bold text-white transition hover:bg-green-700"
              >
                Calculate Protein Target
              </button>

            </div>

          </div>

          {/* Result */}

          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-2xl font-bold">
              Your Protein Target
            </h2>

            {!result ? (

              <div className="mt-6 flex min-h-[350px] items-center justify-center rounded-2xl bg-gray-50 p-6 text-center">

                <div>

                  <div className="text-6xl">
                    🥩
                  </div>

                  <p className="mt-4 font-semibold text-gray-700">
                    Calculate your target
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Your estimated daily protein requirement
                    will appear here.
                  </p>

                </div>

              </div>

            ) : (

              <div className="mt-6">

                {/* Main Result */}

                <div className="rounded-3xl bg-green-50 p-7 text-center">

                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Recommended Daily Protein
                  </p>

                  <p className="mt-2 text-6xl font-extrabold text-green-700">
                    {result.protein}
                    <span className="text-2xl">
                      g
                    </span>
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    approximately per day
                  </p>

                </div>

                {/* Details */}

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl bg-gray-50 p-5">

                    <p className="text-sm text-gray-500">
                      Protein per kg
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                      {result.proteinPerKg} g/kg
                    </p>

                  </div>

                  <div className="rounded-2xl bg-gray-50 p-5">

                    <p className="text-sm text-gray-500">
                      Body Weight
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                      {weight} kg
                    </p>

                  </div>

                </div>

                {/* Food examples */}

                <div className="mt-5 rounded-2xl border border-green-100 bg-white p-5">

                  <h3 className="font-bold">
                    How to reach your target?
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Use ProteinDekho's food database to find
                    protein-rich foods and build your meals.
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

        {/* Information */}

        <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-2xl font-bold">
            About Protein Target
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Protein requirements vary depending on body weight,
            activity level, goals and individual circumstances.
            This calculator provides an estimate for general
            informational purposes.
          </p>

          <div className="mt-5 rounded-xl bg-yellow-50 p-4 text-sm text-gray-600">
            This calculator is an estimate and is not a substitute
            for advice from a qualified healthcare or nutrition
            professional.
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProteinTargetPage;