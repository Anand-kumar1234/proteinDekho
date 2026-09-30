const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";
console.log("Current API URL being used:", API_URL);
// ==========================================
// API CLIENT
// ==========================================

const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",

      ...(token && {
        Authorization: `Bearer ${token}`,
      }),

      ...options.headers,
    },
  });

  const data = await response.json();

  // ==========================================
  // AUTOMATIC LOGOUT
  // ==========================================

  if (response.status === 401) {
    localStorage.removeItem("accessToken");

    window.dispatchEvent(
      new Event("authChange")
    );

    window.location.href = "/login";

    throw new Error(
      data.message || "Session expired. Please login again."
    );
  }

  // ==========================================
  // ERROR HANDLING
  // ==========================================

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong"
    );
  }

  return data;
};

export default apiClient;
