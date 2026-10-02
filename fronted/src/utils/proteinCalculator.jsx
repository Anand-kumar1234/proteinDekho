/**
 * Protein Target & Nutrition Calculator
 * Grounded in ICMR-NIN (National Institute of Nutrition, India) RDA & ISSN guidelines
 */

export const ACTIVITY_LEVELS = [
  {
    id: "sedentary",
    label: "Sedentary",
    description: "Desk job, little to no regular exercise",
    multiplier: 1.2,
    proteinModifier: 0,
  },
  {
    id: "light",
    label: "Lightly Active",
    description: "Light exercise or sports 1-3 days/week",
    multiplier: 1.375,
    proteinModifier: 0.2,
  },
  {
    id: "moderate",
    label: "Moderately Active",
    description: "Moderate gym or training 3-5 days/week",
    multiplier: 1.55,
    proteinModifier: 0.4,
  },
  {
    id: "very_active",
    label: "Very Active",
    description: "Hard training or intense sports 6-7 days/week",
    multiplier: 1.725,
    proteinModifier: 0.6,
  },
  {
    id: "athlete",
    label: "Competitive Athlete / Heavy",
    description: "Twice daily training or physically demanding job",
    multiplier: 1.9,
    proteinModifier: 0.8,
  },
];

export const FITNESS_GOALS = [
  {
    id: "maintain",
    label: "Maintain Health & Longevity",
    description: "Balanced vitality, healthy organ function and wellness",
    baseProteinPerKg: 1.0,
    calorieDelta: 0,
  },
  {
    id: "fat_loss",
    label: "Fat Loss & Muscle Sparing",
    description: "Burn body fat while preserving lean muscle mass",
    baseProteinPerKg: 1.6,
    calorieDelta: -400,
  },
  {
    id: "muscle_gain",
    label: "Build Muscle (Hypertrophy)",
    description: "Increase muscle thickness, strength and size",
    baseProteinPerKg: 1.8,
    calorieDelta: +300,
  },
  {
    id: "strength",
    label: "Powerlifting & Strength",
    description: "Maximum athletic performance and heavy lifting recovery",
    baseProteinPerKg: 2.0,
    calorieDelta: +350,
  },
  {
    id: "endurance",
    label: "Endurance & Running",
    description: "Marathon, cycling, badminton and sustained stamina",
    baseProteinPerKg: 1.4,
    calorieDelta: +150,
  },
];

export const DIET_PREFERENCES = [
  { id: "veg", label: "Vegetarian", icon: "🌱" },
  { id: "vegan", label: "Vegan (Plant-Based)", icon: "🥑" },
  { id: "eggetarian", label: "Eggetarian", icon: "🥚" },
  { id: "non_veg", label: "Non-Vegetarian", icon: "🍗" },
];

/**
 * Calculates BMR using the Mifflin-St Jeor equation
 */
export function calculateBMR(weightKg, heightCm, ageYears, sex = "male") {
  const w = Number(weightKg);
  const h = Number(heightCm);
  const a = Number(ageYears);

  if (!w || !h || !a) return 1600;

  if (sex === "female") {
    return Math.round(10 * w + 6.25 * h - 5 * a - 161);
  }
  return Math.round(10 * w + 6.25 * h - 5 * a + 5);
}

/**
 * Calculates Protein Target, TDEE, Caloric Needs and Macros
 */
