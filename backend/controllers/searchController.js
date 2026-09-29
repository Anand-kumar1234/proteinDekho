import Food from "../models/Food.js";

const nutrientMap = {
  protein: "macros.protein",
  calories: "macros.calories",
  carbs: "macros.carbs",
  fat: "macros.fats",
  fats: "macros.fats",
  fiber: "macros.fiber",

  "vitamin a": "vitamins.vitaminA",
  "vitamin b12": "vitamins.vitaminB12",
  "vitamin c": "vitamins.vitaminC",
  "vitamin d": "vitamins.vitaminD",
  "vitamin e": "vitamins.vitaminE",
  folate: "vitamins.folate",

  calcium: "minerals.calcium",
  iron: "minerals.iron",
  zinc: "minerals.zinc",
  potassium: "minerals.potassium",
  magnesium: "minerals.magnesium",
  sodium: "minerals.sodium",
};


// ========================================
// LEVENSHTEIN DISTANCE
// ========================================

const levenshteinDistance = (a, b) => {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {

      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,      // delete
          matrix[i][j - 1] + 1,      // insert
          matrix[i - 1][j - 1] + 1   // replace
        );
      }
    }
  }

  return matrix[b.length][a.length];
};


// ========================================
// FUZZY MATCH
// ========================================

const isSimilar = (word1, word2) => {

  word1 = word1.toLowerCase();
  word2 = word2.toLowerCase();

  const distance = levenshteinDistance(word1, word2);

  const maxLength = Math.max(
    word1.length,
    word2.length
  );

  // Bahut chhote words
  if (maxLength <= 3) {
    return distance <= 1;
  }

  // 4-6 characters
  if (maxLength <= 6) {
    return distance <= 1;
  }

  // 7+ characters
  return distance <= 2;
};


// ========================================
// SEARCH CONTROLLER
// ========================================

export const searchData = async (req, res) => {

  try {

    const { query } = req.body;


    // ========================================
    // QUERY CHECK
    // ========================================

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }


    // ========================================
    // NORMALIZE QUERY
    // ========================================

    const searchQuery = query
      .toLowerCase()
      .trim();


    console.log("Search query:", searchQuery);


    // ========================================
    // GET FOOD NAMES
    // ========================================

    const foods = await Food.find({}, "name");

    console.log(
      "Food names:",
      foods.map((food) => food.name)
    );


    // ========================================
    // FOOD MATCHING
    // ========================================

    const matchedFood = foods.find((food) => {

      /*
        Example:

        Dahi (Curd)

        split("(")

        ["dahi ", "curd)"]

        map()

        ["dahi", "curd"]
      */

      const foodParts = food.name
        .toLowerCase()
        .split("(")
        .map((part) =>
          part
            .replace(")", "")
            .trim()
        );


      // ========================================
      // 1. EXACT / PARTIAL MATCH
      // ========================================

      const directMatch = foodParts.some((part) =>
        searchQuery.includes(part)
      );

      if (directMatch) {
        return true;
      }


      // ========================================
      // 2. FUZZY MATCH
      // ========================================

      const queryWords = searchQuery
        .split(/\s+/)
        .filter(Boolean);


      return foodParts.some((part) => {

        const foodWords = part
          .split(/\s+/)
          .filter(Boolean);


        return foodWords.some((foodWord) => {

          return queryWords.some((queryWord) => {

            // Same word skip
            if (queryWord === foodWord) {
              return true;
            }

            return isSimilar(
              queryWord,
              foodWord
            );

          });

        });

      });

    });


    // ========================================
    // FOOD NOT FOUND
    // ========================================

    if (!matchedFood) {

      return res.status(404).json({
        success: false,
        message: "Food not found",
      });

    }


    console.log(
      "Matched food:",
      matchedFood.name
    );


    // ========================================
    // GET COMPLETE FOOD DATA
    // ========================================

    const foodData = await Food.findOne({
      name: matchedFood.name,
    });


    // ========================================
    // FIND NUTRIENT
    // ========================================

    let matchedNutrient = null;


    for (const nutrient in nutrientMap) {

      if (searchQuery.includes(nutrient)) {

        matchedNutrient = nutrient;

        break;
      }

    }


    // ========================================
    // NUTRIENT VALUE
    // ========================================

    let nutrientPath = null;
    let nutrientValue = null;


    if (matchedNutrient) {

      nutrientPath =
        nutrientMap[matchedNutrient];


      const [parent, child] =
        nutrientPath.split(".");


      nutrientValue =
        foodData[parent][child];

    }


    // ========================================
    // FINAL RESPONSE
    // ========================================

    return res.status(200).json({

      success: true,

      food: foodData.name,

      nutrient: matchedNutrient,

      value: nutrientValue,

      data: foodData,

    });


  } catch (error) {

    console.error(
      "Search error:",
      error
    );


    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};