import { useEffect, useState } from "react";

import {
  getFoods,
  searchFood,
} from "../features/nutrition/nutritionService";

import FoodDetails from "../features/nutrition/components/FoodDetails";


function NutritionPage() {

  // =========================
  // States
  // =========================

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // Autocomplete suggestions
  const [suggestions, setSuggestions] = useState([]);

  // Selected food for popup
  const [selectedFood, setSelectedFood] = useState(null);

  // Filter
  const [filter, setFilter] = useState("all");


  // =========================
  // Fetch all foods
  // =========================

  useEffect(() => {

    const fetchFoods = async () => {

      try {

        const response = await getFoods();

        setFoods(response.data || []);

      } catch (error) {

        console.error(
          "Food fetch error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    fetchFoods();

  }, []);


  // =========================
  // Search input change
  // =========================

  const handleQueryChange = (e) => {

    const value = e.target.value;

    setQuery(value);

    // Empty input
    if (!value.trim()) {

      setSuggestions([]);

      return;

    }


    const searchText = value
      .toLowerCase()
      .trim();


    // Find suggestions
    const filteredSuggestions = foods
      .filter((food) => {

        const name =
          food.name?.toLowerCase() || "";

        const hindiName =
          food.nameHindi?.toLowerCase() || "";


        return (
          name.includes(searchText) ||
          hindiName.includes(searchText)
        );

      })
      .slice(0, 6);


    setSuggestions(
      filteredSuggestions
    );

  };


  // =========================
  // Search
  // =========================

  const handleSearch = async () => {

    if (!query.trim()) {
      return;
    }


    try {

      setSearchLoading(true);


      const response =
        await searchFood(query);


      setSearchResult(response);

      // Search ke baad suggestions hide
      setSuggestions([]);

    } catch (error) {

      console.error(
        "Search error:",
        error
      );


      setSearchResult({
        success: false,
        message:
          error.message ||
          "Food not found",
      });

    } finally {

      setSearchLoading(false);

    }

  };


  // =========================
  // Enter key search
  // =========================

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      handleSearch();

    }

  };


  // =========================
  // Select suggestion
  // =========================

  const handleSuggestionClick = (food) => {

    setQuery(food.name);

    setSuggestions([]);

  };


  // =========================
  // Filter foods
  // =========================

  const filteredFoods = foods.filter(
    (food) => {

      if (filter === "veg") {

        return food.isVeg === true;

      }


      if (filter === "nonveg") {

        return food.isVeg === false;

      }


      return true;

    }
  );


  // =========================
  // Open Details
  // =========================

  const openDetails = (food) => {

    setSelectedFood(food);

  };


  // =========================
  // Close Details
  // =========================

  const closeDetails = () => {

    setSelectedFood(null);

  };


  // =========================
  // Loading
  // =========================

  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-gray-50">

        <div className="text-center">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-600"></div>


          <p className="font-semibold text-gray-600">

            Loading nutrition data...

          </p>

        </div>

      </div>

    );

  }


  return (

    <div className="min-h-screen bg-gray-50">


      {/* =========================================
          HEADER
      ========================================= */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">

          <div>

            <h1 className="text-3xl font-extrabold">

              Protein
              <span className="text-green-600">
                Dekho
              </span>

            </h1>


            <p className="mt-1 text-sm text-gray-500">

              Indian Food Nutrition Search Engine

            </p>

          </div>

        </div>

      </header>


      {/* =========================================
          MAIN
      ========================================= */}

      <main className="mx-auto max-w-7xl px-5 py-8">


        {/* =========================================
            SEARCH SECTION
        ========================================= */}

        <section className="mb-8 rounded-3xl border border-green-100 bg-white p-6 shadow-sm">

          <div className="mx-auto max-w-4xl text-center">

            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-600">

              Desi Nutrition

            </p>


            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">

              What is in your{" "}

              <span className="text-green-600">

                Desi Diet

              </span>{" "}

              today?

            </h2>


            <p className="mx-auto mt-3 max-w-2xl text-gray-500">

              Search Indian foods and check protein, calories,
              vitamins, minerals and other nutrition information.

            </p>


            {/* =========================================
                SEARCH BOX
            ========================================= */}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">


              {/* Search Input + Suggestions */}

              <div className="relative flex-1">

                <input
                  type="text"
                  value={query}
                  onChange={handleQueryChange}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g. Paneer mein kitna protein hai?"
                  className="w-full rounded-2xl border-2 border-green-100 bg-white px-5 py-4 text-base outline-none transition focus:border-green-400"
                />


                {/* =========================================
                    AUTOCOMPLETE
                ========================================= */}

                {suggestions.length > 0 && (

                  <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-xl">

                    {suggestions.map((food) => (

                      <button
                        key={food._id}
                        type="button"
                        onClick={() =>
                          handleSuggestionClick(food)
                        }
                        className="flex w-full items-center gap-3 px-5 py-3 transition hover:bg-green-50"
                      >

                        {/* Food Icon */}

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100">

                          🍽️

                        </div>


                        {/* Food Info */}

                        <div className="min-w-0">

                          <p className="truncate font-semibold text-gray-900">

                            {food.name}

                          </p>


                          {food.nameHindi && (

                            <p className="text-sm text-gray-500">

                              {food.nameHindi}

                            </p>

                          )}


                          <p className="text-xs text-gray-400">

                            {food.category}

                          </p>

                        </div>

                      </button>

                    ))}

                  </div>

                )}

              </div>


              {/* Search Button */}

              <button
                onClick={handleSearch}
                disabled={searchLoading}
                className="rounded-2xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {searchLoading
                  ? "Searching..."
                  : "Search"}

              </button>

            </div>


            {/* =========================================
                EXAMPLE SEARCHES
            ========================================= */}

            <div className="mt-5 flex flex-wrap justify-center gap-2">

              {[
                "Paneer mein kitna protein hai?",
                "Palak mein iron kitna hai?",
                "Chicken protein",
                "Soy chunks protein",
                "Egg calcium",
              ].map((example, index) => (

                <button
                  key={index}
                  onClick={() => {

                    setQuery(example);

                    setSuggestions([]);

                  }}
                  className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600 transition hover:border-green-300 hover:bg-green-50"
                >

                  {example}

                </button>

              ))}

            </div>

          </div>

        </section>


        {/* =========================================
            SEARCH RESULT
        ========================================= */}

        {searchResult && (

          <section className="mb-10">

            {searchResult.success ? (

              <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">


                <div className="mb-5 flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">

                      Search Result

                    </p>


                    <h2 className="text-2xl font-bold text-gray-900">

                      {searchResult.food}

                    </h2>

                  </div>


                  <button
                    onClick={() =>
                      setSearchResult(null)
                    }
                    className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200"
                  >

                    Clear

                  </button>

                </div>


                {/* Nutrient answer */}

                {searchResult.nutrient && (

                  <div className="mb-5 rounded-2xl bg-green-50 p-5">

                    <p className="text-sm text-gray-500">

                      Your Answer

                    </p>


                    <p className="mt-1 text-xl font-bold text-green-700">

                      {searchResult.nutrient.toUpperCase()}

                    </p>


                    <p className="mt-2 text-3xl font-extrabold text-gray-900">

                      {searchResult.value}

                      {searchResult.nutrient === "calories"
                        ? " kcal"
                        : ""}

                    </p>

                  </div>

                )}


                {/* View complete details */}

                <button
                  onClick={() =>
                    openDetails(searchResult.data)
                  }
                  className="w-full rounded-2xl bg-green-600 px-5 py-4 font-semibold text-white transition hover:bg-green-700"
                >

                  View Complete Nutrition Details

                </button>

              </div>

            ) : (

              <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-center">

                <p className="font-semibold text-red-600">

                  {searchResult.message ||
                    "Food not found"}

                </p>

              </div>

            )}

          </section>

        )}


        {/* =========================================
            FOOD DATABASE HEADER
        ========================================= */}

        <section className="mb-6">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">


            <div>

              <p className="text-sm font-semibold uppercase tracking-wide text-green-600">

                Nutrition Database

              </p>


              <h2 className="mt-1 text-3xl font-extrabold text-gray-900">

                Indian Foods

              </h2>


              <p className="mt-1 text-gray-500">

                {filteredFoods.length} foods available

              </p>

            </div>


            {/* =====================================
                FILTER
            ===================================== */}

            <div className="flex w-fit rounded-xl border border-gray-200 bg-white p-1 shadow-sm">

              <button
                onClick={() =>
                  setFilter("all")
                }
                className={`rounded-lg px-5 py-2 font-semibold transition ${
                  filter === "all"
                    ? "bg-green-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >

                All

              </button>


              <button
                onClick={() =>
                  setFilter("veg")
                }
                className={`rounded-lg px-5 py-2 font-semibold transition ${
                  filter === "veg"
                    ? "bg-green-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >

                Veg

              </button>


              <button
                onClick={() =>
                  setFilter("nonveg")
                }
                className={`rounded-lg px-5 py-2 font-semibold transition ${
                  filter === "nonveg"
                    ? "bg-red-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >

                Non-Veg

              </button>

            </div>

          </div>

        </section>


        {/* =========================================
            FOOD CARDS
        ========================================= */}

        {filteredFoods.length === 0 ? (

          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">

            <p className="text-lg font-semibold text-gray-600">

              No foods found.

            </p>

          </div>

        ) : (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredFoods.map((food) => (

              <div
                key={food._id}
                className="flex flex-col rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* =================================
                    VEG / NON VEG + CATEGORY
                ================================= */}

                <div className="mb-4 flex items-center justify-between gap-3">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      food.isVeg
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >

                    {food.isVeg
                      ? "🟢 Veg"
                      : "🔴 Non-Veg"}

                  </span>


                  <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">

                    {food.category}

                  </span>

                </div>


                {/* =================================
                    FOOD NAME
                ================================= */}

                <h3 className="text-2xl font-bold text-gray-900">

                  {food.name}

                </h3>


                {food.nameHindi && (

                  <p className="mt-1 text-sm text-gray-500">

                    {food.nameHindi}

                  </p>

                )}


                {/* =================================
                    STANDARD SERVING
                ================================= */}

                <div className="mt-4 rounded-xl bg-green-50 px-4 py-3">

                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">

                    Standard Serving

                  </p>


                  <p className="mt-1 font-bold text-green-700">

                    {food.standardServingSize}{" "}

                    {food.servingUnit}

                  </p>

                </div>


                {/* =================================
                    MACROS
                ================================= */}

                <div className="mt-4 grid grid-cols-2 gap-3">


                  {/* Protein */}

                  <div className="rounded-xl bg-gray-50 p-3">

                    <p className="text-xs text-gray-500">

                      Protein

                    </p>


                    <p className="mt-1 text-xl font-bold text-green-600">

                      {food.macros?.protein ?? 0}g

                    </p>

                  </div>


                  {/* Calories */}

                  <div className="rounded-xl bg-gray-50 p-3">

                    <p className="text-xs text-gray-500">

                      Calories

                    </p>


                    <p className="mt-1 text-xl font-bold text-gray-900">

                      {food.macros?.calories ?? 0}

                      <span className="text-sm font-medium">

                        {" "}kcal

                      </span>

                    </p>

                  </div>


                  {/* Carbs */}

                  <div className="rounded-xl bg-gray-50 p-3">

                    <p className="text-xs text-gray-500">

                      Carbs

                    </p>


                    <p className="mt-1 text-lg font-bold text-gray-800">

                      {food.macros?.carbs ?? 0}g

                    </p>

                  </div>


                  {/* Fats */}

                  <div className="rounded-xl bg-gray-50 p-3">

                    <p className="text-xs text-gray-500">

                      Fats

                    </p>


                    <p className="mt-1 text-lg font-bold text-gray-800">

                      {food.macros?.fats ?? 0}g

                    </p>

                  </div>

                </div>


                {/* =================================
                    TAGS
                ================================= */}

                {food.tags &&
                  food.tags.length > 0 && (

                    <div className="mt-4 flex min-h-[28px] flex-wrap gap-2">

                      {food.tags
                        .slice(0, 3)
                        .map((tag, index) => (

                          <span
                            key={index}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                          >

                            {tag}

                          </span>

                        ))}

                    </div>

                  )}


                {/* =================================
                    DETAILS BUTTON
                ================================= */}

                <button
                  onClick={() =>
                    openDetails(food)
                  }
                  className="mt-5 w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
                >

                  View Details

                </button>

              </div>

            ))}

          </div>

        )}

      </main>


      {/* =================================================
          DETAILS POPUP / MODAL
      ================================================= */}

      {selectedFood && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-6"
          onClick={closeDetails}
        >


          {/* Modal */}

          <div
            className="relative max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-gray-50 shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* =========================================
                MODAL HEADER
            ========================================= */}

            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-green-600">

                  Nutrition Details

                </p>


                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">

                  {selectedFood.name}

                </h2>

              </div>


              <button
                onClick={closeDetails}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-2xl font-bold text-gray-600 transition hover:bg-gray-200"
                aria-label="Close"
              >

                ×

              </button>

            </div>


            {/* =========================================
                FOOD DETAILS
            ========================================= */}

            <div className="p-3 sm:p-5">

              <FoodDetails
                food={selectedFood}
              />

            </div>

          </div>

        </div>

      )}

    </div>

  );

}


export default NutritionPage;