export function calculateProteinTarget({
  weight,
  height = 170,
  age = 25,
  sex = "male",
  activity = "moderate",
  goal = "muscle_gain",
  diet = "veg",
}) {
  const weightKg = Number(weight) || 70;
  const heightCm = Number(height) || 170;
  const ageYears = Number(age) || 25;

  const activityObj = ACTIVITY_LEVELS.find((a) => a.id === activity) || ACTIVITY_LEVELS[2];
  const goalObj = FITNESS_GOALS.find((g) => g.id === goal) || FITNESS_GOALS[2];

  // Base protein calculation
  let proteinPerKg = goalObj.baseProteinPerKg + (activityObj.proteinModifier * 0.5);

  // ICMR-NIN vegetarian protein bioavailability factor (+10% if purely plant-based due to amino acid profiles)
  if (diet === "vegan" || diet === "veg") {
    proteinPerKg *= 1.05;
  }

  // Bounds
  proteinPerKg = Math.max(0.83, Math.min(2.5, Math.round(proteinPerKg * 10) / 10));

  const targetProtein = Math.round(weightKg * proteinPerKg);
  const minProtein = Math.round(targetProtein * 0.9);
  const maxProtein = Math.round(targetProtein * 1.15);

  // Energy calculations
  const bmr = calculateBMR(weightKg, heightCm, ageYears, sex);
  const tdee = Math.round(bmr * activityObj.multiplier);
  const targetCalories = Math.max(1200, Math.round(tdee + goalObj.calorieDelta));

  // Macronutrient split
  const proteinCalories = targetProtein * 4;
  
  // Fats: 25% of calories
  const fatCalories = targetCalories * 0.25;
  const targetFats = Math.round(fatCalories / 9);

  // Carbs: remainder
  const carbCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const targetCarbs = Math.round(carbCalories / 4);

  // Estimated fiber recommendation (ICMR recommends 30-40g/day)
  const targetFiber = Math.min(50, Math.max(25, Math.round(targetCalories / 60)));

  // Meal distribution (4 meals: Breakfast 25%, Lunch 35%, Snack 15%, Dinner 25%)
  const mealDistribution = {
    breakfast: {
      protein: Math.round(targetProtein * 0.25),
      calories: Math.round(targetCalories * 0.25),
    },
    lunch: {
      protein: Math.round(targetProtein * 0.35),
      calories: Math.round(targetCalories * 0.35),
    },
    snacks: {
      protein: Math.round(targetProtein * 0.15),
      calories: Math.round(targetCalories * 0.15),
    },
    dinner: {
      protein: Math.round(targetProtein * 0.25),
      calories: Math.round(targetCalories * 0.25),
    },
  };

  // Indian Food Suggestions based on diet
  const foodSuggestions = getTopProteinSources(diet);

  return {
    weightKg,
    heightCm,
    ageYears,
    sex,
    activity,
    goal,
    diet,
    proteinPerKg: Number(proteinPerKg.toFixed(1)),
    targetProtein,
    minProtein,
    maxProtein,
    bmr,
    tdee,
    targetCalories,
    macros: {
      protein: targetProtein,
      carbs: targetCarbs,
      fats: targetFats,
      fiber: targetFiber,
      proteinPct: Math.round((proteinCalories / targetCalories) * 100),
      carbsPct: Math.round((carbCalories / targetCalories) * 100),
      fatsPct: Math.round((fatCalories / targetCalories) * 100),
    },
    mealDistribution,
    foodSuggestions,
  };
}

/**
 * Returns authentic Indian protein foods by diet preference
 */
