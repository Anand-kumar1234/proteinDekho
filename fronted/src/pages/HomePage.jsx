import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">

          <div>
            <div className="mb-5 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              🥗 Smart Nutrition Guide
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Know Your Food.
              <span className="block text-green-600">
                Know Your Nutrition.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Discover protein, calories, vitamins, minerals and other
              nutrition information for everyday foods with ProteinDekho.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/foods"
                className="rounded-xl bg-green-600 px-6 py-3.5 font-bold text-white shadow-sm transition hover:bg-green-700"
              >
                Explore Foods →
              </Link>

              <Link
                to="/calculators"
                className="rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-bold text-gray-700 transition hover:border-green-300 hover:text-green-600"
              >
                Nutrition Calculator
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-500">
              <span>✓ Protein information</span>
              <span>✓ Calories</span>
              <span>✓ Vitamins & Minerals</span>
            </div>
          </div>

          {/* HERO CARD */}
          <div className="relative">
            <div className="rounded-[2rem] bg-white p-6 shadow-xl sm:p-8">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Today's Nutrition
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-gray-900">
                    Smart Food Choice
                  </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl">
                  🥗
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-green-50 p-5">
                  <p className="text-sm text-gray-500">Protein</p>
                  <p className="mt-1 text-3xl font-extrabold text-green-700">
                    25g
                  </p>
                </div>

                <div className="rounded-2xl bg-orange-50 p-5">
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="mt-1 text-3xl font-extrabold text-orange-600">
                    240
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-50 p-5">
                  <p className="text-sm text-gray-500">Calcium</p>
                  <p className="mt-1 text-3xl font-extrabold text-blue-600">
                    480mg
                  </p>
                </div>

                <div className="rounded-2xl bg-purple-50 p-5">
                  <p className="text-sm text-gray-500">Fiber</p>
                  <p className="mt-1 text-3xl font-extrabold text-purple-600">
                    4.2g
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">
                    Nutrition information
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Detailed
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* QUICK TOOLS */}
      <section className="mx-auto max-w-7xl px-5 py-16">

        <div className="text-center">
          <p className="font-semibold uppercase tracking-wide text-green-600">
            Tools
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything You Need
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Use simple tools to understand your nutrition and plan your diet.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <Link
            to="/foods"
            className="group rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl">
              🍎
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Food Database
            </h3>

            <p className="mt-2 leading-7 text-gray-500">
              Search foods and check protein, calories, vitamins,
              minerals and more.
            </p>

            <p className="mt-5 font-semibold text-green-600">
              Explore Foods →
            </p>
          </Link>


          <Link
            to="/calculators"
            className="group rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
              🧮
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Nutrition Calculator
            </h3>

            <p className="mt-2 leading-7 text-gray-500">
              Estimate your daily calories, BMR and protein
              requirements.
            </p>

            <p className="mt-5 font-semibold text-green-600">
              Calculate Now →
            </p>
          </Link>


          <Link
            to="/protein-target"
            className="group rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
              💪
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Protein Target
            </h3>

            <p className="mt-2 leading-7 text-gray-500">
              Find an estimated daily protein target based on
              your weight and goals.
            </p>

            <p className="mt-5 font-semibold text-green-600">
              Find Target →
            </p>
          </Link>

        </div>
      </section>


      {/* NUTRITION CATEGORIES */}
      <section className="bg-white py-16">

        <div className="mx-auto max-w-7xl px-5">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-semibold uppercase tracking-wide text-green-600">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
                Explore Nutrition
              </h2>

              <p className="mt-2 text-gray-500">
                Find foods according to your nutrition needs.
              </p>
            </div>

            <Link
              to="/foods"
              className="font-semibold text-green-600"
            >
              View All Foods →
            </Link>
          </div>


          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <div className="text-4xl">🥩</div>
              <h3 className="mt-4 text-lg font-bold">
                High Protein
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Discover protein-rich foods for your daily diet.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <div className="text-4xl">🥦</div>
              <h3 className="mt-4 text-lg font-bold">
                Vegetables
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Explore nutritious vegetables and their nutrients.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <div className="text-4xl">🥛</div>
              <h3 className="mt-4 text-lg font-bold">
                Dairy
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Check protein, calcium and other nutrients.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <div className="text-4xl">🌾</div>
              <h3 className="mt-4 text-lg font-bold">
                Grains & Pulses
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Find useful nutrition information for everyday foods.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* WHY PROTEINDEKHO */}
      <section className="mx-auto max-w-7xl px-5 py-16">

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

          <div>
            <p className="font-semibold uppercase tracking-wide text-green-600">
              Why ProteinDekho?
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Understand what you eat.
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              ProteinDekho brings food nutrition information and
              simple nutrition tools together in one place.
            </p>

            <div className="mt-8 space-y-5">

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100">
                  ✓
                </div>

                <div>
                  <h3 className="font-bold">Detailed Food Information</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Protein, calories, carbohydrates, fats, fiber,
                    vitamins and minerals.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100">
                  ✓
                </div>

                <div>
                  <h3 className="font-bold">Simple Nutrition Tools</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Calculate your estimated calorie and protein needs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100">
                  ✓
                </div>

                <div>
                  <h3 className="font-bold">Easy to Understand</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Clear information without complicated nutrition terms.
                  </p>
                </div>
              </div>

            </div>
          </div>


          <div className="rounded-[2rem] bg-gray-900 p-8 text-white sm:p-10">

            <div className="text-5xl">🥗</div>

            <h3 className="mt-6 text-3xl font-extrabold">
              Start exploring your nutrition today.
            </h3>

            <p className="mt-4 leading-7 text-gray-300">
              Search your favourite foods and learn what they
              contain before adding them to your diet.
            </p>

            <Link
              to="/foods"
              className="mt-7 inline-block rounded-xl bg-green-500 px-6 py-3 font-bold text-white transition hover:bg-green-400"
            >
              Explore Food Database →
            </Link>

          </div>

        </div>
      </section>


      {/* FINAL CTA */}
      <section className="bg-green-600">

        <div className="mx-auto max-w-5xl px-5 py-16 text-center text-white">

          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to know your nutrition?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-green-100">
            Explore foods, calculate your requirements and start
            making more informed food choices.
          </p>

          <Link
            to="/foods"
            className="mt-7 inline-block rounded-xl bg-white px-7 py-3.5 font-bold text-green-700 transition hover:bg-gray-100"
          >
            Explore Foods
          </Link>

        </div>

      </section>

    </div>
  );
}

export default HomePage;