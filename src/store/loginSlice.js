import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  isLoggedIn: true,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialStateValues,
  reducers: {
    changeLogin: (state, action) => {
      // state.isLoggedIn = action.payload;
    },
  },
});

export const { changeLogin } = loginSlice.actions;

export default loginSlice.reducer;
