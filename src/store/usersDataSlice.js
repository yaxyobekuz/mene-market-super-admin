import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  usersData: [],
};

export const usersDataSlice = createSlice({
  name: "users",
  initialState: initialStateValues,
  reducers: {
    setUsersData: (state, action) => {
      state.usersData = action.payload;
    },

    deleteUserData: (state, action) => {    
      state.usersData = state.usersData.filter(
        (user) => user.userId !== action.payload
      );
    },

    editUserData: (state, action) => {
      state.usersData[action.payload.index] = action.payload.userData;
    },
  },
});

export const { setUsersData, deleteUserData, editUserData } =
  usersDataSlice.actions;

export default usersDataSlice.reducer;
