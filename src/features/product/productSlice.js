import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsApi, fetchProductByIdApi, fetchCategoriesApi } from "../../services/productService";

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  categories: [],
  categoriesLoading: false,
  categoriesError: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {  
    try {
      const response = await fetchProductsApi(thunkAPI.signal);

      return response;
    } catch (error) {
      if (thunkAPI.signal.aborted) {
        return thunkAPI.rejectWithValue("Request was cancelled");
      }
      return thunkAPI.rejectWithValue(
        error?.message || "Failed to fetch products",
      );
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    try {
      const response = await fetchProductByIdApi(id, thunkAPI.signal);

      return response;
    } catch (error) {
      if (thunkAPI.signal.aborted) {
        return thunkAPI.rejectWithValue("Request was cancelled");
      }

      return thunkAPI.rejectWithValue(
        error?.message || "Failed to fetch product",
      );
    }
  },
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategoriesApi",
  async (_, thunkAPI) => {
    try {
      const response = await fetchCategoriesApi(thunkAPI.signal)
      return response;
    }
    catch(error){
      if (thunkAPI.signal.aborted) {
        return thunkAPI.rejectWithValue("Request was cancelled");
      }
      return thunkAPI.rejectWithValue(
        error?.message || "Failed to fetch categories",
      );
    }
  }
)

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      })

      // Fetch single product
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch product";
      })

      //fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError = action.payload || "Failed to fetch categories";
      })
  },
});

export default productSlice.reducer;
