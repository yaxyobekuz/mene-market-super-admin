import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
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

    editProductDataToProductsData: (state, action) => {
      state.productsData[action.payload.index] = action.payload.productData;
    },
  },
});

export const {
  setProductsData,
  filterProductsData,
  addProductToProductsData,
  editProductDataToProductsData,
} = productsDataSlice.actions;

export default productsDataSlice.reducer;
