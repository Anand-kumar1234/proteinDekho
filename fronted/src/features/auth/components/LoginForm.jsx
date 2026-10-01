import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      
      const result = await loginUser(formData);

      console.log("LOGIN RESULT:", result);

      if (result.success) {
        // 🆕 JWT save
        localStorage.setItem(
          "accessToken",
          result.accessToken
        );

        // 🆕 Check
        console.log(
          "TOKEN SAVED:",
          localStorage.getItem("accessToken")
        );

        // 🆕 Header ko immediately update karne ke liye
        window.dispatchEvent(
          new Event("authChange")
        );

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
        });

        navigate("/dashboard");
      }

    } catch (error) {
      console.error("Login Failed:", error.message);

      // Agar error ke liye bhi toast use karna chahe toh toast.error(error.message) bhi kar sakte hain
      alert(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Phone */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Phone Number
        </label>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

    </form>
  );
}

export default LoginForm;