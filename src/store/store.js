import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";

console.log("PRODUCT REDUCER:", productReducer);
console.log("TYPE:", typeof productReducer);

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

console.log("STORE STATE:", store.getState());