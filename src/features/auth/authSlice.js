import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    registerUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { loginUser, registerUser, logoutUser, updateProfile } = authSlice.actions;
export default authSlice.reducer;
