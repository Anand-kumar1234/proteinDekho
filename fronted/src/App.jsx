import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NutritionPage from "./pages/NutritionPage";
import CalculatorPage from "./pages/CalculatorPage";
import ProteinTargetPage from "./pages/ProteinTargetPage";
import MealPlannerPage from "./pages/MealPlannerPage";
import HomePage from "./pages/HomePage";
import NutritionProfilePage from "./pages/NutritionProfilePage";
import DashboardPage from "./pages/DashboardPage";
import DailyTrackerPage from "./pages/DailyTrackerPage";
function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>
   
<Route
  path="/dashboard"
  element={<DashboardPage />}
/>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/foods"
          element={<NutritionPage />}
        />

        <Route
          path="/calculators"
          element={<CalculatorPage />}
        />

        <Route
          path="/protein-target"
          element={<ProteinTargetPage />}
        />

        <Route
          path="/meal-planner"
          element={<MealPlannerPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* 🔐 Personal Nutrition Profile */}
        <Route
          path="/nutrition-profile"
          element={<NutritionProfilePage />}
        />
<Route
  path="/daily-tracker"
  element={<DailyTrackerPage />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;