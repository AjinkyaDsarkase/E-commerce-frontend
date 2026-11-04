import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [] },
  reducers: {
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
