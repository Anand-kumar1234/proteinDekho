import apiClient from "../../services/apiClient";

export const getFoods = async () => {
  const data = await apiClient("/api/food");
  return data;
};

export const searchFood = async (query) => {
  const data = await apiClient("/api/food/search", {
    method: "POST",
    body: JSON.stringify({ query }),
  });

  return data;
};