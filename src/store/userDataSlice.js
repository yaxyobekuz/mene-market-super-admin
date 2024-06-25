import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  data: null,
};

export const userDataSlice = createSlice({
  name: "user data",
  initialState: initialStateValues,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
