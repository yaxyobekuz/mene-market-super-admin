import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productsDataSlice from "./productsDataSlice";

export const store = configureStore({
  reducer: {
    authData: authSlice,
    productsData: productsDataSlice,
  },
});
