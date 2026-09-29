import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {

  // 🆕 NEW:
  // Check karenge ki browser me accessToken saved hai ya nahi.
  // Token hai = user logged in.
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  const navigate = useNavigate();


  // 🆕 NEW:
  // Login / Logout ke baad Header ko immediately update karne ke liye.
  useEffect(() => {

    const handleAuthChange = () => {

      // 🆕 NEW:
      // Current token ko dobara check karenge.
      const token = localStorage.getItem("accessToken");

      setIsLoggedIn(!!token);
    };


    // 🆕 NEW:
    // LoginForm aur Logout se authChange event receive karega.
    window.addEventListener(
      "authChange",
      handleAuthChange
    );


    // 🆕 NEW:
    // Header unmount hone par event listener remove.
    return () => {
      window.removeEventListener(
        "authChange",
        handleAuthChange
      );
    };

  }, []);


  // 🆕 NEW:
  // Logout function.
  const handleLogout = () => {

    // 🆕 NEW:
    // JWT access token delete.
    localStorage.removeItem("accessToken");


    // 🆕 NEW:
    // Header ko immediately batayenge ki user logout ho gaya.
    window.dispatchEvent(
      new Event("authChange")
    );


    // Login page par redirect.
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-xl">
            🥗
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              Protein<span className="text-green-600">Dekho</span>
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Smart Nutrition Guide
            </p>
          </div>

        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">

          <Link
            to="/"
            className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
          >
            Home
          </Link>

          <Link
            to="/foods"
            className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
          >
            Foods
          </Link>

          <Link
            to="/calculators"
            className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
          >
            Calculators
          </Link>

          <Link
            to="/protein-target"
            className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
          >
            Protein Target
          </Link>

          <Link
            to="/meal-planner"
            className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
          >
            Meal Planner
          </Link>
          <Link
  to="/daily-tracker"
  className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
>
  Daily Tracker
</Link>

        </nav>

        {/* 🆕 UPDATED:
            Login ki jagah logged-in user ke liye
            Dashboard + Logout dikhayenge.
        */}

        {isLoggedIn ? (

          <div className="hidden items-center gap-2 md:flex">

            {/* Dashboard */}
            <Link
              to="/dashboard"
              className="rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white transition hover:bg-green-700"
            >
              Dashboard
            </Link>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Logout
            </button>

          </div>

        ) : (

          // 🆕 NEW:
          // User logged-in nahi hai to Login button.
          <Link
            to="/login"
            className="hidden rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white transition hover:bg-green-700 md:block"
          >
            Login
          </Link>

        )}

        {/* Mobile Menu Button */}
        <button
          className="rounded-xl bg-gray-100 px-3 py-2 text-xl md:hidden"
          type="button"
        >
          ☰
        </button>

      </div>

    </header>
  );
}

export default Header;