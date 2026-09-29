import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../authService";

function RegisterForm() {

  // 🆕 NEW:
  // Signup successful hone ke baad
  // user ko Nutrition Details page par bhejne ke liye.
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
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

      const result = await signupUser(formData);

      console.log("Signup Success:", result);

      // 🆕 NEW:
      // Backend signup ke baad JWT accessToken bhej raha hai.
      if (result.success && result.accessToken) {

        // 🆕 NEW:
        // Token browser mein save kar rahe hain.
        // Ab user ko dobara login nahi karna padega.
        localStorage.setItem(
          "accessToken",
          result.accessToken
        );

        alert("Account created successfully!");

        // 🆕 NEW:
        // Signup ke baad direct Nutrition Details.
        navigate("/nutrition-profile");
      }

    } catch (error) {
      console.error("Signup Failed:", error.message);

      alert(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Name */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
      </div>

      {/* Email */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Phone
        </label>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
      </div>

      {/* Age */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Age
        </label>

        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your age"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
      </div>

      {/* Password */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

    </form>
  );
}

export default RegisterForm;