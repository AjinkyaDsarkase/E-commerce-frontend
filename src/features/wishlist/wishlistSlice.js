import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { wishlistItems: [] },
  reducers: {
    toggleWishlist: (state, action) => {
      const exists = state.wishlistItems.find((item) => item.id === action.payload.id);
      if (exists) {
        state.wishlistItems = state.wishlistItems.filter((item) => item.id !== action.payload.id);
      } else {
        state.wishlistItems.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter((item) => item.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
