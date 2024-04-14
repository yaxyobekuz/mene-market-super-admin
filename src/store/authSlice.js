import { createSlice } from "@reduxjs/toolkit";
const getAuthdata = localStorage.getItem("auth");

const initialStateValues = {
  authData: {
    data: getAuthdata ? JSON.parse(getAuthdata) : null,
    isLoggedIn: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialStateValues,
  reducers: {
    changeAuthData: (state, action) => {
      if (action.payload) {
        state.authData = action.payload;
      } else {
        state.authData.isLoggedIn = true;
      }
    },
  },
});

export const { changeAuthData } = authSlice.actions;

export default authSlice.reducer;
