function FoodDetails({ food }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      {/* Food Name */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Nutrition Details
        </p>

        <h2 className="text-3xl font-bold text-gray-900">
          {food.name}
        </h2>
      </div>

      {/* Basic Information */}
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-bold">
          Basic Information
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Serving Size
            </p>

            <p className="text-xl font-bold">
              {food.standardServingSize} {food.servingUnit}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Calories
            </p>

            <p className="text-xl font-bold">
              {food.macros.calories} kcal
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Protein
            </p>

            <p className="text-xl font-bold text-green-600">
              {food.macros.protein} g
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Category
            </p>

            <p className="text-xl font-bold">
              {food.category}
            </p>
          </div>

        </div>
      </div>

      {/* Macronutrients */}
      <div className="mb-8">

        <h3 className="mb-4 text-xl font-bold">
          Macronutrients
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Protein
            </p>

            <p className="font-bold">
              {food.macros.protein} g
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Carbohydrates
            </p>

            <p className="font-bold">
              {food.macros.carbs} g
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Fats
            </p>

            <p className="font-bold">
              {food.macros.fats} g
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Fiber
            </p>

            <p className="font-bold">
              {food.macros.fiber} g
            </p>
          </div>

        </div>
      </div>

      {/* Vitamins */}
      <div className="mb-8">

        <h3 className="mb-4 text-xl font-bold">
          Vitamins
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Vitamin A
            </p>

            <p className="font-bold">
              {food.vitamins.vitaminA}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Vitamin B12
            </p>

            <p className="font-bold">
              {food.vitamins.vitaminB12}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Vitamin C
            </p>

            <p className="font-bold">
              {food.vitamins.vitaminC}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Vitamin D
            </p>

            <p className="font-bold">
              {food.vitamins.vitaminD}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Vitamin E
            </p>

            <p className="font-bold">
              {food.vitamins.vitaminE}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Folate
            </p>

            <p className="font-bold">
              {food.vitamins.folate}
            </p>
          </div>

        </div>
      </div>

      {/* Minerals */}
      <div className="mb-8">

        <h3 className="mb-4 text-xl font-bold">
          Minerals
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Calcium
            </p>

            <p className="font-bold">
              {food.minerals.calcium} mg
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Iron
            </p>

            <p className="font-bold">
              {food.minerals.iron} mg
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Zinc
            </p>

            <p className="font-bold">
              {food.minerals.zinc} mg
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Potassium
            </p>

            <p className="font-bold">
              {food.minerals.potassium} mg
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Magnesium
            </p>

            <p className="font-bold">
              {food.minerals.magnesium} mg
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Sodium
            </p>

            <p className="font-bold">
              {food.minerals.sodium} mg
            </p>
          </div>

        </div>
      </div>

      {/* Other Information */}
      <div>

        <h3 className="mb-4 text-xl font-bold">
          Other Information
        </h3>

        <p className="mb-4">
          <span className="font-semibold">
            Glycemic Index:
          </span>{" "}
          {food.glycemicIndex}
        </p>

        <div className="flex flex-wrap gap-2">

          {food.tags?.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
            >
              {tag}
            </span>
          ))}

        </div>

      </div>

    </div>
  );
}

export default FoodDetails;