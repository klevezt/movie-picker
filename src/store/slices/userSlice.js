import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  authenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticateUser: (state) => {
      state.email = "klevestpalucaj@gmail.com";
      state.authenticated = true;
    },
    logoutUser: (state) => {
      state.email = "";
      state.authenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authenticateUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
