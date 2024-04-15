import { createSlice } from "@reduxjs/toolkit";
const getAuthdata = localStorage.getItem("auth");

const initialStateValues = {
  productsData: [],
};

export const productsDataSlice = createSlice({
  name: "auth",
  initialState: initialStateValues,
  reducers: {
    setProductsData: (state, action) => {
      state.productsData = action.payload;
    },
  },
});

export const { setProductsData } = productsDataSlice.actions;

export default productsDataSlice.reducer;
