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

    filterProductsData: (state, action) => {
      state.productsData = state.productsData.filter(
        (product) => product.productId !== action.payload
      );
    },

    addProductToProductsData: (state, action) => {
      state.productsData.push(action.payload);
    },
  },
});

export const { setProductsData, filterProductsData, addProductToProductsData } =
  productsDataSlice.actions;

export default productsDataSlice.reducer;
