export const API_ENDPOINTS = {
  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  CATEGORIES: "/products/categories",
  PRODUCT_BY_CATEGORY: (category) => `/products/category/${category}`
}