import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // Initialize user with the data from localStorage if it exists even after we refresh
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
  },
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },

    logoutAction: (state, action) => {
      state.user = null;
    },
  },
});

//* create action
export const { loginAction, logoutAction } = authSlice.actions;
//* create reducer
const authReducer = authSlice.reducer;
export default authReducer;
