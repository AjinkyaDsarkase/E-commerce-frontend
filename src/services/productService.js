import api from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endPoints";

export const fetchProductsApi = async (signal) => {
  const response = await api.get(
    API_ENDPOINTS.PRODUCTS,
    {
      signal,
    }
  );
  return response.data;
}

export const fetchProductByIdApi = async (id, signal) => {
  const response = await api.get(
    API_ENDPOINTS.PRODUCT_BY_ID(id),
    {
      signal
    }
  )
  return response.data
}

export const fetchCategoriesApi = async (signal) => {
  const response = await api.get(
    API_ENDPOINTS.CATEGORIES,
    {
      signal
    }
  )
  return response.data
}

export const fetchProductsByCategoryApi = async (category, signal) => {
  const response = await api.get(
    API_ENDPOINTS.PRODUCT_BY_CATEGORY(category),
    {
      signal
    }
  )
  return response.data
}