export function getTopProteinSources(diet = "veg") {
  const allSources = [
    {
      name: "Soy Chunks (Nutrela)",
      hindi: "सोया चंक्स",
      proteinPer100g: 52.0,
      caloriesPer100g: 345,
      serving: "30g dry (~1 cup boiled)",
      proteinPerServing: "15.6g",
      isVeg: true,
      isVegan: true,
      category: "Pulses & Legumes",
      tip: "Highest protein density of all desi plant sources!",
    },
    {
      name: "Sattu (Roasted Bengal Gram Flour)",
      hindi: "सत्तू",
      proteinPer100g: 20.6,
      caloriesPer100g: 380,
      serving: "40g (1 large glass drink)",
      proteinPerServing: "8.2g",
      isVeg: true,
      isVegan: true,
      category: "Pulses & Legumes",
      tip: "Traditional desi superfood, high fiber with cooling digestive benefits.",
    },
    {
      name: "Paneer (Cottage Cheese)",
      hindi: "पनीर",
      proteinPer100g: 18.3,
      caloriesPer100g: 265,
      serving: "100g (1 slab / cup cubes)",
      proteinPerServing: "18.3g",
      isVeg: true,
      isVegan: false,
      category: "Dairy",
      tip: "Rich in casein protein for sustained amino acid release & calcium.",
    },
    {
      name: "Moong Dal (Yellow Split)",
      hindi: "मूंग दाल",
      proteinPer100g: 24.0,
      caloriesPer100g: 348,
      serving: "50g dry (1 medium katori cooked)",
      proteinPerServing: "12.0g",
      isVeg: true,
      isVegan: true,
      category: "Pulses & Legumes",
      tip: "Very light on stomach, rich in folate and potassium.",
    },
    {
      name: "Sprouted Chana (Black Gram Sprouts)",
      hindi: "अंकुरित चना",
      proteinPer100g: 15.0,
      caloriesPer100g: 164,
      serving: "60g (1 bowl chaat)",
      proteinPerServing: "9.0g",
      isVeg: true,
      isVegan: true,
      category: "Pulses & Legumes",
      tip: "Sprouting boosts bioavailability and vitamin C absorption.",
    },
    {
      name: "Curd / Dahi (Greek / Hung style)",
      hindi: "दही / मस्का",
      proteinPer100g: 10.2,
      caloriesPer100g: 98,
      serving: "150g (1 bowl)",
      proteinPerServing: "15.3g",
      isVeg: true,
      isVegan: false,
      category: "Dairy",
      tip: "Excellent gut-friendly probiotic source of pure milk protein.",
    },
    {
      name: "Whole Eggs (Boiled)",
      hindi: "उबले अंडे",
      proteinPer100g: 13.0,
      caloriesPer100g: 155,
      serving: "2 large eggs (~100g)",
      proteinPerServing: "13.0g",
      isVeg: false,
      isEgg: true,
      isVegan: false,
      category: "Eggs",
      tip: "Gold standard biological value (BV 100) with complete amino acid profile.",
    },
    {
      name: "Egg Whites",
      hindi: "अंडे की सफेदी",
      proteinPer100g: 11.0,
      caloriesPer100g: 52,
      serving: "3 whites (~100g)",
      proteinPerServing: "11.0g",
      isVeg: false,
      isEgg: true,
      isVegan: false,
      category: "Eggs",
      tip: "Virtually zero fat and pure fast-digesting protein.",
    },
    {
      name: "Chicken Breast",
      hindi: "चिकन ब्रेस्ट",
      proteinPer100g: 27.0,
      caloriesPer100g: 165,
      serving: "150g grilled",
      proteinPerServing: "40.5g",
      isVeg: false,
      isEgg: false,
      isVegan: false,
      category: "Meat & Poultry",
      tip: "Leanest complete meat protein with minimal carbs and fat.",
    },
    {
      name: "Tofu (Soy Paneer)",
      hindi: "टोफू",
      proteinPer100g: 14.0,
      caloriesPer100g: 120,
      serving: "100g cubes",
      proteinPerServing: "14.0g",
      isVeg: true,
      isVegan: true,
      category: "Pulses & Legumes",
      tip: "100% plant-based low-fat alternative to dairy paneer.",
    },
    {
      name: "Roasted Peanuts (Moongphali)",
      hindi: "मूंगफली",
      proteinPer100g: 25.8,
      caloriesPer100g: 567,
      serving: "30g (handful)",
      proteinPerServing: "7.7g",
      isVeg: true,
      isVegan: true,
      category: "Nuts & Seeds",
      tip: "High in healthy heart-friendly monounsaturated fats and arginine.",
    },
  ];

  if (diet === "vegan") {
    return allSources.filter((s) => s.isVegan);
  }
  if (diet === "veg") {
    return allSources.filter((s) => s.isVeg);
  }
  if (diet === "eggetarian") {
    return allSources.filter((s) => s.isVeg || s.isEgg);
  }
  return allSources;
}
