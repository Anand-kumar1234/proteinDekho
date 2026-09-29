import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../services/apiClient";

function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiClient("/api/nutrition/profile");

        setProfile(data.profile);
        setUser(data.user);
      } catch (error) {
        console.error("Dashboard error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ==========================================
  // 🆕 NEW:
  // Backend values ko user-friendly text mein convert karna.
  // ==========================================

  const formatGoal = (goal) => {
    const goals = {
      weight_loss: "Weight Loss",
      maintenance: "Maintenance",
      muscle_gain: "Muscle Gain",
    };

    return goals[goal] || goal || "Not set";
  };

  const formatActivity = (activity) => {
    const activities = {
      sedentary: "Sedentary",
      light: "Light Activity",
      moderate: "Moderate Activity",
      very_active: "Very Active",
      extra_active: "Extra Active",
    };

    return activities[activity] || activity || "Not set";
  };

  // ==========================================
  // 🆕 NEW:
  // Loading screen ko premium banaya.
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f8f7] px-4 py-10">
        <div className="mx-auto max-w-7xl animate-pulse">

          <div className="h-8 w-64 rounded-lg bg-gray-200" />
          <div className="mt-3 h-4 w-80 rounded bg-gray-200" />

          <div className="mt-8 h-48 rounded-3xl bg-white shadow-sm" />

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="h-40 rounded-3xl bg-white" />
            <div className="h-40 rounded-3xl bg-white" />
            <div className="h-40 rounded-3xl bg-white" />
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 🆕 NEW:
  // Dashboard
  // ==========================================

  return (
    <div className="min-h-screen bg-[#f6f8f7]">

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =====================================================
            WELCOME SECTION
        ===================================================== */}

        <section className="mb-8">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Nutrition Dashboard
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
                Welcome back,{" "}
                <span className="text-green-600">
                  {user?.name || "User"}
                </span>{" "}
                👋
              </h1>

              <p className="mt-2 text-base text-gray-500">
                Your personal nutrition overview is ready.
              </p>

            </div>

            {/* Profile Avatar */}

            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-lg font-bold text-green-700">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {user?.name || "User"}
                </p>

                <p className="text-xs text-gray-500">
                  {user?.email || "Nutrition Member"}
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            MAIN CALORIE HERO
        ===================================================== */}

        <section className="relative overflow-hidden rounded-[28px] bg-gray-950 p-6 text-white shadow-xl sm:p-8">

          {/* Decorative background */}

          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-green-500/20 blur-3xl" />

          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-green-400/10 blur-3xl" />


          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

            <div>

              <p className="text-sm font-medium text-green-400">
                YOUR DAILY CALORIE TARGET
              </p>

              <div className="mt-3 flex items-end gap-3">

                <span className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                  {profile?.dailyCalories || 0}
                </span>

                <span className="pb-2 text-sm text-gray-400">
                  kcal / day
                </span>

              </div>

              <p className="mt-4 max-w-xl text-sm leading-6 text-gray-400">
                This target is calculated from your age, body measurements,
                activity level and personal goal.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <Link
                  to="/meal-planner"
                  className="rounded-xl bg-green-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-400"
                >
                  Plan My Meals
                </Link>

                <Link
                  to="/calculators"
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View Calculators
                </Link>

              </div>

            </div>


            {/* Target Circle */}

            <div className="flex justify-center lg:pr-8">

              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-green-500/20">

                <div className="absolute inset-0 rounded-full border-[10px] border-transparent border-t-green-400 border-r-green-400" />

                <div className="text-center">

                  <p className="text-3xl font-extrabold">
                    {profile?.dailyCalories || 0}
                  </p>

                  <p className="text-xs text-gray-400">
                    kcal target
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            TARGET CARDS
        ===================================================== */}

        <section className="mt-6 grid gap-5 md:grid-cols-3">

          {/* Protein */}

          <div className="group rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-xl">
                🥩
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                Daily Target
              </span>

            </div>

            <p className="mt-6 text-sm font-medium text-gray-500">
              Protein Target
            </p>

            <div className="mt-1 flex items-end gap-2">

              <span className="text-4xl font-extrabold text-gray-950">
                {profile?.proteinTarget || 0}
              </span>

              <span className="pb-1 text-sm text-gray-500">
                g / day
              </span>

            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-full rounded-full bg-green-500" />
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Your recommended daily protein intake
            </p>

          </div>


          {/* BMR */}

          <div className="group rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl">
                🔥
              </div>

              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                Metabolism
              </span>

            </div>

            <p className="mt-6 text-sm font-medium text-gray-500">
              Basal Metabolic Rate
            </p>

            <div className="mt-1 flex items-end gap-2">

              <span className="text-4xl font-extrabold text-gray-950">
                {profile?.bmr || 0}
              </span>

              <span className="pb-1 text-sm text-gray-500">
                kcal / day
              </span>

            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[65%] rounded-full bg-orange-400" />
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Estimated energy your body needs at rest
            </p>

          </div>


          {/* Goal */}

          <div className="group rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                🎯
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Your Goal
              </span>

            </div>

            <p className="mt-6 text-sm font-medium text-gray-500">
              Current Goal
            </p>

            <p className="mt-1 text-3xl font-extrabold text-gray-950">
              {formatGoal(profile?.goal)}
            </p>

            <p className="mt-5 text-sm text-gray-500">
              Activity level:{" "}
              <span className="font-semibold text-gray-800">
                {formatActivity(profile?.activityLevel)}
              </span>
            </p>

          </div>

        </section>


        {/* =====================================================
            PROFILE + QUICK ACTIONS
        ===================================================== */}

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">


          {/* PROFILE */}

          <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm sm:p-7">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-wider text-green-600">
                  Personal Information
                </p>

                <h2 className="mt-1 text-2xl font-extrabold text-gray-950">
                  My Nutrition Profile
                </h2>

              </div>

              <Link
                to="/nutrition-profile"
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
              >
                Edit Profile
              </Link>

            </div>


            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              <ProfileItem
                label="Weight"
                value={`${profile?.weight || 0} kg`}
                icon="⚖️"
              />

              <ProfileItem
                label="Height"
                value={`${profile?.height || 0} cm`}
                icon="📏"
              />

              <ProfileItem
                label="Goal"
                value={formatGoal(profile?.goal)}
                icon="🎯"
              />

              <ProfileItem
                label="Activity"
                value={formatActivity(profile?.activityLevel)}
                icon="🏃"
              />

            </div>

          </div>


          {/* QUICK ACTIONS */}

          <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm sm:p-7">

            <p className="text-xs font-bold uppercase tracking-wider text-green-600">
              Explore
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-gray-950">
              Quick Actions
            </h2>

            <div className="mt-6 space-y-3">

              <QuickAction
                to="/foods"
                icon="🥗"
                title="Explore Foods"
                description="Check nutrition values"
              />

              <QuickAction
                to="/protein-target"
                icon="🥩"
                title="Protein Target"
                description="Understand your target"
              />

              <QuickAction
                to="/meal-planner"
                icon="🍽️"
                title="Meal Planner"
                description="Plan your daily meals"
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            COMING NEXT / DAILY TRACKER
        ===================================================== */}

        <section className="mt-6 rounded-[24px] border border-dashed border-gray-300 bg-white p-7">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl">
                  📊
                </div>

                <div>

                  <h2 className="text-xl font-extrabold text-gray-950">
                    Daily Nutrition Tracker
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Track your calories, protein and meals throughout the day.
                  </p>

                </div>

              </div>

            </div>

            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-400"
            >
              Coming Soon
            </button>

          </div>

        </section>


        {/* Footer spacing */}

        <div className="h-8" />

      </main>

    </div>
  );
}


// ==========================================================
// 🆕 NEW:
// Reusable profile item component.
// ==========================================================

function ProfileItem({ label, value, icon }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#fafbfb] p-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {label}
        </p>

        <p className="mt-1 truncate text-base font-bold text-gray-900">
          {value}
        </p>

      </div>

    </div>
  );
}


// ==========================================================
// 🆕 NEW:
// Reusable quick action component.
// ==========================================================

function QuickAction({ to, icon, title, description }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-2xl border border-gray-100 p-3 transition hover:-translate-y-0.5 hover:border-green-200 hover:bg-green-50"
    >

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-lg">
        {icon}
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-sm font-bold text-gray-900">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-gray-500">
          {description}
        </p>

      </div>

      <span className="text-lg text-gray-300">
        →
      </span>

    </Link>
  );
}

export default DashboardPage;