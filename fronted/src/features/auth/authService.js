import apiClient from "../../services/apiClient";

export const signupUser = async (formData) => {
  const data = await apiClient("/api/signup", {
    method: "POST",
    body: JSON.stringify(formData),
  });
  return data;
};

export const loginUser = async (formData) => {
  const data = await apiClient("/api/login", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  return data;
};