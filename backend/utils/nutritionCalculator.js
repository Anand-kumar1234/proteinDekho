// ==========================================
// BMR CALCULATOR
// Mifflin-St Jeor Equation
// ==========================================

export const calculateBMR = ({
  sex,
  weight,
  height,
  age,
}) => {
  if (sex === "male") {
    return (
      10 * weight +
      6.25 * height -
      5 * age +
      5
    );
  }

  return (
    10 * weight +
    6.25 * height -
    5 * age -
    161
  );
};


// ==========================================
// ACTIVITY MULTIPLIER
// ==========================================

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
};


// ==========================================
// TDEE CALCULATOR
// ==========================================

export const calculateTDEE = ({
  bmr,
  activityLevel,
}) => {
  const multiplier =
    activityMultipliers[activityLevel];

  if (!multiplier) {
    throw new Error("Invalid activity level");
  }

  return bmr * multiplier;
};


// ==========================================
// DAILY CALORIE TARGET
// ==========================================

export const calculateDailyCalories = ({
  tdee,
  goal,
}) => {
  let calories = tdee;

  switch (goal) {
    case "weight_loss":
      calories = tdee - 400;
      break;

    case "maintenance":
      calories = tdee;
      break;

    case "muscle_gain":
      calories = tdee + 250;
      break;

    default:
      throw new Error("Invalid goal");
  }

  // Calories ko minimum 1200 se neeche nahi jane denge.
  return Math.max(Math.round(calories), 1200);
};


// ==========================================
// PROTEIN TARGET
// ==========================================

export const calculateProteinTarget = ({
  weight,
  goal,
}) => {
  let proteinPerKg;

  switch (goal) {
    case "weight_loss":
      proteinPerKg = 1.8;
      break;

    case "maintenance":
      proteinPerKg = 1.4;
      break;

    case "muscle_gain":
      proteinPerKg = 1.8;
      break;

    default:
      throw new Error("Invalid goal");
  }

  return Math.round(weight * proteinPerKg);
};


// ==========================================
// COMPLETE NUTRITION CALCULATION
// ==========================================

export const calculateNutritionTargets = ({
  sex,
  age,
  weight,
  height,
  activityLevel,
  goal,
}) => {
  const bmr = calculateBMR({
    sex,
    weight,
    height,
    age,
  });

  const tdee = calculateTDEE({
    bmr,
    activityLevel,
  });

  const dailyCalories = calculateDailyCalories({
    tdee,
    goal,
  });

  const proteinTarget = calculateProteinTarget({
    weight,
    goal,
  });

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    dailyCalories,
    proteinTarget,
  };
};